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
  Store,
  Megaphone,
  Settings2,
  TrendingUp,
  MousePointer2,
  Rows3,
  Activity,
} from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { useLocale } from "@/lib/i18n";
import { fallbackHomeSections } from "@/lib/home-content";
import { MarketplaceAdmin } from "@/components/MarketplaceAdmin";
import { LandingEngagementAdmin } from "@/components/LandingEngagementAdmin";

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
  | "comparisons"
  | "marketplace"
  | "engagement"
  | "settings"
  | "reviews"
  | "messages"
  | "seo";

type HomeRow = { id?: string; key: string; title: string; body: string; is_enabled: boolean };
type Testimonial = { id?: string; quote: string; name: string; role: string; is_published: boolean; sort_order: number };
type ContactMessage = { id: string; name: string; email: string; topic: string; message: string; status: string; created_at: string };
type ReviewSubmission = { id: string; app_slug: string; display_name: string; email: string | null; rating: number; title: string; content: string; locale: string; status: "pending" | "published" | "rejected"; created_at: string; moderation_note?: string | null };
type SeoRow = { id?: string; path: string; title: string; description: string; og_image_url: string };
type AppRow = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  short_description: string;
  long_description: string;
  status: string;
  featured: boolean;
  category: string;
  platform: string[];
  support_email: string;
  primary_cta_label: string;
  primary_cta_url: string;
  updated_at: string;
};

type AppForm = Omit<AppRow, "id" | "updated_at" | "platform"> & { platform: string };
type FeatureComparisonRow = {
  id: string;
  app_id: string;
  feature_key: string;
  title: string;
  title_en: string | null;
  free_status: "included" | "limited" | "not_included" | "planned";
  free_detail: string;
  free_detail_en: string | null;
  pro_status: "included" | "limited" | "not_included" | "planned";
  pro_detail: string;
  pro_detail_en: string | null;
  sort_order: number;
  is_enabled: boolean;
};
type FeatureComparisonForm = Omit<FeatureComparisonRow, "id">;
type SiteSetting = {
  id?: string;
  key: string;
  value: string;
  value_type: "text" | "number" | "boolean";
  label: string;
  label_en?: string | null;
  description: string;
  description_en?: string | null;
  is_public: boolean;
};

const emptyAppForm: AppForm = {
  slug: "",
  name: "",
  tagline: "",
  short_description: "",
  long_description: "",
  status: "draft",
  featured: false,
  category: "",
  platform: "iOS",
  support_email: "",
  primary_cta_label: "Ver detalle",
  primary_cta_url: "",
};

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
  { id: "comparisons", label: "Comparativas Free / Pro", icon: Rows3 },
  { id: "marketplace", label: "Marketplace", icon: Store },
  { id: "engagement", label: "Anuncios y encuestas", icon: Megaphone },
  { id: "settings", label: "Configuración landing", icon: Settings2 },
  { id: "reviews", label: "Reseñas de usuarios", icon: Star },
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
        {activeSection === "comparisons" && <SectionFeatureComparisons supabase={supabase} canEdit={canEdit} />}
        {activeSection === "marketplace" && <MarketplaceAdmin supabase={supabase} canEdit={canEdit} />}
        {activeSection === "engagement" && <LandingEngagementAdmin supabase={supabase} canEdit={canEdit} />}
        {activeSection === "settings" && <SectionLandingSettings supabase={supabase} canEdit={canEdit} />}
        {activeSection === "reviews" && <SectionReviewSubmissions supabase={supabase} canEdit={canEdit} />}
        {activeSection === "messages" && <SectionMessages supabase={supabase} />}
        {activeSection === "seo" && <SectionSeo supabase={supabase} canEdit={canEdit} />}
      </div>
    </div>
  );
}

// ─── Section: Dashboard ──────────────────────────────────────────

type DashboardEvent = { event_name: string; app_slug: string | null; created_at: string };

