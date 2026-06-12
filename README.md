# 🔎 Data Analytics for Children

**A Friendly, One-Unit Intro to Data Analytics That Teaches, Tutors, Drills, and Grades Itself — No Math, Coding, or Spreadsheets Required**

---

## 🧩 Overview

**Data Analytics for Children** is a self-paced, single-user web course that delivers a friendly, plain-language introduction to data analytics — taught, tutored, drilled, and graded entirely by AI, with built-in academic-integrity enforcement. No math, coding, spreadsheets, SQL, or other technical skills required.

It turns the everyday habit of *noticing, comparing, and counting* into one product: read each lesson at the depth you want, ask a tutor scoped to the exact section you're on, drill questions whose difficulty adapts to you in real time, and submit homework, a unit test, and a final that are AI-graded with feedback and screened for AI-generated answers.

The curriculum is one unit — **"Data Analytics for Everyone"** — across **6 connected topics**:

1. **What is data, really?**
2. **Spotting patterns**
3. **Asking a good question**
4. **Sorting, grouping, and counting**
5. **Seeing the story**
6. **From hunch to decision**

Designed for **middle schoolers, curious adults wanting brief but meaningful exposure, instructors evaluating AI-taught coursework, and researchers studying AI academic integrity**, Data Analytics for Children pairs a real curriculum with two layers of AI-authorship detection — surfacing not just *whether* the writing looks AI-generated, but whether the *act of producing it* did.

---

## 🧠 What It Does

- **One-Unit Structured Curriculum** — A complete plain-language intro syllabus across 6 topics, shipping with lessons, two homework sets, a timed unit test, and a cumulative final exam.
- **Three-Depth Lessons** — Every lesson is available at **Short / Medium / Long** length, AI-rewritten while preserving the same examples and learning objectives. Skim the concept, expand it on demand, or read the deeper cut — and request a custom rewrite ("add more examples", "shorter sentences") when you want it your way.
- **Section-Scoped AI Tutor** — Ask a question about the paragraph you're reading and the answer streams back token-by-token, grounded in that exact lecture section. Suggested starter questions are pre-generated per lecture, and the tutor stays available while you practice.
- **Adaptive Topic Practice** — Generated problem sets that move difficulty up after a streak and down after a miss, with an explanation on every answer. Per-session difficulty persists, so each drill picks up where the last one left off. Every question poses a concrete scenario and asks for a short reasoned answer — never one-word recall.
- **AI-Graded Assignments** — Homework, the unit test, and the final are scored by an LLM grader that judges semantic equivalence to a model answer, returns per-problem correctness *plus* a written rationale, then rolls up to a percent score.
- **Two-Layer AI Detection on Every Submission** — Each submitted answer is screened by both a static text classifier (GPTZero) and a behavioral keystroke-pattern detector. Each verdict ships with a human-readable rationale.
- **Diagnostic Reasoning Assessments** — Two original reasoning instruments (**Professional Judgment**, dilemma-based on relatable everyday data scenarios; and **Critical Reasoning**, CCTST-style multiple-choice) run at baseline and after the unit, so end-of-course reasoning can be compared against the starting point. Together they count for 20% of the final grade.
- **Math Keyboard Everywhere** — A symbol palette is available on every freeform input — answer boxes *and* the AI tutor — so any notation a student wants to reach for is one tap away.
- **Live Analytics** — Dashboard KPIs (attempts, accuracy, streak), per-topic mastery percentages, and a recent-activity feed — so progress, weak spots, and momentum are all visible at a glance.
- **Operator Diagnostics** — One-click self-tests verify the entire stack — database, OpenAI integration, GPTZero, the detection pipeline, answer-key quality, and the practice/grade loop — before you trust a session.
- **Google Sign-In** — Students sign in with Google (via Clerk) to keep their progress, attempts, and analytics tied to their account.

---

## ⚙️ Technical Features

