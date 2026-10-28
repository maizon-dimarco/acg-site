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
    hero: { desktop: "/film/home-desktop-poster.jpg", mobile: "/film/home-mobile-poster.jpg", ink: "ink", caption: "[Hero still to come: two rivers meeting]" },
    situation: {
      statement: "The capital structure no longer fits the business, and the people across the table know it.",
      lead: "[Draft copy to come. Refinancing, recapitalization, distressed and accelerated M&A, lender-led sales.]",
    },
    work: [
      { t: "Refinancing and recapitalization", w: "[To come]" },
      { t: "Accelerated M&A", w: "[To come]" },
      { t: "Lender negotiations", w: "[To come]" },
      { t: "Buyer and investor process", w: "[To come]" },
    ],
    steps: [
      { h: "A conversation this week", p: "[To come]" },
      { h: "A read of the options in days", p: "[To come]" },
      { h: "A process with a clock on it", p: "[To come]" },
      { h: "A partner at the table", p: "[To come]" },
    ],
    engagement: { ctx: "[Recent engagement]", situation: "[To come]", action: "[To come]", outcome: "[To come]" },
    partner: { name: "[Partner name]", role: "Partner, Transactions", bio: "[Bio to come.]" },
    next: "value-creation",
  },
  {
    slug: "value-creation",
    n: "03",
    nav: "Value Creation",
    title: "Value Creation",
    headline: ["The business is sound.", "The margin isn't."],
    sub: "The operating improvements that are already there, found and put into the P&L inside two quarters.",
    hero: { desktop: "/film/river.jpg", mobile: "/film/home-mobile-poster.jpg", ink: "paper", caption: "[Hero still to come: the valley in full sun]" },
    situation: { statement: "Revenue is fine. Everything underneath it has drifted.", lead: "[Draft copy to come.]" },
    work: [
      { t: "Margin and pricing", w: "[To come]" },
      { t: "Working capital", w: "[To come]" },
      { t: "Cost structure", w: "[To come]" },
      { t: "Operating cadence", w: "[To come]" },
    ],
    steps: [
      { h: "A conversation this week", p: "[To come]" },
      { h: "A diagnostic in weeks", p: "[To come]" },
      { h: "A plan with a clock on it", p: "[To come]" },
      { h: "A partner alongside management", p: "[To come]" },
    ],
    engagement: { ctx: "[Recent engagement]", situation: "[To come]", action: "[To come]", outcome: "[To come]" },
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
    hero: { desktop: "/film/dusk.jpg", mobile: "/film/dusk-mobile.jpg", ink: "paper", caption: "The one lit house at dusk" },
    situation: { statement: "Someone has to run this, this week, with the authority to decide.", lead: "[Draft copy to come.]" },
    work: [
      { t: "Chief Restructuring Officer", w: "[To come]" },
      { t: "Interim CFO", w: "[To come]" },
      { t: "Interim COO", w: "[To come]" },
      { t: "Transition and handback", w: "[To come]" },
    ],
    steps: [
      { h: "A conversation this week", p: "[To come]" },
      { h: "In the seat in days", p: "[To come]" },
      { h: "A plan the board can hold us to", p: "[To come]" },
      { h: "A clean handback", p: "[To come]" },
    ],
    engagement: { ctx: "[Recent engagement]", situation: "[To come]", action: "[To come]", outcome: "[To come]" },
    partner: { name: "Baker Smith", role: "Founder & Managing Partner", bio: "[Bio to come.]" },
    next: "operational-ai",
  },
  {
    slug: "operational-ai",
    n: "05",
    nav: "Operational AI",
    title: "Operational AI",
    headline: ["A lean team that", "sees further."],
    sub: "Agents built into the finance, operations and reporting work of the companies we run.",
    hero: { desktop: "/film/home-desktop-poster.jpg", mobile: "/film/home-mobile-poster.jpg", ink: "ink", caption: "[Live world to come: the lattice of light]" },
    situation: { statement: "The data exists. Nobody has time to look at it.", lead: "[Draft copy to come.]" },
    work: [
      { t: "Cash and forecasting agents", w: "[To come]" },
      { t: "Reporting and board packs", w: "[To come]" },
      { t: "Operations monitoring", w: "[To come]" },
      { t: "Handover and training", w: "[To come]" },
    ],
    steps: [
      { h: "A conversation this week", p: "[To come]" },
      { h: "One workflow in weeks", p: "[To come]" },
      { h: "A plan with a clock on it", p: "[To come]" },
      { h: "Tooling that stays", p: "[To come]" },
    ],
    engagement: { ctx: "[Recent engagement]", situation: "[To come]", action: "[To come]", outcome: "[To come]" },
    partner: { name: "[Partner name]", role: "Partner, Operations", bio: "[Bio to come.]" },
    next: "turnaround",
  },
];

export const bySlug = (slug: string) => practices.find((p) => p.slug === slug);
