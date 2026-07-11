import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { AppDetailClient } from "@/components/AppDetailClient";
import { getPublishedApps, getAppBySlug } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const allApps = await getPublishedApps();
  return allApps.map((app) => ({ locale: "en", slug: app.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== "en") return {};
  const app = await getAppBySlug(slug);

  if (!app) return {};

  const title = `${app.name}: Case Study | RomeroDev`;
  const desc = app.shortDescription_en || app.shortDescription;

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      url: absoluteUrl(`/en/case-studies/${app.slug}/`),
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc
    }
  };
}

export default async function LocalizedCaseDetailPageEN({ params }: PageProps) {
  const { locale, slug } = await params;
  if (locale !== "en") {
    notFound();
  }
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
          description: app.shortDescription_en || app.shortDescription,
          applicationCategory: app.category,
          operatingSystem: app.platform.join(", "),
          url: absoluteUrl(`/en/case-studies/${app.slug}/`),
          sameAs: app.appStoreUrl,
          softwareVersion: app.appStore?.version,
          dateModified: app.appStore?.currentVersionReleaseDate ?? app.updatedAt,
          author: app.appStore?.developer ? { "@type": "Person", name: app.appStore.developer } : undefined
        }}
      />
      <AppDetailClient app={app} />
    </>
  );
}
