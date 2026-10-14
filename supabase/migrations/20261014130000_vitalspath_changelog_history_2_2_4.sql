-- Seed the missing historical 2.2.4 record from the official App Store notes.
-- Keep the build number empty because the snapshot carried 2.2.2's build number.

begin;

insert into public.app_changelog (
  app_slug, version, release_notes, release_notes_en, release_date, is_current,
  release_notes_format, source, source_url, detected_at, translated_locales, translation_status, build_number
)
values (
  'vitalspath',
  '2.2.4',
  '- Escaneo Inteligente con IA: Sugerencia proactiva y activación de modelo especializado para reconocer recetas y prospectos con máxima precisión.
- Modo Foco en Inicio: Nueva tarjeta de toma prioritaria para registrar tu dosis con 1 solo toque y confirmación de tranquilidad.
- Círculo Familiar y Cuidador: Alertas de seguridad automáticas cuando un ser querido tiene dosis pendientes o retrasadas.
- Resumen Médico de 1 Página: Exporta un informe ultraconciso optimizado para consultas médicas rápidas.
- Recordatorios y Tareas más fiables: Mejoras de estabilidad, sincronización en segundo plano y notificaciones puntuales.',
  E'- Smart AI Medication Scan: Intelligent suggestion and on-demand specialized model to capture medications and leaflets with high precision.
- 1-Tap Home Focus: New priority action card to log your next dose in a single tap, plus an all-clear peace of mind banner.
- Family Circle & Caregiver Alerts: Automated safety notifications when a loved one or dependent has pending or overdue doses.
- 1-Page Doctor Summary: Export an ultra-concise one-page medical summary tailored for doctor consultations.
- Reliable Tasks & Reminders: Improved scheduled notifications, background sync, and smooth startup performance.',
  date '2026-09-08',
  false,
  'markdown',
  'app_store',
  'https://apps.apple.com/es/app/vitalspath-salud-familiar/id6760143192',
  now(),
  array['es', 'en'],
  'complete',
  null
)
on conflict (app_slug, version) do nothing;

insert into public.app_changelog_localizations (
  changelog_id, app_slug, version, locale, release_notes, release_notes_format,
  translated, provider, translated_at
)
select c.id, c.app_slug, c.version, localized.locale, localized.release_notes,
       'markdown', false, 'app_store', now()
from public.app_changelog c
join (values
  ('es', '- Escaneo Inteligente con IA: Sugerencia proactiva y activación de modelo especializado para reconocer recetas y prospectos con máxima precisión.
- Modo Foco en Inicio: Nueva tarjeta de toma prioritaria para registrar tu dosis con 1 solo toque y confirmación de tranquilidad.
- Círculo Familiar y Cuidador: Alertas de seguridad automáticas cuando un ser querido tiene dosis pendientes o retrasadas.
- Resumen Médico de 1 Página: Exporta un informe ultraconciso optimizado para consultas médicas rápidas.
- Recordatorios y Tareas más fiables: Mejoras de estabilidad, sincronización en segundo plano y notificaciones puntuales.'),
  ('en', E'- Smart AI Medication Scan: Intelligent suggestion and on-demand specialized model to capture medications and leaflets with high precision.
- 1-Tap Home Focus: New priority action card to log your next dose in a single tap, plus an all-clear peace of mind banner.
- Family Circle & Caregiver Alerts: Automated safety notifications when a loved one or dependent has pending or overdue doses.
- 1-Page Doctor Summary: Export an ultra-concise one-page medical summary tailored for doctor consultations.
- Reliable Tasks & Reminders: Improved scheduled notifications, background sync, and smooth startup performance.')
) as localized(locale, release_notes) on true
where c.app_slug = 'vitalspath' and c.version = '2.2.4'
on conflict (app_slug, version, locale) do update set
  changelog_id = excluded.changelog_id,
  release_notes = excluded.release_notes,
  release_notes_format = excluded.release_notes_format,
  translated = excluded.translated,
  provider = excluded.provider,
  translated_at = excluded.translated_at,
  updated_at = now();

update public.app_changelog
set build_number = null, updated_at = now()
where app_slug = 'vitalspath' and version = '2.2.4' and build_number = '222202608291';

commit;
