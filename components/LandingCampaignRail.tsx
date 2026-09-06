"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Megaphone, Sparkles } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import type { LandingAnnouncement } from "@/lib/types";

const accentClasses: Record<LandingAnnouncement["accent"], string> = {
  blue: "from-blue-600/20 via-blue-500/10 to-transparent border-blue-400/20",
  cyan: "from-cyan-500/20 via-cyan-400/10 to-transparent border-cyan-300/20",
  green: "from-emerald-500/20 via-emerald-400/10 to-transparent border-emerald-300/20",
  amber: "from-amber-500/20 via-amber-400/10 to-transparent border-amber-300/20",
};

function isExternalUrl(url: string) {
  return /^https?:\/\//i.test(url);
}

export function LandingCampaignRail({ items, es }: { items: LandingAnnouncement[]; es: boolean }) {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [liveItems, setLiveItems] = useState(() => items.filter((item) => item.placement === "rail"));
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    supabase
      .from("landing_announcements")
      .select("*")
      .eq("is_enabled", true)
      .eq("placement", "rail")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (!active || !data) return;
        setLiveItems(data as LandingAnnouncement[]);
      });
    return () => { active = false; };
  }, [supabase]);

  useEffect(() => {
    if (liveItems.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % liveItems.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [liveItems.length]);

  if (liveItems.length === 0) return null;

  const safeIndex = Math.min(activeIndex, liveItems.length - 1);
  const item = liveItems[safeIndex] ?? liveItems[0];
  const title = es ? item.title : item.title_en || item.title;
  const body = es ? item.body : item.body_en || item.body;
  const eyebrow = es ? item.eyebrow : item.eyebrow_en || item.eyebrow;
  const ctaLabel = es ? item.cta_label : item.cta_label_en || item.cta_label;
  const imageUrl = item.image_url;
  const canRenderImage = Boolean(imageUrl && (imageUrl.startsWith("/") || isExternalUrl(imageUrl)));

  return (
    <section className="border-b border-line bg-[#07101f] py-4 text-white" aria-label={es ? "Anuncios y novedades" : "Announcements and updates"}>
      <div className="container">
        <div className={`relative overflow-hidden rounded-2xl border bg-gradient-to-r ${accentClasses[item.accent]} p-4 sm:p-5`}>
          <div className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-cyan-200">
                {item.kind === "ad" ? <Sparkles size={17} /> : <Megaphone size={17} />}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-[.2em] text-slate-300">
                  <span>{item.kind === "ad" ? (es ? "Promoción" : "Promotion") : (eyebrow || (es ? "Novedad" : "Update"))}</span>
                  {item.kind === "ad" ? <span className="rounded-full border border-white/15 px-2 py-0.5 tracking-[.12em] text-white/70">{es ? "Anuncio" : "Ad"}</span> : null}
                </div>
                <h2 className="mt-1 text-base font-black tracking-tight text-white sm:text-lg">{title}</h2>
                <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-300">{body}</p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3 pl-12 sm:pl-0">
              {canRenderImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt="" loading="lazy" className="hidden size-12 rounded-xl border border-white/15 object-cover sm:block" />
              ) : null}
              {ctaLabel && item.cta_url ? (
                <a
                  href={item.cta_url}
                  target={isExternalUrl(item.cta_url) ? "_blank" : undefined}
                  rel={isExternalUrl(item.cta_url) ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-50"
                >
                  {ctaLabel}
                  <ArrowUpRight size={14} />
                </a>
              ) : null}
            </div>
          </div>

          {liveItems.length > 1 ? (
            <div className="relative mt-4 flex items-center justify-between gap-4 border-t border-white/10 pt-3">
              <span className="text-[10px] font-bold text-slate-400">{safeIndex + 1} / {liveItems.length}</span>
              <div className="flex items-center gap-1.5" role="tablist" aria-label={es ? "Seleccionar anuncio" : "Select announcement"}>
                {liveItems.map((entry, index) => (
                  <button
                    key={entry.id}
                    type="button"
                    role="tab"
                    aria-selected={safeIndex === index}
                    aria-label={`${es ? "Mostrar" : "Show"} ${index + 1}`}
                    onClick={() => setActiveIndex(index)}
                    className={`h-1.5 rounded-full transition-all ${safeIndex === index ? "w-7 bg-cyan-300" : "w-1.5 bg-white/30 hover:bg-white/60"}`}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
