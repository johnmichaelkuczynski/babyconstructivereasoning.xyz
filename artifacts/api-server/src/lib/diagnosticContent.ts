// ---------------------------------------------------------------------------
// Original content for the embedded diagnostic reasoning assessments.
//
// Two instruments, each administered twice (a baseline before the course and a
// checkpoint after the single unit) with MUTUALLY UNIQUE items:
//   - Professional Judgment (DIT-style): a realistic everyday scenario; the
//     student rates ~12 considerations by importance and ranks the most
//     important few. A principled-judgment ("P") index is computed from how
//     postconventional considerations are ranked. Stages: P = personal
//     interest, M = maintaining norms/rules/approval, PC = postconventional/
//     principled, X = meaningless (a reliability check — ranking it high
//     signals careless responding).
//   - Critical Reasoning (CCTST-style): multiple-choice items spanning analysis,
//     inference, evaluation, deduction, and induction.
//
// All items are ORIGINAL. No real DIT or CCTST items are reproduced. For every
// MCQ the correct option is written FIRST; at seed time options are rotated so
// the correct answer lands at a varied index (see seedDiagnostics.ts).
// ---------------------------------------------------------------------------

export type Stage = "P" | "M" | "PC" | "X";

export type DilemmaItem = {
  prompt: string;
  decisionOptions: string[];
  considerations: { text: string; stage: Stage }[];
  rankCount: number;
};

export type SkillArea =
  | "analysis"
  | "inference"
  | "evaluation"
  | "deduction"
  | "induction";

export type McqItem = {
  prompt: string;
  // Correct option is listed FIRST. Rotated at seed time.
  options: string[];
  skillArea: SkillArea;
};

export type Phase = "baseline" | "unit1";

export type DiagnosticSeed = {
  instrument: "ethical" | "critical";
  phase: Phase;
  title: string;
  subtitle: string;
  instructions: string;
  dilemmas?: DilemmaItem[];
  mcqs?: McqItem[];
};

const ETHICAL_INSTRUCTIONS =
  "Read the scenario and decide what the person should do. Then rate each consideration by how important it was to your decision, and finally rank your most important considerations. There are no right or wrong answers here — answer honestly. Submitting completes the assessment and you'll receive written feedback on your reasoning.";

const CRITICAL_INSTRUCTIONS =
  "Answer each question by selecting the single best option. Work carefully — these questions measure reasoning, not recall. Submitting completes the assessment and you'll receive written feedback on your performance.";

// ===========================================================================
// PROFESSIONAL JUDGMENT — two unique everyday scenarios
// ===========================================================================

const DILEMMA_BASELINE: DilemmaItem = {
  prompt:
    "Mia helped run a small experiment for her group's science-fair project, testing whether people can tell apart a short paragraph written by an AI chatbot from one written by a person. The real difference her group found was tiny. The day before judging, a teammate asks Mia to describe the result on their poster as a 'huge, dramatic difference,' even though it was barely there, because it 'sounds more impressive.' The actual numbers wouldn't change — only how they're described.\n\nShould Mia refuse and present the result honestly?",
  decisionOptions: [
    "Mia should refuse and present the result honestly",
    "Can't decide",
    "Mia should exaggerate the result to sound impressive, as asked",
  ],
  considerations: [
    { text: "Whether refusing would make Mia look difficult and upset her teammates.", stage: "P" },
    { text: "Whether the judges and audience deserve an accurate description so they can judge fairly.", stage: "PC" },
    { text: "Whether Mia's job is simply to do whatever the group decides.", stage: "M" },
    { text: "Whether calling a tiny difference 'huge,' even with the same numbers, misleads the people listening.", stage: "PC" },
    { text: "Whether Mia would feel more comfortable just going along with the request.", stage: "P" },
    { text: "Whether the science-fair rules call for honest reporting of results.", stage: "M" },
    { text: "Whether Mia might be thanked by the group for being a cooperative 'team player'.", stage: "P" },
    { text: "Whether exaggerating the result chips away at the honesty the whole project depends on.", stage: "PC" },
    { text: "Whether the group should have used nicer poster colors.", stage: "X" },
    { text: "Whether 'everyone hypes up their results anyway.'", stage: "M" },
    { text: "Whether the people reading the poster deserve a faithful account of what really happened.", stage: "PC" },
    { text: "Whether refusing might cost Mia a good grade from her teammates' point of view.", stage: "P" },
  ],
  rankCount: 4,
};

