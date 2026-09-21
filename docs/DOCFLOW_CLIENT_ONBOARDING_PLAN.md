# DocFlow Client Onboarding Plan

**Status:** **Phase 8A + 8B + E2E coordinator path complete** (Approve→provision, CSA when not ap_only, pilot convert, delivery_mode). Next day: **#3 Postmark/Turnstile/DNS**. Website visual polish parked until after go-live plumbing. Phase 7 AP foundation complete. Phase 6 Client Portal foundation complete (6B/MFA parked).  
**Product owner:** Symantum  
**Last updated:** 21 September 2026  
**Source of truth:** This document governs the public website, client onboarding, and the hand-off to AP Portal and CSA Portal (presented as DocFlow Operations Portal and DocFlow Client Portal).

---

## 1. Purpose

Define a generic, secure client journey from the Symantum website through:

1. A 30-day DocFlow pilot request.
2. Full production onboarding.
3. Account activation and client login.
4. Provisioning into AP Portal, CSA Portal, or both according to the subscribed services.

The public website must describe DocFlow as a general digital operations platform. CAAPS is one supported integration, not the identity model or default presentation for every client.

---

## 2. Confirmed Product Decisions

### 2.1 System responsibilities

- **SymantumWeb** (`symantum/DocFlow-Website`) is the public marketing, application, and onboarding entry point.
- **DocFlow Operations Portal** (technical repo/deploy: AP_Portal) is Symantum's internal document-processing and human-validation workspace.
- **DocFlow Client Portal** (technical repo/deploy: CSA_Portal) is the authenticated client-facing portal for profile, account, settings, analytics, plan/invoices, and enabled client services.
- Public forms must not write independently to both portal databases.
- A server-side onboarding service must control approval and provisioning.
- First-release commercial posture: low barrier to apply; clients still **choose** production services; Client Portal modules stay **open** until Essentials-specific pages exist; avoid org-size or volume bars as entry gates.

### 2.2 Public identifiers

- An **Application ID** is generated when a Pilot or Get Started request is accepted.
- An **Account ID** is generated only after Symantum approves the organisation.
- Account ID is the generic organisation reference displayed to clients.
- Login uses a verified email identity, not Account ID.
- Internal database primary keys are not exposed as business identifiers.
- Account IDs must be opaque, stable, non-sequential, and safe to quote in support and billing correspondence.

Example public reference:

```text
Application ID: APP-7N4K2M
Account ID: DF-8K4M2P
```

### 2.3 Integration identifiers

- `client_code` must not be the universal public account identity.
- A CAAPS client code belongs only to a CAAPS integration profile.
- Other connectors may hold their own external identifiers.
- Any DocFlow-controlled internal routing identifier should be named **Routing Code** or **Workspace Code**.
- Integration identifiers are namespaced by connector so identical values cannot collide across systems.

**Confirmed (18 September 2026):** At go-live, organisation identity must unify on **DocFlow Account ID** as DocFlow product IP — not a copy of CAAPS job/requirements identity. Existing CAAPS `client_code` values remain valid **integration/workspace** identifiers under that Account (two jobs may share operational codes today; the public/business account model does not inherit CAAPS IP). Compatibility may keep using shared operational codes internally until Account ID is wired end-to-end; new clients must not be marketed or keyed publicly as CAAPS-style codes.

Conceptual structure:

```text
DocFlow Account
  Account ID: DF-8K4M2P
  Organisation: Example Construction Pty Ltd
  Subscription: AP Automation
  Processing Workspace
    Integration: CAAPS
    CAAPS Client Code: DESA
```

### 2.4 Account creation

- Pilot and Get Started are application flows, not immediate self-service account creation.
- Public submission creates an application only.
- Email verification is required before internal review.
- AP/CSA resources are provisioned only after approval.
- No applicant may join an existing organisation merely by knowing an Account ID, client code, or organisation name.

### 2.5 AP-only clients

AP-only service is supported.

An AP-only client receives:

- A DocFlow Account ID.
- An AP processing workspace.
- Document intake and routing configuration.
- Storage, retention, integration, and delivery configuration.
- Delivery through CSV, SFTP, API, email, or another approved channel.

An AP-only client does not automatically receive:

- A CSA tenant.
- CSA analytics.
- CSA credentials.
- An AP operator login.

AP Portal remains an internal Symantum system. Any future client participation in processing must use a separately designed, restricted client role or workspace.

### 2.6 Public pricing

- The website presents a transparent DocFlow pricing model through a dedicated `/pricing` page.
- Pricing is visible from the main navigation, footer, Pilot journey, and Get Started journey.
- DocFlow is presented as a managed BPaaS service rather than a generic software licence.
- Public pricing explains service components, inclusions, and the factors that determine a quotation.
- The initial release does not publish unvalidated fixed dollar amounts.
- Pricing navigation presents two entry paths: **Complimentary 30-Day Pilot** and **Production Service Pricing**, each with its own focused page.
- A qualified pilot carries no fee within its agreed document allowance, workflow, capabilities, and success criteria.
- Complimentary pilots are subject to qualification, limited to one per organisation, and exclude complex integration or additional scope unless separately quoted.
- Pilot eligibility and scope are confirmed in writing before commencement.
- Production proposals identify included volume, additional usage charges, module scope, and one-off implementation costs.
- Genuine starting prices or ranges may be published after pilot operating costs have been validated.

