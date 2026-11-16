import { cases } from "@/content/cases";
import Mark from "@/components/Mark";

/** Client marks on a slow, endless drift. Two copies of the row make the loop seamless; it pauses on hover. */
export default function Marquee({ label = "Companies served" }: { label?: string }) {
  const list = cases;
  const Row = ({ hidden }: { hidden?: boolean }) => (
    <ul className="mq-row" aria-hidden={hidden || undefined}>
      {list.map((c) => (<li key={c.slug}><a href={`/work#${c.slug}`} tabIndex={hidden ? -1 : undefined}><Mark c={c} size="l" /></a></li>))}
    </ul>
  );
  return (
    <div className="mq" aria-label={label}>
      <div className="mq-track"><Row /><Row hidden /></div>
    </div>
  );
}
