from datetime import datetime, timezone

import httpx
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from .config import Settings
from .models import OutboxMessage


async def verify_bot_token(*, token: str | None, remote_ip: str, settings: Settings) -> None:
    if settings.bot_provider == "disabled":
        return
    if not token:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Bot verification is required")

    async with httpx.AsyncClient(timeout=8.0) as client:
        response = await client.post(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            data={
                "secret": settings.turnstile_secret_key,
                "response": token,
                "remoteip": remote_ip,
            },
        )
    result = response.json()
    if not response.is_success or result.get("success") is not True:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Bot verification failed")


def queue_email(
    db: Session,
    *,
    recipient: str,
    template_alias: str,
    subject: str,
    payload: dict,
) -> OutboxMessage:
    message = OutboxMessage(
        recipient=recipient,
        template_alias=template_alias,
        subject=subject,
        payload=payload,
    )
    db.add(message)
    db.flush()
    return message


def _render_text(message: OutboxMessage) -> str:
    if message.template_alias == "verify-application-email":
        return (
            f"Verify your DocFlow application {message.payload['application_id']}:\n\n"
            f"{message.payload['verification_url']}\n\n"
            "This link expires in 24 hours."
        )
    if message.template_alias == "application-email-verified":
        return (
            f"DocFlow application {message.payload['application_id']} has a verified work email "
            "and is ready for review."
        )
    if message.template_alias == "contact-inquiry-received":
        return f"New DocFlow contact inquiry: {message.payload['reference']}"
    return message.subject


async def deliver_email(message: OutboxMessage, settings: Settings) -> None:
    if settings.email_provider == "outbox":
        return

    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.post(
            "https://api.postmarkapp.com/email",
            headers={
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-Postmark-Server-Token": settings.postmark_server_token,
            },
            json={
                "From": settings.email_from,
                "To": message.recipient,
                "Subject": message.subject,
                "TextBody": _render_text(message),
                "MessageStream": "outbound",
            },
        )

    if response.is_success:
        body = response.json()
        message.status = "SENT"
        message.provider_message_id = str(body.get("MessageID") or "")
        message.sent_at = datetime.now(timezone.utc)
        message.last_error = None
    else:
        message.status = "FAILED"
        message.last_error = f"Postmark HTTP {response.status_code}"