### 2.7 Product and portal naming

- **DocFlow Automation** and **DocFlow Analytics** are the primary public commercial capabilities for the first release.
- **DocFlow Assurance** on the public website describes the integrity architecture behind Automation; it is not a mandatory first-release subscription package.
- DocFlow is positioned as a managed digital operations platform operated by Symantum for outcomes, not software the client must configure and run.
- Client Portal access provides account information, subscribed outputs, and Analytics when entitled; it does not make clients operators of the processing platform.
- The internal AP_Portal application will be presented to operators as the **DocFlow Operations Portal** when its user interface is generalised.
- CSA_Portal will be presented to clients as the **DocFlow Client Portal**.
- Repository names, deployment identifiers, and existing domains may remain unchanged during the branding transition.
- The public website must not expose AP_Portal or CSA_Portal as product names.

### 2.8 First-release service tiers

Initial production subscriptions:

1. **Automation Delivery** — Automation plus sync/delivery only. No Client Portal login.
2. **Client Essentials** — Automation plus sync plus Client Portal basic services: monthly spend summary, delivery/status visibility, and CSV result download.
3. **Client Intelligence** — Automation plus sync plus Client Portal plus full Analytics on verified data.

Account and Analytics isolation rules:

- Default: one DocFlow Account ID equals one Client Portal tenant and one Analytics scope.
- CAAPS codes such as AhrensCAAPS or DESA are integration/workspace identifiers, not Account IDs.
- Separate organisations receive separate Accounts and separate Analytics.
- Combined Analytics across multiple CAAPS codes is allowed only when they belong to one approved organisation Account.

### 2.9 Assurance architecture versus later Assurance Reporting

Assurance has two meanings and must not be conflated:

- **Assurance architecture** is part of every Automation engagement. It includes controlled extraction, contextual checks, human confirmation, and verified delivery. This is not optional and is not sold separately in the first release.
- **Assurance Reporting** is a later optional add-on for client-facing evidence packs. It is deferred for later consideration and is not required for first-release subscription selection.

Assurance Reporting would present evidence from the end-to-end DocFlow cycle. It does not replace Automation, Analytics, or the Operations Portal. It answers whether delivered data can be trusted and defended.

Deferred Assurance Reporting content structure:

1. **Control Summary** — verification gates run for the period, operator confirmation, and delivery completion.
2. **Exception Register** — held, corrected, rejected, or reworked documents with reason codes and resolution status.
3. **Integrity Outcomes** — verified-to-delivery, exception, correction, and open-exception measures.
4. **Audit Trail Extract** — who confirmed what, when, and which values changed before release.
5. **Delivery Evidence** — what was delivered, when, by which channel, and against which report/package reference.
6. **Data Handling Statement** — retention, residency, access boundary, and confirmation that clients do not operate AP processing.
7. **Period Attestation** — short statement that the period’s delivered data passed DocFlow integrity controls.

Keep out of Assurance Reporting:

- Spend trends, vendor ranking, and budget alerts → Analytics.
- Operator work queues and Registry actions → Operations Portal.
- Raw unverified extraction dumps.

---

## 3. Website Entry Points

### 3.1 Request a DocFlow Pilot

**Target route:** `/pilot`  
**Purpose:** Apply for a controlled 30-day DocFlow pilot.

The Pilot page combines the operating-model explanation and pilot application in one journey.
Pilot CTAs link directly to the on-page `#pilot-request` form. Applicants are not sent through the
general Contact form.

The Pilot is presented as complimentary only within a qualified, written scope. The public journey
must not imply unrestricted processing, production integration, or automatic acceptance.

Journey:

```text
Pilot form
→ Application ID
→ Work-email verification
→ Symantum qualification
→ Approval
→ Pilot provisioning
→ Secure activation invitation
→ PILOT_ACTIVE
```

The pilot application should capture:

- Organisation and authorised contact.
- Work email.
- Country and operating locations.
- Estimated monthly document volume.
- Current document workflow and primary friction.
- Requested DocFlow capabilities.
- Accounting or target business system.
- Preferred intake and delivery methods.
- Pilot objective and desired start period.
- Privacy and terms consent.

It must not request production passwords, OAuth credentials, API secrets, SFTP passwords, or CAAPS codes.

### 3.2 Get Started

**Target route:** `/get-started`  
**Purpose:** Request full production onboarding.

Journey:

```text
Onboarding form
→ Application ID
→ Work-email verification
→ Symantum review
→ Commercial/operational approval
→ Production provisioning
→ Secure activation invitation
→ FULL_ACTIVE
```

The initial form remains concise. Sensitive integration, billing, and security details are collected after approval through authenticated activation.

The form should capture:

