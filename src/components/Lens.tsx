"use client";
import { useEffect, useState } from "react";
import { lenses, type LensKey } from "@/content/lens";

const keys = Object.keys(lenses) as LensKey[];

/**
 * "Reading as": one line under the opening. Pick who you are and the statement, the order of the five
 * situations and the contact line re-address themselves. Remembered for the session.
 */
export default function Lens() {
  const [lens, setLens] = useState<LensKey | null>(null);
  useEffect(() => { try { const k = sessionStorage.getItem("acg-lens") as LensKey | null; if (k && lenses[k]) apply(k); } catch {} }, []);
  function apply(k: LensKey | null) {
    setLens(k);
    try { if (k) sessionStorage.setItem("acg-lens", k); else sessionStorage.removeItem("acg-lens"); } catch {}
    document.documentElement.setAttribute("data-lens", k || "");
    const L = k ? lenses[k] : null;
    // statement + contact line: fade, swap, fade back
    const swap = (sel: string, text: string | null) => {
      const el = document.querySelector<HTMLElement>(sel); if (!el) return;
      const def = el.getAttribute("data-default") ?? (el.setAttribute("data-default", el.innerHTML), el.innerHTML);
      el.classList.add("swapping");
      setTimeout(() => { if (text) { el.textContent = text; el.classList.add("on"); } else el.innerHTML = def; el.classList.remove("swapping"); window.dispatchEvent(new Event("acg:lens")); }, 260);
    };
    swap(".statement", L ? L.statement : null);
    swap("#contact .big", L ? L.contact : null);
    swap(".lens-sub", L ? L.sub : null);
    // situations: reorder the five rows
    const ul = document.querySelector(".sit"); if (ul) {
      const items = Array.from(ul.children) as HTMLElement[];
      const by = (slug: string) => items.find((li) => li.querySelector("a")?.getAttribute("href") === `/${slug}`);
      const order = L ? L.order : ["turnaround", "transactions", "value-creation", "interim-leadership", "operational-ai"];
      ul.classList.add("reordering");
      setTimeout(() => { order.forEach((slug) => { const li = by(slug); if (li) ul.appendChild(li); }); ul.classList.remove("reordering"); }, 260);
    }
  }
  return (
    <div className="lens" role="group" aria-label="Reading as">
      <span className="lens-k">Reading as</span>
      {keys.map((k) => (
        <button key={k} type="button" className={lens === k ? "on" : ""} aria-pressed={lens === k} onClick={() => apply(lens === k ? null : k)}>{lenses[k].label}</button>
      ))}
    </div>
  );
}
