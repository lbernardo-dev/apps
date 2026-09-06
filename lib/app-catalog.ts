import type { AppItem, AppLink, AppStatus } from "./types";

export type AppStatusMeta = {
  label: string;
  labelEn: string;
  description: string;
  descriptionEn: string;
  className: string;
};

export function getAppStatusMeta(status: AppStatus, locale: "es" | "en"): AppStatusMeta {
  const meta: Record<string, AppStatusMeta> = {
    published: {
      label: "Publicada",
      labelEn: "Published",
      description: "Disponible para descargar en el App Store.",
      descriptionEn: "Available to download from the App Store.",
      className: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
    },
    testing: {
      label: "En testing",
      labelEn: "In testing",
      description: "Build disponible para pruebas internas o TestFlight.",
      descriptionEn: "Build available for internal or TestFlight testing.",
      className: "border-sky-400/25 bg-sky-400/10 text-sky-200"
    },
    development: {
      label: "En desarrollo",
      labelEn: "In development",
      description: "Producto en construcción; puedes seguir su evolución.",
      descriptionEn: "Product in progress; you can follow its evolution.",
      className: "border-amber-300/25 bg-amber-300/10 text-amber-100"
    },
    coming_soon: {
      label: "En preparación",
      labelEn: "In preparation",
      description: "Producto en preparación; puedes seguir su evolución.",
      descriptionEn: "Product in preparation; you can follow its evolution.",
      className: "border-amber-300/25 bg-amber-300/10 text-amber-100"
    },
    draft: {
      label: "Borrador",
      labelEn: "Draft",
      description: "Ficha interna todavía no publicada.",
      descriptionEn: "Internal product record not yet published.",
      className: "border-slate-400/25 bg-slate-400/10 text-slate-200"
    },
    archived: {
      label: "Archivada",
      labelEn: "Archived",
      description: "Producto archivado.",
      descriptionEn: "Archived product.",
      className: "border-slate-400/25 bg-slate-400/10 text-slate-200"
    }
  };
  const item = meta[status] ?? meta.development;
  return {
    ...item,
    label: locale === "es" ? item.label : item.labelEn,
    description: locale === "es" ? item.description : item.descriptionEn
  };
}

export function getAppLink(app: Pick<AppItem, "links" | "appStoreUrl">, kind: AppLink["kind"]): AppLink | undefined {
  const link = app.links?.find((candidate) => candidate.kind === kind);
  if (link) return link;
  if (kind === "appstore" && app.appStoreUrl) {
    return {
      kind,
      label: "App Store",
      label_en: "App Store",
      url: app.appStoreUrl,
      isExternal: true
    };
  }
  return undefined;
}

export function getAppCompletionLabel(app: Pick<AppItem, "completeness">, locale: "es" | "en") {
  if (!app.completeness) return null;
  return locale === "es"
    ? `${app.completeness.score}% de ficha verificada`
    : `${app.completeness.score}% of the product record verified`;
}
