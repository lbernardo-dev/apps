"use client";

import { useLocale, type Locale } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  const next: Locale = locale === "es" ? "en" : "es";

  return (
    <button
      aria-label={`Switch to ${next === "en" ? "English" : "Español"}`}
      className="inline-flex size-9 items-center justify-center rounded-lg border border-line text-xs font-bold text-graphite transition-all duration-300 hover:text-brand-blue hover:border-brand-blue hover:bg-brand-blue/5 tracking-wider"
      onClick={() => setLocale(next)}
      type="button"
    >
      <span>{next.toUpperCase()}</span>
    </button>
  );
}
