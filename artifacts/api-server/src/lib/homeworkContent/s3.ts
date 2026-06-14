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
      "A bakery's morning rush sells out of croissants by 8am on Tuesdays and Fridays, but not other weekdays. On those two days a nearby gym runs a 6am class, and the bus that stops outside is also rerouted to arrive 10 minutes earlier. Sales are flat on weekends when both the class and the reroute are absent. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Keep it simple: the early bus is the whole story, so ignore the gym class entirely.",
        credit: 0,
      },
      {
        text: "Post-gym customers arriving on the earlier bus jointly drive the Tuesday/Friday sellouts; test it by running the 6am class on a Wednesday (bus unchanged) and seeing whether croissants still sell out.",
        credit: 1.0,
      },
      {
        text: "Some mix of the gym class, the bus, the weather, staff mood, and seasonal demand probably interacts to lift sales on those mornings.",
        credit: 0.6,
      },
      {
        text: "The gym class likely brings in some extra customers on those days.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "Post-gym customers arriving on the earlier bus jointly drive the Tuesday/Friday sellouts; test it by running the 6am class on a Wednesday (bus unchanged) and seeing whether croissants still sell out.",
    explanation:
      "The 1.0 model is the simplest one that still binds BOTH coincident factors and the weekend null, and it names a clean test that isolates the class. The zero-credit option uses 'keep it simple' to drop the gym class, leaving half the pattern unexplained.",
  },
  {
    itemType: "mc",
    prompt:
      "A SaaS team sees signups jump the week they (a) cut the form from 9 fields to 3 AND (b) launched a referral bonus. Signups stayed high the next month with the bonus still live but the short form unchanged. A prior month with only a short form (no bonus) showed no jump. Which conclusion best follows?",
    mcOptions: [
      {
        text: "We changed two things at once, so nothing can be concluded about either.",
        credit: 0,
      },
      {
        text: "The bonus is doing the heavy lifting and the short form is a minor enabler; confirm by pausing the bonus for one week while keeping the short form and watching signups fall back toward baseline.",
        credit: 1.0,
      },
      {
        text: "The bonus probably matters more, given the earlier short-form-only month went flat.",
        credit: 0.6,
      },
      {
        text: "Both changes seem to have helped signups somewhat.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "The bonus is doing the heavy lifting and the short form is a minor enabler; confirm by pausing the bonus for one week while keeping the short form and watching signups fall back toward baseline.",
    explanation:
      "The richest yet simplest sufficient model uses the natural short-form-only month to assign the main effect to the bonus, and exposes a one-week kill-switch test. 'Nothing can be concluded' refuses to choose despite a clean natural control.",
  },
  {
    itemType: "mc",
    prompt:
      "A patient's migraines spike on days she skips breakfast AND sleeps under six hours. On well-slept days she can skip breakfast with no migraine; on poorly-slept days she gets one even after eating. Two weeks of logs show migraines only when sleep is short, regardless of breakfast. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Short sleep is the operative trigger and breakfast is incidental; test by enforcing seven hours of sleep for a week while keeping breakfast irregular and checking that migraines stop.",
        credit: 1.0,
      },
      {
        text: "To stay parsimonious, just tell her to eat breakfast — it's the easiest thing to fix.",
        credit: 0,
      },
      {
        text: "Sleep looks like the bigger factor, though breakfast may still play a supporting role.",
        credit: 0.6,
      },
      {
        text: "Her migraines seem connected to her daily routine in some way.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "Short sleep is the operative trigger and breakfast is incidental; test by enforcing seven hours of sleep for a week while keeping breakfast irregular and checking that migraines stop.",
    explanation:
      "The logs already dissociate the two variables, so the simplest sufficient model keeps only sleep and proposes a decisive sleep-fixing test. The dodge invokes 'parsimony' to pick the convenient-but-wrong cause the data has ruled out.",
  },
  {
    itemType: "mc",
    prompt:
      "A soccer team concedes late goals only in away matches played on artificial turf. On grass away games and home turf games they hold leads fine. Fitness data shows players cover the same distance on both surfaces, but sprint counts drop sharply in the final 15 minutes on away turf. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Late-game sprint fatigue specific to unfamiliar away turf causes the collapses; test by scheduling a hard turf training block and rechecking whether final-15 sprint counts and late goals improve together.",
        credit: 1.0,
      },
      {
        text: "There are clearly many variables in away games, so it would be an oversimplification to single any one out.",
        credit: 0,
      },
      {
        text: "Turf away games seem to wear the players down somehow by the end.",
        credit: 0.3,
      },
      {
        text: "Reduced late-game sprinting on away turf is likely the issue, perhaps combined with travel and crowd effects.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "Late-game sprint fatigue specific to unfamiliar away turf causes the collapses; test by scheduling a hard turf training block and rechecking whether final-15 sprint counts and late goals improve together.",
    explanation:
      "The distance-equal-but-sprints-drop data point pins the mechanism; the simplest sufficient model binds the surface, the timing, and the sprint dip with one trainable cause. The dodge hides behind 'too many variables' to avoid committing to the pattern the data isolates.",
  },
  {
    itemType: "mc",
    prompt:
      "An online store's cart-abandonment rate jumps every time shipping costs appear, but only for orders under $35. Orders over $35 (which qualify for free shipping) abandon at the normal rate. A survey shows under-$35 shoppers report 'surprise fees' as their reason. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Late-appearing shipping fees on sub-threshold orders drive the abandonment; test by showing the shipping cost up front on the product page for half of under-$35 visitors and comparing abandonment.",
        credit: 1.0,
      },
      {
        text: "Shipping fees probably annoy some shoppers and push a few to leave.",
        credit: 0.3,
      },
      {
        text: "The fee timing is likely the main driver, though price sensitivity and checkout length may also contribute.",
        credit: 0.6,
      },
      {
        text: "Keep the model lean: people just don't like paying for shipping, so there's nothing specific to test.",
        credit: 0,
      },
    ],
    correctAnswer:
      "Late-appearing shipping fees on sub-threshold orders drive the abandonment; test by showing the shipping cost up front on the product page for half of under-$35 visitors and comparing abandonment.",
    explanation:
      "The threshold split and the 'surprise fees' survey both get explained by one mechanism — fee *timing* — and the A/B test falsifies it cheaply. The dodge flattens the model so far ('people dislike shipping') that it leaves the threshold pattern unexplained and untestable.",
  },
  {
    itemType: "mc",
    prompt:
      "A vineyard's worst-tasting batches all came from one south-facing block in years with an August heatwave. Cool Augusts produced fine wine from that block, and the heatwave years didn't hurt the north blocks. Sugar readings show the south grapes over-ripened only in hot years. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Heat-driven over-ripening specific to the exposed south block ruins those batches; test by harvesting the south block two weeks earlier in the next hot year and checking sugar and taste.",
        credit: 1.0,
      },
      {
        text: "It's safest to assume the south block is simply lower quality and replant it.",
        credit: 0,
      },
      {
        text: "Heat seems to hurt the south block's grapes more than the others.",
        credit: 0.3,
      },
      {
        text: "Over-ripening from heat is the likely culprit, possibly alongside soil and irrigation differences in that block.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "Heat-driven over-ripening specific to the exposed south block ruins those batches; test by harvesting the south block two weeks earlier in the next hot year and checking sugar and taste.",
    explanation:
      "Only the heat-by-exposure interaction binds the block, the year, and the sugar data together, and earlier harvest is a falsifiable fix. The dodge picks the simpler 'bad block' story that the cool-year good batches directly refute.",
  },
  {
    itemType: "mc",
    prompt:
      "A help desk's resolution times doubled starting the same week two things happened: a new ticketing tool went live AND three senior agents went on leave. Times stayed high after the agents returned but dropped sharply the day the team reverted the tool. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Hard to say — the tool and the staffing change are confounded, so we can't separate them.",
        credit: 0,
      },
      {
        text: "The new tool is the dominant cause; confirm by reintroducing it for a single controlled day and verifying resolution times spike again while staffing is full.",
        credit: 1.0,
      },
      {
        text: "The tool change looks like the main factor since times fell when it was reverted despite full staffing.",
        credit: 0.6,
      },
      {
        text: "The tool may have slowed things down a bit.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "The new tool is the dominant cause; confirm by reintroducing it for a single controlled day and verifying resolution times spike again while staffing is full.",
    explanation:
      "The post-return-still-slow and revert-then-fast facts dissolve the confound, so the simplest sufficient model assigns the effect to the tool and proposes a reversible re-test. 'We can't separate them' refuses to choose even though the timeline already separated them.",
  },
  {
    itemType: "mc",
    prompt:
      "A gardener's tomato plants wilt by afternoon only in the bed nearest the new white fence. Soil moisture is identical across beds, but a light meter shows the fence reflects intense midday sun onto that bed. Shaded test plants in the same bed stayed firm. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Reflected heat from the fence stresses that bed specifically; test by shading the bed at midday for a week and confirming the wilting stops while neighbors are untouched.",
        credit: 1.0,
      },
      {
        text: "The simple explanation is the plants need more water, so just water that bed more.",
        credit: 0,
      },
      {
        text: "Something about that bed's position is hard on the plants.",
        credit: 0.3,
      },
      {
        text: "Reflected heat is probably the main issue, though soil chemistry near the fence might matter too.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "Reflected heat from the fence stresses that bed specifically; test by shading the bed at midday for a week and confirming the wilting stops while neighbors are untouched.",
    explanation:
      "Equal moisture plus the light-meter reading and the firm shaded plants all point to reflected heat, and shading is a clean falsifying test. The dodge reaches for the 'simple' watering fix that the identical-moisture data already defeats.",
  },
  {
    itemType: "mc",
    prompt:
      "A podcast's downloads surge for episodes that are both under 30 minutes AND released on Monday. Long Monday episodes and short Thursday episodes perform like the back catalog. Listener data shows commuters binge short shows on Monday mornings. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Monday is clearly the magic ingredient; just release everything on Monday and stop overthinking length.",
        credit: 0,
      },
      {
        text: "Short length and Monday timing together capture the commuter audience; test by releasing one short and one long episode on the same Monday and comparing downloads.",
        credit: 1.0,
      },
      {
        text: "The short-plus-Monday combo seems to matter, though guest popularity and topic could also be feeding the surge.",
        credit: 0.6,
      },
      {
        text: "Shorter Monday episodes appear to do a little better.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "Short length and Monday timing together capture the commuter audience; test by releasing one short and one long episode on the same Monday and comparing downloads.",
    explanation:
      "Both conditions are required by the data (long-Monday and short-Thursday flop), so the simplest sufficient model keeps both and the same-day test isolates length. The dodge drops length to keep it 'simple,' leaving the long-Monday flop unexplained.",
  },
  {
    itemType: "mc",
    prompt:
      "A factory's defect rate climbs only on the night shift, and only on the line using Machine 7. Day shift on Machine 7 is clean; night shift on other machines is clean. Maintenance logs show Machine 7's coolant pump runs hotter as ambient temperature drops overnight. Which conclusion best follows?",
    mcOptions: [
      {
        text: "There are probably several night-shift factors at play, so it would be reductive to blame one machine.",
        credit: 0,
      },
      {
        text: "Cold-night coolant failure on Machine 7 causes the defects; test by running Machine 7 overnight with a pre-warmed coolant line and checking whether defects drop to day-shift levels.",
        credit: 1.0,
      },
      {
        text: "Machine 7 at night is likely the source, perhaps worsened by tired night staff.",
        credit: 0.6,
      },
      {
        text: "Night shifts on that machine seem more error-prone.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "Cold-night coolant failure on Machine 7 causes the defects; test by running Machine 7 overnight with a pre-warmed coolant line and checking whether defects drop to day-shift levels.",
    explanation:
      "The clean cells (day-7, night-others) plus the coolant-temperature log isolate a single mechanism, and the pre-warm trial would falsify it. The dodge hides behind 'several factors' even though three of four cells are defect-free.",
  },
  {
    itemType: "mc",
    prompt:
      "A student aces history tests on units taught by lecture but struggles on units taught by group projects. Her notes are thorough either way, and she reports both topics as equally interesting. Recorded sessions show she speaks little in groups and gets distracted. Which conclusion best follows?",
    mcOptions: [
      {
        text: "She just isn't interested in the project topics, plain and simple.",
        credit: 0,
      },
      {
        text: "Group-project format reduces her active engagement and hurts retention; test by giving her a solo structured version of a project unit and comparing her score to the group version.",
        credit: 1.0,
      },
      {
        text: "Group settings seem to suit her less well academically.",
        credit: 0.3,
      },
      {
        text: "The project format probably hurts her, though the difficulty of those specific topics could contribute.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "Group-project format reduces her active engagement and hurts retention; test by giving her a solo structured version of a project unit and comparing her score to the group version.",
    explanation:
      "Equal notes and equal interest rule out content and motivation, so the format-engagement model is the simplest one that fits, and the solo re-test isolates format. The dodge's 'not interested' story is the convenient claim the equal-interest report defeats.",
  },
  {
    itemType: "mc",
    prompt:
      "A coffee subscription sees cancellations spike for customers in their third month — but only those who never used the 'pause delivery' feature. Pausers rarely cancel. Surveys show non-pausers cite 'too much coffee piling up.' Which conclusion best follows?",
    mcOptions: [
      {
        text: "Over-supply among customers unaware of the pause option drives third-month churn; test by emailing the pause feature to half of new non-pausers and comparing their month-three cancellation rate.",
        credit: 1.0,
      },
      {
        text: "People cancel subscriptions all the time; it's simplest to treat this as normal churn and not intervene.",
        credit: 0,
      },
      {
        text: "Coffee piling up seems to bother some customers.",
        credit: 0.3,
      },
      {
        text: "Unused pausing is likely the key, though pricing and bean preferences may also drive some exits.",
        credit: 0.6,
      },
    ],
    correctAnswer:
      "Over-supply among customers unaware of the pause option drives third-month churn; test by emailing the pause feature to half of new non-pausers and comparing their month-three cancellation rate.",
    explanation:
      "The pauser/non-pauser split and the pile-up surveys are bound by one mechanism, and the targeted-email A/B test falsifies it. The 'normal churn' dodge throws away the precise sub-group signal in the name of simplicity.",
  },
  {
    itemType: "mc",
    prompt:
      "A city's bike-share use drops sharply on rainy days — but a closer look shows the drop is entirely among stations without covered docks. Covered-dock stations hold steady in rain. Ridership on dry days is similar across both station types. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Rain obviously cuts cycling; nothing more specific can be claimed.",
        credit: 0,
      },
      {
        text: "Lack of shelter, not rain per se, suppresses rainy-day use; test by adding temporary covers to several uncovered stations and checking whether their rainy-day ridership recovers.",
        credit: 1.0,
      },
      {
        text: "Shelter availability looks like the real driver, though rider commitment and trip distance may matter too.",
        credit: 0.6,
      },
      {
        text: "Rainy weather seems to deter some riders at certain stations.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "Lack of shelter, not rain per se, suppresses rainy-day use; test by adding temporary covers to several uncovered stations and checking whether their rainy-day ridership recovers.",
    explanation:
      "The covered-vs-uncovered split refines a vague 'rain' story into a precise, fixable mechanism, and adding covers is a clean test. The dodge's 'rain cuts cycling' is technically true but explains away the very station difference that carries the signal.",
  },
  {
    itemType: "mc",
    prompt:
      "A novelist finds her daily word count is high on days she writes before checking email and low otherwise — but only on weekdays. On weekends, email-first days are just as productive. Logs show weekday email contains work demands; weekend email is personal. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Email is bad for writing, so the rule is simply 'never check email first.'",
        credit: 0,
      },
      {
        text: "Weekday work email triggers task-switching that drains writing focus; test by batching weekday work email to the afternoon for two weeks and comparing morning word counts.",
        credit: 1.0,
      },
      {
        text: "Work-related email seems to be the real disruptor, though sleep and caffeine could also shape output.",
        credit: 0.6,
      },
      {
        text: "Checking email early appears to hurt her writing somewhat.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "Weekday work email triggers task-switching that drains writing focus; test by batching weekday work email to the afternoon for two weeks and comparing morning word counts.",
    explanation:
      "The weekend exception forces the model to specify *work* email, and afternoon batching is a falsifiable test. The blanket 'email is bad' dodge ignores the productive weekend email-first days, leaving the weekday/weekend contrast unexplained.",
  },
  {
    itemType: "mc",
    prompt:
      "A retailer's two warehouses ship identical products, but Warehouse B has triple the damaged-item complaints. Both use the same boxes and carriers. The difference appears only for fragile items, and only since B switched to a new automated packing arm that B's staff say 'slams' lids shut. Which conclusion best follows?",
    mcOptions: [
      {
        text: "B's automated packing arm damages fragile items; test by routing fragile orders at B to manual packing for two weeks and checking whether B's fragile-item complaints fall to A's level.",
        credit: 1.0,
      },
      {
        text: "Shipping damage happens everywhere; it's simplest to accept some breakage as a cost of doing business.",
        credit: 0,
      },
      {
        text: "The new packing arm is probably the cause, though carrier handling and warehouse layout might add to it.",
        credit: 0.6,
      },
      {
        text: "Something at Warehouse B is rougher on fragile goods.",
        credit: 0.3,
      },
    ],
    correctAnswer:
      "B's automated packing arm damages fragile items; test by routing fragile orders at B to manual packing for two weeks and checking whether B's fragile-item complaints fall to A's level.",
    explanation:
      "Identical boxes/carriers plus the fragile-only, since-the-arm pattern isolate one cause, and the manual-packing trial would falsify it. The 'breakage is just a cost' dodge uses simplicity to avoid the specific, fixable mechanism the data points to.",
  },
];

const hybrid: HomeworkItem[] = [
  {
    itemType: "hybrid",
    prompt:
      "A gym sees membership renewals climb in the quarter it both renovated the locker rooms AND hired two popular trainers. The next quarter, renewals stayed high after one trainer left but the lockers stayed renovated; a prior renovation-only quarter (no new trainers) had shown no lift. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Two things changed together, so the renewal lift can't be attributed to either with confidence.",
        credit: 0,
      },
      {
        text: "The trainers, not the renovation, drive renewals; confirm by tracking renewals among members who train with the remaining popular trainer versus those who don't over the next quarter.",
        credit: 1.0,
      },
      {
        text: "The trainers look like the main driver given the flat renovation-only quarter.",
        credit: 0.6,
      },
      {
        text: "Both the renovation and the trainers probably helped a little.",
        credit: 0.3,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your model from its closest rival, and say what result would refute your model.",
      modelAnswer:
        "The cheapest distinguishing observation is the renewal rate of members assigned to the remaining popular trainer versus a matched group who never train with them; if both groups renew at the same elevated rate, the trainer-driven model is refuted and the renovation (or a general buzz effect) must be doing the work.",
      yieldAnchors: [
        "Renewals rose the quarter of both the renovation and the two new trainers.",
        "Renewals stayed high after one trainer left, lockers unchanged.",
        "A prior renovation-only quarter produced no renewal lift.",
      ],
      riskAnchors: [
        "Members training with the popular trainer renew at a higher rate than those who don't.",
        "If the remaining trainer also leaves, renewals should fall toward baseline.",
      ],
      defeatedBy: [
        "The renovation is the main cause of higher renewals.",
        "Nothing can be attributed because two things changed at once.",
      ],
    },
    correctAnswer:
      "The trainers, not the renovation, drive renewals; confirm by tracking renewals among members who train with the remaining popular trainer versus those who don't over the next quarter.",
    explanation:
      "The renovation-only null and the stayed-high-after-one-left facts let the simplest sufficient model credit the trainers, and the within-gym comparison is a cheap falsifying test. Refusing to attribute anything ignores the natural control already in the data.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A toddler sleeps through the night only when both the white-noise machine is on AND dinner included protein. Protein-only and white-noise-only nights still had wakeups, while nights with neither were the worst. Over three weeks the pattern is consistent. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Just use the white-noise machine every night — it's the simplest single fix.",
        credit: 0,
      },
      {
        text: "Both white noise and an evening protein serving are needed together for full nights; test by withholding only protein for three nights with white noise on and checking whether wakeups return.",
        credit: 1.0,
      },
      {
        text: "Both factors seem to matter, though teething and room temperature might also play in.",
        credit: 0.6,
      },
      {
        text: "White noise and protein each seem to help a bit.",
        credit: 0.3,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your model from its closest rival, and say what result would refute your model.",
      modelAnswer:
        "Cheapest test: keep white noise on but drop protein for three nights; if the toddler still sleeps through, then white noise alone suffices and the joint-cause model is refuted, whereas a return of wakeups confirms protein is independently necessary.",
      yieldAnchors: [
        "Full nights occur only when white noise AND protein are both present.",
        "Protein-only and white-noise-only nights still had wakeups.",
        "Nights with neither were the worst.",
      ],
      riskAnchors: [
        "Removing protein while keeping white noise should bring back wakeups.",
        "Removing white noise while keeping protein should also bring back wakeups.",
      ],
      defeatedBy: [
        "White noise alone is sufficient for full nights.",
        "Protein alone is sufficient for full nights.",
      ],
    },
    correctAnswer:
      "Both white noise and an evening protein serving are needed together for full nights; test by withholding only protein for three nights with white noise on and checking whether wakeups return.",
    explanation:
      "The single-factor nights both failed, so the simplest sufficient model must keep BOTH factors; the drop-one test falsifies it cleanly. The 'just use white noise' dodge invokes simplicity to adopt an under-powered model the data already refutes.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A regional sales team beats target only in months that have both a product webinar AND a price promotion. Webinar-only and promo-only months land near baseline; months with neither fall below. Reps report webinars create demand that the promo then converts. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Promotions sell product, so just run promotions and skip the webinars.",
        credit: 0,
      },
      {
        text: "Webinars and promotions work as a demand-then-conversion pair; test by running a webinar with no promo, then adding the promo two weeks later, and watching for a conversion spike only after the promo.",
        credit: 1.0,
      },
      {
        text: "The webinar-plus-promo combination seems to matter, though seasonality and rep effort likely contribute.",
        credit: 0.6,
      },
      {
        text: "Webinars and promos each seem to nudge sales upward.",
        credit: 0.3,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your model from its closest rival, and say what result would refute your model.",
      modelAnswer:
        "Run a webinar alone and measure whether pipeline (not closed sales) rises while sales stay flat, then add the promo and watch sales jump; if a promo alone (no prior webinar) produces the same sales jump, the demand-then-conversion model is refuted.",
      yieldAnchors: [
        "Target is beaten only when both webinar and promo occur.",
        "Webinar-only and promo-only months sit near baseline.",
        "Months with neither fall below baseline.",
      ],
      riskAnchors: [
        "A webinar alone should lift pipeline/leads but not closed sales.",
        "Adding a promo after a webinar should convert that pipeline into a sales spike.",
      ],
      defeatedBy: [
        "Promotions alone are sufficient to beat target.",
        "The webinar is irrelevant to sales.",
      ],
    },
    correctAnswer:
      "Webinars and promotions work as a demand-then-conversion pair; test by running a webinar with no promo, then adding the promo two weeks later, and watching for a conversion spike only after the promo.",
    explanation:
      "Both single-lever months underperform, so the simplest sufficient model keeps both levers in a sequence, and the staggered test exposes the mechanism. Dropping the webinar to 'keep it simple' contradicts the promo-only baseline months.",
  },
  {
    itemType: "hybrid",
    prompt:
      "An aquarium's fish die off only in the tank that gets both afternoon direct sun AND weekly tap-water top-ups. Sun-only and tap-only tanks are healthy; the affected tank's deaths cluster two days after each top-up on sunny weeks. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Sunlight warms the tank and chlorinated tap water stresses fish, and the two combine lethally; test by switching that tank to dechlorinated water while keeping the sun exposure and checking whether the post-top-up deaths stop.",
        credit: 1.0,
      },
      {
        text: "Fish are fragile and die for many reasons, so it's cleanest not to single out a cause.",
        credit: 0,
      },
      {
        text: "The sun-and-tap-water combo is probably to blame, perhaps with overfeeding adding stress.",
        credit: 0.6,
      },
      {
        text: "That tank's conditions seem harder on the fish.",
        credit: 0.3,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your model from its closest rival, and say what result would refute your model.",
      modelAnswer:
        "Cheapest move: dechlorinate the top-up water for that one tank while leaving the sun exposure unchanged; if deaths still cluster after top-ups, then chlorine is not the lever and sun-driven temperature swings (or something else) must be isolated next, refuting the chlorine-plus-heat model.",
      yieldAnchors: [
        "Deaths occur only in the tank with both sun and tap-water top-ups.",
        "Sun-only and tap-only tanks stay healthy.",
        "Deaths cluster two days after top-ups on sunny weeks.",
      ],
      riskAnchors: [
        "Dechlorinating the top-up water should stop the post-top-up deaths.",
        "Shading the tank while keeping tap top-ups should also reduce deaths if heat is co-required.",
      ],
      defeatedBy: [
        "Fish simply die for unknowable reasons.",
        "Sunlight alone is killing the fish.",
      ],
    },
    correctAnswer:
      "Sunlight warms the tank and chlorinated tap water stresses fish, and the two combine lethally; test by switching that tank to dechlorinated water while keeping the sun exposure and checking whether the post-top-up deaths stop.",
    explanation:
      "The single-factor tanks survive and deaths track the top-up-on-sunny-week timing, so the simplest sufficient model is the two-factor interaction with a clean dechlorination test. 'Fish die for many reasons' refuses to choose despite a tight, dated pattern.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A blogger's posts go viral only when they have both a striking headline AND are published before 9am. Strong headlines posted at noon do okay; weak headlines at 8am flop. Shares cluster in the first hour for the early strong-headline posts. Which conclusion best follows?",
    mcOptions: [
      {
        text: "A great headline is what matters; post time is noise, so just write better headlines.",
        credit: 0,
      },
      {
        text: "A strong headline catching the early-morning sharing window is what drives virality; test by publishing two strong-headline posts, one at 8am and one at noon, and comparing first-hour shares.",
        credit: 1.0,
      },
      {
        text: "Headline strength plus early timing both seem to matter, though topic and image choice likely help too.",
        credit: 0.6,
      },
      {
        text: "Good headlines and early posting each seem to help reach.",
        credit: 0.3,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your model from its closest rival, and say what result would refute your model.",
      modelAnswer:
        "Publish the same strong headline at 8am one day and noon another and compare first-hour shares; if the noon post matches the 8am post's virality, then timing is irrelevant and the headline-only model wins, refuting the headline-plus-window model.",
      yieldAnchors: [
        "Virality occurs only with a strong headline AND a pre-9am post.",
        "Strong headlines at noon perform only okay.",
        "Weak headlines at 8am flop; early shares cluster in the first hour.",
      ],
      riskAnchors: [
        "A strong-headline post at 8am should out-share the same headline at noon.",
        "Moving to early posting should not help weak headlines.",
      ],
      defeatedBy: [
        "Headline alone determines virality; timing is noise.",
        "Early posting alone makes posts go viral.",
      ],
    },
    correctAnswer:
      "A strong headline catching the early-morning sharing window is what drives virality; test by publishing two strong-headline posts, one at 8am and one at noon, and comparing first-hour shares.",
    explanation:
      "The noon-strong (only okay) and 8am-weak (flop) cells show both factors are required, so the simplest sufficient model keeps both, and the matched time test isolates timing. Calling time 'noise' adopts an under-powered model the noon results refute.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A clinic finds patients' blood pressure readings are high only when taken by one nurse AND with the older cuff. The same nurse with a new cuff, and other nurses with the old cuff, read normal. The old cuff is slightly undersized and that nurse pumps it fastest. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Blood pressure varies a lot, so it's simplest to treat the high readings as natural fluctuation.",
        credit: 0,
      },
      {
        text: "The undersized old cuff inflated rapidly produces falsely high readings; test by having that nurse re-measure flagged patients with the correctly sized cuff and checking whether readings normalize.",
        credit: 1.0,
      },
      {
        text: "The old cuff with that nurse's technique is likely the cause, though patient anxiety might add a bit.",
        credit: 0.6,
      },
      {
        text: "That nurse's readings with the old cuff seem to run high.",
        credit: 0.3,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your model from its closest rival, and say what result would refute your model.",
      modelAnswer:
        "Have that nurse immediately re-measure each flagged patient with the correctly sized cuff using the same fast technique; if readings stay high, the cuff size is not the lever and the rapid-inflation technique (or true hypertension) must be examined, refuting the cuff-size model.",
      yieldAnchors: [
        "High readings occur only with that nurse AND the old cuff.",
        "Same nurse with the new cuff reads normal.",
        "Other nurses with the old cuff read normal; the old cuff is undersized and that nurse pumps fastest.",
      ],
      riskAnchors: [
        "Re-measuring with a correctly sized cuff should normalize the readings.",
        "If technique is the lever, slowing the inflation should also lower readings.",
      ],
      defeatedBy: [
        "The high readings are just natural fluctuation.",
        "The patients are genuinely hypertensive.",
      ],
    },
    correctAnswer:
      "The undersized old cuff inflated rapidly produces falsely high readings; test by having that nurse re-measure flagged patients with the correctly sized cuff and checking whether readings normalize.",
    explanation:
      "The two clean control cells localize the artifact to the nurse-plus-cuff cell, and re-measuring is an immediate falsifying test. The 'natural fluctuation' dodge uses simplicity to ignore a measurement artifact the data has pinpointed.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A delivery app's late deliveries spike only in one neighborhood, and only during evening rush. GPS shows drivers there get rerouted around a recurring evening road closure that isn't in the app's map data. Other neighborhoods and off-peak times are fine. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Traffic is unpredictable, so late deliveries are inevitable and not worth chasing.",
        credit: 0,
      },
      {
        text: "A missing evening road closure in the map data causes the local rush-hour delays; test by adding the closure to the routing engine for that window and checking whether that neighborhood's evening lateness drops to baseline.",
        credit: 1.0,
      },
      {
        text: "The unmapped closure is probably the main issue, though driver shortages could worsen it.",
        credit: 0.6,
      },
      {
        text: "That neighborhood seems to slow drivers down in the evening.",
        credit: 0.3,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your model from its closest rival, and say what result would refute your model.",
      modelAnswer:
        "Add the recurring closure to the routing map for the evening window and compare that neighborhood's lateness before and after; if lateness persists despite correct routing, then the closure isn't the lever and driver supply or volume must be examined, refuting the map-data model.",
      yieldAnchors: [
        "Late deliveries spike only in one neighborhood and only at evening rush.",
        "GPS shows drivers rerouted around an evening road closure absent from the map.",
        "Other neighborhoods and off-peak times are fine.",
      ],
      riskAnchors: [
        "Correcting the map for that window should drop evening lateness to baseline.",
        "If supply is the issue, adding the closure data alone should not help.",
      ],
      defeatedBy: [
        "Late deliveries are simply inevitable due to traffic.",
        "The whole fleet is understaffed at rush hour.",
      ],
    },
    correctAnswer:
      "A missing evening road closure in the map data causes the local rush-hour delays; test by adding the closure to the routing engine for that window and checking whether that neighborhood's evening lateness drops to baseline.",
    explanation:
      "The neighborhood-and-time specificity plus the GPS reroute pin one fixable cause, and updating the map is a clean test. 'Traffic is unpredictable' uses faux-simplicity to dismiss a precisely localized, correctable signal.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A streamer's concurrent viewers drop mid-stream only on nights they switch from gameplay to a 'just chatting' segment AND the chat goes quiet. Switches with lively chat hold viewers; quiet chat during gameplay doesn't lose them. The drops start within minutes of a quiet switch. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Quiet 'just chatting' segments with no chat momentum lose viewers; test by adding a prompted poll at each switch to keep chat active and checking whether the mid-stream drops shrink.",
        credit: 1.0,
      },
      {
        text: "Viewership naturally ebbs and flows, so these dips aren't really explainable.",
        credit: 0,
      },
      {
        text: "Quiet chatting segments are probably the issue, though stream length and time of night could matter.",
        credit: 0.6,
      },
      {
        text: "Switching segments seems to cost some viewers.",
        credit: 0.3,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your model from its closest rival, and say what result would refute your model.",
      modelAnswer:
        "Cheapest test: at the next several 'just chatting' switches, fire a chat poll to force activity and compare viewer retention to unprompted switches; if drops persist even with lively chat, then the segment type itself (not chat momentum) is the lever, refuting the quiet-chat model.",
      yieldAnchors: [
        "Drops occur only when switching to 'just chatting' AND chat goes quiet.",
        "Switches with lively chat retain viewers.",
        "Quiet chat during gameplay doesn't lose viewers; drops start within minutes of a quiet switch.",
      ],
      riskAnchors: [
        "Keeping chat active through a switch should reduce the drops.",
        "If segment type is the lever, even lively-chat switches should lose viewers.",
      ],
      defeatedBy: [
        "Viewership dips are random and unexplainable.",
        "Any segment switch loses viewers regardless of chat.",
      ],
    },
    correctAnswer:
      "Quiet 'just chatting' segments with no chat momentum lose viewers; test by adding a prompted poll at each switch to keep chat active and checking whether the mid-stream drops shrink.",
    explanation:
      "The lively-chat switches and quiet-gameplay periods isolate the joint condition, and the poll intervention falsifies it. The 'random ebb and flow' dodge refuses to choose despite a within-minutes, condition-specific pattern.",
  },
  {
    itemType: "hybrid",
    prompt:
      "A craft brewery's IPA tastes off only in batches brewed in summer AND fermented in the steel tank (not the older plastic one). Summer plastic-tank batches and winter steel-tank batches are fine. Summer raises the brewhouse temperature, and the steel tank sits nearest a sunny window. Which conclusion best follows?",
    mcOptions: [
      {
        text: "Brewing is finicky; off batches just happen and chasing causes wastes time.",
        credit: 0,
      },
      {
        text: "Summer heat plus the steel tank's sunny spot pushes fermentation too warm and spoils flavor; test by moving the steel tank away from the window or chilling it next summer and checking whether the off-taste disappears.",
        credit: 1.0,
      },
      {
        text: "The warm steel tank in summer is likely the culprit, though hop freshness might also vary by season.",
        credit: 0.6,
      },
      {
        text: "Summer steel-tank batches seem more prone to off-flavors.",
        credit: 0.3,
      },
    ],
    writtenRubric: {
      prompt:
        "In two sentences, name the single cheapest observation that would most distinguish your model from its closest rival, and say what result would refute your model.",
      modelAnswer:
        "Cheapest test: log the steel tank's fermentation temperature next summer and either shade or chill it; if the off-taste persists while temperature is held in range, then heat isn't the lever and the tank material or hop freshness must be examined, refuting the warm-fermentation model.",
      yieldAnchors: [
        "Off-taste occurs only in summer AND in the steel tank.",
        "Summer plastic-tank and winter steel-tank batches are fine.",
        "Summer raises brewhouse temperature and the steel tank sits by a sunny window.",
      ],
      riskAnchors: [
        "Keeping the steel tank cool in summer should eliminate the off-taste.",
        "If material is the lever, a cool summer steel batch should still taste off.",
      ],
      defeatedBy: [
        "Off batches just randomly happen.",
        "The steel tank is inherently bad for IPA regardless of temperature.",
      ],
    },
    correctAnswer:
      "Summer heat plus the steel tank's sunny spot pushes fermentation too warm and spoils flavor; test by moving the steel tank away from the window or chilling it next summer and checking whether the off-taste disappears.",
    explanation:
      "The two control cells and the heat-by-window detail localize a fermentation-temperature cause, and chilling is a falsifiable fix. 'Off batches just happen' uses simplicity as an excuse to leave a clear seasonal-tank pattern unexplained.",
  },
];

