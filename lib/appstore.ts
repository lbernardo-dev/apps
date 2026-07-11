export interface AppStoreMetadata {
  averageUserRating: number;
  userRatingCount: number;
  version: string;
  releaseNotes?: string;
  currentVersionReleaseDate?: string;
  trackViewUrl?: string;
}

export interface AppStoreReview {
  author: string;
  rating: number;
  title: string;
  content: string;
  updatedAt: string;
}

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
      next: { revalidate: 3600 }, // Cache for 1 hour in Next.js
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
      trackViewUrl: result.trackViewUrl || undefined,
    };
  } catch (err) {
    console.error(`Error fetching App Store metadata for ID ${appId}:`, err);
    return null;
  }
}

// Fetch customer reviews from iTunes Customer Reviews RSS feed
export async function fetchAppStoreReviews(appStoreUrl: string | undefined): Promise<AppStoreReview[]> {
  const appId = extractAppId(appStoreUrl);
  if (!appId) return [];

  try {
    // We fetch from Spanish feed
    const res = await fetch(`https://itunes.apple.com/es/rss/customerreviews/id=${appId}/json`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!res.ok) return [];

    const data = await res.json();
    const entries = data.feed?.entry;
    if (!entries || !Array.isArray(entries)) return [];

    const reviews: AppStoreReview[] = entries.map((entry: any) => {
      return {
        author: entry.author?.name?.label || "App Store User",
        rating: entry["im:rating"] ? parseInt(entry["im:rating"].label, 10) : 5,
        title: entry.title?.label || "",
        content: entry.content?.label || "",
        updatedAt: entry.updated?.label || new Date().toISOString(),
      };
    });

    return reviews;
  } catch (err) {
    console.error(`Error fetching App Store reviews for ID ${appId}:`, err);
    return [];
  }
}
