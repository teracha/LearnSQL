// Chef de projet SI — Questions du module cp20 « La reprise de données ».
// Fond (pratiques de terrain des migrations d'ERP en PME / ETI ; DAMA-DMBOK : qualité des données, propriétaire au métier ;
// PMBOK / PRINCE2 : un livrable avec ses critères d'acceptation, approuvé par l'utilisateur) : l'inventaire (propriétaire au
// métier, reprendre ce qui sert, les en-cours, pas l'historique) ; la qualité (mesurer avant, en chiffres ; nettoyer à la
// source, pas dans le fichier de transit ; le métier confirme ce que tes requêtes trouvent ; doublon défini puis tranché par
// le propriétaire ; la qualité tenue jusqu'au gel) ; les règles (valeur par défaut choisie et comptée, table de
// correspondance complète, nouvelle version revalidée, jamais une fausse valeur) ; les essais à blanc (au moins deux, sur
// toutes les vraies données, le dernier comme le jour J, un 3e seulement si besoin) ; les contrôles (extraites = chargées +
// rejetées, total de contrôle, rapprochement FULL JOIN ou EXCEPT dans les deux sens, échantillon ciblé, signature du
// propriétaire) ; la reprise définitive (gel, ordre testé, sauvegarde complète de Divalto, pas de signature sous la pression
// de l'heure) ; les pièges ; le RGPD (minimum de champs, une seule copie, effacée après, la preuve gardée sans les données).
// Les pratiques divergent sur le nombre d'essais (q18 : pas de 3e « pour être sûrs » ; q19 : un 3e après un échec) et sur les
// données des tests (q16 : l'essai à blanc sur toutes les vraies données, protégées ; la recette masque les contacts, cp01-q27).
// Fil rouge DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Reprise de données (module
// cp20) » : environ 2 000 clients et 600 fournisseurs vers la PA, codes TVA dans Divalto, 300 fiches sans SIREN en décembre
// (q43), nettoyage à la source par l'ADV et la compta avec l'utilitaire Siret-Siren (q09), propriétaires (q01, q12), 2 essais
// à blanc (q15, q17), gel le vendredi 11 juin à 12 h (q25), reprise définitive les 12 et 13 juin (q26 à q28). Ligne « Bascule
// (module cp21) » : go / no-go le 11 juin à 14 h, critère « reprise des tiers validée par le métier ». Contrats : un jour
// d'intégrateur en plus = une commande signée par le DAF (q18, 750 € le jour). Vocabulaire : la PA, jamais « API ».
// Pages Divalto utilisées (base documentaire Divalto 10.13, en lecture seule) : « Contrôle du Siret/Siren (V10.12) » (q09 :
// l'utilitaire « Validation conformité Siret-Siren Factur-X », contrôle dans la base Sirene, lancement par processus) ;
// « Sauvegarder une base ERP (avec SQL Server) » et « Restaurer une base ERP (avec SQL Server) » (q27 : .BAK, dictionnaires
// Harmony .DHSD, fichiers FHSQL). Consultées en appui : « Guide pratique pour la bascule vers règlement new - SANS assistant »
// (q10 : Divalto contrôle par requêtes en lecture et corrige surtout par ses programmes ; son étape 6 donne un UPDATE écrit
// par l'éditeur : d'où « UPDATE maison » dans q10 et au cours), « Migrer ».
// Faits ajoutés (cohérents avec la fiche et les modules publiés, à valider) : Divalto a 3 400 fiches clients, environ 2 000
// reprises (pros en France, actifs depuis 2 ans ou avec un en-cours) (q02, q03) ; codes TVA : table ancien → nouveau code,
// propriétaire la cheffe comptable (q12, q44) ; AquaBleu : 30 fiches, une par magasin, même SIREN (q08, q22, q23) ; décembre :
// mesures par requêtes, 10 minutes par fiche, 50 heures d'ADV (q05, q31, q43) ; 140 clients sans e-mail (q11) ; 45 vrais
// doublons (q07) ; 85 SIREN faux (q06, q10, q44) ; essai 1 fin février : 2 600 fiches, 260 rejets (120 sans SIREN, 85 SIREN
// faux, 40 fournisseurs aux 2 codes TVA absents, 15 noms à apostrophe), 2 340 chargées, 18 heures (q12, q20, q44) ; 4 copies
// du fichier de transit après l'essai 1 (q34) ; mars : 120 fiches sans SIREN, le responsable ADV veut attendre (q30) ;
// mi-avril : toutes corrigées, Marc propose l'utilitaire chaque semaine (q09) ; essai 2, week-end des 15 et 16 mai : 60
// rejets à 23 h et une règle changée sur place (q13), 13 heures chronométrées (q41), 26 rejets expliqués, fournisseurs
// 600 = 594 + 6 (q45), 12 fiches en trop dans la PA de test (q24), 3e essai proposé (q18) ; début juin : 25 clients créés en
// mai sans SIREN, signalés par l'utilitaire (q14) ; vendredi 11 juin, 15 h : un client urgent (q25) ; samedi 12 : l'ordre
// (q26), la sauvegarde (q27) ;
// dimanche 13, 17 h : 9 fiches clients inexpliquées (q28) ; lundi 14 : 30 adresses de livraison fausses (q32) ; fin juin :
// les fichiers chez le consultant (q36) ; 48 colonnes extraites, 8 utiles (q33) ; 180 entrepreneurs individuels (q35).
// Vécu : migration Divalto (2e essai raté puis bascule, q19 ; reprise sans gel, q29 ; encours 1 284 350,20 € contre
// 1 284 305,20 €, q42) ; migration Snowflake (contrôle au nombre de lignes, 3 412 € d'écart, q21). DSI adjoint : projet WMS
// (q37), 12 000 articles (q38), historique du reporting Snowflake (q39). q40 : un comptage sans date (2 000 = 1 978 + 15 + 7).
// Affirmations juridiques hors fiche (générales, à faire vérifier) : à partir du 1er septembre 2027, les avoirs entre
// entreprises passent aussi par une PA (q03) ; un avoir cite le numéro de la facture d'origine (q04) ; les données d'un
// entrepreneur individuel sont des données personnelles, même avec un SIREN (q35, comme cp14) ; reprendre des données pour
// facturer ne demande pas l'accord des personnes : facturer est une obligation légale (q35) ; le RGPD demande de ne copier
// que le nécessaire (q33) ; une copie interne en trop n'est pas en soi une fuite à déclarer : le DPO, ou le référent RGPD,
// analyse ce qui doit être déclaré (q34, comme cp01-q27) ; la PA, qui traite ces données pour l'entreprise, est un
// sous-traitant prévu au contrat (q35, cp14).
// Déjà publiées ailleurs, pas reprises ici : cp01-q23 (comptages, rapprochements, la compta valide), cp01-q27 (copie de la
// base pour les tests de l'intégrateur), cp05-q04 (300 fiches sans SIREN = une tâche), cp07-q20 (risque sur les codes TVA
// gardé pour soi), cp08-q23 (rejets au pilote), cp14-q21 (clause RGPD du contrat), cp15-q29 (l'utilitaire avant un
// spécifique), cp16-q11 (un service au responsable ADV), cp09-q38 (registre des décisions). Voisines, avec un autre angle :
// q43 et cp05-q04 (le temps de nettoyage des mêmes 300 fiches) ; q09 et cp15-q29 (l'utilitaire, lancé chaque semaine) ;
// q12 et cp07-q20 (la table des codes TVA) ; q16, q33 et cp01-q27 (les vraies données, protégées) ; q20, q40 et cp01-q23.
// Frontières : la recette = cp19 (q28 cite la réserve de recette) ; go / no-go, plan de bascule, point de non-retour = cp21 ;
// le run = cp22 ; le RGPD en détail = cp24 ; monter d'un niveau = cp16 (q30) ; le RACI = cp09.
// Types : inventaire q01 à q04 ; qualité et nettoyage q05 à q10 ; règles q11 à q14 ; essais à blanc q15 à q19 ; contrôles
// q20 à q24 ; reprise définitive q25 à q29 ; pièges q30 à q32 ; RGPD q33 à q36 ; « Tu es DSI adjoint » q37 à q39 ; calcul
// q40 à q45.
// Anti-devinette : la bonne réponse est un extrême dans 9 questions sur 37 qui ont un axe d'action : la plus douce qui suffit
// (q04, q18, q25, q45), la plus forte quand elle se justifie (q05, q06, q19, q20, q33). Elle contrôle ou compte dans 15
// questions, un choix faux aussi dans 12 ; elle fait valider par le métier dans 12, un choix faux dans 17 ; elle reporte ou
// refait un essai dans 3 (q15, q19, q37), un choix faux dans 19. Calculs (q40 à q45) : la bonne réponse est le plus grand
// nombre dans 2, le plus petit dans 1, au milieu dans les autres. « Oui » / « D'accord » ouvrent 3 bonnes réponses (q09, q36,
// q45) ; « Non » ouvre des choix faux dans 9 questions, et 5 bonnes réponses ; des absolus (« tout », « seul », « aucune », « seules »), des chiffres
// et des dates sont aussi dans des bonnes réponses.
// Relecture du testeur (scores recalculés) : un choix faux compte ou contrôle aussi en q05, q11, q24 et q31 (« prendre
// celui qui contrôle ou compte » : 60 % → 47 %) ; le « ; » n'est plus réservé aux bonnes réponses (q13, q34, q36, q37,
// q38 : 68 % → 42 %).
LEARNSQL.questions.cp20 = [
  {
    id: "cp20-q01",
    dialecte: "Gestion de projet",
    q: "Janvier. Le consultant de l'intégrateur prépare la reprise des clients vers la PA : « Au final, qui valide le contenu des fiches ? » Que réponds-tu ?",
    choix: [
      "Le responsable ADV : ses équipes s'en servent chaque jour",
      "Ton DSI : les données sont dans le système de la DSI",
      "Toi : tu pilotes la reprise de bout en bout",
      "La cheffe comptable : les clients, ce sont des factures"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le propriétaire des fiches clients est au métier : le responsable ADV (administration des ventes). Il sait ce qu'elles veulent dire, fait corriger son équipe, et valide. L'intégrateur extrait et charge.",
      "Non. La DSI héberge les données ; elle ne sait pas si un SIREN ou une adresse de livraison est juste. Le propriétaire, c'est le métier qui s'en sert.",
      "Non. Tu organises la reprise et tu suis les chiffres. Valider le contenu, c'est au métier : tu ne connais pas chaque client.",
      "Non. Presque : c'est bien le métier. Mais la cheffe comptable est propriétaire des fournisseurs. Les fiches clients, c'est l'ADV qui les tient."
    ],
    retenir: "Le propriétaire d'une donnée est au métier : celui dont l'équipe la tient et s'en sert. C'est lui qui valide."
  },
  {
    id: "cp20-q02",
    dialecte: "Gestion de projet",
    q: "Divalto compte 3 400 fiches clients. Le consultant propose de les reprendre toutes dans la PA, « pour être tranquille ». Que réponds-tu ?",
    choix: [
      "D'accord : 3 400 ou 2 000, son script est le même",
      "Seulement les clients facturés dans les 12 derniers mois",
      "Les pros en France, actifs ou avec un en-cours",
      "Non : aucune, tant que l'ADV n'a pas trié les 3 400"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le script est le même, pas le travail : 1 400 fiches de plus à nettoyer, à contrôler et à protéger. Des particuliers dans la PA, et des rejets en plus.",
      "Non. Presque : on trie, oui. Mais 12 mois oublie les en-cours : un client sans facture récente, avec un avoir à venir ou une facture pas encore réglée.",
      "Oui. On reprend ce qui sert : les clients professionnels en France, actifs ou avec une pièce en cours (environ 2 000). Les particuliers et l'étranger relèvent du e-reporting, hors périmètre. Moins de fiches : moins de nettoyage, moins de données personnelles.",
      "Non. Trop fort : une règle de sélection fait le tri, l'ADV la valide. Trier 3 400 fiches à la main bloque la reprise pour rien."
    ],
    retenir: "On reprend ce qui sert, en-cours compris : une règle de sélection écrite, validée par le propriétaire."
  },
  {
    id: "cp20-q03",
    dialecte: "Gestion de projet",
    q: "Ta règle de sélection, version 1 : les clients avec une facture depuis 2 ans. Sophie signale un client sans facture depuis 2024, mais avec un avoir à faire en octobre 2027 (un litige réglé). Que fais-tu ?",
    choix: [
      "Rien : la règle est validée, et il n'est plus facturé",
      "Sophie fera cet avoir en PDF, une seule fois, hors de la PA",
      "Tu reprends tous les clients des 5 dernières années",
      "La règle ajoute « ou un en-cours », revalidée"
    ],
    bonne: 3,
    pourquoi: [
      "Non. En octobre 2027, son avoir doit passer par la PA, comme toute facture entre entreprises. Sans fiche dans la PA, il bloque : la règle a un trou.",
      "Non. À partir du 1er septembre 2027, une PME émet ses factures entre entreprises, avoirs compris, via une PA. Un PDF serait hors la loi, et l'exception reviendrait au prochain litige.",
      "Non. Trop large : des centaines de fiches inutiles à nettoyer et à protéger. On corrige la règle pour les en-cours, on ne prend pas tout.",
      "Oui. Un client avec un en-cours (facture non réglée, avoir à venir) doit être dans la PA. La règle change : nouvelle version, revalidée par le propriétaire, le responsable ADV."
    ],
    retenir: "Les en-cours font partie de la reprise : une facture non réglée ou un avoir à venir garde son client dans le périmètre."
  },
  {
    id: "cp20-q04",
    dialecte: "Gestion de projet",
    q: "Le consultant propose de charger aussi dans la PA vos factures clients des 10 dernières années : « Tout sera au même endroit. » Que réponds-tu ?",
    choix: [
      "Oui : 10 ans d'historique, c'est la durée légale",
      "L'historique reste là où il est, dans Divalto",
      "Oui, mais seulement les 2 dernières années, pour les avoirs",
      "Tu demandes au DAF de choisir, avec le devis du consultant"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Garder ses factures la durée légale, c'est l'obligation de l'entreprise, là où elle veut. Les charger dans la PA ne sert pas à facturer, et coûte des jours et des contrôles.",
      "Oui. On reprend ce qui sert : la PA émet et reçoit les factures à partir de la bascule. Les anciennes restent dans Divalto, gardées la durée légale, consultables là où elles sont.",
      "Non. Presque : moins d'historique, oui. Mais un avoir n'a pas besoin de la facture d'origine dans la PA : il cite son numéro et sa date. Ces 2 ans ne servent à rien.",
      "Non. Rien à faire monter : ce chargement ne sert pas le périmètre. Tu réponds toi-même, avec la règle « on reprend ce qui sert »."
    ],
    retenir: "On ne reprend pas l'historique par réflexe : les anciennes factures restent où elles sont, gardées la durée légale."
  },
  {
    id: "cp20-q05",
    dialecte: "Gestion de projet",
    q: "Décembre 2026. La reprise des clients commence. Avant d'écrire les règles, que fais-tu d'abord ?",
    choix: [
      "Tu mesures, en chiffres : SIREN vides ou faux, doublons",
      "Tu demandes à l'ADV quelles fiches lui semblent fausses",
      "Tu lances un essai à blanc, et tu comptes ses rejets",
      "Rien : la qualité des fiches, c'est l'affaire de l'ADV"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. On mesure avant : combien de vides, de formats faux, de doublons, par propriétaire. Tes requêtes le donnent en une heure. Ces chiffres fixent le travail de nettoyage, et on suit leur baisse.",
      "Non. L'ADV connaît quelques cas, pas les chiffres : sa mémoire ne trouve ni les doublons, ni les SIREN faux. Les requêtes, si.",
      "Non. Presque : compter, oui. Mais un essai demande des règles écrites, et ses rejets ne montrent que ce qui bloque le chargement : un doublon passe. Mesurer d'abord, c'est deux mois de plus pour nettoyer.",
      "Non. Elle corrigera, oui. Mais sans chiffres, ni elle ni toi ne savez combien il y a à faire, ni pour quand."
    ],
    retenir: "La qualité se mesure avant la reprise, en chiffres : c'est le point de départ du nettoyage."
  },
  {
    id: "cp20-q06",
    dialecte: "Gestion de projet",
    q: "Essai 1 : 85 SIREN faux. Le consultant : « Je les corrige dans le fichier de transit, ce sera plus rapide. » Que réponds-tu ?",
    choix: [
      "D'accord, si l'ADV relit ensuite le fichier corrigé",
      "D'accord : le fichier chargé sera juste, c'est l'essentiel",
      "Non : l'ADV les reprend dans Divalto, à la source",
      "Non : l'ADV corrigera Divalto après la bascule"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : le métier vérifie. Mais le fichier de transit est refait à chaque extraction : au prochain essai, les 85 erreurs reviennent. Et Divalto garde les faux SIREN dans ses factures.",
      "Non. Le fichier sera juste une fois. Divalto, lui, reste faux : ses factures partent avec ces SIREN, et l'essai 2 retrouve les mêmes erreurs.",
      "Oui. On nettoie à la source, par le métier. L'ADV corrige dans Divalto ; l'essai suivant le vérifie. Les factures de Divalto, et chaque nouvelle extraction, seront justes.",
      "Non. « On nettoiera après » : jusqu'à la bascule, chaque essai rechargera les 85 erreurs, et après, les factures de ces clients seront rejetées."
    ],
    retenir: "Une erreur se corrige à la source, dans Divalto, par le métier : jamais dans le fichier de transit."
  },
  {
    id: "cp20-q07",
    dialecte: "Gestion de projet",
    q: "La mesure trouve 45 vrais doublons : deux fiches pour le même SIRET. Le consultant propose un script : garder la fiche la plus récente, supprimer l'autre. Que fais-tu ?",
    choix: [
      "D'accord : la fiche la plus récente est la plus à jour",
      "On reprend les deux ; l'ADV triera après, dans la PA",
      "Tu fusionnes toi-même les 45 doublons, par une requête",
      "L'ADV choisit, dans Divalto, en voyant les pièces"
    ],
    bonne: 3,
    pourquoi: [
      "Non. La plus récente n'est pas forcément la bonne : l'autre porte peut-être les factures non réglées, ou la bonne adresse. Un script ne le voit pas.",
      "Non. La PA ne trie pas : deux fiches pour un même établissement, et les factures se rangent sous l'une ou l'autre. Et trier dans la PA laisse Divalto faux.",
      "Non. Tu fais à la place du propriétaire, hors de Divalto : sans savoir quelle fiche porte les en-cours, et sans trace.",
      "Oui. Un doublon se résout à la source, par le propriétaire : l'ADV sait quelle fiche porte les pièces en cours et la bonne adresse. Elle garde celle-là dans Divalto, et ferme l'autre."
    ],
    retenir: "Un doublon se résout à la source, par le propriétaire, en regardant les pièces en cours : pas par un script."
  },
  {
    id: "cp20-q08",
    dialecte: "Gestion de projet",
    q: "Le contrôle des doublons du consultant trouve 29 « doublons » chez AquaBleu : 30 fiches, même SIREN, une par magasin. Que fais-tu ?",
    choix: [
      "Tu fais fusionner les 30 fiches en une, avant l'essai 2",
      "Tu fais corriger la règle : doublon = SIRET en double",
      "Tu fais vérifier les 29 fiches par l'ADV, une par une",
      "Rien : AquaBleu est un client EDI, il a ses propres règles"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Trop fort, et faux : chaque magasin est un établissement, avec son SIRET et son adresse de livraison. Fusionnées, vos factures perdent le bon magasin.",
      "Oui. Un doublon se définit : ici, le même SIRET (le numéro de l'établissement). Même SIREN, ce peut être les 30 magasins d'une chaîne. La règle corrigée est validée par l'ADV.",
      "Non. Presque : l'ADV saurait. Mais c'est la règle qui est fausse : elle ressortira les mêmes 29, et ceux des autres chaînes, à chaque essai.",
      "Non. L'EDI ne change rien à la règle : elle est fausse pour toutes les chaînes de magasins, pas seulement pour AquaBleu."
    ],
    retenir: "Un doublon se définit par une règle validée : même SIREN ne veut pas dire même fiche."
  },
  {
    id: "cp20-q09",
    dialecte: "Gestion de projet",
    q: "Mi-avril. Toutes les fiches sans SIREN sont corrigées. D'ici juin, l'ADV va créer environ 15 clients par semaine. Marc propose de lancer l'utilitaire Siret-Siren chaque semaine. Que réponds-tu ?",
    choix: [
      "Non : le nettoyage est fini, on n'y revient pas",
      "Non : on bloque plutôt les créations jusqu'à la bascule",
      "D'accord : l'ADV corrige au fil de l'eau ce qu'il signale",
      "Non : un contrôle complet de l'ADV, la veille du gel, suffit"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le nettoyage tient jusqu'au gel, pas jusqu'à avril : environ 120 fiches de plus d'ici juin, sans contrôle. Les erreurs reviennent par les nouvelles fiches.",
      "Non. Trop fort : sans nouveaux clients, plus de nouvelles commandes, en pleine saison. Le gel des tiers ne vient que le 11 juin, à midi.",
      "Oui. Dans Divalto, l'utilitaire « Validation conformité Siret-Siren Factur-X » peut tourner seul, en processus, chaque semaine. Il marque les SIREN faux ; l'ADV corrige au fil de l'eau. La qualité se tient jusqu'au gel.",
      "Non. Presque : un contrôle complet, oui. Mais la veille du gel, plus le temps de corriger : les erreurs partent dans la reprise définitive."
    ],
    retenir: "La qualité se tient jusqu'au gel : un contrôle régulier, et le métier corrige au fil de l'eau."
  },
  {
    id: "cp20-q10",
    dialecte: "Gestion de projet",
    q: "En croisant leur nom et leur code postal avec un fichier de la base Sirene, tu as trouvé le SIREN de 85 clients. Un UPDATE dans la base de Divalto les corrigerait en 5 minutes. Que fais-tu ?",
    choix: [
      "Ta liste va à l'ADV : elle confirme et saisit dans Divalto",
      "Tu lances l'UPDATE dans Divalto : c'est sûr à 95 %",
      "Tu lances l'UPDATE, puis l'ADV relit les 85 fiches une à une",
      "Tu attends l'essai 2 : il dira si ces SIREN passent ou non"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Ta liste fait gagner des heures : l'ADV n'a plus qu'à confirmer chaque SIREN et à le saisir dans Divalto. Le propriétaire corrige à la source, avec les contrôles de l'outil.",
      "Non. 95 % de 85 : environ 4 clients sur le SIREN d'un autre, deux sociétés au même nom, dans la même ville. Et un UPDATE maison contourne les contrôles de Divalto, sans trace.",
      "Non. Presque : le métier vérifie. Mais après coup, sur des fiches déjà changées hors de Divalto, sans trace : une erreur passe inaperçue.",
      "Non. L'essai 2 dira si le format passe, pas si c'est le bon client. Et tu as la liste en main : deux mois perdus."
    ],
    retenir: "Tes requêtes trouvent ; le métier confirme et corrige dans Divalto. Pas d'UPDATE maison sur les données d'un progiciel."
  },
  {
    id: "cp20-q11",
    dialecte: "Gestion de projet",
    q: "140 clients n'ont pas d'e-mail de contact. Le consultant propose de leur mettre celui de l'ADV par défaut : « Ça ne bloquera rien. » Que fais-tu ?",
    choix: [
      "D'accord : l'e-mail de l'ADV par défaut ne bloque rien",
      "Tu prends l'e-mail général de la société, et tu comptes ces fiches",
      "Tu fais rejeter ces 140 fiches, le temps qu'elles aient un e-mail",
      "Le responsable ADV choisit la règle, et on compte ces fiches"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Une valeur par défaut cache un vide : ce que la PA envoie à ces 140 clients arriverait à l'ADV, sans que personne le sache.",
      "Non. Presque : une valeur moins mauvaise, et comptée. Mais ce n'est pas à toi de la choisir : c'est le propriétaire qui décide, et qui sait ce que ce choix coûte.",
      "Non. Trop fort, et pas à toi d'en décider : 140 clients hors de la PA, ce sont leurs factures bloquées. Rejeter peut être la règle, mais c'est le propriétaire qui la choisit, en connaissant ce prix.",
      "Oui. Une valeur par défaut est une règle : le propriétaire la choisit (une valeur, un rejet, ou des e-mails à demander), et on compte les fiches qui la reçoivent. Le vide reste visible."
    ],
    retenir: "Une valeur par défaut cache un vide : le propriétaire la choisit, et on compte les fiches qui la reçoivent."
  },
  {
    id: "cp20-q12",
    dialecte: "Gestion de projet",
    q: "Essai 1 : 2 anciens codes TVA, utilisés par 40 fournisseurs, manquent dans la table de correspondance. Le consultant : « Je leur mets le code le plus proche. » Que fais-tu ?",
    choix: [
      "D'accord : le code le plus proche est presque toujours le bon",
      "La cheffe comptable complète la table, puis la revalide",
      "Tu fais refaire tout l'essai 1, dès que la table est complète",
      "Tu mets ces 40 fournisseurs au taux normal, en attendant"
    ],
    bonne: 1,
    pourquoi: [
      "Non. « Presque toujours », ce sont des factures avec une TVA fausse. Et le consultant choisit à la place de la propriétaire, sans trace.",
      "Oui. Une table de correspondance couvre chaque code d'origine. La propriétaire, la cheffe comptable, dit où va chaque code oublié ; la table change de version, et l'essai 2 la vérifie.",
      "Non. Trop fort : refaire tout l'essai pour 2 codes coûte des jours. La table complétée se vérifie à l'essai 2, déjà prévu.",
      "Non. Une valeur par défaut que personne n'a choisie : des fournisseurs exonérés passeraient avec de la TVA. C'est à la propriétaire de décider."
    ],
    retenir: "Une table de correspondance est complète et validée par son propriétaire : pas de « code le plus proche »."
  },
  {
    id: "cp20-q13",
    dialecte: "Gestion de projet",
    q: "Essai 2, samedi 15 mai, 23 h. 60 clients rejetés. Le consultant change une règle sur place et relance : « Ça passe. » Que fais-tu ?",
    choix: [
      "Bien joué : il a sauvé l'essai, et la règle est corrigée",
      "Tu fais tout annuler, et rejeter ces 60 fiches comme avant",
      "Tu notes la nouvelle règle, et l'ADV la valide dimanche",
      "Tu arrêtes l'essai 2, et tu en prévois un 3e en juin"
    ],
    bonne: 2,
    pourquoi: [
      "Non. La règle a peut-être raison, mais personne ne l'a validée, et elle n'est écrite nulle part. Le jour J, on rejouera… laquelle ?",
      "Non. Annuler perd une correction peut-être juste, et le chronométrage de l'essai. Le problème n'est pas le changement : c'est qu'il n'est ni écrit ni validé.",
      "Oui. Une règle qui change : nouvelle version, écrite, revalidée par son propriétaire, le responsable ADV, dimanche, avant de signer l'essai. Le jour J rejouera la version validée.",
      "Non. Trop fort : un changement écrit et revalidé suffit. Un 3e essai, c'est quand l'essai 2 échoue, pas pour une règle corrigée."
    ],
    retenir: "Une règle de reprise ne change pas en douce : nouvelle version, écrite, revalidée par le propriétaire."
  },
  {
    id: "cp20-q14",
    dialecte: "Gestion de projet",
    q: "Début juin, l'utilitaire signale 25 clients créés en mai, sans SIREN. Le consultant propose « 000000000 » : « Le contrôle de format passera. » Que réponds-tu ?",
    choix: [
      "Non : ces 25 fiches sont rejetées ; l'ADV les complète avant le gel",
      "D'accord, si l'ADV les corrige ensuite dans la PA",
      "D'accord : 25 petits clients, quelques factures par an",
      "Non : tu fais reporter la reprise jusqu'à ce que tout soit complet"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Jamais un faux SIREN pour passer un contrôle : ce numéro n'existe pas, leurs factures seraient rejetées. Sans SIREN, la fiche est rejetée ; l'ADV, qui en est propriétaire, la complète avant le gel.",
      "Non. Presque : l'ADV corrige. Mais un faux SIREN chargé, ce sont des factures rejetées dès le 14 juin. Et corriger dans la PA laisse Divalto faux.",
      "Non. Peu de factures, mais chacune rejetée. Et le faux SIREN reste dans Divalto, où plus personne ne le cherche.",
      "Non. Trop fort : 25 fiches sur 2 000 n'arrêtent pas la reprise. Elles sont rejetées puis complétées ; les autres passent."
    ],
    retenir: "Jamais une fausse valeur pour passer un contrôle : la fiche est rejetée, et le propriétaire la complète."
  },
  {
    id: "cp20-q15",
    dialecte: "Gestion de projet",
    q: "Le planning du consultant prévoit un seul essai à blanc, début juin, « pour gagner du temps ». Que fais-tu ?",
    choix: [
      "D'accord : un essai complet suffit, s'il réussit",
      "Un essai début juin, et un 2e si le 1er échoue",
      "Trois essais, dont un dans la PA de production",
      "Deux : fin février pour trouver, mi-mai pour répéter"
    ],
    bonne: 3,
    pourquoi: [
      "Non. S'il échoue début juin, plus le temps de corriger avant le gel du 11. Et le jour J serait la 1re vraie répétition.",
      "Non. Presque : deux essais. Mais trop tard : entre le 1er et le gel, une semaine. Pas assez pour nettoyer des centaines de fiches.",
      "Non. Un essai à blanc ne charge rien pour de vrai : en production, ce n'est plus un essai, c'est une reprise sans contrôle. Deux, en test, suffisent.",
      "Oui. Au moins deux : le 1er trouve les problèmes, assez tôt pour nettoyer et corriger les règles ; le 2e répète le jour J, dans les mêmes conditions."
    ],
    retenir: "Au moins deux essais à blanc : le 1er tôt, pour trouver ; le dernier, pour répéter le jour J."
  },
  {
    id: "cp20-q16",
    dialecte: "Gestion de projet",
    q: "Pour l'essai 1, le consultant propose 100 fiches « représentatives » au lieu des 2 600 : « Plus rapide à charger. » Que réponds-tu ?",
    choix: [
      "D'accord : 100 fiches bien choisies montrent les défauts",
      "100 fiches, et tu extrapoles la durée aux 2 600",
      "Non : toutes les fiches, sur une copie de la production",
      "Non : des données inventées, sans aucun risque"
    ],
    bonne: 2,
    pourquoi: [
      "Non. 100 fiches choisies montrent les défauts qu'on connaît déjà. Les autres sont dans les 2 500 restantes.",
      "Non. Presque : tu veux la durée. Mais le temps ne suit pas le nombre de fiches : lots, attentes de la PA, rejets. Et les défauts restent cachés.",
      "Oui. Un essai à blanc se fait sur toutes les données réelles : les vrais défauts, la vraie durée. La recette masque les contacts (module cp19) ; l'essai les reprend, donc il les teste : PA de test sans envoi, copie effacée après.",
      "Non. Des données inventées ne testent rien des vraies : ni les SIREN faux, ni les doublons. On protège les vraies données, on ne les remplace pas."
    ],
    retenir: "Un essai à blanc se fait sur toutes les données réelles : la seule façon de voir les vrais défauts et la vraie durée."
  },
  {
    id: "cp20-q17",
    dialecte: "Gestion de projet",
    q: "Pour l'essai 2, mi-mai, le consultant veut le faire seul, en semaine, « sans déranger l'ADV ni la compta ». Que fais-tu ?",
    choix: [
      "D'accord : leur validation se fera le jour J, en juin",
      "Un week-end, comme le jour J, validation comprise",
      "En semaine, seul, et l'ADV validera les résultats lundi",
      "Tu reportes l'essai 2 à juin, après la fin du pilote"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le jour J, l'ADV et la compta valideraient pour la 1re fois, sous la pression de l'heure. Leur temps de contrôle n'aurait jamais été mesuré.",
      "Oui. Le dernier essai répète le jour J : même ordre, mêmes personnes, mêmes contrôles, même validation. Le week-end des 15 et 16 mai, chacun apprend ce qu'il fera les 12 et 13 juin.",
      "Non. Presque : le métier valide. Mais pas dans les conditions du jour J : ni l'ordre, ni la durée, ni qui fait quoi ne sont répétés.",
      "Non. Trop tard : la bascule est le 14 juin. Un défaut trouvé en juin n'a plus le temps d'être corrigé."
    ],
    retenir: "Le dernier essai à blanc répète le jour J : même ordre, mêmes personnes, mêmes contrôles, validation comprise."
  },
  {
    id: "cp20-q18",
    dialecte: "Gestion de projet",
    q: "Essai 2 : rejets tous expliqués, 13 heures, validation signée. Le consultant propose un 3e essai début juin : 3 jours, « pour être sûrs ». Que fais-tu ?",
    choix: [
      "Non : les critères sont tenus, pas de jours en plus",
      "Oui : 3 jours d'essai, c'est une assurance pas chère",
      "Oui, si le DAF signe d'abord la commande des 3 jours",
      "Non, sauf si le responsable ADV le demande"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un 3e essai sert quand le 2e échoue, ou quand les règles ont beaucoup changé. Ici, critères atteints, rien n'a changé : tu dis non, avec les chiffres de l'essai 2.",
      "Non. 2 250 € (3 jours à 750 €), et le temps du métier en pleine saison, pour un essai qui ne trouvera rien : l'essai 2 a déjà tout dit.",
      "Non. Presque : un jour de plus, c'est une commande signée par le DAF. Mais avant de faire signer, il faut un besoin : il n'y en a pas.",
      "Non. Il valide les données, pas le planning des essais. Et sa demande ne crée pas un besoin : les critères disent déjà que l'essai 2 suffit."
    ],
    retenir: "Un 3e essai se justifie par un échec ou un gros changement de règles, pas « pour être sûrs »."
  },
  {
    id: "cp20-q19",
    dialecte: "Gestion de projet",
    q: "Sur ta migration Divalto, le 2e essai de reprise avait raté : 200 rejets, une durée doublée. Vous avez basculé quand même, et la 1re semaine a été très dure. Qu'aurait-il fallu ?",
    choix: [
      "Basculer, avec une équipe renforcée la 1re semaine",
      "Basculer, et corriger les données au fil de l'eau",
      "Basculer, et prévenir les utilisateurs que l'essai a raté",
      "Corriger les causes, puis un 3e essai avant de basculer"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Presque : du renfort aide après la bascule. Mais il ne répare pas des données fausses : il absorbe des erreurs qu'un essai aurait trouvées avant.",
      "Non. « On nettoiera après » : chaque donnée fausse est déjà dans des commandes et des factures, et l'équipe n'a plus le temps.",
      "Non. Prévenir ne répare rien : les erreurs arrivent quand même, chez les clients. Un essai raté se corrige avant de basculer.",
      "Oui. Un essai raté appelle un autre essai : causes trouvées, règles corrigées, puis on rejoue. Si ça décale la bascule, le sponsor le décide en le sachant."
    ],
    retenir: "Un essai à blanc raté se corrige puis se rejoue : le jour J n'est jamais le 1er passage de la version finale."
  },
  {
    id: "cp20-q20",
    dialecte: "Gestion de projet",
    q: "Essai 1. Le consultant : « 2 340 fiches chargées dans la PA, c'est bon. » Que lui demandes-tu d'abord ?",
    choix: [
      "Une dizaine de fiches à regarder ensemble, à l'écran",
      "Rien : 2 340 fiches, c'est un bon début pour un 1er essai",
      "Combien sont sorties de Divalto, et où sont les autres",
      "Tu le notes au rapport : 90 % de chargées, c'est bien"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Dix fiches à l'écran montrent que dix fiches sont là. Elles ne disent rien de celles qui manquent peut-être.",
      "Non. Un chiffre seul ne dit pas s'il en manque. Ici, 2 600 sont sorties : 260 ne sont pas dans la PA.",
      "Oui. Un chiffre seul ne prouve rien : il faut le comptage avant (2 600 extraites) et après (chargées + rejetées). Les 260 manquantes ont chacune leur cause : les rejets, triés.",
      "Non. 2 340 sur 2 600, c'est bien 90 %. Mais un pourcentage ne dit pas où sont les 260 autres, ni pourquoi : le rapport cacherait un écart."
    ],
    retenir: "Un comptage se lit avant et après : extraites = chargées + rejetées, et chaque écart est expliqué."
  },
  {
    id: "cp20-q21",
    dialecte: "Gestion de projet",
    q: "Sur ta migration Snowflake, le contrôle était : le même nombre de lignes par table. Un mois après, le contrôleur de gestion trouve 3 412 € d'écart sur le chiffre d'affaires de l'année. Qu'aurait-il fallu ajouter ?",
    choix: [
      "Un 2e comptage des lignes, fait par une autre personne",
      "La somme des montants par période, des deux côtés",
      "Une dizaine de factures vérifiées à l'écran, au hasard",
      "Une validation signée par le prestataire de la migration"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un 2e comptage redonne le même nombre : c'est le contrôle lui-même qui ne voit pas les montants.",
      "Oui. Un total de contrôle : une somme, la même des deux côtés. Un comptage ne voit pas un montant changé, ni un lot chargé deux fois quand un autre manque. La somme par mois, si.",
      "Non. Dix factures sur des millions de lignes : l'écart se cache ailleurs. Et au hasard, on ne vise aucun risque.",
      "Non. Il ne valide pas son propre travail. Et sa signature ne remplace pas un chiffre : il aurait signé le même comptage."
    ],
    retenir: "Un comptage juste ne prouve pas des montants justes : on ajoute des totaux de contrôle, comparés des deux côtés."
  },
  {
    id: "cp20-q22",
    dialecte: "Gestion de projet",
    q: "Essai 2. Tu relis la méthode de rapprochement du consultant, entre l'extraction de Divalto et l'export de la PA. Laquelle valides-tu ?",
    choix: [
      "Un INNER JOIN sur le code client, puis un COUNT(*)",
      "Un EXCEPT de Divalto vers la PA, sur le SIREN",
      "Un COUNT(DISTINCT SIREN) de chaque côté, comparés",
      "Un FULL JOIN sur le code client, écart par écart"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Un INNER JOIN ne garde que les fiches présentes des deux côtés : les absentes et celles en trop disparaissent du résultat. Il compte ce qui va bien.",
      "Non. Presque : EXCEPT trouve les absentes. Mais dans un seul sens, il rate les fiches en trop. Et le SIREN n'est pas unique : les 30 magasins d'AquaBleu ont le même.",
      "Non. C'est un comptage, pas un rapprochement : il ne dit pas quelles fiches diffèrent. Et AquaBleu, 30 fiches, n'y compte que pour une.",
      "Oui. Une jointure complète, sur une clé unique, montre tout : la fiche absente de la PA, la fiche en trop, celle dont un champ a changé. Un EXCEPT dans les deux sens marche aussi."
    ],
    retenir: "Un rapprochement compare fiche par fiche, sur une clé unique, dans les deux sens : FULL JOIN, ou EXCEPT des deux côtés."
  },
  {
    id: "cp20-q23",
    dialecte: "Gestion de projet",
    q: "Dimanche de l'essai 2. Le responsable ADV veut valider la reprise sur 10 fiches tirées au hasard. Que lui proposes-tu ?",
    choix: [
      "50 fiches choisies : AquaBleu, les corrigées, les cas rares",
      "D'accord : 10 fiches au hasard, c'est un vrai sondage",
      "Les 2 000 fiches, une par une, pour être sûrs de tout",
      "Les 10 fiches, mais vérifiées par le consultant, qui les connaît"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. L'échantillon vise les cas à risque : AquaBleu et ses 30 magasins, les fiches corrigées, les entrepreneurs individuels, les noms à apostrophe. Le métier les vérifie dans la PA, face à Divalto.",
      "Non. Sur 2 000, 10 fiches au hasard tombent sur des cas simples : ça rassure, ça ne prouve rien. Les comptages et le rapprochement regardent déjà tout le reste.",
      "Non. Trop fort : des jours de travail, et l'attention baisse après la 100e. Le rapprochement compare déjà tout, fiche par fiche.",
      "Non. Le consultant ne valide pas son propre travail. Et 10 fiches au hasard restent 10 fiches au hasard."
    ],
    retenir: "L'échantillon se choisit sur les cas à risque, et c'est le métier qui le vérifie."
  },
  {
    id: "cp20-q24",
    dialecte: "Gestion de projet",
    q: "Essai 2, fournisseurs : 600 extraits, 6 rejetés. La PA en montre 606. Le consultant : « Il y en a plus que prévu, donc rien n'est perdu. » Que fais-tu ?",
    choix: [
      "D'accord : 606, c'est plus que les 594 attendus",
      "Tu fais recompter les deux côtés, pour confirmer les 12",
      "Tu fais rapprocher les listes : d'où viennent les 12 ?",
      "Tu fais vider la PA de test et recharger les 600"
    ],
    bonne: 2,
    pourquoi: [
      "Non. 12 en trop, c'est aussi un écart : des doublons, ou des restes. Un fournisseur en double, et ses factures se rangent sous la mauvaise fiche.",
      "Non. Presque : vérifier, oui. Mais un recomptage redonnera 606 : il dit combien, pas lesquelles. Le rapprochement, fiche par fiche, le dit.",
      "Oui. 600 − 6 = 594 attendus ; 606 − 594 = 12 en trop. Le rapprochement fiche par fiche dit lesquelles : un lot chargé deux fois, ou des restes de l'essai 1. Un écart s'explique, dans un sens comme dans l'autre.",
      "Non. Trop fort : vider et recharger sans connaître la cause, et les 12 reviendront peut-être. Le rapprochement d'abord."
    ],
    retenir: "Plus de fiches dans la cible que prévu, c'est aussi un écart : on rapproche avant de corriger."
  },
  {
    id: "cp20-q25",
    dialecte: "Gestion de projet",
    q: "Vendredi 11 juin, 15 h. Gel des tiers depuis midi. Un commercial exige un nouveau gros client dans Divalto : « Il commande lundi matin ! » Que fais-tu ?",
    choix: [
      "Tu le fais créer tout de suite : un gros client ne se refuse pas",
      "Sur la liste d'attente : l'ADV le crée lundi, après la bascule",
      "Tu demandes au DAF de lever le gel pour ce client",
      "L'ADV le crée maintenant ; le consultant le saisit lundi dans la PA"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le gel fixe la photo de midi, et les comptages sont faits dessus. Une fiche créée après la fausse : dimanche, un écart de plus à expliquer.",
      "Oui. Le gel vaut pour tous : la fiche attend sur une liste, et l'ADV la crée lundi matin, après la bascule, par le circuit normal. Le client commande sans retard.",
      "Non. Trop fort : rien n'est bloqué. Lundi matin, le client sera créé à temps. Pas besoin de déranger le DAF pour une fiche.",
      "Non. Presque : le client existe lundi. Mais créé pendant le gel, il fausse la photo de midi ; et saisi à la main dans la PA, il échappe aux règles de reprise et aux contrôles."
    ],
    retenir: "Pendant le gel, une urgence attend sur une liste : la fiche est créée après la bascule, par le circuit normal."
  },
  {
    id: "cp20-q26",
    dialecte: "Gestion de projet",
    q: "Samedi 12 juin, 9 h. Le consultant veut charger les clients avant les codes TVA, pour finir 2 heures plus tôt. L'essai 2 a fait l'inverse. Que réponds-tu ?",
    choix: [
      "L'ordre de l'essai 2 : celui qui a été testé",
      "D'accord : 2 heures de gagnées, c'est de la marge",
      "D'accord, s'il refait d'abord un essai rapide",
      "Tu demandes au DAF de trancher, au téléphone"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le jour J rejoue l'essai 2 : même ordre, mêmes étapes. Gagner du temps se cherchait avant, à l'essai. Le week-end n'est pas le moment d'innover.",
      "Non. Un ordre jamais testé, le jour J : si des fiches dépendent des codes TVA, tout est à refaire, et les 2 heures en coûtent 10.",
      "Non. Presque : tester avant, oui. Mais un essai rapide, un samedi matin, sous pression, ne vaut pas l'essai 2.",
      "Non. Rien à trancher : la règle est claire, et le DAF n'a pas les éléments techniques. C'est à toi de tenir le plan."
    ],
    retenir: "Le jour J rejoue l'ordre testé à l'essai 2 : on ne change pas un plan qui marche pour gagner une heure."
  },
  {
    id: "cp20-q27",
    dialecte: "Gestion de projet",
    q: "Samedi 12 juin, avant de modifier les codes TVA, le consultant lance un backup SQL Server de la base Divalto : « Avec le .bak, on peut tout restaurer. » Que vérifies-tu ?",
    choix: [
      "Rien : un .bak complet suffit pour restaurer Divalto",
      "Qu'une copie du .bak part aussi chez toi, sur une clé",
      "Qu'il refait un backup toutes les heures du week-end",
      "Le .bak, mais aussi les dictionnaires et les fichiers FHSQL"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Pour Divalto, une sauvegarde complète, c'est le .bak de la base SQL, plus les dictionnaires Harmony (.dhsd) et les fichiers FHSQL du répertoire Divalto. Le .bak seul ne restaure pas tout.",
      "Non. Toute la base clients sur une clé, chez toi : un risque de perte, et des données personnelles hors de l'entreprise. La sauvegarde reste dans un lieu protégé.",
      "Non. Plus de sauvegardes ne les rend pas complètes : dix .bak sans les dictionnaires ne restaurent toujours pas Divalto.",
      "Oui. La documentation de Divalto le dit : la base SQL (.bak), les dictionnaires (.dhsd), les fichiers FHSQL. Et une restauration déjà essayée : une sauvegarde jamais restaurée n'est qu'une promesse."
    ],
    retenir: "Avant de toucher Divalto : une sauvegarde complète au sens de l'éditeur (.bak, dictionnaires, fichiers FHSQL), déjà restaurée une fois."
  },
  {
    id: "cp20-q28",
    dialecte: "Gestion de projet",
    q: "Dimanche 13 juin, 17 h. Reprise définitive : 9 fiches clients manquent, sans explication. Le consultant : « On signe, on cherchera lundi. » Que fais-tu ?",
    choix: [
      "Tu fais signer : 9 fiches sur 2 000, c'est 0,45 %",
      "Tu annonces au DAF un no-go : la bascule est reportée",
      "Pas de signature : on cherche les 9 tout de suite, DAF prévenu",
      "Signature avec une réserve sur les 9 fiches, à revoir lundi"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Une fiche sans explication peut cacher une règle fausse qui en touche d'autres. Et lundi, les factures de ces clients seront rejetées.",
      "Non. Trop tôt : 9 fiches se trouvent souvent en une heure. Le no-go se décide si la cause n'est pas trouvée à temps, pas avant de chercher.",
      "Oui. Pas de signature avec un écart inexpliqué, ni sous la pression de l'heure. On cherche : souvent, une heure suffit. Le DAF sait où on en est ; sans signature dimanche, c'est lui qui décide de la suite (module cp21).",
      "Non. Presque : comme une réserve de recette (module cp19). Mais une réserve porte sur un défaut connu, avec une date. Ici, personne ne sait ce qui manque."
    ],
    retenir: "Une reprise ne se signe pas avec un écart inexpliqué : on cherche d'abord, et le DAF décide si l'heure tourne."
  },
  {
    id: "cp20-q29",
    dialecte: "Gestion de projet",
    q: "Sur ta migration Divalto, la reprise s'est faite un samedi, sans gel. Lundi, 12 commandes saisies le samedi matin manquaient. Qu'aurait-il fallu ?",
    choix: [
      "Une reprise de nuit, plus courte, pour ne gêner personne",
      "Un gel annoncé à une heure dite, et les comptages faits là",
      "Un 2e chargement le lundi matin, puis un contrôle des écarts",
      "Interdire toute saisie dans Divalto la semaine d'avant"
    ],
    bonne: 1,
    pourquoi: [
      "Non. De nuit ou de jour, sans gel, une saisie pendant l'extraction passe entre les deux systèmes. C'est le gel qui protège, pas l'heure.",
      "Oui. Le gel fixe une photo : après l'heure dite, plus de saisie. Les comptages se font sur cette photo, et l'extraction ne rate rien. Annoncé tôt, il ne surprend personne.",
      "Non. Presque : rattraper vaut mieux que perdre. Mais un 2e chargement le jour de la bascule, sous pression, ajoute un risque de doublons au lieu d'éviter le trou.",
      "Non. Trop fort : une semaine sans saisie, c'est une semaine sans commandes. Un gel court, à l'heure dite, suffit."
    ],
    retenir: "Une reprise définitive commence par un gel à une heure dite : la photo sur laquelle on extrait et on compte."
  },
  {
    id: "cp20-q30",
    dialecte: "Gestion de projet",
    q: "Mars, la saison démarre. Le responsable ADV : « Les 120 fiches clients sans SIREN, on les fera après la bascule. » Que fais-tu ?",
    choix: [
      "D'accord : après la bascule, la saison sera passée",
      "Tu les corriges toi-même, et l'ADV relira ensuite",
      "Tu demandes au DAF d'imposer la correction à l'ADV",
      "Tu lui montres l'impact, et vous fixez une date avant l'essai 2"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Chaque fiche sans SIREN donne une facture rejetée, dès le 14 juin. Et la saison ne sera pas finie : juin est encore chargé.",
      "Non. Tu fais à la place du propriétaire, sans savoir quel SIREN est le bon. Et la prochaine fiche sans SIREN n'aura toujours personne.",
      "Non. Trop tôt : tu ne lui as pas encore montré ce que ça coûte. On monte d'un niveau quand il refuse en connaissant l'impact (module cp16).",
      "Oui. 120 clients, ce sont leurs factures rejetées dès le 14 juin. Il le voit en chiffres ; propriétaire, il fixe avec toi une date avant l'essai 2, et le temps qu'il faut. Ça bloque encore ? Tu montes d'un niveau (module cp16)."
    ],
    retenir: "« On nettoiera après » coûte des factures rejetées dès le 1er jour : le propriétaire le voit en chiffres, et fixe une date."
  },
  {
    id: "cp20-q31",
    dialecte: "Gestion de projet",
    q: "Décembre. Le DAF : « Que l'intégrateur fasse toute la reprise. La compta et l'ADV restent sur leur travail. » Que lui réponds-tu ?",
    choix: [
      "Tu chiffres ce que seul le métier peut faire",
      "D'accord : il connaît Divalto, il saura faire",
      "Non : sans l'ADV et la compta pour valider, pas de reprise",
      "D'accord, et tu contrôleras toi-même chaque essai"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le sponsor décide en connaissant le prix : environ 50 heures d'ADV pour nettoyer, quelques heures pour valider chaque essai. L'intégrateur ne peut pas le faire à leur place. Le DAF choisit, informé ; le temps de l'ADV se cale avec son responsable.",
      "Non. L'intégrateur connaît l'outil, pas vos clients : il ne sait pas quel SIREN est le bon. Et il validerait son propre travail.",
      "Non. Un refus sec au sponsor, sans chiffres : il ne sait pas ce qu'il te demande. Montre-lui le besoin, il décidera.",
      "Non. Presque : quelqu'un contrôle. Mais tu ne connais pas chaque client, et ce n'est pas ton rôle : la validation est au propriétaire."
    ],
    retenir: "La reprise ne se délègue pas à l'intégrateur seul : le métier nettoie et valide ; le sponsor le sait, chiffres en main."
  },
  {
    id: "cp20-q32",
    dialecte: "Gestion de projet",
    q: "Lundi 14 juin, 10 h. L'ADV trouve 30 adresses de livraison fausses dans la PA. Le consultant : « Je les corrige à la main dans la PA : 20 minutes. » Que fais-tu ?",
    choix: [
      "D'accord : 20 minutes, et c'est réglé pour de bon",
      "D'accord, et l'ADV vérifie ensuite ces 30 fiches dans la PA",
      "L'ADV les reprend dans Divalto, puis elles repartent",
      "Tu fais refaire toute la reprise ce soir, pour repartir propre"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Réglé dans la PA seulement : Divalto garde les fausses adresses, et chaque facture faite depuis Divalto repart avec l'erreur.",
      "Non. Presque : le métier vérifie. Mais la source reste fausse : la facture de demain, faite depuis Divalto, portera encore la mauvaise adresse.",
      "Oui. On corrige à la source, par le métier, puis la correction repart vers la PA par la procédure prévue. Divalto et la PA disent la même chose, et c'est tracé.",
      "Non. Trop fort : 30 fiches ne justifient pas de tout recharger le jour de la bascule. On corrige ces 30, à la source."
    ],
    retenir: "Une erreur trouvée en production se corrige à la source, dans Divalto, puis repart : jamais seulement à la main dans la cible."
  },
  {
    id: "cp20-q33",
    dialecte: "Gestion de projet",
    q: "L'extraction du consultant sort 48 colonnes par client : téléphones, portables des contacts, commentaires de l'ADV… La PA en utilise 8. Que fais-tu ?",
    choix: [
      "Rien : une colonne en plus ne coûte rien, et peut servir",
      "Tu fais réduire l'extraction aux seules colonnes utiles",
      "Tu gardes les 48 colonnes, dans un fichier protégé",
      "Tu gardes l'extraction telle quelle, et tu préviens le DPO"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Chaque colonne en plus, ce sont des données personnelles copiées sans besoin : les portables des contacts, des avis sur des personnes. Le RGPD demande le minimum.",
      "Oui. On ne copie que ce qui sert : moins de données personnelles, moins de risques, et un fichier plus léger à contrôler. La liste des champs s'écrit dans l'inventaire.",
      "Non. Presque : protéger, oui. Mais d'abord, ne pas copier ce qui ne sert pas. Un mot de passe ne rend pas utiles 40 colonnes, ni les portables des contacts.",
      "Non. Prévenir le DPO est bien, mais il te dira la même chose : on ne copie pas ce qui ne sert pas. Les 40 colonnes en trop restent un risque."
    ],
    retenir: "Une reprise copie seulement les champs qui servent : le minimum de données personnelles."
  },
  {
    id: "cp20-q34",
    dialecte: "Gestion de projet",
    q: "Essai 1 fini. Tu trouves 4 copies du fichier de transit : sur le partage de l'ADV, sur le portable du consultant, et dans 2 mails. Que fais-tu ?",
    choix: [
      "Rien : ce sont des fichiers internes, entre gens de confiance",
      "Tu déclares une fuite de données, le jour même",
      "Tu demandes à chacun de protéger sa copie par un mot de passe",
      "Une seule copie, protégée, et les autres effacées"
    ],
    bonne: 3,
    pourquoi: [
      "Non. 4 copies de 2 600 fiches avec des contacts : 4 risques de perte, dont un portable qui sort de l'entreprise. Plus personne ne sait qui a quoi.",
      "Non. Trop fort : rien n'est perdu, et seuls des gens autorisés y ont eu accès. Au moindre doute, le DPO, ou le référent RGPD, analyse s'il faut déclarer. Tu ranges d'abord.",
      "Non. Presque : protéger, oui. Mais 4 copies protégées restent 4 copies, dont une sur un portable. Une seule, au bon endroit.",
      "Oui. Une seule copie, dans un dossier protégé, à l'accès limité ; les autres effacées, mails compris. La règle vaut pour l'essai 2. Le DPO (délégué à la protection des données), ou le référent RGPD, est tenu au courant."
    ],
    retenir: "Les fichiers de transit ne traînent pas : une seule copie, protégée, effacée après validation."
  },
  {
    id: "cp20-q35",
    dialecte: "Gestion de projet",
    q: "Parmi les clients, 180 entrepreneurs individuels : l'entreprise porte le nom de la personne. Le consultant : « Ce sont des entreprises, le RGPD ne compte pas. » Que réponds-tu ?",
    choix: [
      "Ce sont des personnes : le minimum, protégé, avis du DPO",
      "Il a raison : un SIREN, c'est une entreprise",
      "Tu les retires de la reprise, pour ne prendre aucun risque",
      "Tu demandes à chacun son accord écrit avant la reprise"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Leurs données sont personnelles : on en copie le minimum, on les protège, et le DPO donne son avis. La PA les traite pour vous : son contrat le prévoit (module cp14).",
      "Non. Un entrepreneur individuel, c'est une personne : son nom, son adresse (souvent chez lui) sont des données personnelles, même avec un SIREN.",
      "Non. Trop fort : leurs factures doivent passer par la PA, comme les autres. Les retirer, c'est bloquer leur facturation.",
      "Non. Facturer est une obligation légale : la reprise n'attend pas leur accord. Elle doit être limitée et protégée, avec l'avis du DPO."
    ],
    retenir: "Les données d'un entrepreneur individuel sont des données personnelles : le minimum, protégé, avec l'avis du DPO."
  },
  {
    id: "cp20-q36",
    dialecte: "Gestion de projet",
    q: "Fin juin, après la bascule. Le consultant veut garder les fichiers de reprise sur son serveur jusqu'à fin 2027, « au cas où ». Le DPO demande de les effacer. Que fais-tu ?",
    choix: [
      "D'accord avec le consultant : ils peuvent encore servir",
      "Tu les récupères, et tu les gardes sur le partage de la DSI",
      "D'accord avec le DPO, en gardant la preuve, pas les données",
      "Tu demandes au DAF de trancher entre le DPO et lui"
    ],
    bonne: 2,
    pourquoi: [
      "Non. « Au cas où » n'est pas un besoin : 2 600 fiches avec des contacts, chez un prestataire, six mois de plus. Chaque copie gardée est un risque.",
      "Non. Presque : chez vous plutôt que chez lui. Mais la question n'est pas où les garder : sans besoin, on ne les garde pas.",
      "Oui. La reprise est validée : les données vivent dans Divalto et la PA. On efface les fichiers de transit ; on garde la preuve sans les données : comptages, rejets expliqués, signatures.",
      "Non. Rien à trancher : la règle était écrite (effacés après validation). Le DPO la rappelle, tu la fais respecter."
    ],
    retenir: "Après la reprise, on efface les fichiers de transit ; on garde la preuve sans les données : comptages, rejets, signatures."
  },
  {
    id: "cp20-q37",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Le chef de projet du nouveau WMS (gestion d'entrepôt) veut supprimer le 2e essai de reprise, pour tenir sa date. Il te demande ton accord. Que réponds-tu ?",
    choix: [
      "D'accord : c'est son projet et son essai, il connaît ses risques",
      "D'accord, si l'éditeur garantit la reprise et paie les écarts",
      "Non : le 2e essai reste, sinon c'est le planning qui bouge",
      "Non : tu fais reporter de 3 mois la mise en service"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Sans répétition, le jour J est le 1er passage complet : une reprise d'entrepôt ratée, ce sont des stocks faux et des expéditions bloquées.",
      "Non. Presque : il cherche une assurance. Mais une garantie ne teste rien : le jour J, elle donne un recours, pas des stocks justes.",
      "Oui. Deux essais au minimum : c'est la règle de la DSI, pas une option. Tu l'aides à trouver le temps ailleurs ; sinon, le planning bouge, décidé par son sponsor.",
      "Non. Trop fort : on ne sait pas s'il manque 3 mois. Un 2e essai demande des jours, peut-être pris ailleurs."
    ],
    retenir: "Deux essais à blanc au minimum, sur chaque projet : on cherche le temps ailleurs, on ne supprime pas la répétition."
  },
  {
    id: "cp20-q38",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Projet de nettoyage des 12 000 articles. Le directeur commercial : « Les données, c'est la DSI : vous les nettoyez. » Que fais-tu ?",
    choix: [
      "D'accord : la DSI a les outils et les accès",
      "Tu demandes au DG d'imposer un propriétaire au commercial",
      "Tu nommes un de tes analystes propriétaire des articles",
      "Il nomme un propriétaire dans ses équipes, et la DSI outille"
    ],
    bonne: 3,
    pourquoi: [
      "Non. La DSI sait corriger un format, pas si un prix ou une famille d'articles est juste. Elle nettoierait à l'aveugle, et le commercial contesterait.",
      "Non. Trop tôt : tu ne lui as pas encore expliqué le rôle ni ce qu'il coûte. Le DG, si le refus persiste, en connaissant l'enjeu.",
      "Non. Presque : quelqu'un est nommé. Mais un analyste de la DSI ne sait pas mieux que toi ce qui est juste chez les commerciaux.",
      "Oui. Le propriétaire est au métier : celui qui s'en sert et en répond. La DSI fournit les requêtes, les listes, les outils ; le propriétaire décide et valide."
    ],
    retenir: "Le propriétaire des données est au métier ; la DSI outille, elle ne décide pas du contenu."
  },
  {
    id: "cp20-q39",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Le reporting passe sur Snowflake. Le contrôleur de gestion veut 10 ans d'historique, « au cas où » ; ses tableaux en utilisent 3. Les 7 autres coûtent 3 semaines de reprise. Que fais-tu ?",
    choix: [
      "Les 10 ans, et tu décales le planning de 3 semaines",
      "Tu lui montres le coût ; il choisit, le reste archivé",
      "Aucun historique : on repart de zéro, c'est plus propre",
      "Tu demandes au DG de trancher entre lui et la DSI"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le métier choisit, mais en connaissant le prix : 3 semaines pour 7 ans que personne ne regarde. « Au cas où » n'est pas un besoin.",
      "Oui. On reprend ce qui sert. Il voit le coût des 7 ans en plus ; s'il les veut encore, il le justifie. Les anciennes données restent archivées, consultables à la demande.",
      "Non. Trop fort : ses tableaux comparent sur 3 ans. Sans historique, ils sont faux dès le 1er jour.",
      "Non. Trop tôt : il n'a pas encore vu le coût. La plupart des « au cas où » tombent quand on montre le prix."
    ],
    retenir: "On reprend ce qui sert ; le reste est archivé. Le métier choisit, en connaissant le coût."
  },
  {
    id: "cp20-q40",
    dialecte: "Gestion de projet",
    q: "Comptage des clients : 2 000 extraits, 1 978 chargés, 15 rejets listés avec leur cause. Le responsable ADV est prêt à signer. Que fais-tu ?",
    choix: [
      "Il signe : 15 rejets expliqués, 0,75 % des fiches",
      "Il signe : 22 rejets sur 2 000, sous les 2 % de rejets",
      "Pas encore : 7 fiches manquent, sans aucune explication",
      "Pas encore : les 22 manquantes doivent toutes être chargées"
    ],
    bonne: 2,
    pourquoi: [
      "Non. 1 978 + 15 = 1 993 : il en manque 7. Les 15 rejets sont expliqués, pas ces 7-là.",
      "Non. Les 2 %, c'est le critère des rejets de factures par la PA après la bascule, pas une tolérance de reprise. Et 7 fiches restent sans explication.",
      "Oui. Extraites = chargées + rejetées : 2 000 − 1 978 − 15 = 7. Ces 7 n'ont ni cause ni propriétaire : on les trouve avant de signer.",
      "Non. Presque : 22 manquent bien dans la PA. Mais les 15 rejets expliqués peuvent être acceptés par le propriétaire, avec leur plan. Ce sont les 7 inexpliquées qui bloquent."
    ],
    retenir: "Comptage : extraites = chargées + rejetées. Une seule fiche sans explication bloque la signature."
  },
  {
    id: "cp20-q41",
    dialecte: "Gestion de projet",
    q: "Essai 2, chronométré : extraction 1 h, transformation 2 h, chargement 5 h, contrôles 3 h, validation par le métier 2 h. Quelle durée prévois-tu pour le week-end ?",
    choix: [
      "13 heures, plus une marge pour un incident",
      "5 heures : le chargement, le reste se fait en parallèle",
      "8 heures : le travail technique, le reste n'en est pas",
      "11 heures : la validation se fera lundi, avant 8 h"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. 1 + 2 + 5 + 3 + 2 = 13 heures, mesurées, étape après étape. Plus une marge : un lot qui plante, une fiche à chercher. C'est la mesure qui fixe le plan.",
      "Non. Les étapes se suivent : on ne contrôle pas ce qui n'est pas chargé, et on ne valide pas ce qui n'est pas contrôlé.",
      "Non. 1 + 2 + 5 = 8, mais sans les contrôles ni la validation. Ce sont eux qui disent si on peut basculer.",
      "Non. 13 − 2 = 11, mais lundi avant 8 h, c'est trop tard pour chercher un écart : la validation se signe avant la bascule, le dimanche."
    ],
    retenir: "La durée du jour J vient de l'essai chronométré, toutes les étapes comprises, plus une marge."
  },
  {
    id: "cp20-q42",
    dialecte: "Gestion de projet",
    q: "Sur ta migration Divalto, le total de contrôle des encours clients : 1 284 350,20 € dans l'ancien, 1 284 305,20 € dans le nouveau. Que conclus-tu ?",
    choix: [
      "Rien de grave : 0,0035 % d'écart, c'est de l'arrondi",
      "450 € d'écart : il faut recharger tous les encours",
      "45 € d'écart : on le passe en perte, c'est trop peu",
      "45 € d'écart, tout rond : on cherche la ou les pièces"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le pourcentage est juste, la conclusion non : 45,00 € tout rond ressemble à une facture ou un avoir manquant, pas à des centimes d'arrondi.",
      "Non. Erreur de calcul : l'écart est de 45 €, pas 450. Et même juste, recharger tout sans connaître la cause ne la corrige pas.",
      "Non. Presque : le bon calcul. Mais un écart non expliqué peut cacher une règle fausse, qui touchera d'autres pièces le jour J. On explique d'abord.",
      "Oui. 1 284 350,20 − 1 284 305,20 = 45,00 €. Un écart rond désigne une pièce : on la cherche par le rapprochement, client par client. Un total de contrôle ne se négocie pas."
    ],
    retenir: "Un total de contrôle doit tomber juste : un écart, même petit, s'explique avant de valider."
  },
  {
    id: "cp20-q43",
    dialecte: "Gestion de projet",
    q: "Décembre. 300 fiches clients sans SIREN. Recherche, appel au client, saisie : environ 10 minutes par fiche pour l'ADV. Combien de temps demandes-tu à son responsable ?",
    choix: [
      "Environ 5 heures : 300 minutes, une seule journée",
      "Environ 50 heures : un peu plus de 7 jours de 7 h",
      "Environ 50 heures : 2 jours, en s'y mettant à fond",
      "Environ 75 heures : 15 minutes, avec la saisie"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 300 minutes, c'est 1 minute par fiche. À 10 minutes : 300 × 10 = 3 000 minutes.",
      "Oui. 300 × 10 = 3 000 minutes, soit 50 heures : un peu plus de 7 jours de 7 h. Tu les demandes au responsable ADV, propriétaire et manager : le temps de son équipe est à lui.",
      "Non. 50 heures, oui, mais pas en 2 jours : ce seraient des journées de 24 h. En jours de travail de 7 h, plus de 7.",
      "Non. Les 10 minutes comprennent déjà la saisie. La compter deux fois gonfle la demande, et ta crédibilité en prend un coup."
    ],
    retenir: "Le nettoyage à la source prend du temps au métier : on le chiffre (fiches × minutes) et on le demande à son manager."
  },
  {
    id: "cp20-q44",
    dialecte: "Gestion de projet",
    q: "Essai 1 : 260 rejets. 120 clients sans SIREN, 85 au SIREN faux, 40 fournisseurs aux codes TVA absents de la table, 15 noms à apostrophe mal lus par le script. Combien de fiches l'ADV doit-elle corriger dans Divalto ?",
    choix: [
      "260 : chaque rejet revient au métier, qui corrige",
      "120 : les SIREN absents ; les faux, par une règle",
      "245 : tout, sauf le défaut du script de l'intégrateur",
      "205 : SIREN manquants ou faux ; le reste, des règles"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Un rejet n'est pas toujours une fiche fausse : 40 viennent d'une table incomplète, 15 d'un défaut du script. Ces fiches sont justes ; on corrige les règles.",
      "Non. Un SIREN faux ne se devine pas par une règle : seul le métier sait lequel est le bon. Ces 85 fiches sont à l'ADV aussi.",
      "Non. Presque : le script est bien à part. Mais les 40 fournisseurs ne sont ni à l'ADV, ni faux : c'est la table des codes TVA, à la cheffe comptable.",
      "Oui. 120 + 85 = 205 fiches à corriger à la source, par l'ADV. Les 40 fournisseurs : la cheffe comptable complète la table. Les 15 apostrophes : le consultant corrige son script. Chaque cause a son propriétaire."
    ],
    retenir: "Chaque rejet a une cause et un propriétaire : fiche fausse au métier, table incomplète à son propriétaire, défaut de script à l'intégrateur."
  },
  {
    id: "cp20-q45",
    dialecte: "Gestion de projet",
    q: "Dimanche de l'essai 2. Fournisseurs : 600 extraits, 594 chargés, 6 rejets, chacun avec sa cause et une date de correction. La cheffe comptable demande : « Je peux signer ? »",
    choix: [
      "Oui : 594 + 6 = 600, chaque fiche est expliquée",
      "Non : 6 rejets sur 600, c'est 1 % ; il en faut zéro",
      "Non : il faut d'abord un 3e essai sans aucun rejet",
      "Oui, mais seulement après avoir vu les 594 fiches une à une"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Extraites = chargées + rejetées : 594 + 6 = 600. Chaque rejet a sa cause, son propriétaire et sa date. Avec l'échantillon vu, elle peut signer.",
      "Non. Zéro rejet n'est pas la règle : un rejet expliqué, avec sa correction datée, est une fiche qu'on a eu raison de refuser. C'est l'inexpliqué qui bloque.",
      "Non. Trop fort : l'essai a tenu ses critères. Un 3e essai pour 6 rejets expliqués coûte des jours, sans rien apprendre.",
      "Non. Trop fort : des heures pour revoir ce que le rapprochement a déjà comparé, fiche par fiche. L'échantillon ciblé suffit."
    ],
    retenir: "Tout est expliqué (extraites = chargées + rejetées, chaque rejet avec sa cause) : le propriétaire peut signer."
  }
];
