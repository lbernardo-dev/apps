import dotenv from "dotenv";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

dotenv.config({ path: ".env.local" });
dotenv.config();

const apps = [
  { key: "vitalspath", id: "6760143192", country: "es", sourceLocale: "es", locales: ["es", "en"], knownBuild: "222202608291" },
  { key: "reps", id: "6775801149", country: "es", sourceLocale: "es", locales: ["es", "en"], knownBuild: "107202608261" },
  { key: "shield", id: "6790398619", country: "es", sourceLocale: "es", locales: ["es", "en"] },
  { key: "schoolsnap", id: "6805556628", country: "es", sourceLocale: "es", locales: ["es", "en"] },
  { key: "kinsera", id: "6805556421", country: "es", sourceLocale: "es", locales: ["es", "en"] },
  { key: "culmina", id: "6809165529", country: "es", sourceLocale: "es", locales: ["es", "en"] },
  { key: "vitalsbud", id: "6809153004", country: "es", sourceLocale: "es", locales: ["es", "en"] }
];

const APPLE_REVIEW_MARKETS = "ae ag ai al am ao ar at au az ba bb bd be bf bg bh bj bm bn bo br bs bt bw by bz ca cd cg ch ci cl cm cn co cr cv cy cz de dk dm do dz ec ee eg es fi fj fm fr ga gb gd gh gm gr gt gw gy hk hn hr hu id ie il in is it jm jo jp ke kg kh kn kr kw ky kz la lb lc li lk lr lt lu lv ly ma md mg mk ml mn mo mr ms mt mu mv mw mx my mz na ne ng ni nl no np nr nz om pa pe pg ph pk pl pt pw py qa ro rs ru rw sa sb sc se sg si sk sl sn sr st sv sz tc td th tj tm tn tr tt tw tz ua ug uk us uy uz vc ve vg vn vu ws xk ye za zm zw".split(" ");
const reviewMarkets = process.env.APP_STORE_REVIEW_MARKETS?.split(",").map((market) => market.trim().toLowerCase()).filter(Boolean) ?? APPLE_REVIEW_MARKETS;
const reviewMaxPages = Number(process.env.APP_STORE_REVIEW_PAGES ?? "10");

const output = path.resolve("lib/generated/appstore-data.json");
const label = (value, fallback = "") => value?.label ?? fallback;
const provider = (process.env.TRANSLATION_PROVIDER ?? "mymemory").toLowerCase();
const freeTranslationBaseUrl = process.env.LIBRETRANSLATE_URL?.replace(/\/$/, "");
const AI_API_KEY = process.env.AI_API_KEY ?? process.env.OPENAI_API_KEY;
const AI_BASE_URL = process.env.AI_BASE_URL ?? "https://api.openai.com/v1";
const AI_MODEL = process.env.AI_MODEL ?? "gpt-4o-mini";
const configuredTranslationTargets = process.env.TRANSLATION_TARGET_LOCALES
  ?.split(",")
  .map((locale) => locale.trim())
  .filter(Boolean);

const { createClient } = await import("@supabase/supabase-js");

function normalizeLocale(locale) {
  return String(locale || "").replace("_", "-").toLowerCase();
}

function languageCode(locale) {
  return normalizeLocale(locale).split("-")[0];
}

