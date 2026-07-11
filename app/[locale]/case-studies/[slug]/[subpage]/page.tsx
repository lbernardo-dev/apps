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

const VALID_SUBPAGES = ["support", "privacy", "terms", "subscriptions", "faq"];

export async function generateStaticParams() {
  const allApps = await getPublishedApps();
  const params: { locale: string; slug: string; subpage: string }[] = [];

  for (const app of allApps) {
    for (const subpage of VALID_SUBPAGES) {
      if (subpage === "subscriptions" && !app.legal?.subscriptions && !app.pricing?.length) {
        continue;
      }
      params.push({ locale: "en", slug: app.slug, subpage });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, subpage } = await params;
  const app = await getAppBySlug(slug);

  if (!app) return {};

  if (subpage === "support") {
    return { title: `Technical Support: ${app.name} | RomeroDev`, description: `Help center and contact for technical support of the application ${app.name}.` };
  }
  if (subpage === "privacy") {
    return { title: `Privacy Policy: ${app.name} | RomeroDev`, description: app.legal?.privacy?.title_en || `Privacy policy of ${app.name}` };
  }
  if (subpage === "terms") {
    return { title: `Terms of Use: ${app.name} | RomeroDev`, description: app.legal?.terms?.title_en || `Terms of use of ${app.name}` };
  }
  if (subpage === "subscriptions") {
    return { title: `Subscription Terms: ${app.name} | RomeroDev`, description: app.legal?.subscriptions?.title_en || `Subscription conditions of ${app.name}` };
  }
  if (subpage === "faq") {
    return { title: `Frequently Asked Questions: ${app.name} | RomeroDev`, description: `Answers to common questions about using ${app.name}.` };
  }

  return {};
}

export default async function LocalizedCaseSubpageEN({ params }: PageProps) {
  const { slug, subpage } = await params;
  const app = await getAppBySlug(slug);

  if (!app) {
    notFound();
  }

  const backUrl = getAppPath(app.slug, "en");

  if (subpage === "support") {
    return <SupportPageClient app={app} />;
  }

  if (subpage === "privacy") {
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

  if (subpage === "terms") {
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

  if (subpage === "subscriptions" && app.legal.subscriptions) {
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

  if (subpage === "faq") {
    return (
      <>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: app.faq.map((item) => ({
              "@type": "Question",
              name: item.question_en || item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer_en || item.answer
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
