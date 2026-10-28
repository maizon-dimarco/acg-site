/**
 * The five practices. One record drives one page via src/app/[practice]/page.tsx.
 * Copy here is Maizon's draft for Baker to correct; anything in [brackets] is a placeholder.
 * `ink` is the text colour over the hero still: "paper" for dark stills, "ink" for bright ones.
 */
export type Practice = {
  slug: string;
  n: string;
  nav: string;
  title: string;
  /** Two-line headline on the hero, as [line1, line2]. */
  headline: [string, string];
  /** One sentence under the headline. */
  sub: string;
  hero: { desktop: string; mobile: string; ink: "paper" | "ink"; caption: string };
  situation: { statement: string; lead: string };
  work: { t: string; w: string }[];
  steps: { h: string; p: string }[];
  engagement: { ctx: string; situation: string; action: string; outcome: string };
  partner: { name: string; role: string; bio: string };
  next: string;
};

export const practices: Practice[] = [
  {
    slug: "turnaround",
    n: "01",
    nav: "Turnaround",
    title: "Turnaround & Restructuring",
    headline: ["When the forecast stops", "being a formality."],
    sub: "Cash stabilized, the plan rebuilt, and one set of numbers that management, the board and the lenders can all stand behind.",
    hero: { desktop: "/film/turnaround-hero.jpg", mobile: "/film/turnaround-hero-mobile.jpg", ink: "paper", caption: "The valley under weather, the light beginning to break" },
    situation: {
      statement: "Liquidity is tightening, a covenant is close, and the people who used to believe the numbers have started asking for them weekly.",
      lead: "This is the moment a lender, a board or a sponsor makes the call. We come in as operators, not observers: the partner you speak to runs the engagement, builds the forecast with your finance team, and sits in the room with the bank. The goal is not a report. It is a business that is stable in weeks and credible again in months.",
    },
    work: [
      { t: "13-week cash forecast", w: "Rebuilt from the bank statements up, owned by your team by week two, reported every Friday without exception." },
      { t: "Lender and stakeholder management", w: "One set of numbers, delivered before they ask. Standstills, amendments and forbearance negotiated from a position of credibility." },
      { t: "Operational stabilization", w: "The three decisions that cannot wait: pricing, people, and what to stop doing. Made with management, in the first thirty days." },
      { t: "Restructuring plan", w: "A plan with a clock on it, written so a credit committee and a board can read the same page and reach the same conclusion." },
      { t: "Chief Restructuring Officer", w: "Where the situation needs it, a partner takes the seat with authority to act, and hands back a business in better order." },
    ],
    steps: [
      { h: "A conversation this week", p: "With a partner. We tell you plainly whether this is a liquidity problem, a margin problem, or a confidence problem, and whether we are the right call." },
      { h: "A first read in days", p: "Cash, lenders, the three decisions that cannot wait. Short enough to read on a phone, specific enough to act on." },
      { h: "A plan with a clock on it", p: "Weeks, not quarters. Who does what by when, what the bank sees, and what we report every Friday." },
      { h: "A partner in the seat", p: "Through the plan, in the room, until the company is stable and the forecast is yours again." },
    ],
    engagement: {
      ctx: "Recent engagement · Distribution · [$45M revenue] · PE-backed",
      situation: "Covenant default after two quarters of margin erosion. The lender had lost confidence in the forecast; the sponsor was weighing whether to fund.",
      action: "Rebuilt the 13-week cash forecast in ten days, negotiated a 90-day standstill, took the interim CFO seat and reset pricing on the bottom third of accounts.",
      outcome: "Positive cash in week seven. Facility amended and extended at month four. Sponsor funded the plan; management retained.",
    },
    partner: { name: "Baker Smith", role: "Founder & Managing Partner", bio: "[Twenty-plus years leading turnarounds and restructurings for middle-market companies and their lenders. Bio to come from Baker.]" },
    next: "transactions",
  },
  {
    slug: "transactions",
    n: "02",
    nav: "Transactions",
    title: "Refinancing & M&A",
    headline: ["A facility is maturing.", "A sale may be the answer."],
    sub: "We run the process and negotiate terms the business can live with, on the lender's timeline and the owner's.",
    hero: { desktop: "/film/transactions-hero.jpg", mobile: "/film/transactions-hero-mobile.jpg", ink: "paper", caption: "Two rivers meeting" },
    situation: {
      statement: "The capital structure no longer fits the business, and the people across the table know it.",
      lead: "A maturity is coming, a covenant has tripped, or the honest answer is that the company is worth more in someone else's hands. These situations reward preparation and punish surprise. We build the case before the first meeting, run the process at the pace the situation demands, and sit across the table from lenders and buyers as people who have been on their side of it.",
    },
    work: [
      { t: "Refinancing and recapitalization", w: "The lender case built from the forecast up: what the business can service, what it can't, and why the new structure holds. Term sheets negotiated, not accepted." },
      { t: "Amendments, extensions and standstills", w: "Breathing room on terms that leave the company room to operate, agreed while there is still credibility to spend." },
      { t: "Accelerated and distressed M&A", w: "A sale run in weeks rather than months, with the buyer list, the data room and the story ready before the clock starts." },
      { t: "Lender-led and sponsor-led processes", w: "When the bank or the sponsor is driving the outcome, we represent management's interests and keep the business running through it." },
    ],
    steps: [
      { h: "A conversation this week", p: "With a partner who has sat on both sides. We tell you what the lender will ask for and what a buyer will pay for, before either of them does." },
      { h: "A read of the options in days", p: "Refinance, amend, sell, or some combination. Each with its timeline, its cost and its odds, on one page." },
      { h: "A process with a clock on it", p: "Who we approach, in what order, with what materials, and the date by which you will know." },
      { h: "A partner at the table", p: "In every negotiation until it closes, and in the business while it does." },
    ],
    engagement: {
      ctx: "Recent engagement · Manufacturing · [$80M revenue] · Family-owned",
      situation: "A term loan maturing in five months with the incumbent lender unwilling to extend, and no refinancing package prepared.",
      action: "Built the lender case in three weeks, ran a parallel refinancing and minority-sale process, and negotiated a bridge from the incumbent to cover the gap.",
      outcome: "Refinanced with a new lender at month four. The owners kept control. The minority offer stayed on file as the fallback that never had to be used.",
    },
    partner: { name: "[Partner name]", role: "Partner, Transactions", bio: "[Bio to come. 150–250 words, written for a lender reading at eleven at night.]" },
    next: "value-creation",
  },
  {
    slug: "value-creation",
    n: "03",
    nav: "Value Creation",
    title: "Value Creation",
    headline: ["The business is sound.", "The margin isn't."],
    sub: "The operating improvements that are already there, found and put into the P&L inside two quarters.",
    hero: { desktop: "/film/value-hero.jpg", mobile: "/film/value-hero-mobile.jpg", ink: "paper", caption: "The valley in full sun" },
    situation: {
      statement: "Revenue is fine. Everything underneath it has drifted.",
      lead: "Pricing that hasn't moved in three years, a cost base built for a bigger company, working capital tied up where nobody is looking. None of it is dramatic and all of it is money. We find it with your team, rank it by what it is worth against what it takes, and put the top of the list into the numbers before the next board meeting.",
    },
    work: [
      { t: "Margin and pricing", w: "Customer and product profitability rebuilt from the invoice up. The bottom third of accounts repriced or released." },
      { t: "Working capital", w: "Receivables, inventory and payables run as a cash engine, with the weekly disciplines that keep it running after we leave." },
      { t: "Cost structure", w: "Spend matched to the business you have, not the one you planned. Decisions made with management, not handed down." },
      { t: "Operating cadence", w: "The weekly meeting, the one-page report and the three numbers that tell you whether the plan is working." },
    ],
    steps: [
      { h: "A conversation this week", p: "With a partner. We tell you where the money usually is in a business like yours, and whether it is worth our time and your fee." },
      { h: "A diagnostic in weeks", p: "The full list, each item sized and sequenced. No slideware; a plan a plant manager can read." },
      { h: "A plan with a clock on it", p: "Two quarters. What lands in which month, who owns it, and what we report every Friday." },
      { h: "A partner alongside management", p: "In the business, not in a conference room, until the improvements are in the run-rate and the cadence is yours." },
    ],
    engagement: {
      ctx: "Recent engagement · Business services · [$60M revenue] · PE-backed",
      situation: "Flat revenue and a margin that had fallen four points in two years. The sponsor wanted a plan before the next financing.",
      action: "Repriced the bottom quartile of contracts, released two loss-making service lines, and rebuilt the monthly operating review around five numbers.",
      outcome: "Margin recovered three of the four points inside two quarters. The sponsor financed the growth plan on the strength of the run-rate.",
    },
    partner: { name: "[Partner name]", role: "Partner, Operations", bio: "[Bio to come.]" },
    next: "interim-leadership",
  },
  {
    slug: "interim-leadership",
    n: "04",
    nav: "Interim Leadership",
    title: "Interim Management",
    headline: ["The seat needs", "an operator now."],
    sub: "Interim CRO, CFO or COO with authority to act, in the seat until the business is handed back in better order.",
    hero: { desktop: "/film/interim-hero.jpg", mobile: "/film/interim-hero-mobile.jpg", ink: "paper", caption: "The one lit house at dusk" },
    situation: {
      statement: "Someone has to run this, this week, with the authority to decide.",
      lead: "A CFO has left in the middle of a refinancing. The board no longer trusts the forecast and needs a name on it. A sponsor wants an operator in the building before it funds. We take the seat, not the adjacent one: a partner with the title, the authority and the accountability, for as long as the situation needs and no longer.",
    },
    work: [
      { t: "Chief Restructuring Officer", w: "Appointed with a mandate from the board and the lenders, owning the plan and the numbers through the restructuring." },
      { t: "Interim CFO", w: "The forecast, the bank and the board, from day one. The finance team rebuilt where it needs to be, kept where it doesn't." },
      { t: "Interim COO", w: "Operations run to the plan: the supply chain, the plant, the people, the weekly numbers." },
      { t: "Transition and handback", w: "The permanent hire found or developed, the tooling and the cadence left behind, the seat handed over clean." },
    ],
    steps: [
      { h: "A conversation this week", p: "With the partner who would take the seat. Not a candidate list; the person." },
      { h: "In the seat in days", p: "Mandate agreed with the board and the lenders, first read of cash and the three decisions that cannot wait." },
      { h: "A plan the board can hold us to", p: "What stable looks like, by when, and what we report every Friday until we get there." },
      { h: "A clean handback", p: "A business in better order, a successor in place, and nothing that depends on us staying." },
    ],
    engagement: {
      ctx: "Recent engagement · Consumer products · [$120M revenue] · Lender-referred",
      situation: "CFO resignation three weeks before a covenant test, with the lender losing confidence in management's numbers.",
      action: "Took the interim CFO seat, rebuilt the forecast and the covenant model, and led the amendment negotiation personally.",
      outcome: "Covenant reset agreed. A permanent CFO recruited and in place at month five; the forecast handed over with the bank's confidence intact.",
    },
    partner: { name: "Baker Smith", role: "Founder & Managing Partner", bio: "[Twenty-plus years leading turnarounds and restructurings for middle-market companies and their lenders. Bio to come from Baker.]" },
    next: "operational-ai",
  },
  {
    slug: "operational-ai",
    n: "05",
    nav: "Operational AI",
    title: "Operational AI",
    headline: ["A lean team that", "sees further."],
    sub: "Agents built into the finance, operations and reporting work of the companies we run.",
    hero: { desktop: "/film/ai-hero.jpg", mobile: "/film/ai-hero-mobile.jpg", ink: "paper", caption: "The valley at night, points of light" },
    situation: {
      statement: "The data exists. Nobody has time to look at it.",
      lead: "A turnaround runs on a handful of numbers that have to be right every week, produced by a finance team that is usually too small for the job. We build agents that do the gathering, the reconciling and the first draft of the reporting, so the people who are left spend their time on the decisions. Practical tooling, built inside the companies we run, that stays after we leave.",
    },
    work: [
      { t: "Cash and forecasting agents", w: "Bank feeds, receivables and payables pulled and reconciled daily; the 13-week forecast refreshed without a spreadsheet marathon." },
      { t: "Reporting and board packs", w: "The weekly report and the monthly pack assembled from the systems, checked by a person, sent on time." },
      { t: "Operations monitoring", w: "Agents watching the numbers that matter — orders, margin, inventory, collections — and raising a hand when something moves." },
      { t: "Handover and training", w: "Built on tools your team already has, documented, and handed over with the people who will run it." },
    ],
    steps: [
      { h: "A conversation this week", p: "With a partner who runs companies, not a software demo. We tell you which two workflows are worth automating first and which are not." },
      { h: "One workflow in weeks", p: "The first agent live inside the month, on a job the team is doing by hand today." },
      { h: "A plan with a clock on it", p: "The next three workflows, sequenced by what they free up, with a date for each." },
      { h: "Tooling that stays", p: "Documented, owned by your team, and independent of us." },
    ],
    engagement: {
      ctx: "Recent engagement · Distribution · [$45M revenue] · PE-backed",
      situation: "A three-person finance team spending two days a week assembling the cash report for the lender.",
      action: "Built an agent that pulls the bank, AR and AP data nightly and drafts the 13-week forecast and the Friday report for review.",
      outcome: "The report out every Friday by noon with a day of the team's week returned to collections. Tooling handed over at the end of the engagement.",
    },
    partner: { name: "[Partner name]", role: "Partner, Operations", bio: "[Bio to come.]" },
    next: "turnaround",
  },
];

export const bySlug = (slug: string) => practices.find((p) => p.slug === slug);
