import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const apps = [
  { key: "vitalspath", id: "6760143192", country: "es" },
  { key: "reps", id: "6775801149", country: "es" },
  { key: "shield", id: "6790398619", country: "es" }
];
const output = path.resolve("lib/generated/appstore-data.json");
const label = (value, fallback = "") => value?.label ?? fallback;

// Lazy import: only required when we actually push to Supabase.
const { createClient } = await import("@supabase/supabase-js");

// ---------------------------------------------------------------------------
// Optional AI translation of release notes into English. Set AI_API_KEY (and
// optionally AI_BASE_URL / AI_MODEL) to enable; without it the sync keeps the
// Spanish notes and marks the English copy as missing so the UI can fall back.
// ---------------------------------------------------------------------------
const AI_API_KEY = process.env.AI_API_KEY ?? process.env.OPENAI_API_KEY;
const AI_BASE_URL = process.env.AI_BASE_URL ?? "https://api.openai.com/v1";
const AI_MODEL = process.env.AI_MODEL ?? "gpt-4o-mini";

async function translateNotes(text) {
  if (!AI_API_KEY || !text) return null;
  const system = "You translate iOS App Store release notes. Return ONLY the translation with no preamble, quotes, or markdown.";
  const user = `Translate to English:\n\n${text}`;
  try {
    const res = await fetch(`${AI_BASE_URL.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AI_API_KEY}`
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user }
        ],
        temperature: 0.1,
        max_tokens: 600
      })
    });
    if (!res.ok) throw new Error(`AI translation: HTTP ${res.status}`);
    const data = await res.json();
    const content = data.choices?.[0]?.message?.content?.trim();
    return content || null;
  } catch (err) {
    console.error("No se pudo traducir las notas de versión con IA:", err.message);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Changelog accumulation: Apple's public API only exposes the latest version,
// so we persist history ourselves and append when a new version is detected.
// ---------------------------------------------------------------------------
function emptyChangelog() {
  return { entries: [] };
}

async function buildChangelog({ key, id, country }) {
  const [lookupResponse, reviewsResponse] = await Promise.all([
    fetch(`https://itunes.apple.com/lookup?id=${id}&country=${country}`),
    fetch(`https://itunes.apple.com/${country}/rss/customerreviews/page=1/id=${id}/sortby=mostrecent/json`)
  ]);
  if (!lookupResponse.ok) throw new Error(`Lookup ${id}: HTTP ${lookupResponse.status}`);
  const lookup = await lookupResponse.json();
  const item = lookup.results?.[0];
  if (!item) throw new Error(`Apple no devolvió la app ${id}`);

  let entries = [];
  if (reviewsResponse.ok) {
    const feed = await reviewsResponse.json();
    entries = Array.isArray(feed.feed?.entry) ? feed.feed.entry : [];
  }

  const snapshot = {
    appId: id,
    trackName: item.trackName,
    trackViewUrl: item.trackViewUrl?.replace(/\?uo=4$/, ""),
    version: item.version,
    releaseNotes: item.releaseNotes,
    currentVersionReleaseDate: item.currentVersionReleaseDate,
    minimumOsVersion: item.minimumOsVersion,
    formattedPrice: item.formattedPrice,
    developer: item.artistName,
    languages: item.languageCodesISO2A ?? [],
    fileSizeBytes: item.fileSizeBytes,
    averageUserRating: item.averageUserRating,
    userRatingCount: item.userRatingCount,
    syncedAt: new Date().toISOString(),
    reviews: entries.slice(0, 8).map((entry) => ({
      author: label(entry.author?.name, "Usuario de App Store"),
      rating: Number(label(entry["im:rating"], "0")),
      title: label(entry.title),
      content: label(entry.content),
      date: label(entry.updated).slice(0, 10)
    }))
  };

  return { snapshot, changelog: { latestVersion: item.version, notes: item.releaseNotes, date: (item.currentVersionReleaseDate ?? "").slice(0, 10) } };
}

async function syncApp({ key, id, country }, history, supabase) {
  const { snapshot, changelog } = await buildChangelog({ key, id, country });

  const prior = history[key] ?? emptyChangelog();
  const priorVersions = new Set((prior.entries ?? []).map((e) => e.version));
  const entries = prior.entries ?? [];

  // Only append when the latest version is genuinely new; otherwise keep history.
  if (!priorVersions.has(changelog.latestVersion)) {
    const notesEn = await translateNotes(changelog.notes);
    entries.push({
      version: changelog.latestVersion,
      releaseNotes: changelog.notes ?? "",
      releaseNotesEn: notesEn ?? "",
      releaseDate: changelog.date,
      translated: Boolean(notesEn),
      detectedAt: snapshot.syncedAt
    });
    // Keep only the 12 most recent versions.
    const sorted = entries.sort((a, b) => (a.version < b.version ? 1 : -1));
    history[key] = { entries: sorted.slice(0, 12) };
    console.log(`  ${key}: nueva versión ${changelog.latestVersion} registrada en el changelog${notesEn ? " (traducida con IA)" : ""}.`);
  } else {
    console.log(`  ${key}: sin versiones nuevas (${changelog.latestVersion}).`);
  }

  // Keep Supabase in sync so the native apps can read the same timeline via REST.
  if (supabase) {
    const current = history[key].entries.find((e) => e.version === changelog.latestVersion);
    await supabase
      .from("app_changelog")
      .upsert(
        {
          app_slug: key,
          version: current.version,
          release_notes: current.releaseNotes,
          release_notes_en: current.releaseNotesEn || "",
          release_date: current.releaseDate || null,
          is_current: true
        },
        { onConflict: "app_slug,version" }
      );
    // Clear the is_current flag from older versions of the same app.
    await supabase
      .from("app_changelog")
      .update({ is_current: false })
      .eq("app_slug", key)
      .neq("version", changelog.latestVersion);
  }

  return [key, snapshot];
}

const previous = JSON.parse(await readFile(output, "utf8").catch(() => "{}"));

// Optional Supabase upsert for the changelog (service role only; the anon key
// cannot write and would leave the REST timeline stale).
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;
let supabase = null;
if (SUPABASE_URL && SUPABASE_SERVICE_ROLE) {
  console.log("Supabase configurado: el changelog se publicará vía REST para las apps.");
  supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);
} else {
  console.warn("Sin SUPABASE_SERVICE_ROLE_KEY: el changelog solo se guardará en el snapshot local.");
}

try {
  const history = previous.__changelog ?? {};
  const entries = [];
  for (const app of apps) {
    const supabaseClient = supabase;
    const [key, snapshot] = await syncApp(app, history, supabaseClient);
    entries.push([key, snapshot]);
  }
  const data = Object.fromEntries(entries);
  data.__changelog = history;

  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`App Store sincronizado: ${entries.length} app(s).`);
} catch (error) {
  console.error("No se pudo sincronizar Apple; se conserva el snapshot anterior.", error);
  if (Object.keys(previous).length === 0) process.exitCode = 1;
}
