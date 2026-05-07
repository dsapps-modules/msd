# Kilocao Audit And Roadmap

## Executive Summary

This codebase is a commercial starter kit split across three applications:

- `backend`: Laravel 12 API with modular HMVC structure
- `frontend`: Flutter customer app targeting mobile and web
- `admin`: Next.js-style admin/seller panel source tree

It is usable as a starting point, but it is not publish-ready yet. The highest-risk blockers are:

- incomplete admin project scaffold
- insecure defaults and sensitive-data exposure in the backend
- Stripe secret usage from the Flutter client
- no real automated regression coverage
- weak environment/configuration strategy for multi-environment deployment

## Confirmed Findings

### Critical

1. Flutter client contains a direct Stripe secret-based payment flow.
   - File: `frontend/lib/data/sirvice/common_repository.dart`
   - Impact: a secret key can be shipped to the client if configured, which breaks payment-gateway security boundaries.
   - Status: partially hardened by removing hardcoded defaults and requiring explicit configuration. Still requires backend-owned mobile payment intent flow before production release.

2. Admin project is incomplete.
   - Missing root project files such as `package.json`, `tsconfig`, lockfile, and Next config.
   - Impact: the panel is not reproducible or deployable as-is.
   - Status: basic missing imports were restored with `admin/src/env.mjs` and `admin/src/lib/constants.ts`, but the full scaffold still needs recovery.

3. Stripe webhook route for order payments was nested under customer auth.
   - File: `backend/routes/api.php`
   - Impact: Stripe server-to-server callbacks could fail in production.
   - Status: corrected.

### High

1. Backend resources exposed verification and identity-linked fields.
   - Files:
     - `backend/app/Http/Resources/Customer/CustomerDetailsResource.php`
     - `backend/app/Http/Resources/Seller/SellerDetailsResource.php`
   - Impact: unnecessary data exposure to clients and admin consumers.
   - Status: corrected for verification token, Firebase token, and social IDs.

2. HMAC signing used an insecure default fallback secret.
   - Files:
     - `backend/config/hmac.php`
     - `backend/app/Http/Middleware/VerifyHmacSignature.php`
     - `backend/app/Http/Controllers/Api/V1/HmacGenerateController.php`
   - Impact: predictable integrity mechanism if environment setup is weak.
   - Status: corrected. Missing configuration now fails closed.

3. CORS allowed `*` by default while credentials support was enabled.
   - File: `backend/config/cors.php`
   - Impact: unsafe default for browser-based clients.
   - Status: corrected to a local-dev allowlist. Production domains must still be defined explicitly.

### Medium

1. Backend `.env.example` was encouraging insecure defaults.
   - `APP_DEBUG=true`
   - `ALLOWED_ORIGINS=` with wildcard fallback in config
   - Status: corrected in template.

2. Admin auth cookies are JS-readable and cannot be `HttpOnly`.
   - Files:
     - `admin/src/modules/users/users.action.ts`
     - `admin/src/modules/core/base.service.ts`
   - Impact: XSS still implies session theft.
   - Status: partially hardened with `sameSite=strict` and `secure` in HTTPS contexts. Proper fix requires server-managed auth cookies.

3. Frontend configuration is not deployment-friendly.
   - File: `frontend/lib/config/api_urls.dart`
   - Impact: environment switching and white-label delivery are fragile.
   - Status: moved to `String.fromEnvironment` for base URL and external keys.

## Test Strategy Added

### Backend

PHPUnit regression tests were added for:

- sensitive resource exposure
- CORS default hardening
- HMAC secret fallback removal
- Stripe webhook auth placement

Files:

- `backend/tests/Unit/ApiResourceExposureTest.php`
- `backend/tests/Unit/SecurityConfigurationTest.php`

### Frontend Web

Because Flutter SDK is not installed in this environment, full browser execution was not possible here. A route-aware smoke/E2E harness was added instead:

- route manifest extractor from `app_routs.dart`
- node-based regression test for route classification
- Playwright scaffold for deep-linkable routes

Files:

- `frontend/e2e/route-manifest.mjs`
- `frontend/e2e/route-manifest.test.mjs`
- `frontend/e2e/playwright.config.mjs`
- `frontend/e2e/tests/public-routes.spec.mjs`

Validated locally in this workspace:

- `node --test frontend/e2e/route-manifest.test.mjs`

Not validated here:

- Playwright execution
- Flutter web build
- authenticated page journeys
- routes that depend on `state.extra`

## Roadmap To Publish As A Real E-commerce

### Phase 0: Stabilize The Base

1. Recover or recreate the full admin project scaffold.
2. Run dependency installation and make all three apps boot locally.
3. Introduce environment matrices for local, staging, and production.
4. Replace client-side Stripe secret flow with backend-owned payment intent/session APIs.

### Phase 1: Domain Alignment

1. Define the client's catalog model:
   - product types
   - stock behavior
   - shipping rules
   - seller model or single-store model
2. Freeze the minimum viable checkout:
   - address rules
   - payment methods
   - fiscal/tax requirements
   - refund and cancellation policy
3. Decide what is optional versus mandatory for launch:
   - wallet
   - live chat
   - multi-vendor
   - blog
   - support tickets

### Phase 2: Platform Hardening

1. Add migrations/seeders for deterministic test data.
2. Add API contract tests for auth, checkout, payment, and order status.
3. Add browser E2E for public catalog, auth, cart, checkout, and account flows.
4. Add observability:
   - structured logs
   - queue failure alerts
   - payment/webhook monitoring

### Phase 3: Productization

1. Rework theming for the client's brand.
2. Build extension points instead of editing core flows ad hoc:
   - backend modules/services
   - frontend feature slices
   - admin module boundaries
3. Introduce release gates:
   - schema review
   - API compatibility review
   - smoke/E2E pass
   - security checklist

## Extension Guidelines

Use this base as a platform, not as a frozen template:

1. Add new business features behind explicit contracts.
   - backend request/resource/service first
   - frontend consumption second
   - admin operational surface third

2. Keep feature ownership cross-app.
   - every new capability should declare impact on backend, customer app, admin panel, and tests

3. Avoid storing secrets in clients.
   - all payment, webhook, and signing secrets stay server-side

4. Standardize new routes and states.
   - deep-linkable screens should not depend on invisible runtime extras unless unavoidable

5. Prefer feature modules over scattered edits.
   - this reduces regression risk as customizations increase
