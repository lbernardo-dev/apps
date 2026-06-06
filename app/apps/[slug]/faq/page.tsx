import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { apps, getAppBySlug } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  return app
    ? {
        title: `FAQ de ${app.name}`,
        description: `Preguntas frecuentes y ayuda publica para ${app.name}.`
      }
    : {};
}

export default async function AppFaqPage({ params }: PageProps) {
  const { slug } = await params;
  const app = getAppBySlug(slug);

  if (!app) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: app.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer
            }
          }))
        }}
      />
      <section className="section bg-white">
        <div className="container max-w-3xl">
          <h1 className="text-5xl font-semibold tracking-tight text-ink">FAQ de {app.name}</h1>
          <p className="mt-5 text-lg leading-8 text-graphite">
            Preguntas frecuentes, estado de publicacion y enlaces utiles para usuarios.
          </p>
          <div className="mt-10">
            <FaqList items={app.faq} />
          </div>
        </div>
      </section>
    </>
  );
}