- Organisation and authorised contact.
- Requested services.
- AP-only or AP plus Client Portal preference.
- Estimated volume and operating locations.
- Current intake method.
- Accounting or target business system.
- Integration type: CAAPS, Xero, CSV, SFTP, API, Other, or Undecided.
- Preferred commencement period.
- Privacy and terms consent.

Applicants do not enter or select their Account ID.

### 3.3 Client Login

**Current destination:** `https://csa.symantum.com/login`  
**Purpose:** Authenticate an already activated client.

Client Login is not a public registration path. The login experience must eventually support:

- Email/password or approved identity-provider authentication.
- Password reset.
- Multi-factor authentication.
- Invitation activation from a valid single-use token.
- Account-aware routing based on subscriptions and roles.

AP-only clients without a client portal do not receive CSA credentials. A generic Account Centre for those clients is a future product decision; until then, their service is operated and delivered through the agreed external channel.

### 3.4 Contact Us

**Target route:** `/contact`  
**Purpose:** General enquiries and existing-client support.

Contact Us does not create an onboarding application unless the user explicitly selects a Pilot or production-onboarding intent.

### 3.5 Pricing

**Target route:** `/pricing`  
**Purpose:** Explain how DocFlow engagements are priced before an applicant submits a request.

The page presents:

- Managed AP Automation as an ongoing volume- and complexity-based service.
- Analytics and Assurance as optional capabilities priced by scope.
- Integration and onboarding as a one-off, complexity-based component.
- The operational factors used to prepare an estimate.
- A primary route to `/get-started` for a pricing estimate.
- A secondary route to `/pilot` for a controlled 30-day engagement.

Public pricing transparency does not require immediate online checkout, self-service activation, or public fixed dollar amounts.

The Pricing Navbar item uses an **Engagement Options** dropdown:

- **Complimentary 30-Day Pilot** → `/pilot`
- **Production Service Pricing** → `/pricing`

The parent Pricing label continues to open `/pricing`. The production Pricing page may include a
secondary link to the Pilot page, but it does not repeat the Pilot offer or qualification content.

---

## 4. Application and Account Lifecycle

Applications and active accounts are separate records.

Required lifecycle:

```text
APPLICATION_SUBMITTED
→ EMAIL_VERIFICATION_PENDING
→ EMAIL_VERIFIED
→ UNDER_REVIEW
→ APPROVED or REJECTED
→ PROVISIONING
→ PILOT_ACTIVE or FULL_ACTIVE
```

Additional account states:

```text
PILOT_ACTIVE
→ PILOT_EXPIRED
→ CONVERSION_PENDING
→ FULL_ACTIVE
→ SUSPENDED
→ CLOSED
```

Rules:

- Rejected or abandoned applications do not create AP/CSA operational records.
- Provisioning failures remain retryable and auditable.
- Converting a pilot preserves Account ID, organisation identity, workspace configuration, and approved data.
- Entitlements and limits are server-controlled.
- Lifecycle transitions require timestamps and the acting user/service.

---

## 5. Generic Client Profile Model

The account model must not embed CAAPS assumptions in its core identity.

### 5.1 Organisation Account

- Account ID
- Legal organisation name
- Trading name
- Country and timezone
- Primary business contact
- Billing contact
- Security contact
- Account status
- Pilot start/end dates
- Production activation date
- Data residency and retention policy references

### 5.2 People and access

- Verified user identity
- Organisation membership
- Role: Owner, Client Admin, Member, Billing, or Read Only
- Invitation state
- MFA state
- Last login and security audit data

**Confirmed (18 September 2026):** Membership roles are **not** redefined as the production service. People roles answer who may act; service subscription answers what the organisation may use. Legacy CSA `user_group` values (`Individual_User` / `SME` / `Corporate` / `Enterprise`) are compatibility/volume labels only and must not remain the long-term entitlement model. `system_role` remains internal/platform-only.

**Confirmed (18 September 2026) — first release access:** One Client Portal login per organisation, treated as **Owner**-equivalent. Multi-user roles (Client Admin / Member / Billing / Read Only) remain in the model for later scale-up; do not implement multi-role invite/RBAC matrices in the first release.

**Confirmed (18 September 2026) — first release portal openness:** Clients still **choose** production services commercially (Automation Delivery / Client Essentials / Client Intelligence). Until Essentials-specific Client Portal pages are ready, **all activated Client Portal users** receive the full portal module set (Overview, Spending, Insights, Reports, Budgets, Plan/Invoices, Help). Do not gate Insights/Reports on legacy org-size `user_group`. Module enforcement by subscribed service returns when Essentials surfaces are ready. Automation Delivery remains no Client Portal login. Platform `superuser`/`dev` always see the full portal.

### 5.3 Service subscription

Initial supported combinations:

- Automation Delivery
- Client Essentials
- Client Intelligence

Analytics depends on verified operational data and is not treated as an unrelated standalone signup in the initial release. Assurance Reporting remains a later optional add-on and is not part of the first-release subscription matrix.

Subscription controls:

- Enabled modules
- Pilot or production tier
- Volume allowance
- Portal access
- Delivery methods
- Effective and expiry dates

