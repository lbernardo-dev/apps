import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Politica de cookies",
  description: "Politica de cookies y almacenamiento local de LB Apps."
};

export default function CookiesPage() {
  return (
    <LegalDocument
      title="Politica de cookies"
      updatedAt="2026-06-06"
      body={[
        "El sitio esta preparado para funcionar sin cookies no esenciales en la parte publica.",
        "El panel administrativo puede usar almacenamiento y cookies tecnicas de Supabase Auth para mantener la sesion.",
        "Si se añaden herramientas de analitica, medicion o marketing, se documentaran en esta pagina antes de activarlas.",
        "Puedes borrar cookies y almacenamiento local desde la configuracion de tu navegador."
      ]}
    />
  );
}
