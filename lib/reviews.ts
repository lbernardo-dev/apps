// Locale detection and cleanup for App Store review text.
// Apple's RSS feed is fetched per territory but users write in any language,
// so reviews cannot be trusted to match the current locale. These helpers
// keep rendering decisions cheap and data-agnostic (works for both the
// static snapshot and Supabase rows).

const ES_WORDS = new Set([
  "el", "la", "los", "las", "de", "que", "para", "con", "por", "y", "un",
  "una", "es", "su", "más", "ya", "vez", "esta", "este", "me", "mi", "una",
  "se", "puede", "como", "muy", "toda", "todo", "sí", "al", "del", "las"
]);

const EN_WORDS = new Set([
  "the", "and", "for", "with", "you", "this", "it", "is", "to", "of", "my",
  "app", "that", "your", "get", "have", "in", "on", "a", "are", "i", "me",
  "has", "been", "can", "so", "much", "really", "into", "from", "which"
]);

function words(text: string): string[] {
  return text.toLowerCase().match(/[a-zà-ÿ]+/g) ?? [];
}

export function detectReviewLocale(content: string): "es" | "en" {
  if (!content) return "es";
  const lower = content.toLowerCase();

  // Spanish-only punctuation is a strong signal.
  if (lower.includes("¿") || lower.includes("¡")) return "es";
  // Accented multilingual letters lean heavily Spanish in this dataset.
  const accentStreak = (lower.match(/[áéíóúüñ]/g)?.length ?? 0) *
    (/á|é|í|ó|ú|ñ/.test(lower) ? 2 : 1);

  let esScore = 0;
  let enScore = 0;
  for (const w of words(content)) {
    if (ES_WORDS.has(w)) esScore += 1;
    if (EN_WORDS.has(w)) enScore += 1;
  }
  return esScore + accentStreak >= enScore ? "es" : "en";
}

const WHITESPACE_RE = /\s{2,}/g;
const REPEAT_WORD_RE = /\b(\w+)\s+\1\b/gi;
const SPACE_BEFORE_PUNCT_RE = /\s+([.,;:!?…])/g;

export function cleanReviewText(text: string): string {
  if (!text) return text;
  return text
    .replace(WHITESPACE_RE, " ")
    .replace(REPEAT_WORD_RE, "$1")
    .replace(SPACE_BEFORE_PUNCT_RE, "$1")
    .trim();
}

export interface ReviewLike {
  author: string;
  rating: number;
  title: string;
  content: string;
  date?: string;
}

/**
 * Returns reviews matching the active locale, with text cleaned. Works with any
 * source of reviews (static snapshot, Supabase, live fetch) so no data schema
 * change is required to keep ratings locale-consistent.
 */
export function reviewsForLocale<T extends ReviewLike>(reviews: T[] | undefined, locale: "es" | "en", limit?: number): T[] {
  if (!reviews) return [];
  const filtered = reviews
    .filter((r) => detectReviewLocale(r.content) === locale)
    .map((r) => ({ ...r, content: cleanReviewText(r.content), title: cleanReviewText(r.title) }));
  return limit ? filtered.slice(0, limit) : filtered;
}