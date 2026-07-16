import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resourcesData } from "@/lib/resources-content";
import { ResourceArticleView } from "@/components/ResourceArticleView";
import { getResourcePath } from "@/lib/routes";
import { constructMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return resourcesData.map((art) => ({ locale: "en", slug: art.slug_en }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== "en") return {};
  const article = resourcesData.find((a) => a.slug_en === slug);

  if (!article) return {};

  return constructMetadata({
    title: article.title_en,
    description: article.excerpt_en,
    canonicalPath: getResourcePath(article.id, "en"),
    locale: "en",
    alternateLocales: {
      es: getResourcePath(article.id, "es"),
      en: getResourcePath(article.id, "en")
    }
  });
}

export default async function LocalizedResourceArticleEN({ params }: PageProps) {
  const { locale, slug } = await params;
  if (locale !== "en") {
    notFound();
  }
  const article = resourcesData.find((a) => a.slug_en === slug);

  if (!article) {
    notFound();
  }

  const articleUrl = absoluteUrl(getResourcePath(article.id, "en"));
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title_en,
        description: article.excerpt_en,
        datePublished: article.date,
        dateModified: article.date,
        inLanguage: "en",
        mainEntityOfPage: articleUrl,
        author: { "@type": "Person", name: siteConfig.author },
        publisher: { "@id": `${siteConfig.url}/#organization` }
      }} />
      <ResourceArticleView article={article} />
    </>
  );
}
