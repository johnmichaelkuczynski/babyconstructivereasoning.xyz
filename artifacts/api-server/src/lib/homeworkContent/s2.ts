import type {
  SectionContent,
  HomeworkItem,
  McOption,
  WrittenRubric,
} from "./types";

const body = `# Model Selection by Explanatory Yield

You rarely face a single explanation. You face a *lineup* of them, each "consistent with" the facts. The amateur move is to stop there — "well, it could be any of these." Constructive Critical Reasoning asks a sharper question: **which model has the highest yield?** Which one *binds* the most observations at once, leaving the fewest loose ends?

## Yield is the prize, not consistency

Almost any half-decent story is *consistent* with the data — consistency is cheap. A horoscope is consistent with your week. What separates a strong model from a weak one is **yield**: the share of the listed observations it actually accounts for. Five facts on the table, a model that explains four of them beats a model that explains two, even if both are "possible." Picking the higher-yield model is not arrogance; it is doing your job.

## Unexplained observations are a cost

Every observation a model leaves dangling is a debt. When someone says "sure, but that one fact is probably just unrelated," they are quietly paying that debt with hand-waving. Sometimes a fact really is noise — but you have to *argue* it, not assume it. Default suspicion: a model that needs three separate coincidences to survive is losing to a model that needs none.

## The "separate explanations for everything" dodge

The signature failure here is fragmentation: "each observation could have its own cause, so we can't prefer the big explanation." This *sounds* careful. It is actually the opposite — it refuses to do the comparative work and hides behind a fog of maybes. CCR scores it near zero. A theory that requires a fresh, unrelated cause for every single data point has explained *nothing*; it has just renamed the data.

## How to rank competing models

1. **Count the binds.** For each candidate, tally which observations it genuinely explains.
2. **Count the orphans.** Tally what it leaves unexplained or must wave away.
3. **Prefer the highest net yield** — most bound, fewest orphans.
4. **Expose it to a test.** The winning model should make a prediction that, if it fails, knocks the model out. Commit to that test.

The richest, most-falsifiable, most-committed model wins. A timid "maybe there's a link" earns a little; a confident overreach the data defeats earns nothing.

## In the real world

A regional manager sees five stores. The three with declining sales all (a) switched to a new supplier in March, (b) report longer restock delays, (c) have rising customer complaints about empty shelves, while (d) the two healthy stores kept the old supplier and (e) show normal stock levels. One analyst shrugs: "Each store has its own issues — bad luck, bad weather, bad staff." That fragmenting story binds nothing. The high-yield model is plain: **the March supplier switch caused restock delays, which emptied shelves, which drove complaints and lost sales** — it binds (a) through (e) with one mechanism. And it is testable: route one struggling store back to the old supplier; if delays, empty shelves, and complaints don't recover within a month, the model is wrong. That commitment — one explanation for the most data, plus a clean test — is the whole game.`;

