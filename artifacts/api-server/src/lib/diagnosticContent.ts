// ---------------------------------------------------------------------------
// Original content for the embedded diagnostic reasoning assessments.
//
// Two instruments, each administered 5 times with MUTUALLY UNIQUE items:
//   - Ethical Reasoning  (DIT-style): a moral dilemma; the student rates ~12
//     considerations by importance and ranks the most important few. A
//     principled-reasoning ("P") index is computed from how postconventional
//     considerations are ranked. Stages: P = personal interest, M = maintaining
//     norms/law/approval, PC = postconventional/principled, X = meaningless
//     (a reliability check — ranking it high signals careless responding).
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

export type Phase = "baseline" | "unit1" | "unit2" | "unit3" | "unit4";

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
  "Read the scenario and decide what the person should do. Then rate each consideration by how important it was to your decision, and finally rank your most important considerations. There are no right or wrong answers here — answer honestly. Submitting completes the assessment and you'll receive written feedback on your moral reasoning.";

const CRITICAL_INSTRUCTIONS =
  "Answer each question by selecting the single best option. Work carefully — these questions measure reasoning, not recall. Submitting completes the assessment and you'll receive written feedback on your performance.";

// ===========================================================================
// ETHICAL REASONING — five unique dilemmas
// ===========================================================================

const DILEMMA_BASELINE: DilemmaItem = {
  prompt:
    "Dana manages a ten-person team and has been told, confidentially, to lay off three people so the company can stay solvent. One employee, Sam, is a single parent and a below-average performer. Another, Pat, is the strongest performer on the team but is independently wealthy. Dana could base the cuts purely on performance, or could spare Sam — cutting a stronger performer instead — because Sam needs the job far more.\n\nShould Dana spare the weaker performer who needs the job most?",
  decisionOptions: [
    "Dana should spare Sam and cut a stronger performer instead",
    "Can't decide",
    "Dana should cut strictly by job performance",
  ],
  considerations: [
    { text: "Whether sparing Sam would let Dana feel like a good person.", stage: "P" },
    { text: "Whether Dana could be sued or fired for not following the stated criteria.", stage: "P" },
    { text: "Whether the company's survival — and therefore everyone's jobs — depends on keeping the most productive team.", stage: "PC" },
    { text: "Whether it is fair to let an employee's private wealth, rather than their work, decide who is fired.", stage: "PC" },
    { text: "Whether Dana's colleagues would approve of protecting a single parent.", stage: "M" },
    { text: "Whether every employee has a right to be judged by the same standard.", stage: "PC" },
    { text: "Whether keeping the weakest performer breaks the commitment Dana made to upper management.", stage: "M" },
    { text: "Whether the moral weight of a child's welfare can outweigh a small loss in team output.", stage: "PC" },
    { text: "Whether Dana might be promoted for making the 'tough,' data-driven call.", stage: "P" },
    { text: "Whether the office should lower its thermostat to cut costs.", stage: "X" },
    { text: "Whether company rules should always be followed no matter the human cost.", stage: "M" },
    { text: "Whether avoiding the decision entirely would be easiest for Dana.", stage: "P" },
  ],
  rankCount: 4,
};

