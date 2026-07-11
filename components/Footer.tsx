"use client";

import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const { locale } = useLocale(); const es = locale === "es";
  return <footer className="overflow-hidden border-t border-white/10 bg-[#07101f] text-white">
    <div className="container py-16 sm:py-20">
      <div className="grid gap-14 lg:grid-cols-[1.3fr_.7fr]">
        <div><span className="text-xs font-black uppercase tracking-[.25em] text-cyan-300">RomeroDev · Product engineering</span><h2 className="mt-5 max-w-2xl text-4xl font-black leading-[1.02] tracking-[-.045em] sm:text-6xl">{es ? "Construyamos algo que merezca seguir evolucionando." : "Let’s build something worth evolving."}</h2><Link className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5" href="/contact">{es ? "Plantear un proyecto" : "Discuss a project"}<ArrowUpRight size={16} /></Link></div>
        <div className="grid grid-cols-2 gap-8 text-sm"><div><p className="text-xs font-black uppercase tracking-wider text-slate-500">{es ? "Explorar" : "Explore"}</p><div className="mt-5 grid gap-3 text-slate-300"><Link href="/apps">{es ? "Productos" : "Products"}</Link><Link href="/about">{es ? "Experiencia" : "Experience"}</Link><Link href="/contact">Contacto</Link></div></div><div><p className="text-xs font-black uppercase tracking-wider text-slate-500">Legal</p><div className="mt-5 grid gap-3 text-slate-300"><Link href="/privacy">{es ? "Privacidad" : "Privacy"}</Link><Link href="/terms">{es ? "Términos" : "Terms"}</Link><Link href="/cookies">Cookies</Link></div></div></div>
      </div>
      <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Lester Romero Bernardo · Valencia, España</p><div className="flex gap-2"><a className="flex size-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 hover:bg-white/10" href={`mailto:${siteConfig.supportEmail}`} aria-label="Email"><Mail size={15} /></a><a className="flex size-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 hover:bg-white/10" href="https://github.com/lbernardo-dev" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={15} /></a><a className="flex size-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 hover:bg-white/10" href="https://www.linkedin.com/in/lbernardo-cu" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={15} /></a></div></div>
    </div>
  </footer>;
}
