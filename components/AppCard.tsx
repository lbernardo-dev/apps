"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Clock3, Star } from "lucide-react";
import { AppIcon } from "@/components/AppIcon";
import type { AppItem } from "@/lib/types";
import { useLocale } from "@/lib/i18n";
import { getAssetPath } from "@/lib/site";

export function AppCard({ app }: { app: AppItem }) {
  const { locale } = useLocale();
  const isPublished = app.status === "published";
  const cover = app.coverImageUrl ? getAssetPath(app.coverImageUrl) : undefined;

  return (
    <article className="group relative flex min-h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-themed-card shadow-card transition duration-500 hover:-translate-y-1.5 hover:shadow-soft">
      <Link href={`/apps/${app.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-themed-mist">
        {cover ? <Image src={cover} alt={`Vista de ${app.name}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" /> : null}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/5 to-transparent" />
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <AppIcon app={app} size={64} className="border border-white/30 shadow-xl" />
            <div>
              <h2 className="text-2xl font-black tracking-tight text-white">{app.name}</h2>
              <p className="text-xs font-bold text-white/70">{app.category}</p>
            </div>
          </div>
          <span className="flex size-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition group-hover:bg-white group-hover:text-slate-950"><ArrowUpRight size={18} /></span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${isPublished ? "bg-brand-green/10 text-brand-green" : "bg-brand-blue/10 text-brand-blue"}`}>
            {isPublished ? <Check size={11} /> : <Clock3 size={11} />}{isPublished ? (locale === "es" ? "Disponible" : "Available") : (locale === "es" ? "Próximamente" : "Coming soon")}
          </span>
          {app.averageRating && app.userRatingCount ? <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-3 py-1 text-[10px] font-black text-amber-500"><Star size={11} fill="currentColor" />{app.averageRating.toFixed(1)} · {app.userRatingCount}</span> : null}
        </div>
        <h3 className="mt-5 text-xl font-black leading-tight text-ink">{locale === "en" && app.tagline_en ? app.tagline_en : app.tagline}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-graphite">{locale === "en" && app.shortDescription_en ? app.shortDescription_en : app.shortDescription}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-6">{app.platform.map(platform => <span className="rounded-lg border border-line bg-themed-mist px-2.5 py-1 text-[10px] font-bold text-graphite" key={platform}>{platform}</span>)}</div>
      </div>
    </article>
  );
}
