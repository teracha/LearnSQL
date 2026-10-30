// Chef de projet SI — Fiche de cours du module cp02 « S'organiser et tenir sous pression ».
// Fond : pratiques reconnues d'organisation personnelle, adaptées au chef de projet à temps partagé (run + projet).
// Matrice d'Eisenhower (urgent / important) et sa limite ; GTD de David Allen (une seule liste écrite, la prochaine
// action, la revue hebdomadaire, la règle des 2 minutes) ; créneaux de concentration réservés dans l'agenda
// (« time blocking ») et interruptions regroupées ; Kanban (limiter le travail en cours) ; biais de planification
// (Kahneman et Tversky : estimer avec le temps réel) ; support en niveaux N1 / N2 / N3 (ITIL, module cp15).
// Les méthodes divergent (dit au cours) : la règle des 2 minutes de GTD contre les créneaux protégés ; hors créneau,
// les 2 minutes ; dans un créneau, on note. Pas de développement personnel : des gestes, des chiffres, des cas.
// - Priorités : une seule liste écrite, promesses comprises ; Eisenhower ; sa limite ; 2e critère : la date légale
//   (chemin critique, module cp05), puis les promesses datées ; à égalité, ce qui débloque quelqu'un.
// - Le run : 70 / 30 = 7 et 3 demi-journées sur 10 ; à toi : les flux EDI en appui du N2, les petites demandes (oui,
//   dans le créneau run) ; le reste suit le circuit N1, N2, N3 ; former le N2 ; vraie urgence de ton rôle : lâcher le
//   projet une heure ; si quelqu'un sait faire : confier, avec un point à heure fixe (cp01-q01).
// - Interruptions : créneaux de 2 h réservés, notifications coupées, messages à heures fixes, « à 14 h »,
//   « qu'est-ce qui est bloqué ? » ; le créneau cède à la vraie urgence, aux appels répétés, à quelqu'un bloqué par
//   toi ; réunions : décider ou apporter, sinon le compte rendu.
// - Rituels : revue du vendredi (le dimanche reste à toi), point du lundi avec ton DSI (contenu : module cp03), 3
//   actions chaque matin, finir avant de commencer.
// - Charge : en demi-journées sur 10 (une journée = 2) ; biais de planification ; pic court réglé dans la liste ;
//   au-delà, ton DSI, dès que tu le vois ; « pas maintenant » avec une date (fond : cp18 ; mots : cp17).
// - Ton DSI arbitre ce qui dure, sur faits et options (pas le DAF) ; il te charge en plus : « que décale-t-on ? » ; il
//   décide : tu appliques et tu préviens ; un jalon hors tolérance : le DAF, le jour même (cp04) ; DSI adjoint : des
//   chiffres, trancher vite et l'écrire, regrouper les questions de l'équipe.
// - Pression : découper (la prochaine action), rien à chaud (cp17), aide tôt, pics prévisibles (janvier, mars-avril,
//   juin), signaux d'épuisement dits tôt, droit à la déconnexion (en termes généraux).
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Toi et ton DSI
// (modules cp02, cp03) » : environ 70 % sur DEMAT, 30 % sur le run (référent des flux EDI, en appui du support N2) et
// les petites demandes ; point de 30 minutes chaque lundi avec ton DSI, qui arbitre run contre projet ; point projet
// chaque lundi. Calendrier : données de paramétrage dues à la PA le 15 janvier, connecteur au 1er mars, COPIL le 2e
// mardi (9 mars), recette du 16 mars à fin avril, pilote en mai, bascule en juin ; tolérance ± 2 semaines (cp04) ;
// AquaBleu, 20 % du chiffre d'affaires ; N1 et N2 = la DSI, N3 = la PA ou l'intégrateur, par ticket.
// Faits ajoutés (cohérents avec la fiche, à valider) : le 70 / 30 compté en 7 et 3 demi-journées sur 10 ; créneaux de
// 2 h, run l'après-midi, messages à 11 h, 14 h, 17 h (des exemples, pas une règle de l'entreprise) ; revue le vendredi
// à 16 h ; la saison des piscines (printemps) gonfle les flux EDI pendant la recette (cohérent avec cp16 et
// cp18-q12) ; fin février, 3 semaines à 5 demi-journées de run ; semaine du 8 mars à 120 %.
// Affirmations juridiques hors fiche (générales, à faire vérifier) : le Code du travail prévoit un droit à la
// déconnexion, dont l'entreprise fixe les règles (accord ou charte). Santé : seulement « en parler tôt » (ton DSI, les
// RH, le médecin du travail), sans diagnostic.
// Frontières : cp03 = le rôle et la posture attendus par le DSI, et le contenu du point du lundi (ici, ton temps et ses
// arbitrages) ; cp05 = planifier le projet, estimer ses tâches (ici, ta charge à toi) ; cp08 = reporter ; cp09 = les
// instances ; cp16 = l'escalade ; cp17 = les mots ; cp18 = dire non, arbitrer entre demandes ; cp26 = manager une équipe.
LEARNSQL.cours.cp02 = {
  intro: "Pendant ta migration Divalto, ou au support N1-N2 (1er et 2e niveaux), qui décidait de ta journée : toi, ou le dernier qui appelait ? Ici : t'organiser toi-même entre le run (le fonctionnement courant) et ton projet, et tenir sous pression. Ce que ton DSI (directeur des systèmes d'information) attend de ton rôle : module cp03.",
  sections: [
    {
      titre: "Tes priorités : une liste, et la date légale d'abord",
      exemple: "Lundi 11 janvier 2027. Ton projet : DEMAT 2027, la facture électronique. Ta liste : les données de paramétrage, dues le 15 à la PA (plateforme agréée) ; un tableau Power BI « pour hier » ; 40 mails non lus.\nSans les données, la PA ne paramètre pas : le connecteur du 1er mars glisse, puis la recette. Tu commences par elles.",
      points: [
        "Une seule liste, écrite, où tout arrive : tâches, demandes, promesses. Une promesse faite dans le couloir y va tout de suite, avec sa date.",
        "Matrice d'Eisenhower. Urgent et important : tu le fais. Important, pas urgent : tu le planifies, daté. Urgent, pas important : tu le confies à qui c'est le rôle (un mot de passe : le N1, par ticket, même pour 2 minutes). Ni l'un ni l'autre : tu le laisses.",
        "Sa limite : sous pression, tout paraît urgent et important, et l'urgence est souvent celle d'un autre. Un 2e critère tranche : d'abord la date légale (le chemin critique, module cp05), puis tes promesses datées.",
        "À égalité, d'abord ce qui débloque quelqu'un : Julie, qui attend ton retour, passe avant ton rapport du COPIL (comité de pilotage). Le consultant payé à la journée aussi."
      ],
      retenir: "Une seule liste écrite. D'abord la date légale, puis ce qui débloque les autres."
    },
    {
      titre: "Le run : ce qui est à toi, ce qui ne l'est pas",
      exemple: "Ton temps : 70 % sur DEMAT, 30 % sur le run, soit 7 et 3 demi-journées sur 10.\nTon run : référent des flux EDI (échange de données informatisé), en appui du N2, et les petites demandes.\nUn état de stock Divalto faux ? Pas un flux EDI : le N2 analyse, puis l'intégrateur, par ticket (le N3, 3e niveau).\nLe N2 bloque sur le flux des factures d'AquaBleu (20 % du chiffre d'affaires) ? Là, c'est pour toi.",
      points: [
        "Une petite demande (un export, une colonne dans un état), non bloquante : oui, dans ton créneau run, par exemple l'après-midi.",
        "Le reste n'est pas à toi. Le support d'abord : N1, N2, puis toi ; le N3 par ticket (module cp15). « Juste cette fois » devient la règle.",
        "Les mêmes appels reviennent ? Forme le N2 : une heure sur les rejets simples, et ils ne passent plus par toi.",
        "Vraie urgence de ton rôle : un flux bloqué qui empêche de facturer, que personne d'autre ne trouve. Tu lâches le projet une heure. Si quelqu'un sait faire, tu confies, avec un point à heure fixe."
      ],
      retenir: "Ton run : les flux EDI et les petites demandes. Le reste suit le circuit du support."
    },
    {
      titre: "Les interruptions : les regrouper",
      exemple: "Mardi, 9 h-11 h, ton créneau DEMAT : 9 messages Teams, 2 appels, Sophie au bureau « 2 minutes ». Rien ne bloquait une facture. Matinée perdue.\nMardi suivant : Teams en « ne pas déranger », téléphone pour le N2 seulement, réponses à 11 h.",
      points: [
        "Une interruption coûte plus que sa durée : il faut du temps pour s'y remettre. Tes créneaux de 2 heures sont réservés à l'avance dans l'agenda, comme un rendez-vous, notifications coupées ; les messages, à heures fixes (11 h, 14 h, 17 h).",
        "Pas bloquant ? « Je regarde à 14 h. » « Urgent » ne suffit pas : « Qu'est-ce qui est bloqué, et pour quand ? »",
        "Le créneau cède à la vraie urgence (une facturation bloquée, la date légale), à des appels répétés, et à quelqu'un bloqué par toi : 10 minutes qui débloquent le consultant passent d'abord. On regroupe, on ne coupe pas tout.",
        "Les méthodes divergent. GTD (Getting Things Done, de David Allen) : moins de 2 minutes, fais-le tout de suite. Les créneaux protégés : note-le. Hors créneau, les 2 minutes ; dedans, tu notes.",
        "Une réunion où tu ne décides ni n'apportes rien : le compte rendu suffit. Tu es DSI adjoint ? Pour ton équipe, un point court le matin, une porte ouverte à heure fixe."
      ],
      retenir: "Tu regroupes, et tu dis quand. Sauf vraie urgence, ou quelqu'un bloqué par toi."
    },
    {
      titre: "Tes rituels : la semaine se prépare",
      exemple: "Vendredi 16 h, 30 minutes, au bureau : ta revue. Fait, en retard, promis ; tes 3 priorités ; tes créneaux posés.\nLundi, au point de 30 minutes avec ton DSI : ce qui avance, ce qui coince, ce dont tu as besoin (module cp03). Pour ton temps, ajoute ton run de la semaine passée, en demi-journées.",
      points: [
        "Le vendredi, ta revue (la « revue hebdomadaire » de GTD) : ce qui traîne va dans ta liste. Tes deux points du lundi (ton DSI, le point projet) sont prêts. Le dimanche reste à toi.",
        "Chaque matin, 5 minutes : tes 3 actions du jour, avant les mails.",
        "Finir avant de commencer : 7 tâches entamées, 0 finie, c'est 0 livré. La méthode Kanban limite le travail en cours."
      ],
      retenir: "Le vendredi tu prépares, le lundi ton DSI arbitre, chaque matin 3 actions."
    },
    {
      titre: "Ta charge : la compter, la dire tôt",
      exemple: "Lundi 8 mars, la recette commence le 16. DEMAT : 9 demi-journées. Run : 3. Total : 12 pour 10, soit 120 %.\nAu point, à ton DSI : « 120 % cette semaine. Ne glisse pas : la recette. Peut glisser : la doc d'un flux EDI. Tu choisis ? »",
      points: [
        "Ta charge = tout ce que tu as à faire (projet, run, formation), en demi-journées, divisé par 10. Une journée, c'est 2 demi-journées.",
        "Tes estimations sont souvent trop courtes (le « biais de planification ») : prévois avec ton temps réel, noté.",
        "Un pic court (11 sur 10, puis 9), sans échéance menacée : tu glisses ce qui peut attendre. Pas d'alerte, pas de soirée.",
        "Au-delà (120 %, plusieurs semaines, une échéance en jeu) : tu le dis à ton DSI dès que tu le vois, pas au rendez-vous suivant. Absorber en silence, le soir, cache le problème : personne ne peut choisir.",
        "Une demande utile, en pleine semaine chargée : « pas maintenant », avec une date. Le fond : module cp18 ; les mots : module cp17."
      ],
      retenir: "Ta charge se compte. Un pic court se règle dans ta liste ; un dépassement se dit tôt à ton DSI."
    },
    {
      titre: "Ton DSI arbitre, sur tes faits",
      exemple: "Fin février, 3 semaines de suite : 5 demi-journées de run sur 10, et la recette prend du retard.\nAu point du lundi : « Run : 5 sur 10 depuis 3 semaines. Ne glisse pas : le 16 mars. A : le N2 reprend les rejets simples. B : la doc des flux attend avril. Je recommande A. » Ton DSI choisit.",
      points: [
        "Un écart d'un jour ou d'une semaine : tu le règles ou tu le confies, et tu le notes. Run et projet qui débordent ensemble, et ça dure : ton DSI arbitre. Pas le DAF (directeur administratif et financier, ton sponsor) : il ne gère pas le temps de la DSI.",
        "Tu apportes des faits, ce qui peut glisser ou pas (la date légale, une échéance du contrat), 2 options, ta recommandation.",
        "Il te charge en plus ? « Oui. Alors, que décale-t-on ? » Il a décidé ? Tu appliques, et tu préviens tout de suite ceux qui attendaient.",
        "Son choix fait sortir un jalon de la tolérance (± 2 semaines, module cp04) ? Le DAF tranche, prévenu le jour même.",
        "Tu es DSI adjoint : « ça va » ne suffit pas, demande des chiffres. Faits et options reçus : tu tranches vite, et tu l'écris."
      ],
      retenir: "Ton DSI arbitre ce qui dure, sur tes faits et tes options. Un jalon hors tolérance : le DAF."
    },
    {
      titre: "Tenir sous pression",
      exemple: "Jeudi 8 avril, 14 h : 12 factures AquaBleu rejetées en recette, le portail de la PA lent, un chiffre pour ton DSI à 16 h.\nTu t'arrêtes 5 minutes, tu écris, tu classes par impact, puis une chose à la fois.\nTes pics sont connus : janvier (clôture annuelle, données du 15), mars-avril (recette, en pleine saison des piscines), juin (bascule).",
      points: [
        "Découper : une tâche qui fait peur (« préparer la bascule ») devient sa prochaine action, concrète, de moins d'une heure.",
        "Rien à chaud : un message qui te pique, le soir, attend le lendemain (module cp17). Bloqué plus d'une demi-journée ? Demande de l'aide à celui qui sait.",
        "Un pic prévisible se prépare des mois avant, avec ton DSI : le N2 formé, le run allégé, pas deux gros sujets le même mois.",
        "Tes signaux : soirs tardifs devenus la règle, sommeil court, irritation, oublis. Parles-en tôt à ton DSI, ou aux RH (ressources humaines), au médecin du travail.",
        "Le soir, sans blocage, la réponse attend le matin : le Code du travail prévoit un droit à la déconnexion ; ton entreprise en fixe les règles."
      ],
      retenir: "Sous pression : la prochaine action, rien à chaud, de l'aide tôt. Les pics se préparent, l'épuisement se dit."
    }
  ]
};