const DILEMMA_UNIT1: DilemmaItem = {
  prompt:
    "Professor Lee is asked to write a recommendation letter for a former student, Robin, who is applying to a competitive program. Robin was hardworking and kind but academically mediocre. A glowing, exaggerated letter would likely get Robin in; an honest letter probably would not. Robin is the family's first real hope of escaping poverty.\n\nShould Professor Lee write a more glowing letter than the truth warrants?",
  decisionOptions: [
    "Lee should write the exaggerated, glowing letter",
    "Can't decide",
    "Lee should write only what is honestly warranted",
  ],
  considerations: [
    { text: "Whether honesty is valuable in itself, not merely because it is useful.", stage: "PC" },
    { text: "Whether Lee could be caught and suffer professionally.", stage: "P" },
    { text: "Whether helping Robin escape poverty is a great enough good to justify a small distortion.", stage: "PC" },
    { text: "Whether the admissions committee has a right to accurate information to choose fairly among applicants.", stage: "PC" },
    { text: "Whether Lee would feel proud of being a generous mentor.", stage: "P" },
    { text: "Whether lying violates a rule Lee was taught never to break.", stage: "M" },
    { text: "Whether Robin would be grateful and speak well of Lee afterward.", stage: "P" },
    { text: "Whether other, more honestly described applicants would be unfairly displaced.", stage: "PC" },
    { text: "Whether the letter should be printed in a formal typeface.", stage: "X" },
    { text: "Whether 'everyone exaggerates in these letters anyway.'", stage: "M" },
    { text: "Whether the program's official policy forbids inaccurate letters.", stage: "M" },
    { text: "Whether bending the truth erodes the trust the whole recommendation system depends on.", stage: "M" },
  ],
  rankCount: 4,
};

const DILEMMA_UNIT2: DilemmaItem = {
  prompt:
    "Jordan promised to drive a friend to an important job interview at 9 a.m. On the way to pick the friend up, Jordan finds a stranger who has collapsed and must be driven to a hospital immediately — no ambulance can arrive in time. Jordan cannot do both. Helping the stranger means the friend misses an interview that could change their life.\n\nShould Jordan break the promise and help the stranger?",
  decisionOptions: [
    "Jordan should help the stranger and break the promise",
    "Can't decide",
    "Jordan should keep the promise to the friend",
  ],
  considerations: [
    { text: "Whether saving a life is a weightier obligation than keeping an appointment.", stage: "PC" },
    { text: "Whether Jordan would be blamed and resented by the friend.", stage: "P" },
    { text: "Whether breaking the promise, even when justified, still leaves something owed to the friend.", stage: "PC" },
    { text: "Whether the law requires Jordan to render aid.", stage: "M" },
    { text: "Whether Jordan finds the stranger personally likeable.", stage: "P" },
    { text: "Whether every person's life has a value that does not depend on who they are.", stage: "PC" },
    { text: "Whether 'a promise is a promise' and must never be broken.", stage: "M" },
    { text: "Whether helping would make Jordan look heroic to onlookers.", stage: "P" },
    { text: "Whether the weather forecast calls for rain later that day.", stage: "X" },
    { text: "Whether choosing the lesser evil is right even when both options are bad.", stage: "PC" },
    { text: "Whether failing to keep a firm commitment could expose Jordan to penalties.", stage: "M" },
    { text: "Whether society depends on people honoring the commitments they make.", stage: "M" },
  ],
  rankCount: 4,
};

const DILEMMA_UNIT3: DilemmaItem = {
  prompt:
    "Alex, a junior engineer, discovers data suggesting a product the company sells may have a small but real safety defect. The evidence is strong but not certain. Reporting it publicly would protect possible victims but would likely get Alex fired, damage hundreds of coworkers' livelihoods, and might prove to be a false alarm.\n\nShould Alex report the suspected defect publicly?",
  decisionOptions: [
    "Alex should report the suspected defect publicly",
    "Can't decide",
    "Alex should stay silent until the evidence is certain",
  ],
  considerations: [
    { text: "Whether Alex has enough evidence to justify making so serious an accusation.", stage: "PC" },
    { text: "Whether Alex would lose their job and income.", stage: "P" },
    { text: "Whether potential victims have a right to be protected from hidden risks.", stage: "PC" },
    { text: "Whether Alex's true intention is to protect people rather than to gain attention.", stage: "PC" },
    { text: "Whether Alex would become famous as a whistleblower.", stage: "P" },
    { text: "Whether company policy requires reporting concerns internally first.", stage: "M" },
    { text: "Whether coworkers would resent Alex for risking their jobs.", stage: "P" },
    { text: "Whether the harm of a real defect outweighs the harm of a possible false alarm.", stage: "PC" },
    { text: "Whether the company cafeteria should serve better coffee.", stage: "X" },
    { text: "Whether going public breaks the loyalty employees are expected to show.", stage: "M" },
    { text: "Whether the law would protect or punish a whistleblower in this case.", stage: "M" },
    { text: "Whether staying silent is what most employees in Alex's position would do.", stage: "M" },
  ],
  rankCount: 4,
};

