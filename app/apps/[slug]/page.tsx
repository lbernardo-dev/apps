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
      <section className="section bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="container relative z-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-bold text-brand-blue">
                {app.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                <span className="inline-block size-3 rounded-full bg-amber-400" />
                4.9 · Valoración
              </span>
            </div>
            <h1 className="mt-4 text-5xl font-black tracking-tight text-ink sm:text-6xl">{app.name}</h1>
            <p className="mt-5 text-xl font-semibold leading-9 text-brand-cyan">{app.tagline}</p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-graphite">{app.longDescription}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={app.appStoreUrl || app.primaryCtaUrl}>{app.primaryCtaLabel}</ButtonLink>
              <ButtonLink href={`/apps/${app.slug}/support`} variant="secondary">
                Soporte de la App
              </ButtonLink>
            </div>
          </div>
          {/* Framed Device Slider */}
          <div className="w-full">
            <h3 className="text-sm font-bold uppercase tracking-wider text-graphite mb-4">Capturas de Pantalla</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 pt-2 snap-x scrollbar-thin">
              {app.screenshots.map((shot) => (
                <div key={shot} className="snap-center shrink-0 w-[170px]">
                  <div className="relative h-[230px] w-[160px] overflow-hidden rounded-[1.6rem] border-[6px] border-slate-950 bg-slate-950 shadow-lg">
                    <div className="absolute top-0 left-1/2 z-20 h-2 w-12 -translate-x-1/2 rounded-b-sm bg-slate-950" />
                    <div className="bg-gradient-to-br from-slate-900 to-slate-950 w-full h-full p-4 flex flex-col justify-between text-white">
                      <div className="text-[8px] text-brand-cyan uppercase font-extrabold tracking-widest">{app.name}</div>
                      <div className="text-[10px] leading-4 font-bold text-slate-100">{shot}</div>
                      <div className="space-y-1.5 pt-2">
                        <span className="block h-1 rounded-full bg-slate-800" />
                        <span className="block h-1 w-3/4 rounded-full bg-slate-800" />
                        <span className="block h-1 w-1/2 rounded-full bg-brand-blue" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">El Reto</span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink">Problema que resuelve</h2>
            <p className="mt-5 text-base leading-8 text-graphite">{app.problem}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {app.benefits.map((benefit, idx) => (
              <div className="glass-card rounded-xl p-5 hover:border-brand-green/30 transition-all duration-300" key={benefit}>
                <div className="flex size-9 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                  <CheckCircle2 aria-hidden="true" size={18} strokeWidth={2.5} />
                </div>
                <h4 className="mt-4 text-sm font-semibold text-ink">Beneficio #{idx + 1}</h4>
                <p className="mt-2 text-xs leading-5 text-graphite">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">Características</span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink">Funcionalidades clave</h2>
            <ul className="mt-6 grid gap-4">
              {app.features.map((feature) => (
                <li className="flex items-start gap-3 text-base leading-7 text-graphite" key={feature}>
                  <span className="mt-2.5 size-2 shrink-0 rounded-full bg-brand-blue" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-mist p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-ink mb-6">Especificaciones de la Aplicación</h2>
              <dl className="grid gap-4 text-sm">
                <div className="flex justify-between gap-6 border-b border-line pb-3">
                  <dt className="text-graphite">Estado de desarrollo</dt>
                  <dd className="font-bold text-ink">{app.status === "published" ? "Publicada" : "En preparación"}</dd>
                </div>
                <div className="flex justify-between gap-6 border-b border-line pb-3">
                  <dt className="text-graphite">Plataformas soportadas</dt>
                  <dd className="font-bold text-ink">{app.platform.join(", ")}</dd>
                </div>
                <div className="flex justify-between gap-6 border-b border-line pb-3">
                  <dt className="text-graphite">Público objetivo</dt>
                  <dd className="max-w-sm text-right font-bold text-ink">{app.audience}</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="text-graphite">Última actualización</dt>
                  <dd className="font-bold text-ink">{app.updatedAt}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">Ayuda</span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink">Preguntas de {app.name}</h2>
            <p className="mt-5 text-base leading-7 text-graphite">
              Respuestas directas y resolución de dudas sobre la aplicación.
            </p>
          </div>
          <FaqList items={app.faq} />
        </div>
      </section>
    </>
  );
}
