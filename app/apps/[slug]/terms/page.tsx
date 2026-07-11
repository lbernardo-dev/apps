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
        title: app.legal.terms.title,
        description: `Terminos y condiciones especificos de ${app.name}.`
      }
    : {};
}

export default async function AppTermsPage({ params }: PageProps) {
  const { slug } = await params;
  const app = await getAppBySlug(slug);

  if (!app) {
    notFound();
  }

  return (
    <LegalDocument 
      title={app.legal.terms.title} 
      titleEn={app.legal.terms.title_en}
      updatedAt={app.legal.terms.updatedAt} 
      body={app.legal.terms.body} 
      bodyEn={app.legal.terms.body_en}
      backUrl={`/apps/${app.slug}/`}
      appName={app.name}
      app={app}
    />
  );
}
