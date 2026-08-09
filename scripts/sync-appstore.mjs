import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const apps = [
  { key: "vitalspath", id: "6760143192", country: "es" },
  { key: "reps", id: "6775801149", country: "es" },
  { key: "shield", id: "6790398619", country: "es" }
];
const output = path.resolve("lib/generated/appstore-data.json");
const label = (value, fallback = "") => value?.label ?? fallback;

async function syncApp({ key, id, country }) {
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

  return [key, {
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
  }];
}

const previous = JSON.parse(await readFile(output, "utf8").catch(() => "{}"));
try {
  const entries = await Promise.all(apps.map(syncApp));
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, `${JSON.stringify(Object.fromEntries(entries), null, 2)}\n`);
  console.log(`App Store sincronizado: ${entries.length} app(s).`);
} catch (error) {
  console.error("No se pudo sincronizar Apple; se conserva el snapshot anterior.", error);
  if (Object.keys(previous).length === 0) process.exitCode = 1;
}
