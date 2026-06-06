import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Terminos generales",
  description: "Terminos generales de uso del sitio LB Apps."
};

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terminos generales"
      updatedAt="2026-06-06"
      body={[
        "El contenido de este sitio se ofrece con fines informativos, comerciales y de soporte para apps propias o servicios relacionados.",
        "Los enlaces a App Store, documentacion o servicios externos pueden cambiar segun el estado de publicacion de cada app.",
        "Las propuestas, presupuestos o colaboraciones requieren acuerdo escrito especifico. Ninguna pagina publica sustituye ese acuerdo.",
        "El uso continuado del sitio implica aceptar estos terminos generales y las politicas especificas de cada app cuando correspondan."
      ]}
    />
  );
}
