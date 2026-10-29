import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SiteScript from "@/components/SiteScript";
import { practices, bySlug } from "@/content/practices";
import "@/styles/home.css";
import "@/styles/practice.css";

export function generateStaticParams() {
  return practices.map((p) => ({ practice: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ practice: string }> }): Promise<Metadata> {
  const p = bySlug((await params).practice);
  return p ? { title: p.title, description: p.sub } : {};
}

const Arrow = () => (
  <i>
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M1 6h10M7 2l4 4-4 4" /></svg>
  </i>
);

/** One template for the five practices: a cinematic opening screen, then the document. */
export default async function PracticePage({ params }: { params: Promise<{ practice: string }> }) {
  const p = bySlug((await params).practice);
  if (!p) notFound();
  const next = bySlug(p.next)!;

  return (
    <>
      <Nav current={p.slug} ink={p.hero.ink === "ink" ? "on-light" : "on-dark"} />

      <section className={`phero ${p.hero.ink === "ink" ? "ink" : ""}`} data-ink={p.hero.ink} id="top">
        <div className="pfilm">
          <picture>
            <source media="(max-width: 720px) and (orientation: portrait)" srcSet={p.hero.mobile} />
            <img src={p.hero.desktop} alt="" fetchPriority="high" decoding="async" />
          </picture>
          <div className="pwash" />
        </div>
        <div className="ptext wrap">
          <div className="pkick">{p.n} · {p.title}</div>
          <h1 className="phl"><span className="ln">{p.headline[0]}</span><span className="ln">{p.headline[1]}</span></h1>
          <p className="psub">{p.sub}</p>
          <a className="go mag" href="/#contact">Discuss a situation <Arrow /></a>
        </div>
        <div className="scroll-hint">Scroll down to discover</div>
      </section>

      <main className="doc">
        <section className="d wrap">
          <div className="grid">
            <div className="label">The situation</div>
            <div>
              <p className="statement rv">{p.situation.statement}</p>
              <p className="lead rv">{p.situation.lead}</p>
            </div>
          </div>
        </section>

        <section className="d wrap">
          <div className="grid">
            <div className="label">What we do</div>
            <div>
              <h2 className="sec rv">The work, in the order it usually happens.</h2>
              <ul className="sit plain rv mt48">
                {p.work.map((w, i) => (
                  <li key={w.t}><div className="row"><span className="n">{String(i + 1).padStart(2, "0")}</span><span className="t">{w.t}</span><p className="w">{w.w}</p></div></li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="d wrap" id="how">
          <div className="grid">
            <div className="label">How it runs</div>
            <div>
              <h2 className="sec rv">Calling us starts four things.</h2>
              <ol className="steps rv mt48">
                {p.steps.map((s) => (
                  <li key={s.h}><div><h4>{s.h}</h4><p>{s.p}</p></div></li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="d wrap" id="proof">
          <div className="grid">
            <div className="label">Record</div>
            <div>
              <div className="case rv top">
                <div className="ctx">{p.engagement.ctx}</div>
                <dl>
                  <div className="row"><dt>Situation</dt><dd>{p.engagement.situation}</dd></div>
                  <div className="row"><dt>Action</dt><dd>{p.engagement.action}</dd></div>
                  <div className="row"><dt>Outcome</dt><dd>{p.engagement.outcome}</dd></div>
                </dl>
              </div>
              <p className="note rv mt20">Engagement details are illustrative until the firm&apos;s record is supplied. <a href="/work" style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>All engagements</a></p>
            </div>
          </div>
        </section>

        <section className="d wrap paper" id="people">
          <div className="grid">
            <div className="label">The partner</div>
            <div className="ppartner">
              <div className="person rv"><div className="ph"></div><h3>{p.partner.name}</h3><div className="r">{p.partner.role}</div><p>{p.partner.bio}</p></div>
              <div className="pnext rv">
                <div className="label">Next</div>
                <a href={`/${next.slug}`} className="nextlink"><span className="n">{next.n}</span><span className="t">{next.title}</span><Arrow /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="d wrap pcontact" id="contact">
          <div className="pcbg" aria-hidden="true"><img src="/film/dusk.jpg" alt="" loading="lazy" decoding="async" /><div className="wash" /></div>
          <div className="contact">
            <div>
              <p className="big rv">If the situation is urgent, the first conversation is today.</p>
              <div className="lines rv">
                <b><a href="tel:+14048803381">+1 (404) 880-3381</a></b>
                <span>contact@acg-domain.com</span>
              </div>
            </div>
            <form className="rv" id="form"><input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
              <div className="f"><label htmlFor="name">Name</label><input id="name" name="name" type="text" autoComplete="name" /></div>
              <div className="f"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" /></div>
              <div className="f"><label htmlFor="sit">The situation, in a line</label><textarea id="sit" name="situation"></textarea></div>
              <button className="go mag" type="submit">Send <Arrow /></button>
              <p className="note" id="formnote">A managing director replies within one business day.</p>
            </form>
          </div>
        </section>

        <Footer />
      </main>
      <div className="cur" id="cur" aria-hidden="true"></div>
      <SiteScript />
    </>
  );
}
