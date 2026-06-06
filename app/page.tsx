import {
  AppWindow,
  ArrowRight,
  Check,
  Cloud,
  Lock,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Smartphone,
  Star,
  TrendingUp,
  Users
} from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/FaqList";
import { siteConfig } from "@/lib/site";

const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH || (process.env.GITHUB_ACTIONS === "true" ? "/apps" : "");
const conceptImage = `${assetBasePath}/landing-concept.png`;

const heroProof = [
  {
    title: "Nativas para iOS",
    body: "Rendimiento y experiencia superior.",
    Icon: Smartphone
  },
  {
    title: "Privacidad primero",
    body: "Tus datos y los de tus usuarios, seguros.",
    Icon: Lock
  },
  {
    title: "Enfocadas en resultados",
    body: "Apps que generan valor desde el dia uno.",
    Icon: TrendingUp
  }
];

const featuredApps = [
  {
    name: "Moneto",
    icon: "M",
    tone: "bg-brand-blue",
    body: "Finanzas personales simples y potentes para tomar el control de tu dinero.",
    points: ["Sincronizacion bancaria", "Presupuestos inteligentes", "Informes y tendencias"],
    crop: "moneto"
  },
  {
    name: "Nutri+",
    icon: "N",
    tone: "bg-brand-green",
    body: "Tu nutricion diaria, facil y personalizada.",
    points: ["Planes personalizados", "Registro de comidas", "Objetivos y progreso"],
    crop: "nutri"
  },
  {
    name: "FocusDay",
    icon: "F",
    tone: "bg-brand-blue",
    body: "Organiza tareas, habitos y proyectos para ser mas productivo cada dia.",
    points: ["Tareas y subtareas", "Habitos personalizables", "Estadisticas semanales"],
    crop: "focus"
  }
];

const services = [
  {
    title: "Apps iOS nativas",
    body: "Desarrollo con Swift y SwiftUI pensado para ser rapido, estable y escalable.",
    Icon: Smartphone
  },
  {
    title: "Diseño centrado en el usuario",
    body: "Interfaces intuitivas y cuidadas que enamoran y convierten usuarios en clientes.",
    Icon: AppWindow
  },
  {
    title: "Backend y datos",
    body: "Integraciones robustas con Supabase y APIs seguras, escalables y mantenibles.",
    Icon: Cloud
  },
  {
    title: "Entrega y crecimiento",
    body: "Publicacion en App Store, metricas, soporte y mejoras continuas.",
    Icon: Rocket
  }
];

const workflow = [
  ["Descubrimiento", "Entiendo tu idea, objetivos y usuarios para definir el rumbo correcto."],
  ["Diseño", "Wireframes y UI/UX que validan la experiencia antes de construir."],
  ["Desarrollo", "Codigo limpio, pruebas y buenas practicas desde el primer dia."],
  ["Lanzamiento", "Publicacion en App Store y preparacion de marketing y metricas."],
  ["Evolucion", "Analizamos, iteramos y hacemos crecer tu app juntos."]
];

const metrics = [
  ["25+", "Apps publicadas", Users, "En la App Store"],
  ["4,9", "Valoracion media", Star, "De mis aplicaciones"],
  ["1M+", "Descargas totales", TrendingUp, "Entre todas mis apps"],
  ["99,9%", "Uptime y estabilidad", ShieldCheck, "Rendimiento real"]
];

const faqItems = [
  {
    question: "¿Cuánto cuesta desarrollar una app iOS?",
    answer: "El coste depende de la complejidad de la aplicación, el diseño y las integraciones necesarias. Tras una sesión de descubrimiento para acotar el alcance, te proporcionaré un presupuesto cerrado para evitar sorpresas."
  },
  {
    question: "¿Cuánto tiempo tarda en estar lista una aplicación?",
    answer: "Un MVP (Producto Mínimo Viable) suele requerir entre 4 y 8 semanas de desarrollo. Proyectos de mayor envergadura con backend propio o integraciones avanzadas pueden tomar entre 3 y 6 meses."
  },
  {
    question: "¿Me ayudas a subir la app a la App Store?",
    answer: "Sí, me encargo de todo el proceso de publicación: configuración de App Store Connect, preparación de metadatos, optimización ASO inicial y resolución de cualquier feedback durante el proceso de revisión de Apple."
  },
  {
    question: "¿Qué tecnologías utilizas para el desarrollo?",
    answer: "Desarrollo de forma nativa para iOS y iPadOS usando Swift y SwiftUI para garantizar la mejor experiencia. Para el backend y bases de datos utilizo soluciones eficientes como Supabase, Firebase o APIs a medida."
  },
  {
    question: "¿Ofreces soporte y mantenimiento tras el lanzamiento?",
    answer: "Sí, ofrezco servicios de mantenimiento mensual para garantizar la compatibilidad con las nuevas actualizaciones de iOS, solucionar posibles incidencias y continuar añadiendo mejoras de forma continua."
  }
];

