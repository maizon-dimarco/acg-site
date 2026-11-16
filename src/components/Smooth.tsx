"use client";
import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Inertia scrolling on pointer devices. Lenis drives the native scroll position, so everything that
 * reads window.scrollY (film scrubs, reveals, the nav) keeps working; it only changes how the page
 * gets there. Off for touch devices and for people who asked for reduced motion.
 */
export default function Smooth() {
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) return;
    const w = window as unknown as { __lenis?: Lenis };
    if (w.__lenis) return;
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true, anchors: true });
    w.__lenis = lenis;
    let raf = 0;
    const frame = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(frame); };
    raf = requestAnimationFrame(frame);
    // the menu overlay locks scroll by class; keep Lenis in step with it
    const obs = new MutationObserver(() => { if (document.documentElement.classList.contains("menu-open")) lenis.stop(); else lenis.start(); });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { cancelAnimationFrame(raf); obs.disconnect(); lenis.destroy(); w.__lenis = undefined; };
  }, []);
  return null;
}
