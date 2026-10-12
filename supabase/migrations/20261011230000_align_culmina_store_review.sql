begin;

update public.apps
set status = 'coming_soon',
    version = '1.0.0',
    build_number = '1002026100303',
    updated_at = now()
where slug = 'culmina';

update public.app_legal_pages
set title = 'Condiciones de compra y suscripción de Culmina Pro',
    title_en = 'Culmina Pro Purchase and Subscription Terms',
    body = $culmina_es$Culmina Pro se contrata dentro de la app mediante Apple In-App Purchase. Los planes mensual y anual son suscripciones con renovación automática; Culmina Pro Vitalicio es un pago único.
Apple muestra el precio local, la duración y las condiciones antes de confirmar. Las suscripciones mensual y anual incluyen una prueba gratuita de una semana para cuentas elegibles. Después de la prueba, se renuevan al precio y periodo indicados por Apple salvo que canceles antes de la siguiente renovación.
Puedes gestionar o cancelar las suscripciones en Ajustes > tu nombre > Suscripciones. Eliminar la app no cancela una suscripción. La compra vitalicia no se renueva.
Apple gestiona las solicitudes de reembolso en reportaproblem.apple.com.
Contacto de soporte: romerodev.app@gmail.com.$culmina_es$,
    body_en = $culmina_en$Culmina Pro is purchased in the app through Apple In-App Purchase. Monthly and Annual are auto-renewable subscriptions; Culmina Pro Lifetime is a one-time purchase.
Apple shows the local price, duration, and terms before confirmation. Monthly and Annual include a one-week free trial for eligible accounts. After the trial, they renew at the price and period shown by Apple unless cancelled before the next renewal.
Manage or cancel subscriptions in Settings > your name > Subscriptions. Deleting the app does not cancel a subscription. The Lifetime purchase does not renew.
Apple handles refund requests at reportaproblem.apple.com.
Support contact: romerodev.app@gmail.com.$culmina_en$,
    updated_at = now()
where kind = 'subscriptions'
  and app_id = (select id from public.apps where slug = 'culmina');

update public.app_feature_comparisons
set free_status = 'limited',
    free_detail = 'El plan gratuito incluye hasta 3 iniciativas, cada una organizada por fases.',
    free_detail_en = 'The free plan includes up to 3 initiatives, each organised into stages.',
    pro_status = 'included',
    pro_detail = 'Crea iniciativas sin límite y organiza cada proyecto por fases.',
    pro_detail_en = 'Create unlimited initiatives and organise each project into stages.',
    source_note = 'Entitlements verificados en la versión iOS 1.0.0'
where feature_key = 'initiatives-stages'
  and app_id = (select id from public.apps where slug = 'culmina');

update public.app_feature_comparisons
set pro_detail = 'Mantén las acciones y su seguimiento enlazados a cada iniciativa.',
    pro_detail_en = 'Keep actions and their follow-up linked to each initiative.',
    source_note = 'Entitlements verificados en la versión iOS 1.0.0'
where feature_key = 'actions-dependencies'
  and app_id = (select id from public.apps where slug = 'culmina');

update public.app_feature_comparisons
set pro_detail = 'Las mismas opciones de datos locales están incluidas en Pro.',
    pro_detail_en = 'The same local data options are included in Pro.',
    source_note = 'Entitlements verificados en la versión iOS 1.0.0'
where feature_key = 'local-data'
  and app_id = (select id from public.apps where slug = 'culmina');

update public.app_feature_comparisons
set pro_detail = 'La exportación e importación JSON también están incluidas en Pro.',
    pro_detail_en = 'JSON export and import are also included in Pro.',
    source_note = 'Entitlements verificados en la versión iOS 1.0.0'
where feature_key = 'export-import'
  and app_id = (select id from public.apps where slug = 'culmina');

update public.app_feature_comparisons
set feature_key = 'seasonal-themes',
    title = 'Temas de temporada',
    title_en = 'Seasonal themes',
    free_status = 'limited',
    free_detail = 'El tema vigente se aplica automáticamente.',
    free_detail_en = 'The active seasonal theme is applied automatically.',
    pro_status = 'included',
    pro_detail = 'Elige manualmente el tema de temporada mientras el evento está activo.',
    pro_detail_en = 'Choose the seasonal theme manually while its event is active.',
    source_note = 'Entitlements verificados en la versión iOS 1.0.0'
where feature_key = 'finance-collaboration'
  and app_id = (select id from public.apps where slug = 'culmina');

insert into public.app_feature_comparisons (
  app_id, feature_key, title, title_en, free_status, free_detail, free_detail_en,
  pro_status, pro_detail, pro_detail_en, sort_order, source_note
)
select id, 'lead-status-filters', 'Filtros por estado', 'Status filters',
  'not_included', 'La versión gratuita no incluye filtros por estado.',
  'The free plan does not include status filters.',
  'included', 'Filtra los registros por estado para centrarte en los que necesitan atención.',
  'Filter records by status to focus on the ones that need attention.',
  20, 'Entitlements verificados en la versión iOS 1.0.0'
from public.apps where slug = 'culmina'
on conflict (app_id, feature_key) do update set
  title = excluded.title,
  title_en = excluded.title_en,
  free_status = excluded.free_status,
  free_detail = excluded.free_detail,
  free_detail_en = excluded.free_detail_en,
  pro_status = excluded.pro_status,
  pro_detail = excluded.pro_detail,
  pro_detail_en = excluded.pro_detail_en,
  sort_order = excluded.sort_order,
  source_note = excluded.source_note;

commit;
