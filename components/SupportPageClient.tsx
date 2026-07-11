"use client";

import { Mail, ArrowLeft, Clock3, HelpCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { AppIcon } from "@/components/AppIcon";
import { ButtonLink } from "@/components/ButtonLink";
import { useLocale } from "@/lib/i18n";
import type { AppItem } from "@/lib/types";

export function SupportPageClient({ app }: { app: AppItem }) {
  const { t, locale } = useLocale();

  return (
    <section className="section relative overflow-hidden bg-themed-white pt-24 md:pt-28">
      <div className="absolute inset-x-0 top-0 h-80 bg-[linear-gradient(180deg,var(--app-primary-soft),transparent)] opacity-80" aria-hidden="true" />
      <div className="container relative max-w-5xl">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            href={`/apps/${app.slug}/`} 
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-graphite hover:text-brand-blue transition-colors group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            <span>{locale === "es" ? `Volver a ${app.name}` : `Back to ${app.name}`}</span>
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="flex items-center gap-4">
              <AppIcon app={app} size={76} className="border border-line shadow-soft" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-blue">{app.name}</p>
                <h1 className="mt-2 text-4xl font-black tracking-tight text-ink sm:text-5xl">
                  {t("support.title")}
                </h1>
              </div>
            </div>
            <p className="mt-6 text-base leading-8 text-graphite">
              {t("support.body")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`mailto:${app.supportEmail}`}>{t("support.email")}</ButtonLink>
              <ButtonLink href={`/apps/${app.slug}/faq`} variant="secondary">
                {t("support.faq")}
              </ButtonLink>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-lg border border-line bg-themed-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                  <Mail size={20} aria-hidden="true" />
                </div>
                <h2 className="text-xl font-black text-ink">{t("support.info.title")}</h2>
              </div>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-graphite">
                <li className="flex items-start gap-3"><ShieldCheck className="mt-1 text-brand-green" size={16} />{t("support.info.app")} {app.name}</li>
                <li className="flex items-start gap-3"><HelpCircle className="mt-1 text-brand-blue" size={16} />{t("support.info.platform")} {app.platform.join(", ")}</li>
                <li className="flex items-start gap-3"><Mail className="mt-1 text-brand-blue" size={16} />{t("support.info.email")} {app.supportEmail}</li>
                <li className="flex items-start gap-3"><Clock3 className="mt-1 text-brand-blue" size={16} />{t("support.info.updated")} {app.updatedAt}</li>
              </ul>
            </div>

            <div className="rounded-lg border border-line bg-themed-mist p-5 text-sm leading-6 text-graphite">
              {locale === "es"
                ? "Para incidencias, incluye modelo de dispositivo, versión de iOS/watchOS y pasos para reproducir el problema."
                : "For issues, include device model, iOS/watchOS version and steps to reproduce the problem."}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