const mcq: HomeworkItem[] = [
  {
    itemType: "mc",
    prompt:
      "A teacher notices: the same six students who fail her Friday quizzes also (1) arrive late on Fridays, (2) skip the Thursday-night review chat, and (3) report sleeping under five hours Thursday. The other students do none of these. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Each of those three facts probably has its own unrelated cause, so we shouldn't single out one story.",
        credit: 0,
      },
      {
        text: "Thursday sleep loss is the common driver — it produces the lateness, the skipped review, and the failures together; test it by helping those six protect Thursday sleep for two weeks and see if all three patterns lift.",
        credit: 1.0,
      },
      {
        text: "Lack of Thursday review likely explains the failing quizzes, since the review covers quiz material.",
        credit: 0.6,
      },
      {
        text: "There may be some Friday-related issue worth keeping an eye on.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "Thursday sleep loss is the common driver — it produces the lateness, the skipped review, and the failures together; test it by helping those six protect Thursday sleep for two weeks and see if all three patterns lift.",
    explanation:
      "The sleep-loss model binds all three observations with one mechanism and names a clean test, so it has the highest yield. The 'each fact has its own cause' option fragments the data and explains nothing — the zero-credit dodge.",
  },
  {
    itemType: "mc",
    prompt:
      "A gardener finds: tomatoes on the east bed are stunted, their leaves yellow at the edges, the soil there stays soggy after rain, and that bed sits at the bottom of a slope. The west bed (top of slope) thrives. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Poor drainage at the slope's base waterlogs the east bed, and that single cause explains the sogginess, the yellowing, and the stunting together; test it by digging a drainage channel and checking whether the east bed recovers.",
        credit: 1.0,
      },
      {
        text: "The yellow leaves suggest a nutrient problem in the east bed that we could address with fertilizer.",
        credit: 0.6,
      },
      {
        text: "Something about the east bed seems less favorable for tomatoes.",
        credit: 0.3,
      },
      {
        text: "Stunting, yellowing, and sogginess could each be separate quirks, so no single explanation is warranted.",
        credit: 0,
      },
    ],
    correctAnswer:
      "Poor drainage at the slope's base waterlogs the east bed, and that single cause explains the sogginess, the yellowing, and the stunting together; test it by digging a drainage channel and checking whether the east bed recovers.",
    explanation:
      "Waterlogging from poor drainage ties the position, the sogginess, the yellowing, and the stunting into one chain and offers a decisive test — highest yield. Treating each symptom as a separate quirk binds nothing and is the dodge.",
  },
  {
    itemType: "mc",
    prompt:
      "An IT lead sees: app crashes spiked Monday, all on devices that auto-updated over the weekend, all during video calls, and all freed memory only after a restart. Non-updated devices never crashed. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Users are probably just being careless during calls in different ways.",
        credit: 0,
      },
      {
        text: "Video calls put heavy load on the app, which sometimes causes crashes.",
        credit: 0.6,
      },
      {
        text: "The weekend update introduced a memory leak that surfaces under the load of video calls and clears on restart — that one fault binds every observation; test it by rolling the update back on a few devices and watching whether call crashes stop.",
        credit: 1.0,
      },
      {
        text: "There could be a recent change affecting some machines.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "The weekend update introduced a memory leak that surfaces under the load of video calls and clears on restart — that one fault binds every observation; test it by rolling the update back on a few devices and watching whether call crashes stop.",
    explanation:
      "The memory-leak-from-update model explains the timing, the updated-only pattern, the call trigger, and the restart fix at once, and the rollback is a falsifiable test — top yield. 'Users are careless' ignores the update pattern entirely.",
  },
  {
    itemType: "mc",
    prompt:
      "A coach reviews a slumping striker: his goals dropped after a new boot brand, he reports a sore heel, he's been shooting wide-right, and video shows him planting awkwardly on that foot. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Slumps happen; there's nothing definite to read into a few separate observations.",
        credit: 0,
      },
      {
        text: "The new boots are causing heel pain that distorts his plant foot, pulling shots wide-right — one cause for all four facts; test it by returning him to the old boots and checking whether heel pain and accuracy recover.",
        credit: 1.0,
      },
      {
        text: "His sore heel is likely throwing off his shooting accuracy.",
        credit: 0.6,
      },
      {
        text: "His form may be a little off lately.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "The new boots are causing heel pain that distorts his plant foot, pulling shots wide-right — one cause for all four facts; test it by returning him to the old boots and checking whether heel pain and accuracy recover.",
    explanation:
      "The boots-to-heel-to-plant-to-aim chain binds all four observations and is testable by swapping boots — highest yield. 'Slumps happen' refuses to prefer any model and earns zero.",
  },
  {
    itemType: "mc",
    prompt:
      "A restaurant owner notices: revenue fell this quarter, online reviews mention slow service, the kitchen lost two cooks in the same period, and ticket times in the POS data doubled. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Revenue, reviews, staffing, and ticket times are different metrics that probably moved for their own reasons.",
        credit: 0,
      },
      {
        text: "Losing two cooks is hurting the kitchen's throughput somewhat.",
        credit: 0.6,
      },
      {
        text: "Business feels a bit off this quarter.",
        credit: 0.3,
      },
      {
        text: "The two cook departures doubled ticket times, which produced slow-service complaints and the revenue drop — one staffing shortfall binds all four; test it by fully restaffing the line and seeing whether ticket times, reviews, and revenue rebound.",
        credit: 1.0,
      },
    ],
    correctAnswer:
      "The two cook departures doubled ticket times, which produced slow-service complaints and the revenue drop — one staffing shortfall binds all four; test it by fully restaffing the line and seeing whether ticket times, reviews, and revenue rebound.",
    explanation:
      "The staffing-shortfall model accounts for ticket times, reviews, and revenue together and offers a restaffing test — top yield. Calling them unrelated metrics is the fragmenting dodge that binds nothing.",
  },
  {
    itemType: "mc",
    prompt:
      "A nurse charts a patient: nausea each morning, fatigue, dizziness on standing, and these began the week a new blood-pressure pill was added. Symptoms ease by afternoon. Which conclusion best follows?",
    mcOptions: [
      {
        text: "The new pill is overshooting and dropping morning blood pressure too far, causing the dizziness, nausea, and fatigue that fade as the dose wears off — one cause for all of it; test it by lowering the morning dose and rechecking symptoms and standing BP.",
        credit: 1.0,
      },
      {
        text: "The dizziness on standing points to low blood pressure that may need attention.",
        credit: 0.6,
      },
      {
        text: "The patient isn't feeling well in the mornings lately.",
        credit: 0.3,
      },
      {
        text: "Nausea, fatigue, and dizziness are common and likely have separate everyday causes.",
        credit: 0,
      },
    ],
    correctAnswer:
      "The new pill is overshooting and dropping morning blood pressure too far, causing the dizziness, nausea, and fatigue that fade as the dose wears off — one cause for all of it; test it by lowering the morning dose and rechecking symptoms and standing BP.",
    explanation:
      "The over-dosing model binds the timing, the symptom cluster, and the afternoon relief, with a dose-adjustment test — highest yield. 'These symptoms are common with separate causes' ignores the pill timing and is the dodge.",
  },
  {
    itemType: "mc",
    prompt:
      "A product manager sees: signups dropped 30% Tuesday, the signup page load time tripled that day, a new tracking script was deployed Tuesday morning, and bounce rate on that page spiked. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Web traffic naturally fluctuates, so we shouldn't pin this on any one thing.",
        credit: 0,
      },
      {
        text: "Tuesday's tracking script slowed the page load, which spiked bounces and cut signups — one change binds the timing, load time, bounce, and signup drop; test it by removing the script and watching whether load time and signups recover.",
        credit: 1.0,
      },
      {
        text: "Slow page loads tend to increase bounce rates, which likely cost some signups.",
        credit: 0.6,
      },
      {
        text: "Tuesday seems to have been an off day for the page.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "Tuesday's tracking script slowed the page load, which spiked bounces and cut signups — one change binds the timing, load time, bounce, and signup drop; test it by removing the script and watching whether load time and signups recover.",
    explanation:
      "The script-slowed-the-page model ties the deploy timing, load time, bounce, and signups together with a removable-and-testable cause — top yield. 'Traffic fluctuates' refuses to prefer the high-yield model and scores zero.",
  },
  {
    itemType: "mc",
    prompt:
      "A homeowner observes: the upstairs is cold, the furnace runs constantly, the gas bill jumped, and a window in the upstairs hallway won't fully close. Downstairs stays warm. Which conclusion best follows?",
    mcOptions: [
      {
        text: "The gas bill probably rose for billing reasons unrelated to the cold rooms.",
        credit: 0,
      },
      {
        text: "The stuck upstairs window is leaking heat, making the furnace run nonstop to chase the upstairs temperature and driving the gas bill up — one leak binds all four facts; test it by sealing the window and checking whether runtime, warmth, and the bill normalize.",
        credit: 1.0,
      },
      {
        text: "The furnace running constantly is likely what's inflating the gas bill.",
        credit: 0.6,
      },
      {
        text: "The house seems harder to heat than usual.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "The stuck upstairs window is leaking heat, making the furnace run nonstop to chase the upstairs temperature and driving the gas bill up — one leak binds all four facts; test it by sealing the window and checking whether runtime, warmth, and the bill normalize.",
    explanation:
      "The window-leak model explains the localized cold, the constant runtime, and the bill together and is testable by sealing it — highest yield. Detaching the gas bill as a billing fluke ignores the whole pattern and is the dodge.",
  },
  {
    itemType: "mc",
    prompt:
      "A sales director notes: the northeast region missed quota, its reps logged the fewest client visits, a key reps' company cars were in the shop for weeks, and travel-expense claims there fell sharply. Other regions hit quota. Which conclusion best follows?",
    mcOptions: [
      {
        text: "The car downtime cut the reps' client visits and travel spend, which is why the northeast missed quota — one disruption binds all the facts; test it by providing rental cars and seeing whether visits and sales rebound.",
        credit: 1.0,
      },
      {
        text: "Fewer client visits in the northeast likely contributed to the missed quota.",
        credit: 0.6,
      },
      {
        text: "The northeast underperformed for reasons that are hard to say.",
        credit: 0.3,
      },
      {
        text: "Quota misses, low visits, car repairs, and low expenses are separate facts best not lumped together.",
        credit: 0,
      },
    ],
    correctAnswer:
      "The car downtime cut the reps' client visits and travel spend, which is why the northeast missed quota — one disruption binds all the facts; test it by providing rental cars and seeing whether visits and sales rebound.",
    explanation:
      "The car-downtime model binds the missed quota, low visits, and low expenses with one cause and offers a rental-car test — top yield. Refusing to lump the facts together is the fragmenting dodge.",
  },
  {
    itemType: "mc",
    prompt:
      "A biologist finds: a pond's fish are dying, algae have bloomed thickly, oxygen readings are low at night, and a fertilizer plant upstream began discharging last month. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Fish die for many reasons; we can't favor one story over the others.",
        credit: 0,
      },
      {
        text: "Low nighttime oxygen is stressing the fish and likely behind the die-off.",
        credit: 0.6,
      },
      {
        text: "Something has changed in the pond recently.",
        credit: 0.3,
      },
      {
        text: "Fertilizer runoff fed an algae bloom that crashes oxygen at night and suffocates the fish — one nutrient source binds the bloom, the oxygen, the deaths, and the timing; test it by measuring nitrate levels and checking whether they fall (and fish recover) if discharge stops.",
        credit: 1.0,
      },
    ],
    correctAnswer:
      "Fertilizer runoff fed an algae bloom that crashes oxygen at night and suffocates the fish — one nutrient source binds the bloom, the oxygen, the deaths, and the timing; test it by measuring nitrate levels and checking whether they fall (and fish recover) if discharge stops.",
    explanation:
      "The nutrient-runoff model chains the discharge, bloom, oxygen crash, and die-off into one mechanism with a nitrate test — highest yield. 'Fish die for many reasons' refuses to commit and earns zero.",
  },
  {
    itemType: "mc",
    prompt:
      "A school principal sees: lunchroom waste doubled, complaints about taste rose, the cafeteria switched food vendors in September, and reimbursable-meal counts fell. Which conclusion best follows?",
    mcOptions: [
      {
        text: "The September vendor switch lowered food quality, which raised waste and taste complaints and cut meals taken — one change binds all four; test it by piloting the old vendor for a week and tracking waste, complaints, and meal counts.",
        credit: 1.0,
      },
      {
        text: "Rising taste complaints probably explain why more food is being thrown away.",
        credit: 0.6,
      },
      {
        text: "Students seem less happy with lunch this year.",
        credit: 0.3,
      },
      {
        text: "Waste, complaints, and meal counts each move for their own reasons in any given year.",
        credit: 0,
      },
    ],
    correctAnswer:
      "The September vendor switch lowered food quality, which raised waste and taste complaints and cut meals taken — one change binds all four; test it by piloting the old vendor for a week and tracking waste, complaints, and meal counts.",
    explanation:
      "The vendor-switch model accounts for the timing, waste, complaints, and meal counts at once and offers a clean pilot test — top yield. Treating each metric as independently drifting is the dodge that explains nothing.",
  },
  {
    itemType: "mc",
    prompt:
      "A commuter notices: her car pulls right, the right front tire wears on its outer edge, the steering wheel vibrates above 50 mph, and it all started after hitting a deep pothole. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Cars develop quirks; these could be three unrelated issues.",
        credit: 0,
      },
      {
        text: "The pothole knocked the front wheel out of alignment, which causes the pull, the edge wear, and the vibration — one event binds all of it; test it with an alignment check and see whether all three symptoms resolve after correction.",
        credit: 1.0,
      },
      {
        text: "The uneven tire wear suggests an alignment problem worth checking.",
        credit: 0.6,
      },
      {
        text: "The car isn't driving quite right since the pothole.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "The pothole knocked the front wheel out of alignment, which causes the pull, the edge wear, and the vibration — one event binds all of it; test it with an alignment check and see whether all three symptoms resolve after correction.",
    explanation:
      "The misalignment model binds the pull, edge wear, vibration, and pothole timing with one cause and a diagnostic test — highest yield. 'Three unrelated quirks' fragments the data and scores zero.",
  },
  {
    itemType: "mc",
    prompt:
      "A bakery owner sees: morning croissants sell out fast, afternoon batches sit unsold, the afternoon oven runs hotter per the new thermostat, and afternoon croissants look darker. Which conclusion best follows?",
    mcOptions: [
      {
        text: "The faulty thermostat overheats the afternoon oven, over-browning those croissants so customers reject them — one cause binds the hotter oven, the darker color, and the unsold batches; test it by recalibrating the thermostat and seeing whether afternoon color and sales match the morning's.",
        credit: 1.0,
      },
      {
        text: "The darker afternoon croissants are probably being passed over by customers.",
        credit: 0.6,
      },
      {
        text: "Afternoons just seem slower for croissant sales.",
        credit: 0.3,
      },
      {
        text: "Sales timing, oven temperature, and color are separate things that needn't share a cause.",
        credit: 0,
      },
    ],
    correctAnswer:
      "The faulty thermostat overheats the afternoon oven, over-browning those croissants so customers reject them — one cause binds the hotter oven, the darker color, and the unsold batches; test it by recalibrating the thermostat and seeing whether afternoon color and sales match the morning's.",
    explanation:
      "The thermostat model ties the hot oven, dark color, and unsold batches into one chain with a recalibration test — top yield. Insisting the facts needn't share a cause is the fragmenting dodge.",
  },
  {
    itemType: "mc",
    prompt:
      "A manager reviews a remote team: messages go unanswered for hours, deadlines slip, the team spans three new time zones after a reorg, and overlap hours shrank to one per day. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Remote teams have ups and downs; no single explanation stands out.",
        credit: 0,
      },
      {
        text: "Slow message replies are probably what's causing deadlines to slip.",
        credit: 0.6,
      },
      {
        text: "Coordination feels harder since the reorg.",
        credit: 0.3,
      },
      {
        text: "The reorg's time-zone spread shrank overlap to one hour, which slows replies and slips deadlines — one structural change binds all of it; test it by mandating a shared core overlap window and tracking reply times and on-time delivery.",
        credit: 1.0,
      },
    ],
    correctAnswer:
      "The reorg's time-zone spread shrank overlap to one hour, which slows replies and slips deadlines — one structural change binds all of it; test it by mandating a shared core overlap window and tracking reply times and on-time delivery.",
    explanation:
      "The overlap-shrinkage model explains the slow replies, slipped deadlines, and reorg timing together and proposes a core-hours test — highest yield. 'Remote teams have ups and downs' refuses to prefer any model and earns zero.",
  },
  {
    itemType: "mc",
    prompt:
      "A vet sees a dog: itchy skin, ear infections, paw-licking, and symptoms that worsen each spring and ease in winter. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Itching, ear trouble, and paw-licking are common and probably have separate causes.",
        credit: 0,
      },
      {
        text: "A seasonal (likely pollen) allergy is driving the itch, ears, and paw-licking together, which is why they flare in spring — one cause binds all four; test it with a spring antihistamine trial or allergen panel and see whether the cluster subsides.",
        credit: 1.0,
      },
      {
        text: "The seasonal pattern suggests an environmental trigger worth investigating.",
        credit: 0.6,
      },
      {
        text: "The dog has some recurring skin discomfort.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "A seasonal (likely pollen) allergy is driving the itch, ears, and paw-licking together, which is why they flare in spring — one cause binds all four; test it with a spring antihistamine trial or allergen panel and see whether the cluster subsides.",
    explanation:
      "The seasonal-allergy model binds the itch, ear infections, paw-licking, and spring timing with one cause and a treatment test — top yield. Splitting the symptoms into separate common causes is the dodge.",
  },
];

