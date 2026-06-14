import type { SectionContent, HomeworkItem, McOption, WrittenRubric } from "./types";

const mcq: HomeworkItem[] = [
  {
    itemType: "mc",
    prompt:
      "A web team's checkout page is converting poorly this week. Two live rivals: (A) the new one-page form confuses users, or (B) a payment API is silently timing out. Logs, surveys, A/B tests, and a full UX audit are all on the table. Which next step best follows?",
    mcOptions: [
      { text: "Launch a full UX audit plus a fresh A/B test plus a customer survey so we cover every angle before deciding.", credit: 0 },
      { text: "Pull the last 200 checkout server logs and check how many ended in a payment-API timeout — if most failures are timeouts it's B, if checkouts complete cleanly but users abandon the form it's A.", credit: 1.0 },
      { text: "Re-run an A/B test of the old vs new form for two weeks; if the old form converts better, the form is the problem.", credit: 0.6 },
      { text: "Send a survey asking abandoning users what went wrong and read the themes.", credit: 0.3 },
    ],
    correctAnswer:
      "Pull the last 200 checkout server logs and check how many ended in a payment-API timeout — if most failures are timeouts it's B, if checkouts complete cleanly but users abandon the form it's A.",
    explanation:
      "The log check is nearly free and its outcome cleanly splits A from B in one look. 'Cover every angle first' is the zero-credit dodge: it's the most expensive option and discriminates no faster than the cheapest one.",
  },
  {
    itemType: "mc",
    prompt:
      "A houseplant is wilting. Two rival explanations: it's underwatered, or its roots are rotting from overwatering. Both produce droopy leaves. Which observation best settles it?",
    mcOptions: [
      { text: "There's probably something wrong with the watering; keep an eye on it over the coming weeks.", credit: 0.3 },
      { text: "Pay a botanist for a full soil-nutrient and pathogen panel to rule out every possible cause.", credit: 0 },
      { text: "Stick a finger two inches into the soil right now: bone-dry means underwatering, soggy and sour-smelling means rot.", credit: 1.0 },
      { text: "Repot it into fresh soil and a bigger pot, which should help whatever the cause is.", credit: 0.6 },
    ],
    correctAnswer:
      "Stick a finger two inches into the soil right now: bone-dry means underwatering, soggy and sour-smelling means rot.",
    explanation:
      "The finger test costs nothing and its two outcomes map directly onto the two rival models. The lab panel is the dodge — maximal cost, no faster discrimination between the only two live hypotheses.",
  },
  {
    itemType: "mc",
    prompt:
      "Nightly batch jobs started failing after a release. Two suspects: a config change to the database connection pool, or a new third-party library that's incompatible. Which move best discriminates?",
    mcOptions: [
      { text: "Roll back the entire release and slowly re-apply changes over the next sprint while monitoring.", credit: 0.6 },
      { text: "Revert just the connection-pool config in staging and re-run one batch job: if it now succeeds it's the config, if it still fails it's the library.", credit: 1.0 },
      { text: "It could be either; gather a week of detailed telemetry across all services before acting.", credit: 0 },
      { text: "Read the new library's changelog for anything that looks risky.", credit: 0.3 },
    ],
    correctAnswer:
      "Revert just the connection-pool config in staging and re-run one batch job: if it now succeeds it's the config, if it still fails it's the library.",
    explanation:
      "Reverting one variable and re-running once is cheap and its outcome isolates the cause. 'Gather a week of telemetry across all services' is the expensive non-discriminating dodge.",
  },
  {
    itemType: "mc",
    prompt:
      "A runner's times have plateaued. Two rival diagnoses: she's overtrained and fatigued, or she's undertrained and needs more volume. Both feel like 'stuck.' Which test best distinguishes them?",
    mcOptions: [
      { text: "Book a full sports-medicine workup — bloodwork, VO2 max, gait analysis — to leave nothing unexamined.", credit: 0 },
      { text: "Take three easy days, then time one hard interval: a big jump means she was fatigued (overtrained), no change points to undertraining.", credit: 1.0 },
      { text: "Add more weekly mileage for a month and see whether times improve.", credit: 0.6 },
      { text: "There's clearly a training issue of some kind worth tracking in her log.", credit: 0.3 },
    ],
    correctAnswer:
      "Take three easy days, then time one hard interval: a big jump means she was fatigued (overtrained), no change points to undertraining.",
    explanation:
      "A three-day taper plus one timed interval is cheap and its outcome flips cleanly between the two diagnoses. The full medical workup is the costly dodge that doesn't sharpen the choice faster.",
  },
  {
    itemType: "mc",
    prompt:
      "A bakery's sourdough loaves came out flat all week. Two leading culprits: the starter has gone inactive, or the new oven runs cooler than its dial reads. Which check best decides?",
    mcOptions: [
      { text: "Replace both the starter and the oven thermostat to be safe and re-bake next week.", credit: 0.6 },
      { text: "Drop a spoon of starter into warm water — floats and bubbles means it's alive, so the oven is the suspect; sinks flat means a dead starter.", credit: 1.0 },
      { text: "Something in the process is off; document each bake carefully going forward.", credit: 0.3 },
      { text: "Run a month-long trial varying flour, hydration, proof time, and oven to map every factor.", credit: 0 },
    ],
    correctAnswer:
      "Drop a spoon of starter into warm water — floats and bubbles means it's alive, so the oven is the suspect; sinks flat means a dead starter.",
    explanation:
      "The float test takes a minute and its result points straight at one of the two rivals. The month-long multi-factor trial is the expensive non-discriminating dodge.",
  },
  {
    itemType: "mc",
    prompt:
      "Sales dropped this quarter in one region. Two live models: a new local competitor is stealing customers, or the regional manager left and service quality slipped. Which observation best separates them?",
    mcOptions: [
      { text: "Commission a regional market-research study covering pricing, brand, service, and demographics.", credit: 0 },
      { text: "Check whether lost customers went to the new competitor or simply stopped buying: a switch pattern points to competition, churn-without-switch points to the service drop.", credit: 1.0 },
      { text: "Compare this region's service-complaint rate before and after the manager left.", credit: 0.6 },
      { text: "Sales are down for some regional reason; keep monitoring the numbers monthly.", credit: 0.3 },
    ],
    correctAnswer:
      "Check whether lost customers went to the new competitor or simply stopped buying: a switch pattern points to competition, churn-without-switch points to the service drop.",
    explanation:
      "The where-did-they-go check uses data you likely already have and its pattern discriminates directly. The full market-research study is the high-cost dodge.",
  },
  {
    itemType: "mc",
    prompt:
      "A car won't start, just clicking. Two rivals: a dead battery, or a failed starter motor. Which single test best discriminates?",
    mcOptions: [
      { text: "Have a mechanic do a full electrical-system diagnostic to be thorough.", credit: 0 },
      { text: "Turn on the headlights and try the horn: bright lights and a strong horn point to the starter, dim or dead accessories point to the battery.", credit: 1.0 },
      { text: "Try jump-starting it; if it starts, the battery was likely involved.", credit: 0.6 },
      { text: "It's an electrical fault of some kind worth getting looked at.", credit: 0.3 },
    ],
    correctAnswer:
      "Turn on the headlights and try the horn: bright lights and a strong horn point to the starter, dim or dead accessories point to the battery.",
    explanation:
      "Flicking the lights is free and instantly distinguishes a flat battery from a bad starter. The full diagnostic is the dodge: maximal cost for no faster split between the two live causes.",
  },
  {
    itemType: "mc",
    prompt:
      "An online course has high dropout after lesson 3. Two models: lesson 3 is too hard, or a broken video player on that page frustrates learners. Which next step best follows?",
    mcOptions: [
      { text: "Run usability interviews, redesign lesson 3, and rebuild the player to address whatever it is.", credit: 0.6 },
      { text: "Pull the analytics event for the lesson-3 video: a spike in 'play error' events means the player; normal playback with drop-off at the quiz means difficulty.", credit: 1.0 },
      { text: "There's a problem on lesson 3; flag it for the content team to review.", credit: 0.3 },
      { text: "Survey every enrolled learner about their whole experience to find all friction points.", credit: 0 },
    ],
    correctAnswer:
      "Pull the analytics event for the lesson-3 video: a spike in 'play error' events means the player; normal playback with drop-off at the quiz means difficulty.",
    explanation:
      "The event-log check is already-collected and its outcome cleanly separates a technical fault from a difficulty wall. The course-wide survey is the expensive scattershot dodge.",
  },
  {
    itemType: "mc",
    prompt:
      "A patient reports dizziness on standing. Two leading explanations: low blood pressure on standing (orthostatic), or an inner-ear (vestibular) problem. Which cheap test best discriminates?",
    mcOptions: [
      { text: "Order an MRI, a tilt-table test, and a full cardiac panel so nothing is missed.", credit: 0 },
      { text: "Measure blood pressure lying down then immediately after standing: a sharp drop confirms orthostatic; stable pressure with spinning sensation points to vestibular.", credit: 1.0 },
      { text: "Have the patient keep a two-week diary of every dizzy episode and its context.", credit: 0.6 },
      { text: "It's a balance-related issue; refer onward for specialist evaluation.", credit: 0.3 },
    ],
    correctAnswer:
      "Measure blood pressure lying down then immediately after standing: a sharp drop confirms orthostatic; stable pressure with spinning sensation points to vestibular.",
    explanation:
      "The lying-to-standing BP check uses a cuff and two minutes, and its result picks between the two rivals. The MRI-plus-everything order is the costly dodge.",
  },
  {
    itemType: "mc",
    prompt:
      "A factory line is producing more defects on the night shift. Two rivals: night workers are less trained, or the building's lighting is dimmer at night and workers miss flaws. Which observation best decides?",
    mcOptions: [
      { text: "Audit training records, run a full ergonomics study, and survey all shifts to be comprehensive.", credit: 0 },
      { text: "Move one experienced day worker to a night shift for two nights: if their defect rate also rises, it's the environment (lighting), not training.", credit: 1.0 },
      { text: "Retrain all night-shift workers and see if defects fall over the next quarter.", credit: 0.6 },
      { text: "Defects are higher at night for some reason; keep tracking the gap.", credit: 0.3 },
    ],
    correctAnswer:
      "Move one experienced day worker to a night shift for two nights: if their defect rate also rises, it's the environment (lighting), not training.",
    explanation:
      "Swapping one known-skilled worker into the night setting cheaply isolates environment from skill. The comprehensive audit is the high-cost, slow-discriminating dodge.",
  },
  {
    itemType: "mc",
    prompt:
      "A novelist's new chapters feel flat to early readers. Two diagnoses: the pacing is too slow, or readers don't care about the protagonist. Which cheap test best discriminates?",
    mcOptions: [
      { text: "Pacing or character — hard to say; commission a full developmental edit of the manuscript.", credit: 0 },
      { text: "Ask five readers to mark the exact line where they got bored: clustering at slow scene transitions means pacing; boredom whenever the hero is on-page means character.", credit: 1.0 },
      { text: "Cut 20% of the prose to tighten pacing and resend to readers.", credit: 0.6 },
      { text: "The chapters need work somewhere; revise broadly and try again.", credit: 0.3 },
    ],
    correctAnswer:
      "Ask five readers to mark the exact line where they got bored: clustering at slow scene transitions means pacing; boredom whenever the hero is on-page means character.",
    explanation:
      "A marked-line exercise with five readers is nearly free and where the boredom clusters splits pacing from character. The full developmental edit is the expensive dodge.",
  },
  {
    itemType: "mc",
    prompt:
      "A SaaS app's signups converted to paid far less last month. Two models: the new pricing page scares people off, or a recent bug breaks trial onboarding. Which next step best follows?",
    mcOptions: [
      { text: "Pull the funnel: if drop-off spikes at the pricing-page view it's pricing; if users reach onboarding then stall at a broken step it's the bug.", credit: 1.0 },
      { text: "There's a conversion problem; A/B test several new pricing pages over the next month.", credit: 0.6 },
      { text: "Conversion is down for some reason; watch the metric closely.", credit: 0.3 },
      { text: "Rebuild both the pricing page and the onboarding flow and re-measure next quarter.", credit: 0 },
    ],
    correctAnswer:
      "Pull the funnel: if drop-off spikes at the pricing-page view it's pricing; if users reach onboarding then stall at a broken step it's the bug.",
    explanation:
      "The existing funnel data discriminates instantly at zero new cost. Rebuilding both surfaces is the most expensive, slowest-to-answer dodge.",
  },
  {
    itemType: "mc",
    prompt:
      "Tomatoes in a garden bed have yellow leaves. Two rivals: nitrogen deficiency, or a fungal blight. Which observation best discriminates?",
    mcOptions: [
      { text: "Send leaf and soil samples to an agricultural lab for a complete analysis.", credit: 0 },
      { text: "Look at where the yellowing starts: uniform yellowing on the oldest lower leaves points to nitrogen; yellow blotches with brown spots and concentric rings point to blight.", credit: 1.0 },
      { text: "Add fertilizer and watch whether the new growth comes in green.", credit: 0.6 },
      { text: "Something's stressing the plants; monitor them daily.", credit: 0.3 },
    ],
    correctAnswer:
      "Look at where the yellowing starts: uniform yellowing on the oldest lower leaves points to nitrogen; yellow blotches with brown spots and concentric rings point to blight.",
    explanation:
      "A close look at the pattern is free and its features map onto the two rivals. The full lab analysis is the costly dodge that adds little speed.",
  },
  {
    itemType: "mc",
    prompt:
      "A team's daily standup runs long and people zone out. Two models: too many attendees, or no clear agenda. Which cheap experiment best discriminates?",
    mcOptions: [
      { text: "Hire a facilitation consultant to overhaul all team meetings.", credit: 0 },
      { text: "For three days, post a strict three-item agenda but keep the same attendees: if it snaps back to time and focus, the problem was structure, not size.", credit: 1.0 },
      { text: "Cut the invite list to core members and see whether things improve.", credit: 0.6 },
      { text: "Standups need fixing somehow; ask the team for general feedback.", credit: 0.3 },
    ],
    correctAnswer:
      "For three days, post a strict three-item agenda but keep the same attendees: if it snaps back to time and focus, the problem was structure, not size.",
    explanation:
      "Changing one variable (agenda) for three days cheaply isolates structure from size. The consultant overhaul is the maximal-cost dodge.",
  },
  {
    itemType: "mc",
    prompt:
      "An e-commerce site's mobile users bounce far more than desktop users. Two rivals: the mobile layout is broken, or mobile shoppers are simply browsing with lower intent. Which observation best decides?",
    mcOptions: [
      { text: "It's a mobile issue of some kind; keep an eye on the bounce gap.", credit: 0.3 },
      { text: "Compare add-to-cart rate, not just bounce: if mobile users who do engage add to cart at the same rate as desktop, it's intent; if even engaged mobile users rarely add, the layout is broken.", credit: 1.0 },
      { text: "Run a full mobile redesign and remeasure bounce next quarter.", credit: 0.6 },
      { text: "Commission heatmaps, session recordings, and a survey across all mobile traffic to be exhaustive.", credit: 0 },
    ],
    correctAnswer:
      "Compare add-to-cart rate, not just bounce: if mobile users who do engage add to cart at the same rate as desktop, it's intent; if even engaged mobile users rarely add, the layout is broken.",
    explanation:
      "The add-to-cart comparison reuses existing data and its outcome separates intent from a broken layout. The exhaustive heatmap-plus-survey program is the expensive non-discriminating dodge.",
  },
];

