import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta con LB Apps para desarrollo de apps, consultoria o colaboraciones."
};

export default function ContactPage() {
  return (
    <section className="section bg-white">
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h1 className="text-5xl font-semibold tracking-tight text-ink">Hablemos de tu app</h1>
          <p className="mt-5 text-lg leading-8 text-graphite">
            Cuéntame que quieres construir, en que punto estas y que resultado de negocio esperas. El formulario guarda
            el mensaje en Supabase cuando esta configurado; si no, abre tu cliente de email.
          </p>
          <p className="mt-6 text-sm text-graphite">
            Email directo:{" "}
            <a className="font-semibold text-ink hover:text-brand-blue" href={`mailto:${siteConfig.supportEmail}`}>
              {siteConfig.supportEmail}
            </a>
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
