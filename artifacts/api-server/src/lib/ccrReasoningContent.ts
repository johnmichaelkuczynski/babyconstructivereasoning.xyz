// ---------------------------------------------------------------------------
// Original content for the embedded Constructive Critical Reasoning (CCR)
// diagnostic assessment (instrument = "ccr").
//
// CCR is the discipline of drawing the STRONGEST conclusion the AVAILABLE
// EVIDENCE actually warrants. The best answer commits to the conclusion the
// given evidence supports and/or names a cheap decisive test; the failure modes
// are a reckless overreach the evidence defeats and a passive give-up. Every
// scenario must contain real discriminating evidence — when the evidence is
// genuinely insufficient, declining to guess is the HONEST answer, not a dodge,
// so we never write equal-fit/no-data scenarios that punish it.
//
// These are DIAGNOSTICS: ungraded practice, retakable, never repeating. Items
// are normal single-correct multiple-choice (NOT partial credit) plus short
// open-response. For every MCQ the genuinely-best option is written FIRST,
// followed by three plausible distractors. The "can't conclude anything"
// refusal appears as a distractor ONLY where the scenario truly has enough
// evidence to decide. Options are rotated at seed/generation time.
//
// Items are spread across the eight CCR sub-skills:
//   fecund leads, explanatory yield, parsimony as tiebreaker,
//   abductive commitment, correlation->mechanism, anomaly clusters,
//   cheap decisive tests, calibrated boldness.
//
// All content is ORIGINAL and scenario-based.
// ---------------------------------------------------------------------------

import type { McqItem, OpenItem } from "./diagnosticContent";

// The eight CCR sub-skills, used to spread freshly generated diagnostic items
// across the discipline (one item per sub-skill, cycled as needed).
export const CCR_SUBSKILLS: string[] = [
  "treating a surprising pattern as a fecund lead worth actively pursuing",
  "preferring the explanation with the most explanatory yield (one cause binding many effects)",
  "when two models compete, taking the leaner one as the working hypothesis and naming the cheap test that would actually decide between them (never treating simplicity alone as proof)",
  "committing to the explanation the available evidence best supports, and naming the check that would confirm it",
  "moving from a bare correlation to a specific, testable underlying mechanism",
  "treating a tight anomaly cluster as a real localized signal, not random scatter",
  "choosing the cheapest decisive test that separates the rival explanations",
  "stating the boldest conclusion the data supports, paired with a falsifying prediction",
];

// ===========================================================================
// CCR DIAGNOSTIC — original scenario MCQs (correct option FIRST, 4 total)
// ===========================================================================

