"use client";

import { useLocale, type Locale } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  const next: Locale = locale === "es" ? "en" : "es";

  return (
    <button
      aria-label={`Switch to ${next === "en" ? "English" : "Español"}`}
      className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider text-graphite transition-all duration-300 hover:text-ink hover:border-brand-blue hover:bg-brand-blue/5"
      onClick={() => setLocale(next)}
      type="button"
    >
      <span className="text-[13px]">{locale === "es" ? "🇬🇧" : "🇪🇸"}</span>
      {next.toUpperCase()}
    </button>
  );
}
