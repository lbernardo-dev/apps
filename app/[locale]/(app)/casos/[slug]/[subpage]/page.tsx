import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAppBySlug, getAppRouteSlugs, getPublishedApps } from "@/lib/content";
import { LegalDocument } from "@/components/LegalDocument";
import { SupportPageClient } from "@/components/SupportPageClient";
import { AppFaqClient } from "@/components/AppFaqClient";
import { JsonLd } from "@/components/JsonLd";
import { getAppPath, getAppSubpagePath, SUBPAGE_SLUGS } from "@/lib/routes";
import { constructMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string; slug: string; subpage: string }>;
};

const VALID_SUBPAGES = ["soporte", "privacidad", "terminos", "suscripciones", "seguridad-familiar", "preguntas-frecuentes"];

export async function generateStaticParams() {
  const allApps = await getPublishedApps();
  const params: { locale: string; slug: string; subpage: string }[] = [];

  for (const app of allApps) {
    for (const subpage of VALID_SUBPAGES) {
      // Subscriptions only if app has pricing/subscriptions
      if (subpage === "suscripciones" && !app.legal?.subscriptions && !app.pricing?.length) {
        continue;
      }
      if (subpage === "seguridad-familiar" && !app.legal?.safety) {
        continue;
      }
      for (const slug of getAppRouteSlugs(app)) {
        params.push({ locale: "es", slug, subpage });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug, subpage } = await params;
  if (locale !== "es") return {};
  const app = await getAppBySlug(slug);

  if (!app) return {};

  const subpageKey = (Object.keys(SUBPAGE_SLUGS) as (keyof typeof SUBPAGE_SLUGS)[])
    .find((key) => SUBPAGE_SLUGS[key].es === subpage);
  if (!subpageKey) return {};

  const buildMetadata = (title: string, description: string) => constructMetadata({
    title,
    description,
    canonicalPath: getAppSubpagePath(app.slug, subpageKey, "es"),
    locale: "es",
    alternateLocales: {
      es: getAppSubpagePath(app.slug, subpageKey, "es"),
      en: getAppSubpagePath(app.slug, subpageKey, "en")
    }
  });

  if (subpage === "soporte") {
    return buildMetadata(`Soporte técnico: ${app.name}`, `Centro de ayuda y contacto para soporte de la aplicación ${app.name}.`);
  }
  if (subpage === "privacidad") {
    return buildMetadata(`Política de privacidad: ${app.name}`, app.legal?.privacy?.title || `Política de privacidad de ${app.name}`);
  }
  if (subpage === "terminos") {
    return buildMetadata(`Términos de uso: ${app.name}`, app.legal?.terms?.title || `Términos de uso de ${app.name}`);
  }
  if (subpage === "suscripciones") {
    return buildMetadata(`Condiciones de suscripción: ${app.name}`, app.legal?.subscriptions?.title || `Condiciones de compra de ${app.name}`);
  }
  if (subpage === "seguridad-familiar") {
    return buildMetadata(`Seguridad familiar: ${app.name}`, app.legal?.safety?.title || `Compromiso de seguridad familiar de ${app.name}`);
  }
  if (subpage === "preguntas-frecuentes") {
    return buildMetadata(`Preguntas frecuentes: ${app.name}`, `Respuestas a dudas comunes sobre el funcionamiento de ${app.name}.`);
  }

  return {};
}

export default async function LocalizedCaseSubpageES({ params }: PageProps) {
  const { locale, slug, subpage } = await params;
  if (locale !== "es") {
    notFound();
  }
  const app = await getAppBySlug(slug);

  if (!app) {
    notFound();
  }

  const backUrl = getAppPath(app.slug, "es");

  if (subpage === "soporte") {
    return <SupportPageClient app={app} />;
  }

  if (subpage === "privacidad") {
    return (
      <LegalDocument
        title={app.legal.privacy.title}
        titleEn={app.legal.privacy.title_en}
        updatedAt={app.legal.privacy.updatedAt}
        body={app.legal.privacy.body}
        bodyEn={app.legal.privacy.body_en}
        backUrl={backUrl}
        appName={app.name}
        app={app}
      />
    );
  }

  if (subpage === "terminos") {
    return (
      <LegalDocument
        title={app.legal.terms.title}
        titleEn={app.legal.terms.title_en}
        updatedAt={app.legal.terms.updatedAt}
        body={app.legal.terms.body}
        bodyEn={app.legal.terms.body_en}
        backUrl={backUrl}
        appName={app.name}
        app={app}
      />
    );
  }

  if (subpage === "suscripciones" && app.legal.subscriptions) {
    return (
      <LegalDocument
        title={app.legal.subscriptions.title}
        titleEn={app.legal.subscriptions.title_en}
        updatedAt={app.legal.subscriptions.updatedAt}
        body={app.legal.subscriptions.body}
        bodyEn={app.legal.subscriptions.body_en}
        backUrl={`${backUrl}#pricing`}
        appName={app.name}
        app={app}
      />
    );
  }

  if (subpage === "seguridad-familiar" && app.legal.safety) {
    return (
      <LegalDocument
        title={app.legal.safety.title}
        titleEn={app.legal.safety.title_en}
        updatedAt={app.legal.safety.updatedAt}
        body={app.legal.safety.body}
        bodyEn={app.legal.safety.body_en}
        backUrl={backUrl}
        appName={app.name}
        app={app}
      />
    );
  }

  if (subpage === "preguntas-frecuentes") {
    return (
      <>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: app.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer
              }
            }))
          }}
        />
        <AppFaqClient app={app} />
      </>
    );
  }

  notFound();
}
