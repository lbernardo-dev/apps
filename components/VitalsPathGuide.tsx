"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, CircleHelp, FileText, ShieldCheck } from "lucide-react";
import { AppIcon } from "@/components/AppIcon";
import { useLocale } from "@/lib/i18n";
import { getAppPath, getAppSubpagePath } from "@/lib/routes";
import type { AppGuideSection, AppItem } from "@/lib/types";

function GuideBody({ text }: { text: string }) {
  return (
    <div className="mt-4 space-y-3 text-sm leading-7 text-graphite">
      {text.split(/\r?\n/).map((line, index) => {
        const value = line.trim();
        if (!value) return null;
        if (value.startsWith("## ")) {
          return <h3 className="pt-2 text-base font-black text-ink" key={index}>{value.slice(3)}</h3>;
        }
        if (value.startsWith("- ")) {
          return <p className="border-l-2 border-brand-blue/30 pl-4" key={index}>{value.slice(2)}</p>;
        }
        return <p key={index}>{value}</p>;
      })}
    </div>
  );
}

export function VitalsPathGuide({ app }: { app: AppItem }) {
  const { locale } = useLocale();
  const isEs = locale === "es";
  const sections: AppGuideSection[] = (app.guideSections ?? [])
    .slice()
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  const links = [
    { href: getAppSubpagePath(app.slug, "privacy", locale), label: isEs ? "Privacidad" : "Privacy", icon: ShieldCheck },
    { href: getAppSubpagePath(app.slug, "terms", locale), label: isEs ? "Términos" : "Terms", icon: FileText },
    { href: getAppSubpagePath(app.slug, "subscriptions", locale), label: isEs ? "Planes y compras" : "Plans and purchases", icon: FileText },
    { href: getAppSubpagePath(app.slug, "faq", locale), label: "FAQ", icon: CircleHelp },
  ];

  return (
    <main className="section relative overflow-hidden bg-themed-white pt-24 md:pt-28">
      <div className="absolute inset-x-0 top-0 h-80 bg-[linear-gradient(180deg,var(--app-primary-soft),transparent)] opacity-80" aria-hidden="true" />
      <div className="container relative max-w-6xl">
        <Link href={getAppPath(app.slug, locale)} className="mb-8 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-graphite hover:text-brand-blue">
          <ArrowLeft size={16} aria-hidden="true" />
          {isEs ? `Volver a ${app.name}` : `Back to ${app.name}`}
        </Link>

        <header className="grid gap-8 border-b border-line pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <AppIcon app={app} size={52} className="border border-line shadow-soft" />
              <span className="text-xs font-black uppercase tracking-[.22em] text-brand-blue">{app.name} · {isEs ? "Centro de ayuda" : "Help center"}</span>
            </div>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-ink sm:text-6xl">
              {isEs ? "Guía de uso, privacidad y límites" : "Usage guide, privacy, and limits"}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-graphite">
              {isEs
                ? "Tutoriales prácticos para empezar, revisar tus registros y entender qué hacen las funciones de VitalsPath y dónde pueden fallar."
                : "Practical tutorials to get started, review your records, and understand what VitalsPath features do and where their limits are."}
            </p>
          </div>
          <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-brand-blue">
            <BookOpen size={16} aria-hidden="true" />
            {isEs ? "Abrir VitalsPath" : "Open VitalsPath"}
          </a>
        </header>

        <nav aria-label={isEs ? "Secciones de la guía" : "Guide sections"} className="my-8 flex flex-wrap gap-2">
          {sections.map((section) => (
            <a key={section.sectionKey ?? section.id ?? section.title} href={`#${section.sectionKey ?? section.id}`} className="rounded-full border border-line bg-themed-card px-4 py-2 text-xs font-bold text-graphite hover:border-brand-blue hover:text-brand-blue">
              {isEs ? section.title : section.titleEn ?? section.title}
            </a>
          ))}
        </nav>

        <div className="grid gap-5">
          {sections.map((section) => {
            const title = isEs ? section.title : section.titleEn ?? section.title;
            const body = isEs ? section.body : section.bodyEn ?? section.body;
            return (
              <section id={section.sectionKey ?? section.id} key={section.sectionKey ?? section.id ?? section.title} className="scroll-mt-24 rounded-2xl border border-line bg-themed-card p-6 shadow-card sm:p-8">
                <h2 className="text-2xl font-black tracking-tight text-ink">{title}</h2>
                <GuideBody text={body} />
              </section>
            );
          })}
        </div>

        <aside className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-sm leading-7 text-graphite">
          <h2 className="font-black text-ink">{isEs ? "Importante" : "Important"}</h2>
          <p className="mt-2">
            {isEs
              ? "No uses VitalsPath para tomar decisiones clínicas, cambiar dosis o gestionar una emergencia. Revisa los datos y consulta a un profesional sanitario."
              : "Do not use VitalsPath to make clinical decisions, change doses, or manage an emergency. Check your data and consult a healthcare professional."}
          </p>
        </aside>

        <nav aria-label={isEs ? "Más información sobre VitalsPath" : "More about VitalsPath"} className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {links.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-line bg-themed-card px-4 py-3 text-sm font-bold text-ink hover:border-brand-blue">
              <Icon size={16} className="text-brand-blue" aria-hidden="true" />{label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
