"use client";

import { Check, Clock3, Minus, Sparkles } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { getFallbackAppFeatureComparisons } from "@/lib/app-comparisons";
import type { AppFeatureComparison, AppItem, FeatureAccessStatus } from "@/lib/types";

function StatusMark({ status, es }: { status: FeatureAccessStatus; es: boolean }) {
  if (status === "included") {
    return <Check size={15} aria-hidden="true" className="text-emerald-500" />;
  }
  if (status === "planned") {
    return <Clock3 size={15} aria-hidden="true" className="text-amber-500" />;
  }
  if (status === "limited") {
    return <span className="mt-0.5 inline-block size-2.5 rounded-full bg-brand-blue" aria-hidden="true" />;
  }
  return <Minus size={15} aria-hidden="true" className="text-graphite/40" />;
}

function statusLabel(status: FeatureAccessStatus, es: boolean) {
  return {
    included: es ? "Incluido" : "Included",
    limited: es ? "Limitado" : "Limited",
    not_included: es ? "No incluido" : "Not included",
    planned: es ? "Previsto" : "Planned",
  }[status];
}

function ComparisonCell({
  status,
  detail,
  es,
  premium = false,
}: {
  status: FeatureAccessStatus;
  detail: string;
  es: boolean;
  premium?: boolean;
}) {
  return (
    <div className="min-w-[220px] p-5 sm:min-w-0 sm:p-6">
      <div className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
        status === "included" ? (premium ? "bg-brand-blue/10 text-brand-blue" : "bg-emerald-500/10 text-emerald-600")
          : status === "planned" ? "bg-amber-500/10 text-amber-600"
            : status === "limited" ? "bg-brand-blue/10 text-brand-blue"
              : "bg-black/[.04] text-graphite/70"
      }`}>
        <StatusMark status={status} es={es} />
        {statusLabel(status, es)}
      </div>
      <p className="mt-3 text-sm leading-6 text-graphite">{detail}</p>
    </div>
  );
}

export function AppFeatureComparison({ app }: { app: AppItem }) {
  const { locale } = useLocale();
  const es = locale === "es";
  const rows = (app.featureComparisons?.length ? app.featureComparisons : getFallbackAppFeatureComparisons(app.slug))
    .filter((item) => item.isEnabled !== false)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  if (!rows.length) return null;

  const premiumPlan = app.pricing?.find((plan) => plan.featured) ?? app.pricing?.[1];
  const premiumLabel = premiumPlan
    ? (es ? premiumPlan.name : premiumPlan.name_en || premiumPlan.name)
    : `${app.name} Pro`;

  return (
    <section id="comparison" className="section relative overflow-hidden border-b border-line bg-themed-white">
      <div className="glow-orb right-[-10%] top-10 size-[360px] bg-brand-blue/10" aria-hidden="true" />
      <div className="container relative z-10">
        <div className="max-w-3xl">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-blue">
            {es ? "Comparativa de planes" : "Plan comparison"}
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-5xl">
            {es ? "Qué incluye cada experiencia" : "What each experience includes"}
          </h2>
          <p className="mt-5 text-base leading-7 text-graphite">
            {es
              ? "Una vista detallada y localizada de lo que puedes hacer gratis y de lo que desbloquea el plan Premium. Los estados se actualizan desde el panel admin."
              : "A detailed, localised view of what you can do for free and what the Premium plan unlocks. Statuses are updated from the admin panel."}
          </p>
        </div>

        <div className="mt-10 overflow-x-auto rounded-3xl border border-line bg-themed-card shadow-card">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <caption className="sr-only">{es ? `Comparativa de ${app.name}` : `${app.name} plan comparison`}</caption>
            <thead>
              <tr className="border-b border-line bg-themed-mist">
                <th className="w-[28%] p-5 text-xs font-black uppercase tracking-wider text-graphite sm:p-6">
                  {es ? "Capacidad" : "Capability"}
                </th>
                <th className="w-[36%] border-l border-line p-5 text-xs font-black uppercase tracking-wider text-graphite sm:p-6">
                  <span className="block text-ink">{app.name} Free</span>
                  <span className="mt-1 block text-[10px] font-semibold normal-case tracking-normal">{es ? "Para empezar" : "For getting started"}</span>
                </th>
                <th className="w-[36%] border-l border-line bg-brand-blue/[.035] p-5 text-xs font-black uppercase tracking-wider text-brand-blue sm:p-6">
                  <span className="flex items-center gap-2"><Sparkles size={15} />{premiumLabel}</span>
                  <span className="mt-1 block text-[10px] font-semibold normal-case tracking-normal text-graphite">{es ? "Para ir más lejos" : "For going further"}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item: AppFeatureComparison) => (
                <tr key={item.id ?? item.featureKey} className="border-b border-line last:border-0">
                  <th scope="row" className="align-top p-5 text-sm font-black leading-6 text-ink sm:p-6">
                    {es ? item.title : item.title_en || item.title}
                  </th>
                  <td className="border-l border-line align-top">
                    <ComparisonCell
                      status={item.freeStatus}
                      detail={es ? item.freeDetail : item.freeDetail_en || item.freeDetail}
                      es={es}
                    />
                  </td>
                  <td className="border-l border-line bg-brand-blue/[.02] align-top">
                    <ComparisonCell
                      status={item.proStatus}
                      detail={es ? item.proDetail : item.proDetail_en || item.proDetail}
                      es={es}
                      premium
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-graphite">
          <span className="inline-flex items-center gap-2"><Check size={14} className="text-emerald-500" />{es ? "Incluido" : "Included"}</span>
          <span className="inline-flex items-center gap-2"><span className="size-2.5 rounded-full bg-brand-blue" />{es ? "Limitado" : "Limited"}</span>
          <span className="inline-flex items-center gap-2"><Clock3 size={14} className="text-amber-500" />{es ? "Previsto" : "Planned"}</span>
          <span className="inline-flex items-center gap-2"><Minus size={14} className="text-graphite/40" />{es ? "No incluido" : "Not included"}</span>
        </div>
      </div>
    </section>
  );
}
