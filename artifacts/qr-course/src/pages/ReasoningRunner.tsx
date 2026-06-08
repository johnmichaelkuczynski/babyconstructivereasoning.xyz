import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useParams, Link } from "wouter";
import {
  useGetReasoningAssessment,
  useStartReasoningAttempt,
  useSubmitReasoningAttempt,
} from "@workspace/api-client-react";
import type {
  ReasoningItem,
  ReasoningResponseInput,
  ReasoningResult,
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, AlertCircle } from "lucide-react";

const RATING_LABELS = ["No importance", "Little", "Some", "Much", "Great"];

type DilemmaState = {
  decisionIndex: number | null;
  ratings: Record<number, number>; // considerationIndex -> 0..4
  ranks: Record<number, number>; // considerationIndex -> 1..rankCount
};

export default function ReasoningRunner() {
  const params = useParams();
  const assessmentId = Number(params.id);

  const { data: assessment, isLoading } = useGetReasoningAssessment(assessmentId);
  const startAttempt = useStartReasoningAttempt();
  const submitAttempt = useSubmitReasoningAttempt();

  const [result, setResult] = useState<ReasoningResult | null>(null);
  const [alreadyPassed, setAlreadyPassed] = useState<{ feedback: string | null } | null>(null);

  // MCQ selections: itemId -> optionIndex
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number>>({});
  // Dilemma state: itemId -> state
  const [dilemma, setDilemma] = useState<Record<number, DilemmaState>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!assessmentId || startAttempt.isPending || result) return;
    startAttempt.mutate(
      { assessmentId },
      {
        onSuccess: (data) => {
          if (data.status === "submitted") {
            setAlreadyPassed({ feedback: data.feedback ?? null });
          }
        },
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentId]);

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
      } else {
        const st = dilemma[item.id];
        if (!st || st.decisionIndex === null) return "Please choose a decision for the dilemma.";
        const rankCount = item.rankCount ?? 4;
        const ranked = st ? Object.values(st.ranks).filter((v) => v >= 1 && v <= rankCount).length : 0;
        if (ranked < rankCount) return `Please rank your top ${rankCount} considerations.`;
      }
    }
    return null;
  }

  function handleSubmit() {
    if (!assessment) return;
    const v = validate(assessment.items);
    if (v) {
      setError(v);
      return;
    }
    setError(null);
    submitAttempt.mutate(
      { assessmentId, data: { responses: buildResponses(assessment.items) } },
      { onSuccess: (data) => setResult(data) },
    );
  }

  if (isLoading || !assessment) {
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
            <Link href="/reasoning">
              <Button variant="outline" data-testid="button-back-reasoning">Back to Assessments</Button>
            </Link>
          </div>

          {result?.headline && (
            <div className="rounded-lg border border-border bg-card p-5">
              <p className="font-serif text-lg">{result.headline}</p>
            </div>
          )}

          {result?.metrics && result.metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {result.metrics.map((m) => (
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
          {assessment.items.map((item, idx) =>
            item.type === "mcq" ? (
              <McqQuestion
                key={item.id}
                index={idx}
                item={item}
                selected={mcqAnswers[item.id]}
                onSelect={(opt) => setMcqAnswers((p) => ({ ...p, [item.id]: opt }))}
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
