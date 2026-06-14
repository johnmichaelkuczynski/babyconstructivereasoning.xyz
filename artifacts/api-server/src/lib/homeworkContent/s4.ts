import type { SectionContent, HomeworkItem, McOption, WrittenRubric } from "./types";

export const section: SectionContent = {
  slug: "abductive-commitment",
  title: "Abductive Commitment",
  weekNumber: 1,
  blurb:
    "Inference to the best explanation only pays off when you actually commit to the leading explanation and act on it — while naming the exact result that would make you drop it.",
  lectureTitle:
    "1.4 Abductive Commitment: commit to the best explanation and act on it",
  body: `# Abductive Commitment

Abduction is the move from a pile of clues to the explanation that, if true, would make the clues least surprising. But abduction is only half-finished when you *name* the best explanation. The other half — the half this section is about — is **committing** to it: acting as if it's true while it leads, and stating in advance what would make you let it go.

## Naming an explanation is not believing it

Plenty of people can list candidate explanations and even rank them. The wet sidewalk was probably rain, possibly a sprinkler, conceivably a burst pipe. Rain leads. Yet many stop there and refuse to *act* on "rain" — they grab no umbrella, change no plan, "because we can't be sure." That refusal is the failure CCR exists to cure. If rain is the best explanation, you carry the umbrella. Inference that never touches behavior is just narration.

## Provisional commitment beats permanent fence-sitting

The fear behind fence-sitting is being wrong. But suspending judgment is itself a decision — usually the worst one, because it forfeits every benefit of being right without buying any protection from being wrong. The disciplined move is **provisional commitment**: adopt the leading explanation, act on it now, and attach a tripwire — a specific future observation that would unseat it. You get the upside of acting on truth *and* a built-in correction mechanism. Fence-sitting gives you neither.

## The tripwire is what makes commitment safe

A commitment without an exit is dogma; an exit without a commitment is paralysis. Top-credit reasoning has both. "I'm treating this outage as a bad deploy and rolling back now; if the rollback doesn't restore service in ten minutes, I drop that explanation and look at the database." That sentence commits hard *and* names the result that kills the commitment. The tripwire converts a guess into a plan.

## Acting while it leads, revising when it loses

"Best current explanation" carries a timestamp. Commitment doesn't mean clinging — it means riding the leader until something better overtakes it. New data arrives; you check it against your tripwire; if the tripwire trips, you switch leaders and commit again. Reasoners who never switch are stubborn; reasoners who never commit are useless. The skill is the cycle: commit, watch the tripwire, revise on disconfirmation.

## Why the cautious dodge scores near zero

"We can't be certain, so we shouldn't act" feels responsible and is almost always wrong. Certainty is not on the menu; the only question is which explanation to act on. Declining to choose is choosing the status quo blind, with no tripwire and no learning. Under CCR that dodge earns the floor. The richest answer commits to the leading explanation, binds the most clues, and exposes the cleanest test that could prove it wrong.

## In the real world

A logistics manager sees three depots suddenly missing their evening cutoff in the same week a new routing app shipped. Candidate causes: the app, a seasonal volume spike, a single sick dispatcher. The app is the best explanation — it's the only change shared by all three depots, and volume is flat year-over-year. The weak move is "too many variables, let's wait a month." The strong move: **commit now** — revert the three depots to the old routing for two days. Tripwire: if cutoffs are still missed under the old app, the app is exonerated and attention shifts to staffing. She acts on the leader *and* names the result that would make her abandon it. That is abductive commitment.`,
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
        "A SaaS team's error rate triples at 2:14pm. The only thing that changed at 2:14pm was a config push to the payments service; traffic was flat and no other deploys went out. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Outages have many possible causes, so until we've ruled every one out we shouldn't change anything.",
          credit: 0,
        },
        {
          text: "Treat the config push as the cause and roll it back now; if errors don't fall within five minutes of the rollback, drop that explanation and investigate traffic and dependencies.",
          credit: 1.0,
        },
        {
          text: "The config push is the likely culprit; let's roll it back and see how things look.",
          credit: 0.6,
        },
        {
          text: "The timing suggests the config push might be involved and is worth keeping in mind.",
          credit: 0.3,
        },
      ],
      correctAnswer:
        "Treat the config push as the cause and roll it back now; if errors don't fall within five minutes of the rollback, drop that explanation and investigate traffic and dependencies.",
      explanation:
        "Top credit commits to the only changed variable AND names the exact result (no recovery after rollback) that would retire the explanation. The 'rule everything out first' option is the zero-credit dodge that forfeits the cheap, decisive test.",
    } as HomeworkItem,
    {
      itemType: "mc",
      prompt:
        "A toddler develops hives within an hour of three different meals this week. The only food common to all three meals was cashews; nothing else overlapped. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Cashews are the leading suspect, so we should probably watch his diet a bit more carefully.",
          credit: 0.3,
        },
        {
          text: "Allergies are complex and we're not doctors, so we can't really say anything until tests come back.",
          credit: 0,
        },
        {
          text: "Act on cashews as the trigger: remove them entirely starting now, and if hives still recur with cashews fully excluded, abandon that explanation and look at other ingredients.",
          credit: 1.0,
        },
        {
          text: "Cashews are likely the trigger; let's cut them out and keep an eye on it.",
          credit: 0.6,
        },
      ],
      correctAnswer:
        "Act on cashews as the trigger: remove them entirely starting now, and if hives still recur with cashews fully excluded, abandon that explanation and look at other ingredients.",
      explanation:
        "The winner commits to the single shared food and states the disconfirming result (recurrence under full exclusion). 'We can't say anything until tests' is the tempting dodge that leaves the child exposed while learning nothing.",
    } as HomeworkItem,
    {
      itemType: "mc",
      prompt:
        "A retailer's online conversion drops 30% the same day a redesigned checkout button goes live. Desktop and mobile both fall; no pricing or ad changes occurred. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Conversion has countless drivers, so attributing it to one button would be premature; better to wait and gather more weeks of data.",
          credit: 0,
        },
        {
          text: "The new button is plausibly part of the story and merits monitoring next sprint.",
          credit: 0.3,
        },
        {
          text: "Commit to the redesigned button as the cause and revert it today; if conversion stays depressed after reverting, drop the button theory and audit the funnel.",
          credit: 1.0,
        },
        {
          text: "The button redesign is probably to blame; reverting it seems like the right call.",
          credit: 0.6,
        },
      ],
      correctAnswer:
        "Commit to the redesigned button as the cause and revert it today; if conversion stays depressed after reverting, drop the button theory and audit the funnel.",
      explanation:
        "Top credit acts on the only same-day change and names the result (no recovery after revert) that kills the theory. 'Wait weeks for more data' is the costly dodge — every day of delay bleeds revenue while a one-day test was available.",
    } as HomeworkItem,
    {
      itemType: "mc",
      prompt:
        "A cyclist's heart-rate monitor reads wildly high only on rides through one wooded section with overhead power lines; everywhere else it tracks her effort normally. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Sensors can misbehave for many reasons, so without lab testing we can't conclude anything about the power lines.",
          credit: 0,
        },
        {
          text: "Assume electrical interference from that section and act on it: switch to a chest-strap or reroute around the lines; if the spikes persist there with the new setup, drop interference and suspect the strap or her physiology.",
          credit: 1.0,
        },
        {
          text: "Interference there is likely; rerouting around the lines is probably worth trying.",
          credit: 0.6,
        },
        {
          text: "The power lines could be a factor in the readings and are worth noting.",
          credit: 0.3,
        },
      ],
      correctAnswer:
        "Assume electrical interference from that section and act on it: switch to a chest-strap or reroute around the lines; if the spikes persist there with the new setup, drop interference and suspect the strap or her physiology.",
      explanation:
        "The richest answer commits to the location-locked pattern and exposes a clean swap test that could refute it. The 'need lab testing' option is the dodge that ignores a free field experiment.",
    } as HomeworkItem,
    {
      itemType: "mc",
      prompt:
        "A bakery's sourdough fails to rise on exactly the four days the kitchen window was left open overnight; on every successful day the window was shut. Ingredients and recipe were identical throughout. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Baking depends on so many factors that pinning it on the window would be overreach; we should keep logging conditions indefinitely.",
          credit: 0,
        },
        {
          text: "The open window may matter and is worth keeping an eye on.",
          credit: 0.3,
        },
        {
          text: "The cold draft from the open window probably stalls the rise; keeping it shut is likely the fix.",
          credit: 0.6,
        },
        {
          text: "Commit to the overnight draft killing the proof and keep the window shut from now on; if a future shut-window night still fails to rise, abandon the draft theory and check the starter.",
          credit: 1.0,
        },
      ],
      correctAnswer:
        "Commit to the overnight draft killing the proof and keep the window shut from now on; if a future shut-window night still fails to rise, abandon the draft theory and check the starter.",
      explanation:
        "Top credit binds the perfect open/shut split and names the failing shut-window night that would defeat it. 'Keep logging indefinitely' is the fence-sit that wastes the clean pattern already in hand.",
    } as HomeworkItem,
    {
      itemType: "mc",
      prompt:
        "A sales rep notices her demo-to-close rate doubled in the two months since she started sending a one-page recap email after each demo. Her territory, pricing, and lead source were unchanged. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Adopt the recap email as the driver and make it standard for every demo now; if close rates fall back to baseline over the next 30 demos despite the recaps, drop it and look elsewhere.",
          credit: 1.0,
        },
        {
          text: "Closing depends on too many intangibles to credit one email, so it's safest not to read anything into it.",
          credit: 0,
        },
        {
          text: "The recap email is likely helping; rolling it out more broadly seems reasonable.",
          credit: 0.6,
        },
        {
          text: "The recap email might be contributing and is worth remembering.",
          credit: 0.3,
        },
      ],
      correctAnswer:
        "Adopt the recap email as the driver and make it standard for every demo now; if close rates fall back to baseline over the next 30 demos despite the recaps, drop it and look elsewhere.",
      explanation:
        "The winner commits to the only changed behavior and sets a measurable tripwire over a defined sample. 'Don't read anything into it' is the dodge that throws away a working practice for fear of being wrong.",
    } as HomeworkItem,
    {
      itemType: "mc",
      prompt:
        "A homeowner's basement floods only after storms that drop more than an inch of rain, and never after lighter storms, ever since a neighbor paved over their adjacent yard last spring. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Flooding has many possible causes, so we shouldn't act until a full hydrology survey is done.",
          credit: 0,
        },
        {
          text: "The new pavement may be redirecting runoff and is worth watching.",
          credit: 0.3,
        },
        {
          text: "Commit to the neighbor's pavement diverting runoff into the basement; install a diversion drain now, and if heavy storms still flood after the drain, drop that explanation and inspect the foundation.",
          credit: 1.0,
        },
        {
          text: "The pavement is the probable cause; a diversion drain is likely the right response.",
          credit: 0.6,
        },
      ],
      correctAnswer:
        "Commit to the neighbor's pavement diverting runoff into the basement; install a diversion drain now, and if heavy storms still flood after the drain, drop that explanation and inspect the foundation.",
      explanation:
        "Top credit ties the threshold-and-timing pattern to the pavement and names the post-drain flood that would refute it. The 'wait for a full survey' option is the dodge that lets the basement keep flooding.",
    } as HomeworkItem,
    {
      itemType: "mc",
      prompt:
        "A teacher finds that essay scores cratered for exactly the third-period class this term — the one section moved to the windowless room after lunch. Same teacher, same assignments, same rubric across all sections. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Learning is influenced by countless factors, so blaming the room would be unscientific; better to suspend judgment.",
          credit: 0,
        },
        {
          text: "The post-lunch windowless room is plausibly hurting focus; commit to it by moving that section to a daylit morning room next term, and if scores stay low after the move, drop the room theory and examine the class roster.",
          credit: 1.0,
        },
        {
          text: "The room and timing are likely the issue; relocating the class seems worth trying.",
          credit: 0.6,
        },
        {
          text: "The room change could be part of the picture and is worth noting.",
          credit: 0.3,
        },
      ],
      correctAnswer:
        "The post-lunch windowless room is plausibly hurting focus; commit to it by moving that section to a daylit morning room next term, and if scores stay low after the move, drop the room theory and examine the class roster.",
      explanation:
        "The winner isolates the one section that differs and proposes a relocation test with a clear failure condition. 'Suspend judgment' is the tempting dodge that abandons the affected students to learn nothing.",
    } as HomeworkItem,
    {
      itemType: "mc",
      prompt:
        "A startup's app crashes only on phones running the latest OS version; older-OS users report zero crashes, and the crashes began the day that OS rolled out. Which conclusion best follows?",
      mcOptions: [
        {
          text: "The new-OS link is worth keeping in mind as one possibility.",
          credit: 0.3,
        },
        {
          text: "Crashes can stem from many things, so it would be hasty to ship a fix targeting the new OS before we're certain.",
          credit: 0,
        },
        {
          text: "Commit to a new-OS incompatibility and ship a guarded patch for that version today; if crashes continue on the new OS after the patch, drop that explanation and profile memory across all versions.",
          credit: 1.0,
        },
        {
          text: "The new OS is likely the trigger; a targeted patch seems like the move.",
          credit: 0.6,
        },
      ],
      correctAnswer:
        "Commit to a new-OS incompatibility and ship a guarded patch for that version today; if crashes continue on the new OS after the patch, drop that explanation and profile memory across all versions.",
      explanation:
        "Top credit acts on the perfect version split and names the post-patch crash that would unseat it. 'Hasty to ship before we're certain' is the dodge that leaves users crashing while certainty never arrives.",
    } as HomeworkItem,
    {
      itemType: "mc",
      prompt:
        "A gym-goer's knee pain flares only on weeks he runs on the treadmill, and disappears on weeks he swims or rests instead. The pattern has held for two months. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Joint pain has many causes, so without an MRI we can't responsibly conclude the treadmill is involved.",
          credit: 0,
        },
        {
          text: "Treat the treadmill as the aggravator: stop treadmill running for three weeks and substitute swimming; if the knee still flares with zero treadmill use, abandon that explanation and see a physio about gait or footwear.",
          credit: 1.0,
        },
        {
          text: "The treadmill is likely the problem; switching to swimming for a while seems sensible.",
          credit: 0.6,
        },
        {
          text: "The treadmill might be aggravating the knee and is worth tracking.",
          credit: 0.3,
        },
      ],
      correctAnswer:
        "Treat the treadmill as the aggravator: stop treadmill running for three weeks and substitute swimming; if the knee still flares with zero treadmill use, abandon that explanation and see a physio about gait or footwear.",
      explanation:
        "The richest answer commits to the activity that tracks the pain and sets a clean elimination test. 'Can't conclude without an MRI' is the dodge that delays relief for a test the pattern already supplies for free.",
    } as HomeworkItem,
    {
      itemType: "mc",
      prompt:
        "A call center's customer-satisfaction scores jumped the same month a new manager shortened mandatory call scripts. Call volume and staffing were steady; no other policy changed. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Satisfaction is shaped by too many forces to credit the script change, so we shouldn't act on a hunch.",
          credit: 0,
        },
        {
          text: "The shorter scripts are likely behind the lift; standardizing them seems reasonable.",
          credit: 0.6,
        },
        {
          text: "Commit to the shortened scripts as the cause and roll them to all teams now; if satisfaction on the new teams doesn't rise within a month, drop that explanation and study the manager's other practices.",
          credit: 1.0,
        },
        {
          text: "The script change may have helped and is worth keeping in view.",
          credit: 0.3,
        },
      ],
      correctAnswer:
        "Commit to the shortened scripts as the cause and roll them to all teams now; if satisfaction on the new teams doesn't rise within a month, drop that explanation and study the manager's other practices.",
      explanation:
        "Top credit acts on the lone policy change and names the no-lift result that would refute it. 'Shouldn't act on a hunch' is the dodge that forgoes a scalable win and any chance to learn.",
    } as HomeworkItem,
    {
      itemType: "mc",
      prompt:
        "A houseplant wilts within two days every time it's moved to the south-facing sill and recovers when returned to the shaded corner. This has repeated four times. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Plants are sensitive to many variables, so it's safest not to draw a conclusion about the sunny sill.",
          credit: 0,
        },
        {
          text: "Commit to the south sill's harsh light/heat as the cause and keep the plant in the shaded corner; if it wilts again in the shade, drop that explanation and check watering and roots.",
          credit: 1.0,
        },
        {
          text: "The sunny sill is probably too harsh; leaving the plant in shade seems right.",
          credit: 0.6,
        },
        {
          text: "The sill location might matter to the plant and is worth remembering.",
          credit: 0.3,
        },
      ],
      correctAnswer:
        "Commit to the south sill's harsh light/heat as the cause and keep the plant in the shaded corner; if it wilts again in the shade, drop that explanation and check watering and roots.",
      explanation:
        "The winner commits to the location that perfectly tracks wilting and names the in-shade wilt that would defeat it. 'Safest not to draw a conclusion' is the dodge that ignores four clean repetitions.",
    } as HomeworkItem,
    {
      itemType: "mc",
      prompt:
        "A blogger's traffic fell 40% and stayed down starting the week Google rolled out a core algorithm update; her publishing cadence and backlinks were unchanged. Competitors in her niche report similar drops. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Traffic depends on too many unknowns to blame the update, so the cautious path is to make no changes and wait.",
          credit: 0,
        },
        {
          text: "The algorithm update is the leading explanation; commit to it by revising her thin pages to the update's stated quality signals now, and if traffic stays flat after re-indexing, drop that explanation and audit site speed and tracking.",
          credit: 1.0,
        },
        {
          text: "The update is probably responsible; updating her content to match seems worthwhile.",
          credit: 0.6,
        },
        {
          text: "The timing hints the update could be a factor worth watching.",
          credit: 0.3,
        },
      ],
      correctAnswer:
        "The algorithm update is the leading explanation; commit to it by revising her thin pages to the update's stated quality signals now, and if traffic stays flat after re-indexing, drop that explanation and audit site speed and tracking.",
      explanation:
        "Top credit binds the timing plus the niche-wide drop and exposes a re-indexing test. 'Make no changes and wait' is the dodge that surrenders months of traffic to avoid acting on the obvious leader.",
    } as HomeworkItem,
    {
      itemType: "mc",
      prompt:
        "A restaurant's Friday food-cost spikes appeared the same month it switched to a new produce supplier; Monday–Thursday costs (still on the old supplier for those days) are normal. Menu and portions are unchanged. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Food costs fluctuate for many reasons, so it would be premature to act against the new supplier.",
          credit: 0,
        },
        {
          text: "The new supplier may be driving the Friday spike and is worth monitoring.",
          credit: 0.3,
        },
        {
          text: "The new Friday supplier is likely the cause; switching back seems reasonable.",
          credit: 0.6,
        },
        {
          text: "Commit to the new supplier as the cause of the Friday spike and revert Fridays to the old supplier for a month; if Friday costs stay high after reverting, drop that explanation and audit Friday waste and theft.",
          credit: 1.0,
        },
      ],
      correctAnswer:
        "Commit to the new supplier as the cause of the Friday spike and revert Fridays to the old supplier for a month; if Friday costs stay high after reverting, drop that explanation and audit Friday waste and theft.",
      explanation:
        "The richest answer exploits the day-of-week split tied to the supplier and names the post-revert spike that would refute it. 'Premature to act' is the dodge that keeps overpaying while a clean comparison sits unused.",
    } as HomeworkItem,
    {
      itemType: "mc",
      prompt:
        "A commuter's car stalls only when the fuel gauge is below a quarter tank and never above it; the pattern has held across a dozen drives. A mechanic suggests the in-tank fuel pump strains when fuel is low. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Engine problems can have countless causes, so we can't conclude it's the fuel pump without a full diagnostic teardown.",
          credit: 0,
        },
        {
          text: "Commit to the low-fuel pump-strain explanation: keep the tank above half and plan to replace the pump, and if it still stalls on a full tank, drop that explanation and chase electrical or ignition faults.",
          credit: 1.0,
        },
        {
          text: "The fuel pump is the likely culprit; keeping more gas in the tank seems wise.",
          credit: 0.6,
        },
        {
          text: "The low-fuel pattern might point to the pump and is worth keeping in mind.",
          credit: 0.3,
        },
      ],
      correctAnswer:
        "Commit to the low-fuel pump-strain explanation: keep the tank above half and plan to replace the pump, and if it still stalls on a full tank, drop that explanation and chase electrical or ignition faults.",
      explanation:
        "Top credit acts on the fuel-level pattern with a concrete behavior change and a full-tank stall as the disconfirmer. 'Can't conclude without a teardown' is the dodge that ignores a dozen consistent clues.",
    } as HomeworkItem,
  ];
}

