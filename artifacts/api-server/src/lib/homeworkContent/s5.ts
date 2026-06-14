import type { SectionContent, HomeworkItem, McOption, WrittenRubric } from "./types";

export const section: SectionContent = {
  slug: "correlation-to-mechanism",
  title: "From Correlation to Mechanism",
  weekNumber: 1,
  blurb:
    "A correlation is a clue, not a dead end — your job is to name the concrete machine that could produce it and the lever you'd pull to prove it.",
  lectureTitle:
    "1.5 From Correlation to Mechanism: upgrade a correlation into a testable mechanism",
  body: `# From Correlation to Mechanism

You have heard the slogan a thousand times: "correlation does not imply causation." It is true, and it is also nearly useless. Said and then dropped, it is a way of looking wise while doing nothing. Constructive Critical Reasoning asks for the opposite move. When two things move together, you do not stop at the slogan — you **propose a concrete mechanism** that would make them move together, and you name the **intervention** that would confirm or kill your guess.

## A correlation is an unopened box

Ice-cream sales and drownings rise together. The lazy reader says "correlation, not causation" and walks away knowing nothing. The constructive reader opens the box: *what machine could link these?* Hot weather drives both swimming and ice cream. That is a mechanism — it has moving parts (heat → more swimmers → more drownings; heat → more cravings → more sales). Better still, it makes a prediction: hold the weather fixed and the link should vanish.

## What a mechanism actually is

A mechanism is a story with parts that push on each other, and it earns its keep by predicting what an **intervention** does. "X causes Y" is a label. "X raises Y because X opens channel Z, so blocking Z should flatten the effect" is a mechanism. The second one sticks its neck out. That exposed neck is exactly what makes it valuable: it can be cut off by a clean test.

## The three live hypotheses

For almost any correlation between A and B, lay out the candidate machines: **A drives B**, **B drives A**, or a **common cause C** drives both (and sometimes a selection filter creates the link). Do not just list them — say which one you bet on and *why the data leans that way*, then name the single observation that would separate your favorite from its closest rival.

## Name the intervention

The heart of the move is this: a real mechanism tells you what would happen if you reached in and changed something. Wiggle the supposed cause and watch the supposed effect. If you cannot even imagine an intervention that would distinguish your mechanism from a rival, you have not yet proposed a mechanism — you have only renamed the correlation.

## Why the slogan scores zero

Under CCR's inverted grading, the bare "correlation isn't causation, so we can't say" earns near-zero credit. It binds no data and risks nothing. Top credit goes to the answer that commits to a specific machine *and* hands you the cheap experiment that could refute it. The reckless leap ("A obviously causes B, case closed") also loses, because it ignores the rival machines the data hasn't ruled out.

## In the real world

A hospital notices patients given a new painkiller recover faster than those who aren't. The dodge: "correlation, not causation." The constructive answer proposes a mechanism with a rival baked in. **Hypothesis A:** the drug speeds recovery by reducing inflammation. **Rival C (confounding by indication):** doctors only prescribe the new drug to the healthiest-looking patients, so the patients — not the pill — explain the gap. These predict different things. The decisive intervention: run a randomized trial where a coin, not the doctor, assigns the drug. If the drug works through inflammation, the randomized group still recovers faster; if it was confounding, the gap collapses once assignment is random. Same correlation, but now it points at a lever you can actually pull — and a result that could prove you wrong.`,
  homework: {
    mcq: buildMcq(),
    hybrid: buildHybrid(),
    written: buildWritten(),
  },
};

