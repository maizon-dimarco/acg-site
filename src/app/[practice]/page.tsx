import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SiteScript from "@/components/SiteScript";
import { practices, bySlug } from "@/content/practices";
import { cases } from "@/content/cases";
import Mark from "@/components/Mark";
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
  const rec = cases.find((c) => c.practice === p.slug);
  const recCount = cases.filter((c) => c.practice === p.slug).length;
  const live = !!p.film; const f = p.film;

  return (
    <>
      <Nav current={p.slug} ink={p.hero.ink === "ink" ? "on-light" : "on-dark"} />

      {live && f ? (
        <section className="phero live" data-ink="paper" id="top">
          <div className="pfilm">
            <picture className="pimg">
              <source media="(max-width: 720px) and (orientation: portrait)" srcSet={f.start.mobile} />
              <img src={f.start.desktop} alt="" fetchPriority="high" decoding="async" />
            </picture>
            <picture className="pplane">
              <source media="(max-width: 720px) and (orientation: portrait)" srcSet={f.end.mobile} />
              <img src={f.end.desktop} alt="" loading="eager" decoding="async" />
            </picture>
            <video className="pvid" id="pvid" muted playsInline preload="auto" aria-hidden="true" data-desktop={`${f.base}-desktop.mp4`} data-hd={`${f.base}-hd.mp4`} data-mobile={`${f.base}-mobile.mp4`}></video>
            <video className="ploop" id="loopStart" muted playsInline loop preload="auto" aria-hidden="true" data-desktop={`${f.base}-loop-start.mp4`} data-mobile={`${f.base}-loop-start-mobile.mp4`}></video>
            <video className="ploop" id="loopEnd" muted playsInline loop preload="auto" aria-hidden="true" data-desktop={`${f.base}-loop-end.mp4`} data-mobile={`${f.base}-loop-end-mobile.mp4`}></video>
            <div className="pwash" />
          </div>
          <div className="pstops">
            <div className="pstop wrap" data-stop="0">
              <div className="pkick">{p.n} · {p.title}</div>
              <h1 className="phl"><span className="ln">{f.stops[0][0]}</span><span className="ln">{f.stops[0][1]}</span></h1>
              <p className="psub">{p.sub}</p>
            </div>
            <div className="pstop wrap" data-stop="1">
              <p className="pbig"><span className="ln">{f.stops[1][0]}</span><span className="ln">{f.stops[1][1]}</span></p>
            </div>
            <div className="pstop wrap" data-stop="2">
              <p className="pbig"><span className="ln">{f.stops[2][0]}</span><span className="ln">{f.stops[2][1]}</span></p>
              <a className="go mag" href="/#contact">Discuss a situation <Arrow /></a>
            </div>
          </div>
          <div className="scroll-hint">Scroll down to discover</div>
          <div className="pplate" aria-hidden="true">
            <picture>
              <source media="(max-width: 720px) and (orientation: portrait)" srcSet={f.plate.mobile} />
              <img src={f.plate.desktop} alt="" loading="lazy" decoding="async" />
            </picture>
            <video className="ploop plateloop" id="loopPlate" muted playsInline loop preload="none" aria-hidden="true" data-desktop={`${f.base}-loop-plate.mp4`} data-mobile={`${f.base}-loop-plate-mobile.mp4`}></video>
          </div>
        </section>
      ) : (
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
      )}

      <main className={`doc ${live ? "live-doc" : ""}`} data-page={p.slug}>
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
              {rec ? (
                <>
                  <div className="case rv top">
                    <div className="recmark"><Mark c={rec} size="m" /></div>
                    <div className="ctx">{rec.sector} · {rec.context}</div>
                    <dl>
                      <div className="row"><dt>Situation</dt><dd>{rec.situation}</dd></div>
                      <div className="row"><dt>Action</dt><dd>{rec.action}</dd></div>
                      <div className="row"><dt>Outcome</dt><dd>{rec.outcome}</dd></div>
                    </dl>
                  </div>
                  {rec.figures && rec.figures.length > 0 && (
                    <div className="figs rv mt48">
                      {rec.figures.map((f) => (<div className="fig" key={f.l}><div className="n">{f.n}</div><div className="l">{f.l}</div></div>))}
                    </div>
                  )}
                  <p className="note rv mt20"><a href="/work" style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>All engagements</a>{recCount > 1 ? ` · ${recCount} in this practice` : ""}</p>
                </>
              ) : (
                <p className="lead rv">The firm&apos;s record in this practice is building. <a href="/work" style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>See all engagements</a>.</p>
              )}
            </div>
          </div>
        </section>

        <section className="d wrap paper" id="people">
          <div className="grid">
            <div className="label">The managing director</div>
            <div className="ppartner">
              <div className="person rv"><div className={`ph ${p.partner.photo ? "has" : ""}`}>{p.partner.photo && <img src={p.partner.photo} alt={p.partner.name} loading="lazy" />}</div><h3>{p.partner.name}</h3><div className="r">{p.partner.role}</div><p>{p.partner.bio}</p></div>
            </div>
          </div>
        </section>

        <a className="doorway rv" href={`/${next.slug}`} aria-label={`Next: ${next.title}`}>
          <picture className="dw-img">
            <source media="(max-width: 720px) and (orientation: portrait)" srcSet={next.film ? next.film.end.mobile : next.hero.mobile} />
            <img src={next.film ? next.film.end.desktop : next.hero.desktop} alt="" loading="lazy" decoding="async" />
          </picture>
          <div className="dw-wash" />
          <div className="dw-text wrap">
            <div className="pkick">Next · {next.n}</div>
            <div className="dw-title">{next.film ? next.film.stops[0].join(" ") : next.headline.join(" ")}</div>
            <div className="dw-go">{next.title} <Arrow /></div>
          </div>
        </a>

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
      <nav className="rail" aria-label="Practices">
        {practices.map((q) => (<a key={q.slug} href={`/${q.slug}`} className={q.slug === p.slug ? "on" : ""} aria-current={q.slug === p.slug ? "page" : undefined}><span className="rn">{q.n}</span><span className="rt">{q.nav}</span></a>))}
        <span className="rbar" aria-hidden="true"><i /></span>
      </nav>
      <div className="cur" id="cur" aria-hidden="true"></div>
      <SiteScript />
    </>
  );
}
