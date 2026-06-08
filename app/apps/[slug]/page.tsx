import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { AppDetailClient } from "@/components/AppDetailClient";
import { getPublishedApps, getAppBySlug } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

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

  if (!app) {
    return {};
  }

  return {
    title: app.seo.title,
    description: app.seo.description,
    openGraph: {
      title: app.seo.title,
      description: app.seo.description,
      url: absoluteUrl(`/apps/${app.slug}/`),
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: app.seo.title,
      description: app.seo.description
    }
  };
}

export default async function AppDetailPage({ params }: PageProps) {
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
          "@type": "SoftwareApplication",
          name: app.name,
          description: app.shortDescription,
          applicationCategory: app.category,
          operatingSystem: app.platform.join(", "),
          url: absoluteUrl(`/apps/${app.slug}/`)
        }}
      />
      <AppDetailClient app={app} />
    </>
  );
}