const DILEMMA_UNIT4: DilemmaItem = {
  prompt:
    "In a country where it is legal to deny housing to a certain minority, Morgan manages an apartment building and is legally permitted — and pressured by the owners — to turn such applicants away. Complying is profitable and lawful; refusing risks Morgan's lease and standing with the owners.\n\nShould Morgan rent to the excluded applicants despite the law and the pressure?",
  decisionOptions: [
    "Morgan should rent to the excluded applicants",
    "Can't decide",
    "Morgan should follow the law and the owners' wishes",
  ],
  considerations: [
    { text: "Whether an act can be deeply immoral even when it is perfectly legal.", stage: "PC" },
    { text: "Whether Morgan would lose income or the lease.", stage: "P" },
    { text: "Whether all people have equal moral worth regardless of the group they belong to.", stage: "PC" },
    { text: "Whether Morgan would be respected by the building's owners.", stage: "P" },
    { text: "Whether there is a moral truth here that does not depend on what the law says.", stage: "PC" },
    { text: "Whether breaking with local custom would make Morgan an outcast.", stage: "M" },
    { text: "Whether 'it's the law, so it must be followed' settles the matter.", stage: "M" },
    { text: "Whether refusing to discriminate is right even if most people in town disagree.", stage: "PC" },
    { text: "Whether the building's lobby should be repainted.", stage: "X" },
    { text: "Whether Morgan could face legal penalties for defying the owners.", stage: "M" },
    { text: "Whether Morgan would feel personally satisfied taking a stand.", stage: "P" },
    { text: "Whether the rules of one's own society are what define right and wrong.", stage: "M" },
  ],
  rankCount: 4,
};

// ===========================================================================
// CRITICAL REASONING — five unique 10-item forms (correct option listed first)
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

const CRITICAL_UNIT2: McqItem[] = [
  {
    prompt: "'Capital punishment must be just, because it is the law in many places.' The unstated assumption is that:",
    options: [
      "Whatever is legal is automatically just.",
      "Laws are difficult to change.",
      "Many places are broadly similar.",
      "Punishment always deters crime.",
    ],
    skillArea: "analysis",
  },
  {
    prompt:
      "In 'Taxes should be raised, since schools are underfunded and better schools need more money,' the main conclusion is:",
    options: [
      "Taxes should be raised.",
      "Schools are underfunded.",
      "Better schools require more money.",
      "Money solves every problem.",
    ],
    skillArea: "analysis",
  },
  {
    prompt:
      "Sales fell every month the store cut its hours and rose every month it extended them. The best-supported inference is:",
    options: [
      "Store hours and sales appear to be positively related.",
      "Sales secretly control the store's hours.",
      "Hours have no effect on anything.",
      "The store should close permanently.",
    ],
    skillArea: "inference",
  },
  {
    prompt: "'No reptiles are warm-blooded. All snakes are reptiles.' Therefore:",
    options: [
      "No snakes are warm-blooded.",
      "Some snakes are warm-blooded.",
      "All snakes are warm-blooded.",
      "Snakes are actually mammals.",
    ],
    skillArea: "inference",
  },
  {
    prompt: "Which fact would most WEAKEN the claim 'the tutoring program raised grades'?",
    options: [
      "Students in the program also received new textbooks at the same time.",
      "The program was very popular.",
      "The tutors were friendly.",
      "The program had an attractive logo.",
    ],
    skillArea: "evaluation",
  },
  {
    prompt: "'Either we ban all cars or the planet is doomed.' The reasoning is flawed because it:",
    options: [
      "Presents only two options when others clearly exist.",
      "Uses too many statistics.",
      "Cites a respected expert.",
      "Carefully defines its terms.",
    ],
    skillArea: "evaluation",
  },
  {
    prompt: "'All citizens may vote. Sam is a citizen.' What necessarily follows?",
    options: [
      "Sam may vote.",
      "Sam definitely will vote.",
      "Only Sam may vote.",
      "Sam must be an adult.",
    ],
    skillArea: "deduction",
  },
  {
    prompt:
      "'If the alarm works, it sounds when there is smoke. There is smoke, but no sound.' What follows?",
    options: [
      "The alarm is not working properly.",
      "There is no smoke after all.",
      "The alarm is working fine.",
      "Nothing can be concluded.",
    ],
    skillArea: "deduction",
  },
  {
    prompt:
      "A scientist tests a hypothesis 100 times under varied conditions with consistent results. This makes the hypothesis:",
    options: [
      "Better supported, though still open to revision.",
      "Logically certain and beyond doubt.",
      "Disproven.",
      "Unscientific.",
    ],
    skillArea: "induction",
  },
  {
    prompt:
      "Two towns are alike in size, climate, and economy. A policy lowered crime in the first. By analogy one might predict:",
    options: [
      "A similar policy could lower crime in the second town.",
      "The second town must have no crime.",
      "The policy will fail everywhere it is tried.",
      "The two towns will eventually merge.",
    ],
    skillArea: "induction",
  },
];

