// Chef de projet SI — Fiche de cours du module cp20 « La reprise de données ».
// Fond : pratiques de terrain des migrations d'ERP en PME / ETI (inventaire des données, propriétaire au métier ; qualité
// mesurée avant, nettoyée à la source par le métier ; règles de reprise écrites et validées ; essais à blanc sur les données
// réelles, chronométrés ; contrôles : comptages, totaux de contrôle, rapprochements, échantillons ciblés, rejets expliqués ;
// validation signée par le métier ; gel, reprise définitive, point de non-retour), DAMA-DMBOK (qualité des données ; le
// propriétaire des données est au métier, la DSI outille) et PMBOK / PRINCE2 (la reprise est un livrable avec ses critères
// d'acceptation, approuvé par l'utilisateur, pas par celui qui l'a fait). Les pratiques divergent : sur le nombre d'essais
// (deux au moins ; trois ou plus sur de gros volumes, et un 3e quand le 2e échoue) ; sur les données des tests : la recette
// masque les contacts (module cp19, cp01-q27), l'essai à blanc travaille sur toutes les vraies données, qu'il teste,
// protégées et effacées après (avis du DPO) : dit au cours (section 4) et dans q16.
// - L'inventaire : chaque donnée, sa source, sa cible, son volume, son propriétaire (au métier, pas la DSI ni
//   l'intégrateur) ; reprendre ce qui sert (pas les particuliers ni l'étranger, hors périmètre ; pas l'historique, qui reste
//   consultable dans Divalto) ; les en-cours (facture non réglée, avoir à venir, commande pas encore facturée) ; les champs
//   utiles seulement (données personnelles : RGPD).
// - La qualité : mesurer avant, en chiffres, par propriétaire, avec le temps à prévoir ; nettoyer à la source, pas dans le
//   fichier de transit ; le contenu faux, seul le métier le corrige (tes requêtes trouvent, lui confirme) ; jamais une fausse
//   valeur ; un doublon se définit (SIRET), puis le propriétaire choisit ; la qualité se tient jusqu'au gel, puis au run.
// - Les règles : une par champ, écrites ; table de correspondance complète ; valeur par défaut choisie par le propriétaire
//   et comptée ; rédigées avec l'intégrateur, validées par le propriétaire ; nouvelle version revalidée ; un rejet a sa cause.
// - Les essais à blanc : de bout en bout, en test, sur toutes les vraies données ; au moins deux, le dernier répète le jour J ;
//   un 3e si le 2e échoue ou si les règles ont beaucoup changé ; chronométrés ; fichiers de transit protégés, effacés.
// - Les contrôles : extraites = chargées + rejetées ; total de contrôle ; rapprochement sur une clé unique (FULL JOIN, ou
//   EXCEPT dans les deux sens) ; échantillon ciblé vérifié par le métier ; signature du propriétaire, chiffres en main.
// - La reprise définitive : gel annoncé ; sauvegarde complète de Divalto ; ordre et durée de l'essai 2 ; mêmes contrôles ;
//   pas de signature sous la pression de l'heure, le DAF décide de la suite ; signatures le dimanche, avant la bascule.
// - Les pièges : « on nettoiera après » ; l'intégrateur seul ; dix fiches à l'écran ; corriger à la main dans la PA, ou par
//   un UPDATE maison dans la base de Divalto ; oublier les en-cours.
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Reprise de données (module
// cp20) » : vers la PA, environ 2 000 fiches clients et 600 fiches fournisseurs (SIREN, adresses de facturation et de
// livraison, catégorie de l'opération, e-mail de contact) ; dans Divalto, les codes TVA ; en décembre 2026, 300 fiches
// clients sans SIREN, nettoyées à la source par l'ADV (clients) et la compta (fournisseurs), avec l'utilitaire Divalto de
// contrôle Siret-Siren (cp15-q29) ; propriétaires : le responsable ADV (clients), la cheffe comptable (fournisseurs) ;
// règles écrites ; 2 essais à blanc (fin février, mi-mai pendant le pilote) ; comptages, rapprochements, échantillons,
// validation par le métier (promesse de cp01-q23) ; gel des créations de tiers le vendredi 11 juin à 12 h ; reprise
// définitive le week-end des 12 et 13 juin. Ligne « Bascule (module cp21) » : go / no-go le vendredi 11 juin à 14 h, avec
// le critère « reprise des tiers validée par le métier » ; bascule le lundi 14 juin. Vocabulaire : la PA, jamais « API ».
// Pages Divalto utilisées (base documentaire Divalto 10.13, en lecture seule) : « Contrôle du Siret/Siren (V10.12) »
// (l'utilitaire « Validation conformité Siret-Siren Factur-X », menu Commerce et logistique / Utilitaires ; contrôle dans la
// base Sirene ; un point d'exclamation sur les faux ; lancement par processus, à intervalle fixe) ; « Sauvegarder une base
// ERP (avec SQL Server) » et « Restaurer une base ERP (avec SQL Server) » (sauvegarde complète = le .BAK de la base SQL, les
// dictionnaires Harmony .DHSD, les fichiers FHSQL.DHFD et .DHFI). Consultées en appui, sans citation : « Guide pratique pour
// la bascule vers règlement new - SANS assistant » et « … - Passage à la fusion » (contrôles par requêtes en lecture,
// corrections surtout par les programmes de Divalto, et un UPDATE écrit par l'éditeur ; simulation avant le réel ;
// étape validée seulement sans écart de solde),
// « Migrer », « Paramétrer le routage des factures vers la Plateforme agréée (PA) (V10.12) ».
// Faits ajoutés (cohérents avec la fiche et les modules publiés, à valider) : Divalto a 3 400 fiches clients ; on reprend
// les professionnels en France, actifs (une facture depuis 2 ans) ou avec une pièce en cours (environ 2 000) ; codes TVA :
// une table ancien code → nouveau code, validée par la cheffe comptable ; AquaBleu a 30 fiches, une par magasin (même
// SIREN, un SIRET chacune) ; décembre 2026 : premières mesures par requêtes ; essai 1, fin février, sur une copie de la
// production : 2 600 fiches, 260 rejets, 18 heures ; essai 2, le week-end des 15 et 16 mai : comme le jour J, 26 rejets
// tous expliqués (clients : 2 000 = 1 980 + 20), 13 heures, validation signée ; le gel couvre aussi les modifications de
// tiers ; une urgence pendant le gel attend sur une liste ; samedi 12 juin : sauvegarde complète de Divalto, codes TVA,
// puis tiers vers la PA ; dimanche 13 : contrôles et signatures des deux propriétaires ; le critère de go « reprise des
// tiers validée par le métier » se juge sur l'essai 2 ; sans signature le dimanche, le DAF décide de la suite (module
// cp21, qui fixe l'heure du point de non-retour) ; l'histoire du « client de l'intégrateur » (140 factures rejetées).
// Affirmations juridiques hors fiche (générales, à faire vérifier) : les contacts et les entrepreneurs individuels sont des
// données personnelles (déjà dans cp14) ; le RGPD demande de ne copier que le nécessaire (minimisation) ; les factures
// d'avant restent conservées la durée légale là où elles sont (la fiche dit : l'entreprise choisit où).
// Frontières : cp19 = la recette (cas, PV, réserves) ; cp21 = go / no-go, plan de bascule, retour arrière, point de
// non-retour, hypercare (ici, la reprise définitive dans ce plan) ; cp22 = le run (la qualité des tiers continue) ; cp24 =
// la conformité (RGPD en détail) ; cp09 = le RACI ; cp16 = monter d'un niveau ; cp05 = le planning (les 300 fiches, une
// tâche : cp05-q04) ; cp07 = les risques (codes TVA : cp07-q20) ; cp15 = le standard avant un spécifique (cp15-q29).
LEARNSQL.cours.cp20 = {
  intro: "Sur ta migration Divalto, qui a dit « les données sont bonnes », et sur quels chiffres ? Sur ta migration Snowflake, comment as-tu prouvé que rien ne manquait ? Ici : préparer, essayer, contrôler, puis reprendre pour de bon.",
  sections: [
    {
      titre: "L'inventaire : quoi, d'où, vers où, à qui",
      exemple: "DEMAT 2027. Vers la PA (plateforme agréée) : environ 2 000 fiches clients et 600 fiches fournisseurs. Pour chacune : SIREN (le numéro de l'entreprise), adresses de facturation et de livraison, catégorie de l'opération, e-mail de contact.\nDans Divalto : les codes TVA (taxe sur la valeur ajoutée).\nSur 3 400 fiches clients, on reprend les professionnels en France, actifs (une facture depuis 2 ans) ou avec une pièce en cours.\nPropriétaires : le responsable ADV (administration des ventes) pour les clients, la cheffe comptable pour les fournisseurs.",
      points: [
        "L'inventaire : chaque donnée, sa source, sa cible, son volume, son propriétaire.",
        "Le propriétaire est au métier : il sait ce que la donnée veut dire, fait corriger, valide. Pas la DSI (direction des systèmes d'information), ni l'intégrateur : eux extraient et chargent.",
        "On reprend ce qui sert. Les particuliers et l'étranger : le e-reporting, hors périmètre. Les factures d'avant restent consultables dans Divalto, gardées la durée légale.",
        "Les en-cours comptent : facture non réglée, avoir à venir, commande pas encore facturée. Leur client va dans la PA, même sans facture depuis 2 ans.",
        "Les champs aussi : seulement ceux dont la PA a besoin. Contacts, entrepreneurs individuels : des données personnelles (RGPD, le règlement européen qui les protège)."
      ],
      retenir: "Chaque donnée a une source, une cible et un propriétaire au métier. On reprend ce qui sert, en-cours compris, et rien de plus."
    },
    {
      titre: "La qualité : mesurer, puis nettoyer à la source",
      exemple: "Décembre 2026. Tes requêtes sur les 2 000 clients : 300 sans SIREN, des SIREN faux, des e-mails vides, des doublons possibles.\nL'utilitaire de Divalto « Validation conformité Siret-Siren Factur-X » vérifie chaque SIREN dans la base Sirene, le registre officiel ; il marque les faux.\nL'ADV corrige les clients dans Divalto ; la compta, les fournisseurs.",
      points: [
        "Mesurer avant : les vides, les formats faux, les doublons. Des chiffres, par propriétaire, avec une date et le temps à prévoir (fiches × minutes).",
        "Nettoyer à la source : dans Divalto, par le métier. Le fichier de transit (entre Divalto et la PA) est refait à chaque essai : une correction faite dedans disparaît, et Divalto garde l'erreur.",
        "Le contenu faux ou absent, seul le métier le corrige : il sait quel est le bon. Tes requêtes trouvent, lui confirme. Jamais un faux SIREN pour passer un contrôle.",
        "Un doublon se définit, puis le propriétaire choisit la fiche à garder. AquaBleu a 30 fiches, une par magasin : même SIREN, mais chacune son SIRET (le numéro de l'établissement). Pas des doublons.",
        "La qualité se tient jusqu'au gel des tiers, puis au run (module cp22) : l'utilitaire peut tourner seul chaque semaine (un processus Divalto) ; l'ADV corrige ce qu'il signale."
      ],
      retenir: "La qualité se mesure avant, en chiffres, et se corrige à la source : dans Divalto, par le métier."
    },
    {
      titre: "Les règles de reprise : écrites et validées",
      exemple: "Les règles (extrait, version 2) :\n– SIREN = les 9 premiers chiffres du SIRET de Divalto, sans espaces.\n– Catégorie de l'opération : « livraison de biens » par défaut ; les exceptions, listées par l'ADV.\n– SIREN absent ou faux : rejet ; la fiche part à l'ADV.\n– Codes TVA : une table, ancien code → nouveau code.\nValidées par le responsable ADV (clients) et la cheffe comptable (fournisseurs, codes TVA).",
      points: [
        "Une règle par champ, écrite : d'où il vient, comment on le transforme, sa valeur par défaut, ses cas particuliers.",
        "Une table de correspondance couvre chaque code d'origine : un code oublié, ce sont des fiches rejetées ou mal classées.",
        "Une valeur par défaut cache un vide : le propriétaire la choisit, et on compte les fiches qui la reçoivent.",
        "L'intégrateur les rédige avec toi ; le propriétaire les valide. Une règle qui change, même en plein essai : nouvelle version, revalidée.",
        "Un rejet n'est pas un échec : on refuse de charger une fiche fausse. Chaque rejet a sa cause et son propriétaire."
      ],
      retenir: "Les règles de reprise sont écrites champ par champ et validées par le propriétaire. Une règle qui change est revalidée."
    },
    {
      titre: "Les essais à blanc : répéter avant le jour J",
      exemple: "Essai 1, fin février, sur une copie de la production : 2 600 fiches, 260 rejets, 18 heures.\nOn trie : des règles à corriger, des fiches à nettoyer.\nEssai 2, le week-end des 15 et 16 mai, pendant le pilote : comme en juin, validation comprise. 26 rejets, tous expliqués ; 13 heures.",
      points: [
        "Un essai à blanc : toute la reprise, de bout en bout, en test : rien ne part pour de vrai. Sur toutes les vraies données : 100 fiches choisies ne montrent ni les vrais défauts, ni la vraie durée.",
        "Au moins deux. Le 1er trouve les problèmes. Le dernier répète le jour J : même ordre, mêmes personnes, mêmes contrôles. Un 3e ? Si le 2e échoue, ou si les règles ont beaucoup changé.",
        "La recette masque les contacts (module cp19). L'essai les garde : il les reprend, donc il les teste. La PA de test n'envoie rien.",
        "Chronométré, étape par étape : la mesure fixe la durée du week-end, pas une estimation.",
        "Fichiers de transit : une seule copie, protégée, effacée après validation ; on garde la preuve (comptages, signatures). Jamais sur un portable, une clé, un mail. Avis du DPO (délégué à la protection des données) ou du référent RGPD : module cp24."
      ],
      retenir: "Au moins deux essais à blanc, sur toutes les données réelles, chronométrés. Chacun corrige ; le dernier répète le jour J."
    },
    {
      titre: "Les contrôles : rien de perdu, rien de changé",
      exemple: "Essai 2, les clients :\n– Comptage : 2 000 extraits = 1 980 chargés + 20 rejetés.\n– Totaux par groupe : fiches par catégorie de l'opération, fiches avec e-mail ; les mêmes des deux côtés.\n– Rapprochement : Divalto contre la PA, fiche par fiche, sur le code client.\n– Échantillon ciblé : AquaBleu, les fiches corrigées, les entrepreneurs individuels.\nPuis le responsable ADV signe.",
      points: [
        "Comptage : avant et après, par type de fiche. Extraites = chargées + rejetées. Une seule fiche sans explication bloque la signature.",
        "Total de contrôle : une somme, la même des deux côtés. Sur ta migration Divalto : la somme des encours clients. Un comptage ne voit pas un montant changé ; un total, si.",
        "Rapprochement : fiche par fiche, sur une clé unique. En SQL : un FULL JOIN, ou un EXCEPT dans les deux sens. Il trouve les absentes, les fiches en trop, les différentes.",
        "Échantillon ciblé : les cas à risque, choisis exprès, vérifiés par le métier. Pas au hasard.",
        "La validation : le propriétaire signe, chiffres en main ; pas l'intégrateur, qui ne valide pas son propre travail (module cp09). Le critère de go (module cp21) se juge sur l'essai 2."
      ],
      retenir: "Une reprise se prouve : comptages, totaux, rapprochements, échantillons ciblés, rejets expliqués, puis la signature du propriétaire."
    },
    {
      titre: "La reprise définitive : le week-end des 12 et 13 juin",
      exemple: "Vendredi 11 juin, 12 h : gel des tiers dans Divalto ; comptages sur cette photo. 14 h : go / no-go, on y va ou pas (module cp21).\nSamedi : sauvegarde complète de Divalto, les codes TVA, puis les tiers vers la PA. 13 heures prévues, plus une marge.\nDimanche : contrôles, puis les signatures des deux propriétaires.\nLundi 14 : la bascule (la mise en service).",
      points: [
        "Le gel des tiers : plus de création ni de modification, annoncé des semaines avant. Un client urgent ? Sur une liste, créé après la bascule.",
        "L'ordre et la durée : ceux de l'essai 2, testés. On ne change pas l'ordre le jour J pour gagner une heure.",
        "Avant de toucher Divalto : une sauvegarde complète. Le .bak de SQL Server ne suffit pas : il faut aussi les dictionnaires et les fichiers FHSQL de Divalto. Et une restauration déjà essayée.",
        "Mêmes contrôles qu'aux essais. Un écart sans explication ? On ne signe pas sous la pression de l'heure ; le DAF (directeur administratif et financier, ton sponsor) décide de la suite (module cp21).",
        "Contrôles et signatures se font le dimanche, avant la bascule. Après le point de non-retour (lundi midi, module cp21), on ne revient plus en arrière."
      ],
      retenir: "La reprise définitive rejoue l'essai 2 : gel annoncé, sauvegarde complète, même ordre, mêmes contrôles, signatures avant la bascule."
    },
    {
      titre: "Les pièges",
      exemple: "Un autre client de l'intégrateur, lundi de la bascule : 140 factures rejetées.\nLes fiches sans SIREN ? « On nettoiera après. »\nLe contrôle ? Dix fiches à l'écran, par l'intégrateur seul.\nLa correction ? À la main, dans la PA. Mardi, Divalto refait les mêmes erreurs.",
      points: [
        "« On nettoiera après » : après la bascule, l'ADV est prise par les clients, et chaque fiche fausse fait une facture rejetée.",
        "L'intégrateur seul, ou dix fiches au hasard à l'écran : ça rassure, ça ne prouve rien.",
        "Corriger à la main dans la PA : Divalto reste faux, et chaque facture repart avec l'erreur. Un UPDATE maison (pas un script de l'éditeur) dans la base de Divalto contourne ses contrôles, sans trace."
      ],
      retenir: "Une reprise rate par cinq pièges : nettoyer après, l'intégrateur seul, contrôler à l'œil, corriger en production, oublier les en-cours."
    }
  ]
};
