export const siteConfig = {
  name: "LB Apps",
  author: "Lester Romero Bernardo",
  description:
    "Portfolio profesional de apps iOS, catálogo de producto, soporte y páginas legales para apps publicadas.",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "lbernardo.pro@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://lbernardo-dev.github.io/apps"
};

export function absoluteUrl(path = "") {
  if (path === "/" || path === "") {
    return `${siteConfig.url}/`;
  }
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  
  // Check if it's a file path by looking for an extension (e.g. sitemap.xml)
  const hasExtension = /\.[a-z0-9]+$/i.test(normalizedPath);
  if (hasExtension) {
    return `${siteConfig.url}${normalizedPath}`;
  }
  
  // For directory paths, ensure they end with a trailing slash
  const suffix = normalizedPath.endsWith("/") ? "" : "/";
  return `${siteConfig.url}${normalizedPath}${suffix}`;
}
