# 🧭 Constructive Critical Reasoning

**A One-Unit Course That Trains You to Draw the Strongest Conclusion the Data Actually Supports — Taught, Tutored, Drilled, and Graded by AI**

---

## 🧩 Overview

Constructive Critical Reasoning (CCR) is a self-paced, single-user web course that teaches the discipline of **committing to the richest, most-falsifiable conclusion a body of evidence will bear** — the opposite of reflexive skepticism. No math, coding, or technical background required.

CCR inverts the usual grading instinct. Most "critical thinking" rewards caution: the more hedged the answer, the safer it feels. Here, hedging is the failure mode. The **richest, most-falsifiable, most-committed model earns top credit**; the cautious *"you can't really conclude anything"* dodge earns near-zero; florid padding that binds no data scores low; and a bold claim the data actively defeats also earns zero. Every question rewards committing harder to the most, while exposing the cleanest disconfirming test.

The curriculum is organized into **one unit and 8 sections**: 1.1 The Fecund Lead; 1.2 Model Selection by Explanatory Yield; 1.3 Parsimony as a Live Constraint; 1.4 Abductive Commitment; 1.5 From Correlation to Mechanism; 1.6 The Anomaly Cluster; 1.7 The Cheap Decisive Test; and 1.8 Calibrated Boldness.

Designed for **middle schoolers, curious adults wanting brief but meaningful exposure, instructors evaluating AI-taught coursework, and researchers studying AI academic integrity**, CCR pairs a real curriculum with two layers of AI-authorship detection — surfacing not just *whether* the writing looks AI-generated, but whether the *act of producing it* did.

---

## 🧠 What It Does

- **One-Unit Structured Curriculum** — A complete plain-language reasoning syllabus across 8 sections. Each section ships with a lesson and one graded homework. There is no separate test, midterm, or final — homework is the graded model.
- **Three-Depth Lessons** — Every lesson is available at **Short / Medium / Long** length, AI-rewritten while preserving the same examples and learning objectives.
- **Section-Scoped AI Tutor** — Ask a question about the paragraph you're reading and the answer streams back token-by-token, grounded in that exact lecture section. Suggested starter questions are pre-generated per lecture.
- **One Homework Per Section, Your Format** — Each section's homework is offered in three formats and you pick exactly one: **MCQ (long)**, **Hybrid (medium — multiple choice + short written)**, or **Written (short)**. You get a **single attempt** — it locks the moment you submit.
- **Inverted Partial-Credit Grading** — MC option weights act as data (one zero-credit dodge foil, plus a descending gradient of live options); written answers are scored against a yield/risk rubric with a penalty for claims the data defeats; hybrid blends both parts. Every item returns a written rationale.
- **Adaptive Topic Practice** — Generated scenario problem sets that move difficulty up after a streak and down after a miss, with explanations on every answer. Per-session difficulty persists.
- **Two-Layer AI Detection on Every Submission** — Each submitted answer is screened by both a static text classifier (GPTZero) and a diachronic keystroke-pattern detector, each with a human-readable rationale.
- **Four-Phase Diagnostic Assessments** — A single CCR reasoning instrument runs at four phases (baseline, two mid-course checkpoints, and after the unit) using a 3×3 menu of generated items, so reasoning growth can be tracked across the course. A configurable minimum-to-pass governs pass/fail.
- **Live Analytics** — Dashboard KPIs (attempts, accuracy, streak), per-section mastery percentages, and a recent-activity feed.
- **Operator Diagnostics** — One-click self-tests (system health and synthetic-student end-to-end run) verify the entire stack — database, OpenAI integration, GPTZero, detection pipeline, and the practice/grade loop.
- **Built-In Product Demo Video** — A screencast of the live UI ships as its own deployable artifact, so the product can show itself.

---

## ⚙️ Technical Features