**Confirmed (18 September 2026):** Get Started / provisioning selects the production service. That selection drives entitlements (modules, portal depth, volume). It does not become the user's membership role.

### 5.4 Processing workspace

- Account relationship
- Workspace ID or Routing Code
- Intake configuration
- Processing rules
- Assigned Symantum operational team
- Delivery configuration
- Active/inactive state

### 5.5 Integration profile

Each integration profile contains:

- Connector type
- External identifiers
- Configuration status
- Test status
- Last successful exchange
- Secret reference (never a plaintext secret in a public profile)

Examples:

- CAAPS client/entity code and CSV/SFTP rules
- Xero organisation connection
- Generic CSV mapping
- SFTP destination
- API endpoint and authentication reference

---

## 6. Portal Responsibilities

### 6.1 SymantumWeb

- Present generic DocFlow capabilities.
- Distinguish Pilot from full onboarding.
- Validate and submit public applications.
- Verify applicant email.
- Show honest application confirmation and reference.
- Never collect production connector credentials publicly.

### 6.2 DocFlow Operations Portal (currently AP_Portal)

- Internal intake, extraction, validation, review, reporting, and delivery.
- Maintain operational client/workspace relationships using Account ID.
- Keep connector-specific codes in integration configuration.
- Do not expose internal operator roles through public registration.

### 6.3 DocFlow Client Portal (currently CSA_Portal)

- Client authentication and account activation.
- Personal profile and organisation account.
- Team, access, security, plan, usage, and billing presentation.
- Integration setup where client action is required.
- Analytics and client-facing outputs when subscribed.

The current standalone Account navigation item should be replaced atomically by a dropdown beside the logged-in user's name. Existing routes and deep links remain available.

**Confirmed (18 September 2026):** Do **not** remove Account / Configuration content from CSA. SymantumWeb holds public application only; authenticated profile/org/plan/security stay in the Client Portal. Replace the top-nav **Account** label with the user-name dropdown; keep `/settings` and section hashes.

Planned dropdown:

- My Profile
- Organisation
- Workflow & Integrations
- Team & Access
- Plan & Usage
- Invoices (Option B invoice centre — status + PDF; no card checkout)
- Security
- Settings
- Sign Out

---

## 7. Provisioning Architecture

The browser submits once to the onboarding service. The onboarding service coordinates downstream systems.

Approved provisioning sequence:

```text
1. Generate Account ID
2. Create canonical organisation account
3. Create service subscription and entitlements
4. Create AP workspace when AP Automation is enabled
5. Create CSA tenant and owner invitation when Client Portal is enabled
6. Configure EIP/document routing
7. Configure storage and retention
8. Create integration profile
9. Record every completed or failed step
10. Send activation invitation
```

Requirements:

- Idempotency key for every provisioning request.
- Retryable step status.
- No silent partial success.
- Audit trail for approval and provisioning.
- Server-to-server authentication.
- Canonical, immutable Account ID.
- Explicit AP tenant assignment; never “first tenant” selection.

---

## 8. Security Gates Before Live Account Provisioning

The following are mandatory before public applications can provision live accounts:

- Secure CSA session or token authentication.
- Server-derived tenant and account scope on every protected endpoint.
- Invitation-only owner/member activation.
- Password reset and email verification.
- MFA support.
- Removal of organisation joining by client-code knowledge.
- Role and entitlement enforcement on the server.
- Rate limiting and bot protection on public forms.
- Signed or secret-authenticated CSA/AP service calls.
- Idempotent authenticated AP-to-CSA data delivery.
- Protected activation routes.
- Audit logging.
- Privacy/terms consent versioning.

Until these gates are complete, public forms may create and notify on applications only.

---

## 9. Current-State Gaps

Current status:

- [x] Pilot CTAs route to a dedicated `/pilot` journey.
- [x] Get Started is reserved for production onboarding.
- [x] Pricing is available at `/pricing`.
- [x] The public activation dashboard route has been retired; legacy activation paths redirect to Get Started.
- [x] Client Login opens the DocFlow Client Portal login route and is identified as activated-client access.
- [x] Public forms show success only after a configured intake endpoint returns successfully.
- [x] Missing intake connectivity produces an honest unavailable message with an email fallback.
- Durable server-side intake, Application IDs, verification, and review remain Phase 4 work.
- CSA authentication does not yet provide a durable secure session.
- Several CSA APIs trust caller-provided account/user values.
- Existing-organisation registration is not invitation-controlled.
- CSA-to-AP registration is not protected by robust service authentication.
- AP and CSA use separate identity and database models.
- `client_code` is currently overloaded as an operational identifier.
- AP-to-CSA invoice transfer is incomplete.

---

## 10. Implementation Order

### Phase 1 — Decisions and documentation

- [x] Establish this source-of-truth plan.
- [x] Confirm generic Account ID strategy.
- [x] Confirm CAAPS code is integration-specific.
- [x] Confirm AP-only subscription support.
- [x] Confirm portal responsibilities.
- [ ] Resolve the open decisions in Section 12 before backend provisioning work.

### Phase 2 — Website information architecture

