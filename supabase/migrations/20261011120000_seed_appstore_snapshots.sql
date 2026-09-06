-- Seed the last verified public App Store facts. The sync job refreshes these
-- rows when a Supabase service role is configured.
do $store$
declare
  snapshots jsonb := $payload$[{"app_slug":"vitalspath","app_store_id":"6760143192","track_name":"VitalsPath: Control Medicación","track_view_url":"https://apps.apple.com/es/app/vitalspath-control-medicaci%C3%B3n/id6760143192","version":"2.2.2","release_notes":"• Biblioteca profesional de informes: Organiza tus informes con estados claros, estado de revisión, detalles de calidad y procedencia, y borrado recuperable.\n• Compartición más segura: Los informes se cifran durante el almacenamiento e incorporan exportaciones con privacidad y redacción de datos, consentimiento explícito e historial de compartición auditable.\n• Resúmenes de cuidado más útiles: Los informes programados y los paneles facilitan revisar la sincronización, la actividad y el contexto del informe antes de una consulta.\n• Más fiabilidad y pulido: Mejor clasificación de la presión arterial, mayor estabilidad del diseño PDF y mejor navegación de informes en iPhone y iPad.","current_version_release_date":"2026-08-29T19:27:31Z","formatted_price":"Gratis","developer":"Lester Romero Bernardo","languages":["AR","BS","CA","HR","CS","DA","NL","EN","FI","FR","DE","EL","HE","HI","HU","ID","IT","JA","KO","MS","NB","PL","PT","RO","RU","ZH","SK","ES","SV","TH","ZH","TR","UK","VI"],"file_size_bytes":"199460864","average_rating":5,"user_rating_count":4,"synced_at":"2026-09-06T18:42:37.916Z","reviews":[{"author":"Josanandrade","rating":5,"title":"Recomendada","content":"App práctica y y fácil de usar. Se pueden gestionar las citas médicas y hacer el seguimiento de mi salud, toma de pastillas y demás en una misma app, por lo que ahorra tiempo y te ofrece control total. 100% recomendable.","date":"2026-05-05"},{"author":"Ale Rodríguez 🎀","rating":5,"title":"Recomendada al 100%","content":"Descubrí esta app y, sinceramente, se ha convertido en una aliada imprescindible. Es como tener un espacio personal donde todo está conectado: desde cómo te sientes cada día hasta el control de tus medicamentos. Es una herramienta muy completa y práctica, ideal para quienes buscan tener su salud organizada de forma sencilla.","date":"2026-04-14"},{"author":"Juanma ☕️","rating":5,"title":"Everything I need in one app","content":"I’ve been looking for an app that actually keeps my health organized. This is perfect for syncing medication reminders and doctor appointments with alarms you actually notice. The interface is super clean and intuitive no clutter at all. It’s honestly made my routine so much easier to manage. Thanks!!","date":"2026-04-03"},{"author":"Yilian ❤️","rating":5,"title":"Realmente útil!!!","content":"Valoro mucho lo fácil e intuitiva que resulta. En pocos segundos puedo registrar síntomas, medicamentos y cualquier cambio que note en mi día a día . También me encanta que permita guardar mis planes médicos y tener a la mano todas mis citas médicas. Con esta app no me olvido de nada importante. \nLa interfaz es clara , ordenada y pensada para cualquier persona, además de muy personalizable. Gracias a esta app tengo un mejor control de mi salud y el de mi familia. Además de poder compartir con mis médicos la información precisa. Sin duda una herramienta muy completa y práctica . La recomiendo !!!!!!","date":"2026-03-31"}]},{"app_slug":"reps","app_store_id":"6775801149","track_name":"StreakReps: Rutinas y Progreso","track_view_url":"https://apps.apple.com/es/app/streakreps-rutinas-y-progreso/id6775801149","version":"1.0.7","release_notes":"Novedades en StreakReps 1.0.7:\n• Experiencia universal: navegación y contenido adaptados a iPhone e iPad en portrait, landscape, Split View y Stage Manager.\n• Ecosistema Apple: Widgets con tamaños para iPad, Atajos para las secciones principales, control de Control Center y Live Activity con controles de sesión.\n• Registro y estabilidad: mejoras en la interfaz, el scroll, la accesibilidad y la sincronización con Apple Watch.\n\n¡Gracias por entrenar con StreakReps — mantén tu racha imparable!","current_version_release_date":"2026-08-27T06:14:39Z","formatted_price":"Gratis","developer":"Lester Romero Bernardo","languages":["EN","ES"],"file_size_bytes":"149691392","average_rating":5,"user_rating_count":1,"synced_at":"2026-09-06T18:42:37.933Z","reviews":[]},{"app_slug":"shield","app_store_id":"6790398619","track_name":"MaskID: Protege tu Identidad","track_view_url":"https://apps.apple.com/es/app/maskid-protege-tu-identidad/id6790398619","version":"1.0.6","release_notes":"Novedades en MaskID 1.0.6:\n• Desbloqueo biométrico mejorado con Face ID: autenticación automática e instantánea al reabrir la app.\n• Configuración de PIN personal: crea y confirma tu propio código PIN de 6 dígitos en el onboarding o adminístralo en Ajustes.\n• Privacidad de Cero Conocimiento: purga completa de datos residuales para garantizar que tu espacio privado esté 100% bajo tu control.\n• El build 106202608271 incluye mejoras de seguridad, optimizaciones de rendimiento y localización completa.","current_version_release_date":"2026-08-27T19:50:21Z","formatted_price":"Gratis","developer":"Lester Romero Bernardo","languages":["EN","ES"],"file_size_bytes":"83062784","average_rating":5,"user_rating_count":1,"synced_at":"2026-09-06T18:42:37.950Z","reviews":[]}]$payload$::jsonb;
