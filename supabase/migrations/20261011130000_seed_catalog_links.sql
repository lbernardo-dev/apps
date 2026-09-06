-- Keep product navigation discoverable from the database for every catalog
-- item. TestFlight/download links are intentionally omitted until public URLs
-- exist; follow_enabled remains the truthful pre-release action.
insert into public.app_links (app_id, kind, label, label_en, url, is_primary, is_external)
select id, 'support', 'Soporte', 'Support', '/apps/' || slug || '/support', false, false
from public.apps
where status in ('published', 'testing', 'development', 'coming_soon')
on conflict do nothing;

insert into public.app_links (app_id, kind, label, label_en, url, is_primary, is_external)
select id, 'feedback', 'Enviar comentarios', 'Send feedback', '/apps/' || slug || '#feedback', false, false
from public.apps
where status in ('published', 'testing', 'development', 'coming_soon')
on conflict do nothing;

insert into public.app_links (app_id, kind, label, label_en, url, is_primary, is_external)
select apps.id, legal.kind,
  case legal.kind
    when 'privacy' then 'Privacidad'
    when 'terms' then 'Términos y condiciones'
    when 'subscriptions' then 'Suscripciones'
  end,
  case legal.kind
    when 'privacy' then 'Privacy'
    when 'terms' then 'Terms and conditions'
    when 'subscriptions' then 'Subscriptions'
  end,
  '/apps/' || apps.slug || '/' || legal.kind,
  false, false
from public.apps
cross join (values ('privacy'), ('terms'), ('subscriptions')) as legal(kind)
where apps.status in ('published', 'testing', 'development', 'coming_soon')
  and exists (
    select 1 from public.app_legal_pages
    where app_legal_pages.app_id = apps.id
      and app_legal_pages.kind = legal.kind
  )
on conflict do nothing;
