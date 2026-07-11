# Privacy-Respecting Analytics Integration: RomeroDev

This document describes the privacy-respecting analytics configuration and tracking plan implemented for RomeroDev.

---

## 1. Core Principles

RomeroDev avoids invasive trackers like Google Analytics or Meta Pixel. Instead, we support **Plausible Analytics** or **Umami Analytics**:
* **Privacy First:** No tracking cookies are stored, IP addresses are anonymized, and no personal data is collected.
* **Consent-Free Compliance:** Fits GDPR, CCPA, and PECR guidelines without requiring invasive cookie consent banners.
* **Environment-Driven Activation:** Tracking scripts are only loaded if the respective environment variables are provided.

---

## 2. Environment Configuration

Activation is controlled via `.env` variables:

### Plausible Analytics
```bash
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=romerodev.dev
```

### Umami Analytics
```bash
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-uuid-from-umami-dashboard
NEXT_PUBLIC_UMAMI_SRC=https://cloud.umami.is/script.js
```

If these keys are absent, the analytics component does not load, and tracking function calls silently log to the console in development mode instead.

---

## 3. Event Tracking Taxonomy

We track high-intent interactions to measure conversion rate optimization (CRO) without collecting sensitive content.

### Defined Custom Events

1. `hero_ios_click` / `hero_salesforce_click` / `hero_audit_click`
   * **Trigger:** Clicking a primary CTA button in the homepage hero.
2. `service_view`
   * **Trigger:** Viewing a service detail page.
   * **Properties:** `{ service_id: string, locale: "es" | "en" }`
3. `case_study_view`
   * **Trigger:** Entering a case study detail page.
   * **Properties:** `{ app_slug: string, locale: "es" | "en" }`
4. `vitalspath_app_store_click`
   * **Trigger:** Clicking the App Store badge for VitalsPath.
5. `streakreps_beta_click`
   * **Trigger:** Clicking the "Join Beta" button for StreakReps.
6. `contact_form_start`
   * **Trigger:** Interacting with the contact form.
7. `contact_form_submit`
   * **Trigger:** Successful form submission.
   * **Properties:** `{ method: "supabase" | "mailto", locale: "es" | "en" }`
8. `email_click`
   * **Trigger:** Clicking the direct mail contact address.
9. `language_switch`
   * **Trigger:** Tapping the language switcher in the navigation header.
   * **Properties:** `{ from: "es" | "en", to: "es" | "en" }`
10. `external_profile_click`
    * **Trigger:** Navigating to GitHub or LinkedIn from the footer links.

---

## 4. Sensitive Data Policy

To protect privacy, the following information is **never** collected or passed as event parameters:
* Text fields from the contact form (names, message content, specific need topics).
* Personal health queries or medical details.
* IP addresses or unique user identification hashes.
