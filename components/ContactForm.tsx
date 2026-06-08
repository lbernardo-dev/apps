"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { siteConfig } from "@/lib/site";
import { useLocale } from "@/lib/i18n";

type FormState = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const { t } = useLocale();
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      topic: String(formData.get("topic") || ""),
      message: String(formData.get("message") || "")
    };

    if (!payload.name || !payload.email || !payload.message) {
      setMessage(t("contact.form.error"));
      setState("error");
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      window.location.href = `mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent(
        payload.topic || "Consulta desde LB Apps"
      )}&body=${encodeURIComponent(`${payload.name} (${payload.email})\n\n${payload.message}`)}`;
      setState("sent");
      return;
    }

    const { error } = await supabase.from("contact_messages").insert(payload);
    if (error) {
      setMessage(error.message);
      setState("error");
      return;
    }

    event.currentTarget.reset();
    setMessage(t("contact.form.success"));
    setState("sent");
  }

  return (
    <form className="grid gap-5 rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 lg:p-8 shadow-soft relative overflow-hidden" onSubmit={onSubmit}>
      {/* Subtle background highlight */}
      <div className="absolute -right-20 -bottom-20 size-[250px] rounded-full bg-[var(--color-brand-blue)]/5 blur-2xl pointer-events-none" />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-graphite)]">
          {t("contact.form.name")}
          <input
            className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3 text-sm font-normal text-[var(--color-ink)] placeholder-[var(--color-graphite)] focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-1 focus:ring-[var(--color-brand-blue)]/30 transition-all duration-200"
            name="name"
            placeholder={t("contact.form.name.placeholder")}
            required
            type="text"
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
          />
        </label>
      </div>
      
      <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-graphite)]">
        {t("contact.form.topic")}
        <input
          className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3 text-sm font-normal text-[var(--color-ink)] placeholder-[var(--color-graphite)] focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-1 focus:ring-[var(--color-brand-blue)]/30 transition-all duration-200"
          name="topic"
          placeholder={t("contact.form.topic.placeholder")}
          type="text"
        />
      </label>

      <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-graphite)]">
        {t("contact.form.message")}
        <textarea
          className="min-h-36 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3 text-sm font-normal leading-6 text-[var(--color-ink)] placeholder-[var(--color-graphite)] focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-1 focus:ring-[var(--color-brand-blue)]/30 transition-all duration-200"
          name="message"
          placeholder={t("contact.form.message.placeholder")}
          required
        />
      </label>

      <button
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-brand-blue)] px-6 py-3.5 text-sm font-bold text-white shadow-md hover:brightness-110 active:scale-[0.98] transition-all disabled:cursor-not-allowed disabled:opacity-60"
        disabled={state === "sending"}
        type="submit"
      >
        <Send aria-hidden="true" size={16} />
        {state === "sending" ? t("contact.form.sending") : t("contact.form.submit")}
      </button>

      {message ? (
        <div className={`mt-2 p-3 rounded-lg border text-xs font-medium ${
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
