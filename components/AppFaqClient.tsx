"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FaqList } from "@/components/FaqList";
import { useLocale } from "@/lib/i18n";
import type { AppItem } from "@/lib/types";

export function AppFaqClient({ app }: { app: AppItem }) {
  const { locale } = useLocale();

  const isEs = locale === "es";

  return (
    <section className="section bg-themed-white pt-24 md:pt-28">
      <div className="container max-w-3xl animate-fade-in-up">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            href={`/apps/${app.slug}/`} 
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-graphite hover:text-brand-blue transition-colors group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            <span>{isEs ? `Volver a ${app.name}` : `Back to ${app.name}`}</span>
          </Link>
        </div>

        <h1 className="text-5xl font-semibold tracking-tight text-[var(--color-ink)]">
          {isEs ? "Preguntas frecuentes" : "FAQ"} — {app.name}
        </h1>
        <p className="mt-5 text-lg leading-8 text-[var(--color-graphite)]">
          {isEs 
            ? "Preguntas frecuentes, estado de publicación y enlaces de interés para los usuarios."
            : "Frequently asked questions, publication status and useful links for users."}
        </p>
        <div className="mt-10">
          <FaqList items={app.faq} />
        </div>
      </div>
    </section>
  );
}
