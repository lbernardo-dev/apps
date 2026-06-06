import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PhoneMockup } from "@/components/PhoneMockup";
import { apps, getAppBySlug } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = getAppBySlug(slug);

  if (!app) {
    return {};
  }

  return {
    title: app.seo.title,
    description: app.seo.description,
    openGraph: {
      title: app.seo.title,
      description: app.seo.description,
      url: absoluteUrl(`/apps/${app.slug}/`),
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: app.seo.title,
      description: app.seo.description
    }
  };
}

export default async function AppDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const app = getAppBySlug(slug);

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
          description: app.shortDescription,
          applicationCategory: app.category,
          operatingSystem: app.platform.join(", "),
          url: absoluteUrl(`/apps/${app.slug}/`)
        }}
      />
      <section className="section bg-white">
        <div className="container grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-brand-blue">{app.category}</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight text-ink">{app.name}</h1>
            <p className="mt-5 text-2xl font-medium leading-9 text-graphite">{app.tagline}</p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-graphite">{app.longDescription}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={app.appStoreUrl || app.primaryCtaUrl}>{app.primaryCtaLabel}</ButtonLink>
              <ButtonLink href={`/apps/${app.slug}/support`} variant="secondary">
                Soporte
              </ButtonLink>
            </div>
          </div>
          <PhoneMockup app={app} />
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-ink">Problema que resuelve</h2>
            <p className="mt-4 text-base leading-8 text-graphite">{app.problem}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {app.benefits.map((benefit) => (
              <div className="rounded-lg border border-line bg-white p-5" key={benefit}>
                <CheckCircle2 aria-hidden="true" className="text-brand-green" size={20} />
                <p className="mt-4 text-sm leading-6 text-graphite">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-ink">Features clave</h2>
            <ul className="mt-6 grid gap-3">
              {app.features.map((feature) => (
                <li className="flex items-start gap-3 text-base leading-7 text-graphite" key={feature}>
                  <span className="mt-2 size-2 rounded-full bg-brand-blue" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-line bg-mist p-6">
            <h2 className="text-2xl font-semibold text-ink">Informacion de publicacion</h2>
            <dl className="mt-6 grid gap-4 text-sm">
              <div className="flex justify-between gap-6 border-b border-line pb-3">
                <dt className="text-graphite">Estado</dt>
                <dd className="font-semibold text-ink">{app.status}</dd>
              </div>
              <div className="flex justify-between gap-6 border-b border-line pb-3">
                <dt className="text-graphite">Plataforma</dt>
                <dd className="font-semibold text-ink">{app.platform.join(", ")}</dd>
              </div>
              <div className="flex justify-between gap-6 border-b border-line pb-3">
                <dt className="text-graphite">Publico</dt>
                <dd className="max-w-sm text-right font-semibold text-ink">{app.audience}</dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt className="text-graphite">Actualizado</dt>
                <dd className="font-semibold text-ink">{app.updatedAt}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-ink">FAQ de {app.name}</h2>
            <p className="mt-4 text-base leading-7 text-graphite">
              Dudas frecuentes y enlaces de soporte para usuarios o evaluadores.
            </p>
          </div>
          <FaqList items={app.faq} />
        </div>
      </section>
    </>
  );
}
