import type { CSSProperties } from "react";
import type { AppItem } from "@/lib/types";

export type Locale = "es" | "en";

type ShotMap = Record<string, (locale: Locale) => string>;

// Product screenshots kept in AppItem.screenshots are semantic keys. Each
// product family defines its own layout/folder and file naming convention.
// This module is the single source of truth mapping a product + screenshot
// key to a concrete asset path. Components notify the consumer; new products
// only need data here (or in content.ts) to render images everywhere.

const VITALSPATH_SHOTS: ShotMap = {
  "Día actual": (l) => `assets/images/vitalspath/screens/01_today_timeline_${l}.png`,
  Medicación: (l) => `assets/images/vitalspath/screens/02_medication_detail_${l}.png`,
  Tratamiento: (l) => `assets/images/vitalspath/screens/03_treatment_detail_${l}.png`,
  Perfiles: (l) => `assets/images/vitalspath/screens/04_family_profiles_${l}.png`,
  Condiciones: (l) => `assets/images/vitalspath/screens/05_condition_detail_${l}.png`,
  Bienestar: (l) => `assets/images/vitalspath/screens/06_vitals_dashboard_${l}.png`,
  Citas: (l) => `assets/images/vitalspath/screens/07_appointments_tasks_${l}.png`,
  Privacidad: (l) => `assets/images/vitalspath/screens/08_privacy_control_${l}.png`,
  Insights: (l) => `assets/images/vitalspath/screens/09_wellness_insights_${l}.png`,
  Widgets: (l) => `assets/images/vitalspath/screens/10_watch_widgets_alerts_${l}.png`
};

const UP_LEDGER_SHOTS: ShotMap = {
  Home: (l) => `assets/images/upledger/upledger-home_${l}.png`
};

const SIMULATOR_SLUGS = new Set(["reps", "shield"]);

function isHttpPath(value: string) {
  return /^https?:\/\//i.test(value);
}

/**
 * Resolves a single product screenshot key to an asset path.
 * Returns `undefined` when the product/screenshot cannot be resolved.
 */
export function getAppShotPath(
  slug: string,
  shot: string | undefined,
  locale: Locale
): string | undefined {
  if (!shot) return undefined;
  if (isHttpPath(shot)) return shot;
  if (slug === "vitalspath") {
    const builder = VITALSPATH_SHOTS[shot];
    return builder ? builder(locale) : undefined;
  }
  if (slug === "upledger") {
    const builder = UP_LEDGER_SHOTS[shot];
    return builder ? builder(locale) : undefined;
  }
  if (SIMULATOR_SLUGS.has(slug)) {
    return `assets/images/${slug}/screens/simulator/${shot}_${locale}.jpg`;
  }
  // Unknown product: use the shot verbatim if it already looks like a file,
  // otherwise apply the standard "screens/{key}_{locale}" convention.
  if (/\.(png|jpe?g|svg|PNG)$/.test(shot)) return shot;
  return `assets/images/${slug}/screens/${shot}_${locale}.jpg`;
}

/**
 * Preferred cover for a product card (AppCard). Prefers the explicit cover,
 * falls back to the first resolvable screenshot.
 */
export function getAppCover(app: Pick<AppItem, "slug" | "coverImageUrl" | "screenshots">, locale: Locale): string | undefined {
  if (app.coverImageUrl) return app.coverImageUrl;
  const first = app.screenshots?.[0];
  if (!first) return undefined;
  return getAppShotPath(app.slug, first, locale);
}

/**
 * Up to `count` resolvable screenshots (used by cascades). If the product has
 * a cover but no screenshots, returns the cover so the card is never empty.
 */
export function getAppScreens(
  app: Pick<AppItem, "slug" | "coverImageUrl" | "screenshots">,
  locale: Locale,
  count = 3
): string[] {
  const shots = (app.screenshots ?? [])
    .map((s) => getAppShotPath(app.slug, s, locale))
    .filter((p): p is string => Boolean(p))
    .slice(0, count);
  if (shots.length === 0) {
    const cover = getAppCover(app, locale);
    if (cover) shots.push(cover);
  }
  return shots;
}

/**
 * i18n key for a screenshot label. Products store both the screenshot key and
 * its localized label via dictionary entries (`screenshot.<slug>.<key>`).
 */
export function getScreenshotLabelKey(slug: string, shot: string): string {
  if (slug === "vitalspath") {
    return `screenshot.vitalspath.${shot.toLowerCase().replace(/\s+/g, "-")}`;
  }
  return `screenshot.${slug}.${shot}`;
}

/**
 * Converts a "#rgb" or parsed color int to an rgba() string.
 */
export function hexToRgba(hex: string | undefined, alpha: number): string {
  if (!hex) return `rgba(59, 130, 246, ${alpha})`;
  const value = hex.replace("#", "");
  if (value.length === 3) {
    const r = parseInt(value[0] + value[0], 16);
    const g = parseInt(value[1] + value[1], 16);
    const b = parseInt(value[2] + value[2], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Inline background style derived from a product's brand colors. Used by card
 * visual canvases so every product looks distinct without hardcoded gradients.
 */
export function getAppGradientStyle(
  app?: Pick<AppItem, "colorPrimary" | "colorSecondary">
): CSSProperties {
  const primary = hexToRgba(app?.colorPrimary, 0.16);
  const secondary = hexToRgba(app?.colorSecondary, 0.12);
  return {
    background: `linear-gradient(160deg, ${primary} 0%, #05070f 52%, ${secondary} 115%)`
  };
}