- [x] Add `/pilot`.
- [x] Retarget Pilot CTAs.
- [x] Add `/pricing` and expose it through the Navbar and footer.
- [x] Add contextual Pricing links on the Home and Get Started pages.
- [x] Preserve `/get-started` for production onboarding.
- [x] Keep Client Login for activated clients only.
- [x] Align navigation, footer, Contact, Privacy, and Terms.
- [x] Retire the unsecured public activation-dashboard route.

### Phase 3 — Website forms and presentation

- [x] Embed distinct generic Pilot and Get Started form presentations on their respective journeys.
- [x] Complete the planned Pilot fields and production-onboarding fields.
- [x] Add validation, consent, loading, success, and error states.
- Validate the commercial cost model before publishing any fixed dollar amount or starting-price range.
- [x] Remove unnecessary CAAPS-specific presentation.
- [x] Apply accessible form labels, required-field validation, status announcements, and disabled loading states.
- Complete responsive browser acceptance review.

### Phase 4 — Application intake

- [x] Add an isolated Onboarding API and separate-database schema.
- [x] Add durable Pilot, production-onboarding, and Contact submission endpoints.
- [x] Generate opaque Application IDs and inquiry references.
- [x] Add database-backed idempotency, source-hashed rate limiting, and a Turnstile adapter.
- [x] Add hashed, expiring, single-use work-email verification.
- [x] Add local email outbox, Postmark adapter, audit events, and internal review notification.
- [x] Enforce that application intake does not provision operational accounts.
- [ ] Configure and test live email and bot providers before public deployment.

#### Mandatory provider setup before public deployment

> **Deployment blocker — do not forget:** Phase 4 development may use local adapters, but public
> forms must not go live until transactional email and bot protection are configured and tested.

- [ ] Create a company-controlled Postmark account, or approve an equivalent transactional-email provider.
- [ ] Confirm a monitored transactional sender address with Symantum domain support.
- [ ] Verify the sender domain and publish the required SPF/DKIM records.
- [ ] Store the production email API token only in the Onboarding API environment.
- [ ] Create a Cloudflare account and a `DocFlow Public Forms` Turnstile widget, or approve an equivalent provider.
- [ ] Register production website hostnames in Turnstile.
- [ ] Store the Turnstile site key in website configuration and its secret only in the Onboarding API environment.
- [ ] Verify server-side Turnstile enforcement and production rate limits before enabling submissions.

The provisional address `onboarding@df.symantum.com` must not be adopted until support confirms
that replies will not enter the DocFlow Gateway supplier-document ingestion route. Provider and
sender values remain environment configuration and must not be hard-coded.

### Phase 5 — Local website acceptance and deployment

Phase 5 is the acceptance and release gate for SymantumWeb work completed so far. It is not new feature development.

Checklist:

- [x] Run lint and production build.
- [x] Smoke-test public routes for Home, Automation, Analytics, Data Integrity, Resources, Pricing, Pilot, Get Started, Contact, Privacy, Terms, verify-email, and legacy activation redirect.
- [ ] Complete a visual desktop and mobile browser walkthrough of Navbar, footer, and Client Login (optional before public DNS; use `.vercel.app`).
- [x] Submit local test Pilot, Get Started, and Contact applications against the Onboarding API (outbox mode).
- [x] Confirm the website keeps an honest unavailable path when `VITE_ONBOARDING_API_URL` is unset.
- [x] Review the existing uncommitted working tree; exclude unrelated docs, Office temp files, secrets, and local databases.
- [x] Decide GitHub repository naming/remote for SymantumWeb before commit.
  - Confirmed: `symantum/DocFlow-Website`
- [x] Commit only intended website and onboarding-plan files after approval.
- [x] Connect `symantum/DocFlow-Website` to the existing Vercel project and deploy (`1fd3384` trigger push).
  - Public DNS for `symantum.com` / `www` / `df.symantum.com` deferred until public go-live.
  - Mailboxes `clientN@df.symantum.com` deferred with DNS/mail provider setup.

Local acceptance evidence recorded on 18 September 2026:

- Website production build passed.
- Onboarding API tests: 4 passed.
- Local intake references created: Pilot `APP-*`, production `APP-*`, Contact `INQ-*`.
- Git remote configured: `origin` → `https://github.com/symantum/DocFlow-Website.git`.
- Selective commit pushed: `26fa761` on `master`; Vercel trigger `1fd3384`.

Phase 5 website release path is ready. Deferred until public go-live: custom DNS (`symantum.com` / `www` / `df.symantum.com`), `@df` mailboxes, Postmark/Turnstile.

**Next (21 September 2026):** Tomorrow **#3 Postmark/Turnstile/DNS**. Functional E2E (#1) and Phase 8 remainder (#2) shipped: Approve→provision, CSA when not ap_only, pilot convert, delivery_mode. Website visual polish remains parked. Form smoke: `https://symantum-website.vercel.app`. See `AP_Portal/backend/onboarding/INTAKE_WIRING.md`.

### Phase 6 — CSA / Client Portal security and account experience

