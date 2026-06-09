"use client";

import Link from "next/link";
import { ArrowUpRight, Star, ArrowRight } from "lucide-react";
import type { AppItem } from "@/lib/types";
import { ButtonLink } from "@/components/ButtonLink";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { useLocale } from "@/lib/i18n";
import { getAssetPath } from "@/lib/site";

export function AppCard({ app }: { app: AppItem }) {
  const { t } = useLocale();
  const isPublished = app.status === "published";
  const isComingSoon = app.status === "coming_soon";

  const statusLabel = isPublished
    ? t("apps.card.published")
    : isComingSoon
    ? t("apps.card.coming_soon")
    : t("apps.card.draft");

  const statusColor = isPublished
    ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
    : isComingSoon
    ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20"
    : "bg-slate-500/10 text-slate-500 dark:text-slate-400 border border-slate-500/20";

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft hover:shadow-[0_30px_60px_rgba(15,23,42,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
      {/* Visual Stripe indicator */}
      <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-400 to-indigo-500" />

      <div className="flex flex-1 gap-5 items-start">
        {/* App Squircle Icon */}
        <div className="relative flex size-20 shrink-0 items-center justify-center bg-gradient-to-tr from-sky-500 to-teal-500 text-white text-3xl font-black shadow-lg apple-squircle transition-transform duration-300 group-hover:scale-105">
          {app.slug === "vitalspath" ? (
            <img
              src={getAssetPath("assets/images/vitalspath/AppIcon_v2.png")}
              alt={app.name}
              className="absolute inset-0 w-full h-full object-cover rounded-[1.2rem]"
            />
          ) : (
            app.name.slice(0, 1).toUpperCase()
          )}
          {/* Subtle reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-bold tracking-tight text-[var(--color-ink)] group-hover:text-[var(--color-brand-blue)] transition-colors truncate">
              {app.name}
            </h2>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase ${statusColor}`}>
              {statusLabel}
            </span>
          </div>

          <p className="mt-1 text-xs font-semibold text-[var(--color-brand-blue)]">{app.category}</p>
          <p className="mt-3 text-sm leading-6 text-[var(--color-graphite)] max-w-2xl">{app.shortDescription}</p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[var(--color-graphite)]">
            <span className="flex items-center gap-1 text-amber-400">
              <Star aria-hidden="true" size={13} fill="currentColor" />
              <span className="font-bold text-[var(--color-ink)]">4.9</span>
            </span>
            <span className="text-[var(--color-graphite)]">•</span>
            <div className="flex gap-1.5">
              {app.platform.map((platform) => (
                <span className="rounded bg-[var(--color-bg)]/60 border border-[var(--color-line)] px-2 py-0.5 font-medium text-[var(--color-graphite)]" key={platform}>
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t border-[var(--color-line)] md:border-t-0 justify-end items-center">
        <ButtonLink 
          href={`/apps/${app.slug}`} 
          variant="secondary"
          className="flex-1 md:flex-initial text-xs py-2 px-4 w-full text-center"
        >
          {t("apps.card.details")}
        </ButtonLink>
        {isPublished && app.appStoreUrl && (
          <a
            href={app.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-initial inline-flex items-center justify-center transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97]"
          >
            <AppStoreBadge className="h-[36px]" />
          </a>
        )}
      </div>
    </article>
  );
}
