# DocFlow Client Onboarding Plan

**Status:** Phases 1–4 foundation complete; Phase 5 acceptance next  
**Product owner:** Symantum  
**Last updated:** 18 September 2026  
**Source of truth:** This document governs the public website, client onboarding, and the hand-off to AP Portal and CSA Portal.

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

- **SymantumWeb** is the public marketing, application, and onboarding entry point.
- **AP Portal** is Symantum's internal document-processing and human-validation workspace.
- **CSA Portal** is the authenticated client-facing portal for profile, account, settings, analytics, and enabled client services.
- Public forms must not write independently to both portal databases.
- A server-side onboarding service must control approval and provisioning.

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

Planned dropdown:

- My Profile
- Organisation
- Workflow & Integrations
- Team & Access
- Plan & Usage
- Billing
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
- [ ] Complete a visual desktop and mobile browser walkthrough of Navbar, footer, and Client Login.
- [x] Submit local test Pilot, Get Started, and Contact applications against the Onboarding API (outbox mode).
- [x] Confirm the website keeps an honest unavailable path when `VITE_ONBOARDING_API_URL` is unset.
- [x] Review the existing uncommitted working tree; exclude unrelated docs, Office temp files, secrets, and local databases.
- [x] Decide GitHub repository naming/remote for SymantumWeb before commit.
  - Confirmed: `symantum/DocFlow-Website`
- [ ] Commit only intended website and onboarding-plan files after approval.
- [ ] Push to Vercel for website deployment only after approval.

Local acceptance evidence recorded on 18 September 2026:

- Website production build passed.
- Onboarding API tests: 4 passed.
- Local intake references created: Pilot `APP-*`, production `APP-*`, Contact `INQ-*`.
- No Git remote is currently configured on SymantumWeb.

Phase 5 may continue with repository setup, selective commit, and Vercel deploy readiness. Full public form go-live still depends on the Phase 4 provider blockers above.

### Phase 6 — CSA security and account experience

- Secure authentication and tenant isolation.
- Implement invitations, reset, verification, and MFA.
- Introduce generic account/profile presentation.
- Replace Account navigation with the user dropdown.
- Enforce subscriptions and roles.

### Phase 7 — AP generalisation

- Introduce Account ID relationship.
- Separate workspace and integration configuration.
- Move CAAPS identifiers into a CAAPS profile.
- Support AP-only provisioning.
- Secure service endpoints.

### Phase 8 — Provisioning and data integration

- Implement the onboarding coordinator.
- Provision AP and/or CSA according to subscription.
- Configure routing, storage, integration, and delivery.
- Connect verified AP outputs to CSA where enabled.
- Implement pilot expiry and full-account conversion.

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
2. Which durable system owns applications and canonical Account IDs?
3. What human-readable Account ID format should be used?
4. Which service stores consent and application-review history?
5. Which bot-protection and email-verification providers will be used?
6. Is billing required for the first production onboarding release?
7. At which AP lifecycle event should verified invoice data become visible in CSA?

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

