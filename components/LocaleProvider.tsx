"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { LocaleContext, detectLocale, getTranslator, type Locale, type DictionaryKey } from "@/lib/i18n";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

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
