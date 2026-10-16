-- Stage VitalsPath 2.3.5 release notes in the product changelog.
-- The build is attached to an App Store Connect version in preparation,
-- so keep the publicly released 2.3.4 marked as current until Apple releases 2.3.5.

begin;

insert into public.app_changelog (
  app_slug, version, build_number, release_notes, release_notes_en, release_date,
  is_current, release_notes_format, source, source_url, detected_at,
  translated_locales, translation_status
)
values (
  'vitalspath',
  '2.3.5',
  '2352026101601',
  'Los horarios de medicación ahora se mantienen sincronizados al editar, pausar, reanudar, detener o completar un tratamiento. Los recordatorios de dosis —incluidas las alertas agrupadas y las notificaciones para cuidadores— se actualizan cuando cambia el plan, para evitar que dosis canceladas o inactivas sigan apareciendo como próximas. Se conserva el historial de dosis. También mejoramos la fiabilidad de la generación de dosis y las actualizaciones del cuidado compartido.',
  'Medication schedules now stay in sync when you edit, pause, resume, stop, or complete a treatment. Dose reminders—including grouped alerts and caregiver notifications—are refreshed when the plan changes, helping prevent canceled or inactive doses from appearing as upcoming. Your dose history is preserved. We also improved the reliability of dose generation and shared care updates.',
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
  ('es', 'Los horarios de medicación ahora se mantienen sincronizados al editar, pausar, reanudar, detener o completar un tratamiento. Los recordatorios de dosis —incluidas las alertas agrupadas y las notificaciones para cuidadores— se actualizan cuando cambia el plan, para evitar que dosis canceladas o inactivas sigan apareciendo como próximas. Se conserva el historial de dosis. También mejoramos la fiabilidad de la generación de dosis y las actualizaciones del cuidado compartido.'),
  ('en', 'Medication schedules now stay in sync when you edit, pause, resume, stop, or complete a treatment. Dose reminders—including grouped alerts and caregiver notifications—are refreshed when the plan changes, helping prevent canceled or inactive doses from appearing as upcoming. Your dose history is preserved. We also improved the reliability of dose generation and shared care updates.')
) as localized(locale, release_notes) on true
where c.app_slug = 'vitalspath' and c.version = '2.3.5'
on conflict (app_slug, version, locale) do update set
  changelog_id = excluded.changelog_id,
  release_notes = excluded.release_notes,
  release_notes_format = excluded.release_notes_format,
  translated = excluded.translated,
  provider = excluded.provider,
  translated_at = excluded.translated_at,
  updated_at = now();

commit;
