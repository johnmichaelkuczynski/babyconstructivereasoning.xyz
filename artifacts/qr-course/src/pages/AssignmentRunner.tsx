import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useParams, Link } from "wouter";
import {
  useGetAssignment,
  useStartAssignmentAttempt,
  useGetAttempt,
  useSaveAnswer,
  useSubmitAttempt,
  AttemptResult,
  KeystrokeTrace,
  Problem,
  FormatOption,
  StartAttemptInputFormat,
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AnswerInput } from "@/components/AnswerInput";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { isAdminMode } from "@/lib/adminMode";
import { CheckCircle2, Lock, ListChecks, SplitSquareHorizontal, PenLine } from "lucide-react";

type LocalAnswer = {
  answer: string;
  selectedIndex: number | null;
  trace?: KeystrokeTrace;
};

const FORMAT_ICON: Record<string, typeof ListChecks> = {
  mcq: ListChecks,
  hybrid: SplitSquareHorizontal,
  written: PenLine,
};

const FORMAT_BLURB: Record<string, string> = {
  mcq: "Pick the strongest conclusion for each scenario. No typing.",
  hybrid: "Mostly multiple choice, with a few one-to-two sentence written answers.",
  written: "Short written answers — commit to a conclusion and the test that would falsify it.",
};