**Gate status (18 September 2026):** Foundation **complete** for first-release Client Portal work. Next active build phase is **Phase 7**. Items below marked *parked* are deferred — they do not block starting Account ID / AP generalisation.

#### Phase 6A — Secure sessions + API tenant isolation — complete
- [x] Signed access token on login (`access_token` + HttpOnly `csa_session` cookie).
- [x] `GET /api/me`, `POST /api/logout`; post-login navigate to Overview (blank `/login` shell fixed).
- [x] `get_current_user` dependency; tenant bound via `bind_client_code` (ignore spoofed `client_code` / `user_id`).
- [x] Protect account, Xero, analytics reads with optional `client_code`, budgets, export, invoice-by-uid, vendor APIs.
- [x] `/api/ingest` requires `X-Integration-Secret`; portal CSV ingest uses session auth.
- [x] CORS origins from `CSA_CORS_ORIGINS` (credentials enabled).
- [x] Frontend stores Bearer token and attaches it on `fetch` / axios; session restore via `/api/me`.
- [x] Client-facing product name **DocFlow Client Portal** (header, login, Help, titles); technical `CSA_Portal` repo/deploy names retained.
- [x] Option B Plan & Usage + invoice centre (`/api/account/plan-usage`, `/api/account/invoices`).
- [x] First-release open portal modules (Insights included for activated Client Portal users; commercial service choice retained).
- *Parked polish:* tighten any leftover open GETs; production `CSA_SESSION_SECRET`; ensure AP Portal sends integration secret on ingest.

#### Phase 6B — Role / module enforcement — parked
- First release: one Owner-equivalent login; full Client Portal modules until Essentials pages exist.
- Multi-role RBAC and Essentials-vs-Intelligence **module** enforcement deferred.
- Platform `superuser` / `dev` retain full portal access.
- Open for later: which membership roles may mutate Settings vs read-only (when multi-user ships).

#### Phase 6C — Auth hardening — parked (may resume with Phase 8 activation)
- MFA, invitations, verified password-reset tokens (replace predictable dev reset tokens).
- Further generic account/profile presentation polish beyond dropdown + Plan/Invoices.

#### Phase 6 delivered summary
- [x] Replace Account navigation with the user-name dropdown (`/settings#…` retained).
- [x] Membership roles vs production-service entitlements foundation (login/`/me` payload).
- [x] Sessions + tenant isolation foundation.
- End-to-end subscription enforcement and multi-role routes: **parked** until Essentials surfaces and multi-user are required.

### Phase 7 — AP generalisation — **complete (AP foundation)**

Active focus after Phase 6 foundation. Website auto-provision remains **Phase 8**.

**Non-breaking rule (confirmed):** All existing AP_Portal implementations and behaviours stay intact. Account ID is additive beside `client_code`. Spaces / EIP / CAAPS / watch-folder / export paths continue to use workspace `client_code` until later phases explicitly migrate callers.

Checklist:

- [x] **7A — Account ID column + dual-read** (nullable `docflow_account_id` on `clients`; `core/client_identity.py`; optional on `ClientOut`; migration `d0e1f2a3b4c5`).
- [x] **7A — CAAPS profile scaffolding** (nullable `caaps_profile` JSON; synthesise from legacy `client_code` at read time — live codes not moved).
- [x] **7B — UI IP rename** (Registry / Dashboard / Line Items / Archives: Account / Account ID labels; APIs still use `client_code`).
- [x] **7C — Provisioning contract** (`POST /api/v1/clients/internal-provision` + `core/alias_provision.py`; Account ID + AP client row + optional alias-file append; CAAPS JSON keys preserved).
- [x] **7D — Workspace vs Account naming** (docs/comments; `workspace_code` on provision input; DB column remains `client_code`).
- [x] **7E — AP-only flag** (`ap_only` on `clients` + provision default true; no Client Portal user creation).
- [x] **7F — Secure S2S** (`X-Integration-Secret` / `AP_PORTAL_INTEGRATION_SECRET` on `internal-provision`; localhost still allowed).
- [x] **7G — `user_group` hygiene** (documented: not used for DocFlow Account / EIP routing in new AP work; CSA analytics field unchanged).

### Phase 8 — Provisioning and data integration — **in progress**

