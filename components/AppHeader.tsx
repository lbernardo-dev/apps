"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/lib/i18n";
import { getAssetPath } from "@/lib/site";
import type { AppItem } from "@/lib/types";

export function AppHeader({ app }: { app: AppItem }) {
  const { locale } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: `/apps/${app.slug}`, label: locale === "es" ? "Inicio" : "Home" },
    { href: `/apps/${app.slug}#features`, label: locale === "es" ? "Características" : "Features" },
    ...(app.pricing?.length ? [{ href: `/apps/${app.slug}#pricing`, label: locale === "es" ? "Precios" : "Pricing" }] : []),
    { href: `/apps/${app.slug}/faq`, label: locale === "es" ? "FAQ" : "FAQ" },
    { href: `/apps/${app.slug}/support`, label: locale === "es" ? "Soporte" : "Support" },
    { href: `/apps/${app.slug}/privacy`, label: locale === "es" ? "Privacidad" : "Privacy" }
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${
        scrolled ? "py-2.5 border-line bg-themed-white/80 shadow-sm" : "py-4 border-transparent bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between gap-4">
        {/* App Logo & Title */}
        <Link className="flex items-center gap-3 group" href={`/apps/${app.slug}`}>
          <div className="relative flex size-9 shrink-0 items-center justify-center bg-gradient-to-tr from-sky-500 to-teal-500 text-white text-base font-black shadow-md apple-squircle overflow-hidden border border-line/20 group-hover:scale-105 transition-transform duration-300">
            {app.iconUrl ? (
              <img
                src={getAssetPath(app.iconUrl)}
                alt={app.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : app.slug === "vitalspath" ? (
              <img
                src={getAssetPath("assets/images/vitalspath/AppIcon_v2.png")}
                alt={app.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              app.name.slice(0, 1).toUpperCase()
            )}
          </div>
          <span className="font-extrabold tracking-wider text-xs sm:text-sm uppercase text-ink group-hover:text-brand-blue transition-colors">
            {app.name}
          </span>
        </Link>

        {/* Local App Nav */}
        <nav aria-label="App local navigation" className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              className="text-xs font-bold uppercase tracking-wider text-graphite hover:text-ink transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand-blue hover:after:w-full after:transition-all after:duration-300"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="hidden items-center gap-3 sm:flex">
          {/* Back to main portfolio */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line text-[11px] font-bold uppercase tracking-wider text-graphite hover:text-brand-blue hover:border-brand-blue transition-all"
          >
            <ArrowLeft size={12} />
            <span>Lester Bernardo</span>
          </Link>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-line text-graphite hover:text-ink"
            onClick={() => setMobileOpen(!mobileOpen)}
            type="button"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-line md:hidden animate-fade-in-up bg-themed-card">
          <nav className="container flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                className="rounded-lg px-4 py-3 text-xs font-bold uppercase tracking-wider text-graphite transition-colors hover:text-ink hover:bg-brand-blue/5"
                href={item.href}
                key={item.href}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center justify-between border-t border-line px-4 pt-4">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-graphite hover:text-brand-blue"
              >
                <ArrowLeft size={12} />
                <span>Portfolio Lester</span>
              </Link>
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
