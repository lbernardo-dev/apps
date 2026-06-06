import { Check, Code2, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import { AppCard } from "@/components/AppCard";
import { ButtonLink } from "@/components/ButtonLink";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PhoneMockup } from "@/components/PhoneMockup";
import { apps, generalFaq, getFeaturedApps, homeSections, testimonials } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const capabilities = [
  "Estrategia de producto y alcance de MVP",
  "Diseño de interfaz y experiencia iOS",
  "Desarrollo SwiftUI y arquitectura mantenible",
  "Preparacion App Store, privacidad, soporte y legal",
  "Landing, SEO tecnico y analitica ligera",
  "Integracion Supabase para contenido y operaciones"
];

const process = [
  "Diagnostico de objetivo, usuario y restricciones.",
  "Prototipo del flujo principal y decisiones de producto.",
  "Implementacion iterativa con QA, accesibilidad y rendimiento.",
  "Preparacion de publicacion, soporte y mejora continua."
];

export default function HomePage() {
  const featuredApps = getFeaturedApps();

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
      <section className="overflow-hidden border-b border-line bg-white">
        <div className="container grid min-h-[calc(100vh-64px)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Apps iOS cuidadas, listas para crecer
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite">
              Portfolio, marketing, soporte y base legal para apps publicadas. Construyo productos moviles con
              criterio tecnico, foco comercial y una presencia web preparada para convertir.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">Hablemos de tu app</ButtonLink>
              <ButtonLink href="/apps" variant="secondary">
                Explorar apps
              </ButtonLink>
            </div>
            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-6">
              {[
                ["Static", "GitHub Pages"],
                ["RLS", "Supabase"],
                ["SEO", "Schema listo"]
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="text-xl font-semibold text-ink">{value}</dt>
                  <dd className="mt-1 text-xs font-medium uppercase tracking-wide text-graphite">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="absolute inset-8 rounded-full bg-brand-cyan/20 blur-3xl" />
            <div className="relative grid gap-4 rounded-lg border border-line bg-mist p-5 shadow-soft">
              <PhoneMockup app={apps[0]} />
              <div className="grid gap-3 rounded-lg bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <Sparkles aria-hidden="true" className="text-brand-green" size={20} />
                  <p className="font-semibold text-ink">Catalogo vivo con soporte y legal por app</p>
                </div>
                <p className="text-sm leading-6 text-graphite">
                  Cada producto tiene detalle, privacidad, terminos, FAQ y soporte publico listo para App Store.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Apps destacadas</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-graphite">
                Un catalogo preparado para crecer con nuevos productos, estados de publicacion y enlaces a App Store.
              </p>
            </div>
            <ButtonLink href="/apps" variant="ghost">
              Ver catalogo completo
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {featuredApps.map((app) => (
              <AppCard app={app} key={app.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Una web de producto, no solo un escaparate
            </h2>
            <p className="mt-4 text-base leading-7 text-graphite">
              La estructura combina portfolio profesional, conversion, documentacion publica y operaciones de contenido.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {homeSections.map((section) => (
              <article className="rounded-lg border border-line p-5" key={section.title}>
                <h3 className="font-semibold text-ink">{section.title}</h3>
                <p className="mt-3 text-sm leading-6 text-graphite">{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ink text-white">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Servicios y capacidades</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
              Trabajo con una mezcla de estrategia, interfaz, desarrollo y preparacion de publicacion para que una app
              no llegue sola al mercado.
            </p>
          </div>
          <div className="grid gap-3">
            {capabilities.map((item) => (
              <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-4" key={item}>
                <Check aria-hidden="true" className="mt-0.5 text-brand-cyan" size={18} />
                <p className="text-sm leading-6 text-slate-100">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <Rocket aria-hidden="true" className="text-brand-blue" size={32} />
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Proceso orientado a publicar
            </h2>
          </div>
          <ol className="grid gap-4">
            {process.map((item, index) => (
              <li className="grid grid-cols-[48px_1fr] gap-4 rounded-lg border border-line p-5" key={item}>
                <span className="grid size-10 place-items-center rounded-md bg-slate-100 font-semibold text-ink">
                  {index + 1}
                </span>
                <p className="self-center text-base leading-7 text-graphite">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <ShieldCheck aria-hidden="true" className="text-brand-green" size={32} />
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Señales de confianza</h2>
            <p className="mt-4 text-base leading-7 text-graphite">
              El sitio nace preparado para privacidad, soporte, SEO tecnico y operaciones con permisos.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {testimonials.map((testimonial) => (
              <blockquote className="rounded-lg border border-line bg-white p-6" key={testimonial.name}>
                <p className="text-base leading-7 text-ink">“{testimonial.quote}”</p>
                <footer className="mt-5 text-sm text-graphite">
                  <strong className="text-ink">{testimonial.name}</strong> · {testimonial.role}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Preguntas frecuentes</h2>
            <p className="mt-4 text-base leading-7 text-graphite">
              Respuestas rapidas sobre desarrollo, publicacion y funcionamiento del sitio.
            </p>
          </div>
          <FaqList items={generalFaq} />
        </div>
      </section>

      <section className="section-tight bg-white">
        <div className="container rounded-lg bg-ink p-8 text-white md:p-12">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <Code2 aria-hidden="true" className="text-brand-cyan" />
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">¿Tienes una app en mente?</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                Hablemos de alcance, producto, publicacion y presencia web para convertirla en una experiencia lista
                para usuarios reales.
              </p>
            </div>
            <ButtonLink href="/contact" variant="secondary">
              Contactar
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
