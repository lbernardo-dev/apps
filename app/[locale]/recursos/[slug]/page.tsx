import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resourcesData } from "@/lib/resources-content";
import { ResourceArticleView } from "@/components/ResourceArticleView";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return resourcesData.map((art) => ({ slug: art.slug_es }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = resourcesData.find((a) => a.slug_es === slug);

  if (!article) return {};

  return {
    title: `${article.title} | RomeroDev`,
    description: article.excerpt
  };
}

export default async function LocalizedResourceArticleES({ params }: PageProps) {
  const { slug } = await params;
  const article = resourcesData.find((a) => a.slug_es === slug);

  if (!article) {
    notFound();
  }

  return <ResourceArticleView article={article} />;
}
