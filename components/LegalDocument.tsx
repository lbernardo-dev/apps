"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useLocale } from "@/lib/i18n";

type LegalDocumentProps = {
  title: string;
  updatedAt: string;
  body: string[] | string;
  backUrl?: string;
  backLabel?: string;
  appName?: string;
};

export function LegalDocument({ title, updatedAt, body, backUrl, backLabel, appName }: LegalDocumentProps) {
  const { locale } = useLocale();
  const isHtml = typeof body === "string";

  return (
    <section className="section bg-themed-white pt-24 md:pt-28">
      <div className="container max-w-4xl">
        {backUrl && (
          <div className="mb-8">
            <Link 
              href={backUrl} 
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-graphite hover:text-brand-blue transition-colors group"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              <span>
                {backLabel || 
                  (locale === "es" 
                    ? `Volver a ${appName || "la App"}` 
                    : `Back to ${appName || "App"}`)}
              </span>
            </Link>
          </div>
        )}

        <div className="rounded-[2rem] border border-line bg-themed-card p-7 shadow-soft sm:p-10">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
            <ShieldCheck size={24} aria-hidden="true" />
          </div>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-ink sm:text-5xl">{title}</h1>
          <p className="mt-4 text-sm font-medium text-graphite">Última actualización: {updatedAt}</p>
        </div>
        {isHtml ? (
          <div
            className="mt-10 prose prose-slate max-w-none text-base leading-8 text-[var(--color-graphite)] [&_h2]:text-[var(--color-ink)] [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-4 [&_strong]:text-[var(--color-ink)]"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        ) : (
          <div className="mt-10 grid gap-5 text-base leading-8 text-graphite">
            {body.map((paragraph) => paragraph.startsWith("## ") ? (
              <h2 className="mt-6 text-2xl font-black tracking-tight text-ink" key={paragraph}>{paragraph.slice(3)}</h2>
            ) : paragraph.startsWith("- ") ? (
              <p className="border-l-2 border-brand-blue/30 pl-4" key={paragraph}>{paragraph.slice(2)}</p>
            ) : (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
