import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedApps, getAppBySlug } from "@/lib/content";
import { LegalDocument } from "@/components/LegalDocument";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPublishedApps()).filter(app => app.legal.subscriptions).map(app => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const app = await getAppBySlug((await params).slug);
  return app?.legal.subscriptions ? { title: app.legal.subscriptions.title, description: `Condiciones de compra y suscripción de ${app.name}.` } : {};
}

export default async function SubscriptionTermsPage({ params }: PageProps) {
  const app = await getAppBySlug((await params).slug);
  if (!app?.legal.subscriptions) notFound();
  return <LegalDocument title={app.legal.subscriptions.title} titleEn={app.legal.subscriptions.title_en} updatedAt={app.legal.subscriptions.updatedAt} body={app.legal.subscriptions.body} bodyEn={app.legal.subscriptions.body_en} backUrl={`/apps/${app.slug}/#pricing`} appName={app.name} app={app} />;
}
