import { getHomeSections, getTestimonials, getAboutProfile, getFeaturedApps } from "@/lib/content";
import { LandingPageClient } from "@/components/LandingPageClient";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/site";
import { getAppPath } from "@/lib/routes";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import { Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return constructMetadata({
    title: isEn
      ? "Premium iOS Apps & Salesforce Consulting"
      : "Apps iOS nativas y consultoría Salesforce",
    description: isEn
      ? "Product Engineering by Lester Romero Bernardo. Native iOS app development, Salesforce CRM optimization, enterprise integrations, and technical audits."
      : "Desarrollo de apps iOS nativas (SwiftUI) y consultoría Salesforce, con metodología y soporte continuo para productos digitales que necesitan evolucionar.",
    keywords: isEn
      ? "iOS apps, SwiftUI, App Store, Salesforce consulting, Salesforce optimization, enterprise integrations, technical audit, product engineering"
      : "apps iOS, desarrollo iOS, SwiftUI, App Store, consultoría Salesforce, optimización Salesforce, integraciones, auditoría técnica, ingeniería de producto",
    canonicalPath: `/${locale}/`,
    locale: locale as Locale,
    alternateLocales: {
      es: "/es/",
      en: "/en/"
    }
  });
}

export default async function LocalizedHomePage({ params }: PageProps) {
  const { locale } = await params;
  const [sections, testimonials, profile, featuredApps] = await Promise.all([
    getHomeSections(),
    getTestimonials(),
    getAboutProfile(),
    getFeaturedApps()
  ]);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locale === "es" ? "Apps de RomeroDev" : "RomeroDev apps",
    itemListElement: featuredApps.map((app, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: app.name,
        applicationCategory: app.category,
        operatingSystem: app.platform.join(", "),
        url: absoluteUrl(getAppPath(app.slug, locale as "es" | "en")),
        sameAs: app.appStoreUrl
      }
    }))
  };

  return (
    <>
      {featuredApps.length > 0 ? <JsonLd data={itemList} /> : null}
      <LandingPageClient
        initialSections={sections}
        initialTestimonials={testimonials}
        initialProfile={profile}
        initialFeaturedApps={featuredApps}
      />
    </>
  );
}
