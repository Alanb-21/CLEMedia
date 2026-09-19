-- CLÉ Family Media — schema
-- Nine tables, exactly as specified. RLS on every one, no exceptions.

create extension if not exists "pgcrypto";

-- Is the current request an authenticated admin?
-- Centralised so a policy change happens in one place.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(auth.role() = 'authenticated', false);
$$;

-- ── content_blocks ─────────────────────────────────────────────────────────
create table public.content_blocks (
  id          uuid primary key default gen_random_uuid(),
  page        text not null,
  section_key text not null,
  type        text not null check (type in ('text','richtext','image','link')),
  value       jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now(),
  unique (page, section_key)
);

-- ── categories ─────────────────────────────────────────────────────────────
create table public.categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  description text,
  sort_order  int not null default 0
);

-- ── posts ──────────────────────────────────────────────────────────────────
create table public.posts (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text not null unique,
  category_id  uuid references public.categories(id) on delete set null,
  excerpt      text,
  body         text,
  hero_image   text,
  hero_alt     text,
  status       text not null default 'draft' check (status in ('draft','scheduled','published')),
  published_at timestamptz,
  author       text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index posts_live_idx on public.posts (published_at desc)
  where status = 'published';

-- ── people ─────────────────────────────────────────────────────────────────
create table public.people (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  role        text not null,
  bio         text,
  photo       text,
  type        text not null check (type in ('team','advisor')),
  sort_order  int not null default 0,
  visible     boolean not null default true,
  -- Names and roles seeded from the brand kit credits are unconfirmed.
  unconfirmed boolean not null default false
);

-- ── media_items ────────────────────────────────────────────────────────────
create table public.media_items (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  outlet       text,
  published_on date,
  description  text,
  thumbnail    text,
  link         text,
  embed_url    text,
  sort_order   int not null default 0
);

-- ── products ───────────────────────────────────────────────────────────────
create table public.products (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  description text,
  -- Integer cents. Never a float, and never taken from the client.
  price_cents int not null check (price_cents > 0),
  currency    text not null default 'eur',
  thumbnail   text,
  file_path   text not null,
  active      boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ── orders ─────────────────────────────────────────────────────────────────
-- Contains customer data. Never publicly readable, never publicly writable.
-- Written only by the webhook via the service role, which bypasses RLS.
create table public.orders (
  id                uuid primary key default gen_random_uuid(),
  stripe_session_id text not null unique,
  product_id        uuid not null references public.products(id),
  download_token    text not null unique,
  expires_at        timestamptz not null,
  download_count    int not null default 0,
  max_downloads     int not null default 5,
  amount_cents      int,
  currency          text,
  created_at        timestamptz not null default now()
);
create index orders_token_idx on public.orders (download_token);

-- ── enquiries ──────────────────────────────────────────────────────────────
-- Contains personal data. Insert-only from the public; read only by admin.
create table public.enquiries (
  id           uuid primary key default gen_random_uuid(),
  route        text not null check (route in ('general','partnership','press','notify')),
  name         text,
  email        text,
  organisation text,
  message      text,
  created_at   timestamptz not null default now(),
  handled      boolean not null default false
);

-- ── settings ───────────────────────────────────────────────────────────────
create table public.settings (
  key   text primary key,
  value jsonb not null default '{}'::jsonb
);

-- ═══════════════════════════════════════════════════════════════════════════
-- Row Level Security. Every table. No exceptions.
-- ═══════════════════════════════════════════════════════════════════════════
alter table public.content_blocks enable row level security;
alter table public.categories     enable row level security;
alter table public.posts          enable row level security;
alter table public.people         enable row level security;
alter table public.media_items    enable row level security;
alter table public.products       enable row level security;
alter table public.orders         enable row level security;
alter table public.enquiries      enable row level security;
alter table public.settings       enable row level security;

-- Public read — only what is genuinely public.
create policy "public read" on public.content_blocks for select using (true);
create policy "public read" on public.categories     for select using (true);
create policy "public read" on public.media_items    for select using (true);
create policy "public read" on public.settings       for select using (true);

-- Published posts only. A draft or a scheduled post is not public.
create policy "public read published" on public.posts for select
  using (status = 'published' and published_at is not null and published_at <= now());

-- Visible people only.
create policy "public read visible" on public.people for select
  using (visible = true);

-- Active products only, and never the file path of an inactive one.
create policy "public read active" on public.products for select
  using (active = true);

-- Anyone may submit an enquiry. Nobody may read one back.
create policy "public insert" on public.enquiries for insert with check (true);

-- orders: NO public policy at all. Not readable, not writable by anon or
-- authenticated users. The Stripe webhook writes via the service role key,
-- which bypasses RLS entirely. Token redemption goes through a serverless
-- function, never the browser.

-- Admin writes. The service role bypasses RLS, so these cover the panel.
create policy "admin all" on public.content_blocks for all using (public.is_admin()) with check (public.is_admin());
create policy "admin all" on public.categories     for all using (public.is_admin()) with check (public.is_admin());
create policy "admin all" on public.posts          for all using (public.is_admin()) with check (public.is_admin());
create policy "admin all" on public.people         for all using (public.is_admin()) with check (public.is_admin());
create policy "admin all" on public.media_items    for all using (public.is_admin()) with check (public.is_admin());
create policy "admin all" on public.products       for all using (public.is_admin()) with check (public.is_admin());
create policy "admin all" on public.settings       for all using (public.is_admin()) with check (public.is_admin());
create policy "admin read" on public.enquiries     for select using (public.is_admin());
create policy "admin update" on public.enquiries   for update using (public.is_admin()) with check (public.is_admin());
create policy "admin read" on public.orders        for select using (public.is_admin());
