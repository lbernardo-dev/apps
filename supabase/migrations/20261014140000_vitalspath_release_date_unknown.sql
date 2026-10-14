-- Apple did not provide a confirmed 2.3.4 release timestamp.
-- Remove the date used only when the version was first confirmed READY_FOR_SALE.

update public.app_changelog
set release_date = null, updated_at = now()
where app_slug = 'vitalspath'
  and version = '2.3.4'
  and release_date = date '2026-10-14';