const written: HomeworkItem[] = [
  {
    itemType: "written",
    prompt:
      "A school notices that students in its new 'flipped classroom' math sections score higher on exams. But those sections also meet in the morning, are taught by volunteer teachers, and have ten fewer students each. Test scores are flat in afternoon flipped sections taught by the same volunteers. In one paragraph, propose the strongest supported model of what's driving the gains and how you would test it.",
    writtenRubric: {
      modelAnswer:
        "The morning timeslot, not the flipped format, is the leading driver: afternoon flipped sections with the same volunteer teachers stay flat, which isolates time-of-day from method and teacher. The simplest model that still binds all the data is that alert morning students plus small class size lift scores, with the flip itself contributing little. Test it by randomly assigning some morning sections to traditional instruction and some afternoon sections to flipped: if morning traditional matches morning flipped and beats afternoon flipped, the timeslot/size model is confirmed and the flip is exonerated as the cause.",
      yieldAnchors: [
        "Flipped morning sections score higher.",
        "Afternoon flipped sections with the same volunteers are flat.",
        "Morning sections are smaller (ten fewer students) and use volunteer teachers.",
      ],
      riskAnchors: [
        "Morning traditional sections should also outperform afternoon sections.",
        "Shrinking afternoon class size should lift afternoon scores if size matters.",
        "Afternoon flipped should not catch up to morning sections.",
      ],
      defeatedBy: [
        "The flipped-classroom method itself causes the gains.",
        "Volunteer teachers are the sole cause of the gains.",
        "Nothing can be concluded because too many things differ.",
      ],
    },
    correctAnswer:
      "The morning timeslot, not the flipped format, is the leading driver: afternoon flipped sections with the same volunteer teachers stay flat, which isolates time-of-day from method and teacher. The simplest model that still binds all the data is that alert morning students plus small class size lift scores, with the flip itself contributing little. Test it by randomly assigning some morning sections to traditional instruction and some afternoon sections to flipped: if morning traditional matches morning flipped and beats afternoon flipped, the timeslot/size model is confirmed and the flip is exonerated as the cause.",
    explanation:
      "A 'we can't conclude anything, too many variables' answer scores near zero; a florid essay that credits the flip without using the flat afternoon-flipped control scores low. Top credit goes to the simplest model that still binds the afternoon null and names the randomization test.",
  },
  {
    itemType: "written",
    prompt:
      "A homeowner's basement floods only after storms that bring both heavy rain AND wind from the northeast. Heavy rain with calm or southerly wind stays dry, as do windy days without much rain. The northeast-facing window well fills with leaves each fall. In one paragraph, propose the strongest supported model and how to test it.",
    writtenRubric: {
      modelAnswer:
        "The simplest sufficient model is that northeast wind drives rain directly into the leaf-clogged window well, which then overflows into the basement — both factors are required, since rain-without-NE-wind and wind-without-heavy-rain both stay dry. I commit to the clogged-well-plus-wind-driven-rain mechanism rather than a vaguer 'bad drainage' story. Test it by clearing and screening the window well before the next storm season: if a heavy-rain, northeast-wind storm then leaves the basement dry, the model is confirmed; if it still floods, the leaf clog wasn't the lever and the well's grading or a foundation crack must be examined next.",
      yieldAnchors: [
        "Flooding occurs only with heavy rain AND northeast wind.",
        "Heavy rain with calm/southerly wind stays dry.",
        "Windy days without heavy rain stay dry; the NE window well fills with leaves.",
      ],
      riskAnchors: [
        "Clearing and screening the well should prevent flooding in the next NE-wind storm.",
        "If a future flood occurs with a clean well, the clog model is refuted.",
      ],
      defeatedBy: [
        "Heavy rain alone causes the flooding.",
        "Any windy storm causes the flooding.",
        "The cause is unknowable so just buy a sump pump and hope.",
      ],
    },
    correctAnswer:
      "The simplest sufficient model is that northeast wind drives rain directly into the leaf-clogged window well, which then overflows into the basement — both factors are required, since rain-without-NE-wind and wind-without-heavy-rain both stay dry. I commit to the clogged-well-plus-wind-driven-rain mechanism rather than a vaguer 'bad drainage' story. Test it by clearing and screening the window well before the next storm season: if a heavy-rain, northeast-wind storm then leaves the basement dry, the model is confirmed; if it still floods, the leaf clog wasn't the lever and the well's grading or a foundation crack must be examined next.",
    explanation:
      "An answer that blames 'heavy rain' alone scores low because it ignores the dry rain-only storms; 'the cause is unknowable' scores near zero. Top credit binds both required conditions in the simplest mechanism and commits to the clear-the-well test.",
  },
  {
    itemType: "written",
    prompt:
      "A startup's app crashes are reported almost entirely by Android users on one budget phone model, and only when uploading photos over cellular data. Wi-Fi uploads and other phones are fine; the budget model has the least RAM in the lineup. In one paragraph, propose the strongest supported model and how to test it.",
    writtenRubric: {
      modelAnswer:
        "The simplest model that binds every clue is a memory-pressure crash: large photo uploads over slower cellular connections keep image data in RAM longer, and the low-RAM budget phone runs out of memory and crashes — explaining the model-specific, cellular-only, upload-only pattern. I commit to the out-of-memory mechanism rather than a generic 'Android is buggy' claim. Test it by adding memory logging and a downscale-before-upload path on that model: if crash rates on cellular uploads fall to Wi-Fi levels after the fix, the memory model is confirmed; if crashes persist, a network-timeout bug rather than RAM is the lever.",
      yieldAnchors: [
        "Crashes are concentrated on one budget Android model.",
        "Crashes happen only during photo uploads over cellular.",
        "Wi-Fi uploads and other phones are fine; the budget model has the least RAM.",
      ],
      riskAnchors: [
        "Downscaling images before upload should cut crashes on that model.",
        "Memory logs should show RAM exhaustion just before crashes.",
        "If a higher-RAM phone is throttled to cellular speeds, it should not crash.",
      ],
      defeatedBy: [
        "Android is just buggy and crashes happen.",
        "Cellular networks cause crashes on all phones.",
        "We can't diagnose this without reproducing every user's setup.",
      ],
    },
    correctAnswer:
      "The simplest model that binds every clue is a memory-pressure crash: large photo uploads over slower cellular connections keep image data in RAM longer, and the low-RAM budget phone runs out of memory and crashes — explaining the model-specific, cellular-only, upload-only pattern. I commit to the out-of-memory mechanism rather than a generic 'Android is buggy' claim. Test it by adding memory logging and a downscale-before-upload path on that model: if crash rates on cellular uploads fall to Wi-Fi levels after the fix, the memory model is confirmed; if crashes persist, a network-timeout bug rather than RAM is the lever.",
    explanation:
      "'Android is buggy' is the under-powered simple story that leaves the cellular-and-upload specificity unexplained; 'we can't diagnose it' scores near zero. Top credit is the simplest mechanism that binds model, network, and action, plus the memory-logging test.",
  },
  {
    itemType: "written",
    prompt:
      "A restaurant's online ratings dipped sharply for two months, then recovered. The dip coincided with both a new head chef AND a delivery-app outage that delayed orders. Dine-in reviews stayed positive throughout; only delivery reviews dropped, and they recovered the week the app was fixed — before the chef left. In one paragraph, propose the strongest supported model and how to test it.",
    writtenRubric: {
      modelAnswer:
        "The simplest sufficient model is that the delivery-app outage, not the new chef, caused the rating dip: only delivery reviews fell, dine-in stayed positive, and ratings recovered when the app was fixed while the chef was still in place. I commit to the delivery-timing cause and exonerate the chef. Test it prospectively by monitoring delivery versus dine-in ratings during any future delivery disruption: if delivery ratings drop and dine-in holds, the model is confirmed; if a future dip appears with the app working fine, the chef or food quality would need re-examination.",
      yieldAnchors: [
        "The dip coincided with both a new chef and a delivery-app outage.",
        "Dine-in reviews stayed positive throughout.",
        "Only delivery reviews dropped and recovered when the app was fixed, before the chef left.",
      ],
      riskAnchors: [
        "Future delivery disruptions should lower delivery ratings while dine-in holds.",
        "Ratings should track delivery reliability, not chef tenure.",
      ],
      defeatedBy: [
        "The new chef caused the rating dip.",
        "Both causes are entangled so nothing can be concluded.",
        "Ratings just fluctuate randomly over time.",
      ],
    },
    correctAnswer:
      "The simplest sufficient model is that the delivery-app outage, not the new chef, caused the rating dip: only delivery reviews fell, dine-in stayed positive, and ratings recovered when the app was fixed while the chef was still in place. I commit to the delivery-timing cause and exonerate the chef. Test it prospectively by monitoring delivery versus dine-in ratings during any future delivery disruption: if delivery ratings drop and dine-in holds, the model is confirmed; if a future dip appears with the app working fine, the chef or food quality would need re-examination.",
    explanation:
      "Blaming the chef ignores the dine-in/delivery split and the recover-before-chef-left timing; 'too entangled to conclude' scores near zero despite a clean dissociation. Top credit assigns the cause the data isolates and commits to the prospective test.",
  },
  {
    itemType: "written",
    prompt:
      "A runner's knee pain flares only on long runs done on roads with a strong camber (sloped surface), and only on her right knee. Flat-surface long runs and short cambered runs are pain-free, and the pain is always on the downhill-side leg. In one paragraph, propose the strongest supported model and how to test it.",
    writtenRubric: {
      modelAnswer:
        "The simplest model that binds all of it is camber-induced asymmetric loading: running long distances on a sloped road repeatedly overloads the downhill-side (right) knee, and the effect needs both the slope and the duration, since flat long runs and short cambered runs are fine. I commit to the mechanical-overload mechanism rather than a vague 'overuse' label. Test it by having her run her usual long distance on a flat track, or alternate which side of a cambered road she runs on: if the right-knee pain disappears on flat ground or shifts to the left knee when she switches sides, the camber-loading model is confirmed; if pain persists on flat long runs, distance alone (or a gait issue) is the real lever.",
      yieldAnchors: [
        "Pain flares only on long runs on strongly cambered roads.",
        "Flat long runs and short cambered runs are pain-free.",
        "Pain is always on the right knee, the downhill-side leg.",
      ],
      riskAnchors: [
        "A long flat-surface run should produce no pain.",
        "Switching to the other side of the camber should move pain to the left knee.",
        "If pain persists on flat long runs, distance not camber is the lever.",
      ],
      defeatedBy: [
        "It's just generic overuse from running too much.",
        "Long runs always cause knee pain regardless of surface.",
        "The cause can't be known without an MRI.",
      ],
    },
    correctAnswer:
      "The simplest model that binds all of it is camber-induced asymmetric loading: running long distances on a sloped road repeatedly overloads the downhill-side (right) knee, and the effect needs both the slope and the duration, since flat long runs and short cambered runs are fine. I commit to the mechanical-overload mechanism rather than a vague 'overuse' label. Test it by having her run her usual long distance on a flat track, or alternate which side of a cambered road she runs on: if the right-knee pain disappears on flat ground or shifts to the left knee when she switches sides, the camber-loading model is confirmed; if pain persists on flat long runs, distance alone (or a gait issue) is the real lever.",
    explanation:
      "'Generic overuse' is the under-powered simple story that ignores the surface, side, and duration pattern; 'can't know without an MRI' is the near-zero refusal. Top credit is the simplest mechanism that binds camber, distance, and the downhill-side knee, with the switch-sides test.",
  },
];

