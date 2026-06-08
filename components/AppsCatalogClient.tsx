"use client";

import { useLocale } from "@/lib/i18n";
import { FilteredAppGrid } from "@/components/FilteredAppGrid";
import type { AppItem } from "@/lib/types";

export function AppsCatalogClient({ apps }: { apps: AppItem[] }) {
  const { t } = useLocale();

  return (
    <section className="section bg-themed-white">
      <div className="container">
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-[var(--color-ink)]">
          {t("apps.title")}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-graphite)]">
          {t("apps.subtitle")}
        </p>
        <FilteredAppGrid apps={apps} />
      </div>
    </section>
  );
}
