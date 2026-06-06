import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";

export const metadata: Metadata = {
  title: "Sobre mi",
  description: "Perfil profesional, enfoque de producto y capacidades de desarrollo de LB Apps."
};

export default function AboutPage() {
  return (
    <section className="section bg-white">
      <div className="container grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h1 className="text-5xl font-semibold tracking-tight text-ink">Producto, codigo y publicacion</h1>
          <p className="mt-5 text-lg leading-8 text-graphite">
            LB Apps es el espacio para presentar apps propias y colaborar en productos moviles con una base tecnica
            solida, una narrativa clara y paginas publicas listas para usuarios, soporte y App Store.
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact">Hablemos</ButtonLink>
          </div>
        </div>
        <div className="grid gap-5">
          {[
            ["Estrategia", "Definicion de problema, alcance, publico y camino a publicacion."],
            ["Construccion", "SwiftUI, arquitectura mantenible, QA, accesibilidad y rendimiento."],
            ["Crecimiento", "Landing, SEO, soporte, legal, analitica y contenido administrable."]
          ].map(([title, body]) => (
            <article className="rounded-lg border border-line bg-mist p-6" key={title}>
              <h2 className="text-xl font-semibold text-ink">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-graphite">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
