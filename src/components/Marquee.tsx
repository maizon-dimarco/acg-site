import { cases } from "@/content/cases";
import Mark from "@/components/Mark";

/**
 * Client marks on a turning drum: each mark is a face of a cylinder that rotates about a vertical axis,
 * so the front mark comes toward the viewer and the rest recede around the curve. CSS 3D only.
 */
export default function Marquee({ label = "Companies served" }: { label?: string }) {
  const list = [...cases, ...cases];   // two turns of the list, so the drum is wide enough to span the page
  const n = list.length;
  return (
    <div className="wheel" aria-label={label} style={{ "--n": n } as React.CSSProperties}>
      <ul className="drum">
        {list.map((c, i) => (
          <li key={`${c.slug}-${i}`} style={{ "--i": i } as React.CSSProperties} aria-hidden={i >= cases.length || undefined}>
            <a href={`/work#${c.slug}`} tabIndex={i >= cases.length ? -1 : undefined}><Mark c={c} size="l" /></a>
          </li>
        ))}
      </ul>
    </div>
  );
}
