import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "./supabase";

// Los datos siempre proceden de Supabase (marketplace_products), poblada de forma manual
// desde el panel de administración o sincronizada desde la API de AliExpress.
// No existe ningún fallback hardcodeado: sin datos en la tabla, la página vacía.

export type MarketplaceProduct = {
  id: string;
  product_id?: string | null;
  source: "manual" | "api" | "extension";
  title: string;
  title_en?: string | null;
  category: string;
  description?: string | null;
  description_en?: string | null;
  original_price?: number | null;
  sale_price?: number | null;
  currency: string;
  discount: number;
  commission_rate?: number | null;
  evaluate_rate?: number | null;
  volume?: number | null;
  image_url?: string | null;
  product_url: string;
  promotion_link?: string | null;
  status: "active" | "hidden";
  featured: boolean;
  sort_order: number;
  synced_at?: string | null;
  updated_at?: string | null;
};

export function normalizeProduct(row: Record<string, unknown>): MarketplaceProduct {
  return {
    id: String(row.id ?? ""),
    product_id: row.product_id ? String(row.product_id) : null,
    source: (row.source ?? "manual") === "api" ? "api" : (row.source ?? "manual") === "extension" ? "extension" : "manual",
    title: String(row.title ?? ""),
    title_en: row.title_en ? String(row.title_en) : null,
    category: String(row.category ?? "Otros"),
    description: row.description ? String(row.description) : null,
    description_en: row.description_en ? String(row.description_en) : null,
    original_price: coerceNumber(row.original_price),
    sale_price: coerceNumber(row.sale_price),
    currency: String(row.currency ?? "EUR"),
    discount: toInt(row.discount, 0),
    commission_rate: coerceNumber(row.commission_rate),
    evaluate_rate: coerceNumber(row.evaluate_rate),
    volume: row.volume != null ? toInt(row.volume, 0) : null,
    image_url: row.image_url ? String(row.image_url) : null,
    product_url: String(row.product_url ?? ""),
    promotion_link: row.promotion_link ? String(row.promotion_link) : null,
    status: row.status === "hidden" ? "hidden" : "active",
    featured: Boolean(row.featured),
    sort_order: toInt(row.sort_order, 0),
    synced_at: row.synced_at ? String(row.synced_at) : null,
    updated_at: row.updated_at ? String(row.updated_at) : null
  };
}

function coerceNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function toInt(value: unknown, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
}

function productSortKey(a: MarketplaceProduct, b: MarketplaceProduct): number {
  if (a.featured !== b.featured) return a.featured ? -1 : 1;
  return (b.sort_order ?? 0) - (a.sort_order ?? 0);
}

export function sortProducts(products: MarketplaceProduct[]): MarketplaceProduct[] {
  return [...products].sort(productSortKey);
}

// Uso en build (SSG): crea un cliente efímero con las env de Supabase.
export async function getMarketplaceProducts(limit = 500): Promise<MarketplaceProduct[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return [];

  try {
    const client = createClient(url, anonKey);
    const rows = await fetchActiveProducts(client, limit);
    return sortProducts(rows);
  } catch (err) {
    console.error("Marketplace build fetch failed:", err);
    return [];
  }
}

// Uso en cliente (componentes con "use client"): re-consulta para mostrar
// los productos añadidos manualmente sin necesidad de re-desplegar.
export async function getMarketplaceProductsClient(limit = 500): Promise<MarketplaceProduct[]> {
  const client = getSupabaseBrowserClient();
  if (!client) return [];
  try {
    const rows = await fetchActiveProducts(client, limit);
    return sortProducts(rows);
  } catch (err) {
    console.error("Marketplace client fetch failed:", err);
    return [];
  }
}

async function fetchActiveProducts(client: SupabaseClient, limit: number): Promise<MarketplaceProduct[]> {
  const { data, error } = await client
    .from("marketplace_products")
    .select("*")
    .eq("status", "active")
    .order("sort_order", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching marketplace products:", error);
    return [];
  }
  return (data as Record<string, unknown>[]).map(normalizeProduct);
}

export type PublicMarketplaceSettings = {
  app_key: string;
  tracking_id: string;
  currency: string;
  language: string;
  ship_to_country: string;
  is_enabled: boolean;
};

const DEFAULT_SETTINGS: PublicMarketplaceSettings = {
  app_key: "",
  tracking_id: "",
  currency: "EUR",
  language: "ES",
  ship_to_country: "ES",
  is_enabled: true
};

export async function getMarketplaceSettings(client?: SupabaseClient): Promise<PublicMarketplaceSettings> {
  const sb = client ?? (typeof window !== "undefined" ? getSupabaseBrowserClient() : null);
  if (!sb) return DEFAULT_SETTINGS;

  try {
    const { data } = await sb
      .from("marketplace_settings")
      .select("app_key, tracking_id, currency, language, ship_to_country, is_enabled")
      .limit(1)
      .maybeSingle();

    if (data) {
      return {
        app_key: String(data.app_key ?? ""),
        tracking_id: String(data.tracking_id ?? ""),
        currency: String(data.currency ?? "EUR"),
        language: String(data.language ?? "ES"),
        ship_to_country: String(data.ship_to_country ?? "ES"),
        is_enabled: data.is_enabled !== false
      };
    }
  } catch (err) {
    console.error("Error fetching marketplace settings:", err);
  }
  return DEFAULT_SETTINGS;
}