import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resourcesData } from "@/lib/resources-content";
import { ResourceArticleView } from "@/components/ResourceArticleView";

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

  return {
    title: `${article.title_en} | RomeroDev`,
    description: article.excerpt_en
  };
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

  return <ResourceArticleView article={article} />;
}
