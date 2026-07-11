import type { Metadata } from "next";
import { AdminConsole } from "@/components/AdminConsole";

export const metadata: Metadata = {
  title: "Admin",
  description: "Administrative panel for managing apps, legal, FAQs and LB Apps content.",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminPage() {
  return (
    <section className="section bg-themed-mist">
      <div className="container">
        <div className="mb-10 max-w-3xl">
          <h1 className="text-5xl font-semibold tracking-tight text-[var(--color-ink)]">Admin Panel</h1>
          <p className="mt-5 text-lg leading-8 text-[var(--color-graphite)]">
            Manage decoupled content in Supabase. Real protection relies on Auth, roles and RLS; the frontend only
            exposes the client interface.
          </p>
        </div>
        <AdminConsole />
      </div>
    </section>
  );
}
