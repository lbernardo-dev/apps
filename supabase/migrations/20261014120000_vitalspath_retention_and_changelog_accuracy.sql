-- Align VitalsPath help/privacy copy with the implemented category controls,
-- report retention, current telemetry configuration, and App Store history.

begin;

update public.app_sections
set body = 'Los perfiles y datos de salud permanecen hasta que los elimines. Puedes borrar elementos o perfiles desde la app. La sincronización de iCloud y los perfiles compartidos pueden afectar cuándo desaparece una copia en cada dispositivo. El historial de tomas y la actividad de medicación, citas y condiciones tienen controles de retención independientes por categoría: 30 días por defecto, con opciones de 90, 180, 365 días o conservación permanente. Los informes profesionales se eliminan a los 30 días por defecto. Puedes elegir un plazo de 1 a 365 días.',
    body_en = 'Profiles and health records remain until you delete them. You can remove items or profiles in the app. iCloud sync and shared profiles may affect when a copy disappears from each device. Dose history and medication, appointment, and condition activity logs have independent retention controls by category: 30 days by default, with 90, 180, 365 days, or permanent retention available. Professional reports are deleted after 30 days by default. You can choose a period from 1 to 365 days.',
    updated_at = now()
where app_id = (select id from public.apps where slug = 'vitalspath')
  and section_key = 'privacy';

update public.app_sections
set body = 'Guarda fecha, centro, profesional y notas que te ayuden a preparar la consulta. Los informes profesionales se eliminan a los 30 días por defecto. En Ajustes puedes elegir un plazo de 1 a 365 días. Antes de compartir un resumen, revisa su contenido: puede incluir datos personales de salud.',
    body_en = 'Save the date, clinic, professional, and notes that help you prepare for a visit. Professional reports are deleted after 30 days by default. In Settings, choose a period from 1 to 365 days. Before sharing a summary, review its contents: it may include personal health information.',
    updated_at = now()
where app_id = (select id from public.apps where slug = 'vitalspath')
  and section_key = 'appointments-reports';

update public.app_faqs
set answer = 'Los perfiles y datos de salud permanecen hasta que los elimines. El historial de tomas y la actividad de medicación, citas y condiciones tienen controles independientes por categoría: 30 días por defecto, con opciones de 90, 180, 365 días o conservación permanente. Los informes profesionales se eliminan a los 30 días por defecto y permiten elegir un plazo de 1 a 365 días.',
    answer_en = 'Profiles and health records remain until you delete them. Dose history and medication, appointment, and condition activity logs have independent retention controls by category: 30 days by default, with options for 90, 180, 365 days, or permanent retention. Professional reports are deleted after 30 days by default, with a setting from 1 to 365 days.',
    updated_at = now()
where app_id = (select id from public.apps where slug = 'vitalspath')
  and question_en = 'How long is my data retained?';

update public.app_legal_pages
set body = regexp_replace(
      regexp_replace(
        regexp_replace(body,
          'Firebase Analytics[^.]+[.]',
          'Firebase Analytics solo recibe los eventos de uso configurados por la app cuando activas Analytics. Esos eventos no están diseñados para incluir datos de salud. Las versiones Release envían diagnósticos de fallos a Firebase Crashlytics por defecto, salvo que desactives esa opción en Ajustes.'),
        'El historial de tomas y los registros de actividad[^.]+[.]',
        'El historial de tomas y la actividad de medicación, citas y condiciones tienen controles independientes por categoría: 30 días por defecto, con opciones de 90, 180, 365 días o conservación permanente. Los informes profesionales se eliminan a los 30 días por defecto. Puedes configurar un plazo de 1 a 365 días. Crashlytics inicia la eliminación de los informes de fallos a los 90 días. En GA4, los datos de eventos se conservan 2 meses y los datos de usuario 14 meses. El plazo de los datos de usuario se reinicia cuando hay actividad nueva. Esas son las opciones vigentes en la propiedad a 14 de octubre de 2026 y no se han reducido en esta publicación. Borrar o restablecer los datos locales no cancela una suscripción de Apple ni solicita actualmente a RevenueCat eliminar el registro del cliente. El borrado de CloudKit puede tardar aunque el restablecimiento local haya terminado.'),
      'Esta página describe la configuración conocida a 13 de octubre de 2026.',
      'Esta página describe la configuración conocida a 14 de octubre de 2026.'),
    body_en = regexp_replace(
      regexp_replace(
        regexp_replace(body_en,
          'Firebase Analytics[^.]+[.]',
          'Firebase Analytics receives the app''s configured usage events only when you enable Analytics. Those events are not designed to include health data. Release builds send crash diagnostics to Firebase Crashlytics by default unless you disable that option in Settings.'),
        'Dose history and medication, appointment, and condition activity logs[^.]+[.]',
        'Dose history and medication, appointment, and condition activity logs have independent retention controls by category: 30 days by default, with 90, 180, 365 days, or permanent retention available. Professional reports are deleted after 30 days by default. You can set a period from 1 to 365 days. Crashlytics starts deleting crash reports after 90 days. In GA4, event data is retained for 2 months and user data for 14 months. The user-data period resets when new activity occurs. These are the property settings in effect on October 14, 2026 and they have not been reduced in this publication. Deleting or resetting local app data does not cancel an Apple subscription and does not currently request deletion of the RevenueCat customer record. CloudKit deletion may take longer even after the local reset finishes.'),
      'This page describes the configuration known on October 13, 2026.',
      'This page describes the configuration known on October 14, 2026.'),
    updated_at = now()
where app_id = (select id from public.apps where slug = 'vitalspath')
  and kind = 'privacy';

update public.app_changelog
set release_notes_en = E'- Smart AI Medication Scan: Intelligent suggestion and on-demand specialized model to capture medications and leaflets with high precision.\n- 1-Tap Home Focus: New priority action card to log your next dose in a single tap, plus an all-clear peace of mind banner.\n- Family Circle & Caregiver Alerts: Automated safety notifications when a loved one or dependent has pending or overdue doses.\n- 1-Page Doctor Summary: Export an ultra-concise one-page medical summary tailored for doctor consultations.\n- Reliable Tasks & Reminders: Improved scheduled notifications, background sync, and smooth startup performance.',
    build_number = null,
    updated_at = now()
where app_slug = 'vitalspath' and version = '2.2.4';

insert into public.app_changelog_localizations (
  changelog_id, app_slug, version, locale, release_notes,
  release_notes_format, translated, provider, translated_at
)
select id, app_slug, version, 'en',
  E'- Smart AI Medication Scan: Intelligent suggestion and on-demand specialized model to capture medications and leaflets with high precision.\n- 1-Tap Home Focus: New priority action card to log your next dose in a single tap, plus an all-clear peace of mind banner.\n- Family Circle & Caregiver Alerts: Automated safety notifications when a loved one or dependent has pending or overdue doses.\n- 1-Page Doctor Summary: Export an ultra-concise one-page medical summary tailored for doctor consultations.\n- Reliable Tasks & Reminders: Improved scheduled notifications, background sync, and smooth startup performance.',
  'markdown', false, 'app_store', now()
from public.app_changelog
where app_slug = 'vitalspath' and version = '2.2.4'
on conflict (app_slug, version, locale) do update set
  changelog_id = excluded.changelog_id,
  release_notes = excluded.release_notes,
  release_notes_format = excluded.release_notes_format,
  translated = excluded.translated,
  provider = excluded.provider,
  translated_at = excluded.translated_at,
  updated_at = now();

commit;
