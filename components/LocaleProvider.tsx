"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { LocaleContext, detectLocale, getTranslator, type Locale, type DictionaryKey } from "@/lib/i18n";

export function LocaleProvider({ children, forcedLocale }: { children: ReactNode; forcedLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(forcedLocale || "es");

  useEffect(() => {
    if (forcedLocale) {
      setLocaleState(forcedLocale);
    } else {
      // Browser preference becomes available after the static HTML hydrates.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocaleState(detectLocale());
    }
  }, [forcedLocale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("lb-locale", l);
  }, []);

  const t = useCallback(
    (key: DictionaryKey) => getTranslator(locale)(key),
    [locale]
  );

  return (
    <LocaleContext value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext>
  );
}
