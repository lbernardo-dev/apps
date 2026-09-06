-- Keep the public catalog aligned with the verified VitalsBud 1.0.0 build.
-- The App Store record is still in PREPARE_FOR_SUBMISSION, so no public
-- download URL is advertised until Apple publishes one.

update public.apps
set
  status = 'testing',
  version = '1.0.0',
  build_number = '100202609061',
  icon_url = 'assets/images/vitalsbud/vitalsbud-icon.png',
  cover_image_url = 'assets/images/vitalsbud/vitalsbud-icon.png',
  primary_cta_label = 'Disponible próximamente',
  primary_cta_label_en = 'Coming soon',
  primary_cta_url = '/es/casos/vitalsbud/soporte/',
  secondary_cta_url = '/es/casos/vitalsbud/soporte/',
  updated_at = now()
where slug = 'vitalsbud';

insert into public.app_media (app_id, kind, path, alt, alt_en, source, sort_order)
select id, 'icon', 'assets/images/vitalsbud/vitalsbud-icon.png',
  'Icono moderno de VitalsBud', 'Modern VitalsBud app icon',
  'verified-ios-asset', 0
from public.apps
where slug = 'vitalsbud'
on conflict do nothing;

insert into public.app_media (app_id, kind, path, alt, alt_en, source, sort_order)
select id, 'cover', 'assets/images/vitalsbud/vitalsbud-icon.png',
  'Identidad visual de VitalsBud', 'VitalsBud visual identity',
  'verified-ios-asset', 1
from public.apps
where slug = 'vitalsbud'
on conflict do nothing;

update public.app_catalog_audits audit
set
  score = 58,
  missing_fields = array['screenshots', 'video', 'public_download', 'final_store_metadata', 'physical_device_qa']::text[],
  verified_at = now()
from public.apps
where audit.app_id = public.apps.id
  and public.apps.slug = 'vitalsbud';