const hybrid: HomeworkItem[] = [
  {
    itemType: "hybrid",
    prompt:
      "A coffee shop's espresso has tasted sour for two days. Two rivals: the grind is too coarse (under-extraction), or the new bag of beans is under-roasted. Many tests are possible. Which next step best follows?",
    mcOptions: [
      { text: "Pull one shot at a finer grind with the current beans: if it tastes balanced, it was the grind; if it's still sour, suspect the beans.", credit: 1.0 },
      { text: "Sour means under-extraction somewhere; tweak grind, dose, and temperature together until it's fixed.", credit: 0.6 },
      { text: "The espresso is off; have the team taste-test throughout the day.", credit: 0.3 },
      { text: "Send the beans for lab roast analysis and recalibrate the whole machine to leave nothing untested.", credit: 0 },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish the grind hypothesis from the bean hypothesis, and say what result would refute the grind hypothesis.",
      modelAnswer:
        "Pull one shot one notch finer using the same beans — a one-minute change — and taste it; if the sourness vanishes the grind was the cause. If the finer shot is still just as sour, the grind hypothesis is refuted and the beans become the prime suspect.",
      yieldAnchors: [
        "Espresso has been sour for two days",
        "A new bag of beans was introduced",
        "Grind setting is an adjustable single variable",
        "Both under-extraction and under-roasting produce sourness",
      ],
      riskAnchors: [
        "A finer-grind shot tasting balanced confirms grind",
        "A finer-grind shot still sour refutes grind and implicates beans",
      ],
      defeatedBy: [
        "Claiming you must change grind, dose, and temperature at once",
        "Claiming nothing can be diagnosed without lab analysis",
      ],
    },
    correctAnswer:
      "Pull one shot at a finer grind with the current beans: if it tastes balanced, it was the grind; if it's still sour, suspect the beans.",
    explanation:
      "The single-variable shot is cheap and its taste outcome discriminates between grind and beans; a committed two-sentence follow-up names that test and its refuting result, earning full credit. Multi-variable tweaking and lab analysis are the costly dodges.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A child has a fever and rash. Two leading possibilities: a common viral illness, or an allergic reaction to a new detergent used on their clothes two days ago. Which observation best discriminates?",
    mcOptions: [
      { text: "It's clearly some kind of reaction; watch the child closely for a few days.", credit: 0.3 },
      { text: "Wash everything the child wears in the old detergent and run every common allergy and infection test to cover all bases.", credit: 0 },
      { text: "Note whether the rash is only where clothing touches skin or also on the face and inside the mouth: clothing-only points to detergent contact; widespread plus fever points to a virus.", credit: 1.0 },
      { text: "Switch back to the old detergent and see if the rash fades over the week.", credit: 0.6 },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the cheapest single observation that best distinguishes a contact reaction from a viral illness, and state what would refute the detergent hypothesis.",
      modelAnswer:
        "Check the rash's distribution right now — a contact reaction tracks where clothing touches skin, so a free visual scan settles a lot. If the rash also covers the face and mouth and tracks with the fever, the detergent hypothesis is refuted in favor of a virus.",
      yieldAnchors: [
        "Fever and rash present together",
        "New detergent used two days ago",
        "Contact reactions follow clothing contact areas",
        "Viral illness produces widespread rash with fever",
      ],
      riskAnchors: [
        "Clothing-only distribution confirms contact reaction",
        "Face/mouth involvement with fever refutes detergent and implicates virus",
      ],
      defeatedBy: [
        "Running every allergy and infection test at once",
        "Refusing to interpret the rash pattern at all",
      ],
    },
    correctAnswer:
      "Note whether the rash is only where clothing touches skin or also on the face and inside the mouth: clothing-only points to detergent contact; widespread plus fever points to a virus.",
    explanation:
      "A free visual scan of rash distribution discriminates contact reaction from virus; the follow-up commits to that observation and its refuting outcome. Testing everything at once is the expensive dodge.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A mobile game's revenue fell after an update. Two rivals: the new ad placement annoys players who quit, or a pricing change made in-app purchases too expensive. Which next step best follows?",
    mcOptions: [
      { text: "Revenue is down post-update; gather a month of player feedback and analytics first.", credit: 0.3 },
      { text: "Revert both the ad placement and the price and slowly re-introduce each over several releases.", credit: 0.6 },
      { text: "Segment the data: if session length dropped sharply (players leaving) it's the ads; if sessions held but purchase rate fell it's the price.", credit: 1.0 },
      { text: "Run a large multivariate test of ad styles and price points across all players for maximum coverage.", credit: 0 },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest metric split that best distinguishes the ad hypothesis from the price hypothesis, and say what result would refute the ad hypothesis.",
      modelAnswer:
        "Split existing telemetry into session length vs. purchase rate — no new data needed; collapsing session length implicates the ads. If sessions are unchanged but purchase rate dropped, the ad hypothesis is refuted and the price change is the cause.",
      yieldAnchors: [
        "Revenue fell after the update",
        "Update changed both ad placement and pricing",
        "Annoying ads would shorten sessions",
        "Too-high prices would lower purchase rate, not session length",
      ],
      riskAnchors: [
        "Sharp session-length drop confirms the ad hypothesis",
        "Stable sessions with lower purchase rate refutes ads, implicates price",
      ],
      defeatedBy: [
        "Running a large multivariate test across all players",
        "Reverting both changes without isolating either",
      ],
    },
    correctAnswer:
      "Segment the data: if session length dropped sharply (players leaving) it's the ads; if sessions held but purchase rate fell it's the price.",
    explanation:
      "The session-vs-purchase split reuses owned data and cleanly separates the rivals; the follow-up commits to it and its refuting outcome. The full multivariate test is the expensive non-discriminating dodge.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A swimmer keeps losing the last 25 meters of races. Two rivals: poor endurance, or bad pacing (starting too fast). Which cheap test best discriminates?",
    mcOptions: [
      { text: "Order a full physiology and stroke-mechanics assessment to examine every variable.", credit: 0 },
      { text: "Have her swim one race deliberately even-paced from a stopwatch split: if the final 25 holds up, it was pacing; if she fades anyway, it's endurance.", credit: 1.0 },
      { text: "Add more endurance sets for a month and see if races improve.", credit: 0.6 },
      { text: "She's fading late for some reason; review her race videos generally.", credit: 0.3 },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the cheapest single trial that best distinguishes the endurance hypothesis from the pacing hypothesis, and state what result would refute the pacing hypothesis.",
      modelAnswer:
        "Run one timed swim with deliberately even splits — a single practice race — and watch the last 25; if it holds, the fade was a pacing artifact. If she fades just as badly despite even pacing, the pacing hypothesis is refuted and endurance is the real limit.",
      yieldAnchors: [
        "She loses the final 25 meters of races",
        "Endurance and fast-start pacing both produce a late fade",
        "Even-pacing is controllable in one trial",
        "Splits are measurable with a stopwatch",
      ],
      riskAnchors: [
        "Even-paced final 25 holding up confirms pacing",
        "Fading even when evenly paced refutes pacing, implicates endurance",
      ],
      defeatedBy: [
        "Ordering a full physiology and mechanics assessment",
        "Spending a month adding sets before discriminating",
      ],
    },
    correctAnswer:
      "Have her swim one race deliberately even-paced from a stopwatch split: if the final 25 holds up, it was pacing; if she fades anyway, it's endurance.",
    explanation:
      "One even-paced trial is cheap and its outcome splits pacing from endurance; the follow-up names the test and its refuting result. The full assessment is the costly dodge.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A restaurant's online reservations dropped sharply. Two rivals: their booking widget broke on the website, or a competitor opened nearby. Which observation best decides?",
    mcOptions: [
      { text: "Reservations are down; commission a full local-market and website audit before concluding.", credit: 0 },
      { text: "Try to make a test booking on the site right now: if the widget errors out, that's the cause; if it works smoothly, look outward to the competitor.", credit: 1.0 },
      { text: "Advertise more heavily for a month and see if bookings recover.", credit: 0.6 },
      { text: "Bookings are down for some reason; keep watching the trend.", credit: 0.3 },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that best distinguishes a broken widget from new competition, and state what result would refute the broken-widget hypothesis.",
      modelAnswer:
        "Attempt one test reservation through the live widget — a two-minute, free check — and a failure pins the cause to the site. If the booking completes cleanly end-to-end, the broken-widget hypothesis is refuted and the new competitor becomes the prime suspect.",
      yieldAnchors: [
        "Online reservations dropped sharply",
        "A booking widget could fail silently",
        "A nearby competitor could divert customers",
        "A test booking directly exercises the widget",
      ],
      riskAnchors: [
        "Widget erroring on a test booking confirms the technical fault",
        "A clean successful test booking refutes the widget hypothesis",
      ],
      defeatedBy: [
        "Commissioning a full market-and-website audit first",
        "Advertising for a month before testing the widget",
      ],
    },
    correctAnswer:
      "Try to make a test booking on the site right now: if the widget errors out, that's the cause; if it works smoothly, look outward to the competitor.",
    explanation:
      "A single live test booking is free and its result discriminates internal from external causes; the follow-up commits to that test and its refuting outcome. The full audit is the expensive dodge.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A laptop's battery drains fast since an update. Two rivals: a single rogue app is running in the background, or the update degraded power management system-wide. Which next step best follows?",
    mcOptions: [
      { text: "Boot into safe mode (no third-party apps) for an hour and check drain: near-normal drain means a rogue app; still draining fast means the system update.", credit: 1.0 },
      { text: "Battery life is bad; reinstall the OS and all apps from scratch to be sure.", credit: 0 },
      { text: "Uninstall recently added apps one at a time over the week and watch battery.", credit: 0.6 },
      { text: "The battery drains for some reason; monitor usage stats daily.", credit: 0.3 },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest test that best distinguishes a rogue app from a system-wide regression, and state what result would refute the rogue-app hypothesis.",
      modelAnswer:
        "Run one hour in safe mode, which disables third-party apps for free; near-normal drain pins the blame on an app. If the battery still drains just as fast with all apps disabled, the rogue-app hypothesis is refuted and the update's power management is the cause.",
      yieldAnchors: [
        "Battery drains fast since the update",
        "A rogue app would run only outside safe mode",
        "A system-wide regression persists in safe mode",
        "Safe mode is a free built-in isolation",
      ],
      riskAnchors: [
        "Near-normal safe-mode drain confirms a rogue app",
        "Fast drain even in safe mode refutes the rogue-app hypothesis",
      ],
      defeatedBy: [
        "Reinstalling the entire OS before isolating the cause",
        "Uninstalling apps one at a time over a week",
      ],
    },
    correctAnswer:
      "Boot into safe mode (no third-party apps) for an hour and check drain: near-normal drain means a rogue app; still draining fast means the system update.",
    explanation:
      "Safe mode is a free, fast isolation whose outcome splits app from OS; the follow-up commits to it and its refuting result. The full reinstall is the maximal-cost dodge.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A nonprofit's email donations fell this month. Two rivals: the emails are landing in spam folders, or donors are simply giving less due to the economy. Which observation best discriminates?",
    mcOptions: [
      { text: "Donations are down; run a comprehensive donor survey and deliverability consultancy.", credit: 0 },
      { text: "Check the email open rate: if opens collapsed alongside donations, it's a deliverability/spam problem; if opens held steady but giving fell, it's donor behavior.", credit: 1.0 },
      { text: "Send the next campaign from a new email provider and compare results.", credit: 0.6 },
      { text: "Giving is down for some reason; keep an eye on monthly totals.", credit: 0.3 },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest metric that best distinguishes a spam/deliverability problem from reduced donor intent, and state what result would refute the spam hypothesis.",
      modelAnswer:
        "Look at the existing open rate — already tracked, costing nothing; a collapse in opens alongside donations implicates spam filtering. If opens are normal but donations still fell, the spam hypothesis is refuted and reduced donor intent is the cause.",
      yieldAnchors: [
        "Email donations fell this month",
        "Spam filtering would suppress opens",
        "Economic pulling-back lowers giving but not opens",
        "Open rate is already tracked",
      ],
      riskAnchors: [
        "Collapsed open rate alongside donations confirms deliverability",
        "Normal opens with lower donations refutes the spam hypothesis",
      ],
      defeatedBy: [
        "Running a comprehensive survey plus deliverability consultancy",
        "Switching providers before checking open rate",
      ],
    },
    correctAnswer:
      "Check the email open rate: if opens collapsed alongside donations, it's a deliverability/spam problem; if opens held steady but giving fell, it's donor behavior.",
    explanation:
      "The open rate is already collected and discriminates deliverability from intent for free; the follow-up commits to it and its refuting outcome. The survey-plus-consultancy is the costly dodge.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A greenhouse's seedlings are leggy and pale. Two rivals: not enough light, or too-high temperature making them stretch. Which cheap test best discriminates?",
    mcOptions: [
      { text: "The seedlings are stressed; adjust light, heat, water, and nutrients together and observe.", credit: 0.6 },
      { text: "Move half the tray under a brighter lamp at the same temperature for three days: if those firm up and green up, it was light; if they stay leggy, suspect heat.", credit: 1.0 },
      { text: "Buy environmental sensors and log every variable for a full season before changing anything.", credit: 0 },
      { text: "Something in the environment is off; check on the seedlings often.", credit: 0.3 },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest manipulation that best distinguishes the light hypothesis from the heat hypothesis, and state what result would refute the light hypothesis.",
      modelAnswer:
        "Split the tray and give half more light while holding temperature constant for three days — a cheap controlled contrast; if those seedlings firm up, light was the cause. If the brighter half stays just as leggy, the light hypothesis is refuted and excess heat becomes the suspect.",
      yieldAnchors: [
        "Seedlings are leggy and pale",
        "Low light causes stretching toward light",
        "High temperature also causes stretching",
        "Light can be varied while holding temperature",
      ],
      riskAnchors: [
        "Brighter half firming up confirms the light hypothesis",
        "Brighter half staying leggy refutes light, implicates heat",
      ],
      defeatedBy: [
        "Adjusting light, heat, water, and nutrients all at once",
        "Logging every variable for a full season before acting",
      ],
    },
    correctAnswer:
      "Move half the tray under a brighter lamp at the same temperature for three days: if those firm up and green up, it was light; if they stay leggy, suspect heat.",
    explanation:
      "A split-tray contrast holding temperature constant cheaply isolates light from heat; the follow-up commits to it and its refuting outcome. Season-long sensor logging is the expensive dodge.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A support team's ticket resolution time spiked this week. Two rivals: a surge in hard, novel tickets, or a key knowledge-base article went missing so agents are stuck. Which observation best decides?",
    mcOptions: [
      { text: "Resolution times are up; do a full audit of staffing, tooling, and content.", credit: 0 },
      { text: "Tag this week's slow tickets by topic: if they cluster on one topic whose KB article is gone, that's the cause; if they're spread across novel issues, it's a genuine difficulty surge.", credit: 1.0 },
      { text: "Add more agents next week and see if times improve.", credit: 0.6 },
      { text: "Tickets are slower for some reason; keep watching the queue.", credit: 0.3 },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that best distinguishes a missing-article problem from a difficulty surge, and state what result would refute the missing-article hypothesis.",
      modelAnswer:
        "Tag the slow tickets by topic using data you already have — a quick categorization; heavy clustering on one orphaned-article topic pins the cause. If the slow tickets are spread across many novel topics instead, the missing-article hypothesis is refuted and a real difficulty surge is the cause.",
      yieldAnchors: [
        "Resolution time spiked this week",
        "A missing KB article would slow one topic",
        "A difficulty surge would spread across topics",
        "Tickets carry topic data already",
      ],
      riskAnchors: [
        "Clustering on one orphaned-article topic confirms the missing article",
        "Slow tickets spread across novel topics refutes the missing-article hypothesis",
      ],
      defeatedBy: [
        "Doing a full audit of staffing, tooling, and content",
        "Adding agents before locating the bottleneck",
      ],
    },
    correctAnswer:
      "Tag this week's slow tickets by topic: if they cluster on one topic whose KB article is gone, that's the cause; if they're spread across novel issues, it's a genuine difficulty surge.",
    explanation:
      "Topic-tagging existing tickets is cheap and its clustering pattern discriminates the rivals; the follow-up commits to it and its refuting outcome. The full audit is the expensive non-discriminating dodge.",
  },
];

