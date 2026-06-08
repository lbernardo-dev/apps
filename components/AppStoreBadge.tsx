import React from "react";

type AppStoreBadgeProps = {
  className?: string;
  lang?: string;
};

export function AppStoreBadge({ className = "h-[40px]", lang = "es" }: AppStoreBadgeProps) {
  const localeMap: Record<string, string> = {
    en: "en-US",
    es: "es-ES",
  };

  const locale = localeMap[lang] || "es-ES";
  const blackBadgeUrl = `https://toolbox.marketingtools.apple.com/api/badges/download-on-the-app-store/black/${locale}.svg`;
  const whiteBadgeUrl = `https://toolbox.marketingtools.apple.com/api/badges/download-on-the-app-store/white/${locale}.svg`;

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      {/* Black badge for light theme */}
      <img
        src={blackBadgeUrl}
        alt="Download on the App Store"
        className="h-full w-auto select-none pointer-events-none drop-shadow-md"
        loading="lazy"
        style={{}}
        data-theme-badge="black"
      />
      {/* White badge for dark theme - shown via CSS */}
      <img
        src={whiteBadgeUrl}
        alt="Download on the App Store"
        className="h-full w-auto select-none pointer-events-none drop-shadow-md hidden"
        loading="lazy"
        data-theme-badge="white"
      />
    </div>
  );
}
