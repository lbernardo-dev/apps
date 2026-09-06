import { getHomeSections, getTestimonials, getAboutProfile, getFeaturedApps, getLandingAnnouncements, getLandingSurveys } from "@/lib/content";
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
  const [sections, testimonials, profile, featuredApps, announcements, surveys] = await Promise.all([
    getHomeSections(),
    getTestimonials(locale as "es" | "en"),
    getAboutProfile(),
    getFeaturedApps(),
    getLandingAnnouncements(),
    getLandingSurveys()
  ]);

  const faqItems = locale === "es"
    ? [
        ["¿Qué tipo de productos construye RomeroDev?", "Apps iOS nativas, automatizaciones Salesforce, integraciones y productos digitales con estrategia, UX, backend y evolución continua."],
        ["¿Puedo explorar productos ya publicados?", "Sí. Cada producto tiene una ficha dinámica con estado, funciones, capturas, valoraciones, reseñas, precios, privacidad, términos y novedades."],
        ["¿Se puede trabajar sobre un producto existente?", "Sí. El trabajo puede empezar por una auditoría técnica y de experiencia para ordenar riesgos, rendimiento, datos y próximos lanzamientos."],
      ]
    : [
        ["What kind of products does RomeroDev build?", "Native iOS apps, Salesforce automation, integrations and digital products with strategy, UX, backend and continuous evolution."],
        ["Can I explore products already released?", "Yes. Each product has a dynamic detail page with status, features, screenshots, ratings, reviews, pricing, privacy, terms and release updates."],
        ["Can you work on an existing product?", "Yes. The engagement can start with a technical and experience audit to sequence risks, performance, data and future releases."],
      ];

  const itemList = {
    "@type": "ItemList",
    name: locale === "es" ? "Apps de RomeroDev" : "RomeroDev apps",
    itemListElement: featuredApps.map((app, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: app.name,
        description: app.shortDescription,
        applicationCategory: app.category,
        operatingSystem: app.platform.join(", "),
        url: absoluteUrl(getAppPath(app.slug, locale as "es" | "en")),
        sameAs: app.appStoreUrl,
        ...(app.userRatingCount && app.userRatingCount > 0
          ? { aggregateRating: { "@type": "AggregateRating", ratingValue: app.averageRating ?? 0, ratingCount: app.userRatingCount } }
          : {})
      }
    }))
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl(`/${locale}/`)}#webpage`,
        url: absoluteUrl(`/${locale}/`),
        name: locale === "es" ? "Apps iOS nativas y consultoría Salesforce" : "Native iOS apps and Salesforce consulting",
        description: locale === "es"
          ? "Productos digitales, apps iOS nativas y consultoría Salesforce con una dirección técnica y de producto completa."
          : "Digital products, native iOS apps and Salesforce consulting with complete product and technical direction.",
        isPartOf: { "@id": `${absoluteUrl("/")}#website` },
        inLanguage: locale
      },
      itemList,
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer }
        }))
      }
    ]
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <LandingPageClient
        initialSections={sections}
        initialTestimonials={testimonials}
        initialProfile={profile}
        initialFeaturedApps={featuredApps}
        initialAnnouncements={announcements}
        initialSurveys={surveys}
      />
    </>
  );
}
