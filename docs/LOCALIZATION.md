# Internationalization & Localization Architecture: RomeroDev

This guide explains how localization, multi-language routing, path translations, and legacy fallback redirections are structured in the RomeroDev application.

---

## 1. Localization Dictionary Files

The localization architecture is split into three layers to separate concerns:
1. **UI Translations ([lib/i18n.ts](file:///Users/romerosoft/Work/DESARROLLO/WEB/apps/lib/i18n.ts)):** Defines the standard dictionaries for static components (headers, footers, form labels, screenshot alt names). It exposes the `useLocale()` hook and the `t()` translator.
2. **Services Content ([lib/services-content.ts](file:///Users/romerosoft/Work/DESARROLLO/WEB/apps/lib/services-content.ts)):** Contains structured B2B copywriting texts for the 5 services (value propositions, lists, deliverables, process, and FAQs) in both languages.
3. **Resource Articles ([lib/resources-content.ts](file:///Users/romerosoft/Work/DESARROLLO/WEB/apps/lib/resources-content.ts)):** Contains titles, dates, excerpts, and full HTML body copy for the 5 initial guide articles.
4. **Product Metadata ([lib/content.ts](file:///Users/romerosoft/Work/DESARROLLO/WEB/apps/lib/content.ts)):** Defines features, descriptions, and faq sheets for individual apps like VitalsPath and StreakReps.

---

## 2. Dynamic Route Translation (`getEquivalentPath`)

When switching languages, the user should not be kicked back to the home page. The language switcher translates the current path to its equivalent in the target locale.

### Implementation details
The switcher calls `getEquivalentPath` defined in `lib/i18n.ts`, which leverages mapping utilities from `lib/routes.ts`:
* It parses the current pathname and extracts the section and dynamic slug.
* **Services Mapping:** Maps Spanish URLs to English equivalent paths (e.g. `/es/desarrollo-ios/` ↔ `/en/ios-development/`).
* **Static Mapping:** Maps `/es/contacto/` ↔ `/en/contact/`.
* **Resources Mapping:** Evaluates the list of articles to translate dynamic slugs (e.g. `/es/recursos/optimizar-rendimiento-swiftui-listas/` ↔ `/en/resources/optimize-swiftui-list-performance/`).
* **Case Studies Mapping:** Maps `/es/casos/vitalspath/` ↔ `/en/case-studies/vitalspath/` and translates subpage slugs (e.g. `/preguntas-frecuentes/` ↔ `/faq/`).

---

## 3. Language Switcher UI Component

The `LanguageSwitcher` component renders a link that points directly to the `targetPath` computed by the route translator.
* **Benefits:** 
  1. SEO-friendly: search engines can follow the switcher links to crawl both language trees.
  2. Instant transition: uses Next.js client-side navigation.

---

## 4. Legacy Redirection Anchors (GitHub Pages Fallback)

Since GitHub Pages is a static server, we cannot use server redirects (middleware or headers) to handle legacy URLs (like `/apps/vitalspath/` or `/about/`). 
We solve this by keeping the legacy folders and files in the App Router, and returning the `RedirectPage` component.

### How it works:
1. The static builder outputs an index file inside the legacy path (e.g. `/apps/vitalspath/index.html`).
2. The HTML contains a `<meta http-equiv="refresh">` pointing to the Spanish version by default.
3. A small inline JavaScript block runs instantly to check if the browser's language is English or if a previous language preference (`lb-locale`) is saved in `localStorage`.
4. It redirects the browser to the correct localized path (e.g., `/en/case-studies/vitalspath/`) instantly, minimizing layout flash.
