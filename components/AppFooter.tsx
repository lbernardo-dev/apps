"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import type { AppItem } from "@/lib/types";

export function AppFooter({ app }: { app: AppItem }) {
  const { t, locale } = useLocale();

  return (
    <footer className="border-t border-line" style={{ backgroundColor: "var(--color-mist)" }}>
      <div className="container grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        {/* Brand ribbon & Description */}
        <div>
          <Link className="flex items-center gap-2 text-2xl font-semibold text-ink" href={`/apps/${app.slug}`}>
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-blue to-brand-cyan text-white text-sm font-bold">
              {app.name.slice(0, 1).toUpperCase()}
            </span>
            <span>{app.name}</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-graphite">
            {locale === "en" && app.shortDescription_en ? app.shortDescription_en : app.shortDescription}
          </p>
          {app.status === "published" && app.appStoreUrl && (
            <div className="mt-6">
              <a
                href={app.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97]"
              >
                <AppStoreBadge className="h-[40px]" />
              </a>
            </div>
          )}
        </div>

        {/* Resources links */}
        <div>
          <h2 className="text-sm font-semibold text-ink">{locale === "es" ? "Recursos" : "Resources"}</h2>
          <ul className="mt-4 space-y-3 text-sm text-graphite">
            <li>
              <Link className="hover:text-brand-blue transition-colors" href={`/apps/${app.slug}`}>
                {locale === "es" ? "Inicio" : "Home"}
              </Link>
            </li>
            <li>
              <Link className="hover:text-brand-blue transition-colors" href={`/apps/${app.slug}/faq`}>
                {locale === "es" ? "Preguntas Frecuentes (FAQ)" : "FAQ"}
              </Link>
            </li>
            <li>
              <Link className="hover:text-brand-blue transition-colors" href={`/apps/${app.slug}/support`}>
                {locale === "es" ? "Soporte Técnico" : "Technical Support"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal links */}
        <div>
          <h2 className="text-sm font-semibold text-ink">{locale === "es" ? "Legal" : "Legal"}</h2>
          <ul className="mt-4 space-y-3 text-sm text-graphite">
            <li>
              <Link className="hover:text-brand-blue transition-colors" href={`/apps/${app.slug}/privacy`}>
                {locale === "es" ? "Política de Privacidad" : "Privacy Policy"}
              </Link>
            </li>
            <li>
              <Link className="hover:text-brand-blue transition-colors" href={`/apps/${app.slug}/terms`}>
                {locale === "es" ? "Términos y Condiciones" : "Terms & Conditions"}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Developer backlink */}
      <div className="container border-t border-line py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-graphite">
        <div>
          © {new Date().getFullYear()} {app.name}. {locale === "es" ? "Todos los derechos reservados." : "All rights reserved."}
        </div>
        <div className="flex items-center gap-1.5">
          <span>{locale === "es" ? "Desarrollado por" : "Developed by"}</span>
          <Link href="/" className="font-semibold text-ink hover:text-brand-blue transition-colors underline">
            Lester Romero Bernardo
          </Link>
        </div>
      </div>
    </footer>
  );
}
