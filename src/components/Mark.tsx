import type { Case } from "@/content/cases";

/** A client's mark for the wall and the case rows: the real logo when we have it, otherwise the name set as a wordmark. */
const square = new Set(["college-football-hall-of-fame", "roundtree-automotive", "hirschfeld-steel", "macphersons", "central-states-enterprises", "rubies-costume", "peanut-cooperative", "onecare", "midstate-mills"]);

export default function Mark({ c, size = "m" }: { c: Pick<Case, "company" | "logo" | "slug">; size?: "s" | "m" | "l" }) {
  if (c.logo) return <span className={`mark img ${size} ${square.has(c.slug) ? "sq" : ""}`}><img src={c.logo} alt={c.company} loading="lazy" decoding="async" /></span>;
  return <span className={`mark type ${size}`}>{c.company}</span>;
}
