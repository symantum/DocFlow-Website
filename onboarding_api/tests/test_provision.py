"""Phase 8 coordinator: approval → Account ID → AP provision."""

import os
from urllib.parse import parse_qs, urlparse

os.environ["ENVIRONMENT"] = "test"
os.environ["DATABASE_URL"] = "sqlite:///./test_docflow_onboarding.db"
os.environ["AUTO_CREATE_TABLES"] = "true"
os.environ["EMAIL_PROVIDER"] = "outbox"
os.environ["BOT_PROVIDER"] = "disabled"
os.environ["APP_SECRET"] = "test-secret-that-is-long-enough-for-hashing"
os.environ["INTERNAL_API_KEY"] = "test-internal-api-key"
os.environ["RATE_LIMIT_REQUESTS"] = "100"
os.environ["AP_PROVISION_ENABLED"] = "true"
os.environ["AP_PORTAL_URL"] = ""
os.environ["AP_PORTAL_INTEGRATION_SECRET"] = ""

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import select

from app.account_ids import is_docflow_account_id
from app.config import get_settings
from app.database import Base, SessionLocal, engine
from app.main import app
from app.models import Application, OutboxMessage
from app.provision import build_ap_provision_body, resolve_ap_only


@pytest.fixture(autouse=True)
def clean_database():
    get_settings.cache_clear()
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)
    get_settings.cache_clear()


@pytest.fixture
def client():
    with TestClient(app) as test_client:
        yield test_client


def pilot_request() -> dict:
    return {
        "kind": "pilot",
        "data": {
            "fullName": "Jane Smith",
            "companyName": "Example Pty Ltd",
            "workEmail": "Jane@Example.com",
            "country": "Australia",
            "locations": "2-5",
            "monthlyVolume": "200-999",
            "accountingSystem": "Xero",
            "intakeMethod": "email",
            "deliveryMethod": "accounting",
            "capability": "automation",
            "targetStart": "October 2026",
            "objective": "Validate invoice processing and delivery quality.",
            "consent": True,
        },
    }


def _approve_through_review(client: TestClient, idempotency_key: str) -> str:
    response = client.post(
        "/public-submissions",
        json=pilot_request(),
        headers={"Idempotency-Key": idempotency_key},
    )
    application_id = response.json()["reference"]
    with SessionLocal() as db:
        message = db.scalar(
            select(OutboxMessage).where(
                OutboxMessage.template_alias == "verify-application-email"
            )
        )
        token = parse_qs(urlparse(message.payload["verification_url"]).query)["token"][0]
    assert client.get("/email/verify", params={"token": token}).status_code == 200
    assert (
        client.patch(
            f"/internal/applications/{application_id}/status",
            json={"status": "UNDER_REVIEW"},
            headers={"X-Internal-API-Key": "test-internal-api-key"},
        ).status_code
        == 200
    )
    return application_id


def test_approve_mints_account_id_and_skips_when_ap_unconfigured(client: TestClient):
    application_id = _approve_through_review(client, "pilot-provision-key-0001")
    approved = client.patch(
        f"/internal/applications/{application_id}/status",
        json={"status": "APPROVED"},
        headers={"X-Internal-API-Key": "test-internal-api-key"},
    )
    assert approved.status_code == 200
    body = approved.json()
    assert body["status"] == "APPROVED"
    assert is_docflow_account_id(body["account_id"])
    assert body["provision_status"] == "SKIPPED"

    with SessionLocal() as db:
        application = db.scalar(
            select(Application).where(Application.application_id == application_id)
        )
        assert application.account_id == body["account_id"]
        assert application.provision_status == "SKIPPED"
        assert resolve_ap_only(application) is True
        planned = build_ap_provision_body(application, application.account_id, get_settings())
        assert planned["workspace_code"] == application.account_id
        assert planned["ap_only"] is True
        assert planned["email_aliases"][0].endswith("@df.symantum.com")


def test_approve_calls_ap_when_configured(client: TestClient, monkeypatch):
    monkeypatch.setenv("AP_PORTAL_URL", "http://ap.test")
    monkeypatch.setenv("AP_PORTAL_INTEGRATION_SECRET", "prod-shared-secret")
    get_settings.cache_clear()

    captured: dict = {}

    def fake_call(body, settings):
        captured["body"] = body
        captured["url"] = settings.ap_portal_url
        return {"id": 99, "client_code": body["workspace_code"], "docflow_account_id": body["docflow_account_id"]}

    monkeypatch.setattr("app.provision.call_ap_internal_provision", fake_call)

    application_id = _approve_through_review(client, "pilot-provision-key-0002")

    approved = client.patch(
        f"/internal/applications/{application_id}/status",
        json={"status": "APPROVED"},
        headers={"X-Internal-API-Key": "test-internal-api-key"},
    )
    assert approved.status_code == 200
    assert approved.json()["provision_status"] == "SUCCESS"
    assert captured["body"]["docflow_account_id"] == approved.json()["account_id"]
    assert captured["body"]["append_aliases_file"] is True
    get_settings.cache_clear()
