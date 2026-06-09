"use client";

import { useState, useRef } from "react";
import { 
  CheckCircle2, 
  Smartphone, 
  ShieldCheck, 
  Users, 
  Calendar, 
  ArrowLeft,
  Star,
  Sliders,
  Info,
  Quote,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { FaqList } from "@/components/FaqList";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { PhoneMockup } from "@/components/PhoneMockup";
import { useLocale } from "@/lib/i18n";
import { getAssetPath } from "@/lib/site";
import type { AppItem } from "@/lib/types";

export function AppDetailClient({ app }: { app: AppItem }) {
  const { t } = useLocale();
  const carouselRef = useRef<HTMLDivElement>(null);

  const getScreenshotPath = (shot: string) => {
    if (app.slug === "vitalspath") {
      switch (shot) {
        case "Dashboard": return getAssetPath("assets/images/vitalspath/screen-01-dashboard.PNG");
        case "Medicación": return getAssetPath("assets/images/vitalspath/screen-04-medications.PNG");
        case "Síntomas": return getAssetPath("assets/images/vitalspath/screen-13-symptoms.PNG");
        case "Bienestar": return getAssetPath("assets/images/vitalspath/screen-18-wellness.PNG");
        case "Citas": return getAssetPath("assets/images/vitalspath/screen-11-appointments.PNG");
        case "Widgets": return getAssetPath("assets/images/vitalspath/screen-20-widgets-home.PNG");
        case "Live Activity":
        default:
          return getAssetPath("assets/images/vitalspath/screen-27-live-activity.PNG");
      }
    }
    return undefined; // Triggers simulated mockup
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ─── Hero Section (Apple-inspired App Page) ──────────────── */}
      <section className="relative overflow-hidden bg-themed-white pt-10 pb-16 border-b border-line">
        {/* Ambient Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" aria-hidden="true" />
        {/* Glow Effects */}
        <div className="glow-orb -left-20 -top-20 bg-brand-blue/10 size-[300px] animate-pulse-glow" aria-hidden="true" />
        <div className="glow-orb right-10 bottom-0 bg-brand-cyan/10 size-[250px] animate-pulse-glow" style={{ animationDelay: "2s" }} aria-hidden="true" />

        <div className="container relative z-10">
          {/* Back Navigation */}
          <div className="mb-10 animate-fade-in-up">
            <Link 
              href="/apps" 
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-graphite hover:text-brand-blue transition-colors group"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              <span>Volver al Catálogo</span>
            </Link>
          </div>

          {/* App Info Header (App Store / Apple Style) */}
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center border-b border-line/60 pb-12 animate-fade-in-up">
            {/* App Squircle Icon */}
            <div className="relative flex size-24 sm:size-32 shrink-0 items-center justify-center bg-gradient-to-tr from-sky-500 to-teal-500 text-white text-4xl sm:text-5xl font-black shadow-xl apple-squircle overflow-hidden border border-line">
              {app.slug === "vitalspath" ? (
                <img
                  src={getAssetPath("assets/images/vitalspath/AppIcon_v2.png")}
                  alt={app.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                app.name.slice(0, 1).toUpperCase()
              )}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none" />
            </div>

            {/* App Meta Information */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-bold text-brand-blue">
                  {app.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-amber-400 font-bold bg-amber-400/5 px-2.5 py-0.5 rounded-full border border-amber-400/10">
                  <Star size={12} fill="currentColor" className="text-amber-400" />
                  4.9
                </span>
                <span className="text-xs font-medium text-graphite">
                  {app.platform.join(", ")}
                </span>
              </div>
              
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-ink leading-tight">
                {app.name}
              </h1>
              
              <p className="mt-2 text-lg sm:text-xl font-bold leading-normal text-brand-cyan">
                {app.tagline}
              </p>
              
              <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-graphite">
                {app.longDescription}
              </p>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap gap-4 items-center">
                {app.status === "published" && app.appStoreUrl ? (
                  <a
                    href={app.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97]"
                  >
                    <AppStoreBadge className="h-[48px]" />
                  </a>
                ) : (
                  <ButtonLink href={app.appStoreUrl || app.primaryCtaUrl || "/contact"}>
                    {app.primaryCtaLabel}
                  </ButtonLink>
                )}
                <ButtonLink href={`/apps/${app.slug}/support`} variant="secondary">
                  {t("app.support.cta")}
                </ButtonLink>
              </div>
            </div>
          </div>

          {/* Interactive Screen Gallery Slider (iPhone 17 Pro Max Carousel) */}
          <div className="mt-16 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-ink">{t("app.screenshots")}</h3>
              
              {/* Slider controls */}
              <div className="hidden sm:flex gap-2">
                <button
                  onClick={() => scrollCarousel("left")}
                  className="size-9 rounded-full border border-line bg-themed-card flex items-center justify-center text-graphite hover:text-ink hover:bg-themed-mist hover:scale-105 active:scale-95 transition-all"
                  aria-label="Anterior"
                  type="button"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  className="size-9 rounded-full border border-line bg-themed-card flex items-center justify-center text-graphite hover:text-ink hover:bg-themed-mist hover:scale-105 active:scale-95 transition-all"
                  aria-label="Siguiente"
                  type="button"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="relative">
              {/* Horizontal Scroll Containers */}
              <div 
                ref={carouselRef}
                className="flex gap-6 overflow-x-auto pb-10 pt-2 snap-x scrollbar-thin scroll-smooth px-1"
                style={{ scrollPaddingLeft: "16px" }}
              >
                {app.screenshots.map((shot) => {
                  const path = getScreenshotPath(shot);
                  return (
                    <div key={shot} className="snap-center shrink-0 flex flex-col items-center">
                      <PhoneMockup
                        screenshotSrc={path}
                        alt={`${app.name} - ${shot}`}
                        compact={false}
                        appPlaceholder={!path ? {
                          name: app.name,
                          category: app.category,
                          tagline: shot,
                          firstIconText: "Vista",
                          secondIconText: "Detalle App"
                        } : undefined}
                      />
                      <span className="block text-[11px] font-bold text-graphite mt-4 uppercase tracking-wider">
                        {shot}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Challenge Section ─────────────────────────── */}
      <section className="section bg-themed-mist relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" aria-hidden="true" />
        <div className="container relative z-10 grid gap-12 lg:grid-cols-[0.90fr_1.10fr] items-center">
          <div className="reveal-on-scroll">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-blue">{t("app.challenge")}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-ink">{t("app.challenge.title")}</h2>
            
            <div className="w-12 h-1 bg-brand-blue my-6 rounded" />
            
            <div className="relative rounded-2xl border-l-4 border-brand-cyan bg-themed-card p-6 shadow-sm leading-8 text-graphite text-base sm:text-lg italic">
              <Quote className="absolute -top-3 left-4 text-brand-cyan/15 size-12 pointer-events-none" aria-hidden="true" />
              "{app.problem}"
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {app.benefits.map((benefit, idx) => {
              const benefitParts = benefit.split(":");
              const benefitTitle = benefitParts[0];
              const benefitDesc = benefitParts.slice(1).join(":");
              return (
                <article 
                  className="glass-card gradient-border-card rounded-2xl p-6 shadow-sm hover:translate-y-[-2px] transition-all duration-300 reveal-on-scroll" 
                  key={benefit}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="flex size-9 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                    <CheckCircle2 aria-hidden="true" size={18} strokeWidth={2.5} />
                  </div>
                  <h4 className="mt-4 text-sm font-bold text-ink">{benefitTitle || `${t("app.benefit")} #${idx + 1}`}</h4>
                  {benefitDesc && <p className="mt-2 text-xs sm:text-sm leading-6 text-graphite">{benefitDesc.trim()}</p>}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Features & Specs Section (Apple Tech Specs Grid Style) ──────────────── */}
      <section className="section bg-themed-white relative overflow-hidden border-b border-line">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-start">
            {/* Key Features List */}
            <div className="reveal-on-scroll">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-blue">{t("app.features.label")}</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-ink">{t("app.features.title")}</h2>
              
              <ul className="mt-8 grid gap-4">
                {app.features.map((feature, index) => {
                  const featureParts = feature.split(":");
                  const featureTitle = featureParts[0];
                  const featureDesc = featureParts.slice(1).join(":");
                  return (
                    <li 
                      className="flex items-start gap-4 p-5 rounded-2xl border border-line bg-themed-mist/20 transition-all duration-300 hover:border-brand-blue/30 hover:bg-themed-mist/50" 
                      key={feature}
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-blue/15 text-brand-blue text-xs font-bold mt-0.5">
                        {index + 1}
                      </span>
                      <div>
                        <strong className="text-sm font-bold text-ink block">{featureTitle}</strong>
                        {featureDesc && <span className="text-xs sm:text-sm leading-relaxed text-graphite block mt-1">{featureDesc.trim()}</span>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Apple-style Tech Specs Grid */}
            <div className="reveal-on-scroll" style={{ transitionDelay: "100ms" }}>
              <div className="rounded-2xl border border-line bg-themed-card p-6 sm:p-8 shadow-soft relative overflow-hidden">
                <h3 className="text-xl font-bold text-ink mb-8 flex items-center gap-2 border-b border-line pb-4">
                  <Sliders size={18} className="text-brand-blue" />
                  {t("app.specs.title")}
                </h3>
                
                <dl className="grid gap-8 text-sm">
                  {/* Status */}
                  <div className="grid grid-cols-[110px_1fr] items-start gap-6 border-b border-line pb-6">
                    <dt className="text-xs uppercase font-extrabold tracking-wider text-graphite pt-1">
                      {t("app.specs.status")}
                    </dt>
                    <dd className="font-semibold text-ink">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        app.status === "published" 
                          ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20" 
                          : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20"
                      }`}>
                        {app.status === "published" ? t("app.specs.status.published") : t("app.specs.status.coming_soon")}
                      </span>
                    </dd>
                  </div>
                  
                  {/* Platforms */}
                  <div className="grid grid-cols-[110px_1fr] items-start gap-6 border-b border-line pb-6">
                    <dt className="text-xs uppercase font-extrabold tracking-wider text-graphite pt-1">
                      {t("app.specs.platforms")}
                    </dt>
                    <dd className="font-bold text-ink flex flex-wrap gap-1.5">
                      {app.platform.map((p) => (
                        <span key={p} className="rounded bg-themed-mist border border-line px-2.5 py-0.5 text-xs font-bold">
                          {p}
                        </span>
                      ))}
                    </dd>
                  </div>
                  
                  {/* Target Audience */}
                  <div className="grid grid-cols-[110px_1fr] items-start gap-6 border-b border-line pb-6">
                    <dt className="text-xs uppercase font-extrabold tracking-wider text-graphite">
                      {t("app.specs.audience")}
                    </dt>
                    <dd className="font-semibold text-ink leading-relaxed">
                      {app.audience}
                    </dd>
                  </div>
                  
                  {/* Last updated */}
                  <div className="grid grid-cols-[110px_1fr] items-start gap-6">
                    <dt className="text-xs uppercase font-extrabold tracking-wider text-graphite">
                      {t("app.specs.updated")}
                    </dt>
                    <dd className="font-semibold text-ink">
                      {app.updatedAt}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ & Help Section ────────────────────────────── */}
      <section className="section bg-themed-mist relative overflow-hidden">
        <div className="container relative z-10 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] items-start">
          <div className="reveal-on-scroll">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-blue">{t("app.faq.label")}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-ink">{t("app.faq.title")} {app.name}</h2>
            <p className="mt-5 text-sm sm:text-base leading-7 text-graphite">
              {t("app.faq.subtitle")}
            </p>
            
            {/* Quick Support Card */}
            <div className="mt-8 p-6 rounded-2xl border border-line bg-themed-card flex flex-col items-start gap-4 shadow-sm relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-16 h-16 bg-brand-blue/5 rounded-full blur-xl" aria-hidden="true" />
              <div className="size-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <Info size={20} />
              </div>
              <h4 className="font-bold text-ink">¿Necesitas soporte técnico?</h4>
              <p className="text-xs text-graphite leading-5">Estamos a tu disposición para ayudarte con cualquier incidencia o sugerencia que tengas sobre la app.</p>
              <ButtonLink href={`/apps/${app.slug}/support`} variant="secondary" className="w-full text-center py-2.5 text-xs font-bold">
                {t("app.support.cta")}
              </ButtonLink>
            </div>
          </div>
          
          <div className="reveal-on-scroll" style={{ transitionDelay: "100ms" }}>
            <FaqList items={app.faq} />
          </div>
        </div>
      </section>
    </>
  );
}
