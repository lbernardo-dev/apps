import type { AppChangelogEntry, AppChangelogLocalization } from "@/lib/types";

/**
 * Shared What's New reader. Supabase is the source of truth at runtime and
 * the checked-in App Store snapshot keeps static builds useful offline.
 */

const SNAPSHOT_ANY = "__changelog";

export type ChangelogPayload = {
  [appSlug: string]: { entries?: AppChangelogEntry[] };
};

export function changelogFromSnapshot(
  snapshot: Record<string, unknown>,
  appSlug: string
): AppChangelogEntry[] {
  const raw = (snapshot as Record<string, unknown>)?.[SNAPSHOT_ANY];
  if (!raw || typeof raw !== "object") return [];
  const entry = (raw as ChangelogPayload)?.[appSlug];
  return Array.isArray(entry?.entries) ? entry.entries : [];
}

function formatOf(value: unknown): "plain" | "markdown" {
  return value === "plain" ? "plain" : "markdown";
}

function asLocalization(row: Record<string, unknown>): AppChangelogLocalization | null {
  if (!row?.locale) return null;
  return {
    locale: String(row.locale),
    releaseNotes: String(row.release_notes ?? ""),
    releaseNotesFormat: formatOf(row.release_notes_format),
    translated: Boolean(row.translated),
    provider: row.provider ? String(row.provider) : undefined,
    translatedAt: row.translated_at ? String(row.translated_at) : undefined
  };
}

function normalize(
  row: Record<string, unknown>,
  localizationRows: Record<string, unknown>[] = []
): AppChangelogEntry | null {
  if (!row || !row.version) return null;

  const localizations: Record<string, AppChangelogLocalization> = {};
  for (const localizationRow of localizationRows) {
    const localization = asLocalization(localizationRow);
    if (localization) localizations[localization.locale] = localization;
  }

  const releaseNotesEn = localizations.en?.releaseNotes || (row.release_notes_en ? String(row.release_notes_en) : undefined);
  return {
    id: row.id ? String(row.id) : undefined,
    appSlug: row.app_slug ? String(row.app_slug) : undefined,
    version: String(row.version),
    buildNumber: row.build_number ? String(row.build_number) : undefined,
    releaseNotes: String(row.release_notes ?? ""),
    releaseNotesEn,
    releaseNotesFormat: formatOf(row.release_notes_format),
    localizations: Object.keys(localizations).length ? localizations : undefined,
    releaseDate: row.release_date ? String(row.release_date) : undefined,
    isCurrent: Boolean(row.is_current),
    source: row.source ? String(row.source) : undefined,
    sourceUrl: row.source_url ? String(row.source_url) : undefined,
    translated: Boolean(releaseNotesEn),
    detectedAt: row.detected_at ? String(row.detected_at) : undefined
  };
}

export function changelogFromRows(
  rows: Record<string, unknown>[],
  localizationRows: Record<string, unknown>[] = []
): AppChangelogEntry[] {
  const localizationsByVersion = new Map<string, Record<string, unknown>[]>();
  for (const row of localizationRows) {
    const version = String(row.version ?? "");
    if (!version) continue;
    localizationsByVersion.set(version, [...(localizationsByVersion.get(version) ?? []), row]);
  }

  return (rows ?? [])
    .map((row) => normalize(row, localizationsByVersion.get(String(row.version ?? "")) ?? []))
    .filter((entry): entry is AppChangelogEntry => Boolean(entry));
}

function localeCandidates(locale: string): string[] {
  const normalized = locale.replace("_", "-");
  const base = normalized.split("-")[0];
  return Array.from(new Set([normalized, base, "en", "es"]));
}

export function changelogTextForLocale(
  entry: AppChangelogEntry,
  locale: string
): { text: string; locale: string; fallback: boolean } {
  const localizations = entry.localizations ?? {};
  for (const candidate of localeCandidates(locale)) {
    const localized = localizations[candidate];
    if (localized?.releaseNotes?.trim()) {
      return {
        text: localized.releaseNotes,
        locale: candidate,
        fallback: candidate !== locale && candidate !== locale.split("-")[0]
      };
    }
    if (candidate === "en" && entry.releaseNotesEn?.trim()) {
      return { text: entry.releaseNotesEn, locale: "en", fallback: locale !== "en" };
    }
    if (candidate === "es" && entry.releaseNotes?.trim()) {
      return { text: entry.releaseNotes, locale: "es", fallback: locale !== "es" };
    }
  }
  return { text: entry.releaseNotes, locale: "es", fallback: locale !== "es" };
}

export function supportedChangelogLocales(supportedLocales?: string[]): string[] {
  return Array.from(new Set((supportedLocales?.length ? supportedLocales : ["es", "en"]).map((locale) => locale.replace("_", "-"))));
}

/**
 * Live fetch from Supabase. The two REST calls are deliberately separate so
 * this remains compatible with projects that do not expose nested relations.
 */
export async function fetchChangelogLive(appSlug: string): Promise<AppChangelogEntry[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return [];

  try {
    const headers = {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`
    };
    const base = `${url}/rest/v1`;
    const [changelogResponse, localizationsResponse] = await Promise.all([
      fetch(`${base}/app_changelog?app_slug=eq.${encodeURIComponent(appSlug)}&select=id,app_slug,version,build_number,release_notes,release_notes_en,release_notes_format,release_date,is_current,source,source_url,detected_at&order=release_date.desc.nullslast,version.desc&limit=12`, { headers, cache: "no-store" }),
      fetch(`${base}/app_changelog_localizations?app_slug=eq.${encodeURIComponent(appSlug)}&select=version,locale,release_notes,release_notes_format,translated,provider,translated_at&order=version.desc&limit=100`, { headers, cache: "no-store" })
    ]);
    if (!changelogResponse.ok) return [];
    const rows = (await changelogResponse.json()) as Record<string, unknown>[];
    const localizationRows = localizationsResponse.ok
      ? ((await localizationsResponse.json()) as Record<string, unknown>[])
      : [];
    return changelogFromRows(rows || [], localizationRows || []);
  } catch {
    return [];
  }
}
