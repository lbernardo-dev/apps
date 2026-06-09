"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "@/lib/i18n";

export function ScrollRevealProvider() {
  const pathname = usePathname();
  const { locale } = useLocale();

  useEffect(() => {
    // 5% threshold and small root margin makes sure elements reveal quickly on all viewport heights
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    // Scan the DOM for reveal-on-scroll elements and observe them
    const scanAndObserve = () => {
      const elements = document.querySelectorAll(".reveal-on-scroll");
      elements.forEach((el) => {
        observer.observe(el);
      });
    };

    scanAndObserve();

    // Setup MutationObserver to watch for dynamic DOM changes (dynamic loading, tab switches, locale changes)
    const mutationObserver = new MutationObserver(() => {
      scanAndObserve();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname, locale]);

  return null;
}
