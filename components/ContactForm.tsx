"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { siteConfig } from "@/lib/site";

type FormState = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
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
      setMessage("Completa nombre, email y mensaje.");
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
    setMessage("Mensaje enviado. Te respondere lo antes posible.");
    setState("sent");
  }

  return (
    <form className="grid gap-5 rounded-2xl border border-line bg-card p-6 lg:p-8 shadow-soft relative overflow-hidden" onSubmit={onSubmit}>
      {/* Subtle background highlight */}
      <div className="absolute -right-20 -bottom-20 size-[250px] rounded-full bg-brand-blue/5 blur-2xl pointer-events-none" />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-graphite">
          Nombre
          <input
            className="rounded-lg border border-line bg-slate-900/40 px-4 py-3 text-sm font-normal text-ink placeholder-slate-600 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-all duration-200"
            name="name"
            placeholder="Tu nombre completo"
            required
            type="text"
          />
        </label>
        <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-graphite">
          Email
          <input
            className="rounded-lg border border-line bg-slate-900/40 px-4 py-3 text-sm font-normal text-ink placeholder-slate-600 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-all duration-200"
            name="email"
            placeholder="correo@ejemplo.com"
            required
            type="email"
          />
        </label>
      </div>
      
      <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-graphite">
        Tema de consulta
        <input
          className="rounded-lg border border-line bg-slate-900/40 px-4 py-3 text-sm font-normal text-ink placeholder-slate-600 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-all duration-200"
          name="topic"
          placeholder="Ej: Desarrollo App iOS, Consultoría Salesforce"
          type="text"
        />
      </label>

      <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-graphite">
        Mensaje
        <textarea
          className="min-h-36 rounded-lg border border-line bg-slate-900/40 px-4 py-3 text-sm font-normal leading-6 text-ink placeholder-slate-600 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-all duration-200"
          name="message"
          placeholder="Describe tu idea, requerimientos o plazos..."
          required
        />
      </label>

      <button
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-blue px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-blue-600 active:scale-[0.98] transition-all disabled:cursor-not-allowed disabled:opacity-60"
        disabled={state === "sending"}
        type="submit"
      >
        <Send aria-hidden="true" size={16} />
        {state === "sending" ? "Enviando mensaje..." : "Enviar consulta"}
      </button>

      {message ? (
        <div className={`mt-2 p-3 rounded-lg border text-xs font-medium ${
          state === "error" 
            ? "bg-red-500/10 text-red-400 border-red-500/20" 
            : "bg-green-500/10 text-green-400 border-green-500/20"
        }`}>
          {message}
        </div>
      ) : null}
    </form>
  );
}

