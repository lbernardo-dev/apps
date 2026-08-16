import { createHash } from "node:crypto";

// Cliente firmado para la API de afiliados de AliExpress (Open Platform).
// Usa los endpoints oficiales de la IO (Taobao/AliExpress Open Platform):
//   - Business interfaces (productos, enlaces, pedidos):
//       https://api-sg.aliexpress.com/rest{aliexpress.affiliate.*}
//   - System interfaces (solo auth/token):
//       https://api-sg.aliexpress.com/sync?method=...
// Si la respuesta indica que se requiere autorización, hay que incluir un
// access_token OAuth (ver portal de afiliados > App Management > Authorization).

export type AliexpressCreds = {
  appKey: string;
  appSecret: string;
  trackingId?: string;
  accessToken?: string;
  region?: string;
  endpoint?: "rest" | "sync";
};

export function nowTimestamp(): string {
  // La API espera hora GMT+8.
  return new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString().slice(0, 19).replace("T", " ");
}

function md5(input: string): string {
  return createHash("md5").update(input, "utf8").digest("hex");
}

export type ApiParam = string | number | boolean | Record<string, unknown> | null | undefined;

function buildRequest(
  creds: AliexpressCreds,
  method: string,
  apiParams: Record<string, ApiParam>
): { url: string; body: string | null } {
  const common: Record<string, string> = {
    app_key: creds.appKey,
    timestamp: nowTimestamp(),
    format: "json",
    v: "2.0",
    sign_method: "md5",
    method,
    api_parameter_sent: JSON.stringify(apiParams),
  };
  if (creds.accessToken) common["access_token"] = creds.accessToken;

  const keys = Object.keys(common).filter((k) => k !== "sign").sort();
  const concat = keys.map((k) => `${k}${common[k]}`).join("");
  const sign = md5(creds.appSecret + concat + creds.appSecret);
  const all: Record<string, string> = { ...common, sign };

  const region = creds.region ?? "api-sg.aliexpress.com";
  if (creds.endpoint === "sync") {
    // Legacy: GET al sistema con method en query.
    return { url: `https://${region}/sync?${new URLSearchParams(all).toString()}`, body: null };
  }
  // Business endpoint recomendado por la documentación actual.
  return {
    url: `https://${region}/rest${method}`,
    body: new URLSearchParams(all).toString(),
  };
}

export async function callAliexpressApi(
  creds: AliexpressCreds,
  method: string,
  apiParams: Record<string, ApiParam>
): Promise<Record<string, any>> {
  if (!creds.appKey || !creds.appSecret) {
    throw new Error("Faltan ALIEXPRESS_APP_KEY o ALIEXPRESS_APP_SECRET");
  }

  const { url, body } = buildRequest(creds, method, apiParams);
  const res = await fetch(url, {
    method: body ? "POST" : "GET",
    headers: body ? { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" } : undefined,
    body: body ?? undefined,
    signal: AbortSignal.timeout(30000),
  });

  if (!res.ok) throw new Error(`API respondió ${res.status}`);
  return (await res.json()) as Record<string, any>;
}

// Extrae los productos del response sea cual sea la estructura, y diagnostica errores.
export function unwrapProductResults(body: Record<string, any>): {
  products: Array<Record<string, unknown>>;
  error?: string;
} {
  if (body["error_response"]) {
    const err = Array.isArray(body["error_response"]) ? body["error_response"][0] : body["error_response"];
    return {
      products: [],
      error: `${err?.["code"] ?? "Error"} · ${err?.["msg"] ?? err?.["sub_msg"] ?? "desconocido"}`,
    };
  }

  const response =
    body["aliexpress_affiliate_productquery_response"] ??
    body["aliexpress_affiliate_productdetail_get_response"] ??
    body["aliexpress_affiliate_hotproduct_productquery_response"] ??
    {};
  const result = response["result"] ?? {};
  const products =
    result["products"]?.["product"] ??
    result["product_info_list"]?.extended_list ??
    [];
  return { products: Array.isArray(products) ? products : [] };
}

export function readCredsFromEnv(): AliexpressCreds {
  return {
    appKey: process.env.ALIEXPRESS_APP_KEY ?? "",
    appSecret: process.env.ALIEXPRESS_APP_SECRET ?? "",
    trackingId: process.env.ALIEXPRESS_TRACKING_ID ?? "",
    accessToken: process.env.ALIEXPRESS_ACCESS_TOKEN ?? "",
    region: process.env.ALIEXPRESS_REGION ?? "api-sg.aliexpress.com",
    endpoint: process.env.ALIEXPRESS_ENDPOINT === "sync" ? "sync" : "rest",
  };
}