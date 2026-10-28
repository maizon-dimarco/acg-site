"use client";
import { useState } from "react";
import { cases, practiceNames, type Case } from "@/content/cases";

const order: Case["practice"][] = ["turnaround", "transactions", "value-creation", "interim-leadership", "operational-ai"];

/** The engagements, filterable by practice. Each case opens inline. */
export default function WorkList() {
  const [filter, setFilter] = useState<Case["practice"] | "all">("all");
  const [open, setOpen] = useState<string | null>(cases[0].slug);
  const list = filter === "all" ? cases : cases.filter((c) => c.practice === filter);
  return (
    <>
      <div className="wfilter" role="tablist" aria-label="Filter by practice">
        <button type="button" role="tab" aria-selected={filter === "all"} className={filter === "all" ? "on" : ""} onClick={() => setFilter("all")}>All <span>{cases.length}</span></button>
        {order.map((p) => (
          <button key={p} type="button" role="tab" aria-selected={filter === p} className={filter === p ? "on" : ""} onClick={() => setFilter(p)}>
            {practiceNames[p]} <span>{cases.filter((c) => c.practice === p).length}</span>
          </button>
        ))}
      </div>
      <ol className="wlist">
        {list.map((c, i) => {
          const isOpen = open === c.slug;
          return (
            <li key={c.slug} className={isOpen ? "is-open" : ""}>
              <button type="button" className="whead" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : c.slug)}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <span className="wmeta"><span className="sector">{c.sector}</span><span className="ctx">{c.size} · {c.context} · {practiceNames[c.practice]}</span></span>
                <span className="wtitle">{c.title}</span>
                <span className="wplus" aria-hidden="true" />
              </button>
              <div className="wbody">
                <div className="wbody-in">
                  <dl>
                    <div className="row"><dt>Situation</dt><dd>{c.situation}</dd></div>
                    <div className="row"><dt>Action</dt><dd>{c.action}</dd></div>
                    <div className="row"><dt>Outcome</dt><dd>{c.outcome}</dd></div>
                  </dl>
                  <div className="wfigs">
                    {c.figures.map((f) => (<div className="fig on" key={f.l}><div className="n">{f.n}</div><div className="l">{f.l}</div></div>))}
                    <div className="fig on"><div className="n small">{c.duration}</div><div className="l">Engagement length</div></div>
                  </div>
                  <a className="wlink" href={`/${c.practice}`}>About {practiceNames[c.practice]} <i><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M1 6h10M7 2l4 4-4 4" /></svg></i></a>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
