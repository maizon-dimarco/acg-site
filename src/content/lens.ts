/** The home page re-addressed to the reader. Keys match the `data-lens` attribute and the switch buttons. */
export type LensKey = "lender" | "sponsor" | "board" | "cfo";

export const lenses: Record<LensKey, { label: string; statement: string; order: string[]; contact: string; sub: string }> = {
  lender: {
    label: "A lender",
    statement: "When a borrower's numbers stop adding up, you need one set you can lend against, produced by an operator who has sat on your side of the table.",
    order: ["turnaround", "transactions", "interim-leadership", "value-creation", "operational-ai"],
    contact: "If the credit is deteriorating, the first conversation is today.",
    sub: "Standstills, amendments and forbearance negotiated from a forecast your committee can underwrite.",
  },
  sponsor: {
    label: "A sponsor",
    statement: "A portfolio company is burning cash and the board wants a plan before the next funding decision. We give you a plan you can fund, or a clear reason not to.",
    order: ["turnaround", "value-creation", "transactions", "interim-leadership", "operational-ai"],
    contact: "If the next board meeting needs a plan, start here.",
    sub: "Operators in the seat, a run-rate the next financing can be priced on, and an exit the business can carry.",
  },
  board: {
    label: "A board",
    statement: "The board needs an independent view of whether the business is viable, and someone with the authority to act on the answer.",
    order: ["interim-leadership", "turnaround", "transactions", "value-creation", "operational-ai"],
    contact: "If the board needs an answer this quarter, call.",
    sub: "Interim CEO, CRO or CFO with a mandate, a thirteen-week view of cash in ten days, and a recommendation you can minute.",
  },
  cfo: {
    label: "A CFO",
    statement: "You can see the covenant coming. We rebuild the forecast with your team, stand next to you with the bank, and leave the systems behind when we go.",
    order: ["turnaround", "transactions", "operational-ai", "value-creation", "interim-leadership"],
    contact: "If the forecast is keeping you up, call tonight.",
    sub: "One set of numbers, reported every Friday, and agents that take the gathering and reconciling off your team's desk.",
  },
};
