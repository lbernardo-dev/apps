"use client";

import { useLocale } from "@/lib/i18n";
import { FilteredAppGrid } from "@/components/FilteredAppGrid";
import type { AppItem } from "@/lib/types";

export function AppsCatalogClient({ apps }: { apps: AppItem[] }) {
  const { t } = useLocale();

  return (
    <section className="relative overflow-hidden bg-themed-white pb-24 pt-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-50" aria-hidden="true" />
      <div className="glow-orb -top-32 left-1/3 size-[420px] bg-brand-blue/10" aria-hidden="true" />
      <div className="container relative z-10">
        <div className="grid items-end gap-8 border-b border-line pb-12 lg:grid-cols-[1fr_auto]">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-blue">RomeroDev Product Lab</span>
            <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-[-0.045em] text-ink sm:text-7xl">{t("apps.title")}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite">{t("apps.subtitle")}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-line bg-themed-card px-5 py-4 shadow-card"><strong className="block text-3xl font-black text-ink">{apps.length}</strong><span className="text-xs font-bold text-graphite">Productos</span></div>
            <div className="rounded-2xl border border-line bg-themed-card px-5 py-4 shadow-card"><strong className="block text-3xl font-black text-ink">Apple</strong><span className="text-xs font-bold text-graphite">Ecosistema nativo</span></div>
          </div>
        </div>
        <FilteredAppGrid apps={apps} />
      </div>
    </section>
  );
}