const written: HomeworkItem[] = [
  {
    itemType: "written",
    prompt:
      "A small bakery's foot traffic dropped 30% over the past month. The owner has two leading explanations: a road construction project that started a month ago is blocking the storefront, or a new bakery opened three blocks away. She could survey every past customer, hire a retail consultant, or run a month-long ad campaign. In one paragraph, propose the strongest supported model and the single cheapest observation that would most decisively distinguish the two rivals, and say what each outcome would imply.",
    writtenRubric: {
      modelAnswer:
        "The construction model is the richer commitment: the 30% drop is sharp, recent, and coincides with the road project that physically blocks her storefront, which would cut walk-up traffic regardless of any competitor. The cheap decisive test is to stand outside for one hour and count passersby versus a normal day's count: if pedestrian traffic past the door has itself collapsed, the construction is throttling foot traffic and the competitor is secondary; if just as many people walk by but fewer enter, the competitor (or the shop's offering) is the real driver. This single free count discriminates between 'fewer people reaching the door' and 'same people choosing elsewhere' faster than any survey or consultant.",
      yieldAnchors: [
        "Foot traffic dropped 30% in the past month",
        "Road construction began a month ago and blocks the storefront",
        "A new competitor opened three blocks away",
        "The drop's timing coincides with the construction start",
      ],
      riskAnchors: [
        "An hour-long passerby count far below normal confirms construction is throttling traffic",
        "Normal passerby counts with fewer entries refutes construction and implicates the competitor",
      ],
      defeatedBy: [
        "Claiming nothing can be concluded without surveying every past customer",
        "Running a month-long ad campaign before discriminating the causes",
        "Hiring a consultant as the first move",
      ],
    },
    correctAnswer:
      "The construction model is the richer commitment: the 30% drop is sharp, recent, and coincides with the road project that physically blocks her storefront, which would cut walk-up traffic regardless of any competitor. The cheap decisive test is to stand outside for one hour and count passersby versus a normal day's count: if pedestrian traffic past the door has itself collapsed, the construction is throttling foot traffic and the competitor is secondary; if just as many people walk by but fewer enter, the competitor (or the shop's offering) is the real driver. This single free count discriminates between 'fewer people reaching the door' and 'same people choosing elsewhere' faster than any survey or consultant.",
    explanation:
      "Top credit commits to the construction model and names a free passerby count whose outcome cleanly splits 'fewer people reaching the door' from 'same people choosing elsewhere.' The cautious 'survey everyone first / can't conclude anything' answer earns near-zero, and a florid plan that runs costly studies without discriminating scores low.",
  },
  {
    itemType: "written",
    prompt:
      "A research team finds that a new fertilizer plot yielded 20% more crop than the control plot. Two rivals: the fertilizer worked, or the fertilizer plot happened to get more sunlight because it sits on the field's south edge. They could repeat the whole experiment for three seasons, run a full soil-and-climate analysis, or do something cheaper. In one paragraph, propose the strongest supported model and the single cheapest observation that would most decisively separate the two rivals, and say what each outcome would imply.",
    writtenRubric: {
      modelAnswer:
        "The most committed model is that the fertilizer caused the gain, but the confound (south-edge sunlight) is a live rival because position and treatment are entangled. The cheap decisive test is to plant a small split strip: place a few fertilized and a few unfertilized rows side by side in the same south-edge sunlight for one short cycle. If the fertilized rows still outyield the unfertilized rows under identical light, the fertilizer effect holds; if both rows perform equally well in that bright strip, the sunlight confound is doing the work and the fertilizer claim is refuted. This single co-located comparison isolates the variable far more cheaply than three full seasons or a climate analysis.",
      yieldAnchors: [
        "The fertilizer plot yielded 20% more than control",
        "The fertilizer plot sits on the sunnier south edge",
        "Treatment and field position are confounded",
        "A within-strip comparison can hold sunlight constant",
      ],
      riskAnchors: [
        "Fertilized rows outyielding adjacent unfertilized rows in equal light confirms the fertilizer",
        "Equal yield between adjacent rows in the bright strip refutes the fertilizer claim",
      ],
      defeatedBy: [
        "Asserting the fertilizer worked while ignoring the sunlight confound",
        "Claiming you must repeat all three seasons before saying anything",
        "Running a full soil-and-climate analysis as the first step",
      ],
    },
    correctAnswer:
      "The most committed model is that the fertilizer caused the gain, but the confound (south-edge sunlight) is a live rival because position and treatment are entangled. The cheap decisive test is to plant a small split strip: place a few fertilized and a few unfertilized rows side by side in the same south-edge sunlight for one short cycle. If the fertilized rows still outyield the unfertilized rows under identical light, the fertilizer effect holds; if both rows perform equally well in that bright strip, the sunlight confound is doing the work and the fertilizer claim is refuted. This single co-located comparison isolates the variable far more cheaply than three full seasons or a climate analysis.",
    explanation:
      "Top credit commits to the fertilizer model while naming a cheap co-located strip that holds sunlight constant and would refute the claim if both rows match. 'We can't conclude anything until we repeat three seasons' is the near-zero dodge; a long unfocused study that never isolates the confound scores low.",
  },
  {
    itemType: "written",
    prompt:
      "An app's crash reports spiked after a release that shipped two changes at once: a new analytics SDK and a rewritten image loader. Engineers could roll back the whole release, add extensive logging everywhere, or test something targeted. In one paragraph, propose the strongest supported model of which change is responsible and the single cheapest observation that would most decisively pin it down, and say what each outcome would imply.",
    writtenRubric: {
      modelAnswer:
        "The strongest model is that one of the two shipped changes caused the crash spike, and the crash stack traces are the cheap decisive evidence already in hand. Read a sample of the new crash reports and see which component appears at the top of the stack: if they consistently fault inside the image-loader code, the rewritten loader is the cause; if they fault inside the analytics SDK calls, the SDK is the cause. If the traces are ambiguous, ship a one-line feature flag that disables just the analytics SDK to one cohort — crashes vanishing for that cohort confirms the SDK, crashes persisting refutes it and implicates the loader. This reuses existing crash data and a single flag rather than a full rollback or blanket logging.",
      yieldAnchors: [
        "Crash reports spiked after the release",
        "The release shipped two changes at once",
        "Crash reports include stack traces",
        "A feature flag can disable one change in isolation",
      ],
      riskAnchors: [
        "Stack traces faulting in the image loader confirms the loader",
        "Crashes vanishing when the SDK is flag-disabled confirms the SDK",
        "Crashes persisting with the SDK disabled refutes the SDK hypothesis",
      ],
      defeatedBy: [
        "Rolling back the whole release without isolating the culprit",
        "Adding blanket logging everywhere before reading existing traces",
        "Claiming the cause is unknowable because two things changed",
      ],
    },
    correctAnswer:
      "The strongest model is that one of the two shipped changes caused the crash spike, and the crash stack traces are the cheap decisive evidence already in hand. Read a sample of the new crash reports and see which component appears at the top of the stack: if they consistently fault inside the image-loader code, the rewritten loader is the cause; if they fault inside the analytics SDK calls, the SDK is the cause. If the traces are ambiguous, ship a one-line feature flag that disables just the analytics SDK to one cohort — crashes vanishing for that cohort confirms the SDK, crashes persisting refutes it and implicates the loader. This reuses existing crash data and a single flag rather than a full rollback or blanket logging.",
    explanation:
      "Top credit commits to reading the already-collected stack traces and, if needed, a single isolating feature flag whose outcome pins the culprit. 'Two things changed so we can't know' is the near-zero dodge, and rolling back everything plus blanket logging is the expensive non-discriminating move that scores low.",
  },
  {
    itemType: "written",
    prompt:
      "A person sleeps badly and has two leading suspects: the late-afternoon coffee they recently started drinking, or the new mattress they bought the same week. They could see a sleep specialist, buy a sleep-tracking ring and log for months, or try something cheaper first. In one paragraph, propose the strongest supported model and the single cheapest observation that would most decisively separate the two rivals, and say what each outcome would imply.",
    writtenRubric: {
      modelAnswer:
        "The most committed model is that one of the two simultaneous changes — the afternoon coffee or the new mattress — is driving the poor sleep, and the cheapest decisive test is to vary just one of them for a few nights while holding the other fixed. Skip the afternoon coffee for three nights but keep sleeping on the new mattress: if sleep clearly improves, the coffee was the cause; if sleep stays just as poor, the coffee hypothesis is refuted and the mattress becomes the prime suspect (testable next by a few nights on the old bed). This single-variable swap costs nothing and discriminates between the rivals far faster than a specialist visit or months of ring data.",
      yieldAnchors: [
        "Sleep worsened recently",
        "Afternoon coffee was started the same week",
        "A new mattress was bought the same week",
        "Coffee and mattress can be varied one at a time",
      ],
      riskAnchors: [
        "Sleep improving after three caffeine-free nights confirms the coffee",
        "Sleep staying poor without afternoon coffee refutes the coffee hypothesis",
      ],
      defeatedBy: [
        "Asserting a cause while changing both coffee and mattress at once",
        "Claiming nothing can be known without months of tracker data",
        "Booking a specialist before trying the free single-variable swap",
      ],
    },
    correctAnswer:
      "The most committed model is that one of the two simultaneous changes — the afternoon coffee or the new mattress — is driving the poor sleep, and the cheapest decisive test is to vary just one of them for a few nights while holding the other fixed. Skip the afternoon coffee for three nights but keep sleeping on the new mattress: if sleep clearly improves, the coffee was the cause; if sleep stays just as poor, the coffee hypothesis is refuted and the mattress becomes the prime suspect (testable next by a few nights on the old bed). This single-variable swap costs nothing and discriminates between the rivals far faster than a specialist visit or months of ring data.",
    explanation:
      "Top credit commits to a free single-variable swap whose outcome separates coffee from mattress and would refute the coffee model if sleep stays poor. 'See a specialist / track for months before concluding' is the near-zero dodge, and changing both at once binds no clean inference and scores low.",
  },
  {
    itemType: "written",
    prompt:
      "A manager notices that one sales rep closes far more deals than peers. Two rivals: the rep is genuinely more skilled, or the rep was simply assigned the warmest, highest-quality leads. The manager could run a full performance review, shadow the rep for a quarter, or do something cheaper. In one paragraph, propose the strongest supported model and the single cheapest observation that would most decisively distinguish skill from lead quality, and say what each outcome would imply.",
    writtenRubric: {
      modelAnswer:
        "The skill model is the richer claim, but lead quality is a live confound because the rep's territory may simply contain better prospects. The cheap decisive test is to compare each rep's close rate on leads of equal, already-scored quality — the CRM almost certainly tags lead source and score, so this needs no new data. If the star rep closes a higher fraction of equally-warm leads than peers do, skill is real; if their close rate matches peers once lead quality is held constant, the skill claim is refuted and the assignment of warm leads explains the gap. This within-tier comparison isolates the variable far more cheaply than a quarter of shadowing or a full review.",
      yieldAnchors: [
        "One rep closes far more deals than peers",
        "The rep may have been assigned warmer leads",
        "Lead quality is a confound for raw close counts",
        "The CRM already scores and tags lead quality",
      ],
      riskAnchors: [
        "Higher close rate on equally-warm leads confirms genuine skill",
        "Matching close rates once lead quality is held constant refutes the skill claim",
      ],
      defeatedBy: [
        "Crediting the rep's skill from raw deal counts while ignoring lead quality",
        "Claiming nothing can be concluded without a quarter of shadowing",
        "Launching a full performance review before the within-tier comparison",
      ],
    },
    correctAnswer:
      "The skill model is the richer claim, but lead quality is a live confound because the rep's territory may simply contain better prospects. The cheap decisive test is to compare each rep's close rate on leads of equal, already-scored quality — the CRM almost certainly tags lead source and score, so this needs no new data. If the star rep closes a higher fraction of equally-warm leads than peers do, skill is real; if their close rate matches peers once lead quality is held constant, the skill claim is refuted and the assignment of warm leads explains the gap. This within-tier comparison isolates the variable far more cheaply than a quarter of shadowing or a full review.",
    explanation:
      "Top credit commits to a within-quality close-rate comparison from existing CRM data whose outcome separates skill from lead assignment and could refute the skill model. 'Can't say without shadowing for a quarter' is the near-zero dodge, and a sprawling review that never holds lead quality constant scores low.",
  },
];

