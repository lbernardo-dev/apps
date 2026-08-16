// Sincronización opcional del marketplace con la API de AliExpress (Affiliate Product Get).
//
// Requiere en .env.local (marcado como *.local, nunca se commitea):
//   ALIEXPRESS_APP_KEY, ALIEXPRESS_APP_SECRET, ALIEXPRESS_TRACKING_ID
//   ALIEXPRESS_ACCESS_TOKEN                     ← si la API pide autorización OAuth
//   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
//
// Uso:
//   npm run sync:marketplace                     # refresca los product_id ya guardados
//   npm run sync:marketplace -- 3256800XXXXX     # AÑADE/fetch product_ids concretos
//   ALIEXPRESS_PRODUCT_IDS=3256800XXXXX,3256800YYYY npm run sync:marketplace
//
// Si no hay credenciales, el script aborta con una nota: la API de afiliados de AliExpress
// puede requerir alta en el programa de afiliados. Mientras tanto, los productos se pueden
// vincular manualmente desde el panel de administración.

import { createClient } from "@supabase/supabase-js";
import {
  callAliexpressApi,
  readCredsFromEnv,
  unwrapProductResults,
} from "../lib/aliexpress-client";
import type { ApiParam } from "../lib/aliexpress-client";

const IDS_LIMIT = 40;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

function mapApiProduct(p: Record<string, unknown>): Record<string, unknown> {
  const gallery: string[] = String(p["product_small_image_urls"] ?? "")
    .split("||")
    .filter(Boolean);
  const salePrice = p["target_sale_price"] ?? p["sale_price"] ?? p["app_sale_price"];
  const originalPrice = p["target_original_price"] ?? p["original_price"];
  const s = salePrice != null ? Number(salePrice) : null;
  const o = originalPrice != null ? Number(originalPrice) : null;
  const discount =
    p["discount"] != null
      ? Number(p["discount"])
      : s != null && o != null && o > 0
      ? Math.round(((o - s) / o) * 100)
      : 0;

  const categories = (p["product_categories"] as { category_name?: string }[] | undefined) ?? [];
  const categoryName = categories.map((c) => c.category_name).filter(Boolean).pop();

  return {
    product_id: String(p["product_id"] ?? ""),
    source: "api",
    title: String(p["product_title"] ?? ""),
    title_en: String(p["product_title"] ?? "") || null,
    category: categoryName ?? "Otros",
    description: String(p["product_description"] ?? "") || null,
    description_en: null,
    original_price: o,
    sale_price: s,
    currency: String(p["target_sale_price_currency"] ?? p["sale_price_currency"] ?? "EUR"),
    discount,
    commission_rate: p["commission_rate"] != null ? Number(p["commission_rate"]) : null,
    evaluate_rate: p["evaluate_rate"] != null ? Number(p["evaluate_rate"]) : null,
    volume:
      p["total_orders"] != null
        ? Number(p["total_orders"])
        : p["volume"] != null
        ? Number(p["volume"])
        : null,
    image_url: String(p["product_main_image_url"] ?? gallery[0] ?? ""),
    product_url: String(p["product_detail_url"] ?? p["promotion_link"] ?? ""),
    promotion_link: String(p["promotion_link"] ?? "") || null,
    synced_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

async function main() {
  const creds = readCredsFromEnv();

  if (!creds.appKey || !creds.appSecret) {
    console.error(
      "\n[marketplace] Sin credenciales de AliExpress (ALIEXPRESS_APP_KEY / ALIEXPRESS_APP_SECRET).\n" +
        "La API de afiliados de AliExpress puede requerir acceso al programa de afiliados (ver scripts/test-aliexpress-api.ts).\n" +
        "Mientras tanto puedes vincular productos manualmente desde /admin > Marketplace.\n"
    );
    process.exit(1);
  }
  if (!supabaseUrl || !serviceRoleKey) {
    console.error("[marketplace] Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
    process.exit(1);
  }

  const admin = createClient(supabaseUrl, serviceRoleKey);

  let ids: string[] = process.argv.slice(2);
  if (ids.length === 0 && process.env.ALIEXPRESS_PRODUCT_IDS) {
    ids = process.env.ALIEXPRESS_PRODUCT_IDS.split(",").map((s) => s.trim()).filter(Boolean);
  }
  if (ids.length === 0) {
    const { data } = await admin.from("marketplace_products").select("product_id").not("product_id", "is", null);
    ids = (data ?? []).map((r) => r.product_id as string).filter(Boolean);
  }
  if (ids.length === 0) {
    console.error("[marketplace] No hay product_ids. Pásalos como argumento o añade un producto manual primero.");
    process.exit(1);
  }

  const uniqueIds = Array.from(new Set(ids));
  let updated = 0;
  let failed = 0;

  for (let i = 0; i < uniqueIds.length; i += IDS_LIMIT) {
    const batch = uniqueIds.slice(i, i + IDS_LIMIT);
    const apiParams: Record<string, ApiParam> = {
      product_ids: batch.join(","),
      country: "ES",
      target_currency: "EUR",
      target_language: "es",
      local_currency: "EUR",
      local_language: "ES",
      ...(creds.trackingId ? { tracking_id: creds.trackingId } : {}),
    };

    try {
      const body = await callAliexpressApi(
        creds,
        "aliexpress.affiliate.productdetail.get",
        apiParams
      );
      const { products, error } = unwrapProductResults(body);
      if (error) {
        console.warn(`[marketplace] Batch ${i / IDS_LIMIT + 1} → ${error}`);
        failed += batch.length;
        continue;
      }
      if (products.length === 0) {
        console.warn(`[marketplace] Batch ${i / IDS_LIMIT + 1}: 0 productos devueltos (¿API no autorizada o IDs inválidos?).`);
        failed += batch.length;
        continue;
      }
      for (const p of products) {
        const row = mapApiProduct(p);
        const { error: saveError } = await admin
          .from("marketplace_products")
          .upsert(row, { onConflict: "product_id" });
        if (saveError) {
          console.error(`[marketplace] Error al guardar ${row.product_id}: ${saveError.message}`);
          failed += 1;
        } else {
          updated += 1;
          console.log(`[marketplace] ✓ ${row.title}`);
        }
      }
      if (!creds.accessToken) {
        console.warn(
          "\n[marketplace] Nota: sin ALIEXPRESS_ACCESS_TOKEN algunos métodos piden autorización OAuth.\n" +
            "Si los batches fallan con error de token, autoriza la app en el portal y añade esa variable."
        );
      }
    } catch (err) {
      console.error(`[marketplace] Fallo en batch:`, (err as Error).message);
      failed += batch.length;
    }
  }

  console.log(`\n[marketplace] Sincronización completada: ${updated} actualizados, ${failed} fallidos.`);
}

main().catch((err) => {
  console.error("[marketplace] Error fatal:", err);
  process.exit(1);
});