function DashboardLineChart({ values }: { values: number[] }) {
  const max = Math.max(...values, 1);
  const points = values.map((value, index) => {
    const x = values.length <= 1 ? 0 : (index / (values.length - 1)) * 100;
    const y = 92 - (value / max) * 78;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg viewBox="0 0 100 100" className="h-44 w-full overflow-visible" preserveAspectRatio="none" role="img" aria-label="Tendencia de eventos de los últimos 14 días">
      <path d="M0 92 H100" stroke="currentColor" strokeOpacity=".12" vectorEffect="non-scaling-stroke" />
      <path d="M0 53 H100" stroke="currentColor" strokeOpacity=".08" vectorEffect="non-scaling-stroke" />
      <polyline points={points} fill="none" stroke="var(--color-brand-blue)" strokeWidth="1.8" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
      {values.map((value, index) => {
        const x = values.length <= 1 ? 0 : (index / (values.length - 1)) * 100;
        const y = 92 - (value / max) * 78;
        return <circle key={`${index}-${value}`} cx={x} cy={y} r="1.8" fill="var(--color-brand-blue)" vectorEffect="non-scaling-stroke" />;
      })}
    </svg>
  );
}

function DashboardBars({ items }: { items: Array<{ label: string; value: number }> }) {
  const max = Math.max(...items.map((item) => item.value), 1);
  return (
    <div className="grid gap-4">
      {items.length ? items.map((item) => (
        <div key={item.label}>
          <div className="mb-1.5 flex items-center justify-between gap-3 text-xs font-semibold text-[var(--color-graphite)]">
            <span className="truncate">{item.label}</span><span>{item.value}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[var(--color-line)]">
            <div className="h-full rounded-full bg-gradient-to-r from-[var(--color-brand-blue)] to-cyan-400" style={{ width: `${Math.max(4, (item.value / max) * 100)}%` }} />
          </div>
        </div>
      )) : <p className="text-sm text-[var(--color-graphite)]">Aún no hay datos suficientes.</p>}
    </div>
  );
}

function SectionDashboard({ supabase, session, role }: { supabase: SupabaseClient; session: Session; role: string | null }) {
  const [events, setEvents] = useState<DashboardEvent[]>([]);
  const [counts, setCounts] = useState({ apps: 0, messages: 0, testimonials: 0, comparisons: 0, settings: 0 });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const since = new Date();
    since.setDate(since.getDate() - 30);
    const [appsResult, messagesResult, testimonialsResult, eventsResult, comparisonsResult, settingsResult] = await Promise.all([
      supabase.from("apps").select("id", { count: "exact", head: true }),
      supabase.from("contact_messages").select("id, status, created_at").eq("status", "new").limit(5000),
      supabase.from("testimonials").select("id", { count: "exact", head: true }),
      supabase.from("landing_events").select("event_name, app_slug, created_at").gte("created_at", since.toISOString()).order("created_at", { ascending: true }).limit(5000),
      supabase.from("app_feature_comparisons").select("id", { count: "exact", head: true }),
      supabase.from("site_settings").select("id", { count: "exact", head: true }),
    ]);
    setEvents((eventsResult.data ?? []) as DashboardEvent[]);
    setCounts({
      apps: appsResult.count ?? 0,
      messages: messagesResult.data?.length ?? 0,
      testimonials: testimonialsResult.count ?? 0,
      comparisons: comparisonsResult.count ?? 0,
      settings: settingsResult.count ?? 0,
    });
    setLoading(false);
  }, [supabase]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  const trendValues = Array.from({ length: 14 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (13 - index));
    const key = date.toISOString().slice(0, 10);
    return events.filter((event) => event.created_at.slice(0, 10) === key).length;
  });
  const eventCounts = Object.entries(events.reduce<Record<string, number>>((acc, event) => {
    acc[event.event_name] = (acc[event.event_name] ?? 0) + 1;
    return acc;
  }, {})).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([label, value]) => ({ label, value }));
  const appCounts = Object.entries(events.reduce<Record<string, number>>((acc, event) => {
    if (event.app_slug) acc[event.app_slug] = (acc[event.app_slug] ?? 0) + 1;
    return acc;
  }, {})).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([label, value]) => ({ label, value }));
  const midpoint = Math.floor(trendValues.length / 2);
  const previous = trendValues.slice(0, midpoint).reduce((sum, value) => sum + value, 0);
  const current = trendValues.slice(midpoint).reduce((sum, value) => sum + value, 0);
  const trend = previous === 0 ? (current > 0 ? 100 : 0) : Math.round(((current - previous) / previous) * 100);
  const actionEvents = events.filter((event) => /cta|click|submit|appstore|waitlist/i.test(event.event_name)).length;
  const stats = [
    { label: "Eventos · 30 días", value: events.length, icon: Activity, color: "text-[var(--color-brand-blue)]", bg: "bg-[var(--color-brand-blue)]/10" },
    { label: "Acciones y conversiones", value: actionEvents, icon: MousePointer2, color: "text-[var(--color-brand-green)]", bg: "bg-[var(--color-brand-green)]/10" },
    { label: "Mensajes nuevos", value: counts.messages, icon: Mail, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Filas comparativas", value: counts.comparisons, icon: Rows3, color: "text-violet-500", bg: "bg-violet-500/10" },
  ];

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-blue)]">Panel de control</p>
          <h2 className="mt-1 text-2xl font-bold text-[var(--color-ink)]">Bienvenido, {session.user.email}</h2>
          <p className="mt-1 text-sm text-[var(--color-graphite)]">Rol: <span className="font-semibold capitalize">{role ?? "sin rol"}</span> · Datos agregados de los últimos 30 días</p>
        </div>
        <button onClick={load} disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--color-line)] px-3 py-2 text-xs font-bold text-[var(--color-ink)] hover:bg-[var(--color-bg)] disabled:opacity-60" type="button"><RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Actualizar</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return <div key={stat.label} className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-5 shadow-soft"><div className={`mb-3 inline-flex size-10 items-center justify-center rounded-xl ${stat.bg}`}><Icon size={18} className={stat.color} /></div><p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p><p className="mt-1 text-xs font-semibold text-[var(--color-graphite)]">{stat.label}</p></div>;
        })}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
        <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft">
          <div className="flex items-start justify-between gap-4"><div><h3 className="text-sm font-bold text-[var(--color-ink)]">Actividad de la landing</h3><p className="mt-1 text-xs text-[var(--color-graphite)]">Interacciones registradas durante los últimos 14 días</p></div><span className={`inline-flex items-center gap-1 text-xs font-black ${trend >= 0 ? "text-emerald-600" : "text-red-500"}`}><TrendingUp size={14} /> {trend >= 0 ? "+" : ""}{trend}%</span></div>
          <div className="mt-5"><DashboardLineChart values={trendValues} /></div>
          <div className="mt-2 flex justify-between text-[10px] font-semibold text-[var(--color-graphite)]"><span>14 días atrás</span><span>Hoy</span></div>
        </div>
        <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft"><h3 className="text-sm font-bold text-[var(--color-ink)]">Salud del contenido</h3><p className="mt-1 text-xs text-[var(--color-graphite)]">Superficies conectadas al panel</p><div className="mt-5 grid gap-3 text-sm"><div className="flex justify-between"><span className="text-[var(--color-graphite)]">Apps</span><strong className="text-[var(--color-ink)]">{counts.apps}</strong></div><div className="flex justify-between"><span className="text-[var(--color-graphite)]">Testimonios</span><strong className="text-[var(--color-ink)]">{counts.testimonials}</strong></div><div className="flex justify-between"><span className="text-[var(--color-graphite)]">Configuraciones</span><strong className="text-[var(--color-ink)]">{counts.settings}</strong></div><div className="flex justify-between"><span className="text-[var(--color-graphite)]">Comparativas</span><strong className="text-[var(--color-ink)]">{counts.comparisons}</strong></div></div><div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-700"><CheckCircle2 size={15} /> Supabase conectado</div></div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft"><h3 className="text-sm font-bold text-[var(--color-ink)]">Eventos más frecuentes</h3><p className="mb-5 mt-1 text-xs text-[var(--color-graphite)]">Qué acciones generan más señal</p><DashboardBars items={eventCounts} /></div>
        <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft"><h3 className="text-sm font-bold text-[var(--color-ink)]">Productos con actividad</h3><p className="mb-5 mt-1 text-xs text-[var(--color-graphite)]">Eventos asociados a cada app</p><DashboardBars items={appCounts} /></div>
      </div>
      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft"><h3 className="mb-3 text-sm font-bold text-[var(--color-ink)]">Guía rápida</h3><ul className="grid gap-2 text-sm text-[var(--color-graphite)]"><li className="flex items-start gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[var(--color-brand-green)]" /> Edita contenido, apps, comparativas, campañas y configuración de landing desde el sidebar.</li><li className="flex items-start gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[var(--color-brand-green)]" /> Los cambios de contenido se leen desde Supabase y se reflejan en la landing sin redeploy cuando hay conexión.</li><li className="flex items-start gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[var(--color-brand-green)]" /> Las métricas son agregadas: no se guardan emails, mensajes ni datos personales en los eventos.</li></ul></div>
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

  // eslint-disable-next-line react-hooks/set-state-in-effect
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

  // eslint-disable-next-line react-hooks/set-state-in-effect
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
  const [form, setForm] = useState<AppForm>(emptyAppForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("apps")
      .select("id, slug, name, tagline, short_description, long_description, status, featured, category, platform, support_email, primary_cta_label, primary_cta_url, updated_at")
      .order("updated_at", { ascending: false });
    setApps(data ?? []);
  }, [supabase]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  const save = async () => {
    const payload = {
      ...form,
      platform: form.platform.split(",").map((p) => p.trim()).filter(Boolean),
      primary_cta_url: form.primary_cta_url || `/apps/${form.slug}`,
      updated_at: new Date().toISOString(),
    };
    const { error } = editingId
      ? await supabase.from("apps").update(payload).eq("id", editingId)
      : await supabase.from("apps").upsert(payload, { onConflict: "slug" });
    setStatus(error ? `Error: ${error.message}` : "✓ App guardada");
    setForm(emptyAppForm);
    setEditingId(null);
    load();
  };

  const statusColors: Record<string, string> = {
    published: "bg-green-500/10 text-green-600",
    testing: "bg-sky-500/10 text-sky-600",
    development: "bg-amber-500/10 text-amber-600",
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
              <option value="development">En desarrollo</option>
              <option value="testing">En testing</option>
              <option value="coming_soon">Próximamente</option>
              <option value="published">Publicada</option>
              <option value="archived">Archivada</option>
            </select>
          </label>
          <label className="mb-4 flex items-center gap-2 text-xs font-semibold text-[var(--color-ink)]">
            <input
              checked={form.featured}
              onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
              type="checkbox"
            />
            Mostrar como app destacada
          </label>
          <div className="flex gap-3">
            <button onClick={save} className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand-blue)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity" type="button"><Save size={14} /> {editingId ? "Actualizar" : "Guardar"}</button>
            {editingId && <button onClick={() => { setForm(emptyAppForm); setEditingId(null); }} className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-bg)]" type="button"><X size={14} /> Cancelar</button>}
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
                    setForm({
                      slug: app.slug,
                      name: app.name,
                      tagline: app.tagline,
                      short_description: app.short_description,
                      long_description: app.long_description,
                      status: app.status,
                      featured: app.featured,
                      category: app.category,
                      platform: app.platform.join(", "),
                      support_email: app.support_email,
                      primary_cta_label: app.primary_cta_label,
                      primary_cta_url: app.primary_cta_url,
                    });
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

