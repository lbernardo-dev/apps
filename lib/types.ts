export type AppStatus = "draft" | "published" | "testing" | "development" | "archived" | "coming_soon";

export type AppPlatform = "iOS" | "iPadOS" | "watchOS" | "macOS" | "Web";

export type AppItem = {
  id: string;
  slug: string;
  legacySlugs?: string[];
  name: string;
  tagline: string;
  tagline_en?: string;
  shortDescription: string;
  shortDescription_en?: string;
  longDescription: string;
  longDescription_en?: string;
  problem: string;
  problem_en?: string;
  benefits: string[];
  benefits_en?: string[];
  features: string[];
  features_en?: string[];
  audience: string;
  audience_en?: string;
  status: AppStatus;
  featured: boolean;
  category: string;
  category_en?: string;
  platform: AppPlatform[];
  appStoreUrl?: string;
  websiteUrl?: string;
  supportEmail: string;
  iconUrl?: string;
  coverImageUrl?: string;
  screenshots: string[];
  videoUrl?: string;
  promotionalText?: string;
  promotionalText_en?: string;
  primaryCtaLabel: string;
  primaryCtaLabel_en?: string;
  primaryCtaUrl: string;
  secondaryCtaLabel?: string;
  secondaryCtaLabel_en?: string;
  secondaryCtaUrl?: string;
  colorPrimary?: string;
  colorSecondary?: string;
  publishedAt?: string;
  updatedAt: string;
  seo: SeoMetadata;
  faq: FaqItem[];
  legal: {
    privacy: LegalPage;
    terms: LegalPage;
    subscriptions?: LegalPage;
    safety?: LegalPage;
  };
  pricing?: {
    name: string;
    name_en?: string;
    price: string;
    cadence: string;
    cadence_en?: string;
    description: string;
    description_en?: string;
    featured?: boolean;
    badge?: string;
    badge_en?: string;
    isIndicative?: boolean;
  }[];
  freeFeatures?: string[];
  freeFeatures_en?: string[];
  proFeatures?: string[];
  proFeatures_en?: string[];
  averageRating?: number;
  userRatingCount?: number;
  appStoreReviews?: {
    author: string;
    rating: number;
    title: string;
    content: string;
    date: string;
  }[];
  changelog?: AppChangelogEntry[];
  appStore?: {
    trackName: string;
    version: string;
    releaseNotes?: string;
    currentVersionReleaseDate?: string;
    minimumOsVersion?: string;
    formattedPrice?: string;
    developer?: string;
    languages?: string[];
    fileSizeBytes?: string;
    sourceUrl: string;
    syncedAt: string;
  };
  links?: AppLink[];
  media?: AppMedia[];
  bundleIdentifier?: string;
  version?: string;
  buildNumber?: string;
  followEnabled?: boolean;
  completeness?: AppCompleteness;
};

export type AppLinkKind =
  | "appstore"
  | "testflight"
  | "download"
  | "support"
  | "privacy"
  | "terms"
  | "subscriptions"
  | "website"
  | "repository"
  | "feedback"
  | "release_notes";

export type AppLink = {
  kind: AppLinkKind;
  label: string;
  label_en?: string;
  url: string;
  isPrimary?: boolean;
  isExternal?: boolean;
};

export type AppMediaKind = "icon" | "cover" | "screenshot" | "video" | "gallery" | "press";

export type AppMedia = {
  kind: AppMediaKind;
  path: string;
  alt: string;
  alt_en?: string;
  locale?: LocaleCode;
  sortOrder?: number;
  source?: string;
};

export type AppCompleteness = {
  score: number;
  missing: string[];
  verifiedAt?: string;
  sourcePath?: string;
};

export type LocaleCode = "es" | "en";

export type FaqItem = {
  question: string;
  question_en?: string;
  answer: string;
  answer_en?: string;
};

export type LegalPage = {
  title: string;
  title_en?: string;
  updatedAt: string;
  body: string[];
  body_en?: string[];
};

export type SeoMetadata = {
  title: string;
  description: string;
  keywords?: string;
  keywords_en?: string;
  image?: string;
};

export type Testimonial = {
  quote: string;
  quote_en?: string;
  name: string;
  role: string;
  role_en?: string;
};

export type HomeSection = {
  title: string;
  title_en?: string;
  body: string;
  body_en?: string;
};

export type AppChangelogEntry = {
  version: string;
  releaseNotes: string;
  releaseNotesEn?: string;
  releaseDate?: string;
  translated?: boolean;
  detectedAt?: string;
};
