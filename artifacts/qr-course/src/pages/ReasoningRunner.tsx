import React, { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { useParams, Link } from "wouter";
import {
  useGetReasoningAssessment,
  useListReasoningAssessments,
  useStartReasoningAttempt,
  useSubmitReasoningAttempt,
} from "@workspace/api-client-react";
import type {
  ReasoningItem,
  ReasoningResponseInput,
  ReasoningResult,
  ReasoningReviewItem,
  ReasoningMetric,
  StartReasoningBodyFormat,
} from "@workspace/api-client-react";
import { AnswerInput } from "@/components/AnswerInput";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, AlertCircle, XCircle, ListChecks, PenLine, SplitSquareHorizontal } from "lucide-react";

const RATING_LABELS = ["No importance", "Little", "Some", "Much", "Great"];

type DilemmaState = {
  decisionIndex: number | null;
  ratings: Record<number, number>; // considerationIndex -> 0..4
  ranks: Record<number, number>; // considerationIndex -> 1..rankCount
};

type FormatOption = {
  value: StartReasoningBodyFormat;
  title: string;
  description: string;
  Icon: typeof ListChecks;
};

// Per-instrument copy for the three pickable answer formats. The internal
// instrument enum stays "ethical"/"critical"; the label shown is always the
// friendly name.
function formatOptions(instrument: "ethical" | "critical"): FormatOption[] {
  if (instrument === "ethical") {
    return [
      {
        value: "mcq",
        title: "Multiple choice",
        description: "Judgment scenarios — pick the best response. No typing.",
        Icon: ListChecks,
      },
      {
        value: "hybrid",
        title: "Mostly multiple choice",
        description: "Multiple choice plus one short one-sentence answer.",
        Icon: SplitSquareHorizontal,
      },
      {
        value: "written",
        title: "Rate-and-rank dilemma",
        description: "Work through one scenario: choose, rate, and rank what mattered.",
        Icon: PenLine,
      },
    ];
  }
  return [
    {
      value: "mcq",
      title: "Multiple choice",
      description: "Pick the best answer for each question. No typing.",
      Icon: ListChecks,
    },
    {
      value: "hybrid",
      title: "Mostly multiple choice",
      description: "Multiple choice plus one or two one-sentence answers.",
      Icon: SplitSquareHorizontal,
    },
    {
      value: "written",
      title: "Short written answers",
      description: "A few open questions, one to two sentences each.",
      Icon: PenLine,
    },
  ];
}

