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
  return resourcesData.map((art) => ({ locale: "es", slug: art.slug_es }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== "es") return {};
  const article = resourcesData.find((a) => a.slug_es === slug);

  if (!article) return {};

  return constructMetadata({
    title: article.title,
    description: article.excerpt,
    canonicalPath: getResourcePath(article.id, "es"),
    locale: "es",
    alternateLocales: {
      es: getResourcePath(article.id, "es"),
      en: getResourcePath(article.id, "en")
    }
  });
}

export default async function LocalizedResourceArticleES({ params }: PageProps) {
  const { locale, slug } = await params;
  if (locale !== "es") {
    notFound();
  }
  const article = resourcesData.find((a) => a.slug_es === slug);

  if (!article) {
    notFound();
  }

  const articleUrl = absoluteUrl(getResourcePath(article.id, "es"));
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        datePublished: article.date,
        dateModified: article.date,
        inLanguage: "es",
        mainEntityOfPage: articleUrl,
        author: { "@type": "Person", name: siteConfig.author },
        publisher: { "@id": `${siteConfig.url}/#organization` }
      }} />
      <ResourceArticleView article={article} />
    </>
  );
}
