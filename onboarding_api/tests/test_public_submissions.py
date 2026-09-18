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

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import select

from app.database import Base, SessionLocal, engine
from app.main import app
from app.models import Application, ContactInquiry, OutboxMessage


@pytest.fixture(autouse=True)
def clean_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


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


def test_pilot_submission_is_durable_and_idempotent(client: TestClient):
    headers = {"Idempotency-Key": "pilot-request-key-0001"}
    first = client.post("/public-submissions", json=pilot_request(), headers=headers)
    assert first.status_code == 201
    assert first.json()["reference"].startswith("APP-")
    assert first.json()["status"] == "EMAIL_VERIFICATION_PENDING"

    second = client.post("/public-submissions", json=pilot_request(), headers=headers)
    assert second.status_code == 201
    assert second.json() == first.json()

    with SessionLocal() as db:
        applications = db.scalars(select(Application)).all()
        assert len(applications) == 1
        assert applications[0].work_email == "jane@example.com"
        assert len(db.scalars(select(OutboxMessage)).all()) == 1


def test_idempotency_key_rejects_different_payload(client: TestClient):
    headers = {"Idempotency-Key": "pilot-request-key-0002"}
    assert client.post("/public-submissions", json=pilot_request(), headers=headers).status_code == 201
    changed = pilot_request()
    changed["data"]["companyName"] = "Different Pty Ltd"
    response = client.post("/public-submissions", json=changed, headers=headers)
    assert response.status_code == 409


def test_verification_link_transitions_application(client: TestClient):
    response = client.post(
        "/public-submissions",
        json=pilot_request(),
        headers={"Idempotency-Key": "pilot-request-key-0003"},
    )
    application_id = response.json()["reference"]

    with SessionLocal() as db:
        message = db.scalar(
            select(OutboxMessage).where(
                OutboxMessage.template_alias == "verify-application-email"
            )
        )
        token = parse_qs(urlparse(message.payload["verification_url"]).query)["token"][0]

    verified = client.get("/email/verify", params={"token": token})
    assert verified.status_code == 200
    assert verified.json()["application_id"] == application_id
    assert verified.json()["status"] == "EMAIL_VERIFIED"
    assert verified.json().get("account_id") is None
    assert client.get("/email/verify", params={"token": token}).status_code == 400

    with SessionLocal() as db:
        application = db.scalar(
            select(Application).where(Application.application_id == application_id)
        )
        assert application.status == "EMAIL_VERIFIED"
        assert application.email_verified_at is not None

    assert (
        client.patch(
            f"/internal/applications/{application_id}/status",
            json={"status": "UNDER_REVIEW"},
            headers={"X-Internal-API-Key": "wrong-key"},
        ).status_code
        == 401
    )
    review = client.patch(
        f"/internal/applications/{application_id}/status",
        json={"status": "UNDER_REVIEW"},
        headers={"X-Internal-API-Key": "test-internal-api-key"},
    )
    assert review.status_code == 200
    assert review.json()["status"] == "UNDER_REVIEW"


def test_contact_submission_uses_inquiry_reference(client: TestClient):
    response = client.post(
        "/public-submissions",
        headers={"Idempotency-Key": "contact-request-key-0001"},
        json={
            "kind": "contact",
            "data": {
                "fullName": "Jane Smith",
                "companyName": "Example Pty Ltd",
                "workEmail": "jane@example.com",
                "inquiryType": "General enquiry",
                "message": "Please contact me about the DocFlow service.",
                "consent": True,
            },
        },
    )
    assert response.status_code == 201
    assert response.json()["reference"].startswith("INQ-")
    with SessionLocal() as db:
        assert len(db.scalars(select(ContactInquiry)).all()) == 1