const DILEMMA_UNIT1: DilemmaItem = {
  prompt:
    "Theo runs the sign-up sheet for the school chess club. People wrote down their phone numbers only so they could get reminders about chess meetings. Now a friend running an unrelated bake-sale fundraiser asks Theo to share those numbers to send out fundraiser texts. The friend says 'it's for a good cause, and you have the numbers anyway.'\n\nShould Theo refuse to hand over the private phone numbers?",
  decisionOptions: [
    "Theo should refuse to share the private numbers",
    "Can't decide",
    "Theo should share the numbers, as his friend asks",
  ],
  considerations: [
    { text: "Whether the people who signed up have a right to the privacy they were promised.", stage: "PC" },
    { text: "Whether Theo could get blamed if people found out their numbers were shared.", stage: "P" },
    { text: "Whether keeping a promise to people matters even when breaking it would help a good cause.", stage: "PC" },
    { text: "Whether the friend's say-so is enough to make sharing okay.", stage: "M" },
    { text: "Whether Theo would gain his friend's gratitude by handing the numbers over.", stage: "P" },
    { text: "Whether the school's rules about personal information cover how the list may be used.", stage: "M" },
    { text: "Whether Theo personally likes the friend asking.", stage: "P" },
    { text: "Whether the people on the list would agree if Theo actually asked them first.", stage: "PC" },
    { text: "Whether the fundraiser texts should use a fun emoji.", stage: "X" },
    { text: "Whether 'you have the numbers anyway' is a good enough reason.", stage: "M" },
    { text: "Whether trust between the club and its members depends on honoring such promises.", stage: "PC" },
    { text: "Whether refusing could cause an argument with his friend.", stage: "P" },
  ],
  rankCount: 4,
};

// ===========================================================================
// CRITICAL REASONING — two unique 10-item forms (correct option listed first)
// ===========================================================================