function buildHybrid(): HomeworkItem[] {
  const followUp =
    "In two sentences, name the single cheapest observation that would most distinguish your explanation from its closest rival, and say what result would make you drop your explanation.";
  return [
    {
      itemType: "hybrid",
      prompt:
        "A warehouse sees picking errors quadruple on the night shift only, beginning the week a new handheld scanner firmware was pushed to the night-shift devices (day-shift devices kept the old firmware). Staffing and order mix are unchanged. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Picking accuracy depends on many human factors, so it's premature to blame the firmware before a long study.",
          credit: 0,
        },
        {
          text: "Commit to the night-shift firmware as the cause and roll those devices back tonight; if errors stay high after the rollback, drop that explanation and investigate night-shift fatigue and lighting.",
          credit: 1.0,
        },
        {
          text: "The firmware is probably the issue; rolling it back on night devices seems sensible.",
          credit: 0.6,
        },
        {
          text: "The firmware change might be involved and is worth tracking.",
          credit: 0.3,
        },
      ],
      writtenRubric: {
        prompt: followUp,
        modelAnswer:
          "The cheapest distinguishing observation is whether errors fall the moment the night devices are rolled back to old firmware while the rest of the shift is unchanged — that isolates firmware from fatigue. If errors stay quadrupled after the rollback, I drop the firmware explanation and pursue night-shift fatigue or lighting.",
        yieldAnchors: [
          "Errors quadrupled on night shift only",
          "Firmware was pushed only to night-shift devices",
          "Day-shift devices kept old firmware and show no spike",
          "Staffing and order mix unchanged",
        ],
        riskAnchors: [
          "Roll night devices back to old firmware tonight",
          "Errors should drop to baseline within the shift if firmware is the cause",
        ],
        defeatedBy: [
          "Blaming staffing changes (staffing was constant)",
          "Blaming order mix (order mix was constant)",
          "Concluding nothing can be acted on",
        ],
      } as WrittenRubric,
      correctAnswer:
        "Commit to the night-shift firmware as the cause and roll those devices back tonight; if errors stay high after the rollback, drop that explanation and investigate night-shift fatigue and lighting.",
      explanation:
        "The top MC option commits to the only variable that splits the two shifts and names the rollback as a clean test; the written follow-up earns full credit by naming the cheapest discriminating observation and an explicit drop condition.",
    } as HomeworkItem,
    {
      itemType: "hybrid",
      prompt:
        "A clinic notices that patients who switched to a new generic blood-pressure pill last quarter report dizziness far more than those still on the brand; both groups are otherwise demographically similar and on identical doses. Which conclusion best follows?",
      mcOptions: [
        {
          text: "The generic switch might relate to the dizziness and deserves monitoring.",
          credit: 0.3,
        },
        {
          text: "Drug effects are individual and confounded, so we can't responsibly conclude the generic is the cause.",
          credit: 0,
        },
        {
          text: "Commit to the generic formulation as the cause: switch dizzy patients back to the brand and track symptoms, and if dizziness persists on the brand, drop that explanation and screen for dehydration or other meds.",
          credit: 1.0,
        },
        {
          text: "The generic is probably responsible; switching affected patients back seems reasonable.",
          credit: 0.6,
        },
      ],
      writtenRubric: {
        prompt: followUp,
        modelAnswer:
          "The cheapest discriminator is whether dizziness resolves after switching the affected patients back to the brand at the same dose — that separates the formulation from confounders like dehydration. If they remain dizzy on the brand, I drop the generic explanation and screen for hydration and interacting medications.",
        yieldAnchors: [
          "Dizziness concentrated in patients who switched to the generic",
          "Brand-stable patients report far less dizziness",
          "Groups are demographically similar",
          "Doses are identical across groups",
        ],
        riskAnchors: [
          "Switch dizzy patients back to the brand at the same dose",
          "Symptoms should resolve if the generic formulation is the cause",
        ],
        defeatedBy: [
          "Attributing it to differing doses (doses are identical)",
          "Attributing it to demographic differences (groups are similar)",
          "Refusing to act because drug effects are individual",
        ],
      } as WrittenRubric,
      correctAnswer:
        "Commit to the generic formulation as the cause: switch dizzy patients back to the brand and track symptoms, and if dizziness persists on the brand, drop that explanation and screen for dehydration or other meds.",
      explanation:
        "The winning MC option commits to the formulation difference and names a reversible test; full written credit requires the cheapest discriminating observation (resolution on rebrand) plus a clear drop condition.",
    } as HomeworkItem,
    {
      itemType: "hybrid",
      prompt:
        "A podcast's download numbers spike every episode that drops on a Tuesday and lag on every other day; the host has run this for six months with consistent topics and length. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Audience behavior is too noisy to credit the release day, so it's best not to change the schedule on this basis.",
          credit: 0,
        },
        {
          text: "Commit to Tuesday release timing as the driver: move all episodes to Tuesday for the next two months, and if non-spike performance returns despite Tuesday drops, abandon timing and examine topic and promotion.",
          credit: 1.0,
        },
        {
          text: "Tuesday timing is likely helping; shifting releases to Tuesday seems worth doing.",
          credit: 0.6,
        },
        {
          text: "Release day might play a role and is worth keeping in mind.",
          credit: 0.3,
        },
      ],
      writtenRubric: {
        prompt: followUp,
        modelAnswer:
          "The cheapest discriminator is moving the next several episodes to Tuesday and seeing whether the spike follows the day rather than the topic — that separates timing from content. If Tuesday episodes stop spiking, I drop the release-day explanation and look at topic appeal and promotion.",
        yieldAnchors: [
          "Tuesday episodes spike in downloads",
          "All other days lag",
          "Topics held consistent across six months",
          "Episode length held consistent",
        ],
        riskAnchors: [
          "Move all episodes to Tuesday for two months",
          "Spikes should track Tuesday if timing is the driver",
        ],
        defeatedBy: [
          "Blaming topic variation (topics were consistent)",
          "Blaming length variation (length was consistent)",
          "Refusing to act because audience data is noisy",
        ],
      } as WrittenRubric,
      correctAnswer:
        "Commit to Tuesday release timing as the driver: move all episodes to Tuesday for the next two months, and if non-spike performance returns despite Tuesday drops, abandon timing and examine topic and promotion.",
      explanation:
        "Top MC credit commits to the day pattern with a scheduling test; the follow-up earns full marks by isolating timing from content and naming the result that would retire the explanation.",
    } as HomeworkItem,
    {
      itemType: "hybrid",
      prompt:
        "A soccer team has conceded a late goal in five straight matches, all of which featured the same substitution pattern: pulling the holding midfielder around the 70th minute. Matches without that sub held their leads. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Late goals come from many situational factors, so we can't blame the substitution without much more film study.",
          credit: 0,
        },
        {
          text: "The 70th-minute sub might be linked to the late goals and is worth noting.",
          credit: 0.3,
        },
        {
          text: "Commit to the holding-midfielder substitution as the cause: keep that player on past the 75th minute in upcoming matches, and if late goals still come with the midfielder kept on, drop that explanation and review fitness and set-piece marking.",
          credit: 1.0,
        },
        {
          text: "The substitution is probably the issue; keeping the midfielder on longer seems sensible.",
          credit: 0.6,
        },
      ],
      writtenRubric: {
        prompt: followUp,
        modelAnswer:
          "The cheapest discriminator is keeping the holding midfielder on past the 75th in the next few matches and seeing whether late goals stop — that separates the structural gap from generic fatigue. If late goals continue with him on the pitch, I drop the substitution explanation and examine overall fitness and set-piece marking.",
        yieldAnchors: [
          "Late goals conceded in five straight matches",
          "All five featured the 70th-minute holding-midfielder sub",
          "Matches without that sub held their leads",
        ],
        riskAnchors: [
          "Keep the holding midfielder on past the 75th minute",
          "Late goals should stop if the sub is the cause",
        ],
        defeatedBy: [
          "Blaming random misfortune (the pattern is consistent)",
          "Concluding the sub is irrelevant despite the clean split",
          "Refusing to change anything pending more film",
        ],
      } as WrittenRubric,
      correctAnswer:
        "Commit to the holding-midfielder substitution as the cause: keep that player on past the 75th minute in upcoming matches, and if late goals still come with the midfielder kept on, drop that explanation and review fitness and set-piece marking.",
      explanation:
        "The top MC option commits to the substitution that tracks the collapses and names a lineup test; full written credit comes from isolating that variable and stating the disconfirming result.",
    } as HomeworkItem,
    {
      itemType: "hybrid",
      prompt:
        "An e-commerce site's cart-abandonment rate climbed sharply right after a third-party shipping-cost widget was added to the checkout page; page-load time also rose by three seconds at the same point. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Commit to the widget's added load time as the cause of abandonment: remove the widget and serve shipping costs server-side now, and if abandonment stays high after load time recovers, drop that explanation and study the new shipping prices themselves.",
          credit: 1.0,
        },
        {
          text: "Abandonment has many drivers, so it would be rash to remove the widget before a controlled study.",
          credit: 0,
        },
        {
          text: "The slow widget is probably hurting checkout; removing it seems like the right step.",
          credit: 0.6,
        },
        {
          text: "The widget might be contributing to abandonment and is worth watching.",
          credit: 0.3,
        },
      ],
      writtenRubric: {
        prompt: followUp,
        modelAnswer:
          "The cheapest discriminator is removing the widget and computing shipping server-side so load time drops back, then watching abandonment — that separates the latency from the actual shipping prices shown. If abandonment stays high once load time recovers, I drop the latency explanation and conclude the displayed shipping costs are deterring buyers.",
        yieldAnchors: [
          "Abandonment climbed right after the widget was added",
          "Page-load time rose three seconds at the same point",
          "The change is localized to the checkout page",
        ],
        riskAnchors: [
          "Remove the widget and serve shipping costs server-side",
          "Abandonment should drop when load time recovers if latency is the cause",
        ],
        defeatedBy: [
          "Assuming prices and latency are indistinguishable without testing",
          "Refusing to act pending a controlled study",
          "Blaming unrelated pages (the change is checkout-specific)",
        ],
      } as WrittenRubric,
      correctAnswer:
        "Commit to the widget's added load time as the cause of abandonment: remove the widget and serve shipping costs server-side now, and if abandonment stays high after load time recovers, drop that explanation and study the new shipping prices themselves.",
      explanation:
        "Top MC credit commits to the latency mechanism with a concrete fix and a fallback; the follow-up earns full marks by separating latency from price and naming what would refute the latency story.",
    } as HomeworkItem,
    {
      itemType: "hybrid",
      prompt:
        "A homebrewer's last three batches turned sour, all fermented in the garage during a heat wave; his earlier clean batches fermented in the cool basement. Recipe, yeast, and sanitation logs are identical across all batches. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Off-flavors arise from many sources, so we can't responsibly blame the garage temperature.",
          credit: 0,
        },
        {
          text: "The warm garage might be the issue and is worth keeping in mind.",
          credit: 0.3,
        },
        {
          text: "Commit to high fermentation temperature as the cause: ferment the next batch in the cool basement, and if it still sours at controlled temperature, abandon that explanation and recheck sanitation and yeast health.",
          credit: 1.0,
        },
        {
          text: "The warm garage is likely the culprit; moving fermentation to the basement seems wise.",
          credit: 0.6,
        },
      ],
      writtenRubric: {
        prompt: followUp,
        modelAnswer:
          "The cheapest discriminator is fermenting the next batch in the cool basement with everything else held constant and tasting the result — that isolates temperature from sanitation. If it still sours at controlled temperature, I drop the heat explanation and recheck sanitation and yeast viability.",
        yieldAnchors: [
          "Last three sour batches all fermented in a hot garage",
          "Earlier clean batches fermented in the cool basement",
          "Recipe and yeast identical across batches",
          "Sanitation logs identical across batches",
        ],
        riskAnchors: [
          "Ferment the next batch in the cool basement",
          "The batch should come out clean if temperature is the cause",
        ],
        defeatedBy: [
          "Blaming sanitation (logs are identical)",
          "Blaming the recipe or yeast (both are identical)",
          "Refusing to act on the temperature pattern",
        ],
      } as WrittenRubric,
      correctAnswer:
        "Commit to high fermentation temperature as the cause: ferment the next batch in the cool basement, and if it still sours at controlled temperature, abandon that explanation and recheck sanitation and yeast health.",
      explanation:
        "The top MC option commits to the only differing condition and names a clean controlled-temperature test; full written credit requires isolating temperature and stating the souring-at-cool result that would refute it.",
    } as HomeworkItem,
    {
      itemType: "hybrid",
      prompt:
        "A manager finds that remote employees who keep cameras on in meetings score notably higher on the quarterly engagement survey than camera-off peers, across two quarters and multiple teams. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Engagement is multi-causal, so we can't conclude cameras matter and shouldn't act on this.",
          credit: 0,
        },
        {
          text: "Camera use might relate to engagement and is worth tracking.",
          credit: 0.3,
        },
        {
          text: "Cameras-on is probably linked to engagement; encouraging cameras seems reasonable.",
          credit: 0.6,
        },
        {
          text: "Take engagement (not cameras) as the likely driver of both: commit to it by improving meeting purpose and recognition for a pilot group, and if their camera use and scores rise together, that supports it; if scores rise while cameras stay off, drop the shared-cause story and revisit cameras directly.",
          credit: 1.0,
        },
      ],
      writtenRubric: {
        prompt: followUp,
        modelAnswer:
          "The cheapest discriminator is running an engagement-boosting intervention (clear agendas, recognition) on one team without mandating cameras and watching whether scores rise even while cameras stay off — that separates underlying engagement from the camera behavior itself. If scores climb with cameras still off, the camera correlation was a symptom, not a cause, and I act on engagement drivers instead.",
        yieldAnchors: [
          "Cameras-on employees score higher on engagement",
          "Pattern holds across two quarters",
          "Pattern holds across multiple teams",
        ],
        riskAnchors: [
          "Run an engagement intervention without mandating cameras",
          "Scores rising while cameras stay off would refute the camera-as-cause story",
        ],
        defeatedBy: [
          "Mandating cameras as if forcing the symptom fixes engagement",
          "Concluding nothing actionable from a stable cross-team pattern",
          "Assuming cameras cause engagement without testing the shared-cause rival",
        ],
      } as WrittenRubric,
      correctAnswer:
        "Take engagement (not cameras) as the likely driver of both: commit to it by improving meeting purpose and recognition for a pilot group, and if their camera use and scores rise together, that supports it; if scores rise while cameras stay off, drop the shared-cause story and revisit cameras directly.",
      explanation:
        "Top MC credit commits to the richer common-cause model and exposes a pilot test that could refute it; full written credit comes from naming the cheapest observation that separates cause from symptom and the result that would unseat the model.",
    } as HomeworkItem,
    {
      itemType: "hybrid",
      prompt:
        "A city's bike-share usage doubled in the three months after protected lanes were added on the two busiest corridors; ridership on unchanged corridors stayed flat over the same period. Weather was typical for the season. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Ridership responds to many forces, so crediting the lanes would be premature and we should keep observing.",
          credit: 0,
        },
        {
          text: "Commit to the protected lanes as the driver: extend lanes to a third comparable corridor, and if usage there doesn't climb similarly, drop that explanation and look at station density and pricing.",
          credit: 1.0,
        },
        {
          text: "The new lanes are likely behind the surge; extending them seems worthwhile.",
          credit: 0.6,
        },
        {
          text: "The lanes might be helping ridership and are worth keeping in view.",
          credit: 0.3,
        },
      ],
      writtenRubric: {
        prompt: followUp,
        modelAnswer:
          "The cheapest discriminator is adding a protected lane to one more comparable corridor and seeing whether its ridership doubles like the first two — that separates the lanes from a city-wide trend. If the new corridor's usage stays flat, I drop the lanes explanation and examine station density and pricing.",
        yieldAnchors: [
          "Usage doubled on the two corridors that got protected lanes",
          "Unchanged corridors stayed flat",
          "Weather was typical for the season",
        ],
        riskAnchors: [
          "Extend protected lanes to a third comparable corridor",
          "Usage there should rise similarly if lanes are the driver",
        ],
        defeatedBy: [
          "Blaming weather (it was typical)",
          "Blaming a city-wide trend (unchanged corridors stayed flat)",
          "Refusing to act pending indefinite further observation",
        ],
      } as WrittenRubric,
      correctAnswer:
        "Commit to the protected lanes as the driver: extend lanes to a third comparable corridor, and if usage there doesn't climb similarly, drop that explanation and look at station density and pricing.",
      explanation:
        "The top MC option commits to the corridor-specific intervention and proposes a replication test with a clear failure condition; the follow-up earns full credit by naming that replication as the cheapest discriminator.",
    } as HomeworkItem,
    {
      itemType: "hybrid",
      prompt:
        "A data team's nightly ETL job started failing intermittently exactly when a colleague's new logging library was merged; failures only occur on the shards that import the new library, and clean shards never fail. Which conclusion best follows?",
      mcOptions: [
        {
          text: "Intermittent failures can have countless roots, so it's unsafe to blame the library before exhaustive tracing.",
          credit: 0,
        },
        {
          text: "The new library could be implicated and is worth monitoring.",
          credit: 0.3,
        },
        {
          text: "The logging library is probably the cause; removing it from the failing shards seems sensible.",
          credit: 0.6,
        },
        {
          text: "Commit to the new logging library as the cause: pin the failing shards back to the previous version tonight, and if they still fail intermittently without it, drop that explanation and investigate shard data volume and memory.",
          credit: 1.0,
        },
      ],
      writtenRubric: {
        prompt: followUp,
        modelAnswer:
          "The cheapest discriminator is reverting the new logging library on the failing shards while leaving everything else and watching tonight's run — that isolates the library from data-volume effects. If those shards still fail intermittently without the library, I drop that explanation and investigate shard-specific data volume and memory pressure.",
        yieldAnchors: [
          "Failures began exactly when the logging library merged",
          "Only shards importing the new library fail",
          "Shards without the library never fail",
        ],
        riskAnchors: [
          "Pin failing shards back to the previous library version tonight",
          "Failures should stop if the library is the cause",
        ],
        defeatedBy: [
          "Blaming shards that don't import the library (they never fail)",
          "Assuming the failures are pure randomness despite the clean split",
          "Refusing to act before exhaustive tracing",
        ],
      } as WrittenRubric,
      correctAnswer:
        "Commit to the new logging library as the cause: pin the failing shards back to the previous version tonight, and if they still fail intermittently without it, drop that explanation and investigate shard data volume and memory.",
      explanation:
        "Top MC credit commits to the variable that perfectly splits failing from clean shards and names a revert test; full written credit requires isolating the library and stating the persistent-failure result that would refute it.",
    } as HomeworkItem,
  ];
}

