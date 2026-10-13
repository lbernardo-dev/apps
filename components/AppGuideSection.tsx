"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, AlertCircle, Info } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { getAppSubpagePath } from "@/lib/routes";
import type { AppGuideNote, AppItem } from "@/lib/types";

function localized(es: string, en: string | undefined, isEs: boolean) {
  return !isEs && en ? en : es;
}

function GuideNoticeGroup({
  title,
  items,
  isEs,
  tone
}: {
  title: string;
  items: AppGuideNote[];
  isEs: boolean;
  tone: "note" | "limit";
}) {
  const Icon = tone === "limit" ? AlertCircle : Info;
  const iconClass = tone === "limit" ? "text-amber-600" : "text-brand-blue";
  return (
    <section className="rounded-3xl border border-line bg-themed-card p-6 shadow-soft sm:p-8" aria-label={title}>
      <h3 className="flex items-center gap-3 text-xl font-black tracking-tight text-ink">
        <span className={"flex size-10 shrink-0 items-center justify-center rounded-xl bg-themed-mist " + iconClass}>
          <Icon size={19} aria-hidden="true" />
        </span>
        {title}
      </h3>
      <ul className="mt-6 grid gap-5">
        {items.map((item) => (
          <li key={item.title} className="border-t border-line pt-5 first:border-0 first:pt-0">
            <h4 className="text-sm font-black text-ink">{localized(item.title, item.title_en, isEs)}</h4>
            <p className="mt-2 text-sm leading-7 text-graphite">{localized(item.body, item.body_en, isEs)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AppGuideSection({ app }: { app: AppItem }) {
  const { locale } = useLocale();
  const guide = app.guide;
  if (!guide) return null;

  const isEs = locale === "es";
  const helpUrl = getAppSubpagePath(app.slug, "faq", locale);
  const supportUrl = getAppSubpagePath(app.slug, "support", locale);

  return (
    <section id="product-guide" className="section scroll-mt-24 relative overflow-hidden border-b border-line bg-themed-mist" aria-labelledby="product-guide-heading">
      <div className="absolute inset-x-0 top-0 h-64 bg-[linear-gradient(180deg,var(--app-primary-soft),transparent)] opacity-80" aria-hidden="true" />
      <div className="container relative z-10">
        <header className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-brand-blue">
            <BookOpen size={15} aria-hidden="true" />
            {isEs ? "Guía de uso y documentación" : "User guide and documentation"}
          </span>
          <h2 id="product-guide-heading" className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-5xl">
            {localized(guide.title, guide.title_en, isEs)}
          </h2>
          <p className="mt-5 text-base leading-8 text-graphite">
            {localized(guide.intro, guide.intro_en, isEs)}
          </p>
        </header>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {guide.tutorials.map((tutorial, index) => (
            <article key={tutorial.id} className="rounded-3xl border border-line bg-themed-card p-6 shadow-soft sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-sm font-black text-brand-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-black tracking-tight text-ink">{localized(tutorial.title, tutorial.title_en, isEs)}</h3>
                  <p className="mt-2 text-sm leading-6 text-graphite">{localized(tutorial.summary, tutorial.summary_en, isEs)}</p>
                </div>
              </div>
              <ol className="mt-6 grid gap-4">
                {tutorial.steps.map((step, stepIndex) => (
                  <li key={step.title} className="flex items-start gap-3 border-t border-line pt-4 first:border-0 first:pt-0">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-[11px] font-black text-brand-green">
                      {stepIndex + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold leading-6 text-ink">{localized(step.title, step.title_en, isEs)}</h4>
                      <p className="mt-1 text-sm leading-6 text-graphite">{localized(step.body, step.body_en, isEs)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-2">
          <GuideNoticeGroup
            title={isEs ? "Notas y aclaraciones" : "Notes and clarifications"}
            items={guide.notes}
            isEs={isEs}
            tone="note"
          />
          <GuideNoticeGroup
            title={isEs ? "Limitaciones actuales" : "Current limitations"}
            items={guide.limitations}
            isEs={isEs}
            tone="limit"
          />
        </div>

        <nav className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6" aria-label={isEs ? "Ayuda de Culmina" : "Culmina help"}>
          <Link href={helpUrl} className="inline-flex items-center gap-2 text-sm font-black text-brand-blue transition hover:text-ink">
            {isEs ? "Ver todas las preguntas frecuentes" : "Read all frequently asked questions"}
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <Link href={supportUrl} className="inline-flex items-center gap-2 text-sm font-bold text-graphite transition hover:text-ink">
            {isEs ? "Contactar con soporte" : "Contact support"}
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </section>
  );
}
