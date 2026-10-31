// Chef de projet SI — Questions du module cp24 « Conformité dans un projet SI ».
// Fond (le RGPD tel que la CNIL l'explique sur cnil.fr ; recommandations de l'ANSSI ; pratiques de terrain en PME / ETI) :
// chaque règle a sa source officielle, quelqu'un qui la suit, un effet sur le projet ; ce qu'on ne sait pas, on le
// vérifie, on ne le suppose pas ; l'entreprise est responsable du traitement (représentée par le DG), la PA et
// l'intégrateur sont sous-traitants, jamais pour leur propre compte ; le DPO conseille et contrôle, il ne décide pas ;
// le registre, interne, chaque service décrit les siens, mis à jour à chaque changement ; protection dès la conception
// et par défaut ; une durée par donnée, copies comprises ; l'effacement ne vaut pas pour les factures (durée légale) ;
// droits des personnes, réponse sous un mois ; violation : stopper, le DPO le jour même, la CNIL dans les meilleurs
// délais et 72 h au plus tard après en avoir pris connaissance, sauf absence de risque (la direction décide, sur l'avis
// du DPO, qui déclare), notifier puis compléter, les personnes prévenues si le risque est élevé, le registre interne
// dans tous les cas ; le droit suit le besoin du poste, revue annuelle par les managers, un compte = une personne,
// comptes à privilèges nominatifs ; charte : aucune donnée dans un outil en ligne non validé par la DSI ; licences
// comptées selon le contrat, audit d'éditeur préparé ; garder les preuves ; DSI adjoint : un plan classé par le risque.
// Fil rouge DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi). « La réglementation » : dates de
// la facture électronique (q04), RGPD et avis du DPO en cas de doute (q15 à q17, q22, q24), conservation des factures,
// durée légale (q12, q13, q41), NIS2, seulement ce que dit la fiche (q02, q03, q29, q30). « Conformité (module cp24) » :
// l'entreprise responsable du traitement, représentée par le DG (q05, q40) ; DPO externe qui conseille sans décider
// (q05, q07, q08, q11, q13, q28, q29, q40) ; registre, traitement « factures » mis à jour avec le DPO en novembre 2026,
// à la signature de la PA (q06, q07), puis à l'avenant d'archivage de mars 2027 (q08 ; cp14-q31) ; PA et intégrateur
// sous-traitants (q05, q09, q21) ; violation (q15 à q22, q32, q34, q40) ; effacement face à la durée légale (q12, q13) ;
// revue annuelle des accès par chaque manager, sur la liste de la DSI (q25, q31, q39) ; comptes des prestataires
// (q23, q32 ; cp22) ; charte (q24, q38). Autres lignes : pilote en mai (q15, q18, q22), hypercare en juin (q17) ;
// remplaçant du consultant en août 2027 (q23, comme cp22-q12) ; tes droits sur le connecteur, en urgence réelle (q23) ;
// 800 factures papier ou PDF en juillet 2027 (q24, cp23) ; l'ADV, propriétaire des données clients (q12, q14, cp20) ;
// AquaBleu, 20 % du chiffre d'affaires (q14, q30) ; demande de WMS pour 2028 (q35, cp25). Cadre « Tu es DSI adjoint »
// (2028 et après) : q27 à q41.
// Relecture du testeur (31/10/2026) : q04, q09, q16, q17, q21, q22, q24, q26, q30, q32, q34, q38, q40, q41 retouchées (voir
// changements.txt du testeur). Scénarios changés : rumeur « C'est voté » (q04) ; compte oublié à la clôture (q32) ;
// prix et remises dans l'IA (q38) ; Snowflake sans date de fin (q41). Ajouts juridiques vérifiés : les 72 h se
// comptent week-end compris (q22 ; règlement CEE n° 1182/71, art. 3) ; la PA ne notifie en votre nom que si le
// contrat le prévoit, avec votre accord (q21 ; clauses types de sous-traitance de la CNIL). Les chiffres anti-devinette
// ci-dessous sont ceux de l'expert, avant relecture.
// Faits ajoutés (cohérents avec la fiche et les modules publiés, à valider) : pendant DEMAT, une violation va au DPO le
// jour même (par écrit s'il est injoignable), et à ton DSI et au DAF ; la direction décide de notifier (le DG
// représente l'entreprise, q40) ; le registre interne des violations est tenu avec le DPO ; une demande d'une personne
// est traitée par le service qui tient ses données (l'ADV pour les clients), avec l'aide du DPO ; chaque consultant a
// un accès à son nom, par ticket. Scénarios : rumeur d'un report à 2029, en novembre 2026 (q04) ; l'annexe RGPD de la
// PA nomme « le DPO du client » (q05) ; la cheffe comptable te demande d'écrire sa ligne du registre (q07) ; lettre
// d'information de la PA, février 2027 (q09) ; ton DSI veut montrer DEMAT au DPO à la fin (q10) ; copie PDF sur un
// dossier ouvert, proposée par le consultant en février 2027 (q11) ; un plombier, client jusqu'en 2026 (q12) ; une
// comptable veut effacer les factures de plus de 3 ans (q13) ; l'acheteuse d'AquaBleu, en juillet 2027 (q14) ; le
// fichier des rejets, 40 clients, envoyé par toi à un fournisseur (q15) ; le portable chiffré de Julie, avril 2027
// (q16) ; Marc et une fausse page, juin 2027 (q17) ; un fichier parti le mercredi 5 mai, signalé le lundi 10 mai à
// 10 h (q18) ; incident de la PA, 100 puis 300 factures (q19) ; la boîte mail de la compta piratée, 80 clients
// entrepreneurs individuels (q20) ; incident de la PA, septembre 2027 (q21) ; vendredi 17 h 30, cabinet du DPO fermé
// (q22) ; la stagiaire et un site d'OCR gratuit, 2 semaines (q24) ; Julie administratrice du portail depuis la recette
// (q25) ; avis du DPO par téléphone, janvier 2027 (q26) ; « pack NIS2 » à 40 k€ (q29) ; questionnaire d'AquaBleu,
// vérification en cours (q30) ; compte de l'ancien consultant actif sur la PA, connexion à 23 h (q32) ; compte « admin »
// partagé, mot de passe de 3 ans (q33) ; lien public d'un rapport Power BI, 3 jours (q34) ; logiciel de reporting sous
// licence par utilisateur nommé, 65 comptes, 40 connexions simultanées au plus (q36, q37) ; 14 comptes fermés (q39) ;
// 48 h perdues (q40) ; Snowflake depuis 2012 (q41).
// Calculs et dates vérifiés : mercredi 5, samedi 8, lundi 10 et jeudi 13 mai 2027 tombent le jour écrit ; lundi 10 h
// + 72 h = jeudi 10 h (q18) ; 72 h − 48 h = 24 h (q40) ; 80 − 65 = 15 licences pour personne (q37).
// Affirmations juridiques hors fiche (générales, vérifiées sur cnil.fr et cyber.gouv.fr le 31 octobre 2026, sources
// dans le rapport) : responsable du traitement et sous-traitant (q05, q09, q21) ; le DPO n'est pas responsable de la
// conformité (q05, q28) ; plus de déclaration de fichiers à la CNIL, registre interne (q06) ; protection dès la
// conception et par défaut (q10, q11, q35) ; archive à accès limité puis effacement ou anonymat (q12, q41) ; réponse aux
// droits sous un mois, délai qui court dès la demande (q12, q14) ; notification en deux temps, un retard s'explique
// (q18, q19) ; pas de notification sans risque, données chiffrées (q16) ; le sous-traitant prévient sans tarder (q21) ;
// principe de responsabilité (q26, q39) ; comptes d'administration nominatifs (q33, ANSSI). Licences et audit
// d'éditeur : pratique contractuelle (q36, q37). Aucun montant d'amende. NIS2 : rien hors de la fiche.
// Déjà publiées ailleurs, pas reprises ici : cp01-q27 (copie de la base pour les tests), cp14-q21 (clause RGPD du
// contrat), cp20-q33 à q36 (colonnes en trop, copies de transit, entrepreneurs individuels, effacement après la
// reprise), cp22-q27 (compte administrateur du consultant à la clôture), cp03-q03 (accès administrateur permanent),
// cp03-q13 (dépôts sur le portail pendant une absence), cp14-q31 (prix de l'avenant d'archivage), cp16-q39 (archivage
// oublié). Voisines, avec un autre angle : q23 et cp22-q27 (ici : un compte nominatif, pas la fermeture) ; q32 et
// cp22-q27 (ici : un compte oublié, utilisé la nuit) ; q41 et cp20-q39 (ici : la durée au registre, pas le coût de la
// reprise) ; q12 et cp20-q35 (ici : une demande d'effacement) ; q16 et cp20-q34 (ici : une perte hors de l'entreprise,
// chiffrée) ; q08 et cp14-q31 (ici : le registre, pas le prix).
// Frontières : la clause RGPD du contrat = cp14 ; les données de test = cp19 ; la reprise = cp20 ; la clôture des accès
// = cp22 ; classer les projets = cp25 ; manager l'équipe = cp26 (q34) ; le budget SI annuel = cp27. Cités, pas refaits.
// Types : règles q01 à q04 ; rôles, registre, conception q05 à q11 ; garder et effacer q12 à q14 ; violation q15 à q22 ;
// accès et outils q23 à q25 ; preuves q26 ; « Tu es DSI adjoint » q27 à q41 (plan et rôles q27, q28 ; NIS2 q29, q30 ;
// accès q31 à q33 ; violation q34, q40 ; conception q35 ; licences q36, q37 ; charte q38 ; preuves q39 ; durée q41).
// Anti-devinette (scores.js, sans connaître le sujet) : la bonne réponse est un extrême dans 8 questions sur 33 avec un
// axe d'action (la plus forte qui se justifie : q08, q20, q26, q32, q33, q40 ; la plus douce : q11, q13). Règles du
// module : « toujours le DPO » 32 % (37 % dans les questions où il apparaît), « toujours déclarer à la CNIL » 23 %,
// « le plus prudent » 15 %, « attendre la loi ou le texte » 18 %, « faire soi-même » 21 % : le DPO est dans 15 bonnes
// réponses et 22 fausses ; déclarer est juste dans q19 et faux dans q06, q15, q16, q21, q22, q40 ; on ne déclare pas en
// q16 (registre seul) ; on garde en q12, q13 ; le DPO n'est pas le bon interlocuteur, ou ne décide pas, en q05, q08,
// q11, q12, q13, q20, q28, q29, q39, q40 ; faire soi-même est juste en q15. Règles générales : l'action moyenne 35 %, la plus petite action réelle 27 %, la plus
// forte si urgence 38 %, toujours le sponsor 27 %, jamais au-dessus du manager 17 %, le choix à deux actions 34 % (41 %
// là où il y en a), la plus longue 23 %, la plus courte 24 %, extrêmes écartés + chiffre ou date 39 %, + mot de méthode
// 35 %, écarter absolus, oui, DAF / COPIL 31 %, écarter « rien » et le plus fort puis deux actions 39 %, le seul choix
// avec un point-virgule 33 % (3 sur 9). Combinaisons plus fines (écarter « rien », « attendre », « toi-même », « tout
// couper », puis mot de méthode, DPO, point-virgule ou la plus longue) : 50 % au plus. « Aujourd'hui », « le jour
// même », « dès », « tout de suite », « maintenant » des deux côtés ; absolus dans 5 bonnes réponses ; « Oui »,
// « D'accord », « Tu acceptes » dans 3, « « Non : » » dans 1 ; « presque juste » dans 26 questions.
LEARNSQL.questions.cp24 = [
  {
    id: "cp24-q01",
    dialecte: "Gestion de projet",
    q: "Fin octobre 2026, cadrage. Tu dresses la liste des règles qui s'appliquent. Que notes-tu pour chacune ?",
    choix: [
      "Sa source officielle ; et son texte complet, en annexe",
      "Ce qu'en dit l'intégrateur : il connaît la loi et Divalto",
      "Sa source, qui la suit, ce qu'elle change pour DEMAT",
      "Rien : les lois, c'est l'affaire du DAF et du DPO"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : la source, oui. Mais un texte entier en annexe, personne ne le lit. Il manque l'essentiel : qui suit la règle, et ce qu'elle change pour ton projet.",
      "Non. L'intégrateur connaît Divalto, pas forcément la loi, et il a son intérêt. Une règle se lit à sa source officielle : impots.gouv.fr, cnil.fr.",
      "Oui. La source dit si la règle est sûre ; le nom dit qui la suit ; l'effet dit ce que ton projet doit prévoir (un champ, un délai, un contrôle). Une ligne par règle suffit.",
      "Non. Le DAF décide, le DPO conseille ; mais c'est ton projet qui doit appliquer ces règles. Sans ta liste, une règle oubliée apparaît en recette."
    ],
    retenir: "Pour chaque règle du projet : sa source officielle, qui la suit, ce qu'elle change."
  },
  {
    id: "cp24-q02",
    dialecte: "Gestion de projet",
    q: "Octobre 2026, démo d'une PA. Son commercial : « Avec nous, vous serez conformes au RGPD et à NIS2, c'est garanti. » Que fais-tu de cette phrase ?",
    choix: [
      "Aucune PA ne te rend conforme : tu vérifies le contrat",
      "Tu l'écris comme un atout, dans la grille de choix des PA",
      "Rien : le choix de la PA, c'est le DAF qui le fait, pas toi",
      "Tu écartes cette PA ; on ne choisit pas un vendeur qui exagère"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. L'entreprise reste responsable de ses traitements : la PA, sous-traitant, s'engage sur ce que le contrat prévoit (module cp14). Et NIS2 : c'est à l'entreprise de vérifier si elle est concernée.",
      "Non. Une promesse de vendeur n'est pas une preuve. Et sur NIS2, la loi française n'est pas votée : personne ne peut garantir d'y être conforme.",
      "Non. Le DAF choisit, mais tu prépares la grille et ses preuves (module cp13). Une phrase non vérifiée peut fausser son choix.",
      "Non. Trop fort : une phrase commerciale n'élimine pas une PA de la liste officielle. On la vérifie, et la grille fait le reste."
    ],
    retenir: "Un fournisseur ne rend pas conforme à ta place : tu vérifies ce que dit le contrat, et ce qui vaut pour l'entreprise."
  },
  {
    id: "cp24-q03",
    dialecte: "Gestion de projet",
    q: "Fin octobre 2026. Le DAF : « NIS2, on est concernés ? Un fournisseur m'a dit que oui, et qu'il fallait tout faire avant l'été. » Que réponds-tu ?",
    choix: [
      "« Oui : je te prépare un plan pour avant l'été »",
      "« Non : nous sommes un négociant, pas une usine »",
      "« On attend le texte de la loi, puis on vérifie »",
      "« On vérifie : le test de l'ANSSI, puis l'avis d'un juriste »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu supposes, sur la parole d'un vendeur. Et « avant l'été » : aucune date n'est fixée, la loi française n'est pas votée.",
      "Non. Tu supposes aussi, dans l'autre sens. La directive vise aussi la distribution de produits chimiques : vos produits de traitement de l'eau en sont peut-être.",
      "Non. Attendre le texte, c'est découvrir tard. Savoir si l'entreprise est visée se vérifie dès maintenant, sans attendre le vote de la loi.",
      "Oui. Ni oui ni non sans preuve : le test de l'ANSSI (l'agence nationale de la sécurité des systèmes d'information) sur MonEspaceNIS2, puis un juriste sur votre cas. Et aucune date à retenir : la loi française n'est pas votée."
    ],
    retenir: "NIS2 : concerné ou pas, on le vérifie (test de l'ANSSI, puis un juriste) ; on ne le suppose pas."
  },
  {
    id: "cp24-q04",
    dialecte: "Gestion de projet",
    q: "Novembre 2026. Un collègue a lu sur un forum : « C'est voté : la facture électronique est reportée à 2029. » La cheffe comptable veut tout ralentir. Que fais-tu ?",
    choix: [
      "Tu vérifies sur impots.gouv.fr ; sans texte, rien ne change",
      "Tu ralentis le projet, le temps de vérifier",
      "Tu réponds que c'est faux : tu as vérifié les dates en octobre",
      "Tu demandes au DAF de trancher au prochain COPIL"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une date légale se lit à sa source officielle. Sans texte nouveau, le planning reste : la réception est déjà obligatoire, l'émission le sera au 1er septembre 2027.",
      "Non. Vérifier, oui ; ralentir, non. Tu ralentis sur une rumeur : si elle est fausse, la marge légale fond. Une date se vérifie en 5 minutes, sans toucher au planning.",
      "Non. Presque : la date ne change sans doute pas. Mais la rumeur parle d'un vote récent : ta vérification d'octobre ne peut pas le savoir. Revérifie aujourd'hui, puis montre la source : elle te croira mieux.",
      "Non. Rien à trancher : c'est un fait à vérifier, en 5 minutes. Et d'ici le COPIL, la rumeur aura fait le tour de la compta."
    ],
    retenir: "Une rumeur sur la loi se vérifie à la source officielle avant de changer quoi que ce soit."
  },
  {
    id: "cp24-q05",
    dialecte: "Gestion de projet",
    q: "Novembre 2026. Dans l'annexe RGPD de son contrat, la PA a écrit : « Responsable du traitement : le DPO du client. » Que fais-tu ?",
    choix: [
      "Tu laisses : le DPO est le spécialiste des données",
      "Tu fais mettre ton nom : c'est toi qui pilotes DEMAT",
      "Tu fais mettre la PA ; c'est elle qui traite les factures",
      "Tu le signales au DAF : c'est l'entreprise, pas le DPO"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le DPO conseille et contrôle ; il ne décide pas. L'écrire responsable, c'est lui donner une décision qui n'est pas la sienne.",
      "Non. Tu pilotes le projet, mais tu ne décides pas de ce que l'entreprise fait de ses données. Et tu ne signes pas le contrat.",
      "Non. La PA traite les factures pour vous, sur vos instructions : c'est le sous-traitant. Inverser les rôles, c'est inverser les obligations.",
      "Oui. Le responsable du traitement, c'est l'entreprise : elle décide pourquoi et comment on traite les factures, et le DG la représente. Les clauses, c'est le DAF qui les fait corriger (module cp14)."
    ],
    retenir: "Le responsable du traitement est l'entreprise ; le DPO conseille ; la PA est sous-traitant."
  },
  {
    id: "cp24-q06",
    dialecte: "Gestion de projet",
    q: "Novembre 2026. Le DAF vient de signer le contrat de la PA, clause RGPD comprise. Côté données personnelles, que reste-t-il à faire ?",
    choix: [
      "Mettre à jour le registre, traitement « factures », avec le DPO",
      "Rien : la clause, relue par le DPO, couvre tout",
      "La déclarer à la CNIL, avec le contrat, comme nouveau sous-traitant",
      "Faire signer à chaque client un accord écrit, avant la bascule"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un nouveau sous-traitant change le traitement « factures » : qui reçoit les données, où, combien de temps. La compta le met à jour avec le DPO, ce mois-ci ; tu apportes les faits du projet.",
      "Non. Presque : la clause est faite. Mais le registre doit dire que la PA reçoit désormais les factures. Sinon, il décrit un traitement qui n'existe plus.",
      "Non. Il n'y a plus de déclaration de fichiers à la CNIL, contrat ou pas : c'est le registre, interne, qui décrit le traitement et ses sous-traitants.",
      "Non. Facturer est une obligation légale : la PA n'attend pas l'accord de chaque client (module cp20). 2 000 signatures pour rien, et une bascule bloquée."
    ],
    retenir: "Un nouveau sous-traitant change le traitement : on met à jour le registre, avec le DPO."
  },
  {
    id: "cp24-q07",
    dialecte: "Gestion de projet",
    q: "Novembre 2026. Le DPO demande à la compta de décrire son traitement « factures » au registre. La cheffe comptable : « C'est de l'informatique : fais-le, toi. » Que réponds-tu ?",
    choix: [
      "« D'accord : je l'écris ce soir, tu n'as qu'à signer »",
      "« Le DPO est payé pour ça : laissons-le l'écrire à notre place »",
      "« Tu décris l'usage ; moi, les flux et la PA ; le DPO relit »",
      "« J'en parle au DAF ; c'est le travail de ton équipe »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : ton aide est utile. Mais tu ne sais pas tout de son traitement : qui consulte les factures, combien de temps elle les garde. Et elle ne saura pas le tenir à jour.",
      "Non. Le DPO conseille et relit ; il ne connaît pas le travail de la compta. Chaque service décrit ses traitements.",
      "Oui. Elle décrit son traitement : à quoi il sert, qui y accède, combien de temps. Toi, les faits du projet : les flux, la PA, les données envoyées. Le DPO relit.",
      "Non. Trop tôt et trop haut : elle ne refuse pas, elle ne sait pas faire. Un partage clair règle la question en 5 minutes."
    ],
    retenir: "Chaque service décrit ses traitements au registre ; le projet apporte les faits techniques ; le DPO relit."
  },
  {
    id: "cp24-q08",
    dialecte: "Gestion de projet",
    q: "Mars 2027. Un avenant ajoute l'option d'archivage de la PA : elle gardera vos factures des années. Côté registre, que fais-tu ?",
    choix: [
      "Rien : la PA y figure déjà, depuis novembre",
      "Tu en parles au DPO, qui décidera s'il faut changer la ligne",
      "Tu attends la fin du projet, pour tout mettre à jour d'un coup",
      "Tu fais mettre à jour la ligne du traitement : durée, lieu, accès"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Presque : la PA est bien au registre. Mais ce qu'elle fait a changé : elle garde les factures des années. Le registre doit dire combien de temps, et qui y accède.",
      "Non. Le DPO conseille, il ne décide pas ; il ne connaît pas l'avenant, et la ligne n'est pas à lui : la compta la met à jour, avec lui. Toi, tu donnes les faits.",
      "Non. En juillet, plus personne ne se souvient des détails de mars. Et pendant 4 mois, le registre décrit un traitement faux.",
      "Oui. Le registre vit avec le projet : une durée, un lieu, des accès qui changent, on l'écrit. La compta le fait avec le DPO ; tu donnes les faits de l'avenant."
    ],
    retenir: "Le registre suit les changements : une durée, un lieu, un accès qui change, on le met à jour."
  },
  {
    id: "cp24-q09",
    dialecte: "Gestion de projet",
    q: "Février 2027. La lettre d'information de la PA annonce : « Vos données de facturation enrichiront nos études de marché. » Votre contrat n'en dit rien. Que fais-tu ?",
    choix: [
      "Rien : ce sont ses serveurs, elle en fait ce qu'elle veut",
      "Tu le signales au DAF et au DPO, contrat en main",
      "Tu demandes au DAF de résilier le contrat, dès aujourd'hui",
      "Tu l'ajoutes au registre avec le DPO, comme un nouvel usage"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La PA est votre sous-traitant : elle traite vos données pour vous, sur vos instructions. Les utiliser pour elle-même sort de ce cadre.",
      "Oui. Par défaut, un sous-traitant ne traite pas vos données pour son propre compte. Le DPO dit le risque ; le DAF, qui a signé, le règle avec la PA, contrat en main.",
      "Non. Trop fort, et trop tôt : on ne sait même pas si vos données sont visées. Un contrat se fait d'abord respecter.",
      "Non. Presque : le DPO doit le savoir. Mais le registre décrit vos traitements ; ici, la PA veut se servir de vos données pour elle-même : c'est un écart au contrat, pas votre usage. Le DAF le règle avec elle, sur l'avis du DPO."
    ],
    retenir: "Un sous-traitant traite vos données pour vous, jamais pour lui : un écart se règle par le DAF, contrat en main, avec le DPO."
  },
  {
    id: "cp24-q10",
    dialecte: "Gestion de projet",
    q: "Octobre 2026, cadrage. Ton DSI : « Le DPO ? On lui montrera DEMAT à la fin, quand tout marchera. » Que proposes-tu ?",
    choix: [
      "« D'accord : à la recette, il contrôlera le vrai résultat »",
      "« À chaque réunion du projet, pour qu'il valide tout »",
      "« Dès maintenant : les données, les accès, la durée »",
      "« Jamais : la clause RGPD du contrat suffira »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. À la recette, tout est construit : changer un flux ou un champ coûte cher. Le DPO arriverait pour contrôler, plus pour conseiller.",
      "Non. Trop : le DPO conseille aux moments clés (cadrage, contrats, changements) ; il ne valide pas chaque réunion, et ne décide pas à ta place.",
      "Oui. Protection dès la conception : le minimum de données, d'accès et de durée se décide au cadrage. Le DPO conseille quand c'est encore facile à changer.",
      "Non. La clause encadre la PA ; elle ne dit pas quelles données vous lui envoyez, ni pour combien de temps. Ça se décide dans le projet."
    ],
    retenir: "Protection dès la conception : le DPO au cadrage, pour décider tôt le minimum de données, d'accès et de durée."
  },
  {
    id: "cp24-q11",
    dialecte: "Gestion de projet",
    q: "Février 2027. Le consultant veut copier chaque facture émise, en PDF, dans un dossier réseau ouvert à toute l'entreprise, « pour le support ». Le support voit déjà les factures dans Divalto. Que réponds-tu ?",
    choix: [
      "« D'accord : le dossier reste interne, rien ne sort »",
      "« Pas de copie en plus : elle ne servirait à rien »",
      "« D'accord, si le dossier est réservé au support »",
      "« Le DPO choisira le dossier : c'est son domaine »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Interne ne veut pas dire limité : 120 personnes verraient les factures et les contacts des clients. Par défaut, une donnée n'est vue que par qui en a besoin.",
      "Oui. Le support voit déjà les factures dans Divalto, avec ses droits. Une copie de plus, c'est une durée à gérer, des accès à revoir, un risque de fuite : sans besoin, on ne la fait pas.",
      "Non. Presque : réservé, c'est mieux qu'ouvert. Mais la copie ne sert à rien : le support a déjà les factures. Une copie sans besoin reste un risque.",
      "Non. Le DPO conseille sur la question, il ne range pas vos fichiers. Et la vraie question est simple : à quoi sert cette copie ?"
    ],
    retenir: "Protection par défaut : pas de copie sans besoin, et une donnée n'est vue que par qui en a besoin."
  },
  {
    id: "cp24-q12",
    dialecte: "Gestion de projet",
    q: "Septembre 2027. Un plombier, client jusqu'en 2026 en entreprise individuelle, écrit à l'ADV : « Effacez toutes mes données. » Le responsable ADV te demande conseil. Que lui dis-tu ?",
    choix: [
      "Garder ses factures, effacer le reste, répondre sous un mois",
      "Tout effacer, factures comprises, et le lui confirmer",
      "Ne rien effacer : un ancien client, on garde tout",
      "Transmettre au DPO : c'est à lui d'effacer et de répondre"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Les factures restent (obligation légale), en archive à l'accès limité ; le reste est effacé. La réponse part sous un mois : ce qui est effacé, ce qui reste, et pourquoi. Le DPO aide à l'écrire.",
      "Non. Le droit à l'effacement ne vaut pas pour ce qu'une loi oblige à garder : ses factures restent, la durée légale. Les effacer, puis le lui écrire, c'est enfreindre une autre loi.",
      "Non. Tu gardes trop : ses coordonnées, ses données de prospection ne servent plus à rien. Seul ce que la loi impose reste.",
      "Non. Presque : le DPO aide. Mais les données sont dans Divalto, chez l'ADV : c'est elle qui efface et répond, avec son conseil."
    ],
    retenir: "Une demande d'effacement : on garde ce que la loi impose (les factures), on efface le reste, et on répond sous un mois."
  },
  {
    id: "cp24-q13",
    dialecte: "Gestion de projet",
    q: "Octobre 2027. Une comptable propose d'effacer de Divalto les factures de plus de 3 ans, « pour être en règle avec le RGPD ». Que réponds-tu ?",
    choix: [
      "« Bonne idée : moins de données, moins de risques »",
      "« D'accord, après un export complet, par sécurité »",
      "« Non : la loi oblige à les garder, durée légale »",
      "« Je demande au DPO de décider : c'est son rôle »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le RGPD demande une durée par donnée, pas d'effacer ce qu'une loi oblige à garder. Sans les factures, plus de preuve pour le fisc.",
      "Non. Presque : garder une trace, oui. Mais un export fait à la main n'est pas une archive : une copie de plus, sans règle ni accès limité. Et le RGPD n'oblige pas à effacer ce que la loi impose de garder.",
      "Oui. Une obligation légale passe avant : les factures se gardent la durée légale. Le RGPD demande que cette durée soit écrite au registre, et qu'on efface à la fin.",
      "Non. Le DPO conseille, il ne décide pas. Et rien à décider : la durée légale des factures n'est pas une question d'avis. Le DPO aide quand il y a un doute ; ici, il n'y en a pas."
    ],
    retenir: "Le RGPD n'oblige pas à effacer ce qu'une loi impose de garder : les factures restent, la durée légale."
  },
  {
    id: "cp24-q14",
    dialecte: "Gestion de projet",
    q: "Juillet 2027. L'acheteuse d'AquaBleu vous écrit : « Quelles données avez-vous sur moi ? » Son nom, son e-mail et son téléphone passent dans vos flux EDI. Que fais-tu ?",
    choix: [
      "Tu réponds qu'AquaBleu est une société ; le RGPD ne la vise pas",
      "Tu lui envoies ce soir tout l'export EDI, et tu préviens le DPO",
      "Tu fais répondre AquaBleu : c'est son employeur, et votre client",
      "Tu préviens l'ADV et le DPO ; réponse sous un mois"
    ],
    bonne: 3,
    pourquoi: [
      "Non. AquaBleu est une société, mais l'acheteuse est une personne : son nom, son e-mail, son téléphone sont des données personnelles. Elle a le droit de savoir.",
      "Non. Trop large, et trop vite : ces messages contiennent aussi d'autres personnes, et vos prix. Prévenir le DPO ne change rien à l'envoi : elle reçoit ses données à elle, vérifiées.",
      "Non. C'est à vous de répondre : c'est vous qui avez ses données, dans vos flux. Son employeur n'a pas à s'en mêler, et le délai d'un mois court déjà.",
      "Oui. C'est son droit d'accès. L'ADV, qui tient les données clients, répond avec le DPO ; toi, tu dis ce qui passe dans les flux EDI. Sous un mois : quelles données, où, pourquoi, combien de temps."
    ],
    retenir: "Le contact d'un client est une personne : il peut savoir quelles données on a sur lui ; réponse sous un mois."
  },
  {
    id: "cp24-q15",
    dialecte: "Gestion de projet",
    q: "Mai 2027, pilote. Tu envoies par erreur à un fournisseur le fichier des rejets du jour : 40 clients, dont des entrepreneurs individuels. Tu t'en aperçois 5 minutes après. Que fais-tu d'abord ?",
    choix: [
      "Tu préviens le DPO, et tu attends son avis écrit avant d'appeler",
      "Tu l'appelles : il efface tout, confirmé par écrit",
      "Tu déclares toi-même la violation à la CNIL, dans l'heure",
      "Rien : c'est un partenaire de confiance, il ne lira pas"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Presque : le DPO, oui, le jour même. Mais attendre son avis écrit laisse le fichier ouvert chez le fournisseur. Stopper d'abord : un appel suffit.",
      "Oui. D'abord stopper : c'est toi qui as envoyé, tu appelles tout de suite. La confirmation écrite garde la preuve. Puis le DPO, le jour même, et le registre.",
      "Non. Pas à toi, et pas d'abord : notifier se décide par la direction, sur l'avis du DPO, qui fait la déclaration. D'abord, stopper.",
      "Non. La confiance n'efface pas le fichier : 40 clients restent chez un tiers. C'est une violation : on stoppe, et le DPO le saura le jour même."
    ],
    retenir: "Une violation : d'abord stopper (faire supprimer, preuve écrite à l'appui), puis le DPO le jour même."
  },
  {
    id: "cp24-q16",
    dialecte: "Gestion de projet",
    q: "Avril 2027. Julie a perdu son portable de l'entreprise : dedans, un export de factures fournisseurs, avec des contacts. Le disque est chiffré ; le mot de passe n'était pas avec lui. Que fais-tu ?",
    choix: [
      "Rien : le disque est chiffré ; il n'y a aucun risque",
      "Le DPO prévenu, puis la CNIL notifiée sous 72 h, contre tout risque",
      "Le DPO le jour même ; même sans notification, le registre",
      "Tu préviens, le jour même, chaque fournisseur cité dans le fichier"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : le risque est sans doute faible. Mais une perte reste une violation : le DPO vérifie (chiffrement, mot de passe), et elle va au registre interne, même sans notification.",
      "Non. Le DPO, oui. Mais notifier se décide après son analyse, sur le risque réel, par la direction ; pas d'avance, « contre tout risque ». Un disque chiffré, sans son mot de passe, ne présente en général pas de risque pour les personnes.",
      "Oui. Le DPO vérifie le chiffrement et le mot de passe ; les données existent encore dans Divalto. Sans risque pour les personnes, la direction peut décider de ne pas notifier la CNIL ; la violation va quand même au registre interne.",
      "Non. Trop fort : on prévient les personnes quand le risque est élevé. Disque chiffré, mot de passe ailleurs : tu inquiètes des dizaines de fournisseurs pour rien."
    ],
    retenir: "Toute violation va au registre interne ; sans risque pour les personnes (disque chiffré, mot de passe resté secret), elle n'a pas à être notifiée."
  },
  {
    id: "cp24-q17",
    dialecte: "Gestion de projet",
    q: "Juin 2027, hypercare. Marc a tapé son mot de passe du portail de la PA sur une fausse page. Cette nuit, quelqu'un s'est connecté avec son compte. Que fais-tu d'abord ?",
    choix: [
      "Son compte bloqué tout de suite ; le DPO le jour même",
      "Tu fais couper tout de suite le portail pour tous, le temps d'enquêter",
      "Tu lui fais changer son mot de passe le jour même, sans plus",
      "Tu cherches ce qui a été vu ; le DPO quand tu sauras"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Stopper : son compte bloqué, puis un nouveau mot de passe. Le DPO, le jour même : un inconnu a pu voir des factures. La direction décidera, sur son avis.",
      "Non. Trop fort : on bloque le compte touché, pas la facturation de toute l'entreprise, en pleine hypercare. Le portail sert aussi au plan B.",
      "Non. Presque : ça ferme l'accès. Mais quelqu'un a pu voir des factures : le DPO doit le savoir le jour même pour juger le risque. Sans lui, rien n'est analysé ni noté.",
      "Non. Pendant que tu cherches, le compte reste ouvert, et les 72 h courent. On stoppe, on prévient, puis on cherche avec le DPO."
    ],
    retenir: "Un compte piraté : on le bloque tout de suite, et le DPO le sait le jour même. On ne coupe pas tout."
  },
  {
    id: "cp24-q18",
    dialecte: "Gestion de projet",
    q: "Pilote. Mercredi 5 mai, un fichier de factures part au mauvais client, sans que personne le voie. Lundi 10 mai à 10 h, ce client vous le signale. Le DPO voit un risque. Quand notifier la CNIL ?",
    choix: [
      "Samedi 8 mai : 72 h après l'envoi, c'est déjà trop tard",
      "Jeudi 13 mai à 10 h : on prend tout le délai, pour être complet",
      "Quand l'enquête sera finie : un dossier complet, même tard",
      "Dès que possible, et au plus tard jeudi 13 mai à 10 h"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Les 72 h partent du moment où l'entreprise l'apprend (lundi 10 h), pas de l'envoi. Et un retard ne dispense pas de notifier : on explique alors pourquoi.",
      "Non. Presque : la limite est juste. Mais il faut notifier dans les meilleurs délais : 72 h est un plafond. Ce qui manque se complète après.",
      "Non. On n'attend pas un dossier complet : on notifie avec ce qu'on sait, dans les 72 h, puis on complète.",
      "Oui. 72 h après en avoir pris connaissance : lundi 10 h + 72 h = jeudi 10 h. Mais la règle dit « dans les meilleurs délais » : 72 h est un plafond, pas un objectif."
    ],
    retenir: "La CNIL : dans les meilleurs délais, et au plus tard 72 h après en avoir pris connaissance, pas après l'incident."
  },
  {
    id: "cp24-q19",
    dialecte: "Gestion de projet",
    q: "Mardi, le DPO a notifié la CNIL : 100 factures vues, selon les 1res infos de la PA. Jeudi, l'enquête de la PA en trouve 300. Le DPO : « Je complète la notification. » Que réponds-tu ?",
    choix: [
      "« D'accord : la CNIL doit avoir les 300 »",
      "« Non : la CNIL est notifiée, le dossier est clos »",
      "« Non : fais-en une neuve ; retire la première, fausse »",
      "« Attends : je préviens moi-même les 300 clients, ce soir »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. On notifie avec ce qu'on sait, puis on complète : le nombre de factures, les personnes touchées, les mesures prises. Le DPO, qui a déclaré, envoie le complément ; le registre interne suit. Ici, le oui simple est le bon.",
      "Non. Une notification se complète quand on en sait plus : la CNIL doit avoir les vrais chiffres. Le dossier n'est pas clos.",
      "Non. On ne repart pas de zéro : la 1re notification reste, le complément s'y ajoute. Elle n'était pas fausse : elle disait ce qu'on savait.",
      "Non. Prévenir les personnes dépend du risque, et la direction le décide, sur l'avis du DPO. Pas toi, seul, un soir. Et la CNIL attend toujours les vrais chiffres."
    ],
    retenir: "On notifie avec ce qu'on sait, puis on complète : la notification suit l'enquête."
  },
  {
    id: "cp24-q20",
    dialecte: "Gestion de projet",
    q: "La boîte mail de la compta est piratée : le pirate a les factures de 80 clients entrepreneurs individuels, et peut leur écrire en se faisant passer pour vous. Le DPO juge le risque élevé ; la CNIL est notifiée. Faut-il prévenir aussi les 80 ?",
    choix: [
      "Oui, vite : ce qui s'est passé, le danger, ce qu'ils peuvent faire",
      "Non : la CNIL et le DPO sont prévenus, ils s'en chargent",
      "Non : ça les inquiéterait, et ça abîmerait votre image",
      "Non : on attend de voir si l'un d'eux se plaint"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Risque élevé : les personnes sont prévenues sans tarder. Ce qui s'est passé, le danger (un faux mail qui change les coordonnées bancaires), ce qu'elles peuvent faire (vérifier par téléphone). La direction valide le message, préparé avec le DPO.",
      "Non. La CNIL contrôle ; elle ne prévient pas vos clients à votre place. Quand le risque est élevé, c'est l'entreprise qui informe les personnes.",
      "Non. Se taire les laisse sans défense contre un faux mail de changement de coordonnées bancaires. Votre image souffrira bien plus s'ils paient un pirate sans avoir été prévenus.",
      "Non. Attendre une plainte, c'est attendre qu'un client ait déjà payé le pirate. Le risque est connu : on prévient."
    ],
    retenir: "Violation à risque élevé : on prévient aussi les personnes, vite, avec ce qu'elles peuvent faire."
  },
  {
    id: "cp24-q21",
    dialecte: "Gestion de projet",
    q: "Septembre 2027. La PA t'écrit : « Incident chez nous : des factures de vos clients ont pu être vues par un autre client de la plateforme. » Qui notifie la CNIL, s'il le faut ?",
    choix: [
      "La PA notifie, et vous en envoie une copie",
      "L'entreprise, sur l'avis du DPO ; la PA donne les faits",
      "Personne : la faute n'est pas la nôtre, mais celle de la PA",
      "Toi, ce soir : tu es le contact de la PA, pas le DPO"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La PA est votre sous-traitant : elle doit vous prévenir sans tarder, et vous aider. Par défaut, l'entreprise, responsable du traitement, décide et notifie ; la PA ne notifie en votre nom que si le contrat le prévoit, et avec votre accord.",
      "Oui. Le DPO le sait le jour même, avec le message de la PA. La direction décide, sur son avis, et le DPO fait la déclaration. La PA donne les faits : quelles factures, combien, depuis quand.",
      "Non. La faute ne change rien : ce sont vos clients et vos factures. L'entreprise reste responsable du traitement, même chez son sous-traitant.",
      "Non. Tu es le contact de la PA, pas l'entreprise : la décision revient à la direction, sur l'avis du DPO, qui déclare. Toi, tu transmets le jour même."
    ],
    retenir: "Violation chez un sous-traitant : il vous prévient ; l'entreprise, responsable du traitement, décide et notifie."
  },
  {
    id: "cp24-q22",
    dialecte: "Gestion de projet",
    q: "Vendredi 17 h 30, pilote. Un fichier de factures est parti au mauvais destinataire ; il l'a supprimé, par écrit. Le cabinet du DPO est fermé jusqu'à lundi. Que fais-tu ?",
    choix: [
      "Un mail au DPO ce soir ; ton DSI et le DAF prévenus aussi",
      "Rien de plus : c'est supprimé, l'affaire est close",
      "Tu attends lundi ; juger le risque, c'est le rôle du DPO",
      "Tu notifies toi-même la CNIL, le jour même, et tu préviens le DPO"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le DPO lira ton mail lundi matin ; ton DSI et le DAF le savent ce soir : la décision revient à la direction. Les 72 h courent, week-end compris : elles finissent lundi soir. Le registre suivra.",
      "Non. Presque : c'est stoppé, et prouvé. Mais une violation va toujours au DPO et au registre, et le risque doit être jugé : les 72 h courent depuis ce soir.",
      "Non. Le délai court déjà, week-end compris : 72 h après vendredi soir, c'est lundi soir. Attendre lundi pour prévenir, c'est laisser quelques heures pour juger et décider. Le DPO se prévient le jour même, par écrit s'il est injoignable ; la direction aussi.",
      "Non. Notifier se décide par la direction, sur l'avis du DPO, qui déclare. Seul, un vendredi soir, tu engages l'entreprise sans elle ; prévenir le DPO après ne change rien."
    ],
    retenir: "DPO injoignable : on lui écrit quand même, et la direction le sait le jour même ; le délai court."
  },
  {
    id: "cp24-q23",
    dialecte: "Gestion de projet",
    q: "Août 2027. Le nouveau consultant de l'intégrateur demande qu'on rouvre le compte de son prédécesseur : « Ses droits sont déjà réglés, on gagne du temps. » Que fais-tu ?",
    choix: [
      "D'accord, avec un mot de passe neuf, rien que pour lui",
      "Prêter ton accès : tu as des droits sur le connecteur",
      "Refusé : plus jamais d'accès pour l'intégrateur",
      "Un accès à son nom, par ticket, pour la durée de l'intervention"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Presque : un mot de passe neuf ferme l'ancien accès. Mais le compte reste au nom d'un autre : ses actions seront mises sur le dos de son prédécesseur. Un compte, une personne.",
      "Non. Prêter ton accès, c'est prêter ton nom : chaque action sera la tienne. Et tes droits servent en urgence réelle, pas au confort d'un prestataire.",
      "Non. Trop fort : l'intégrateur assure le support de Divalto, il doit pouvoir intervenir. Fermé par défaut, ouvert par ticket : pas « jamais ».",
      "Oui. Un compte nominatif : on sait qui fait quoi. Ouvert par le support, sur ticket, ton DSI d'accord, pour la durée de l'intervention, puis refermé (module cp22)."
    ],
    retenir: "Un compte = une personne : un prestataire a son propre accès, ouvert le temps de l'intervention."
  },
  {
    id: "cp24-q24",
    dialecte: "Gestion de projet",
    q: "Juillet 2027. Pour aller plus vite sur les factures papier, la stagiaire de la compta les dépose sur un site gratuit de lecture automatique (OCR). Depuis 2 semaines. Que fais-tu ?",
    choix: [
      "Rien : c'est efficace, et ça fait gagner du temps",
      "Elle arrête, par sa cheffe ; le DPO le jour même",
      "Tu fais bloquer maintenant tous les sites gratuits de la compta",
      "Tu lui expliques la charte ; elle choisit un site plus sûr"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Des factures, avec des noms et des contacts, sont parties chez un inconnu, qui peut les garder ou les réutiliser. La charte l'interdit : aucun outil en ligne non validé par la DSI.",
      "Oui. On stoppe d'abord, par sa cheffe, qui manage son travail. Le DPO, le jour même : des données personnelles sont sorties, il dit s'il y a violation. Et le besoin est réel : ton DSI peut proposer un outil validé.",
      "Non. Trop fort : couper un service du web ne règle ni les 2 semaines de dépôts, ni le besoin. On traite ce cas, puis le besoin.",
      "Non. Presque : expliquer la charte, oui. Mais un « site plus sûr » reste non validé : c'est la DSI qui valide un outil. Et les dépôts déjà faits vont au DPO."
    ],
    retenir: "Des données personnelles dans un outil en ligne non validé : on arrête, le DPO le sait le jour même, et le besoin va à la DSI."
  },
  {
    id: "cp24-q25",
    dialecte: "Gestion de projet",
    q: "Juillet 2027. Pendant la recette, Julie a reçu les droits d'administration du portail de la PA. Elle veut les garder, « au cas où ». Que fais-tu ?",
    choix: [
      "Rien : elle est sérieuse, et c'est plus pratique",
      "Tu les retires toi-même ce soir : c'est toi qui décides",
      "Tu le signales à sa cheffe : elle décide, le support applique",
      "Tu fais retirer leurs droits à toute la compta ; c'est plus sûr"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le sérieux n'est pas le sujet : un compte administrateur peut tout changer, par erreur ou s'il est piraté. Les droits suivent le besoin du poste.",
      "Non. Presque : les droits doivent baisser. Mais ce n'est ni ta décision ni ton geste : sa cheffe décide, le support applique. Sinon, Julie le découvre en plein travail.",
      "Oui. Le droit suit le besoin du poste : la recette est finie, l'administration n'est plus son travail. Sa cheffe, qui sait ce que fait Julie, décide ; le support l'applique.",
      "Non. Trop fort : le reste de la compta a besoin de ses droits pour travailler. On revoit ce compte-là, pas tous."
    ],
    retenir: "Les droits suivent le besoin du poste : un droit de la recette se retire après, sur décision du manager."
  },
  {
    id: "cp24-q26",
    dialecte: "Gestion de projet",
    q: "Janvier 2027. Au téléphone, le DPO valide la liste des champs envoyés à la PA. Que fais-tu de cet avis ?",
    choix: [
      "Rien de plus : son oui de vive voix, au téléphone, suffit",
      "Tu le redis à l'équipe, au point projet de lundi",
      "Tu le notes dans ton cahier, et tu le gardes pour toi",
      "Tu lui demandes 3 lignes par mail ; tu les ranges"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Dans un an, qui se souviendra de cet appel ? Une conformité se prouve : l'avis du DPO doit pouvoir se montrer.",
      "Non. Presque : l'équipe le sait. Mais redit en réunion, même noté au compte rendu, c'est ton résumé d'un appel : rien ne montre quelle liste le DPO a vue, ni ce qu'il a dit. Il faut son avis écrit, rangé.",
      "Non. Presque : tu gardes une trace. Mais tes notes ne prouvent pas son avis, et personne d'autre ne les trouvera. Une preuve s'écrit par celui qui donne l'avis, et se range.",
      "Oui. La liste, son avis, la date : 3 lignes suffisent. Rangées dans le dossier du projet, elles prouvent que le choix a été conseillé. Le RGPD demande de pouvoir le montrer."
    ],
    retenir: "Une décision de conformité se prouve : un avis écrit, daté, rangé où on le retrouve."
  },
  {
    id: "cp24-q27",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Ton DSI te confie la conformité de la DSI : accès, registre, licences, NIS2, charte. Tout est un peu en retard. Par quoi commences-tu ?",
    choix: [
      "Le registre, en entier, avant de toucher à tout le reste",
      "Classer par le risque : un nom, une date par ligne",
      "Le sujet le plus facile, pour montrer un 1er résultat",
      "Un audit complet par un cabinet, avant toute autre action"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu soignes un sujet pendant que les autres restent ouverts : un compte administrateur partagé peut faire plus de dégâts qu'un registre incomplet.",
      "Oui. Le plus probable et le plus grave d'abord. Chaque ligne a un responsable, une date et la preuve attendue. Le plan tient sur une page.",
      "Non. Presque : un 1er résultat aide. Mais le plus facile n'est pas le plus risqué : tu dois d'abord savoir ce qui peut faire le plus de mal.",
      "Non. Un audit peut aider plus tard, sur un point précis. Mais tu connais déjà les sujets : attendre des mois un rapport, c'est laisser les risques ouverts."
    ],
    retenir: "Un plan de conformité se classe par le risque : chaque ligne a un nom, une date, une preuve."
  },
  {
    id: "cp24-q28",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Le DSI : « La conformité, c'est le DPO : qu'il fasse le plan, et qu'il nous dise quoi faire. » Que réponds-tu ?",
    choix: [
      "« D'accord : il connaît le RGPD ; son plan sera le nôtre »",
      "« Il conseille et contrôle ; notre plan, la DSI le porte »",
      "« Non : on se passe de lui, il ralentit tout »",
      "« Le DG doit décider qui porte la conformité »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le DPO conseille et contrôle ; il ne décide pas, et il ne connaît pas vos systèmes. Un plan écrit par lui seul, personne à la DSI ne le porte.",
      "Oui. La DSI porte ses actions (accès, sécurité, licences), chaque service ses traitements. Le DPO conseille, relit, contrôle : le regard extérieur.",
      "Non. Sans le DPO, plus de conseil ni de contrôle : vous découvrirez les erreurs tard. Il est désigné pour ça.",
      "Non. Rien à décider : les rôles sont connus. Monter au DG pour ça, c'est montrer que la DSI ne sait pas qui fait quoi."
    ],
    retenir: "Le DPO conseille et contrôle ; la DSI porte son plan, chaque service ses traitements."
  },
  {
    id: "cp24-q29",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Un cabinet propose au DG un « pack NIS2 » à 40 k€, « à signer avant qu'il ne soit trop tard ». Le DG te demande ton avis. Que dis-tu ?",
    choix: [
      "« D'abord, le test de l'ANSSI, puis un juriste »",
      "« Signons vite : la sécurité n'attend pas, et le prix est bon »",
      "« Inutile : on est négociant, on n'est pas concernés »",
      "« Je demande au DPO de vérifier, puis on suit son avis »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. On vérifie avant d'engager un budget : le test de l'ANSSI sur MonEspaceNIS2, puis l'avis d'un juriste sur votre cas. Ensuite seulement, un plan, classé par le risque.",
      "Non. Tu engages 40 k€ sur une supposition, et sur la peur. Concerné ou pas, ça se vérifie d'abord ; et un pack ne dit pas vos vrais risques.",
      "Non. Tu supposes aussi, dans l'autre sens : la directive vise aussi la distribution de produits chimiques, et vous vendez des produits de traitement de l'eau.",
      "Non. Le DPO est là pour les données personnelles (RGPD) ; et il conseille, il ne décide pas. Savoir si l'entreprise est visée par NIS2 se vérifie autrement : le test de l'ANSSI, puis un juriste."
    ],
    retenir: "NIS2 : on vérifie si l'entreprise est concernée avant d'engager un budget."
  },
  {
    id: "cp24-q30",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. AquaBleu (20 % du chiffre d'affaires) demande : « Êtes-vous conformes à NIS2 ? Oui / Non ». Votre vérification est en cours. Le directeur commercial veut cocher « Oui ». Que fais-tu ?",
    choix: [
      "Tu coches « Oui » : on ne perd pas un client pareil",
      "Tu coches « Non » : rien n'est encore vérifié",
      "Des faits vérifiés, sans affirmer ce qu'on ignore",
      "Tu ne réponds pas : on verra quand tout sera clair"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tu affirmes une conformité que personne n'a vérifiée. Si AquaBleu le découvre, c'est la confiance qui saute, et peut-être le contrat.",
      "Non. Presque : rien n'est encore vérifié, c'est vrai. Mais « Non » affirme aussi ce que vous ignorez : vous n'êtes peut-être pas concernés. Et tu inquiètes ton plus gros client sans raison.",
      "Oui. Ce que vous faites vraiment (par exemple, les accès revus chaque année), et où vous en êtes sur NIS2 : la vérification en cours. Ton DSI valide ; le directeur commercial envoie.",
      "Non. Ne pas répondre à son plus gros client, c'est déjà une réponse. On répond avec ce qu'on sait, et ce qu'on vérifie."
    ],
    retenir: "On n'affirme pas une conformité non vérifiée : on répond par des faits, et par ce qu'on vérifie."
  },
  {
    id: "cp24-q31",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Ton technicien N2 propose de faire seul la revue annuelle des accès à Divalto : « Je connais tous les comptes, ce sera plus rapide. » Que réponds-tu ?",
    choix: [
      "« D'accord : tu connais les comptes mieux que personne »",
      "« Je fais la liste moi-même ; c'est plus sûr »",
      "« On ferme tous les comptes, et chacun redemande »",
      "« Tu fournis les listes ; chaque manager revoit son équipe »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Il connaît les comptes, pas le travail de chacun : qui a changé de poste, qui n'a plus besoin de quoi. Et il se contrôlerait lui-même.",
      "Non. Tu ne connais pas mieux que lui le travail des équipes. Et tu referas seul cette liste chaque année : ce n'est pas ton rôle de DSI adjoint.",
      "Non. Trop fort : toute l'entreprise bloquée le temps de redemander, la facturation à l'arrêt. On revoit, on ne coupe pas tout.",
      "Oui. Le manager sait qui fait quoi : il coche garder, réduire, fermer. La DSI fournit la liste et applique ; la liste signée reste comme preuve."
    ],
    retenir: "La revue des accès : la DSI fournit la liste et applique ; chaque manager revoit son équipe."
  },
  {
    id: "cp24-q32",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Pendant la revue des accès, tu vois un compte de l'ancien consultant de l'intégrateur, oublié à la clôture de DEMAT, encore actif sur la PA. Dernière connexion : hier, 23 h. Que fais-tu ?",
    choix: [
      "Tu le notes ; il sera fermé à la fin de la revue",
      "Tu demandes pourquoi à l'intégrateur et au DPO, et tu attends",
      "Tu le fais fermer en silence : inutile d'alerter qui que ce soit",
      "Bloqué maintenant ; le DPO aujourd'hui ; puis qui s'est connecté"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Un compte d'ancien prestataire, utilisé hier à 23 h : quelqu'un s'en sert peut-être. Attendre la fin de la revue, c'est laisser la porte ouverte.",
      "Non. Presque : il faut savoir pourquoi. Mais pendant que tu attends, le compte reste ouvert. D'abord bloquer, puis demander.",
      "Non. Presque : bloquer, oui. Mais une connexion inconnue sur des factures, c'est peut-être une violation : le DPO doit le savoir le jour même, pour juger le risque.",
      "Oui. Stopper d'abord : le compte bloqué. Puis le DPO, le jour même, et l'enquête : qui, quoi, depuis quand. Et le trou à boucher : la PA manquait à la liste des accès fermés à la clôture."
    ],
    retenir: "Un compte d'ancien prestataire encore utilisé : on le bloque tout de suite, et le DPO le sait le jour même."
  },
  {
    id: "cp24-q33",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Tes 2 techniciens et l'administrateur réseau partagent un même compte « admin » sur le serveur de Divalto. Son mot de passe n'a pas changé depuis 3 ans. Que fais-tu ?",
    choix: [
      "Rien : ils sont 3, et ils se font confiance",
      "Un compte d'administration nominatif chacun, à part du compte courant",
      "Tu fais changer le mot de passe du compte tous les mois",
      "Tu leur fais noter dans un cahier qui se connecte, et quand"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La confiance n'est pas le sujet : avec un compte partagé, personne ne sait qui a fait quoi. Après une erreur ou une attaque, impossible de remonter.",
      "Oui. Les comptes à privilèges : peu nombreux, nominatifs, réservés à l'administration. Chacun garde aussi son compte de tous les jours. Le compte « admin » commun est fermé, ou mis sous clé.",
      "Non. Presque : un mot de passe changé, c'est mieux. Mais le compte reste partagé : les traces ne disent toujours pas qui a agi.",
      "Non. Un cahier tenu à la main s'oublie vite, et ne prouve rien : seuls des comptes nominatifs disent qui a agi."
    ],
    retenir: "Un compte à privilèges = une personne, séparé de son compte courant, et revu de près."
  },
  {
    id: "cp24-q34",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Ton développeur Power BI t'avoue, gêné : un rapport des ventes, avec des noms de clients entrepreneurs individuels, est en lien public depuis 3 jours. Que fais-tu ?",
    choix: [
      "Tu coupes le lien ; inutile d'en parler, même au DPO",
      "Lien coupé, le DPO le jour même ; un avertissement écrit",
      "Lien coupé, le DPO le jour même ; merci à lui",
      "Tu fais fermer tout Power BI, le jour même, le temps d'auditer"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : le lien est coupé. Mais 3 jours en public, c'est une violation possible : le DPO l'évalue, et elle va au registre. Se taire, c'est cacher.",
      "Non. Presque : le lien est coupé, le DPO prévenu. Mais il est venu te le dire : le punir, c'est apprendre à tous à se taire, et la prochaine fuite restera cachée. Manager l'équipe : module cp26.",
      "Oui. Stopper : le lien coupé. Le DPO, le jour même : un lien public de 3 jours a pu être vu, il juge le risque. Et le remercier : avouer vite, c'est ce qui limite les dégâts.",
      "Non. Trop fort : les ventes et la compta perdent leurs rapports, pour un seul lien. On coupe ce lien, puis on vérifie les autres."
    ],
    retenir: "Une violation dans l'équipe : on stoppe, le DPO le sait le jour même, et celui qui l'a dite n'est pas puni."
  },
  {
    id: "cp24-q35",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Cadrage du WMS (logiciel d'entrepôt) : il notera qui prépare chaque commande, et en combien de temps. Le chef de projet verra le DPO « avant la mise en service ». Que lui dis-tu ?",
    choix: [
      "« Le DPO tout de suite : ces mesures parlent des préparateurs »",
      "« Bien : le DPO avant la mise en service, c'est le bon moment »",
      "« Inutile : ce sont des chiffres de l'entrepôt, pas des gens »",
      "« Supprime ces mesures : trop risqué, on s'en passe »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Qui a préparé quoi, en combien de temps : ce sont des données personnelles sur des salariés. Le minimum, les accès, la durée se décident au cadrage, avec le DPO.",
      "Non. Avant la mise en service, tout est paramétré : changer qui voit quoi, ou combien de temps on garde, coûtera cher. Le conseil arrive trop tard.",
      "Non. Une mesure liée à un préparateur nommé est une donnée personnelle, même dans un outil de l'entreprise.",
      "Non. Trop fort : la logistique a un vrai besoin. On ne le supprime pas ; on le cadre : quelles données, qui les voit, combien de temps."
    ],
    retenir: "Un logiciel qui touche des personnes : le DPO dès le cadrage, pour décider tôt le minimum de données, d'accès et de durée."
  },
  {
    id: "cp24-q36",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. L'éditeur de votre logiciel de reporting annonce l'audit de licences prévu par votre contrat, dans 6 semaines. Que fais-tu ?",
    choix: [
      "Tu attends l'audit : l'éditeur fera le compte lui-même",
      "Tu achètes 30 licences de plus, et tu attends l'audit, contrat en main",
      "Tu acceptes, et tu prépares : l'installé, l'utilisé, le contrat",
      "Tu refuses l'audit : c'est à lui de prouver un écart"
    ],
    bonne: 2,
    pourquoi: [
      "Non. L'éditeur comptera à sa façon, et tu découvriras les écarts devant lui. Un audit se prépare.",
      "Non. Acheter à l'aveugle, c'est payer peut-être pour rien, ou pas assez ; et attendre l'audit, c'est le subir. Le contrat dit comment on compte : on compte d'abord, avant lui.",
      "Oui. Le contrat prévoit l'audit : on l'accepte. Ton inventaire (installé, utilisé), face aux droits achetés, compté comme le dit le contrat, preuves d'achat à l'appui. Un écart ? Tu le vois avant lui, et tu le portes au DAF.",
      "Non. Le contrat prévoit cet audit : le refuser, c'est ne pas le respecter. Lis ce qu'il dit, et prépare-toi."
    ],
    retenir: "Un audit de licences se prépare : ce qui est installé et utilisé, face au contrat et aux preuves d'achat."
  },
  {
    id: "cp24-q37",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Le contrat de votre logiciel de reporting compte par utilisateur nommé. 65 personnes ont un compte ; 40 au plus se connectent en même temps. Combien de licences couvrir ?",
    choix: [
      "40 : le contrat ne compte que les connectés en même temps",
      "65, ou moins si la revue des accès ferme des comptes",
      "80 : les 65, plus une marge pour les arrivées",
      "Ce que l'éditeur dira, à son prochain audit"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Relis le contrat : il compte par utilisateur nommé, pas par accès simultanés. Chaque compte compte, connecté ou pas.",
      "Oui. Le contrat compte par nom : 65 comptes, 65 licences. Mais un compte qui ne sert plus se ferme : la revue des accès fait aussi baisser la facture.",
      "Non. Tu paies 15 licences pour personne. Une arrivée se couvre quand elle arrive, au prix du contrat.",
      "Non. Attendre l'audit, c'est découvrir l'écart devant l'éditeur, à son prix. Le contrat te dit déjà comment compter."
    ],
    retenir: "Une licence se compte comme le dit le contrat : par nom, chaque compte compte. Fermer les comptes inutiles fait baisser la facture."
  },
  {
    id: "cp24-q38",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Les commerciaux collent les prix et les remises de leurs clients dans un service d'IA gratuit, pour rédiger leurs offres. Leur directeur : « Ça marche, laissez-les. » Que fais-tu ?",
    choix: [
      "Rien ; leur directeur décide pour son équipe",
      "Tu fais bloquer tout de suite tous les sites d'IA de l'entreprise",
      "Tu rappelles la charte par mail, et tu laisses faire",
      "Plus aucune donnée dans cet outil ; vite, un outil validé"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Leur directeur décide de leur travail, pas des outils où partent les données de l'entreprise : la charte dit « validé par la DSI ».",
      "Non. Trop fort : le besoin est réel, et bloquer seul pousse vers les téléphones personnels. On arrête les données, pas le besoin.",
      "Non. Presque : la règle est la bonne. Mais un mail, puis laisser faire, ne change rien si le besoin reste sans réponse : demain, ils recommencent.",
      "Oui. La charte : aucune donnée de l'entreprise dans un outil non validé. Mais le besoin est réel : ta DSI propose vite un outil validé, ou des règles d'usage sans données. Le directeur commercial le porte à son équipe."
    ],
    retenir: "Outil en ligne non validé : on arrête d'y mettre des données, et on répond vite au besoin avec un outil validé."
  },
  {
    id: "cp24-q39",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. La revue des accès est finie : 14 comptes fermés. Ton technicien veut supprimer les listes cochées par les managers : « C'est fait, elles ne servent plus. » Que réponds-tu ?",
    choix: [
      "« D'accord : seuls les comptes fermés comptent »",
      "« Envoie-les au DPO : c'est lui qui garde les preuves »",
      "« On les garde, datées et rangées : c'est la preuve »",
      "« Garde tout, pour toujours, brouillons compris »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Sans les listes, rien ne prouve que les managers ont revu leurs accès. Une revue sans trace, pour un contrôle, c'est une revue non faite.",
      "Non. Le DPO contrôle ; il ne tient pas les preuves de la DSI à sa place. C'est à vous de les garder et de les montrer.",
      "Oui. Les listes signées, les comptes fermés, la date : la preuve que la revue est faite. On les range avec le plan de conformité, pour une durée fixée.",
      "Non. Trop : les brouillons n'apportent rien, et ces listes portent des noms de salariés. On garde la preuve utile, pour une durée fixée."
    ],
    retenir: "Une action de conformité se prouve : les listes signées et datées se gardent, rangées, pour une durée fixée."
  },
  {
    id: "cp24-q40",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Une violation touche les clients d'un commercial. Le DPO conseille de notifier la CNIL. Le directeur commercial : « Attendons, on va inquiéter nos clients. » 48 h ont passé depuis la découverte. Que fais-tu ?",
    choix: [
      "Tu attends son accord ; tu le relances aujourd'hui",
      "Le DPO notifie seul : son avis suffit, c'est réglé",
      "Tu fais décider le DG aujourd'hui, avis du DPO en main",
      "Tu notes au registre ; on notifiera si un client se plaint"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Ses clients, mais pas sa décision : la direction décide pour l'entreprise. Le relancer ne suffit pas : dans 24 h, le délai de 72 h est dépassé.",
      "Non. Presque : le DPO fait la déclaration. Mais il conseille ; la décision de notifier revient à la direction. Elle doit la prendre, et vite.",
      "Oui. Le DG représente l'entreprise, responsable du traitement : il décide, aujourd'hui, sur l'avis écrit du DPO. Il reste 24 h. Ton DSI le sait ; tu préviens le directeur commercial que tu y vas.",
      "Non. Presque : le registre, oui, dans tous les cas. Mais le risque est déjà jugé réel : attendre une plainte, c'est laisser passer le délai."
    ],
    retenir: "Notifier une violation : la direction décide, sur l'avis du DPO, dans les 72 h. Un directeur concerné ne bloque pas le délai."
  },
  {
    id: "cp24-q41",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Votre entrepôt Snowflake garde toutes ses ventes, sans date de fin, avec les noms des clients entrepreneurs individuels. Aucune durée n'est écrite au registre. Que fais-tu ?",
    choix: [
      "Rien : des données d'analyse, ce n'est pas du RGPD",
      "Une durée par usage, avec le métier et le DPO ; après, anonyme",
      "Dès ce week-end, tout effacer sauf l'année en cours, puis le registre",
      "Tout garder ; c'est la durée légale des factures"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le nom d'un client entrepreneur individuel est une donnée personnelle, même dans un entrepôt d'analyse. La copie suit les mêmes règles : un but, une durée.",
      "Oui. Le métier dit combien d'années il lui faut pour analyser ; le DPO conseille ; la durée s'écrit au registre. Au-delà, on efface les noms, ou on rend anonyme : les chiffres restent.",
      "Non. Trop fort, et trop vite : les tableaux comparent peut-être plusieurs années, et le métier n'a rien dit. On fixe la durée d'abord, avec lui et le DPO, puis on efface ou on anonymise.",
      "Non. Presque : les factures se gardent la durée légale, dans l'archive prévue pour ça. Mais une copie d'analyse n'est pas l'archive légale : elle suit sa propre durée."
    ],
    retenir: "Une copie d'analyse (l'entrepôt de données) a sa propre durée, écrite au registre ; au-delà, on efface ou on anonymise."
  }
];
