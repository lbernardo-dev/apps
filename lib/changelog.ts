import type { AppChangelogEntry } from "@/lib/types";

/**
 * Dynamic "What's new" layer. The iOS apps and this website share the same
 * source of truth (Supabase `app_changelog`), readable anonymously via REST.
 * The static export ships build-time entries from the App Store snapshot and
 * then refreshes them live from Supabase whenever the table has newer data.
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

function normalize(row: Record<string, unknown>): AppChangelogEntry | null {
  if (!row || !row.version) return null;
  return {
    version: String(row.version),
    releaseNotes: String(row.release_notes ?? ""),
    releaseNotesEn: row.release_notes_en ? String(row.release_notes_en) : undefined,
    releaseDate: row.release_date ? String(row.release_date) : undefined,
    translated: Boolean(row.release_notes_en)
  };
}

/**
 * Live fetch from Supabase. Uses the anonymous key already present in the
 * browser; returns [] when not configured so the snapshot fallback is used.
 */
export async function fetchChangelogLive(appSlug: string): Promise<AppChangelogEntry[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return [];

  try {
    const endpoint = `${url}/rest/v1/app_changelog?app_slug=eq.${encodeURIComponent(appSlug)}&select=version,release_notes,release_notes_en,release_date&order=version.desc&limit=12`;
    const res = await fetch(endpoint, {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`
      }
    });
    if (!res.ok) return [];
    const rows = (await res.json()) as Record<string, unknown>[];
    return (rows || []).map(normalize).filter((e): e is AppChangelogEntry => Boolean(e));
  } catch {
    return [];
  }
}