"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, ArrowRight, Check, ChevronDown, Cpu, 
  HelpCircle, ShieldCheck, Sparkles 
} from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { servicesData } from "@/lib/services-content";
import { getAppPath, getStaticPath } from "@/lib/routes";

export function ServiceDetailView({ serviceId }: { serviceId: string }) {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const service = servicesData.find((s) => s.id === serviceId);

  if (!service) return null;

  const title = isEn ? service.title_en : service.title;
  const heroTitle = isEn ? service.heroTitle_en : service.heroTitle;
  const heroSub = isEn ? service.heroSub_en : service.heroSub;
  const problemsTitle = isEn ? service.problemsTitle_en : service.problemsTitle;
  const problems = isEn ? service.problems_en : service.problems;
  const audienceTitle = isEn ? service.audienceTitle_en : service.audienceTitle;
  const audience = isEn ? service.audience_en : service.audience;
  const servicesTitle = isEn ? service.servicesTitle_en : service.servicesTitle;
  const servicesList = isEn ? service.servicesList_en : service.servicesList;
  const processTitle = isEn ? service.processTitle_en : service.processTitle;
  const processList = isEn ? service.processList_en : service.processList;
  const techTitle = isEn ? service.techTitle_en : service.techTitle;
  const deliverablesTitle = isEn ? service.deliverablesTitle_en : service.deliverablesTitle;
  const deliverablesList = isEn ? service.deliverablesList_en : service.deliverablesList;
  const faqTitle = isEn ? service.faqTitle_en : service.faqTitle;
  const faqList = isEn ? service.faqList_en : service.faqList;
  const ctaTitle = isEn ? service.ctaTitle_en : service.ctaTitle;
  const ctaSub = isEn ? service.ctaSub_en : service.ctaSub;
  const ctaButton = isEn ? service.ctaButton_en : service.ctaButton;

  // Find related case study
  const showIosCases = serviceId === "ios-development" || serviceId === "app-audits" || serviceId === "product-design";
  const showSalesforceCases = serviceId === "salesforce-consulting" || serviceId === "integrations-and-automation";

  return (
    <div className="bg-themed-white">
      {/* ─── Hero Section ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#07101f] text-white py-24 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" aria-hidden="true" />
        <div className="absolute -left-48 top-20 size-[30rem] rounded-full bg-blue-600/15 blur-[120px]" aria-hidden="true" />
        <div className="absolute -right-40 bottom-0 size-[28rem] rounded-full bg-cyan-400/10 blur-[110px]" aria-hidden="true" />
        
        <div className="container relative z-10">
          <div className="mb-6">
            <Link 
              href={`/${locale}/`}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors group"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              <span>{isEn ? "Back to Home" : "Volver al inicio"}</span>
            </Link>
          </div>
          
          <div className="max-w-4xl">
            <span className="text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
              {title}
            </span>
            <h1 className="mt-4 text-balance text-4xl font-black leading-[1.02] tracking-[-.045em] sm:text-6xl lg:text-[4.2rem]">
              {heroTitle}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              {heroSub}
            </p>
            <div className="mt-10">
              <Link 
                href={getStaticPath("contact", locale)}
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                {ctaButton}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Problems & Audience ──────────────────────────── */}
      <section className="section border-b border-line bg-themed-white">
        <div className="container grid gap-12 lg:grid-cols-2">
          {/* Problems */}
          <div className="reveal-on-scroll">
            <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
              {problemsTitle}
            </h2>
            <div className="mt-8 space-y-4">
              {problems.map((prob, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl border border-line bg-themed-card shadow-sm">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500 text-xs font-bold">
                    !
                  </span>
                  <p className="text-sm leading-6 text-graphite">{prob}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Target Audience */}
          <div className="reveal-on-scroll flex flex-col justify-center rounded-3xl border border-line bg-themed-mist p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 size-24 bg-brand-blue/5 rounded-full blur-xl" aria-hidden="true" />
            <h3 className="text-2xl font-black text-ink">{audienceTitle}</h3>
            <p className="mt-6 text-base leading-8 text-graphite">{audience}</p>
          </div>
        </div>
      </section>

      {/* ─── Services List ────────────────────────────────── */}
      <section className="section border-b border-line bg-themed-mist">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-blue">
              {title}
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-5xl">
              {servicesTitle}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicesList.map((svc, i) => (
              <div key={i} className="rounded-3xl border border-line bg-themed-card p-6 shadow-card hover:border-brand-blue/30 transition duration-300">
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <Check size={18} />
                </span>
                <p className="mt-6 text-sm font-bold text-ink leading-6">{svc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Process ──────────────────────────────────────── */}
      <section className="section border-b border-line bg-themed-white">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-blue">
              {isEn ? "Methodology" : "Metodología"}
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-5xl">
              {processTitle}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processList.map((proc, i) => (
              <div key={i} className="relative rounded-2xl border border-line p-6 bg-themed-card shadow-sm">
                <span className="text-xs font-black text-brand-blue bg-brand-blue/10 px-2.5 py-1 rounded-md">
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-lg font-black text-ink">{proc.title}</h3>
                <p className="mt-2 text-xs leading-5 text-graphite">{proc.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Tech Stack & Deliverables ────────────────────── */}
      <section className="section border-b border-line bg-themed-mist">
        <div className="container grid gap-12 lg:grid-cols-2">
          {/* Tech Stack */}
          <div>
            <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
              {techTitle}
            </h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {service.techList.map((tech) => (
                <span 
                  key={tech} 
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-themed-card px-4 py-2 text-xs font-bold text-ink shadow-sm"
                >
                  <Cpu size={12} className="text-brand-blue" />
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
              {deliverablesTitle}
            </h2>
            <ul className="mt-8 space-y-4">
              {deliverablesList.map((del, i) => (
                <li key={i} className="flex gap-3 text-sm leading-6 text-graphite">
                  <Check className="mt-0.5 shrink-0 text-brand-green" size={16} />
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-tight border-b border-line bg-themed-white">
        <div className="container grid gap-6 md:grid-cols-3">
          {[
            { title: isEn ? "First step" : "Primer paso", body: isEn ? "A short assessment to clarify goals, dependencies and the first measurable delivery." : "Una evaluación breve para aclarar objetivos, dependencias y la primera entrega medible." },
            { title: isEn ? "Scope and timing" : "Alcance y plazos", body: isEn ? "You receive a written scope, acceptance criteria and timing after the initial assessment." : "Recibes alcance, criterios de aceptación y plazos por escrito después de la evaluación inicial." },
            { title: isEn ? "Direct collaboration" : "Colaboración directa", body: isEn ? "No sales handoff: technical communication, decisions and delivery remain with the same person." : "Sin traspaso comercial: comunicación técnica, decisiones y entrega permanecen con la misma persona." }
          ].map((item) => (
            <article className="rounded-2xl border border-line bg-themed-card p-6 shadow-sm" key={item.title}>
              <h2 className="text-lg font-black text-ink">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-graphite">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ─── Related Case Studies / NDA Note ──────────────── */}
      <section className="section border-b border-line bg-themed-white">
        <div className="container">
          <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl mb-8">
            {isEn ? "Related Experience" : "Experiencia Relacionada"}
          </h2>

          {showIosCases && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="border border-line rounded-3xl p-6 bg-themed-card hover:border-brand-blue/30 transition shadow-sm">
                <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest block mb-2">iOS App</span>
                <h3 className="text-xl font-black text-ink">VitalsPath</h3>
                <p className="mt-3 text-xs leading-5 text-graphite">Salud familiar, medicación y constantes vitales con widgets interactivos y watchOS.</p>
                <Link href={getAppPath("vitalspath", locale)} className="mt-4 inline-flex items-center gap-1 text-xs font-black text-brand-blue hover:underline">
                  {isEn ? "Open Case Study" : "Ver Caso de Estudio"} <ArrowRight size={12} />
                </Link>
              </div>
              <div className="border border-line rounded-3xl p-6 bg-themed-card hover:border-brand-blue/30 transition shadow-sm">
                <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest block mb-2">iOS App</span>
                <h3 className="text-xl font-black text-ink">StreakReps</h3>
                <p className="mt-3 text-xs leading-5 text-graphite">Registro avanzado de rutinas y sobrecarga progresiva integrado con Apple Health.</p>
                <Link href={getAppPath("reps", locale)} className="mt-4 inline-flex items-center gap-1 text-xs font-black text-brand-blue hover:underline">
                  {isEn ? "Open Case Study" : "Ver Caso de Estudio"} <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          )}

          {showSalesforceCases && (
            <div className="rounded-3xl border border-line bg-themed-mist p-6 lg:p-8 flex flex-col sm:flex-row gap-6 items-start">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
                <ShieldCheck size={22} />
              </span>
              <div>
                <h3 className="text-lg font-black text-ink">{isEn ? "Enterprise Confidentiality (NDA)" : "Confidencialidad Corporativa (NDA)"}</h3>
                <p className="mt-3 text-sm leading-6 text-graphite">
                  {isEn 
                    ? "Due to active NDAs with corporate clients, specific SAP integrations, Apex implementations, and CRM deployment configurations cannot be listed publicly. I can explain similar architectural approaches during a private consultation."
                    : "Debido a los contratos de confidencialidad activos con clientes corporativos, las integraciones SAP, desarrollos Apex y flujos CRM avanzados no se listan públicamente. Puedo detallar arquitecturas equivalentes en una sesión privada."}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── Service FAQs (Accordion) ────────────────────── */}
      <section className="section border-b border-line bg-themed-mist">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl text-center mb-10">
            {faqTitle}
          </h2>

          <div className="space-y-4">
            {faqList.map((item, index) => (
              <div 
                key={index} 
                className="border border-line rounded-2xl bg-themed-card overflow-hidden shadow-sm"
              >
                <button
                  aria-controls={`service-faq-${index}`}
                  aria-expanded={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between p-5 text-left font-bold text-ink hover:bg-themed-mist transition"
                  type="button"
                >
                  <span className="flex gap-2.5 items-center">
                    <HelpCircle size={18} className="text-brand-blue shrink-0" />
                    <span className="text-sm sm:text-base">{item.q}</span>
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`text-graphite shrink-0 transition-transform ${openFaq === index ? "rotate-180" : ""}`} 
                  />
                </button>
                {openFaq === index && (
                  <div id={`service-faq-${index}`} className="p-5 border-t border-line bg-themed-mist/30 text-sm leading-7 text-graphite">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ───────────────────────────────────── */}
      <section className="section bg-[#07101f] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" aria-hidden="true" />
        <div className="absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" aria-hidden="true" />
        
        <div className="container relative z-10 max-w-3xl">
          <Sparkles className="mx-auto text-cyan-300" size={28} />
          <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">
            {ctaTitle}
          </h2>
          <p className="mt-4 text-base text-slate-300">
            {ctaSub}
          </p>
          <div className="mt-8">
            <Link 
              href={getStaticPath("contact", locale)}
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-brand-blue px-6 py-3.5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:brightness-110"
            >
              {isEn ? "Discuss your project" : "Hablemos de tu proyecto"}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
