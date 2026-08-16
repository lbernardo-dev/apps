// Verificación de acceso a la API de afiliados de AliExpress.
// Comprueba que las credenciales de .env.local funcionan y recupera productos reales.
//
// Requiere en .env.local (marcado como *.local, nunca se commitea):
//   ALIEXPRESS_APP_KEY, ALIEXPRESS_APP_SECRET, ALIEXPRESS_TRACKING_ID
//   ALIEXPRESS_ACCESS_TOKEN   ← requerido si la API pide autorización OAuth
//   (opcional) ALIEXPRESS_ENDPOINT=rest|sync  (por defecto rest, el oficial)
//
// Uso: npm run test:aliexpress [keyword]
import {
  callAliexpressApi,
  readCredsFromEnv,
  unwrapProductResults,
} from "../lib/aliexpress-client";

const METHOD = "aliexpress.affiliate.product.query";
const keyword = process.argv[2] ?? "smart watch";

async function main() {
  const creds = readCredsFromEnv();
  console.log("── Verificación API de afiliados AliExpress ──────────────");
  console.log(`Método: ${METHOD}`);
  console.log(`Endpoint: ${creds.endpoint}`);
  console.log(`Región: ${creds.region}`);
  console.log(`Tracking ID: ${creds.trackingId || "(vacío)"}`);
  console.log(`Access token: ${creds.accessToken ? "proporcionado" : "(vacío — se intentará solo con firma)"}`);

  if (!creds.appKey || !creds.appSecret) {
    console.error("\n✗ Falta ALIEXPRESS_APP_KEY o ALIEXPRESS_APP_SECRET en .env.local.");
    console.error("  Guía para generarlas: abre una app 'Affiliates API' en el portal de afiliados.");
    process.exit(1);
  }

  const apiParams: Record<string, unknown> = {
    key_words: keyword,
    country: "ES",
    target_currency: "EUR",
    target_language: "es",
    local_currency: "EUR",
    local_language: "ES",
    page_no: "1",
    ...(creds.trackingId ? { tracking_id: creds.trackingId } : {}),
  };

  const body = await callAliexpressApi(creds, METHOD, apiParams);
  const { products, error } = unwrapProductResults(body);

  if (error) {
    console.error(`\n✗ ${error}`);
    console.error("\nPistas:");
    if (error.toLowerCase().includes("token") || error.toLowerCase().includes("auth")) {
      console.error("  → La API pide access_token OAuth. En App Management (portal afiliados), autoriza la app\n    con tu cuenta y guarda el token como ALIEXPRESS_ACCESS_TOKEN.");
    }
    if (error.toLowerCase().includes("sign") || error.toLowerCase().includes("signature")) {
      console.error("  → Firma inválida: revisa app_secret/app_key, o prueba ALIEXPRESS_ENDPOINT=sync.");
    }
    process.exit(1);
  }

  console.log(`\n✓ Credenciales válidas. Resultados para "${keyword}": ${products.length}`);
  console.table(
    products.slice(0, 5).map((p) => ({
      title: String(p["product_title"] ?? "").slice(0, 45),
      price: `${p["target_sale_price"] ?? p["sale_price"] ?? "?"} ${p["target_sale_price_currency"] ?? p["sale_price_currency"] ?? ""}`,
      rating: p["evaluate_rate"] ?? "?",
      orders: p["total_orders"] ?? "?",
      discount: p["discount"] ?? "?",
      commission: p["commission_rate"] != null ? `${p["commission_rate"]}%` : "?",
      "promotion link": p["promotion_link"] ? "sí ✓" : "no",
    }))
  );

  const sample = products[0];
  if (sample) {
    console.log("\n── Muestra de campos devueltos (fotos y descripción disponibles) ──");
    console.log("product_id:", sample["product_id"]);
    console.log("main_image:", String(sample["product_main_image_url"] ?? "").slice(0, 90) + "…");
    const galleryCount = String(sample["product_small_image_urls"] ?? "")
      .split("||")
      .filter(Boolean).length;
    console.log("galería:", galleryCount ? `${galleryCount} imágenes` : "—");
    console.log("detail_url:", String(sample["product_detail_url"] ?? "").slice(0, 90) + "…");
  }

  console.log("\nSi esto funciona, ya puedes sincronizar el marketplace:\n  npm run sync:marketplace -- <productId1> <productId2> ...");
}

main().catch((err) => {
  console.error("Error:", (err as Error).message);
  process.exit(1);
});