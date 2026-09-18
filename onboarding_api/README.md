# DocFlow Onboarding API

Independent public-intake service for Pilot, production-onboarding, and Contact submissions.
It owns the `docflow_onboarding` database and does not write directly to AP_Portal or CSA_Portal.

## Current Phase 4 foundation

- Durable Pilot, production, and Contact records.
- Opaque `APP-*` and `INQ-*` references.
- Versioned consent capture.
- Hashed, expiring, single-use work-email verification tokens.
- Application lifecycle and audit events.
- Protected internal review-state transitions without account provisioning.
- Database-backed idempotency and source-hashed rate limiting.
- Local email outbox with a Postmark adapter ready for later credentials.
- Disabled development bot adapter with Turnstile verification ready for later credentials.
- Production startup guards that reject missing email, bot, secret, or migration configuration.

No application provisions an AP or Client Portal account.

## Local setup

```powershell
cd C:\Symantum2026\Projects\SymantumWeb\onboarding_api
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn app.main:app --reload --port 8010
```

Set the website development environment:

```text
VITE_ONBOARDING_API_URL=http://localhost:8010
```

Local email messages are written to `outbox_messages`. They are not sent externally.

## PostgreSQL database boundary

The service may share the managed PostgreSQL cluster, but it requires a separate database and role:

```sql
CREATE ROLE docflow_onboarding LOGIN PASSWORD 'generated-secret';
CREATE DATABASE docflow_onboarding OWNER docflow_onboarding;
```

Use the generated credentials only through `DATABASE_URL`. Do not commit them.

Internal review updates require a separate strong `INTERNAL_API_KEY`. This key is server-to-server
only and must never be placed in the website.

Apply production migrations:

```powershell
alembic upgrade head
```

Production must set `AUTO_CREATE_TABLES=false`.

## Deferred deployment providers

Development can continue without provider accounts. Public deployment remains blocked until:

1. A transactional email provider is configured and its sending domain is authenticated.
2. A Turnstile-equivalent bot provider is configured and enforced server-side.
3. Production rate limits and allowed origins are verified.

Do not adopt `onboarding@df.symantum.com` until domain support confirms replies cannot enter the
supplier-document ingestion route.

## Tests

```powershell
pytest -q
```
