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
import type { AppItem } from "@/lib/types";

interface LandingPageClientProps {
  initialSections?: Record<string, unknown>;
  initialTestimonials?: unknown[];
  initialProfile?: { full_name?: string; headline?: string; image_url?: string };
  initialFeaturedApps?: AppItem[];
}

export function LandingPageClient({ initialFeaturedApps = [] }: LandingPageClientProps) {
  const { locale } = useLocale();
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
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2.5rem] bg-themed-mist shadow-soft">
            <Image src={getAssetPath("assets/images/profile/lester-romero.jpg")} alt="Lester Romero Bernardo" fill sizes="384px" className="object-cover" />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-slate-950/75 p-4 text-white backdrop-blur-xl"><p className="text-sm font-black">Lester Romero Bernardo</p><p className="mt-1 text-xs text-slate-300">iOS Developer · Salesforce Consultant</p></div>
          </div>
          <div><SectionHeading label={copy.aboutLabel} title={copy.aboutTitle} body={copy.aboutBody} /><div className="mt-8 grid gap-3 sm:grid-cols-2">{[es ? "Responsabilidad directa" : "Direct accountability", es ? "Criterio técnico y comercial" : "Technical and commercial judgement", es ? "Comunicación sin intermediarios" : "No-handoff communication", es ? "Documentación y continuidad" : "Documentation and continuity"].map(item => <div className="flex items-center gap-3 rounded-2xl border border-line p-4 text-sm font-bold text-ink" key={item}><Check className="text-brand-green" size={17} />{item}</div>)}</div><Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-black text-brand-blue hover:gap-3">{es ? "Ver experiencia y certificaciones" : "See experience and certifications"}<ArrowRight size={16} /></Link></div>
        </div>
      </section>

      <section id="contacto" className="section border-t border-line bg-themed-mist">
        <div className="container grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div><SectionHeading label={copy.contactLabel} title={copy.contactTitle} body={copy.contactBody} /><div className="mt-10 rounded-3xl border border-line bg-themed-card p-6"><MessageCircle className="text-brand-blue" /><p className="mt-4 text-sm font-bold text-ink">{es ? "¿Prefieres correo directo?" : "Prefer direct email?"}</p><a className="mt-1 block text-sm text-brand-blue hover:underline" href="mailto:lbernardo.pro@gmail.com">lbernardo.pro@gmail.com</a></div><div className="mt-10"><h3 className="mb-5 text-lg font-black text-ink">{copy.faq}</h3><FaqList items={faqItems} /></div></div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}

function Metric({ value, label }: { value: string; label: string }) { return <div className="px-4 py-6 text-center sm:px-8"><strong className="block text-2xl font-black tracking-tight text-white sm:text-3xl">{value}</strong><span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</span></div>; }

function SectionHeading({ label, title, body, dark = false }: { label: string; title: string; body?: string; dark?: boolean }) { return <div className="max-w-3xl"><span className="text-xs font-black uppercase tracking-[.28em] text-brand-blue">{label}</span><h2 className={`mt-4 text-balance text-4xl font-black leading-[1.02] tracking-[-.045em] sm:text-6xl ${dark ? "text-white" : "text-ink"}`}>{title}</h2>{body ? <p className={`mt-6 max-w-2xl text-base leading-8 ${dark ? "text-slate-300" : "text-graphite"}`}>{body}</p> : null}</div>; }

