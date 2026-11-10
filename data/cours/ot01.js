// Parcours « Maîtriser les outils du chef de projet » — Fiche de cours du module ot01 « Outils pour cadrer ».
// Une section par outil de l'étape « Cadrer » (data/outils/sujets.js), dans l'ordre : gp-cadrage, gp-business-case,
// gp-raci, gp-estimation. Pas de nouvelle notion : on apprend à SE SERVIR des outils (quoi faire, comment le faire sur
// le site). Les règles et les mots sont ceux des outils et de leurs cours, mot pour mot : cp04 et cp06 (note de
// cadrage), cp11 (business case), cp09 (RACI), cp05 (estimation). Boutons et zones de l'écran : bloc « Outils » de
// js/app.js (Voir l'exemple, Nouveau, Partir de l'exemple, « + Ligne », Alertes, Totaux, Télécharger en Excel, Copier,
// Imprimer / PDF). Chiffres des exemples : ceux des exemples des outils, recalculés avec le moteur (js/outils.js) :
// délai de retour 35 000 ÷ 3 000 = 11,67 mois, avec l'alerte « Gain en temps » ; charge (4 + 4 × 6 + 14) ÷ 6 = 7 jours,
// durée 7 ÷ 2 = 3,5 semaines.
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi).
LEARNSQL.cours.ot01 = {
  intro: "Cadrer, c'est écrire avant de dépenser : quoi, pourquoi, combien, qui décide, et en combien de temps. Ici, tu apprends à te servir des 4 outils de l'étape « Cadrer » du menu Outils : la note de cadrage, le business case, la matrice RACI (qui Réalise, Approuve, est Consulté, est Informé) et la calculette d'estimation. Sur ta démat fiscale à 15 personnes, ou ta migration Divalto, lequel de ces 4 documents t'a le plus manqué ?",
  sections: [
    {
      titre: "Note de cadrage",
      exemple: "Octobre 2026, projet DEMAT 2027. Le DAF (directeur administratif et financier, ton sponsor) : « On passe à la facture électronique. Lance l'intégrateur. »\nLa cheffe comptable comprend « factures fournisseurs ». Le commercial, « factures clients ».\nTrois projets dans une phrase. Rien n'est commandé.\nTu ouvres la note de cadrage, et tu la remplis avec la cheffe comptable et le responsable ADV (administration des ventes).",
      points: [
        "À quoi elle sert : écrire, avant de dépenser, ce que le projet doit produire, pour qui, avec quels moyens et quelles limites. Quand : au début, avant les commandes. Un prestataire démarre sans note validée ni commande ? Tu fais arrêter, et tu informes le sponsor le jour même.",
        "Sur le site : `Voir l'exemple` montre la note de DEMAT 2027. `Nouveau` ouvre une note vide ; `Partir de l'exemple`, une copie à adapter. Les tableaux s'allongent avec `+ Critère`, `+ Hypothèse`, `+ Risque`, `+ Jalon`. Ta note reste dans ce navigateur ; pour la garder ailleurs : `Enregistrer dans un fichier`.",
        "Les alertes, sous la note, disent ce qui manque : hors périmètre, critères de succès, tolérances, validation. Une hypothèse « Impossible à vérifier » ? L'alerte : « Écris aussi cette hypothèse au registre des risques. »",
        "La règle : ce qui n'est pas écrit hors périmètre finira par être demandé. Un critère de succès = un chiffre, une date ou un seuil, et comment on le mesure. Pas « améliorer ». Au moins un critère de qualité et un d'adoption : un projet peut être à l'heure et raté.",
        "Le piège : la remplir seul. Écrit seul, le cadrage fait découvrir les besoins en recette (les tests du métier). Le bon réflexe : 20 minutes avec le sponsor sur 3 points clés, puis sa validation écrite. Ensuite, `Imprimer / PDF` ou `Copier` pour l'envoyer."
      ],
      retenir: "La note se remplit avec les métiers, hors périmètre et critères chiffrés compris. Sans validation écrite du sponsor, pas de mandat ; ensuite, elle ne change que par sa décision écrite."
    },
    {
      titre: "Business case : le coût sur 3 ans",
      exemple: "Octobre 2026. Le DAF : « Le connecteur coûte 35 k€ de plus que le portail, sur 3 ans. Ça vaut le coup ? »\nDans le business case, 2 options. A : le portail de la PA (plateforme agréée) seul, les factures fournisseurs ressaisies. B : le connecteur standard de la PA dans Divalto.\nGain de B : 2 000 factures × 3 minutes = 100 heures par mois. À 30 € l'heure : 3 000 € par mois.\nL'outil affiche un délai de retour de 11,67 mois, et une alerte : « Gain en temps : ce n'est pas de l'argent économisé. »",
      points: [
        "À quoi il sert : justifier le projet. Les options, leur coût complet sur la durée (le TCO, coût total de possession), les gains, ta recommandation. Quand : au cadrage, avant de valider le budget ; puis après les contrats, et à chaque gros changement.",
        "Sur le site, 3 tableaux. `+ Option` : son coût, son surcoût et son gain par mois ; le délai de retour se calcule (surcoût ÷ gain). `+ Poste` : quantité × prix, et sa nature : mise en place, run (le fonctionnement après la mise en service), sortie, réserve. `+ Gain` : volume × temps gagné × coût horaire.",
        "La règle : du temps libéré n'est pas de l'argent économisé. Il le devient seulement si une dépense disparaît. Sinon, choisis « Temps » dans « Gain en » : l'alerte le rappelle.",
        "Le piège : une seule option (l'alerte : ce n'est pas un choix), ou oublier le run, la sortie, le temps interne. « Ne rien faire » sert de référence quand la loi le permet ; sinon, la moins chère qui la respecte. Le temps interne s'écrit en jours, pas en euros, et pas dans le budget.",
        "Le bon réflexe : écrire les hypothèses (volumes, minutes, coût horaire, dates). Puis `Télécharger en Excel` pour le contrôleur de gestion : les calculs restent des formules."
      ],
      retenir: "Le business case compte tout, sur toute la durée, et dit si chaque gain est en argent ou en temps. Le sponsor le valide."
    },
    {
      titre: "Matrice RACI",
      exemple: "Mars 2027. Ta matrice RACI de DEMAT a une colonne par personne :\ntoi, le DAF, la cheffe comptable, Julie, ton DSI (directeur des systèmes d'information), le DG (directeur général)…\nNouveau livrable : le planning de formation de la compta.\nTu l'ajoutes avec `+ Livrable`, et tu te mets R.\nUne alerte s'affiche : « Personne n'approuve ce livrable : mets un A. »\nTu proposes la cheffe comptable, qui accepte. Son A fait disparaître l'alerte.",
      points: [
        "À quoi elle sert : dire, pour chaque livrable, qui réalise (R), qui approuve (A), qui est consulté (C) et qui est informé (I). Quand : au cadrage, validée par le sponsor ; puis à chaque nouveau livrable, départ ou congé.",
        "Sur le site : `+ Personne` ajoute une colonne (une personne ou un rôle), `+ Livrable` une ligne. Dans chaque case : R, A, C ou I. La légende rappelle le sens : C donne son avis AVANT la décision, I l'apprend APRÈS.",
        "La règle : un seul A par livrable, car deux A, c'est aucun. Et pas de livrable sans A. Ce sont les 2 alertes de l'outil. Pour un livrable du métier, l'A vient du métier.",
        "Le piège : croire qu'une matrice sans alerte est juste. L'outil ne voit pas qu'un R approuve son propre travail, ni qu'il y a trop de C. Julie teste (R) ; sa cheffe signe le PV (procès-verbal) de recette (A).",
        "Le bon réflexe : la relire avec chaque A, puis la faire valider par le sponsor. Un A part en congé quand sa décision tombe ? Il désigne avant, par écrit, qui approuve à sa place. `Imprimer / PDF` sort la matrice en paysage."
      ],
      retenir: "Un seul A par livrable, jamais de livrable sans A. L'outil compte les A ; le reste, c'est toi qui le relis."
    },
    {
      titre: "Calculette d'estimation",
      exemple: "Décembre 2026. 300 fiches clients n'ont pas de SIREN (le numéro d'entreprise) dans Divalto. L'ADV doit les compléter.\nElle estime : 4 jours au mieux, 6 probablement, 14 au pire. Elle a 2 jours par semaine pour ça.\nLa calculette : charge = (4 + 4 × 6 + 14) ÷ 6 = 7 jours. Durée = 7 ÷ 2 = 3,5 semaines.\nAu planning, tu mets 3,5 semaines.",
      points: [
        "À quoi elle sert : estimer une tâche avec 3 chiffres, puis passer de la charge (le travail, en jours) à la durée (le temps au calendrier). Quand : en faisant le planning, avec ceux qui feront le travail ; puis chaque fois que le contenu change.",
        "Sur le site : `+ Tâche`, puis qui l'estime, les 3 chiffres en jours (optimiste O, probable P, pessimiste Pe) et la disponibilité en jours par semaine. L'outil calcule la charge, (O + 4 × P + Pe) ÷ 6, la durée en semaines, et la charge totale.",
        "La règle : durée = charge ÷ disponibilité. Personne n'est à 100 % : congés, clôture, run, autres projets. 5 jours par semaine ou plus ? L'alerte le dit. Sûr de ton chiffre ? Le même 3 fois, comme Julie pour ses cas de test : 6, 6 et 6.",
        "Le piège : baisser l'estimation sous la pression. Une estimation baisse quand le contenu baisse, pas sous la pression. Moins de temps ? Moins de contenu.",
        "Le bon réflexe : l'estimation vient de celui qui fait. Toi, tu la challenges : sur quoi repose-t-elle ? Déjà fait ailleurs ? Puis `Télécharger en Excel` : les calculs restent des formules."
      ],
      retenir: "La charge dit combien de travail ; la durée, combien de temps au calendrier. L'estimation vient de celui qui fait."
    }
  ]
};
