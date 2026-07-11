"use client";

import Link from "next/link";
import { ArrowLeft, HelpCircle, LifeBuoy, Sparkles } from "lucide-react";
import { AppIcon } from "@/components/AppIcon";
import { FaqList } from "@/components/FaqList";
import { useLocale } from "@/lib/i18n";
import { getAppPath, getAppSubpagePath } from "@/lib/routes";
import type { AppItem } from "@/lib/types";

export function AppFaqClient({ app }: { app: AppItem }) {
  const { locale } = useLocale();

  const isEs = locale === "es";

  return (
    <section className="section relative overflow-hidden bg-themed-white pt-24 md:pt-28">
      <div className="absolute inset-x-0 top-0 h-80 bg-[linear-gradient(180deg,var(--app-primary-soft),transparent)] opacity-80" aria-hidden="true" />
      <div className="container relative max-w-5xl animate-fade-in-up">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            href={getAppPath(app.slug, locale)} 
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-graphite hover:text-brand-blue transition-colors group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            <span>{isEs ? `Volver a ${app.name}` : `Back to ${app.name}`}</span>
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <div className="flex items-center gap-4">
              <AppIcon app={app} size={72} className="border border-line shadow-soft" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-blue">{app.name}</p>
                <h1 className="mt-2 text-4xl font-black tracking-tight text-ink sm:text-5xl">
                  {isEs ? "FAQ" : "FAQ"}
                </h1>
              </div>
            </div>
            <p className="mt-6 text-base leading-8 text-graphite">
              {isEs
                ? "Respuestas directas sobre uso, publicación, soporte, suscripciones y privacidad."
                : "Direct answers about usage, release status, support, subscriptions and privacy."}
            </p>
            <div className="mt-7 grid gap-3">
              <Link className="group flex items-center justify-between rounded-lg border border-line bg-themed-card p-4 text-sm font-black text-ink shadow-sm transition hover:border-brand-blue/35" href={getAppSubpagePath(app.slug, "support", locale)}>
                <span className="inline-flex items-center gap-3"><LifeBuoy size={18} className="text-brand-blue" />{isEs ? "Abrir soporte" : "Open support"}</span>
                <Sparkles size={16} className="text-graphite transition group-hover:text-brand-blue" />
              </Link>
              <Link className="group flex items-center justify-between rounded-lg border border-line bg-themed-card p-4 text-sm font-black text-ink shadow-sm transition hover:border-brand-blue/35" href={getAppSubpagePath(app.slug, "privacy", locale)}>
                <span className="inline-flex items-center gap-3"><HelpCircle size={18} className="text-brand-blue" />{isEs ? "Privacidad" : "Privacy"}</span>
                <Sparkles size={16} className="text-graphite transition group-hover:text-brand-blue" />
              </Link>
            </div>
          </aside>

          <div>
            <div className="mb-6 flex flex-wrap gap-2 text-[11px] font-black uppercase tracking-wider text-graphite">
              {app.platform.map((platform) => (
                <span key={platform} className="rounded-lg border border-line bg-themed-mist px-3 py-1">
                  {platform}
                </span>
              ))}
              <span className="rounded-lg border border-brand-green/20 bg-brand-green/10 px-3 py-1 text-brand-green">
                {app.status === "published" ? (isEs ? "Disponible" : "Available") : (isEs ? "Próximamente" : "Coming soon")}
              </span>
            </div>
            <FaqList items={app.faq} />
          </div>
        </div>
      </div>
    </section>
  );
}