export default function ReasoningRunner() {
  const params = useParams();
  const assessmentId = Number(params.id);

  const { data: assessment, isLoading } = useGetReasoningAssessment(assessmentId);
  const { data: list, isLoading: listLoading } = useListReasoningAssessments();
  const startAttempt = useStartReasoningAttempt();
  const submitAttempt = useSubmitReasoningAttempt();

  const [result, setResult] = useState<ReasoningResult | null>(null);
  const [alreadyPassed, setAlreadyPassed] = useState<{
    feedback: string | null;
    headline: string | null;
    metrics: ReasoningMetric[] | null;
    review: ReasoningReviewItem[] | null;
  } | null>(null);

  // The items to present for THIS attempt. The first take uses the seeded
  // template; each retake returns freshly generated questions of the same kind.
  const [items, setItems] = useState<ReasoningItem[] | null>(null);

  // Whether to show the format picker before starting/restarting an attempt.
  const [showPicker, setShowPicker] = useState(false);
  const decidedRef = useRef(false);
  const retakeRef = useRef(false);

  // MCQ selections: itemId -> optionIndex
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number>>({});
  // Open answers: itemId -> typed text
  const [openAnswers, setOpenAnswers] = useState<Record<number, string>>({});
  // Dilemma state: itemId -> state
  const [dilemma, setDilemma] = useState<Record<number, DilemmaState>>({});
  const [error, setError] = useState<string | null>(null);

  function applyStarted(data: {
    items: ReasoningItem[];
    status: string;
    feedback?: string | null;
    headline?: string | null;
    metrics?: ReasoningMetric[] | null;
    review?: ReasoningReviewItem[] | null;
  }) {
    setItems(data.items);
    if (data.status === "submitted") {
      setAlreadyPassed({
        feedback: data.feedback ?? null,
        headline: data.headline ?? null,
        metrics: data.metrics ?? null,
        review: data.review ?? null,
      });
    }
  }

  // On first load, decide whether to show the format picker (a fresh, not-yet-
  // started assessment) or to auto-resume/review an existing attempt.
  useEffect(() => {
    if (decidedRef.current) return;
    if (!assessmentId || !list) return;
    decidedRef.current = true;
    const summary = list.find((s) => s.id === assessmentId);
    if (summary && summary.status === "not_started") {
      setShowPicker(true);
      return;
    }
    startAttempt.mutate({ assessmentId }, { onSuccess: applyStarted });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, assessmentId]);

  function pickFormat(format: StartReasoningBodyFormat) {
    setShowPicker(false);
    setError(null);
    const data = retakeRef.current ? { retake: true, format } : { format };
    startAttempt.mutate(
      { assessmentId, data },
      {
        onSuccess: (resp) => {
          retakeRef.current = false;
          applyStarted(resp);
        },
      },
    );
  }

  function setDecision(itemId: number, idx: number) {
    setDilemma((prev) => ({
      ...prev,
      [itemId]: {
        decisionIndex: idx,
        ratings: prev[itemId]?.ratings ?? {},
        ranks: prev[itemId]?.ranks ?? {},
      },
    }));
  }

  function setRating(itemId: number, consIdx: number, rating: number) {
    setDilemma((prev) => {
      const cur = prev[itemId] ?? { decisionIndex: null, ratings: {}, ranks: {} };
      return { ...prev, [itemId]: { ...cur, ratings: { ...cur.ratings, [consIdx]: rating } } };
    });
  }

  function setRank(itemId: number, consIdx: number, rank: number) {
    setDilemma((prev) => {
      const cur = prev[itemId] ?? { decisionIndex: null, ratings: {}, ranks: {} };
      const ranks = { ...cur.ranks };
      // Ensure each rank is used once: clear any other consideration holding it.
      for (const k of Object.keys(ranks)) {
        if (ranks[Number(k)] === rank) delete ranks[Number(k)];
      }
      if (rank === 0) delete ranks[consIdx];
      else ranks[consIdx] = rank;
      return { ...prev, [itemId]: { ...cur, ranks } };
    });
  }

  function buildResponses(items: ReasoningItem[]): ReasoningResponseInput[] {
    return items.map((item) => {
      if (item.type === "mcq") {
        return { itemId: item.id, selectedIndex: mcqAnswers[item.id] ?? null };
      }
      if (item.type === "open") {
        return { itemId: item.id, text: openAnswers[item.id] ?? "" };
      }
      const st = dilemma[item.id];
      const consCount = item.considerations?.length ?? 0;
      const ratings = Array.from({ length: consCount }, (_, i) => st?.ratings[i] ?? 0);
      const rankCount = item.rankCount ?? 4;
      const ranking: number[] = [];
      for (let r = 1; r <= rankCount; r++) {
        const found = st ? Object.keys(st.ranks).find((k) => st.ranks[Number(k)] === r) : undefined;
        if (found !== undefined) ranking.push(Number(found));
      }
      return {
        itemId: item.id,
        decisionIndex: st?.decisionIndex ?? null,
        ratings,
        ranking,
      };
    });
  }

  function validate(items: ReasoningItem[]): string | null {
    for (const item of items) {
      if (item.type === "mcq") {
        if (mcqAnswers[item.id] === undefined) return "Please answer every question before submitting.";
      } else if (item.type === "open") {
        if (!(openAnswers[item.id] ?? "").trim()) return "Please write a short answer for every question before submitting.";
      } else {
        const st = dilemma[item.id];
        if (!st || st.decisionIndex === null) return "Please choose a decision for the scenario.";
        const rankCount = item.rankCount ?? 4;
        const ranked = st ? Object.values(st.ranks).filter((v) => v >= 1 && v <= rankCount).length : 0;
        if (ranked < rankCount) return `Please rank your top ${rankCount} considerations.`;
      }
    }
    return null;
  }

  function handleRetake() {
    setError(null);
    setResult(null);
    setAlreadyPassed(null);
    setItems(null);
    setMcqAnswers({});
    setOpenAnswers({});
    setDilemma({});
    retakeRef.current = true;
    setShowPicker(true);
  }

  function handleSubmit() {
    if (!items) return;
    const v = validate(items);
    if (v) {
      setError(v);
      return;
    }
    setError(null);
    submitAttempt.mutate(
      { assessmentId, data: { responses: buildResponses(items) } },
      { onSuccess: (data) => setResult(data) },
    );
  }

  if (isLoading || !assessment || listLoading) {
    return (
      <Layout>
        <div className="p-8 max-w-3xl mx-auto w-full flex flex-col gap-8">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-64 w-full" />
        </div>
      </Layout>
    );
  }

  // Format picker — shown before a fresh take or a retake.
  if (showPicker) {
    const options = formatOptions(assessment.instrument);
    return (
      <Layout>
        <div className="p-8 max-w-3xl mx-auto w-full flex flex-col gap-8">
          <div className="border-b pb-4">
            <h1 className="text-2xl font-serif font-bold text-primary">{assessment.title}</h1>
            {assessment.subtitle && <p className="text-sm text-muted-foreground mt-1">{assessment.subtitle}</p>}
            <p className="text-sm text-muted-foreground mt-3">
              Choose how you'd like to answer this time. You can pick a different format next time.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => pickFormat(opt.value)}
                disabled={startAttempt.isPending}
                className="text-left flex flex-col gap-2 rounded-lg border border-border p-5 hover:border-primary hover:bg-primary/5 transition-colors disabled:opacity-60"
                data-testid={`format-${opt.value}`}
              >
                <opt.Icon className="w-6 h-6 text-primary" />
                <span className="font-serif font-semibold">{opt.title}</span>
                <span className="text-sm text-muted-foreground">{opt.description}</span>
              </button>
            ))}
          </div>
          {startAttempt.isPending && (
            <p className="text-sm text-muted-foreground">Preparing your questions…</p>
          )}
          <div>
            <Link href="/reasoning">
              <Button variant="outline" data-testid="button-back-reasoning">Back to Assessments</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (!items && !alreadyPassed && !result) {
    return (
      <Layout>
        <div className="p-8 max-w-3xl mx-auto w-full flex flex-col gap-8">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-64 w-full" />
        </div>
      </Layout>
    );
  }

  // Result / already-passed screen
  if (result || alreadyPassed) {
    const feedback = result?.feedback ?? alreadyPassed?.feedback ?? "";
    const headline = result?.headline ?? alreadyPassed?.headline ?? null;
    const metrics = result?.metrics ?? alreadyPassed?.metrics ?? [];
    const review = result?.review ?? alreadyPassed?.review ?? [];
    return (
      <Layout>
        <div className="p-8 max-w-3xl mx-auto w-full flex flex-col gap-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-serif font-bold text-primary mb-1">{assessment.title}</h1>
              <span className="inline-flex items-center gap-1.5 text-chart-2 font-medium">
                <CheckCircle2 className="w-5 h-5" /> Passed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleRetake}
                disabled={startAttempt.isPending}
                data-testid="button-retake-reasoning"
              >
                {startAttempt.isPending ? "Starting…" : "Retake assessment"}
              </Button>
              <Link href="/reasoning">
                <Button variant="outline" data-testid="button-back-reasoning">Back to Assessments</Button>
              </Link>
            </div>
          </div>

          {headline && (
            <div className="rounded-lg border border-border bg-card p-5">
              <p className="font-serif text-lg">{headline}</p>
            </div>
          )}

          {metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {metrics.map((m) => (
                <div key={m.label} className="rounded-md border border-border p-4">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{m.label}</div>
                  <div className="text-xl font-semibold">{m.value}</div>
                  {m.detail && <div className="text-xs text-muted-foreground mt-1">{m.detail}</div>}
                </div>
              ))}
            </div>
          )}

          <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
            <h3 className="font-serif font-semibold mb-2">Feedback</h3>
            <p className="text-sm leading-relaxed whitespace-pre-line">{feedback}</p>
          </div>

          {review.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="font-serif font-semibold text-lg">Your answers</h3>
              {review.map((r, i) => (
                <ReviewCard key={r.itemId} item={r} index={i} />
              ))}
            </div>
          )}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 max-w-3xl mx-auto w-full flex flex-col gap-8 pb-28">
        <div className="border-b pb-4">
          <h1 className="text-2xl font-serif font-bold text-primary">{assessment.title}</h1>
          {assessment.subtitle && <p className="text-sm text-muted-foreground mt-1">{assessment.subtitle}</p>}
          <p className="text-sm text-muted-foreground mt-3">{assessment.instructions}</p>
        </div>

        <div className="flex flex-col gap-8">
          {(items ?? []).map((item, idx) =>
            item.type === "mcq" ? (
              <McqQuestion
                key={item.id}
                index={idx}
                item={item}
                selected={mcqAnswers[item.id]}
                onSelect={(opt) => setMcqAnswers((p) => ({ ...p, [item.id]: opt }))}
              />
            ) : item.type === "open" ? (
              <OpenQuestion
                key={item.id}
                index={idx}
                item={item}
                value={openAnswers[item.id] ?? ""}
                onChange={(val) => setOpenAnswers((p) => ({ ...p, [item.id]: val }))}
              />
            ) : (
              <DilemmaQuestion
                key={item.id}
                item={item}
                state={dilemma[item.id]}
                onDecision={(i) => setDecision(item.id, i)}
                onRating={(c, r) => setRating(item.id, c, r)}
                onRank={(c, r) => setRank(item.id, c, r)}
              />
            ),
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 text-destructive text-sm">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}

        <div className="flex justify-end border-t pt-5">
          <Button
            onClick={handleSubmit}
            disabled={submitAttempt.isPending}
            className="bg-chart-2 hover:bg-chart-2/90 text-white"
            data-testid="button-submit-reasoning"
          >
            {submitAttempt.isPending ? "Submitting…" : "Submit Assessment"}
          </Button>
        </div>
      </div>
    </Layout>
  );
}