function buildWritten(): HomeworkItem[] {
  return [
    {
      itemType: "written",
      prompt:
        "A boutique gym notices that members who book the 6am class have a 90-day retention rate of 80%, versus 45% for members who only attend evening classes. The two groups signed up through the same promotions and pay the same rates. In one paragraph, propose the strongest explanation you'd act on, say what you'd do about it, and name the result that would make you drop your explanation.",
      writtenRubric: {
        modelAnswer:
          "The strongest model is that an early committed routine (and the morning community it builds) drives retention, with morning-class membership partly a marker of people already primed to commit. I'd act on it now: nudge a cohort of new evening-only members into a free 6am trial block and pair them with a small morning group, treating the morning-routine hypothesis as true while it leads. The decisive test is whether those nudged members' retention rises toward 80%; if their retention stays near the evening baseline despite genuine 6am attendance, I drop the 'morning routine causes retention' explanation and treat early booking as a mere selection marker, redirecting effort to screening and onboarding for commitment instead.",
        yieldAnchors: [
          "6am members retain at 80% over 90 days",
          "Evening-only members retain at 45%",
          "Both groups came through the same promotions",
          "Both groups pay the same rates",
        ],
        riskAnchors: [
          "Nudge evening-only members into a 6am trial cohort",
          "Their retention should climb toward 80% if the morning routine is causal",
          "Persisting at the evening baseline despite real attendance refutes the model",
        ],
        defeatedBy: [
          "Attributing the gap to price differences (rates are identical)",
          "Attributing it to different promotions (both groups used the same ones)",
          "Concluding nothing can be done because the cause is uncertain",
        ],
      } as WrittenRubric,
      correctAnswer:
        "The strongest model is that an early committed routine (and the morning community it builds) drives retention, with morning-class membership partly a marker of people already primed to commit. I'd act on it now: nudge a cohort of new evening-only members into a free 6am trial block and pair them with a small morning group, treating the morning-routine hypothesis as true while it leads. The decisive test is whether those nudged members' retention rises toward 80%; if their retention stays near the evening baseline despite genuine 6am attendance, I drop the 'morning routine causes retention' explanation and treat early booking as a mere selection marker, redirecting effort to screening and onboarding for commitment instead.",
      explanation:
        "Under CCR's inverted standard, 'too many variables to act' scores near zero; the win comes from committing to the leading explanation, acting on it, and naming the retention result that would force a switch. Florid hedging that binds no data scores low.",
    } as HomeworkItem,
    {
      itemType: "written",
      prompt:
        "A regional bakery chain sees that one of its eight stores has 25% lower waste than the rest, despite identical menus, suppliers, and forecasting software. The standout store's manager retrained staff six months ago to bake in smaller, more frequent batches. In one paragraph, propose the strongest explanation you'd act on, what you'd do, and what would make you abandon it.",
      writtenRubric: {
        modelAnswer:
          "The strongest model is that the small-batch, bake-to-demand practice is what cuts waste, since it's the one operational difference among otherwise identical stores. I'd commit to it by rolling the small-batch protocol out to two comparable stores immediately and measuring their waste over the next eight weeks, acting as if the practice is causal while it leads. The disconfirming result is clear: if those two stores' waste fails to fall meaningfully after genuinely adopting small batches, I drop the practice explanation and investigate store-specific factors at the standout — foot-traffic patterns, local demand stability, or the individual manager's forecasting tweaks.",
        yieldAnchors: [
          "One store has 25% lower waste than the other seven",
          "Menus, suppliers, and forecasting software are identical",
          "The standout store retrained staff to small, frequent batches",
        ],
        riskAnchors: [
          "Roll the small-batch protocol out to two comparable stores",
          "Their waste should drop within eight weeks if the practice is causal",
          "No drop after genuine adoption refutes the model",
        ],
        defeatedBy: [
          "Blaming supplier or menu differences (these are identical)",
          "Blaming the forecasting software (it's the same everywhere)",
          "Concluding the difference is unexplainable and acting on none of it",
        ],
      } as WrittenRubric,
      correctAnswer:
        "The strongest model is that the small-batch, bake-to-demand practice is what cuts waste, since it's the one operational difference among otherwise identical stores. I'd commit to it by rolling the small-batch protocol out to two comparable stores immediately and measuring their waste over the next eight weeks, acting as if the practice is causal while it leads. The disconfirming result is clear: if those two stores' waste fails to fall meaningfully after genuinely adopting small batches, I drop the practice explanation and investigate store-specific factors at the standout — foot-traffic patterns, local demand stability, or the individual manager's forecasting tweaks.",
      explanation:
        "CCR rewards committing to the single differentiating practice and replicating it as a test; the cautious 'we can't be sure it transfers' refusal earns near-zero because it forfeits both the savings and the experiment.",
    } as HomeworkItem,
    {
      itemType: "written",
      prompt:
        "A wildlife biologist observes that a pond's frog population collapsed over one summer; in the same window, a new golf course upstream began applying lawn chemicals, water temperature was normal, and a routine survey found no new predators. In one paragraph, propose the strongest explanation you'd act on, what you'd do about it, and what would make you drop it.",
      writtenRubric: {
        modelAnswer:
          "The strongest model is that chemical runoff from the upstream golf course caused the collapse, since it's the one new upstream input coinciding with the die-off while temperature and predation are ruled out. I'd commit to it now: sample water and frog tissue for the course's specific chemicals and push for an immediate runoff buffer, treating contamination as the working cause while it leads. The decisive disconfirmer is the assay — if the implicated chemicals are absent from the water and tissue at biologically relevant levels, I abandon the runoff explanation and pursue disease (e.g., chytrid fungus) or oxygen-depletion mechanisms instead.",
        yieldAnchors: [
          "Frog population collapsed over one summer",
          "A new upstream golf course began applying chemicals in the same window",
          "Water temperature was normal",
          "No new predators were found",
        ],
        riskAnchors: [
          "Assay water and frog tissue for the course's chemicals",
          "Push for a runoff buffer immediately",
          "Absence of the chemicals at relevant levels refutes the runoff model",
        ],
        defeatedBy: [
          "Blaming warmer water (temperature was normal)",
          "Blaming new predators (the survey found none)",
          "Concluding too little is known to act and waiting out another season",
        ],
      } as WrittenRubric,
      correctAnswer:
        "The strongest model is that chemical runoff from the upstream golf course caused the collapse, since it's the one new upstream input coinciding with the die-off while temperature and predation are ruled out. I'd commit to it now: sample water and frog tissue for the course's specific chemicals and push for an immediate runoff buffer, treating contamination as the working cause while it leads. The decisive disconfirmer is the assay — if the implicated chemicals are absent from the water and tissue at biologically relevant levels, I abandon the runoff explanation and pursue disease (e.g., chytrid fungus) or oxygen-depletion mechanisms instead.",
      explanation:
        "The inverted standard penalizes 'ecosystems are too complex to attribute' as a near-zero dodge; top credit binds the runoff timing and ruled-out alternatives while committing to a falsifiable assay that could clear the golf course.",
    } as HomeworkItem,
    {
      itemType: "written",
      prompt:
        "A mid-size law firm's billable hours per associate dropped 15% in the quarter after it switched from a familiar case-management system to a new one; headcount, case volume, and client mix were unchanged, and associates complain the new system is slow. In one paragraph, propose the strongest explanation you'd act on, what you'd do, and what would make you drop it.",
      writtenRubric: {
        modelAnswer:
          "The strongest model is that the new case-management system's friction is eating billable time, since the drop coincides exactly with the switch while headcount, case volume, and client mix are constant and associates report it's slow. I'd commit to it now: run a two-week pilot returning one practice group to the old system (or a streamlined config) and instrument time-on-task, acting as if the tool is the cause while it leads. The disconfirmer is direct — if the pilot group's billable hours don't recover relative to the others, I drop the system explanation and investigate workflow, morale, or a real dip in matter complexity.",
        yieldAnchors: [
          "Billable hours dropped 15% the quarter after the system switch",
          "Headcount, case volume, and client mix unchanged",
          "Associates report the new system is slow",
        ],
        riskAnchors: [
          "Pilot a return to the old system for one practice group",
          "Instrument time-on-task during the pilot",
          "No recovery in the pilot group refutes the system explanation",
        ],
        defeatedBy: [
          "Blaming reduced case volume (volume was unchanged)",
          "Blaming headcount changes (headcount was constant)",
          "Concluding the cause is unknowable and making no change",
        ],
      } as WrittenRubric,
      correctAnswer:
        "The strongest model is that the new case-management system's friction is eating billable time, since the drop coincides exactly with the switch while headcount, case volume, and client mix are constant and associates report it's slow. I'd commit to it now: run a two-week pilot returning one practice group to the old system (or a streamlined config) and instrument time-on-task, acting as if the tool is the cause while it leads. The disconfirmer is direct — if the pilot group's billable hours don't recover relative to the others, I drop the system explanation and investigate workflow, morale, or a real dip in matter complexity.",
      explanation:
        "CCR rewards committing to the timing-aligned tool change and exposing it to a reversible pilot; the 'too many factors to single out the system' hedge earns near-zero because it leaves the firm bleeding hours while learning nothing.",
    } as HomeworkItem,
    {
      itemType: "written",
      prompt:
        "A high-school cross-country coach notices that runners who eat a specific pre-race oatmeal breakfast post personal bests far more often than those who skip breakfast or eat differently; the oatmeal eaters are otherwise spread evenly across ability levels and training loads. In one paragraph, propose the strongest explanation you'd act on, what you'd do, and what would make you abandon it.",
      writtenRubric: {
        modelAnswer:
          "The strongest model is that the steady-carb oatmeal breakfast improves race-day fueling and pacing, since the personal-best pattern tracks the meal across runners who are otherwise evenly distributed by ability and training load. I'd commit to it by having a cross-section of non-oatmeal runners adopt the same pre-race breakfast for the next three meets and tracking their times, treating the fueling hypothesis as true while it leads. The disconfirmer is clear: if those switched runners show no improvement in personal-best frequency, I drop the oatmeal explanation and treat the original pattern as a placebo or selection effect, focusing instead on warm-up routine or sleep.",
        yieldAnchors: [
          "Oatmeal eaters post personal bests far more often",
          "Skippers and different-breakfast runners do so less",
          "Oatmeal eaters are spread evenly across ability levels",
          "Oatmeal eaters are spread evenly across training loads",
        ],
        riskAnchors: [
          "Have non-oatmeal runners adopt the breakfast for three meets",
          "Their personal-best frequency should rise if fueling is causal",
          "No improvement after switching refutes the model",
        ],
        defeatedBy: [
          "Attributing it to higher ability among oatmeal eaters (ability is evenly spread)",
          "Attributing it to heavier training (load is evenly spread)",
          "Concluding diet effects can't be isolated and changing nothing",
        ],
      } as WrittenRubric,
      correctAnswer:
        "The strongest model is that the steady-carb oatmeal breakfast improves race-day fueling and pacing, since the personal-best pattern tracks the meal across runners who are otherwise evenly distributed by ability and training load. I'd commit to it by having a cross-section of non-oatmeal runners adopt the same pre-race breakfast for the next three meets and tracking their times, treating the fueling hypothesis as true while it leads. The disconfirmer is clear: if those switched runners show no improvement in personal-best frequency, I drop the oatmeal explanation and treat the original pattern as a placebo or selection effect, focusing instead on warm-up routine or sleep.",
      explanation:
        "Top credit commits to the meal-tracked pattern and exposes it to a clean adoption test; the cautious 'nutrition is individual, we can't conclude anything' response is the near-zero dodge, and verbose hedging that binds none of the anchors scores low.",
    } as HomeworkItem,
  ];
}