function buildMcq(): HomeworkItem[] {
  return [
    {
      itemType: "mc",
      prompt:
        "A retailer finds that stores playing slow background music post higher average sales per visit than stores playing fast music. Which conclusion best follows?",
      mcOptions: [
        {
          text: "This is just correlation, not causation, so no business decision should rest on it.",
          credit: 0,
        },
        {
          text: "Slow music likely lifts sales by slowing shoppers' pace so they browse longer; test it by randomly switching tempo by day in matched stores and checking whether dwell time and sales rise together.",
          credit: 1.0,
        },
        {
          text: "Slow music probably helps sales somewhat; we'd want to compare a few more stores before acting.",
          credit: 0.6,
        },
        {
          text: "There may be some relationship between music tempo and spending worth keeping in mind.",
          credit: 0.3,
        },
      ],
      correctAnswer:
        "Slow music likely lifts sales by slowing shoppers' pace so they browse longer; test it by randomly switching tempo by day in matched stores and checking whether dwell time and sales rise together.",
      explanation:
        "Top credit names a concrete mechanism (tempo → browsing pace → dwell time → sales) and a randomized intervention that could refute it. The bare 'just correlation' refusal binds no data and earns zero.",
    },
    {
      itemType: "mc",
      prompt:
        "Across schools, students who eat breakfast score higher on morning tests. A district is deciding whether to fund free breakfast. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Breakfast plausibly raises scores by stabilizing blood glucose during testing; run a randomized free-breakfast pilot and check whether scores rise only in the fed group.",
          credit: 1.0,
        },
        {
          text: "Eating breakfast clearly causes higher scores, so funding it will obviously raise district performance.",
          credit: 0,
        },
        {
          text: "Breakfast probably helps; the district could try it in a few schools and watch the averages.",
          credit: 0.6,
        },
        {
          text: "There's likely something to the breakfast-and-scores link worth exploring later.",
          credit: 0.3,
        },
      ],
      correctAnswer:
        "Breakfast plausibly raises scores by stabilizing blood glucose during testing; run a randomized free-breakfast pilot and check whether scores rise only in the fed group.",
      explanation:
        "The winner proposes a glucose mechanism and a randomized test that exposes the rival (organized households both feed kids and support studying). The 'clearly causes' option is the overreach the data hasn't earned, so it scores zero.",
    },
    {
      itemType: "mc",
      prompt:
        "A SaaS team sees that customers who use the mobile app churn less than web-only customers. Which conclusion best follows?",
      mcOptions: [
        {
          text: "We can't tell causation from this, so the churn data doesn't support any conclusion.",
          credit: 0,
        },
        {
          text: "Mobile use may simply mark already-committed customers rather than cause loyalty.",
          credit: 0.3,
        },
        {
          text: "The app likely cuts churn by adding daily touchpoints that build habit; nudge a random set of web-only users to install it and see if their churn drops to mobile levels.",
          credit: 1.0,
        },
        {
          text: "Mobile use probably reduces churn; comparing more customer segments would help confirm it.",
          credit: 0.6,
        },
      ],
      correctAnswer:
        "The app likely cuts churn by adding daily touchpoints that build habit; nudge a random set of web-only users to install it and see if their churn drops to mobile levels.",
      explanation:
        "Top credit specifies the habit-formation mechanism and a randomized nudge that distinguishes cause from the 'already-committed users self-select' rival. The flat 'no conclusion' is the zero-credit dodge.",
    },
    {
      itemType: "mc",
      prompt:
        "In a marathon dataset, runners who carb-load the night before finish faster on average. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Carb-loading and speed are merely correlated, which tells us nothing actionable.",
          credit: 0,
        },
        {
          text: "Carb-loading probably boosts pace by topping up muscle glycogen so runners hit the wall later; randomize a carb vs. control meal among similar-trained runners and compare late-race split times.",
          credit: 1.0,
        },
        {
          text: "Carb-loading seems to help finishing time; we'd want data from more races to be sure.",
          credit: 0.6,
        },
        {
          text: "There could be a link between pre-race carbs and speed worth a glance.",
          credit: 0.3,
        },
      ],
      correctAnswer:
        "Carb-loading probably boosts pace by topping up muscle glycogen so runners hit the wall later; randomize a carb vs. control meal among similar-trained runners and compare late-race split times.",
      explanation:
        "The winner names a physiological mechanism (glycogen → delayed fatigue) and a randomized test on late splits that could refute it, ruling out the 'serious runners both carb-load and train hard' rival. The slogan-only option scores zero.",
    },
    {
      itemType: "mc",
      prompt:
        "A city notices neighborhoods with more trees have lower summer crime rates. The parks department wants to know if planting trees would help. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Trees may reduce crime by cooling streets and drawing residents outdoors as informal eyes; plant trees in randomly chosen blocks and compare crime change against unplanted matched blocks.",
          credit: 1.0,
        },
        {
          text: "More trees obviously cause less crime, so a citywide planting will cut crime everywhere.",
          credit: 0,
        },
        {
          text: "Trees likely help somewhat; tracking more neighborhoods over time would clarify it.",
          credit: 0.6,
        },
        {
          text: "There might be some connection between greenery and safety to keep in mind.",
          credit: 0.3,
        },
      ],
      correctAnswer:
        "Trees may reduce crime by cooling streets and drawing residents outdoors as informal eyes; plant trees in randomly chosen blocks and compare crime change against unplanted matched blocks.",
      explanation:
        "Top credit proposes a 'cooling + eyes on the street' mechanism and a block-randomized planting that separates it from the rival (wealthier areas have both trees and less crime). The 'obviously causes' leap ignores that rival and scores zero.",
    },
    {
      itemType: "mc",
      prompt:
        "An HR analyst finds employees who attend the optional Friday lunch have higher performance ratings. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Attendance and ratings are correlated, so we shouldn't read anything into it.",
          credit: 0,
        },
        {
          text: "The lunches may raise ratings by building cross-team ties that speed collaboration; randomly assign some teams a paid lunch slot and check whether their later ratings climb.",
          credit: 1.0,
        },
        {
          text: "The lunches probably help ratings; we'd want to watch a few more quarters first.",
          credit: 0.6,
        },
        {
          text: "Possibly the lunch and ratings are linked in some minor way.",
          credit: 0.3,
        },
      ],
      correctAnswer:
        "The lunches may raise ratings by building cross-team ties that speed collaboration; randomly assign some teams a paid lunch slot and check whether their later ratings climb.",
      explanation:
        "The winner specifies a networking mechanism and a randomized test that rules out the rival (already-engaged high performers choose to attend). The 'shouldn't read anything into it' refusal commits to nothing and earns zero.",
    },
    {
      itemType: "mc",
      prompt:
        "A pediatric clinic observes that children with more ear infections also have lower reading scores at age eight. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Repeated infections may impair reading by causing intermittent hearing loss that disrupts early phonics learning; track infection-prone kids given prompt ear-tube treatment vs. delayed treatment and compare reading at eight.",
          credit: 1.0,
        },
        {
          text: "These are just correlated variables, so we can't say infections matter for reading.",
          credit: 0,
        },
        {
          text: "Infections probably hurt reading somewhat; following more children would help.",
          credit: 0.6,
        },
        {
          text: "There may be a faint link between ear infections and reading.",
          credit: 0.3,
        },
      ],
      correctAnswer:
        "Repeated infections may impair reading by causing intermittent hearing loss that disrupts early phonics learning; track infection-prone kids given prompt ear-tube treatment vs. delayed treatment and compare reading at eight.",
      explanation:
        "Top credit names the hearing-loss mechanism and a treatment-timing intervention that could refute it, addressing the rival (low-income homes have both more infections and less reading support). The 'can't say' option scores zero.",
    },
    {
      itemType: "mc",
      prompt:
        "A coffee chain finds that drinks sold via the loyalty app have higher repeat-purchase rates than counter sales. Which conclusion best follows?",
      mcOptions: [
        {
          text: "App use is merely correlated with repeat buying, so no conclusion is warranted.",
          credit: 0,
        },
        {
          text: "App buyers might just be the regulars anyway, so the app may add nothing.",
          credit: 0.3,
        },
        {
          text: "The app probably drives repeats; more months of data would help confirm it.",
          credit: 0.6,
        },
        {
          text: "The app likely lifts repeats by sending timed reward reminders that pull customers back; give a random set of counter-only customers app rewards and see if their repeat rate rises.",
          credit: 1.0,
        },
      ],
      correctAnswer:
        "The app likely lifts repeats by sending timed reward reminders that pull customers back; give a random set of counter-only customers app rewards and see if their repeat rate rises.",
      explanation:
        "The winner proposes a reminder-nudge mechanism and a randomized rollout that tests it against the 'regulars self-select into the app' rival. The bare 'no conclusion warranted' is the zero-credit dodge.",
    },
    {
      itemType: "mc",
      prompt:
        "Among gardeners in a community plot, those who talk to their plants report healthier tomatoes. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Talking to plants and plant health are just correlated, full stop.",
          credit: 0,
        },
        {
          text: "Talking likely tracks attentiveness — talkers visit more often and water and weed more, which drives health; have a random group only speak (no extra visits) while another visits more silently, and see which plants thrive.",
          credit: 1.0,
        },
        {
          text: "Frequent attention probably explains the healthier plants; comparing more gardeners would help.",
          credit: 0.6,
        },
        {
          text: "Maybe talking and tomato health are connected somehow.",
          credit: 0.3,
        },
      ],
      correctAnswer:
        "Talking likely tracks attentiveness — talkers visit more often and water and weed more, which drives health; have a random group only speak (no extra visits) while another visits more silently, and see which plants thrive.",
      explanation:
        "Top credit identifies the real moving part (attention/care, not speech) and an intervention that decouples talking from visiting to refute it. The 'just correlated, full stop' refusal earns zero.",
    },
    {
      itemType: "mc",
      prompt:
        "A factory finds that shifts using the newer ergonomic chairs report fewer back-pain complaints. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Newer chairs obviously eliminate back pain, so replacing every chair will end complaints.",
          credit: 0,
        },
        {
          text: "The chairs may cut pain by supporting the lumbar curve and reducing slouching; randomly issue new chairs to half the workers and compare complaint rates over a quarter.",
          credit: 1.0,
        },
        {
          text: "The chairs probably help backs; we'd want to track more shifts to be sure.",
          credit: 0.6,
        },
        {
          text: "There could be a link between chair type and back pain.",
          credit: 0.3,
        },
      ],
      correctAnswer:
        "The chairs may cut pain by supporting the lumbar curve and reducing slouching; randomly issue new chairs to half the workers and compare complaint rates over a quarter.",
      explanation:
        "The winner names a postural mechanism and a within-factory randomized issue that controls for the rival (newer chairs went to newer, younger hires). The 'obviously eliminate' overreach the data can't support scores zero.",
    },
    {
      itemType: "mc",
      prompt:
        "An ecologist notes that lakes with more otters have clearer water. A conservation group asks whether reintroducing otters would clear up a murky lake. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Otters and clarity are correlated, which doesn't justify any reintroduction plan.",
          credit: 0,
        },
        {
          text: "Otters may clear water by eating sea-urchin-like grazers, letting algae-filtering kelp/plants rebound; reintroduce otters to some murky lakes and not others and compare clarity shifts.",
          credit: 1.0,
        },
        {
          text: "Otters probably improve clarity; surveying more lakes would strengthen the case.",
          credit: 0.6,
        },
        {
          text: "There may be some tie between otters and clear water.",
          credit: 0.3,
        },
      ],
      correctAnswer:
        "Otters may clear water by eating sea-urchin-like grazers, letting algae-filtering kelp/plants rebound; reintroduce otters to some murky lakes and not others and compare clarity shifts.",
      explanation:
        "Top credit lays out a trophic-cascade mechanism with parts and a reintroduction experiment that could refute it (vs. the rival that clean lakes simply attract otters). The slogan-only refusal binds no data and earns zero.",
    },
    {
      itemType: "mc",
      prompt:
        "A streaming service finds users who rate movies churn less than users who never rate. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Rating behavior is just correlated with staying; we can't conclude anything useful.",
          credit: 0,
        },
        {
          text: "Rating may reduce churn by improving recommendations, so users find more they love; prompt a random set of non-raters to rate and check whether their watch-time and retention rise.",
          credit: 1.0,
        },
        {
          text: "Rating probably helps retention; we'd want to segment more users first.",
          credit: 0.6,
        },
        {
          text: "There might be a small connection between rating and staying.",
          credit: 0.3,
        },
      ],
      correctAnswer:
        "Rating may reduce churn by improving recommendations, so users find more they love; prompt a random set of non-raters to rate and check whether their watch-time and retention rise.",
      explanation:
        "The winner proposes a recommendation-feedback mechanism and a randomized prompt that distinguishes it from the rival (devoted users both rate and stay). The 'can't conclude anything useful' option is the zero-credit dodge.",
    },
    {
      itemType: "mc",
      prompt:
        "A teacher notices students who use blue-ink pens score slightly higher on essays than black-ink users. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Ink color is just correlated with scores, so it means nothing.",
          credit: 0,
        },
        {
          text: "The link probably runs through a confounder — careful, prepared students happen to favor blue pens — so ink itself does nothing; randomly assign pen colors on the next exam and watch the gap disappear.",
          credit: 1.0,
        },
        {
          text: "Ink color likely doesn't matter much; more exams would help check.",
          credit: 0.6,
        },
        {
          text: "Maybe pen color is faintly tied to essay scores.",
          credit: 0.3,
        },
      ],
      correctAnswer:
        "The link probably runs through a confounder — careful, prepared students happen to favor blue pens — so ink itself does nothing; randomly assign pen colors on the next exam and watch the gap disappear.",
      explanation:
        "Top credit commits to a specific confounding mechanism AND an intervention (random pen assignment) whose predicted null result would confirm it. Saying it 'means nothing' without proposing the mechanism or test earns zero.",
    },
    {
      itemType: "mc",
      prompt:
        "A gym finds members who book classes in advance attend far more often than drop-in members. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Advance booking is merely correlated with attendance, so nothing follows.",
          credit: 0,
        },
        {
          text: "Booking may boost attendance through commitment — a reserved slot raises the felt cost of skipping; randomly offer some drop-in members easy pre-booking and see if their attendance climbs.",
          credit: 1.0,
        },
        {
          text: "Pre-booking probably raises attendance; tracking more members would help.",
          credit: 0.6,
        },
        {
          text: "There may be some link between booking ahead and showing up.",
          credit: 0.3,
        },
      ],
      correctAnswer:
        "Booking may boost attendance through commitment — a reserved slot raises the felt cost of skipping; randomly offer some drop-in members easy pre-booking and see if their attendance climbs.",
      explanation:
        "The winner names a commitment mechanism and a randomized offer that separates it from the rival (motivated members both book and attend). The 'nothing follows' refusal scores zero.",
    },
    {
      itemType: "mc",
      prompt:
        "A bakery finds that days with handwritten chalkboard specials bring in more revenue than days with printed signs. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Sign style and revenue just happen to correlate, so we can't act on it.",
          credit: 0,
        },
        {
          text: "Chalkboards probably help because the owner only bothers writing them on high-energy mornings that also bring fresher baking and warmer service.",
          credit: 0.3,
        },
        {
          text: "Chalk signs likely lift revenue; comparing more days would confirm it.",
          credit: 0.6,
        },
        {
          text: "Handwritten signs may raise revenue by signaling freshness and craft, drawing passersby in; randomly alternate chalk vs. printed signs day to day and compare foot traffic and sales.",
          credit: 1.0,
        },
      ],
      correctAnswer:
        "Handwritten signs may raise revenue by signaling freshness and craft, drawing passersby in; randomly alternate chalk vs. printed signs day to day and compare foot traffic and sales.",
      explanation:
        "Top credit proposes a 'freshness signal → foot traffic' mechanism and a day-randomized test that controls for the owner's-mood rival. The 'can't act on it' option commits to nothing and earns zero.",
    },
  ];
}

