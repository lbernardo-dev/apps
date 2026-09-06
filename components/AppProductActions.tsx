"use client";

import { useState } from "react";
import { BellRing, Check, ExternalLink, FlaskConical, Mail, Store } from "lucide-react";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { getAppLink, getAppStatusMeta } from "@/lib/app-catalog";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { siteConfig } from "@/lib/site";
import { useLocale } from "@/lib/i18n";
import type { AppItem } from "@/lib/types";

export function AppProductActions({ app }: { app: AppItem }) {
  const { locale } = useLocale();
  const isEs = locale === "es";
  const status = getAppStatusMeta(app.status, locale);
  const appStore = getAppLink(app, "appstore");
  const testflight = getAppLink(app, "testflight");
  const download = getAppLink(app, "download");
  const primary = app.status === "published" ? appStore ?? download : app.status === "testing" ? testflight ?? download : undefined;
  const secondaryUrl = app.secondaryCtaUrl ?? app.primaryCtaUrl;
  const secondaryLabel = app.secondaryCtaLabel ?? app.primaryCtaLabel;
  const secondaryLabelEn = app.secondaryCtaLabel_en ?? app.primaryCtaLabel_en;
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function follow(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      setState("error");
      return;
    }
    setState("saving");
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      window.location.href = `mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent(`${isEs ? "Seguir" : "Follow"} ${app.name}`)}&body=${encodeURIComponent(normalized)}`;
      setState("saved");
      return;
    }
    const { error } = await supabase.from("app_followers").upsert(
      { app_slug: app.slug, email: normalized, locale },
      { onConflict: "app_slug,email" }
    );
    setState(error ? "error" : "saved");
    if (!error) setEmail("");
  }

  const buttonClass = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition hover:-translate-y-0.5 active:translate-y-0";

  return (
    <div className="mt-6 grid gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold ${status.className}`}>
          <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
          {status.label}
        </span>
        <span className="text-sm text-white/60">{status.description}</span>
      </div>

      <div className="flex flex-wrap gap-3">
        {primary ? (
          primary.kind === "appstore" ? (
            <a href={primary.url} target="_blank" rel="noopener noreferrer" className="transition hover:scale-[1.03]" aria-label={isEs ? "Descargar en el App Store" : "Download on the App Store"}>
              <AppStoreBadge className="h-[48px]" appSlug={app.slug} lang={locale} />
            </a>
          ) : (
            <a href={primary.url} target={primary.isExternal === false ? undefined : "_blank"} rel={primary.isExternal === false ? undefined : "noopener noreferrer"} className={`${buttonClass} bg-white text-slate-950`}>
              {app.status === "testing" ? <FlaskConical size={16} /> : <Store size={16} />}
              {isEs ? primary.label : primary.label_en ?? primary.label}
              <ExternalLink size={14} />
            </a>
          )
        ) : null}
        <a href={secondaryUrl} className={`${buttonClass} border border-white/20 bg-white/10 text-white hover:bg-white/15`}>
          <Mail size={16} />
          {isEs ? secondaryLabel : secondaryLabelEn ?? secondaryLabel}
        </a>
      </div>

      {app.followEnabled !== false ? (
        <form onSubmit={follow} className="grid max-w-xl gap-3 rounded-2xl border border-white/10 bg-white/[.06] p-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-white/60">
            {isEs ? "Recibir novedades" : "Get product updates"}
            <input
              type="email"
              value={email}
              onChange={(event) => { setEmail(event.target.value); setState("idle"); }}
              placeholder={isEs ? "tu@email.com" : "you@example.com"}
              className="min-h-11 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm font-normal text-white outline-none placeholder:text-white/35 focus:border-white/35"
              required
            />
          </label>
          <button type="submit" disabled={state === "saving"} className={`${buttonClass} bg-[var(--color-brand-blue)] text-white disabled:opacity-60`}>
            {state === "saved" ? <Check size={16} /> : <BellRing size={16} />}
            {state === "saved" ? (isEs ? "Registrado" : "Following") : (isEs ? "Seguir" : "Follow")}
          </button>
          {state === "error" ? <p className="text-xs font-semibold text-rose-300 sm:col-span-2">{isEs ? "Introduce un correo válido." : "Enter a valid email address."}</p> : null}
        </form>
      ) : null}
    </div>
  );
}
