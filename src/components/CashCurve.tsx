/**
 * The 13-week cash curve: the artefact every turnaround runs on, drawn by scroll.
 * Weekly net cash (indexed), below zero at the start, crossing in week seven. Pure SVG; the script
 * in site-behaviour sets --draw (0..1) as the section scrolls into view and the path draws itself.
 */
const weeks = [-1.0, -1.35, -1.55, -1.45, -1.15, -0.65, -0.1, 0.3, 0.6, 0.82, 0.98, 1.1, 1.18];
const events = [
  { week: 1, label: "Day one: bank statements up", side: "above" },
  { week: 4, label: "Standstill signed", side: "below" },
  { week: 7, label: "Positive cash", side: "above" },
  { week: 13, label: "Facility amended", side: "above" },
];

const W = 1300, H = 440, PL = 40, PR = 40, PT = 50, PB = 70;
const x = (i: number) => PL + (i * (W - PL - PR)) / 12;
const y = (v: number) => PT + ((1.4 - v) * (H - PT - PB)) / 3.2;

function smooth(pts: [number, number][]) {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
  }
  return d;
}

export default function CashCurve() {
  const pts = weeks.map((v, i) => [x(i), y(v)] as [number, number]);
  const line = smooth(pts);
  const zero = y(0);
  const area = `${line} L${x(12)},${zero} L${x(0)},${zero} Z`;
  return (
    <figure className="cash" aria-label="Thirteen-week cash curve: negative for six weeks, positive from week seven">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <clipPath id="cash-below"><rect x="0" y={zero} width={W} height={H - zero} /></clipPath>
          <clipPath id="cash-above"><rect x="0" y="0" width={W} height={zero} /></clipPath>
          <clipPath id="cash-draw"><rect className="cash-reveal" x="0" y="0" width={W} height={H} /></clipPath>
        </defs>
        {/* week ticks */}
        {weeks.map((_, i) => (
          <g key={i} className="cash-tick" style={{ "--i": i } as React.CSSProperties}>
            <line x1={x(i)} x2={x(i)} y1={PT - 10} y2={H - PB + 10} />
            <text x={x(i)} y={H - PB + 34} textAnchor="middle">{i === 0 ? "WK 1" : i + 1}</text>
          </g>
        ))}
        {/* zero line */}
        <line className="cash-zero" x1={PL} x2={W - PR} y1={zero} y2={zero} />
        <text className="cash-zero-l" x={W - PR} y={zero - 10} textAnchor="end">Cash break-even</text>
        <g clipPath="url(#cash-draw)">
          <path className="cash-area below" d={area} clipPath="url(#cash-below)" />
          <path className="cash-area above" d={area} clipPath="url(#cash-above)" />
          <path className="cash-line" d={line} pathLength={1} />
        </g>
        {events.map((e) => {
          const i = e.week - 1, px = x(i), py = y(weeks[i]);
          const up = e.side === "above";
          return (
            <g key={e.week} className="cash-ev" style={{ "--at": i / 12 } as React.CSSProperties}>
              <circle cx={px} cy={py} r="5" />
              <line x1={px} x2={px} y1={py + (up ? -12 : 12)} y2={py + (up ? -40 : 40)} />
              <text x={px} y={py + (up ? -50 : 58)} textAnchor={e.week === 13 ? "end" : e.week === 1 ? "start" : "middle"}>{e.label}</text>
            </g>
          );
        })}
      </svg>
      <figcaption>Net cash by week, indexed. The shape of a turnaround that holds: six weeks under water, the line crossing in week seven, the amendment signed from a position of credibility.</figcaption>
    </figure>
  );
}
