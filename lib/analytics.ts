"use client";

import { logFirebaseEvent } from "@/lib/firebase";
import { getSupabaseBrowserClient } from "@/lib/supabase";

export function trackEvent(name: string, props?: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    const safeKeys = new Set(["app", "locale", "method", "kind", "rating", "source", "placement", "cta", "section"]);
    const safeProps = Object.fromEntries(Object.entries(props ?? {}).filter(([key]) => safeKeys.has(key)));

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

    // 3. Firebase Analytics custom events
    void logFirebaseEvent(name, props);

    // 4. First-party aggregate analytics for the admin dashboard. We only
    // persist allow-listed fields; contact contents and emails never enter it.
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      void supabase.from("landing_events").insert({
        event_name: name.slice(0, 80),
        app_slug: typeof safeProps.app === "string" ? safeProps.app : null,
        locale: typeof safeProps.locale === "string" ? safeProps.locale : document.documentElement.lang?.slice(0, 2) || null,
        path: window.location.pathname,
        metadata: safeProps,
      });
    }

    // Logging in local development
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics Event]: "${name}"`, props);
    }
  }
}
