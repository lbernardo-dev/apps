-- Publish the latest verified App Store releases immediately. Future releases
-- are appended by scripts/sync-appstore.mjs in the scheduled workflow.

do $seed$
declare
  payload jsonb := $json$[
    {
      "app_slug": "vitalspath",
      "version": "2.2.2",
      "build_number": null,
      "release_notes": "- Biblioteca profesional de informes: Organiza tus informes con estados claros, estado de revisión, detalles de calidad y procedencia, y borrado recuperable.\n- Compartición más segura: Los informes se cifran durante el almacenamiento e incorporan exportaciones con privacidad y redacción de datos, consentimiento explícito e historial de compartición auditable.\n- Resúmenes de cuidado más útiles: Los informes programados y los paneles facilitan revisar la sincronización, la actividad y el contexto del informe antes de una consulta.\n- Más fiabilidad y pulido: Mejor clasificación de la presión arterial, mayor estabilidad del diseño PDF y mejor navegación de informes en iPhone y iPad.",
      "release_notes_en": "- Professional Report Library: Organize your reports with clear status, review status, quality and provenance details, and recoverable deletion.\n- More secure sharing: Reports are encrypted during storage and incorporate exports with privacy and data redaction, explicit consent, and auditable sharing history.\n- Most helpful care summaries: Scheduled reports and dashboards make it easy to review report timing, activity, and context before a consultation.\n- More reliability and polish: Better blood pressure rating, greater stability of PDF design and better report navigation on iPhone and iPad.",
      "release_date": "2026-08-29",
      "source_url": "https://apps.apple.com/es/app/vitalspath-control-medicaci%C3%B3n/id6760143192"
    },
    {
      "app_slug": "reps",
      "version": "1.0.7",
      "build_number": null,
      "release_notes": "Novedades en StreakReps 1.0.7:\n- Experiencia universal: navegación y contenido adaptados a iPhone e iPad en portrait, landscape, Split View y Stage Manager.\n- Ecosistema Apple: Widgets con tamaños para iPad, Atajos para las secciones principales, control de Control Center y Live Activity con controles de sesión.\n- Registro y estabilidad: mejoras en la interfaz, el scroll, la accesibilidad y la sincronización con Apple Watch.\n\n¡Gracias por entrenar con StreakReps — mantén tu racha imparable!",
      "release_notes_en": "What's new in StreakReps 1.0.7:\n- Universal experience: navigation and content adapted to iPhone and iPad in portrait, landscape, Split View and Stage Manager.\n- Apple Ecosystem: Widgets with sizes for iPad, Shortcuts for the main sections, Control Center control and Live Activity with session controls.\n- Registration and stability: improvements in the interface, scroll, accessibility and synchronization with Apple Watch.\n\nThank you for training with StreakReps — keep your streak unstoppable!",
      "release_date": "2026-08-27",
      "source_url": "https://apps.apple.com/es/app/streakreps-rutinas-y-progreso/id6775801149"
    },
    {
      "app_slug": "shield",
      "version": "1.0.6",
      "build_number": "106202608271",
      "release_notes": "Novedades en MaskID 1.0.6:\n- Desbloqueo biométrico mejorado con Face ID: autenticación automática e instantánea al reabrir la app.\n- Configuración de PIN personal: crea y confirma tu propio código PIN de 6 dígitos en el onboarding o adminístralo en Ajustes.\n- Privacidad de Cero Conocimiento: purga completa de datos residuales para garantizar que tu espacio privado esté 100% bajo tu control.\n- El build 106202608271 incluye mejoras de seguridad, optimizaciones de rendimiento y localización completa.",
      "release_notes_en": "What's new in MaskID 1.0.6:\n- Enhanced biometric unlock with Face ID: automatic and instant authentication when you reopen the app.\n- Personal PIN settings: create and confirm your own 6-digit PIN during onboarding or manage it in Settings.\n- Zero-Knowledge Privacy: complete purge of residual data to ensure your private space stays 100% under your control.\n- Build 106202608271 includes security improvements, performance optimizations, and full localization.",
      "release_date": "2026-08-27",
      "source_url": "https://apps.apple.com/es/app/maskid-protege-tu-identidad/id6790398619"
    }
  ]$json$::jsonb;
begin
  insert into public.app_changelog (
    app_slug, version, build_number, release_notes, release_notes_en,
    release_notes_format, release_date, is_current, source, source_url,
    detected_at, translated_locales, translation_status
  )
  select p.app_slug, p.version, p.build_number, p.release_notes,
    p.release_notes_en, 'markdown', p.release_date::date, true, 'app_store',
    p.source_url, now(), array['es', 'en'], 'complete'
  from jsonb_to_recordset(payload) as p(
    app_slug text, version text, build_number text, release_notes text,
    release_notes_en text, release_date text, source_url text
  )
  on conflict (app_slug, version) do update set
    build_number = excluded.build_number,
    release_notes = excluded.release_notes,
    release_notes_en = excluded.release_notes_en,
    release_notes_format = excluded.release_notes_format,
    release_date = excluded.release_date,
    is_current = excluded.is_current,
    source = excluded.source,
    source_url = excluded.source_url,
    translated_locales = excluded.translated_locales,
    translation_status = excluded.translation_status;

  update public.app_changelog c
  set is_current = false
  where c.app_slug in (select p.app_slug from jsonb_to_recordset(payload) as p(app_slug text))
    and c.version not in (select p.version from jsonb_to_recordset(payload) as p(app_slug text, version text));

  insert into public.app_changelog_localizations (
    changelog_id, app_slug, version, locale, release_notes,
    release_notes_format, translated, provider, translated_at
  )
  select c.id, p.app_slug, p.version, 'es', p.release_notes,
    'markdown', false, 'app_store', now()
  from jsonb_to_recordset(payload) as p(
    app_slug text, version text, release_notes text, release_notes_en text
  )
  join public.app_changelog c on c.app_slug = p.app_slug and c.version = p.version
  on conflict (app_slug, version, locale) do update set
    release_notes = excluded.release_notes,
    translated = excluded.translated,
    provider = excluded.provider,
    translated_at = excluded.translated_at;

  insert into public.app_changelog_localizations (
    changelog_id, app_slug, version, locale, release_notes,
    release_notes_format, translated, provider, translated_at
  )
  select c.id, p.app_slug, p.version, 'en', p.release_notes_en,
    'markdown', true, 'mymemory', now()
  from jsonb_to_recordset(payload) as p(
    app_slug text, version text, release_notes text, release_notes_en text
  )
  join public.app_changelog c on c.app_slug = p.app_slug and c.version = p.version
  on conflict (app_slug, version, locale) do update set
    release_notes = excluded.release_notes,
    translated = excluded.translated,
    provider = excluded.provider,
    translated_at = excluded.translated_at;
end
$seed$;
