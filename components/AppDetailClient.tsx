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
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { FaqList } from "@/components/FaqList";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { PhoneMockup } from "@/components/PhoneMockup";
import { AppPricing } from "@/components/AppPricing";
import { AppIcon } from "@/components/AppIcon";
import { useLocale } from "@/lib/i18n";
import { getAssetPath } from "@/lib/site";
import { getAppSubpagePath, getStaticPath } from "@/lib/routes";
import type { AppItem } from "@/lib/types";

export function AppDetailClient({ app }: { app: AppItem }) {
  const { t, locale } = useLocale();
  const carouselRef = useRef<HTMLDivElement>(null);

  const isEn = locale === "en";
  const name = app.name;
  const tagline = isEn && app.tagline_en ? app.tagline_en : app.tagline;
  const shortDescription = isEn && app.shortDescription_en ? app.shortDescription_en : app.shortDescription;
  const longDescription = isEn && app.longDescription_en ? app.longDescription_en : app.longDescription;
  const problem = isEn && app.problem_en ? app.problem_en : app.problem;
  const benefits = isEn && app.benefits_en && app.benefits_en.length > 0 ? app.benefits_en : app.benefits;
  const features = isEn && app.features_en && app.features_en.length > 0 ? app.features_en : app.features;
  const audience = isEn && app.audience_en ? app.audience_en : app.audience;
  const primaryCtaLabel = isEn && app.primaryCtaLabel_en ? app.primaryCtaLabel_en : app.primaryCtaLabel;

  const getScreenshotPath = (shot: string) => {
    if (app.slug === "vitalspath") {
      switch (shot) {
        case "Dashboard": return getAssetPath(`assets/images/vitalspath/screens/01_today_timeline_${locale}.png`);
        case "Medicación": return getAssetPath(`assets/images/vitalspath/screens/02_medication_list_${locale}.png`);
        case "Síntomas": return getAssetPath(`assets/images/vitalspath/screens/05_symptom_logging_${locale}.png`);
        case "Bienestar": return getAssetPath(`assets/images/vitalspath/screens/06_vitals_dashboard_${locale}.png`);
        case "Citas": return getAssetPath(`assets/images/vitalspath/screens/07_appointments_tasks_${locale}.png`);
        case "Widgets": return getAssetPath(`assets/images/vitalspath/screens/10_watch_widgets_alerts_${locale}.png`);
        case "Live Activity":
        default:
          return getAssetPath("assets/images/vitalspath/screen-27-live-activity.PNG");
      }
    }
    if (app.slug === "reps") return getAssetPath(`assets/images/reps/aso/${locale === "es" ? "es-ES" : "en-US"}/${shot}.jpg`);
    return shot ? getAssetPath(shot) : undefined;
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
      <section className="relative overflow-hidden border-b border-line bg-slate-950 pt-24 text-white md:pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,var(--app-primary-soft),transparent_36%),radial-gradient(circle_at_82%_14%,var(--app-secondary-soft),transparent_34%)] opacity-90" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0)_0%,rgba(2,6,23,.86)_72%,rgba(2,6,23,1)_100%)]" aria-hidden="true" />
        <div className="container relative z-10">
          {/* Back Navigation */}
          <div className="mb-10 animate-fade-in-up">
            <Link 
              href={getStaticPath("products", locale)} 
              className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white/55 transition-colors hover:text-white"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              <span>{locale === "es" ? "Volver al Catálogo" : "Back to Catalog"}</span>
            </Link>
          </div>

          {/* App Info Header (App Store / Apple Style) */}
          <div className="flex flex-col items-start gap-8 border-b border-white/10 pb-12 animate-fade-in-up md:flex-row md:items-center">
            {/* App Squircle Icon */}
            <AppIcon app={app} size={128} priority className="border border-white/25 shadow-2xl shadow-black/45" />

            {/* App Meta Information */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-white">
                  {app.category}
                </span>
                <span className="flex items-center gap-1 rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-0.5 text-xs font-bold text-amber-300">
                  <Star size={12} fill="currentColor" className="text-amber-400" />
                  {typeof app.averageRating === "number" ? app.averageRating.toFixed(1) : "—"}
                </span>
                <span className="text-xs font-bold text-white/55">
                  {app.platform.join(", ")}
                </span>
              </div>
              
              <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                {app.name}
              </h1>
              
              <p className="mt-3 max-w-3xl text-lg font-black leading-normal text-white/86 sm:text-xl">
                {tagline}
              </p>
              
              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                {longDescription}
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
                  <ButtonLink href={app.primaryCtaUrl || getStaticPath("contact", locale)}>
                    {primaryCtaLabel}
                  </ButtonLink>
                )}
                <ButtonLink href={getAppSubpagePath(app.slug, "support", locale)} variant="secondary">
                  {t("app.support.cta")}
                </ButtonLink>
              </div>
            </div>
          </div>

          {/* Interactive Screen Gallery Slider (iPhone 17 Pro Max Carousel) */}
          <div className="mt-16 animate-fade-in-up pb-16" style={{ animationDelay: "100ms" }}>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xs font-black uppercase tracking-widest text-white/70">{t("app.screenshots")}</h3>
              
              {/* Slider controls */}
              <div className="hidden sm:flex gap-2">
                <button
                  onClick={() => scrollCarousel("left")}
                  className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/70 transition-all hover:scale-105 hover:bg-white hover:text-slate-950 active:scale-95"
                  aria-label="Anterior"
                  type="button"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/70 transition-all hover:scale-105 hover:bg-white hover:text-slate-950 active:scale-95"
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
                  const getScreenshotLabel = (s: string) => {
                    if (app.slug === "vitalspath") {
                      const key = `screenshot.vitalspath.${s.toLowerCase().replace(/\s+/g, "-")}`;
                      const val = t(key as any);
                      return val !== key ? val : s;
                    }
                    if (app.slug === "reps") {
                      const key = `screenshot.reps.${s}`;
                      const val = t(key as any);
                      return val !== key ? val : s;
                    }
                    return s;
                  };
                  const label = getScreenshotLabel(shot);
                  return (
                    <div key={shot} className="snap-center shrink-0 flex flex-col items-center">
                      {app.slug === "reps" && path ? (
                        <div className="relative aspect-[6.5/14] w-[260px] overflow-hidden rounded-[1.75rem] border border-white/15 bg-slate-900 shadow-2xl shadow-black/35 sm:w-[300px]">
                          <Image src={path} alt={`${app.name} - ${label}`} fill unoptimized className="object-cover" />
                        </div>
                      ) : (
                        <PhoneMockup screenshotSrc={path} alt={`${app.name} - ${label}`} compact={false} appPlaceholder={!path ? { name: app.name, category: app.category, tagline: label, firstIconText: "Vista", secondIconText: "Detalle App" } : undefined} />
                      )}
                      <span className="mt-4 block text-[11px] font-bold uppercase tracking-wider text-white/60">
                        {label}
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
              <span aria-hidden="true">“</span>{problem}<span aria-hidden="true">”</span>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {benefits.map((benefit, idx) => {
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
      <section id="features" className="section bg-themed-white relative overflow-hidden border-b border-line">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-start">
            {/* Key Features List */}
            <div className="reveal-on-scroll">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-blue">{t("app.features.label")}</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-ink">{t("app.features.title")}</h2>
              
              <ul className="mt-8 grid gap-4">
                {features.map((feature, index) => {
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

                  {app.appStore ? (
                    <div className="grid grid-cols-[110px_1fr] items-start gap-6 border-b border-line pb-6">
                      <dt className="text-xs uppercase font-extrabold tracking-wider text-graphite">App Store</dt>
                      <dd className="space-y-1 font-semibold text-ink">
                        <p>v{app.appStore.version} · {app.appStore.formattedPrice}</p>
                        <p className="text-xs font-normal text-graphite">
                          iOS {app.appStore.minimumOsVersion}+ · {app.appStore.languages?.length ?? 0} idiomas
                        </p>
                        <a className="inline-flex text-xs text-brand-blue hover:underline" href={app.appStore.sourceUrl} target="_blank" rel="noopener noreferrer">
                          {locale === "es" ? "Ver ficha oficial en Apple" : "View official page on Apple"}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                  
                  {/* Target Audience */}
                  <div className="grid grid-cols-[110px_1fr] items-start gap-6 border-b border-line pb-6">
                    <dt className="text-xs uppercase font-extrabold tracking-wider text-graphite">
                      {t("app.specs.audience")}
                    </dt>
                    <dd className="font-semibold text-ink leading-relaxed">
                      {audience}
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

      <AppPricing app={app} />

      {/* ─── Customer Reviews Section (App Store Style) ─────────────────── */}
      {app.appStoreReviews && app.appStoreReviews.length > 0 && (
        <section className="section bg-themed-white relative overflow-hidden border-b border-line">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-line/60">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-blue">
                  {locale === "es" ? "Opiniones" : "Reviews"}
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-ink">
                  {locale === "es" ? "Reseñas de la App Store" : "App Store Customer Reviews"}
                </h2>
              </div>
              <div className="flex items-center gap-3 bg-amber-400/5 px-4 py-2 rounded-2xl border border-amber-400/10">
                <span className="text-2xl font-black text-ink">{typeof app.averageRating === "number" ? app.averageRating.toFixed(1) : "—"}</span>
                <div className="flex flex-col">
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < Math.round(app.averageRating || 5) ? "currentColor" : "none"}
                        className={i < Math.round(app.averageRating || 5) ? "text-amber-400" : "text-slate-300"}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-graphite font-bold">
                    {app.userRatingCount || 0} {locale === "es" ? "valoraciones" : "ratings"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {app.appStoreReviews.map((review, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-line bg-themed-card p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div className="flex gap-0.5 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            fill={i < review.rating ? "currentColor" : "none"}
                            className={i < review.rating ? "text-amber-400" : "text-slate-300"}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">{review.date}</span>
                    </div>
                    <h4 className="font-bold text-sm text-ink mb-2 leading-tight">{review.title}</h4>
                    <p className="text-xs sm:text-sm text-graphite leading-relaxed italic">
                      <span aria-hidden="true">“</span>{review.content}<span aria-hidden="true">”</span>
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-line/40 flex justify-between items-center text-[10px] text-slate-400 font-bold">
                    <span>{review.author}</span>
                    <span className="text-brand-blue">App Store</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
              <h4 className="font-bold text-ink">
                {locale === "en" ? "Need technical support?" : "¿Necesitas soporte técnico?"}
              </h4>
              <p className="text-xs text-graphite leading-5">
                {locale === "en" 
                  ? "We are at your disposal to help you with any issue or suggestion about the app."
                  : "Estamos a tu disposición para ayudarte con cualquier incidencia o sugerencia que tengas sobre la app."}
              </p>
              <ButtonLink href={getAppSubpagePath(app.slug, "support", locale)} variant="secondary" className="w-full text-center py-2.5 text-xs font-bold">
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
