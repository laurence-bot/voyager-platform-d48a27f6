-- =============================================================================
-- La Voyagerie — Schéma complet à exécuter dans ton Supabase externe
-- Dashboard → SQL Editor → New query → coller → Run
-- =============================================================================

-- 1) ENUMS ---------------------------------------------------------------------
do $$ begin
  create type public.app_role as enum ('admin', 'customer', 'agence');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.trip_status as enum ('devis', 'confirme', 'en_cours', 'termine', 'annule');
exception when duplicate_object then null; end $$;

-- 2) TABLE: profiles -----------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  email text not null,
  first_name text,
  last_name text,
  phone text,
  birth_date date,
  nationality text,
  address text,
  city text,
  postal_code text,
  country text,
  passport_number text,
  passport_expiry date,
  emergency_contact_name text,
  emergency_contact_phone text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select, insert, update, delete on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select
  to authenticated using (auth.uid() = user_id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles for insert
  to authenticated with check (auth.uid() = user_id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles for update
  to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 3) TABLE: user_roles ---------------------------------------------------------
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

drop policy if exists "user_roles_select_own" on public.user_roles;
create policy "user_roles_select_own" on public.user_roles for select
  to authenticated using (auth.uid() = user_id);

drop policy if exists "user_roles_admin_all" on public.user_roles;
create policy "user_roles_admin_all" on public.user_roles for all
  to authenticated using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- 4) TABLE: trips --------------------------------------------------------------
create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  destination text not null,
  start_date date,
  end_date date,
  travelers int,
  amount numeric,
  status public.trip_status not null default 'devis',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select, insert, update, delete on public.trips to authenticated;
grant all on public.trips to service_role;
alter table public.trips enable row level security;

drop policy if exists "trips_select_own_or_admin" on public.trips;
create policy "trips_select_own_or_admin" on public.trips for select
  to authenticated using (auth.uid() = user_id or public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'agence'));

drop policy if exists "trips_admin_write" on public.trips;
create policy "trips_admin_write" on public.trips for all
  to authenticated using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'agence'))
  with check (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'agence'));

-- 5) TABLE: invoices -----------------------------------------------------------
create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  trip_id uuid references public.trips(id) on delete set null,
  invoice_number text not null,
  amount numeric not null default 0,
  issued_at timestamptz not null default now(),
  pdf_path text,
  created_at timestamptz not null default now()
);

grant select, insert, update, delete on public.invoices to authenticated;
grant all on public.invoices to service_role;
alter table public.invoices enable row level security;

drop policy if exists "invoices_select_own_or_admin" on public.invoices;
create policy "invoices_select_own_or_admin" on public.invoices for select
  to authenticated using (auth.uid() = user_id or public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'agence'));

drop policy if exists "invoices_admin_write" on public.invoices;
create policy "invoices_admin_write" on public.invoices for all
  to authenticated using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'agence'))
  with check (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'agence'));

-- 6) TABLE: trip_documents -----------------------------------------------------
create table if not exists public.trip_documents (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  category text not null default 'autre',
  file_name text not null,
  file_path text not null,
  created_at timestamptz not null default now()
);

grant select, insert, update, delete on public.trip_documents to authenticated;
grant all on public.trip_documents to service_role;
alter table public.trip_documents enable row level security;

drop policy if exists "trip_documents_select_own_or_admin" on public.trip_documents;
create policy "trip_documents_select_own_or_admin" on public.trip_documents for select
  to authenticated using (auth.uid() = user_id or public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'agence'));

drop policy if exists "trip_documents_admin_write" on public.trip_documents;
create policy "trip_documents_admin_write" on public.trip_documents for all
  to authenticated using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'agence'))
  with check (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'agence'));

-- 7) TABLE: contact_requests (public: insertion anonyme depuis le formulaire) --
create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  destination text not null,
  period text not null,
  travelers text not null,
  budget text not null,
  message text not null,
  ip_hash text,
  user_agent text,
  status text not null default 'nouveau',
  created_at timestamptz not null default now()
);

