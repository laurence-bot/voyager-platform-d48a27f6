-- ============================================================================
-- Rendez-vous : source de vérité + rattachement au projet existant
-- Script IDEMPOTENT — peut être relancé sans doublon ni perte de données.
-- À exécuter dans Supabase → SQL Editor.
-- ============================================================================

-- 1) appointments : colonnes de rattachement, agence, idempotence ------------
alter table public.appointments add column if not exists agence_id uuid;
alter table public.appointments add column if not exists booking_id text;
alter table public.appointments add column if not exists source_type text default 'rendez_vous';
alter table public.appointments add column if not exists subject text;
alter table public.appointments add column if not exists linked_type text;   -- demande | cotation | dossier
alter table public.appointments add column if not exists linked_id uuid;
alter table public.appointments add column if not exists linked_at timestamptz;
alter table public.appointments add column if not exists linked_by text;     -- auto | choix_client | migration | interne
alter table public.appointments add column if not exists demande_id uuid;    -- demande créée SEULEMENT si aucun projet
alter table public.appointments add column if not exists email_normalized text
  generated always as (lower(btrim(email))) stored;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'appointments_linked_type_check'
  ) then
    alter table public.appointments
      add constraint appointments_linked_type_check
      check (linked_type is null or linked_type in ('demande', 'cotation', 'dossier'));
  end if;
end $$;

-- Idempotence des soumissions publiques (double clic / retry réseau)
create unique index if not exists appointments_booking_id_key
  on public.appointments (booking_id) where booking_id is not null;

create index if not exists appointments_email_normalized_idx
  on public.appointments (email_normalized);
create index if not exists appointments_linked_idx
  on public.appointments (linked_type, linked_id);
create index if not exists appointments_agence_idx on public.appointments (agence_id);

-- 2) Journal d'audit ---------------------------------------------------------
create table if not exists public.appointment_audit_log (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid not null references public.appointments(id) on delete cascade,
  action text not null,               -- created | linked | relinked | demande_created | migrated | archived_demande
  linked_type text,
  linked_id uuid,
  actor text not null default 'system',
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists appointment_audit_log_appointment_idx
  on public.appointment_audit_log (appointment_id, created_at desc);

grant select, insert on public.appointment_audit_log to authenticated;
grant all on public.appointment_audit_log to service_role;
alter table public.appointment_audit_log enable row level security;

drop policy if exists "appointment_audit_admin_read" on public.appointment_audit_log;
create policy "appointment_audit_admin_read" on public.appointment_audit_log for select
  to authenticated using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'agence'));

-- 3) demandes : archivage traçable (jamais de suppression) --------------------
alter table public.demandes add column if not exists archived_at timestamptz;
alter table public.demandes add column if not exists archived_reason text;
alter table public.demandes add column if not exists archived_by text;
alter table public.demandes add column if not exists merged_into_type text;
alter table public.demandes add column if not exists merged_into_id uuid;

create index if not exists demandes_email_normalized_idx on public.demandes (lower(btrim(email)));
create index if not exists demandes_archived_idx on public.demandes (archived_at);

-- 4) Isolation par agence sur les rendez-vous --------------------------------
-- Lecture/écriture réservées aux rôles internes ET limitées à leur agence
-- lorsque la table de rattachement agence existe (profiles.agence_id).
drop policy if exists "appointments_admin_read" on public.appointments;
create policy "appointments_admin_read" on public.appointments for select
  to authenticated using (
    public.has_role(auth.uid(), 'admin')
    or (
      public.has_role(auth.uid(), 'agence')
      and (
        agence_id is null
        or exists (
          select 1 from public.profiles p
          where p.user_id = auth.uid()
            and (to_jsonb(p) ->> 'agence_id')::uuid = public.appointments.agence_id
        )
      )
    )
  );

-- ============================================================================
-- 5) MIGRATION HISTORIQUE — dossiers Coulon & Marques
--    Les fausses demandes autonomes de type « Rendez-vous » sont rattachées
--    au projet réel du client (même email normalisé, même agence), puis
--    archivées. Aucun rendez-vous n'est supprimé. Relançable sans doublon.
-- ============================================================================
do $$
declare
  faux record;
  cible record;
  rdv_id uuid;
begin
  for faux in
    select d.*
    from public.demandes d
    where d.archived_at is null
      and coalesce(d.destination, '') ilike '%rendez%vous%'
      and (
        lower(btrim(coalesce(d.nom_client, ''))) like '%coulon%'
        or lower(btrim(coalesce(d.nom_client, ''))) like '%marques%'
      )
  loop
    -- projet existant du même client (email normalisé, même agence), hors faux RDV
    select t.* into cible
    from (
      select 'demande'::text as kind, x.id, x.created_at
      from public.demandes x
      where x.id <> faux.id
        and x.archived_at is null
        and lower(btrim(coalesce(x.email, ''))) = lower(btrim(coalesce(faux.email, '')))
        and coalesce(x.agence_id::text, '') = coalesce(faux.agence_id::text, '')
        and coalesce(x.destination, '') not ilike '%rendez%vous%'
    ) t
    order by t.created_at desc
    limit 1;

    if cible.id is null then
      continue; -- aucun projet trouvé : on ne touche à rien
    end if;

    -- rendez-vous correspondant (déjà présent, sinon reconstruit depuis la demande)
    select a.id into rdv_id
    from public.appointments a
    where lower(btrim(a.email)) = lower(btrim(coalesce(faux.email, '')))
    order by a.created_at desc
    limit 1;

    if rdv_id is null then
      insert into public.appointments (
        full_name, email, phone, destination, appointment_date, appointment_slot,
        contact_mode, message, status, agence_id, booking_id, source_type, created_at
      ) values (
        coalesce(faux.nom_client, 'Client'),
        faux.email,
        faux.telephone,
        'Rendez-vous',
        coalesce(faux.created_at::date, current_date),
        'à confirmer',
        'telephone',
        faux.message_client,
        'nouveau',
        faux.agence_id,
        'migration-' || faux.id::text,
        'rendez_vous',
        faux.created_at
      )
      on conflict (booking_id) do nothing
      returning id into rdv_id;

      if rdv_id is null then
        select id into rdv_id from public.appointments
        where booking_id = 'migration-' || faux.id::text;
      end if;
    end if;

    -- rattachement (idempotent)
    update public.appointments
       set linked_type = 'demande',
           linked_id = cible.id,
           linked_at = coalesce(linked_at, now()),
           linked_by = 'migration',
           demande_id = null,
           updated_at = now()
     where id = rdv_id
       and (linked_id is distinct from cible.id or linked_type is distinct from 'demande');

    insert into public.appointment_audit_log (appointment_id, action, linked_type, linked_id, actor, details)
    select rdv_id, 'migrated', 'demande', cible.id, 'migration-2026-09-16',
           jsonb_build_object('faux_demande_id', faux.id, 'email', faux.email)
    where not exists (
      select 1 from public.appointment_audit_log l
      where l.appointment_id = rdv_id and l.action = 'migrated' and l.linked_id = cible.id
    );

    -- neutralisation traçable de la fausse demande autonome
    update public.demandes
       set archived_at = coalesce(archived_at, now()),
           archived_reason = 'Faux rendez-vous autonome rattaché au projet existant',
           archived_by = 'migration-2026-09-16',
           merged_into_type = 'demande',
           merged_into_id = cible.id
     where id = faux.id
       and archived_at is null;
  end loop;
end $$;
