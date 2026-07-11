export type AppStatus = "draft" | "published" | "archived" | "coming_soon";

export type AppPlatform = "iOS" | "iPadOS" | "watchOS" | "macOS" | "Web";

export type AppItem = {
  id: string;
  slug: string;
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
  platform: AppPlatform[];
  appStoreUrl?: string;
  websiteUrl?: string;
  supportEmail: string;
  iconUrl?: string;
  coverImageUrl?: string;
  screenshots: string[];
  videoUrl?: string;
  primaryCtaLabel: string;
  primaryCtaLabel_en?: string;
  primaryCtaUrl: string;
  secondaryCtaLabel?: string;
  secondaryCtaLabel_en?: string;
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
