---
name: Google login canonical file
description: User-mandated Google OAuth implementation rules for this project
---

The owner mandates REAL Google OAuth (passport-google-oauth20) — never Clerk, never Replit Auth. The server implementation is a user-supplied canonical `auth.ts` that must be copied verbatim; only app-specific values may change (callback path, fallback prod domain, trustedHosts, localhost port).

**Why:** Emphatic repeated user instruction; the canonical file is a known-working implementation shared across the owner's apps.

**How to apply:**
- All login code stays in ONE file per app (server `auth.ts`, frontend `auth.tsx`).
- Callback path must be `/api/auth/google/callback` here — the shared proxy routes only `/api` to the api-server, so the un-prefixed path never reaches it.
- Registered OAuth domains: basicconstructivereasoning.xyz, babyconstructivereasoning.xyz, baby-constructive-reasoning.replit.app (+ www variants), each with both `/auth/google/callback` and `/api/auth/google/callback` redirect URIs in the owner's Google console.
- Dev-preview login fails with redirect_uri_mismatch unless the current `REPLIT_DEV_DOMAIN` callback is also registered in the Google console.
- The monorepo compiles with `noImplicitReturns`; the canonical logout handler's `return res.status(500).json(...)` must be restructured to `res...; return;`.
- Admin analytics (`/api/admin/visits`) gate on hardcoded ADMIN_EMAIL johnmichaelkuczynski@gmail.com inside the canonical file.
