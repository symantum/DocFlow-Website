# Host DocFlow Onboarding API on DigitalOcean

> **First release:** Prefer bundling into the **existing** AP App at `/onboarding`
> (`AP_Portal/backend/onboarding/`) — **no second App**, no extra monthly container bill.
> Cancel any in-progress separate onboarding App create if you started one for cost reasons.
>
> The rest of this file is the **optional later** split (own App at `onboarding.symantum.com`).

## Optional later: separate App (staging)

AP Portal team can keep testing — this would be a **new** App, not a change to `symantum-ap-api`.

## Goal

- Public base URL: `https://onboarding.symantum.com`
- Environment: `ENVIRONMENT=staging` (outbox email + bot disabled until Postmark/Turnstile)
- Separate Postgres database: `docflow_onboarding` on the existing Sydney cluster

## 1. Database (DO Managed Postgres)

In the existing cluster console (or `psql` as admin):

```sql
CREATE ROLE docflow_onboarding LOGIN PASSWORD '<generate-strong-password>';
CREATE DATABASE docflow_onboarding OWNER docflow_onboarding;
```

Connection string shape for App Platform:

```text
postgresql+psycopg://docflow_onboarding:<password>@<host>:25060/docflow_onboarding?sslmode=require
```

Trusted sources: allow the new App (or the DO VPC / App Platform) like AP already does.

## 2. Create the App

Option A — UI:

1. DO → Create → Apps → GitHub `symantum/DocFlow-Website`
2. Source directory: `onboarding_api`
3. Dockerfile autodetect (`onboarding_api/Dockerfile`)
4. HTTP port `8080`, health check `/health`
5. Region **Sydney**

Option B — spec: use `.do/app.yaml` as a checklist (fill secrets in UI; do not commit secrets).

## 3. Runtime env (staging)

| Key | Value |
|---|---|
| `ENVIRONMENT` | `staging` |
| `AUTO_CREATE_TABLES` | `false` |
| `DATABASE_URL` | (secret) Postgres URL above |
| `APP_SECRET` | new `secrets.token_urlsafe(32)` |
| `INTERNAL_API_KEY` | same value you will put on AP as `ONBOARDING_INTERNAL_API_KEY` |
| `ALLOWED_ORIGINS` | Vercel preview + later `https://df.symantum.com` |
| `PUBLIC_WEBSITE_URL` | preview or `https://df.symantum.com` |
| `EMAIL_PROVIDER` | `outbox` |
| `BOT_PROVIDER` | `disabled` |
| `AP_PROVISION_ENABLED` | `true` |
| `AP_PORTAL_URL` | `https://api.ap.symantum.com` |
| `AP_PORTAL_INTEGRATION_SECRET` | same as AP DO |
| `EMAIL_ALIAS_DOMAIN` | `df.symantum.com` |

Entrypoint runs `alembic upgrade head` then uvicorn.

## 4. Custom domain

App → Settings → Domains → `onboarding.symantum.com`  
At DNS: CNAME (or DO’s instructed record) → the App hostname.

Confirm: `GET https://onboarding.symantum.com/health` → `{"status":"ok"}`.

## 5. Wire AP Portal (only after step 4)

On the **existing** AP App (short restart; registry stays available after):

```text
ONBOARDING_API_URL=https://onboarding.symantum.com
ONBOARDING_INTERNAL_API_KEY=<same as INTERNAL_API_KEY>
```

## 6. Wire website (when ready)

Vercel: `VITE_ONBOARDING_API_URL=https://onboarding.symantum.com`  
Add the Vercel origin to `ALLOWED_ORIGINS`.

## 7. Later → production

When Postmark + Turnstile are ready: set `ENVIRONMENT=production`, `EMAIL_PROVIDER=postmark`, `BOT_PROVIDER=turnstile`, and the provider secrets. Staging must not stay as the public form backend without bot/email.
