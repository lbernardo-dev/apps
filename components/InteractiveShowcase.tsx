"use client";

import { useState, useMemo } from "react";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { PhoneMockup } from "@/components/PhoneMockup";
import { useLocale } from "@/lib/i18n";
import { getAssetPath } from "@/lib/site";
import type { AppItem } from "@/lib/types";

type FeaturedApp = {
  slug: string;
  name: string;
  icon: string;
  tone: string;
  tagline: string;
  body: string;
  points: string[];
  screenshotPath?: string;
  appItem?: AppItem;
};

const fallbackFeaturedApps: FeaturedApp[] = [
  {
    slug: "vitalspath",
    name: "VitalsPath",
    icon: "V",
    tone: "bg-gradient-to-r from-sky-500 to-teal-500",
    tagline: "Salud y Medicación",
    body: "Tu recordatorio de medicación y registro de síntomas con total privacidad y sincronización segura.",
    points: ["Control de tomas y stock de pastillas", "Registro detallado de constantes y síntomas", "Sincronización iCloud cifrada de extremo a extremo"],
    screenshotPath: "assets/images/vitalspath/screen-01-dashboard.PNG"
  }
];

export function InteractiveShowcase({ initialFeaturedApps }: { initialFeaturedApps?: AppItem[] }) {
  const { t, locale } = useLocale();
  const [activeTab, setActiveTab] = useState<number>(0);

  const appsToUse = useMemo(() => {
    if (initialFeaturedApps && initialFeaturedApps.length > 0) {
      return initialFeaturedApps.map((app): FeaturedApp => {
        const isEn = locale === "en";
        const tagline = (isEn && app.tagline_en) ? app.tagline_en : app.tagline;
        const body = (isEn && app.shortDescription_en) ? app.shortDescription_en : app.shortDescription;
        const rawPoints = (isEn && app.benefits_en && app.benefits_en.length > 0) ? app.benefits_en : app.benefits;
        const points = rawPoints.slice(0, 3).map((p) => {
          const parts = p.split(":");
          return parts.length > 1 ? parts.slice(1).join(":").trim() : p;
        });

        const icon = app.name.slice(0, 1).toUpperCase();
        let tone = "bg-gradient-to-r from-sky-500 to-teal-500";
        if (app.slug !== "vitalspath") {
          const grads = [
            "from-purple-500 to-pink-500",
            "from-emerald-500 to-teal-500",
            "from-blue-500 to-indigo-500",
            "from-orange-500 to-amber-500"
          ];
          tone = `bg-gradient-to-r ${grads[app.name.length % grads.length]}`;
        }

        let screenshotPath = undefined;
        if (app.slug === "vitalspath") {
          screenshotPath = getAssetPath("assets/images/vitalspath/screen-01-dashboard.PNG");
        } else if (app.screenshots && app.screenshots.length > 0) {
          const shot = app.screenshots[0];
          screenshotPath = shot.startsWith("http") ? shot : getAssetPath(shot);
        }

        return {
          slug: app.slug,
          name: app.name,
          icon,
          tone,
          tagline,
          body,
          points,
          screenshotPath,
          appItem: app
        };
      });
    }

    return fallbackFeaturedApps.map(app => ({
      ...app,
      screenshotPath: app.screenshotPath ? getAssetPath(app.screenshotPath) : undefined
    }));
  }, [initialFeaturedApps, locale]);

  const activeIndex = activeTab >= appsToUse.length ? 0 : activeTab;
  const activeApp = appsToUse[activeIndex] || appsToUse[0];

  if (!activeApp) return null;

  return (
    <div className="glass-card gradient-border-card rounded-2xl p-6 lg:p-10 shadow-soft grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
      <div className="flex flex-col justify-between h-full py-2">
        <div>
          {/* Tabs - only show if more than 1 app */}
          {appsToUse.length > 1 && (
            <div className="flex flex-wrap gap-2.5 mb-8 border-b border-line pb-4">
              {appsToUse.map((app, index) => (
                <button
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                    activeTab === index
                      ? "bg-brand-blue text-white shadow-md scale-105"
                      : "text-graphite hover:text-ink"
                  }`}
                  style={activeTab !== index ? { backgroundColor: "var(--color-card-elevated, var(--color-card))" } : {}}
                  key={app.name}
                  onClick={() => setActiveTab(index)}
                  type="button"
                >
                  <span className={`flex size-5 items-center justify-center rounded-md text-[10px] font-bold text-white ${app.tone}`}>
                    {app.icon}
                  </span>
                  {app.name}
                </button>
              ))}
            </div>
          )}
 
          {/* App Info Panel */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan">
              {activeApp.tagline}
            </span>
            <h3 className="mt-3 text-3xl font-semibold text-ink">{activeApp.name}</h3>
            <p className="mt-4 text-sm leading-6 text-graphite">{activeApp.body}</p>
 
            <ul className="mt-6 space-y-3">
              {activeApp.points.map((point) => (
                <li className="flex gap-2.5 text-sm leading-5 text-graphite" key={point}>
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                    <Check aria-hidden="true" size={12} strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
 
        <div className="mt-8 pt-6 border-t border-line">
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-blue-400 transition-colors group"
            href={`/apps/${activeApp.slug}`}
          >
            {t("showcase.explore")} {activeApp.name}
            <ArrowRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
 
      {/* Real Screenshot in iPhone 17 Pro Max Frame */}
      <div className="flex justify-center">
        <PhoneMockup
          screenshotSrc={activeApp.screenshotPath}
          alt={`${activeApp.name} screenshot`}
          compact={false}
          appPlaceholder={!activeApp.screenshotPath ? {
            name: activeApp.name,
            category: activeApp.appItem?.category || "iOS App",
            tagline: activeApp.tagline
          } : undefined}
        />
      </div>
    </div>
  );
}