const emptyComparisonForm: FeatureComparisonForm = {
  app_id: "",
  feature_key: "",
  title: "",
  title_en: "",
  free_status: "included",
  free_detail: "",
  free_detail_en: "",
  pro_status: "included",
  pro_detail: "",
  pro_detail_en: "",
  sort_order: 10,
  is_enabled: true,
};

const comparisonStatuses: FeatureComparisonRow["free_status"][] = ["included", "limited", "not_included", "planned"];

function SectionFeatureComparisons({ supabase, canEdit }: { supabase: SupabaseClient; canEdit: boolean }) {
  const [apps, setApps] = useState<Array<Pick<AppRow, "id" | "slug" | "name">>>([]);
  const [selectedAppId, setSelectedAppId] = useState("");
  const [rows, setRows] = useState<FeatureComparisonRow[]>([]);
  const [form, setForm] = useState<FeatureComparisonForm>(emptyComparisonForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const loadApps = useCallback(async () => {
    const { data } = await supabase.from("apps").select("id, slug, name").order("name");
    const next = (data ?? []) as Array<Pick<AppRow, "id" | "slug" | "name">>;
    setApps(next);
    if (!selectedAppId && next[0]) {
      setSelectedAppId(next[0].id);
      setForm((current) => current.app_id ? current : { ...emptyComparisonForm, app_id: next[0].id });
    }
  }, [selectedAppId, supabase]);

  const loadRows = useCallback(async () => {
    if (!selectedAppId) return;
    setLoading(true);
    const { data, error } = await supabase.from("app_feature_comparisons").select("*").eq("app_id", selectedAppId).order("sort_order");
    setRows((data ?? []) as FeatureComparisonRow[]);
    if (error) setStatus(`Error al cargar comparativas: ${error.message}`);
    setLoading(false);
  }, [selectedAppId, supabase]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { loadApps(); }, [loadApps]);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { loadRows(); }, [loadRows]);

  const save = async () => {
    if (!canEdit || !form.app_id || !form.feature_key.trim()) return;
    const payload = {
      ...form,
      feature_key: form.feature_key.trim().toLowerCase().replace(/\s+/g, "-"),
      title_en: form.title_en?.trim() || null,
      free_detail_en: form.free_detail_en?.trim() || null,
      pro_detail_en: form.pro_detail_en?.trim() || null,
      sort_order: Number(form.sort_order) || 0,
      updated_at: new Date().toISOString(),
    };
    const result = editingId
      ? await supabase.from("app_feature_comparisons").update(payload).eq("id", editingId)
      : await supabase.from("app_feature_comparisons").upsert(payload, { onConflict: "app_id,feature_key" });
    setStatus(result.error ? `Error: ${result.error.message}` : "✓ Comparativa guardada");
    if (!result.error) {
      setForm({ ...emptyComparisonForm, app_id: selectedAppId });
      setEditingId(null);
      loadRows();
    }
  };

  const remove = async (id: string) => {
    if (!canEdit || !window.confirm("¿Eliminar esta fila comparativa?")) return;
    const { error } = await supabase.from("app_feature_comparisons").delete().eq("id", id);
    setStatus(error ? `Error: ${error.message}` : "✓ Fila eliminada");
    if (!error) loadRows();
  };

  const selectedApp = apps.find((app) => app.id === selectedAppId);
  const setField = <K extends keyof FeatureComparisonForm>(key: K, value: FeatureComparisonForm[K]) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><h2 className="text-xl font-bold text-[var(--color-ink)]">Comparativas Free / Premium</h2><p className="mt-1 max-w-2xl text-sm leading-6 text-[var(--color-graphite)]">Edita en detalle qué ofrece cada plan. Estas filas alimentan la tabla localizada que aparece en cada página de producto.</p></div><Rows3 className="text-[var(--color-brand-blue)]" size={22} /></div>
      </div>
      {status && <div className={`rounded-lg border px-4 py-3 text-sm ${status.startsWith("Error") ? "border-red-500/20 bg-red-500/10 text-red-500" : "border-green-500/20 bg-green-500/10 text-green-600"}`}>{status}</div>}
      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-5 shadow-soft"><label className="grid max-w-xl gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Producto<select value={selectedAppId} onChange={(event) => { setSelectedAppId(event.target.value); setForm({ ...emptyComparisonForm, app_id: event.target.value }); setEditingId(null); }} className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30">{apps.map((app) => <option key={app.id} value={app.id}>{app.name} · /{app.slug}</option>)}</select></label></div>
      {canEdit && <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft">
        <h3 className="mb-4 text-sm font-bold text-[var(--color-ink)]">{editingId ? "Editar fila" : `Nueva fila${selectedApp ? ` · ${selectedApp.name}` : ""}`}</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Clave interna<input value={form.feature_key} onChange={(event) => setField("feature_key", event.target.value)} placeholder="advanced-analytics" className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)]" /></label>
          <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Orden<input type="number" value={form.sort_order} onChange={(event) => setField("sort_order", Number(event.target.value))} className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)]" /></label>
          <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Título (ES)<input value={form.title} onChange={(event) => setField("title", event.target.value)} className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)]" /></label>
          <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Título (EN)<input value={form.title_en ?? ""} onChange={(event) => setField("title_en", event.target.value)} className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)]" /></label>
          <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Estado Free<select value={form.free_status} onChange={(event) => setField("free_status", event.target.value as FeatureComparisonForm["free_status"])} className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)]">{comparisonStatuses.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
          <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Estado Premium<select value={form.pro_status} onChange={(event) => setField("pro_status", event.target.value as FeatureComparisonForm["pro_status"])} className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)]">{comparisonStatuses.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
          <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Detalle Free (ES)<textarea value={form.free_detail} onChange={(event) => setField("free_detail", event.target.value)} className="min-h-24 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm font-normal text-[var(--color-ink)]" /></label>
          <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Detalle Free (EN)<textarea value={form.free_detail_en ?? ""} onChange={(event) => setField("free_detail_en", event.target.value)} className="min-h-24 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm font-normal text-[var(--color-ink)]" /></label>
          <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Detalle Premium (ES)<textarea value={form.pro_detail} onChange={(event) => setField("pro_detail", event.target.value)} className="min-h-24 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm font-normal text-[var(--color-ink)]" /></label>
          <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">Detalle Premium (EN)<textarea value={form.pro_detail_en ?? ""} onChange={(event) => setField("pro_detail_en", event.target.value)} className="min-h-24 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm font-normal text-[var(--color-ink)]" /></label>
        </div>
        <label className="mt-4 flex items-center gap-2 text-xs font-semibold text-[var(--color-ink)]"><input type="checkbox" checked={form.is_enabled} onChange={(event) => setField("is_enabled", event.target.checked)} /> Visible en la landing</label>
        <div className="mt-5 flex gap-3"><button onClick={save} disabled={!selectedAppId || loading} className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand-blue)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50" type="button"><Save size={14} /> {editingId ? "Actualizar fila" : "Guardar fila"}</button>{editingId && <button onClick={() => { setEditingId(null); setForm({ ...emptyComparisonForm, app_id: selectedAppId }); }} className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)]" type="button"><X size={14} /> Cancelar</button>}</div>
      </div>}
      <div className="grid gap-4">
        {loading ? <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 text-sm text-[var(--color-graphite)]">Cargando comparativa...</div> : rows.map((row) => <article key={row.id} className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-5 shadow-soft"><div className="flex items-start justify-between gap-4"><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold text-[var(--color-ink)]">{row.title}</h3><span className="rounded-full bg-[var(--color-brand-blue)]/10 px-2 py-0.5 text-[10px] font-bold uppercase text-[var(--color-brand-blue)]">{row.feature_key}</span>{!row.is_enabled && <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-600">oculta</span>}</div><p className="mt-1 text-xs text-[var(--color-graphite)]">Free: {row.free_status} · Premium: {row.pro_status}</p></div>{canEdit && <div className="flex gap-3"><button onClick={() => { setForm({ ...row, title_en: row.title_en ?? "", free_detail_en: row.free_detail_en ?? "", pro_detail_en: row.pro_detail_en ?? "" }); setEditingId(row.id); }} className="text-xs font-semibold text-[var(--color-brand-blue)] hover:underline" type="button"><Edit3 size={13} className="mr-1 inline" />Editar</button><button onClick={() => remove(row.id)} className="text-xs font-semibold text-red-500 hover:underline" type="button"><Trash2 size={13} className="mr-1 inline" />Eliminar</button></div>}</div><div className="mt-4 grid gap-3 md:grid-cols-2"><div className="rounded-xl bg-[var(--color-bg)] p-4"><p className="text-[10px] font-black uppercase tracking-wider text-[var(--color-graphite)]">Free · {row.free_status}</p><p className="mt-2 text-sm leading-6 text-[var(--color-graphite)]">{row.free_detail}</p></div><div className="rounded-xl bg-[var(--color-brand-blue)]/[.05] p-4"><p className="text-[10px] font-black uppercase tracking-wider text-[var(--color-brand-blue)]">Premium · {row.pro_status}</p><p className="mt-2 text-sm leading-6 text-[var(--color-graphite)]">{row.pro_detail}</p></div></div></article>)}
        {!loading && !rows.length && <div className="rounded-2xl border border-dashed border-[var(--color-line)] p-8 text-center text-sm text-[var(--color-graphite)]">No hay filas para este producto. Crea la primera arriba o aplica la migración de Supabase.</div>}
      </div>
    </div>
  );
}

