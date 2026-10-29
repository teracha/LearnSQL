-- LearnSQL : rôles (admin, formateur, agent) et groupes.
-- À lancer une seule fois, APRÈS outils/supabase.sql : menu « SQL Editor », coller, puis « Run ».
-- Puis se nommer admin (dernière ligne, à décommenter avec son adresse).

-- 1. Profils : un par compte, créé automatiquement, rôle « agent » par défaut.
create table if not exists public.profil (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email   text not null,
  role    text not null default 'agent' check (role in ('admin', 'formateur', 'agent')),
  cree    timestamptz not null default now()
);

create table if not exists public.groupe (
  id  bigint generated always as identity primary key,
  nom text not null unique
);

-- Une ligne = une personne dans un groupe. Un formateur suit les groupes où il est membre.
create table if not exists public.membre (
  groupe_id bigint not null references public.groupe (id) on delete cascade,
  user_id   uuid   not null references public.profil (user_id) on delete cascade,
  primary key (groupe_id, user_id)
);

-- 2. Création automatique du profil à l'inscription.
create or replace function public.creer_profil() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profil (user_id, email) values (new.id, new.email)
  on conflict (user_id) do nothing;
  return new;
end $$;

drop trigger if exists apres_inscription on auth.users;
create trigger apres_inscription after insert on auth.users
  for each row execute function public.creer_profil();

-- Comptes déjà créés avant ce script.
insert into public.profil (user_id, email)
select id, email from auth.users
on conflict (user_id) do nothing;

-- 3. Fonctions de contrôle (security definer : évite que les règles se bouclent entre elles).
create or replace function public.est_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profil where user_id = (select auth.uid()) and role = 'admin');
$$;

-- Vrai si je suis formateur et que je partage un groupe avec « cible ».
create or replace function public.suit(cible uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1
    from public.membre moi
    join public.profil p  on p.user_id = moi.user_id and p.role = 'formateur'
    join public.membre lui on lui.groupe_id = moi.groupe_id
    where moi.user_id = (select auth.uid()) and lui.user_id = cible
  );
$$;

-- Vrai si je suis formateur dans ce groupe.
create or replace function public.forme(g bigint) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.membre m join public.profil p on p.user_id = m.user_id
    where m.user_id = (select auth.uid()) and m.groupe_id = g and p.role = 'formateur'
  );
$$;

revoke all on function public.est_admin(), public.suit(uuid), public.forme(bigint) from public, anon;
grant execute on function public.est_admin(), public.suit(uuid), public.forme(bigint) to authenticated;

-- 4. Règles d'accès.
alter table public.profil enable row level security;
alter table public.groupe enable row level security;
alter table public.membre enable row level security;

drop policy if exists "voir les profils" on public.profil;
create policy "voir les profils" on public.profil for select to authenticated
  using (user_id = (select auth.uid()) or public.est_admin() or public.suit(user_id));

-- Seul l'admin change un rôle. Personne ne peut se nommer admin lui-même.
drop policy if exists "admin change les rôles" on public.profil;
create policy "admin change les rôles" on public.profil for update to authenticated
  using (public.est_admin()) with check (public.est_admin());

drop policy if exists "voir les groupes" on public.groupe;
create policy "voir les groupes" on public.groupe for select to authenticated
  using (public.est_admin() or exists (
    select 1 from public.membre m where m.groupe_id = groupe.id and m.user_id = (select auth.uid())));

drop policy if exists "admin gère les groupes" on public.groupe;
create policy "admin gère les groupes" on public.groupe for all to authenticated
  using (public.est_admin()) with check (public.est_admin());

drop policy if exists "voir les membres" on public.membre;
create policy "voir les membres" on public.membre for select to authenticated
  using (user_id = (select auth.uid()) or public.est_admin() or public.forme(groupe_id));

drop policy if exists "admin range les personnes" on public.membre;
create policy "admin range les personnes" on public.membre for all to authenticated
  using (public.est_admin()) with check (public.est_admin());

-- Progression : en plus de la sienne, l'admin voit tout, le formateur voit ses groupes.
drop policy if exists "lire sa progression" on public.progression;
create policy "lire sa progression" on public.progression for select to authenticated
  using ((select auth.uid()) = user_id or public.est_admin() or public.suit(user_id));

revoke all on public.profil, public.groupe, public.membre from anon;
grant select on public.profil to authenticated;
grant update (role) on public.profil to authenticated;
grant select, insert, update, delete on public.groupe, public.membre to authenticated;

-- 5. Groupes de départ.
insert into public.groupe (nom) values ('Pôle métier'), ('Invité')
on conflict (nom) do nothing;

-- 6. Se nommer admin : remplacer l'adresse, enlever les deux tirets, relancer cette ligne seule.
-- update public.profil set role = 'admin' where email = 'ton.adresse@exemple.fr';
