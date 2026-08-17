"use client";

import { useState } from "react";
import { Star, ThumbsUp, Lightbulb, Bug, MessageSquare } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { siteConfig } from "@/lib/site";
import { useLocale } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";
import type { AppItem } from "@/lib/types";

type FormState = "idle" | "sending" | "sent" | "error";

type FeedbackKind = "opinion" | "suggestion" | "bug" | "other";

const KIND_OPTIONS: { kind: FeedbackKind; icon: typeof MessageSquare; labelEs: string; labelEn: string }[] = [
  { kind: "opinion", icon: MessageSquare, labelEs: "Opinión", labelEn: "Opinion" },
  { kind: "suggestion", icon: Lightbulb, labelEs: "Sugerencia", labelEn: "Suggestion" },
  { kind: "bug", icon: Bug, labelEs: "Incidente", labelEn: "Issue" },
  { kind: "other", icon: ThumbsUp, labelEs: "Otro", labelEn: "Other" }
];

function sanitize(str: string): string {
  return str.replace(/[<>]/g, "").trim();
}

export function AppFeedback({ app }: { app: AppItem }) {
  const { t, locale } = useLocale();
  const isEs = locale === "es";
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackEvent("app_feedback_start", { app: app.slug, locale });

    const formData = new FormData(event.currentTarget);

    // 1. Honeypot check
    const honeypot = String(formData.get("website_verify") || "");
    if (honeypot) {
      setState("sent");
      setMessage(isEs ? "Gracias, tu opinión ha quedado registrada." : "Thanks, your feedback has been recorded.");
      event.currentTarget.reset();
      return;
    }

    // 2. Input sanitization
    const kind = sanitize(String(formData.get("kind") || "opinion"));
    const email = sanitize(String(formData.get("email") || ""));
    const text = sanitize(String(formData.get("message") || ""));

    // 3. Validation
    if (text.length < 10) {
      setMessage(isEs ? "El mensaje debe tener al menos 10 caracteres." : "Your message must be at least 10 characters.");
      setState("error");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setMessage(isEs ? "Por favor, introduce un correo electrónico válido." : "Please enter a valid email address.");
      setState("error");
      return;
    }

    // 4. Rate limiting (30 seconds)
    if (typeof window !== "undefined") {
      const lastSubmit = localStorage.getItem("romerodev_feedback_submit");
      const now = Date.now();
      if (lastSubmit && now - Number(lastSubmit) < 30000) {
        setMessage(isEs ? "Espera 30 segundos antes de enviar otra aportación." : "Please wait 30 seconds before submitting again.");
        setState("error");
        return;
      }
    }

    setState("sending");

    const payload = {
      app_slug: app.slug,
      app_name: app.name,
      kind,
      rating,
      email: email || null,
      message: text,
      locale
    };

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      window.location.href = `mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent(
        `${isEs ? "Feedback para" : "Feedback for"} ${app.name} (${kind}, ${rating}★)`
      )}&body=${encodeURIComponent(`${email ? `Email: ${email}\n` : ""}${text}`)}`;
      setState("sent");
      trackEvent("app_feedback_submit", { app: app.slug, method: "mailto", kind, rating, locale });
      return;
    }

    const { error } = await supabase.from("app_feedback").insert(payload);
    if (error) {
      setMessage(isEs ? "Ocurrió un error al enviar tu aportación. Inténtalo de nuevo." : "We couldn't send your feedback. Please try again.");
      setState("error");
      return;
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("romerodev_feedback_submit", String(Date.now()));
    }

    event.currentTarget.reset();
    setRating(5);
    setMessage(isEs ? "¡Gracias! Tu opinión ayuda a mejorar la app." : "Thanks! Your feedback helps improve the app.");
    setState("sent");
    trackEvent("app_feedback_submit", { app: app.slug, method: "supabase", kind, rating, locale });
  }

  const inputClasses =
    "rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3 text-sm font-normal leading-6 text-[var(--color-ink)] placeholder-[var(--color-graphite)] focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-1 focus:ring-[var(--color-brand-blue)]/30 transition-all duration-200";

  return (
    <form
      className="mx-auto mt-12 grid max-w-3xl gap-5 rounded-3xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft relative overflow-hidden sm:p-10"
      onSubmit={onSubmit}
      aria-describedby="app-feedback-expectation"
    >
      {/* Honeypot (hidden from real users) */}
      <div className="hidden" aria-hidden="true">
        <input type="text" name="website_verify" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="absolute -right-20 -bottom-20 size-[250px] rounded-full bg-[var(--color-brand-blue)]/5 blur-2xl pointer-events-none" />

      <div className="relative">
        <span className="text-xs font-black uppercase tracking-[.28em] text-[var(--color-brand-blue)]">
          {isEs ? `Opina sobre ${app.name}` : `Share feedback on ${app.name}`}
        </span>
        <h3 className="mt-3 text-2xl font-black tracking-tight text-[var(--color-ink)]">
          {isEs ? "Tu opinión cuenta." : "Your opinion matters."}
        </h3>
        <p className="mt-2 text-sm leading-6 text-[var(--color-graphite)]">
          {isEs
            ? "Puedes valorar (1–5 estrellas), dejar tu opinión, sugerir una mejora o avisar de un problema. Se guarda directamente y se revisa en persona."
            : "Rate the app (1–5 stars), share your opinion, suggest an improvement, or report an issue. It's stored and reviewed personally."}
        </p>
      </div>

      {/* Star rating */}
      <div className="relative">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-graphite)]">
          {isEs ? "Tu valoración" : "Your rating"}
        </span>
        <div className="mt-2 flex items-center gap-1" role="radiogroup" aria-label={isEs ? "Valoración" : "Rating"}>
          {Array.from({ length: 5 }).map((_, i) => {
            const value = i + 1;
            const filled = value <= (hoverRating || rating);
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={rating === value}
                aria-label={`${value} ${isEs ? "estrellas" : "stars"}`}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(value)}
                className="p-0.5 transition-transform hover:scale-110"
              >
                <Star size={26} className={filled ? "fill-amber-400 text-amber-400" : "text-[var(--color-graphite)]/30"} />
              </button>
            );
          })}
          <span className="ml-2 text-sm font-bold text-[var(--color-graphite)]">{rating}/5</span>
        </div>
      </div>

      {/* Kind selector */}
      <div className="relative" role="group" aria-label={isEs ? "Tipo de aportación" : "Feedback type"}>
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-graphite)]">
          {isEs ? "¿Qué quieres aportar?" : "What do you want to share?"}
        </span>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {KIND_OPTIONS.map(({ kind, icon: Icon, labelEs, labelEn }) => (
            <label
              key={kind}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-xs font-bold text-[var(--color-graphite)] transition has-[:checked]:border-[var(--color-brand-blue)] has-[:checked]:bg-[var(--color-brand-blue)]/5 has-[:checked]:text-[var(--color-brand-blue)]"
            >
              <input type="radio" name="kind" value={kind} defaultChecked={kind === "opinion"} className="sr-only" />
              <Icon size={14} aria-hidden="true" />
              {isEs ? labelEs : labelEn}
            </label>
          ))}
        </div>
      </div>

      <label className="relative grid gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-graphite)]">
        {isEs ? "Tu aportación" : "Your message"}
        <textarea
          className={`${inputClasses} min-h-28`}
          name="message"
          placeholder={isEs ? "Cuéntanos qué te parece, qué mejorarías o qué problema viste…" : "Tell us what you think, what to improve, or what you ran into…"}
          required
          maxLength={1200}
        />
      </label>

      <label className="relative grid gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-graphite)]">
        {isEs ? "Correo (opcional)" : "Email (optional)"}
        <input
          className={inputClasses}
          type="email"
          name="email"
          placeholder={isEs ? "tucorreo@ejemplo.com" : "you@example.com"}
          maxLength={100}
        />
      </label>

      <p id="app-feedback-expectation" className="relative text-xs leading-5 text-[var(--color-graphite)]">
        {isEs
          ? "Puedes enviarlo anónimamente. Si dejas tu correo, solo se usará para responder si lo necesitas."
          : "You can send it anonymously. If you leave your email, it's only used to reply if needed."}
      </p>

      <button
        className="relative inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#2444ad] px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#19358f] active:scale-[0.98] transition-all disabled:cursor-not-allowed disabled:opacity-60"
        disabled={state === "sending"}
        type="submit"
      >
        <MessageSquare aria-hidden="true" size={16} />
        {state === "sending" ? (isEs ? "Enviando…" : "Sending…") : (isEs ? "Enviar opinión" : "Send feedback")}
      </button>

      {message ? (
        <div aria-live="polite" role={state === "error" ? "alert" : "status"} className={`relative mt-2 p-3 rounded-lg border text-xs font-medium ${
          state === "error"
            ? "bg-red-500/10 text-red-500 border-red-500/20"
            : "bg-green-500/10 text-green-500 border-green-500/20"
        }`}>
          {message}
        </div>
      ) : null}
    </form>
  );
}