- [x] **8A — Coordinator → AP provision** (on `APPROVED`: mint Account ID; call AP `internal-provision`; retry endpoint; `provision_status` on application).
- [x] **8A+ — AP Dashboard Onboarding review tab** (proxy `/api/v1/onboarding/*`; delivery_mode; review before approve).
- [x] **8B — First-release host:** Onboarding API mounted inside AP Portal at `/onboarding` (`ONBOARDING_MOUNT=1` lazy; `ONBOARDING_DATABASE_URL` → `docflow_onboarding`). Separate DO App deferred.
- [x] **Dashboard Approve → provision** (proxy calls coordinator on APPROVED; Retry provision; outbox force-verify for staging).
- [x] **Client Portal provision when not `ap_only`** (`CSA /api/internal/docflow-provision`; coordinator step + outbox credentials email).
- [x] **Delivery beyond default alias** (`delivery_mode` on AP client; csv_deliver prefers SFTP when review chose sftp/email_and_sftp; CSA push skipped for `ap_only`).
- [x] **Pilot expiry + conversion** (`pilot_expires_at` on approve; Convert pilot → production + re-provision).
- Connect richer retention / CAAPS profile / EIP beyond alias still later.
- Resume parked Phase 6C (invitations / MFA) when activation emails are on the critical path (Postmark #3).

---

## 11. Website Deployment Boundary

SymantumWeb may be completed and deployed before automatic AP/CSA provisioning.

For that deployment:

- Pilot and Get Started must create genuine, durable applications or remain clearly unavailable.
- Success must only be displayed after the configured intake API returns successfully.
- Public forms must not create operational portal users directly.
- Existing portal security weaknesses must not be exposed through the website.
- Connector credentials remain an authenticated post-approval activity.
- Public pricing statements must match the written proposal and must not imply self-service activation.
- Any future published starting price must state its currency, tax treatment, included volume, and principal exclusions.

---

## 12. Open Decisions

These items require explicit confirmation before their implementation phase:

1. Should AP-only clients receive a minimal generic Account Centre, or no portal credentials?
2. Which durable system owns applications and canonical Account IDs? *(Phase 7/8 — decide with Account ID ownership.)*
3. What human-readable Account ID format should be used? *(Example in §2.2: `DF-…` — confirm as canonical.)*
4. Which service stores consent and application-review history?
5. Which bot-protection and email-verification providers will be used? *(Public go-live blocker — Phase 4.)*
6. Is billing / payment UI required inside the Client Portal for the first production onboarding release?
   - **Confirmed — Option B:** Plan & Usage plus invoice centre. No card-on-file self-serve checkout.
7. At which AP lifecycle event should verified invoice data become visible in the Client Portal?

---

## 13. Change Control

Update this document whenever a confirmed architectural or workflow decision changes.

Each update must:

- Change the **Last updated** date.
- Update affected decisions and phases.
- Add a revision entry.
- Distinguish confirmed decisions from open questions.
- Avoid documenting credentials, secrets, or client-sensitive values.

### Revision history

- **21 September 2026 — E2E + Phase 8 remainder:** Dashboard Approve now provisions; outbox force-verify; CSA `/api/internal/docflow-provision` when not ap_only; pilot convert; delivery_mode drives SFTP preference; CSA push skipped for ap_only. Next day: Postmark/Turnstile/DNS. Website polish parked.
- **21 September 2026 — #2 Intake wiring complete:** Live `/onboarding/health` ok; CORS for `www.symantum.com` + `symantum-website.vercel.app`; smoke `POST /public-submissions` → `APP-3UY9EGZ6`; Vercel `VITE_ONBOARDING_API_URL` baked on `symantum-website.vercel.app`. Next: #1 website visual polish. DNS/`df` + Postmark/Turnstile still deferred.
- **21 September 2026 — First-release in-AP Onboarding mount:** Chose CSA-style bundle (`AP_Portal/backend/onboarding` → `/onboarding`) instead of a second App Platform app (~$5–24/mo). DB remains separate `docflow_onboarding` on `symantum-pg-prod`. Cancel separate onboarding App if started. Plan remains local until committed.
- **21 September 2026 — Host Onboarding API next; 8A closed:** AP Dashboard Onboarding review tab + proxy shipped; DO AP deploy lessons noted. Next: separate DO app for Onboarding API (`onboarding_api/DEPLOY_DO.md`, `ENVIRONMENT=staging`). AP registry testing unblocked; Onboarding tab waits on hosting. DNS/`df` + Postmark/Turnstile still public go-live. Plan remains local until DocFlow-Website commit.
- **19 September 2026 — Phase 8A started:** Onboarding coordinator on APPROVED mints Account ID and calls AP `internal-provision` (S2S). Client Portal provisioning and pilot conversion remain later Phase 8. Plan remains local.
- **19 September 2026 — Phase 7 complete (AP foundation):** S2S secret on `internal-provision`, `ap_only` flag, workspace_code naming, user_group hygiene documented. Website→provision wiring = Phase 8. Plan remains local.
- **19 September 2026 — Phase 7B/7C:** UI Account / Account ID labels on Operations Portal; `POST /clients/internal-provision` + alias-file append helper. Existing EIP/`client_code` behaviour and CAAPS JSON keys retained. Plan remains local.
- **18 September 2026 — Phase 7A started (non-breaking):** AP_Portal additive Account ID — nullable `docflow_account_id` + `caaps_profile` on `clients`, dual-read helper `core/client_identity.py`, optional `ClientOut.docflow_account_id`. Existing `client_code` EIP/watch/export/CAAPS paths untouched. Plan remains local until explicitly committed.
- **18 September 2026 — Phase 6 parked; Phase 7 next:** Updated plan status — Client Portal foundation complete (sessions, isolation, dropdown, Option B invoices, open modules, DocFlow Client Portal display name). Parked 6B multi-role gating, Essentials module enforcement, and 6C MFA/invites. Active next phase: AP generalisation (Account ID, CAAPS profile, AP-only). Plan remains local until explicitly committed to DocFlow-Website.
- **18 September 2026 — First-release open Client Portal:** Commercial service choice retained; portal modules fully open for activated Client Portal users until Essentials-specific pages exist. Legacy org-size tiers no longer hide Insights. Plan kept local; CSA entitlements updated.
- **18 September 2026 — CSA billing Option B:** Confirmed Plan & Usage plus invoice centre (list, due dates, paid/unpaid, PDF). Net-14 style terms; Automation unit-based, Analytics monthly, Assurance optional add-on. No card-on-file checkout. APIs `/api/account/plan-usage` and `/api/account/invoices` added.
- **18 September 2026 — Account ID + first-release access:** Confirmed go-live org identity unifies on DocFlow Account ID (DocFlow IP; CAAPS codes stay integration/workspace only). First-release Client Portal = one Owner-equivalent login per client; multi-role later. Billing/payment UI in CSA still open — advisory options recorded under Open Decision #6.
- **18 September 2026 — Phase 6A sessions + isolation:** Added CSA signed access tokens, `/api/me`/`/api/logout`, tenant-bound `client_code`/`user_id`, protected account/Xero/analytics/budget/export routes, ingest integration secret, and frontend Bearer attachment. Role-route enforcement deferred pending clarification (Phase 6B).
- **18 September 2026 — Phase 6 access model confirmed:** Membership roles (Owner / Client Admin / Member / Billing / Read Only) stay separate from production services (Automation Delivery / Client Essentials / Client Intelligence). CSA Account content retained; top-nav Account replaced by user-name dropdown. Entitlements foundation added in CSA_Portal.
- **18 September 2026 — Assurance Reporting deferred:** Clarified Assurance architecture as baseline Automation integrity; recorded first-release tiers as Automation Delivery, Client Essentials, and Client Intelligence; retained Assurance Reporting structure for later add-on consideration.
- **18 September 2026 — Phase 5 local acceptance:** Completed production build, route smoke checks, local Pilot/production/Contact intake tests, and working-tree review; remaining steps are Git remote decision, selective commit, and Vercel deploy after approval.
- **18 September 2026 — Phase 5 gate clarified:** Defined Phase 5 as local acceptance, selective commit, and deployment readiness, while keeping live email/bot providers as public go-live blockers.
- **17 September 2026 — Homepage focus:** Removed the redundant Homepage Pricing panel and consolidated the managed-platform positioning in the final CTA.
- **17 September 2026 — Managed-service positioning:** Clarified across Home and Resources that Symantum operates DocFlow for client outcomes rather than providing client-operated software.
- **17 September 2026 — Resources navigation:** Refined the Resources dropdown to three focused destinations: Company Journey, Managed Digital Operations, and Decision Frameworks; general Contact remains a separate website entry point.
- **17 September 2026 — Phase 4 foundation:** Added the isolated Onboarding API, separate schema and migration, durable public intake, opaque references, idempotency, source-hashed rate limiting, verification lifecycle, audit trail, local outbox, and deferred Postmark/Turnstile adapters without operational account provisioning.
- **17 September 2026 — Phase 4 provider blocker:** Recorded the mandatory Postmark-equivalent and Turnstile-equivalent account, DNS, secret, hostname, and sender-routing setup required before public deployment.
- **17 September 2026 — Phase 3 form presentation:** Completed generic Pilot, production-onboarding, and Contact fields with consent, validation, loading, success, and error states; success now requires a configured intake API response.
- **17 September 2026 — Portal presentation names:** Confirmed DocFlow Operations Portal for internal operators and DocFlow Client Portal for clients while retaining technical repository and deployment names.
- **17 September 2026 — Separate pricing destinations:** Focused `/pilot` on the complimentary pilot and `/pricing` on production service pricing, removing the duplicated Pilot pathway from the production page.
- **17 September 2026 — Pricing navigation:** Added a two-option Pricing dropdown for direct access to the complimentary Pilot and Production Service Pricing pathways while retaining the complete Pricing page.
- **17 September 2026 — Pricing pathways:** Divided Pricing into a qualified Complimentary 30-Day Pilot and Production Service Pricing, with explicit allowance, eligibility, integration, and additional-scope conditions.
- **17 September 2026 — Integrated Pilot journey:** Embedded the pilot-request presentation directly on `/pilot`, linked Pilot CTAs to the on-page form, and restored Contact to general enquiries and support.
- **17 September 2026 — Phase 2 information architecture:** Added the dedicated Pilot journey, separated Pilot from production onboarding, retargeted public CTAs, aligned login and legal entry points, and retired the public activation-dashboard route.
- **17 September 2026 — Public pricing decision:** Confirmed a dedicated public Pricing page with transparent service components and pricing factors, while deferring fixed dollar amounts until pilot costs are validated.
- **17 September 2026 — Phase 1 baseline:** Established generic Account ID, integration-specific CAAPS identifiers, distinct Pilot/Get Started/Login journeys, AP-only support, portal boundaries, lifecycle, security gates, and implementation order.

