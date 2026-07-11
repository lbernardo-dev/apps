"use client";

import { useEffect } from "react";

type RedirectPageProps = {
  slugEs: string; // Target path in Spanish (e.g. "sobre-mi")
  slugEn: string; // Target path in English (e.g. "about")
  parentSectionEs?: string; // Optional (e.g. "casos")
  parentSectionEn?: string; // Optional (e.g. "case-studies")
  isRootLevel?: boolean; // If true, target is direct subfolder of locale (e.g. /es/contacto/)
};

export function RedirectPage({
  slugEs,
  slugEn,
  parentSectionEs,
  parentSectionEn,
  isRootLevel = true
}: RedirectPageProps) {
  useEffect(() => {
    try {
      const nav = navigator.language.slice(0, 2);
      const stored = localStorage.getItem("lb-locale");
      const locale = stored === "en" || stored === "es" ? stored : (nav === "en" ? "en" : "es");
      
      let targetPath = "";
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

      if (locale === "en") {
        const slug = slugEn;
        const section = parentSectionEn ? `${parentSectionEn}/` : "";
        targetPath = `${basePath}/en/${section}${slug}/`;
      } else {
        const slug = slugEs;
        const section = parentSectionEs ? `${parentSectionEs}/` : "";
        targetPath = `${basePath}/es/${section}${slug}/`;
      }

      window.location.replace(targetPath);
    } catch (e) {
      window.location.replace(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/es/`);
    }
  }, [slugEs, slugEn, parentSectionEs, parentSectionEn, isRootLevel]);

  // Fallback meta refresh string for static generators
  const fallbackUrlEn = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/en/${parentSectionEn ? parentSectionEn + "/" : ""}${slugEn}/`;
  const fallbackUrlEs = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/es/${parentSectionEs ? parentSectionEs + "/" : ""}${slugEs}/`;

  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`0;url=${fallbackUrlEs}`} />
        <link rel="canonical" href={fallbackUrlEs} />
      </head>
      <body className="bg-[#07101f] text-white flex min-h-screen items-center justify-center font-sans">
        <div className="text-center p-8">
          <p className="text-sm font-semibold text-slate-400">Redirecting to RomeroDev...</p>
          <p className="mt-3 text-xs text-slate-500">
            If you are not redirected:
            <br />
            <a className="text-brand-blue underline" href={fallbackUrlEs}>Español</a>
            {" · "}
            <a className="text-brand-blue underline" href={fallbackUrlEn}>English</a>
          </p>
        </div>
      </body>
    </html>
  );
}