const hybrid: HomeworkItem[] = [
  {
    itemType: "hybrid",
    prompt:
      "A startup sees: churn rose this month, support tickets about a confusing new checkout flow spiked, the checkout was redesigned three weeks ago, and cart-abandonment jumped. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Churn, tickets, and abandonment are different signals that probably moved for their own reasons.",
        credit: 0,
      },
      {
        text: "The new checkout redesign confused users, spiking tickets, abandonment, and churn — one change binds all of it; test it by reverting the checkout for a cohort and comparing churn and abandonment.",
        credit: 1.0,
      },
      {
        text: "The confusing checkout is likely behind the rise in cart abandonment.",
        credit: 0.6,
      },
      {
        text: "Something about the product is bothering users lately.",
        credit: 0.3,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish the redesign model from a 'general dissatisfaction' rival, and say what result would refute the redesign model.",
      modelAnswer:
        "Cheapest distinguishing check: compare churn and abandonment between users who went through the new checkout and users who never reached it this month. If churn and abandonment rose just as much among users who never touched the new checkout, the redesign model is refuted.",
      yieldAnchors: [
        "Churn rose this month",
        "Support tickets about the confusing checkout spiked",
        "The checkout was redesigned three weeks ago",
        "Cart abandonment jumped",
      ],
      riskAnchors: [
        "Reverting checkout for a cohort should lower their churn and abandonment",
        "Users who never reached checkout should show less churn increase",
      ],
      defeatedBy: [
        "Churn rose equally among users who never saw the new checkout",
        "Abandonment was already climbing before the redesign shipped",
      ],
    },
    correctAnswer:
      "The new checkout redesign confused users, spiking tickets, abandonment, and churn — one change binds all of it; test it by reverting the checkout for a cohort and comparing churn and abandonment.",
    explanation:
      "The redesign model binds the tickets, abandonment, churn, and timing with one cause and a revert test, and the follow-up names a cheap decisive comparison — full credit. Calling the signals independent is the zero-credit dodge.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A farmer reports: one field's corn is shorter, its leaves are pale, that field was planted with seed from a new bag, and germination there was patchy. The neighboring field (old seed) is uniform and green. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Short, pale, patchy corn could each stem from separate field quirks.",
        credit: 0,
      },
      {
        text: "The pale leaves suggest a nutrient deficiency in that field.",
        credit: 0.6,
      },
      {
        text: "That field is underperforming this season.",
        credit: 0.3,
      },
      {
        text: "The new seed lot was poor — explaining the patchy germination, short stunted plants, and pale leaves at once; test it by sowing the same new lot in a control strip of the healthy field and seeing if the problems reappear.",
        credit: 1.0,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish the bad-seed model from a soil-deficiency rival, and say what result would refute the bad-seed model.",
      modelAnswer:
        "Cheapest distinguishing check: plant the new seed lot in a strip of the healthy field's soil and plant old seed in a strip of the troubled field. If the new seed thrives in the troubled field's soil while old seed there is fine, the bad-seed model is refuted and soil is implicated.",
      yieldAnchors: [
        "The field's corn is shorter",
        "Its leaves are pale",
        "It was planted with seed from a new bag",
        "Germination there was patchy",
      ],
      riskAnchors: [
        "New seed in the healthy field's soil should reproduce the problems",
        "Old seed in the troubled field's soil should grow normally",
      ],
      defeatedBy: [
        "New seed grows fine in the healthy field's soil",
        "Old seed in the troubled field is also stunted and pale",
      ],
    },
    correctAnswer:
      "The new seed lot was poor — explaining the patchy germination, short stunted plants, and pale leaves at once; test it by sowing the same new lot in a control strip of the healthy field and seeing if the problems reappear.",
    explanation:
      "The bad-seed model binds germination, height, and color with one cause and a control-strip test, and the swap follow-up cleanly separates it from soil — full credit. Splitting the symptoms into field quirks is the dodge.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A gym owner sees: evening classes are empty, members complain about parking, a neighboring lot closed for construction last month, and daytime classes (free street parking) stay full. Which conclusion best follows?",
    mcOptions: [
      {
        text: "The lot closure removed evening parking, which is why evening classes emptied while daytime stays full — one cause binds all of it; test it by validating parking at a nearby garage for evenings and tracking attendance.",
        credit: 1.0,
      },
      {
        text: "Parking complaints are probably discouraging some evening attendance.",
        credit: 0.6,
      },
      {
        text: "Evening attendance is down for now.",
        credit: 0.3,
      },
      {
        text: "Class times and parking are separate concerns that may not be linked.",
        credit: 0,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish the parking model from a 'bad evening schedule' rival, and say what result would refute the parking model.",
      modelAnswer:
        "Cheapest distinguishing check: offer free validated garage parking for a week of evening classes and watch attendance. If evening attendance stays flat despite easy parking, the parking model is refuted and the schedule or instructors are implicated.",
      yieldAnchors: [
        "Evening classes are empty",
        "Members complain about parking",
        "The neighboring lot closed for construction last month",
        "Daytime classes with free street parking stay full",
      ],
      riskAnchors: [
        "Validated evening garage parking should restore attendance",
        "Daytime full / evening empty split should track parking availability",
      ],
      defeatedBy: [
        "Evening attendance stays empty even with free garage parking",
        "Evening classes were already emptying before the lot closed",
      ],
    },
    correctAnswer:
      "The lot closure removed evening parking, which is why evening classes emptied while daytime stays full — one cause binds all of it; test it by validating parking at a nearby garage for evenings and tracking attendance.",
    explanation:
      "The parking model binds the empty evenings, complaints, closure timing, and full daytimes with one cause and a validation test, and the follow-up isolates it cleanly — full credit. 'Separate concerns' refuses the high-yield model and scores zero.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A clinic notes: a patient's blood sugar swings wildly, she recently started shift work, her meal times are now erratic, and her readings are worst after night shifts. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Blood sugar varies; we can't really single out one cause among many.",
        credit: 0,
      },
      {
        text: "Shift work scrambled her meal timing and sleep, destabilizing her blood sugar — worst after night shifts; one cause binds it all. Test it by stabilizing meal times across a fixed-schedule stretch and tracking the swings.",
        credit: 1.0,
      },
      {
        text: "Erratic meal times are likely contributing to the unstable readings.",
        credit: 0.6,
      },
      {
        text: "Her glucose control seems off recently.",
        credit: 0.3,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish the shift-work model from a 'medication dosing' rival, and say what result would refute the shift-work model.",
      modelAnswer:
        "Cheapest distinguishing check: keep medication unchanged but regularize meal and sleep timing for two weeks and watch the swings. If swings persist unchanged on a stable schedule with the same meds, the shift-work model is refuted and dosing should be reviewed.",
      yieldAnchors: [
        "Blood sugar swings wildly",
        "She recently started shift work",
        "Meal times are now erratic",
        "Readings are worst after night shifts",
      ],
      riskAnchors: [
        "Stabilizing meal/sleep timing should reduce the swings",
        "Worst-after-night-shift pattern should fade on a fixed schedule",
      ],
      defeatedBy: [
        "Swings persist unchanged once schedule is regularized",
        "Readings were already unstable before shift work began",
      ],
    },
    correctAnswer:
      "Shift work scrambled her meal timing and sleep, destabilizing her blood sugar — worst after night shifts; one cause binds it all. Test it by stabilizing meal times across a fixed-schedule stretch and tracking the swings.",
    explanation:
      "The shift-work model binds the swings, erratic meals, and night-shift pattern with one cause and a schedule test, and the follow-up separates it from dosing — full credit. 'Blood sugar varies' refuses to commit and earns zero.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A retailer sees: an item's returns spiked, reviews mention 'runs small', the manufacturer changed factories last quarter, and exchange requests are mostly for larger sizes. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Returns happen; spikes, reviews, and exchanges are separate noise.",
        credit: 0,
      },
      {
        text: "Customers finding the item small is probably driving the returns.",
        credit: 0.6,
      },
      {
        text: "This product is having issues lately.",
        credit: 0.3,
      },
      {
        text: "The new factory's sizing runs small, which explains the 'runs small' reviews, the return spike, and the larger-size exchanges together; test it by measuring new-factory garments against the old spec and against labeled size.",
        credit: 1.0,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish the factory-sizing model from a 'customers changed' rival, and say what result would refute the factory-sizing model.",
      modelAnswer:
        "Cheapest distinguishing check: physically measure new-factory garments against the old factory's spec for the same labeled size. If the new garments match the old measurements exactly, the factory-sizing model is refuted and changing customer expectations must be examined.",
      yieldAnchors: [
        "The item's returns spiked",
        "Reviews mention 'runs small'",
        "The manufacturer changed factories last quarter",
        "Exchange requests are mostly for larger sizes",
      ],
      riskAnchors: [
        "New-factory garments should measure smaller than the old spec",
        "Return/exchange spike should align with the factory-change date",
      ],
      defeatedBy: [
        "New garments measure identical to the old spec",
        "Returns spiked before the factory change",
      ],
    },
    correctAnswer:
      "The new factory's sizing runs small, which explains the 'runs small' reviews, the return spike, and the larger-size exchanges together; test it by measuring new-factory garments against the old spec and against labeled size.",
    explanation:
      "The factory-sizing model binds the reviews, returns, and larger-size exchanges with one cause and a tape-measure test, and the follow-up is decisive — full credit. Calling the spikes 'separate noise' is the dodge.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A teacher of an online course sees: video completion rates dropped, students report the audio is quiet, the lectures were re-recorded with a new mic last month, and forum questions repeat content covered in the videos. Which conclusion best follows?",
    mcOptions: [
      {
        text: "The new mic made the audio too quiet, so students don't finish videos and miss content they then re-ask about — one cause binds completion, the audio complaints, and the repeated questions; test it by re-publishing a normalized-audio version and tracking completion.",
        credit: 1.0,
      },
      {
        text: "Quiet audio is probably reducing how much of each video students watch.",
        credit: 0.6,
      },
      {
        text: "Engagement with the videos has dipped.",
        credit: 0.3,
      },
      {
        text: "Completion, audio, and forum activity are unrelated metrics moving on their own.",
        credit: 0,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish the audio model from a 'content got boring' rival, and say what result would refute the audio model.",
      modelAnswer:
        "Cheapest distinguishing check: re-publish one lecture with audio normalized to a comfortable level and compare its completion rate to the quiet version. If completion stays low even at proper volume, the audio model is refuted and the content/pacing should be examined.",
      yieldAnchors: [
        "Video completion rates dropped",
        "Students report the audio is quiet",
        "Lectures were re-recorded with a new mic last month",
        "Forum questions repeat content covered in the videos",
      ],
      riskAnchors: [
        "Normalized-audio re-publish should raise completion",
        "Repeated forum questions should fall once videos are finished",
      ],
      defeatedBy: [
        "Completion stays low at proper volume",
        "Completion dropped before the new mic was introduced",
      ],
    },
    correctAnswer:
      "The new mic made the audio too quiet, so students don't finish videos and miss content they then re-ask about — one cause binds completion, the audio complaints, and the repeated questions; test it by re-publishing a normalized-audio version and tracking completion.",
    explanation:
      "The audio model binds completion, the quiet-audio reports, the mic change, and the repeated questions with one cause and a re-publish test, and the follow-up isolates it — full credit. Calling the metrics unrelated is the dodge.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A city analyst sees: bus ridership on Route 7 fell, on-time performance dropped, a long-term road detour began two months ago on that route, and rider complaints cite unpredictable arrivals. Other routes are steady. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Ridership shifts for many reasons; we shouldn't favor one explanation.",
        credit: 0,
      },
      {
        text: "The detour made Route 7 unreliable, which dropped on-time rates and drove riders away — one cause binds the ridership, punctuality, and complaints; test it by restoring the original route (or adding schedule slack) and tracking on-time rates and ridership.",
        credit: 1.0,
      },
      {
        text: "Poor on-time performance is likely pushing some riders off Route 7.",
        credit: 0.6,
      },
      {
        text: "Route 7 is struggling at the moment.",
        credit: 0.3,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish the detour model from a 'general transit decline' rival, and say what result would refute the detour model.",
      modelAnswer:
        "Cheapest distinguishing check: compare Route 7's ridership and on-time decline against the other routes that have no detour. If those routes fell just as much, the detour model is refuted and a system-wide cause must be sought.",
      yieldAnchors: [
        "Route 7 ridership fell",
        "On-time performance dropped",
        "A road detour began two months ago on that route",
        "Complaints cite unpredictable arrivals",
        "Other routes are steady",
      ],
      riskAnchors: [
        "Restoring the route or adding slack should raise on-time rates and ridership",
        "Route 7's decline should exceed detour-free routes",
      ],
      defeatedBy: [
        "Other detour-free routes declined just as much",
        "Route 7's decline predates the detour",
      ],
    },
    correctAnswer:
      "The detour made Route 7 unreliable, which dropped on-time rates and drove riders away — one cause binds the ridership, punctuality, and complaints; test it by restoring the original route (or adding schedule slack) and tracking on-time rates and ridership.",
    explanation:
      "The detour model binds the ridership, punctuality, complaints, and the route-specific pattern with one cause and a restoration test, and the follow-up isolates it from a system-wide decline — full credit. 'Ridership shifts for many reasons' is the zero-credit dodge.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A homeowner finds: the basement smells musty, a wall shows a dark stain, the carpet is damp near that wall, and the smell and dampness worsen after heavy rain. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Musty smell, a stain, and damp carpet might each be coincidental.",
        credit: 0,
      },
      {
        text: "Rainwater is seeping through that wall, which explains the stain, the damp carpet, the musty smell, and the rain-linked timing together; test it by sealing/diverting water at that wall and checking whether dampness and smell stop after the next rain.",
        credit: 1.0,
      },
      {
        text: "The damp carpet is likely the source of the musty smell.",
        credit: 0.6,
      },
      {
        text: "The basement has a moisture issue.",
        credit: 0.3,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish the rain-seepage model from an 'indoor plumbing leak' rival, and say what result would refute the rain-seepage model.",
      modelAnswer:
        "Cheapest distinguishing check: note whether the dampness tracks rainfall or stays constant regardless of weather. If the wall is equally wet during a long dry spell, the rain-seepage model is refuted and an internal plumbing leak should be investigated.",
      yieldAnchors: [
        "The basement smells musty",
        "A wall shows a dark stain",
        "The carpet is damp near that wall",
        "Smell and dampness worsen after heavy rain",
      ],
      riskAnchors: [
        "Sealing/diverting water at the wall should stop dampness after rain",
        "Dampness should track rainfall, not run constantly",
      ],
      defeatedBy: [
        "The wall is equally wet during a long dry spell",
        "Dampness appears far from the stained wall too",
      ],
    },
    correctAnswer:
      "Rainwater is seeping through that wall, which explains the stain, the damp carpet, the musty smell, and the rain-linked timing together; test it by sealing/diverting water at that wall and checking whether dampness and smell stop after the next rain.",
    explanation:
      "The seepage model binds the stain, damp carpet, smell, and rain timing with one cause and a sealing test, and the follow-up cleanly separates rain from plumbing — full credit. Calling each clue coincidental is the dodge.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A factory supervisor sees: defect rates rose on Line B, the defects cluster on the night shift, a machine on Line B was repaired with a temporary part last week, and rejects show the same misaligned weld. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Defects, shift timing, and the repair are separate facts we shouldn't tie together.",
        credit: 0,
      },
      {
        text: "The night-shift cluster suggests the night crew needs retraining.",
        credit: 0.6,
      },
      {
        text: "Line B has been producing more rejects lately.",
        credit: 0.3,
      },
      {
        text: "The temporary repair part misaligns the weld, producing the identical defect — heaviest at night when the machine runs hottest/longest; one cause binds the rise, the weld pattern, and the timing. Test it by installing the correct part and rechecking defect rate and weld alignment.",
        credit: 1.0,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish the bad-part model from a 'night-crew error' rival, and say what result would refute the bad-part model.",
      modelAnswer:
        "Cheapest distinguishing check: have the day crew run the same machine with the temporary part and inspect for the identical misaligned weld. If day-crew output is defect-free with that part in place, the bad-part model is weakened and night-crew practices are implicated.",
      yieldAnchors: [
        "Defect rates rose on Line B",
        "Defects cluster on the night shift",
        "A machine was repaired with a temporary part last week",
        "Rejects show the same misaligned weld",
      ],
      riskAnchors: [
        "Installing the correct part should drop the defect rate and fix the weld",
        "The identical-weld defect should appear whenever the temp part runs",
      ],
      defeatedBy: [
        "Day crew runs the temp part with no defects",
        "Defects rose before the temporary part was installed",
      ],
    },
    correctAnswer:
      "The temporary repair part misaligns the weld, producing the identical defect — heaviest at night when the machine runs hottest/longest; one cause binds the rise, the weld pattern, and the timing. Test it by installing the correct part and rechecking defect rate and weld alignment.",
    explanation:
      "The bad-part model binds the defect rise, the identical weld, and the timing with one cause and a part-swap test, and the follow-up separates it from crew error — full credit. Refusing to tie the facts together is the dodge.",
  },
];

