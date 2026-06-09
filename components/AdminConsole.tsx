"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import {
  Award,
  CheckCircle2,
  Database,
  Edit3,
  Home,
  Lock,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  Save,
  Search,
  ShieldAlert,
  Smartphone,
  Star,
  Trash2,
  User,
  X,
  ChevronRight,
  BarChart3,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { useLocale } from "@/lib/i18n";
import { fallbackHomeSections } from "@/lib/home-content";

// ─── Types ─────────────────────────────────────────────────────────

type AdminSection =
  | "dashboard"
  | "hero"
  | "bio"
  | "services"
  | "process"
  | "faq"
  | "testimonials"
  | "about"
  | "apps"
  | "messages"
  | "seo";

type HomeRow = { id?: string; key: string; title: string; body: string; is_enabled: boolean };
type Testimonial = { id?: string; quote: string; name: string; role: string; is_published: boolean; sort_order: number };
type ContactMessage = { id: string; name: string; email: string; topic: string; message: string; status: string; created_at: string };
type SeoRow = { id?: string; path: string; title: string; description: string; og_image_url: string };
type AppRow = { id: string; slug: string; name: string; tagline: string; short_description: string; status: string; featured: boolean; category: string; platform: string[]; updated_at: string };

// ─── Navigation items ────────────────────────────────────────────

const navItems: Array<{ id: AdminSection; label: string; icon: React.ElementType; badge?: string }> = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "hero", label: "Hero", icon: Home },
  { id: "bio", label: "Quién soy", icon: User },
  { id: "services", label: "Servicios", icon: Award },
  { id: "process", label: "Proceso", icon: ChevronRight },
  { id: "faq", label: "FAQ", icon: MessageSquare },
  { id: "testimonials", label: "Testimonios", icon: Star },
  { id: "about", label: 'Perfil "Sobre mí"', icon: User },
  { id: "apps", label: "Apps", icon: Smartphone },
  { id: "messages", label: "Mensajes", icon: Mail },
  { id: "seo", label: "SEO", icon: Search },
];

// ─── Main Component ──────────────────────────────────────────────

