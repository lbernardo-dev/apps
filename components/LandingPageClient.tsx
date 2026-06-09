"use client";

import {
  AppWindow,
  ArrowRight,
  Cloud,
  Lock,
  MessageCircle,
  Rocket,
  Smartphone,
  TrendingUp,
  Award,
  CheckCircle,
  Quote,
  Star,
  ShieldCheck,
  ChevronRight,
  Terminal,
  FileCode,
  Users,
  BriefcaseBusiness
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { FaqList } from "@/components/FaqList";
import { InteractiveShowcase } from "@/components/InteractiveShowcase";
import { ContactForm } from "@/components/ContactForm";
import { PhoneMockup } from "@/components/PhoneMockup";
import { siteConfig, getAssetPath } from "@/lib/site";
import { useLocale } from "@/lib/i18n";
import { fallbackAboutProfile } from "@/lib/about-profile";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { fallbackHomeSections, mergeHomeSections, type HomeSection } from "@/lib/home-content";

export function LandingPageClient() {
  const { t } = useLocale();

  // ── Avatar (profile) ────────────────────────────────────────────
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(fallbackAboutProfile.image_url);

  // ── Dynamic content from Supabase ───────────────────────────────
  const [sections, setSections] = useState<Record<string, HomeSection>>(fallbackHomeSections);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    // Fetch avatar
    supabase
      .from("about_profiles")
      .select("image_url")
      .eq("slug", "lester-romero-bernardo")
      .maybeSingle()
      .then(({ data }) => {
        if (data?.image_url) setAvatarUrl(data.image_url);
      });

    // Fetch all home sections
    supabase
      .from("home_sections")
      .select("key, title, body, is_enabled")
      .then(({ data }) => {
        if (data && data.length > 0) {
          setSections(mergeHomeSections(data));
        }
      });
  }, []);

  /** Helper: get a section by key, fallback to static data */
  const s = (key: string): HomeSection =>
    sections[key] ?? fallbackHomeSections[key] ?? { key, title: key, body: "", is_enabled: true };

  // ── Derived data ─────────────────────────────────────────────────
  const heroProof = [
    { title: s("hero.proof.1").title, body: s("hero.proof.1").body, Icon: Cloud },
    { title: s("hero.proof.2").title, body: s("hero.proof.2").body, Icon: Smartphone },
    { title: s("hero.proof.3").title, body: s("hero.proof.3").body, Icon: BriefcaseBusiness },
  ];

  const services = [
    {
      title: s("services.growth").title,
      body: s("services.growth").body,
      Icon: Cloud,
      gradient: "from-blue-500/10 to-indigo-500/10 hover:border-brand-blue/30",
    },
    {
      title: s("services.ios").title,
      body: s("services.ios").body,
      Icon: Smartphone,
      gradient: "from-cyan-500/10 to-teal-500/10 hover:border-brand-cyan/30",
    },
    {
      title: s("services.design").title,
      body: s("services.design").body,
      Icon: AppWindow,
      gradient: "from-emerald-500/10 to-teal-500/10 hover:border-brand-green/30",
    },
    {
      title: s("services.backend").title,
      body: s("services.backend").body,
      Icon: Terminal,
      gradient: "from-purple-500/10 to-pink-500/10 hover:border-purple-500/30",
    },
  ];

  const workflow = [
    [s("process.1").title, s("process.1").body],
    [s("process.2").title, s("process.2").body],
    [s("process.3").title, s("process.3").body],
    [s("process.4").title, s("process.4").body],
    [s("process.5").title, s("process.5").body],
  ];

  const faqItems = [
    { question: s("faq.q1").title, answer: s("faq.q1").body },
    { question: s("faq.q2").title, answer: s("faq.q2").body },
    { question: s("faq.q3").title, answer: s("faq.q3").body },
    { question: s("faq.q4").title, answer: s("faq.q4").body },
    { question: s("faq.q5").title, answer: s("faq.q5").body },
  ];

  // Bio paragraphs — stored as one body with \n\n separator
  const bioParts = s("bio").body.split("\n\n");
  const bioPara1 = bioParts[0] ?? "";
  const bioPara2 = bioParts[1] ?? "";

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line bg-themed-white pt-6 pb-20 lg:py-24">
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none"
          style={{
            maskImage: "radial-gradient(circle at center, black, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle at center, black, transparent 80%)"
          }}
          aria-hidden="true"
        />
        {/* Glowing Orbs */}
        <div className="glow-orb -left-20 -top-20 bg-brand-blue/10 size-[350px] animate-pulse-glow" aria-hidden="true" />
        <div className="glow-orb right-10 bottom-10 bg-brand-green/10 size-[300px] animate-pulse-glow" style={{ animationDelay: "2s" }} aria-hidden="true" />

        <div className="container relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-themed-mist px-3 py-1 text-xs font-semibold text-brand-blue mb-6">
              <Award size={14} className="text-brand-blue" />
              <span>Salesforce Certified &amp; iOS Developer</span>
            </div>
            
            <h1 className="max-w-[620px] text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.5rem]">
              {s("hero").title}
            </h1>
            
            <p className="mt-6 max-w-[540px] text-base sm:text-lg leading-8 text-graphite">
              {s("hero").body}
            </p>
            
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/contact" className="shadow-lg hover:shadow-brand-blue/20">
                {s("hero.cta.primary").title}
              </ButtonLink>
              <ButtonLink href="/apps" variant="secondary">
                {s("hero.cta.secondary").title}
              </ButtonLink>
            </div>
            
            <div className="mt-14 grid max-w-[600px] gap-6 sm:grid-cols-3">
              {heroProof.map(({ title, body, Icon }) => (
                <article key={title} className="group relative rounded-xl border border-line bg-themed-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-brand-blue/30 hover:bg-themed-card">
                  <div className="inline-flex size-9 items-center justify-center rounded-lg bg-brand-blue/5 text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
                    <Icon aria-hidden="true" size={18} />
                  </div>
                  <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-ink">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-graphite">{body}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Hero Premium Interactive Mockups */}
          <div className="relative min-h-[480px] lg:min-h-[580px] flex items-center justify-center">
            {/* Ambient Backlight */}
            <div className="absolute inset-0 rounded-full bg-brand-blue/15 blur-3xl pointer-events-none transform translate-y-8" aria-hidden="true" />
            
            <div className="relative w-full max-w-[320px] sm:max-w-none flex justify-center items-center h-full">
              {/* Left Floating iPhone */}
              <PhoneMockup
                screenshotSrc={getAssetPath("assets/images/vitalspath/screen-13-symptoms.PNG")}
                alt="VitalsPath Symptoms Screen"
                compact
                className="absolute left-[-20px] sm:left-[20px] top-[40px] z-10 animate-float-medium"
              />

              {/* Center Main iPhone */}
              <PhoneMockup
                screenshotSrc={getAssetPath("assets/images/vitalspath/screen-01-dashboard.PNG")}
                alt="VitalsPath Dashboard Screen"
                className="relative z-20"
              />

              {/* Right Floating iPhone */}
              <PhoneMockup
                screenshotSrc={getAssetPath("assets/images/vitalspath/screen-04-medications.PNG")}
                alt="VitalsPath Medications Screen"
                compact
                className="absolute right-[-20px] sm:right-[20px] bottom-[30px] z-10 animate-float-slow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust & Certifications Ribbon ────────────────── */}
      <div className="relative z-30 -mt-6 border-y border-line" style={{ backgroundColor: "var(--color-surface)" }}>
        <div className="backdrop-blur-md">
          <div className="container py-5 flex flex-wrap justify-around items-center gap-6 text-center">
            <div className="flex items-center gap-3">
              <Award className="text-brand-blue" size={20} />
              <span className="text-sm font-semibold text-ink">{t("home.trust.certs")}</span>
            </div>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-line" aria-hidden="true" />
            <div className="flex items-center gap-3">
              <Smartphone className="text-brand-cyan" size={20} />
              <span className="text-sm font-semibold text-ink">{t("home.trust.native")}</span>
            </div>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-line" aria-hidden="true" />
            <div className="flex items-center gap-3">
              <BriefcaseBusiness className="text-purple-400" size={20} />
              <span className="text-sm font-semibold text-ink">{t("home.trust.xp")}</span>
            </div>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-line" aria-hidden="true" />
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-brand-green" size={20} />
              <span className="text-sm font-semibold text-ink">{t("home.trust.delivered")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Interactive Showcase ──────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line py-20 lg:py-28" style={{ backgroundColor: "var(--color-mist)" }}>
        <div className="container relative z-10 reveal-on-scroll">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-blue">Portafolio</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink mt-3">{t("showcase.title")}</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-graphite">
              {t("showcase.subtitle")}
            </p>
          </div>
          <InteractiveShowcase />
        </div>
      </section>

      {/* ─── Services Grid ─────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line py-20 lg:py-28 bg-themed-white">
        <div className="container relative z-10">
          <div className="text-center mb-16 reveal-on-scroll">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-blue">Servicios Profesionales</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink mt-3">{s("services").title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-graphite">
              {s("services").body}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map(({ title, body, Icon, gradient }, index) => (
              <article
                className="glass-card gradient-border-card rounded-2xl p-7 flex flex-col justify-between group reveal-on-scroll"
                key={title}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div>
                  <div className={`inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-brand-blue mb-8 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon aria-hidden="true" size={22} className="text-brand-blue group-hover:text-brand-cyan transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-ink transition-colors group-hover:text-brand-blue">{title}</h3>
                  <p className="mt-4 text-xs sm:text-sm leading-6 text-graphite">{body}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-line flex items-center justify-end">
                  <span className="text-xs font-semibold text-brand-blue group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1">
                    Hablemos <ArrowRight size={12} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Lester's Bio Section ──────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line py-20 lg:py-28 bg-themed-mist">
        <div className="container relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="reveal-on-scroll">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-cyan">{s("bio.label").title}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink mt-3">{s("bio").title}</h2>
            
            <div className="w-12 h-1 bg-brand-blue my-6 rounded" />
            
            <p className="text-sm sm:text-base leading-8 text-graphite mb-5">
              {bioPara1}
            </p>
            {bioPara2 && (
              <p className="text-sm leading-7 text-graphite">
                {bioPara2}
              </p>
            )}
            
            <div className="mt-8">
              <ButtonLink href="/about" className="shadow-sm">
                {s("bio.cta").title}
              </ButtonLink>
            </div>
          </div>

          {/* Quick Metrics Card */}
          <div className="reveal-on-scroll" style={{ transitionDelay: "150ms" }}>
            <div className="glass-card gradient-border-card rounded-2xl p-6 lg:p-8 shadow-soft relative overflow-hidden bg-themed-card">
              <div className="absolute right-0 top-0 w-24 h-24 bg-brand-blue/5 rounded-full blur-xl" />
              
              <div className="flex items-center gap-4 border-b border-line pb-6 mb-6">
                <div className="relative size-16 overflow-hidden rounded-full border-2 border-brand-blue shadow-md">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Lester Romero Bernardo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-brand-blue flex items-center justify-center text-white text-xl font-bold">
                      L
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-ink">Lester Romero Bernardo</h3>
                  <p className="text-xs text-graphite">PageGroup Consultant | iOS Craftsperson</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-line bg-themed-mist/30">
                  <div className="flex items-center gap-2 mb-1">
                    <Award size={16} className="text-brand-blue" />
                    <span className="text-[10px] font-bold text-graphite uppercase tracking-wide">Salesforce</span>
                  </div>
                  <p className="text-2xl font-black text-ink">9x</p>
                  <p className="text-[11px] text-graphite">Certificaciones Oficiales</p>
                </div>

                <div className="p-4 rounded-xl border border-line bg-themed-mist/30">
                  <div className="flex items-center gap-2 mb-1">
                    <Smartphone size={16} className="text-brand-cyan" />
                    <span className="text-[10px] font-bold text-graphite uppercase tracking-wide">iOS</span>
                  </div>
                  <p className="text-2xl font-black text-ink">Swift</p>
                  <p className="text-[11px] text-graphite">Diseño Nativo SwiftUI</p>
                </div>

                <div className="p-4 rounded-xl border border-line bg-themed-mist/30">
                  <div className="flex items-center gap-2 mb-1">
                    <Users size={16} className="text-purple-400" />
                    <span className="text-[10px] font-bold text-graphite uppercase tracking-wide">Agilidad</span>
                  </div>
                  <p className="text-2xl font-black text-ink">SMPC</p>
                  <p className="text-[11px] text-graphite">Certified ScrumMaster</p>
                </div>

                <div className="p-4 rounded-xl border border-line bg-themed-mist/30">
                  <div className="flex items-center gap-2 mb-1">
                    <Lock size={16} className="text-brand-green" />
                    <span className="text-[10px] font-bold text-graphite uppercase tracking-wide">Calidad</span>
                  </div>
                  <p className="text-2xl font-black text-ink">100%</p>
                  <p className="text-[11px] text-graphite">Privacidad Local Cifrada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Process Timeline ──────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line py-20 lg:py-28 bg-themed-white">
        <div className="container relative z-10">
          <div className="text-center mb-20 reveal-on-scroll">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-blue">Metodología</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink mt-3">{s("process").title}</h2>
          </div>
          
          <div className="relative mt-14 grid gap-8 md:grid-cols-5">
            {/* Connecting Progress Line */}
            <div className="absolute left-[10%] right-[10%] top-6 hidden h-[2.5px] bg-line md:block" aria-hidden="true">
              <div className="h-full bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-green w-full timeline-fill reveal-on-scroll" />
            </div>
            
            {workflow.map(([title, body], index) => (
              <div
                className="relative text-center flex flex-col items-center reveal-on-scroll group"
                key={title}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="grid size-12 place-items-center rounded-full border-[3px] border-brand-blue text-base font-bold text-brand-blue transition-all duration-300 bg-themed-white group-hover:bg-brand-blue group-hover:text-white group-hover:scale-110 shadow-md group-hover:shadow-brand-blue/30 relative z-10">
                  {index + 1}
                </div>
                <h3 className="mt-6 text-base font-bold text-ink transition-colors group-hover:text-brand-blue">{title}</h3>
                <p className="mt-3 max-w-44 text-xs sm:text-sm leading-6 text-graphite">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ──────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line py-20 lg:py-28 bg-themed-mist">
        {/* Decorative background shape */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />
        
        <div className="container relative z-10">
          <div className="text-center mb-16 reveal-on-scroll">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-blue">Garantía y Confianza</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink mt-3">{s("testimonials").title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-graphite">
              {s("testimonials").body}
            </p>
          </div>

          <TestimonialsGrid />
        </div>
      </section>

      {/* ─── FAQ + Contact Form ────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-themed-white relative overflow-hidden">
        {/* Background glow orb */}
        <div className="glow-orb right-[-50px] top-1/4 bg-brand-cyan/5 size-[400px] blur-[150px] pointer-events-none" aria-hidden="true" />

        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
            
            {/* FAQ Column */}
            <div className="reveal-on-scroll">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-blue">Ayuda y FAQ</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink mt-3 mb-8">{s("faq").title}</h2>
              
              <FaqList items={faqItems} />
              
              <div className="mt-8 p-5 rounded-2xl border border-line bg-themed-mist/30 flex items-start gap-4">
                <div className="size-9 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 mt-1">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink">{t("faq.cta.title")}</h4>
                  <p className="text-xs text-graphite leading-5 mt-1">{t("faq.cta.body")}</p>
                </div>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="reveal-on-scroll" style={{ transitionDelay: "150ms" }}>
              <div className="mb-6 lg:mb-8">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-cyan">Hablemos</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-ink mt-3">Iniciar Consulta</h2>
              </div>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

// ── Testimonials Grid — separate sub-component ─────────────────────
// Loads from `testimonials` table with fallback to static content
function TestimonialsGrid() {
  type Review = { quote: string; author: string; role: string; rating: number };

  const fallbackReviews: Review[] = [
    {
      quote: "Excelente atención al detalle. VitalsPath es intuitiva, rápida y la interfaz de usuario se siente sumamente limpia, nativa y moderna.",
      author: "Usuario de VitalsPath",
      role: "VitalsPath iOS App",
      rating: 5,
    },
    {
      quote: "Una arquitectura muy sólida. La integración de widgets en la pantalla de bloqueo y la sincronización con iCloud es impecable.",
      author: "Opinión en App Store",
      role: "App Store Feedback",
      rating: 5,
    },
  ];

  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    supabase
      .from("testimonials")
      .select("quote, name, role, is_published, sort_order")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setReviews(
            data.map((r) => ({
              quote: r.quote,
              author: r.name,
              role: r.role ?? "",
              rating: 5,
            }))
          );
        }
      });
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
      {reviews.map((review, index) => (
        <div
          key={index}
          className="glass-card gradient-border-card rounded-2xl p-7 shadow-sm bg-themed-card relative flex flex-col justify-between reveal-on-scroll"
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          <div className="absolute right-6 top-6 text-brand-blue/10 pointer-events-none" aria-hidden="true">
            <Quote size={56} strokeWidth={3} />
          </div>
          
          <div>
            <div className="flex gap-1 mb-5">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} size={15} fill="currentColor" className="text-amber-400 border-none" />
              ))}
            </div>
            
            <p className="text-xs sm:text-sm leading-7 text-graphite italic relative z-10">
              &ldquo;{review.quote}&rdquo;
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-line flex justify-between items-center">
            <div>
              <h4 className="text-sm font-bold text-ink">{review.author}</h4>
              <p className="text-[10px] font-bold text-brand-cyan tracking-wider uppercase mt-0.5">{review.role}</p>
            </div>
            <div className="size-8 rounded-full bg-brand-blue/10 flex items-center justify-center text-xs font-bold text-brand-blue">
              {review.author[0]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
