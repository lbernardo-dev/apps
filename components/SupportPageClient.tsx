"use client";

import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { useLocale } from "@/lib/i18n";
import type { AppItem } from "@/lib/types";

export function SupportPageClient({ app }: { app: AppItem }) {
  const { t, locale } = useLocale();

  return (
    <section className="section bg-themed-white pt-24 md:pt-28">
      <div className="container max-w-3xl">
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

        <Mail aria-hidden="true" className="text-[var(--color-brand-blue)]" size={36} />
        <h1 className="mt-5 text-5xl font-semibold tracking-tight text-[var(--color-ink)]">
          {t("support.title")} {app.name}
        </h1>
        <p className="mt-5 text-lg leading-8 text-[var(--color-graphite)]">
          {t("support.body")}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`mailto:${app.supportEmail}`}>{t("support.email")}</ButtonLink>
          <ButtonLink href={`/apps/${app.slug}/faq`} variant="secondary">
            {t("support.faq")}
          </ButtonLink>
        </div>
        <div className="mt-10 rounded-lg border border-[var(--color-line)] bg-[var(--color-mist)] p-6">
          <h2 className="text-xl font-semibold text-[var(--color-ink)]">{t("support.info.title")}</h2>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-[var(--color-graphite)]">
            <li>{t("support.info.app")} {app.name}</li>
            <li>{t("support.info.platform")} {app.platform.join(", ")}</li>
            <li>{t("support.info.email")} {app.supportEmail}</li>
            <li>{t("support.info.updated")} {app.updatedAt}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
