import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedApps, getAppBySlug } from "@/lib/content";
import { LegalDocument } from "@/components/LegalDocument";

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
        title: app.legal.privacy.title,
        description: `Politica de privacidad especifica de ${app.name}.`
      }
    : {};
}

export default async function AppPrivacyPage({ params }: PageProps) {
  const { slug } = await params;
  const app = await getAppBySlug(slug);

  if (!app) {
    notFound();
  }

  return (
    <LegalDocument 
      title={app.legal.privacy.title} 
      updatedAt={app.legal.privacy.updatedAt} 
      body={app.legal.privacy.body} 
      backUrl={`/apps/${app.slug}/`}
      appName={app.name}
    />
  );
}
