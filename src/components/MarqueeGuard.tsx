"use client";
import { useEffect } from "react";

/** On phones: if the 3D drum didn't lay out (no face has a visible box), show the flat strip instead. */
export default function MarqueeGuard() {
  useEffect(() => {
    const check = () => {
      document.querySelectorAll<HTMLElement>(".wheel").forEach((w) => {
        if (getComputedStyle(w).display === "none") return;
        const ok = Array.from(w.querySelectorAll("li")).some((li) => { const r = li.getBoundingClientRect(); return r.width > 10 && r.height > 10 && r.right > 0 && r.left < window.innerWidth; });
        if (!ok) { w.style.display = "none"; const mq = w.previousElementSibling as HTMLElement | null; if (mq && mq.classList.contains("mq")) mq.style.display = "block"; }
      });
    };
    const t = setTimeout(check, 600);
    return () => clearTimeout(t);
  }, []);
  return null;
}