function ProductOrbit({ vitalspath, reps, es }: { vitalspath?: AppItem; reps?: AppItem; es: boolean }) {
  return <div className="relative mx-auto min-h-[520px] w-full max-w-[560px] animate-fade-in-up"><div className="absolute inset-8 rounded-full border border-white/10" /><div className="absolute inset-24 rounded-full border border-dashed border-white/10" /><div className="absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/15 blur-3xl" /><OrbitCard className="left-0 top-8 -rotate-3" app={vitalspath} slug="vitalspath" image="assets/images/vitalspath/screen-01-dashboard.PNG" /><OrbitCard className="bottom-5 right-0 rotate-3" app={reps} slug="reps" image="assets/images/reps/screens/simulator/today.jpg" /><div className="absolute right-4 top-12 rounded-2xl border border-white/10 bg-white/[.07] px-4 py-3 backdrop-blur-xl"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">App Store</p><p className="mt-1 flex items-center gap-1 text-sm font-black text-white"><Star size={13} className="text-amber-400" fill="currentColor" /> 5,0</p></div><div className="absolute bottom-20 left-3 rounded-2xl border border-white/10 bg-white/[.07] px-4 py-3 backdrop-blur-xl"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{es ? "Estado" : "Status"}</p><p className="mt-1 flex items-center gap-2 text-sm font-black text-white"><span className="size-2 rounded-full bg-emerald-400" />{es ? "En producción" : "In production"}</p></div></div>;
}

function OrbitCard({ app, slug, image, className }: { app?: AppItem; slug: string; image: string; className: string }) { return <Link href={`/apps/${slug}`} className={`absolute w-[70%] max-w-[350px] overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900 shadow-[0_35px_100px_rgba(0,0,0,.5)] transition duration-500 hover:z-20 hover:rotate-0 hover:scale-[1.03] ${className}`}><div className="relative aspect-[16/11]"><Image src={getAssetPath(image)} alt={app?.name ?? slug} fill sizes="350px" className="object-cover opacity-90" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent" /><div className="absolute inset-x-5 bottom-4 flex items-center justify-between"><div><p className="font-black text-white">{app?.name ?? slug}</p><p className="text-[10px] font-bold text-slate-400">{app?.category}</p></div><span className="flex size-9 items-center justify-center rounded-full bg-white text-slate-950"><ArrowRight size={15} /></span></div></div></Link>; }

function ProductFeature({ app, slug, tone, es }: { app?: AppItem; slug: string; tone: "health" | "fitness"; es: boolean }) {
  const isHealth = tone === "health"; const cover = isHealth ? "assets/images/vitalspath/screen-01-dashboard.PNG" : "assets/images/reps/aso/01-train-smarter.jpg"; const icon = isHealth ? "assets/images/vitalspath/AppIcon_v2.png" : "assets/images/reps/icons/reps-icon.png";
  return <article className="group overflow-hidden rounded-[2.25rem] border border-line bg-themed-card shadow-card"><div className={`relative aspect-[16/10] overflow-hidden ${isHealth ? "bg-emerald-950" : "bg-slate-950"}`}><Image src={getAssetPath(cover)} alt={app?.name ?? slug} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent" /><div className="absolute bottom-5 left-5 flex items-center gap-3"><div className="relative size-14 overflow-hidden rounded-2xl border border-white/30 bg-white"><Image src={getAssetPath(icon)} alt="" fill sizes="56px" className="object-cover" /></div><div><h3 className="text-2xl font-black text-white">{app?.name ?? slug}</h3><p className="text-xs font-bold text-white/60">{app?.category}</p></div></div></div><div className="p-7 sm:p-8"><p className="text-xl font-black leading-tight text-ink">{es ? app?.tagline : app?.tagline_en ?? app?.tagline}</p><p className="mt-4 text-sm leading-7 text-graphite">{es ? app?.shortDescription : app?.shortDescription_en ?? app?.shortDescription}</p><div className="mt-6 flex flex-wrap gap-2">{app?.platform.map(item => <span className="rounded-full border border-line px-3 py-1 text-[10px] font-bold text-graphite" key={item}>{item}</span>)}</div><Link className="mt-7 inline-flex items-center gap-2 text-sm font-black text-brand-blue transition group-hover:gap-3" href={`/apps/${slug}`}>{es ? "Abrir caso de producto" : "Open product case"}<ArrowRight size={16} /></Link></div></article>;
}

function DarkPrinciple({ Icon, title, body }: { Icon: typeof ShieldCheck; title: string; body: string }) { return <article className="bg-[#0a1425] p-8 sm:p-10"><Icon className="text-cyan-300" size={25} /><h3 className="mt-10 text-xl font-black text-white">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{body}</p></article>; }
