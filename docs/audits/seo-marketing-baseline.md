# Initial Technical SEO, Marketing and Conversion Baseline: RomeroDev

This document presents the detailed findings of the technical, SEO, and marketing audit performed on the RomeroDev web workspace.

---

## 1. Codebase & Compilation Analysis

### 1.1 Compilation and Lint Errors
Running the initial codebase check (`npm run typecheck && npm run lint`) reveals the following lint errors and warnings:
* **ESLint Error (LocaleProvider.tsx:11:7):**
  `Error: Calling setState synchronously within an effect can trigger cascading renders`
  This error breaks the build pipeline when strict linting is enforced. It is caused by calling `setLocaleState(forcedLocale)` inside a `useEffect` hook block in `components/LocaleProvider.tsx`.
* **ESLint Warning (AppStoreBadge.tsx):**
  Uses native `<img>` tag rather than Next.js `<Image />` component, which could negatively impact Largest Contentful Paint (LCP).
* **ESLint Warning (PhoneMockup.tsx):**
  Uses native `<img>` tag for layout, affecting performance.
* **ESLint Warning (RedirectPage.tsx):**
  Renders custom `<html>`, `<head>`, and `<body>` tags inside a layout subcomponent. This causes duplicate root elements in the DOM because the parent layout (`app/layout.tsx`) already renders these tags.

---

## 2. Technical SEO & Routing Analysis

### 2.1 Route Generation & Directory Structure
Running `npm run build` shows that the build successfully prerenders **98 static routes**. However, there are major structural issues with the generated URLs:

#### Current Generated Routes
* **Root Pages:**
  * `/` (Static redirect page)
  * `/about`, `/contact`, `/cookies`, `/privacy`, `/terms`, `/apps` (Static redirect pages that point back to localized subfolders)
  * `/apps/[slug]/...` (Legacy paths for app details, e.g. `/apps/vitalspath/privacy/`, which redirect to localized `/es/casos/...` or `/en/case-studies/...`)
* **Localized Routes:**
  * `/[locale]` (SSG, generating `/es/` and `/en/`)
  * `/[locale]/[slug]` (SSG, generating services and static pages like `/es/desarrollo-ios/` and `/en/ios-development/`)
  * `/[locale]/case-studies/[slug]` (SSG, generating `/es/case-studies/vitalspath` and `/en/case-studies/vitalspath`)
  * `/[locale]/casos/[slug]` (SSG, generating `/es/casos/vitalspath` and `/en/casos/vitalspath`)
  * `/[locale]/recursos/[slug]` (SSG, generating `/es/recursos/como-detectar...` and `/en/recursos/como-detectar...`)
  * `/[locale]/resources/[slug]` (SSG, generating `/es/resources/how-to-identify...` and `/en/resources/how-to-identify...`)

#### Major Routing Anomalies (Cross-Locale Duplicates)
Next.js dynamic routing parent parameters are causing unwanted cross-locale combinations during pre-rendering:
1. **`/es/case-studies/[slug]/`** is generated with English template but ES localizations.
2. **`/en/casos/[slug]/`** is generated with Spanish template but EN localizations.
3. **`/es/resources/[slug]/`** is generated with English slug content in ES path.
4. **`/en/recursos/[slug]/`** is generated with Spanish slug content in EN path.

This creates 4 duplicate versions of each case study and resource article, which is harmful for SEO indexation.

### 2.2 Brand Consistency (P0.1)
The old brand name **LB Apps** is still present in multiple files:
* `package.json` contains `"name": "lb-apps-portfolio"`.
* `supabase/schema.sql` contains `-- Supabase schema for LB Apps.`.
* `components/PhoneMockup.tsx` contains `LB Apps Portfolio` markup.
* `app/layout.tsx` defines:
  * `default: "LB Apps - Apps iOS cuidadas, listas para crecer"`
  * `template: "%s | LB Apps"`
  * `openGraph.title: "LB Apps"`
  * `twitter.title: "LB Apps"`

### 2.3 HTML Lang Attribute & Dynamic Localisation (P0.3)
* **Observation:** The root layout `app/layout.tsx` hardcodes `<html lang="es">`.
* **Impact:** For all English routes (e.g. `/en/about/`, `/en/case-studies/vitalspath/`), the HTML output still declares `lang="es"`. This triggers browser translation banners and hurts English search relevancy.

### 2.4 Canonical URLs & Hreflang Tags (P0.4)
* **Status:** Incomplete.
* **Observation:** Most pages do not declare their canonical URL, and there are no alternate `hreflang` metadata references in the HTML headers mapping the ES and EN versions of the pages (e.g., mapping `/es/contacto/` as the Spanish alternate of `/en/contact/`).

### 2.5 Sitemap and robots.txt (P0.5)
* **Observation:** The sitemap logic uses a hardcoded `lastModified` date and does not include modern localized service landings or clean alternate language attributes.
* **robots.txt:** Points to the correct sitemap but lacks specific indexing exclusions.

---

## 3. SEO Content & Commercial Alignment

### 3.1 Business Line Separation (P1.1)
* **Observation:** The homepage and navigation mix services (iOS Development, Salesforce Consulting) with B2C/B2B2C products (VitalsPath, StreakReps). The CTAs are sometimes combined, reducing clarity.
* **Action Required:** Solidify distinct navigation paths for **Services** (B2B) and **Products** (B2C/B2B2C).

### 3.2 Services & Product Landings
* **Status:** Basic.
* **Details:** Currently, services are defined in `lib/services-content.ts` and rendered dynamically under `app/[locale]/(studio)/[slug]/page.tsx`. However, there are no specific pages for:
  - "Desarrollo SwiftUI" (ES) / "SwiftUI Development" (EN)
  - "Desarrollo Salesforce" (ES) / "Salesforce Development" (EN)
  - "Reducción de deuda técnica en Salesforce" (ES) / "Salesforce Technical Debt Auditing" (EN)
  
These needs must be represented by dedicated routes or expanded entries.

### 3.3 Conversion Forms and Analítica
* **Formulario:** The contact form in `components/ContactForm.tsx` collects Name, Email, Topic, and Message. It communicates with Supabase, but it lacks a honeypot anti-spam field, has some hardcoded strings, and needs validation improvements.
* **Analítica:** Plausible Analytics is integrated but we need a complete measurement plan outlining event names (e.g. `contact_submit`, `app_store_click`).

---

## 4. Performance & Core Web Vitals (CWV)

* **Images:** Many images are loaded statically without responsive size limits. Some images lack localized alt descriptions.
* **LCP & JS Payload:** The static export is fast (LCP ~1.2s in local laboratory), but native images inside phone mockups and badges can block LCP.
* **A11y:** Focus states on buttons, keyboard navigation on the mobile header, and ARIA descriptors on sliders are missing or incomplete.

---

## 5. Summary Baseline Metrics (Laboratory)

| Metric | Target | Current Baseline (Estimated) | Status |
| :--- | :--- | :--- | :--- |
| **LCP (Mobile/Desktop)** | < 2.5s | 1.2s - 1.5s | Good |
| **CLS** | < 0.1 | 0.0 | Good |
| **INP** | < 200ms | < 50ms | Good |
| **HTML Validation** | 0 errors | Multiple errors (Duplicate `html`, `body` tags) | Failed |
| **WCAG 2.2 AA Compliance**| Compliant | Partial (Header mobile menu and image sliders lack labels) | Needs Work |
| **SEO Indexation** | Clean mapping | Major Duplicate Content (Cross-locale route combos) | Failed |
| **Branding Unification** | RomeroDev | Mixture of RomeroDev & LB Apps | Failed |