export const CCR_MCQ_BANK: McqItem[] = [
  // --- fecund leads ---------------------------------------------------------
  {
    prompt:
      "A small bakery notices that on the three days a particular regular customer visited, every leftover loaf sold out by noon, while on other days loaves lingered until evening. The owner has limited time to investigate. Which response reasons best?",
    options: [
      "Treat the regular's visits as a fecund lead: hypothesize she brings or attracts other buyers, and track foot traffic on her next visit to confirm the spillover.",
      "Conclude nothing can be inferred from only three days of data.",
      "Declare that the customer personally guarantees the bakery will always sell out.",
      "Assume loaves simply sell faster in general and ignore the pattern.",
    ],
  },
  {
    prompt:
      "A game studio sees that bug reports spike sharply in the 20 minutes after each new level loads, then fall to near zero. A tester says 'it's probably nothing.' Which move reasons best?",
    options: [
      "Follow the lead: hypothesize the level-load path itself introduces the faults, and instrument loads to log which assets fail right after loading.",
      "Conclude the timing is a coincidence that tells us nothing.",
      "Declare with certainty that the entire engine is broken beyond repair.",
      "Wait passively for users to complain before looking at anything.",
    ],
  },

  // --- explanatory yield ----------------------------------------------------
  {
    prompt:
      "Three things happen together at a clinic: wait times drop, patient complaints fall, and staff overtime decreases — all starting the week a new scheduling tool launched. Two explanations are on the table. Which conclusion best follows from the evidence?",
    options: [
      "The scheduling tool is the strongest candidate because one cause binds all three changes at once; confirm by pausing it for a week and watching whether all three revert.",
      "Each change probably has its own unrelated cause, so we can't say anything links them.",
      "Only the wait-time drop matters; the other two are noise to discard.",
      "Nothing can be concluded because correlation never implies anything.",
    ],
  },
  {
    prompt:
      "A teacher observes that since seating was rearranged, quiz scores rose, side-chatter fell, and more students ask questions. Which explanation best fits all the evidence?",
    options: [
      "The new seating likely improved engagement, since one change accounts for all three effects together; test it by reverting the seating and checking whether all three slip back.",
      "We should pick whichever single effect is easiest to measure and ignore the rest.",
      "These are three separate coincidences with no common thread worth pursuing.",
      "It is impossible to know whether seating mattered, so no claim is warranted.",
    ],
  },

  // --- parsimony as tiebreaker ----------------------------------------------
  {
    prompt:
      "Two models fit a store's sales data equally well. Model A: a single price cut drove the rise. Model B: a price cut, a secret weather effect, a hidden ad nobody can find, and a loyalty shift all combined to drive it. Both predict the same numbers, and nothing on hand separates them yet. What's the best move?",
    options: [
      "Take the single price cut as the leaner working hypothesis and actually settle it: reverse the price cut for a week and see whether the rise reverses.",
      "Declare Model B correct because more factors always make an explanation more complete.",
      "Insist the price cut alone is definitely the whole story and stop checking.",
      "Conclude the cause is simply unknowable and change nothing.",
    ],
  },
  {
    prompt:
      "A network outage could be explained by (A) one failed router everything routes through, or (B) five independent devices each failing in the same minute by chance. Both are consistent with the logs so far. What's the best move?",
    options: [
      "Take the single failed router as the leading hypothesis and test it directly: swap that one router and see if service returns.",
      "Assume all five devices failed at once, since covering more parts sounds more thorough.",
      "Declare the router guilty with certainty and skip any check.",
      "Conclude the cause is unknowable and wait for the outage to recur on its own.",
    ],
  },

  // --- abductive commitment -------------------------------------------------
  {
    prompt:
      "You return home to find the floor wet, the ceiling stained directly above, and a drip still falling from that spot. Which conclusion is best supported?",
    options: [
      "Commit to the best explanation — a leak in the pipe or roof above that spot — and confirm by checking the area directly upstream of the drip.",
      "Withhold any judgment, since many imaginable scenarios could produce a wet floor.",
      "Conclude someone definitely sabotaged the plumbing on purpose.",
      "Decide the water appeared for no discoverable reason.",
    ],
  },
  {
    prompt:
      "A laptop won't power on. The charger light is off, the outlet runs other devices fine, and a different charger powers the laptop instantly. What is the best inference?",
    options: [
      "Infer the original charger is the faulty part — it best explains every observation — and confirm by testing that charger on an identical laptop.",
      "Refuse to name a cause, since a dead laptop could in principle have countless causes.",
      "Conclude the laptop's motherboard is certainly destroyed.",
      "Assume the outlet is the problem despite it powering other devices.",
    ],
  },

  // --- correlation -> mechanism ---------------------------------------------
  {
    prompt:
      "A café finds tips run far higher on days the barista wears a flower pin. She only wears the pin on days she feels cheerful. Which conclusion best follows from the evidence?",
    options: [
      "Her cheerful mood likely drives both the pin-wearing and the higher tips; test the mechanism by having her wear the pin on a low-mood day and seeing if tips stay low.",
      "Conclude nothing, because correlation can never tell us anything at all.",
      "Declare the pin itself magically causes customers to tip more.",
      "Insist tips and the pin are entirely unrelated despite the gap.",
    ],
  },
  {
    prompt:
      "Neighborhoods with more streetlights report fewer break-ins. They also tend to be wealthier, with more locks and alarms. Which response reasons best?",
    options: [
      "Propose that wealth-linked security (locks, alarms) is the likely mechanism behind both more lights and fewer break-ins, and test it by comparing break-ins in equally wealthy blocks that differ only in lighting.",
      "Conclude streetlights directly and single-handedly stop all burglars.",
      "Decide the correlation is meaningless and drop the question entirely.",
      "Assume burglars simply prefer darkness and ignore the wealth difference.",
    ],
  },

  // --- anomaly clusters -----------------------------------------------------
  {
    prompt:
      "A factory's defect logs look random overall, but defects cluster tightly on items made between 2 and 3 p.m. on the same line. A manager calls it 'just random scatter.' What is the best move?",
    options: [
      "Treat the cluster as a real signal: hypothesize a cause specific to that line and hour (a shift change or a warming machine) and test by sampling output across that exact window.",
      "Agree it is random scatter, since defects appear at other times too.",
      "Conclude the whole factory must be shut down immediately.",
      "Ignore the cluster because the overall rate looks normal.",
    ],
  },
  {
    prompt:
      "Customer complaints about a delivery app are spread thinly across the country, except for a dense cluster from one city in one week. Which conclusion best follows from the evidence?",
    options: [
      "Treat the cluster as a localized cause — a specific outage, courier, or update in that city that week — and confirm by pulling that city's logs for those exact days.",
      "Dismiss it as chance, since complaints occur everywhere anyway.",
      "Conclude the app is uniformly broken for every user nationwide.",
      "Decide the cluster is unexplainable and move on.",
    ],
  },

  // --- cheap decisive tests -------------------------------------------------
  {
    prompt:
      "A gardener suspects a new fertilizer, not extra sunlight, made one bed of plants grow taller than the rest. She wants the most informative next step for the least effort. Which is the best next step?",
    options: [
      "Apply the fertilizer to a shaded bed and withhold it from a sunny one — a cheap swap that decisively separates fertilizer from sunlight.",
      "Conclude the cause can't be known without a multi-year university study.",
      "Re-measure all the plants again without changing anything.",
      "Declare the fertilizer is responsible and stop testing entirely.",
    ],
  },
  {
    prompt:
      "Two teams blame each other for slow page loads: the front-end team blames the server, the server team blames the front-end. Which single move would most cheaply and decisively settle it?",
    options: [
      "Load the same page against a stripped-down test server: if it's still slow the front-end is implicated, and if it's fast the server is — one experiment that decides it.",
      "Hold more meetings until one team concedes.",
      "Conclude the cause is genuinely impossible to isolate.",
      "Rewrite the entire codebase before gathering any more evidence.",
    ],
  },

  // --- calibrated boldness --------------------------------------------------
  {
    prompt:
      "A large, well-run trial shows a new drug cured 95% of patients with a condition, with few side effects. A reviewer says 'we still can't claim anything.' Which conclusion is best calibrated to the evidence?",
    options: [
      "Conclude the drug will very likely help most future patients with this condition, and commit to that prediction while monitoring outcomes as it's rolled out.",
      "Refuse to predict anything, since no result is ever fully certain.",
      "Claim the drug will cure every disease in every person.",
      "Conclude the drug only works inside trials and will fail in practice.",
    ],
  },
  {
    prompt:
      "Across 40 cities, every time a bus lane was added, average commute times fell within a month, with no exceptions yet observed. A planner must advise a new city. What is the best-calibrated advice?",
    options: [
      "Predict the bus lane will probably cut commute times here too, commit to building it, and pre-register the one-month commute check that would falsify the prediction.",
      "Advise that nothing can be predicted because every city is unique.",
      "Promise the bus lane will eliminate all traffic permanently.",
      "Recommend doing nothing until results from 400 more cities arrive.",
    ],
  },
];

