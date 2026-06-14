---
name: Course rebrand hotspots
description: Non-text places that hold stale branding when converting this course app to a new subject in place
---

# Course rebrand hotspots

When converting this course app to a new subject "in place", a plain text grep for the old subject misses several non-obvious spots. Sweep ALL of these, not just lecture/UI copy:

- **Logo SVG** `artifacts/qr-course/public/logo.svg` — the `aria-label` carries the old name.
- **Sidebar initials** — the demo `VideoTemplate.tsx` sidebar renders hardcoded 2-letter initials (e.g. "EP" for Evolutionary Psychology); update to the new name's initials.
- **Demo scene hardcoded numbers** — `qr-course-demo` Scene6 (and similar) hardcode assignment problem counts and titles. These must match the seed truth (e.g. HW=4/4, Unit Test=8, Final=4), or the demo contradicts the live app.
- **`.replit-artifact/artifact.toml` titles** — all artifacts (course + every demo video) carry an old `title`. Update via `verifyAndReplaceArtifactToml` (temp-file flow), never edit the toml directly.
- **Demo-video scene CONTENT is its own rebrand pass** — `course-promo`, `diagnostics-demo`, `qr-course-demo` hold old branding in `index.html`, `YOUTUBE_DESCRIPTION.md`, `VideoTemplate.tsx`, and `video_scenes/Scene*.tsx`. Rebranding their titles is cheap; rebranding the rendered scene scripts/visuals is a substantial separate effort — treat it as a follow-up, not part of the course-app conversion.
- **Living docs** — `replit.md`, `README.md` (kept in sync with replit.md), and `BLUEPRINT.md` all describe the product by name AND by architecture; an in-place model change (e.g. homework-only, inverted grading, endpoint shapes) must update BLUEPRINT's API/route/domain tables, not just the name.

**Why:** these conversions have drifted across several subjects; each pass left non-text branding behind, and a code review caught them only after the text sweep looked clean.

**How to apply:** after the text rebrand, run a wide stale-term sweep that includes old taglines/concept phrases, then explicitly check the four spots above. A fresh/empty DB also needs `pnpm --filter @workspace/db run push` before the seed's self-healing reseed can run (it errors with `relation "topics" does not exist` otherwise).