const written: HomeworkItem[] = [
  {
    itemType: "written",
    prompt:
      "A library reports: weekday afternoon visits dropped sharply this term, the nearby high school changed dismissal time from 3:00 to 2:00 this term, teen study-room bookings fell, and complaints arrived that the library now feels 'dead' right after lunch. Adult morning use is unchanged. In a paragraph, propose the strongest supported model for the afternoon decline and name a test that could refute it.",
    writtenRubric: {
      modelAnswer:
        "The single high-yield model is that the earlier 2:00 dismissal shifted the teen crowd's arrival earlier and out of the library's afternoon window: this one change binds the dropped afternoon visits, the fallen teen study-room bookings, the 'dead after lunch' complaints, and the untouched adult morning use. I'd commit to it and test it: track when teens now arrive and, ideally, open or staff a post-2:00 teen window — if teen visits and bookings don't shift to match the new dismissal time, the model is wrong.",
      yieldAnchors: [
        "Weekday afternoon visits dropped sharply this term",
        "The high school moved dismissal from 3:00 to 2:00 this term",
        "Teen study-room bookings fell",
        "Complaints that it feels 'dead' right after lunch",
        "Adult morning use is unchanged",
      ],
      riskAnchors: [
        "Teen arrival times should now cluster earlier, matching 2:00 dismissal",
        "A post-2:00 teen window should recover afternoon teen visits/bookings",
      ],
      defeatedBy: [
        "Teen visits fell uniformly across all hours, not just afternoons",
        "The decline began before the dismissal time changed",
        "Adult afternoon use also collapsed (pointing to a building-wide cause)",
      ],
    },
    correctAnswer:
      "The single high-yield model is that the earlier 2:00 dismissal shifted the teen crowd's arrival earlier and out of the library's afternoon window: this one change binds the dropped afternoon visits, the fallen teen study-room bookings, the 'dead after lunch' complaints, and the untouched adult morning use. I'd commit to it and test it: track when teens now arrive and, ideally, open or staff a post-2:00 teen window — if teen visits and bookings don't shift to match the new dismissal time, the model is wrong.",
    explanation:
      "A top answer commits to the one model that binds the most observations (the dismissal shift) and names a refuting test; the cautious 'visits drop for all sorts of reasons' earns near-zero, and a florid answer that explains only one fact scores low.",
  },
  {
    itemType: "written",
    prompt:
      "A hospital ward reports: post-surgery infections rose this quarter, the rise is confined to one operating room, that room's air-handling filter was last changed 14 months ago (overdue), and infection cultures there show the same airborne mold species. Other rooms are normal. In a paragraph, propose the strongest supported model and name a test that could refute it.",
    writtenRubric: {
      modelAnswer:
        "The high-yield model is that the overdue air-handling filter let an airborne mold contaminate that one operating room, infecting patients there: this single cause binds the infection rise, its confinement to one room, the overdue filter, and the matching mold species in cultures, while leaving the normal rooms expected. I'd commit and test it: air-sample that room before and after replacing the filter — if the mold counts and the room-specific infections persist after a proper filter change, the model is refuted.",
      yieldAnchors: [
        "Post-surgery infections rose this quarter",
        "The rise is confined to one operating room",
        "That room's filter was last changed 14 months ago (overdue)",
        "Cultures there show the same airborne mold species",
        "Other rooms are normal",
      ],
      riskAnchors: [
        "Air sampling should show high mold counts before the filter change",
        "Replacing the filter should drop mold counts and room-specific infections",
      ],
      defeatedBy: [
        "Infections rose equally across all operating rooms",
        "Cultures show varied unrelated organisms, not one airborne mold",
        "Infections persist unchanged after a proper filter replacement",
      ],
    },
    correctAnswer:
      "The high-yield model is that the overdue air-handling filter let an airborne mold contaminate that one operating room, infecting patients there: this single cause binds the infection rise, its confinement to one room, the overdue filter, and the matching mold species in cultures, while leaving the normal rooms expected. I'd commit and test it: air-sample that room before and after replacing the filter — if the mold counts and the room-specific infections persist after a proper filter change, the model is refuted.",
    explanation:
      "Top credit goes to the one mechanism that binds the infection rise, the single-room pattern, the overdue filter, and the mold species, plus a falsifiable air-sampling test; 'infections have many causes, we can't say' is the near-zero dodge.",
  },
  {
    itemType: "written",
    prompt:
      "An e-commerce team reports: mobile conversion dropped 20% after a Tuesday app release, crash logs spiked on one phone model, that model has an older OS version, and affected users abandon at the payment screen. Desktop and other phones are unaffected. In a paragraph, propose the strongest supported model and name a test that could refute it.",
    writtenRubric: {
      modelAnswer:
        "The high-yield model is that Tuesday's release contains code incompatible with the older OS on that one phone model, crashing the payment screen and tanking mobile conversion: this single fault binds the post-release drop, the model-specific crash spike, the older-OS link, and the payment-screen abandonment, while explaining why desktop and newer phones are fine. I'd commit and test it: ship a patch (or roll back) for that OS version and watch whether crashes and payment-screen abandonment on that model return to baseline — if they don't, the model is wrong.",
      yieldAnchors: [
        "Mobile conversion dropped 20% after the Tuesday release",
        "Crash logs spiked on one phone model",
        "That model runs an older OS version",
        "Affected users abandon at the payment screen",
        "Desktop and other phones are unaffected",
      ],
      riskAnchors: [
        "A patch/rollback for that OS should restore conversion on that model",
        "Crash logs on that model should fall to baseline after the fix",
      ],
      defeatedBy: [
        "Conversion dropped on desktop and all phones equally",
        "Crashes occur across many OS versions, not just the old one",
        "Abandonment is spread across screens, not concentrated at payment",
      ],
    },
    correctAnswer:
      "The high-yield model is that Tuesday's release contains code incompatible with the older OS on that one phone model, crashing the payment screen and tanking mobile conversion: this single fault binds the post-release drop, the model-specific crash spike, the older-OS link, and the payment-screen abandonment, while explaining why desktop and newer phones are fine. I'd commit and test it: ship a patch (or roll back) for that OS version and watch whether crashes and payment-screen abandonment on that model return to baseline — if they don't, the model is wrong.",
    explanation:
      "The strongest answer commits to one release-incompatibility model that binds the timing, the model-specific crashes, the OS link, and the payment abandonment, with a rollback test; the timid 'conversion fluctuates' answer earns near-zero.",
  },
  {
    itemType: "written",
    prompt:
      "A youth soccer club reports: injuries rose this season, most are hamstring strains, the club switched to a new artificial turf in spring, and the strains cluster among players who train most on the new pitch. The grass-training group is largely unaffected. In a paragraph, propose the strongest supported model and name a test that could refute it.",
    writtenRubric: {
      modelAnswer:
        "The high-yield model is that the new artificial turf's surface (grip/hardness) is overloading players' hamstrings, causing the strain cluster: this one cause binds the overall injury rise, the hamstring-specific pattern, the spring turf switch, and the concentration among heavy turf-trainers, while explaining why the grass group is spared. I'd commit and test it: move a subset of the turf-heavy players back to grass for several weeks (or measure turf traction forces) — if their hamstring-strain rate stays elevated off the new turf, the model is refuted.",
      yieldAnchors: [
        "Injuries rose this season",
        "Most are hamstring strains",
        "The club switched to new artificial turf in spring",
        "Strains cluster among heavy turf-trainers",
        "The grass-training group is largely unaffected",
      ],
      riskAnchors: [
        "Turf-heavy players moved to grass should see hamstring strains fall",
        "Turf traction/hardness measures should exceed safe ranges",
      ],
      defeatedBy: [
        "Hamstring strains are equally common in the grass group",
        "Injuries are spread across body parts, not concentrated at hamstrings",
        "Strain rates stay high even after players leave the new turf",
      ],
    },
    correctAnswer:
      "The high-yield model is that the new artificial turf's surface (grip/hardness) is overloading players' hamstrings, causing the strain cluster: this one cause binds the overall injury rise, the hamstring-specific pattern, the spring turf switch, and the concentration among heavy turf-trainers, while explaining why the grass group is spared. I'd commit and test it: move a subset of the turf-heavy players back to grass for several weeks (or measure turf traction forces) — if their hamstring-strain rate stays elevated off the new turf, the model is refuted.",
    explanation:
      "Top credit binds the injury rise, the hamstring pattern, the turf timing, and the exposure gradient with one cause plus a refuting grass-return test; assigning each player's injury its own separate cause is the zero-credit fragmentation dodge.",
  },
  {
    itemType: "written",
    prompt:
      "A coffee roaster reports: customer complaints about bitter coffee rose, the bitterness reports started after a grinder was serviced, the new grind looks visibly finer, and complaints concentrate on espresso drinks (not drip). Bean supplier and roast are unchanged. In a paragraph, propose the strongest supported model and name a test that could refute it.",
    writtenRubric: {
      modelAnswer:
        "The high-yield model is that the grinder service left the burrs set too fine, over-extracting espresso into bitterness: this single cause binds the rise in bitterness complaints, the post-service timing, the visibly finer grind, and the espresso-specific concentration (espresso is far more sensitive to grind than drip), while the unchanged beans and roast rule out supply causes. I'd commit and test it: reset the grinder coarser to the pre-service setting and measure espresso extraction/taste — if bitterness complaints persist at the correct grind, the model is refuted.",
      yieldAnchors: [
        "Complaints about bitter coffee rose",
        "Bitterness started after the grinder was serviced",
        "The new grind looks visibly finer",
        "Complaints concentrate on espresso, not drip",
        "Bean supplier and roast are unchanged",
      ],
      riskAnchors: [
        "Resetting the grind coarser should reduce espresso bitterness",
        "Extraction measurements should show over-extraction at the current grind",
      ],
      defeatedBy: [
        "Bitterness complaints are equally common on drip coffee",
        "Bitterness predates the grinder service",
        "Complaints persist after the grind is reset coarser",
      ],
    },
    correctAnswer:
      "The high-yield model is that the grinder service left the burrs set too fine, over-extracting espresso into bitterness: this single cause binds the rise in bitterness complaints, the post-service timing, the visibly finer grind, and the espresso-specific concentration (espresso is far more sensitive to grind than drip), while the unchanged beans and roast rule out supply causes. I'd commit and test it: reset the grinder coarser to the pre-service setting and measure espresso extraction/taste — if bitterness complaints persist at the correct grind, the model is refuted.",
    explanation:
      "The strongest answer commits to one grind-too-fine model that binds the bitterness, the service timing, the finer grind, and the espresso concentration, with a regrind test; 'tastes vary, hard to say' earns near-zero and an ornate answer binding one fact scores low.",
  },
];

export const section: SectionContent = {
  slug: "explanatory-yield",
  title: "Model Selection by Explanatory Yield",
  weekNumber: 1,
  blurb:
    "When several explanations all 'fit,' pick the one that binds the most observations at once — every fact a model leaves dangling is a debt it owes.",
  lectureTitle:
    "1.2 Model Selection by Explanatory Yield: pick the model that binds the most data",
  body,
  homework: {
    mcq,
    hybrid,
    written,
  },
};