const CRITICAL_BASELINE: McqItem[] = [
  {
    prompt:
      "Consider: 'All students who studied passed the exam. Maria studied. So Maria passed.' Which unstated assumption does the argument rely on?",
    options: [
      "Maria is among the students the first statement describes.",
      "Studying is the only way to pass the exam.",
      "Maria always studies for her exams.",
      "The exam was unusually difficult.",
    ],
    skillArea: "analysis",
  },
  {
    prompt:
      "'Since the new policy cut accidents by 40%, and fewer accidents mean lower insurance costs, the city should keep the policy. After all, saving money benefits everyone.' What is the main conclusion?",
    options: [
      "The city should keep the policy.",
      "The new policy cut accidents by 40%.",
      "Fewer accidents mean lower insurance costs.",
      "Saving money benefits everyone.",
    ],
    skillArea: "analysis",
  },
  {
    prompt:
      "A survey finds 70% of people who exercise daily report good sleep, versus 30% of those who never exercise. Which conclusion is best supported?",
    options: [
      "People who exercise daily are more likely to report good sleep than those who never exercise.",
      "Exercise guarantees good sleep for everyone.",
      "Poor sleep is what causes people to stop exercising.",
      "Anyone who wants good sleep must exercise daily.",
    ],
    skillArea: "inference",
  },
  {
    prompt:
      "A report notes that ice-cream sales and drowning deaths rise in the same months. A careful reader should infer that:",
    options: [
      "Both may be linked to a third factor, such as hot weather.",
      "Eating ice cream causes drowning.",
      "Drowning incidents cause ice-cream sales.",
      "The data must simply be mistaken.",
    ],
    skillArea: "inference",
  },
  {
    prompt: "Which source would most strengthen the claim 'this medication is safe'?",
    options: [
      "A large, peer-reviewed clinical trial.",
      "A testimonial from one satisfied customer.",
      "An advertisement produced by the manufacturer.",
      "A popular wellness blog post.",
    ],
    skillArea: "evaluation",
  },
  {
    prompt:
      "'My grandfather smoked daily and lived to 95, so smoking isn't really harmful.' The main weakness of this argument is that it:",
    options: [
      "Relies on a single example against strong statistical evidence.",
      "Quotes an unreliable expert.",
      "Contains an internal contradiction.",
      "Appeals purely to emotion.",
    ],
    skillArea: "evaluation",
  },
  {
    prompt:
      "'All mammals are warm-blooded. All whales are mammals. Therefore all whales are warm-blooded.' This argument is:",
    options: [
      "Valid.",
      "Invalid, because whales live in water.",
      "Invalid, because it assumes what it proves.",
      "Invalid, because the premises are uncertain.",
    ],
    skillArea: "deduction",
  },
  {
    prompt:
      "'If it rained, the streets are wet. The streets are not wet.' What necessarily follows?",
    options: [
      "It did not rain.",
      "It rained.",
      "The streets are dry for some other reason.",
      "Nothing at all follows.",
    ],
    skillArea: "deduction",
  },
  {
    prompt:
      "A pollster surveys five of her friends and predicts how the whole country will vote. The strongest objection is that:",
    options: [
      "The sample is far too small and unrepresentative.",
      "Friends never tell the truth.",
      "Polls are always wrong.",
      "Voting is supposed to be private.",
    ],
    skillArea: "induction",
  },
  {
    prompt:
      "Plants given a new fertilizer grew taller than otherwise identical plants without it, all else held equal. The best-supported conclusion is:",
    options: [
      "The fertilizer probably caused the extra growth.",
      "Taller plants attract more fertilizer.",
      "Fertilizer is required for any plant growth at all.",
      "The result was pure coincidence.",
    ],
    skillArea: "induction",
  },
];

const CRITICAL_UNIT1: McqItem[] = [
  {
    prompt: "'We should ban the chemical because it's unnatural.' This argument assumes that:",
    options: [
      "Natural things are always safe and unnatural things are harmful.",
      "The chemical is expensive to produce.",
      "Bans are easy to enforce.",
      "Most people dislike the chemical.",
    ],
    skillArea: "analysis",
  },
  {
    prompt:
      "'The bridge must be inspected, because cracks have appeared and ignoring cracks has caused collapses before.' Which is a premise supporting the conclusion?",
    options: [
      "Cracks have appeared on the bridge.",
      "The bridge must be inspected.",
      "The bridge is quite old.",
      "Inspections are expensive.",
    ],
    skillArea: "analysis",
  },
  {
    prompt:
      "A study finds students who eat breakfast score higher on morning tests than those who skip it. Which is best supported?",
    options: [
      "Eating breakfast is associated with higher morning test scores.",
      "Breakfast makes everyone a genius.",
      "Skipping breakfast should be banned.",
      "Tests should always be held in the afternoon.",
    ],
    skillArea: "inference",
  },
  {
    prompt: "'All items on the shelf are on sale. The blue mug is on the shelf.' Therefore:",
    options: [
      "The blue mug is on sale.",
      "The blue mug is expensive.",
      "Only mugs are on sale.",
      "The shelf is completely full.",
    ],
    skillArea: "inference",
  },
  {
    prompt: "To evaluate the claim 'crime is rising,' which is the most relevant evidence?",
    options: [
      "Official crime statistics gathered over several years.",
      "A friend's sense that things seem worse lately.",
      "A dramatic recent news headline.",
      "A popular movie about crime.",
    ],
    skillArea: "evaluation",
  },
  {
    prompt:
      "'You can't trust her argument for the policy — she's not even an economist.' This response is weak because it:",
    options: [
      "Attacks the person rather than the argument.",
      "Relies on too much data.",
      "Is far too detailed.",
      "Simply restates the policy.",
    ],
    skillArea: "evaluation",
  },
  {
    prompt:
      "'If a number is divisible by 4, it is even. Twelve is divisible by 4.' What necessarily follows?",
    options: [
      "Twelve is even.",
      "Twelve is odd.",
      "All even numbers are divisible by 4.",
      "Nothing follows.",
    ],
    skillArea: "deduction",
  },
  {
    prompt:
      "'If she practiced, she improved. She improved. Therefore she practiced.' This reasoning is:",
    options: [
      "Invalid, because she might have improved for another reason.",
      "Valid and certain.",
      "Invalid, because practice never helps.",
      "Valid only on weekends.",
    ],
    skillArea: "deduction",
  },
  {
    prompt:
      "After three rainy Mondays in a row, someone concludes 'it always rains on Mondays.' This generalization is:",
    options: [
      "Hasty — based on far too few cases.",
      "A valid logical deduction.",
      "Certainly true.",
      "Impossible to evaluate at all.",
    ],
    skillArea: "induction",
  },
  {
    prompt:
      "A new drug cured 95% of patients in a large, well-designed trial. The best-supported prediction is:",
    options: [
      "The drug will likely help most future patients with the condition.",
      "The drug will cure every disease.",
      "The drug works only inside trials.",
      "The drug is probably unsafe.",
    ],
    skillArea: "induction",
  },
];