export const section: SectionContent = {
  slug: "cheap-decisive-test",
  title: "The Cheap Decisive Test",
  weekNumber: 1,
  blurb:
    "Don't drown in data — find the one cheap observation whose outcome would most cleanly split your leading rival explanations apart.",
  lectureTitle:
    "1.7 The Cheap Decisive Test: find the cheapest observation that most discriminates",
  body: `# The Cheap Decisive Test

You rarely lack things you *could* measure. You lack the judgment to pick the **one** measurement worth making first. Constructive Critical Reasoning rewards committing to the strongest model your data supports — and the fastest way to earn that commitment is the **cheap decisive test**: among all possible next observations, the single one that is cheapest to make yet most powerfully discriminates between your leading rival explanations.

## Information per unit cost

Every candidate observation has two properties: how much it **costs** (time, money, effort) and how much it **discriminates** (how differently the rival models predict its outcome). A great test is high on discrimination and low on cost. A useless-but-expensive study is the opposite. CCR asks you to maximize information *per unit cost*, not to maximize information in the abstract. The barista's flower pin doesn't need a six-week study; it needs one low-mood day with the pin on.

## Make the rivals disagree

A test only discriminates if the rival models predict **different** outcomes for it. Before choosing, write down what each hypothesis *expects* you to see. If both rivals predict the same result, the observation — however expensive — tells you nothing. The whole art is finding the question where "underwatered" and "root rot," or "the form confuses users" and "the payment API times out," part ways. Then the cheapest such question wins.

## Name what each outcome would imply

A cheap decisive test is only complete when you state, **in advance**, what each possible result means. "Stick a finger in the soil" is a test; "dry means underwatered, soggy means rot" is the *decisive* part. Committing to the interpretation before you look is what protects you from rationalizing whatever you find. Top credit always pairs the test with both branches of its outcome.

## The zero-credit dodges

Three tempting failures earn nothing. The first is **"gather as much data as possible"** — comprehensive-sounding but cowardly, since it refuses to prioritize. The second is the **expensive non-discriminating study**: a full audit, a lab panel, a month-long trial that costs a fortune and still doesn't make the rivals disagree any faster than a one-minute check would. The third is **refusing to choose a test at all** ("we should just keep monitoring"). All three dodge the actual job: pick the one observation that pays.

## Single-variable moves

The cheapest decisive tests usually change exactly **one** thing. Revert just the config and re-run once. Skip the afternoon coffee but keep the new mattress. Boot into safe mode for an hour. Each isolates a single rival because everything else is held constant — which is precisely why one trial can settle what a sprawling everything-at-once study cannot.

## In the real world

A web team's checkout conversions crater. Two live rivals: the redesigned one-page form confuses users, or a payment API is silently timing out. The "thorough" instinct is to launch a UX audit *and* a fresh A/B test *and* a customer survey — weeks of work that delays any answer. The cheap decisive test: pull the last 200 checkout server logs, a five-minute query on data you already have. State the branches first — if most failed checkouts ended in a payment-API timeout, it's the API; if checkouts complete cleanly but users abandon the form, it's the UX. One look discriminates between the two models that all those expensive studies were circling. That is the move CCR rewards: not the most data, but the cheapest observation that most decisively tells your rivals apart.`,
  homework: {
    mcq,
    hybrid,
    written,
  },
};
