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
      "A bakery notices that loaves baked on its oldest oven sell out within an hour, while identical loaves from the new oven linger. Staff say the old oven 'just makes better bread.' Which lead best follows?",
    mcOptions: [
      {
        text: "The bread is identical, so the difference is random; nothing here is worth chasing.",
        credit: 0,
      },
      {
        text: "The old oven's uneven heat likely darkens the crust, which draws buyers; check whether sell-out tracks crust color, whether matching the new oven's browning closes the gap, and whether sales shift when the ovens swap positions in the display case.",
        credit: 1.0,
      },
      {
        text: "The old oven probably bakes better; we could compare the two ovens again next week.",
        credit: 0.6,
      },
      {
        text: "Something about the old oven seems to help sales.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "The old oven's uneven heat likely darkens the crust, which draws buyers; check whether sell-out tracks crust color, whether matching the new oven's browning closes the gap, and whether sales shift when the ovens swap positions in the display case.",
    explanation:
      "Top credit commits to a concrete mechanism (crust browning) and spawns three checkable follow-ups; the 'it's just random' option refuses to pick any lead and so generates no inquiry.",
  },
  {
    itemType: "mc",
    prompt:
      "A SaaS team sees that users who connect their calendar in week one renew at triple the rate of those who don't. Which conclusion opens the most checkable inquiry?",
    mcOptions: [
      {
        text: "Calendar-connecting may matter, but renewal has too many causes to say anything useful yet.",
        credit: 0,
      },
      {
        text: "Calendar connection seems linked to renewal in some way.",
        credit: 0.3,
      },
      {
        text: "Connecting likely signals that the product became part of users' daily routine; test it by prompting a random half to connect on day one and seeing if their renewal rises, by checking whether daily logins jump after connecting, and by asking whether non-connectors who still log in daily renew just as well.",
        credit: 1.0,
      },
      {
        text: "Connecting the calendar probably boosts renewal; we could watch next quarter's cohort.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "Connecting likely signals that the product became part of users' daily routine; test it by prompting a random half to connect on day one and seeing if their renewal rises, by checking whether daily logins jump after connecting, and by asking whether non-connectors who still log in daily renew just as well.",
    explanation:
      "The richest lead names a mechanism (habit formation) and three concrete tests; the 'too many causes to say anything' answer is the fertile-free dodge CCR penalizes.",
  },
  {
    itemType: "mc",
    prompt:
      "A runner finds her fastest 5K times all came on mornings she ate oatmeal beforehand. Her slow times followed skipped breakfasts. Which lead is strongest?",
    mcOptions: [
      {
        text: "Oatmeal likely steadies her blood sugar for the effort; test it by alternating oatmeal and a no-carb breakfast on matched routes, by logging mid-run energy dips, and by checking whether other slow-release carbs reproduce the effect.",
        credit: 1.0,
      },
      {
        text: "Oatmeal seems to help her running a bit.",
        credit: 0.3,
      },
      {
        text: "Diet and performance are too tangled to draw any actionable conclusion.",
        credit: 0,
      },
      {
        text: "Oatmeal probably helps; she could keep eating it and track her times.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "Oatmeal likely steadies her blood sugar for the effort; test it by alternating oatmeal and a no-carb breakfast on matched routes, by logging mid-run energy dips, and by checking whether other slow-release carbs reproduce the effect.",
    explanation:
      "The winning lead proposes a fuel mechanism and three follow-up checks, including a generalizing one; the 'too tangled' refusal yields no next step.",
  },
  {
    itemType: "mc",
    prompt:
      "A clinic notices patients booked for the last appointment of the day miss their visits twice as often as morning patients. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Late slots seem to have more no-shows.",
        credit: 0.3,
      },
      {
        text: "Late patients probably forget after a long workday, so reminders fade; test whether a 4 p.m. same-day text cuts late no-shows, whether late-slot no-shows cluster on busy weekdays, and whether patients who set their own late time still skip.",
        credit: 1.0,
      },
      {
        text: "No-show behavior is too personal to generalize from a schedule pattern.",
        credit: 0,
      },
      {
        text: "Late appointments likely cause more misses; we could try moving some patients earlier.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "Late patients probably forget after a long workday, so reminders fade; test whether a 4 p.m. same-day text cuts late no-shows, whether late-slot no-shows cluster on busy weekdays, and whether patients who set their own late time still skip.",
    explanation:
      "The fecund lead pins a cause and generates three distinct probes; 'too personal to generalize' commits to nothing and earns zero.",
  },
  {
    itemType: "mc",
    prompt:
      "A vineyard's east-facing rows yield sweeter grapes than its west-facing rows every harvest for five years. Which lead opens the most inquiry?",
    mcOptions: [
      {
        text: "Morning sun on the east rows likely warms grapes earlier and lengthens sugar build-up; check whether shaded east vines lose the edge, whether west rows catch up in a year with cool mornings, and whether soil sugar sensors show an earlier east-row rise.",
        credit: 1.0,
      },
      {
        text: "East rows just seem to do better.",
        credit: 0.3,
      },
      {
        text: "Vineyards vary so much that the pattern can't really tell us anything.",
        credit: 0,
      },
      {
        text: "The east exposure probably matters; we could test it with more harvests.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "Morning sun on the east rows likely warms grapes earlier and lengthens sugar build-up; check whether shaded east vines lose the edge, whether west rows catch up in a year with cool mornings, and whether soil sugar sensors show an earlier east-row rise.",
    explanation:
      "Top credit fixes a mechanism (morning warmth) and lists three checkable consequences; 'can't tell us anything' is the unfruitful dodge.",
  },
  {
    itemType: "mc",
    prompt:
      "An online store finds that orders with gift-wrap selected are returned 60% less often. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Returns have countless drivers, so this link isn't safe to act on.",
        credit: 0,
      },
      {
        text: "Gift orders are likely chosen carefully for someone else, so they fit better; test whether wrap-and-keep buyers also return less, whether returns rise when wrap is auto-added for free, and whether gift recipients exchange rather than refund.",
        credit: 1.0,
      },
      {
        text: "Gift-wrapped orders come back less; we might promote wrapping.",
        credit: 0.6,
      },
      {
        text: "There seems to be some tie between wrapping and fewer returns.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "Gift orders are likely chosen carefully for someone else, so they fit better; test whether wrap-and-keep buyers also return less, whether returns rise when wrap is auto-added for free, and whether gift recipients exchange rather than refund.",
    explanation:
      "The strongest lead names buyer intent as the cause and proposes three tests that could refute it; the 'countless drivers' answer is a fruitless refusal.",
  },
  {
    itemType: "mc",
    prompt:
      "A teacher observes that students who handwrite notes score higher on essays than laptop note-takers, even on the same lectures. Which lead is strongest?",
    mcOptions: [
      {
        text: "Note-taking style might link to scores, but learning is too complex to commit to a cause.",
        credit: 0,
      },
      {
        text: "Handwriting seems to go with better essays.",
        credit: 0.3,
      },
      {
        text: "Handwriting probably forces summarizing rather than transcribing, deepening processing; test whether laptop users told to paraphrase catch up, whether handwritten notes contain fewer verbatim phrases, and whether essay gains track note-summary density.",
        credit: 1.0,
      },
      {
        text: "Handwriting likely helps essays; we could assign it and see scores.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "Handwriting probably forces summarizing rather than transcribing, deepening processing; test whether laptop users told to paraphrase catch up, whether handwritten notes contain fewer verbatim phrases, and whether essay gains track note-summary density.",
    explanation:
      "The fecund lead isolates summarizing as the active ingredient and spawns three measurable checks; the 'too complex to commit' option opens no inquiry.",
  },
  {
    itemType: "mc",
    prompt:
      "A city sees bike-share trips spike on the three days after it repaints a crosswalk bright green near a station. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Urban behavior is too noisy to credit a paint job for ridership.",
        credit: 0,
      },
      {
        text: "Riders seem to respond to the new crosswalk.",
        credit: 0.3,
      },
      {
        text: "The green crosswalk probably makes the crossing feel safer, drawing riders; test whether ridership holds past the novelty week, whether other stations spike when painted, and whether near-miss reports at the crossing drop.",
        credit: 1.0,
      },
      {
        text: "The crosswalk likely boosted trips; we could repaint and watch.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "The green crosswalk probably makes the crossing feel safer, drawing riders; test whether ridership holds past the novelty week, whether other stations spike when painted, and whether near-miss reports at the crossing drop.",
    explanation:
      "Top credit commits to a safety-perception mechanism and three follow-ups, one guarding against novelty; the 'too noisy' answer is the barren dodge.",
  },
  {
    itemType: "mc",
    prompt:
      "A support team finds tickets resolved by phone get 5-star ratings far more than those resolved by email, even for the same issue types. Which lead opens the most inquiry?",
    mcOptions: [
      {
        text: "Phone calls probably let agents reassure customers in real time, lifting ratings; test whether email replies with a personal video clip close the gap, whether call ratings drop on long hold times, and whether tone-matched emails score better.",
        credit: 1.0,
      },
      {
        text: "Phone support seems to please customers more.",
        credit: 0.3,
      },
      {
        text: "Satisfaction depends on too many things to attribute it to the channel.",
        credit: 0,
      },
      {
        text: "Phone likely raises ratings; we could route more issues to calls.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "Phone calls probably let agents reassure customers in real time, lifting ratings; test whether email replies with a personal video clip close the gap, whether call ratings drop on long hold times, and whether tone-matched emails score better.",
    explanation:
      "The richest lead names real-time reassurance and three tests that could disconfirm it; the 'too many things' option refuses to lead.",
  },
  {
    itemType: "mc",
    prompt:
      "A gardener notes tomato plants beside the basil row produce more fruit than identical plants across the yard. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Basil-adjacent tomatoes seem more productive.",
        credit: 0.3,
      },
      {
        text: "Gardens have too many variables to say basil did anything.",
        credit: 0,
      },
      {
        text: "Basil likely repels a pest that saps the tomatoes; test whether netted tomatoes without basil match the yield, whether pest counts are lower in the basil row, and whether other aromatic herbs reproduce the boost.",
        credit: 1.0,
      },
      {
        text: "Basil probably helps the tomatoes; we could plant more basil next year.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "Basil likely repels a pest that saps the tomatoes; test whether netted tomatoes without basil match the yield, whether pest counts are lower in the basil row, and whether other aromatic herbs reproduce the boost.",
    explanation:
      "The fecund lead proposes a pest mechanism and three concrete checks; 'too many variables' yields no testable next move.",
  },
  {
    itemType: "mc",
    prompt:
      "A podcast finds episodes released on Tuesday get 40% more downloads in week one than Friday episodes. Which lead is strongest?",
    mcOptions: [
      {
        text: "Download patterns are too fickle to build a release strategy on.",
        credit: 0,
      },
      {
        text: "Tuesday episodes likely catch a midweek commute-listening peak; test whether download timestamps cluster at commute hours, whether a Friday episode moved to Tuesday gains, and whether subscribers vs. new listeners drive the Tuesday bump.",
        credit: 1.0,
      },
      {
        text: "Tuesday seems like a better release day.",
        credit: 0.3,
      },
      {
        text: "Tuesday probably wins; we could keep releasing then and watch.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "Tuesday episodes likely catch a midweek commute-listening peak; test whether download timestamps cluster at commute hours, whether a Friday episode moved to Tuesday gains, and whether subscribers vs. new listeners drive the Tuesday bump.",
    explanation:
      "Top credit names a commute mechanism and three follow-up observations; the 'too fickle' answer commits to nothing.",
  },
  {
    itemType: "mc",
    prompt:
      "A factory finds that defect rates climb on the afternoon shift even though the same machines and workers rotate through. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Afternoon glare from west windows probably strains inspectors' eyes; test whether blinds cut afternoon defects, whether defects track sunny vs. cloudy afternoons, and whether the missed defects are visual rather than mechanical types.",
        credit: 1.0,
      },
      {
        text: "Afternoons seem to have more defects.",
        credit: 0.3,
      },
      {
        text: "Defects probably rise in the afternoon; we could inspect twice then.",
        credit: 0.6,
      },
      {
        text: "Shift effects are too murky to pin on any single factor.",
        credit: 0,
      },
    ],
    correctAnswer:
      "Afternoon glare from west windows probably strains inspectors' eyes; test whether blinds cut afternoon defects, whether defects track sunny vs. cloudy afternoons, and whether the missed defects are visual rather than mechanical types.",
    explanation:
      "The strongest lead pins glare as a cause and lists three checkable consequences; 'too murky' refuses to lead and earns zero.",
  },
  {
    itemType: "mc",
    prompt:
      "A streaming app sees users who finish the first episode of any show within 24 hours are far likelier to finish the season. Which lead opens the most inquiry?",
    mcOptions: [
      {
        text: "Binge behavior is too idiosyncratic to draw a usable lead from.",
        credit: 0,
      },
      {
        text: "Fast first-episode finishers seem more committed.",
        credit: 0.3,
      },
      {
        text: "Early completion likely reflects a strong hook that builds momentum; test whether nudging slow starters with a recap raises completion, whether shows with cliffhanger pilots show bigger gaps, and whether the effect survives controlling for total watch time.",
        credit: 1.0,
      },
      {
        text: "Quick starters probably finish more; we could track future seasons.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "Early completion likely reflects a strong hook that builds momentum; test whether nudging slow starters with a recap raises completion, whether shows with cliffhanger pilots show bigger gaps, and whether the effect survives controlling for total watch time.",
    explanation:
      "The fecund lead names momentum and three tests, including a confound check; 'too idiosyncratic' opens no path.",
  },
  {
    itemType: "mc",
    prompt:
      "A coffee chain finds stores that play instrumental music sell more pastries than stores playing songs with lyrics. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Music and sales are too loosely connected to act on.",
        credit: 0,
      },
      {
        text: "Instrumental music probably keeps customers lingering and browsing the case longer; test whether dwell time is longer in instrumental stores, whether switching a lyric store to instrumental lifts pastry sales, and whether tempo, not lyrics, is what matters.",
        credit: 1.0,
      },
      {
        text: "Instrumental stores seem to sell more pastries.",
        credit: 0.3,
      },
      {
        text: "Instrumental music likely helps; we could switch a few stores and see.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "Instrumental music probably keeps customers lingering and browsing the case longer; test whether dwell time is longer in instrumental stores, whether switching a lyric store to instrumental lifts pastry sales, and whether tempo, not lyrics, is what matters.",
    explanation:
      "Top credit commits to a dwell-time mechanism and three probes, one isolating the real variable; the 'too loosely connected' option is the unfruitful dodge.",
  },
  {
    itemType: "mc",
    prompt:
      "A school finds that classes held right after lunch score lowest on quizzes regardless of subject or teacher. Which lead is strongest?",
    mcOptions: [
      {
        text: "Post-lunch digestion probably dips alertness; test whether a short walk before class lifts scores, whether lighter lunches predict better quizzes, and whether the dip shrinks for material taught interactively rather than by lecture.",
        credit: 1.0,
      },
      {
        text: "After-lunch classes seem to do worse.",
        credit: 0.3,
      },
      {
        text: "The timing probably hurts scores; we could reshuffle the schedule.",
        credit: 0.6,
      },
      {
        text: "Quiz performance has too many inputs to blame the lunch slot.",
        credit: 0,
      },
    ],
    correctAnswer:
      "Post-lunch digestion probably dips alertness; test whether a short walk before class lifts scores, whether lighter lunches predict better quizzes, and whether the dip shrinks for material taught interactively rather than by lecture.",
    explanation:
      "The fecund lead names an alertness mechanism and three distinct interventions to check; the 'too many inputs' answer commits to no lead.",
  },
];

const hybrid: HomeworkItem[] = [
  {
    itemType: "hybrid",
    prompt:
      "A gym finds that members who book classes through the app attend 70% of the time, while drop-ins attend sporadically. Membership cancellations are lowest among app-bookers. Which lead best follows?",
    mcOptions: [
      {
        text: "Booking through the app likely creates a small commitment that locks in attendance; test whether forcing drop-ins to pre-book raises their show rate, whether app-bookers who miss a class cancel sooner, and whether a one-tap 'I'm coming' reminder lifts attendance further.",
        credit: 1.0,
      },
      {
        text: "App-bookers seem more loyal.",
        credit: 0.3,
      },
      {
        text: "Gym habits are too personal to credit the booking flow.",
        credit: 0,
      },
      {
        text: "The app probably drives attendance; we could push more members to use it.",
        credit: 0.6,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your commitment lead from the rival 'app-users are simply more motivated people,' and say what result would refute your lead.",
      modelAnswer:
        "Cheapest test: randomly require pre-booking from a subset of current drop-ins and watch their attendance — if booking causes the commitment, their show rate should jump toward 70%. My lead is refuted if forced pre-bookers attend no more than they did as drop-ins, which would point to motivation rather than the booking act.",
      yieldAnchors: [
        "App-bookers attend 70% of the time",
        "Drop-ins attend sporadically",
        "Cancellations are lowest among app-bookers",
      ],
      riskAnchors: [
        "Forcing drop-ins to pre-book raises their show rate",
        "App-bookers who miss a class cancel sooner",
        "A one-tap reminder lifts attendance further",
      ],
      defeatedBy: [
        "The app has no effect and only motivated people use it",
        "Booking method is unrelated to cancellation",
      ],
    },
    correctAnswer:
      "Booking through the app likely creates a small commitment that locks in attendance; test whether forcing drop-ins to pre-book raises their show rate, whether app-bookers who miss a class cancel sooner, and whether a one-tap 'I'm coming' reminder lifts attendance further.",
    explanation:
      "Full credit goes to the lead that commits to a commitment-mechanism, spawns three checks, and is paired with a cheap randomized test that names its own refutation; 'too personal' opens nothing.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A wildlife camera shows that a meadow's deer feed at dawn on most days, but on the few days a nearby owl calls before sunrise, the deer feed an hour later and stay near tree cover. Which lead is strongest?",
    mcOptions: [
      {
        text: "Deer behavior is too variable to tie to owl calls.",
        credit: 0,
      },
      {
        text: "The owl call likely signals predator activity, making deer cautious; test whether played-back owl calls reproduce the delay, whether the effect fades after repeated harmless mornings, and whether other predator sounds trigger the same caution.",
        credit: 1.0,
      },
      {
        text: "Owl mornings seem to change the deer's routine.",
        credit: 0.3,
      },
      {
        text: "The owl probably affects feeding; we could record more owl days.",
        credit: 0.6,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your predator-cue lead from the rival 'the deer just happen to feed late on those days,' and say what result would refute your lead.",
      modelAnswer:
        "Cheapest test: play a recorded owl call before dawn on otherwise normal mornings and see whether the deer delay and hug cover as predicted. My lead is refuted if the playback produces no change in feeding time or location, meaning the call is not the cue.",
      yieldAnchors: [
        "Deer normally feed at dawn",
        "On owl-call mornings they feed an hour later",
        "On owl-call mornings they stay near tree cover",
      ],
      riskAnchors: [
        "Played-back owl calls reproduce the delay",
        "The effect fades after repeated harmless mornings",
        "Other predator sounds trigger the same caution",
      ],
      defeatedBy: [
        "Owl calls and feeding times are unrelated",
        "The deer feed late on those days for random reasons",
      ],
    },
    correctAnswer:
      "The owl call likely signals predator activity, making deer cautious; test whether played-back owl calls reproduce the delay, whether the effect fades after repeated harmless mornings, and whether other predator sounds trigger the same caution.",
    explanation:
      "Top credit commits to a predator-cue mechanism with three follow-ups and a cheap playback test that states its own disconfirmation; 'too variable' is the barren refusal.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A startup notices its blog posts that include a hand-drawn diagram get shared three times as often as text-only posts, across many topics and authors. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Hand-drawn diagrams likely make ideas feel approachable and screenshot-worthy; test whether the same posts with polished stock graphics share less, whether shares cluster on the diagram image itself, and whether adding a diagram to an old text post revives its sharing.",
        credit: 1.0,
      },
      {
        text: "Diagram posts seem to get shared more.",
        credit: 0.3,
      },
      {
        text: "Sharing depends on too many factors to credit the diagrams.",
        credit: 0,
      },
      {
        text: "Diagrams probably help sharing; we could add more of them.",
        credit: 0.6,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your 'hand-drawn approachability' lead from the rival 'any image boosts shares,' and say what result would refute your lead.",
      modelAnswer:
        "Cheapest test: take matched posts and give half a hand-drawn diagram and half a polished stock graphic, then compare shares — my lead predicts the hand-drawn version wins. It is refuted if the stock-graphic posts share just as much, showing it is images in general, not the hand-drawn style.",
      yieldAnchors: [
        "Diagram posts get shared three times as often",
        "The effect holds across topics",
        "The effect holds across authors",
      ],
      riskAnchors: [
        "Polished stock graphics share less than hand-drawn ones",
        "Shares cluster on the diagram image itself",
        "Adding a diagram revives an old post's sharing",
      ],
      defeatedBy: [
        "Any image at all produces the same boost",
        "Diagrams are unrelated to sharing",
      ],
    },
    correctAnswer:
      "Hand-drawn diagrams likely make ideas feel approachable and screenshot-worthy; test whether the same posts with polished stock graphics share less, whether shares cluster on the diagram image itself, and whether adding a diagram to an old text post revives its sharing.",
    explanation:
      "The richest lead specifies the hand-drawn quality as the active ingredient with three checks and a head-to-head test that names its refutation; 'too many factors' leads nowhere.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A hospital finds that surgical patients given a printed recovery checklist have fewer readmissions than those given only verbal instructions, across surgeons and procedures. Which lead is strongest?",
    mcOptions: [
      {
        text: "Readmissions have too many causes to attribute to a checklist.",
        credit: 0,
      },
      {
        text: "Checklist patients seem to recover better.",
        credit: 0.3,
      },
      {
        text: "The checklist probably lets patients catch warning signs early at home; test whether checklist users call the clinic sooner, whether readmission causes shift toward preventable ones, and whether a phone-app version reproduces the benefit.",
        credit: 1.0,
      },
      {
        text: "The checklist likely helps; we could give it to everyone.",
        credit: 0.6,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your 'early self-monitoring' lead from the rival 'checklist patients were healthier to begin with,' and say what result would refute your lead.",
      modelAnswer:
        "Cheapest test: randomize the checklist among comparable post-op patients and compare readmissions — random assignment removes baseline-health differences, so a remaining gap supports self-monitoring. My lead is refuted if randomized checklist and verbal-only groups readmit at the same rate.",
      yieldAnchors: [
        "Checklist patients have fewer readmissions",
        "The effect holds across surgeons",
        "The effect holds across procedures",
      ],
      riskAnchors: [
        "Checklist users call the clinic sooner",
        "Readmission causes shift toward preventable ones",
        "A phone-app version reproduces the benefit",
      ],
      defeatedBy: [
        "Checklist patients were simply healthier to begin with",
        "The checklist has no effect on readmission",
      ],
    },
    correctAnswer:
      "The checklist probably lets patients catch warning signs early at home; test whether checklist users call the clinic sooner, whether readmission causes shift toward preventable ones, and whether a phone-app version reproduces the benefit.",
    explanation:
      "Full credit commits to an early-monitoring mechanism with three follow-ups and a randomized test that names its refutation; 'too many causes' is the dodge.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A bookstore finds that displaying a staff hand-written review card next to a book triples that title's sales, even for obscure titles. Which conclusion best follows?",
    mcOptions: [
      {
        text: "The review card likely lends a trusted personal recommendation that lowers buying risk; test whether unsigned generic cards work as well, whether sales drop when the same staffer reviews too many books, and whether online listings with staff quotes show the same lift.",
        credit: 1.0,
      },
      {
        text: "Cards seem to sell books.",
        credit: 0.3,
      },
      {
        text: "Book sales swing for too many reasons to credit the cards.",
        credit: 0,
      },
      {
        text: "The cards probably help; we could add more of them.",
        credit: 0.6,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your 'trusted personal recommendation' lead from the rival 'any extra display signage sells books,' and say what result would refute your lead.",
      modelAnswer:
        "Cheapest test: put a generic 'Recommended' card on some titles and a signed personal staff review on others, then compare sales — my lead predicts the signed personal card wins. It is refuted if the generic card sells just as well, showing it is signage, not the personal trust.",
      yieldAnchors: [
        "Review card triples sales",
        "The effect holds even for obscure titles",
        "Cards are hand-written by staff",
      ],
      riskAnchors: [
        "Unsigned generic cards work less well",
        "Sales drop when one staffer reviews too many books",
        "Online staff quotes show the same lift",
      ],
      defeatedBy: [
        "Any signage at all produces the boost",
        "The cards are unrelated to sales",
      ],
    },
    correctAnswer:
      "The review card likely lends a trusted personal recommendation that lowers buying risk; test whether unsigned generic cards work as well, whether sales drop when the same staffer reviews too many books, and whether online listings with staff quotes show the same lift.",
    explanation:
      "The fecund lead names trusted personal endorsement with three checks and a controlled comparison that states its own refutation; 'too many reasons' opens no inquiry.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A delivery company sees that routes assigned to drivers who choose their own stop order finish faster than algorithm-ordered routes, despite covering the same addresses. Which lead is strongest?",
    mcOptions: [
      {
        text: "Driver-chosen orders probably exploit local knowledge the algorithm lacks, like school traffic times; test whether drivers narrate the shortcuts they use, whether the gap shrinks on unfamiliar routes, and whether feeding driver-known constraints to the algorithm closes the gap.",
        credit: 1.0,
      },
      {
        text: "Driver-chosen routes seem faster.",
        credit: 0.3,
      },
      {
        text: "Route times depend on too much to credit who orders the stops.",
        credit: 0,
      },
      {
        text: "Letting drivers choose probably helps; we could expand it.",
        credit: 0.6,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your 'local-knowledge' lead from the rival 'drivers just rush more on their own routes,' and say what result would refute your lead.",
      modelAnswer:
        "Cheapest test: compare the gap on drivers' familiar routes versus brand-new routes they've never run — my lead predicts the advantage shrinks where local knowledge can't apply. It is refuted if driver-chosen routes stay equally faster on unfamiliar territory, pointing to effort rather than knowledge.",
      yieldAnchors: [
        "Driver-chosen routes finish faster",
        "They cover the same addresses",
        "The comparison is against algorithm ordering",
      ],
      riskAnchors: [
        "The gap shrinks on unfamiliar routes",
        "Drivers can narrate specific shortcuts",
        "Feeding driver constraints to the algorithm closes the gap",
      ],
      defeatedBy: [
        "Drivers simply rush on self-chosen routes",
        "Stop order is unrelated to finish time",
      ],
    },
    correctAnswer:
      "Driver-chosen orders probably exploit local knowledge the algorithm lacks, like school traffic times; test whether drivers narrate the shortcuts they use, whether the gap shrinks on unfamiliar routes, and whether feeding driver-known constraints to the algorithm closes the gap.",
    explanation:
      "Top credit commits to a local-knowledge mechanism with three follow-ups and a familiar-vs-new test that names its refutation; 'too much' is the empty refusal.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A language app finds that learners who review with audio-only flashcards retain vocabulary longer than those using text flashcards, across many languages. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Retention is too individual to attribute to the card format.",
        credit: 0,
      },
      {
        text: "Audio cards probably force active recall of sound-to-meaning, strengthening memory; test whether learners who say the word aloud with text cards catch up, whether audio's edge is largest for spoken-test items, and whether mixed audio-text cards beat both.",
        credit: 1.0,
      },
      {
        text: "Audio cards seem to help retention.",
        credit: 0.3,
      },
      {
        text: "Audio probably helps; we could make more audio cards.",
        credit: 0.6,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your 'active sound recall' lead from the rival 'audio learners simply study more,' and say what result would refute your lead.",
      modelAnswer:
        "Cheapest test: match study time across the two groups and compare retention — if time is equal and audio still wins, the format matters. My lead is refuted if equal-time audio and text learners retain the same, meaning study volume, not recall mode, drove the gap.",
      yieldAnchors: [
        "Audio-only learners retain vocabulary longer",
        "The effect holds across many languages",
        "The comparison is against text flashcards",
      ],
      riskAnchors: [
        "Saying text words aloud lets text learners catch up",
        "Audio's edge is largest for spoken-test items",
        "Mixed audio-text cards beat both",
      ],
      defeatedBy: [
        "Audio learners simply spend more time studying",
        "Card format is unrelated to retention",
      ],
    },
    correctAnswer:
      "Audio cards probably force active recall of sound-to-meaning, strengthening memory; test whether learners who say the word aloud with text cards catch up, whether audio's edge is largest for spoken-test items, and whether mixed audio-text cards beat both.",
    explanation:
      "The richest lead specifies active sound recall with three checks and a matched-time test that names its refutation; 'too individual' is the unfruitful dodge.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A nonprofit finds that donors who receive a photo of the specific child they sponsor renew at far higher rates than those who get only a thank-you letter. Which lead is strongest?",
    mcOptions: [
      {
        text: "Donation behavior is too complex to pin on a photo.",
        credit: 0,
      },
      {
        text: "Photo donors seem more loyal.",
        credit: 0.3,
      },
      {
        text: "The specific photo probably makes the impact feel concrete and personal, sustaining commitment; test whether a generic stock photo works as well, whether renewal rises with photo update frequency, and whether short video clips outperform photos.",
        credit: 1.0,
      },
      {
        text: "Photos probably help renewal; we could send more of them.",
        credit: 0.6,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your 'concrete personal impact' lead from the rival 'any image lifts renewal,' and say what result would refute your lead.",
      modelAnswer:
        "Cheapest test: send some donors a generic stock child photo and others the specific sponsored child's photo, then compare renewals — my lead predicts the specific photo wins. It is refuted if the generic photo renews just as well, showing it is imagery, not personal specificity.",
      yieldAnchors: [
        "Photo donors renew at far higher rates",
        "The photo shows the specific sponsored child",
        "The comparison is against a thank-you letter only",
      ],
      riskAnchors: [
        "A generic stock photo works less well",
        "Renewal rises with photo update frequency",
        "Short video clips outperform photos",
      ],
      defeatedBy: [
        "Any image at all produces the renewal lift",
        "The photo is unrelated to renewal",
      ],
    },
    correctAnswer:
      "The specific photo probably makes the impact feel concrete and personal, sustaining commitment; test whether a generic stock photo works as well, whether renewal rises with photo update frequency, and whether short video clips outperform photos.",
    explanation:
      "Full credit names concrete personal impact with three follow-ups and a specific-vs-generic test that states its refutation; 'too complex' commits to no lead.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A research lab finds that experiments run by pairs of scientists are reproduced by other labs more often than solo-run experiments, across fields. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Pairs probably cross-check protocol steps that solo workers skip or misremember; test whether solo experiments with a written-protocol audit reproduce better, whether pair advantage is largest for procedure-heavy methods, and whether pairs' lab notebooks record more detail.",
        credit: 1.0,
      },
      {
        text: "Paired experiments seem more reproducible.",
        credit: 0.3,
      },
      {
        text: "Reproducibility has too many drivers to credit team size.",
        credit: 0,
      },
      {
        text: "Pairs probably help; we could require two scientists per study.",
        credit: 0.6,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your 'cross-checking protocol' lead from the rival 'better scientists choose to work in pairs,' and say what result would refute your lead.",
      modelAnswer:
        "Cheapest test: give solo workers a mandatory written-protocol audit step and see whether their reproduction rate rises toward the pairs' — if cross-checking is the mechanism, the audit should close much of the gap. My lead is refuted if audited solo experiments reproduce no better, pointing to scientist quality instead.",
      yieldAnchors: [
        "Paired experiments are reproduced more often",
        "The effect holds across fields",
        "The comparison is against solo-run experiments",
      ],
      riskAnchors: [
        "A written-protocol audit lifts solo reproduction",
        "Pair advantage is largest for procedure-heavy methods",
        "Pairs' notebooks record more detail",
      ],
      defeatedBy: [
        "Better scientists simply choose to work in pairs",
        "Team size is unrelated to reproducibility",
      ],
    },
    correctAnswer:
      "Pairs probably cross-check protocol steps that solo workers skip or misremember; test whether solo experiments with a written-protocol audit reproduce better, whether pair advantage is largest for procedure-heavy methods, and whether pairs' lab notebooks record more detail.",
    explanation:
      "The fecund lead pins cross-checking as the cause with three checks and an audit test that names its refutation; 'too many drivers' yields no actionable lead.",
  },
];

const written: HomeworkItem[] = [
  {
    itemType: "written",
    prompt:
      "A neighborhood coffee shop notices that on rainy days it sells far more of its lemon cake than usual, while its other pastries hold steady. The owner also recalls that rainy days bring in more remote workers who stay for hours. In one paragraph, propose the strongest lead for why lemon-cake sales spike on rainy days and describe how you would test it.",
    writtenRubric: {
      modelAnswer:
        "The strongest lead is that rain brings in long-staying remote workers who pair a bright, comforting lemon cake with their second or third coffee, so lemon cake is a 'lingering treat' rather than a rain-weather craving in general. This is fecund because it predicts checkable consequences: lemon-cake buyers should have longer dwell times and more drinks per visit than other-pastry buyers; the spike should track the count of laptop/long-stay customers rather than rainfall itself; and offering a second comforting cake should split the rainy-day bump. I would test it by logging dwell time and drink count against pastry choice for two weeks, by checking whether a sunny but slow workday with many laptop stayers also lifts lemon cake, and by adding a rival comfort cake to see whether lemon's spike shrinks.",
      yieldAnchors: [
        "Lemon cake sales spike on rainy days",
        "Other pastries hold steady",
        "Rainy days bring more remote workers who stay for hours",
      ],
      riskAnchors: [
        "Lemon-cake buyers show longer dwell times and more drinks per visit",
        "The spike tracks long-stay customer counts rather than rainfall",
        "Adding a second comfort cake splits the rainy-day bump",
      ],
      defeatedBy: [
        "Rain directly causes lemon cravings regardless of customer type",
        "All pastries rise on rainy days",
        "Nothing can be concluded without more rainy-day data",
      ],
    },
    correctAnswer:
      "The strongest lead is that rain brings in long-staying remote workers who pair a bright, comforting lemon cake with their second or third coffee, so lemon cake is a 'lingering treat' rather than a rain-weather craving in general. This is fecund because it predicts checkable consequences: lemon-cake buyers should have longer dwell times and more drinks per visit than other-pastry buyers; the spike should track the count of laptop/long-stay customers rather than rainfall itself; and offering a second comforting cake should split the rainy-day bump. I would test it by logging dwell time and drink count against pastry choice for two weeks, by checking whether a sunny but slow workday with many laptop stayers also lifts lemon cake, and by adding a rival comfort cake to see whether lemon's spike shrinks.",
    explanation:
      "Under CCR's inverted standard, the cautious 'we need more rainy days before saying anything' earns near-zero, and a florid answer that names no test scores low; top credit goes to the lead that spawns the most checkable follow-up observations.",
  },
  {
    itemType: "written",
    prompt:
      "A high-school robotics team notices that in the last four competitions, their robot jams only during matches played on the carpeted arena, never on the bare-floor arena. The jams always happen right after a sharp turn. In one paragraph, propose the strongest lead for the jamming and describe how you would test it.",
    writtenRubric: {
      modelAnswer:
        "The strongest lead is that carpet fibers catch in the wheels or treads during sharp turns, where lateral force lets fibers wedge into the drivetrain and bind it. This lead is fecund because it predicts many checkable things: inspecting the wheels after a carpet jam should reveal trapped fibers; jams should worsen with tighter, faster turns and ease with gentler ones; and a wheel guard or smoother tire should reduce or eliminate carpet jams without hurting bare-floor runs. I would test it by examining the drivetrain immediately after each carpet match, by deliberately running tight versus wide turns on carpet to see whether jam frequency tracks turn sharpness, and by fitting a fiber guard and rerunning the same course.",
      yieldAnchors: [
        "Jams occur only on the carpeted arena",
        "Jams never occur on bare floor",
        "Jams always follow a sharp turn",
      ],
      riskAnchors: [
        "Post-jam inspection reveals fibers trapped in the drivetrain",
        "Jam frequency tracks turn sharpness on carpet",
        "A wheel guard or smoother tire reduces carpet jams",
      ],
      defeatedBy: [
        "The jams are random and unrelated to surface",
        "The robot's software is at fault regardless of floor",
        "Four competitions is too few to suspect anything",
      ],
    },
    correctAnswer:
      "The strongest lead is that carpet fibers catch in the wheels or treads during sharp turns, where lateral force lets fibers wedge into the drivetrain and bind it. This lead is fecund because it predicts many checkable things: inspecting the wheels after a carpet jam should reveal trapped fibers; jams should worsen with tighter, faster turns and ease with gentler ones; and a wheel guard or smoother tire should reduce or eliminate carpet jams without hurting bare-floor runs. I would test it by examining the drivetrain immediately after each carpet match, by deliberately running tight versus wide turns on carpet to see whether jam frequency tracks turn sharpness, and by fitting a fiber guard and rerunning the same course.",
    explanation:
      "The 'four competitions is too few to suspect anything' refusal earns near-zero under CCR; credit rewards committing to the surface-and-turn lead that opens the most concrete inspections and interventions.",
  },
  {
    itemType: "written",
    prompt:
      "A regional manager finds that one of her twelve stores consistently outperforms the rest on customer-satisfaction scores, despite the same products, prices, and training. She notices that store also has the lowest staff turnover and that its manager personally greets regulars by name. In one paragraph, propose the strongest lead and how you would test it.",
    writtenRubric: {
      modelAnswer:
        "The strongest lead is that the manager's personal recognition builds regular-customer relationships and low staff turnover, and those stable relationships are what drive the satisfaction scores. This lead is fecund because it generates checkable predictions: satisfaction at the store should be highest among repeat customers and among those the manager greets by name; if that manager were rotated to a low-scoring store, satisfaction there should climb over a few months; and stores that cut turnover through retention bonuses should see satisfaction rise even without the greeting habit. I would test it by segmenting satisfaction scores by customer-repeat status, by running a temporary manager swap and tracking both stores' scores, and by piloting a retention program at a weaker store to isolate the turnover channel.",
      yieldAnchors: [
        "One store outperforms on satisfaction despite identical products, prices, and training",
        "That store has the lowest staff turnover",
        "Its manager greets regulars by name",
      ],
      riskAnchors: [
        "Satisfaction is highest among repeat and greeted customers",
        "Rotating the manager lifts a weaker store's scores",
        "A retention program raises satisfaction at another store",
      ],
      defeatedBy: [
        "The high scores are random luck across twelve stores",
        "Products, prices, or training secretly differ",
        "Nothing can be said until all stores are surveyed identically",
      ],
    },
    correctAnswer:
      "The strongest lead is that the manager's personal recognition builds regular-customer relationships and low staff turnover, and those stable relationships are what drive the satisfaction scores. This lead is fecund because it generates checkable predictions: satisfaction at the store should be highest among repeat customers and among those the manager greets by name; if that manager were rotated to a low-scoring store, satisfaction there should climb over a few months; and stores that cut turnover through retention bonuses should see satisfaction rise even without the greeting habit. I would test it by segmenting satisfaction scores by customer-repeat status, by running a temporary manager swap and tracking both stores' scores, and by piloting a retention program at a weaker store to isolate the turnover channel.",
    explanation:
      "CCR gives near-zero to 'it's just random luck' or 'we can't say until everyone is surveyed'; top credit goes to the relationship lead that commits to a mechanism and names a manager-swap test that could refute it.",
  },
  {
    itemType: "written",
    prompt:
      "A physical therapist observes that patients recovering from knee surgery who keep a daily pain-and-activity journal regain mobility faster than those who don't, even when given the same exercises. Journal-keepers also report fewer skipped sessions. In one paragraph, propose the strongest lead and describe how you would test it.",
    writtenRubric: {
      modelAnswer:
        "The strongest lead is that journaling makes patients notice and adjust their daily activity, which improves exercise adherence and lets them push the right amount, speeding mobility. This lead is fecund because it predicts checkable consequences: journal-keepers should show steadier session attendance and more consistent home-exercise logs; the mobility advantage should be largest for patients whose journals reveal the most adjustments; and giving non-journalers a simple checkbox adherence prompt should narrow the gap. I would test it by randomizing the journal among new post-op patients to rule out self-selection, by correlating mobility gains with journal-recorded adjustments, and by adding a lightweight reminder prompt to a control group to see whether adherence alone reproduces the benefit.",
      yieldAnchors: [
        "Journal-keepers regain mobility faster",
        "Both groups get the same exercises",
        "Journal-keepers report fewer skipped sessions",
      ],
      riskAnchors: [
        "Randomized journaling still speeds mobility",
        "Mobility gains track the number of journal-recorded adjustments",
        "An adherence prompt narrows the gap for non-journalers",
      ],
      defeatedBy: [
        "Journal-keepers were simply more motivated patients",
        "The journal has no effect at all",
        "Recovery is too individual to draw any lead",
      ],
    },
    correctAnswer:
      "The strongest lead is that journaling makes patients notice and adjust their daily activity, which improves exercise adherence and lets them push the right amount, speeding mobility. This lead is fecund because it predicts checkable consequences: journal-keepers should show steadier session attendance and more consistent home-exercise logs; the mobility advantage should be largest for patients whose journals reveal the most adjustments; and giving non-journalers a simple checkbox adherence prompt should narrow the gap. I would test it by randomizing the journal among new post-op patients to rule out self-selection, by correlating mobility gains with journal-recorded adjustments, and by adding a lightweight reminder prompt to a control group to see whether adherence alone reproduces the benefit.",
    explanation:
      "The cautious 'recovery is too individual to draw any lead' earns near-zero; credit goes to the adherence-and-awareness lead that names a randomized test and several checkable follow-ups.",
  },
  {
    itemType: "written",
    prompt:
      "An indie game studio notices that players who finish the tutorial level are five times more likely to still be playing a week later, while most quitters leave during the tutorial's third puzzle. Analytics show that third puzzle has the longest average attempt time. In one paragraph, propose the strongest lead and how you would test it.",
    writtenRubric: {
      modelAnswer:
        "The strongest lead is that the third puzzle is a difficulty wall that frustrates new players before they're invested, so smoothing it should raise both tutorial completion and week-one retention. This lead is fecund because it spawns checkable predictions: quit timestamps should cluster tightly at the third puzzle's attempt spikes; players who get an optional hint there should complete the tutorial more often; and easing only that puzzle—not others—should move retention while leaving later-quitting players unchanged. I would test it by plotting exact quit points against attempt time, by A/B testing a hint or slight difficulty reduction on the third puzzle, and by confirming that the change lifts week-one retention without altering where the remaining quitters drop off.",
      yieldAnchors: [
        "Tutorial-finishers are five times likelier to still be playing a week later",
        "Most quitters leave during the third puzzle",
        "The third puzzle has the longest average attempt time",
      ],
      riskAnchors: [
        "Quit timestamps cluster at the third puzzle's attempt spikes",
        "An optional hint there raises tutorial completion",
        "Easing only that puzzle lifts week-one retention",
      ],
      defeatedBy: [
        "Players quit for unrelated reasons scattered through the tutorial",
        "Difficulty is irrelevant and retention is fixed by player type",
        "We can't act until far more players are tracked",
      ],
    },
    correctAnswer:
      "The strongest lead is that the third puzzle is a difficulty wall that frustrates new players before they're invested, so smoothing it should raise both tutorial completion and week-one retention. This lead is fecund because it spawns checkable predictions: quit timestamps should cluster tightly at the third puzzle's attempt spikes; players who get an optional hint there should complete the tutorial more often; and easing only that puzzle—not others—should move retention while leaving later-quitting players unchanged. I would test it by plotting exact quit points against attempt time, by A/B testing a hint or slight difficulty reduction on the third puzzle, and by confirming that the change lifts week-one retention without altering where the remaining quitters drop off.",
    explanation:
      "Under CCR, 'we can't act until far more players are tracked' scores near-zero, and an elaborate answer with no test scores low; top credit goes to the difficulty-wall lead that names an A/B test and several checkable consequences.",
  },
];

export const section: SectionContent = {
  slug: "fecund-lead",
  title: "The Fecund Lead",
  weekNumber: 1,
  blurb:
    "When several explanations fit the same facts, back the most fecund one — the lead that spawns the most concrete, checkable questions and predicts the most you can go out and verify.",
  lectureTitle:
    "1.1 The Fecund Lead: prefer the hypothesis that opens the most checkable questions",
  body: `# The Fecund Lead

When the data fit more than one story, which story should you back? Reflexive caution says "back none — we need more data." Constructive Critical Reasoning says the opposite: commit to the **most fecund** lead. A fecund hypothesis is a *fruitful* one — it opens the most new, concrete, checkable lines of inquiry and predicts the most further observations you can actually go and collect.

## Fertility is a virtue, not a luxury

Two hypotheses can fit the evidence in front of you equally well and still differ enormously in value. A "safe" hypothesis that fits the data but predicts nothing further is a dead end: there is nowhere to go next. A fertile hypothesis pays rent by generating consequences — "if this is true, then we should also see X, Y, and Z." Each of those is a question you can answer cheaply and a chance to be proven wrong. The lead that gives you the longest to-do list of checkable predictions is the strongest, because it teaches you the most fastest.

## Why "we just need more data" is the failure mode

"We just need more data" *sounds* responsible, but on its own it is the zero-credit dodge. It names no lead, so it tells you nothing about *which* data to gather. Data collection without a hypothesis is wandering. The fecund move is to commit to a candidate explanation precisely *because* doing so tells you exactly what data would confirm or kill it. You don't wait for more data to pick a lead; you pick a lead to know what data to chase.

## How to spot the fecund lead

Ask of each rival explanation: *If this were true, what else would have to be true — and could I check it this week?* Count the concrete follow-ups each one generates. Prefer the lead that (1) names a specific mechanism, (2) predicts several further observations, and (3) exposes itself to a cheap test that could refute it. A mechanism is fertile; a vague "there's some link" is barren. "Morning sun lengthens sugar build-up" tells you to shade some vines and watch; "the east rows just do better" tells you nothing to do next.

## Naming the follow-ups is the work

Top credit isn't just picking the fertile lead — it's *naming* the checkable questions it generates. "Connecting the calendar builds a daily habit" earns its keep when you add: so daily logins should jump after connecting, prompted connectors should renew more, and non-connectors who still log in daily should renew just as well. Each clause is a test. A committed lead with three named, cheap tests beats a cautious shrug every time.

## Overreach still loses

Fecundity is not recklessness. A lead that the existing data already defeats — "the pin causes the tips, full stop," ignoring her mood — is not fertile, it's wrong. The winning lead is the richest one *the data actually supports*, stated as a mechanism, with the tests that would catch it if it's false.

## In the real world

A product team sees that users who import contacts in week one retain far better. The dodge: "retention is multi-causal; gather more data." The fecund lead: "importing contacts makes the app socially sticky." Notice how much that opens up — randomly prompt half of new users to import and compare retention; check whether retention tracks number of contacts imported; see whether users who message an imported contact retain best of all. Three cheap experiments, each able to refute the lead. That is what backing the fecund hypothesis buys you: not certainty today, but the fastest path to it.`,
  homework: {
    mcq,
    hybrid,
    written,
  },
};
