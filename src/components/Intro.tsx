"use client";
import { useEffect, useState } from "react";

/**
 * First-visit opening: a navy curtain, the mark wiped in left to right, a beat, then the curtain lifts
 * onto the film. Once per session; skipped on reload, on reduced motion, and when arriving via a
 * page transition (the hero is already on screen).
 */
export default function Intro() {
  const [state, setState] = useState<"off" | "on" | "lift">("off");
  useEffect(() => {
    try {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      const reload = nav && nav.type === "reload";
      const fromSite = document.referrer && new URL(document.referrer).origin === location.origin;
      if (reduced || reload || fromSite || sessionStorage.getItem("acg-intro")) return;
      sessionStorage.setItem("acg-intro", "1");
    } catch { return; }
    setState("on");
    document.documentElement.classList.add("intro-open");
    const t1 = setTimeout(() => setState("lift"), 1900);
    const t2 = setTimeout(() => { setState("off"); document.documentElement.classList.remove("intro-open"); }, 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); document.documentElement.classList.remove("intro-open"); };
  }, []);
  if (state === "off") return null;
  return (
    <div className={`intro ${state}`} aria-hidden="true">
      <div className="intro-mark"><img src="/brand/acg-logo-reversed-transparent.svg" alt="" /></div>
    </div>
  );
}
