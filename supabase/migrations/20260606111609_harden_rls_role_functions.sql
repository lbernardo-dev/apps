-- Restrict helper functions from being callable as public RPC endpoints.
-- RLS policies can still use them internally through role-specific policies.
revoke execute on function public.is_admin() from public, anon, authenticated;
revoke execute on function public.can_edit_content() from public, anon, authenticated;

do $$
begin
  if exists (
    select 1 from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'rls_auto_enable' and p.pronargs = 0
  ) then
    revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
  end if;
end $$;

-- Split broad FOR ALL editor policies into command-specific policies for authenticated users.
drop policy if exists "editors manage apps" on public.apps;
create policy "editors insert apps" on public.apps for insert to authenticated with check (public.can_edit_content());
create policy "editors update apps" on public.apps for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "editors delete apps" on public.apps for delete to authenticated using (public.can_edit_content());
create policy "editors read apps" on public.apps for select to authenticated using (public.can_edit_content());

drop policy if exists "editors manage app sections" on public.app_sections;
create policy "editors insert app sections" on public.app_sections for insert to authenticated with check (public.can_edit_content());
create policy "editors update app sections" on public.app_sections for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "editors delete app sections" on public.app_sections for delete to authenticated using (public.can_edit_content());
create policy "editors read app sections" on public.app_sections for select to authenticated using (public.can_edit_content());

drop policy if exists "editors manage app faqs" on public.app_faqs;
create policy "editors insert app faqs" on public.app_faqs for insert to authenticated with check (public.can_edit_content());
create policy "editors update app faqs" on public.app_faqs for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "editors delete app faqs" on public.app_faqs for delete to authenticated using (public.can_edit_content());
create policy "editors read app faqs" on public.app_faqs for select to authenticated using (public.can_edit_content());

drop policy if exists "editors manage app legal" on public.app_legal_pages;
create policy "editors insert app legal" on public.app_legal_pages for insert to authenticated with check (public.can_edit_content());
create policy "editors update app legal" on public.app_legal_pages for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "editors delete app legal" on public.app_legal_pages for delete to authenticated using (public.can_edit_content());
create policy "editors read app legal" on public.app_legal_pages for select to authenticated using (public.can_edit_content());

drop policy if exists "editors manage home sections" on public.home_sections;
create policy "editors insert home sections" on public.home_sections for insert to authenticated with check (public.can_edit_content());
create policy "editors update home sections" on public.home_sections for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "editors delete home sections" on public.home_sections for delete to authenticated using (public.can_edit_content());
create policy "editors read home sections" on public.home_sections for select to authenticated using (public.can_edit_content());

drop policy if exists "editors manage site pages" on public.site_pages;
create policy "editors insert site pages" on public.site_pages for insert to authenticated with check (public.can_edit_content());
create policy "editors update site pages" on public.site_pages for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "editors delete site pages" on public.site_pages for delete to authenticated using (public.can_edit_content());
create policy "editors read site pages" on public.site_pages for select to authenticated using (public.can_edit_content());

drop policy if exists "editors manage testimonials" on public.testimonials;
create policy "editors insert testimonials" on public.testimonials for insert to authenticated with check (public.can_edit_content());
create policy "editors update testimonials" on public.testimonials for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "editors delete testimonials" on public.testimonials for delete to authenticated using (public.can_edit_content());
create policy "editors read testimonials" on public.testimonials for select to authenticated using (public.can_edit_content());

drop policy if exists "editors manage seo metadata" on public.seo_metadata;
create policy "editors insert seo metadata" on public.seo_metadata for insert to authenticated with check (public.can_edit_content());
create policy "editors update seo metadata" on public.seo_metadata for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "editors delete seo metadata" on public.seo_metadata for delete to authenticated using (public.can_edit_content());
create policy "editors read seo metadata" on public.seo_metadata for select to authenticated using (public.can_edit_content());

drop policy if exists "editors manage assets metadata" on public.assets;
create policy "editors insert assets metadata" on public.assets for insert to authenticated with check (public.can_edit_content());
create policy "editors update assets metadata" on public.assets for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
create policy "editors delete assets metadata" on public.assets for delete to authenticated using (public.can_edit_content());
create policy "editors read assets metadata" on public.assets for select to authenticated using (public.can_edit_content());

-- Add FK indexes for common joins.
create index if not exists app_sections_app_id_idx on public.app_sections(app_id);
create index if not exists app_faqs_app_id_idx on public.app_faqs(app_id);
create index if not exists app_legal_pages_app_id_idx on public.app_legal_pages(app_id);;
