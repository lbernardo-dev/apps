import type { Metadata } from "next";
import { AdminConsole } from "@/components/AdminConsole";

export const metadata: Metadata = {
  title: "Admin",
  description: "Panel administrativo para gestionar apps, legal, FAQs y contenido de LB Apps.",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminPage() {
  return (
    <section className="section bg-mist">
      <div className="container">
        <div className="mb-10 max-w-3xl">
          <h1 className="text-5xl font-semibold tracking-tight text-ink">Panel administrativo</h1>
          <p className="mt-5 text-lg leading-8 text-graphite">
            Gestiona contenido desacoplado en Supabase. La proteccion real depende de Auth, roles y RLS; el frontend
            solo expone la interfaz cliente.
          </p>
        </div>
        <AdminConsole />
      </div>
    </section>
  );
}
