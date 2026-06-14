import type {
  SectionContent,
  HomeworkItem,
  McOption,
  WrittenRubric,
} from "./types";

const mcq: HomeworkItem[] = [
  {
    itemType: "mc",
    prompt:
      "An online store changes its checkout button from gray to orange. Over the next month, completed purchases rise from 4.0% to 4.9% of visitors, traffic and prices are unchanged, and no other edits shipped. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Conversion outcomes can swing for all kinds of reasons, so it's hard to say anything firm here.",
        credit: 0,
      },
      {
        text: "The orange button raised checkout completion by roughly a fifth; predict that reverting to gray drops conversion back toward 4.0%, and run a 50/50 split to confirm.",
        credit: 1.0,
      },
      {
        text: "The orange button likely helped conversion; we'd expect a fresh test to show some lift.",
        credit: 0.6,
      },
      {
        text: "There may be a small relationship between the button color and purchases worth keeping an eye on.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "The orange button raised checkout completion by roughly a fifth; predict that reverting to gray drops conversion back toward 4.0%, and run a 50/50 split to confirm.",
    explanation:
      "With traffic, price, and everything else held fixed, the bold-but-bounded claim (a ~20% lift, refutable by reverting) is exactly what the data supports. The vague 'hard to say anything' is the vacuous hedge CCR penalizes.",
  },
  {
    itemType: "mc",
    prompt:
      "A runner adds one weekly hill-sprint session. Across eight weeks her 5K time drops from 24:10 to 22:40, her mileage and diet are steady, and the only training change was the hills. Which conclusion best follows?",
    mcOptions: [
      {
        text: "The hill sprints cure every endurance plateau and will keep cutting 90 seconds every eight weeks indefinitely.",
        credit: 0,
      },
      {
        text: "The hills probably contributed to her faster 5K; more time would tell us how much.",
        credit: 0.6,
      },
      {
        text: "The weekly hill sprints drove most of the 90-second 5K improvement; predict that dropping them for a month stalls or reverses her progress, while keeping them holds the gain.",
        credit: 1.0,
      },
      {
        text: "Her running seems to be trending in a positive direction overall.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "The weekly hill sprints drove most of the 90-second 5K improvement; predict that dropping them for a month stalls or reverses her progress, while keeping them holds the gain.",
    explanation:
      "The data supports a strong causal claim with a clean reversal test, not the reckless 'cures every plateau forever' overreach, which the single eight-week window cannot back.",
  },
  {
    itemType: "mc",
    prompt:
      "A small bakery starts posting one short video of fresh loaves each morning at 7am. Foot traffic before 10am climbs from about 30 to 55 customers daily, weekends excluded, with no menu, price, or location change. Which conclusion best follows?",
    mcOptions: [
      {
        text: "The morning videos nearly doubled early foot traffic; predict that skipping them for two weeks pulls morning customers back toward 30, and resuming restores the bump.",
        credit: 1.0,
      },
      {
        text: "Customer behavior is influenced by countless factors, so attributing the rise to the videos would be premature.",
        credit: 0,
      },
      {
        text: "The videos seem to be doing something positive for the morning crowd.",
        credit: 0.3,
      },
      {
        text: "The morning videos likely boosted early traffic; tracking another month would sharpen the estimate.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "The morning videos nearly doubled early foot traffic; predict that skipping them for two weeks pulls morning customers back toward 30, and resuming restores the bump.",
    explanation:
      "Nothing else changed, so the bold on/off-testable claim is fully supported. 'Countless factors, premature to attribute' is the timid refusal that earns zero under CCR.",
  },
  {
    itemType: "mc",
    prompt:
      "A clinic switches its appointment reminders from email to text. Over three months, no-show rates fall from 18% to 9%, patient volume is flat, and staffing and hours are unchanged. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Text reminders roughly halved no-shows; predict that a randomized group kept on email-only stays near 18% while the text group holds near 9%.",
        credit: 1.0,
      },
      {
        text: "Switching to text seems to have helped attendance; a longer look would confirm it.",
        credit: 0.6,
      },
      {
        text: "Text reminders will eliminate no-shows entirely once every patient opts in.",
        credit: 0,
      },
      {
        text: "There appears to be some connection between the reminder method and attendance.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "Text reminders roughly halved no-shows; predict that a randomized group kept on email-only stays near 18% while the text group holds near 9%.",
    explanation:
      "The halving is supported and the randomized hold-out is a clean refutation test. 'Eliminate no-shows entirely' is the reckless overreach the 9% floor already defeats.",
  },
  {
    itemType: "mc",
    prompt:
      "A teacher introduces a five-minute recap quiz at the start of each class. Unit-test averages rise from 71 to 80 across two units, the same teacher and textbook are used, and attendance is steady. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Test scores depend on so many things that singling out the recap quizzes isn't really defensible.",
        credit: 0,
      },
      {
        text: "The opening recap quizzes lifted unit-test averages about nine points; predict that a parallel class without them stays near 71 while this class holds near 80.",
        credit: 1.0,
      },
      {
        text: "The recap quizzes probably helped scores; another unit would make the size clearer.",
        credit: 0.6,
      },
      {
        text: "Something about the new routine may be nudging scores upward.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "The opening recap quizzes lifted unit-test averages about nine points; predict that a parallel class without them stays near 71 while this class holds near 80.",
    explanation:
      "Same teacher and book make the nine-point claim plus a no-quiz comparison class fully supported; the 'too many things to defend' line is the vacuous hedge.",
  },
  {
    itemType: "mc",
    prompt:
      "A warehouse reorganizes its most-picked items to shelves near the packing station. Average order-pick time drops from 6.2 to 4.5 minutes, order mix and headcount are unchanged, and no new equipment arrived. Which conclusion best follows?",
    mcOptions: [
      {
        text: "There's possibly some efficiency effect from the new layout.",
        credit: 0.3,
      },
      {
        text: "Moving popular items near packing cut pick time by about 27%; predict that shuffling them back to distant shelves returns times toward 6.2 minutes.",
        credit: 1.0,
      },
      {
        text: "The relayout probably sped up picking; timing more shifts would firm up the figure.",
        credit: 0.6,
      },
      {
        text: "This layout proves proximity is the only lever that ever matters for warehouse speed.",
        credit: 0,
      },
    ],
    correctAnswer:
      "Moving popular items near packing cut pick time by about 27%; predict that shuffling them back to distant shelves returns times toward 6.2 minutes.",
    explanation:
      "The bounded 27% claim with a reversal test fits the controlled change. 'The only lever that ever matters' is an overreach one relayout cannot establish.",
  },
  {
    itemType: "mc",
    prompt:
      "A SaaS team adds an in-app onboarding tour. Among new signups, week-one feature adoption rises from 22% to 35%, signup sources and pricing are constant, and the tour is the lone change. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Adoption metrics fluctuate, so it would be unwise to credit the tour for the change.",
        credit: 0,
      },
      {
        text: "The onboarding tour seems linked to higher early adoption.",
        credit: 0.3,
      },
      {
        text: "The tour likely raised week-one adoption; a follow-up cohort would confirm the lift.",
        credit: 0.6,
      },
      {
        text: "The onboarding tour raised week-one adoption by about 13 points; predict that withholding it from a random half of new signups keeps them near 22% while the tour group holds near 35%.",
        credit: 1.0,
      },
    ],
    correctAnswer:
      "The onboarding tour raised week-one adoption by about 13 points; predict that withholding it from a random half of new signups keeps them near 22% while the tour group holds near 35%.",
    explanation:
      "The single change supports a specific, refutable lift claim plus a withhold test. 'Metrics fluctuate, unwise to credit it' is the timid dodge CCR exists to cure.",
  },
  {
    itemType: "mc",
    prompt:
      "A gym moves its busiest spin class from 6pm to 6am. Average class attendance jumps from 12 to 22 people, membership totals are flat, and the instructor and playlist stay the same. Which conclusion best follows?",
    mcOptions: [
      {
        text: "The 6am slot nearly doubled spin attendance for this class; predict that moving it back to 6pm drops attendance toward 12 again.",
        credit: 1.0,
      },
      {
        text: "The earlier time probably helped turnout; running both slots a while would clarify.",
        credit: 0.6,
      },
      {
        text: "Morning classes are universally better attended than evening ones across all gyms.",
        credit: 0,
      },
      {
        text: "The time change may have some bearing on who shows up.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "The 6am slot nearly doubled spin attendance for this class; predict that moving it back to 6pm drops attendance toward 12 again.",
    explanation:
      "One class's data backs a bold reversal-testable claim about that class, not the sweeping 'universally better across all gyms' generalization the single case cannot support.",
  },
  {
    itemType: "mc",
    prompt:
      "A support team starts answering chats with a one-line acknowledgment within 30 seconds before the full reply. Customer satisfaction scores climb from 3.8 to 4.4 of 5, ticket volume and staffing are unchanged, and nothing else in the workflow moved. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Satisfaction is shaped by mood and many hidden variables, so the acknowledgment's role can't really be isolated.",
        credit: 0,
      },
      {
        text: "There seems to be a positive shift tied to the new greeting.",
        credit: 0.3,
      },
      {
        text: "The fast acknowledgment raised satisfaction by about 0.6 points; predict that pausing it for a week pulls scores back toward 3.8 while resuming restores 4.4.",
        credit: 1.0,
      },
      {
        text: "The quick acknowledgment probably improved satisfaction; more weeks of data would help.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "The fast acknowledgment raised satisfaction by about 0.6 points; predict that pausing it for a week pulls scores back toward 3.8 while resuming restores 4.4.",
    explanation:
      "With workflow held fixed, the specific 0.6-point on/off claim is supported and refutable. 'Can't really be isolated' is the vacuous hedge that scores zero.",
  },
  {
    itemType: "mc",
    prompt:
      "A city adds a protected bike lane on one corridor. Cyclist counts on that corridor double over a season, weather is typical, and no adjacent route changed. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Travel patterns shift for endless reasons, so the lane shouldn't be credited yet.",
        credit: 0,
      },
      {
        text: "The protected lane roughly doubled cycling on that corridor; predict that a comparable unimproved corridor shows no such jump over the same season.",
        credit: 1.0,
      },
      {
        text: "The new lane likely encouraged more cycling there; comparing more corridors would sharpen it.",
        credit: 0.6,
      },
      {
        text: "Cycling appears to be a bit more popular on that street now.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "The protected lane roughly doubled cycling on that corridor; predict that a comparable unimproved corridor shows no such jump over the same season.",
    explanation:
      "The doubling plus a control-corridor comparison is the boldest falsifiable claim the data backs; 'endless reasons, don't credit it' is the refusal CCR penalizes.",
  },
  {
    itemType: "mc",
    prompt:
      "A subscription box adds a 'pause instead of cancel' button on its cancellation page. Monthly churn falls from 7% to 4.5%, acquisition and pricing are flat, and the button is the only change. Which conclusion best follows?",
    mcOptions: [
      {
        text: "The pause button will end churn for good once enough members discover it.",
        credit: 0,
      },
      {
        text: "Adding the pause option cut churn by roughly a third; predict that hiding it again pushes churn back toward 7%.",
        credit: 1.0,
      },
      {
        text: "The pause option probably reduced churn; another quarter would confirm the effect.",
        credit: 0.6,
      },
      {
        text: "There may be some churn benefit from the new button.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "Adding the pause option cut churn by roughly a third; predict that hiding it again pushes churn back toward 7%.",
    explanation:
      "The one-third reduction with a hide-it reversal test is supported; 'end churn for good' is the reckless overreach the persistent 4.5% already defeats.",
  },
  {
    itemType: "mc",
    prompt:
      "A restaurant prints its three highest-margin dishes in a boxed section at the top of the menu. Those dishes' share of orders rises from 15% to 26% over a month, total covers are steady, and no recipe or price changed. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Diners choose food for many personal reasons, so the menu box can't be pinned as the cause.",
        credit: 0,
      },
      {
        text: "The boxed placement raised those dishes' order share by about 11 points; predict that removing the box returns their share toward 15%.",
        credit: 1.0,
      },
      {
        text: "Highlighting those dishes seems to have nudged orders their way.",
        credit: 0.3,
      },
      {
        text: "The box probably increased orders of those dishes; testing another menu would help confirm.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "The boxed placement raised those dishes' order share by about 11 points; predict that removing the box returns their share toward 15%.",
    explanation:
      "Stable covers and unchanged recipes back the specific share claim and removal test; 'can't be pinned as the cause' is the timid hedge that earns nothing.",
  },
  {
    itemType: "mc",
    prompt:
      "A factory installs brighter LED lighting on one assembly line. Defect rates on that line drop from 3.1% to 1.8% over six weeks, the crew and parts are unchanged, and the other lines keep their old lighting and old defect rates. Which conclusion best follows?",
    mcOptions: [
      {
        text: "There seems to be a slight quality improvement on that line.",
        credit: 0.3,
      },
      {
        text: "The brighter lighting cut that line's defect rate by roughly 40%; predict that restoring the old lighting raises defects back toward 3.1% while the upgraded lighting holds them near 1.8%.",
        credit: 1.0,
      },
      {
        text: "The new lighting probably reduced defects there; more weeks would tighten the number.",
        credit: 0.6,
      },
      {
        text: "Brighter lighting guarantees near-zero defects on any production line anywhere.",
        credit: 0,
      },
    ],
    correctAnswer:
      "The brighter lighting cut that line's defect rate by roughly 40%; predict that restoring the old lighting raises defects back toward 3.1% while the upgraded lighting holds them near 1.8%.",
    explanation:
      "The unchanged lines act as a built-in control, so the 40% reversal-testable claim is fully supported; 'guarantees near-zero on any line anywhere' is the overreach the data can't reach.",
  },
  {
    itemType: "mc",
    prompt:
      "An author switches her newsletter send time from Monday noon to Saturday morning. Open rates rise from 28% to 41% over ten issues, subscriber count and subject-line style are unchanged. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Email engagement is notoriously noisy, so reading anything into this shift would be a stretch.",
        credit: 0,
      },
      {
        text: "The Saturday-morning slot raised open rates by about 13 points; predict that switching back to Monday noon pulls opens toward 28% again.",
        credit: 1.0,
      },
      {
        text: "The new send time probably improved opens; alternating times would confirm it.",
        credit: 0.6,
      },
      {
        text: "The timing change may be having some effect on opens.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "The Saturday-morning slot raised open rates by about 13 points; predict that switching back to Monday noon pulls opens toward 28% again.",
    explanation:
      "Ten issues with style and list held constant support a bold, reversible claim; 'notoriously noisy, a stretch to read anything' is the vacuous refusal scored at zero.",
  },
  {
    itemType: "mc",
    prompt:
      "A hospital ward adopts a two-minute hand-hygiene checklist at every shift change. Healthcare-associated infections on that ward fall from 11 to 4 per month over a quarter, patient acuity and bed count are unchanged, and a matched ward without the checklist stays near 10. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Infection counts bounce around month to month, so the checklist's effect is anyone's guess.",
        credit: 0,
      },
      {
        text: "The checklist appears to coincide with fewer infections.",
        credit: 0.3,
      },
      {
        text: "The hand-hygiene checklist roughly cut this ward's infections by two-thirds; predict that dropping it lets infections climb back toward 10–11 while the matched ward stays put.",
        credit: 1.0,
      },
      {
        text: "The checklist probably reduced infections; a longer span would confirm the size.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "The hand-hygiene checklist roughly cut this ward's infections by two-thirds; predict that dropping it lets infections climb back toward 10–11 while the matched ward stays put.",
    explanation:
      "The matched ward is a control that licenses the bold two-thirds claim plus a removal test; 'anyone's guess' wastes the very evidence that pins the effect.",
  },
];

const hybrid: HomeworkItem[] = [
  {
    itemType: "hybrid",
    prompt:
      "A coffee subscription emails a 10%-off code only to customers who haven't ordered in 60 days. Of those emailed, 18% reorder within a week versus a usual 5% reactivation rate for similar lapsed customers; nothing else in the program changed. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Lapsed customers come back for many reasons, so the discount email can't be credited.",
        credit: 0,
      },
      {
        text: "The 10%-off email roughly tripled reactivation among lapsed customers; predict that a randomized lapsed group left un-emailed stays near 5% while the emailed group holds near 18%.",
        credit: 1.0,
      },
      {
        text: "The discount email likely lifted reactivation; another send would confirm the size.",
        credit: 0.6,
      },
      {
        text: "The email may have some reactivating effect.",
        credit: 0.3,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your model from its closest rival (the discount itself vs. merely being contacted), and say what result would refute your model.",
      modelAnswer:
        "Send a no-discount reminder email to a third random group; if they reactivate near 18% too, the lift is from contact, not the discount, refuting my discount-driven model. If the no-discount group sticks near 5% while the 10%-off group hits 18%, the discount is the cause.",
      yieldAnchors: [
        "18% reorder vs. a 5% baseline reactivation",
        "the offer went only to 60-day-lapsed customers",
        "nothing else in the program changed",
      ],
      riskAnchors: [
        "an un-emailed random lapsed group stays near 5%",
        "a no-discount reminder group separates the discount effect from the contact effect",
      ],
      defeatedBy: [
        "claiming the email permanently retains these customers",
        "claiming all lapsed customers will reactivate if emailed",
        "claiming nothing can be concluded from the gap",
      ],
    },
    correctAnswer:
      "The 10%-off email roughly tripled reactivation among lapsed customers; predict that a randomized lapsed group left un-emailed stays near 5% while the emailed group holds near 18%.",
    explanation:
      "Top credit names the tripling AND a control that could disconfirm it; the committed, cheap distinguishing test in the follow-up shows boldness calibrated to evidence, not the 'can't be credited' dodge.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A youth soccer coach adds 10 minutes of juggling drills to each practice. Over a season, his team's average touches-before-turnover in games rises from 2.1 to 3.4, the roster is stable, and no other drill changed. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Juggling drills will turn any team into champions regardless of talent.",
        credit: 0,
      },
      {
        text: "The juggling probably improved ball control; more seasons would clarify.",
        credit: 0.6,
      },
      {
        text: "The juggling drills lifted in-game ball control by about 1.3 touches; predict that a comparable team without the drills shows no such rise over the same season.",
        credit: 1.0,
      },
      {
        text: "The drills seem to have some link to better control.",
        credit: 0.3,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your model from the rival 'they just matured over the season,' and say what result would refute your model.",
      modelAnswer:
        "Compare to a same-age control team that didn't add juggling; if both teams gain ~1.3 touches, natural maturation explains it and my drill model is refuted. If only the juggling team improves while the control stays near 2.1, the drills are doing the work.",
      yieldAnchors: [
        "touches-before-turnover rose from 2.1 to 3.4",
        "the roster stayed stable",
        "only the juggling drill was added",
      ],
      riskAnchors: [
        "a comparable no-juggling team shows no rise",
        "removing the drills next season stalls the gain",
      ],
      defeatedBy: [
        "claiming juggling makes any team champions regardless of talent",
        "claiming the data can't support any conclusion",
        "claiming the gain will compound by 1.3 every season",
      ],
    },
    correctAnswer:
      "The juggling drills lifted in-game ball control by about 1.3 touches; predict that a comparable team without the drills shows no such rise over the same season.",
    explanation:
      "The control-team prediction makes the bold claim falsifiable and matches the data; the 'turn any team into champions' option is the reckless overreach that costs everything.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A bookstore moves its staff-recommendation table from the back to the entrance. Sales of recommended titles rise from 9 to 17 copies per day, total store traffic is unchanged, and the recommendations themselves are the same titles. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Book sales depend on taste and mood, so the table's move shouldn't be singled out.",
        credit: 0,
      },
      {
        text: "Moving the table to the entrance roughly doubled recommended-title sales; predict that returning it to the back drops those sales toward 9 per day.",
        credit: 1.0,
      },
      {
        text: "The new location probably boosted those sales; watching another week would help.",
        credit: 0.6,
      },
      {
        text: "The table's position may matter a little for sales.",
        credit: 0.3,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your model from 'the titles themselves got more popular this week,' and say what result would refute your model.",
      modelAnswer:
        "Check whether the same titles sold elsewhere (online or at other branches) also doubled; if they did, broader popularity explains it and my placement model is refuted. If only the in-store entrance copies doubled while the same titles were flat elsewhere, the location move is the cause.",
      yieldAnchors: [
        "recommended-title sales rose from 9 to 17 per day",
        "total store traffic was unchanged",
        "the recommended titles were the same",
      ],
      riskAnchors: [
        "returning the table to the back drops sales toward 9",
        "the same titles stay flat in other sales channels",
      ],
      defeatedBy: [
        "claiming entrance placement doubles sales of every product",
        "claiming nothing can be singled out as the cause",
        "claiming the move will keep doubling sales each week",
      ],
    },
    correctAnswer:
      "Moving the table to the entrance roughly doubled recommended-title sales; predict that returning it to the back drops those sales toward 9 per day.",
    explanation:
      "Unchanged traffic and identical titles support the doubling claim with a reversal test; 'taste and mood, don't single it out' is the hedge that abandons usable evidence.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A remote team switches from open-ended meetings to strict 25-minute agendas. Self-reported 'meeting felt productive' ratings rise from 55% to 78% over six weeks, the same people attend, and meeting frequency is unchanged. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Productivity feelings vary with mood, so the agenda change can't be held responsible.",
        credit: 0,
      },
      {
        text: "There seems to be a more positive vibe about meetings now.",
        credit: 0.3,
      },
      {
        text: "The 25-minute agendas raised 'felt productive' ratings by about 23 points; predict that reverting to open-ended meetings pulls ratings back toward 55%.",
        credit: 1.0,
      },
      {
        text: "The agendas probably improved how meetings feel; more weeks would confirm.",
        credit: 0.6,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your model from 'people are just rating everything higher lately,' and say what result would refute your model.",
      modelAnswer:
        "Check whether ratings of non-meeting items (e.g., the same team's project satisfaction) also rose; if everything went up equally, a general optimism shift explains it and my agenda model is refuted. If only meeting ratings jumped while other ratings held flat, the agendas drove the change.",
      yieldAnchors: [
        "'felt productive' rose from 55% to 78%",
        "the same attendees and frequency held",
        "the agenda format was the only change",
      ],
      riskAnchors: [
        "reverting to open-ended meetings pulls ratings back toward 55%",
        "non-meeting ratings stayed flat over the same window",
      ],
      defeatedBy: [
        "claiming agendas make meetings universally loved forever",
        "claiming feelings vary too much to conclude anything",
        "claiming ratings will keep rising 23 points each cycle",
      ],
    },
    correctAnswer:
      "The 25-minute agendas raised 'felt productive' ratings by about 23 points; predict that reverting to open-ended meetings pulls ratings back toward 55%.",
    explanation:
      "Held-constant attendance and cadence support the specific lift and a reversal test; 'can't be held responsible' is the vacuous hedge CCR docks to zero.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A houseplant owner moves a struggling fern from a north window to an east window. Over three weeks it puts out six new fronds after months of none, watering and pot are unchanged, and nothing else moved. Which conclusion best follows?",
    mcOptions: [
      {
        text: "The east window roughly restarted the fern's growth; predict that moving it back to the north window stalls new fronds again while the east window sustains them.",
        credit: 1.0,
      },
      {
        text: "The light change probably helped; watching longer would confirm.",
        credit: 0.6,
      },
      {
        text: "Plant growth is complicated, so we can't tie the new fronds to the window at all.",
        credit: 0,
      },
      {
        text: "The new spot may be doing the fern some good.",
        credit: 0.3,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your light model from 'the fern was about to recover anyway,' and say what result would refute your model.",
      modelAnswer:
        "Move it back to the north window for two weeks; if it keeps producing fronds there, recovery was already underway and my light model is refuted. If growth stalls at the north window and resumes when returned east, light is the driver.",
      yieldAnchors: [
        "six new fronds after months of none",
        "watering and pot unchanged",
        "only the window location changed",
      ],
      riskAnchors: [
        "returning it north stalls new fronds",
        "moving it back east resumes growth",
      ],
      defeatedBy: [
        "claiming east light revives any dying plant",
        "claiming growth is too complicated to attribute at all",
        "claiming it will produce six fronds every three weeks indefinitely",
      ],
    },
    correctAnswer:
      "The east window roughly restarted the fern's growth; predict that moving it back to the north window stalls new fronds again while the east window sustains them.",
    explanation:
      "The clean before/after with a reversal test supports the bold light claim; 'too complicated to tie it to the window' throws away the very contrast that explains the fronds.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A call center scripts a 15-second empathy opener for billing complaints. Repeat-call rates on billing issues fall from 24% to 14% over two months, call volume and agent roster are stable, and other issue types keep their old repeat rates. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Caller behavior has too many drivers to credit the opener for the drop.",
        credit: 0,
      },
      {
        text: "The empathy opener cut billing repeat-calls by about 10 points; predict that dropping the opener pushes billing repeats back toward 24% while other issue types stay unchanged.",
        credit: 1.0,
      },
      {
        text: "The opener probably reduced repeat calls; a longer window would confirm.",
        credit: 0.6,
      },
      {
        text: "The script may have some calming effect on callers.",
        credit: 0.3,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your model from 'billing problems just happened to ease this quarter,' and say what result would refute your model.",
      modelAnswer:
        "The unchanged repeat rates on non-billing issues already act as a control; if billing repeats stay near 14% even after removing the opener, an external easing explains it and my model is refuted. If removing the opener sends billing repeats back toward 24% while other types hold, the opener is the cause.",
      yieldAnchors: [
        "billing repeat-calls fell from 24% to 14%",
        "other issue types kept their old repeat rates",
        "volume and roster stayed stable",
      ],
      riskAnchors: [
        "removing the opener returns billing repeats toward 24%",
        "non-billing issue types stay flat throughout",
      ],
      defeatedBy: [
        "claiming the opener fixes every kind of repeat call",
        "claiming too many drivers exist to conclude anything",
        "claiming repeat calls will fall another 10 points each quarter",
      ],
    },
    correctAnswer:
      "The empathy opener cut billing repeat-calls by about 10 points; predict that dropping the opener pushes billing repeats back toward 24% while other issue types stay unchanged.",
    explanation:
      "The flat non-billing rates are a built-in control that licenses the bold, targeted claim; 'too many drivers to credit it' ignores that control and earns zero.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A blogger adds a clear table of contents to her long posts. Average time-on-page rises from 1:40 to 2:55 and scroll-to-bottom rates double, traffic sources are unchanged, and the post text is otherwise identical. Which conclusion best follows?",
    mcOptions: [
      {
        text: "A table of contents guarantees viral traffic for any article.",
        credit: 0,
      },
      {
        text: "Readers seem to be sticking around a bit more.",
        credit: 0.3,
      },
      {
        text: "The added contents probably improved engagement; more posts would confirm.",
        credit: 0.6,
      },
      {
        text: "The table of contents lengthened time-on-page and doubled deep scrolls; predict that removing it from a random half of posts drops their time-on-page back toward 1:40.",
        credit: 1.0,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your model from 'these particular posts were just more interesting,' and say what result would refute your model.",
      modelAnswer:
        "Add and remove the table of contents on the same posts in alternating weeks; if engagement is flat regardless, post quality not the TOC explains it and my model is refuted. If time-on-page rises only in the TOC weeks, the table of contents is doing the work.",
      yieldAnchors: [
        "time-on-page rose from 1:40 to 2:55",
        "scroll-to-bottom rates doubled",
        "traffic sources and post text were unchanged",
      ],
      riskAnchors: [
        "removing the TOC from random posts drops their time-on-page",
        "the same posts show lower engagement in non-TOC weeks",
      ],
      defeatedBy: [
        "claiming a TOC guarantees viral traffic for any article",
        "claiming engagement metrics can't be attributed at all",
        "claiming time-on-page will keep doubling with each tweak",
      ],
    },
    correctAnswer:
      "The table of contents lengthened time-on-page and doubled deep scrolls; predict that removing it from a random half of posts drops their time-on-page back toward 1:40.",
    explanation:
      "Identical text and stable sources support the bold engagement claim with a withhold test; 'guarantees viral traffic' is the overreach the data nowhere supports.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A pharmacy stations a pharmacist by the flu-shot sign-up desk during peak hours. Daily flu-shot uptake rises from 12 to 21 shots, walk-in volume is unchanged, and the only change is the staffed desk. Which conclusion best follows?",
    mcOptions: [
      {
        text: "The staffed desk lifted daily flu shots by about three-quarters; predict that leaving the desk unstaffed on alternating days drops uptake toward 12 on those days.",
        credit: 1.0,
      },
      {
        text: "Staffing the desk probably increased shots; tracking more days would help.",
        credit: 0.6,
      },
      {
        text: "People get vaccinated for countless reasons, so the desk can't be credited.",
        credit: 0,
      },
      {
        text: "The staffed desk may encourage a few more sign-ups.",
        credit: 0.3,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your staffing model from 'flu-shot demand simply rose seasonally,' and say what result would refute your model.",
      modelAnswer:
        "Alternate staffed and unstaffed days within the same week; if uptake stays near 21 on unstaffed days, seasonal demand explains it and my model is refuted. If uptake drops to ~12 on unstaffed days and rebounds when staffed, the desk is the driver.",
      yieldAnchors: [
        "daily uptake rose from 12 to 21 shots",
        "walk-in volume was unchanged",
        "the staffed desk was the only change",
      ],
      riskAnchors: [
        "unstaffed alternating days drop toward 12 shots",
        "staffed days rebound to ~21 in the same week",
      ],
      defeatedBy: [
        "claiming a staffed desk maximizes uptake of every service",
        "claiming uptake can't be credited to anything",
        "claiming shots will keep rising 75% each period",
      ],
    },
    correctAnswer:
      "The staffed desk lifted daily flu shots by about three-quarters; predict that leaving the desk unstaffed on alternating days drops uptake toward 12 on those days.",
    explanation:
      "Unchanged walk-ins and a lone change support the bold lift with an alternating-day test; 'countless reasons, can't credit it' is the refusal that wastes the evidence.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A landlord installs smart thermostats in half of identical apartment units. Over a cold quarter, equipped units use 22% less heating energy than the unequipped units, occupancy and weather exposure are matched, and tenants weren't told which group they were in. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Energy use depends on tenant habits, so the thermostats can't be assigned the savings.",
        credit: 0,
      },
      {
        text: "The thermostats may trim energy use somewhat.",
        credit: 0.3,
      },
      {
        text: "The smart thermostats cut heating energy by about 22% in equipped units; predict that swapping them into the other units cuts their use similarly while removing them erases the gap.",
        credit: 1.0,
      },
      {
        text: "The thermostats probably saved energy; another quarter would firm it up.",
        credit: 0.6,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your model from 'the equipped units happened to have thriftier tenants,' and say what result would refute your model.",
      modelAnswer:
        "Cross over: install thermostats in the previously-unequipped units next quarter; if their savings appear too, the device not tenant type drives it, supporting my model. If the original equipped units keep saving even after their thermostats are removed, tenant habits explain it and my model is refuted.",
      yieldAnchors: [
        "equipped units used 22% less heating energy",
        "occupancy and weather exposure were matched",
        "tenants were blind to their group",
      ],
      riskAnchors: [
        "crossing the thermostats to the other units reproduces the savings",
        "removing the thermostats erases the 22% gap",
      ],
      defeatedBy: [
        "claiming smart thermostats cut all utility costs to zero",
        "claiming habits make the savings impossible to assign",
        "claiming the savings will grow to 22% more each quarter",
      ],
    },
    correctAnswer:
      "The smart thermostats cut heating energy by about 22% in equipped units; predict that swapping them into the other units cuts their use similarly while removing them erases the gap.",
    explanation:
      "Matched, blinded units make the 22% claim plus a crossover test the boldest falsifiable reading; 'tenant habits, can't assign it' ignores the matching and scores zero.",
  },
];

const written: HomeworkItem[] = [
  {
    itemType: "written",
    prompt:
      "A bookstore café notices that on the four Saturdays it ran a free-sample tray of a new pastry, that pastry sold 40 units a day versus 9 units a day on the four Saturdays without a tray. Staffing, price, and store traffic were the same across all eight Saturdays, and no other promotion ran. In one paragraph, state the strongest claim the data supports about the sample tray and describe how you would test it.",
    writtenRubric: {
      prompt: undefined,
      modelAnswer:
        "The free-sample tray roughly quadrupled daily sales of the new pastry (40 vs. 9 units) with traffic, price, and staffing held constant, so the tray is very likely the cause of the lift. I would test this by randomizing the tray on/off across the next eight Saturdays: my model predicts ~40 units on tray days and ~9 on no-tray days, and it would be refuted if no-tray days also reach ~40, which would point to something other than the tray.",
      yieldAnchors: [
        "40 units/day with tray vs. 9 without",
        "staffing, price, and traffic identical across all eight Saturdays",
        "no other promotion ran",
        "the pattern repeated across four tray and four no-tray days",
      ],
      riskAnchors: [
        "randomized tray on/off yields ~40 vs. ~9 units",
        "no-tray Saturdays stay near 9 units",
      ],
      defeatedBy: [
        "claiming the tray will quadruple sales of every item in the store",
        "claiming nothing can be concluded because tastes vary",
        "claiming sales will keep multiplying each week the tray runs",
      ],
    },
    correctAnswer:
      "The free-sample tray roughly quadrupled daily sales of the new pastry (40 vs. 9 units) with traffic, price, and staffing held constant, so the tray is very likely the cause of the lift. I would test this by randomizing the tray on/off across the next eight Saturdays: my model predicts ~40 units on tray days and ~9 on no-tray days, and it would be refuted if no-tray days also reach ~40, which would point to something other than the tray.",
    explanation:
      "Top answers commit to the bold quadrupling and a clean on/off test; a cautious 'tastes vary, can't conclude' scores near zero, and a florid restatement that binds none of the numbers scores low.",
  },
  {
    itemType: "written",
    prompt:
      "A physical therapist gives half her knee-rehab patients a printed daily exercise sheet and the other half verbal instructions only; assignment was by alternating intake order. After six weeks, the printed-sheet group regained an average of 22 degrees of knee flexion versus 13 degrees for the verbal-only group, with similar starting injuries and session counts. In one paragraph, state the strongest claim the data supports and how you would test it.",
    writtenRubric: {
      prompt: undefined,
      modelAnswer:
        "The printed sheet likely caused the extra recovery, adding roughly 9 degrees of flexion over six weeks (22 vs. 13) given matched injuries and session counts. I would test it by randomly assigning the printed sheet in a larger group and tracking home-exercise adherence: my model predicts the sheet group again gains ~9 more degrees and reports higher adherence, and it is refuted if adherence and flexion gains come out equal across groups.",
      yieldAnchors: [
        "printed-sheet group gained 22 degrees vs. 13 for verbal-only",
        "similar starting injuries",
        "similar session counts",
      ],
      riskAnchors: [
        "a randomized sheet group again gains ~9 more degrees",
        "the sheet group shows higher home-exercise adherence",
      ],
      defeatedBy: [
        "claiming printed sheets fully restore every patient's knee",
        "claiming recovery has too many factors to attribute anything",
        "claiming the 9-degree gap will widen indefinitely",
      ],
    },
    correctAnswer:
      "The printed sheet likely caused the extra recovery, adding roughly 9 degrees of flexion over six weeks (22 vs. 13) given matched injuries and session counts. I would test it by randomly assigning the printed sheet in a larger group and tracking home-exercise adherence: my model predicts the sheet group again gains ~9 more degrees and reports higher adherence, and it is refuted if adherence and flexion gains come out equal across groups.",
    explanation:
      "The bold-but-bounded 9-degree claim with a randomized adherence test wins; 'too many factors to attribute anything' is the timid dodge and an over-claim of full restoration is the overreach the data defeats.",
  },
  {
    itemType: "written",
    prompt:
      "A city pilots a 20 mph speed limit on one residential corridor for six months. Reported crashes there fall from 14 to 5 versus the prior comparable half-year, traffic counts are unchanged, and three similar corridors that kept 30 mph limits saw no change in their crash numbers. In one paragraph, state the strongest claim the data supports and how you would test it further.",
    writtenRubric: {
      prompt: undefined,
      modelAnswer:
        "The 20 mph limit very likely caused the crash drop on that corridor, cutting reported crashes by roughly two-thirds (14 to 5) while three matched 30 mph corridors held flat, which rules out a citywide trend. I would test it further by extending the limit to one of the control corridors: my model predicts its crashes fall similarly, and it is refuted if its crashes stay flat or the pilot corridor's crashes climb back to ~14 despite keeping 20 mph.",
      yieldAnchors: [
        "crashes fell from 14 to 5 on the pilot corridor",
        "traffic counts were unchanged",
        "three matched 30 mph corridors showed no change",
      ],
      riskAnchors: [
        "extending 20 mph to a control corridor cuts its crashes too",
        "the pilot corridor stays near 5 crashes while it keeps 20 mph",
      ],
      defeatedBy: [
        "claiming 20 mph eliminates all crashes everywhere",
        "claiming crash counts are too noisy to conclude anything",
        "claiming every street would see a two-thirds cut regardless of context",
      ],
    },
    correctAnswer:
      "The 20 mph limit very likely caused the crash drop on that corridor, cutting reported crashes by roughly two-thirds (14 to 5) while three matched 30 mph corridors held flat, which rules out a citywide trend. I would test it further by extending the limit to one of the control corridors: my model predicts its crashes fall similarly, and it is refuted if its crashes stay flat or the pilot corridor's crashes climb back to ~14 despite keeping 20 mph.",
    explanation:
      "The matched control corridors license a bold two-thirds causal claim with an extension test; 'too noisy to conclude' under-claims to vacuity while 'eliminates all crashes everywhere' over-claims past the data.",
  },
  {
    itemType: "written",
    prompt:
      "A SaaS company runs a clean A/B test: half of new trial users see a redesigned dashboard, half see the old one, assigned at random. After 30 days, paid conversion is 9.5% for the new design versus 6.0% for the old, sample sizes are large, and acquisition channels are identical across arms. In one paragraph, state the strongest claim the data supports and how you would confirm it holds.",
    writtenRubric: {
      prompt: undefined,
      modelAnswer:
        "The redesigned dashboard caused a real lift in paid conversion, raising it about 3.5 points (from 6.0% to 9.5%, a ~58% relative gain) in a randomized, large-sample test with matched channels. I would confirm durability by shipping the new design to everyone and watching whether overall conversion settles near 9.5%, and by re-testing in a fresh cohort; my model is refuted if conversion drifts back to ~6% or a replication shows no gap.",
      yieldAnchors: [
        "9.5% vs. 6.0% paid conversion",
        "random assignment with large samples",
        "identical acquisition channels across arms",
      ],
      riskAnchors: [
        "rolling out to all users holds conversion near 9.5%",
        "a fresh-cohort replication reproduces the ~3.5-point gap",
      ],
      defeatedBy: [
        "claiming the redesign will lift conversion in every unrelated product",
        "claiming a single test proves nothing about causation",
        "claiming conversion will keep rising 3.5 points with each redesign",
      ],
    },
    correctAnswer:
      "The redesigned dashboard caused a real lift in paid conversion, raising it about 3.5 points (from 6.0% to 9.5%, a ~58% relative gain) in a randomized, large-sample test with matched channels. I would confirm durability by shipping the new design to everyone and watching whether overall conversion settles near 9.5%, and by re-testing in a fresh cohort; my model is refuted if conversion drifts back to ~6% or a replication shows no gap.",
    explanation:
      "A clean randomized test warrants the strong causal claim plus a replication test; 'a single test proves nothing' wastes strong evidence, and generalizing to every product is the overreach the test cannot support.",
  },
  {
    itemType: "written",
    prompt:
      "A home cook suspects her cast-iron pan, not her recipe, makes better-seared steaks. Over ten dinners she alternates pans with the same cut, seasoning, heat, and timing: the five cast-iron steaks all formed a deep crust, the five nonstick steaks stayed pale, and guests blind-rated the cast-iron ones higher every time. In one paragraph, state the strongest claim the data supports and how you would test it.",
    writtenRubric: {
      prompt: undefined,
      modelAnswer:
        "With cut, seasoning, heat, and timing held constant, the cast-iron pan is very likely the cause of the better sear, since it produced a deep crust and higher blind ratings on all five of its trials versus none for nonstick. I would test it by repeating the alternation with a thermometer to confirm the cast iron reaches and holds a higher surface temperature; my model predicts the crust tracks the hotter pan, and it is refuted if a nonstick pan matched to the same surface temperature sears just as well.",
      yieldAnchors: [
        "all five cast-iron steaks formed a deep crust",
        "all five nonstick steaks stayed pale",
        "cut, seasoning, heat, and timing were held constant",
        "blind guests rated cast-iron higher every time",
      ],
      riskAnchors: [
        "the cast iron measures a higher held surface temperature",
        "a nonstick pan matched on surface temperature would sear equally (refutation route)",
      ],
      defeatedBy: [
        "claiming cast iron improves every dish she cooks",
        "claiming the difference could be anything so nothing follows",
        "claiming nonstick can never sear under any condition",
      ],
    },
    correctAnswer:
      "With cut, seasoning, heat, and timing held constant, the cast-iron pan is very likely the cause of the better sear, since it produced a deep crust and higher blind ratings on all five of its trials versus none for nonstick. I would test it by repeating the alternation with a thermometer to confirm the cast iron reaches and holds a higher surface temperature; my model predicts the crust tracks the hotter pan, and it is refuted if a nonstick pan matched to the same surface temperature sears just as well.",
    explanation:
      "The blind, controlled alternation supports a bold causal claim and a temperature-matched refutation test; 'could be anything, nothing follows' is the vacuous hedge and 'every dish' is an overreach the steak-only data can't carry.",
  },
];

export const section: SectionContent = {
  slug: "calibrated-boldness",
  title: "Calibrated Boldness",
  weekNumber: 1,
  blurb:
    "Say the boldest thing the data will back — and stake it on a test that could prove you wrong — instead of hedging to mush or sprinting past the evidence.",
  lectureTitle:
    "1.8 Calibrated Boldness: the boldest claim the data supports, kept falsifiable",
  body: `# Calibrated Boldness

Reasoning has two ways to fail. You can **under-claim** — hedge until your conclusion says nothing ("results may vary," "it depends," "hard to say"). Or you can **over-claim** — sprint past your evidence into a sweeping verdict the data can't carry. Calibrated boldness is the narrow, valuable path between them: make the **strongest claim the data actually supports**, and state it so sharply that a single clean observation could prove you wrong.

## The two failure modes

The **timid** thinker treats every gap in certainty as a reason to retreat. Faced with a real signal, they shrug: "Lots of things could explain it." That shrug feels safe, but it wastes the evidence in front of them. A conclusion that can never be wrong tells you nothing — it's vacuous.

The **reckless** thinker does the opposite, inflating a modest finding into a universal law. One good week becomes "this works for everyone, forever." That feels bold, but it's hollow: the data defeats it on contact, and the first counterexample collapses the whole claim.

CCR rewards neither. It rewards the thinker who climbs as high as the evidence allows — and no higher.

## Boldness is measured in falsifiability

Here is the counterintuitive part: the **boldest** claim is usually the **most testable** one. "It might help a little" risks nothing and predicts nothing. "It raised conversions about 20%, and reverting the change will drop them back" sticks its neck out — it names a size and a test that could refute it. The willingness to be proven wrong is exactly what makes a claim worth believing when it survives.

So when you state a conclusion, ask: *What's the strongest version of this that the data still fully supports? And what observation would prove it false?* If you can't answer the second question, you've either hedged into vacuity or overreached into fantasy.

## Calibrating to the evidence

The right altitude depends on what the data controls for. A single before/after with everything else held constant supports a confident causal claim about *that* setting — plus a reversal test. A matched control group supports a bolder claim still. But neither supports "this works everywhere for everyone." Match the scope of your claim to the scope of your evidence: as bold as the controls allow, as bounded as the sample demands.

## Spotting the dodges

Two answers should always lose. The **vacuous hedge** — "it depends," "more research needed," "we can't really say" — refuses to commit and earns nothing, no matter how reasonable it sounds. The **reckless overreach** — a claim the data already defeats, or a leap to universality from one case — earns nothing either, because it's not supported. Top credit lives in between: committed, sized, scoped, and refutable.

## In the real world

A product team changes one checkout button from gray to orange. Over a month, with traffic and prices unchanged, purchases rise from 4.0% to 4.9% of visitors. The timid reviewer says, "Conversion swings for many reasons — hard to credit the button." The reckless reviewer says, "Orange buttons always boost sales." Both are useless. The calibrated reviewer says: *"The orange button raised completion by about a fifth; if we revert to gray, conversion should fall back toward 4.0% — let's run a 50/50 split to confirm."* That claim is bold (a specific size, a causal verdict), bounded (about this button, this store), and falsifiable (the split test could kill it). That's the altitude to aim for: the highest claim the data will hold, hung on a test that could bring it down.`,
  homework: {
    mcq,
    hybrid,
    written,
  },
};
