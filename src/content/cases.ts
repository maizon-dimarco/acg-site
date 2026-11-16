/**
 * Engagements for the Work page and the Record section of each practice page.
 * Source: Baker Smith's case studies document (November 2026). Wording is lightly edited
 * for the web; facts, names and figures are his. `role` is the seat the managing director held.
 */
export type Case = {
  slug: string;
  practice: "turnaround" | "transactions" | "value-creation" | "interim-leadership" | "operational-ai";
  company: string;
  sector: string;
  /** Who brought ACG in, and in what capacity. Shown as the small line under the sector. */
  context: string;
  title: string;
  situation: string;
  action: string;
  outcome: string;
  /** Path to a monochrome mark in /public/logos, when one exists. Otherwise the name is set in type. */
  logo?: string;
  /** True when the company is described rather than named; kept off the logo wall. */
  anonymous?: boolean;
  /** Hard numbers from the case, when the case has them. */
  figures?: { n: string; l: string }[];
};

export const cases: Case[] = [
  {
    slug: "pic-n-pay",
    logo: "/logos/pic-n-pay.png",
    practice: "interim-leadership",
    company: "Pic 'n Pay",
    sector: "Retail · footwear",
    context: "Interim CEO",
    title: "453 stores through bankruptcy; lenders repaid in full.",
    situation: "A retail shoe chain of 453 stores in 23 states was experiencing accelerating losses.",
    action: "An American Change & Grow managing director was tapped to serve as Interim CEO and guided the company through bankruptcy and a going-out-of-business sale.",
    outcome: "Working-capital and real-estate bank lenders were repaid in full, with a substantial recovery for suppliers.",
    figures: [{ n: "453", l: "Stores" }, { n: "23", l: "States" }, { n: "100%", l: "Bank lenders repaid" }],
  },
  {
    slug: "industrial-chemicals-us",
    logo: "/logos/industrial-chemicals-us.png",
    practice: "turnaround",
    company: "ICL · US subsidiary",
    sector: "Chemicals",
    context: "Engaged by the parent company",
    title: "Back to profitability in 45 days, then sold for a return on equity.",
    situation: "The United States subsidiary had been running cash losses for years. The parent company asked whether to restructure the business, sell it, or wind it down.",
    action: "An American Change & Grow managing director took the question on and returned the company to profitability within 45 days.",
    outcome: "The improved cash flow funded the environmental clean-up and the eventual sale of the plant, equipment and real estate for a return on equity.",
    figures: [{ n: "45", l: "Days to profitability" }],
  },
  {
    slug: "onecare",
    logo: "/logos/onecare.png",
    practice: "turnaround",
    company: "OneCare",
    sector: "Consumer products · household",
    context: "At the request of the secured lender group",
    title: "A turnaround plan, new management, and later a going-concern sale with a return to ownership.",
    situation: "OneCare's licensed household liquids and implements dominated the home-cleaning aisles at Walmart and Target. In the face of persistent losses, the private equity sponsor declined to continue funding.",
    action: "At the request of the secured lender group, an American Change & Grow managing director prepared a business assessment that became the basis for the company's turnaround plan, including the installation of new executive and financial management.",
    outcome: "After several periods of profitability the company lost key licenses; the managing director was recalled to prepare and help execute a wind-down and going-concern sale of the business, with a return on equity to ownership.",
  },
  {
    slug: "college-football-hall-of-fame",
    logo: "/logos/college-football-hall-of-fame.png",
    practice: "turnaround",
    company: "College Football Hall of Fame",
    sector: "Non-profit · attractions",
    context: "Sent in by the bank group",
    title: "Bank debt retired in full; the Hall operating at cash break-even and above.",
    situation: "The Hall was not generating enough revenue to service its bank debt. When a refinancing effort failed, the bank group became alarmed.",
    action: "An American Change & Grow managing director was sent in to determine whether there was a solution. After consultation with the Hall's leadership, various misunderstandings and roadblocks were eliminated.",
    outcome: "Sponsorship contributions came in sufficient to retire the bank debt in full, allowing the Hall to operate at cash break-even and above.",
    figures: [{ n: "100%", l: "Bank debt retired" }],
  },
  {
    slug: "midstate-mills",
    logo: "/logos/midstate-mills.png",
    practice: "turnaround",
    company: "Midstate Mills",
    sector: "Food manufacturing · milling",
    context: "Family-owned · engaged by the company",
    title: "Returned to profitability with the lender's support regained.",
    situation: "The family-owned miller behind Southern Biscuit flour, Tenda-Bake corn meal and Redi-Mix cake mix encountered losses and breached its bank covenants. When P&L losses led to a cash shortfall, management lacked the systems and controls to monitor and manage both cash and operations.",
    action: "An American Change & Grow managing director generated a turnaround plan: management reorganization, a 13-week cash flow, the going-concern sale of a money-losing mill, and a restructuring of the bank debt.",
    outcome: "The company was returned to profitability and regained the support of its lender.",
    figures: [{ n: "13", l: "Week cash flow installed" }, { n: "1", l: "Mill sold as a going concern" }],
  },
  {
    slug: "roundtree-automotive",
    logo: "/logos/roundtree-automotive.png",
    practice: "interim-leadership",
    company: "Roundtree Automotive",
    sector: "Automotive retail",
    context: "Chief Restructuring Officer · at an investor's request",
    title: "Cash losses traced to their source, then stemmed.",
    situation: "Founded in 1985 and once one of the top 100 dealer groups in the United States, with Cadillac, Chevrolet, Nissan, Kia, Dodge, Jeep and Buick dealerships, the company started to run out of cash.",
    action: "An American Change & Grow managing director served as Chief Restructuring Officer and developed a cash reconciliation that identified the sources of the losses by dealership department and vehicle pricing, and where cash went to cover them.",
    outcome: "The reconciliation became the basis for stemming cash losses through operating improvements and the disposition of dealerships.",
    figures: [{ n: "7", l: "Franchises across the group" }],
  },
  {
    slug: "hirschfeld-steel",
    logo: "/logos/hirschfeld-steel.png",
    practice: "interim-leadership",
    company: "Hirschfeld Steel",
    sector: "Steel fabrication",
    context: "Chief Restructuring Officer · family-owned",
    title: "Recapitalized, restructured, and sold as a going concern with a substantial return to the owners.",
    situation: "Founded in 1962, the multi-state fabricator of major-league stadiums, iconic bridges and landmark office buildings defaulted on its bank loans when the economy turned.",
    action: "An American Change & Grow managing director was appointed Chief Restructuring Officer to guide the turnaround and maintain the support of the bank group. A 13-week cash flow controlled operations while the turnaround plan was executed, the company recapitalized and its debt restructured.",
    outcome: "With the business stabilized and profitability restored, a going-concern sale of the company was achieved with a substantial return to the owners.",
    figures: [{ n: "13", l: "Week cash flow" }, { n: "1962", l: "Founded" }],
  },
  {
    slug: "macphersons",
    logo: "/logos/macphersons.png",
    practice: "transactions",
    company: "MacPherson's",
    sector: "Distribution · art materials",
    context: "Chief Restructuring Officer · engaged by the company",
    title: "Positive cash flow regained; secured debt satisfied in full.",
    situation: "Founded in 1906 and the largest distributor of art and creative materials in the United States, the company had struggled with operating losses for years when a large customer went bankrupt owing it millions. A sale of the business fell through and the CEO resigned.",
    action: "An American Change & Grow managing director served as Chief Restructuring Officer. Under his leadership the company regained positive cash flow and reduced its secured loan facility, then completed a going-concern transfer of its customer base and inventory under UCC Article 9.",
    outcome: "Collection of receivables and liquidation of the remaining assets followed, resulting in the satisfaction of the secured debt.",
    figures: [{ n: "100%", l: "Secured debt satisfied" }, { n: "1906", l: "Founded" }],
  },
  {
    slug: "central-states-enterprises",
    practice: "turnaround",
    company: "Central States Enterprises",
    sector: "Agriculture · grain",
    context: "At the request of the bank group",
    title: "Operated at cash break-even through a fraud, until the elevators sold as going concerns.",
    situation: "The multi-state grain elevator operator, founded in 1947, had run losses for several years. During the engagement the company discovered that a trusted manager had committed a multi-million-dollar fraud by speculating on the futures and hedging contracts used to manage purchases from several hundred farmers.",
    action: "Under the managing director's oversight a 13-week cash flow was generated and the company was operated at cash break-even or above.",
    outcome: "The grain elevators were sold as going concerns to pay down the bank debt.",
    figures: [{ n: "13", l: "Week cash flow" }, { n: "100", l: "Car train loads shipped" }],
  },
  {
    slug: "johnston-textiles",
    logo: "/logos/johnston-textiles.png",
    practice: "interim-leadership",
    company: "Johnston Textiles",
    sector: "Textiles",
    context: "Chief Operating Officer · brought in by the private equity sponsor",
    title: "Operations kept running for a critical customer while assets turned to cash.",
    situation: "Operating since 1948, the company faced persistent cash losses from import competition. The sponsor's loan-restructuring talks with the asset-based lender were upended by the discovery of a borrowing-base fraud.",
    action: "The private equity sponsor brought in an American Change & Grow managing director as Chief Operating Officer to maximize realization on the business and its assets. A cash break-even budget supported continuing operations to finish orders for a key customer supplying critical conveyor belts to John Deere.",
    outcome: "The company's assets were turned into cash and the bank loan paid down while the key customer's orders were completed.",
  },
  {
    slug: "blue-lizard-sunscreen",
    logo: "/logos/blue-lizard-sunscreen.png",
    practice: "value-creation",
    company: "Blue Lizard Sunscreen",
    sector: "Consumer products · skin care",
    context: "Business assessment · suggested by the secured lender",
    title: "A growth plan the lender could fund, and the product lines to cut.",
    situation: "Domestic sales seemed to have hit a volume ceiling while the platform company operated at a loss.",
    action: "The secured lender suggested an American Change & Grow managing director produce a business assessment of strategic options. It found the dermatology-practice channel effective but limited unless retail channels through drug stores and skin-care outlets were opened, specified the equity and debt facility required, and identified the non-sunscreen products to eliminate for an inadequate return on funds employed.",
    outcome: "The plan was subsequently implemented.",
  },
  {
    slug: "the-source",
    logo: "/logos/the-source.png",
    practice: "turnaround",
    company: "The Source",
    sector: "Media · publishing",
    context: "Sent in by the senior secured lender",
    title: "A core business plan that carried the magazine to reorganization and survival.",
    situation: "Once the highest-selling newsstand magazine in the United States, with Fortune 500 consumer advertisers, The Source could no longer service its debt.",
    action: "The senior secured lender sent in an American Change & Grow managing director to determine whether a core business plan could return it to profitability.",
    outcome: "His report became the basis for the reorganization and survival of the magazine under new leadership.",
  },
  {
    slug: "rubies-costume",
    logo: "/logos/rubies-costume.png",
    practice: "transactions",
    company: "Rubie's Costume Company",
    sector: "Consumer products · licensed apparel",
    context: "Turnaround plan and Chapter 11 · engaged by the company",
    title: "Profitable through Chapter 11; refinanced and recapitalized.",
    situation: "Founded in 1951 and the world's largest licensed Halloween and theatrical dress company, with character attire from Disney, Warner Bros., Lucasfilm and Marvel, the business had missed bank covenants for three years.",
    action: "An American Change & Grow managing director produced the turnaround plan, assisted with its implementation and navigated the Chapter 11 filing.",
    outcome: "The company returned to profitability despite the bankruptcy and completed a refinancing and recapitalization.",
    figures: [{ n: "3", l: "Years of missed covenants, resolved" }],
  },
  {
    slug: "peanut-cooperative",
    logo: "/logos/peanut-cooperative.png",
    practice: "value-creation",
    company: "Coastal Growers",
    sector: "Agriculture · cooperative",
    context: "Engaged by the company for its bank group",
    title: "A 52-week cash flow that restored the banks' confidence and the working capital.",
    situation: "The 200-farmer peanut cooperative supplying Mars, Hershey and Skippy could not give its bank group timely, accurate reports. Unable to see the performance of the business, the banks were uncomfortable lending more, and working capital fell short.",
    action: "An American Change & Grow managing director generated a 52-week cash flow that validated the other financials.",
    outcome: "The bank group gained the confidence to increase working capital sufficient for the cooperative to operate efficiently and profitably.",
    figures: [{ n: "200", l: "Member farmers" }, { n: "52", l: "Week cash flow" }],
  },
  {
    slug: "life-sciences",
    logo: "/logos/life-sciences.png",
    practice: "value-creation",
    company: "Cell Medica",
    sector: "Life sciences",
    context: "Strategic assessment",
    title: "A substantial portion of the investment recouped after testing stalled.",
    situation: "The company had developed a promising cancer treatment when testing hit a roadblock.",
    action: "An American Change & Grow managing director was called in to develop a strategy to maximize realization on the human and financial capital already invested.",
    outcome: "Based on his report, the business recouped a substantial portion of its investment.",
  },
];

export const practiceNames: Record<Case["practice"], string> = {
  turnaround: "Turnaround",
  transactions: "Transactions",
  "value-creation": "Value Creation",
  "interim-leadership": "Interim Leadership",
  "operational-ai": "Operational AI",
};