export const DIAGNOSTIC_SEED: DiagnosticSeed[] = [
  {
    instrument: "ethical",
    phase: "baseline",
    title: "Professional Judgment Inventory — Baseline",
    subtitle: "Before the course",
    instructions: ETHICAL_INSTRUCTIONS,
    dilemmas: [DILEMMA_BASELINE],
  },
  {
    instrument: "critical",
    phase: "baseline",
    title: "Critical Reasoning Assessment — Baseline",
    subtitle: "Before the course",
    instructions: CRITICAL_INSTRUCTIONS,
    mcqs: CRITICAL_BASELINE,
  },
  {
    instrument: "ethical",
    phase: "unit1",
    title: "Professional Judgment Inventory — Course Checkpoint",
    subtitle: "After the unit: Baby AI for Everyone",
    instructions: ETHICAL_INSTRUCTIONS,
    dilemmas: [DILEMMA_UNIT1],
  },
  {
    instrument: "critical",
    phase: "unit1",
    title: "Critical Reasoning Assessment — Course Checkpoint",
    subtitle: "After the unit: Baby AI for Everyone",
    instructions: CRITICAL_INSTRUCTIONS,
    mcqs: CRITICAL_UNIT1,
  },
];

// ===========================================================================
// SHORT OPEN-RESPONSE ITEMS & EVERYDAY-JUDGMENT MCQs
//
// These power the "written" and "hybrid" answer formats and act as static
// fallbacks when AI generation is unavailable, so an attempt never blocks.
// Open answers are 1-2 sentences and are graded LENIENTLY on substance — a
// single correct core idea earns credit, never penalized for length.
// ===========================================================================

export type OpenItem = {
  prompt: string;
  // The core idea(s) a good 1-2 sentence answer should capture. Used both as
  // the grading key and shown to the student in review.
  keyPoints: string[];
  skillArea?: SkillArea;
};

// One short open question per critical-reasoning skill area.
export const OPEN_FALLBACK_CRITICAL: OpenItem[] = [
  {
    prompt:
      "In one sentence, name the assumption this argument depends on: 'Everyone who studied passed the test. Sam studied, so Sam passed.'",
    keyPoints: [
      "It assumes Sam is one of the people the first claim covers — i.e. that studying really did guarantee passing for him too.",
    ],
    skillArea: "analysis",
  },
  {
    prompt:
      "A survey finds that people who exercise daily report better sleep than people who never exercise. In one sentence, say what this lets you conclude — and what it does not.",
    keyPoints: [
      "It shows an association/correlation, not that exercise causes better sleep.",
      "Correlation is not causation.",
    ],
    skillArea: "inference",
  },
  {
    prompt:
      "In one sentence, explain why a single happy customer's testimonial is weak evidence that a product is safe for everyone.",
    keyPoints: [
      "One anecdote isn't representative of all users.",
      "A sample of one with no controlled comparison can't establish general safety.",
    ],
    skillArea: "evaluation",
  },
  {
    prompt:
      "'If it rained, the street is wet. The street is not wet.' In one sentence, what follows, and why?",
    keyPoints: [
      "It did not rain.",
      "By the contrapositive (modus tollens): if the consequence is false, the condition must be false.",
    ],
    skillArea: "deduction",
  },
  {
    prompt:
      "Someone sees three rainy Mondays in a row and concludes 'it always rains on Mondays.' In one sentence, what is wrong with that reasoning?",
    keyPoints: [
      "It's a hasty generalization.",
      "Three cases are far too few to support 'always'.",
    ],
    skillArea: "induction",
  },
];

