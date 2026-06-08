"use client";

import { useEffect, useMemo, useState } from "react";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { CheckCircle2, Database, Lock, LogOut, Plus, ShieldAlert } from "lucide-react";
import { appFormSchema, type AppFormValues } from "@/lib/schema";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { useLocale } from "@/lib/i18n";

type AdminAppRow = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  short_description: string;
  status: string;
  featured: boolean;
  category: string;
  platform: string[];
  updated_at: string;
};

const defaultForm: AppFormValues = {
  slug: "",
  name: "",
  tagline: "",
  short_description: "",
  long_description: "",
  status: "draft",
  category: "",
  platform: "iOS",
  support_email: "",
  primary_cta_label: "Ver detalle",
  primary_cta_url: ""
};

export function AdminConsole() {
  const { t } = useLocale();
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [apps, setApps] = useState<AdminAppRow[]>([]);
  const [form, setForm] = useState<AppFormValues>(defaultForm);
  const [status, setStatus] = useState<string>("Preparado.");
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (!nextSession) {
        setRole(null);
        setApps([]);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    const client = supabase;
    const currentSession = session;

    if (!client || !currentSession) {
      return;
    }

    async function loadAdminState(client: SupabaseClient, currentSession: Session) {
      const { data: profile } = await client
        .from("profiles")
        .select("role")
        .eq("id", currentSession.user.id)
        .maybeSingle();

      setRole(profile?.role ?? null);

      const { data, error } = await client
        .from("apps")
        .select("id, slug, name, tagline, short_description, status, featured, category, platform, updated_at")
        .order("updated_at", { ascending: false });

      if (error) {
        setStatus(error.message);
        return;
      }

      setApps(data ?? []);
    }

    loadAdminState(client, currentSession);
  }, [session, supabase]);

  // ── Not Configured Fallback ──────────────────────────────
  if (!supabase) {
    return (
      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-8 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-amber-500/10">
            <ShieldAlert aria-hidden="true" className="text-amber-500" size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[var(--color-ink)]">{t("admin.not_configured.title")}</h2>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-[var(--color-graphite)]">
          {t("admin.not_configured.body")}
        </p>
        <div className="mt-6 rounded-lg bg-[var(--color-bg)] border border-[var(--color-line)] p-4">
          <code className="text-xs text-[var(--color-graphite)] block leading-6">
            NEXT_PUBLIC_SUPABASE_URL=...<br />
            NEXT_PUBLIC_SUPABASE_ANON_KEY=...
          </code>
        </div>
      </div>
    );
  }

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const client = supabase;
    if (!client) {
      return;
    }
    setIsBusy(true);
    const { error } = await client.auth.signInWithPassword({ email, password });
    setStatus(error ? error.message : "Sesion iniciada.");
    setIsBusy(false);
  }

  async function signOut() {
    const client = supabase;
    if (!client) {
      return;
    }
    await client.auth.signOut();
    setRole(null);
    setApps([]);
  }

  async function saveApp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const client = supabase;
    if (!client) {
      return;
    }
    setIsBusy(true);

    const parsed = appFormSchema.safeParse(form);
    if (!parsed.success) {
      setStatus(parsed.error.errors[0]?.message ?? "Revisa los campos.");
      setIsBusy(false);
      return;
    }

    const platform = parsed.data.platform
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = {
      ...parsed.data,
      platform,
      featured: true,
      primary_cta_url: parsed.data.primary_cta_url || `/apps/${parsed.data.slug}`
    };

    const { error } = await client.from("apps").upsert(payload, { onConflict: "slug" });
    if (error) {
      setStatus(error.message);
      setIsBusy(false);
      return;
    }

    setStatus("App guardada. Lanza un nuevo deploy si necesitas una ruta estatica nueva.");
    setForm(defaultForm);
    const { data } = await client
      .from("apps")
      .select("id, slug, name, tagline, short_description, status, featured, category, platform, updated_at")
      .order("updated_at", { ascending: false });
    setApps(data ?? []);
    setIsBusy(false);
  }

  // ── Login Form ───────────────────────────────────────────
  if (!session) {
    return (
      <form className="mx-auto max-w-md rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft" onSubmit={signIn}>
        <div className="flex items-center gap-3">
          <Lock aria-hidden="true" className="text-[var(--color-brand-blue)]" />
          <h2 className="text-xl font-semibold text-[var(--color-ink)]">Acceso administrativo</h2>
        </div>
        <p className="mt-3 text-sm leading-6 text-[var(--color-graphite)]">
          Usa un usuario de Supabase Auth con rol `admin` o `editor` en la tabla `profiles`.
        </p>
        <label className="mt-6 grid gap-2 text-sm font-medium text-[var(--color-ink)]">
          Email
          <input
            className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-3 text-sm text-[var(--color-ink)]"
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
        </label>
        <label className="mt-4 grid gap-2 text-sm font-medium text-[var(--color-ink)]">
          Password
          <input
            className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-3 text-sm text-[var(--color-ink)]"
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
        </label>
        <button
          className="mt-6 w-full rounded-lg bg-[var(--color-brand-blue)] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
          disabled={isBusy}
          type="submit"
        >
          Entrar
        </button>
        <p className="mt-4 text-sm text-[var(--color-graphite)]">{status}</p>
      </form>
    );
  }

  const canEdit = role === "admin" || role === "editor";

  // ── Admin Dashboard ──────────────────────────────────────
  return (
    <div className="grid gap-8">
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold text-[var(--color-brand-blue)]">Sesion activa</p>
          <h2 className="mt-1 text-2xl font-semibold text-[var(--color-ink)]">{session.user.email}</h2>
          <p className="mt-2 text-sm text-[var(--color-graphite)]">Rol detectado: {role ?? "sin rol"}</p>
        </div>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--color-line)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-bg)]"
          onClick={signOut}
          type="button"
        >
          <LogOut aria-hidden="true" size={16} />
          Salir
        </button>
      </div>

      {!canEdit ? (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-5 text-sm leading-6 text-red-500">
          Tu usuario existe, pero RLS no le permite editar. Asigna `admin` o `editor` en `profiles`.
        </div>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <form className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft" onSubmit={saveApp}>
          <div className="flex items-center gap-3">
            <Plus aria-hidden="true" className="text-[var(--color-brand-green)]" />
            <h2 className="text-xl font-semibold text-[var(--color-ink)]">Crear o actualizar app</h2>
          </div>
          <div className="mt-6 grid gap-4">
            {([
              ["slug", "Slug"],
              ["name", "Nombre"],
              ["tagline", "Tagline"],
              ["short_description", "Descripcion corta"],
              ["long_description", "Descripcion larga"],
              ["category", "Categoria"],
              ["platform", "Plataformas separadas por coma"],
              ["support_email", "Email soporte"],
              ["primary_cta_label", "CTA principal"],
              ["primary_cta_url", "URL CTA"]
            ] as const).map(([key, label]) => (
              <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]" key={key}>
                {label}
                {key === "long_description" ? (
                  <textarea
                    className="min-h-24 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-3 text-sm font-normal text-[var(--color-ink)]"
                    onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                    value={form[key]}
                  />
                ) : (
                  <input
                    className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-3 text-sm font-normal text-[var(--color-ink)]"
                    onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                    value={form[key]}
                  />
                )}
              </label>
            ))}
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Estado
              <select
                className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-3 text-sm font-normal text-[var(--color-ink)]"
                onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as AppFormValues["status"] }))}
                value={form.status}
              >
                <option value="draft">draft</option>
                <option value="coming_soon">coming_soon</option>
                <option value="published">published</option>
                <option value="archived">archived</option>
              </select>
            </label>
          </div>
          <button
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-brand-blue)] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
            disabled={isBusy || !canEdit}
            type="submit"
          >
            <CheckCircle2 aria-hidden="true" size={16} />
            Guardar app
          </button>
          <p className="mt-4 text-sm text-[var(--color-graphite)]">{status}</p>
        </form>

        <section className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <Database aria-hidden="true" className="text-[var(--color-brand-blue)]" />
            <h2 className="text-xl font-semibold text-[var(--color-ink)]">Contenido en Supabase</h2>
          </div>
          <div className="mt-6 grid gap-4">
            {apps.length === 0 ? (
              <p className="text-sm text-[var(--color-graphite)]">Todavia no hay apps accesibles para este usuario.</p>
            ) : (
              apps.map((app) => (
                <article className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] p-4" key={app.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-[var(--color-ink)]">{app.name}</h3>
                      <p className="mt-1 text-sm text-[var(--color-graphite)]">{app.tagline}</p>
                    </div>
                    <span className="rounded-md bg-[var(--color-bg)] border border-[var(--color-line)] px-2 py-1 text-xs text-[var(--color-graphite)]">
                      {app.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--color-graphite)]">{app.short_description}</p>
                  <button
                    className="mt-4 text-sm font-semibold text-[var(--color-brand-blue)]"
                    onClick={() =>
                      setForm({
                        slug: app.slug,
                        name: app.name,
                        tagline: app.tagline,
                        short_description: app.short_description,
                        long_description: "",
                        status: app.status as AppFormValues["status"],
                        category: app.category,
                        platform: app.platform.join(", "),
                        support_email: defaultForm.support_email,
                        primary_cta_label: defaultForm.primary_cta_label,
                        primary_cta_url: `/apps/${app.slug}`
                      })
                    }
                    type="button"
                  >
                    Cargar en formulario
                  </button>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
