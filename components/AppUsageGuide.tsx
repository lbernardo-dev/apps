"use client";

import Link from "next/link";
import { BookOpen, ChevronRight, Info, ShieldCheck } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { getAppSubpagePath } from "@/lib/routes";
import type { AppItem } from "@/lib/types";

export function AppUsageGuide({ app }: { app: AppItem }) {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const tutorials = app.tutorials ?? [];
  const disclosures = app.disclosures ?? [];

  if (!tutorials.length && !disclosures.length) return null;

  const documents = [
    { key: "faq" as const, label: isEn ? "Frequently asked questions" : "Preguntas frecuentes" },
    { key: "support" as const, label: isEn ? "Support" : "Soporte" },
    { key: "privacy" as const, label: isEn ? "Privacy policy" : "Privacidad" },
    { key: "terms" as const, label: isEn ? "Terms of use" : "Términos de uso" },
    ...(app.legal.subscriptions
      ? [{ key: "subscriptions" as const, label: isEn ? "Subscription terms" : "Condiciones de suscripción" }]
      : []),
  ];

  return (
    <>
      {tutorials.length > 0 && (
        <section id="guide" className="scroll-mt-24 section border-b border-line bg-themed-mist">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/15 bg-brand-blue/5 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-brand-blue">
                <BookOpen size={14} aria-hidden="true" />
                {isEn ? "Product guide" : "Guía del producto"}
              </span>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                {isEn ? "Get more from StreakReps" : "Sácale más partido a StreakReps"}
              </h2>
              <p className="mt-4 text-base leading-7 text-graphite">
                {isEn
                  ? "Short, practical walkthroughs for planning, logging, reviewing progress, and using optional integrations."
                  : "Guías breves para planificar, registrar tus sesiones, revisar el progreso y usar las integraciones opcionales."}
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {tutorials.map((tutorial, index) => {
                const title = isEn ? tutorial.title_en : tutorial.title;
                const summary = isEn ? tutorial.summary_en : tutorial.summary;
                const steps = isEn ? tutorial.steps_en : tutorial.steps;
                return (
                  <article key={tutorial.id} className="rounded-2xl border border-line bg-themed-card p-6 shadow-sm">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-brand-blue/10 text-sm font-black text-brand-blue" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-4 text-lg font-black leading-snug text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-graphite">{summary}</p>
                    <ol className="mt-5 space-y-3 border-t border-line pt-5">
                      {steps.map((step, stepIndex) => (
                        <li key={`${tutorial.id}-${stepIndex}`} className="flex gap-3 text-sm leading-6 text-graphite">
                          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-themed-mist text-[11px] font-black text-ink" aria-hidden="true">
                            {stepIndex + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {disclosures.length > 0 && (
        <section id="notes" className="scroll-mt-24 section border-b border-line bg-themed-white">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-amber-700">
                  <Info size={14} aria-hidden="true" />
                  {isEn ? "Notes and limitations" : "Notas y limitaciones"}
                </span>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                  {isEn ? "Know what each feature needs" : "Qué necesita cada función"}
                </h2>
                <p className="mt-4 text-base leading-7 text-graphite">
                  {isEn
                    ? "Permissions are optional and device features vary. These notes explain how measurements, location, backups, and online services work."
                    : "Los permisos son opcionales y las funciones disponibles dependen del dispositivo. Estas notas explican las métricas, la ubicación, las copias y los servicios en línea."}
                </p>
                <div className="mt-7 rounded-2xl border border-brand-green/15 bg-brand-green/5 p-5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck size={20} className="mt-0.5 shrink-0 text-brand-green" aria-hidden="true" />
                    <p className="text-sm leading-6 text-graphite">
                      {isEn
                        ? "Core workout logging does not require Apple Health or location access. You choose whether to enable connected features."
                        : "El registro básico no requiere acceso a Apple Salud ni a la ubicación. Tú decides si activas las funciones conectadas."}
                    </p>
                  </div>
                </div>
                <nav aria-label={isEn ? "Product documents" : "Documentación del producto"} className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
                  {documents.map((document) => (
                    <Link
                      key={document.key}
                      href={getAppSubpagePath(app.slug, document.key, locale)}
                      className="inline-flex items-center gap-1 text-sm font-bold text-brand-blue hover:underline"
                    >
                      {document.label}<ChevronRight size={14} aria-hidden="true" />
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {disclosures.map((disclosure) => (
                  <article key={disclosure.id} className="rounded-xl border border-line bg-themed-card p-5">
                    <h3 className="text-sm font-black text-ink">
                      {isEn ? disclosure.title_en : disclosure.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-graphite">
                      {isEn ? disclosure.body_en : disclosure.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
