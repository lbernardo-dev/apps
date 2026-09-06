"use client";

import Image from "next/image";
import { Film, Images } from "lucide-react";
import { getAssetPath } from "@/lib/site";
import { useLocale } from "@/lib/i18n";
import type { AppItem } from "@/lib/types";

function localizePath(path: string, locale: "es" | "en") {
  return path.replace(/_(es|en)(\.(?:png|jpe?g|webp|svg))$/i, `_${locale}$2`);
}

export function AppMediaShowcase({ app }: { app: AppItem }) {
  const { locale } = useLocale();
  const media = (app.media ?? [])
    .filter((item) => item.kind !== "icon" && (!item.locale || item.locale === locale))
    .slice(0, 8);
  const video = app.videoUrl ?? app.media?.find((item) => item.kind === "video")?.path;
  if (media.length === 0 && !video) return null;

  return (
    <section className="section border-b border-line bg-themed-white">
      <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.25em] text-brand-blue">
            <Images size={14} />
            {locale === "es" ? "Material del producto" : "Product media"}
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
            {locale === "es" ? "Mira cómo es por dentro" : "See the product in context"}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-graphite">
            {locale === "es"
              ? "Iconos, imágenes y vídeo proceden del registro del producto y se actualizan junto con su ficha."
              : "Icons, images, and video come from the product record and update with its catalog entry."}
          </p>
          {video ? (
            <div className="mt-8 overflow-hidden rounded-3xl border border-line bg-slate-950 shadow-soft">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-xs font-bold text-white/70">
                <Film size={14} /> {locale === "es" ? "Vista previa" : "Preview"}
              </div>
              <video className="aspect-video w-full object-cover" controls playsInline preload="metadata" poster={app.coverImageUrl ? getAssetPath(localizePath(app.coverImageUrl, locale)) : undefined}>
                <source src={getAssetPath(video)} type="video/mp4" />
              </video>
            </div>
          ) : null}
        </div>

        {media.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {media.map((item) => (
              <figure key={`${item.kind}-${item.path}`} className="overflow-hidden rounded-3xl border border-line bg-themed-card shadow-soft">
                <div className="relative aspect-[4/3] bg-themed-mist">
                  <Image src={getAssetPath(localizePath(item.path, locale))} alt={locale === "es" ? item.alt : item.alt_en ?? item.alt} fill unoptimized className="object-cover" />
                </div>
                <figcaption className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-graphite">{item.kind}</figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
