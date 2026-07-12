"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { siteConfig } from "@/lib/site";
import { useLocale } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";

type FormState = "idle" | "sending" | "sent" | "error";

function sanitize(str: string): string {
  return str.replace(/[<>]/g, "").trim();
}

export function ContactForm() {
  const { t, locale } = useLocale();
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackEvent("contact_form_start", { locale });

    const formData = new FormData(event.currentTarget);
    
    // 1. Honeypot check
    const honeypot = String(formData.get("website_verify") || "");
    if (honeypot) {
      // Silently discard spam submission and simulate success
      setState("sent");
      setMessage(t("contact.form.success"));
      event.currentTarget.reset();
      return;
    }

    // 2. Input sanitization
    const name = sanitize(String(formData.get("name") || ""));
    const email = sanitize(String(formData.get("email") || ""));
    const topic = sanitize(String(formData.get("topic") || ""));
    const messageContent = sanitize(String(formData.get("message") || ""));

    // 3. Validation
    if (name.length < 2) {
      setMessage(locale === "es" ? "El nombre debe tener al menos 2 caracteres." : "Name must be at least 2 characters long.");
      setState("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage(locale === "es" ? "Por favor, introduce un correo electrónico válido." : "Please enter a valid email address.");
      setState("error");
      return;
    }

    if (messageContent.length < 10) {
      setMessage(locale === "es" ? "El mensaje debe tener al menos 10 caracteres." : "Message must be at least 10 characters long.");
      setState("error");
      return;
    }

    // 4. Rate Limiting check (30 seconds)
    if (typeof window !== "undefined") {
      const lastSubmit = localStorage.getItem("romerodev_last_submit");
      const now = Date.now();
      if (lastSubmit && now - Number(lastSubmit) < 30000) {
        setMessage(locale === "es" ? "Espera 30 segundos antes de realizar otro envío." : "Please wait 30 seconds before submitting again.");
        setState("error");
        return;
      }
    }

    setState("sending");

    const payload = {
      name,
      email,
      topic,
      message: messageContent
    };

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      // Fallback email client
      window.location.href = `mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent(
        payload.topic || "Consulta RomeroDev"
      )}&body=${encodeURIComponent(`${payload.name} (${payload.email})\n\n${payload.message}`)}`;
      
      setState("sent");
      trackEvent("contact_form_submit", { method: "mailto", locale });
      return;
    }

    const { error } = await supabase.from("contact_messages").insert(payload);
    if (error) {
      setMessage(locale === "es" ? "Ocurrió un error al enviar el mensaje. Inténtalo de nuevo." : "An error occurred sending the message. Please try again.");
      setState("error");
      return;
    }

    // Record submission timestamp for rate limiting
    if (typeof window !== "undefined") {
      localStorage.setItem("romerodev_last_submit", String(Date.now()));
    }

    event.currentTarget.reset();
    setMessage(t("contact.form.success"));
    setState("sent");
    trackEvent("contact_form_submit", { method: "supabase", locale });
  }

  return (
    <form className="grid gap-5 rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 lg:p-8 shadow-soft relative overflow-hidden" onSubmit={onSubmit} aria-describedby="contact-form-expectation">
      {/* Honeypot field (hidden from real users) */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="website_verify"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Subtle background highlight */}
      <div className="absolute -right-20 -bottom-20 size-[250px] rounded-full bg-[var(--color-brand-blue)]/5 blur-2xl pointer-events-none" />

      <div className="relative rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] p-4">
        <p className="text-sm font-bold text-[var(--color-ink)]">
          {locale === "es" ? "Qué ocurrirá después" : "What happens next"}
        </p>
        <p id="contact-form-expectation" className="mt-1 text-xs leading-5 text-[var(--color-graphite)]">
          {locale === "es"
            ? "Revisaré personalmente tu consulta y responderé en 1–2 días laborables con preguntas, riesgos iniciales y un siguiente paso concreto."
            : "I will personally review your enquiry and reply within 1–2 working days with questions, early risks and a concrete next step."}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-graphite)]">
          {t("contact.form.name")}
          <input
            className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3 text-sm font-normal text-[var(--color-ink)] placeholder-[var(--color-graphite)] focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-1 focus:ring-[var(--color-brand-blue)]/30 transition-all duration-200"
            name="name"
            placeholder={t("contact.form.name.placeholder")}
            required
            type="text"
            maxLength={100}
          />
        </label>
        <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-graphite)]">
          {t("contact.form.email")}
          <input
            className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3 text-sm font-normal text-[var(--color-ink)] placeholder-[var(--color-graphite)] focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-1 focus:ring-[var(--color-brand-blue)]/30 transition-all duration-200"
            name="email"
            placeholder={t("contact.form.email.placeholder")}
            required
            type="email"
            maxLength={100}
          />
        </label>
      </div>
      
      <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-graphite)]">
        {t("contact.form.topic")}
        <select
          className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3 text-sm font-normal text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-1 focus:ring-[var(--color-brand-blue)]/30 transition-all duration-200 cursor-pointer"
          name="topic"
        >
          {locale === "es" ? (
            <>
              <option value="Desarrollo iOS">Desarrollo iOS</option>
              <option value="Salesforce">Salesforce</option>
              <option value="Auditoría técnica">Auditoría técnica</option>
              <option value="Diseño de producto">Diseño de producto</option>
              <option value="Integración">Integración</option>
              <option value="Colaboración profesional">Colaboración profesional</option>
              <option value="Otro">Otro</option>
            </>
          ) : (
            <>
              <option value="iOS Development">iOS Development</option>
              <option value="Salesforce">Salesforce</option>
              <option value="Technical Audit">Technical Audit</option>
              <option value="Product Design">Product Design</option>
              <option value="Integration">Integration</option>
              <option value="Professional Collaboration">Professional Collaboration</option>
              <option value="Other">Other</option>
            </>
          )}
        </select>
      </label>

      <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-graphite)]">
        {t("contact.form.message")}
        <textarea
          className="min-h-36 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3 text-sm font-normal leading-6 text-[var(--color-ink)] placeholder-[var(--color-graphite)] focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-1 focus:ring-[var(--color-brand-blue)]/30 transition-all duration-200"
          name="message"
          placeholder={t("contact.form.message.placeholder")}
          required
          maxLength={2000}
        />
      </label>

      <button
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#2444ad] px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#19358f] active:scale-[0.98] transition-all disabled:cursor-not-allowed disabled:opacity-60"
        disabled={state === "sending"}
        type="submit"
      >
        <Send aria-hidden="true" size={16} />
        {state === "sending" ? t("contact.form.sending") : (locale === "es" ? "Enviar consulta para revisión" : "Send enquiry for review")}
      </button>

      <p className="relative text-xs leading-5 text-[var(--color-graphite)]">
        {locale === "es"
          ? "Usaré estos datos únicamente para responder a tu consulta. No se añaden a listas comerciales."
          : "I will use these details only to answer your enquiry. They are not added to marketing lists."}
      </p>

      {message ? (
        <div aria-live="polite" role={state === "error" ? "alert" : "status"} className={`mt-2 p-3 rounded-lg border text-xs font-medium ${
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
