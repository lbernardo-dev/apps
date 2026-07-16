import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "./site";

type MetadataOptions = {
  title: string;
  description?: string;
  canonicalPath?: string; // e.g. "/es/desarrollo-ios/"
  locale?: "es" | "en";
  alternateLocales?: Record<string, string>; // e.g. { es: "/es/desarrollo-ios/", en: "/en/ios-development/" }
  image?: string;
  noIndex?: boolean;
  isLayout?: boolean;
};

export function constructMetadata({
  title,
  description = siteConfig.description,
  canonicalPath,
  locale = "es",
  alternateLocales,
  image = "/assets/brand/romerodev-social.png",
  noIndex = false,
  isLayout = false,
}: MetadataOptions): Metadata {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const absoluteImageUrl = image.startsWith("http")
    ? image
    : `${siteConfig.url}${image.startsWith("/") ? "" : "/"}${image}`;

  // Formulate canonical URL
  const canonicalUrl = canonicalPath ? absoluteUrl(canonicalPath) : undefined;

  // Formulate languages alternates
  const alternateLanguages: Record<string, string> = {};
  if (alternateLocales) {
    Object.entries(alternateLocales).forEach(([lang, path]) => {
      alternateLanguages[lang] = absoluteUrl(path);
    });
    // Add x-default pointing to Spanish (our primary language)
    if (alternateLocales.es) {
      alternateLanguages["x-default"] = absoluteUrl(alternateLocales.es);
    }
  }

  return {
    metadataBase: new URL(siteConfig.url),
    title: isLayout
      ? { default: `${title} | ${siteConfig.name}`, template: `%s | ${siteConfig.name}` }
      : title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: Object.keys(alternateLanguages).length > 0 ? alternateLanguages : undefined,
    },
    manifest: `${basePath}/site.webmanifest`,
    icons: {
      icon: [
        { url: `${basePath}/favicon.ico`, type: "image/x-icon", sizes: "32x32" },
        { url: `${basePath}/favicon-32.png`, type: "image/png", sizes: "32x32" },
        { url: `${basePath}/favicon.svg`, type: "image/svg+xml", sizes: "any" },
        { url: `${basePath}/icon-192.png`, type: "image/png", sizes: "192x192" }
      ],
      apple: [
        { url: `${basePath}/apple-touch-icon.png`, type: "image/png", sizes: "180x180" }
      ]
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: canonicalUrl || siteConfig.url,
      siteName: siteConfig.name,
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [absoluteImageUrl]
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          }
        }
      : undefined
  };
}
