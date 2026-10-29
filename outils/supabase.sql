-- LearnSQL : table de progression, une ligne par utilisateur.
-- À lancer une seule fois dans Supabase : menu « SQL Editor », coller, puis « Run ».

create table if not exists public.progression (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  data    jsonb       not null,
  maj     timestamptz not null default now()
);

-- Chaque utilisateur ne voit et ne modifie que SA ligne.
alter table public.progression enable row level security;

drop policy if exists "lire sa progression" on public.progression;
create policy "lire sa progression" on public.progression
  for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "créer sa progression" on public.progression;
create policy "créer sa progression" on public.progression
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "modifier sa progression" on public.progression;
create policy "modifier sa progression" on public.progression
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

revoke all on public.progression from anon;
grant select, insert, update on public.progression to authenticated;
