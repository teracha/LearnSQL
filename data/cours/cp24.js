// Chef de projet SI — Fiche de cours du module cp24 « Conformité dans un projet SI ».
// Fond : le RGPD (règlement général sur la protection des données) tel que la CNIL l'explique sur cnil.fr (rôles du
// responsable du traitement et du sous-traitant, missions du DPO, registre des activités de traitement, protection dès
// la conception et par défaut, durées de conservation, droits des personnes, violations de données, principe de
// responsabilité) ; les recommandations de l'ANSSI (guide d'hygiène informatique : comptes d'administration nominatifs,
// distincts du compte courant, revue des comptes à privilèges) ; pratiques de terrain en PME / ETI (liste des règles au
// cadrage, revue annuelle des accès par les managers, charte informatique, licences comptées selon le contrat, audit
// d'éditeur préparé, plan de conformité classé par le risque). On n'est pas juriste : un doute sur des données va au
// DPO, un doute juridique au DAF (avec un juriste ou un avocat).
// - Quelles règles : chacune avec sa source officielle, qui la suit, ce qu'elle change ; la règle par défaut de la loi,
//   puis le contrat ; une rumeur ou une plaquette ne remplace pas la source. NIS2 : seulement ce que dit la fiche
//   (directive européenne de 2022 ; loi française pas votée fin octobre 2026 ; la distribution de produits chimiques
//   est visée ; concerné ou pas, on le vérifie : test de l'ANSSI sur MonEspaceNIS2, puis un juriste ; ni date, ni délai,
//   ni sanction, ni liste d'obligations).
// - Rôles et registre : l'entreprise est responsable du traitement (représentée par le DG) ; la PA et l'intégrateur sont
//   sous-traitants (contrat : cp14), jamais pour leur propre compte ; le DPO (cabinet externe, désigné sans obligation)
//   conseille et contrôle, il ne décide pas ; le registre, interne, chaque service décrit les siens avec le DPO, mis à
//   jour à chaque changement ; protection dès la conception et par défaut.
// - Garder et effacer : une durée par donnée, écrite au registre, copies comprises ; usage courant, archive à accès
//   limité si une loi oblige à garder, puis effacement ou anonymat ; droits des personnes, réponse sous un mois ;
//   l'effacement ne vaut pas pour les factures (durée légale).
// - Violation : stopper ; le DPO le jour même ; la CNIL dans les meilleurs délais, 72 h au plus tard après en avoir pris
//   connaissance, sauf absence de risque (décision de la direction, sur l'avis du DPO, qui fait la déclaration) ;
//   notifier avec ce qu'on sait, puis compléter ; les personnes prévenues si le risque est élevé ; le registre interne
//   dans tous les cas ; chez un sous-traitant, il prévient, l'entreprise décide et notifie.
// - Accès, outils, licences : le droit suit le besoin du poste ; revue annuelle par chaque manager, sur la liste fournie
//   par la DSI ; un compte = une personne ; comptes à privilèges nominatifs ; prestataires : un accès à leur nom, le
//   temps de l'intervention ; charte : aucune donnée de l'entreprise dans un outil en ligne non validé par la DSI ;
//   licences comptées selon le contrat ; audit d'éditeur préparé.
// - DSI adjoint : un plan classé par le risque (un responsable, une date, une preuve par ligne) ; des rôles clairs ;
//   garder les preuves ; NIS2 vérifiée avant tout budget ; le DG arbitre les moyens au comité de direction.
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), lignes « La réglementation »
// (RGPD : l'avis du DPO en cas de doute ; conservation des factures : durée légale ; NIS2) et « Conformité (module
// cp24) » (l'entreprise responsable du traitement, représentée par le DG ; DPO externe ; registre, traitement
// « factures » mis à jour avec le DPO en novembre 2026, à la signature de la PA ; PA et intégrateur sous-traitants ;
// violation ; effacement face à la durée légale ; revue annuelle des accès par les managers ; comptes des prestataires
// fermés à la clôture ; charte). Cadre « Tu es DSI adjoint » (2028 et après : l'équipe de 8, le comité de direction).
// Faits ajoutés (cohérents avec la fiche et les modules publiés, à valider) : exemples du cours (section 3 : un ancien
// fournisseur, électricien en entreprise individuelle, demande l'effacement en septembre 2027 ; section 4 : le mardi
// 18 mai 2027, pendant le pilote, Sophie envoie à un client un export de factures d'autres clients ; section 5 : à la
// revue annuelle, le compte d'une ancienne stagiaire est encore actif ; section 6 : le plan de 2028, comptes à
// privilèges fin février, revue des accès fin mars) ; le registre interne des violations est tenu avec le DPO, comme
// le registre des traitements ; une demande d'une personne (accès, effacement) est traitée par le service qui tient
// ses données (l'ADV pour les clients, la compta pour les fournisseurs), avec l'aide du DPO.
// Affirmations juridiques hors fiche (générales, vérifiées sur cnil.fr et cyber.gouv.fr le 31 octobre 2026 ; sources
// dans le rapport de l'expert) : définitions du responsable du traitement et du sous-traitant (qui ne traite jamais
// pour son propre compte) ; le DPO n'est pas responsable de la conformité, un avis non suivi se documente ; contenu du
// registre, document interne, plus de déclaration de fichiers à la CNIL ; protection dès la conception et par défaut ;
// cycle de conservation (base active, archive à accès restreint, suppression ou anonymisation) ; réponse aux droits
// sous un mois (prolongeable si la demande est complexe, en le disant dans le mois) ; définition d'une violation ;
// notification en deux temps ; pas de notification sans risque (données chiffrées, clé non compromise), mais le
// registre ; le sous-traitant prévient sans tarder, le responsable décide ; principe de responsabilité (pouvoir montrer
// qu'on respecte les règles) ; comptes d'administration nominatifs (ANSSI) ; un service d'IA gratuit peut réutiliser
// ce qu'on y dépose (CNIL). Aucun montant d'amende. Licences et audit d'éditeur : pratique contractuelle, pas une règle
// de loi.
// Frontières : la clause RGPD du contrat = cp14 ; les données de test masquées = cp19 ; la reprise (le minimum, protégé,
// effacé après) = cp20 ; les accès des prestataires fermés à la clôture = cp22 ; classer les projets (une « obligation »
// vérifiée d'abord) = cp25 ; manager l'équipe = cp26 ; le budget SI annuel = cp27. Cités en une ligne, pas refaits.
LEARNSQL.cours.cp24 = {
  intro: "Ta démat fiscale : la règle venait-elle du texte officiel, ou de ce qu'en disait l'éditeur ? Tes flux EDI (échange de données informatisé) portent le nom et l'e-mail des acheteurs : ce sont des données personnelles. Ton entrepôt Snowflake : combien de temps y gardes-tu les clients ? Ici, sans être juriste : savoir quelles règles s'appliquent, qui décide, et le prouver.",
  sections: [
    {
      titre: "Quelles règles s'appliquent ? On vérifie",
      exemple: "Fin octobre 2026, cadrage de DEMAT. Ta liste des règles :\n– facture électronique : dates et mentions, sur le site des impôts ;\n– RGPD (règlement général sur la protection des données) : les contacts, les entrepreneurs individuels ;\n– conservation des factures : la durée légale ;\n– NIS2 (directive européenne sur la cybersécurité) : concernés ou pas ? À vérifier.",
      points: [
        "Une règle se lit à sa source officielle : impots.gouv.fr, cnil.fr (la CNIL : Commission nationale de l'informatique et des libertés). Pas la plaquette d'un éditeur « 100 % conforme ».",
        "Pour chaque règle : sa source, qui la suit, ce qu'elle change pour ton projet. Une « obligation » annoncée se vérifie avant de passer devant d'autres projets (module cp25).",
        "D'abord la règle par défaut de la loi, puis ce que le contrat ajoute. Un doute sur des données : le DPO (délégué à la protection des données). Un doute juridique : le DAF (directeur administratif et financier), avec un juriste si besoin.",
        "NIS2 date de 2022. En France, la loi qui la transpose n'est pas votée (fin octobre 2026). Elle vise aussi la distribution de produits chimiques : vos produits de traitement de l'eau ?",
        "Concerné ou pas ? On le vérifie : le test de l'ANSSI (l'agence nationale de la sécurité des systèmes d'information) sur MonEspaceNIS2, puis l'avis d'un juriste. On ne le suppose pas, et on n'annonce ni date, ni délai, ni sanction."
      ],
      retenir: "Chaque règle : une source officielle, quelqu'un qui la suit. Ce qu'on ne sait pas, on le vérifie ; on ne le suppose pas."
    },
    {
      titre: "Qui fait quoi : les rôles du RGPD et le registre",
      exemple: "Novembre 2026. Le DAF signe le contrat de la PA (plateforme agréée).\nLe même mois, la compta met à jour avec le DPO le traitement « factures » du registre : un nouveau sous-traitant (la PA), les données qu'elle reçoit, leur durée, qui y accède.",
      points: [
        "Responsable du traitement : celui qui décide pourquoi et comment on traite des données personnelles. Ici, l'entreprise, représentée par le DG (directeur général). C'est elle qui répond de la conformité.",
        "Sous-traitant : il traite les données pour vous, sur vos instructions, jamais pour lui. La PA, l'intégrateur. Le contrat le prévoit (module cp14).",
        "Le DPO : ici, un cabinet externe, désigné sans obligation. Il conseille et contrôle ; il ne décide pas. La direction décide ; un avis qu'elle ne suit pas s'écrit, avec la raison.",
        "Le registre des traitements, interne (plus de déclaration à la CNIL) : pour chacun, à quoi il sert, quelles données, qui y accède, combien de temps, comment il est protégé. Chaque service décrit les siens, avec le DPO. Un sous-traitant, une donnée, une durée change ? On le met à jour.",
        "Protection dès la conception : le minimum de données, d'accès et de durée, décidé au cadrage avec le DPO, pas ajouté à la fin. Par défaut, une donnée n'est vue que par qui en a besoin (modules cp19 et cp20)."
      ],
      retenir: "L'entreprise décide et répond ; le sous-traitant exécute ; le DPO conseille et contrôle. Le registre décrit chaque traitement et vit avec le projet."
    },
    {
      titre: "Garder et effacer",
      exemple: "Septembre 2027. Un ancien fournisseur, électricien en entreprise individuelle, écrit à la compta : « Effacez toutes mes données. »\n– Ses factures : gardées la durée légale, en archive, à l'accès limité.\n– Ses coordonnées qui ne servent plus : effacées.\n– Sous un mois, la réponse : ce qui est effacé, ce qui reste, et pourquoi.",
      points: [
        "Chaque donnée a une durée, fixée selon son but et écrite au registre. Pas « tout, pour toujours ». Une copie suit les mêmes règles : l'entrepôt de données, un export Excel.",
        "Le cycle : l'usage courant ; puis, si une loi oblige à garder, une archive à l'accès limité ; puis l'effacement (ou l'anonymat). Factures : la durée légale.",
        "Les droits des personnes : savoir quelles données on a sur elles, les corriger, les faire effacer, s'opposer. Réponse sous un mois (plus si c'est complexe, en le disant dans le mois).",
        "L'effacement ne vaut pas pour ce qu'une loi oblige à garder : les factures restent. On efface le reste, et on explique pourquoi.",
        "Qui fait quoi : le service qui tient les données répond et efface (l'ADV, administration des ventes, pour les clients) ; le DPO aide. On garde la trace de la demande et de la réponse."
      ],
      retenir: "Chaque donnée a sa durée. On efface ce qui ne sert plus ; on garde ce que la loi impose, et on dit pourquoi."
    },
    {
      titre: "La violation de données : stopper, prévenir, décider",
      exemple: "Mardi 18 mai 2027, 10 h. Sophie envoie par erreur à un client un export de factures d'autres clients, dont des entrepreneurs individuels. 10 h 20 : elle te prévient.\n1. Stopper : le client supprime le fichier, et le confirme par écrit.\n2. Le DPO, le jour même : quel risque ?\n3. La direction décide, sur son avis : notifier la CNIL, ou non.\n4. Dans tous les cas : le registre interne.",
      points: [
        "Violation de données : des données personnelles perdues, détruites, modifiées, ou vues par qui ne devait pas. Un fichier au mauvais destinataire, un portable perdu, un compte piraté.",
        "D'abord stopper : faire supprimer, bloquer le compte, changer le mot de passe. Puis le DPO, le jour même. Celui qui s'est trompé doit pouvoir le dire tout de suite : chaque heure compte.",
        "La CNIL est notifiée dans les meilleurs délais, 72 h au plus tard après en avoir pris connaissance, sauf si la violation ne présente pas de risque pour les personnes. La direction décide, sur l'avis du DPO, qui fait la déclaration.",
        "Tout n'est pas encore su ? On notifie avec ce qu'on sait, puis on complète. Risque élevé : on prévient aussi les personnes. Toute violation, même non notifiée, va au registre interne.",
        "Chez un sous-traitant (la PA) ? Il doit vous prévenir sans tarder, et vous aider. La décision et la notification restent à l'entreprise, responsable du traitement."
      ],
      retenir: "Stopper ; le DPO le jour même ; la direction décide de notifier, 72 h au plus tard ; le registre dans tous les cas."
    },
    {
      titre: "Accès, outils en ligne, licences",
      exemple: "Revue annuelle des accès. La DSI (direction des systèmes d'information) donne à chaque manager la liste des comptes Divalto et PA de son équipe. Chacun coche : garder, réduire, fermer.\nLa cheffe comptable trouve le compte d'une ancienne stagiaire, encore actif : fermé.",
      points: [
        "Chaque accès suit le besoin du poste, pas plus. Le manager sait qui fait quoi : c'est lui qui revoit ; la DSI applique, et garde la liste signée.",
        "Un compte = une personne : un mot de passe ne se prête pas. Les comptes à privilèges (administrateur) : peu nombreux, nominatifs, séparés du compte de tous les jours.",
        "Prestataires : un accès à leur nom, le temps de l'intervention, puis fermé. À la clôture du projet, tous fermés (module cp22).",
        "La charte informatique : aucune donnée de l'entreprise dans un outil en ligne non validé par la DSI. Un service gratuit d'IA (intelligence artificielle) ou d'OCR (lecture automatique) peut garder ou réutiliser ce qu'on y dépose. Le besoin est souvent réel : on le porte à la DSI.",
        "Licences : le contrat dit comment on compte (par utilisateur nommé, par poste…). Un audit de l'éditeur se prépare : ce qui est installé et utilisé, face aux droits achetés, preuves d'achat à l'appui."
      ],
      retenir: "Le moins d'accès possible, revus chaque année par les managers ; aucune donnée dans un outil non validé ; des licences comptées selon le contrat."
    },
    {
      titre: "DSI adjoint : un plan classé par le risque",
      exemple: "2028. Ton DSI te confie la conformité. Ta 1re page, classée par le risque :\n1. Comptes à privilèges : un nom par compte, fin février.\n2. Revue des accès : tous les managers, fin mars.\n3. Registre : Snowflake et les flux EDI, relus avec le DPO.\n4. NIS2 : le test de l'ANSSI et un juriste, avant tout budget.\nChaque ligne : un nom, une date, une preuve.",
      points: [
        "Classer par le risque : ce qui peut arriver, et ce que ça coûterait aux personnes et à l'entreprise. Le plus probable et le plus grave d'abord ; pas le plus facile.",
        "Des rôles clairs : le DPO conseille et contrôle ; les managers revoient leurs accès ; ton équipe applique ; la direction décide. Chaque service porte ses traitements.",
        "Garder les preuves : le registre à jour, les listes d'accès signées, les avis du DPO, le registre des violations, les réponses aux demandes. Le RGPD demande de pouvoir montrer qu'on respecte les règles.",
        "Une obligation incertaine (NIS2) : on vérifie avant d'engager un budget. Les risques déjà connus se traitent sans attendre une loi.",
        "Le plan passe au comité de direction : le DG arbitre les moyens (projets : module cp25 ; budget : module cp27). Manager l'équipe : module cp26."
      ],
      retenir: "Un plan court, classé par le risque : pour chaque ligne, un responsable, une date, une preuve."
    }
  ]
};
