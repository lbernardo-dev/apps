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
import { PhoneMockup } from "@/components/PhoneMockup";
import { AppPricing } from "@/components/AppPricing";
import { AppIcon } from "@/components/AppIcon";
import { ChangelogTimeline } from "@/components/ChangelogTimeline";
import { AppFeedback } from "@/components/AppFeedback";
import { AppReviewForm } from "@/components/AppReviewForm";
import { AppProductActions } from "@/components/AppProductActions";
import { AppMediaShowcase } from "@/components/AppMediaShowcase";
import { useLocale } from "@/lib/i18n";
import { getAssetPath } from "@/lib/site";
import { getAppSubpagePath, getStaticPath } from "@/lib/routes";
import { getAppShotPath, getScreenshotLabelKey, getLocalizedAppCategory } from "@/lib/product-media";
import { reviewsForLocale } from "@/lib/reviews";
import { getAppStatusMeta } from "@/lib/app-catalog";
import type { AppItem } from "@/lib/types";

export function AppDetailClient({ app }: { app: AppItem }) {
  const { t, locale } = useLocale();
  const carouselRef = useRef<HTMLDivElement>(null);

  const isEn = locale === "en";
  const name = app.name;
  const allReviews = app.appStoreReviews ?? [];
  const localizedReviews = reviewsForLocale(allReviews, locale === "es" ? "es" : "en");
  const [reviewScope, setReviewScope] = useState<"localized" | "all">("localized");
  const visibleReviews = reviewScope === "all" ? allReviews : localizedReviews;
  const tagline = isEn && app.tagline_en ? app.tagline_en : app.tagline;
  const promotionalText = isEn && app.promotionalText_en ? app.promotionalText_en : app.promotionalText;
  const shortDescription = isEn && app.shortDescription_en ? app.shortDescription_en : app.shortDescription;
  const longDescription = isEn && app.longDescription_en ? app.longDescription_en : app.longDescription;
  const problem = isEn && app.problem_en ? app.problem_en : app.problem;
  const benefits = isEn && app.benefits_en && app.benefits_en.length > 0 ? app.benefits_en : app.benefits;
  const features = isEn && app.features_en && app.features_en.length > 0 ? app.features_en : app.features;
  const audience = isEn && app.audience_en ? app.audience_en : app.audience;
  const category = getLocalizedAppCategory(app, locale);
  const statusMeta = getAppStatusMeta(app.status, locale);

  const getScreenshotPath = (shot: string) => {
    const resolved = getAppShotPath(app.slug, shot, locale);
    return resolved ? getAssetPath(resolved) : undefined;
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
                  {category}
                </span>
                <span className="flex items-center gap-1 rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-0.5 text-xs font-bold text-amber-300">
                  <Star size={12} fill="currentColor" className="text-amber-400" />
                  {app.userRatingCount && app.userRatingCount > 0
                    ? `${typeof app.averageRating === "number" ? app.averageRating.toFixed(1) : "—"} · ${app.userRatingCount}`
                    : (locale === "es" ? "Nuevo en App Store" : "New on the App Store")}
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

              {promotionalText ? (
                <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                  {promotionalText}
                </p>
              ) : (
                <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                  {longDescription}
                </p>
              )}

              <AppProductActions app={app} />
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
                  aria-label={locale === "es" ? "Anterior" : "Previous"}
                  type="button"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/70 transition-all hover:scale-105 hover:bg-white hover:text-slate-950 active:scale-95"
                  aria-label={locale === "es" ? "Siguiente" : "Next"}
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
                    const key = getScreenshotLabelKey(app.slug, s);
                    const val = t(key as any);
                    return val !== key ? val : s;
                  };
                  const label = getScreenshotLabel(shot);
                  return (
                    <div key={shot} className="snap-center shrink-0 flex flex-col items-center">
                      {(app.slug === "reps" || app.slug === "shield") && path ? (
                        <div className="relative aspect-[6.5/14] w-[260px] overflow-hidden rounded-[28px] sm:rounded-[32px] border border-white/15 bg-slate-900 shadow-2xl shadow-black/35 sm:w-[300px]">
                          <Image src={path} alt={`${app.name} - ${label}`} fill unoptimized className="object-cover" />
                        </div>
                      ) : (
                        <PhoneMockup screenshotSrc={path} alt={`${app.name} - ${label}`} priority compact={false} appPlaceholder={!path ? { name: app.name, category: app.category, tagline: label, firstIconText: "Vista", secondIconText: "Detalle App" } : undefined} />
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

      <AppMediaShowcase app={app} />

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
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${
                        app.status === "published" ? "border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400" : app.status === "testing" ? "border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400" : "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      }`}>
                        {statusMeta.label}
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
              <span className="text-2xl font-black text-ink">{app.userRatingCount && app.userRatingCount > 0 ? (typeof app.averageRating === "number" ? app.averageRating.toFixed(1) : "—") : "0.0"}</span>
              <div className="flex flex-col">
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.round(app.averageRating || 0) ? "currentColor" : "none"}
                      className={i < Math.round(app.averageRating || 0) ? "text-amber-400" : "text-slate-300"}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-graphite font-bold">
                  {app.userRatingCount || 0} {locale === "es" ? "valoraciones" : "ratings"}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8 flex flex-wrap items-center gap-2" role="group" aria-label={locale === "es" ? "Filtro de reseñas" : "Review filter"}>
            <button type="button" onClick={() => setReviewScope("localized")} className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${reviewScope === "localized" ? "border-brand-blue bg-brand-blue/10 text-brand-blue" : "border-line text-graphite hover:border-brand-blue/40"}`}>
              {locale === "es" ? `Mi idioma (${localizedReviews.length})` : `My language (${localizedReviews.length})`}
            </button>
            <button type="button" onClick={() => setReviewScope("all")} className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${reviewScope === "all" ? "border-brand-blue bg-brand-blue/10 text-brand-blue" : "border-line text-graphite hover:border-brand-blue/40"}`}>
              {locale === "es" ? `Todos los mercados (${allReviews.length})` : `All markets (${allReviews.length})`}
            </button>
          </div>

          {visibleReviews.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleReviews.map((review, idx) => (
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
                    <span className="text-brand-blue">{review.source === "web" ? (locale === "es" ? "Web" : "Website") : review.market ? review.market.toUpperCase() : "App Store"}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-line bg-themed-mist p-8 sm:p-10 text-center">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-brand-blue">
                {allReviews.length > 0
                  ? (locale === "es" ? "Hay más experiencias" : "More experiences available")
                  : (locale === "es" ? "Sé el primero" : "Be the first")}
              </p>
              <h3 className="mt-3 text-xl sm:text-2xl font-black tracking-tight text-ink">
                {allReviews.length > 0
                  ? (locale === "es" ? "Consulta las reseñas de otros mercados" : "See reviews from other markets")
                  : (locale === "es" ? "¿Has probado " + app.name + "?" : "Have you tried " + app.name + "?")}
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-graphite">
                {allReviews.length > 0
                  ? (locale === "es"
                    ? "No hay reseñas en tu idioma todavía. Cambia el filtro a todos los mercados o comparte tu propia experiencia."
                    : "There are no reviews in your language yet. Switch to all markets or share your own experience.")
                  : (locale === "es"
                    ? "Tu valoración ayuda a que otras personas encuentren " + app.name + ". Comparte tu experiencia y deja tu reseña y puntuación directamente en la App Store."
                    : "Your rating helps more people discover " + app.name + ". Share your experience and leave a review and rating directly in the App Store.")}
              </p>
              <a
                href={app.appStoreUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-blue"
              >
                <Star size={16} className="text-amber-400" fill="currentColor" />
                {locale === "es" ? "Valorar en la App Store" : "Rate on the App Store"}
              </a>
            </div>
          )}

          <AppReviewForm app={app} />
        </div>
      </section>

      <ChangelogTimeline app={app} />

      <AppFeedback app={app} />

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
