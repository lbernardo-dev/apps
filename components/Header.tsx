"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/lib/i18n";
import { getAssetPath } from "@/lib/site";
import { getStaticPath, getServicePath, SERVICES_SLUGS } from "@/lib/routes";

export function Header() {
  const { t, locale } = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const dark = isHome && !scrolled && !mobileOpen;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const services = [
    { id: "ios-development", label: locale === "es" ? "Desarrollo iOS" : "iOS Development" },
    { id: "salesforce-consulting", label: locale === "es" ? "Consultoría Salesforce" : "Salesforce Consulting" },
    { id: "app-audits", label: locale === "es" ? "Auditoría de apps" : "App Audits" },
    { id: "product-design", label: locale === "es" ? "Diseño de producto" : "Product Design" },
    { id: "integrations-and-automation", label: locale === "es" ? "Integración y automatización" : "Integrations & Automation" }
  ] as const;

  const navItems = [
    { href: `/${locale}/`, label: t("nav.home") },
    { href: getStaticPath("products", locale), label: t("nav.apps") },
    { href: getStaticPath("marketplace", locale), label: t("marketplace.nav") },
    { href: getStaticPath("about", locale), label: t("nav.about") },
    { href: getStaticPath("resources", locale), label: t("nav.resources") },
    { href: getStaticPath("contact", locale), label: t("nav.contact") }
  ];

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-500 ${dark ? "border-white/10 bg-[#07101f] text-white" : "border-line bg-[var(--color-header-bg)] text-ink shadow-[0_10px_40px_rgba(15,23,42,.05)] backdrop-blur-xl"}`}>
      <div className="container flex min-h-[72px] items-center justify-between gap-5">
        <Link className="group flex items-center gap-3" href={`/${locale}/`} aria-label="RomeroDev, inicio">
          <span className="relative size-10 overflow-hidden rounded-xl border border-white/10 shadow-lg transition group-hover:rotate-3">
            <Image src={getAssetPath("assets/brand/romerodev-mark.png")} alt="" fill unoptimized className="object-cover" />
          </span>
          <span className="leading-none">
            <strong className="block text-sm font-black tracking-tight">RomeroDev</strong>
            <span className={`mt-1 block text-[9px] font-bold uppercase tracking-[.2em] ${dark ? "text-slate-400" : "text-graphite"}`}>Product engineering</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 rounded-full border border-current/10 p-1 md:flex">
          {/* Home Link */}
          <Link className={`rounded-full px-3.5 py-2 text-xs font-bold transition ${dark ? "text-slate-300 hover:bg-white/10 hover:text-white" : "text-graphite hover:bg-themed-mist hover:text-ink"}`} href={`/${locale}/`}>
            {t("nav.home")}
          </Link>

          {/* Services Dropdown */}
          <div className="relative" ref={servicesDropdownRef}>
            <button
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
              aria-controls="services-menu"
              onClick={() => setServicesOpen(!servicesOpen)}
              className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-xs font-bold transition ${dark ? "text-slate-300 hover:bg-white/10 hover:text-white" : "text-graphite hover:bg-themed-mist hover:text-ink"}`}
              type="button"
            >
              <span>{t("nav.services")}</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
            </button>

            {servicesOpen && (
              <div id="services-menu" role="menu" className="absolute left-0 mt-2 w-60 rounded-2xl border border-line bg-themed-card p-2 shadow-soft backdrop-blur-xl">
                {services.map((svc) => (
                  <Link
                    key={svc.id}
                    href={getServicePath(svc.id, locale)}
                    className="block rounded-xl px-4 py-2.5 text-xs font-bold text-graphite hover:bg-themed-mist hover:text-ink transition"
                    onClick={() => setServicesOpen(false)}
                  >
                    {svc.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Other Nav Items */}
          {navItems.slice(1).map(item => (
            <Link className={`rounded-full px-3.5 py-2 text-xs font-bold transition ${dark ? "text-slate-300 hover:bg-white/10 hover:text-white" : "text-graphite hover:bg-themed-mist hover:text-ink"}`} href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher /><ThemeToggle />
          <Link className={`ml-1 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition hover:-translate-y-0.5 ${dark ? "bg-white text-slate-950" : "bg-brand-blue text-white"}`} href={getStaticPath("contact", locale)}>
            {locale === "es" ? "Hablemos" : "Let’s talk"}
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <button aria-controls="mobile-navigation" aria-expanded={mobileOpen} aria-label={mobileOpen ? (locale === "es" ? "Cerrar menú" : "Close menu") : (locale === "es" ? "Abrir menú" : "Open menu")} className={`flex size-11 items-center justify-center rounded-xl border md:hidden ${dark ? "border-white/15 text-white" : "border-line text-ink"}`} onClick={() => setMobileOpen(!mobileOpen)} type="button">
          {mobileOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-navigation" className="border-t border-line bg-themed-card md:hidden max-h-[85vh] overflow-y-auto">
          <nav className="container grid gap-1 py-4">
            <Link className="rounded-xl px-4 py-3 text-sm font-bold text-graphite hover:bg-themed-mist hover:text-ink" href={`/${locale}/`} onClick={() => setMobileOpen(false)}>
              {t("nav.home")}
            </Link>

            {/* Localized Services Expandable Submenu in Mobile */}
            <div className="rounded-xl px-4 py-2 text-sm font-bold text-graphite">
              <span className="text-xs uppercase tracking-wider text-slate-400 block mb-2">{t("nav.services")}</span>
              <div className="grid gap-1 pl-3 border-l border-line">
                {services.map((svc) => (
                  <Link
                    key={svc.id}
                    href={getServicePath(svc.id, locale)}
                    className="py-2 text-xs font-bold text-graphite hover:text-ink transition"
                    onClick={() => setMobileOpen(false)}
                  >
                    {svc.label}
                  </Link>
                ))}
              </div>
            </div>

            {navItems.slice(1).map(item => (
              <Link className="rounded-xl px-4 py-3 text-sm font-bold text-graphite hover:bg-themed-mist hover:text-ink" href={item.href} key={item.href} onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ))}

            <div className="mt-3 flex items-center justify-between border-t border-line px-4 pt-4">
              <div className="flex gap-2">
                <LanguageSwitcher /><ThemeToggle />
              </div>
              <Link className="font-black text-brand-blue" href={getStaticPath("contact", locale)} onClick={() => setMobileOpen(false)}>
                {locale === "es" ? "Hablemos" : "Let’s talk"}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
