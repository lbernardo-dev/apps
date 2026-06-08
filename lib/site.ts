export const siteConfig = {
  name: "LB Apps",
  author: "Lester Romero Bernardo",
  description:
    "Portfolio profesional de apps iOS, catálogo de producto, soporte y páginas legales para apps publicadas.",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "lbernardo.pro@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://lbernardo-dev.github.io/apps"
};

export function absoluteUrl(path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath === "/" ? "" : normalizedPath}`;
}