export function AdminConsole() {
  const { t } = useLocale();
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [loginStatus, setLoginStatus] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (!nextSession) setRole(null);
    });
    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (!supabase || !session) return;
    supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .maybeSingle()
      .then(({ data }) => setRole(data?.role ?? null));
  }, [session, supabase]);

  async function signIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!supabase) return;
    setIsBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoginStatus(error ? error.message : "Sesión iniciada.");
    setIsBusy(false);
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setRole(null);
  }

  // ── Not Configured ──────────────────────────────────────────────
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
        <p className="mt-4 text-sm leading-7 text-[var(--color-graphite)]">{t("admin.not_configured.body")}</p>
        <div className="mt-6 rounded-lg bg-[var(--color-bg)] border border-[var(--color-line)] p-4">
          <code className="text-xs text-[var(--color-graphite)] block leading-6">
            NEXT_PUBLIC_SUPABASE_URL=...<br />
            NEXT_PUBLIC_SUPABASE_ANON_KEY=...
          </code>
        </div>
      </div>
    );
  }

  // ── Login Form ──────────────────────────────────────────────────
  if (!session) {
    return (
      <form
        className="mx-auto max-w-md rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-8 shadow-soft"
        onSubmit={signIn}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="size-10 rounded-xl bg-[var(--color-brand-blue)]/10 flex items-center justify-center">
            <Lock className="text-[var(--color-brand-blue)]" size={20} />
          </div>
          <h2 className="text-xl font-bold text-[var(--color-ink)]">Acceso administrativo</h2>
        </div>
        <p className="text-sm leading-6 text-[var(--color-graphite)] mb-6">
          Inicia sesión con tu cuenta de Supabase Auth.
        </p>
        <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)] mb-4">
          Email
          <input
            className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30"
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            value={email}
            placeholder="admin@ejemplo.com"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
          Contraseña
          <input
            className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30"
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            value={password}
          />
        </label>
        <button
          className="mt-6 w-full rounded-lg bg-[var(--color-brand-blue)] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60 hover:opacity-90 transition-opacity"
          disabled={isBusy}
          type="submit"
        >
          {isBusy ? "Entrando..." : "Entrar"}
        </button>
        {loginStatus && (
          <p className="mt-4 text-sm text-red-500">{loginStatus}</p>
        )}
      </form>
    );
  }

  const canEdit = role === "admin" || role === "editor";

  // ── Admin Dashboard Shell ───────────────────────────────────────
  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      {/* Sidebar */}
      <aside className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-4 shadow-soft h-fit lg:sticky lg:top-24">
        {/* User card */}
        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-[var(--color-line)]">
          <div className="size-9 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center text-sm font-bold text-[var(--color-brand-blue)]">
            {session.user.email?.[0]?.toUpperCase() ?? "A"}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-[var(--color-ink)] truncate">{session.user.email}</p>
            <p className="text-[10px] text-[var(--color-graphite)] capitalize">{role ?? "sin rol"}</p>
          </div>
          <button
            onClick={signOut}
            className="ml-auto p-1.5 rounded-lg hover:bg-[var(--color-bg)] text-[var(--color-graphite)] hover:text-red-400 transition-colors"
            title="Cerrar sesión"
            type="button"
          >
            <LogOut size={15} />
          </button>
        </div>

        {/* Nav */}
        <nav className="grid gap-0.5">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left ${
                activeSection === id
                  ? "bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)]"
                  : "text-[var(--color-graphite)] hover:bg-[var(--color-bg)] hover:text-[var(--color-ink)]"
              }`}
              type="button"
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="min-w-0">
        {!canEdit && (
          <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-500">
            Tu usuario existe, pero no tiene rol editor/admin. Asigna el rol en la tabla <code>profiles</code>.
          </div>
        )}

        {activeSection === "dashboard" && <SectionDashboard supabase={supabase} session={session} role={role} />}
        {activeSection === "hero" && <SectionHomeContent supabase={supabase} sectionKeys={["hero", "hero.cta.primary", "hero.cta.secondary", "hero.proof.1", "hero.proof.2", "hero.proof.3"]} title="Hero" canEdit={canEdit} />}
        {activeSection === "bio" && <SectionHomeContent supabase={supabase} sectionKeys={["bio", "bio.label", "bio.cta"]} title="Quién soy (Bio)" canEdit={canEdit} />}
        {activeSection === "services" && <SectionHomeContent supabase={supabase} sectionKeys={["services", "services.growth", "services.ios", "services.design", "services.backend"]} title="Servicios" canEdit={canEdit} />}
        {activeSection === "process" && <SectionHomeContent supabase={supabase} sectionKeys={["process", "process.1", "process.2", "process.3", "process.4", "process.5"]} title="Proceso" canEdit={canEdit} />}
        {activeSection === "faq" && <SectionHomeContent supabase={supabase} sectionKeys={["faq", "faq.q1", "faq.q2", "faq.q3", "faq.q4", "faq.q5"]} title="FAQ" canEdit={canEdit} />}
        {activeSection === "testimonials" && <SectionTestimonials supabase={supabase} canEdit={canEdit} />}
        {activeSection === "about" && <SectionAboutProfile supabase={supabase} canEdit={canEdit} />}
        {activeSection === "apps" && <SectionApps supabase={supabase} canEdit={canEdit} />}
        {activeSection === "messages" && <SectionMessages supabase={supabase} />}
        {activeSection === "seo" && <SectionSeo supabase={supabase} canEdit={canEdit} />}
      </div>
    </div>
  );
}

// ─── Section: Dashboard ──────────────────────────────────────────

function SectionDashboard({ supabase, session, role }: { supabase: SupabaseClient; session: Session; role: string | null }) {
  const [counts, setCounts] = useState({ apps: 0, messages: 0, testimonials: 0 });

  useEffect(() => {
    Promise.all([
      supabase.from("apps").select("id", { count: "exact", head: true }),
      supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("status", "new"),
      supabase.from("testimonials").select("id", { count: "exact", head: true }),
    ]).then(([apps, msgs, tests]) => {
      setCounts({ apps: apps.count ?? 0, messages: msgs.count ?? 0, testimonials: tests.count ?? 0 });
    });
  }, [supabase]);

  const stats = [
    { label: "Apps en catálogo", value: counts.apps, color: "text-[var(--color-brand-blue)]", bg: "bg-[var(--color-brand-blue)]/10" },
    { label: "Mensajes nuevos", value: counts.messages, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Testimonios", value: counts.testimonials, color: "text-[var(--color-brand-green)]", bg: "bg-[var(--color-brand-green)]/10" },
  ];

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft">
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-blue)]">Panel de control</p>
        <h2 className="mt-1 text-2xl font-bold text-[var(--color-ink)]">Bienvenido, {session.user.email}</h2>
        <p className="mt-1 text-sm text-[var(--color-graphite)]">Rol: <span className="font-semibold capitalize">{role ?? "sin rol"}</span></p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-5 shadow-soft">
            <div className={`inline-flex size-10 items-center justify-center rounded-xl ${s.bg} mb-3`}>
              <span className={`text-lg font-black ${s.color}`}>{s.value}</span>
            </div>
            <p className="text-xs font-semibold text-[var(--color-graphite)]">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft">
        <h3 className="text-sm font-bold text-[var(--color-ink)] mb-3">Guía rápida</h3>
        <ul className="grid gap-2 text-sm text-[var(--color-graphite)]">
          <li className="flex items-start gap-2"><CheckCircle2 size={15} className="text-[var(--color-brand-green)] mt-0.5 shrink-0" /> Edita el contenido del Hero, Bio, Servicios, Proceso y FAQ desde las secciones del sidebar.</li>
          <li className="flex items-start gap-2"><CheckCircle2 size={15} className="text-[var(--color-brand-green)] mt-0.5 shrink-0" /> Los cambios se reflejan en la landing <strong>instantáneamente</strong> sin necesidad de hacer deploy.</li>
          <li className="flex items-start gap-2"><CheckCircle2 size={15} className="text-[var(--color-brand-green)] mt-0.5 shrink-0" /> Gestiona testimonios, apps, mensajes de contacto y metadatos SEO desde sus secciones dedicadas.</li>
        </ul>
      </div>
    </div>
  );
}

// ─── Section: Home Content (generic) ────────────────────────────

function SectionHomeContent({
  supabase,
  sectionKeys,
  title,
  canEdit,
}: {
  supabase: SupabaseClient;
  sectionKeys: string[];
  title: string;
  canEdit: boolean;
}) {
  const [rows, setRows] = useState<HomeRow[]>([]);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("home_sections")
      .select("id, key, title, body, is_enabled")
      .in("key", sectionKeys);

    // Merge DB rows with fallback for missing keys
    const dbMap: Record<string, HomeRow> = {};
    for (const row of data ?? []) {
      dbMap[row.key] = row;
    }
    const merged = sectionKeys.map((key) =>
      dbMap[key] ?? { key, title: fallbackHomeSections[key]?.title ?? "", body: fallbackHomeSections[key]?.body ?? "", is_enabled: true }
    );
    setRows(merged);
  }, [supabase, sectionKeys]);

  useEffect(() => { load(); }, [load]);

  const updateRow = (key: string, field: "title" | "body" | "is_enabled", value: string | boolean) => {
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, [field]: value } : r)));
  };

  const saveRow = async (row: HomeRow) => {
    if (!canEdit) return;
    setSaving(row.key);
    const { error } = await supabase
      .from("home_sections")
      .upsert({ key: row.key, title: row.title, body: row.body, is_enabled: row.is_enabled, updated_at: new Date().toISOString() }, { onConflict: "key" });
    setStatus(error ? `Error: ${error.message}` : `✓ "${row.key}" guardado`);
    setSaving(null);
    load();
  };

  const fieldLabel: Record<string, string> = {
    "hero": "Título principal + Subtítulo",
    "hero.cta.primary": "Botón CTA Principal (title = texto del botón)",
    "hero.cta.secondary": "Botón CTA Secundario (title = texto del botón)",
    "hero.proof.1": "Proof point 1",
    "hero.proof.2": "Proof point 2",
    "hero.proof.3": "Proof point 3",
    "bio": "Nombre/título + Cuerpo (separa párrafos con línea en blanco)",
    "bio.label": "Label pequeño sobre el nombre (title = texto)",
    "bio.cta": "Botón CTA (title = texto del botón)",
    "services": "Encabezado sección servicios",
    "services.growth": "Servicio: Consultoría Salesforce",
    "services.ios": "Servicio: Apps iOS",
    "services.design": "Servicio: Diseño",
    "services.backend": "Servicio: Backend",
    "process": "Título sección proceso",
    "process.1": "Paso 1",
    "process.2": "Paso 2",
    "process.3": "Paso 3",
    "process.4": "Paso 4",
    "process.5": "Paso 5",
    "faq": "Título sección FAQ",
    "faq.q1": "Pregunta 1 (title = pregunta, body = respuesta)",
    "faq.q2": "Pregunta 2",
    "faq.q3": "Pregunta 3",
    "faq.q4": "Pregunta 4",
    "faq.q5": "Pregunta 5",
    "testimonials": "Encabezado sección testimonios",
    "cta": "Banner CTA final",
  };

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft">
        <h2 className="text-xl font-bold text-[var(--color-ink)]">{title}</h2>
        <p className="mt-1 text-sm text-[var(--color-graphite)]">Los cambios se reflejan en la landing instantáneamente.</p>
      </div>

      {status && (
        <div className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-600 flex items-center gap-2">
          <CheckCircle2 size={15} /> {status}
        </div>
      )}

      {rows.map((row) => (
        <div key={row.key} className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <code className="text-xs bg-[var(--color-bg)] border border-[var(--color-line)] px-2 py-1 rounded text-[var(--color-brand-blue)]">{row.key}</code>
              <p className="mt-1.5 text-xs text-[var(--color-graphite)]">{fieldLabel[row.key] ?? row.key}</p>
            </div>
            <label className="flex items-center gap-2 text-xs text-[var(--color-graphite)] cursor-pointer">
              <input
                type="checkbox"
                checked={row.is_enabled}
                onChange={(e) => updateRow(row.key, "is_enabled", e.target.checked)}
                className="accent-[var(--color-brand-blue)]"
                disabled={!canEdit}
              />
              Visible
            </label>
          </div>

          <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)] mb-3">
            Título / Nombre
            <input
              className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30 disabled:opacity-50"
              value={row.title}
              onChange={(e) => updateRow(row.key, "title", e.target.value)}
              disabled={!canEdit}
            />
          </label>

          <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)] mb-4">
            Cuerpo / Descripción
            <textarea
              className="min-h-24 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)] font-normal focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30 disabled:opacity-50 resize-y"
              value={row.body}
              onChange={(e) => updateRow(row.key, "body", e.target.value)}
              disabled={!canEdit}
            />
          </label>

          <button
            onClick={() => saveRow(row)}
            disabled={!canEdit || saving === row.key}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand-blue)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 hover:opacity-90 transition-opacity"
            type="button"
          >
            <Save size={14} />
            {saving === row.key ? "Guardando..." : "Guardar cambio"}
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Section: Testimonials ────────────────────────────────────────

function SectionTestimonials({ supabase, canEdit }: { supabase: SupabaseClient; canEdit: boolean }) {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState<Testimonial>({ quote: "", name: "", role: "", is_published: false, sort_order: 0 });
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data } = await supabase.from("testimonials").select("*").order("sort_order");
    setItems(data ?? []);
  }, [supabase]);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    const payload = { ...form, updated_at: new Date().toISOString() };
    const { error } = editingId
      ? await supabase.from("testimonials").update(payload).eq("id", editingId)
      : await supabase.from("testimonials").insert(payload);
    setStatus(error ? `Error: ${error.message}` : "✓ Guardado");
    setForm({ quote: "", name: "", role: "", is_published: false, sort_order: 0 });
    setEditingId(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("¿Eliminar este testimonio?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    load();
  };

  const edit = (item: Testimonial & { id?: string }) => {
    setForm(item);
    setEditingId(item.id ?? null);
  };

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft">
        <h2 className="text-xl font-bold text-[var(--color-ink)]">Testimonios</h2>
        <p className="mt-1 text-sm text-[var(--color-graphite)]">Los testimonios marcados como publicados aparecen en la landing.</p>
      </div>

      {status && <div className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-600">{status}</div>}

      {/* Form */}
      {canEdit && (
        <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft">
          <h3 className="text-sm font-bold text-[var(--color-ink)] mb-4">{editingId ? "Editar testimonio" : "Añadir nuevo testimonio"}</h3>
          <div className="grid gap-3">
            <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">
              Testimonio / Quote
              <textarea
                className="min-h-20 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)] font-normal focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30 resize-y"
                value={form.quote}
                onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
                placeholder="Excelente experiencia trabajando con Lester..."
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">
                Nombre
                <input className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="María García" />
              </label>
              <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">
                Cargo / Rol
                <input className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} placeholder="CEO en MiEmpresa" />
              </label>
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-xs font-semibold text-[var(--color-ink)] cursor-pointer">
                <input type="checkbox" checked={form.is_published} onChange={(e) => setForm((f) => ({ ...f, is_published: e.target.checked }))} className="accent-[var(--color-brand-blue)]" />
                Publicar en landing
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold text-[var(--color-ink)]">
                Orden:
                <input type="number" className="w-16 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-2 py-1.5 text-sm text-[var(--color-ink)] focus:outline-none" value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))} />
              </label>
            </div>
            <div className="flex gap-3">
              <button onClick={save} disabled={!form.quote || !form.name} className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand-blue)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 hover:opacity-90 transition-opacity" type="button">
                <Save size={14} /> {editingId ? "Actualizar" : "Añadir"}
              </button>
              {editingId && (
                <button onClick={() => { setForm({ quote: "", name: "", role: "", is_published: false, sort_order: 0 }); setEditingId(null); }} className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-bg)] transition-colors" type="button">
                  <X size={14} /> Cancelar
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <div className="grid gap-4">
        {items.length === 0 && <p className="text-sm text-[var(--color-graphite)]">No hay testimonios aún.</p>}
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-5 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${item.is_published ? "bg-green-500/10 text-green-600" : "bg-[var(--color-line)] text-[var(--color-graphite)]"}`}>
                  {item.is_published ? <Eye size={10} /> : <EyeOff size={10} />}
                  {item.is_published ? "Publicado" : "Borrador"}
                </span>
                <span className="text-xs text-[var(--color-graphite)]">Orden: {item.sort_order}</span>
              </div>
              {canEdit && (
                <div className="flex gap-2">
                  <button onClick={() => edit(item)} className="p-1.5 rounded-lg hover:bg-[var(--color-bg)] text-[var(--color-graphite)] hover:text-[var(--color-brand-blue)] transition-colors" type="button"><Edit3 size={14} /></button>
                  <button onClick={() => remove(item.id!)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-[var(--color-graphite)] hover:text-red-500 transition-colors" type="button"><Trash2 size={14} /></button>
                </div>
              )}
            </div>
            <p className="mt-3 text-sm italic text-[var(--color-graphite)] leading-6">&ldquo;{item.quote}&rdquo;</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="size-6 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center text-[10px] font-bold text-[var(--color-brand-blue)]">{item.name[0]}</div>
              <p className="text-xs font-bold text-[var(--color-ink)]">{item.name}</p>
              {item.role && <p className="text-[10px] text-[var(--color-graphite)]">· {item.role}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section: About Profile ───────────────────────────────────────

function SectionAboutProfile({ supabase, canEdit }: { supabase: SupabaseClient; canEdit: boolean }) {
  type Profile = { id?: string; slug: string; full_name: string; headline: string; location: string; current_company: string; education: string; linkedin_url: string; image_url: string; summary: string; source_note: string };
  const emptyProfile: Profile = { slug: "lester-romero-bernardo", full_name: "", headline: "", location: "", current_company: "", education: "", linkedin_url: "", image_url: "", summary: "", source_note: "" };

  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("about_profiles").select("*").eq("slug", "lester-romero-bernardo").maybeSingle().then(({ data }) => {
      if (data) setProfile(data as Profile);
    });
  }, [supabase]);

  const save = async () => {
    setSaving(true);
    const payload = { ...profile, updated_at: new Date().toISOString() };
    const { error } = await supabase.from("about_profiles").upsert(payload, { onConflict: "slug" });
    setStatus(error ? `Error: ${error.message}` : "✓ Perfil guardado");
    setSaving(false);
  };

  const fields: Array<[keyof Profile, string, string]> = [
    ["full_name", "Nombre completo", "text"],
    ["headline", "Titular / Headline", "text"],
    ["location", "Ubicación", "text"],
    ["current_company", "Empresa actual", "text"],
    ["education", "Formación", "text"],
    ["linkedin_url", "URL de LinkedIn", "url"],
    ["image_url", "URL de foto de perfil", "url"],
    ["source_note", "Nota de fuente", "text"],
  ];

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft">
        <h2 className="text-xl font-bold text-[var(--color-ink)]">Perfil &ldquo;Sobre mí&rdquo;</h2>
        <p className="mt-1 text-sm text-[var(--color-graphite)]">Información que aparece en la página /about.</p>
      </div>

      {status && <div className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-600">{status}</div>}

      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft">
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map(([key, label, type]) => (
            <label key={key} className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">
              {label}
              <input
                type={type}
                className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30 disabled:opacity-50"
                value={profile[key] as string}
                onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                disabled={!canEdit}
              />
            </label>
          ))}
        </div>
        <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)] mt-4">
          Resumen / Bio
          <textarea
            className="min-h-32 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)] font-normal focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30 disabled:opacity-50 resize-y"
            value={profile.summary}
            onChange={(e) => setProfile((p) => ({ ...p, summary: e.target.value }))}
            disabled={!canEdit}
          />
        </label>
        {canEdit && (
          <button onClick={save} disabled={saving} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand-blue)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 hover:opacity-90 transition-opacity" type="button">
            <Save size={14} /> {saving ? "Guardando..." : "Guardar perfil"}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Section: Apps ────────────────────────────────────────────────

function SectionApps({ supabase, canEdit }: { supabase: SupabaseClient; canEdit: boolean }) {
  const [apps, setApps] = useState<AppRow[]>([]);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({ slug: "", name: "", tagline: "", short_description: "", long_description: "", status: "draft", category: "", platform: "iOS", support_email: "", primary_cta_label: "Ver detalle", primary_cta_url: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data } = await supabase.from("apps").select("id, slug, name, tagline, short_description, status, featured, category, platform, updated_at").order("updated_at", { ascending: false });
    setApps(data ?? []);
  }, [supabase]);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    const payload = {
      ...form,
      platform: form.platform.split(",").map((p) => p.trim()).filter(Boolean),
      featured: true,
      primary_cta_url: form.primary_cta_url || `/apps/${form.slug}`,
      updated_at: new Date().toISOString(),
    };
    const { error } = editingId
      ? await supabase.from("apps").update(payload).eq("id", editingId)
      : await supabase.from("apps").upsert(payload, { onConflict: "slug" });
    setStatus(error ? `Error: ${error.message}` : "✓ App guardada");
    setForm({ slug: "", name: "", tagline: "", short_description: "", long_description: "", status: "draft", category: "", platform: "iOS", support_email: "", primary_cta_label: "Ver detalle", primary_cta_url: "" });
    setEditingId(null);
    load();
  };

  const statusColors: Record<string, string> = {
    published: "bg-green-500/10 text-green-600",
    coming_soon: "bg-amber-500/10 text-amber-600",
    draft: "bg-[var(--color-line)] text-[var(--color-graphite)]",
    archived: "bg-red-500/10 text-red-500",
  };

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft">
        <h2 className="text-xl font-bold text-[var(--color-ink)]">Apps</h2>
        <p className="mt-1 text-sm text-[var(--color-graphite)]">Gestiona el catálogo de aplicaciones.</p>
      </div>

      {status && <div className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-600">{status}</div>}

      {/* Form */}
      {canEdit && (
        <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft">
          <h3 className="text-sm font-bold text-[var(--color-ink)] mb-4">{editingId ? "Editar app" : "Nueva app"}</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {([["slug", "Slug (URL)"], ["name", "Nombre"], ["tagline", "Tagline"], ["category", "Categoría"], ["platform", "Plataformas (coma)"], ["support_email", "Email soporte"], ["primary_cta_label", "Texto botón CTA"], ["primary_cta_url", "URL botón CTA"]] as const).map(([key, label]) => (
              <label key={key} className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">
                {label}
                <input className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30" value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} />
              </label>
            ))}
          </div>
          <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)] mt-3">
            Descripción corta
            <input className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30" value={form.short_description} onChange={(e) => setForm((f) => ({ ...f, short_description: e.target.value }))} />
          </label>
          <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)] mt-3">
            Descripción larga
            <textarea className="min-h-24 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)] font-normal focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30 resize-y" value={form.long_description} onChange={(e) => setForm((f) => ({ ...f, long_description: e.target.value }))} />
          </label>
          <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)] mt-3 mb-4">
            Estado
            <select className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none" value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
              <option value="draft">Borrador</option>
              <option value="coming_soon">Próximamente</option>
              <option value="published">Publicada</option>
              <option value="archived">Archivada</option>
            </select>
          </label>
          <div className="flex gap-3">
            <button onClick={save} className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand-blue)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity" type="button"><Save size={14} /> {editingId ? "Actualizar" : "Guardar"}</button>
            {editingId && <button onClick={() => { setForm({ slug: "", name: "", tagline: "", short_description: "", long_description: "", status: "draft", category: "", platform: "iOS", support_email: "", primary_cta_label: "Ver detalle", primary_cta_url: "" }); setEditingId(null); }} className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-bg)]" type="button"><X size={14} /> Cancelar</button>}
          </div>
        </div>
      )}

      {/* List */}
      <div className="grid gap-4">
        {apps.map((app) => (
          <div key={app.id} className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-5 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-bold text-[var(--color-ink)]">{app.name}</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${statusColors[app.status] ?? ""}`}>{app.status}</span>
                </div>
                <p className="mt-1 text-xs text-[var(--color-graphite)]">{app.tagline}</p>
                <code className="mt-1 text-[10px] text-[var(--color-graphite)]">/apps/{app.slug}</code>
              </div>
              {canEdit && (
                <button
                  onClick={() => {
                    setForm({ slug: app.slug, name: app.name, tagline: app.tagline, short_description: app.short_description, long_description: "", status: app.status, category: app.category, platform: app.platform.join(", "), support_email: "", primary_cta_label: "Ver detalle", primary_cta_url: `/apps/${app.slug}` });
                    setEditingId(app.id);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-brand-blue)] hover:underline"
                  type="button"
                >
                  <Edit3 size={13} /> Editar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section: Messages ────────────────────────────────────────────

function SectionMessages({ supabase }: { supabase: SupabaseClient }) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const load = useCallback(async () => {
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    setMessages(data ?? []);
  }, [supabase]);

  useEffect(() => { load(); }, [load]);

  const markRead = async (id: string) => {
    await supabase.from("contact_messages").update({ status: "read" }).eq("id", id);
    load();
  };

  const archive = async (id: string) => {
    await supabase.from("contact_messages").update({ status: "archived" }).eq("id", id);
    load();
  };

  const statusColors: Record<string, string> = {
    new: "bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)]",
    read: "bg-green-500/10 text-green-600",
    archived: "bg-[var(--color-line)] text-[var(--color-graphite)]",
  };

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft flex-1">
          <h2 className="text-xl font-bold text-[var(--color-ink)]">Mensajes de contacto</h2>
          <p className="mt-1 text-sm text-[var(--color-graphite)]">{messages.filter((m) => m.status === "new").length} nuevos · {messages.length} total</p>
        </div>
      </div>

      {messages.length === 0 && <p className="text-sm text-[var(--color-graphite)]">No hay mensajes aún.</p>}

      {messages.map((msg) => (
        <div key={msg.id} className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-5 shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${statusColors[msg.status] ?? ""}`}>{msg.status}</span>
              <h3 className="font-bold text-[var(--color-ink)]">{msg.name}</h3>
              <a href={`mailto:${msg.email}`} className="text-xs text-[var(--color-brand-blue)] hover:underline">{msg.email}</a>
              {msg.topic && <span className="text-xs text-[var(--color-graphite)]">· {msg.topic}</span>}
            </div>
            <div className="flex gap-2 shrink-0">
              {msg.status === "new" && (
                <button onClick={() => markRead(msg.id)} className="text-xs px-2.5 py-1 rounded-lg border border-[var(--color-line)] text-[var(--color-graphite)] hover:bg-[var(--color-bg)] transition-colors" type="button">Marcar leído</button>
              )}
              {msg.status !== "archived" && (
                <button onClick={() => archive(msg.id)} className="text-xs px-2.5 py-1 rounded-lg border border-[var(--color-line)] text-[var(--color-graphite)] hover:bg-[var(--color-bg)] transition-colors" type="button">Archivar</button>
              )}
            </div>
          </div>
          <p className="mt-3 text-sm text-[var(--color-graphite)] leading-6 whitespace-pre-wrap">{msg.message}</p>
          <p className="mt-3 text-[10px] text-[var(--color-graphite)]">{new Date(msg.created_at).toLocaleString("es")}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Section: SEO ─────────────────────────────────────────────────

function SectionSeo({ supabase, canEdit }: { supabase: SupabaseClient; canEdit: boolean }) {
  const [rows, setRows] = useState<SeoRow[]>([]);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState<SeoRow>({ path: "", title: "", description: "", og_image_url: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data } = await supabase.from("seo_metadata").select("*").order("path");
    setRows(data ?? []);
  }, [supabase]);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    const payload = { ...form, updated_at: new Date().toISOString() };
    const { error } = editingId
      ? await supabase.from("seo_metadata").update(payload).eq("id", editingId)
      : await supabase.from("seo_metadata").upsert(payload, { onConflict: "path" });
    setStatus(error ? `Error: ${error.message}` : "✓ SEO guardado");
    setForm({ path: "", title: "", description: "", og_image_url: "" });
    setEditingId(null);
    load();
  };

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft">
        <h2 className="text-xl font-bold text-[var(--color-ink)]">Metadatos SEO</h2>
        <p className="mt-1 text-sm text-[var(--color-graphite)]">Title y description para cada ruta de la web.</p>
      </div>

      {status && <div className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-600">{status}</div>}

      {canEdit && (
        <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft">
          <h3 className="text-sm font-bold text-[var(--color-ink)] mb-4">{editingId ? "Editar ruta" : "Añadir ruta"}</h3>
          <div className="grid gap-3">
            <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">
              Ruta (ej: /, /apps, /about)
              <input className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30" value={form.path} onChange={(e) => setForm((f) => ({ ...f, path: e.target.value }))} placeholder="/" />
            </label>
            <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">
              Title (max 60 chars)
              <input className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} maxLength={60} />
            </label>
            <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">
              Description (max 160 chars)
              <textarea className="min-h-16 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)] font-normal focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30 resize-y" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} maxLength={160} />
            </label>
            <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">
              OG Image URL
              <input type="url" className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30" value={form.og_image_url} onChange={(e) => setForm((f) => ({ ...f, og_image_url: e.target.value }))} />
            </label>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={save} className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand-blue)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity" type="button"><Save size={14} /> {editingId ? "Actualizar" : "Guardar"}</button>
            {editingId && <button onClick={() => { setForm({ path: "", title: "", description: "", og_image_url: "" }); setEditingId(null); }} className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-bg)]" type="button"><X size={14} /> Cancelar</button>}
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {rows.length === 0 && <p className="text-sm text-[var(--color-graphite)]">No hay entradas SEO aún.</p>}
        {rows.map((row) => (
          <div key={row.id} className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-5 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <code className="text-xs bg-[var(--color-bg)] border border-[var(--color-line)] px-2 py-0.5 rounded text-[var(--color-brand-blue)]">{row.path}</code>
                <p className="mt-2 text-sm font-semibold text-[var(--color-ink)]">{row.title}</p>
                <p className="mt-1 text-xs text-[var(--color-graphite)] leading-5">{row.description}</p>
              </div>
              {canEdit && (
                <button onClick={() => { setForm(row); setEditingId(row.id ?? null); }} className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-brand-blue)] hover:underline shrink-0" type="button"><Edit3 size={13} /> Editar</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
