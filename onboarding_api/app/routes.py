from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, Header, HTTPException, Query, Request, status
from pydantic import ValidationError
from sqlalchemy import func, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from .config import Settings, get_settings
from .database import get_db
from .models import (
    Application,
    AuditEvent,
    ContactInquiry,
    EmailVerificationToken,
    IdempotencyRecord,
    SubmissionAttempt,
)
from .providers import deliver_email, queue_email, verify_bot_token
from .schemas import (
    ApplicationStatusUpdate,
    EmailVerificationResponse,
    INTAKE_MODELS,
    PublicSubmissionRequest,
    PublicSubmissionResponse,
)
from .security import (
    constant_time_equal,
    hash_token,
    new_reference,
    new_verification_token,
    request_hash,
    source_hash,
)


router = APIRouter()


def _client_ip(request: Request) -> str:
    return request.client.host if request.client else "unknown"


def _enforce_rate_limit(db: Session, request: Request, settings: Settings) -> None:
    hashed_source = source_hash(_client_ip(request), settings.app_secret)
    cutoff = datetime.now(timezone.utc) - timedelta(seconds=settings.rate_limit_window_seconds)
    attempts = db.scalar(
        select(func.count())
        .select_from(SubmissionAttempt)
        .where(
            SubmissionAttempt.source_hash == hashed_source,
            SubmissionAttempt.created_at >= cutoff,
        )
    )
    if int(attempts or 0) >= settings.rate_limit_requests:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many submission attempts. Please try again later.",
        )
    db.add(SubmissionAttempt(source_hash=hashed_source))
    db.commit()


def _unique_reference(db: Session, prefix: str, model: type[Application] | type[ContactInquiry]) -> str:
    column = Application.application_id if model is Application else ContactInquiry.reference
    for _ in range(10):
        candidate = new_reference(prefix)
        if db.scalar(select(column).where(column == candidate)) is None:
            return candidate
    raise HTTPException(status_code=503, detail="Could not allocate a public reference")


@router.post(
    "/public-submissions",
    response_model=PublicSubmissionResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_public_submission(
    envelope: PublicSubmissionRequest,
    request: Request,
    idempotency_key: str = Header(..., alias="Idempotency-Key", min_length=16, max_length=100),
    db: Session = Depends(get_db),
    settings: Settings = Depends(get_settings),
) -> PublicSubmissionResponse:
    envelope_payload = {"kind": envelope.kind, "data": envelope.data}
    payload_hash = request_hash(envelope_payload)
    existing = db.scalar(
        select(IdempotencyRecord).where(IdempotencyRecord.key == idempotency_key)
    )
    if existing:
        if existing.request_hash != payload_hash:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Idempotency key was already used for a different request",
            )
        return PublicSubmissionResponse.model_validate(existing.response_payload)

    _enforce_rate_limit(db, request, settings)
    await verify_bot_token(
        token=envelope.bot_token,
        remote_ip=_client_ip(request),
        settings=settings,
    )

    model = INTAKE_MODELS[envelope.kind]
    try:
        data = model.model_validate(envelope.data)
    except ValidationError as exc:
        raise HTTPException(status_code=422, detail=exc.errors()) from exc
    clean_data = data.model_dump(mode="json", by_alias=True)

    if envelope.kind == "contact":
        reference = _unique_reference(db, "INQ", ContactInquiry)
        inquiry = ContactInquiry(
            reference=reference,
            work_email=str(data.work_email).casefold(),
            payload=clean_data,
            consent_version=settings.consent_version,
        )
        db.add(inquiry)
        db.flush()
        db.add(
            AuditEvent(
                entity_type="contact_inquiry",
                entity_id=inquiry.id,
                event_type="INQUIRY_RECEIVED",
            )
        )
        message = queue_email(
            db,
            recipient=settings.internal_notification_email,
            template_alias="contact-inquiry-received",
            subject=f"New DocFlow inquiry {reference}",
            payload={"reference": reference},
        )
        response = PublicSubmissionResponse(reference=reference, status="RECEIVED")
    else:
        reference = _unique_reference(db, "APP", Application)
        application = Application(
            application_id=reference,
            kind=envelope.kind,
            work_email=str(data.work_email).casefold(),
            organisation_name=data.company_name,
            payload=clean_data,
            consent_version=settings.consent_version,
        )
        db.add(application)
        db.flush()
        token = new_verification_token()
        db.add(
            EmailVerificationToken(
                application_pk=application.id,
                token_hash=hash_token(token),
                expires_at=datetime.now(timezone.utc) + timedelta(hours=24),
            )
        )
        db.add(
            AuditEvent(
                entity_type="application",
                entity_id=application.id,
                event_type="APPLICATION_SUBMITTED",
                details={"kind": envelope.kind},
            )
        )
        message = queue_email(
            db,
            recipient=application.work_email,
            template_alias="verify-application-email",
            subject=f"Verify your DocFlow application {reference}",
            payload={
                "application_id": reference,
                "verification_url": (
                    f"{settings.public_website_url.rstrip('/')}/verify-email?token={token}"
                ),
            },
        )
        response = PublicSubmissionResponse(
            reference=reference,
            status="EMAIL_VERIFICATION_PENDING",
        )

    db.add(
        IdempotencyRecord(
            key=idempotency_key,
            request_hash=payload_hash,
            response_payload=response.model_dump(mode="json"),
        )
    )
    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail="Submission could not be deduplicated") from exc

    await deliver_email(message, settings)
    db.commit()
    return response


