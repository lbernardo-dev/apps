"use client";

import {
  AppWindow,
  ArrowRight,
  Cloud,
  Lock,
  MessageCircle,
  Rocket,
  Smartphone,
  TrendingUp
} from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/FaqList";
import { InteractiveShowcase } from "@/components/InteractiveShowcase";
import { siteConfig } from "@/lib/site";
import { useLocale } from "@/lib/i18n";

export function LandingPageClient() {
  const { t } = useLocale();

  const heroProof = [
    { title: t("hero.proof.native.title"), body: t("hero.proof.native.body"), Icon: Smartphone },
    { title: t("hero.proof.privacy.title"), body: t("hero.proof.privacy.body"), Icon: Lock },
    { title: t("hero.proof.results.title"), body: t("hero.proof.results.body"), Icon: TrendingUp }
  ];

  const services = [
    { title: t("services.ios.title"), body: t("services.ios.body"), Icon: Smartphone },
    { title: t("services.design.title"), body: t("services.design.body"), Icon: AppWindow },
    { title: t("services.backend.title"), body: t("services.backend.body"), Icon: Cloud },
    { title: t("services.growth.title"), body: t("services.growth.body"), Icon: Rocket }
  ];

  const workflow = [
    [t("process.1.title"), t("process.1.body")],
    [t("process.2.title"), t("process.2.body")],
    [t("process.3.title"), t("process.3.body")],
    [t("process.4.title"), t("process.4.body")],
    [t("process.5.title"), t("process.5.body")]
  ];

  const faqItems = [
    { question: t("faq.q1.q"), answer: t("faq.q1.a") },
    { question: t("faq.q2.q"), answer: t("faq.q2.a") },
    { question: t("faq.q3.q"), answer: t("faq.q3.a") },
    { question: t("faq.q4.q"), answer: t("faq.q4.a") },
    { question: t("faq.q5.q"), answer: t("faq.q5.a") }
  ];

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line" style={{ backgroundColor: "var(--background)" }}>
        {/* Background Patterns & Orbs */}
        <div
          className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none"
          style={{
            maskImage: "radial-gradient(circle at center, black, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle at center, black, transparent 80%)"
          }}
        />
        <div className="glow-orb -left-20 -top-20 bg-brand-blue/10 size-[350px] animate-pulse-glow" />
        <div className="glow-orb right-10 bottom-10 bg-brand-green/10 size-[300px] animate-pulse-glow" style={{ animationDelay: "2s" }} />

        <div className="container relative z-10 grid min-h-[670px] items-center gap-10 py-14 lg:grid-cols-[1fr_0.9fr]">
          <div className="animate-fade-in-up">
            <h1 className="max-w-[560px] text-5xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-[4.9rem]">
              {t("hero.title.before")} <span className="gradient-text">{t("hero.title.highlight")}</span>{t("hero.title.after")}
            </h1>
            <p className="mt-7 max-w-[520px] text-lg leading-8 text-graphite">
              {t("hero.subtitle")}
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/contact">{t("hero.cta.primary")}</ButtonLink>
              <ButtonLink href="/apps" variant="secondary">
                {t("hero.cta.secondary")}
              </ButtonLink>
            </div>
            <div className="mt-16 grid max-w-[580px] gap-8 sm:grid-cols-3">
              {heroProof.map(({ title, body, Icon }) => (
                <article key={title} className="group">
                  <div className="inline-flex size-10 items-center justify-center rounded-lg bg-brand-blue/5 text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
                    <Icon aria-hidden="true" size={22} />
                  </div>
                  <h3 className="mt-5 text-sm font-semibold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-graphite">{body}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Hero Screenshot Showcase */}
          <div className="relative hidden min-h-[540px] lg:flex items-center justify-center">
            <div className="absolute inset-x-4 bottom-10 h-28 rounded-full bg-brand-blue/15 blur-3xl pointer-events-none animate-pulse-glow" />
            <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {/* Phone frame with real VitalsPath screenshot */}
              <div className="relative h-[520px] w-[260px] overflow-hidden rounded-[2.5rem] border-[8px] border-slate-950 bg-slate-950 shadow-[0_30px_80px_rgba(0,0,0,0.4)] transition-transform duration-500 hover:scale-[1.02]">
                <div className="absolute top-0 left-1/2 z-20 h-[18px] w-[100px] -translate-x-1/2 rounded-b-xl bg-slate-950" />
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/images/vitalspath/screen-01-dashboard.PNG`}
                  alt="VitalsPath Dashboard"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              {/* Floating mini-screenshots */}
              <div className="absolute -right-16 top-8 h-[140px] w-[70px] overflow-hidden rounded-xl border-4 border-slate-950 bg-slate-950 shadow-lg rotate-6 opacity-80 transition-all duration-500 hover:opacity-100 hover:rotate-0">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/images/vitalspath/screen-04-medications.PNG`}
                  alt="Medications"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -left-14 bottom-20 h-[140px] w-[70px] overflow-hidden rounded-xl border-4 border-slate-950 bg-slate-950 shadow-lg -rotate-6 opacity-80 transition-all duration-500 hover:opacity-100 hover:rotate-0">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/images/vitalspath/screen-13-symptoms.PNG`}
                  alt="Symptoms"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Interactive Showcase ──────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line py-24" style={{ backgroundColor: "var(--color-mist)" }}>
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold tracking-tight text-ink">{t("showcase.title")}</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-graphite">
              {t("showcase.subtitle")}
            </p>
          </div>
          <InteractiveShowcase />
        </div>
      </section>

      {/* ─── Services Grid ─────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line py-24" style={{ backgroundColor: "var(--background)" }}>
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold tracking-tight text-ink">{t("services.title")}</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-graphite">
              {t("services.subtitle")}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map(({ title, body, Icon }) => (
              <article className="glass-card rounded-xl p-6 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group" key={title}>
                <div>
                  <div className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue mb-6 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                    <Icon aria-hidden="true" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-ink group-hover:text-brand-blue transition-colors">{title}</h3>
                  <p className="mt-4 text-sm leading-6 text-graphite">{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Process Timeline ──────────────────────────────── */}
      <section className="border-b border-line py-20" style={{ backgroundColor: "var(--background)" }}>
        <div className="container">
          <h2 className="text-center text-4xl font-semibold tracking-tight text-ink">{t("process.title")}</h2>
          <ol className="relative mt-14 grid gap-8 lg:grid-cols-5">
            <span className="absolute left-[8%] right-[8%] top-7 hidden h-0.5 bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-green lg:block" />
            {workflow.map(([title, body], index) => (
              <li className="relative text-center" key={title}>
                <span className="mx-auto grid size-14 place-items-center rounded-full border-2 border-brand-blue text-xl font-semibold text-brand-blue transition-all duration-300 hover:bg-brand-blue hover:text-white" style={{ backgroundColor: "var(--background)" }}>
                  {index + 1}
                </span>
                <h3 className="mt-5 text-base font-semibold text-ink">{title}</h3>
                <p className="mx-auto mt-3 max-w-48 text-sm leading-6 text-graphite">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────── */}
      <section className="border-b border-line py-20" style={{ backgroundColor: "var(--background)" }}>
        <div className="container">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-ink">{t("faq.title")}</h2>
          <div className="mt-8 grid gap-9 lg:grid-cols-[1fr_360px]">
            <FaqList items={faqItems} />
            <aside className="glass-card rounded-xl p-7">
              <div className="grid size-16 place-items-center rounded-full bg-brand-green text-white">
                <MessageCircle aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-ink">{t("faq.cta.title")}</h3>
              <p className="mt-3 text-sm leading-6 text-graphite">
                {t("faq.cta.body")}
              </p>
              <div className="mt-6">
                <ButtonLink href="/contact" showArrow={false}>
                  {t("faq.cta.button")}
                </ButtonLink>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─────────────────────────────────────── */}
      <section className="py-10" style={{ backgroundColor: "var(--background)" }}>
        <div className="container">
          <div className="glass-card rounded-2xl p-8 lg:p-10 relative overflow-hidden">
            {/* Background gradient accent */}
            <div className="absolute -right-20 -top-20 size-[300px] rounded-full bg-brand-blue/10 blur-3xl pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 size-[200px] rounded-full bg-brand-green/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-center">
              <div className="grid size-20 place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan text-white shadow-lg">
                <Rocket aria-hidden="true" size={34} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-ink">{t("cta.title")}</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-graphite">
                  {t("cta.body")}
                </p>
              </div>
              <ButtonLink href="/contact">{t("cta.button")}</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
