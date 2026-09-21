"""
Phase 8 coordinator: approve → Account ID → AP Portal provision.

Does not write CSA / Client Portal users (ap_only path). Website public forms
never call AP directly — only this internal path after Symantum approval.
"""

from __future__ import annotations

import logging
from datetime import datetime, timezone
from typing import Any

import httpx
from sqlalchemy.orm import Session

from .account_ids import account_id_email_local_part, generate_docflow_account_id, is_docflow_account_id
from .config import Settings
from .models import Application, AuditEvent

logger = logging.getLogger(__name__)


def resolve_ap_only(application: Application) -> bool:
    """Pilot and AP-only production → no Client Portal credentials."""
    if application.kind == "pilot":
        return True
    payload = application.payload or {}
    choice = str(payload.get("serviceChoice") or payload.get("service_choice") or "").strip().lower()
    if choice in ("ap-only", "ap_only", "aponly"):
        return True
    if choice in ("client-portal", "intelligence"):
        return False
    # Default: AP processing without Client Portal until Phase 8 CSA wiring.
    return True


def build_email_aliases(application: Application, account_id: str, settings: Settings) -> list[str]:
    """Aliases come from Symantum review when present; otherwise the default DF alias."""
    review = application.review_payload or {}
    aliases: list[str] = []
    use_symantum = review.get("use_symantum_alias", True)
    if use_symantum:
        local = account_id_email_local_part(account_id)
        domain = (settings.email_alias_domain or "df.symantum.com").strip().lstrip("@")
        aliases.append(f"{local}@{domain}")

    client_email = (review.get("client_intake_email") or "").strip()
    if "@" in client_email and client_email.lower() not in {a.lower() for a in aliases}:
        aliases.append(client_email)

    if not aliases:
        local = account_id_email_local_part(account_id)
        domain = (settings.email_alias_domain or "df.symantum.com").strip().lstrip("@")
        aliases.append(f"{local}@{domain}")
    return aliases


def build_ap_provision_body(application: Application, account_id: str, settings: Settings) -> dict[str, Any]:
    review = application.review_payload or {}
    aliases = build_email_aliases(application, account_id, settings)
    display = (review.get("display_name") or application.organisation_name or "").strip()
    ap_only = review.get("ap_only")
    if ap_only is None:
        ap_only = resolve_ap_only(application)
    delivery = (review.get("delivery_mode") or "email").strip()
    return {
        "display_name": display or application.organisation_name,
        "docflow_account_id": account_id,
        "workspace_code": account_id,
        "email_aliases": aliases,
        "invoice_email": aliases[0] if aliases else "",
        "reject_receiver": application.work_email,
        "append_aliases_file": True,
        "ap_only": bool(ap_only),
        "delivery_mode": delivery,
    }


def call_ap_internal_provision(body: dict[str, Any], settings: Settings) -> dict[str, Any]:
    base = (settings.ap_portal_url or "").rstrip("/")
    if not base:
        raise RuntimeError("AP_PORTAL_URL is not configured")
    secret = (settings.ap_portal_integration_secret or "").strip()
    if not secret or secret in ("change-me", "change-me-in-production"):
        raise RuntimeError("AP_PORTAL_INTEGRATION_SECRET is not configured")

    url = f"{base}/api/v1/clients/internal-provision"
    headers = {
        "Content-Type": "application/json",
        "X-Integration-Secret": secret,
    }
    with httpx.Client(timeout=30.0) as client:
        response = client.post(url, json=body, headers=headers)
    if response.status_code >= 400:
        detail = response.text[:500]
        raise RuntimeError(f"AP provision failed ({response.status_code}): {detail}")
    try:
        return response.json()
    except Exception:
        return {"raw": response.text}


def ensure_account_id(application: Application) -> str:
    existing = (application.account_id or "").strip().upper()
    if existing and is_docflow_account_id(existing):
        return existing
    account_id = generate_docflow_account_id()
    application.account_id = account_id
    return account_id


def provision_application_to_ap(
    db: Session,
    application: Application,
    settings: Settings,
    *,
    force: bool = False,
) -> Application:
    """
    Mint Account ID (if needed) and provision AP workspace + alias map entry.

    Approval status is owned by the caller. Provision failures are recorded on
    the application so approval is not rolled back.
    """
    if application.provision_status == "SUCCESS" and not force:
        return application

    if not settings.ap_provision_enabled:
        application.provision_status = "SKIPPED"
        application.provision_detail = {"reason": "AP_PROVISION_ENABLED=false"}
        db.add(
            AuditEvent(
                entity_type="application",
                entity_id=application.id,
                event_type="AP_PROVISION_SKIPPED",
                actor="onboarding-coordinator",
                details={"reason": "disabled"},
            )
        )
        return application

    account_id = ensure_account_id(application)
    body = build_ap_provision_body(application, account_id, settings)

    if not (settings.ap_portal_url or "").strip() or not (settings.ap_portal_integration_secret or "").strip():
        application.provision_status = "SKIPPED"
        application.provision_detail = {
            "reason": "missing_ap_portal_config",
            "account_id": account_id,
            "planned_aliases": body.get("email_aliases"),
        }
        db.add(
            AuditEvent(
                entity_type="application",
                entity_id=application.id,
                event_type="AP_PROVISION_SKIPPED",
                actor="onboarding-coordinator",
                details={"reason": "missing_ap_portal_config", "account_id": account_id},
            )
        )
        return application

    try:
        result = call_ap_internal_provision(body, settings)
        application.provision_status = "SUCCESS"
        application.provisioned_at = datetime.now(timezone.utc)
        application.provision_detail = {
            "account_id": account_id,
            "ap_client_id": result.get("id"),
            "workspace_code": result.get("client_code") or account_id,
            "ap_only": body.get("ap_only"),
            "email_aliases": body.get("email_aliases"),
        }
        db.add(
            AuditEvent(
                entity_type="application",
                entity_id=application.id,
                event_type="AP_PROVISION_SUCCESS",
                actor="onboarding-coordinator",
                details={
                    "account_id": account_id,
                    "ap_client_id": result.get("id"),
                },
            )
        )
        logger.info(
            "Provisioned AP account %s for application %s",
            account_id,
            application.application_id,
        )
    except Exception as exc:
        application.provision_status = "FAILED"
        application.provision_detail = {
            "account_id": account_id,
            "error": str(exc)[:1000],
            "email_aliases": body.get("email_aliases"),
        }
        db.add(
            AuditEvent(
                entity_type="application",
                entity_id=application.id,
                event_type="AP_PROVISION_FAILED",
                actor="onboarding-coordinator",
                details={"account_id": account_id, "error": str(exc)[:500]},
            )
        )
        logger.exception(
            "AP provision failed for application %s",
            application.application_id,
        )

    return application
