import { ButtonLink } from "@/components/ButtonLink";

export default function NotFound() {
  return (
    <section className="section bg-white">
      <div className="container max-w-2xl text-center">
        <p className="text-sm font-semibold text-brand-blue">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-ink">Pagina no encontrada</h1>
        <p className="mt-5 text-lg leading-8 text-graphite">
          La ruta no existe o todavia no se ha generado en el export estatico.
        </p>
        <div className="mt-8">
          <ButtonLink href="/">Volver al inicio</ButtonLink>
        </div>
      </div>
    </section>
  );
}
