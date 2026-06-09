export const siteConfig = {
  name: "LB Apps",
  author: "Lester Romero Bernardo",
  description:
    "Portfolio profesional de apps iOS, catálogo de producto, soporte y páginas legales para apps publicadas.",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "lbernardo.pro@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://lbernardo-dev.github.io/apps"
};

// Computes the base path with support for GitHub Pages subfolder
export const basePath = (() => {
  // Respect environmental variables if specified (Next.js env config)
  const envPath = process.env.NEXT_PUBLIC_BASE_PATH;
  if (envPath !== undefined) return envPath;

  // Fallback for Github Pages URL structure in the browser
  if (typeof window !== "undefined") {
    if (window.location.hostname.includes("github.io")) {
      const parts = window.location.pathname.split("/");
      if (parts[1] && parts[1] !== "") {
        return `/${parts[1]}`;
      }
    }
  }
  return "";
})();

// Returns the correct asset path including the base path prefix
export function getAssetPath(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (!basePath) return cleanPath;
  return `${basePath}${cleanPath}`;
}

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
