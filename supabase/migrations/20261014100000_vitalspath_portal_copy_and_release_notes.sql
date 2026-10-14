-- Keep the shared VitalsPath portal aligned with the latest App Store Connect release.
-- App Store Connect reports 2.3.4 as READY_FOR_SALE; 2.3.5 is only an uploaded build.

update public.apps
set long_description = replace(long_description, 'VitalsPath 2.0', 'VitalsPath'),
    long_description_en = replace(long_description_en, 'VitalsPath 2.0', 'VitalsPath'),
    features = coalesce((
      select array_agg(
        case
          when feature ilike '%cifrado de extremo a extremo%'
            then 'Ecosistema Apple: Funciones opcionales para Apple Watch, widgets, notificaciones y sincronización de iCloud, sujetas a permisos y disponibilidad del sistema.'
          else feature
        end order by ordinality
      )
      from unnest(coalesce(features, '{}')) with ordinality as feature_rows(feature, ordinality)
    ), features),
    features_en = coalesce((
      select array_agg(
        case
          when feature ilike '%end-to-end encryption%'
            then 'Apple ecosystem: Optional Apple Watch, widget, notification, and iCloud sync features, subject to permissions and system availability.'
          else feature
        end order by ordinality
      )
      from unnest(coalesce(features_en, '{}')) with ordinality as feature_rows(feature, ordinality)
    ), features_en),
    updated_at = now()
where slug = 'vitalspath';

update public.app_changelog
set is_current = (version = '2.3.4')
where app_slug = 'vitalspath';

insert into public.app_changelog (
  app_slug, version, release_notes, release_notes_en, release_date, is_current,
  release_notes_format, source, source_url, detected_at, translated_locales, translation_status
)
values
(
  'vitalspath',
  '2.3.3',
  'Mejoramos la compra y restauración de Premium y la gestión de ofertas no disponibles. También afinamos las notificaciones de los perfiles compartidos y sus ajustes, y corregimos otros problemas de estabilidad.',
  'Premium purchases and restores are more reliable, and unavailable offers are handled more clearly. Shared profile notifications and profile settings have also been improved, with additional stability fixes.',
  date '2026-10-11',
  false,
  'plain',
  'app_store',
  'https://apps.apple.com/es/app/vitalspath-salud-familiar/id6760143192',
  now(),
  array['es', 'en'],
  'complete'
),
(
  'vitalspath',
  '2.3.4',
  'Los recordatorios de medicación son más fiables y los resúmenes de dosis omitidas te llevan directamente a las dosis correspondientes. También es más fiable el historial de notificaciones. Ahora puedes registrar la tristeza y elegir cuándo termina una pausa del tratamiento, incluida la reanudación automática. La fecha elegida coincide con la que guarda VitalsPath. Hemos mejorado la accesibilidad de controles importantes y la estabilidad de los cuidados, perfiles compartidos e informes.',
  'Medication reminders are more dependable, and missed-dose summaries open the doses they include so you can review what needs attention. Notification history is more reliable, too. You can now record sadness in your mood log and choose when a treatment pause ends, including automatic resumption. The chosen date now matches the date VitalsPath saves. We also improved accessibility for key controls and stability across daily care, shared profiles and reports.',
  date '2026-10-14',
  true,
  'plain',
  'app_store',
  'https://apps.apple.com/es/app/vitalspath-salud-familiar/id6760143192',
  now(),
  array['es', 'en'],
  'complete'
)
on conflict (app_slug, version) do update set
  release_notes = excluded.release_notes,
  release_notes_en = excluded.release_notes_en,
  release_date = excluded.release_date,
  is_current = excluded.is_current,
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
  ('2.3.3', 'es', 'Mejoramos la compra y restauración de Premium y la gestión de ofertas no disponibles. También afinamos las notificaciones de los perfiles compartidos y sus ajustes, y corregimos otros problemas de estabilidad.'),
  ('2.3.3', 'en', 'Premium purchases and restores are more reliable, and unavailable offers are handled more clearly. Shared profile notifications and profile settings have also been improved, with additional stability fixes.'),
  ('2.3.4', 'es', 'Los recordatorios de medicación son más fiables y los resúmenes de dosis omitidas te llevan directamente a las dosis correspondientes. También es más fiable el historial de notificaciones. Ahora puedes registrar la tristeza y elegir cuándo termina una pausa del tratamiento, incluida la reanudación automática. La fecha elegida coincide con la que guarda VitalsPath. Hemos mejorado la accesibilidad de controles importantes y la estabilidad de los cuidados, perfiles compartidos e informes.'),
  ('2.3.4', 'en', 'Medication reminders are more dependable, and missed-dose summaries open the doses they include so you can review what needs attention. Notification history is more reliable, too. You can now record sadness in your mood log and choose when a treatment pause ends, including automatic resumption. The chosen date now matches the date VitalsPath saves. We also improved accessibility for key controls and stability across daily care, shared profiles and reports.')
) as localized(version, locale, release_notes)
  on localized.version = c.version
where c.app_slug = 'vitalspath'
on conflict (app_slug, version, locale) do update set
  changelog_id = excluded.changelog_id,
  release_notes = excluded.release_notes,
  release_notes_format = excluded.release_notes_format,
  translated = excluded.translated,
  provider = excluded.provider,
  translated_at = excluded.translated_at,
  updated_at = now();
