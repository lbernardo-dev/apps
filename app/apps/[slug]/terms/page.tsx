import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { apps, getAppBySlug } from "@/lib/content";
import { LegalDocument } from "@/components/LegalDocument";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  return app
    ? {
        title: app.legal.terms.title,
        description: `Terminos y condiciones especificos de ${app.name}.`
      }
    : {};
}

export default async function AppTermsPage({ params }: PageProps) {
  const { slug } = await params;
  const app = getAppBySlug(slug);

  if (!app) {
    notFound();
  }

  return <LegalDocument title={app.legal.terms.title} updatedAt={app.legal.terms.updatedAt} body={app.legal.terms.body} />;
}
