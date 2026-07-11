# Redirect Mapping Table: RomeroDev

This redirect map outlines how legacy URLs are routed to their new localized counterparts. Since the site is hosted on GitHub Pages (static export), these redirects are handled client-side using meta-refresh and language detection scripts.

---

## 1. Core Redirect Table

| Legacy Path (Apps / Root) | Target Path (Spanish) | Target Path (English) | Redirect Mechanism |
| :--- | :--- | :--- | :--- |
| `/` (Root Index) | `/es/` | `/en/` | Browser Language & Preference Detector |
| `/about/` | `/es/sobre-mi/` | `/en/about/` | Meta-Refresh + Local Storage Preference Check |
| `/contact/` | `/es/contacto/` | `/en/contact/` | Meta-Refresh + Local Storage Preference Check |
| `/privacy/` | `/es/privacidad/` | `/en/privacy/` | Meta-Refresh + Local Storage Preference Check |
| `/terms/` | `/es/terminos/` | `/en/terms/` | Meta-Refresh + Local Storage Preference Check |
| `/cookies/` | `/es/cookies/` | `/en/cookies/` | Meta-Refresh + Local Storage Preference Check |
| `/apps/` | `/es/productos/` | `/en/products/` | Meta-Refresh + Local Storage Preference Check |

---

## 2. Product Detail Redirect Table (Case Studies)

| Legacy Path (Apps / Root) | Target Path (Spanish) | Target Path (English) | Redirect Mechanism |
| :--- | :--- | :--- | :--- |
| `/apps/:slug/` | `/es/casos/:slug/` | `/en/case-studies/:slug/` | Meta-Refresh + Local Storage Preference Check |
| `/apps/:slug/support/` | `/es/casos/:slug/soporte/` | `/en/case-studies/:slug/support/` | Meta-Refresh + Local Storage Preference Check |
| `/apps/:slug/privacy/` | `/es/casos/:slug/privacidad/` | `/en/case-studies/:slug/privacy/` | Meta-Refresh + Local Storage Preference Check |
| `/apps/:slug/terms/` | `/es/casos/:slug/terminos/` | `/en/case-studies/:slug/terms/` | Meta-Refresh + Local Storage Preference Check |
| `/apps/:slug/subscriptions/` | `/es/casos/:slug/suscripciones/` | `/en/case-studies/:slug/subscriptions/` | Meta-Refresh + Local Storage Preference Check |
| `/apps/:slug/faq/` | `/es/casos/:slug/preguntas-frecuentes/` | `/en/case-studies/:slug/faq/` | Meta-Refresh + Local Storage Preference Check |

---

## 3. Dynamic Route Slug Translation Mappings

The following tables show slug equivalencies resolved dynamically by the navigation headers, footers, and language switchers:

### Services Slugs
* `desarrollo-ios` (ES) ↔ `ios-development` (EN)
* `consultoria-salesforce` (ES) ↔ `salesforce-consulting` (EN)
* `auditoria-de-apps` (ES) ↔ `app-audits` (EN)
* `diseno-de-producto` (ES) ↔ `product-design` (EN)
* `integraciones-y-automatizacion` (ES) ↔ `integrations-and-automation` (EN)

### Resources Slugs
* `optimizar-rendimiento-swiftui-listas` (ES) ↔ `optimize-swiftui-list-performance` (EN)
* `auditar-deuda-tecnica-salesforce` (ES) ↔ `audit-salesforce-technical-debt` (EN)
* `integrar-salesforce-sap-api` (ES) ↔ `integrate-salesforce-sap-api` (EN)
* `guia-publicacion-app-store` (ES) ↔ `app-store-publishing-guide` (EN)
* `disenar-app-ios-hig-apple` (ES) ↔ `design-ios-app-apple-hig` (EN)