function buildHybrid(): HomeworkItem[] {
  return [
    {
      itemType: "hybrid",
      prompt:
        "A hospital reports that patients placed in private rooms recover faster than those in shared wards. Administrators want to expand private rooms. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Room type and recovery are correlated, so we can't justify the expansion.",
          credit: 0,
        },
        {
          text: "Private rooms may speed recovery by reducing noise and infection exposure, improving sleep and lowering complications; randomly assign incoming patients to room type and compare recovery times.",
          credit: 1.0,
        },
        {
          text: "Private rooms probably help recovery; reviewing more admissions would clarify it.",
          credit: 0.6,
        },
        {
          text: "There may be a link between private rooms and recovery worth noting.",
          credit: 0.3,
        },
      ],
      writtenRubric: {
        prompt:
          "In two sentences, name the single cheapest observation that would most distinguish your mechanism from the rival that sicker patients are placed in shared wards, and say what result would refute your mechanism.",
        modelAnswer:
          "Check whether private and ward patients had similar admission severity scores; if private rooms simply received less-sick patients, the recovery gap is confounding, not the rooms. My mechanism is refuted if, after randomization equalizes severity, recovery times converge between room types.",
        yieldAnchors: [
          "Private-room patients recover faster than ward patients.",
          "Administrators can choose how to allocate room types.",
          "Wards differ from private rooms in noise and infection exposure.",
        ],
        riskAnchors: [
          "Randomized room assignment should preserve the recovery gap if rooms cause it.",
          "Matching on admission severity should shrink the gap if confounding drives it.",
        ],
        defeatedBy: [
          "Private rooms certainly cause faster recovery with no further test needed.",
          "Nothing can be concluded because correlation isn't causation.",
        ],
      },
      correctAnswer:
        "Private rooms may speed recovery by reducing noise and infection exposure, improving sleep and lowering complications; randomly assign incoming patients to room type and compare recovery times.",
      explanation:
        "Full credit pairs the top MC mechanism with a written follow-up that names the cheap severity check and a refuting result. The 'can't justify' refusal earns zero.",
    },
    {
      itemType: "hybrid",
      prompt:
        "A startup notices that leads who watch its product demo video convert to paying customers at triple the rate of those who don't. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Watching the demo obviously triples conversion, so forcing every lead to watch will triple sales.",
          credit: 0,
        },
        {
          text: "The demo may lift conversion by clarifying value and reducing buyer uncertainty; randomly prompt half of new leads to watch and compare their conversion to the unprompted half.",
          credit: 1.0,
        },
        {
          text: "The demo probably boosts conversion; tracking more leads would help confirm.",
          credit: 0.6,
        },
        {
          text: "There might be a connection between watching and converting.",
          credit: 0.3,
        },
      ],
      writtenRubric: {
        prompt:
          "In two sentences, name the single cheapest observation that would most distinguish your mechanism from the rival that already-interested leads choose to watch, and say what result would refute your mechanism.",
        modelAnswer:
          "Randomly prompt one group of leads to watch and leave the other unprompted, then compare conversion — this breaks the self-selection so any gap reflects the demo itself. My mechanism is refuted if the prompted and unprompted groups convert at the same rate.",
        yieldAnchors: [
          "Demo-watchers convert at triple the rate of non-watchers.",
          "Leads currently self-select into watching the demo.",
          "The team can prompt leads to watch.",
        ],
        riskAnchors: [
          "A randomized watch prompt should raise conversion if the demo causes it.",
          "Equal conversion after prompting would falsify the demo's causal role.",
        ],
        defeatedBy: [
          "Watching the demo definitely triples conversion for everyone.",
          "We can't infer anything from the conversion gap.",
        ],
      },
      correctAnswer:
        "The demo may lift conversion by clarifying value and reducing buyer uncertainty; randomly prompt half of new leads to watch and compare their conversion to the unprompted half.",
      explanation:
        "Full credit takes the mechanism-plus-randomization MC option and adds a follow-up isolating self-selection with a refuting result. The 'forcing every lead' overreach the data defeats scores zero.",
    },
    {
      itemType: "hybrid",
      prompt:
        "A nutrition survey finds people who drink diet soda tend to weigh more than those who don't. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Diet soda and higher weight are just correlated, so the survey tells us nothing.",
          credit: 0,
        },
        {
          text: "Reverse causation likely dominates: heavier people switch to diet soda to cut calories, so weight drives soda choice; follow new diet-soda adopters over time and check whether the switch precedes or follows weight gain.",
          credit: 1.0,
        },
        {
          text: "Diet soda probably doesn't cause weight gain; more data would help sort it out.",
          credit: 0.6,
        },
        {
          text: "Maybe diet soda and weight are loosely linked.",
          credit: 0.3,
        },
      ],
      writtenRubric: {
        prompt:
          "In two sentences, name the single cheapest observation that would most distinguish your reverse-causation mechanism from the rival that diet soda causes weight gain, and say what result would refute your mechanism.",
        modelAnswer:
          "Use longitudinal timing: check whether people gained weight before or after they switched to diet soda. My reverse-causation mechanism is refuted if the switch reliably precedes the weight gain rather than following it.",
        yieldAnchors: [
          "Diet-soda drinkers weigh more on average.",
          "People can switch to diet soda deliberately to manage weight.",
          "The survey is cross-sectional, capturing a single moment.",
        ],
        riskAnchors: [
          "Longitudinal data should show weight gain preceding the switch if reverse causation holds.",
          "A switch that precedes later weight gain would falsify reverse causation.",
        ],
        defeatedBy: [
          "Diet soda causes weight gain.",
          "The survey supports no conclusion at all.",
        ],
      },
      correctAnswer:
        "Reverse causation likely dominates: heavier people switch to diet soda to cut calories, so weight drives soda choice; follow new diet-soda adopters over time and check whether the switch precedes or follows weight gain.",
      explanation:
        "Full credit commits to reverse causation as the mechanism and uses temporal ordering as the refuting test. The 'tells us nothing' refusal scores zero.",
    },
    {
      itemType: "hybrid",
      prompt:
        "A police chief observes that months with more officers on patrol also have more reported crimes. He worries patrols cause crime. Which conclusion best follows?",
      mcOptions: [
        {
          text: "More patrols may raise reported crime by increasing detection and reporting, not actual crime; compare victimization-survey crime (which doesn't depend on police presence) across high- and low-patrol months.",
          credit: 1.0,
        },
        {
          text: "Patrols and reported crime are correlated, so we can't say what's going on.",
          credit: 0,
        },
        {
          text: "Patrols probably don't cause crime; gathering more months of data would help.",
          credit: 0.6,
        },
        {
          text: "There may be some odd link between patrols and crime reports.",
          credit: 0.3,
        },
      ],
      writtenRubric: {
        prompt:
          "In two sentences, name the single cheapest observation that would most distinguish your detection mechanism from the rival that patrols genuinely increase crime, and say what result would refute your mechanism.",
        modelAnswer:
          "Compare independent victimization-survey rates, which don't rise just because more officers are present to record incidents. My detection mechanism is refuted if survey-measured crime also rises in high-patrol months.",
        yieldAnchors: [
          "Reported crime rises with more officers on patrol.",
          "Reported crime depends on police being present to record it.",
          "Victimization surveys measure crime independently of patrols.",
        ],
        riskAnchors: [
          "Victimization-survey crime should stay flat across patrol levels if detection drives the link.",
          "Rising survey crime in high-patrol months would falsify the detection mechanism.",
        ],
        defeatedBy: [
          "Patrols cause crime.",
          "Nothing can be inferred from the patrol-crime correlation.",
        ],
      },
      correctAnswer:
        "More patrols may raise reported crime by increasing detection and reporting, not actual crime; compare victimization-survey crime (which doesn't depend on police presence) across high- and low-patrol months.",
      explanation:
        "Full credit identifies a detection/reporting mechanism and an independent measure that could refute it. The 'can't say what's going on' dodge earns zero.",
    },
    {
      itemType: "hybrid",
      prompt:
        "A school finds students who take music lessons have higher math grades. The board considers mandatory music classes. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Music and math grades are correlated, so the board shouldn't read into it.",
          credit: 0,
        },
        {
          text: "Music lessons may raise math grades by training working memory and pattern recognition; randomly offer lessons to some students and compare their later math gains to a control group.",
          credit: 1.0,
        },
        {
          text: "Music probably helps math; following more cohorts would clarify it.",
          credit: 0.6,
        },
        {
          text: "There may be a slight link between music and math.",
          credit: 0.3,
        },
      ],
      writtenRubric: {
        prompt:
          "In two sentences, name the single cheapest observation that would most distinguish your mechanism from the rival that advantaged families provide both music lessons and math support, and say what result would refute your mechanism.",
        modelAnswer:
          "Randomly assign free music lessons within a single income band so family advantage is held roughly constant, then compare math gains. My mechanism is refuted if the lesson and no-lesson groups show equal math improvement.",
        yieldAnchors: [
          "Music-lesson students have higher math grades.",
          "Families choose whether to pay for music lessons.",
          "The board can offer lessons to selected students.",
        ],
        riskAnchors: [
          "Randomized lessons should produce math gains if music causes them.",
          "Equal math gains across groups would falsify the music mechanism.",
        ],
        defeatedBy: [
          "Music lessons certainly cause higher math grades.",
          "The board can conclude nothing from the grade gap.",
        ],
      },
      correctAnswer:
        "Music lessons may raise math grades by training working memory and pattern recognition; randomly offer lessons to some students and compare their later math gains to a control group.",
      explanation:
        "Full credit gives a cognitive mechanism and a within-income-band randomization to defeat the family-advantage rival. The 'shouldn't read into it' refusal scores zero.",
    },
    {
      itemType: "hybrid",
      prompt:
        "An e-commerce team finds that orders shipped in branded packaging get more repeat purchases than those in plain boxes. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Branded packaging clearly causes loyalty, so every order should use it immediately.",
          credit: 0,
        },
        {
          text: "Branded packaging may lift repeats by creating a memorable unboxing that strengthens brand recall; randomly assign packaging type to incoming orders and compare 90-day repeat rates.",
          credit: 1.0,
        },
        {
          text: "Branded packaging probably helps repeats; more order data would confirm.",
          credit: 0.6,
        },
        {
          text: "There may be a link between packaging and repeat buying.",
          credit: 0.3,
        },
      ],
      writtenRubric: {
        prompt:
          "In two sentences, name the single cheapest observation that would most distinguish your mechanism from the rival that premium products simply ship in branded boxes, and say what result would refute your mechanism.",
        modelAnswer:
          "Randomly vary packaging within the same product line so product tier is held constant, then compare repeat rates. My mechanism is refuted if branded and plain packaging yield the same 90-day repeat rate for identical products.",
        yieldAnchors: [
          "Branded-packaging orders have higher repeat rates.",
          "Packaging type can currently track product tier.",
          "The team controls which orders get which packaging.",
        ],
        riskAnchors: [
          "Within-product randomization should preserve the repeat gap if packaging causes it.",
          "Equal repeat rates within a product line would falsify the packaging mechanism.",
        ],
        defeatedBy: [
          "Branded packaging definitely causes loyalty with no test needed.",
          "We can conclude nothing from the packaging correlation.",
        ],
      },
      correctAnswer:
        "Branded packaging may lift repeats by creating a memorable unboxing that strengthens brand recall; randomly assign packaging type to incoming orders and compare 90-day repeat rates.",
      explanation:
        "Full credit pairs the unboxing mechanism with a within-product randomization that refutes the premium-product rival. The 'clearly causes, use it immediately' overreach the data defeats scores zero.",
    },
    {
      itemType: "hybrid",
      prompt:
        "A sleep study finds people who keep phones out of the bedroom report better sleep quality. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Phone habits and sleep are just correlated, so nothing actionable follows.",
          credit: 0,
        },
        {
          text: "Removing phones may improve sleep by cutting late-night screen light and notification arousals; randomly assign volunteers to remove or keep phones and compare measured sleep latency and wake-ups.",
          credit: 1.0,
        },
        {
          text: "Phone removal probably helps sleep; surveying more people would help.",
          credit: 0.6,
        },
        {
          text: "There may be a link between phones and sleep.",
          credit: 0.3,
        },
      ],
      writtenRubric: {
        prompt:
          "In two sentences, name the single cheapest observation that would most distinguish your mechanism from the rival that health-conscious people both ditch phones and sleep well, and say what result would refute your mechanism.",
        modelAnswer:
          "Randomly assign the same people to phone-out and phone-in weeks (a within-person crossover) so their health habits stay constant, then compare measured sleep. My mechanism is refuted if sleep latency and wake-ups are identical across the two conditions.",
        yieldAnchors: [
          "Phone-free sleepers report better sleep quality.",
          "Phones emit light and notifications at night.",
          "Volunteers can be assigned phone-in or phone-out conditions.",
        ],
        riskAnchors: [
          "A within-person crossover should show better sleep in phone-out weeks if phones cause poor sleep.",
          "Identical sleep across conditions would falsify the phone mechanism.",
        ],
        defeatedBy: [
          "Phones certainly ruin sleep, no test required.",
          "The correlation supports no conclusion.",
        ],
      },
      correctAnswer:
        "Removing phones may improve sleep by cutting late-night screen light and notification arousals; randomly assign volunteers to remove or keep phones and compare measured sleep latency and wake-ups.",
      explanation:
        "Full credit names a light/arousal mechanism and a crossover design that defeats the health-conscious rival. The 'nothing actionable follows' refusal earns zero.",
    },
    {
      itemType: "hybrid",
      prompt:
        "A manager finds that employees who use the company's standing desks take fewer sick days. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Standing-desk use and sick days are correlated, so we can't conclude they help.",
          credit: 0,
        },
        {
          text: "Standing desks may cut sick days by reducing sedentary strain and boosting circulation; randomly assign standing desks to half the team and compare sick-day counts over six months.",
          credit: 1.0,
        },
        {
          text: "Standing desks probably reduce sick days; tracking more staff would help.",
          credit: 0.6,
        },
        {
          text: "There may be some tie between standing desks and health.",
          credit: 0.3,
        },
      ],
      writtenRubric: {
        prompt:
          "In two sentences, name the single cheapest observation that would most distinguish your mechanism from the rival that already-healthy employees request standing desks, and say what result would refute your mechanism.",
        modelAnswer:
          "Randomly assign standing desks rather than letting staff opt in, so prior health is balanced across groups, then compare sick days. My mechanism is refuted if the randomly equipped and unequipped groups take the same number of sick days.",
        yieldAnchors: [
          "Standing-desk users take fewer sick days.",
          "Employees currently choose whether to use standing desks.",
          "The manager can assign desks at will.",
        ],
        riskAnchors: [
          "Randomized desk assignment should reduce sick days if desks cause the effect.",
          "Equal sick days across groups would falsify the desk mechanism.",
        ],
        defeatedBy: [
          "Standing desks definitely reduce sick days for everyone.",
          "We can conclude nothing from the sick-day pattern.",
        ],
      },
      correctAnswer:
        "Standing desks may cut sick days by reducing sedentary strain and boosting circulation; randomly assign standing desks to half the team and compare sick-day counts over six months.",
      explanation:
        "Full credit specifies a physiological mechanism and a randomized assignment that defeats the healthy-self-selection rival. The 'can't conclude they help' refusal scores zero.",
    },
    {
      itemType: "hybrid",
      prompt:
        "A wine retailer finds bottles displayed at eye level sell more than those on lower shelves. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Shelf height and sales are merely correlated, so we can't act on it.",
          credit: 0,
        },
        {
          text: "Bottles probably sell more at eye level only because staff put already-popular labels there.",
          credit: 0.3,
        },
        {
          text: "Eye-level placement likely boosts sales; reviewing more weeks would confirm it.",
          credit: 0.6,
        },
        {
          text: "Eye-level placement may raise sales by increasing visibility and impulse selection; randomly rotate the same bottles between eye-level and low shelves week to week and compare units sold.",
          credit: 1.0,
        },
      ],
      writtenRubric: {
        prompt:
          "In two sentences, name the single cheapest observation that would most distinguish your visibility mechanism from the rival that popular labels are placed at eye level, and say what result would refute your mechanism.",
        modelAnswer:
          "Rotate the identical bottle between eye-level and low shelves on alternating weeks, holding the label constant, and compare sales. My visibility mechanism is refuted if the same bottle sells equally regardless of shelf height.",
        yieldAnchors: [
          "Eye-level bottles outsell lower-shelf bottles.",
          "Staff currently choose which labels go at eye level.",
          "The same bottle can be rotated between shelf positions.",
        ],
        riskAnchors: [
          "Rotating a fixed label should shift its sales with height if visibility causes the effect.",
          "Equal sales across positions for the same bottle would falsify the visibility mechanism.",
        ],
        defeatedBy: [
          "Eye-level placement certainly causes more sales, no test needed.",
          "Nothing can be acted on from the shelf-height correlation.",
        ],
      },
      correctAnswer:
        "Eye-level placement may raise sales by increasing visibility and impulse selection; randomly rotate the same bottles between eye-level and low shelves week to week and compare units sold.",
      explanation:
        "Full credit names a visibility mechanism and a within-label rotation that defeats the popular-label rival. The 'can't act on it' refusal earns zero.",
    },
  ];
}

