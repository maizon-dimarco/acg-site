import Lockup from "@/components/Lockup";
import { practices } from "@/content/practices";
import Menu from "@/components/Menu";

/** Site header. Montfort proportions on desktop; a white card that appears on scroll on phones. */
export default function Nav({ current, ink = "on-dark" }: { current?: string; ink?: "on-dark" | "on-light" }) {
  return (
    <header className={`nav wrap ${ink}`} id="nav">
      <div className="card">
        <a className="mobile-brand" href="/" aria-label="American Change &amp; Grow"><Lockup className="wm" /></a>
        <ul>
          <li className="home"><a href="/" aria-label="American Change &amp; Grow"><Lockup className="wm" /></a></li>
          {practices.map((p) => (
            <li key={p.slug} className={p.slug === current ? "on" : ""}><a href={`/${p.slug}`}>{p.nav}</a></li>
          ))}
        </ul>
        <div className="right"><a className="insights" href="/#contact"><span className="word">Insights</span></a><a href="/#contact">Contact</a><Menu current={current} /></div>
      </div>
    </header>
  );
}
