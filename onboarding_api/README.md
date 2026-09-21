# DocFlow Onboarding API

Independent public-intake service for Pilot, production-onboarding, and Contact submissions.
It owns the `docflow_onboarding` database and does not accept public writes to AP_Portal or CSA_Portal.

## Phase 8 coordinator (first slice)

On internal **APPROVED**:

1. Mint DocFlow **Account ID** (`DF-…`) on the application.
2. Call AP `POST /api/v1/clients/internal-provision` with `X-Integration-Secret` (when `AP_PORTAL_URL` + secret are set).
3. Record `provision_status` (`SUCCESS` / `FAILED` / `SKIPPED`). Approval is not rolled back if AP is down — retry via `POST /internal/applications/{id}/provision`.

Default path is **AP-only** (no Client Portal users). Alias default: `{account-id}@df.symantum.com`.

## Earlier foundation

- Durable Pilot, production, and Contact records.
- Opaque `APP-*` and `INQ-*` references.
- Versioned consent capture.
- Hashed, expiring, single-use work-email verification tokens.
- Application lifecycle and audit events.
- Protected internal review-state transitions.
- Database-backed idempotency and source-hashed rate limiting.
- Local email outbox with a Postmark adapter ready for later credentials.
- Disabled development bot adapter with Turnstile verification ready for later credentials.
- Production startup guards that reject missing email, bot, secret, or migration configuration.

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

## DigitalOcean staging

See **[DEPLOY_DO.md](./DEPLOY_DO.md)** for creating a separate App Platform service at
`https://onboarding.symantum.com` without changing the live AP Portal app.

Use `ENVIRONMENT=staging` until Postmark and Turnstile are configured; then switch to
`ENVIRONMENT=production`.

## Tests

```powershell
pytest -q
```
