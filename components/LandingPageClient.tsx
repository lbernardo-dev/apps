"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, BadgeCheck, Check, ChevronRight, Database, Gauge,
  Layers3, LockKeyhole, MessageCircle, Orbit, ShieldCheck,
  Smartphone, Star, Workflow
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { FaqList } from "@/components/FaqList";
import { useLocale } from "@/lib/i18n";
import { getAssetPath } from "@/lib/site";
import { getStaticPath, getAppPath } from "@/lib/routes";
import type { AppItem } from "@/lib/types";

interface LandingPageClientProps {
  initialSections?: Record<string, unknown>;
  initialTestimonials?: unknown[];
  initialProfile?: { full_name?: string; headline?: string; image_url?: string };
  initialFeaturedApps?: AppItem[];
}

export function LandingPageClient({ initialFeaturedApps = [] }: LandingPageClientProps) {
  const { t, locale } = useLocale();
  const es = locale === "es";
  const apps = initialFeaturedApps.length ? initialFeaturedApps : [];
  const vitalspath = apps.find(app => app.slug === "vitalspath");
  const reps = apps.find(app => app.slug === "reps");

  const copy = es ? {
    eyebrow: "Producto digital · iOS nativo · Automatización CRM",
    hero: "Productos complejos. Experiencias que se sienten simples.",
    subhero: "Convierto operaciones complejas en apps iOS y sistemas Salesforce claros, rápidos y preparados para crecer. Estrategia, UX, desarrollo y lanzamiento bajo una sola dirección de producto.",
    primary: "Explorar productos reales",
    secondary: "Plantear un proyecto",
    proof: "Producto publicado, código en producción y decisiones explicables.",
    workLabel: "Trabajo seleccionado",
    workTitle: "No son conceptos. Son productos construidos para usarse.",
    workBody: "Cada producto combina investigación, experiencia nativa, automatización y una base técnica pensada para evolucionar después del lanzamiento.",
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
    faq: "Preguntas antes de empezar"
  } : {
    eyebrow: "Digital products · Native iOS · CRM automation",
    hero: "Complex products. Experiences that feel simple.",
    subhero: "I turn complex operations into clear, fast and scalable iOS apps and Salesforce systems. Strategy, UX, engineering and launch under one product direction.",
    primary: "Explore real products",
    secondary: "Discuss a project",
    proof: "Published products, production code and explainable decisions.",
    workLabel: "Selected work", workTitle: "Not concepts. Products built to be used.",
    workBody: "Each product combines research, native experience, automation and a technical foundation designed to evolve after launch.",
    capabilitiesLabel: "Capabilities", capabilitiesTitle: "A complete view prevents fragmented products.",
    processLabel: "Working system", processTitle: "From an unclear need to a product you can measure.",
    principlesLabel: "Product judgement", principlesTitle: "Less presentation theatre. More trust signals.",
    aboutLabel: "Technical direction", aboutTitle: "One accountable owner from strategy to delivery.",
    aboutBody: "I’m Lester Romero Bernardo, a software engineer and consultant based in Valencia. I combine Salesforce, data architecture and Apple development to reduce handoffs, ambiguity and product debt.",
    contactLabel: "Next step", contactTitle: "Tell me what needs to change in your product or operation.",
    contactBody: "You will get a direct response with concrete questions, early risks and the best next step. No generic sales deck.",
    faq: "Questions before we start"
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
        <div className="container relative z-10 grid min-h-[calc(100vh-64px)] items-center gap-14 py-20 lg:grid-cols-[1.08fr_.92fr] lg:py-24">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.06] px-3 py-1.5 text-xs font-bold text-blue-100 backdrop-blur-xl">
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_16px_#34d399]" />{copy.eyebrow}
            </div>
            <h1 className="mt-8 max-w-4xl text-balance text-5xl font-black leading-[.94] tracking-[-.055em] text-white sm:text-7xl lg:text-[4.8rem]">{copy.hero}</h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">{copy.subhero}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="#productos" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-blue-50">{copy.primary}<ArrowRight size={16} /></Link>
              <Link href="#contacto" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[.05] px-6 py-3.5 text-sm font-black text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/10">{copy.secondary}<ChevronRight size={16} /></Link>
            </div>
            <div className="mt-12 flex items-center gap-3 border-t border-white/10 pt-6 text-xs font-semibold text-slate-400"><BadgeCheck className="text-emerald-400" size={18} />{copy.proof}</div>
          </div>

          <ProductOrbit vitalspath={vitalspath} reps={reps} es={es} />
        </div>
        <div className="border-t border-white/10 bg-white/[.035]">
          <div className="container grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
            <Metric value="2" label={es ? "productos propios" : "owned products"} />
            <Metric value="34" label={es ? "idiomas en VitalsPath" : "VitalsPath languages"} />
            <Metric value="5,0" label={es ? "valoración App Store" : "App Store rating"} />
            <Metric value="Apple" label={es ? "ecosistema nativo" : "native ecosystem"} />
          </div>
        </div>
      </section>

      <section id="productos" className="section overflow-hidden bg-themed-white">
        <div className="container">
          <SectionHeading label={copy.workLabel} title={copy.workTitle} body={copy.workBody} />
          <div className="mt-14 grid gap-7 lg:grid-cols-2">
            <ProductFeature app={vitalspath} slug="vitalspath" tone="health" es={es} />
            <ProductFeature app={reps} slug="reps" tone="fitness" es={es} />
          </div>
        </div>
      </section>

      {/* Upcoming Releases Section */}
      <section className="section bg-[#060a12] text-white overflow-hidden relative border-b border-white/5 py-20 lg:py-24">
        <div className="absolute right-0 top-0 size-80 rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" aria-hidden="true" />
        <div className="absolute -left-20 bottom-0 size-80 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" aria-hidden="true" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-black uppercase tracking-[0.28em] text-brand-cyan">
              {t("home.upcoming.label" as any)}
            </span>
            <h2 className="mt-4 text-balance text-4xl font-black leading-[1.02] tracking-[-.045em] sm:text-6xl text-white">
              {t("home.upcoming.title" as any)}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">
              {t("home.upcoming.subtitle" as any)}
            </p>
          </div>
          
          <article className="bg-[#0b1220]/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center overflow-hidden relative group transition-all duration-300 hover:bg-[#0b1220]/80 hover:border-cyan-500/30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
            
            <div className="flex flex-col justify-between h-full py-2">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 text-xs font-bold text-cyan-400 tracking-wider uppercase">
                  <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  {es ? "Fase Beta" : "Beta Phase"}
                </span>
                
                <h3 className="text-3xl lg:text-4xl font-black mt-5 tracking-tight text-white">
                  {t("home.upcoming.shield.title" as any)}
                </h3>
                <p className="text-cyan-400 text-sm font-bold mt-2 tracking-wide">
                  {t("home.upcoming.shield.tagline" as any)}
                </p>
                
                <p className="text-sm leading-7 text-slate-300 mt-6 max-w-xl">
                  {t("home.upcoming.shield.body" as any)}
                </p>
                
                <ul className="mt-8 space-y-3.5">
                  {[1, 2, 3].map((num) => (
                    <li className="flex gap-3 text-sm text-slate-300 items-start" key={num}>
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-400 mt-0.5">
                        <Check aria-hidden="true" size={11} strokeWidth={3} />
                      </span>
                      <span>{t(`home.upcoming.shield.feat${num}` as any)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-10 pt-8 border-t border-white/5 flex flex-wrap gap-4 items-center">
                <Link 
                  href="#contacto" 
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-black text-slate-950 hover:bg-slate-100 transition-transform hover:-translate-y-0.5"
                >
                  {t("home.upcoming.shield.cta" as any)}
                  <ArrowRight size={15} strokeWidth={2.5} />
                </Link>
                <span className="text-xs text-slate-400 font-semibold">
                  {es ? "Lanzamiento previsto: Q3 2026" : "Expected release: Q3 2026"}
                </span>
              </div>
            </div>
            
            <div className="flex justify-center relative">
              <div className="absolute -inset-6 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] max-w-[320px]">
                <Image 
                  src={getAssetPath("assets/images/shield/shield-preview.png")} 
                  alt="Shield App Preview" 
                  width={320} 
                  height={320} 
                  unoptimized
                  className="object-cover w-full h-auto"
                />
              </div>
            </div>
          </article>
        </div>
      </section>

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
                  src={getAssetPath("assets/images/profile/lester-romero.png")} 
                  alt="Lester Romero Bernardo" 
                  width={128} 
                  height={128} 
                  unoptimized
                  className="object-cover w-full h-full"
                  priority
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

function ProductOrbit({ vitalspath, reps, es }: { vitalspath?: AppItem; reps?: AppItem; es: boolean }) {
  const locale = es ? "es" : "en";
  const vitalspathImg = `assets/images/vitalspath/screens/01_today_timeline_${locale}.png`;
  const repsImg = `assets/images/reps/screens/simulator/01-today-readiness_${locale}.jpg`;
  
  return (
    <div className="relative mx-auto min-h-[520px] w-full max-w-[560px] animate-fade-in-up">
      {/* Background circles */}
      <div className="absolute inset-4 rounded-full border border-white/10" />
      <div className="absolute inset-20 rounded-full border border-dashed border-white/10" />
      <div className="absolute left-1/2 top-1/2 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/15 blur-3xl animate-pulse" />
      
      {/* Floating iPhones */}
      <OrbitCard 
        className="left-4 top-8 -rotate-6" 
        app={vitalspath} 
        slug="vitalspath" 
        image={vitalspathImg} 
        locale={locale} 
      />
      <OrbitCard 
        className="right-4 bottom-8 rotate-6" 
        app={reps} 
        slug="reps" 
        image={repsImg} 
        locale={locale} 
      />
      
      {/* Ambient floating badges */}
      <div className="absolute right-4 top-16 rounded-2xl border border-white/10 bg-white/[.07] px-4 py-3 backdrop-blur-xl shadow-lg">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">App Store</p>
        <p className="mt-1 flex items-center gap-1 text-sm font-black text-white">
          <Star size={13} className="text-amber-400" fill="currentColor" /> 5,0
        </p>
      </div>
      <div className="absolute bottom-28 left-4 rounded-2xl border border-white/10 bg-white/[.07] px-4 py-3 backdrop-blur-xl shadow-lg">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{es ? "Estado" : "Status"}</p>
        <p className="mt-1 flex items-center gap-2 text-sm font-black text-white">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          {es ? "En producción" : "In production"}
        </p>
      </div>
    </div>
  );
}

function OrbitCard({ app, slug, image, className, locale }: { app?: AppItem; slug: string; image: string; className: string; locale: "es" | "en" }) {
  return (
    <Link 
      href={getAppPath(slug, locale)} 
      className={`absolute w-[46%] max-w-[220px] aspect-[9/19.5] overflow-hidden rounded-[24px] sm:rounded-[28px] border-[4px] border-slate-950 bg-slate-950 shadow-[0_25px_60px_rgba(0,0,0,0.85)] ring-[1px] ring-neutral-800 transition-all duration-500 hover:z-30 hover:rotate-0 hover:scale-[1.04] group ${className}`}
    >
      {/* Dynamic Island */}
      <div className="absolute top-1.5 left-1/2 z-30 -translate-x-1/2 w-14 h-3.5 rounded-full bg-black flex items-center justify-center">
        <div className="size-1 rounded-full bg-slate-900 absolute left-2" />
        <div className="size-1 rounded-full bg-indigo-950/40 absolute right-3" />
      </div>

      {/* Screen */}
      <div className="relative w-full h-full overflow-hidden rounded-[20px] sm:rounded-[24px]">
        <Image 
          src={getAssetPath(image)} 
          alt={app?.name ?? slug} 
          fill 
          unoptimized
          className="object-cover opacity-95 transition-transform duration-700 group-hover:scale-105" 
        />
        {/* Apple-style gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-90" />
        
        {/* App Info overlay */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-left z-20">
          <div>
            <p className="text-[11px] font-black text-white leading-tight tracking-tight uppercase bg-white/10 px-1.5 py-0.5 rounded backdrop-blur-md inline-block mb-1">
              {app?.name ?? slug}
            </p>
            <p className="text-[9px] font-bold text-slate-300">
              {app?.category || "iOS App"}
            </p>
          </div>
          <span className="flex size-7 items-center justify-center rounded-full bg-white text-slate-950 hover:scale-110 transition-transform">
            <ArrowRight size={11} strokeWidth={2.5} />
          </span>
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-[3px] rounded-full bg-white/40 z-20" />
      </div>
    </Link>
  );
}

function ProductFeature({ app, slug, tone, es }: { app?: AppItem; slug: string; tone: "health" | "fitness"; es: boolean }) {
  const isHealth = tone === "health";
  const locale = es ? "es" : "en";
  
  // Define three key screenshots representing important views of each app
  const screenshots = isHealth
    ? [
        `assets/images/vitalspath/screens/06_vitals_dashboard_${locale}.png`,
        `assets/images/vitalspath/screens/01_today_timeline_${locale}.png`,
        `assets/images/vitalspath/screens/02_medication_list_${locale}.png`
      ]
    : [
        `assets/images/reps/screens/simulator/02-progress-summary_${locale}.jpg`,
        `assets/images/reps/screens/simulator/01-today-readiness_${locale}.jpg`,
        `assets/images/reps/screens/simulator/05-train-plan_${locale}.jpg`
      ];

  const icon = isHealth ? "assets/images/vitalspath/AppIcon_v2.png" : "assets/images/reps/icons/reps-icon.png";
  
  return (
    <article className="group overflow-hidden rounded-[2.25rem] border border-line bg-themed-card shadow-card flex flex-col h-full">
      {/* Showcase Visual Canvas */}
      <div 
        className={`relative aspect-[16/10] overflow-hidden flex items-center justify-center p-6 ${
          isHealth 
            ? "bg-gradient-to-br from-[#072418] via-[#02140e] to-[#0a3121]" 
            : "bg-gradient-to-br from-[#0c0827] via-[#040212] to-[#120d3d]"
        }`}
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
                alt={`${app?.name ?? slug} screenshot 1`} 
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
                alt={`${app?.name ?? slug} screenshot 2`} 
                fill 
                unoptimized
                className="object-cover" 
                priority
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
                alt={`${app?.name ?? slug} screenshot 3`} 
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
            <h3 className="text-xl font-black text-white leading-tight">{app?.name ?? slug}</h3>
            <p className="text-[10px] font-bold text-white/60 tracking-wider uppercase mt-0.5">{app?.category}</p>
          </div>
        </div>
      </div>
      
      {/* Content area */}
      <div className="p-7 sm:p-8 flex flex-col justify-between flex-grow">
        <div>
          <p className="text-lg font-black leading-snug text-ink">{es ? app?.tagline : app?.tagline_en ?? app?.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-graphite line-clamp-3">{es ? app?.shortDescription : app?.shortDescription_en ?? app?.shortDescription}</p>
        </div>
        <div>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {app?.platform.map(item => (
              <span className="rounded-full border border-line bg-themed-mist px-2.5 py-1 text-[9px] font-bold text-graphite uppercase tracking-wider" key={item}>
                {item}
              </span>
            ))}
          </div>
          <Link 
            className="mt-6 inline-flex items-center gap-2 text-sm font-black text-brand-blue transition group-hover:gap-3" 
            href={getAppPath(slug, locale)}
          >
            {es ? "Abrir caso de producto" : "Open product case"}
            <ArrowRight size={15} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function DarkPrinciple({ Icon, title, body }: { Icon: typeof ShieldCheck; title: string; body: string }) { return <article className="bg-[#0a1425] p-8 sm:p-10"><Icon className="text-cyan-300" size={25} /><h3 className="mt-10 text-xl font-black text-white">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{body}</p></article>; }
