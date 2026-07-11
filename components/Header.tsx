"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/lib/i18n";

export function Header() {
  const { t, locale } = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const dark = isHome && !scrolled && !mobileOpen;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", handleScroll, { passive: true });
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
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-500 ${dark ? "border-white/10 bg-[#07101f] text-white" : "border-line bg-[var(--color-header-bg)] text-ink shadow-[0_10px_40px_rgba(15,23,42,.05)] backdrop-blur-xl"}`}>
      <div className="container flex min-h-[72px] items-center justify-between gap-5">
        <Link className="group flex items-center gap-3" href="/" aria-label="RomeroDev, inicio">
          <span className={`flex size-10 items-center justify-center rounded-xl border font-black tracking-[-.08em] transition group-hover:rotate-3 ${dark ? "border-white/15 bg-white text-slate-950" : "border-line bg-ink text-[var(--background)]"}`}>R<span className="text-brand-blue">.</span></span>
          <span className="leading-none"><strong className="block text-sm font-black tracking-tight">RomeroDev</strong><span className={`mt-1 block text-[9px] font-bold uppercase tracking-[.2em] ${dark ? "text-slate-400" : "text-graphite"}`}>Product engineering</span></span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 rounded-full border border-current/10 p-1 md:flex">
          {navItems.map(item => <Link className={`rounded-full px-4 py-2 text-xs font-bold transition ${dark ? "text-slate-300 hover:bg-white/10 hover:text-white" : "text-graphite hover:bg-themed-mist hover:text-ink"}`} href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher /><ThemeToggle />
          <Link className={`ml-1 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition hover:-translate-y-0.5 ${dark ? "bg-white text-slate-950" : "bg-brand-blue text-white"}`} href="/contact">{locale === "es" ? "Hablemos" : "Let’s talk"}<ArrowUpRight size={14} /></Link>
        </div>

        <button aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"} className={`flex size-10 items-center justify-center rounded-xl border md:hidden ${dark ? "border-white/15 text-white" : "border-line text-ink"}`} onClick={() => setMobileOpen(!mobileOpen)} type="button">{mobileOpen ? <X size={19} /> : <Menu size={19} />}</button>
      </div>

      {mobileOpen ? <div className="border-t border-line bg-themed-card md:hidden"><nav className="container grid gap-1 py-4">{navItems.map(item => <Link className="rounded-xl px-4 py-3 text-sm font-bold text-graphite hover:bg-themed-mist hover:text-ink" href={item.href} key={item.href} onClick={() => setMobileOpen(false)}>{item.label}</Link>)}<div className="mt-3 flex items-center justify-between border-t border-line px-4 pt-4"><div className="flex gap-2"><LanguageSwitcher /><ThemeToggle /></div><Link className="font-black text-brand-blue" href="/contact">{locale === "es" ? "Hablemos" : "Let’s talk"}</Link></div></nav></div> : null}
    </header>
  );
}
