"use client";

import { useLocale, type Locale } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  const next: Locale = locale === "es" ? "en" : "es";

  return (
    <button
      aria-label={`Switch to ${next === "en" ? "English" : "Español"}`}
      className="inline-flex size-9 items-center justify-center rounded-lg border border-line text-graphite transition-all duration-300 hover:text-ink hover:border-brand-blue hover:bg-brand-blue/5 text-base"
      onClick={() => setLocale(next)}
      type="button"
    >
      <span>{locale === "es" ? "🇬🇧" : "🇪🇸"}</span>
    </button>
  );
}
