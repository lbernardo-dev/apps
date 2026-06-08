"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const conceptImage = "/apps/landing-concept.png"; // assetBasePath is /apps on production actions or empty locally. Let's make sure it handles both.
// Let's resolve the path robustly:
const assetBasePath = typeof window !== "undefined" && window.location.pathname.startsWith("/apps") ? "/apps" : "";
const resolvedConceptImage = `${assetBasePath}/landing-concept.png`;

type FeaturedApp = {
  slug: string;
  name: string;
  icon: string;
  tone: string;
  tagline: string;
  body: string;
  points: string[];
  crop: "moneto" | "nutri" | "focus" | "vitalspath";
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
    crop: "vitalspath"
  },
  {
    slug: "moneto",
    name: "Moneto",
    icon: "M",
    tone: "bg-brand-blue",
    tagline: "Finanzas personales simples",
    body: "Toma el control de tu dinero con presupuestos inteligentes y seguimiento automático sin complicaciones.",
    points: ["Sincronización bancaria segura", "Presupuestos categorizados", "Informes y tendencias gráficas"],
    crop: "moneto"
  },
  {
    slug: "nutri",
    name: "Nutri+",
    icon: "N",
    tone: "bg-brand-green",
    tagline: "Tu nutrición diaria fácil",
    body: "Planes de alimentación personalizados y registro rápido de comidas para lograr tus objetivos saludables.",
    points: ["Planes a medida por nutricionistas", "Registro de comidas en dos toques", "Seguimiento de agua y macros"],
    crop: "nutri"
  },
  {
    slug: "focus",
    name: "FocusDay",
    icon: "F",
    tone: "bg-brand-cyan",
    tagline: "Productividad diaria sin fricción",
    body: "Organiza tareas, hábitos y proyectos de forma visual para ser más productivo y enfocado en el día a día.",
    points: ["Gestión ágil de tareas", "Tracker de hábitos integrados", "Estadísticas y rachas de enfoque"],
    crop: "focus"
  }
];

function ShowcaseCrop({ kind }: { kind: "moneto" | "nutri" | "focus" | "vitalspath" }) {
  const crop = {
    moneto: "absolute left-0 top-0 h-[245px] w-[190px] bg-[length:864px_auto] bg-[position:-116px_-662px]",
    nutri: "absolute left-0 top-0 h-[245px] w-[190px] bg-[length:864px_auto] bg-[position:-410px_-662px]",
    focus: "absolute left-0 top-0 h-[245px] w-[190px] bg-[length:864px_auto] bg-[position:-698px_-662px]",
    vitalspath: ""
  }[kind];

  if (kind === "vitalspath") {
    return (
      <img
        src={`${assetBasePath}/assets/images/vitalspath/screen-01-dashboard.PNG`}
        alt="VitalsPath Dashboard"
        className="w-full h-full object-cover"
        loading="lazy"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`${crop} transition-all duration-500`}
      style={{
        backgroundImage: `url(${resolvedConceptImage})`,
        backgroundRepeat: "no-repeat"
      }}
    />
  );
}

export function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const activeApp = featuredApps[activeTab]!;

  return (
    <div className="glass-card rounded-2xl p-6 lg:p-10 shadow-soft grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
      <div className="flex flex-col justify-between h-full py-2">
        <div>
          {/* Tabs Selector */}
          <div className="flex flex-wrap gap-2.5 mb-8 border-b border-line pb-4">
            {featuredApps.map((app, index) => (
              <button
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                  activeTab === index
                    ? "bg-brand-blue text-white shadow-md scale-105"
                    : "bg-slate-800/40 text-graphite hover:bg-slate-800/80 hover:text-ink"
                }`}
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

          {/* App Info Panel */}
          <div className="animate-fade-in duration-300">
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
            Explorar todas las características de {activeApp.name}
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </div>

      {/* Simulator Side */}
      <div className="flex justify-center">
        <div className="relative">
          {/* Subtle Background Glow */}
          <div className="absolute inset-0 rounded-full bg-brand-blue/10 blur-2xl pointer-events-none transform translate-y-4" />

          {/* Mobile phone simulator bezel */}
          <div className="relative h-[255px] w-[200px] overflow-hidden rounded-[1.8rem] border-8 border-slate-950 bg-slate-950 shadow-[0_25px_60px_rgba(0,0,0,0.5)] transition-all duration-300">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 z-20 h-3 w-16 -translate-x-1/2 rounded-b-md bg-slate-950" />
            
            {/* Screen Content Wrapper */}
            <div className="relative w-[184px] h-[239px] overflow-hidden rounded-t-[1.2rem] bg-white transition-opacity duration-300">
              <ShowcaseCrop kind={activeApp.crop} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