const defaultSiteSettings: SiteSetting[] = [
  { key: "hero_show_badges", value: "true", value_type: "boolean", label: "Mostrar badges del hero", label_en: "Show hero badges", description: "Activa o desactiva los badges flotantes del showcase de vídeo.", is_public: true },
  { key: "hero_video_rotation_ms", value: "6500", value_type: "number", label: "Intervalo de rotación del hero (ms)", label_en: "Hero rotation interval (ms)", description: "Tiempo entre previews de producto. Mínimo recomendado: 3000 ms.", is_public: true },
  { key: "landing_show_metrics", value: "true", value_type: "boolean", label: "Mostrar métricas de landing", label_en: "Show landing metrics", description: "Controla la franja de métricas situada bajo el hero.", is_public: true },
  { key: "landing_show_campaigns", value: "true", value_type: "boolean", label: "Mostrar anuncios y encuestas", label_en: "Show campaigns and surveys", description: "Controla los módulos de engagement configurables de la landing.", is_public: true },
  { key: "landing_default_audience", value: "product", value_type: "text", label: "Audiencia inicial", label_en: "Default audience", description: "Audiencia seleccionada al cargar la landing: product o service.", is_public: true },
];

function SectionLandingSettings({ supabase, canEdit }: { supabase: SupabaseClient; canEdit: boolean }) {
  const [settings, setSettings] = useState<SiteSetting[]>(defaultSiteSettings);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data } = await supabase.from("site_settings").select("*").order("key");
    const fetched = (data ?? []) as SiteSetting[];
    setSettings(defaultSiteSettings.map((fallback) => fetched.find((item) => item.key === fallback.key) ?? fallback));
  }, [supabase]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  const save = async (setting: SiteSetting) => {
    if (!canEdit) return;
    setSaving(setting.key);
    const { error } = await supabase.from("site_settings").upsert({ ...setting, updated_at: new Date().toISOString() }, { onConflict: "key" });
    setStatus(error ? `Error: ${error.message}` : `✓ ${setting.label} guardado`);
    setSaving(null);
    if (!error) load();
  };

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft"><div className="flex items-start justify-between gap-4"><div><h2 className="text-xl font-bold text-[var(--color-ink)]">Configuración general de landing</h2><p className="mt-1 max-w-2xl text-sm leading-6 text-[var(--color-graphite)]">Ajusta comportamiento y visibilidad de superficies globales sin tocar código. Solo se publican las opciones marcadas como públicas.</p></div><Settings2 className="text-[var(--color-brand-blue)]" size={22} /></div></div>
      {status && <div className={`rounded-lg border px-4 py-3 text-sm ${status.startsWith("Error") ? "border-red-500/20 bg-red-500/10 text-red-500" : "border-green-500/20 bg-green-500/10 text-green-600"}`}>{status}</div>}
      <div className="grid gap-4">
        {settings.map((setting, index) => <div key={setting.key} className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-5 shadow-soft"><div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div className="min-w-0 flex-1"><label className="grid gap-1.5 text-sm font-bold text-[var(--color-ink)]">{setting.label}<span className="text-xs font-normal text-[var(--color-graphite)]">{setting.description}</span>{setting.value_type === "boolean" ? <select value={setting.value} onChange={(event) => setSettings((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, value: event.target.value } : item))} disabled={!canEdit} className="mt-1 max-w-xs rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm font-normal text-[var(--color-ink)]"><option value="true">Activado</option><option value="false">Desactivado</option></select> : <input type={setting.value_type === "number" ? "number" : "text"} value={setting.value} onChange={(event) => setSettings((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, value: event.target.value } : item))} disabled={!canEdit} className="mt-1 max-w-md rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm font-normal text-[var(--color-ink)]" />}</label><code className="mt-3 block text-[10px] text-[var(--color-graphite)]">{setting.key} · {setting.value_type}</code></div><div className="flex items-center gap-4"><label className="flex items-center gap-2 text-xs font-semibold text-[var(--color-ink)]"><input type="checkbox" checked={setting.is_public} onChange={(event) => setSettings((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, is_public: event.target.checked } : item))} disabled={!canEdit} /> Pública</label>{canEdit && <button onClick={() => save(setting)} disabled={saving === setting.key} className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand-blue)] px-3 py-2 text-xs font-bold text-white disabled:opacity-50" type="button"><Save size={13} /> {saving === setting.key ? "Guardando" : "Guardar"}</button>}</div></div></div>)}
      </div>
    </div>
  );
}

