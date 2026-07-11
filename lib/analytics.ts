"use client";

export function trackEvent(name: string, props?: Record<string, any>) {
  if (typeof window !== "undefined") {
    // 1. Plausible custom events
    const plausible = (window as any).plausible;
    if (typeof plausible === "function") {
      plausible(name, { props });
    }

    // 2. Umami custom events
    const umami = (window as any).umami;
    if (umami && typeof umami.track === "function") {
      umami.track(name, props);
    }

    // Logging in local development
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics Event]: "${name}"`, props);
    }
  }
}