// ===========================================================================
// CCR DIAGNOSTIC — short open-response items. keyPoints capture the strongest
// supported conclusion a good 1-2 sentence answer commits to, plus a test —
// NOT a hedge.
// ===========================================================================

export const CCR_OPEN_BANK: OpenItem[] = [
  // fecund leads
  {
    prompt:
      "Every time a particular sales rep joins a client call, the deal closes faster than average — it has happened on his last six calls. In one sentence, state the strongest conclusion worth pursuing and how you'd follow the lead.",
    keyPoints: [
      "Treat the rep's involvement as a fecund lead: something he does likely accelerates closing.",
      "Follow it by assigning him to a fresh set of comparable deals and tracking whether they close faster too.",
    ],
  },
  // explanatory yield
  {
    prompt:
      "Since a company switched to a 4-day week, output rose, sick days fell, and turnover dropped. In one sentence, give the conclusion with the most explanatory yield and a way to test it.",
    keyPoints: [
      "The 4-day week is the strongest candidate because one change binds all three improvements at once.",
      "Test it by reverting to a 5-day week for a period and checking whether all three measures slip back.",
    ],
  },
  // parsimony as tiebreaker
  {
    prompt:
      "Two explanations fit your data equally well: one cites a single cause, the other stacks four unverified causes. In one sentence, say which you should commit to and why, plus how to confirm it.",
    keyPoints: [
      "Commit to the single-cause explanation: with equal fit, parsimony breaks the tie in favor of fewer unsupported entities.",
      "Confirm by removing or reversing that one cause and checking whether the effect disappears.",
    ],
  },
  // abductive commitment
  {
    prompt:
      "You find muddy paw prints leading from the open back door to the dog's bed, and the dog is wet. In one sentence, commit to the best explanation and name a check that would confirm it.",
    keyPoints: [
      "Infer the dog went outside through the open door and came back wet and muddy — the explanation that accounts for all the clues.",
      "Confirm by checking outside for matching prints or a wet/muddy area the dog used.",
    ],
  },
  // correlation -> mechanism
  {
    prompt:
      "Students who use the library most also get the highest grades, but they also study more hours overall. In one sentence, propose the likely mechanism and a test that isolates it.",
    keyPoints: [
      "Propose that total study effort (not the library itself) is the likely mechanism driving both library use and higher grades.",
      "Isolate it by comparing students with equal study hours who differ only in library use.",
    ],
  },
  // anomaly clusters
  {
    prompt:
      "Server errors are rare and scattered, except for a tight burst every night between 1 and 2 a.m. In one sentence, state the strongest conclusion and the test it implies.",
    keyPoints: [
      "Treat the nightly burst as a real signal pointing to a scheduled cause active in that window (such as a backup or batch job).",
      "Test by inspecting what runs between 1 and 2 a.m. and pausing it to see if the errors stop.",
    ],
  },
  // cheap decisive tests
  {
    prompt:
      "Your plant is wilting and you suspect either too little water or too little light, but you're not sure which. In one sentence, name the single cheapest test that would most decisively tell them apart.",
    keyPoints: [
      "Change only one factor at a time — e.g., move it to bright light while keeping watering the same.",
      "If it recovers, light was the cause; if not, water is implicated — one cheap change that decides it.",
    ],
  },
  // calibrated boldness
  {
    prompt:
      "In a large, well-designed trial, a teaching method raised test scores in 9 of 10 schools with no failures. In one sentence, give the boldest conclusion the data supports and the prediction that would falsify it.",
    keyPoints: [
      "Conclude the method will very likely raise scores in similar schools and commit to adopting it.",
      "Falsify the claim if a new comparable school shows no score gain after a fair trial.",
    ],
  },
];