function ConceptCrop({ kind }: { kind: "hero" | "moneto" | "nutri" | "focus" }) {
  const crop = {
    hero: "absolute left-0 top-0 h-[520px] w-[560px] bg-[length:864px_auto] bg-[position:-420px_-70px]",
    moneto: "absolute left-0 top-0 h-[245px] w-[190px] bg-[length:864px_auto] bg-[position:-116px_-662px]",
    nutri: "absolute left-0 top-0 h-[245px] w-[190px] bg-[length:864px_auto] bg-[position:-410px_-662px]",
    focus: "absolute left-0 top-0 h-[245px] w-[190px] bg-[length:864px_auto] bg-[position:-698px_-662px]"
  }[kind];

  return (
    <div
      aria-hidden="true"
      className={crop}
      style={{
        backgroundImage: `url(${conceptImage})`,
        backgroundRepeat: "no-repeat"
      }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": `${siteConfig.url}/#website`,
              "url": siteConfig.url,
              "name": siteConfig.name,
              "description": siteConfig.description,
              "publisher": {
                "@id": `${siteConfig.url}/#person`
              }
            },
            {
              "@type": "ProfessionalService",
              "@id": `${siteConfig.url}/#service`,
              "name": "Lester Romero Bernardo - Desarrollador iOS y Consultor CRM",
              "image": "https://media.licdn.com/dms/image/v2/D4D03AQF_OSrap5VrTQ/profile-displayphoto-scale_200_200/B4DZkJH.2OGsAY-/0/1756794712068?e=2147483647&v=beta&t=g_rvVTM2sUulaUSQSP3XMBlDJ1bjDR8pSZ6wXMvzPY8",
              "url": siteConfig.url,
              "telephone": "",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Valencia",
                "addressRegion": "Comunidad Valenciana",
                "addressCountry": "ES"
              },
              "knowsAbout": [
                "Desarrollo iOS Nativo",
                "Swift",
                "SwiftUI",
                "Salesforce CRM",
                "Scrum",
                "Integraciones de software"
              ]
            },
            {
              "@type": "Person",
              "@id": `${siteConfig.url}/#person`,
              "name": "Lester Romero Bernardo",
              "jobTitle": "iOS Developer & Salesforce Consultant",
              "url": "https://www.linkedin.com/in/lbernardo-cu",
              "sameAs": [
                "https://www.linkedin.com/in/lbernardo-cu",
                "https://github.com/lbernardo-dev"
              ]
            }
          ]
        }}
      />

      <section className="relative overflow-hidden border-b border-line bg-white">
        {/* Background Patterns & Orbs */}
        <div 
          className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" 
          style={{ 
            maskImage: "radial-gradient(circle at center, black, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle at center, black, transparent 80%)" 
          }} 
        />
        <div className="glow-orb -left-20 -top-20 bg-brand-blue/10 size-[350px]" />
        <div className="glow-orb right-10 bottom-10 bg-brand-green/10 size-[300px]" />

        <div className="container relative z-10 grid min-h-[670px] items-center gap-10 py-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <h1 className="max-w-[560px] text-5xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-[4.9rem]">
              Apps iOS <span className="gradient-text">cuidadas</span>, listas para crecer
            </h1>
            <p className="mt-7 max-w-[520px] text-lg leading-8 text-graphite">
              Desarrollo apps iOS a medida con foco en diseño, rendimiento y negocio. Desde la idea hasta la App Store
              y más allá.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/contact">Hablemos de tu proyecto</ButtonLink>
              <ButtonLink href="/apps" variant="secondary">
                Ver mis apps
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
          <div className="relative hidden min-h-[540px] lg:flex items-center justify-center">
            <div className="absolute inset-x-4 bottom-10 h-28 rounded-full bg-brand-green/20 blur-3xl pointer-events-none" />
            <div className="relative h-[520px] w-[560px] transition-transform duration-500 hover:scale-[1.02]">
              <ConceptCrop kind="hero" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-line bg-mist py-20">
        <div className="container relative z-10">
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-ink">Apps destacadas</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-graphite">
              Diseño nativo de alto nivel, rendimiento optimizado y experiencia fluida.
            </p>
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {featuredApps.map((app) => (
              <article 
                className="group relative overflow-hidden rounded-xl border border-line bg-white p-6 shadow-soft hover:shadow-[0_30px_60px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between" 
                key={app.name}
              >
                {/* Brand Color Stripe */}
                <span className={`absolute top-0 inset-x-0 h-1.5 ${app.tone}`} />

                <div className="grid grid-cols-[1.1fr_0.9fr] gap-4 items-start min-h-[300px]">
                  <div>
                    <div className={`grid size-12 place-items-center rounded-xl text-base font-bold text-white shadow-md ${app.tone}`}>
                      {app.icon}
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-ink group-hover:text-brand-blue transition-colors">{app.name}</h3>
                    <p className="mt-2 text-xs leading-5 text-graphite min-h-[50px]">{app.body}</p>
                    <ul className="mt-5 space-y-2">
                      {app.points.map((point) => (
                        <li className="flex gap-2 text-xs leading-5 text-graphite" key={point}>
                          <Check aria-hidden="true" className="mt-0.5 shrink-0 text-brand-green" size={14} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative -mb-6 flex items-end justify-center min-h-[245px]">
                    {/* Simulated Phone Bezel Bevel */}
                    <div className="relative h-[245px] w-[190px] overflow-hidden rounded-t-[1.6rem] border-t-8 border-x-8 border-slate-950 bg-slate-950 shadow-[0_15px_35px_rgba(15,23,42,0.12)] transition-transform duration-500 group-hover:translate-y-1">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 z-20 h-2.5 w-16 -translate-x-1/2 rounded-b-md bg-slate-950" />
                      <ConceptCrop kind={app.crop as "moneto" | "nutri" | "focus"} />
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4 flex justify-between items-center">
                  <Link 
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:text-blue-700 transition-colors" 
                    href="/apps"
                  >
                    Ver detalles de {app.name}
                    <ArrowRight aria-hidden="true" size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white py-16">
        <div className="container">
          <h2 className="text-center text-4xl font-semibold tracking-tight text-ink">Que puedo hacer por ti</h2>
          <div className="mt-14 grid gap-8 lg:grid-cols-4">
            {services.map(({ title, body, Icon }) => (
              <article className="text-center lg:border-r lg:border-line lg:px-8 lg:last:border-r-0" key={title}>
                <Icon aria-hidden="true" className="mx-auto text-brand-blue" size={42} />
                <h3 className="mt-7 text-base font-semibold text-ink">{title}</h3>
                <p className="mx-auto mt-4 max-w-60 text-sm leading-6 text-graphite">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white py-16">
        <div className="container">
          <h2 className="text-center text-4xl font-semibold tracking-tight text-ink">Mi proceso</h2>
          <ol className="relative mt-12 grid gap-8 lg:grid-cols-5">
            <span className="absolute left-[8%] right-[8%] top-7 hidden h-0.5 bg-brand-blue lg:block" />
            {workflow.map(([title, body], index) => (
              <li className="relative text-center" key={title}>
                <span className="mx-auto grid size-14 place-items-center rounded-full border-2 border-brand-blue bg-white text-xl font-semibold text-brand-blue">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-base font-semibold text-ink">{title}</h3>
                <p className="mx-auto mt-3 max-w-48 text-sm leading-6 text-graphite">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-line bg-white py-12">
        <div className="container grid gap-8 lg:grid-cols-4">
          {metrics.map(([value, label, Icon, caption]) => (
            <article className="flex justify-center gap-5 lg:border-r lg:border-line lg:last:border-r-0" key={String(label)}>
              <Icon aria-hidden="true" className="mt-2 shrink-0 text-brand-blue" size={38} />
              <div>
                <p className="text-4xl font-semibold tracking-tight text-ink">{value as string}</p>
                <h3 className="mt-1 text-base font-semibold text-ink">{label as string}</h3>
                <p className="mt-1 text-xs text-graphite">{caption as string}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-line bg-white py-16">
        <div className="container">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-ink">Preguntas frecuentes</h2>
          <div className="mt-8 grid gap-9 lg:grid-cols-[1fr_360px]">
            <FaqList items={faqItems} />
            <aside className="rounded-lg border border-line bg-white p-7">
              <div className="grid size-16 place-items-center rounded-full bg-brand-green text-white">
                <MessageCircle aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-ink">¿Tienes otra pregunta?</h3>
              <p className="mt-3 text-sm leading-6 text-graphite">
                Estoy aqui para ayudarte. Hablemos de tu proyecto y te respondo sin compromiso.
              </p>
              <div className="mt-6">
                <ButtonLink href="/contact" showArrow={false}>
                  Hablemos
                </ButtonLink>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container rounded-lg border border-line bg-white p-8">
          <div className="grid gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <div className="grid size-20 place-items-center rounded-full bg-brand-blue text-white">
              <Rocket aria-hidden="true" size={34} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-ink">¿Tienes una idea en mente?</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-graphite">
                Convirtamosla en una app iOS que tus usuarios amen y que haga crecer tu negocio.
              </p>
            </div>
            <ButtonLink href="/contact">Hablemos de tu proyecto</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