// ─── Section: User Reviews ────────────────────────────────────────

function SectionReviewSubmissions({ supabase, canEdit }: { supabase: SupabaseClient; canEdit: boolean }) {
  const [items, setItems] = useState<ReviewSubmission[]>([]);
  const [status, setStatus] = useState("");

  const load = useCallback(async () => {
    const { data } = await supabase.from("app_review_submissions").select("*").order("created_at", { ascending: false });
    setItems((data ?? []) as ReviewSubmission[]);
  }, [supabase]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  const moderate = async (item: ReviewSubmission, nextStatus: "published" | "rejected") => {
    if (!canEdit) return;
    if (nextStatus === "published") {
      const { error } = await supabase.from("app_reviews").upsert({
        app_slug: item.app_slug,
        source: "web",
        external_id: item.id,
        author: item.display_name,
        rating: item.rating,
        title: item.title,
        content: item.content,
        locale: item.locale,
        market: "web",
        review_date: item.created_at.slice(0, 10),
        is_published: true
      }, { onConflict: "app_slug,source,external_id" });
      if (error) {
        setStatus(`Error al publicar: ${error.message}`);
        return;
      }
    }
    const { error } = await supabase.from("app_review_submissions").update({ status: nextStatus, moderated_at: new Date().toISOString() }).eq("id", item.id);
    setStatus(error ? `Error: ${error.message}` : (nextStatus === "published" ? "✓ Reseña publicada" : "✓ Reseña rechazada"));
    load();
  };

  const remove = async (id: string) => {
    if (!canEdit || !confirm("¿Eliminar esta reseña enviada?")) return;
    await supabase.from("app_review_submissions").delete().eq("id", id);
    load();
  };

  const statusClass: Record<string, string> = {
    pending: "bg-amber-500/10 text-amber-600",
    published: "bg-green-500/10 text-green-600",
    rejected: "bg-red-500/10 text-red-500"
  };

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft">
        <h2 className="text-xl font-bold text-[var(--color-ink)]">Reseñas enviadas desde la web</h2>
        <p className="mt-1 text-sm text-[var(--color-graphite)]">Revisa cada reseña antes de publicarla en la ficha del producto.</p>
      </div>
      {status && <div className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-600">{status}</div>}
      {items.length === 0 && <p className="text-sm text-[var(--color-graphite)]">No hay reseñas enviadas todavía.</p>}
      {items.map((item) => (
        <article key={item.id} className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-5 shadow-soft">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusClass[item.status] ?? ""}`}>{item.status}</span>
              <span className="text-xs font-bold text-[var(--color-brand-blue)]">{item.app_slug}</span>
              <span className="text-xs text-[var(--color-graphite)]">{item.locale}</span>
              <span className="flex items-center gap-0.5 text-amber-400">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={12} className={index < item.rating ? "fill-amber-400" : "text-slate-300"} />)}</span>
            </div>
            {canEdit && <div className="flex gap-2">
              {item.status === "pending" && <>
                <button type="button" onClick={() => moderate(item, "published")} className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-2.5 py-1.5 text-xs font-bold text-white"><CheckCircle2 size={13} /> Publicar</button>
                <button type="button" onClick={() => moderate(item, "rejected")} className="inline-flex items-center gap-1 rounded-lg border border-red-500/30 px-2.5 py-1.5 text-xs font-bold text-red-500"><EyeOff size={13} /> Rechazar</button>
              </>}
              <button type="button" onClick={() => remove(item.id)} className="rounded-lg p-1.5 text-[var(--color-graphite)] hover:bg-red-500/10 hover:text-red-500"><Trash2 size={14} /></button>
            </div>}
          </div>
          <h3 className="mt-4 text-base font-bold text-[var(--color-ink)]">{item.title || "(Sin título)"}</h3>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[var(--color-graphite)]">{item.content}</p>
          <div className="mt-4 flex flex-wrap gap-3 border-t border-[var(--color-line)] pt-3 text-xs text-[var(--color-graphite)]">
            <span>{item.display_name}</span>
            {item.email && <a href={`mailto:${item.email}`} className="text-[var(--color-brand-blue)] hover:underline">{item.email}</a>}
            <span>{new Date(item.created_at).toLocaleString("es")}</span>
          </div>
        </article>
      ))}
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

  // eslint-disable-next-line react-hooks/set-state-in-effect
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

  // eslint-disable-next-line react-hooks/set-state-in-effect
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
