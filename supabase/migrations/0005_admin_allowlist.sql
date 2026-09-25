-- Restrict admin to an explicit allowlist.
--
-- Renumbered from 0004 to 0005: Alan's 0004_enquiry_routes.sql landed on the
-- branch first and two migrations cannot share a number.
--
-- THE PROBLEM THIS FIXES
--
-- 0001 defined:
--
--   select coalesce(auth.role() = 'authenticated', false)
--
-- `authenticated` is the role every signed-in Supabase user carries. So
-- is_admin() returned true for ANY account with a session, and it is the sole
-- predicate on the "admin all" policy of all nine tables and on every write
-- policy for both storage buckets. If email sign-ups are enabled on the
-- project, anyone who registers can read `enquiries` and `orders`, rewrite
-- every page, replace any product file and delete the media bucket.
--
-- The brief calls for a single admin role, extensible later. An allowlist
-- table is that, and it is checked by user id rather than by the presence of
-- a session.

create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  added_at   timestamptz not null default now(),
  note       text
);

alter table public.admins enable row level security;

-- An admin may see who else is an admin. Nobody else may see the table at
-- all, and nothing may write to it from the API: membership is granted with
-- the service role or from the SQL editor, deliberately, so that a compromised
-- admin session cannot mint another admin.
create policy "admin read" on public.admins for select using (public.is_admin());

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins a where a.user_id = auth.uid()
  );
$$;

-- Grant Conor his access by user id, once the account exists:
--
--   insert into public.admins (user_id, email, note)
--   select id, email, 'Client, primary admin' from auth.users
--   where email = '<conor@clefamilymedia.com>';
--
-- Also turn OFF public sign-ups in Supabase Auth settings. The allowlist is
-- the control, but an open sign-up form on a site with one intended user is
-- an invitation regardless.