@router.get("/email/verify", response_model=EmailVerificationResponse)
async def verify_application_email(
    token: str = Query(..., min_length=32, max_length=200),
    db: Session = Depends(get_db),
    settings: Settings = Depends(get_settings),
) -> EmailVerificationResponse:
    token_record = db.scalar(
        select(EmailVerificationToken).where(
            EmailVerificationToken.token_hash == hash_token(token)
        )
    )
    if not token_record or token_record.used_at is not None:
        raise HTTPException(status_code=400, detail="Verification link is invalid or already used")

    expires_at = token_record.expires_at
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at <= datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="Verification link has expired")

    application = token_record.application
    verified_at = datetime.now(timezone.utc)
    token_record.used_at = verified_at
    application.email_verified_at = verified_at
    application.status = "EMAIL_VERIFIED"
    db.add(
        AuditEvent(
            entity_type="application",
            entity_id=application.id,
            event_type="EMAIL_VERIFIED",
            actor="applicant",
        )
    )
    message = queue_email(
        db,
        recipient=settings.internal_notification_email,
        template_alias="application-email-verified",
        subject=f"DocFlow application ready for review: {application.application_id}",
        payload={"application_id": application.application_id},
    )
    db.commit()
    await deliver_email(message, settings)
    db.commit()
    return EmailVerificationResponse(
        application_id=application.application_id,
        status=application.status,
    )


@router.patch(
    "/internal/applications/{application_id}/status",
    response_model=EmailVerificationResponse,
)
def update_application_review_status(
    application_id: str,
    update: ApplicationStatusUpdate,
    internal_api_key: str = Header(..., alias="X-Internal-API-Key"),
    db: Session = Depends(get_db),
    settings: Settings = Depends(get_settings),
) -> EmailVerificationResponse:
    if not constant_time_equal(internal_api_key, settings.internal_api_key):
        raise HTTPException(status_code=401, detail="Invalid internal credentials")

    application = db.scalar(
        select(Application).where(Application.application_id == application_id)
    )
    if not application:
        raise HTTPException(status_code=404, detail="Application was not found")

    allowed_transitions = {
        "EMAIL_VERIFIED": {"UNDER_REVIEW"},
        "UNDER_REVIEW": {"APPROVED", "REJECTED"},
    }
    if update.status not in allowed_transitions.get(application.status, set()):
        raise HTTPException(
            status_code=409,
            detail=f"Cannot transition {application.status} to {update.status}",
        )

    previous_status = application.status
    application.status = update.status
    db.add(
        AuditEvent(
            entity_type="application",
            entity_id=application.id,
            event_type=f"APPLICATION_{update.status}",
            actor="internal-api",
            details={"previous_status": previous_status},
        )
    )
    db.commit()
    return EmailVerificationResponse(
        application_id=application.application_id,
        status=application.status,
    )
