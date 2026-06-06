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
    <form className="grid gap-4 rounded-lg border border-line bg-white p-6 shadow-sm" onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-ink">
          Nombre
          <input
            className="rounded-md border border-line px-3 py-3 text-sm font-normal text-ink"
            name="name"
            required
            type="text"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-ink">
          Email
          <input
            className="rounded-md border border-line px-3 py-3 text-sm font-normal text-ink"
            name="email"
            required
            type="email"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-ink">
        Tema
        <input
          className="rounded-md border border-line px-3 py-3 text-sm font-normal text-ink"
          name="topic"
          type="text"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-ink">
        Mensaje
        <textarea
          className="min-h-36 rounded-md border border-line px-3 py-3 text-sm font-normal leading-6 text-ink"
          name="message"
          required
        />
      </label>
      <button
        className="inline-flex items-center justify-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={state === "sending"}
        type="submit"
      >
        <Send aria-hidden="true" size={16} />
        {state === "sending" ? "Enviando" : "Enviar consulta"}
      </button>
      {message ? (
        <p className={state === "error" ? "text-sm text-red-700" : "text-sm text-graphite"}>{message}</p>
      ) : null}
    </form>
  );
}
