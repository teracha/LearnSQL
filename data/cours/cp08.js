// Chef de projet SI — Fiche de cours du module cp08 « Piloter et reporter ».
// Fond : PMBOK (suivre le travail réel contre la référence ; jalons ; prévision ; un livrable « fini » = accepté),
// PRINCE2 (tolérances, rapport de point, rapport d'exception au sponsor quand une tolérance est menacée), pratiques de
// PMO en PME / ETI (météo vert / orange / rouge par axe, rapport d'une page, la « pastèque » verte dehors et rouge
// dedans, indicateurs peu nombreux avec source et seuil) et agile (partie à enveloppe fixe : la prévision porte sur le
// contenu). Les pratiques divergent sur la météo globale : ici, règle du projet, la globale reprend l'axe le plus
// mauvais (d'autres PMO laissent le chef de projet juger) ; et sur la mesure de l'avancement (0 / 100, 50 / 50…) :
// ici, 0 ou 1 par livrable accepté.
// - L'avancement réel : des livrables finis (0 ou 1), le reste à faire en jours, tâche par tâche, réestimé chaque
//   semaine par celui qui fait ; un jalon tenu = livrable complet et accepté ; prévu (la référence), réel, prévision ;
//   la tendance ; partie agile : la prévision porte sur le contenu.
// - Le tableau de bord : 5 à 7 indicateurs, résultat et pas activité ; définition écrite unique, source, seuil fixé à
//   l'avance, responsable ; la source fait foi, avec la date de ses données ; vérifier avant de publier ; l'outil de
//   l'équipe chaque semaine ; DSI adjoint : mêmes définitions pour tous, une ligne par projet.
// - La météo : vert dans les tolérances ; orange = risque d'en sortir (cause, impact, plan, parfois une décision) ;
//   rouge = hors tolérance ou seuil déjà perdu, une décision du sponsor est nécessaire, rouge jusqu'à sa décision,
//   puis mesure contre la nouvelle date validée ; par axe, puis la globale ; pas de pente douce ; la pastèque ; ni
//   maquiller, ni dramatiser.
// - Le rapport mensuel d'une page : décisions attendues en tête, météo, jalons, 5 plus gros risques, ligne budget ;
//   même modèle chaque mois ; avec l'ordre du jour, 3 jours ouvrés avant ; chiffres arrêtés à une date ; le rapport est le tien.
// - L'alerte : le jour même au DAF (hors tolérance, risque légal, décision qui n'attend pas) ; pas d'alerte dans la
//   tolérance ; plan d'actions daté, suivi chaque lundi.
// - La recette : cas joués et OK, bloquantes ouvertes ; prévision au rythme réel ; pas de PV avec une bloquante ;
//   un pourcentage cache les bloquantes.
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Reporting (module
// cp08) » : rapport mensuel d'une page envoyé avec l'ordre du jour du COPIL, météo globale et par axe (délai, budget,
// périmètre, qualité et risques), jalons (prévu, réel, prévision), décisions attendues, 5 plus gros risques (cp07),
// ligne budget (cp12) ; vert / orange / rouge ; tolérances ± 2 semaines par jalon et budget sous 90 k€ (cp04) ; alerte
// au DAF le jour même (cp07). Ligne « Gouvernance (cp09) » : COPIL le 2e mardi (13 avril 2027), rapport 3 jours ouvrés avant,
// point projet chaque lundi. Ligne « Budget (cp12) » : fin mars, reste à faire 19 jours, atterrissage 43 jours, le DAF
// signe une commande de 3 jours le jour même ; atterrissage 87,5 k€. Planning (cp05) : recette du 16 mars à fin avril,
// PV le 30 avril, pilote en mai, bascule en juin.
// Faits ajoutés (cohérents avec la fiche et les modules publiés, à valider) : tableau de bord de DEMAT à 6 lignes
// (jalons, reste à faire, cas de recette, anomalies bloquantes, rejets de la PA, atterrissage), chacune avec sa source
// et son seuil, à jour chaque vendredi ; pour la qualité, le seuil vient des critères de succès ; règle du modèle de
// rapport : la globale = l'axe le plus mauvais ; 4 flux EDI (cp12-q20) ; rapport d'avril : délai orange, décision
// attendue sur un intérimaire de recette (environ 4 000 €, cp12-q28, cp18-q22) ; recette (exemple) : 120 cas en
// 6 semaines, fin de la 3e semaine 45 joués, prévision du PV au 7 mai (orange), revenue ensuite au 30 avril.
// Affirmations juridiques hors fiche : aucune (pas de PV avec une anomalie bloquante : déjà dans cp14).
// Frontières : planifier (lots, chemin critique, marges) = cp05 ; animer le COPIL, compte rendu, registre des décisions,
// RACI = cp09 ; la ligne budget = cp12 (seulement citée) ; le registre des risques = cp07 ; les mots d'un message =
// cp17 ; l'échelle d'escalade = cp16 ; ta délégation = cp18 ; le suivi de la régie au point hebdo = cp15 ; la stratégie
// de recette et le PV = cp19 (ici, seulement le suivi) ; le PV et ses effets au contrat = cp14 ; la démarche hybride = cp06.
LEARNSQL.cours.cp08 = {
  intro: "Sur ta migration Divalto ou ton projet Snowflake + Power BI, qui disait « fini à 90 % » ? Combien de temps a duré le dernier 10 % ? Ici : mesurer l'avancement réel, peu d'indicateurs, une météo honnête, le rapport du COPIL (comité de pilotage), l'alerte à temps. La ligne budget : module cp12. Les instances : module cp09.",
  sections: [
    {
      titre: "L'avancement réel : des livrables finis, pas des pourcentages",
      exemple: "Point projet du lundi, fin mars. Le consultant de l'intégrateur : « Les flux EDI (échange de données informatisé) ? 90 %. » Il le disait déjà il y a 3 semaines.\nDans Divalto, tu comptes : sur 4 flux, 1 seul est fini, testé et accepté par Marc. Le plan en prévoyait 3.\nSon reste à faire, tâche par tâche : 19 jours (module cp12).",
      points: [
        "Fini = livré, testé, accepté. Un livrable compte 0 ou 1 : ni « 90 % », ni « commencé », ni des jours consommés. Au DAF (directeur administratif et financier, ton sponsor) aussi : des jalons, pas un pourcentage.",
        "Le reste à faire : en jours, tâche par tâche, réestimé chaque semaine par celui qui fait. Ce n'est pas « le plan moins les jours passés ». Toi, tu vérifies ce qui est fini.",
        "Un jalon est tenu quand son livrable est complet et accepté. Sa ligne : prévu (la référence, que seul le sponsor change), réel, prévision.",
        "La tendance : la prévision, refaite chaque lundi. Elle glisse un peu chaque semaine vers la limite ? C'est déjà un risque, même dans la tolérance.",
        "Partie agile (module cp06) : la date et l'enveloppe sont fixes. La prévision porte sur le contenu : ce qui sera accepté, dans l'ordre du backlog (la liste classée)."
      ],
      retenir: "L'avancement se compte en livrables acceptés, en jalons et en reste à faire, jamais en pourcentages déclarés."
    },
    {
      titre: "Le tableau de bord : peu d'indicateurs, une source, un seuil",
      exemple: "Le tableau de bord de DEMAT 2027, à jour chaque vendredi. Par ligne, sa source et son seuil :\n– jalons (planning ; ± 2 semaines) ;\n– reste à faire, en jours (le consultant ; la commande dépassée) ;\n– cas de recette joués et OK (cahier de recette ; la marge mangée) ;\n– anomalies bloquantes (outil de tickets ; 0 au PV, le procès-verbal de recette) ;\n– rejets de la PA, la plateforme agréée (son portail ; 2 %) ;\n– atterrissage du budget (ton suivi ; 90 k€).",
      points: [
        "5 à 7 indicateurs, pour décider : la date, le budget, la qualité. Le résultat (cas OK, rejets), pas l'activité (heures, réunions).",
        "Chacun a une définition écrite, la même partout, une source, un seuil fixé à l'avance et un responsable. Une impression (« moral : bon ») n'en est pas un. Une définition ne change pas pour faire plus joli.",
        "La source fait foi, avec la date de ses données (sur Power BI aussi). Un chiffre surprend, ou deux sources diffèrent ? Tu vérifies avant de publier, puis un seul chiffre.",
        "Le tableau de bord sert à l'équipe, chaque semaine : chacun met à jour ses lignes, et le point projet du lundi part de lui. Au DAF : le rapport mensuel, et les alertes.",
        "Tu es DSI adjoint (DSI : directeur des systèmes d'information) : les mêmes définitions partout ; pour la direction, une ligne par projet. Un vert sans dates réelles se vérifie ; un orange tôt se remercie."
      ],
      retenir: "Peu d'indicateurs, chacun avec une définition, une source et un seuil. Le tableau pour l'équipe, le rapport pour le DAF."
    },
    {
      titre: "La météo : vert, orange, rouge",
      exemple: "Rapport d'avril, chiffres à fin mars :\nDélai : orange. Flux EDI en retard, recette lente : le PV du 30 avril est en risque, encore dans la tolérance. Plan : 4 actions datées.\nBudget : vert. 87,5 k€ prévus à la fin, sous 90 k€.\nPérimètre : vert. Qualité et risques : vert.\nGlobale : orange.",
      points: [
        "Vert : dans les tolérances (± 2 semaines par jalon, budget sous 90 k€, module cp04 ; pour la qualité, les critères de succès). Pas « tout va bien » : aucun seuil n'est franchi.",
        "Orange : risque d'en sortir. La cause, l'impact, le plan, parfois une décision à demander : si elle n'attend pas, le DAF le jour même. Orange tant que le risque reste.",
        "Rouge : la prévision est hors tolérance, ou le seuil déjà perdu : le sponsor doit décider. Rouge jusqu'à sa décision, même avec un bon plan. Après, on mesure contre la nouvelle date validée, et le rapport dit pourquoi.",
        "Une couleur par axe ; la globale = l'axe le plus mauvais (règle de DEMAT). Les seuils font la couleur, pas l'humeur (une inquiétude se creuse, pour le registre), ni une pente douce : vert puis rouge d'un coup, si les faits le disent.",
        "La pastèque : verte dehors, rouge dedans. Le signal de l'équipe se vérifie tout de suite. Ni maquiller (rester vert pour ne pas inquiéter), ni dramatiser (rouge pour faire réagir). Les mots : module cp17."
      ],
      retenir: "La couleur suit les seuils : vert dedans, orange en risque, rouge dehors, avec une décision à prendre."
    },
    {
      titre: "Le rapport mensuel : une page pour décider",
      exemple: "COPIL du mardi 13 avril. Le rapport part 3 jours ouvrés avant, avec l'ordre du jour. Une page :\n1. Décision attendue : un intérimaire pour la recette, environ 4 000 €, oui ou non.\n2. La météo, par axe et globale.\n3. Les jalons : prévu, réel, prévision.\n4. Les 5 plus gros risques (module cp07).\n5. La ligne budget (module cp12).",
      points: [
        "En tête, les décisions attendues. Rien à décider ? Écris-le : « Aucune décision attendue. » Les 5 plus gros risques : par leur note, avec action et propriétaire. Le budget : l'écart et sa cause, même sous 90 k€.",
        "Une page, le même modèle chaque mois, même quand tout est vert : le COPIL compare d'un mois à l'autre. Le détail reste dans le tableau de bord.",
        "Envoyé avec l'ordre du jour, 3 jours ouvrés avant : on lit avant, on décide en séance. Les chiffres sont arrêtés à une date, écrite dessus. Une seule version.",
        "Le rapport est le tien : tu vérifies les faits avec la PA ou l'intégrateur, mais la couleur, c'est toi qui la mets.",
        "Pas de surprise : l'urgent, le DAF l'a déjà su (section suivante). Animer le COPIL, son compte rendu, le registre des décisions : module cp09."
      ],
      retenir: "Une page, chaque mois, la même : les décisions d'abord, puis la météo, les jalons, les risques, le budget."
    },
    {
      titre: "L'alerte qui n'attend pas le COPIL",
      exemple: "Fin mars, point du lundi avec le consultant. Il reste 16 jours sur la commande de l'intégrateur, et 19 jours de travail. Atterrissage : 43 jours pour 40 (module cp12).\nIl faut une commande avant de faire ces jours : la décision n'attend pas le COPIL du 13 avril.\nLe jour même, tu appelles le DAF : la cause, l'impact, 3 options, ta recommandation. Il signe une commande de 3 jours.\nPuis un plan d'actions : chaque action, un nom et une date, revue chaque lundi.",
      points: [
        "Le jour même, au DAF : hors tolérance, risque légal, ou décision qui ne peut pas attendre le COPIL. Les faits, l'impact, les options, ta recommandation (module cp17).",
        "Même si le rapport part dans 2 jours : le DAF l'apprend de toi, aujourd'hui, pas en le lisant.",
        "Dans la tolérance, c'est ta délégation (module cp18) : tu ajustes, le rapport le dit. Un petit glissement, cause connue, rien à décider : le COPIL suffit. Trop d'alertes usent l'alerte.",
        "Après l'alerte, un plan d'actions daté : chaque action a un nom et une date. Suivi chaque lundi, au point projet ; au COPIL, ce qui est fait et ce qui glisse.",
        "Une action glisse, et la prévision sort de la tolérance ? Nouvelle alerte, avec les faits. Escalader n'est pas punir (module cp16)."
      ],
      retenir: "Ce qui ne peut pas attendre va au DAF le jour même ; ensuite, un plan d'actions daté, suivi chaque lundi."
    },
    {
      titre: "Suivre la recette : cas, anomalies, date du PV",
      exemple: "Recette du 16 mars : 120 cas en 6 semaines, 20 par semaine, plus 1 semaine de marge. PV prévu le 30 avril.\nFin de la 3e semaine : 45 cas joués (60 prévus) ; 38 OK, 7 en anomalie, dont 4 bloquantes.\nRythme réel : 15 par semaine. Il reste 75 cas : 5 semaines. Fin en 8e semaine, 1 semaine après la marge.\nPrévision du PV : 7 mai, si les 4 bloquantes sont corrigées et retestées. Délai : orange.",
      points: [
        "Chaque semaine : les cas joués et OK, contre le plan ; les anomalies bloquantes ouvertes, et depuis quand. Un cas en anomalie n'est pas passé, jusqu'au retest OK.",
        "La fin se prévoit au rythme réel : cas restants ÷ cas joués par semaine. Pas au rythme du plan, ni sur l'espoir de rattraper.",
        "Pas de PV avec une anomalie bloquante ouverte (module cp14) : il faut la corriger, puis la retester. Tu donnes une date, avec sa condition.",
        "Un pourcentage cache les bloquantes : « 95 % OK » peut cacher un flux entier qui ne passe pas. Les bloquantes se montrent à part.",
        "La marge de recette qui fond, ou le PV qui recule dans la tolérance : orange. Hors tolérance : rouge, et le DAF le jour même. La stratégie de recette : module cp19."
      ],
      retenir: "La date du PV se calcule chaque semaine : les cas restants au rythme réel, puis zéro bloquante, corrigée et retestée."
    }
  ]
};