function McqQuestion({
  index,
  item,
  selected,
  onSelect,
}: {
  index: number;
  item: ReasoningItem;
  selected: number | undefined;
  onSelect: (opt: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3" data-testid={`question-${item.id}`}>
      <h3 className="font-medium">
        <span className="text-muted-foreground mr-2">{index + 1}.</span>
        {item.prompt}
      </h3>
      <div className="flex flex-col gap-2">
        {(item.options ?? []).map((opt, oi) => {
          const active = selected === oi;
          return (
            <button
              key={oi}
              type="button"
              onClick={() => onSelect(oi)}
              className={`text-left px-4 py-3 rounded-md border transition-colors ${
                active
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border hover:bg-secondary"
              }`}
              data-testid={`option-${item.id}-${oi}`}
            >
              <span className="font-mono text-xs text-muted-foreground mr-2">
                {String.fromCharCode(65 + oi)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function OpenQuestion({
  index,
  item,
  value,
  onChange,
}: {
  index: number;
  item: ReasoningItem;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3" data-testid={`question-${item.id}`}>
      <h3 className="font-medium">
        <span className="text-muted-foreground mr-2">{index + 1}.</span>
        {item.prompt}
      </h3>
      <p className="text-xs text-muted-foreground">Answer in one or two sentences — your reasoning matters, not the length.</p>
      <AnswerInput
        value={value}
        onChange={(val) => onChange(val)}
        placeholder="Type a short answer…"
      />
    </div>
  );
}

function DilemmaQuestion({
  item,
  state,
  onDecision,
  onRating,
  onRank,
}: {
  item: ReasoningItem;
  state: DilemmaState | undefined;
  onDecision: (i: number) => void;
  onRating: (consIdx: number, rating: number) => void;
  onRank: (consIdx: number, rank: number) => void;
}) {
  const rankCount = item.rankCount ?? 4;
  const considerations = item.considerations ?? [];
  return (
    <div className="flex flex-col gap-6" data-testid={`dilemma-${item.id}`}>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="whitespace-pre-line text-base leading-relaxed">{item.prompt}</p>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-serif font-semibold">What should they do?</h4>
        {(item.decisionOptions ?? []).map((opt, oi) => (
          <button
            key={oi}
            type="button"
            onClick={() => onDecision(oi)}
            className={`text-left px-4 py-3 rounded-md border transition-colors ${
              state?.decisionIndex === oi
                ? "border-primary bg-primary/5 ring-1 ring-primary"
                : "border-border hover:bg-secondary"
            }`}
            data-testid={`decision-${item.id}-${oi}`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <h4 className="font-serif font-semibold">Rate each consideration</h4>
          <p className="text-sm text-muted-foreground">
            How important was each one to your decision? Then rank your {rankCount} most
            important using the selector on the right.
          </p>
        </div>
        <div className="flex flex-col divide-y border rounded-md">
          {considerations.map((c, ci) => (
            <div key={ci} className="p-4 flex flex-col gap-3">
              <p className="text-sm">{c}</p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {RATING_LABELS.map((label, r) => {
                    const active = (state?.ratings[ci] ?? -1) === r;
                    return (
                      <button
                        key={r}
                        type="button"
                        onClick={() => onRating(ci, r)}
                        title={label}
                        className={`px-2.5 py-1 rounded text-xs border transition-colors ${
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:bg-secondary"
                        }`}
                        data-testid={`rating-${item.id}-${ci}-${r}`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
                <select
                  value={state?.ranks[ci] ?? 0}
                  onChange={(e) => onRank(ci, Number(e.target.value))}
                  className="text-sm border border-input rounded-md px-2 py-1 bg-background"
                  data-testid={`rank-${item.id}-${ci}`}
                >
                  <option value={0}>Rank —</option>
                  {Array.from({ length: rankCount }, (_, i) => i + 1).map((r) => (
                    <option key={r} value={r}>
                      Rank {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ item, index }: { item: ReasoningReviewItem; index: number }) {
  if (item.type === "mcq") {
    const options = item.options ?? [];
    return (
      <div className="rounded-lg border border-border bg-card p-5" data-testid={`review-item-${item.itemId}`}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <p className="font-medium">
            <span className="text-muted-foreground mr-2">{index + 1}.</span>
            {item.prompt}
          </p>
          {item.isCorrect === null ? (
            <span className="inline-flex items-center gap-1 text-muted-foreground text-sm font-medium shrink-0">
              <AlertCircle className="w-4 h-4" /> No answer
            </span>
          ) : item.isCorrect ? (
            <span className="inline-flex items-center gap-1 text-chart-2 text-sm font-medium shrink-0">
              <CheckCircle2 className="w-4 h-4" /> Correct
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-destructive text-sm font-medium shrink-0">
              <XCircle className="w-4 h-4" /> Incorrect
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {options.map((opt, oi) => {
            const isCorrect = oi === item.correctIndex;
            const isSelected = oi === item.selectedIndex;
            const cls = isCorrect
              ? "border-chart-2 bg-chart-2/10"
              : isSelected
                ? "border-destructive bg-destructive/10"
                : "border-border";
            return (
              <div
                key={oi}
                className={`flex items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm ${cls}`}
              >
                <span>{opt}</span>
                <span className="flex items-center gap-2 text-xs shrink-0">
                  {isSelected && <span className="text-muted-foreground">Your answer</span>}
                  {isCorrect && (
                    <span className="inline-flex items-center gap-1 text-chart-2 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Correct answer
                    </span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (item.type === "open") {
    const expectedPoints = item.expectedPoints ?? [];
    return (
      <div className="rounded-lg border border-border bg-card p-5" data-testid={`review-item-${item.itemId}`}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <p className="font-medium">
            <span className="text-muted-foreground mr-2">{index + 1}.</span>
            {item.prompt}
          </p>
          {item.isCorrect === null ? (
            <span className="inline-flex items-center gap-1 text-muted-foreground text-sm font-medium shrink-0">
              <AlertCircle className="w-4 h-4" /> No answer
            </span>
          ) : item.isCorrect ? (
            <span className="inline-flex items-center gap-1 text-chart-2 text-sm font-medium shrink-0">
              <CheckCircle2 className="w-4 h-4" /> Credit
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-destructive text-sm font-medium shrink-0">
              <XCircle className="w-4 h-4" /> Not yet
            </span>
          )}
        </div>
        <div className="mb-3">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Your answer</div>
          <p className="text-sm whitespace-pre-line">{item.text?.trim() ? item.text : "No answer recorded"}</p>
        </div>
        {item.rationale && (
          <div className="mb-3">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Feedback</div>
            <p className="text-sm">{item.rationale}</p>
          </div>
        )}
        {expectedPoints.length > 0 && (
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">What a strong answer covers</div>
            <ul className="list-disc list-inside text-sm flex flex-col gap-1">
              {expectedPoints.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  const decisionOptions = item.decisionOptions ?? [];
  const considerations = item.considerations ?? [];
  const ranking = item.ranking ?? [];
  const chosen =
    item.decisionIndex !== null && item.decisionIndex !== undefined
      ? decisionOptions[item.decisionIndex]
      : null;
  return (
    <div className="rounded-lg border border-border bg-card p-5" data-testid={`review-item-${item.itemId}`}>
      <p className="font-medium mb-3">
        <span className="text-muted-foreground mr-2">{index + 1}.</span>
        {item.prompt}
      </p>
      <div className="mb-3">
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Your decision</div>
        <p className="text-sm">{chosen ?? "No decision recorded"}</p>
      </div>
      {ranking.length > 0 && (
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
            Your ranked considerations
          </div>
          <ol className="list-decimal list-inside text-sm flex flex-col gap-1">
            {ranking.map((ci, i) => (
              <li key={i}>{considerations[ci] ?? `Consideration ${ci + 1}`}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
