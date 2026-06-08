"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/lib/i18n";

export function Header() {
  const { t } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/apps", label: t("nav.apps") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") }
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-all duration-300 ${
        scrolled ? "header-shrink border-line" : "border-transparent"
      }`}
      style={{ backgroundColor: "var(--color-header-bg)" }}
    >
      <div className="container flex min-h-16 items-center justify-between gap-4 py-2">
        {/* Logo */}
        <Link className="group flex items-center gap-2 text-2xl font-semibold tracking-tight text-ink" href="/">
          <span className="relative flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-blue to-brand-cyan text-white text-base font-bold shadow-[0_2px_10px_rgba(59,130,246,0.3)] group-hover:scale-105 transition-transform duration-300">
            LB
          </span>
          <span className="font-semibold tracking-tight hover:text-brand-blue transition-colors">Apps</span>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              className="relative py-1 text-sm font-medium text-graphite transition hover:text-ink after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand-blue hover:after:w-full after:transition-all after:duration-300"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 sm:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <ButtonLink href="/contact" showArrow={false}>
            {t("nav.cta")}
          </ButtonLink>
        </div>

        {/* Mobile Hamburger */}
        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="inline-flex size-10 items-center justify-center rounded-lg border border-line text-graphite transition-colors hover:text-ink md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          type="button"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-line md:hidden animate-fade-in-up" style={{ backgroundColor: "var(--color-card)" }}>
          <nav className="container flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                className="rounded-lg px-4 py-3 text-sm font-medium text-graphite transition-colors hover:text-ink hover:bg-brand-blue/5"
                href={item.href}
                key={item.href}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center gap-3 border-t border-line px-4 pt-4">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <div className="mt-3 px-4">
              <ButtonLink href="/contact" showArrow={false} className="w-full text-center">
                {t("nav.cta")}
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
