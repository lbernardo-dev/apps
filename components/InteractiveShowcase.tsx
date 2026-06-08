"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/lib/i18n";

const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

type FeaturedApp = {
  slug: string;
  name: string;
  icon: string;
  tone: string;
  tagline: string;
  body: string;
  points: string[];
  screenshotSrc: string;
};

const featuredApps: FeaturedApp[] = [
  {
    slug: "vitalspath",
    name: "VitalsPath",
    icon: "V",
    tone: "bg-gradient-to-r from-sky-500 to-teal-500",
    tagline: "Salud y Medicación",
    body: "Tu recordatorio de medicación y registro de síntomas con total privacidad y sincronización segura.",
    points: ["Control de tomas y stock de pastillas", "Registro detallado de constantes y síntomas", "Sincronización iCloud cifrada de extremo a extremo"],
    screenshotSrc: `${assetBasePath}/assets/images/vitalspath/screen-01-dashboard.PNG`
  }
];

export function InteractiveShowcase() {
  const { t } = useLocale();
  const [activeTab, setActiveTab] = useState<number>(0);
  const activeApp = featuredApps[activeTab]!;

  return (
    <div className="glass-card rounded-2xl p-6 lg:p-10 shadow-soft grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
      <div className="flex flex-col justify-between h-full py-2">
        <div>
          {/* Tabs - only show if more than 1 app */}
          {featuredApps.length > 1 && (
            <div className="flex flex-wrap gap-2.5 mb-8 border-b border-line pb-4">
              {featuredApps.map((app, index) => (
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-blue-400 transition-colors"
            href={`/apps/${activeApp.slug}`}
          >
            {t("showcase.explore")} {activeApp.name}
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </div>

      {/* Real Screenshot in Phone Frame */}
      <div className="flex justify-center">
        <div className="relative">
          {/* Subtle Background Glow */}
          <div className="absolute inset-0 rounded-full bg-brand-blue/10 blur-2xl pointer-events-none transform translate-y-4" />

          {/* Mobile phone simulator bezel */}
          <div className="relative h-[420px] w-[210px] overflow-hidden rounded-[2.2rem] border-[7px] border-slate-950 bg-slate-950 shadow-[0_25px_60px_rgba(0,0,0,0.5)] transition-all duration-300">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 z-20 h-[14px] w-[70px] -translate-x-1/2 rounded-b-lg bg-slate-950" />

            {/* Screen Content */}
            <div className="relative w-full h-full overflow-hidden rounded-t-[1.5rem] transition-opacity duration-300">
              <img
                src={activeApp.screenshotSrc}
                alt={`${activeApp.name} screenshot`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