export default function AssignmentRunner() {
  const params = useParams();
  const assignmentId = Number(params.id);

  const { data: assignment, isLoading: isLoadingAssignment } = useGetAssignment(assignmentId);
  const startAttempt = useStartAssignmentAttempt();
  const submitAttempt = useSubmitAttempt();

  const [attemptId, setAttemptId] = useState<number | null>(null);
  const { data: attempt } = useGetAttempt(attemptId || 0, {
    query: { enabled: !!attemptId, queryKey: ["attempt", attemptId] },
  });

  const saveAnswer = useSaveAnswer();

  const [currentProblemIdx, setCurrentProblemIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, LocalAnswer>>({});
  const [result, setResult] = useState<AttemptResult | null>(null);

  // Auto-resume an attempt that's already in progress (same locked format).
  useEffect(() => {
    if (!assignment || attemptId || result || startAttempt.isPending) return;
    if (assignment.status === "in_progress" && assignment.chosenFormat) {
      beginAttempt(assignment.chosenFormat as StartAttemptInputFormat);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignment, attemptId, result]);

  const beginAttempt = (format: StartAttemptInputFormat) => {
    startAttempt.mutate(
      { assignmentId, data: { format } },
      {
        onSuccess: (data) => {
          setAttemptId(data.id);
          setCurrentProblemIdx(0);
          const initial: Record<number, LocalAnswer> = {};
          data.answers.forEach((a) => {
            initial[a.problemId] = {
              answer: a.answer,
              selectedIndex: a.selectedIndex ?? null,
            };
          });
          setAnswers(initial);
        },
      },
    );
  };

  const persist = (problemId: number, next: LocalAnswer) => {
    setAnswers((prev) => ({ ...prev, [problemId]: next }));
    if (attemptId) {
      saveAnswer.mutate({
        attemptId,
        data: {
          problemId,
          answer: next.answer,
          selectedIndex: next.selectedIndex,
          trace: next.trace,
        },
      });
    }
  };

  const handleSelect = (p: Problem, index: number) => {
    const prev = answers[p.id] ?? { answer: "", selectedIndex: null };
    persist(p.id, { ...prev, selectedIndex: index });
  };

  const handleText = (p: Problem, val: string, trace: KeystrokeTrace) => {
    const prev = answers[p.id] ?? { answer: "", selectedIndex: null };
    persist(p.id, { ...prev, answer: val, trace });
  };

  const handleSubmit = () => {
    if (!attemptId) return;
    submitAttempt.mutate(
      { attemptId, data: { skipDetection: isAdminMode() } },
      { onSuccess: (data) => setResult(data) },
    );
  };

  if (isLoadingAssignment || !assignment) {
    return (
      <Layout>
        <div className="p-8 max-w-4xl mx-auto w-full flex flex-col gap-8">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-64 w-full" />
        </div>
      </Layout>
    );
  }

  // ---- Results view (just submitted) ----------------------------------------
  if (result) {
    return (
      <Layout>
        <div className="p-8 max-w-4xl mx-auto w-full flex flex-col gap-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-serif font-bold text-primary mb-2">
                {assignment.title} — Results
              </h1>
              <p className="text-muted-foreground">
                Score: {Math.round(result.percent)}% ({result.score.toFixed(1)}/
                {result.total.toFixed(1)} points)
              </p>
            </div>
            <Link href="/assignments">
              <Button variant="outline">Back to Assignments</Button>
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            {result.perProblem.map((pr, idx) => {
              const pct = Math.round(pr.credit * 100);
              const tone =
                pr.credit >= 0.999
                  ? "border-chart-2/50 bg-chart-2/5"
                  : pr.credit <= 0.001
                  ? "border-destructive/50 bg-destructive/5"
                  : "border-chart-4/40 bg-chart-4/5";
              const det = result.detection.find((d) => d.problemId === pr.problemId);
              return (
                <div key={pr.problemId} className={`p-6 rounded-lg border ${tone}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Question {idx + 1}</h3>
                    <span className="text-sm font-semibold">{pct}% credit</span>
                  </div>
                  <div className="mb-4">
                    <span className="text-sm font-semibold">Your answer:</span>
                    <div className="mt-1">
                      {pr.itemType === "mc" && pr.selectedIndex != null
                        ? `Choice ${pr.selectedIndex + 1}`
                        : pr.userAnswer || "No answer"}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-semibold">Feedback:</span>
                    <div className="mt-1 text-sm">
                      <MarkdownRenderer content={pr.explanation} />
                    </div>
                  </div>
                  {det?.aiFlagged && (
                    <div className="mt-4 p-3 bg-secondary rounded-md text-sm border border-secondary-border">
                      <strong className="text-chart-4">
                        Flagged content accepted — no penalty during initial phase.
                      </strong>
                      <p className="text-muted-foreground mt-1">{det.rationale}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    );
  }

  // ---- Single-attempt lock (already submitted in a previous visit) ----------
  if (assignment.status === "submitted") {
    return (
      <Layout>
        <div className="p-8 max-w-4xl mx-auto w-full flex flex-col gap-6">
          <h1 className="text-3xl font-serif font-bold text-primary">{assignment.title}</h1>
          <div className="rounded-lg border border-border bg-card p-8 flex flex-col items-center text-center gap-4">
            <Lock className="w-10 h-10 text-muted-foreground" />
            <h2 className="text-xl font-serif font-semibold">This homework is submitted</h2>
            <p className="text-muted-foreground max-w-md">
              You get a single graded attempt per section, and yours is locked in.
              {assignment.bestScore != null && (
                <> Your score was <strong>{Math.round(assignment.bestScore)}%</strong>.</>
              )}
            </p>
            <div className="flex gap-3">
              <Link href={`/assignments/${assignmentId}/practice`}>
                <Button variant="outline">Keep practicing</Button>
              </Link>
              <Link href="/assignments">
                <Button>Back to Assignments</Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ---- Format picker (not started, no attempt yet) --------------------------
  if (!attemptId) {
    return (
      <Layout>
        <div className="p-8 max-w-4xl mx-auto w-full flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-primary mb-2">{assignment.title}</h1>
            <p className="text-muted-foreground">
              Pick how you want to answer. You get <strong>one graded attempt</strong>{" "}
              — once you submit, this homework locks. Want to warm up first? Use the
              unlimited practice version instead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {assignment.formats.map((f: FormatOption) => {
              const Icon = FORMAT_ICON[f.format] ?? ListChecks;
              return (
                <button
                  key={f.format}
                  onClick={() => beginAttempt(f.format as StartAttemptInputFormat)}
                  disabled={startAttempt.isPending}
                  data-testid={`button-format-${f.format}`}
                  className="text-left rounded-lg border border-border bg-card p-5 flex flex-col gap-3 hover:border-primary/60 hover:shadow-sm transition-colors disabled:opacity-60"
                >
                  <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-serif font-semibold">{f.label}</div>
                  <p className="text-sm text-muted-foreground">
                    {FORMAT_BLURB[f.format] ?? ""}
                  </p>
                  <span className="text-xs text-muted-foreground mt-auto">
                    {f.itemCount} questions
                  </span>
                </button>
              );
            })}
          </div>

          <div className="rounded-lg border border-chart-2/40 bg-chart-2/5 p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-foreground">
              Not ready to be graded? Run an unlimited practice version with the
              tutor and instant feedback.
            </div>
            <Link href={`/assignments/${assignmentId}/practice`}>
              <Button variant="outline" className="shrink-0">
                ✨ Practice this first
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // ---- Active attempt: one question at a time -------------------------------
  const problems = attempt?.problems ?? [];
  if (!attempt || problems.length === 0) {
    return (
      <Layout>
        <div className="p-8 max-w-4xl mx-auto w-full flex flex-col gap-8">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-64 w-full" />
        </div>
      </Layout>
    );
  }

  const currentProblem = problems[currentProblemIdx];

  return (
    <Layout>
      <div className="p-8 max-w-4xl mx-auto w-full flex flex-col gap-6 pb-24">
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-primary">{assignment.title}</h1>
            <p className="text-sm text-muted-foreground">
              Question {currentProblemIdx + 1} of {problems.length}
            </p>
          </div>
          {attempt.deadlineAt && (
            <div className="text-destructive font-mono font-bold px-3 py-1 rounded bg-destructive/10 border border-destructive/20">
              Deadline: {new Date(attempt.deadlineAt).toLocaleTimeString()}
            </div>
          )}
        </div>

        <div className="rounded-lg border border-chart-2/40 bg-chart-2/5 p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-foreground">
            <strong>This is the graded {assignment.kind} — one attempt, the tutor is off.</strong>{" "}
            Want to warm up first? Run an unlimited practice version that gives
            feedback and keeps the tutor with you.
          </div>
          <Link href={`/assignments/${assignmentId}/practice`}>
            <Button variant="outline" className="shrink-0">
              ✨ Practice this first
            </Button>
          </Link>
        </div>

        {currentProblem ? (
          <div className="flex flex-col gap-8">
            <div className="prose prose-slate dark:prose-invert max-w-none text-lg">
              <MarkdownRenderer content={currentProblem.prompt} />
            </div>

            {/* Multiple-choice part (mc + hybrid) */}
            {(currentProblem.itemType === "mc" || currentProblem.itemType === "hybrid") &&
              currentProblem.options && (
                <div className="flex flex-col gap-3">
                  {currentProblem.options.map((opt, i) => {
                    const selected = answers[currentProblem.id]?.selectedIndex === i;
                    return (
                      <button
                        key={i}
                        onClick={() => handleSelect(currentProblem, i)}
                        data-testid={`option-${i}`}
                        className={`text-left rounded-md border p-4 transition-colors ${
                          selected
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-input hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`mt-0.5 w-6 h-6 shrink-0 rounded-full border flex items-center justify-center text-sm font-semibold ${
                              selected
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-input text-muted-foreground"
                            }`}
                          >
                            {selected ? <CheckCircle2 className="w-4 h-4" /> : String.fromCharCode(65 + i)}
                          </span>
                          <span>{opt}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

            {/* Written part (written + hybrid follow-up) */}
            {(currentProblem.itemType === "written" || currentProblem.itemType === "hybrid") && (
              <div className="flex flex-col gap-3">
                {currentProblem.itemType === "hybrid" && currentProblem.writtenPrompt && (
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <MarkdownRenderer content={currentProblem.writtenPrompt} />
                  </div>
                )}
                <AnswerInput
                  value={answers[currentProblem.id]?.answer || ""}
                  onChange={(val, trace) => handleText(currentProblem, val, trace)}
                />
              </div>
            )}

            <div className="flex justify-between mt-8 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentProblemIdx((p) => Math.max(0, p - 1))}
                disabled={currentProblemIdx === 0}
              >
                Previous
              </Button>

              {currentProblemIdx < problems.length - 1 ? (
                <Button
                  onClick={() => setCurrentProblemIdx((p) => Math.min(problems.length - 1, p + 1))}
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-chart-2 hover:bg-chart-2/90 text-white"
                  disabled={submitAttempt.isPending}
                >
                  {submitAttempt.isPending ? "Submitting..." : "Submit Homework"}
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div>Question not found.</div>
        )}
      </div>
    </Layout>
  );
}