const CRITICAL_UNIT3: McqItem[] = [
  {
    prompt: "'He must be guilty — otherwise why would he look so nervous?' This argument assumes that:",
    options: [
      "Nervousness reliably indicates guilt.",
      "The trial is being conducted fairly.",
      "He has hired a lawyer.",
      "The witnesses are honest.",
    ],
    skillArea: "analysis",
  },
  {
    prompt:
      "Identify the conclusion: 'Because intentions matter morally, and Betty intended harm, Betty deserves blame even though no harm occurred.'",
    options: [
      "Betty deserves blame.",
      "Intentions matter morally.",
      "Betty intended harm.",
      "No harm occurred.",
    ],
    skillArea: "analysis",
  },
  {
    prompt:
      "A factory's defect rate dropped sharply right after a new training program, with no other changes. The best-supported inference is:",
    options: [
      "The training program plausibly contributed to fewer defects.",
      "Defects somehow cause training programs.",
      "Training is useless.",
      "The factory should be shut down.",
    ],
    skillArea: "inference",
  },
  {
    prompt: "'Some artists are left-handed. All members of this club are artists.' Which is best supported?",
    options: [
      "Some members of the club may be left-handed.",
      "All members of the club are left-handed.",
      "No members of the club are left-handed.",
      "Only left-handed people can be artists.",
    ],
    skillArea: "inference",
  },
  {
    prompt: "Which would most strengthen the claim 'the witness is reliable'?",
    options: [
      "The witness had a clear, close view and no motive to lie.",
      "The witness happens to be tall.",
      "The witness spoke with great confidence.",
      "The witness was the only person anyone asked.",
    ],
    skillArea: "evaluation",
  },
  {
    prompt: "'Everyone is buying this stock, so it must be a good investment.' This reasoning is flawed because it:",
    options: [
      "Appeals to popularity instead of evidence of value.",
      "Relies on detailed financial data.",
      "Is far too cautious.",
      "Carefully weighs the risks.",
    ],
    skillArea: "evaluation",
  },
  {
    prompt:
      "'If a shape is a square, it has four equal sides. This shape does not have four equal sides.' Therefore:",
    options: [
      "The shape is not a square.",
      "The shape is a square.",
      "The shape must be a circle.",
      "Nothing follows.",
    ],
    skillArea: "deduction",
  },
  {
    prompt: "'All A are B. All B are C.' What necessarily follows?",
    options: [
      "All A are C.",
      "All C are A.",
      "Some A are not C.",
      "No A are C.",
    ],
    skillArea: "deduction",
  },
  {
    prompt:
      "A medication helped in a study of only young men. Concluding it works equally well for elderly women is:",
    options: [
      "Unwarranted, because the sample differs from the new group.",
      "A perfectly sound deduction.",
      "Certainly correct.",
      "Proven beyond any doubt.",
    ],
    skillArea: "induction",
  },
  {
    prompt:
      "Each of the last 20 buses on this route arrived within five minutes of schedule. The best-supported expectation is:",
    options: [
      "The next bus will probably also be roughly on time.",
      "The next bus will certainly be exactly on time.",
      "The next bus will never arrive.",
      "Buses are unpredictable in principle.",
    ],
    skillArea: "induction",
  },
];

