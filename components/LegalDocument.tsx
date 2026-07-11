"use client";

import Link from "next/link";
import { ArrowLeft, FileCheck2, ShieldCheck } from "lucide-react";
import { AppIcon } from "@/components/AppIcon";
import { useLocale } from "@/lib/i18n";
import type { AppItem } from "@/lib/types";

type LegalDocumentProps = {
  title: string;
  updatedAt: string;
  body: string[] | string;
  backUrl?: string;
  backLabel?: string;
  appName?: string;
  app?: AppItem;
};

export function LegalDocument({ title, updatedAt, body, backUrl, backLabel, appName, app }: LegalDocumentProps) {
  const { locale } = useLocale();
  const isHtml = typeof body === "string";
  const displayName = app?.name || appName;

  return (
    <section className="section relative overflow-hidden bg-themed-white pt-24 md:pt-28">
      <div className="absolute inset-x-0 top-0 h-72 bg-[linear-gradient(180deg,var(--app-primary-soft),transparent)] opacity-70" aria-hidden="true" />
      <div className="container relative max-w-5xl">
        {backUrl && (
          <div className="mb-8">
            <Link 
              href={backUrl} 
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-graphite hover:text-brand-blue transition-colors group"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              <span>
                {backLabel || 
                  (locale === "es" 
                    ? `Volver a ${displayName || "la App"}` 
                    : `Back to ${displayName || "App"}`)}
              </span>
            </Link>
          </div>
        )}

        <div className="grid gap-8 border-b border-line pb-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            {app ? (
              <div className="mb-6 flex items-center gap-4">
                <AppIcon app={app} size={64} className="border border-line shadow-soft" />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-blue">{app.name}</p>
                  <p className="mt-1 text-sm font-bold text-graphite">{locale === "en" && app.tagline_en ? app.tagline_en : app.tagline}</p>
                </div>
              </div>
            ) : (
              <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                <ShieldCheck size={24} aria-hidden="true" />
              </div>
            )}
            <h1 className="text-4xl font-black tracking-tight text-ink sm:text-5xl">{title}</h1>
            <p className="mt-4 text-sm font-bold text-graphite">
              {locale === "es" ? "Última actualización" : "Last updated"}: {updatedAt}
            </p>
          </div>

          <aside className="rounded-lg border border-line bg-themed-card p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                <FileCheck2 size={20} aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-sm font-black text-ink">{locale === "es" ? "Documento oficial" : "Official document"}</h2>
                <p className="mt-2 text-sm leading-6 text-graphite">
                  {locale === "es"
                    ? "Información legal, privacidad, compras y uso del servicio para usuarios de la app."
                    : "Legal, privacy, purchase and service-use information for app users."}
                </p>
              </div>
            </div>
          </aside>
        </div>

        {isHtml ? (
          <div
            className="prose prose-slate mt-10 max-w-none text-base leading-8 text-[var(--color-graphite)] [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-[var(--color-ink)] [&_strong]:text-[var(--color-ink)]"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        ) : (
          <div className="mt-10 grid gap-5 text-base leading-8 text-graphite">
            {body.map((paragraph) => paragraph.startsWith("## ") ? (
              <h2 className="mt-6 text-2xl font-black tracking-tight text-ink" key={paragraph}>{paragraph.slice(3)}</h2>
            ) : paragraph.startsWith("- ") ? (
              <p className="border-l-2 border-brand-blue/30 pl-4" key={paragraph}>{paragraph.slice(2)}</p>
            ) : (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
