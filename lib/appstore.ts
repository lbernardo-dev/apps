export interface AppStoreMetadata {
  averageUserRating: number;
  userRatingCount: number;
  version: string;
  releaseNotes?: string;
  currentVersionReleaseDate?: string;
  trackViewUrl?: string;
}

export interface AppStoreReview {
  id?: string;
  externalId?: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  updatedAt: string;
  market?: string;
  locale?: string;
  source?: string;
  sourceUrl?: string;
}

// Apple storefronts. The sync job uses the same exhaustive list so reviews
// are not biased toward the Spanish storefront selected by the landing URL.
export const APPLE_REVIEW_MARKETS = [
  "ae", "ag", "ai", "al", "am", "ao", "ar", "at", "au", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bj", "bm", "bn", "bo", "br", "bs", "bt", "bw", "by", "bz", "ca", "cd", "cg", "ch", "ci", "cl", "cm", "cn", "co", "cr", "cv", "cy", "cz", "de", "dk", "dm", "do", "dz", "ec", "ee", "eg", "es", "fi", "fj", "fm", "fr", "ga", "gb", "gd", "gh", "gm", "gr", "gt", "gw", "gy", "hk", "hn", "hr", "hu", "id", "ie", "il", "in", "is", "it", "jm", "jo", "jp", "ke", "kg", "kh", "kn", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "lt", "lu", "lv", "ly", "ma", "md", "mg", "mk", "ml", "mn", "mo", "mr", "ms", "mt", "mu", "mv", "mw", "mx", "my", "mz", "na", "ne", "ng", "ni", "nl", "no", "np", "nr", "nz", "om", "pa", "pe", "pg", "ph", "pk", "pl", "pt", "pw", "py", "qa", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "se", "sg", "si", "sk", "sl", "sn", "sr", "st", "sv", "sz", "tc", "td", "th", "tj", "tm", "tn", "tr", "tt", "tw", "tz", "ua", "ug", "uk", "us", "uy", "uz", "vc", "ve", "vg", "vn", "vu", "ws", "xk", "ye", "za", "zm", "zw"
] as const;

// Helper to extract App Store ID from URL
export function extractAppId(url: string | undefined): string | null {
  if (!url) return null;
  const match = url.match(/id(\d+)/);
  return match ? match[1] : null;
}

// Fetch general app metadata from iTunes Lookup API
export async function fetchAppStoreMetadata(appStoreUrl: string | undefined): Promise<AppStoreMetadata | null> {
  const appId = extractAppId(appStoreUrl);
  if (!appId) return null;

  try {
    const res = await fetch(`https://itunes.apple.com/es/lookup?id=${appId}`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;

    const data = await res.json();
    if (!data.results || data.results.length === 0) return null;

    const result = data.results[0];
    return {
      averageUserRating: result.averageUserRating || 5.0,
      userRatingCount: result.userRatingCount || 0,
      version: result.version || "1.0.0",
      releaseNotes: result.releaseNotes || undefined,
      currentVersionReleaseDate: result.currentVersionReleaseDate || undefined,
      trackViewUrl: result.trackViewUrl || undefined
    };
  } catch (err) {
    console.error(`Error fetching App Store metadata for ID ${appId}:`, err);
    return null;
  }
}

type AppleFeedEntry = {
  id?: { label?: string };
  author?: { name?: { label?: string } };
  title?: { label?: string };
  content?: { label?: string };
  updated?: { label?: string };
  [key: string]: unknown;
};

function asEntries(value: unknown): AppleFeedEntry[] {
  if (Array.isArray(value)) return value as AppleFeedEntry[];
  return value && typeof value === "object" ? [value as AppleFeedEntry] : [];
}

function reviewFromEntry(entry: AppleFeedEntry, market: string, appId: string): AppStoreReview | null {
  const content = entry.content?.label?.trim() ?? "";
  const externalId = entry.id?.label?.trim() || `${market}-${entry.author?.name?.label ?? "user"}-${entry.updated?.label ?? content}`;
  if (!content) return null;
  return {
    id: externalId,
    externalId,
    author: entry.author?.name?.label || "App Store User",
    rating: Number(entry["im:rating"] && typeof entry["im:rating"] === "object" && "label" in entry["im:rating"]
      ? (entry["im:rating"] as { label?: string }).label
      : 5),
    title: entry.title?.label || "",
    content,
    updatedAt: entry.updated?.label || new Date().toISOString(),
    market,
    locale: undefined,
    source: "app_store",
    sourceUrl: `https://apps.apple.com/${market}/app/id${appId}?see-all=reviews`
  };
}

async function fetchReviewPage(appId: string, market: string, page: number): Promise<AppStoreReview[]> {
  try {
    const res = await fetch(`https://itunes.apple.com/${market}/rss/customerreviews/page=${page}/id=${appId}/sortby=mostrecent/json`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return asEntries(data.feed?.entry)
      .map((entry) => reviewFromEntry(entry, market, appId))
      .filter((review): review is AppStoreReview => Boolean(review));
  } catch {
    return [];
  }
}

/**
 * Fetch as much of Apple's public review RSS surface as Apple exposes:
 * every configured storefront and every non-empty page up to maxPages.
 */
export async function fetchAppStoreReviews(
  appStoreUrl: string | undefined,
  options: { markets?: readonly string[]; maxPages?: number } = {}
): Promise<AppStoreReview[]> {
  const appId = extractAppId(appStoreUrl);
  if (!appId) return [];

  const markets = options.markets?.length ? options.markets : APPLE_REVIEW_MARKETS;
  const maxPages = options.maxPages ?? 10;
  const reviews: AppStoreReview[] = [];

  // Keep the public endpoint friendly while still covering every storefront.
  for (let offset = 0; offset < markets.length; offset += 8) {
    const batch = markets.slice(offset, offset + 8);
    const firstPages = await Promise.all(batch.map((market) => fetchReviewPage(appId, market, 1)));
    for (let index = 0; index < firstPages.length; index += 1) {
      const firstPage = firstPages[index];
      reviews.push(...firstPage);
      if (firstPage.length >= 50 && maxPages > 1) {
        for (let page = 2; page <= maxPages; page += 1) {
          const nextPage = await fetchReviewPage(appId, batch[index], page);
          if (nextPage.length === 0) break;
          reviews.push(...nextPage);
          if (nextPage.length < 50) break;
        }
      }
    }
  }

  const unique = new Map<string, AppStoreReview>();
  for (const review of reviews) unique.set(review.externalId ?? `${review.market}-${review.author}-${review.updatedAt}`, review);
  return Array.from(unique.values()).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}