// Short open questions for everyday-judgment (Professional Judgment) scenarios.
export const OPEN_FALLBACK_ETHICAL: OpenItem[] = [
  {
    prompt:
      "A teammate asks you to describe a tiny experimental difference as a 'huge' result on a science-fair poster. In one sentence, what should you do and why?",
    keyPoints: [
      "Report the result honestly/accurately.",
      "The judges and audience deserve a truthful description so they can judge fairly.",
      "Integrity matters more than sounding impressive.",
    ],
  },
  {
    prompt:
      "A friend wants club members' phone numbers — given only for club reminders — to text them about a bake sale. In one sentence, what should you do and why?",
    keyPoints: [
      "Don't share the numbers without the members' consent.",
      "They were given for a specific purpose; sharing them breaks that promise and their privacy.",
    ],
  },
];

// Everyday ethical-judgment multiple-choice questions (correct option FIRST,
// rotated at generation time). Tagged with a reasoning skill so the score
// breakdown still works for MCQ-only Professional Judgment attempts.
export const JUDGMENT_MCQ_FALLBACK: McqItem[] = [
  {
    prompt:
      "Dana finds a wallet on the sidewalk with $200 cash and an ID card inside. The most defensible thing to do is:",
    options: [
      "Return the wallet and the money to the owner using the ID.",
      "Keep the cash and hand in the empty wallet.",
      "Leave the wallet exactly where it was found.",
      "Keep everything, since 'finders keepers'.",
    ],
    skillArea: "evaluation",
  },
  {
    prompt:
      "A teammate asks Mia to label a tiny experimental result as a 'huge difference' on a poster to impress judges. The strongest reason for Mia to refuse is that:",
    options: [
      "The audience deserves an accurate description to judge the work fairly.",
      "Refusing makes Mia look like a harder worker.",
      "Exaggerating is more effort than it's worth.",
      "Her teammate might be wrong about the numbers anyway.",
    ],
    skillArea: "evaluation",
  },
  {
    prompt:
      "A friend asks Theo for club members' phone numbers — collected only for club reminders — to text them ads. The strongest consideration against sharing is:",
    options: [
      "The members gave their numbers for one purpose and never agreed to ads.",
      "Sending lots of texts could cost money.",
      "The friend could just send the texts personally.",
      "Some of the numbers might be out of date.",
    ],
    skillArea: "evaluation",
  },
  {
    prompt:
      "You realize you accidentally broke a classmate's project. The most responsible first step is to:",
    options: [
      "Tell them what happened and offer to help fix it.",
      "Say nothing and hope they don't notice.",
      "Blame the crowded room.",
      "Wait to see whether anyone saw you.",
    ],
    skillArea: "evaluation",
  },
  {
    prompt:
      "An online service offers to 'guarantee an A' if you pay for the test answers in advance. Choosing not to use it best reflects:",
    options: [
      "Fairness to other students and the value of doing your own work.",
      "A worry about catching a computer virus.",
      "Simply not having enough money to pay.",
      "A general distrust of online payments.",
    ],
    skillArea: "evaluation",
  },
  {
    prompt:
      "A cashier accidentally hands you $10 too much in change. The most honest response is to:",
    options: [
      "Point out the mistake and return the extra money.",
      "Keep it — it was their error, not yours.",
      "Keep it but feel a little guilty.",
      "Spend it quickly before anyone notices.",
    ],
    skillArea: "evaluation",
  },
];
