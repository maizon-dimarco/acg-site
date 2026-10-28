/**
 * Engagements for the Work page. Anonymised the way restructuring firms present them:
 * sector, size, who was in the room. Every case here is Maizon's illustrative draft until
 * Baker supplies the firm's record; anything in [brackets] is a placeholder.
 */
export type Case = {
  slug: string;
  practice: "turnaround" | "transactions" | "value-creation" | "interim-leadership" | "operational-ai";
  sector: string;
  size: string;
  context: string;
  title: string;
  situation: string;
  action: string;
  outcome: string;
  figures: { n: string; l: string }[];
  duration: string;
};

export const cases: Case[] = [
  {
    slug: "distribution-covenant-default",
    practice: "turnaround",
    sector: "Distribution",
    size: "[$45M revenue]",
    context: "PE-backed · Lender-referred",
    title: "Positive cash in week seven.",
    situation: "Covenant default after two quarters of margin erosion. The lender had lost confidence in the forecast; the sponsor was weighing whether to fund.",
    action: "Rebuilt the 13-week cash forecast in ten days, negotiated a 90-day standstill, took the interim CFO seat and reset pricing on the bottom third of accounts.",
    outcome: "Positive cash in week seven. Facility amended and extended at month four. Sponsor funded the plan; management retained.",
    figures: [{ n: "7", l: "Weeks to positive cash" }, { n: "90", l: "Day standstill negotiated" }, { n: "4", l: "Months to amendment" }],
    duration: "Five months",
  },
  {
    slug: "manufacturing-maturity",
    practice: "transactions",
    sector: "Manufacturing",
    size: "[$80M revenue]",
    context: "Family-owned · Board-referred",
    title: "Refinanced in four months, with the owners in control.",
    situation: "A term loan maturing in five months with the incumbent lender unwilling to extend, and no refinancing package prepared.",
    action: "Built the lender case in three weeks, ran a parallel refinancing and minority-sale process, and negotiated a bridge from the incumbent to cover the gap.",
    outcome: "Refinanced with a new lender at month four. The owners kept control. The minority offer stayed on file as the fallback that never had to be used.",
    figures: [{ n: "3", l: "Weeks to a lender case" }, { n: "2", l: "Processes run in parallel" }, { n: "100%", l: "Ownership retained" }],
    duration: "Four months",
  },
  {
    slug: "services-margin-recovery",
    practice: "value-creation",
    sector: "Business services",
    size: "[$60M revenue]",
    context: "PE-backed · Sponsor-referred",
    title: "Three of four margin points back in two quarters.",
    situation: "Flat revenue and a margin that had fallen four points in two years. The sponsor wanted a plan before the next financing.",
    action: "Repriced the bottom quartile of contracts, released two loss-making service lines, and rebuilt the monthly operating review around five numbers.",
    outcome: "Margin recovered three of the four points inside two quarters. The sponsor financed the growth plan on the strength of the run-rate.",
    figures: [{ n: "+3", l: "Margin points recovered" }, { n: "2", l: "Quarters" }, { n: "5", l: "Numbers in the operating review" }],
    duration: "Six months",
  },
  {
    slug: "consumer-interim-cfo",
    practice: "interim-leadership",
    sector: "Consumer products",
    size: "[$120M revenue]",
    context: "Lender-referred",
    title: "A covenant reset, and a CFO's chair handed over clean.",
    situation: "CFO resignation three weeks before a covenant test, with the lender losing confidence in management's numbers.",
    action: "Took the interim CFO seat, rebuilt the forecast and the covenant model, and led the amendment negotiation personally.",
    outcome: "Covenant reset agreed. A permanent CFO recruited and in place at month five; the forecast handed over with the bank's confidence intact.",
    figures: [{ n: "3", l: "Weeks to the covenant test" }, { n: "1", l: "Amendment, agreed" }, { n: "5", l: "Months to a permanent CFO" }],
    duration: "Five months",
  },
  {
    slug: "distribution-cash-agent",
    practice: "operational-ai",
    sector: "Distribution",
    size: "[$45M revenue]",
    context: "PE-backed · Follow-on to a turnaround",
    title: "The Friday report out by noon, with a day a week returned to collections.",
    situation: "A three-person finance team spending two days a week assembling the cash report for the lender.",
    action: "Built an agent that pulls the bank, AR and AP data nightly and drafts the 13-week forecast and the Friday report for review.",
    outcome: "The report out every Friday by noon, with a day of the team's week returned to collections. Tooling handed over at the end of the engagement.",
    figures: [{ n: "1", l: "Day a week returned" }, { n: "13", l: "Week forecast, refreshed nightly" }, { n: "0", l: "Spreadsheet marathons" }],
    duration: "Three months",
  },
  {
    slug: "healthcare-services-restructuring",
    practice: "turnaround",
    sector: "Healthcare services",
    size: "[$30M revenue]",
    context: "Founder-owned · Lender-referred",
    title: "[Illustrative] A business sold as a going concern rather than wound down.",
    situation: "[Placeholder case. Payor mix had shifted, cash was running out in weeks, and the lender was preparing for a wind-down.]",
    action: "[Stabilized cash, ran an accelerated sale in parallel with the operating plan, and kept the clinics open through the process.]",
    outcome: "[Sold as a going concern at month three. Jobs and contracts preserved; the lender recovered more than the wind-down estimate.]",
    figures: [{ n: "3", l: "Months to a sale" }, { n: "[x]", l: "Jobs preserved" }, { n: "[x%]", l: "Recovery vs. wind-down" }],
    duration: "Three months",
  },
];

export const practiceNames: Record<Case["practice"], string> = {
  turnaround: "Turnaround",
  transactions: "Transactions",
  "value-creation": "Value Creation",
  "interim-leadership": "Interim Leadership",
  "operational-ai": "Operational AI",
};
