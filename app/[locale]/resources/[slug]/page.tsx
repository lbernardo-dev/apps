import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resourcesData } from "@/lib/resources-content";
import { ResourceArticleView } from "@/components/ResourceArticleView";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return resourcesData.map((art) => ({ slug: art.slug_en }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = resourcesData.find((a) => a.slug_en === slug);

  if (!article) return {};

  return {
    title: `${article.title_en} | RomeroDev`,
    description: article.excerpt_en
  };
}

export default async function LocalizedResourceArticleEN({ params }: PageProps) {
  const { slug } = await params;
  const article = resourcesData.find((a) => a.slug_en === slug);

  if (!article) {
    notFound();
  }

  return <ResourceArticleView article={article} />;
}
