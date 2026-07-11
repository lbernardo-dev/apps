# URL Map & International Redirect Structure: RomeroDev

This document maps all public URLs, canonical paths, redirect relationships, and international language configurations (`hreflang`).

---

## 1. Domain Governance
* **Production Base URL:** `https://lbernardo-dev.github.io/apps/` (or custom brand domain once configured)
* **SSL Status:** HTTPS enforced
* **Trailing Slashes:** Enabled (`trailingSlash: true` in `next.config.ts`). Every directory path terminates with a `/`.

---

## 2. Page & Routing Map

| Route ID / Purpose | Spanish URL (`/es/`) | English URL (`/en/`) |
| :--- | :--- | :--- |
| **Home Page** | `/es/` | `/en/` |
| **About Lester** | `/es/sobre-mi/` | `/en/about/` |
| **Contact Form** | `/es/contacto/` | `/en/contact/` |
| **Privacy Policy** | `/es/privacidad/` | `/en/privacy/` |
| **Terms of Service**| `/es/terminos/` | `/en/terms/` |
| **Cookies Policy** | `/es/cookies/` | `/en/cookies/` |
| **Products Catalog**| `/es/productos/` | `/en/products/` |
| **Resources/Blog** | `/es/recursos/` | `/en/resources/` |
| **iOS Service** | `/es/desarrollo-ios/` | `/en/ios-development/` |
| **SwiftUI Service** | `/es/desarrollo-swiftui/` | `/en/swiftui-development/` |
| **App Audits** | `/es/auditoria-de-apps/`| `/en/app-audits/` |
| **Product Design** | `/es/diseno-de-producto/`| `/en/product-design/` |
| **SAP Integration** | `/es/integraciones-y-automatizacion/` | `/en/integrations-and-automation/` |
| **Salesforce Service**| `/es/consultoria-salesforce/` | `/en/salesforce-consulting/` |
| **Salesforce Dev** | `/es/desarrollo-salesforce/` | `/en/salesforce-development/` |
| **Salesforce Debt** | `/es/deuda-tecnica-salesforce/` | `/en/salesforce-debt/` |

---

## 3. Case Studies & Resources Slug Paths

### 3.1 Case Studies (Products)
* **VitalsPath:**
  * ES: `/es/casos/vitalspath/`
  * EN: `/en/case-studies/vitalspath/`
  * Subpages: `/es/casos/vitalspath/[soporte/privacidad/terminos/preguntas-frecuentes/suscripciones]/` mapped to `/en/case-studies/vitalspath/[support/privacy/terms/faq/subscriptions]/`
* **StreakReps:**
  * ES: `/es/casos/reps/`
  * EN: `/en/case-studies/reps/`
  * Subpages: `/es/casos/reps/[soporte/privacidad/terminos/preguntas-frecuentes]/` mapped to `/en/case-studies/reps/[support/privacy/terms/faq]/`

### 3.2 Resource Articles
* **SwiftUI Performance:**
  * ES: `/es/recursos/como-detectar-problemas-rendimiento-swiftui/`
  * EN: `/en/resources/how-to-identify-performance-issues-in-a-swiftui-app/`
* **Salesforce Technical Audit:**
  * ES: `/es/recursos/cuando-empresa-necesita-auditoria-salesforce/`
  * EN: `/en/resources/when-a-salesforce-implementation-needs-a-technical-audit/`
* **Salesforce SAP Failures:**
  * ES: `/es/recursos/errores-habituales-integraciones-salesforce-sap/`
  * EN: `/en/resources/common-salesforce-and-sap-integration-failures/`

---

## 4. Redirect Map (Legacy & Clean URLs)

To avoid breaking existing search indexes or referral traffic, the root path files execute dynamic client-side (or meta tag) redirects:

| Request URL | Redirect Target |
| :--- | :--- |
| `/` (Homepage Root) | `/es/` or `/en/` (dynamic detection) |
| `/about/` | `/es/sobre-mi/` or `/en/about/` |
| `/contact/` | `/es/contacto/` or `/en/contact/` |
| `/privacy/` | `/es/privacidad/` or `/en/privacy/` |
| `/terms/` | `/es/terminos/` or `/en/terms/` |
| `/cookies/` | `/es/cookies/` or `/en/cookies/` |
| `/apps/` | `/es/productos/` or `/en/products/` |
| `/apps/vitalspath/` | `/es/casos/vitalspath/` or `/en/case-studies/vitalspath/` |
| `/apps/reps/` | `/es/casos/reps/` or `/en/case-studies/reps/` |

---

## 5. Hreflang Tags Specifications

For every pair of pages (ES and EN), the following header code is outputted by our `constructMetadata` helper:
```html
<link rel="canonical" href="https://lbernardo-dev.github.io/apps/es/sobre-mi/" />
<link rel="alternate" hreflang="es" href="https://lbernardo-dev.github.io/apps/es/sobre-mi/" />
<link rel="alternate" hreflang="en" href="https://lbernardo-dev.github.io/apps/en/about/" />
<link rel="alternate" hreflang="x-default" href="https://lbernardo-dev.github.io/apps/es/sobre-mi/" />
```
This reciprocates correctly, satisfying search console requirements for multilingual indexing.
