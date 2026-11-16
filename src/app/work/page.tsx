import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SiteScript from "@/components/SiteScript";
import WorkList from "@/components/WorkList";
import Mark from "@/components/Mark";
import { cases } from "@/content/cases";
import "@/styles/home.css";
import "@/styles/practice.css";
import "@/styles/work.css";

export const metadata: Metadata = {
  title: "Work",
  description: "Engagements across turnaround, refinancing and M&A, value creation, interim leadership and operational AI for middle-market companies and their lenders.",
};

/** The record: engagements, anonymised, filterable by practice. */
export default function WorkPage() {
  return (
    <>
      <Nav current="work" />
      <section className="wopen wrap" id="top">
        <div className="pkick">The record</div>
        <h1 className="wh1"><span className="ln">Engagements across the middle market,</span><span className="ln">described the way we describe them to lenders.</span></h1>
        <p className="wsub">The situation, what we did and what happened, as they were. {cases.length} engagements shown; more on request.</p>
      </section>
      <main className="doc">
        <section className="d wrap wall" aria-label="Companies served">
          <div className="pkick">Companies served</div>
          <ul className="marks">
            {cases.filter((c) => !c.anonymous).map((c) => (<li key={c.slug}><a href={`#${c.slug}`}><Mark c={c} size="l" /></a></li>))}
          </ul>
        </section>
        <section className="d wrap wsec">
          <WorkList />
        </section>
        <section className="d wrap pcontact" id="contact">
          <div className="pcbg" aria-hidden="true"><img src="/film/dusk.jpg" alt="" loading="lazy" decoding="async" /><div className="wash" /></div>
          <div className="contact">
            <div>
              <p className="big rv">If the situation is urgent, the first conversation is today.</p>
              <div className="lines rv"><b><a href="tel:+14048803381">+1 (404) 880-3381</a></b><span>contact@acg-domain.com</span></div>
            </div>
            <form className="rv" id="form"><input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
              <div className="f"><label htmlFor="name">Name</label><input id="name" name="name" type="text" autoComplete="name" /></div>
              <div className="f"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" /></div>
              <div className="f"><label htmlFor="sit">The situation, in a line</label><textarea id="sit" name="situation"></textarea></div>
              <button className="go mag" type="submit">Send <i><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M1 6h10M7 2l4 4-4 4" /></svg></i></button>
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
