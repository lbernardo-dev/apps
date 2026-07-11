"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck, FileText, HelpCircle, LifeBuoy, Sparkles, Tag } from "lucide-react";
import { AppIcon } from "@/components/AppIcon";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { useLocale } from "@/lib/i18n";
import type { AppItem } from "@/lib/types";

export function AppFooter({ app }: { app: AppItem }) {
  const { t, locale } = useLocale();
  const description = locale === "en" && app.shortDescription_en ? app.shortDescription_en : app.shortDescription;
  const tagline = locale === "en" && app.tagline_en ? app.tagline_en : app.tagline;
  const primaryCta = locale === "en" && app.primaryCtaLabel_en ? app.primaryCtaLabel_en : app.primaryCtaLabel;

  const resources = [
    { href: `/apps/${app.slug}`, label: locale === "es" ? "Inicio" : "Home", icon: Sparkles },
    ...(app.pricing?.length ? [{ href: `/apps/${app.slug}#pricing`, label: locale === "es" ? "Planes y precios" : "Plans & pricing", icon: Tag }] : []),
    { href: `/apps/${app.slug}/faq`, label: locale === "es" ? "Preguntas frecuentes" : "FAQ", icon: HelpCircle },
    { href: `/apps/${app.slug}/support`, label: locale === "es" ? "Soporte técnico" : "Technical support", icon: LifeBuoy },
    ...(app.legal.subscriptions ? [{ href: `/apps/${app.slug}/subscriptions`, label: locale === "es" ? "Condiciones de suscripción" : "Subscription terms", icon: BadgeCheck }] : [])
  ];

  const legal = [
    { href: `/apps/${app.slug}/privacy`, label: locale === "es" ? "Política de privacidad" : "Privacy policy" },
    { href: `/apps/${app.slug}/terms`, label: locale === "es" ? "Términos y condiciones" : "Terms & conditions" }
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950 text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,var(--app-primary-soft),transparent_34%),radial-gradient(circle_at_88%_0%,var(--app-secondary-soft),transparent_30%)] opacity-70" aria-hidden="true" />

      <div className="container relative grid gap-10 py-14 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <div className="max-w-2xl">
          <Link className="group inline-flex items-center gap-4" href={`/apps/${app.slug}`}>
            <AppIcon app={app} size={64} className="border border-white/20 shadow-2xl shadow-black/35 transition-transform duration-300 group-hover:scale-105" />
            <span>
              <span className="block text-2xl font-black tracking-tight text-white">{app.name}</span>
              <span className="mt-1 block text-sm font-bold text-white/55">{tagline}</span>
            </span>
          </Link>

          <p className="mt-6 max-w-xl text-sm leading-7 text-slate-300">
            {description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {app.status === "published" && app.appStoreUrl ? (
              <a
                href={app.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <AppStoreBadge className="h-[42px]" />
              </a>
            ) : (
              <Link
                href={app.primaryCtaUrl || "/contact"}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-black text-slate-950 transition hover:bg-slate-200"
              >
                {primaryCta}
                <ArrowRight size={16} />
              </Link>
            )}
            <Link
              href={`/apps/${app.slug}/support`}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/15 px-5 py-2.5 text-sm font-black text-white transition hover:border-white/35 hover:bg-white/10"
            >
              <LifeBuoy size={16} />
              {t("app.support.cta")}
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-2 text-[11px] font-black uppercase tracking-wider text-white/60">
            {app.platform.map((platform) => (
              <span key={platform} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1">
                {platform}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <nav className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur" aria-label={locale === "es" ? "Recursos de la app" : "App resources"}>
            <h2 className="text-xs font-black uppercase tracking-[0.22em] text-white/50">{locale === "es" ? "Recursos" : "Resources"}</h2>
            <ul className="mt-5 grid gap-2">
              {resources.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link className="group flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.08] hover:text-white" href={item.href}>
                      <span className="flex size-8 items-center justify-center rounded-lg bg-white/[0.08] text-white/70 transition group-hover:bg-white group-hover:text-slate-950">
                        <Icon size={16} />
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <nav className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur" aria-label={locale === "es" ? "Legal" : "Legal"}>
            <h2 className="text-xs font-black uppercase tracking-[0.22em] text-white/50">{locale === "es" ? "Legal" : "Legal"}</h2>
            <ul className="mt-5 grid gap-2">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link className="group flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.08] hover:text-white" href={item.href}>
                    <span className="flex size-8 items-center justify-center rounded-lg bg-white/[0.08] text-white/70 transition group-hover:bg-white group-hover:text-slate-950">
                      <FileText size={16} />
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="container relative flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-slate-400 sm:flex-row">
        <div>
          © {new Date().getFullYear()} {app.name}. {locale === "es" ? "Todos los derechos reservados." : "All rights reserved."}
        </div>
        <div className="flex items-center gap-1.5">
          <span>{locale === "es" ? "Desarrollado por" : "Developed by"}</span>
          <Link href="/" className="font-bold text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white">
            Lester Romero Bernardo
          </Link>
        </div>
      </div>
    </footer>
  );
}
