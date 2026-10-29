-- LearnSQL : droits sur les parcours et sous-parcours.
-- À lancer une seule fois, APRÈS outils/supabase-equipe.sql : menu « SQL Editor », coller, puis « Run ».
-- Règle : un parcours sans ligne ici est ouvert à tous les connectés ;
-- avec des lignes, il est réservé à ces groupes. L'admin voit tout.

create table if not exists public.acces (
  element   text   not null,   -- id du parcours ou du sous-parcours (data/parcours.js)
  groupe_id bigint not null references public.groupe (id) on delete cascade,
  primary key (element, groupe_id)
);

alter table public.acces enable row level security;

-- Le contenu n'est pas confidentiel : chacun peut lire les règles, pour savoir quoi afficher.
drop policy if exists "lire les droits" on public.acces;
create policy "lire les droits" on public.acces for select to authenticated using (true);

drop policy if exists "admin règle les droits" on public.acces;
create policy "admin règle les droits" on public.acces for all to authenticated
  using (public.est_admin()) with check (public.est_admin());

revoke all on public.acces from anon;
grant select, insert, delete on public.acces to authenticated;
