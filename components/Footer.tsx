"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { useLocale } from "@/lib/i18n";

export function Footer() {
  const { t } = useLocale();

  const footerGroups = [
    {
      title: t("footer.site"),
      links: [
        { href: "/apps", label: t("nav.apps") },
        { href: "/about", label: t("nav.about") },
        { href: "/contact", label: t("nav.contact") }
      ]
    },
    {
      title: t("footer.legal"),
      links: [
        { href: "/privacy", label: t("footer.privacy") },
        { href: "/terms", label: t("footer.terms") },
        { href: "/cookies", label: t("footer.cookies") }
      ]
    }
  ];

  return (
    <footer className="border-t border-line" style={{ backgroundColor: "var(--color-mist)" }}>
      <div className="container grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link className="flex items-center gap-2 text-2xl font-semibold text-ink" href="/">
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-blue to-brand-cyan text-white text-sm font-bold">
              LB
            </span>
            <span>Apps</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-graphite">{siteConfig.description}</p>
          <p className="mt-4 text-sm text-graphite">
            <a className="font-medium text-ink hover:text-brand-blue transition-colors" href={`mailto:${siteConfig.supportEmail}`}>
              {siteConfig.supportEmail}
            </a>
          </p>
        </div>
        {footerGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-semibold text-ink">{group.title}</h2>
            <ul className="mt-4 space-y-3 text-sm text-graphite">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link className="hover:text-brand-blue transition-colors" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container border-t border-line py-5 text-xs text-graphite">
        © {new Date().getFullYear()} {siteConfig.name}. {t("footer.rights")}
      </div>
    </footer>
  );
}