const CRITICAL_UNIT4: McqItem[] = [
  {
    prompt: "'That moral claim came from an ancient text, so it can't be true today.' The hidden assumption is that:",
    options: [
      "A claim's origin determines whether it is true.",
      "Ancient people were unusually wise.",
      "All old texts are unreliable.",
      "Morality never changes over time.",
    ],
    skillArea: "analysis",
  },
  {
    prompt:
      "Find the conclusion: 'Since moral disagreement exists, and people argue about it using reasons and evidence, morality is plausibly truth-apt rather than mere taste.'",
    options: [
      "Morality is plausibly truth-apt.",
      "Moral disagreement exists.",
      "People argue using reasons.",
      "Taste is subjective.",
    ],
    skillArea: "analysis",
  },
  {
    prompt:
      "From 'when reasons and evidence can settle a dispute, it is not merely a matter of taste' and 'reasons and evidence can bear on moral disputes,' it follows that:",
    options: [
      "Moral disputes are not merely matters of taste.",
      "All of morality is merely taste.",
      "Reasons never matter to anything.",
      "Disputes can never be settled.",
    ],
    skillArea: "inference",
  },
  {
    prompt: "A claim that 'no general principle ever has exceptions' is shown false by:",
    options: [
      "A single genuine counterexample.",
      "Many supporting examples.",
      "Widespread popular agreement.",
      "One expert's stated opinion.",
    ],
    skillArea: "inference",
  },
  {
    prompt: "Which best evaluates the argument 'people disagree about ethics, so there is no moral truth'?",
    options: [
      "People also disagree about scientific facts, yet truths exist there.",
      "Ethics is a boring subject.",
      "Disagreement about ethics is actually rare.",
      "Truth is simply whatever feels right.",
    ],
    skillArea: "evaluation",
  },
  {
    prompt:
      "'This principle was put into practice only late in history, so it was merely invented then.' The flaw is that it confuses:",
    options: [
      "When something is discovered or applied with when it became true.",
      "A cause with its effect.",
      "A premise with a conclusion.",
      "Two completely unrelated topics.",
    ],
    skillArea: "evaluation",
  },
  {
    prompt:
      "'If a statement is truth-apt, reasons can bear on it. Reasons cannot bear on pure preferences.' What follows about pure preferences?",
    options: [
      "Pure preferences are not truth-apt.",
      "Pure preferences are truth-apt.",
      "Reasons bear on absolutely everything.",
      "Nothing follows.",
    ],
    skillArea: "deduction",
  },
  {
    prompt: "'Either the claim is factual or it is mere taste. It is not mere taste.' Therefore:",
    options: [
      "It is factual.",
      "It is mere taste.",
      "It is somehow both.",
      "It is neither.",
    ],
    skillArea: "deduction",
  },
  {
    prompt:
      "Across many cultures and eras, gratuitous cruelty is condemned. This recurring pattern provides some support for:",
    options: [
      "The hypothesis that certain moral judgments are widely shared, not arbitrary.",
      "The certainty that morality is purely genetic.",
      "The view that all cultures are identical.",
      "The claim that cruelty is actually good.",
    ],
    skillArea: "induction",
  },
  {
    prompt:
      "A philosopher argues: 'Fake banknotes don't prove real money doesn't exist; likewise false moral claims don't prove real ones don't exist.' This analogy is strong to the extent that:",
    options: [
      "Counterfeits and false claims are relevantly similar to genuine ones in the way that matters.",
      "Money and morality are exactly identical.",
      "Banknotes happen to be colorful.",
      "Philosophers are generally clever.",
    ],
    skillArea: "induction",
  },
];

