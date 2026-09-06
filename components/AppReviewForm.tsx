"use client";

import { useState } from "react";
import { MessageSquare, Star } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { siteConfig } from "@/lib/site";
import { useLocale } from "@/lib/i18n";
import type { AppItem } from "@/lib/types";

type FormState = "idle" | "sending" | "sent" | "error";

function clean(value: string): string {
  return value.replace(/[<>]/g, "").trim();
}

export function AppReviewForm({ app }: { app: AppItem }) {
  const { locale } = useLocale();
  const isEs = locale === "es";
  const [state, setState] = useState<FormState>("idle");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("website_verify") || "")) {
      setState("sent");
      setMessage(isEs ? "Gracias. Tu reseña se ha enviado." : "Thanks. Your review was submitted.");
      return;
    }

    const displayName = clean(String(data.get("display_name") || ""));
    const email = clean(String(data.get("email") || ""));
    const title = clean(String(data.get("title") || ""));
    const content = clean(String(data.get("content") || ""));
    const consent = data.get("consent") === "on";
    if (displayName.length < 1 || displayName.length > 80 || content.length < 10 || content.length > 2000 || !consent) {
      setState("error");
      setMessage(isEs ? "Completa el nombre, una reseña de al menos 10 caracteres y el consentimiento." : "Add your name, a review of at least 10 characters, and consent.");
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      setMessage(isEs ? "Introduce un correo válido." : "Enter a valid email address.");
      return;
    }

    const key = `romerodev_review_submit_${app.slug}`;
    const lastSubmit = typeof window !== "undefined" ? localStorage.getItem(key) : null;
    if (lastSubmit && Date.now() - Number(lastSubmit) < 60000) {
      setState("error");
      setMessage(isEs ? "Espera un minuto antes de enviar otra reseña." : "Please wait one minute before submitting another review.");
      return;
    }

    setState("sending");
    const supabase = getSupabaseBrowserClient();
    const payload = {
      app_slug: app.slug,
      display_name: displayName,
      email: email || null,
      rating,
      title,
      content,
      locale,
      consent,
      source: "web",
      status: "pending"
    };

    if (!supabase) {
      window.location.href = `mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent(`${isEs ? "Reseña de" : "Review for"} ${app.name}`)}&body=${encodeURIComponent(`${displayName} (${rating}/5)\n${title}\n\n${content}`)}`;
      setState("sent");
      setMessage(isEs ? "Se ha preparado el envío por correo." : "Your review email has been prepared.");
      return;
    }

    const { error } = await supabase.from("app_review_submissions").insert(payload);
    if (error) {
      setState("error");
      setMessage(isEs ? "No se pudo enviar la reseña. Inténtalo de nuevo." : "We couldn't submit the review. Please try again.");
      return;
    }

    localStorage.setItem(key, String(Date.now()));
    form.reset();
    setRating(5);
    setState("sent");
    setMessage(isEs ? "Gracias. Tu reseña queda pendiente de revisión." : "Thanks. Your review is pending moderation.");
  }

  const inputClasses = "rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder-[var(--color-graphite)] focus:border-[var(--color-brand-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-blue)]/30";

  return (
    <form onSubmit={submit} className="mt-8 grid gap-5 rounded-3xl border border-line bg-themed-card p-6 shadow-sm sm:p-8" aria-describedby="app-review-expectation">
      <div className="hidden" aria-hidden="true"><input type="text" name="website_verify" tabIndex={-1} autoComplete="off" /></div>
      <div>
        <span className="text-xs font-black uppercase tracking-[.28em] text-brand-blue">{isEs ? "Comparte tu experiencia" : "Share your experience"}</span>
        <h3 className="mt-2 text-2xl font-black tracking-tight text-ink">{isEs ? `Escribe una reseña de ${app.name}` : `Write a review of ${app.name}`}</h3>
        <p id="app-review-expectation" className="mt-2 text-sm leading-6 text-graphite">{isEs ? "Las reseñas se revisan antes de publicarse. No compartiremos tu correo." : "Reviews are checked before publication. Your email will not be shared."}</p>
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-graphite">{isEs ? "Valoración" : "Rating"}</span>
        <div className="mt-2 flex items-center gap-1" role="radiogroup" aria-label={isEs ? "Valoración" : "Rating"}>
          {Array.from({ length: 5 }).map((_, index) => {
            const value = index + 1;
            return <button key={value} type="button" role="radio" aria-checked={rating === value} aria-label={`${value} ${isEs ? "estrellas" : "stars"}`} onMouseEnter={() => setHoverRating(value)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(value)} className="p-0.5"><Star size={26} className={(hoverRating || rating) >= value ? "fill-amber-400 text-amber-400" : "text-graphite/30"} /></button>;
          })}
          <span className="ml-2 text-sm font-bold text-graphite">{rating}/5</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-graphite">{isEs ? "Nombre visible" : "Display name"}<input className={inputClasses} name="display_name" maxLength={80} required placeholder={isEs ? "Tu nombre" : "Your name"} /></label>
        <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-graphite">{isEs ? "Título (opcional)" : "Title (optional)"}<input className={inputClasses} name="title" maxLength={120} placeholder={isEs ? "Muy útil" : "Really useful"} /></label>
      </div>
      <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-graphite">{isEs ? "Tu reseña" : "Your review"}<textarea className={`${inputClasses} min-h-32`} name="content" maxLength={2000} minLength={10} required placeholder={isEs ? "¿Qué te ha parecido?" : "What did you think?"} /></label>
      <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-graphite">{isEs ? "Correo (opcional)" : "Email (optional)"}<input className={inputClasses} type="email" name="email" maxLength={160} placeholder="you@example.com" /></label>
      <label className="flex items-start gap-3 text-sm leading-6 text-graphite"><input className="mt-1 accent-[var(--color-brand-blue)]" type="checkbox" name="consent" required />{isEs ? "Acepto que esta reseña pueda publicarse después de su revisión." : "I agree that this review may be published after moderation."}</label>
      <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#2444ad] px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#19358f] disabled:cursor-not-allowed disabled:opacity-60" disabled={state === "sending"} type="submit"><MessageSquare size={16} aria-hidden="true" />{state === "sending" ? (isEs ? "Enviando…" : "Sending…") : (isEs ? "Enviar reseña" : "Submit review")}</button>
      {message ? <div aria-live="polite" role={state === "error" ? "alert" : "status"} className={`rounded-lg border p-3 text-sm font-medium ${state === "error" ? "border-red-500/20 bg-red-500/10 text-red-500" : "border-green-500/20 bg-green-500/10 text-green-600"}`}>{message}</div> : null}
    </form>
  );
}