begin
  insert into public.app_store_snapshots (
    app_id, app_slug, app_store_id, track_name, track_view_url, version,
    release_notes, current_version_release_date, formatted_price, developer,
    languages, file_size_bytes, average_rating, user_rating_count, synced_at
  )
  select apps.id, payload.app_slug, payload.app_store_id, payload.track_name,
    payload.track_view_url, payload.version, payload.release_notes,
    payload.current_version_release_date::timestamptz, payload.formatted_price,
    payload.developer, payload.languages, payload.file_size_bytes,
    payload.average_rating, payload.user_rating_count, payload.synced_at::timestamptz
  from jsonb_to_recordset(snapshots) as payload(
    app_slug text, app_store_id text, track_name text, track_view_url text,
    version text, release_notes text, current_version_release_date text,
    formatted_price text, developer text, languages text[],
    file_size_bytes text, average_rating numeric, user_rating_count integer,
    synced_at text, reviews jsonb
  )
  join public.apps on apps.slug = payload.app_slug
  on conflict (app_slug) do update set
    app_id = excluded.app_id,
    app_store_id = excluded.app_store_id,
    track_name = excluded.track_name,
    track_view_url = excluded.track_view_url,
    version = excluded.version,
    release_notes = excluded.release_notes,
    current_version_release_date = excluded.current_version_release_date,
    formatted_price = excluded.formatted_price,
    developer = excluded.developer,
    languages = excluded.languages,
    file_size_bytes = excluded.file_size_bytes,
    average_rating = excluded.average_rating,
    user_rating_count = excluded.user_rating_count,
    synced_at = excluded.synced_at;

  insert into public.app_reviews (
    app_slug, source, author, rating, title, content, review_date, is_published
  )
  select payload.app_slug, 'app_store', review.author, review.rating,
    review.title, review.content, review.date::date, true
  from jsonb_to_recordset(snapshots) as payload(app_slug text, reviews jsonb)
  cross join lateral jsonb_to_recordset(payload.reviews) as review(
    author text, rating integer, title text, content text, date text
  )
  on conflict (app_slug, source, author, review_date, content) do update set
    rating = excluded.rating,
    title = excluded.title,
    is_published = excluded.is_published;
end
$store$;