- **Inverted Partial-Credit Grading Engine** —
  - **MC / Hybrid MC part:** each option carries a stored weight in `[0,1]`. Exactly one option is a zero-credit dodge (a fallacy the data defeats, or a non-committal refusal); the rest form a descending gradient (richest/most-falsifiable = `1.0`, weaker commitment = `0.6`, timid partial = `0.3`). Credit is the chosen option's weight.
  - **Written:** scored against a `{ modelAnswer, yieldAnchors, riskAnchors, defeatedBy }` rubric — credit rises with how much data the answer *binds* and how falsifiable a test it commits to, and falls for asserting claims the data defeats or for empty elaboration.
  - **Hybrid:** averages the MC and written parts. Section percent rolls up per item, and the course aggregate honors **configurable format point values**.
- **Two-Layer AI-Authorship Detection** —
  - **Static (GPTZero):** every submitted answer is sent to GPTZero; the per-document AI probability is blended with a structural heuristic. If GPTZero is unavailable, the system falls back to an LLM scorer plus heuristic — submissions never block.
  - **Diachronic (Keystroke Pattern):** the textarea captures keystroke count, erase count, bulk-insert events, longest bulk insert, rewrite segments, and total duration, penalizing paste-then-reword behavior, low keystroke-to-output ratios, and impossibly sustained typing speeds.
- **Single-Attempt Lock** — Starting a homework records the chosen format; submitting locks the attempt. A second start on a submitted assignment is rejected (HTTP 409) and the UI shows the locked result.
- **Diagnostic Self-Tests** —
  - **System Diagnostic** (`/diagnostics/system`): ordered checks — environment, database round-trip, course-seed integrity, OpenAI chat completion, OpenAI JSON mode, detection pipeline, AI-positive control sample, and GPTZero connectivity.
  - **Synthetic-Student Diagnostic** (`/diagnostics/synthetic-run`): spins up a fake student, runs a practice session, takes and submits a full homework attempt, and verifies grading + detection + analytics all reflect the run.
- **Contract-First API** — A single OpenAPI document is the source of truth; React Query hooks for the UI and Zod validators for the server are generated from it, so request and response shapes can't drift.
- **Streaming AI Tutor** — Token-by-token Server-Sent-Event streaming with a section-scoped system prompt so responses stay grounded in the lecture being read.
- **Adaptive Practice Engine** — Per-session difficulty (1–4 continuous) adjusts after each attempt; the next-problem generator takes current difficulty and section as input.
- **Real-React Demo Video** — The product walkthrough is a real React app exported as MP4 from a single browser tab.
- **Living README** — This README plus a companion `BLUEPRINT.md` architecture document are kept in lock-step with the code.

---

## 📊 Designed For

- **Middle Schoolers & Curious Adults:** A complete, plain-language course in reasoning toward the strongest supported conclusion — with on-demand tutoring and adaptive practice, no instructor required.
- **Instructors & Curriculum Designers:** A working reference for what AI-taught, AI-graded, AI-detection-screened coursework looks like end-to-end.
- **Academic-Integrity Researchers:** A live testbed for layered AI-authorship detection combining text classification with behavioral keystroke evidence.
- **Product & Engineering Teams:** A reference implementation of contract-first full-stack architecture, streaming AI UX, and self-diagnostic operator tooling in a Replit pnpm monorepo.

---

## 💡 Core Idea

Constructive Critical Reasoning reframes "critical thinking" as a *constructive* act.

It doesn't reward the student for finding reasons to doubt — it rewards them for **committing to the richest model the evidence supports and naming the cleanest test that could prove them wrong.** The course teaches that, tutors it, drills it, grades it on an inverted partial-credit scale, screens submissions for misuse, and proves the whole pipeline still works with a single click.

**Constructive Critical Reasoning — where the strongest honest conclusion, not the safest hedge, earns the grade.**

---

## 👤 User preferences

- The user prefers to **convert the existing app in place** (e.g. replacing the prior course content/branding with the new subject) rather than create a standalone clone — keep all functionality and format intact when making content/branding changes.
