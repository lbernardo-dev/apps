# Analytics Tracking & Measurement Plan: RomeroDev

This measurement plan outlines the KPI framework, custom event names, tracking triggers, and privacy compliance requirements for the RomeroDev website.

---

## 1. Key Performance Indicators (KPIs)

To measure business success, we track metrics in three segments:

### 1.1 B2B Services Conversion (Salesforce & iOS)
* **Lead Volume:** Total contact form submissions.
* **Lead Quality Rate:** Contact form submissions containing a selected budget/need topic.
* **Service CTR:** Percentage of visitors landing on service pages clicking "Discuss your project".

### 1.2 B2C/B2B2C Product Installs
* **App Store Click Rate:** Clicks on the App Store badge for VitalsPath or StreakReps.
* **Beta Signups:** Clicks/submissions for private Beta waitlists.

### 1.3 Technical Content Performance
* **Engagement Rate:** Users reading dynamic resources for more than 60 seconds (Scroll depth > 50%).
* **Referral CTR:** Visitors clicking on service contextual links inside resource articles.

---

## 2. Plausible / Umami Custom Events Mappings

Every event payload includes the `locale` parameter to allow filtering performance by language.

| Event Name | Trigger | Properties |
| :--- | :--- | :--- |
| `contact_form_start` | User submits/focuses the contact form (fires on submit attempt). | `locale: "es" \| "en"` |
| `contact_form_submit` | User submits the contact form. | `method: "supabase" \| "mailto"`, `locale` |
| `app_store_click` | User clicks on the official App Store badge. | `app: "vitalspath" \| ...`, `locale` |
| `app_feedback_start` | User submits the per-app feedback form. | `app`, `locale` |
| `app_feedback_submit` | User submits the per-app feedback form. | `app`, `method: "supabase" \| "mailto"`, `kind`, `rating`, `locale` |
| `testflight_click` | User clicks on the TestFlight beta download link. | `app: "reps"`, `locale` |
| `waitlist_submit` | User asks to be notified for a coming-soon app. | `app: "shield" \| "upledger"`, `locale` |
| `service_cta_click`| User clicks the main CTA button on a service page. | `service: "ios-development" \| ...`, `locale` |
| `language_switch` | User switches language. | `from: "es" \| "en"`, `to: "es" \| "en"` |
| `resource_cta_click`| User clicks on a contextual CTA inside an article. | `article_id: "swiftui-performance" \| ...` |

---

## 3. Privacy, LocalStorage, and Compliance

RomeroDev respects user privacy and complies with GDPR/ePrivacy rules:
1. **No Invasive Cookies:** We do not use third-party marketing cookies.
2. **Technical Storage:** LocalStorage is only used for theme setting (`lb-theme`) and language preference (`lb-locale`).
3. **Anonymized IP Address:** The Plausible Analytics integration runs strictly with fully anonymized IP addresses without tracking cross-device identities.
4. **No PII Transmission:** The name, email, and message inputs from the contact form are never sent to analytics properties.
