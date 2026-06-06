export type AppStatus = "draft" | "published" | "archived" | "coming_soon";

export type AppPlatform = "iOS" | "iPadOS" | "watchOS" | "macOS" | "Web";

export type AppItem = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  problem: string;
  benefits: string[];
  features: string[];
  audience: string;
  status: AppStatus;
  featured: boolean;
  category: string;
  platform: AppPlatform[];
  appStoreUrl?: string;
  websiteUrl?: string;
  supportEmail: string;
  iconUrl?: string;
  coverImageUrl?: string;
  screenshots: string[];
  videoUrl?: string;
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  publishedAt?: string;
  updatedAt: string;
  seo: SeoMetadata;
  faq: FaqItem[];
  legal: {
    privacy: LegalPage;
    terms: LegalPage;
  };
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type LegalPage = {
  title: string;
  updatedAt: string;
  body: string[];
};

export type SeoMetadata = {
  title: string;
  description: string;
  image?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type HomeSection = {
  title: string;
  body: string;
};
