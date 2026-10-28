"use client";
import { useEffect } from "react";
import { run } from "@/lib/home-behaviour";

/**
 * Behaviour for the home page: film scrub, idle loops, adaptive ink, nav state, the dynamic
 * document layer, the contour field and the contact ending. Ported from the approved prototype
 * as one effect; it runs once per page load and guards against React's double-invoke in dev.
 */
export default function HomeScript() {
  useEffect(() => {
    const w = window as unknown as { __acgHome?: boolean };
    if (w.__acgHome) return;
    w.__acgHome = true;
    run();
  }, []);
  return null;
}

