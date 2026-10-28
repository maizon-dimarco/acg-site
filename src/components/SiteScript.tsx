"use client";
import { useEffect } from "react";
import { run } from "@/lib/site-behaviour";

/** Mounts the shared inner-page behaviour once per page load. */
export default function SiteScript() {
  useEffect(() => {
    const w = window as unknown as { __acgSite?: boolean };
    if (w.__acgSite) return;
    w.__acgSite = true;
    run();
  }, []);
  return null;
}
