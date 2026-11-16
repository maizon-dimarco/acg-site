import type { Case } from "@/content/cases";

/** A client's mark for the wall and the case rows: the real logo when we have it, otherwise the name set as a wordmark. */
export default function Mark({ c, size = "m" }: { c: Pick<Case, "company" | "logo">; size?: "s" | "m" | "l" }) {
  if (c.logo) return <span className={`mark img ${size}`}><img src={c.logo} alt={c.company} loading="lazy" decoding="async" /></span>;
  return <span className={`mark type ${size}`}>{c.company}</span>;
}
