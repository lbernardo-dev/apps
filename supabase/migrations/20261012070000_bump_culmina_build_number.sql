begin;

update public.apps
set build_number = '1002026101201',
    updated_at = now()
where slug = 'culmina';

commit;
