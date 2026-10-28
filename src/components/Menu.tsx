"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { practices } from "@/content/practices";

/** The Menu button and its full-screen overlay: the five practices, large, and the ways to reach the firm. */
export default function Menu({ current }: { current?: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.documentElement.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <>
      <button type="button" className="menubtn" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((v) => !v)}>
        {open ? "Close" : <>Menu {" "}· ·</>}
      </button>
      {mounted && createPortal(
      <div className={`menu ${open ? "is-open" : ""}`} id="menu" aria-hidden={!open}>
        <div className="menu-in wrap">
          <nav className="menu-list" aria-label="Practices">
            <a href="/" className={`menu-home ${!current ? "on" : ""}`}><span className="n">00</span><span className="t">Home</span></a>
            {practices.map((p, i) => (
              <a key={p.slug} href={`/${p.slug}`} className={p.slug === current ? "on" : ""} style={{ transitionDelay: `${80 + i * 50}ms` }}>
                <span className="n">{p.n}</span>
                <span className="t">{p.title}</span>
                <span className="c">{p.headline[0]} {p.headline[1]}</span>
              </a>
            ))}
            <a href="/work" className={current === "work" ? "on" : ""} style={{ transitionDelay: "340ms" }}>
              <span className="n">06</span>
              <span className="t">Work</span>
              <span className="c">The record: engagements across the middle market.</span>
            </a>
          </nav>
          <aside className="menu-side">
            <div className="label">Contact</div>
            <b>+1 (000) 000-0000</b>
            <span>contact@acg-domain.com</span>
            <span className="muted">Address to come<br />United States</span>
            <a className="go" href="/#contact" onClick={() => setOpen(false)}>Discuss a situation <i><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M1 6h10M7 2l4 4-4 4" /></svg></i></a>

          </aside>
        </div>
      </div>,
        document.body)}
    </>
  );
}
