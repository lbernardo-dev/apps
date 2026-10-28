-- Stage VitalsPath 2.3.8 in the shared product changelog as upcoming.
-- Keep the publicly released version marked current until Apple releases 2.3.8.

begin;

insert into public.app_changelog (
  app_slug, version, build_number, release_notes, release_notes_en, release_date,
  is_current, release_notes_format, source, source_url, detected_at,
  translated_locales, translation_status
)
values (
  'vitalspath',
  '2.3.8',
  '2382026102801',
  'Las actualizaciones de cuidado de iCloud se reflejan ahora con más fiabilidad en tus dispositivos. Cuando llega un cambio o vuelves a abrir VitalsPath, la app actualiza las pantallas de cuidado, revisa las dosis futuras de los medicamentos detenidos y vuelve a crear sus recordatorios según el horario más reciente. Los widgets y los resúmenes del Apple Watch también se actualizan con la información vigente. iCloud determina cuándo llegan los cambios; cada dispositivo los aplica al recibirlos.',
  'Care updates from iCloud now refresh more reliably across your devices. When an update arrives—or when you reopen VitalsPath—the app refreshes care screens, reconciles future doses for stopped medicines, and rebuilds medication reminders from the latest schedule. Widgets and Apple Watch summaries also refresh with current care information. iCloud controls when updates arrive; each device applies them after receiving the change.',
  null,
  false,
  'plain',
  'app_store',
  'https://apps.apple.com/es/app/vitalspath-salud-familiar/id6760143192',
  now(),
  array['es', 'en'],
  'complete'
)
on conflict (app_slug, version) do update set
  build_number = excluded.build_number,
  release_notes = excluded.release_notes,
  release_notes_en = excluded.release_notes_en,
  release_date = null,
  is_current = false,
  release_notes_format = excluded.release_notes_format,
  source = excluded.source,
  source_url = excluded.source_url,
  detected_at = excluded.detected_at,
  translated_locales = excluded.translated_locales,
  translation_status = excluded.translation_status,
  updated_at = now();

insert into public.app_changelog_localizations (
  changelog_id, app_slug, version, locale, release_notes,
  release_notes_format, translated, provider, translated_at
)
select c.id, c.app_slug, c.version, localized.locale, localized.release_notes,
  'plain', false, 'app_store', now()
from public.app_changelog c
join (values
  ('es', 'Las actualizaciones de cuidado de iCloud se reflejan ahora con más fiabilidad en tus dispositivos. Cuando llega un cambio o vuelves a abrir VitalsPath, la app actualiza las pantallas de cuidado, revisa las dosis futuras de los medicamentos detenidos y vuelve a crear sus recordatorios según el horario más reciente. Los widgets y los resúmenes del Apple Watch también se actualizan con la información vigente. iCloud determina cuándo llegan los cambios; cada dispositivo los aplica al recibirlos.'),
  ('en', 'Care updates from iCloud now refresh more reliably across your devices. When an update arrives—or when you reopen VitalsPath—the app refreshes care screens, reconciles future doses for stopped medicines, and rebuilds medication reminders from the latest schedule. Widgets and Apple Watch summaries also refresh with current care information. iCloud controls when updates arrive; each device applies them after receiving the change.')
) as localized(locale, release_notes) on true
where c.app_slug = 'vitalspath' and c.version = '2.3.8'
on conflict (app_slug, version, locale) do update set
  changelog_id = excluded.changelog_id,
  release_notes = excluded.release_notes,
  release_notes_format = excluded.release_notes_format,
  translated = excluded.translated,
  provider = excluded.provider,
  translated_at = excluded.translated_at,
  updated_at = now();

commit;
