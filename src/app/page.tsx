import Lockup from "@/components/Lockup";
import HomeScript from "@/components/HomeScript";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "@/styles/home.css";

export default function Home() {
  return (
    <>


<Nav />

<div className="opener" id="top">
  <div className="film" id="film" style={{ backgroundImage: "url(/film/home-desktop-poster.jpg)" }}>
    <video id="vid" muted playsInline preload="auto" poster="/film/home-desktop-poster.jpg" aria-hidden="true"></video>
    <video id="loopOpen" className="loop" src="/film/loop-open.mp4" muted playsInline loop preload="auto" aria-hidden="true"></video>
    <video id="loopWater" className="loop" src="/film/loop-water.mp4" muted playsInline loop preload="auto" aria-hidden="true"></video>
    <div className="loader" id="loader">Loading</div>
  </div>
  <div className="stops">
    <section className="stop wrap">
      <div className="open">
        <h1 className="kick">American Change &amp; Grow</h1>
        <p className="line"><span className="ln">A senior-led turnaround</span><span className="ln">and restructuring firm.</span></p>
      </div>
      <div className="scroll-hint">Scroll down to discover</div>
    </section>
    <section className="stop wrap">
      <div className="block right">
        <h2 className="hl"><span className="ln">Senior operators</span><span className="ln">for companies</span><span className="ln">under pressure.</span></h2>
      </div>
    </section>
    <section className="stop wrap">
      <div className="block">
        <h2 className="hl"><span className="ln">Turnaround, restructuring,</span><span className="ln">refinancing and interim leadership</span><span className="ln">for the middle market.</span></h2>
        <div className="arrive">
          <span className="tel">+1 (000) 000-0000</span>
          <a className="go mag" href="#contact">Discuss a situation <i><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M1 6h10M7 2l4 4-4 4"/></svg></i></a>
        </div>
      </div>
    </section>
  </div>
</div>

<div className="peek" id="peek" aria-hidden="true"><img id="peekimg" alt="" /><span className="cap" id="peekcap"></span></div>
<div className="cur" id="cur" aria-hidden="true"></div>
<main className="doc">
  <section className="d wrap">
    <div className="grid">
      <div className="label">Who we are</div>
      <div>
        <p className="statement rv">We are the people a lender, a board or a sponsor calls when a business is in trouble and the plan has to work the <em>first</em> time.</p>
        <p className="lead rv">American Change &amp; Grow is a senior-led advisory firm. The partner you meet on the first call runs the engagement, sits in the room with your lenders, and stays until the company is stable. No bench, no hand-off, no second team.</p>
      </div>
    </div>
  </section>

  <section className="d wrap" id="situations">
    <div className="topo" id="topo" aria-hidden="true"><canvas id="topoCanvas"></canvas></div>
    <div className="grid">
      <div className="label">Situations</div>
      <div>
        <h2 className="sec rv">We are usually called in one of five moments.</h2>
        <ul className="sit rv mt48">
          <li data-src="/film/turnaround-hero-peek.jpg" data-pos="50% 45%" data-cap="The light beginning to break"><a href="/turnaround"><span className="n">01</span><span className="t">Turnaround &amp; Restructuring</span><p className="w">Liquidity is tightening and the 13-week forecast is no longer a formality. We stabilize cash, rebuild the plan, and give management and lenders one set of numbers.</p><span className="arr"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M1 6h10M7 2l4 4-4 4"/></svg></span></a></li>
          <li data-src="/film/transactions-hero-peek.jpg" data-pos="50% 50%" data-cap="Two rivers meeting"><a href="/transactions"><span className="n">02</span><span className="t">Refinancing &amp; M&amp;A</span><p className="w">A facility is maturing, a covenant has tripped, or a sale is the right outcome. We run the process and negotiate terms the business can live with.</p><span className="arr"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M1 6h10M7 2l4 4-4 4"/></svg></span></a></li>
          <li data-src="/film/value-hero-peek.jpg" data-pos="50% 50%" data-cap="The valley in full sun"><a href="/value-creation"><span className="n">03</span><span className="t">Value Creation</span><p className="w">The business is sound but the margin isn't. We find the operating improvements that are already there and put them into the P&amp;L inside two quarters.</p><span className="arr"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M1 6h10M7 2l4 4-4 4"/></svg></span></a></li>
          <li data-src="/film/interim-hero-peek.jpg" data-pos="45% 50%" data-cap="The one lit house"><a href="/interim-leadership"><span className="n">04</span><span className="t">Interim Management</span><p className="w">The seat needs an operator now. We step in as interim CRO, CFO or COO with authority to act, and hand back a business in better order.</p><span className="arr"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M1 6h10M7 2l4 4-4 4"/></svg></span></a></li>
          <li data-src="/film/ai-hero-peek.jpg" data-pos="50% 40%" data-cap="The river under stars"><a href="/operational-ai"><span className="n">05</span><span className="t">Operational AI</span><p className="w">Agents built into the finance, operations and reporting work of the companies we run, so a lean team sees further and moves faster.</p><span className="arr"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M1 6h10M7 2l4 4-4 4"/></svg></span></a></li>
        </ul>
      </div>
    </div>
  </section>

  <section className="d wrap paper" id="people">
    <div className="grid">
      <div className="label">People</div>
      <div>
        <h2 className="sec rv">The partner on the first call is the partner in the room.</h2>
        <div className="people rv mt56">
          <div className="person"><div className="ph"></div><h3>Baker Smith</h3><div className="r">Founder &amp; Managing Partner</div><p>Twenty-plus years leading turnarounds and restructurings for middle-market companies and their lenders. Bio to come from Baker.</p></div>
          <div className="person"><div className="ph"></div><h3>Partner name</h3><div className="r">Partner, Transactions</div><p>Bio to come. 150–250 words, written for a lender reading at eleven at night.</p></div>
          <div className="person"><div className="ph"></div><h3>Partner name</h3><div className="r">Partner, Operations</div><p>Bio to come. Headshots treated consistently across the three.</p></div>
        </div>
      </div>
    </div>
  </section>

  <section className="d wrap" id="proof">
    <div className="grid">
      <div className="label">Record</div>
      <div>
        <div className="figs rv">
          <div className="fig"><div className="n">20+</div><div className="l">Years leading turnarounds</div></div>
          <div className="fig"><div className="n">60</div><div className="l">Engagements across the middle market</div></div>
          <div className="fig"><div className="n">$1.2B</div><div className="l">Debt restructured or refinanced</div></div>
        </div>
        <div className="case rv">
          <div className="ctx">Recent engagement · Distribution · $45M revenue · PE-backed</div>
          <dl>
            <div className="row"><dt>Situation</dt><dd>Covenant default after two quarters of margin erosion. Lender had lost confidence in the forecast; sponsor was weighing whether to fund.</dd></div>
            <div className="row"><dt>Action</dt><dd>Rebuilt the 13-week cash forecast in ten days, renegotiated the facility with a 90-day standstill, took the interim CFO seat and reset pricing on the bottom third of accounts.</dd></div>
            <div className="row"><dt>Outcome</dt><dd>Positive cash in week seven. Facility amended and extended at month four. Sponsor funded the plan; management retained.</dd></div>
          </dl>
        </div>
        <p className="note rv mt20">Figures and case are illustrative placeholders until Baker supplies the firm's record.</p>
      </div>
    </div>
  </section>

  <section className="d wrap" id="how">
    <div className="grid">
      <div className="label">How we work</div>
      <div>
        <h2 className="sec rv">Calling us starts four things.</h2>
        <ol className="steps rv mt48">
          <li><div><h4>A conversation this week</h4><p>With a partner, not a business development team. We tell you plainly whether we're the right call.</p></div></li>
          <li><div><h4>A first read in days</h4><p>Cash, lenders, the three decisions that can't wait. Written so the board and the bank can read the same page.</p></div></li>
          <li><div><h4>A plan with a clock on it</h4><p>Weeks, not quarters. Who does what by when, and what we'll report every Friday.</p></div></li>
          <li><div><h4>A partner in the seat</h4><p>Through the plan, in the room, until the company is stable and the tooling is handed back.</p></div></li>
        </ol>
      </div>
    </div>
  </section>

  <section className="d wrap" id="contact">
    <div className="river" id="river" aria-hidden="true"><img id="riverImg" src="/film/dusk.jpg" alt="" loading="lazy" decoding="async" /><div className="wash"></div><div className="lamp" id="lamp"></div></div>
    <div className="contact">
      <div>
        <p className="big rv">If the situation is urgent, the first conversation is today.</p>
        <div className="lines rv">
          <b>+1 (000) 000-0000</b>
          <span>contact@acg-domain.com</span>
          <span>Address to come<br />United States</span>
        </div>
      </div>
      <form className="rv" id="form"><input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
        <div className="f"><label htmlFor="name">Name</label><input id="name" name="name" type="text" autoComplete="name" /></div>
        <div className="f"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" /></div>
        <div className="f"><label htmlFor="sit">The situation, in a line</label><textarea id="sit" name="situation"></textarea></div>
        <button className="go mag" type="submit">Send <i><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M1 6h10M7 2l4 4-4 4"/></svg></i></button>
        <p className="note" id="formnote">A partner replies within one business day.</p>
      </form>
    </div>
  </section>

  <Footer />
</main>


      <HomeScript />
    </>
  );
}