grant insert on public.contact_requests to anon;
grant select, insert, update, delete on public.contact_requests to authenticated;
grant all on public.contact_requests to service_role;
alter table public.contact_requests enable row level security;

drop policy if exists "contact_requests_insert_anyone" on public.contact_requests;
create policy "contact_requests_insert_anyone" on public.contact_requests for insert
  to anon, authenticated with check (true);

drop policy if exists "contact_requests_admin_read" on public.contact_requests;
create policy "contact_requests_admin_read" on public.contact_requests for select
  to authenticated using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'agence'));

drop policy if exists "contact_requests_admin_write" on public.contact_requests;
create policy "contact_requests_admin_write" on public.contact_requests for update
  to authenticated using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'agence'))
  with check (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'agence'));

-- 8) TABLE: appointments (public: prise de RDV anonyme) -----------------------
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  destination text,
  appointment_date date not null,
  appointment_slot text not null,
  contact_mode text not null default 'agence',
  message text,
  status text not null default 'nouveau',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant insert on public.appointments to anon;
grant select, insert, update, delete on public.appointments to authenticated;
grant all on public.appointments to service_role;
alter table public.appointments enable row level security;

drop policy if exists "appointments_insert_anyone" on public.appointments;
create policy "appointments_insert_anyone" on public.appointments for insert
  to anon, authenticated with check (true);

drop policy if exists "appointments_admin_read" on public.appointments;
create policy "appointments_admin_read" on public.appointments for select
  to authenticated using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'agence'));

drop policy if exists "appointments_admin_write" on public.appointments;
create policy "appointments_admin_write" on public.appointments for update
  to authenticated using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'agence'))
  with check (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'agence'));

-- 9) Trigger: création automatique du profil à l'inscription ------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (user_id, email, first_name, last_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name'
  ) on conflict (user_id) do nothing;

  insert into public.user_roles (user_id, role)
  values (new.id, 'customer') on conflict do nothing;

  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- 10) STORAGE BUCKETS ---------------------------------------------------------
insert into storage.buckets (id, name, public) values ('trip-documents', 'trip-documents', false)
  on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('invoices', 'invoices', false)
  on conflict (id) do nothing;

drop policy if exists "trip_documents_read_own_or_admin" on storage.objects;
create policy "trip_documents_read_own_or_admin" on storage.objects for select
  to authenticated using (
    bucket_id = 'trip-documents' and (
      (storage.foldername(name))[1] = auth.uid()::text
      or public.has_role(auth.uid(), 'admin')
      or public.has_role(auth.uid(), 'agence')
    )
  );

drop policy if exists "trip_documents_write_admin" on storage.objects;
create policy "trip_documents_write_admin" on storage.objects for all
  to authenticated using (
    bucket_id = 'trip-documents' and (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'agence'))
  ) with check (
    bucket_id = 'trip-documents' and (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'agence'))
  );

drop policy if exists "invoices_read_own_or_admin" on storage.objects;
create policy "invoices_read_own_or_admin" on storage.objects for select
  to authenticated using (
    bucket_id = 'invoices' and (
      (storage.foldername(name))[1] = auth.uid()::text
      or public.has_role(auth.uid(), 'admin')
      or public.has_role(auth.uid(), 'agence')
    )
  );

drop policy if exists "invoices_write_admin" on storage.objects;
create policy "invoices_write_admin" on storage.objects for all
  to authenticated using (
    bucket_id = 'invoices' and (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'agence'))
  ) with check (
    bucket_id = 'invoices' and (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'agence'))
  );

-- =============================================================================
-- Pour te promouvoir admin après ta première inscription :
--   insert into public.user_roles (user_id, role)
--   values ('<TON_USER_ID>', 'admin') on conflict do nothing;
-- =============================================================================
