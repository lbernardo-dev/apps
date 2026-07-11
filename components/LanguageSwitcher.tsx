"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLocale, type Locale, getEquivalentPath } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale } = useLocale();
  const pathname = usePathname() || "";

  const next: Locale = locale === "es" ? "en" : "es";
  const targetPath = getEquivalentPath(pathname, next);

  return (
    <Link
      aria-label={`Switch to ${next === "en" ? "English" : "Español"}`}
      className="inline-flex size-9 items-center justify-center rounded-lg border border-line text-xs font-bold text-graphite transition-all duration-300 hover:text-brand-blue hover:border-brand-blue hover:bg-brand-blue/5 tracking-wider"
      href={targetPath}
    >
      <span>{next.toUpperCase()}</span>
    </Link>
  );
}
