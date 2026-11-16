import { cases } from "@/content/cases";
import Mark from "@/components/Mark";

/**
 * Client marks. Desktop: a slow flat drift (two copies of the row make the loop seamless).
 * Phones: a turning drum, each mark a face of a cylinder. CSS chooses by viewport; both are rendered.
 */
export default function Marquee({ label = "Companies served" }: { label?: string }) {
  const list = cases;
  const Row = ({ hidden }: { hidden?: boolean }) => (
    <ul className="mq-row" aria-hidden={hidden || undefined}>
      {list.map((c) => (<li key={c.slug}><a href={`/work#${c.slug}`} tabIndex={hidden ? -1 : undefined}><Mark c={c} size="l" /></a></li>))}
    </ul>
  );
  const drum = [...list, ...list];
  return (
    <>
      <div className="mq" aria-label={label}>
        <div className="mq-track"><Row /><Row hidden /></div>
      </div>
      <div className="wheel" aria-hidden="true" style={{ "--n": drum.length } as React.CSSProperties}>
        <ul className="drum">
          {drum.map((c, i) => (
            <li key={`${c.slug}-${i}`} style={{ "--i": i } as React.CSSProperties}>
              <a href={`/work#${c.slug}`} tabIndex={-1}><Mark c={c} size="l" /></a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
