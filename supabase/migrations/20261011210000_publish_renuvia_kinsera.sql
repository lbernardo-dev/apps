-- Publish the two products now available on the public App Store.
-- The checked-in iTunes snapshot remains the deploy-time fallback; this
-- migration keeps the Supabase catalog and its media registry in sync.

update public.apps
set
  name = case slug when 'renuvia' then 'Renuvia' else 'Kinsera' end,
  tagline = case slug
    when 'renuvia' then 'Convierte cada renovación en un expediente listo para actuar.'
    else 'Límites digitales claros, privados y familiares.'
  end,
  tagline_en = case slug
    when 'renuvia' then 'Turn every renewal into a dossier ready for action.'
    else 'Clear, private, family-first digital limits.'
  end,
  short_description = case slug
    when 'renuvia' then 'Un radar privado que convierte fechas de renovación en expedientes con preparación, requisitos e historial.'
    else 'Configura límites de apps, categorías y sitios web con temporizadores, horarios, pausas e informes agregados que funcionan en el propio dispositivo.'
  end,
  short_description_en = case slug
    when 'renuvia' then 'A private radar that turns renewal dates into dossiers with readiness, requirements, and history.'
    else 'Set app, category, and website limits with timers, schedules, pauses, and aggregate reports that work on the device itself.'
  end,
  long_description = case slug
    when 'renuvia' then 'Renuvia reúne tus fechas de renovación en un Radar vivo y convierte cada plazo en un expediente: emisor, referencia, checklist, documentos necesarios, siguiente acción e historial.'
    else 'Kinsera convierte Apple Screen Time en una experiencia familiar clara: la persona responsable configura la protección, el dispositivo la aplica localmente y la persona protegida puede entender qué ocurre y cuándo termina.'
  end,
  long_description_en = case slug
    when 'renuvia' then 'Renuvia brings renewal dates into a live Radar and turns each deadline into a dossier: issuer, reference, checklist, required documents, next action, and history.'
    else 'Kinsera turns Apple Screen Time into a clear family experience: a responsible adult configures protection, the device enforces it locally, and the protected person can understand what is happening and when it ends.'
  end,
  status = 'published',
  featured = true,
  category = case slug when 'renuvia' then 'Productividad' else 'Estilo de vida' end,
  category_en = case slug when 'renuvia' then 'Productivity' else 'Lifestyle' end,
  platform = array['iOS', 'iPadOS']::text[],
  supported_locales = array['es', 'en']::text[],
  icon_url = case slug
    when 'renuvia' then 'assets/images/renuvia/renuvia-icon.png'
    else 'assets/images/kinsera/kinsera-icon.png'
  end,
  cover_image_url = case slug
    when 'renuvia' then 'assets/images/renuvia/screens/01_radar_es.png'
    else 'assets/images/kinsera/showcase-es.png'
  end,
  video_url = case slug
    when 'renuvia' then 'assets/videos/renuvia/renuvia-hero.mp4'
    else 'assets/videos/kinsera/kinsera-hero.mp4'
  end,
  screenshots = case slug
    when 'renuvia' then array['01_radar', '02_scanner', '03_review', '04_vault', '05_renewals', '06_analytics', '07_calendar', '08_alerts', '09_categories', '10_privacy']::text[]
    else array['01-set', '02-choose', '03-control', '04-time', '05-pause', '06-plan', '07-review', '08-see', '09-privacy', '10-start']::text[]
  end,
  app_store_url = case slug
    when 'renuvia' then 'https://apps.apple.com/es/app/renuvia-radar-de-renovaci%C3%B3n/id6804756403'
    else 'https://apps.apple.com/es/app/kinsera-control-parental/id6805556421'
  end,
  primary_cta_label = 'Descargar en el App Store',
  primary_cta_label_en = 'Get it on the App Store',
  primary_cta_url = case slug
    when 'renuvia' then 'https://apps.apple.com/es/app/renuvia-radar-de-renovaci%C3%B3n/id6804756403'
    else 'https://apps.apple.com/es/app/kinsera-control-parental/id6805556421'
  end,
  secondary_cta_label = 'Soporte de la app',
  secondary_cta_label_en = 'App support',
  secondary_cta_url = '/apps/' || slug || '/support',
  seo_title = case slug
    when 'renuvia' then 'Renuvia: expedientes privados de renovación con Radar | RomeroDev'
    else 'Kinsera: control parental local y privado | RomeroDev'
  end,
  seo_description = case slug
    when 'renuvia' then 'Prepara renovaciones de identidad, vehículos, seguros, contratos, garantías y permisos con expedientes, checklist, documentos y Radar local.'
    else 'Configura límites de apps, categorías y sitios web con temporizadores, horarios y protección local para iPhone y iPad.'
  end,
  published_at = coalesce(published_at, '2026-09-09T07:00:00Z'::timestamptz),
  updated_at = now()
where slug in ('renuvia', 'kinsera');

-- Replace pre-release media rows with the verified, localized assets already
-- checked into public/assets, including the supplied launch videos.
delete from public.app_media
where app_id in (select id from public.apps where slug in ('renuvia', 'kinsera'))
  and kind in ('icon', 'cover', 'screenshot', 'video');

insert into public.app_media (app_id, kind, path, alt, alt_en, source, sort_order)
select id, 'icon', icon_url, 'Icono de ' || name, name || ' app icon', 'verified-ios-asset', 0
from public.apps
where slug in ('renuvia', 'kinsera')
on conflict (app_id, kind, path, locale) do update set
  alt = excluded.alt,
  alt_en = excluded.alt_en,
  source = excluded.source,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.app_media (app_id, kind, path, alt, alt_en, source, sort_order)