export const section: SectionContent = {
  slug: "parsimony",
  title: "Parsimony as a Live Constraint",
  weekNumber: 1,
  blurb:
    "Occam's razor is a tiebreaker between models that explain equally well — never a license to explain less, so the prize goes to the simplest model that still binds every scrap of the data.",
  lectureTitle:
    "1.3 Parsimony as a Live Constraint: simplicity as a tiebreaker, never an excuse",
  body: `# Parsimony as a Live Constraint

"Keep it simple." It is the most abused phrase in reasoning. People wield Occam's razor like a shield against thinking — slicing away whatever they'd rather not explain and calling the wreckage "parsimony." That is backwards. In Constructive Critical Reasoning, simplicity is a *tiebreaker*, and a tiebreaker only fires when there is a tie.

## The razor cuts between equals

Occam's razor says: among explanations that account for the data *equally well*, prefer the one with fewer moving parts. The crucial words are "equally well." The razor compares models that already cross the bar of explaining everything on the table. It chooses between two sufficient stories; it never lets you pick a story that leaves data on the floor.

So the real test runs in two stages. First, ask which models actually bind all the evidence — every coincidence, every exception, every null result. Only the survivors get to the second stage, where you pick the leanest one. A model that's beautifully simple but leaves three observations unexplained never reaches stage two. It is disqualified, not preferred.

## The failure mode: simplicity as an excuse

The classic dodge sounds responsible: "Let's not overcomplicate things." But listen for what it's doing. If "the simple version" quietly drops a data point — the weekend that broke the pattern, the control group that stayed flat — then it isn't simpler, it's *weaker*. It has bought tidiness by going blind. Parsimony was never meant to reward ignorance.

A richer model is not automatically worse for having more parts. If two factors are both genuinely required — the data shows each one alone fails — then the two-factor model *is* the parsimonious one, because the one-factor model is insufficient. You don't earn simplicity points for amputating a limb the body needs.

## Top credit: the simplest sufficient model

Here's the standard CCR rewards. The best answer is the **simplest model among those that explain all the data** — and that commits to a clean test that could prove it wrong. It refuses to pad itself with spare gears (florid, unfalsifiable extras score low), but it also refuses to shed any gear the evidence demands.

## Zero credit: the under-powered "simple" pick

The dodge that earns nothing is invoking parsimony to crown an under-powered model — one that leaves observations unexplained — or refusing to choose at all ("too many variables, can't say"). Both abandon the job. The first hides behind simplicity; the second hides behind complexity. CCR penalizes both, because both leave data unexplained while pretending to be cautious.

## A quick rule of thumb

Before you call a model "simpler," check it explains *everything* its rival does. If it doesn't, you're not being parsimonious — you're being lazy and dressing it up. Add exactly the parts the data forces, and not one more.

## In the real world

A manager notices a team ships bugs only in sprints that are both rushed *and* run without code review. Rushed sprints with review are clean; calm sprints without review are clean too. The "simple" voice says, "Reviews catch bugs — just always review." But that's under-powered: it ignores that calm no-review sprints stayed clean. The simplest *sufficient* model keeps both factors — time pressure removes care *and* the missing review removes the safety net, and bugs slip only when both fail together. The test is cheap and falsifiable: run one rushed sprint *with* review. If it stays clean, the joint-cause model holds; if it's buggy anyway, time pressure alone is the culprit. Either way you've committed, bound every cell of the data, and exposed yourself to refutation — which is exactly what the razor is for.`,
  homework: {
    mcq,
    hybrid,
    written,
  },
};
