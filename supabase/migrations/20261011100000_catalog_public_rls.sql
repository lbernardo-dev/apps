-- Expose every non-archived catalog product to the landing while keeping
-- editor policies role-scoped. The original schema only exposed published and
-- coming_soon rows, and broad FOR ALL policies called the editor helper for
-- anonymous reads after its execute permission was hardened.

drop policy if exists "published apps are public" on public.apps;
create policy "published apps are public" on public.apps
  for select using (status in ('published', 'testing', 'development', 'coming_soon'));

drop policy if exists "public read app sections" on public.app_sections;
create policy "public read app sections" on public.app_sections
  for select using (exists (
    select 1 from public.apps
    where apps.id = app_sections.app_id
      and apps.status in ('published', 'testing', 'development', 'coming_soon')
  ));

drop policy if exists "public read app faqs" on public.app_faqs;
create policy "public read app faqs" on public.app_faqs
  for select using (exists (
    select 1 from public.apps
    where apps.id = app_faqs.app_id
      and apps.status in ('published', 'testing', 'development', 'coming_soon')
  ));

drop policy if exists "public read app legal" on public.app_legal_pages;
create policy "public read app legal" on public.app_legal_pages
  for select using (exists (
    select 1 from public.apps
    where apps.id = app_legal_pages.app_id
      and apps.status in ('published', 'testing', 'development', 'coming_soon')
  ));

drop policy if exists "editors manage app links" on public.app_links;
create policy "editors manage app links" on public.app_links
  for all to authenticated using (public.can_edit_content()) with check (public.can_edit_content());

drop policy if exists "editors manage app media" on public.app_media;
create policy "editors manage app media" on public.app_media
  for all to authenticated using (public.can_edit_content()) with check (public.can_edit_content());

drop policy if exists "editors manage store snapshots" on public.app_store_snapshots;
create policy "editors manage store snapshots" on public.app_store_snapshots
  for all to authenticated using (public.can_edit_content()) with check (public.can_edit_content());

drop policy if exists "editors manage app reviews" on public.app_reviews;
create policy "editors manage app reviews" on public.app_reviews
  for all to authenticated using (public.can_edit_content()) with check (public.can_edit_content());

drop policy if exists "editors manage app followers" on public.app_followers;
create policy "editors manage app followers" on public.app_followers
  for all to authenticated using (public.can_edit_content()) with check (public.can_edit_content());

drop policy if exists "editors manage app catalog audits" on public.app_catalog_audits;
create policy "editors manage app catalog audits" on public.app_catalog_audits
  for all to authenticated using (public.can_edit_content()) with check (public.can_edit_content());
