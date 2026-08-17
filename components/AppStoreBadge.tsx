"use client";

import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

type AppStoreBadgeProps = {
  className?: string;
  lang?: string;
  appSlug?: string;
  trackName?: string;
};

export function AppStoreBadge({ className = "h-[40px]", lang = "es", appSlug, trackName = "app_store_click" }: AppStoreBadgeProps) {
  const localeMap: Record<string, string> = {
    en: "en-US",
    es: "es-ES",
  };

  const locale = localeMap[lang] || "es-ES";
  const blackBadgeUrl = `https://toolbox.marketingtools.apple.com/api/badges/download-on-the-app-store/black/${locale}.svg`;
  const whiteBadgeUrl = `https://toolbox.marketingtools.apple.com/api/badges/download-on-the-app-store/white/${locale}.svg`;

  function handleClick() {
    if (appSlug) {
      trackEvent(trackName, { app: appSlug, locale: lang });
    }
  }

  return (
    <div className={`inline-flex items-center justify-center ${className}`} onClick={handleClick} role="link">
      {/* Black badge for light theme */}
      <Image
        src={blackBadgeUrl}
        alt="Download on the App Store"
        width={600}
        height={200}
        unoptimized
        className={`h-full w-auto select-none pointer-events-none drop-shadow-md ${appSlug ? "cursor-pointer" : ""}`}
        data-theme-badge="black"
      />
      {/* White badge for dark theme - shown via CSS */}
      <Image
        src={whiteBadgeUrl}
        alt="Download on the App Store"
        width={600}
        height={200}
        unoptimized
        className={`h-full w-auto select-none pointer-events-none drop-shadow-md hidden ${appSlug ? "cursor-pointer" : ""}`}
        data-theme-badge="white"
      />
    </div>
  );
}