- **Two-Layer AI-Authorship Detection**
  - **Static (GPTZero):** Every submitted answer is sent to GPTZero; the per-document AI probability is blended with a structural heuristic for the final score. If GPTZero is unavailable, the system silently falls back to an LLM scorer plus heuristic — submissions never block.
  - **Diachronic (Keystroke Pattern):** The student textarea captures keystroke count, erase count, bulk-insert events, longest bulk insert, rewrite segments, and total duration. A scorer penalizes paste-then-reword behavior, low keystroke-to-output ratios, and impossibly sustained typing speeds — catching AI use even when the final text is reworded enough to pass GPTZero. (Math-keyboard insertions count as real keystrokes, so legitimate symbol use never false-flags.)
- **Diagnostic Self-Tests**
  - **System Diagnostic** (`/diagnostics/system`): Ordered checks — environment, database round-trip, course-seed integrity, OpenAI chat completion, OpenAI JSON mode, detection pipeline, an AI-positive control sample, and GPTZero connectivity. Each step returns pass/fail, timing, and a raw error string.
  - **Synthetic-Student Diagnostic** (`/diagnostics/synthetic-run`): Spins up a fake student, runs a practice session (wrong → adjust ↓ → right → adjust ↑), takes and submits a full assignment attempt, and verifies grading + detection + analytics all reflect the run. End-to-end stack proof in one click.
  - **Quality-Control Diagnostic** (`/diagnostics/quality-control`): Uses OpenAI to verify that course answer keys are legitimate, judged against the course's own lecture text rather than generic knowledge.
- **Contract-First API** — A single OpenAPI document is the source of truth; React Query hooks for the UI and Zod validators for the server are generated from it, so request and response shapes can't drift between client and server.
- **Streaming AI Tutor** — Token-by-token Server-Sent-Event streaming with a section-scoped system prompt, so responses stay grounded in the lecture the student is reading.
- **Adaptive Practice Engine** — Per-session difficulty (1–4 continuous) adjusts after each attempt; the next-problem generator takes the current difficulty and topic as input, so questions are generated on demand instead of pre-baked.
- **Real-React Demo Video** — The product walkthrough is a real React app, not a slideshow: persistent sidebar, animated SVG cursor, character-by-character typing, word-by-word streaming responses, and scene-synced background audio — all exported as MP4 from a single browser tab.
- **Operator Console** — A dedicated Diagnostics page surfaces the self-tests with one-click execution, per-step pass/fail rows, and raw error output for debugging.

---

## 🏗️ Architecture

This project is a **pnpm monorepo** with path-routed artifacts behind a shared reverse proxy:

- **`artifacts/qr-course`** — the student-facing web app (React + Vite), served at `/`. This is **Data Analytics for Children**.
- **`artifacts/api-server`** — the shared Express backend (lessons, tutor streaming, practice, grading, detection, diagnostics, analytics).
- **`lib/api-spec`** — the OpenAPI source of truth plus generated React Query hooks and Zod schemas.
- **`lib/db`** — the database schema and client (PostgreSQL via the project's `DATABASE_URL`).
- **`artifacts/qr-course-demo`, `artifacts/diagnostics-demo`** — standalone demo-video artifacts that showcase the product.

---

## 📊 Designed For

- **Middle Schoolers & Curious Adults** — A complete, plain-language intro to data analytics with on-demand tutoring and adaptive practice — no instructor, math, or coding required.
- **Instructors & Curriculum Designers** — A working reference for what AI-taught, AI-graded, AI-detection-screened coursework actually looks like end-to-end.
- **Academic-Integrity Researchers** — A live testbed for layered AI-authorship detection that combines text-based classification with behavioral keystroke evidence.
- **Product & Engineering Teams** — A reference implementation of contract-first full-stack architecture, streaming AI UX, and self-diagnostic operator tooling in a Replit pnpm monorepo.

---

## 💡 Core Idea

Data Analytics for Children reframes an AI-taught course as a *closed accountability loop*.

It doesn't just teach the material and grade the homework — it **teaches**, **tutors**, **drills**, **grades**, **detects misuse**, and **proves the whole pipeline still works** with a single click. The result is a self-paced course that students can actually trust to be fair, and that instructors can actually trust to be honest.

**Data Analytics for Children — where the curriculum, the tutor, the grader, and the integrity check all live in one room.**
