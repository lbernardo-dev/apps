import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
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
        title: `Soporte de ${app.name}`,
        description: `Canales de soporte, privacidad y ayuda para ${app.name}.`
      }
    : {};
}

export default async function AppSupportPage({ params }: PageProps) {
  const { slug } = await params;
  const app = getAppBySlug(slug);

  if (!app) {
    notFound();
  }

  return (
    <section className="section bg-white">
      <div className="container max-w-3xl">
        <Mail aria-hidden="true" className="text-brand-blue" size={36} />
        <h1 className="mt-5 text-5xl font-semibold tracking-tight text-ink">Soporte de {app.name}</h1>
        <p className="mt-5 text-lg leading-8 text-graphite">
          Si necesitas ayuda, envia una descripcion breve del problema, pasos para reproducirlo, version de iOS y
          capturas si aportan contexto.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`mailto:${app.supportEmail}`}>Enviar email</ButtonLink>
          <ButtonLink href={`/apps/${app.slug}/faq`} variant="secondary">
            Ver FAQ
          </ButtonLink>
        </div>
        <div className="mt-10 rounded-lg border border-line bg-mist p-6">
          <h2 className="text-xl font-semibold text-ink">Datos utiles para soporte</h2>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-graphite">
            <li>Nombre de la app: {app.name}</li>
            <li>Plataforma: {app.platform.join(", ")}</li>
            <li>Email de soporte: {app.supportEmail}</li>
            <li>Ultima actualizacion legal: {app.updatedAt}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
