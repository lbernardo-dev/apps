import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppFaqClient } from "@/components/AppFaqClient";
import { JsonLd } from "@/components/JsonLd";
import { getPublishedApps, getAppBySlug } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const allApps = await getPublishedApps();
  return allApps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = await getAppBySlug(slug);
  return app
    ? {
        title: `FAQ — ${app.name}`,
        description: `Frequently asked questions and help for ${app.name}.`
      }
    : {};
}

export default async function AppFaqPage({ params }: PageProps) {
  const { slug } = await params;
  const app = await getAppBySlug(slug);

  if (!app) {
    notFound();
  }

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
