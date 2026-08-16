"use client";

import { useCallback, useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  Check,
  Edit3,
  Eye,
  EyeOff,
  ExternalLink,
  Plus,
  RefreshCw,
  Save,
  Settings2,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import type { MarketplaceProduct } from "@/lib/marketplace";
import { getMarketplaceSettings, normalizeProduct } from "@/lib/marketplace";

type ProductForm = {
  product_id: string;
  source: "manual" | "api" | "extension";
  title: string;
  title_en: string;
  category: string;
  description: string;
  description_en: string;
  original_price: string;
  sale_price: string;
  currency: string;
  discount: string;
  commission_rate: string;
  evaluate_rate: string;
  volume: string;
  image_url: string;
  product_url: string;
  promotion_link: string;
  status: "active" | "hidden";
  featured: boolean;
  sort_order: string;
};

const emptyForm: ProductForm = {
  product_id: "",
  source: "manual",
  title: "",
  title_en: "",
  category: "",
  description: "",
  description_en: "",
  original_price: "",
  sale_price: "",
  currency: "EUR",
  discount: "0",
  commission_rate: "",
  evaluate_rate: "",
  volume: "",
  image_url: "",
  product_url: "",
  promotion_link: "",
  status: "active",
  featured: false,
  sort_order: "0",
};

type SettingsForm = {
  app_key: string;
  app_secret: string;
  tracking_id: string;
  currency: string;
  language: string;
  ship_to_country: string;
  max_products: string;
  is_enabled: boolean;
};

export function MarketplaceAdmin({ supabase, canEdit }: { supabase: SupabaseClient; canEdit: boolean }) {
  const [tab, setTab] = useState<"products" | "settings">("products");
  const [products, setProducts] = useState<MarketplaceProduct[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("marketplace_products")
      .select("*")
      .order("sort_order", { ascending: false });
    setProducts((data ?? []).map(normalizeProduct));
  }, [supabase]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  const notify = (error: { message: string } | null, ok: string) =>
    setStatus(error ? `Error: ${error.message}` : ok);

  const save = async () => {
    const payload = {
      product_id: form.product_id.trim() || null,
      source: form.source,
      title: form.title,
      title_en: form.title_en.trim() || null,
      category: form.category.trim() || "Otros",
      description: form.description.trim() || null,
      description_en: form.description_en.trim() || null,
      original_price: form.original_price.trim() ? Number(form.original_price) : null,
      sale_price: form.sale_price.trim() ? Number(form.sale_price) : null,
      currency: form.currency.trim() || "EUR",
      discount: Number(form.discount || 0),
      commission_rate: form.commission_rate.trim() ? Number(form.commission_rate) : null,
      evaluate_rate: form.evaluate_rate.trim() ? Number(form.evaluate_rate) : null,
      volume: form.volume.trim() ? Number(form.volume) : null,
      image_url: form.image_url.trim() || null,
      product_url: form.product_url,
      promotion_link: form.promotion_link.trim() || null,
      status: form.status,
      featured: form.featured,
      sort_order: Number(form.sort_order || 0),
      updated_at: new Date().toISOString(),
    };

    const { error } = editingId
      ? await supabase.from("marketplace_products").update(payload).eq("id", editingId)
      : await supabase.from("marketplace_products").insert(payload);

    notify(error, editingId ? "✓ Producto actualizado" : "✓ Producto añadido");
    setForm(emptyForm);
    setEditingId(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("¿Eliminar este producto?")) return;
    const { error } = await supabase.from("marketplace_products").delete().eq("id", id);
    notify(error, "✓ Producto eliminado");
    load();
  };

  const toggle = async (p: MarketplaceProduct, field: "status" | "featured") => {
    const { error } = await supabase
      .from("marketplace_products")
      .update({ [field]: field === "status" ? (p.status === "active" ? "hidden" : "active") : !p.featured, updated_at: new Date().toISOString() })
      .eq("id", p.id);
    notify(error, "✓ Actualizado");
    load();
  };

  const edit = (p: MarketplaceProduct) => {
    setForm({
      product_id: p.product_id ?? "",
      source: p.source,
      title: p.title,
      title_en: p.title_en ?? "",
      category: p.category,
      description: p.description ?? "",
      description_en: p.description_en ?? "",
      original_price: p.original_price?.toString() ?? "",
      sale_price: p.sale_price?.toString() ?? "",
      currency: p.currency,
      discount: String(p.discount ?? 0),
      commission_rate: p.commission_rate?.toString() ?? "",
      evaluate_rate: p.evaluate_rate?.toString() ?? "",
      volume: p.volume?.toString() ?? "",
      image_url: p.image_url ?? "",
      product_url: p.product_url,
      promotion_link: p.promotion_link ?? "",
      status: p.status,
      featured: p.featured,
      sort_order: String(p.sort_order ?? 0),
    });
    setEditingId(p.id);
    setTab("products");
  };

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[var(--color-ink)]">Marketplace</h2>
            <p className="mt-1 text-sm text-[var(--color-graphite)]">
              Vincula productos de AliExpress manualmente. Todo el contenido (título, precio, fotos, valoración) se guarda desde aquí o se sincroniza desde la API.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === "products" ? "bg-[var(--color-brand-blue)] text-white" : "border border-[var(--color-line)] text-[var(--color-graphite)] hover:text-[var(--color-ink)]"}`}
              onClick={() => setTab("products")}
              type="button"
            >
              <Plus size={14} className="mr-1.5 inline -mt-0.5" />
              Productos ({products.length})
            </button>
            <button
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === "settings" ? "bg-[var(--color-brand-blue)] text-white" : "border border-[var(--color-line)] text-[var(--color-graphite)] hover:text-[var(--color-ink)]"}`}
              onClick={() => setTab("settings")}
              type="button"
            >
              <Settings2 size={14} />
              API AliExpress
            </button>
          </div>
        </div>
      </div>

      {status && (
        <div className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-600 flex items-center gap-2">
          <Check size={15} /> {status}
        </div>
      )}

      {tab === "settings" ? (
        <SettingsSection supabase={supabase} notify={notify} />
      ) : (
        <>
          {/* Form */}
          {canEdit && (
            <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft">
              <h3 className="text-sm font-bold text-[var(--color-ink)] mb-4">{editingId ? "Editar producto" : "Vincular producto manualmente"}</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Título (ES)" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} placeholder="Auriculares inalámbricos ANC" required />
                <Field label="Título (EN)" value={form.title_en} onChange={(v) => setForm((f) => ({ ...f, title_en: v }))} placeholder="Wireless ANC earbuds" />
                <Field label="Categoría" value={form.category} onChange={(v) => setForm((f) => ({ ...f, category: v }))} placeholder="Auriculares" />
                <Field label="URL del producto (AliExpress)" value={form.product_url} onChange={(v) => setForm((f) => ({ ...f, product_url: v }))} placeholder="https://es.aliexpress.com/item/..." required type="url" />
              </div>
              <label className="mt-3 grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">
                Descripción (ES)
                <textarea
                  className="min-h-16 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)] font-normal focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30 resize-y"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                />
              </label>
              <label className="mt-3 grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">
                Descripción (EN)
                <textarea
                  className="min-h-16 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)] font-normal focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30 resize-y"
                  value={form.description_en}
                  onChange={(e) => setForm((f) => ({ ...f, description_en: e.target.value }))}
                />
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <Field label="URL imagen" value={form.image_url} onChange={(v) => setForm((f) => ({ ...f, image_url: v }))} placeholder="https://..." type="url" />
                <Field label="ID producto AliExpress" value={form.product_id} onChange={(v) => setForm((f) => ({ ...f, product_id: v }))} placeholder="3256800..." />
                <Field label="Enlace afiliado (promotion link)" value={form.promotion_link} onChange={(v) => setForm((f) => ({ ...f, promotion_link: v }))} placeholder="https://s.click.aliexpress.com/..." type="url" />
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-4">
                <Field label="Precio oferta" value={form.sale_price} onChange={(v) => setForm((f) => ({ ...f, sale_price: v }))} placeholder="27.49" type="number" />
                <Field label="Precio original" value={form.original_price} onChange={(v) => setForm((f) => ({ ...f, original_price: v }))} placeholder="49.99" type="number" />
                <Field label="Descuento (%)" value={form.discount} onChange={(v) => setForm((f) => ({ ...f, discount: v }))} placeholder="45" type="number" />
                <Field label="Moneda" value={form.currency} onChange={(v) => setForm((f) => ({ ...f, currency: v }))} placeholder="EUR" />
                <Field label="Valoración (0-5)" value={form.evaluate_rate} onChange={(v) => setForm((f) => ({ ...f, evaluate_rate: v }))} placeholder="4.8" type="number" />
                <Field label="Ventas estimadas" value={form.volume} onChange={(v) => setForm((f) => ({ ...f, volume: v }))} placeholder="12500" type="number" />
                <Field label="Comisión (%)" value={form.commission_rate} onChange={(v) => setForm((f) => ({ ...f, commission_rate: v }))} placeholder="8.5" type="number" />
                <Field label="Orden" value={form.sort_order} onChange={(v) => setForm((f) => ({ ...f, sort_order: v }))} placeholder="0" type="number" />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-6">
                <label className="flex items-center gap-2 text-xs font-semibold text-[var(--color-ink)] cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} className="accent-[var(--color-brand-blue)]" />
                  Destacado
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-[var(--color-ink)]">
                  Estado
                  <select
                    className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none"
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as ProductForm["status"] }))}
                  >
                    <option value="active">Activo (visible)</option>
                    <option value="hidden">Oculto</option>
                  </select>
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-[var(--color-ink)]">
                  Origen
                  <select
                    className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-ink)] focus:outline-none"
                    value={form.source}
                    onChange={(e) => setForm((f) => ({ ...f, source: e.target.value as ProductForm["source"] }))}
                  >
                    <option value="manual">Manual</option>
                    <option value="api">API</option>
                    <option value="extension">Extensión</option>
                  </select>
                </label>
              </div>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={save}
                  disabled={!form.title || !form.product_url}
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand-blue)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 hover:opacity-90 transition-opacity"
                  type="button"
                >
                  <Save size={14} /> {editingId ? "Actualizar producto" : "Añadir producto"}
                </button>
                {editingId && (
                  <button
                    onClick={() => { setForm(emptyForm); setEditingId(null); }}
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-bg)] transition-colors"
                    type="button"
                  >
                    <X size={14} /> Cancelar
                  </button>
                )}
              </div>
            </div>
          )}

          {/* List */}
          <div className="grid gap-4">
            {products.length === 0 && (
              <p className="rounded-2xl border border-dashed border-[var(--color-line)] bg-[var(--color-card)]/40 p-8 text-sm text-[var(--color-graphite)]">
                Aún no hay productos. Añade el primero desde el formulario superior.
              </p>
            )}
            {products.map((p) => (
              <div key={p.id} className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-5 shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  {p.image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image_url} alt="" className="size-16 rounded-xl object-cover border border-[var(--color-line)]" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${p.status === "active" ? "bg-green-500/10 text-green-600" : "bg-[var(--color-line)] text-[var(--color-graphite)]"}`}>
                        {p.status === "active" ? <Eye size={10} /> : <EyeOff size={10} />}
                        {p.status === "active" ? "Activo" : "Oculto"}
                      </span>
                      {p.featured && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-600">
                          <Sparkles size={10} /> Destacado
                        </span>
                      )}
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)]">
                        {p.source}
                      </span>
                    </div>
                    <h3 className="mt-2 font-bold text-[var(--color-ink)] line-clamp-2">{p.title}</h3>
                    <p className="mt-1 text-xs text-[var(--color-graphite)]">
                      {p.category} · {p.sale_price != null ? `${p.currency} ${p.sale_price}` : "Sin precio"}
                      {p.volume != null ? ` · ${p.volume} vendidos` : ""}
                      {p.evaluate_rate != null ? ` · ⭐ ${p.evaluate_rate}` : ""}
                    </p>
                    {p.product_url && (
                      <a href={p.product_url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs text-[var(--color-brand-blue)] hover:underline">
                        Abrir en AliExpress <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                  {canEdit && (
                    <div className="flex gap-1.5 shrink-0">
                      <button onClick={() => toggle(p, "status")} title={p.status === "active" ? "Ocultar" : "Mostrar"} className="p-1.5 rounded-lg hover:bg-[var(--color-bg)] text-[var(--color-graphite)] hover:text-[var(--color-ink)] transition-colors" type="button">
                        <RefreshCw size={14} />
                      </button>
                      <button onClick={() => toggle(p, "featured")} title="Alternar destacado" className="p-1.5 rounded-lg hover:bg-[var(--color-bg)] text-[var(--color-graphite)] hover:text-amber-500 transition-colors" type="button">
                        <Sparkles size={14} />
                      </button>
                      <button onClick={() => edit(p)} title="Editar" className="p-1.5 rounded-lg hover:bg-[var(--color-bg)] text-[var(--color-graphite)] hover:text-[var(--color-brand-blue)] transition-colors" type="button">
                        <Edit3 size={14} />
                      </button>
                      <button onClick={() => remove(p.id)} title="Eliminar" className="p-1.5 rounded-lg hover:bg-red-500/10 text-[var(--color-graphite)] hover:text-red-500 transition-colors" type="button">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-1.5 text-xs font-semibold text-[var(--color-ink)]">
      {label}
      <input
        type={type}
        required={required}
        className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function SettingsSection({
  supabase,
  notify,
}: {
  supabase: SupabaseClient;
  notify: (error: { message: string } | null, ok: string) => void;
}) {
  const [form, setForm] = useState<SettingsForm>({
    app_key: "",
    app_secret: "",
    tracking_id: "",
    currency: "EUR",
    language: "ES",
    ship_to_country: "ES",
    max_products: "200",
    is_enabled: true,
  });
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.from("marketplace_settings").select("*").limit(1).maybeSingle();
    if (data) {
      setForm({
        app_key: data.app_key ?? "",
        app_secret: data.app_secret ?? "",
        tracking_id: data.tracking_id ?? "",
        currency: data.currency ?? "EUR",
        language: data.language ?? "ES",
        ship_to_country: data.ship_to_country ?? "ES",
        max_products: String(data.max_products ?? 200),
        is_enabled: data.is_enabled !== false,
      });
    }
  }, [supabase]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("marketplace_settings").upsert(
      {
        id: "00000000-0000-0000-0000-000000000001",
        app_key: form.app_key,
        app_secret: form.app_secret,
        tracking_id: form.tracking_id,
        currency: form.currency,
        language: form.language,
        ship_to_country: form.ship_to_country,
        max_products: Number(form.max_products || 200),
        is_enabled: form.is_enabled,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );
    notify(error, "✓ Configuración guardada");
    setSaving(false);
  };

  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-soft">
      <h3 className="text-sm font-bold text-[var(--color-ink)]">Credenciales API de AliExpress</h3>
      <p className="mt-1 text-sm text-[var(--color-graphite)]">
        Se usan únicamente para el script de sincronización. No te preocupes si aún no tienes acceso a la API: puedes seguir vinculando productos manualmente.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Field label="App Key" value={form.app_key} onChange={(v) => setForm((f) => ({ ...f, app_key: v }))} />
        <Field label="App Secret" value={form.app_secret} onChange={(v) => setForm((f) => ({ ...f, app_secret: v }))} type="password" />
        <Field label="Tracking ID" value={form.tracking_id} onChange={(v) => setForm((f) => ({ ...f, tracking_id: v }))} />
        <Field label="Ship to Country" value={form.ship_to_country} onChange={(v) => setForm((f) => ({ ...f, ship_to_country: v }))} />
        <Field label="Moneda" value={form.currency} onChange={(v) => setForm((f) => ({ ...f, currency: v }))} />
        <Field label="Idioma" value={form.language} onChange={(v) => setForm((f) => ({ ...f, language: v }))} />
        <Field label="Máx. productos" value={form.max_products} onChange={(v) => setForm((f) => ({ ...f, max_products: v }))} type="number" />
      </div>
      <label className="mt-4 flex items-center gap-2 text-xs font-semibold text-[var(--color-ink)] cursor-pointer">
        <input type="checkbox" checked={form.is_enabled} onChange={(e) => setForm((f) => ({ ...f, is_enabled: e.target.checked }))} className="accent-[var(--color-brand-blue)]" />
        Marketplace habilitado
      </label>
      <button
        onClick={save}
        disabled={saving}
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand-blue)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 hover:opacity-90 transition-opacity"
        type="button"
      >
        <Settings2 size={14} /> {saving ? "Guardando..." : "Guardar configuración"}
      </button>
    </div>
  );
}