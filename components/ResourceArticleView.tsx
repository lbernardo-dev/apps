"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Calendar, Clock, Sparkles } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { ResourceArticle } from "@/lib/resources-content";
import { getStaticPath } from "@/lib/routes";

export function ResourceArticleView({ article }: { article: ResourceArticle }) {
  const { locale } = useLocale();
  const isEn = locale === "en";

  const title = isEn ? article.title_en : article.title;
  const readTime = isEn ? article.readTime_en : article.readTime;
  const bodyContent = isEn ? article.content_en : article.content;

  return (
    <article className="section bg-themed-white pt-24 md:pt-28">
      {/* Background Accent */}
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-brand-blue/5 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="container relative max-w-4xl">
        {/* Back Link */}
        <div className="mb-8">
          <Link 
            href={getStaticPath("resources", locale)}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-graphite hover:text-brand-blue transition-colors group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            <span>{isEn ? "Back to resources" : "Volver a recursos"}</span>
          </Link>
        </div>

        {/* Article Meta Header */}
        <header className="border-b border-line pb-8">
          <div className="flex items-center gap-4 text-xs text-graphite mb-5">
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} />
              {readTime}
            </span>
          </div>

          <p className="mb-4 text-sm font-semibold text-ink">
            {isEn ? "By Lester Romero Bernardo · Reviewed technical guidance" : "Por Lester Romero Bernardo · Contenido técnico revisado"}
          </p>

          <h1 className="text-4xl font-black tracking-tight text-ink sm:text-5xl leading-tight">
            {title}
          </h1>
        </header>

        {/* Article Body */}
        <div 
          className="prose prose-slate mt-10 max-w-none text-base leading-8 text-[var(--color-graphite)] 
                     [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-[var(--color-ink)] 
                     [&_strong]:text-[var(--color-ink)] [&_p]:mb-6 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-6 [&_li]:mb-2 [&_li]:leading-7"
          dangerouslySetInnerHTML={{ __html: bodyContent }}
        />

        {/* Footer CTA Box */}
        <footer className="mt-16 rounded-3xl border border-line bg-themed-mist p-8 text-center relative overflow-hidden shadow-sm">
          <div className="absolute right-0 bottom-0 size-24 bg-brand-blue/5 rounded-full blur-xl" aria-hidden="true" />
          <Sparkles className="mx-auto text-brand-blue" size={24} />
          <h3 className="mt-4 text-xl font-black text-ink">
            {isEn ? "Need custom product advice?" : "¿Necesitas asesoría de producto?"}
          </h3>
          <p className="mt-2 text-sm text-graphite max-w-xl mx-auto leading-6">
            {isEn
              ? "Let's review your application performance or CRM architecture together to design a viable optimization plan."
              : "Analicemos el rendimiento de tu aplicación o arquitectura de CRM para planificar una optimización viable."}
          </p>
          <Link
            href={getStaticPath("contact", locale)}
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-blue px-6 py-2.5 text-xs font-black text-white hover:brightness-110 active:scale-95 transition-all shadow-md"
          >
            {isEn ? "Request a technical review" : "Solicitar una revisión técnica"}
          </Link>
        </footer>
      </div>
    </article>
  );
}
