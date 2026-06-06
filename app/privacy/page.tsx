import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Politica de privacidad",
  description: "Politica de privacidad general del sitio LB Apps."
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Politica de privacidad"
      updatedAt="2026-06-06"
      body={[
        "Este sitio recopila solo los datos necesarios para responder consultas, medir rendimiento basico y mantener una relacion comercial cuando el usuario lo solicita.",
        "Los mensajes enviados desde el formulario pueden almacenarse en Supabase con acceso restringido mediante Row Level Security.",
        "No se usan claves privilegiadas en el frontend. Las credenciales publicas deben limitarse al uso anonimo previsto por Supabase.",
        "Puedes solicitar informacion sobre tus datos o pedir su eliminacion escribiendo al email de soporte indicado en el sitio."
      ]}
    />
  );
}