select id, 'video', video_url, 'Vídeo de presentación de ' || name, name || ' app preview video', 'user-supplied-asset', 2
from public.apps
where slug in ('renuvia', 'kinsera')
on conflict (app_id, kind, path, locale) do update set
  alt = excluded.alt,
  alt_en = excluded.alt_en,
  source = excluded.source,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.app_media (app_id, kind, path, alt, alt_en, source, sort_order)
select id, 'cover', cover_image_url, 'Vista de ' || name, name || ' product view', 'verified-ios-asset', 1
from public.apps
where slug in ('renuvia', 'kinsera')
on conflict (app_id, kind, path, locale) do update set
  alt = excluded.alt,
  alt_en = excluded.alt_en,
  source = excluded.source,
  sort_order = excluded.sort_order,
  updated_at = now();

with product_shots(slug, shot_keys) as (
  values
    ('renuvia', array['01_radar', '02_scanner', '03_review', '04_vault', '05_renewals', '06_analytics', '07_calendar', '08_alerts', '09_categories', '10_privacy']::text[]),
    ('kinsera', array['01-set', '02-choose', '03-control', '04-time', '05-pause', '06-plan', '07-review', '08-see', '09-privacy', '10-start']::text[])
)
insert into public.app_media (app_id, kind, path, alt, alt_en, locale, source, sort_order)
select apps.id,
  'screenshot',
  'assets/images/' || product_shots.slug || '/screens/' || shot.key || '_' || language.locale || '.png',
  apps.name || ' · captura ' || shot.key,
  apps.name || ' · ' || shot.key || ' screenshot',
  language.locale,
  'verified-ios-asset',
  10 + ((shot.position - 1) * 2) + language.position
from product_shots
join public.apps on apps.slug = product_shots.slug
cross join lateral unnest(product_shots.shot_keys) with ordinality as shot(key, position)
cross join lateral unnest(array['es', 'en']::text[]) with ordinality as language(locale, position)
on conflict (app_id, kind, path, locale) do update set
  alt = excluded.alt,
  alt_en = excluded.alt_en,
  source = excluded.source,
  sort_order = excluded.sort_order,
  updated_at = now();

-- The public App Store link is the primary product action. Existing support,
-- legal, and feedback links remain in the catalog and stay locale-normalized
-- by the application route resolver.
delete from public.app_links
where app_id in (select id from public.apps where slug in ('renuvia', 'kinsera'))
  and kind = 'appstore';

insert into public.app_links (app_id, kind, label, label_en, url, is_primary, is_external, sort_order)
select id, 'appstore', 'Abrir en el App Store', 'Open in the App Store', app_store_url, true, true, 0
from public.apps
where slug in ('renuvia', 'kinsera')
on conflict (app_id, kind, url) do update set
  label = excluded.label,
  label_en = excluded.label_en,
  is_primary = excluded.is_primary,
  is_external = excluded.is_external,
  sort_order = excluded.sort_order,
  updated_at = now();

-- Store facts are seeded from the verified public iTunes lookup snapshot and
-- can be refreshed later by `npm run sync:appstore` with a service role.
insert into public.app_store_snapshots (
  app_id, app_slug, app_store_id, track_name, track_view_url, version,
  current_version_release_date, minimum_os_version, formatted_price, developer,
  languages, file_size_bytes, average_rating, user_rating_count, synced_at
)
select apps.id, facts.app_slug, facts.app_store_id, facts.track_name,
  facts.track_view_url, facts.version, facts.current_version_release_date::timestamptz,
  facts.minimum_os_version, facts.formatted_price, facts.developer,
  facts.languages, facts.file_size_bytes, facts.average_rating,
  facts.user_rating_count, facts.synced_at::timestamptz
from (values
  ('renuvia', '6804756403', 'Renuvia: Radar de Renovación', 'https://apps.apple.com/es/app/renuvia-radar-de-renovaci%C3%B3n/id6804756403', '1.0.0', '2026-09-09T23:58:43Z', '17.0', 'Gratis', 'Lester Romero Bernardo', array['EN', 'ES']::text[], '62828544', 0::numeric, 0, '2026-09-10T05:04:02.244Z'),
  ('kinsera', '6805556421', 'Kinsera: Control parental', 'https://apps.apple.com/es/app/kinsera-control-parental/id6805556421', '1.0.0', '2026-09-10T01:31:46Z', '26.0', 'Gratis', 'Lester Romero Bernardo', array['EN', 'ES']::text[], '95392768', 0::numeric, 0, '2026-09-10T05:04:02.412Z')
) as facts(app_slug, app_store_id, track_name, track_view_url, version, current_version_release_date, minimum_os_version, formatted_price, developer, languages, file_size_bytes, average_rating, user_rating_count, synced_at)
join public.apps on apps.slug = facts.app_slug
on conflict (app_slug) do update set
  app_id = excluded.app_id,
  app_store_id = excluded.app_store_id,
  track_name = excluded.track_name,
  track_view_url = excluded.track_view_url,
  version = excluded.version,
  current_version_release_date = excluded.current_version_release_date,
  minimum_os_version = excluded.minimum_os_version,
  formatted_price = excluded.formatted_price,
  developer = excluded.developer,
  languages = excluded.languages,
  file_size_bytes = excluded.file_size_bytes,
  average_rating = excluded.average_rating,
  user_rating_count = excluded.user_rating_count,
  synced_at = excluded.synced_at;

-- Catalog audits should no longer report a missing public download or video.
update public.app_catalog_audits audit
set missing_fields = case apps.slug
  when 'renuvia' then array[]::text[]
  else array['physical_device_qa']::text[]
end,
verified_at = now()
from public.apps
where audit.app_id = apps.id
  and apps.slug in ('renuvia', 'kinsera');