function buildWritten(): HomeworkItem[] {
  return [
    {
      itemType: "written",
      prompt:
        "A city's open data shows that neighborhoods with more bike lanes have fewer traffic fatalities. The transportation department is debating a major bike-lane expansion and asks you to interpret the pattern. In one paragraph, propose the strongest supported mechanism linking bike lanes to fewer fatalities and describe how you would test it before committing to a citywide rollout.",
      writtenRubric: {
        modelAnswer:
          "The most likely mechanism is that bike lanes narrow car lanes and add physical buffers, which slows traffic and separates cyclists from cars, cutting the high-speed collisions that cause fatalities. I'd commit to this and test it with a staged rollout: install lanes in randomly chosen candidate corridors and leave matched corridors untouched, then compare the change in fatalities and measured vehicle speeds in treated vs. control streets. The mechanism predicts that treated corridors show both lower speeds and fewer fatalities; if speeds drop but fatalities don't, or if a rival (safer drivers already live in lane-rich areas) holds, the gap should vanish once assignment is randomized.",
        yieldAnchors: [
          "Neighborhoods with more bike lanes have fewer traffic fatalities.",
          "Bike lanes physically narrow car lanes and add buffers.",
          "The department can choose where to install new lanes.",
          "Fatalities are concentrated in high-speed collisions.",
        ],
        riskAnchors: [
          "Randomly assigned bike-lane corridors should show lower vehicle speeds.",
          "Treated corridors should show fewer fatalities than matched controls.",
          "The fatality gap should disappear if confounding, not lanes, drives it.",
        ],
        defeatedBy: [
          "Bike lanes obviously cause the fatality drop, so just build them everywhere.",
          "Correlation isn't causation, so the pattern supports no decision.",
          "Bike lanes have no relationship to safety whatsoever.",
        ],
      },
      correctAnswer:
        "The most likely mechanism is that bike lanes narrow car lanes and add physical buffers, which slows traffic and separates cyclists from cars, cutting the high-speed collisions that cause fatalities. I'd commit to this and test it with a staged rollout: install lanes in randomly chosen candidate corridors and leave matched corridors untouched, then compare the change in fatalities and measured vehicle speeds in treated vs. control streets. The mechanism predicts that treated corridors show both lower speeds and fewer fatalities; if speeds drop but fatalities don't, or if a rival (safer drivers already live in lane-rich areas) holds, the gap should vanish once assignment is randomized.",
      explanation:
        "Under CCR's inverted standard, the cautious 'correlation isn't causation, no decision' answer earns near-zero and florid prose that names no concrete mechanism or test scores low; top credit goes to committing to the speed/separation mechanism and a staged randomized rollout that could refute it.",
    },
    {
      itemType: "written",
      prompt:
        "A subscription box company notices that customers who add a handwritten thank-you note option to their first order have a much higher one-year retention rate. The growth team wants to know whether to make the note standard. In one paragraph, propose the strongest supported mechanism and describe a test that could confirm or refute it before a full rollout.",
      writtenRubric: {
        modelAnswer:
          "The strongest mechanism is that the handwritten note triggers reciprocity and a sense of personal relationship, raising emotional attachment so customers renew rather than churn. I'd commit to this and test it by randomly adding the note to a fraction of new customers who did not request it, then comparing their one-year retention to a no-note control. The mechanism predicts the randomly noted group retains better; if retention is identical, the original gap was self-selection (customers who choose notes were already loyalty-prone), and the mechanism is refuted.",
        yieldAnchors: [
          "Note-option customers retain at a higher one-year rate.",
          "Customers currently choose the note themselves.",
          "The team can add notes to any orders it picks.",
          "Handwritten notes signal personal effort.",
        ],
        riskAnchors: [
          "Randomly added notes should raise retention if reciprocity causes it.",
          "Identical retention across groups would falsify the mechanism.",
          "The effect should persist after controlling for initial order size.",
        ],
        defeatedBy: [
          "The note certainly causes retention, so make it standard now.",
          "It's only a correlation, so nothing can be concluded.",
          "Handwritten notes are irrelevant to customer behavior.",
        ],
      },
      correctAnswer:
        "The strongest mechanism is that the handwritten note triggers reciprocity and a sense of personal relationship, raising emotional attachment so customers renew rather than churn. I'd commit to this and test it by randomly adding the note to a fraction of new customers who did not request it, then comparing their one-year retention to a no-note control. The mechanism predicts the randomly noted group retains better; if retention is identical, the original gap was self-selection (customers who choose notes were already loyalty-prone), and the mechanism is refuted.",
      explanation:
        "The timid 'only a correlation, nothing can be concluded' answer earns near-zero and vague praise of notes without a mechanism scores low; full credit commits to the reciprocity mechanism plus a randomized note test that exposes self-selection.",
    },
    {
      itemType: "written",
      prompt:
        "A regional health agency finds that towns with more fast-food outlets per capita have higher rates of type 2 diabetes. Officials are split on whether to limit new outlet permits. In one paragraph, propose the strongest supported mechanism and describe how you would test it before changing policy.",
      writtenRubric: {
        modelAnswer:
          "The strongest mechanism is that denser fast-food access lowers the time and price cost of calorie-dense meals, increasing their routine consumption and driving weight gain and insulin resistance over years. I'd commit to this and test it with a natural experiment: track diabetes incidence in towns where a permit moratorium or new outlet opening changes outlet density, comparing them to matched towns with no change. The mechanism predicts diabetes incidence rises where density rises and stabilizes where it's capped; if incidence moves with underlying income or activity levels regardless of outlet density, the rival (poorer towns attract both outlets and disease) holds and the mechanism is refuted.",
        yieldAnchors: [
          "Towns with more fast-food outlets have higher diabetes rates.",
          "Fast food is calorie-dense and low-cost in time and money.",
          "Permit policy can change outlet density.",
          "Diabetes develops over years of dietary exposure.",
        ],
        riskAnchors: [
          "Diabetes incidence should rise where outlet density rises and flatten where it's capped.",
          "Matched-town comparisons should isolate density from income.",
          "Controlling for town income should preserve the density effect if real.",
        ],
        defeatedBy: [
          "Fast food obviously causes diabetes, so ban new outlets immediately.",
          "It's correlation, not causation, so permit policy can't be informed by it.",
          "Outlet density has nothing to do with diabetes.",
        ],
      },
      correctAnswer:
        "The strongest mechanism is that denser fast-food access lowers the time and price cost of calorie-dense meals, increasing their routine consumption and driving weight gain and insulin resistance over years. I'd commit to this and test it with a natural experiment: track diabetes incidence in towns where a permit moratorium or new outlet opening changes outlet density, comparing them to matched towns with no change. The mechanism predicts diabetes incidence rises where density rises and stabilizes where it's capped; if incidence moves with underlying income or activity levels regardless of outlet density, the rival (poorer towns attract both outlets and disease) holds and the mechanism is refuted.",
      explanation:
        "The 'correlation, not causation, can't inform policy' answer earns near-zero and wordy hedging without a mechanism or test scores low; top credit names the access-cost mechanism and a natural-experiment test that could refute it via the income confounder.",
    },
    {
      itemType: "written",
      prompt:
        "A software company observes that engineers who write more detailed pull-request descriptions have fewer bugs reach production. Leadership wonders whether to mandate detailed descriptions. In one paragraph, propose the strongest supported mechanism and describe a test that could confirm or refute it.",
      writtenRubric: {
        modelAnswer:
          "The strongest mechanism is that writing a detailed description forces the author to re-examine and mentally re-test their own change, catching defects before review, and gives reviewers enough context to spot more bugs. I'd commit to this and test it by randomly assigning a detailed-description template to some teams' PRs while others keep their usual style, then comparing production bug rates. The mechanism predicts the templated teams ship fewer bugs; if bug rates are unchanged, the original link was confounding (careful engineers both write thorough descriptions and produce clean code), and the mechanism is refuted.",
        yieldAnchors: [
          "Detailed PR descriptions correlate with fewer production bugs.",
          "Writing a description prompts the author to reconsider the change.",
          "Reviewers rely on description context to find issues.",
          "The company can mandate description formats.",
        ],
        riskAnchors: [
          "Randomly templated teams should ship fewer bugs if the mechanism holds.",
          "Unchanged bug rates would falsify the description mechanism.",
          "The effect should persist after controlling for engineer seniority.",
        ],
        defeatedBy: [
          "Detailed descriptions clearly cause fewer bugs, so mandate them now.",
          "This is just correlation, so it can't guide any policy.",
          "PR descriptions have no bearing on code quality.",
        ],
      },
      correctAnswer:
        "The strongest mechanism is that writing a detailed description forces the author to re-examine and mentally re-test their own change, catching defects before review, and gives reviewers enough context to spot more bugs. I'd commit to this and test it by randomly assigning a detailed-description template to some teams' PRs while others keep their usual style, then comparing production bug rates. The mechanism predicts the templated teams ship fewer bugs; if bug rates are unchanged, the original link was confounding (careful engineers both write thorough descriptions and produce clean code), and the mechanism is refuted.",
      explanation:
        "The cautious 'just correlation, can't guide policy' answer scores near-zero and elaborate prose with no concrete mechanism or test scores low; full credit commits to the self-review/reviewer-context mechanism and a randomized template test that exposes the careful-engineer confounder.",
    },
    {
      itemType: "written",
      prompt:
        "A youth soccer league finds that teams whose coaches run a structured warm-up have fewer player injuries over the season. The league board is weighing whether to require the warm-up. In one paragraph, propose the strongest supported mechanism and describe how you would test it before mandating it.",
      writtenRubric: {
        modelAnswer:
          "The strongest mechanism is that the structured warm-up raises muscle temperature and rehearses cutting and landing movements, improving neuromuscular control so players suffer fewer strains and ligament tears. I'd commit to this and test it with a cluster-randomized trial: randomly assign teams to the structured warm-up or their usual routine and compare injury rates across the season. The mechanism predicts the warm-up teams show fewer non-contact injuries specifically; if injury rates are equal, or if only well-resourced clubs (which already had lower injuries) adopted it, the gap should disappear once warm-ups are randomly assigned, refuting the mechanism.",
        yieldAnchors: [
          "Teams with structured warm-ups have fewer injuries.",
          "Warm-ups raise muscle temperature and rehearse movement patterns.",
          "Coaches currently choose whether to run the warm-up.",
          "The board can require warm-ups league-wide.",
        ],
        riskAnchors: [
          "Cluster-randomized warm-up teams should show fewer non-contact injuries.",
          "Equal injury rates across groups would falsify the mechanism.",
          "Random assignment should remove any club-resource confounding.",
        ],
        defeatedBy: [
          "The warm-up obviously prevents injuries, so require it immediately.",
          "Correlation isn't causation, so the board can't decide anything.",
          "Warm-ups make no difference to injury risk.",
        ],
      },
      correctAnswer:
        "The strongest mechanism is that the structured warm-up raises muscle temperature and rehearses cutting and landing movements, improving neuromuscular control so players suffer fewer strains and ligament tears. I'd commit to this and test it with a cluster-randomized trial: randomly assign teams to the structured warm-up or their usual routine and compare injury rates across the season. The mechanism predicts the warm-up teams show fewer non-contact injuries specifically; if injury rates are equal, or if only well-resourced clubs (which already had lower injuries) adopted it, the gap should disappear once warm-ups are randomly assigned, refuting the mechanism.",
      explanation:
        "The 'correlation isn't causation, can't decide' answer earns near-zero and vague injury talk without a mechanism scores low; top credit commits to the neuromuscular mechanism and a cluster-randomized trial that could refute it via the club-resource confounder.",
    },
  ];
}
