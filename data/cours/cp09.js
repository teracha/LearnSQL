// Chef de projet SI — Fiche de cours du module cp09 « Gouvernance et RACI ».
// Fond : PMBOK (matrice des responsabilités, dont le RACI ; un seul « Accountable » par tâche ; gouvernance adaptée à
// l'organisation), PRINCE2 (comité de projet : le décideur, les utilisateurs, les fournisseurs ; le comité n'est pas une
// démocratie : le décideur tranche ; gestion par exception : pas de réunion de suivi pour le comité, un rapport régulier,
// une réunion pour décider) et pratiques de terrain en PME / ETI (COPIL mensuel, point projet chaque semaine, ordre du
// jour qui met les décisions d'abord, rapport envoyé avant, pré-réunions, reformuler la décision à voix haute, compte
// rendu sous 24 h, registre des décisions). Les méthodes divergent : PRINCE2 peut mettre un représentant du fournisseur
// au comité, DEMAT l'invite pour un point ; PRINCE2 n'a pas de réunion de suivi pour le comité, l'usage en France est un
// COPIL mensuel (les deux disent : le comité sert à décider).
// - Les instances : COPIL (décide), point projet (suit et prépare), comité fournisseur (suit la PA, module cp15), point
//   du lundi avec ton DSI (ton temps, modules cp02, cp03) ; une décision hors du 2e mardi a sa séance courte ; urgente :
//   le DAF le jour même ; au comité de direction, le DAF porte le projet.
// - Qui siège : les décideurs et ceux qui engagent leur service, peu de monde, pas de vote, prestataire et contrôleur de
//   gestion sur invitation, suppléant qui peut décider ; pas de COPIL sans le DAF ; DSI adjoint : gouvernance à la taille
//   du projet, COPIL commun pour un même sponsor, un seul sponsor.
// - Le RACI : R = Réalise, A = Approuve (« Accountable » en anglais), C = Consulté, I = Informé ; A n'est pas forcément
//   R, le R n'approuve pas son travail ; C avant, I après ; un C n'a pas de veto ; un seul A ; pas de livrable sans A ;
//   trop de C ralentit ; validé au cadrage, tenu à jour ; être A d'un livrable ne donne pas les dates.
// - Préparer et animer : décisions d'abord, ordre du jour et rapport 3 jours avant (module cp08), pré-réunions (module
//   cp16), tenir le temps, faire décider, reformuler, point ouvert, un COPIL qui ne décide rien.
// - Tracer : compte rendu sous 24 h (format : module cp17), registre des décisions (date, décision, qui, impact), décision
//   de couloir confirmée par écrit, décision écrite pas refaite.
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Gouvernance (module
// cp09) » : COPIL le 2e mardi, 1 h 30, membres, invités, ordre du jour et rapport 3 jours avant, compte rendu sous 24 h,
// registre tenu par toi ; point projet du lundi ; comité fournisseur ; RACI de la fiche (format de facture, PV de recette
// fournisseurs et clients, go / no-go, budget et dates). Ligne « Toi et ton DSI » : point de 30 minutes chaque lundi.
// Faits ajoutés (cohérents avec la fiche et les modules publiés, à valider) : le COPIL du mardi 9 février 2027 (2e mardi)
// et son ordre du jour (changements n° 7 et n° 9, 7 jours, 5 250 €, comme cp10 et cp12, durées des points) ; le compte
// rendu du mercredi 10 février et sa ligne au registre ; la décision urgente de mi-avril prise au téléphone (cp10-q25) ;
// le planning de formation de la compta, livrable sans A au départ ; le commercial informé, pas consulté, sur le format ;
// le comité de direction, où le DAF porte le projet.
// Frontières : ta délégation = cp18 ; l'escalade = cp16 ; le sponsor absent = cp04 ; le contenu du rapport = cp08 ; le
// format du compte rendu = cp17 ; le comité fournisseur en détail = cp15 ; le circuit d'un changement et son registre =
// cp10 ; choisir entre projets = cp25. Cités en une ligne, pas refaits.
LEARNSQL.cours.cp09 = {
  intro: "Sur ta démat fiscale, 15 personnes : qui décidait quoi, et où ? Sur ta migration Divalto, une décision prise en réunion a-t-elle été contestée ensuite ? Ici : les instances, qui y siège, le RACI (qui réalise, approuve, est consulté, est informé), et la trace des décisions. Ailleurs : ta délégation (module cp18), l'escalade (cp16), le sponsor absent (cp04).",
  sections: [
    {
      titre: "Les instances : suivre, préparer, décider",
      exemple: "DEMAT 2027, quatre rendez-vous :\n– COPIL (comité de pilotage), le 2e mardi du mois, 1 h 30 : le DAF (directeur administratif et financier, ton sponsor) décide.\n– Point projet (on dit aussi comité projet), chaque lundi, 1 h : avancement, 15 minutes de risques, jours de la régie, actions.\n– Comité fournisseur, chaque mois, avec la PA (plateforme agréée) : son service, son plan d'actions.\n– Point avec ton DSI (directeur des systèmes d'information), chaque lundi, 30 minutes : ton temps entre le run et le projet.",
      points: [
        "Une instance = une réunion régulière, avec un rôle : suivre, préparer ou décider. Le COPIL décide : périmètre, budget, dates validées, demandes de changement (module cp10).",
        "Le point projet suit le travail et prépare les décisions : il ne les prend pas. Le comité fournisseur suit la PA (module cp15) ; le COPIL en reçoit l'essentiel.",
        "Ton DSI arbitre ton temps entre le run et DEMAT (modules cp02, cp03). Il ne décide pas du projet.",
        "Une décision qui ne tombe pas un 2e mardi ? Une séance courte, avec qui décide et qui doit être consulté. Urgente : le DAF, le jour même (module cp07).",
        "Au comité de direction, le DAF porte le projet, en 3 lignes que tu lui prépares. Pas de second COPIL."
      ],
      retenir: "Chaque décision a son instance : le point projet suit et prépare, le COPIL tranche le périmètre, le budget et les dates."
    },
    {
      titre: "Qui siège : ceux qui décident",
      exemple: "COPIL de DEMAT : le DAF, qui préside et décide ; toi, qui prépares, animes et écris le compte rendu.\nPuis ton DSI, la cheffe comptable, le responsable ADV (administration des ventes).\nSur invitation, pour un point : le contrôleur de gestion, la PA, l'intégrateur.\nPoint projet : toi, le consultant de l'intégrateur, Julie, Sophie, Marc.\nAbsente, la cheffe comptable envoie quelqu'un qui peut décider pour la compta, désigné par écrit.",
      points: [
        "Au COPIL : ceux qui décident, ou qui engagent leur service. Peu de monde. À 15, on écoute, on ne décide plus.",
        "On ne vote pas : chacun éclaire, le sponsor décide. PRINCE2 (la méthode britannique) le dit aussi : le comité n'est pas une démocratie.",
        "PRINCE2 y met le décideur, les utilisateurs, les fournisseurs, parfois un prestataire. Ici, le prestataire vient sur invitation, pour un point : le COPIL reste interne.",
        "Un membre absent envoie un suppléant qui peut décider, ou donne sa position avant. Un observateur qui « fera remonter » ne fait que reporter. Sans le DAF, pas de COPIL : on le décale de quelques jours.",
        "Tu es DSI adjoint ? La gouvernance se taille au projet. Petit projet : un décideur, un point court, une validation écrite. Un sponsor pour 3 projets : un COPIL commun. Deux sponsors, c'est aucun : le DG (directeur général) en nomme un, l'autre est consulté."
      ],
      retenir: "Au COPIL : le décideur, ceux qui engagent leur service, et toi. Peu de monde, pas de vote, un suppléant qui peut décider."
    },
    {
      titre: "Le RACI : qui réalise, qui approuve",
      exemple: "Le RACI de DEMAT (extrait) :\nFormat de facture : R toi et l'intégrateur · A le DAF · C la cheffe comptable, le responsable ADV · I ton DSI.\nPV (procès-verbal) de recette fournisseurs : R Julie · A la cheffe comptable.\nPV de recette clients : R Sophie et Marc · A le responsable ADV.\nGo / no-go de la bascule (on y va ou pas) : R toi, ta recommandation sur les critères · A le DAF\n· C la cheffe comptable, le responsable ADV, ton DSI · I le DG.\nBudget et dates validées : A le DAF.",
      points: [
        "R = Réalise : fait le travail ; il peut y en avoir plusieurs. A = Approuve : valide, et répond du résultat. L'anglais dit « Accountable ».",
        "C = Consulté : on lui demande son avis AVANT la décision. I = Informé : il apprend la décision APRÈS. Un envoi « pour info », c'est I.",
        "A n'est pas forcément R : le DAF approuve le format, il ne l'écrit pas. Et le R n'approuve pas son propre travail : Julie teste, sa cheffe signe le PV.",
        "Un C donne un avis, pas un veto : l'A décide en le connaissant. On n'attend pas l'avis d'un I : on lui donne la décision.",
        "Un PV de recette s'approuve par le métier : le chef de projet le prépare et le fait signer."
      ],
      retenir: "R réalise, A approuve, C donne son avis avant, I apprend la décision après."
    },
    {
      titre: "Les règles du RACI",
      exemple: "Mars. Nouveau livrable : le planning de formation de la compta. Personne n'en est A. Tu proposes la cheffe comptable, et le RACI se met à jour.\nLe commercial veut être consulté sur le format de facture. Son avis ne changera pas le format : il sera informé.",
      points: [
        "Un seul A par livrable : deux A, c'est aucun. Chacun attend l'autre, ou ils se contredisent. Le PMBOK (le guide américain) le dit aussi.",
        "Pas de livrable sans A : sinon, personne ne le valide. L'A d'un livrable métier vient du métier.",
        "Trop de C ralentit : chaque avis prend des jours, et les avis se contredisent. Consulte ceux dont l'avis peut changer le livrable ; informe les autres.",
        "Le RACI se valide au cadrage : chaque A accepte son rôle, puis le sponsor valide. Il se met à jour : nouveau livrable, départ, A confié à un autre par le sponsor. Une absence sans décision à prendre ne change rien.",
        "Être A d'un livrable ne donne pas les autres décisions : le budget et les dates validées restent au DAF."
      ],
      retenir: "Un seul A par livrable, jamais de livrable sans A, peu de C. Le RACI se valide au cadrage, puis se tient à jour."
    },
    {
      titre: "Préparer et animer le COPIL",
      exemple: "COPIL du mardi 9 février 2027. Ordre du jour, envoyé 3 jours avant, avec le rapport (module cp08) :\n1. Décisions (40 min) : faire les changements n° 7 et n° 9 ? 7 jours d'intégrateur, 5 250 €. Je recommande oui.\n2. Les 5 plus gros risques (20 min).\n3. Le rapport, déjà lu : questions (20 min).\n4. Actions et dates (10 min).\nEn séance, le DAF : « Bon, allez-y. » Toi : « Je note : n° 7 et n° 9 acceptés, 7 jours, commandes à signer. C'est bien ça ? »",
      points: [
        "L'ordre du jour : les décisions d'abord, chacune comme une question, avec son prix, ta recommandation et sa durée. Puis les risques, puis l'avancement.",
        "3 jours avant : l'ordre du jour et le rapport. En séance, on ne le relit pas. Avant, tu vois les managers concernés (module cp16) : une pré-réunion évite les surprises, pas les désaccords.",
        "Le DAF préside et décide ; toi, tu animes et tu tiens le temps. Le débat tourne en rond ? Tu résumes les positions, et tu fais décider. Un détail repart au point projet, avec une date.",
        "Chaque décision, tu la reformules à voix haute, avec ses chiffres. Pas tranché faute d'info ? Un point ouvert : ce qui manque, qui l'apporte, pour quand.",
        "Un COPIL qui ne décide rien devient une réunion d'information. PRINCE2 va plus loin : pas de réunion pour suivre ; le comité reçoit un rapport, et se réunit pour décider. Tout est décidé ? On finit plus tôt."
      ],
      retenir: "Les décisions d'abord, le rapport lu avant, le temps tenu, chaque décision reformulée à voix haute."
    },
    {
      titre: "Tracer : le compte rendu et le registre des décisions",
      exemple: "Mercredi 10 février, 9 h : le compte rendu part (module cp17). Décisions, actions (qui, quoi, pour quand), points ouverts.\nAu registre des décisions : « 09/02/2027 · n° 7 et n° 9 acceptés · le DAF, au COPIL · + 7 jours d'intégrateur, 5 250 €. »\nMi-avril, au téléphone, le DAF accepte 2 jours d'intégrateur en urgence (module cp10). Tu lui écris : « Comme convenu ce matin : … » Et une ligne au registre.",
      points: [
        "Compte rendu sous 24 h : décisions, actions, points ouverts. Contesté ? Tu vérifies, et tu corriges pour tous. Un « peut-être » est un point ouvert, pas une décision.",
        "Le registre des décisions, tenu par toi : une ligne par décision. La date, la décision, qui l'a prise, l'impact.",
        "Y vont les décisions du COPIL, du DAF et des A du RACI, où qu'elles soient prises. Les choix d'équipe vont dans les actions du point projet.",
        "Une décision de couloir, de téléphone ou de mail ? Tu la fais confirmer par écrit (« Comme convenu ce matin : … »). Puis tu l'écris au registre.",
        "Une décision écrite au registre ne se refait pas au COPIL suivant : il la voit dans la liste du mois. Sauf fait nouveau."
      ],
      retenir: "Une décision non écrite se perd : compte rendu sous 24 h, et une ligne au registre, même pour une décision de couloir."
    }
  ]
};
