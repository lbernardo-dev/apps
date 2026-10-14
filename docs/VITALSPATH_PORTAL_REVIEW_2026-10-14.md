# VitalsPath in the shared `/apps` portal — review 2026-10-14

## Migration state

- Canonical public product page: `/es/casos/vitalspath/` and `/en/case-studies/vitalspath/`.
- The shared product page includes product details, plans, limitations, a bilingual help guide, FAQ, support, privacy, terms, subscription conditions, and a changelog section.
- Guide, FAQ, and legal content is editable in the product-content admin. Those routes are statically exported, so an admin edit needs a new site build and deployment; the changelog endpoint can refresh live.
- Supabase migration `20261013100000_vitalspath_shared_product_portal` populated the product guide, nine FAQ entries, and three bilingual legal documents.

## Confirmed defects corrected in this follow-up

- The native app router and checked-in localized metadata now target the shared `/apps` portal; non-Spanish locales use the English pages that exist. App Store Connect rejected all 68 planned URL updates for the live 2.3.4 app-info/version localizations because those fields cannot be changed in the current state. The API reported 0 successes, so the public App Store listing links are unchanged; carry these canonical URLs into the next editable version.
- The public product record described iCloud sync as end-to-end encrypted and called the product “VitalsPath 2.0”. The new migration removes the unsupported encryption guarantee and version-specific wording.
- The live changelog ended at 2.2.2 and the product snapshot showed 2.3.3. App Store Connect reports 2.3.4 as `READY_FOR_SALE`; the migration seeds official Spanish and English notes for 2.3.4 as current, preserves 2.3.3 as history, and reconciles the dynamic Store snapshot. The static fallback mirrors that data. The 2.3.5 build is not represented as a public release. ASC did not return a release timestamp, so the snapshot leaves that field empty rather than treating version creation time as release time.
- The checked-in database schema lagged the applied catalog migration: its `apps.status` constraint omitted `testing` and `development`, although the admin and deployed schema support both. The schema definition now matches the migration history.
- The fallback VitalsPath FAQ and legal copy duplicated stale text. It now reuses the dedicated bilingual content module used by the product enrichment layer.

## Remaining constraints and risks

- The user declined changing GA4, so its configured user-data retention remains 14 months. Public privacy copy must disclose that actual setting; do not describe the 12-month goal as enforced.
- Supabase migration `20261013110000_fix_app_feedback_validation` remains unapplied because automatic security review rejected the public `app_feedback` policy change. The source migration is preserved for a separate reviewed action.
- Static SEO pages do not rebuild automatically after CMS edits. The current admin explains this; a future automatic deployment path needs a trusted deploy trigger and secret-management design.

- GitHub Actions run #116 deployed the portal but reported Node.js 20 deprecation warnings and an upcoming `ubuntu-latest` migration to Ubuntu 26. The workflow now pins Ubuntu 24.04 and uses Node 24 compatible major releases of checkout, setup-node, configure-pages, upload-pages-artifact, and deploy-pages; the deploy job has the `actions: read` permission required for artifact lookup. The push-triggered run must confirm this change.

- The public App Store page's crawled metadata still showed 2.3.3 during this audit while ASC showed 2.3.4 as `READY_FOR_SALE`; the portal follows ASC and the next storefront sync should confirm Apple has refreshed the public page. The 2.3.4 changelog date records the first confirmation date, 2026-10-14; the snapshot does not infer a release timestamp from ASC `createdDate`.
