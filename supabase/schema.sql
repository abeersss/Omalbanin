-- omalbnin.com admin backend schema
-- Applied to Supabase project `omalbnin` (ref kxpzbzwdketpvguugfck) on 2026-08-07.
-- Kept here so the database can be rebuilt or moved without guesswork.
--
-- Project-level settings chosen at creation:
--   Data API enabled (the browser client needs it)
--   "Automatically expose new tables" DISABLED, per Supabase's own recommendation,
--   so a new table is never reachable over the API until it is granted explicitly
--   Automatic RLS enabled, so a new table is protected the moment it exists

create table if not exists public.admins (
  email text primary key,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id int primary key default 1,
  hijri_adjustment_days int not null default 0,
  featured_dua_slug text,
  featured_ziyara_slug text,
  updated_at timestamptz not null default now(),
  constraint site_settings_single_row check (id = 1)
);

create table if not exists public.content_items (
  slug text primary key,
  type text not null,
  title_ar text not null default '',
  title_en text not null default '',
  summary_ar text default '',
  summary_en text default '',
  body jsonb not null default '[]'::jsonb,
  source jsonb,
  verification_status text not null default 'needs_verification',
  published boolean not null default false,
  updated_at timestamptz not null default now()
);

-- Admin check. SECURITY DEFINER so it can read public.admins even though that
-- table's own policy would otherwise hide it from the caller, and search_path is
-- pinned so the function cannot be redirected at a shadowed table.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $fn$
  select exists (
    select 1 from public.admins a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$fn$;

alter table public.admins enable row level security;
alter table public.site_settings enable row level security;
alter table public.content_items enable row level security;

-- Settings are read by every visitor (the Hijri offset affects what the site
-- shows) but writable only by an admin.
create policy settings_public_read on public.site_settings
  for select using (true);
create policy settings_admin_write on public.site_settings
  for all using (public.is_admin()) with check (public.is_admin());

-- Unpublished content stays invisible to the public. This is what keeps a
-- half-entered dua or ziyara from being served before it has been checked.
create policy content_public_read on public.content_items
  for select using (published or public.is_admin());
create policy content_admin_write on public.content_items
  for all using (public.is_admin()) with check (public.is_admin());

create policy admins_self_read on public.admins
  for select using (public.is_admin());

-- Table privileges.
--
-- These are required and easy to miss. Because "automatically expose new
-- tables" is off, Supabase issues no GRANTs, so Postgres denies at the
-- privilege level before RLS is ever consulted. Without these the API returns
-- "permission denied for table ..." to everyone, including the signed-in admin,
-- and the dashboard cannot read or write anything.
--
-- GRANT is the coarse gate, RLS is the fine one. Granting select to anon does
-- not expose unpublished rows, because content_public_read still filters them.
grant select on public.site_settings to anon, authenticated;
grant insert, update on public.site_settings to authenticated;
grant select on public.content_items to anon, authenticated;
grant insert, update, delete on public.content_items to authenticated;
grant select on public.admins to authenticated;

insert into public.admins (email) values ('engineera209@gmail.com')
  on conflict (email) do nothing;
insert into public.site_settings (id) values (1)
  on conflict (id) do nothing;

-- Verified from an anonymous browser client after applying the above:
--   site_settings          readable (1 row)
--   content_items          0 rows, unpublished content stays hidden
--   insert into content    401
--   update site_settings   401
--   admins                 permission denied
