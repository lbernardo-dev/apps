import React from "react";

type AppStoreBadgeProps = {
  className?: string;
  lang?: string;
};

export function AppStoreBadge({ className = "h-[40px]", lang = "es" }: AppStoreBadgeProps) {
  // Official Apple Locale Mappings
  const localeMap: Record<string, string> = {
    en: "en-US",
    es: "es-ES",
  };

  const locale = localeMap[lang] || "es-ES";
  const blackBadgeUrl = `https://toolbox.marketingtools.apple.com/api/badges/download-on-the-app-store/black/${locale}.svg`;
  const whiteBadgeUrl = `https://toolbox.marketingtools.apple.com/api/badges/download-on-the-app-store/white/${locale}.svg`;

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      {/* Black badge for light mode */}
      <img
        src={blackBadgeUrl}
        alt="Consíguelo en el App Store"
        className="h-full w-auto select-none pointer-events-none drop-shadow-md dark:hidden"
        loading="lazy"
      />
      {/* White badge for dark mode */}
      <img
        src={whiteBadgeUrl}
        alt="Consíguelo en el App Store"
        className="h-full w-auto select-none pointer-events-none drop-shadow-md hidden dark:block"
        loading="lazy"
      />
    </div>
  );
}
