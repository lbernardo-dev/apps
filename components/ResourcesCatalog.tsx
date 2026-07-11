"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Clock, Search } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { resourcesData } from "@/lib/resources-content";
import { getResourcePath } from "@/lib/routes";

export function ResourcesCatalog() {
  const { locale } = useLocale();
  const isEn = locale === "en";
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = resourcesData.filter((art) => {
    const title = isEn ? art.title_en : art.title;
    const excerpt = isEn ? art.excerpt_en : art.excerpt;
    const text = `${title} ${excerpt}`.toLowerCase();
    return text.includes(searchQuery.toLowerCase());
  });

  return (
    <section className="relative overflow-hidden bg-themed-white pb-24 pt-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-40" aria-hidden="true" />
      <div className="glow-orb -top-32 left-1/4 size-[400px] bg-brand-blue/5" aria-hidden="true" />
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="grid items-end gap-8 border-b border-line pb-12 lg:grid-cols-[1fr_auto]">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-blue">
              {isEn ? "RomeroDev Knowledge Lab" : "Laboratorio de Conocimiento"}
            </span>
            <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-[-0.045em] text-ink sm:text-7xl">
              {isEn ? "Resources & Guides" : "Recursos y Guías"}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite">
              {isEn 
                ? "Technical perspectives, checklists, and guides on software design, mobile performance, and CRM governance."
                : "Perspectivas técnicas, checklists y guías sobre desarrollo de software, rendimiento móvil y CRM."}
            </p>
          </div>
          
          {/* Search bar */}
          <div className="relative w-full max-w-xs">
            <span className="absolute inset-y-0 left-4 flex items-center text-graphite pointer-events-none">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder={isEn ? "Search articles..." : "Buscar artículos..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-line bg-themed-card text-sm text-ink focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition shadow-sm"
            />
          </div>
        </div>

        {/* Catalog Grid */}
        {filteredArticles.length > 0 ? (
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((art) => {
              const title = isEn ? art.title_en : art.title;
              const excerpt = isEn ? art.excerpt_en : art.excerpt;
              const readTime = isEn ? art.readTime_en : art.readTime;
              const path = getResourcePath(art.id, locale);

              return (
                <article 
                  key={art.id} 
                  className="group flex flex-col justify-between rounded-[2rem] border border-line bg-themed-card p-6 shadow-card hover:border-brand-blue/30 hover:-translate-y-1 transition duration-300"
                >
                  <div>
                    <div className="flex items-center gap-3 text-xs text-graphite mb-5">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {art.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-black text-ink leading-snug group-hover:text-brand-blue transition">
                      <Link href={path}>{title}</Link>
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-graphite">{excerpt}</p>
                  </div>

                  <div className="mt-8 pt-5 border-t border-line flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-black text-brand-blue group-hover:gap-2.5 transition-all">
                      <BookOpen size={14} />
                      {isEn ? "Read article" : "Leer artículo"}
                    </span>
                    <span className="flex size-8 items-center justify-center rounded-full bg-themed-mist text-ink group-hover:bg-brand-blue group-hover:text-white transition">
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-20 text-center py-16 rounded-3xl border border-dashed border-line bg-themed-mist/30">
            <p className="text-sm font-semibold text-graphite">
              {isEn ? "No articles found matching your search." : "No se encontraron artículos que coincidan con tu búsqueda."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
