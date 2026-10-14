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

## Follow-up verified 2026-10-14

- Applied production migrations `20261014120000_vitalspath_retention_and_changelog_accuracy` and `20261014130000_vitalspath_changelog_history_2_2_4` in Supabase project `apps`; both versions are present in `supabase_migrations.schema_migrations`.
- Added the missing admin-managed `2.2.4` changelog row from the official App Store notes. Supabase now returns the correct release date (`2026-09-08`), English and Spanish localizations, and no build number. The old `222202608291` build number belonged to 2.2.2.
- Fixed the snapshot/CMS merge so an admin-managed entry overrides the corresponding storefront snapshot, while snapshot-only fields remain as fallback. Previously, an existing snapshot silently masked CMS edits to that release.
- Updated Spanish and English privacy/help/FAQ copy for category-level health-log controls, professional-report retention (30-day default, configurable 1–365 days), current GA4 event/user retention (2/14 months with activity reset), Release Crashlytics defaults and deletion timing, CloudKit deletion lag, and RevenueCat deletion limitations. GA4 settings remain unchanged per user instruction.
- `npm run lint`, `npm run typecheck`, `npm run build`, `npm run validate:seo`, and `git diff --check` passed. The static SEO validator passed all generated routes (320 pages); generated VitalsPath output includes the corrected English 2.2.4 history and current disclosures.

### Remaining constraints

- Guide, FAQ, and legal content is statically generated for SEO. An admin edit requires a new build/deployment; only the changelog endpoint refreshes live. No trusted automatic CMS-to-deploy trigger is configured.
- The user explicitly left GA4 unchanged: event retention is 2 months but user retention remains 14 months and resets after activity. Do not describe the 12-month target as enforced.
- App Store Connect rejected the live 2.3.4 localization URL updates because the version is not editable; apply the `/apps` links in the next editable version.
- The unrelated `app_feedback` policy migration remains unapplied after automatic security review rejected it.
