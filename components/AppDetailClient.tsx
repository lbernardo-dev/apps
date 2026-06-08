"use client";

import { useEffect } from "react";
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
  Quote
} from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { FaqList } from "@/components/FaqList";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { useLocale } from "@/lib/i18n";
import type { AppItem } from "@/lib/types";

const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function AppDetailClient({ app }: { app: AppItem }) {
  const { t } = useLocale();

  // Scroll reveal trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ─── Hero Section ──────────────────────────────────── */}
      <section className="section bg-themed-white relative overflow-hidden pt-10 pb-20">
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" aria-hidden="true" />
        {/* Glowing Orbs */}
        <div className="glow-orb -left-20 -top-20 bg-brand-blue/10 size-[300px] animate-pulse-glow" aria-hidden="true" />
        <div className="glow-orb right-10 bottom-0 bg-brand-cyan/10 size-[250px] animate-pulse-glow" style={{ animationDelay: "2s" }} aria-hidden="true" />

        <div className="container relative z-10">
          {/* Breadcrumb / Back Link */}
          <div className="mb-8 animate-fade-in-up">
            <Link 
              href="/apps" 
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-graphite hover:text-brand-blue transition-colors group"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              <span>Volver al Catálogo</span>
            </Link>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="animate-fade-in-up">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-bold text-brand-blue">
                  {app.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-amber-400 font-bold bg-amber-400/5 px-2.5 py-0.5 rounded-full border border-amber-400/10">
                  <Star size={12} fill="currentColor" className="text-amber-400" />
                  4.9
                </span>
              </div>
              
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink">
                {app.name}
              </h1>
              
              <p className="mt-4 text-lg sm:text-xl font-bold leading-8 text-brand-cyan">
                {app.tagline}
              </p>
              
              <p className="mt-6 max-w-2xl text-sm sm:text-base leading-8 text-graphite">
                {app.longDescription}
              </p>
              
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
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

            {/* Framed Devices Screenshots Gallery */}
            <div className="w-full animate-fade-in-up" style={{ animationDelay: "150ms" }}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-graphite mb-6">{t("app.screenshots")}</h3>
              
              <div className="relative">
                {/* Scroll Shadows indicator */}
                <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
                
                <div className="flex gap-4 overflow-x-auto pb-6 pt-2 snap-x scrollbar-thin scroll-smooth px-1">
                  {app.screenshots.map((shot) => (
                    <div key={shot} className="snap-center shrink-0 w-[170px] flex flex-col items-center">
                      <div className="relative h-[320px] w-[160px] overflow-hidden rounded-[2.1rem] border-[6px] border-slate-900 bg-slate-950 shadow-md hover:shadow-brand-blue/20 hover:scale-[1.03] hover:-rotate-1 transition-all duration-500 group shine-effect">
                        <div className="absolute top-0 left-1/2 z-30 h-2.5 w-14 -translate-x-1/2 rounded-b-md bg-slate-950" />
                        {app.slug === "vitalspath" ? (
                          <img
                            src={`${assetBasePath}/assets/images/vitalspath/${
                              shot === "Dashboard" ? "screen-01-dashboard.PNG" :
                              shot === "Medicación" ? "screen-04-medications.PNG" :
                              shot === "Síntomas" ? "screen-13-symptoms.PNG" :
                              shot === "Bienestar" ? "screen-18-wellness.PNG" :
                              shot === "Citas" ? "screen-11-appointments.PNG" :
                              shot === "Widgets" ? "screen-20-widgets-home.PNG" :
                              "screen-27-live-activity.PNG"
                            }`}
                            alt={shot}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="bg-gradient-to-br from-slate-900 to-slate-950 w-full h-full p-4 flex flex-col justify-between text-white">
                            <div className="text-[8px] text-brand-cyan uppercase font-extrabold tracking-widest">{app.name}</div>
                            <div className="text-[10px] leading-4 font-bold text-slate-100">{shot}</div>
                            <div className="space-y-1.5 pt-2">
                              <span className="block h-1 rounded-full bg-slate-800" />
                              <span className="block h-1 w-3/4 rounded-full bg-slate-800" />
                              <span className="block h-1 w-1/2 rounded-full bg-brand-blue" />
                            </div>
                          </div>
                        )}
                        {/* Glass shine element */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-20" />
                      </div>
                      <span className="block text-[10px] font-bold text-graphite mt-3 uppercase tracking-wider">{shot}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Challenge Section ─────────────────────────── */}
      <section className="section bg-themed-mist relative overflow-hidden">
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

      {/* ─── Features & Specs Section ──────────────────────── */}
      <section className="section bg-themed-white relative overflow-hidden">
        <div className="container grid gap-12 lg:grid-cols-2">
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
                    className="flex items-start gap-4 p-4 rounded-2xl border border-line bg-themed-mist/25 transition-all duration-300 hover:border-brand-blue/20 hover:bg-themed-mist/50" 
                    key={feature}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold mt-0.5">
                      {index + 1}
                    </span>
                    <div>
                      <strong className="text-sm font-bold text-ink block">{featureTitle}</strong>
                      {featureDesc && <span className="text-xs sm:text-sm leading-6 text-graphite block mt-1">{featureDesc.trim()}</span>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Specifications Sidebar (Dashboard style) */}
          <div className="reveal-on-scroll" style={{ transitionDelay: "150ms" }}>
            <div className="rounded-2xl border border-line bg-themed-mist p-6 lg:p-8 shadow-sm flex flex-col justify-between h-full relative overflow-hidden bg-gradient-to-br from-themed-mist to-themed-card">
              {/* Decorative top dot grid */}
              <div className="absolute right-4 top-4 opacity-10 pointer-events-none" aria-hidden="true">
                <svg width="60" height="60" fill="currentColor"><circle cx="5" cy="5" r="2"/><circle cx="25" cy="5" r="2"/><circle cx="45" cy="5" r="2"/><circle cx="5" cy="25" r="2"/><circle cx="25" cy="25" r="2"/><circle cx="45" cy="25" r="2"/><circle cx="5" cy="45" r="2"/><circle cx="25" cy="45" r="2"/><circle cx="45" cy="45" r="2"/></svg>
              </div>

              <div>
                <h3 className="text-xl font-bold text-ink mb-8 flex items-center gap-2">
                  <Sliders size={18} className="text-brand-blue" />
                  {t("app.specs.title")}
                </h3>
                
                <dl className="grid gap-6 text-sm">
                  {/* Development status */}
                  <div className="flex justify-between items-center gap-6 border-b border-line pb-4">
                    <dt className="flex items-center gap-2.5 text-graphite">
                      <ShieldCheck size={16} className="text-brand-green" />
                      {t("app.specs.status")}
                    </dt>
                    <dd className="font-bold">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        app.status === "published" 
                          ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20" 
                          : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20"
                      }`}>
                        {app.status === "published" ? t("app.specs.status.published") : t("app.specs.status.coming_soon")}
                      </span>
                    </dd>
                  </div>
                  
                  {/* Platforms */}
                  <div className="flex justify-between items-center gap-6 border-b border-line pb-4">
                    <dt className="flex items-center gap-2.5 text-graphite">
                      <Smartphone size={16} className="text-brand-blue" />
                      {t("app.specs.platforms")}
                    </dt>
                    <dd className="font-bold text-ink flex gap-1.5">
                      {app.platform.map((p) => (
                        <span key={p} className="rounded bg-themed-card border border-line px-2 py-0.5 text-xs font-semibold">
                          {p}
                        </span>
                      ))}
                    </dd>
                  </div>
                  
                  {/* Target Audience */}
                  <div className="flex justify-between items-start gap-6 border-b border-line pb-4">
                    <dt className="flex items-center gap-2.5 text-graphite mt-0.5">
                      <Users size={16} className="text-purple-400" />
                      {t("app.specs.audience")}
                    </dt>
                    <dd className="max-w-[240px] text-right font-bold text-ink text-xs sm:text-sm">{app.audience}</dd>
                  </div>
                  
                  {/* Last updated */}
                  <div className="flex justify-between items-center gap-6">
                    <dt className="flex items-center gap-2.5 text-graphite">
                      <Calendar size={16} className="text-brand-cyan" />
                      {t("app.specs.updated")}
                    </dt>
                    <dd className="font-bold text-ink">{app.updatedAt}</dd>
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
          
          <div className="reveal-on-scroll" style={{ transitionDelay: "150ms" }}>
            <FaqList items={app.faq} />
          </div>
        </div>
      </section>
    </>
  );
}
