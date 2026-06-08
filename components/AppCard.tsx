import Link from "next/link";
import { ArrowUpRight, Star, ArrowRight } from "lucide-react";
import type { AppItem } from "@/lib/types";
import { ButtonLink } from "@/components/ButtonLink";
import { AppStoreBadge } from "@/components/AppStoreBadge";

export function AppCard({ app }: { app: AppItem }) {
  const isPublished = app.status === "published";
  const isComingSoon = app.status === "coming_soon";

  // Generate a mock initial for the icon
  const appInitial = app.name.slice(0, 1).toUpperCase();

  // Custom tone background gradients
  const iconGradients: Record<string, string> = {
    focusflow: "from-blue-600 to-indigo-500",
    receiptkit: "from-emerald-500 to-teal-400",
    moneto: "from-cyan-500 to-blue-500",
    nutri: "from-teal-500 to-green-400",
    focus: "from-sky-500 to-indigo-600",
    vitalspath: "from-sky-500 to-teal-500"
  };

  const gradientClass = iconGradients[app.slug] || "from-brand-blue to-brand-cyan";

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-soft hover:shadow-[0_30px_60px_rgba(15,23,42,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
      {/* Visual Stripe indicator */}
      <span className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${app.slug === "receiptkit" ? "from-emerald-400 to-teal-500" : "from-blue-400 to-indigo-500"}`} />

      <div className="flex flex-1 gap-5 items-start">
        {/* App Squircle Icon */}
        <div className={`relative flex size-20 shrink-0 items-center justify-center bg-gradient-to-tr ${gradientClass} text-white text-3xl font-black shadow-lg apple-squircle transition-transform duration-300 group-hover:scale-105`}>
          {app.slug === "vitalspath" ? (
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/images/vitalspath/AppIcon_v2.png`}
              alt={app.name}
              className="absolute inset-0 w-full h-full object-cover rounded-[1.2rem]"
            />
          ) : (
            appInitial
          )}
          {/* Subtle reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-bold tracking-tight text-ink group-hover:text-brand-blue transition-colors truncate">
              {app.name}
            </h2>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase ${
              isPublished 
                ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                : isComingSoon 
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
                : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
            }`}>
              {isPublished ? "Publicada" : isComingSoon ? "Próximamente" : "Borrador"}
            </span>
          </div>

          <p className="mt-1 text-xs font-semibold text-brand-blue">{app.category}</p>
          <p className="mt-3 text-sm leading-6 text-graphite max-w-2xl">{app.shortDescription}</p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-graphite">
            <span className="flex items-center gap-1 text-amber-400">
              <Star aria-hidden="true" size={13} fill="currentColor" />
              <span className="font-bold text-ink">4.9</span>
            </span>
            <span className="text-slate-700">•</span>
            <div className="flex gap-1.5">
              {app.platform.map((platform) => (
                <span className="rounded bg-slate-800 px-2 py-0.5 font-medium text-slate-300" key={platform}>
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t border-slate-100/5 md:border-t-0 justify-end items-center">
        <ButtonLink 
          href={`/apps/${app.slug}`} 
          variant="secondary"
          className="flex-1 md:flex-initial text-xs py-2 px-4 w-full text-center"
        >
          Ver detalles
        </ButtonLink>
        {isPublished && app.appStoreUrl && (
          <a
            href={app.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-initial inline-flex items-center justify-center transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97]"
          >
            <AppStoreBadge className="h-[36px]" />
          </a>
        )}
      </div>
    </article>
  );
}

