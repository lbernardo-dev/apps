"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, BadgeCheck, Check, ChevronRight, Database, ExternalLink,
  Gauge, Layers3, LockKeyhole, MessageCircle, Orbit, ShieldCheck,
  Smartphone, Sparkles, Star, Workflow
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { FaqList } from "@/components/FaqList";
import { resolveAppIconPath } from "@/components/AppIcon";
import { useLocale } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";
import { getAssetPath } from "@/lib/site";
import { getStaticPath, getAppPath } from "@/lib/routes";
import { getAppScreens, getAppGradientStyle, getLocalizedAppCategory } from "@/lib/product-media";
import { reviewsForLocale } from "@/lib/reviews";
import type { AppItem, Testimonial } from "@/lib/types";

interface LandingPageClientProps {
  initialSections?: Record<string, unknown>;
  initialTestimonials?: Testimonial[];
  initialProfile?: { full_name?: string; headline?: string; image_url?: string };
  initialFeaturedApps?: AppItem[];
}

export function LandingPageClient({ initialFeaturedApps = [], initialProfile, initialTestimonials = [] }: LandingPageClientProps) {
  const { locale } = useLocale();
  const es = locale === "es";
  const [audience, setAudience] = useState<"product" | "service">("product");
  const apps = initialFeaturedApps.length ? initialFeaturedApps : [];
  const vitalspath = apps.find(app => app.slug === "vitalspath");
  const vitalsLanguages = vitalspath?.appStore?.languages?.length || 34;
  const publishedNames = apps.filter(app => app.status === "published").map(app => app.name);
  const upcomingNames = apps.filter(app => app.status === "coming_soon").map(app => app.name);
  const joinNames = (names: string[], conjunction: string) =>
    names.length <= 1 ? names.join("") : `${names.slice(0, -1).join(", ")} ${conjunction} ${names[names.length - 1]}`;
  const productProof = es
    ? `${joinNames(publishedNames, "y")} ya están disponibles${upcomingNames.length ? `; ${joinNames(upcomingNames, "y")} están en preparación` : ""}.`
    : `${joinNames(publishedNames, "and")} are available${upcomingNames.length ? `; ${joinNames(upcomingNames, "and")} are in preparation` : ""}.`;

  const heroCopy = {
    product: es ? {
      eyebrow: "Apps iOS nativas · Software en App Store",
      hero: "Apps que resuelven un problema real, no un MVP que muere al lanzarse.",
      subhero: "Productos iOS construidos para usarse cada día: investigación, UX, backend, privacidad y evolución continua dirigidos por una sola persona.",
      primary: "Explorar las apps",
      primaryHref: "#productos",
      secondary: "¿Necesitas un producto propio?",
      secondaryHref: "#contacto",
      proof: productProof
    } : {
      eyebrow: "Native iOS apps · Software on the App Store",
      hero: "Apps that solve a real problem, not an MVP that dies at launch.",
      subhero: "iOS products built to be used every day: research, UX, backend, privacy and continuous evolution owned by a single person.",
      primary: "Explore the apps",
      primaryHref: "#productos",
      secondary: "Building your own product?",
      secondaryHref: "#contacto",
      proof: productProof
    },
    service: es ? {
      eyebrow: "Consultoría Salesforce · Desarrollo de producto",
      hero: "Productos complejos. Experiencias que se sienten simples.",
      subhero: "Convierto operaciones complejas en apps iOS y sistemas Salesforce claros, rápidos y preparados para crecer. Estrategia, UX, desarrollo y lanzamiento bajo una sola dirección de producto.",
      primary: "Cuéntame tu reto",
      primaryHref: "#contacto",
      secondary: "Ver casos de producto",
      secondaryHref: "#productos",
      proof: "Respuesta directa en 1–2 días laborables, con riesgos y siguiente paso."
    } : {
      eyebrow: "Salesforce consulting · Product engineering",
      hero: "Complex products. Experiences that feel simple.",
      subhero: "I turn complex operations into clear, fast and scalable iOS apps and Salesforce systems. Strategy, UX, engineering and launch under one product direction.",
      primary: "Tell me your challenge",
      primaryHref: "#contacto",
      secondary: "View product cases",
      secondaryHref: "#productos",
      proof: "A direct response within 1–2 working days, with risks and a practical next step."
    }
  }[audience];

  const copy = es ? {
    eyebrow: "Producto digital · iOS nativo · Automatización CRM",
    hero: "Productos complejos. Experiencias que se sienten simples.",
    subhero: "Convierto operaciones complejas en apps iOS y sistemas Salesforce claros, rápidos y preparados para crecer. Estrategia, UX, desarrollo y lanzamiento bajo una sola dirección de producto.",
    primary: "Cuéntame tu reto",
    secondary: "Ver casos de producto",
    proof: "Respuesta directa en 1–2 días laborables, con riesgos y siguiente paso.",
    workLabel: "Trabajo seleccionado",
    workTitle: "No son conceptos. Son productos construidos para usarse.",
      workBody: "Cada producto combina investigación, experiencia nativa, automatización y una base técnica pensada para evolucionar después del lanzamiento, tanto si ya está disponible como si está en preparación.",
    capabilitiesLabel: "Capacidades",
    capabilitiesTitle: "Una visión completa evita productos fragmentados.",
    processLabel: "Sistema de trabajo",
    processTitle: "De una necesidad difusa a un producto que se puede medir.",
    principlesLabel: "Criterio de producto",
    principlesTitle: "Menos capas de presentación. Más señales de confianza.",
    aboutLabel: "Dirección técnica",
    aboutTitle: "Un único responsable desde la estrategia hasta la entrega.",
    aboutBody: "Soy Lester Romero Bernardo, ingeniero informático y consultor con base en Valencia. Combino experiencia en Salesforce, arquitectura de datos y desarrollo Apple para reducir traspasos, ambigüedad y deuda de producto.",
    contactLabel: "Siguiente paso",
    contactTitle: "Cuéntame qué debe cambiar en tu producto o negocio.",
    contactBody: "Recibirás una respuesta directa con preguntas concretas, riesgos iniciales y el mejor siguiente paso. Sin presentaciones comerciales genéricas.",
    faq: "Preguntas antes de empezar",
    testimonialLabel: "Qué dicen",
    testimonialTitle: "Trabajo que deja sistema, no dependencia."
  } : {
    eyebrow: "Digital products · Native iOS · CRM automation",
    hero: "Complex products. Experiences that feel simple.",
    subhero: "I turn complex operations into clear, fast and scalable iOS apps and Salesforce systems. Strategy, UX, engineering and launch under one product direction.",
    primary: "Tell me your challenge",
    secondary: "View product cases",
    proof: "A direct response within 1–2 working days, with risks and a practical next step.",
    workLabel: "Selected work", workTitle: "Not concepts. Products built to be used.",
    workBody: "Each product combines research, native experience, automation and a technical foundation designed to evolve after launch, whether it is available today or being prepared.",
    capabilitiesLabel: "Capabilities", capabilitiesTitle: "A complete view prevents fragmented products.",
    processLabel: "Working system", processTitle: "From an unclear need to a product you can measure.",
    principlesLabel: "Product judgement", principlesTitle: "Less presentation theatre. More trust signals.",
    aboutLabel: "Technical direction", aboutTitle: "One accountable owner from strategy to delivery.",
    aboutBody: "I’m Lester Romero Bernardo, a software engineer and consultant based in Valencia. I combine Salesforce, data architecture and Apple development to reduce handoffs, ambiguity and product debt.",
    contactLabel: "Next step", contactTitle: "Tell me what needs to change in your product or operation.",
    contactBody: "You will get a direct response with concrete questions, early risks and the best next step. No generic sales deck.",
    faq: "Questions before we start",
    testimonialLabel: "What they say", testimonialTitle: "Work that leaves a system, not a dependency."
  };

  const capabilities = [
    { Icon: Smartphone, title: es ? "Producto iOS nativo" : "Native iOS product", body: es ? "Swift, SwiftUI, Watch, widgets, Live Activities, HealthKit y publicación." : "Swift, SwiftUI, Watch, widgets, Live Activities, HealthKit and release." },
    { Icon: Workflow, title: es ? "Salesforce que trabaja" : "Salesforce that works", body: es ? "Procesos, Flows, integraciones y datos conectados a la operación real." : "Processes, Flows, integrations and data connected to real operations." },
    { Icon: Layers3, title: "UX & product design", body: es ? "Arquitectura de información, prototipos, diseño de interacción y accesibilidad." : "Information architecture, prototyping, interaction design and accessibility." },
    { Icon: Database, title: es ? "Backend y automatismos" : "Backend and automation", body: es ? "Supabase, Firebase, APIs, autenticación, eventos y tareas programadas." : "Supabase, Firebase, APIs, authentication, events and scheduled jobs." }
  ];

  const process = [
    ["01", es ? "Entender" : "Understand", es ? "Usuarios, negocio, restricciones y señal de éxito." : "Users, business, constraints and success signal."],
    ["02", es ? "Decidir" : "Decide", es ? "Qué construir ahora, qué automatizar y qué no añadir." : "What to build now, automate and deliberately leave out."],
    ["03", es ? "Prototipar" : "Prototype", es ? "Flujos reales antes de comprometer arquitectura y tiempo." : "Real flows before committing architecture and time."],
    ["04", es ? "Construir" : "Build", es ? "Producto, datos, integraciones, calidad y observabilidad." : "Product, data, integrations, quality and observability."],
    ["05", es ? "Lanzar y aprender" : "Launch and learn", es ? "Publicación, soporte, métricas e iteración con evidencia." : "Release, support, metrics and evidence-led iteration."]
  ];

  const faqItems = es ? [
    { question: "¿Trabajas solo en proyectos completos?", answer: "No. Puedo dirigir un producto de principio a fin o intervenir en una fase crítica: auditoría UX, arquitectura, automatización Salesforce, estabilización o preparación de lanzamiento." },
    { question: "¿Cómo estimas alcance, tiempo y coste?", answer: "Primero separo objetivos, riesgos e incógnitas. Después propongo una primera entrega medible con alcance y criterios de aceptación claros. No doy una cifra artificial antes de entender dependencias." },
    { question: "¿Puedes continuar un producto ya construido?", answer: "Sí. Empiezo por una auditoría técnica y de experiencia para proteger lo que funciona, localizar deuda y ordenar la evolución sin una reescritura innecesaria." },
    { question: "¿Incluyes backend, analítica y publicación?", answer: "Sí. El trabajo puede incluir modelo de datos, autenticación, automatismos, APIs, privacidad, analítica, App Store Connect, ASO inicial y soporte tras el lanzamiento." }
  ] : [
    { question: "Do you only take complete builds?", answer: "No. I can own an end-to-end product or step into a critical phase: UX audit, architecture, Salesforce automation, stabilisation or release readiness." },
    { question: "How do you estimate scope, time and cost?", answer: "I first separate goals, risks and unknowns, then define a measurable first delivery with clear acceptance criteria." },
    { question: "Can you continue an existing product?", answer: "Yes. I start with a technical and UX audit to preserve what works, locate debt and sequence improvements without an unnecessary rewrite." },
    { question: "Do you cover backend, analytics and release?", answer: "Yes. Work can include data models, authentication, automation, APIs, privacy, analytics, App Store Connect, initial ASO and post-launch support." }
  ];

  return (
    <>
      <section className="hero-dark relative isolate overflow-hidden border-b border-white/10 bg-[#07101f] text-white">
        <div className="absolute inset-0 hero-noise opacity-40" aria-hidden="true" />
        <div className="absolute -left-48 top-20 size-[34rem] rounded-full bg-blue-600/20 blur-[130px]" aria-hidden="true" />
        <div className="absolute -right-40 bottom-0 size-[30rem] rounded-full bg-cyan-400/15 blur-[120px]" aria-hidden="true" />
        <div className="container relative z-10 grid min-h-0 items-center gap-10 py-16 sm:py-20 lg:min-h-[min(760px,calc(100vh-72px))] lg:grid-cols-[1.08fr_.92fr] lg:gap-14 lg:py-20">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.06] px-3 py-1.5 text-xs font-bold text-blue-100 backdrop-blur-xl">
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_16px_#34d399]" />{heroCopy.eyebrow}
            </div>

            {/* Audience switcher */}
            <div className="mt-6 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[.06] p-1 backdrop-blur-xl" role="tablist" aria-label={es ? "Elige tu perfil" : "Choose your profile"}>
              {(["product", "service"] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={audience === key}
                  onClick={() => setAudience(key)}
                  className={`rounded-full px-4 py-1.5 text-xs font-black transition ${
                    audience === key ? "bg-white text-slate-950" : "text-white/70 hover:text-white"
                  }`}
                >
                  {key === "product" ? (es ? "Apps" : "Apps") : (es ? "Servicios" : "Services")}
                </button>
              ))}
            </div>

            <h1 className="mt-8 max-w-4xl text-balance text-5xl font-black leading-[.94] tracking-[-.055em] text-white sm:text-7xl lg:text-[4.8rem]">{heroCopy.hero}</h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">{heroCopy.subhero}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href={heroCopy.primaryHref} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-blue-50">{heroCopy.primary}<ArrowRight size={16} /></Link>
              <Link href={heroCopy.secondaryHref} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[.05] px-6 py-3.5 text-sm font-black text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/10">{heroCopy.secondary}<ChevronRight size={16} /></Link>
            </div>
            <div className="mt-10 flex items-start gap-3 border-t border-white/10 pt-6 text-xs font-semibold leading-5 text-slate-400"><BadgeCheck className="mt-0.5 shrink-0 text-emerald-400" size={18} />{heroCopy.proof}</div>
          </div>

          <AppVideoShowcase apps={apps} es={es} />
        </div>
        <div className="border-t border-white/10 bg-white/[.035]">
          <div className="container grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
            <Metric value={String(apps.length)} label={es ? "productos propios" : "owned products"} />
            <Metric value={String(vitalsLanguages)} label={es ? "idiomas en VitalsPath" : "VitalsPath languages"} />
            <Metric value="9x" label={es ? "certificaciones Salesforce" : "Salesforce certifications"} />
            <Metric value="10+" label={es ? "años de experiencia" : "years of experience"} />
          </div>
        </div>
      </section>

      <section id="productos" className="section overflow-hidden bg-themed-white">
        <div className="container">
          <SectionHeading label={copy.workLabel} title={copy.workTitle} body={copy.workBody} />
          <div className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {apps.filter(a => a.status === "published").slice(0, 3).map((app) => <ProductFeature app={app} es={es} key={app.slug} />)}
            {apps.filter(a => a.status === "coming_soon").map((app) => <ComingSoonCard app={app} es={es} key={app.slug} />)}
          </div>
        </div>
      </section>

      <ReviewsStrip apps={apps} es={es} />

      <section className="section border-y border-line bg-themed-mist">
        <div className="container">
          <SectionHeading label={copy.capabilitiesLabel} title={copy.capabilitiesTitle} />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map(({ Icon, title, body }, index) => (
              <article className="group rounded-3xl border border-line bg-themed-card p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-blue/30" key={title}>
                <div className="flex items-start justify-between"><span className="flex size-12 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue"><Icon size={22} /></span><span className="text-xs font-black text-graphite/50">0{index + 1}</span></div>
                <h3 className="mt-8 text-xl font-black text-ink">{title}</h3><p className="mt-3 text-sm leading-6 text-graphite">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-themed-white">
        <div className="container grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <SectionHeading label={copy.processLabel} title={copy.processTitle} />
          <div className="relative">
            <div className="absolute bottom-8 left-[23px] top-8 w-px bg-gradient-to-b from-brand-blue via-brand-cyan to-brand-green" aria-hidden="true" />
            {process.map(([number, title, body]) => <div className="relative grid grid-cols-[48px_1fr] gap-5 border-b border-line py-6 first:pt-0 last:border-0" key={number}><span className="relative z-10 flex size-12 items-center justify-center rounded-full border-4 border-[var(--background)] bg-ink text-xs font-black text-[var(--background)]">{number}</span><div><h3 className="text-lg font-black text-ink">{title}</h3><p className="mt-2 text-sm leading-6 text-graphite">{body}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="section overflow-hidden border-y border-white/10 bg-[#0a1425] text-white">
        <div className="container">
          <SectionHeading dark label={copy.principlesLabel} title={copy.principlesTitle} />
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">
            <DarkPrinciple Icon={Gauge} title={es ? "Rápido se diseña" : "Speed is designed"} body={es ? "Rendimiento, carga progresiva y feedback inmediato forman parte de la UX." : "Performance, progressive loading and immediate feedback are part of UX."} />
            <DarkPrinciple Icon={LockKeyhole} title={es ? "Privacidad explicable" : "Explainable privacy"} body={es ? "Permisos, datos y automatismos se comunican sin letra pequeña ni ambigüedad." : "Permissions, data and automation are communicated without ambiguity."} />
            <DarkPrinciple Icon={Orbit} title={es ? "Evolución, no entrega" : "Evolution, not handoff"} body={es ? "La arquitectura contempla soporte, métricas, aprendizaje y siguientes versiones." : "Architecture accounts for support, metrics, learning and future versions."} />
          </div>
          <div className="mt-8 flex flex-wrap gap-2 text-xs font-bold text-slate-300">{["Swift", "SwiftUI", "Salesforce", "Supabase", "CloudKit", "StoreKit", "HealthKit", "App Store Connect"].map(item => <span className="rounded-full border border-white/10 bg-white/[.05] px-3 py-2" key={item}>{item}</span>)}</div>
        </div>
      </section>

      <section className="section bg-themed-white">
        <div className="container grid items-center gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div className="relative mx-auto w-full max-w-sm rounded-[2.5rem] border border-line bg-themed-card p-8 shadow-soft flex flex-col items-center text-center overflow-hidden">
            <div className="absolute -right-16 -top-16 size-36 rounded-full bg-brand-blue/10 blur-2xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 size-36 rounded-full bg-brand-cyan/15 blur-2xl pointer-events-none" />
            
            <div className="relative size-32 rounded-full p-1 bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-green shadow-md animate-pulse-subtle">
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-themed-card bg-themed-mist">
                <Image 
                  src={getAssetPath(initialProfile?.image_url || "assets/images/profile/lester-romero.jpg")} 
                  alt="Lester Romero Bernardo" 
                  width={128} 
                  height={128} 
                  unoptimized
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            
            <h3 className="mt-6 text-xl font-black text-ink">Lester Romero Bernardo</h3>
            <p className="text-xs font-bold text-brand-blue mt-1 tracking-wider uppercase">iOS Developer &amp; Salesforce Consultant</p>
            
            <div className="mt-6 w-full pt-6 border-t border-line grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-[10px] font-bold text-graphite/60 uppercase tracking-wider">{es ? "Certificaciones" : "Certifications"}</p>
                <p className="text-sm font-black text-ink mt-0.5">9x Salesforce</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-graphite/60 uppercase tracking-wider">{es ? "Ubicación" : "Location"}</p>
                <p className="text-sm font-black text-ink mt-0.5">Valencia, España</p>
              </div>
            </div>
          </div>
          <div><SectionHeading label={copy.aboutLabel} title={copy.aboutTitle} body={copy.aboutBody} /><div className="mt-8 grid gap-3 sm:grid-cols-2">{[es ? "Responsabilidad directa" : "Direct accountability", es ? "Criterio técnico y comercial" : "Technical and commercial judgement", es ? "Comunicación sin intermediarios" : "No-handoff communication", es ? "Documentación y continuidad" : "Documentation and continuity"].map(item => <div className="flex items-center gap-3 rounded-2xl border border-line p-4 text-sm font-bold text-ink" key={item}><Check className="text-brand-green" size={17} />{item}</div>)}</div><Link href={getStaticPath("about", locale)} className="mt-8 inline-flex items-center gap-2 text-sm font-black text-brand-blue hover:gap-3">{es ? "Ver experiencia y certificaciones" : "See experience and certifications"}<ArrowRight size={16} /></Link></div>
        </div>
      </section>

      {initialTestimonials.length > 0 ? (
        <section className="section border-t border-line bg-themed-white">
          <div className="container">
            <SectionHeading label={copy.testimonialLabel} title={copy.testimonialTitle} />
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {initialTestimonials.map((t) => {
                const quote = es ? t.quote : (t.quote_en || t.quote);
                const role = es ? t.role : (t.role_en || t.role);
                return (
                  <figure key={t.name} className="flex flex-col rounded-3xl border border-line bg-themed-card p-7 shadow-card">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
                    </div>
                    <blockquote className="mt-5 flex-grow text-sm leading-6 text-graphite">“{quote}”</blockquote>
                    <figcaption className="mt-6 border-t border-line pt-5">
                      <p className="text-sm font-black text-ink">{t.name}</p>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-graphite/60">{role}</p>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section id="contacto" className="section border-t border-line bg-themed-mist">
        <div className="container grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div><SectionHeading label={copy.contactLabel} title={copy.contactTitle} body={copy.contactBody} /><div className="mt-10 rounded-3xl border border-line bg-themed-card p-6"><MessageCircle className="text-brand-blue" /><p className="mt-4 text-sm font-bold text-ink">{es ? "¿Prefieres correo directo?" : "Prefer direct email?"}</p><a className="mt-1 block text-sm text-brand-blue hover:underline" href="mailto:romerodev.app@gmail.com">romerodev.app@gmail.com</a></div><div className="mt-10"><h3 className="mb-5 text-lg font-black text-ink">{copy.faq}</h3><FaqList items={faqItems} /></div></div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}

function Metric({ value, label }: { value: string; label: string }) { return <div className="px-4 py-6 text-center sm:px-8"><strong className="block text-2xl font-black tracking-tight text-white sm:text-3xl">{value}</strong><span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</span></div>; }

function SectionHeading({ label, title, body, dark = false }: { label: string; title: string; body?: string; dark?: boolean }) { return <div className="max-w-3xl"><span className="text-xs font-black uppercase tracking-[.28em] text-brand-blue">{label}</span><h2 className={`mt-4 text-balance text-4xl font-black leading-[1.02] tracking-[-.045em] sm:text-6xl ${dark ? "text-white" : "text-ink"}`}>{title}</h2>{body ? <p className={`mt-6 max-w-2xl text-base leading-8 ${dark ? "text-slate-300" : "text-graphite"}`}>{body}</p> : null}</div>; }

function ProductOrbit({ apps, es, coreLabel }: { apps: AppItem[]; es: boolean; coreLabel: string }) {
  const locale = es ? "es" : "en";
  const orbitApps = apps.filter(a => a.status === "published").slice(0, 3);
  const topRated = [...orbitApps].sort((a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0))[0];
  const first3 = [
    { app: orbitApps[0], className: "left-0 bottom-12 -rotate-6 z-10" },
    { app: orbitApps[1], className: "left-1/2 top-2 z-20 -translate-x-1/2" },
    { app: orbitApps[2], className: "right-0 bottom-12 rotate-6 z-10" }
  ].filter((entry): entry is { app: AppItem; className: string } => Boolean(entry.app));

  return (
      <div className="relative mx-auto min-h-[390px] w-full max-w-[560px] animate-fade-in-up md:min-h-[520px]">
      {/* Background circles */}
      <div className="absolute inset-4 rounded-full border border-white/10 animate-orbit-slow" />
      <div className="absolute inset-20 rounded-full border border-dashed border-white/10 animate-orbit-slower" />
      <div className="absolute inset-32 rounded-full border border-white/[.06]" />
      <div className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />

      {/* Center glow label */}
      <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/[.06] px-4 py-2 text-center backdrop-blur-xl">
        <p className="text-[9px] font-black uppercase tracking-[.22em] text-cyan-300">{coreLabel}</p>
        <p className="text-sm font-black text-white">{es ? "Nativas · App Store" : "Native · App Store"}</p>
      </div>

      {/* Floating iPhones */}
      {first3.map(({ app, className }, i) => (
        <OrbitCard
          key={app.slug}
          className={className}
          app={app}
          image={getAppScreens(app, locale, 1)[0]}
          locale={locale}
          index={i}
        />
      ))}

      {/* Ambient floating badges */}
      {topRated?.userRatingCount ? (
        <div className="absolute -left-2 top-10 z-30 animate-float rounded-2xl border border-white/10 bg-white/[.07] px-4 py-3 backdrop-blur-xl shadow-lg">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{topRated.name}</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-black text-white">
            <Star size={13} className="fill-amber-400 text-amber-400" />{topRated.averageRating?.toFixed(1)}
            <span className="text-[10px] font-bold text-slate-400">· {topRated.userRatingCount} {es ? "reseñas" : "reviews"}</span>
          </p>
        </div>
      ) : null}
      <div className="absolute right-0 top-0 z-30 animate-float-delay rounded-2xl border border-white/10 bg-white/[.07] px-4 py-3 backdrop-blur-xl shadow-lg">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Apple</p>
        <p className="mt-1 flex items-center gap-1 text-sm font-black text-white">
          <BadgeCheck size={14} className="text-cyan-300" /> {es ? "Experiencia nativa" : "Native experience"}
        </p>
      </div>
      <div className="absolute bottom-2 left-1/2 z-30 -translate-x-1/2 rounded-2xl border border-white/10 bg-white/[.07] px-4 py-3 backdrop-blur-xl shadow-lg">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{es ? "Estado" : "Status"}</p>
        <p className="mt-1 flex items-center gap-2 text-sm font-black text-white">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          {es ? `${orbitApps.length} apps publicadas` : `${orbitApps.length} published apps`}
        </p>
      </div>
    </div>
  );
}

function OrbitCard({ app, image, className, locale, index }: { app: AppItem; image: string | undefined; className: string; locale: "es" | "en"; index: number }) {
  return (
    <Link
      href={getAppPath(app.slug, locale)}
      className={`absolute block w-[44%] max-w-[210px] transition-transform duration-500 hover:z-40 group hover:rotate-0 hover:scale-[1.04] ${className}`}
    >
      <div
        className="aspect-[9/19.5] w-full overflow-hidden rounded-[24px] sm:rounded-[28px] border-[4px] border-slate-950 bg-slate-950 shadow-[0_25px_60px_rgba(0,0,0,0.85)] ring-[1px] ring-neutral-800 animate-float-card"
        style={{ animationDelay: `${index * 1.2}s` }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-1.5 left-1/2 z-30 -translate-x-1/2 w-14 h-3.5 rounded-full bg-black flex items-center justify-center">
          <div className="size-1 rounded-full bg-slate-900 absolute left-2" />
          <div className="size-1 rounded-full bg-indigo-950/40 absolute right-3" />
        </div>

        {/* Screen */}
        <div className="relative w-full h-full overflow-hidden rounded-[20px] sm:rounded-[24px]">
          {image ? (
            <Image 
              src={getAssetPath(image)} 
              alt={app?.name} 
              fill 
              unoptimized
              className="object-cover opacity-95 transition-transform duration-700 group-hover:scale-105" 
            />
          ) : null}
          {/* Apple-style gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-90" />
          
          {/* App Info overlay */}
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-left z-20">
            <div>
              <p className="text-[11px] font-black text-white leading-tight tracking-tight uppercase bg-white/10 px-1.5 py-0.5 rounded backdrop-blur-md inline-block mb-1">
                {app.name}
              </p>
              <p className="text-[9px] font-bold text-slate-300">
                {getLocalizedAppCategory(app, locale) || "iOS App"}
              </p>
            </div>
            <span className="flex size-7 items-center justify-center rounded-full bg-white text-slate-950 hover:scale-110 transition-transform">
              <ArrowRight size={11} strokeWidth={2.5} />
            </span>
          </div>
          
          {/* Home Indicator */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-[3px] rounded-full bg-white/40 z-20" />
        </div>
      </div>
    </Link>
  );
}

function ProductFeature({ app, es }: { app: AppItem; es: boolean }) {
  const locale = es ? "es" : "en";
  
  // Three key screenshots representing important views of the product
  const screenshots = getAppScreens(app, locale, 3);
  const gradientStyle = getAppGradientStyle(app);
  const icon = resolveAppIconPath(app);
  const category = getLocalizedAppCategory(app, locale);
  const ctaHref = app.appStoreUrl ?? (app.primaryCtaUrl.startsWith("http") ? app.primaryCtaUrl : getAppPath(app.slug, locale));
  const ctaIsExternal = /^https?:\/\//i.test(ctaHref);
  
  return (
    <article className="group overflow-hidden rounded-[2.25rem] border border-line bg-themed-card shadow-card flex flex-col h-full">
      {/* Showcase Visual Canvas */}
      <div 
        className="relative aspect-[16/10] overflow-hidden flex items-center justify-center p-6"
        style={gradientStyle}
      >
        {/* Cascade Container */}
        <div className="relative w-full h-full max-w-[360px] sm:max-w-[420px] flex items-center justify-center">
          
          {/* Left Phone (Dashboard / Progress Summary) */}
          <div 
            className="absolute right-[54%] sm:right-[55%] top-[52%] -translate-y-1/2 w-[22%] aspect-[9/19.5] border-[3.5px] sm:border-[4.5px] border-slate-950 bg-slate-950 rounded-[12px] sm:rounded-[16px] shadow-[0_15px_30px_rgba(0,0,0,0.65)] overflow-hidden transition-all duration-500 -rotate-[6deg] opacity-90 group-hover:right-[56%] group-hover:-rotate-[10deg] group-hover:scale-95 z-10"
          >
            <div className="relative w-full h-full overflow-hidden rounded-[9px] sm:rounded-[13px]">
              <Image 
                src={getAssetPath(screenshots[0])} 
                alt={`${app.name} screenshot 1`} 
                fill 
                unoptimized
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
            </div>
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-2 sm:w-10 sm:h-2.5 rounded-full bg-black z-20" />
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-[2px] sm:h-[2.5px] rounded-full bg-white/30 z-20" />
          </div>

          {/* Center Phone (Today Timeline / Readiness) */}
          <div 
            className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[26%] aspect-[9/19.5] border-[4px] sm:border-[5px] border-slate-950 bg-slate-950 rounded-[14px] sm:rounded-[18px] shadow-[0_25px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 group-hover:scale-[1.03] group-hover:-translate-y-[52%] z-20"
          >
            <div className="relative w-full h-full overflow-hidden rounded-[11px] sm:rounded-[15px]">
              <Image 
                src={getAssetPath(screenshots[1])} 
                alt={`${app.name} screenshot 2`} 
                fill 
                unoptimized
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
            </div>
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-9 h-2 sm:w-11 sm:h-2.5 rounded-full bg-black z-20" />
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-[2px] sm:h-[2.5px] rounded-full bg-white/30 z-20" />
          </div>

          {/* Right Phone (Medication List / Training Plan) */}
          <div 
            className="absolute left-[54%] sm:left-[55%] top-[52%] -translate-y-1/2 w-[22%] aspect-[9/19.5] border-[3.5px] sm:border-[4.5px] border-slate-950 bg-slate-950 rounded-[12px] sm:rounded-[16px] shadow-[0_15px_30px_rgba(0,0,0,0.65)] overflow-hidden transition-all duration-500 rotate-[6deg] opacity-90 group-hover:left-[56%] group-hover:rotate-[10deg] group-hover:scale-95 z-10"
          >
            <div className="relative w-full h-full overflow-hidden rounded-[9px] sm:rounded-[13px]">
              <Image 
                src={getAssetPath(screenshots[2])} 
                alt={`${app.name} screenshot 3`} 
                fill 
                unoptimized
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
            </div>
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-2 sm:w-10 sm:h-2.5 rounded-full bg-black z-20" />
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-[2px] sm:h-[2.5px] rounded-full bg-white/30 z-20" />
          </div>

        </div>

        {/* Bottom Glass Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-12 flex items-center gap-3.5 z-20">
          <div className="relative size-12 overflow-hidden rounded-xl border border-white/20 bg-white shadow-md shrink-0">
            <Image src={getAssetPath(icon)} alt="" fill unoptimized className="object-cover" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white leading-tight">{app.name}</h3>
            <p className="text-[10px] font-bold text-white/60 tracking-wider uppercase mt-0.5">{category}</p>
          </div>
          <div className="ml-auto flex flex-col items-end gap-1">
            {app.userRatingCount && app.userRatingCount > 0 ? (
              <span className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[10px] font-black text-white backdrop-blur-md">
                <Star size={11} className="fill-amber-400 text-amber-400" />{app.averageRating?.toFixed(1) ?? "5.0"}
              </span>
            ) : (
              <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-black text-white backdrop-blur-md">
                {es ? "Nuevo" : "New"}
              </span>
            )}
            {app.appStore?.version ? <span className="rounded-full bg-white/[.08] px-2 py-1 text-[9px] font-bold text-white/70 backdrop-blur-md">v{app.appStore.version}</span> : null}
          </div>
        </div>
      </div>
      
      {/* Content area */}
      <div className="p-7 sm:p-8 flex flex-col justify-between flex-grow">
        <div>
          <p className="text-lg font-black leading-snug text-ink">{es ? app.tagline : app.tagline_en ?? app.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-graphite line-clamp-3">{es ? app.shortDescription : app.shortDescription_en ?? app.shortDescription}</p>
        </div>
        <div>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {app.platform.map(item => (
              <span className="rounded-full border border-line bg-themed-mist px-2.5 py-1 text-[9px] font-bold text-graphite uppercase tracking-wider" key={item}>
                {item}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {ctaIsExternal ? (
              <a
                className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-4 py-2.5 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-brand-blue-dark"
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {app.primaryCtaLabel_en && !es ? app.primaryCtaLabel_en : app.primaryCtaLabel}
                <ExternalLink size={13} strokeWidth={2.5} />
              </a>
            ) : (
              <Link
                className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-4 py-2.5 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-brand-blue-dark"
                href={ctaHref}
              >
                {app.primaryCtaLabel_en && !es ? app.primaryCtaLabel_en : app.primaryCtaLabel}
                <ArrowRight size={13} strokeWidth={2.5} />
              </Link>
            )}
            <Link 
              className="inline-flex items-center gap-2 text-sm font-black text-brand-blue transition group-hover:gap-3" 
              href={getAppPath(app.slug, locale)}
            >
              {es ? "Caso de producto" : "Product case"}
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function DarkPrinciple({ Icon, title, body }: { Icon: typeof ShieldCheck; title: string; body: string }) { return <article className="bg-[#0a1425] p-8 sm:p-10"><Icon className="text-cyan-300" size={25} /><h3 className="mt-10 text-xl font-black text-white">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{body}</p></article>; }

function ComingSoonCard({ app, es }: { app: AppItem; es: boolean }) {
  const gradientStyle = getAppGradientStyle(app);
  const icon = resolveAppIconPath(app);
  const locale = es ? "es" : "en";
  const category = getLocalizedAppCategory(app, locale);

  function handleNotify() {
    trackEvent("waitlist_submit", { app: app.slug, locale: es ? "es" : "en" });
    const subject = encodeURIComponent(es ? `Avísame cuando ${app.name} esté disponible` : `Notify me when ${app.name} is available`);
    const body = encodeURIComponent(es ? "Hola, me interesa " + app.name + ". Avísame cuando esté disponible en la App Store." : "Hi, I'm interested in " + app.name + ". Let me know when it's on the App Store.");
    window.open(`mailto:romerodev.app@gmail.com?subject=${subject}&body=${body}`, "_self");
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2.25rem] border-2 border-dashed border-brand-blue/30 bg-themed-mist shadow-card">
      <div className="relative aspect-[16/10] overflow-hidden flex items-center justify-center" style={gradientStyle}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_65%)]" aria-hidden="true" />
        <div className="relative flex flex-col items-center gap-4 text-center">
          <div className="flex size-20 items-center justify-center rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
            <Image src={getAssetPath(icon)} alt={app.name} width={64} height={64} unoptimized className="object-contain" />
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-md">
            <Sparkles size={12} className="text-cyan-300" />{es ? "Próximamente" : "Coming soon"}
          </span>
        </div>
      </div>
      <div className="p-7 sm:p-8 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-black text-ink">{app.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-graphite line-clamp-3">{es ? app.tagline : app.tagline_en ?? app.tagline}</p>
        </div>
        <div>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {app.platform.map(item => (
              <span className="rounded-full border border-line bg-themed-card px-2.5 py-1 text-[9px] font-bold text-graphite uppercase tracking-wider" key={item}>{item}</span>
            ))}
          </div>
          <Link className="mt-6 inline-flex items-center gap-2 text-sm font-black text-brand-blue transition group-hover:gap-3" href={getAppPath(app.slug, es ? "es" : "en")}>
            {es ? "Ver hoja de producto" : "View product page"}<ArrowRight size={15} strokeWidth={2.5} />
          </Link>
          <button
            type="button"
            onClick={handleNotify}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand-blue/30 bg-brand-blue/5 px-4 py-2.5 text-xs font-black text-brand-blue transition hover:bg-brand-blue/10 active:scale-[0.98]"
          >
            {es ? "Avísame cuando salga" : "Notify me when it launches"}<ChevronRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}

function ReviewsStrip({ apps, es }: { apps: AppItem[]; es: boolean }) {
  const locale = es ? "es" : "en";
  const withReviews = apps.find(a => (a.appStoreReviews?.length ?? 0) > 0);
  const app = withReviews ?? apps.find(a => a.status === "published");
  const reviews = reviewsForLocale(app?.appStoreReviews, locale, 4);
  if (!app || reviews.length === 0) return null;
  const hasRatings = (app.userRatingCount ?? 0) > 0;

  return (
    <section className="border-b border-line bg-themed-white">
      <div className="container py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-[.28em] text-brand-blue">{es ? "Valoraciones reales" : "Real reviews"}</span>
            <h2 className="mt-4 max-w-xl text-balance text-3xl font-black leading-[1.05] tracking-[-.04em] text-ink sm:text-4xl">
              {es ? `Quienes usan ${app.name} ya lo cuentan.` : `People using ${app.name} already tell it.`}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              {hasRatings && <span className="flex items-center gap-1.5 text-2xl font-black text-ink"><Star size={20} className="fill-amber-400 text-amber-400" />{app.averageRating?.toFixed(1)}</span>}
              <span className="text-xs font-bold text-graphite">{hasRatings ? `${app.userRatingCount} ${es ? "valoraciones en" : "ratings on"} App Store` : es ? "App Store" : "App Store"}</span>
            </div>
            <a href={app.appStoreUrl ?? app.primaryCtaUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-line bg-themed-card px-4 py-2.5 text-xs font-black text-ink transition hover:border-brand-blue/40">
              {es ? "Valorar en App Store" : "Rate on App Store"}<ExternalLink size={13} />
            </a>
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review) => (
            <figure key={`${review.author}-${review.date}`} className="flex flex-col rounded-3xl border border-line bg-themed-card p-6 shadow-card">
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-graphite/30"} />)}
              </div>
              <blockquote className="mt-4 text-sm leading-6 text-graphite line-clamp-5">“{review.content}”</blockquote>
              <figcaption className="mt-auto pt-5">
                <p className="text-sm font-black text-ink">{review.author}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-graphite/60">{review.title}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppVideoShowcase({ apps, es }: { apps: AppItem[]; es: boolean }) {
  const locale = es ? "es" : "en";
  const publishedApps = apps.filter(a => a.status === "published").slice(0, 3);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = true;
        video.play().catch(() => {});
      }
    });
  }, []);

  return (
    <div className="relative mx-auto min-h-[520px] w-full max-w-[560px] animate-fade-in-up">
      {/* Gradient background - dark to transparent from right to left */}
      <div className="absolute inset-0 bg-gradient-to-l from-[#07101f] via-[#07101f]/80 to-transparent" aria-hidden="true" />
      
      {/* Video strip - right side */}
        <div className="absolute right-0 top-1/2 h-[78%] max-h-[500px] w-full -translate-y-1/2 overflow-hidden rounded-[28px] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] md:w-[60%]">
        <div className="relative w-full h-full flex">
          {publishedApps.map((app, i) => {
            const poster = getAppScreens(app, locale, 1)[0];
            return (
            <div key={app.slug} className="relative flex-1 min-w-0 bg-slate-950">
              {app.videoUrl ? (
                <video
                  ref={(el) => { videoRefs.current[i] = el; }}
                  src={getAssetPath(app.videoUrl)}
                  poster={poster ? getAssetPath(poster) : undefined}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-90"
                  aria-label={`${app.name} app preview`}
                />
              ) : poster ? (
                <Image
                  src={getAssetPath(poster)}
                  alt={`${app.name} app preview`}
                  fill
                  unoptimized
                  className="object-cover opacity-90"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-950 to-cyan-950 px-4 text-center text-xs font-bold text-white/70">
                  {app.name}
                </div>
              )}
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/30 to-black/10" />
              {/* App label */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <p className="text-xs font-black uppercase tracking-[.15em] text-white/70">{getLocalizedAppCategory(app, es ? "es" : "en")}</p>
                <p className="text-lg font-black text-white truncate">{app.name}</p>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* Center glow label - positioned over the gradient */}
      <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/[.06] px-4 py-2 text-center backdrop-blur-xl pointer-events-none">
        <p className="text-[9px] font-black uppercase tracking-[.22em] text-cyan-300">{es ? "Apps de RomeroDev" : "RomeroDev apps"}</p>
        <p className="text-sm font-black text-white">{es ? "Nativas · App Store" : "Native · App Store"}</p>
      </div>

      {/* Floating badges */}
      <div className="absolute right-0 top-0 z-30 animate-float-delay rounded-2xl border border-white/10 bg-white/[.07] px-4 py-3 backdrop-blur-xl shadow-lg pointer-events-none">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Apple</p>
        <p className="mt-1 flex items-center gap-1 text-sm font-black text-white">
          <BadgeCheck size={14} className="text-cyan-300" /> {es ? "Experiencia nativa" : "Native experience"}
        </p>
      </div>
      <div className="absolute bottom-2 left-1/2 z-30 -translate-x-1/2 rounded-2xl border border-white/10 bg-white/[.07] px-4 py-3 backdrop-blur-xl shadow-lg pointer-events-none">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{es ? "Estado" : "Status"}</p>
        <p className="mt-1 flex items-center gap-2 text-sm font-black text-white">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          {es ? `${publishedApps.length} apps publicadas` : `${publishedApps.length} published apps`}
        </p>
      </div>
    </div>
  );
}
