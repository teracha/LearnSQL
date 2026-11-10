-- LearnSQL : droits des outils (page Équipe, section « Droits des outils »). FACULTATIF.
-- Avant : la Gestion de projet suivait le parcours « Chef de projet SI ». Maintenant, seul le droit outil compte,
-- dans la même table « acces » (outils/supabase-parcours.sql) : aucune table à créer.
-- Sans ce script : la Gestion de projet est ouverte à tous les connectés (aucune ligne = ouvert à tous).
-- Avec ce script : elle garde la même règle qu'avant. Il recopie les groupes du parcours « chef-projet » sur
-- l'élément « gestion-projet ». Ensuite, les deux droits sont séparés : la page Équipe règle chacun.
-- À lancer UNE fois : menu « SQL Editor », coller, puis « Run ». Le relancer ne crée pas de doublon.

insert into public.acces (element, groupe_id)
select 'gestion-projet', groupe_id
from public.acces
where element = 'chef-projet'
on conflict do nothing;
