-- LearnSQL : droit à l'effacement (RGPD).
-- À lancer une seule fois, APRÈS outils/supabase-equipe.sql : menu « SQL Editor », coller, puis « Run ».
-- Supprimer l'utilisateur dans auth.users efface en cascade son profil, ses groupes et sa progression.

-- Chacun peut supprimer SON compte.
create or replace function public.supprimer_mon_compte() returns void
language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null then raise exception 'Non connecté'; end if;
  delete from auth.users where id = auth.uid();
end $$;

-- L'admin peut supprimer le compte d'une autre personne (ex. compte inactif depuis 2 ans).
create or replace function public.supprimer_compte(cible uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not public.est_admin() then raise exception 'Réservé à l''admin'; end if;
  if cible = auth.uid() then raise exception 'Utilise « Supprimer mon compte » pour ton propre compte'; end if;
  delete from auth.users where id = cible;
end $$;

revoke all on function public.supprimer_mon_compte(), public.supprimer_compte(uuid) from public, anon;
grant execute on function public.supprimer_mon_compte(), public.supprimer_compte(uuid) to authenticated;
