import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedApps, getAppBySlug } from "@/lib/content";
import { LegalDocument } from "@/components/LegalDocument";
import { SupportPageClient } from "@/components/SupportPageClient";
import { AppFaqClient } from "@/components/AppFaqClient";
import { JsonLd } from "@/components/JsonLd";
import { getAppPath } from "@/lib/routes";

type PageProps = {
  params: Promise<{ locale: string; slug: string; subpage: string }>;
};

const VALID_SUBPAGES = ["soporte", "privacidad", "terminos", "suscripciones", "preguntas-frecuentes"];

export async function generateStaticParams() {
  const allApps = await getPublishedApps();
  const params: { locale: string; slug: string; subpage: string }[] = [];

  for (const app of allApps) {
    for (const subpage of VALID_SUBPAGES) {
      // Subscriptions only if app has pricing/subscriptions
      if (subpage === "suscripciones" && !app.legal?.subscriptions && !app.pricing?.length) {
        continue;
      }
      params.push({ locale: "es", slug: app.slug, subpage });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, subpage } = await params;
  const app = await getAppBySlug(slug);

  if (!app) return {};

  if (subpage === "soporte") {
    return { title: `Soporte Técnico: ${app.name} | RomeroDev`, description: `Centro de ayuda y contacto para soporte de la aplicación ${app.name}.` };
  }
  if (subpage === "privacidad") {
    return { title: `Política de Privacidad: ${app.name} | RomeroDev`, description: app.legal?.privacy?.title || `Política de privacidad de ${app.name}` };
  }
  if (subpage === "terminos") {
    return { title: `Términos de Uso: ${app.name} | RomeroDev`, description: app.legal?.terms?.title || `Términos de uso de ${app.name}` };
  }
  if (subpage === "suscripciones") {
    return { title: `Condiciones de Suscripción: ${app.name} | RomeroDev`, description: app.legal?.subscriptions?.title || `Condiciones de compra de ${app.name}` };
  }
  if (subpage === "preguntas-frecuentes") {
    return { title: `Preguntas Frecuentes: ${app.name} | RomeroDev`, description: `Respuestas a dudas comunes sobre el funcionamiento de ${app.name}.` };
  }

  return {};
}

export default async function LocalizedCaseSubpageES({ params }: PageProps) {
  const { slug, subpage } = await params;
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
