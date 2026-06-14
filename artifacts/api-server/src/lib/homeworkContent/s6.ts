import type { SectionContent, HomeworkItem, McOption, WrittenRubric } from "./types";

const mcq: HomeworkItem[] = [
  {
    itemType: "mc",
    prompt:
      "A factory's defect log shows a tiny scrap of failed bolts overall — but the failures aren't scattered. Eleven of the last fourteen failures came from the same supplier's batches, all stamped in the same week. Which conclusion best follows?",
    mcOptions: [
      {
        text: "The failure rate is within normal tolerance, so the eleven matched failures are just statistical noise.",
        credit: 0,
      },
      {
        text: "Something specific to that supplier's process that week is producing weak bolts; pull and stress-test the remaining stock from those exact batches and compare against other suppliers' bolts.",
        credit: 1.0,
      },
      {
        text: "That supplier probably has a quality problem worth flagging for review at some point.",
        credit: 0.3,
      },
      {
        text: "The clustered failures suggest a bad batch; we should ask the supplier whether anything changed that week.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "Something specific to that supplier's process that week is producing weak bolts; pull and stress-test the remaining stock from those exact batches and compare against other suppliers' bolts.",
    explanation:
      "The cluster of matched failures is the seed of a model — a defective process at one supplier in one week — and the winning answer builds that model plus a decisive stress test. Calling the cluster 'statistical noise' is the zero-credit dodge that throws away the signal.",
  },
  {
    itemType: "mc",
    prompt:
      "A telescope survey keeps logging faint smudges that observers mark as 'artifacts.' But the smudges recur at the same six sky coordinates across many nights and two different cameras. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Repeating smudges at fixed coordinates across two cameras point to real faint objects there; schedule a long-exposure pointing at one coordinate to confirm a source above background.",
        credit: 1.0,
      },
      {
        text: "Optical artifacts are common, so the smudges should be filtered out and ignored.",
        credit: 0,
      },
      {
        text: "There might be something at those coordinates worth a closer look eventually.",
        credit: 0.3,
      },
      {
        text: "Since the smudges repeat, they probably reflect real sources; the team should keep an eye on those coordinates.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "Repeating smudges at fixed coordinates across two cameras point to real faint objects there; schedule a long-exposure pointing at one coordinate to confirm a source above background.",
    explanation:
      "A cluster that repeats across instruments can't be one camera's defect — it implies real sources, and the top answer commits to that model with a clean confirming test. Filtering them as 'artifacts' discards a discovery.",
  },
  {
    itemType: "mc",
    prompt:
      "An online store's checkout works fine in testing, yet support keeps getting a trickle of 'payment frozen' complaints. The complaints aren't random: nearly all come from users on one mobile browser version, all using a saved card. Which conclusion best follows?",
    mcOptions: [
      {
        text: "These are probably user errors; the checkout passes all internal tests, so there's nothing to fix.",
        credit: 0,
      },
      {
        text: "There seems to be a pattern with that browser worth monitoring.",
        credit: 0.3,
      },
      {
        text: "The saved-card flow on that browser version likely breaks payment; reproduce checkout on that exact version with a saved card and watch where it hangs.",
        credit: 1.0,
      },
      {
        text: "That browser version may have a compatibility issue; the team should test it when they get a chance.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "The saved-card flow on that browser version likely breaks payment; reproduce checkout on that exact version with a saved card and watch where it hangs.",
    explanation:
      "The shared browser-plus-saved-card pattern is a precise model the cluster points to, and the winner reproduces it deliberately. 'User error, nothing to fix' dismisses a patterned cluster as noise.",
  },
  {
    itemType: "mc",
    prompt:
      "A cardiologist notices that over two years, a handful of her patients had heart attacks despite excellent cholesterol and blood pressure. Reviewing charts, she finds they all share an unusually high reading on one inflammatory marker she rarely orders. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Heart attacks happen even in healthy-looking patients, so these few cases are just bad luck.",
        credit: 0,
      },
      {
        text: "That inflammatory marker may flag a hidden risk pathway; order it for a larger group and track whether high readers have more events than low readers.",
        credit: 1.0,
      },
      {
        text: "The shared marker is interesting and might be worth mentioning to colleagues.",
        credit: 0.3,
      },
      {
        text: "Inflammation could be playing a role here; she should consider the marker for similar patients.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "That inflammatory marker may flag a hidden risk pathway; order it for a larger group and track whether high readers have more events than low readers.",
    explanation:
      "The shared outlier marker across otherwise-healthy victims is a cluster pointing to a new risk model, and the top answer turns it into a testable cohort comparison. 'Just bad luck' refuses to read the signal.",
  },
  {
    itemType: "mc",
    prompt:
      "A coffee roaster's tasting panel mostly gives consistent scores, but a string of recent batches got wildly split reviews — half 'fruity,' half 'flat.' The split batches were all roasted on humid afternoons. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Taste is subjective, so divided scores are random and not worth analyzing.",
        credit: 0,
      },
      {
        text: "Humidity might affect roasting; worth keeping in mind for future batches.",
        credit: 0.3,
      },
      {
        text: "Afternoon humidity probably shifts the roast, splitting the flavor; roast paired batches on a dry and a humid afternoon and have the panel score them blind.",
        credit: 1.0,
      },
      {
        text: "The humid-day pattern suggests moisture is altering the roast; the roaster should watch humidity more closely.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "Afternoon humidity probably shifts the roast, splitting the flavor; roast paired batches on a dry and a humid afternoon and have the panel score them blind.",
    explanation:
      "The clustered split scores share one condition — humidity — which seeds a concrete causal model and a paired blind test. Writing it off as 'taste is subjective' ignores the patterned outliers.",
  },
  {
    itemType: "mc",
    prompt:
      "A city's bike-share data looks healthy overall, but a small set of docking stations keeps logging bikes as 'returned' that staff later find missing. These stations are all the newest model and all near the river. Which conclusion best follows?",
    mcOptions: [
      {
        text: "The new riverside docks likely misread returns — perhaps a sensor fault in damp conditions; test one such dock by returning bikes in dry vs. damp weather and checking the logs.",
        credit: 1.0,
      },
      {
        text: "Bike-share systems always have some losses, so these missing bikes are normal shrinkage.",
        credit: 0,
      },
      {
        text: "There could be something off with those stations worth a glance.",
        credit: 0.3,
      },
      {
        text: "The riverside docks seem error-prone; the operator should flag them for inspection.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "The new riverside docks likely misread returns — perhaps a sensor fault in damp conditions; test one such dock by returning bikes in dry vs. damp weather and checking the logs.",
    explanation:
      "The shared model and location is a cluster pointing to a damp-sensor fault, and the top answer builds and tests that exact model. 'Normal shrinkage' dissolves a precise pattern into background loss.",
  },
  {
    itemType: "mc",
    prompt:
      "A teacher grading essays finds most students did fine, but six failed the same question in nearly identical ways — each misdefining a key term the same wrong way. They sit in different periods. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Some students always misunderstand; six failures out of many is just normal variation.",
        credit: 0,
      },
      {
        text: "The identical wrong definition probably traces to a shared source — a misleading study guide or video; ask the six where they studied and check that source for the exact error.",
        credit: 1.0,
      },
      {
        text: "There may be a common misconception here worth addressing in class.",
        credit: 0.3,
      },
      {
        text: "The matching mistake suggests a shared influence; the teacher should review how the term was taught.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "The identical wrong definition probably traces to a shared source — a misleading study guide or video; ask the six where they studied and check that source for the exact error.",
    explanation:
      "Identical errors across different classes can't be independent slips — the cluster points to a common bad source, and the winner traces and inspects it. 'Normal variation' ignores that the mistakes are matched.",
  },
  {
    itemType: "mc",
    prompt:
      "A SaaS company's churn is low, but a reviewer notices that the customers who cancel keep doing so right after their third monthly invoice, and all had signed up during a specific promo. Which conclusion best follows?",
    mcOptions: [
      {
        text: "The promo cohort likely hits a price or value cliff at month three; interview a few of these churned users and compare their month-three usage to retained users'.",
        credit: 1.0,
      },
      {
        text: "Churn is inevitable in subscriptions, so this small group leaving is just background turnover.",
        credit: 0,
      },
      {
        text: "There might be something about that promo cohort worth noting.",
        credit: 0.3,
      },
      {
        text: "The month-three timing suggests the promo plays a role; the team should look into it.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "The promo cohort likely hits a price or value cliff at month three; interview a few of these churned users and compare their month-three usage to retained users'.",
    explanation:
      "The timed, promo-linked cancellations form a cluster that seeds a specific 'cliff' model, and the top answer commits with interviews plus a usage comparison. 'Inevitable churn' erases the pattern.",
  },
  {
    itemType: "mc",
    prompt:
      "An aquarium's fish are mostly healthy, but over a month a series of deaths all occurred in the three tanks fed from the same newly installed water line, and all the dead fish were bottom-dwellers. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Fish die sometimes; a few deaths in a big aquarium are expected and don't signal anything.",
        credit: 0,
      },
      {
        text: "There may be an issue with that water line worth checking.",
        credit: 0.3,
      },
      {
        text: "Something in the new water line is likely settling and harming bottom-dwellers; test that line's water for contaminants and sediment and compare to the old line.",
        credit: 1.0,
      },
      {
        text: "The shared water line seems involved; staff should monitor those tanks more closely.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "Something in the new water line is likely settling and harming bottom-dwellers; test that line's water for contaminants and sediment and compare to the old line.",
    explanation:
      "Two patterns coincide — the shared new line and the bottom-dweller victims — seeding a settling-contaminant model with a clean water test. 'Fish die sometimes' discards a tightly patterned cluster.",
  },
  {
    itemType: "mc",
    prompt:
      "A delivery firm's GPS shows on-time performance is strong, but a recurring set of late drops all happen in one zip code, all between 4 and 6 p.m., regardless of which driver. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Traffic varies day to day, so scattered late drops are just random noise.",
        credit: 0,
      },
      {
        text: "Something structural about that zip code at rush hour — a closed road or bottleneck — likely causes the delays; map the routes there at 5 p.m. and look for a common choke point.",
        credit: 1.0,
      },
      {
        text: "That area might be slow at certain times; worth a mention to dispatch.",
        credit: 0.3,
      },
      {
        text: "Rush-hour traffic in that zip seems to be the issue; consider rerouting around it.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "Something structural about that zip code at rush hour — a closed road or bottleneck — likely causes the delays; map the routes there at 5 p.m. and look for a common choke point.",
    explanation:
      "Late drops fixed to one place, one time window, across all drivers form a cluster pointing to a structural bottleneck, and the winner commits to finding it. Driver-independent regularity is exactly what 'random noise' fails to explain.",
  },
  {
    itemType: "mc",
    prompt:
      "A pollster's results look normal, but in three separate surveys a strange spike of respondents picked the very last answer option far more than expected — and all three surveys displayed that option in bright red. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Respondents are unpredictable, so the spikes are just sampling noise to be ignored.",
        credit: 0,
      },
      {
        text: "The color might be influencing answers; something to keep in mind.",
        credit: 0.3,
      },
      {
        text: "The red highlighting likely draws respondents to that option; rerun a survey with the option in red for half the sample and neutral for the other half and compare pick rates.",
        credit: 1.0,
      },
      {
        text: "The red option seems to attract clicks; the pollster should avoid colored options.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "The red highlighting likely draws respondents to that option; rerun a survey with the option in red for half the sample and neutral for the other half and compare pick rates.",
    explanation:
      "The spike repeats across surveys and shares one feature — red coloring — seeding a salience model with a clean split-sample test. 'Sampling noise' can't account for a feature-linked pattern recurring three times.",
  },
  {
    itemType: "mc",
    prompt:
      "A gym tracks member injuries; they're rare, but a cluster of shoulder strains all occurred among members who used one specific rowing machine, and all within their first week of using it. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Injuries happen at gyms, so a few shoulder strains are unavoidable and unrelated.",
        credit: 0,
      },
      {
        text: "That rowing machine likely has a setup that strains untrained shoulders; inspect its resistance and form guidance, and watch new users on it versus another rower.",
        credit: 1.0,
      },
      {
        text: "There might be something about that machine worth checking out.",
        credit: 0.3,
      },
      {
        text: "The machine seems linked to the strains; staff should remind members about form.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "That rowing machine likely has a setup that strains untrained shoulders; inspect its resistance and form guidance, and watch new users on it versus another rower.",
    explanation:
      "Strains concentrated on one machine among first-week users form a cluster that seeds a setup-and-form model with a direct observational test. 'Injuries are unavoidable' dissolves a specific, actionable pattern.",
  },
  {
    itemType: "mc",
    prompt:
      "A novelist's editor notices that reader complaints about a book are few but oddly uniform: a dozen readers all say they got 'lost' at the exact same chapter, where the timeline jumps. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Readers always complain about something, so a dozen scattered gripes mean nothing.",
        credit: 0,
      },
      {
        text: "That chapter's timeline jump probably confuses readers; have fresh readers read up to it and note where they lose the thread, then test a clarified transition.",
        credit: 1.0,
      },
      {
        text: "There may be a rough spot at that chapter worth a look.",
        credit: 0.3,
      },
      {
        text: "The shared complaint suggests that chapter needs work; the editor should revise it.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "That chapter's timeline jump probably confuses readers; have fresh readers read up to it and note where they lose the thread, then test a clarified transition.",
    explanation:
      "A dozen readers pinpointing the identical chapter is a cluster locating a real structural flaw, and the winner builds and tests a fix. 'Readers always complain' ignores that the complaints converge on one spot.",
  },
  {
    itemType: "mc",
    prompt:
      "A weather station's temperature record looks fine, but an analyst finds that on a recurring set of mornings the readings spiked impossibly high for a few minutes — always around 7 a.m. on clear days. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Sensors glitch occasionally, so these brief spikes are just instrument noise to discard.",
        credit: 0,
      },
      {
        text: "There might be a pattern in the spikes worth noting.",
        credit: 0.3,
      },
      {
        text: "Low morning sun on clear days is probably hitting the sensor directly; check the sensor's exposure at 7 a.m. and shield it, predicting the spikes vanish.",
        credit: 1.0,
      },
      {
        text: "Sunlight on clear mornings seems to cause the spikes; the station should adjust the readings.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "Low morning sun on clear days is probably hitting the sensor directly; check the sensor's exposure at 7 a.m. and shield it, predicting the spikes vanish.",
    explanation:
      "Spikes locked to a time and a sky condition form a cluster that seeds a direct-sunlight model with a falsifiable shielding test. Discarding them as 'instrument noise' ignores the systematic timing.",
  },
  {
    itemType: "mc",
    prompt:
      "A bank's fraud system flags little, but an analyst spots that a small run of disputed charges all hit cards used at the same three ATMs within the same two-day window. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Disputes occur with any card volume, so this handful is just ordinary fraud background.",
        credit: 0,
      },
      {
        text: "Those ATMs may be involved somehow; worth flagging.",
        credit: 0.3,
      },
      {
        text: "The shared ATMs and tight window point to a skimmer at those machines; physically inspect them for skimming devices and pull their footage for the window.",
        credit: 1.0,
      },
      {
        text: "The common ATMs suggest tampering; the bank should review those locations.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "The shared ATMs and tight window point to a skimmer at those machines; physically inspect them for skimming devices and pull their footage for the window.",
    explanation:
      "Disputes converging on three machines in a two-day window are a cluster that names a skimming model with an immediate physical test. 'Ordinary fraud background' throws away a precise, time-bound pattern.",
  },
];

const hybrid: HomeworkItem[] = [
  {
    itemType: "hybrid",
    prompt:
      "A brewery's beer is consistent, but a run of customer complaints about 'sour' bottles all trace to bottles from one filling head on the line, all filled after the lunch break. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Some bottles always go off; a few sour ones are just product variability.",
        credit: 0,
      },
      {
        text: "That filling head likely isn't sanitized properly after lunch, letting bacteria in; swab it before and after the break and culture the samples while tracking which bottles sour.",
        credit: 1.0,
      },
      {
        text: "There might be an issue with that filling head worth checking.",
        credit: 0.3,
      },
      {
        text: "The post-lunch bottles from that head seem prone to souring; staff should clean the line more.",
        credit: 0.6,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your contamination model from the rival 'random variability' view, and say what result would refute your model.",
      modelAnswer:
        "The cheapest test is to swab and culture that one filling head right after the lunch break and compare it to the other heads. If its bacterial count is no higher than the others' yet its bottles still sour, the contaminated-head model is refuted.",
      yieldAnchors: [
        "Sour complaints trace to one specific filling head",
        "Affected bottles were all filled after the lunch break",
        "The rest of the line's output is consistent",
      ],
      riskAnchors: [
        "Swab cultures from that head show elevated bacteria versus other heads",
        "Improving the post-break sanitation of that head eliminates the souring",
      ],
      defeatedBy: [
        "Souring is randomly spread across all filling heads",
        "Sour bottles appear equally before and after the break",
      ],
    },
    correctAnswer:
      "That filling head likely isn't sanitized properly after lunch, letting bacteria in; swab it before and after the break and culture the samples while tracking which bottles sour.",
    explanation:
      "The complaints cluster on one head and one time, seeding a sanitation model the top MC commits to; the follow-up earns full credit by naming a cheap culture test and the result that would refute it. 'Product variability' is the zero-credit dodge.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A research lab's mouse experiments mostly replicate, but a cluster of failed replications all came from cages on the lab's top shelf, near a ventilation vent. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Replication is hard; some failures are expected and tell us nothing in particular.",
        credit: 0,
      },
      {
        text: "There may be a shelf effect worth keeping in mind.",
        credit: 0.3,
      },
      {
        text: "The vent likely creates a draft or temperature difference affecting those mice; move some cages off the top shelf and run paired experiments to see if replication recovers.",
        credit: 1.0,
      },
      {
        text: "The top shelf seems to be a problem; the lab should avoid putting cages there.",
        credit: 0.6,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your environmental model from the rival 'experiments just fail sometimes' view, and say what result would refute it.",
      modelAnswer:
        "Cheaply log temperature and airflow at the top shelf versus lower shelves over a few days while noting which cages' results replicate. If the top shelf reads identical to the others yet its replications still fail, the vent-environment model is refuted.",
      yieldAnchors: [
        "Failed replications concentrate on the top shelf",
        "Those cages sit near a ventilation vent",
        "Cages elsewhere replicate normally",
      ],
      riskAnchors: [
        "Top-shelf cages show measurable draft or temperature difference",
        "Moving cages off the top shelf restores replication",
      ],
      defeatedBy: [
        "Replication failures are scattered evenly across all shelves",
        "Top-shelf conditions match the rest of the room",
      ],
    },
    correctAnswer:
      "The vent likely creates a draft or temperature difference affecting those mice; move some cages off the top shelf and run paired experiments to see if replication recovers.",
    explanation:
      "The failures cluster by location near a vent, seeding an environmental confound the top MC builds; the follow-up earns full credit with a cheap logging test and a refuting result. 'Experiments just fail' is the dodge.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A retailer's returns are low, but a string of returned jackets all came from the same warehouse and all had the size label read one size too large. Which conclusion best follows?",
    mcOptions: [
      {
        text: "The mislabeling cluster points to a relabeling or sizing error at that warehouse; pull a sample of that warehouse's jacket stock and measure them against their printed sizes.",
        credit: 1.0,
      },
      {
        text: "Returns are part of retail, so a few mislabeled jackets are just noise.",
        credit: 0,
      },
      {
        text: "That warehouse might have a labeling slip worth a glance.",
        credit: 0.3,
      },
      {
        text: "The warehouse seems to be mislabeling sizes; the retailer should audit it eventually.",
        credit: 0.6,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your warehouse-error model from the rival 'random returns' view, and say what result would refute it.",
      modelAnswer:
        "Cheaply measure a sample of jackets from that warehouse against their printed size labels. If they measure true to label, the warehouse-mislabeling model is refuted and the returns must have another cause.",
      yieldAnchors: [
        "Returned jackets share one warehouse",
        "All read one size too large on the label",
        "Returns from other warehouses are normal",
      ],
      riskAnchors: [
        "Sampled stock from that warehouse measures smaller than its printed size",
        "Correcting the labels there drops the return rate",
      ],
      defeatedBy: [
        "Mislabeled returns come evenly from all warehouses",
        "Sampled jackets measure true to their printed size",
      ],
    },
    correctAnswer:
      "The mislabeling cluster points to a relabeling or sizing error at that warehouse; pull a sample of that warehouse's jacket stock and measure them against their printed sizes.",
    explanation:
      "Returns sharing a warehouse and the same label offset seed a labeling-error model the top MC commits to; the follow-up earns full credit with a cheap measurement and a clear refuting result. 'Noise' ignores the matched pattern.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A streaming app's crash rate is tiny, but a burst of crashes all happened on devices with under 2 GB of free storage, all while downloading episodes. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Apps crash sometimes; these scattered crashes aren't worth chasing.",
        credit: 0,
      },
      {
        text: "Low storage during downloads probably exhausts disk space and crashes the app; reproduce a download on a near-full device and watch memory and storage as it fails.",
        credit: 1.0,
      },
      {
        text: "Storage might be a factor worth noting.",
        credit: 0.3,
      },
      {
        text: "Low-storage devices seem to crash on downloads; the team should warn those users.",
        credit: 0.6,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your storage-exhaustion model from the rival 'random crashes' view, and say what result would refute it.",
      modelAnswer:
        "Cheaply reproduce a download on a device deliberately filled to under 2 GB free and watch storage during the crash. If it crashes with plenty of storage to spare, the storage-exhaustion model is refuted.",
      yieldAnchors: [
        "Crashes hit devices with under 2 GB free",
        "All occurred during episode downloads",
        "Crash rate is otherwise tiny",
      ],
      riskAnchors: [
        "Storage runs out at the moment of the reproduced crash",
        "Freeing storage or capping download size stops the crashes",
      ],
      defeatedBy: [
        "Crashes occur equally on devices with ample free storage",
        "The reproduced download crashes with storage to spare",
      ],
    },
    correctAnswer:
      "Low storage during downloads probably exhausts disk space and crashes the app; reproduce a download on a near-full device and watch memory and storage as it fails.",
    explanation:
      "Crashes clustered by low storage and download activity seed an exhaustion model the top MC builds; the follow-up earns full credit by reproducing it cheaply and naming a refuting outcome. 'Apps crash sometimes' is the dodge.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A vineyard's vines are healthy, but a cluster of stunted vines all grow in one corner of the field, all downhill from a new gravel access road. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Vines vary naturally, so a stunted patch is just normal variation.",
        credit: 0,
      },
      {
        text: "There may be something about that corner worth a look.",
        credit: 0.3,
      },
      {
        text: "Runoff from the gravel road is likely changing the soil downhill; test that corner's soil for compaction, pH, or salts and compare it to healthy rows.",
        credit: 1.0,
      },
      {
        text: "The road runoff seems to hurt those vines; the vineyard should redirect it.",
        credit: 0.6,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your runoff model from the rival 'natural variation' view, and say what result would refute it.",
      modelAnswer:
        "Cheaply test and compare the soil in the stunted downhill corner against healthy rows for compaction, pH, and salt. If the soil is identical to the healthy rows', the road-runoff model is refuted.",
      yieldAnchors: [
        "Stunted vines cluster in one corner",
        "That corner is downhill from a new gravel road",
        "The rest of the field is healthy",
      ],
      riskAnchors: [
        "The corner's soil differs measurably from healthy rows",
        "Diverting the runoff lets the corner recover next season",
      ],
      defeatedBy: [
        "Stunted vines appear randomly across the whole field",
        "The corner's soil matches the healthy rows exactly",
      ],
    },
    correctAnswer:
      "Runoff from the gravel road is likely changing the soil downhill; test that corner's soil for compaction, pH, or salts and compare it to healthy rows.",
    explanation:
      "Stunted vines clustered downhill from a new road seed a runoff model the top MC commits to; the follow-up earns full credit with a cheap soil comparison and a refuting result. 'Natural variation' ignores the placement.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A help desk's tickets are normal, but a recurring set of 'can't log in' tickets all come from employees who recently changed departments, all on Monday mornings. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Login problems happen; these few tickets are just routine churn.",
        credit: 0,
      },
      {
        text: "Department changes probably trigger a weekend permissions sync that strips access; trace one transferred employee's account through the weekend sync and watch when access drops.",
        credit: 1.0,
      },
      {
        text: "There might be a link to transfers worth noting.",
        credit: 0.3,
      },
      {
        text: "Transfers seem to cause login trouble; IT should look into the process.",
        credit: 0.6,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your permissions-sync model from the rival 'routine login trouble' view, and say what result would refute it.",
      modelAnswer:
        "Cheaply watch the access logs of one recently transferred employee across the weekend sync into Monday. If their permissions never change over the weekend yet they still can't log in, the sync model is refuted.",
      yieldAnchors: [
        "Login tickets come from recently transferred employees",
        "They cluster on Monday mornings",
        "Other login tickets are routine",
      ],
      riskAnchors: [
        "Logs show access stripped during the weekend sync",
        "Fixing the transfer-sync step ends the Monday tickets",
      ],
      defeatedBy: [
        "Login failures hit transferred and non-transferred staff equally",
        "Permissions are unchanged across the weekend for affected users",
      ],
    },
    correctAnswer:
      "Department changes probably trigger a weekend permissions sync that strips access; trace one transferred employee's account through the weekend sync and watch when access drops.",
    explanation:
      "Tickets clustered by transfer status and Monday timing seed a sync model the top MC builds; the follow-up earns full credit by tracing one account and naming a refuting result. 'Routine churn' discards the pattern.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A youth soccer league's results are balanced, but a run of lopsided losses all happened to teams playing on one particular field, all in afternoon games. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Blowouts happen in sports, so a few lopsided games are just random outcomes.",
        credit: 0,
      },
      {
        text: "That field might disadvantage afternoon teams somehow; worth a mention.",
        credit: 0.3,
      },
      {
        text: "Something about that field in the afternoon — sun glare or a slope favoring one side — likely tilts play; observe an afternoon game there and note which direction teams struggle.",
        credit: 1.0,
      },
      {
        text: "The afternoon field seems to skew games; the league should adjust scheduling.",
        credit: 0.6,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your field-condition model from the rival 'random blowouts' view, and say what result would refute it.",
      modelAnswer:
        "Cheaply attend one afternoon game at that field and check for sun glare or slope and which side it favors. If the losses fall randomly on both ends with no glare or slope, the field-condition model is refuted.",
      yieldAnchors: [
        "Lopsided losses cluster on one field",
        "They all occur in afternoon games",
        "League results are otherwise balanced",
      ],
      riskAnchors: [
        "An identifiable glare or slope favors one direction in the afternoon",
        "Rotating end assignments or game time removes the imbalance",
      ],
      defeatedBy: [
        "Blowouts at that field are split evenly between both ends",
        "Morning and afternoon games there show the same pattern",
      ],
    },
    correctAnswer:
      "Something about that field in the afternoon — sun glare or a slope favoring one side — likely tilts play; observe an afternoon game there and note which direction teams struggle.",
    explanation:
      "Losses clustered to one field and time of day seed a field-condition model the top MC commits to; the follow-up earns full credit with a cheap observation and a refuting result. 'Random outcomes' ignores the regularity.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A hospital's medication errors are rare, but a cluster of wrong-dose incidents all involved the same drug, all entered by night-shift staff using a new screen layout. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Errors are inevitable in busy hospitals, so these few are just unavoidable mistakes.",
        credit: 0,
      },
      {
        text: "The new screen layout probably makes that drug's dose easy to misread at night; watch night staff enter that drug on the new layout and note where the confusion arises.",
        credit: 1.0,
      },
      {
        text: "The night shift might need more care; worth flagging.",
        credit: 0.3,
      },
      {
        text: "The new layout seems error-prone for that drug; the hospital should review it.",
        credit: 0.6,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your interface model from the rival 'unavoidable errors' view, and say what result would refute it.",
      modelAnswer:
        "Cheaply observe night staff entering that drug on the new layout and note whether the dose field is misread. If they navigate it cleanly and errors persist anyway, the interface model is refuted.",
      yieldAnchors: [
        "Wrong-dose incidents involve the same drug",
        "All entered by night-shift staff",
        "All used a new screen layout",
      ],
      riskAnchors: [
        "Observation reveals a confusing dose field on the new layout",
        "Reverting or fixing the layout cuts the errors",
      ],
      defeatedBy: [
        "Wrong-dose errors occur equally on the old layout and day shift",
        "Staff read the dose field correctly yet still err",
      ],
    },
    correctAnswer:
      "The new screen layout probably makes that drug's dose easy to misread at night; watch night staff enter that drug on the new layout and note where the confusion arises.",
    explanation:
      "Errors clustered by drug, shift, and a new layout seed an interface model the top MC builds; the follow-up earns full credit with a cheap observation and a refuting outcome. 'Inevitable mistakes' dismisses a tight cluster.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A podcast's downloads are steady, but a series of episodes with unusually high drop-off all share the same trait: a long, unscripted intro before the topic starts. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Listeners drop off randomly, so high drop-off on some episodes means nothing.",
        credit: 0,
      },
      {
        text: "Long intros might matter; worth keeping an eye on.",
        credit: 0.3,
      },
      {
        text: "The long unscripted intros probably drive early listeners away; release paired episodes — one with a tight intro, one rambling — and compare drop-off in the first five minutes.",
        credit: 1.0,
      },
      {
        text: "Rambling intros seem to lose listeners; the host should tighten them.",
        credit: 0.6,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your intro model from the rival 'random drop-off' view, and say what result would refute it.",
      modelAnswer:
        "Cheaply compare first-five-minute retention on the rambling-intro episodes against tight-intro episodes already in the feed. If retention is the same regardless of intro length, the intro model is refuted.",
      yieldAnchors: [
        "High drop-off episodes share long unscripted intros",
        "Drop-off concentrates early in those episodes",
        "Overall downloads are steady",
      ],
      riskAnchors: [
        "First-five-minute retention is lower for long-intro episodes",
        "A tight-intro test episode retains more listeners early",
      ],
      defeatedBy: [
        "Drop-off is identical for short- and long-intro episodes",
        "Listeners leave evenly throughout regardless of intro",
      ],
    },
    correctAnswer:
      "The long unscripted intros probably drive early listeners away; release paired episodes — one with a tight intro, one rambling — and compare drop-off in the first five minutes.",
    explanation:
      "Drop-off clustered on episodes sharing one trait seeds an intro model the top MC commits to; the follow-up earns full credit with a cheap paired comparison and a refuting result. 'Random drop-off' ignores the shared trait.",
  },
];

const written: HomeworkItem[] = [
  {
    itemType: "written",
    prompt:
      "A bakery's bread is usually perfect, but over three weeks a series of loaves came out dense and flat. The flat loaves were all baked on days the new apprentice opened the shop, all using the same bag of yeast, and all proofed in the cooler back room. Most other loaves those same weeks were fine. In one paragraph, propose the strongest model these clustered anomalies point to and how you would test it.",
    writtenRubric: {
      modelAnswer:
        "The flat loaves cluster around three shared factors — the apprentice's opening routine, one yeast bag, and the cooler back room — so the strongest model is that something in that combination kills the rise, most likely under-proofing because the cold back room slows fermentation and the apprentice doesn't extend proof time. I'd test it by having the apprentice proof identical dough side by side in the warm and cool rooms with the same yeast and timing, predicting only the cold-room loaves stay dense; if both rise fine, I'd next swap in fresh yeast to isolate the bag.",
      yieldAnchors: [
        "Flat loaves cluster on the apprentice's opening days",
        "All used the same bag of yeast",
        "All were proofed in the cooler back room",
        "Other loaves the same weeks were fine",
      ],
      riskAnchors: [
        "Cold-room proofing yields dense loaves while warm-room proofing rises normally",
        "Swapping in fresh yeast restores rise if temperature isn't the cause",
        "Extending proof time in the cold room recovers the loaves",
      ],
      defeatedBy: [
        "The flat loaves are just random baking variation",
        "Bread sometimes fails and the pattern means nothing",
        "Every loaf those weeks was equally affected",
      ],
    },
    correctAnswer:
      "The flat loaves cluster around three shared factors — the apprentice's opening routine, one yeast bag, and the cooler back room — so the strongest model is that something in that combination kills the rise, most likely under-proofing because the cold back room slows fermentation and the apprentice doesn't extend proof time. I'd test it by having the apprentice proof identical dough side by side in the warm and cool rooms with the same yeast and timing, predicting only the cold-room loaves stay dense; if both rise fine, I'd next swap in fresh yeast to isolate the bag.",
    explanation:
      "Under CCR's inverted standard, committing to the shared-factor model and naming a clean side-by-side test earns top credit; 'just random baking variation' is the near-zero dodge, and a florid answer that never commits to which factor or test scores low.",
  },
  {
    itemType: "written",
    prompt:
      "An ecologist surveying a lake finds fish populations roughly stable, but notes that a recurring set of deformed frogs all turn up at the three inlets fed by streams from one side of the valley, all in late spring. Healthy frogs dominate elsewhere and other seasons. In one paragraph, propose the strongest model these clustered anomalies point to and how you would test it.",
    writtenRubric: {
      modelAnswer:
        "The deformities cluster by location (inlets from one valley side) and timing (late spring), which points to a seasonal contaminant — likely agricultural or snowmelt runoff carrying a pollutant or parasite into those specific streams during the spring thaw. I'd test it by sampling water and sediment at those three inlets versus clean inlets in late spring for pesticides, nutrients, and trematode parasites, predicting elevated levels at the affected inlets that track with deformity rates; if the affected and clean inlets test identical, the runoff model is wrong and I'd look upstream for a point source.",
      yieldAnchors: [
        "Deformed frogs cluster at three inlets from one valley side",
        "They appear in late spring specifically",
        "Healthy frogs dominate other inlets and seasons",
      ],
      riskAnchors: [
        "Affected inlets show elevated contaminants or parasites versus clean inlets",
        "Deformity rates track contaminant levels across inlets",
        "Sampling before and after the spring thaw shows the spike coincides with runoff",
      ],
      defeatedBy: [
        "Deformities are random natural variation not worth investigating",
        "Frog abnormalities happen everywhere and mean nothing here",
        "All inlets are equally affected year-round",
      ],
    },
    correctAnswer:
      "The deformities cluster by location (inlets from one valley side) and timing (late spring), which points to a seasonal contaminant — likely agricultural or snowmelt runoff carrying a pollutant or parasite into those specific streams during the spring thaw. I'd test it by sampling water and sediment at those three inlets versus clean inlets in late spring for pesticides, nutrients, and trematode parasites, predicting elevated levels at the affected inlets that track with deformity rates; if the affected and clean inlets test identical, the runoff model is wrong and I'd look upstream for a point source.",
    explanation:
      "Top credit goes to building the seasonal-runoff model the cluster implies and committing to a comparative sampling test; dismissing the deformities as 'random natural variation' is the near-zero dodge, and vague hand-wringing that names no source or test scores low.",
  },
  {
    itemType: "written",
    prompt:
      "A software team's automated tests almost always pass, but a flaky set of failures keeps recurring: they only fail in the nightly run, only on the build server (never on developers' laptops), and always on tests that touch the system clock. In one paragraph, propose the strongest model these clustered anomalies point to and how you would test it.",
    writtenRubric: {
      modelAnswer:
        "The failures cluster on three shared traits — nightly timing, the build server only, and clock-dependent tests — so the strongest model is a timezone or daylight-saving mismatch on the build server that shifts the clock the tests assume, surfacing only at night when the date rolls over. I'd test it by setting the build server's timezone to match the developers' and rerunning the clock tests at the same nightly hour, predicting the failures vanish; alternatively I'd run the suite on the build server at midday and at midnight, predicting failures appear only around the rollover. If the failures persist regardless of timezone or hour, the clock-config model is refuted.",
      yieldAnchors: [
        "Failures occur only in the nightly run",
        "They happen only on the build server, never on laptops",
        "They always involve tests touching the system clock",
      ],
      riskAnchors: [
        "Matching the build server's timezone to laptops eliminates the failures",
        "Failures appear specifically around the date rollover hour",
        "Forcing a fixed clock in the tests makes them pass on the server",
      ],
      defeatedBy: [
        "The tests are just flaky and the failures are random noise",
        "Automated tests fail sometimes and it isn't worth diagnosing",
        "The failures happen equally on laptops and the server",
      ],
    },
    correctAnswer:
      "The failures cluster on three shared traits — nightly timing, the build server only, and clock-dependent tests — so the strongest model is a timezone or daylight-saving mismatch on the build server that shifts the clock the tests assume, surfacing only at night when the date rolls over. I'd test it by setting the build server's timezone to match the developers' and rerunning the clock tests at the same nightly hour, predicting the failures vanish; alternatively I'd run the suite on the build server at midday and at midnight, predicting failures appear only around the rollover. If the failures persist regardless of timezone or hour, the clock-config model is refuted.",
    explanation:
      "CCR rewards committing to the timezone-mismatch model the three-way cluster implies and naming a decisive config test; 'the tests are just flaky' is the near-zero dodge, and a wordy answer that never pins a mechanism or test scores low.",
  },
  {
    itemType: "written",
    prompt:
      "A boutique's overall sales are healthy, but the manager notices a cluster of refund requests that all share three features: they're for online orders, they ship to apartments in tall buildings, and the customers say the package 'never arrived' despite a delivered scan. Most deliveries are fine. In one paragraph, propose the strongest model these clustered anomalies point to and how you would test it.",
    writtenRubric: {
      modelAnswer:
        "The 'never arrived' refunds cluster by channel (online), destination (tall apartment buildings), and a delivered-but-missing pattern, which points to carriers marking packages delivered at a building's lobby or wrong unit where they're then lost or taken, rather than to fraud or random loss. I'd test it by pulling carrier GPS and photo-on-delivery data for the disputed orders, predicting the drops are logged at the building entrance rather than the unit door; I'd also ship test orders to a few such buildings and track them. If the packages were in fact delivered to the correct doors, the lobby-drop model is refuted and I'd reconsider porch theft or fraud.",
      yieldAnchors: [
        "Refunds are all for online orders",
        "All ship to apartments in tall buildings",
        "Customers report non-arrival despite a delivered scan",
        "Most other deliveries arrive fine",
      ],
      riskAnchors: [
        "Carrier GPS/photos show drops at the lobby or wrong unit, not the door",
        "Test shipments to such buildings reproduce the misdelivery",
        "Requiring signature or unit-level delivery cuts the refund cluster",
      ],
      defeatedBy: [
        "These are just random lost packages not worth analyzing",
        "Some deliveries always go missing and the pattern is meaningless",
        "The losses are spread evenly across all address types",
      ],
    },
    correctAnswer:
      "The 'never arrived' refunds cluster by channel (online), destination (tall apartment buildings), and a delivered-but-missing pattern, which points to carriers marking packages delivered at a building's lobby or wrong unit where they're then lost or taken, rather than to fraud or random loss. I'd test it by pulling carrier GPS and photo-on-delivery data for the disputed orders, predicting the drops are logged at the building entrance rather than the unit door; I'd also ship test orders to a few such buildings and track them. If the packages were in fact delivered to the correct doors, the lobby-drop model is refuted and I'd reconsider porch theft or fraud.",
    explanation:
      "Committing to the lobby-misdelivery model the three-feature cluster implies and naming a GPS/photo test earns top credit; 'just random lost packages' is the near-zero dodge, and a vague answer blaming generic 'shipping problems' without a test scores low.",
  },
  {
    itemType: "written",
    prompt:
      "A high school tracks attendance and finds it strong overall, but a counselor spots that a cluster of chronically absent students share an unusual pattern: they're absent mostly on days with first-period gym, they all ride the same late bus route, and their absences spiked after the schedule changed in October. In one paragraph, propose the strongest model these clustered anomalies point to and how you would test it.",
    writtenRubric: {
      modelAnswer:
        "The absences cluster around first-period gym, one late bus route, and the October schedule change, so the strongest model is that the new schedule made that bus arrive after first period starts, and rather than walk in late to gym these students skip the whole day. I'd test it by checking the bus route's actual arrival times against the first-period bell since October — predicting it arrives late on exactly the affected days — and by moving those students' first period off gym or fixing the bus timing to see if attendance recovers. If the bus arrives on time and absences continue, the schedule-conflict model is refuted and I'd look at gym-class avoidance itself.",
      yieldAnchors: [
        "Absences concentrate on first-period gym days",
        "Affected students all ride the same late bus route",
        "Absences spiked after the October schedule change",
        "Overall attendance is strong",
      ],
      riskAnchors: [
        "The bus's logged arrival falls after the first-period bell since October",
        "Adjusting the schedule or bus timing restores attendance",
        "Students absent on gym days are present on non-gym days",
      ],
      defeatedBy: [
        "These students are just unmotivated and the pattern is coincidence",
        "Chronic absence is random and not worth investigating",
        "The absences are unrelated to the bus or schedule",
      ],
    },
    correctAnswer:
      "The absences cluster around first-period gym, one late bus route, and the October schedule change, so the strongest model is that the new schedule made that bus arrive after first period starts, and rather than walk in late to gym these students skip the whole day. I'd test it by checking the bus route's actual arrival times against the first-period bell since October — predicting it arrives late on exactly the affected days — and by moving those students' first period off gym or fixing the bus timing to see if attendance recovers. If the bus arrives on time and absences continue, the schedule-conflict model is refuted and I'd look at gym-class avoidance itself.",
    explanation:
      "Top credit goes to building the bus-and-schedule conflict model the three-way cluster implies and committing to an arrival-time test; calling the students 'just unmotivated' is the near-zero dodge, and a sympathetic but non-committal answer that names no mechanism or test scores low.",
  },
];

export const section: SectionContent = {
  slug: "anomaly-cluster",
  title: "The Anomaly Cluster",
  weekNumber: 1,
  blurb:
    "When outliers stop being scattered and start rhyming, the cluster isn't noise to delete — it's the blueprint of a better model waiting to be built and tested.",
  lectureTitle:
    "1.6 The Anomaly Cluster: treat repeated outliers as the seed of a better model",
  body: `# The Anomaly Cluster

One weird data point is a shrug. A *cluster* of weird data points — outliers that repeat, that share a feature, that rhyme — is a message. Constructive Critical Reasoning treats a patterned cluster of anomalies as the single richest clue you can get: it is the seed of a better model than the one you currently hold. The mistake CCR exists to cure is reflexively filing the cluster under "noise," "error," or "bad luck" and moving on.

## One outlier is noise; a cluster is signal

The difference between noise and signal is *structure*. Random measurement error scatters everywhere with no pattern. But when the outliers concentrate — same supplier, same time of day, same browser, same shelf, same intersection — that concentration is doing work. Noise doesn't organize itself. If your "errors" keep landing in the same place, your model, not the data, is what's broken.

## The dodge that throws away discoveries

The tempting move is to say "instruments glitch," "people are unpredictable," "things fail sometimes." Each is true in general and lethal in particular, because it lets you delete the exact data that would have upgraded your understanding. Penicillin, pulsars, the ozone hole, and countless product bugs were all first dismissed as artifacts. In CCR, writing off a patterned cluster with no investigation earns essentially zero credit — it is refusal disguised as rigor.

## The constructive move: build the model the cluster implies

Instead of deleting the anomalies, ask: *what would have to be true for these specific points to cluster exactly this way?* That question hands you a candidate model. Six failures all from one week's batch imply a process fault that week. Crashes only on near-full phones imply storage exhaustion. The cluster's shared features *are* the variables of your new model. Name the mechanism out loud and commit to it.

## Then expose it to a clean test

A model that merely re-describes the cluster is cheap. The top-credit move pairs the new model with a falsifiable test — ideally the *cheapest* observation that would separate your model from its closest rival. Swab the one filling head. Shield the sun-struck sensor. Reproduce the download on a full phone. A good test names in advance the result that would *refute* you. That is what turns a hunch about a cluster into knowledge.

## Don't overreach past what clusters

Committing hard does not mean inventing drama. The data also defeats claims it doesn't support: if failures are driver-independent, blaming a lazy driver is overreach; if the cluster is confined to afternoons, a 24-hour cause is wrong. Bind exactly what clusters — no more, no less — and let the shared features draw the boundary of your claim.

## In the real world

A hospital's medication errors were rare, so leadership called them "unavoidable." A CCR-minded nurse looked closer: the wrong-dose incidents weren't scattered — they all involved one drug, all on the night shift, all entered through a new screen layout. That triple cluster seeded a model: the redesigned screen makes that drug's dose easy to misread in low light. She tested it the cheap way — watching night staff enter that drug on the new layout — and caught them misreading a cramped dose field every time. Reverting the layout ended the errors. The "unavoidable mistakes" story would have buried a fixable design flaw; the cluster, read as signal, handed over the cure.`,
  homework: {
    mcq,
    hybrid,
    written,
  },
};
