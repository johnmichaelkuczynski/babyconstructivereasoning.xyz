import React from "react";
import { useListReasoningAssessments } from "@workspace/api-client-react";
import type { ReasoningAssessmentSummary } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Brain, CheckCircle2 } from "lucide-react";

type Phase = "before" | "third1" | "third2" | "after";

const HEADINGS: Record<Phase, string> = {
  before: "Optional warm-up: practice checks",
  third1: "Optional check-in: practice checks",
  third2: "Optional check-in: practice checks",
  after: "Optional wrap-up: practice checks",
};

const BLURBS: Record<Phase, string> = {
  before:
    "Try the two short practice checks any time you like. They're practice only and never affect your grade.",
  third1:
    "Revisit the practice checks to see how your understanding is coming along. Practice only — never graded.",
  third2:
    "Take the practice checks again with fresh questions to gauge your progress. Practice only — never graded.",
  after:
    "Take the practice checks one more time to see how far you've come. Practice only — never graded.",
};

function instrumentLabel(_instrument: string): string {
  return "Constructive Critical Reasoning";
}

function Row({ a }: { a: ReasoningAssessmentSummary }) {
  const Icon = Brain;
  const completed = a.status === "passed";
  return (
    <Link href={`/reasoning/${a.id}`}>
      <div
        className="flex items-center justify-between gap-4 p-3 rounded-md border border-border bg-background hover:bg-secondary/50 cursor-pointer"
        data-testid={`callout-reasoning-${a.id}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <Icon className="w-4 h-4 text-primary shrink-0" />
          <span className="text-sm font-medium truncate">
            {instrumentLabel(a.instrument)}
          </span>
        </div>
        {completed ? (
          <span className="inline-flex items-center gap-1 text-xs text-chart-2 font-medium shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
          </span>
        ) : (
          <Button size="sm" variant="default" className="shrink-0">
            {a.status === "in_progress" ? "Resume" : "Begin"}
          </Button>
        )}
      </div>
    </Link>
  );
}

export function ReasoningCallout({ phase }: { phase: Phase }) {
  const { data } = useListReasoningAssessments();
  const items = (data ?? []).filter((a) => a.phase === phase);
  if (items.length === 0) return null;

  const sorted = items;

  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardContent className="p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-serif font-semibold">{HEADINGS[phase]}</h3>
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            Practice only
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{BLURBS[phase]}</p>
        <div className="flex flex-col gap-2">
          {sorted.map((a) => (
            <Row key={a.id} a={a} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
