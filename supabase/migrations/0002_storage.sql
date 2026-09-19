-- Storage buckets.
--
-- public-media  : images shown on the site. Public read, admin write.
-- product-files : the sellable PDFs. NEVER publicly readable. Served only
--                 through short-lived signed URLs minted server side after a
--                 verified purchase.

insert into storage.buckets (id, name, public)
values ('public-media', 'public-media', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('product-files', 'product-files', false)
on conflict (id) do nothing;

-- public-media
create policy "public read media" on storage.objects for select
  using (bucket_id = 'public-media');

create policy "admin write media" on storage.objects for insert
  with check (bucket_id = 'public-media' and public.is_admin());

create policy "admin update media" on storage.objects for update
  using (bucket_id = 'public-media' and public.is_admin());

create policy "admin delete media" on storage.objects for delete
  using (bucket_id = 'public-media' and public.is_admin());

-- product-files: no select policy for anon or authenticated. Deliberate.
-- Only the service role reads this bucket, and only to mint a signed URL.
create policy "admin write products" on storage.objects for insert
  with check (bucket_id = 'product-files' and public.is_admin());

create policy "admin update products" on storage.objects for update
  using (bucket_id = 'product-files' and public.is_admin());

create policy "admin delete products" on storage.objects for delete
  using (bucket_id = 'product-files' and public.is_admin());
