import {
  AppWindow,
  ArrowRight,
  Check,
  ChevronDown,
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

const faqs = [
  "¿Cuanto cuesta desarrollar una app iOS?",
  "¿Cuanto tiempo tarda en estar lista?",
  "¿Me ayudas a publicar en la App Store?",
  "¿Que tipo de proyectos trabajas?",
  "¿Ofreces soporte y mantenimiento?"
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
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
          potentialAction: {
            "@type": "ContactAction",
            target: `${siteConfig.url}/contact/`
          }
        }}
      />

      <section className="border-b border-line bg-white">
        <div className="container grid min-h-[670px] items-center gap-10 py-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <h1 className="max-w-[560px] text-5xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-[4.9rem]">
              Apps iOS cuidadas, listas para crecer
            </h1>
            <p className="mt-7 max-w-[520px] text-lg leading-8 text-graphite">
              Desarrollo apps iOS a medida con foco en diseño, rendimiento y negocio. Desde la idea hasta la App Store
              y mas alla.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/contact">Hablemos de tu proyecto</ButtonLink>
              <ButtonLink href="/apps" variant="secondary">
                Ver mis apps
              </ButtonLink>
            </div>
            <div className="mt-16 grid max-w-[580px] gap-8 sm:grid-cols-3">
              {heroProof.map(({ title, body, Icon }) => (
                <article key={title}>
                  <Icon aria-hidden="true" className="text-brand-blue" size={30} />
                  <h2 className="mt-5 text-sm font-semibold text-ink">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-graphite">{body}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="relative hidden min-h-[540px] lg:block">
            <div className="absolute inset-x-4 bottom-10 h-28 rounded-full bg-brand-green/20 blur-3xl" />
            <ConceptCrop kind="hero" />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white py-16">
        <div className="container">
          <h2 className="text-center text-4xl font-semibold tracking-tight text-ink">Apps destacadas</h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {featuredApps.map((app) => (
              <article className="overflow-hidden rounded-lg border border-line bg-white p-6 shadow-sm" key={app.name}>
                <div className="grid min-h-[330px] grid-cols-[0.85fr_1fr] gap-5">
                  <div>
                    <div className={`grid size-14 place-items-center rounded-lg text-lg font-bold text-white ${app.tone}`}>
                      {app.icon}
                    </div>
                    <h3 className="mt-7 text-xl font-semibold text-ink">{app.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-graphite">{app.body}</p>
                    <ul className="mt-7 space-y-3">
                      {app.points.map((point) => (
                        <li className="flex gap-2 text-sm leading-5 text-graphite" key={point}>
                          <Check aria-hidden="true" className="mt-0.5 shrink-0 text-brand-green" size={15} />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <Link className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue" href="/apps">
                      Ver detalles
                      <ArrowRight aria-hidden="true" size={15} />
                    </Link>
                  </div>
                  <div className="relative -mb-10 min-h-[245px] overflow-hidden rounded-t-[1.8rem]">
                    <ConceptCrop kind={app.crop as "moneto" | "nutri" | "focus"} />
                  </div>
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

      <section className="border-b border-line bg-white py-12">
        <div className="container">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-ink">Preguntas frecuentes</h2>
          <div className="mt-7 grid gap-9 lg:grid-cols-[1fr_360px]">
            <div className="rounded-lg border border-line bg-white">
              {faqs.map((question) => (
                <button
                  className="flex w-full items-center justify-between border-b border-line px-6 py-4 text-left text-sm font-medium text-ink last:border-b-0"
                  key={question}
                  type="button"
                >
                  {question}
                  <ChevronDown aria-hidden="true" size={16} />
                </button>
              ))}
            </div>
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