export const DIAGNOSTIC_SEED: DiagnosticSeed[] = [
  {
    instrument: "ethical",
    phase: "baseline",
    title: "Ethical Reasoning Inventory — Baseline",
    subtitle: "Before Unit 1",
    instructions: ETHICAL_INSTRUCTIONS,
    dilemmas: [DILEMMA_BASELINE],
  },
  {
    instrument: "critical",
    phase: "baseline",
    title: "Critical Reasoning Assessment — Baseline",
    subtitle: "Before Unit 1",
    instructions: CRITICAL_INSTRUCTIONS,
    mcqs: CRITICAL_BASELINE,
  },
  {
    instrument: "ethical",
    phase: "unit1",
    title: "Ethical Reasoning Inventory — Unit 1 Checkpoint",
    subtitle: "After Unit 1: Foundations of Value",
    instructions: ETHICAL_INSTRUCTIONS,
    dilemmas: [DILEMMA_UNIT1],
  },
  {
    instrument: "critical",
    phase: "unit1",
    title: "Critical Reasoning Assessment — Unit 1 Checkpoint",
    subtitle: "After Unit 1: Foundations of Value",
    instructions: CRITICAL_INSTRUCTIONS,
    mcqs: CRITICAL_UNIT1,
  },
  {
    instrument: "ethical",
    phase: "unit2",
    title: "Ethical Reasoning Inventory — Unit 2 Checkpoint",
    subtitle: "After Unit 2: Obligation, Right, and Wrong",
    instructions: ETHICAL_INSTRUCTIONS,
    dilemmas: [DILEMMA_UNIT2],
  },
  {
    instrument: "critical",
    phase: "unit2",
    title: "Critical Reasoning Assessment — Unit 2 Checkpoint",
    subtitle: "After Unit 2: Obligation, Right, and Wrong",
    instructions: CRITICAL_INSTRUCTIONS,
    mcqs: CRITICAL_UNIT2,
  },
  {
    instrument: "ethical",
    phase: "unit3",
    title: "Ethical Reasoning Inventory — Unit 3 Checkpoint",
    subtitle: "After Unit 3: Acts, Agents, and Judgment",
    instructions: ETHICAL_INSTRUCTIONS,
    dilemmas: [DILEMMA_UNIT3],
  },
  {
    instrument: "critical",
    phase: "unit3",
    title: "Critical Reasoning Assessment — Unit 3 Checkpoint",
    subtitle: "After Unit 3: Acts, Agents, and Judgment",
    instructions: CRITICAL_INSTRUCTIONS,
    mcqs: CRITICAL_UNIT3,
  },
  {
    instrument: "ethical",
    phase: "unit4",
    title: "Ethical Reasoning Inventory — Unit 4 Checkpoint",
    subtitle: "After Unit 4: Metaethics and Moral Truth",
    instructions: ETHICAL_INSTRUCTIONS,
    dilemmas: [DILEMMA_UNIT4],
  },
  {
    instrument: "critical",
    phase: "unit4",
    title: "Critical Reasoning Assessment — Unit 4 Checkpoint",
    subtitle: "After Unit 4: Metaethics and Moral Truth",
    instructions: CRITICAL_INSTRUCTIONS,
    mcqs: CRITICAL_UNIT4,
  },
];