function toMarkdown(text) {
  return String(text ?? "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.replace(/^\s*[•·]\s*/, "- ").trimEnd())
    .join("\n")
    .trim();
}

function buildNumberFrom(item, fallback) {
  const explicit = item.bundleVersion ?? item.buildVersion ?? item.build_number ?? fallback;
  if (explicit) return String(explicit);
  const match = String(item.releaseNotes ?? "").match(/\bbuild(?:\s+number)?\s*[:#-]?\s*([0-9][\w.-]*)/i);
  return match?.[1] ?? null;
}

function emptyChangelog() {
  return { entries: [] };
}

async function fetchReviewPage(appId, market, page) {
  try {
    const response = await fetch(`https://itunes.apple.com/${market}/rss/customerreviews/page=${page}/id=${appId}/sortby=mostrecent/json`, {
      signal: AbortSignal.timeout(15000)
    });
    if (!response.ok) return [];
    const data = await response.json();
    const rawEntries = Array.isArray(data.feed?.entry) ? data.feed.entry : data.feed?.entry ? [data.feed.entry] : [];
    return rawEntries.map((entry) => {
      const content = label(entry.content);
      const externalId = label(entry.id, `${market}-${label(entry.author?.name, "user")}-${label(entry.updated, content)}`);
      return {
        externalId,
        author: label(entry.author?.name, "Usuario de App Store"),
        rating: Number(label(entry["im:rating"], "0")),
        title: label(entry.title),
        content,
        date: label(entry.updated).slice(0, 10),
        market,
        source: "app_store",
        sourceUrl: `https://apps.apple.com/${market}/app/id${appId}?see-all=reviews`
      };
    }).filter((review) => review.content);
  } catch {
    return [];
  }
}

async function fetchAllReviews(appId) {
  const reviews = [];
  for (let offset = 0; offset < reviewMarkets.length; offset += 8) {
    const batch = reviewMarkets.slice(offset, offset + 8);
    const firstPages = await Promise.all(batch.map((market) => fetchReviewPage(appId, market, 1)));
    for (let index = 0; index < firstPages.length; index += 1) {
      const firstPage = firstPages[index];
      reviews.push(...firstPage);
      if (firstPage.length >= 50 && reviewMaxPages > 1) {
        for (let page = 2; page <= reviewMaxPages; page += 1) {
          const nextPage = await fetchReviewPage(appId, batch[index], page);
          if (!nextPage.length) break;
          reviews.push(...nextPage);
          if (nextPage.length < 50) break;
        }
      }
    }
  }
  const unique = new Map();
  for (const review of reviews) unique.set(review.externalId, review);
  return Array.from(unique.values()).sort((a, b) => b.date.localeCompare(a.date));
}

function localizationMap(entry) {
  const legacy = {};
  for (const [locale, value] of Object.entries(entry.localizations ?? {})) {
    if (typeof value === "string") {
      legacy[normalizeLocale(locale)] = {
        locale: normalizeLocale(locale),
        releaseNotes: value,
        releaseNotesFormat: "markdown",
        translated: normalizeLocale(locale) !== "es",
        provider: "legacy"
      };
    } else if (value?.releaseNotes) {
      legacy[normalizeLocale(locale)] = {
        ...value,
        locale: normalizeLocale(locale)
      };
    }
  }
  if (!legacy.es && entry.releaseNotes) {
    legacy.es = {
      locale: "es",
      releaseNotes: toMarkdown(entry.releaseNotes),
      releaseNotesFormat: "markdown",
      translated: false,
      provider: "app_store"
    };
  }
  if (!legacy.en && entry.releaseNotesEn) {
    legacy.en = {
      locale: "en",
      releaseNotes: toMarkdown(entry.releaseNotesEn),
      releaseNotesFormat: "markdown",
      translated: true,
      provider: "legacy"
    };
  }
  return legacy;
}

function targetsForApp(app, sourceLocale) {
  const configured = configuredTranslationTargets ?? app.locales ?? [sourceLocale, "en"];
  return Array.from(new Set(configured.map(normalizeLocale).filter(Boolean)));
}

function inferSourceLocale(entry, configuredLocale) {
  if (normalizeLocale(configuredLocale) !== "es") return normalizeLocale(configuredLocale);
  const notes = String(entry.releaseNotes ?? "");
  return /\b(what(?:'|’)s new|new drug|workout|accessibility|thanks for training|smart redaction|high-performance|hold-to-peek)\b/i.test(notes)
    ? "en"
    : "es";
}

async function translateMyMemoryChunk(text, sourceLocale, targetLocale) {
  const url = new URL("https://api.mymemory.translated.net/get");
  url.searchParams.set("q", text);
  url.searchParams.set("langpair", `${languageCode(sourceLocale)}|${languageCode(targetLocale)}`);
  const response = await fetch(url, {
    headers: { "User-Agent": "WhatsNewSync/1.0 (+https://github.com/)" },
    signal: AbortSignal.timeout(20000)
  });
  if (!response.ok) throw new Error(`MyMemory HTTP ${response.status}`);
  const data = await response.json();
  if (data.responseStatus && Number(data.responseStatus) !== 200) {
    throw new Error(`MyMemory status ${data.responseStatus}`);
  }
  return String(data.responseData?.translatedText ?? "").trim() || null;
}

async function translateWithMyMemory(text, sourceLocale, targetLocale) {
  // MyMemory is free but rejects long query strings. Translate each release
  // note line in bounded chunks while preserving the Markdown structure.
  const translatedLines = [];
  for (const line of String(text).split("\n")) {
    if (!line.trim()) {
      translatedLines.push("");
      continue;
    }
    const prefix = line.match(/^(\s*(?:[-*•]\s+|#{1,3}\s+)?)/)?.[1] ?? "";
    const body = line.slice(prefix.length);
    const words = body.split(/\s+/);
    const chunks = [];
    let current = "";
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (current && candidate.length > 450) {
        chunks.push(current);
        current = word;
      } else {
        current = candidate;
      }
    }
    if (current) chunks.push(current);
    const translated = [];
    for (const chunk of chunks) {
      translated.push(await translateMyMemoryChunk(chunk, sourceLocale, targetLocale));
    }
    translatedLines.push(`${prefix}${translated.filter(Boolean).join(" ")}`);
  }
  return translatedLines.join("\n").trim() || null;
}

async function translateWithLibreTranslate(text, sourceLocale, targetLocale) {
  if (!freeTranslationBaseUrl) return null;
  const response = await fetch(`${freeTranslationBaseUrl}/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      source: languageCode(sourceLocale),
      target: languageCode(targetLocale),
      format: "text"
    }),
    signal: AbortSignal.timeout(20000)
  });
  if (!response.ok) throw new Error(`LibreTranslate HTTP ${response.status}`);
  const data = await response.json();
  return String(data.translatedText ?? "").trim() || null;
}

async function translateWithOpenAI(text, targetLocale) {
  if (!AI_API_KEY) return null;
  const response = await fetch(`${AI_BASE_URL.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_API_KEY}`
    },
    body: JSON.stringify({
      model: AI_MODEL,
      messages: [
        { role: "system", content: "You translate iOS App Store release notes. Return only the translation, preserving bullets and Markdown." },
        { role: "user", content: `Translate to ${targetLocale}:\n\n${text}` }
      ],
      temperature: 0.1,
      max_tokens: 800
    }),
    signal: AbortSignal.timeout(30000)
  });
  if (!response.ok) throw new Error(`AI translation HTTP ${response.status}`);
  const data = await response.json();
  return String(data.choices?.[0]?.message?.content ?? "").trim() || null;
}

async function translateOne(text, sourceLocale, targetLocale) {
  if (!text || normalizeLocale(sourceLocale) === normalizeLocale(targetLocale)) return text;
  if (provider === "none" || provider === "disabled") return null;
  if (provider === "libretranslate") return translateWithLibreTranslate(text, sourceLocale, targetLocale);
  if (provider === "openai") return translateWithOpenAI(text, targetLocale);
  if (provider === "mymemory") return translateWithMyMemory(text, sourceLocale, targetLocale);
  throw new Error(`Proveedor de traducción desconocido: ${provider}`);
}

async function ensureTranslations(entry, app) {
  const sourceLocale = inferSourceLocale(entry, app.sourceLocale ?? "es");
  const localizations = localizationMap(entry);
  const sourceNotes = toMarkdown(entry.releaseNotes ?? "");
  if (sourceNotes && !localizations[sourceLocale]) {
    localizations[sourceLocale] = {
      locale: sourceLocale,
      releaseNotes: sourceNotes,
      releaseNotesFormat: "markdown",
      translated: false,
      provider: "app_store"
    };
  }

  for (const targetLocale of targetsForApp(app, sourceLocale)) {
    if (targetLocale === sourceLocale || localizations[targetLocale]?.releaseNotes) continue;
    try {
      const translated = await translateOne(sourceNotes, sourceLocale, targetLocale);
      if (translated) {
        localizations[targetLocale] = {
          locale: targetLocale,
          releaseNotes: toMarkdown(translated),
          releaseNotesFormat: "markdown",
          translated: true,
          provider,
          translatedAt: new Date().toISOString()
        };
      }
    } catch (error) {
      console.warn(`    ${app.key}: no se pudo traducir a ${targetLocale} con ${provider}: ${error.message}`);
    }
  }

  const english = localizations.en?.releaseNotes ?? "";
  const targetLocales = targetsForApp(app, sourceLocale);
  const translatedCount = targetLocales.filter((locale) => Boolean(localizations[locale]?.releaseNotes)).length;
  const translationStatus = translatedCount === targetLocales.length ? "complete" : translatedCount > 0 ? "partial" : "pending";
  return {
    ...entry,
    releaseNotes: sourceNotes,
    releaseNotesEn: english,
    releaseNotesFormat: "markdown",
    localizations,
    translated: Boolean(english),
    translationStatus,
    translatedLocales: Object.keys(localizations).sort()
  };
}

async function buildChangelog({ id, country, knownBuild }) {
  const lookupResponse = await fetch(`https://itunes.apple.com/lookup?id=${id}&country=${country}`);
  if (!lookupResponse.ok) throw new Error(`Lookup ${id}: HTTP ${lookupResponse.status}`);
  const lookup = await lookupResponse.json();
  const item = lookup.results?.[0];
  if (!item) throw new Error(`Apple no devolvió la app ${id}`);

  const entries = await fetchAllReviews(id);

  const snapshot = {
    appId: id,
    trackName: item.trackName,
    trackViewUrl: item.trackViewUrl?.replace(/\?uo=4$/, ""),
    version: item.version,
    buildNumber: buildNumberFrom(item, knownBuild),
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
    reviews: entries
  };

  return {
    snapshot,
    changelog: {
      latestVersion: item.version,
      buildNumber: snapshot.buildNumber,
      notes: toMarkdown(item.releaseNotes),
      date: (item.currentVersionReleaseDate ?? "").slice(0, 10),
      sourceUrl: snapshot.trackViewUrl
    }
  };
}

async function persistChangelog(supabase, appKey, entries, latestVersion) {
  if (!supabase) return;
  for (const entry of entries) {
    const { data: row, error } = await supabase
      .from("app_changelog")
      .upsert(
        {
          app_slug: appKey,
          version: entry.version,
          build_number: entry.buildNumber ?? null,
          release_notes: entry.releaseNotes ?? "",
          release_notes_en: entry.releaseNotesEn ?? "",
          release_notes_format: entry.releaseNotesFormat ?? "markdown",
          release_date: entry.releaseDate || null,
          is_current: entry.version === latestVersion,
          source: "app_store",
          source_url: entry.sourceUrl ?? null,
          detected_at: entry.detectedAt ?? null,
          translated_locales: entry.translatedLocales ?? Object.keys(entry.localizations ?? {}).sort(),
          translation_status: entry.translationStatus ?? (entry.releaseNotesEn ? "complete" : "pending")
        },
        { onConflict: "app_slug,version" }
      )
      .select("id")
      .single();
    if (error) {
      console.warn(`  ${appKey}: no se pudo publicar v${entry.version} en app_changelog: ${error.message}`);
      continue;
    }

    const localizations = Object.values(entry.localizations ?? {}).filter((localization) => localization?.releaseNotes);
    if (localizations.length) {
      const { error: localizationError } = await supabase
        .from("app_changelog_localizations")
        .upsert(
          localizations.map((localization) => ({
            changelog_id: row.id,
            app_slug: appKey,
            version: entry.version,
            locale: localization.locale,
            release_notes: localization.releaseNotes,
            release_notes_format: localization.releaseNotesFormat ?? "markdown",
            translated: Boolean(localization.translated),
            provider: localization.provider ?? null,
            translated_at: localization.translatedAt ?? null
          })),
          { onConflict: "app_slug,version,locale" }
        );
      if (localizationError) console.warn(`  ${appKey}: no se pudieron publicar locales de v${entry.version}: ${localizationError.message}`);
    }
  }
}

async function syncApp(app, history, supabase) {
  let snapshot;
  let changelog;
  try {
    ({ snapshot, changelog } = await buildChangelog(app));
  } catch (error) {
    console.warn(`  ${app.key}: Apple todavía no expone una ficha pública; se conserva el estado del catálogo.`);
    return null;
  }

  const prior = history[app.key] ?? emptyChangelog();
  const entries = Array.isArray(prior.entries) ? prior.entries : [];
  const existing = entries.find((entry) => entry.version === changelog.latestVersion);
  let current = existing ?? {
    version: changelog.latestVersion,
    buildNumber: changelog.buildNumber,
    releaseNotes: changelog.notes ?? "",
    releaseDate: changelog.date,
    source: "app_store",
    sourceUrl: changelog.sourceUrl,
    detectedAt: snapshot.syncedAt
  };
  current = await ensureTranslations(current, app);
  current = {
    ...current,
    buildNumber: changelog.buildNumber ?? current.buildNumber,
    releaseNotes: changelog.notes ?? current.releaseNotes,
    releaseDate: changelog.date || current.releaseDate,
    source: "app_store",
    sourceUrl: changelog.sourceUrl,
    detectedAt: current.detectedAt ?? snapshot.syncedAt
  };

  if (!existing) {
    entries.push(current);
    console.log(`  ${app.key}: nueva versión ${changelog.latestVersion} registrada${current.releaseNotesEn ? " y traducida" : "; traducción pendiente"}.`);
  } else {
    const index = entries.findIndex((entry) => entry.version === current.version);
    entries[index] = current;
    console.log(`  ${app.key}: sin versiones nuevas (${changelog.latestVersion}); ficha y traducciones verificadas.`);
  }

  const enrichedEntries = [];
  for (const entry of entries) {
    const enriched = await ensureTranslations(entry, app);
    enrichedEntries.push({
      ...enriched,
      source: entry.source ?? "app_store",
      sourceUrl: entry.sourceUrl ?? changelog.sourceUrl,
      detectedAt: entry.detectedAt ?? snapshot.syncedAt
    });
  }

  const sorted = enrichedEntries
    .sort((a, b) => (a.releaseDate ?? "") < (b.releaseDate ?? "") ? 1 : -1)
    .slice(0, 12);
  history[app.key] = { entries: sorted };

  await persistChangelog(supabase, app.key, sorted, changelog.latestVersion);

  if (supabase) {
    const { error: snapshotError } = await supabase
      .from("app_store_snapshots")
      .upsert(
        {
          app_slug: app.key,
          app_store_id: snapshot.appId,
          track_name: snapshot.trackName,
          track_view_url: snapshot.trackViewUrl,
          version: snapshot.version,
          build_number: snapshot.buildNumber ?? null,
          release_notes: snapshot.releaseNotes ?? null,
          current_version_release_date: snapshot.currentVersionReleaseDate ?? null,
          minimum_os_version: snapshot.minimumOsVersion ?? null,
          formatted_price: snapshot.formattedPrice ?? null,
          developer: snapshot.developer ?? null,
          languages: snapshot.languages ?? [],
          file_size_bytes: snapshot.fileSizeBytes ?? null,
          average_rating: snapshot.averageUserRating ?? null,
          user_rating_count: snapshot.userRatingCount ?? 0,
          synced_at: snapshot.syncedAt
        },
        { onConflict: "app_slug" }
      );
    if (snapshotError) console.warn(`  ${app.key}: no se pudo actualizar app_store_snapshots: ${snapshotError.message}`);

    for (const review of snapshot.reviews ?? []) {
      await supabase
        .from("app_reviews")
        .upsert(
          {
            app_slug: app.key,
            source: "app_store",
            author: review.author,
            rating: review.rating,
            title: review.title ?? "",
            content: review.content,
            external_id: review.externalId,
            market: review.market ?? "es",
            locale: review.locale ?? null,
            source_url: review.sourceUrl ?? null,
            review_date: review.date || null,
            is_published: true
          },
          { onConflict: "app_slug,source,external_id" }
        );
    }
  }

  return [app.key, snapshot];
}

const previous = JSON.parse(await readFile(output, "utf8").catch(() => "{}"));
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;
let supabase = null;
if (SUPABASE_URL && SUPABASE_SERVICE_ROLE) {
  console.log(`Supabase configurado: changelog + traducciones vía ${provider}.`);
  supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);
} else {
  console.warn("Sin SUPABASE_SERVICE_ROLE_KEY: el changelog solo se guardará en el snapshot local.");
}

try {
  const history = previous.__changelog ?? {};
  const snapshots = { ...previous };
  delete snapshots.__changelog;
  for (const app of apps) {
    const result = await syncApp(app, history, supabase);
    if (result) {
      const [key, snapshot] = result;
      snapshots[key] = snapshot;
    }
  }

  snapshots.__changelog = history;
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, `${JSON.stringify(snapshots, null, 2)}\n`);
  console.log(`App Store sincronizado: ${Object.keys(snapshots).filter((key) => key !== "__changelog").length} app(s) públicos.`);
} catch (error) {
  console.error("No se pudo sincronizar Apple; se conserva el snapshot anterior.", error);
  if (Object.keys(previous).length === 0) process.exitCode = 1;
}
