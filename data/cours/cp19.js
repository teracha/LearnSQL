// Chef de projet SI — Fiche de cours du module cp19 « La recette ».
// Fond : ISTQB (le référentiel international des testeurs) pour le vocabulaire des tests, en une ligne : niveaux
// unitaire, intégration, système, acceptation (le syllabus v4 en compte 5 : il sépare l'intégration des composants et
// celle des systèmes), critères d'entrée et de sortie, gravité d'une anomalie, retest et non-régression. PMBOK et PRINCE2 : critères d'acceptation fixés avant, acceptation par le client. Pratiques de terrain
// en PME / ETI : stratégie de recette écrite au cadrage, cahier de recette, « recette usine » du fournisseur comme
// critère d'entrée, livraisons de correctifs groupées, lot de non-régression, PV avec réserves précises et datées.
// Les pratiques divergent (dit au cours) : les écoles comptent 3 à 5 niveaux de test (cp06 en garde 3) ; en agile,
// chaque besoin du backlog porte ses critères d'acceptation ; certaines équipes ajoutent une priorité à part ou une 4e gravité ;
// la non-régression s'automatise souvent dans le logiciel, se rejoue souvent à la main sur un ERP en PME.
// - Les niveaux : les tests du fournisseur vérifient ce qu'il a construit, la recette vérifie le besoin ; recette usine
//   = critère d'entrée, avec compte rendu ; le métier teste ; toi : organiser, préparer les données, vérifier la veille
//   que l'environnement marche, jamais jouer ses cas à sa place.
// - La stratégie (au cadrage) : périmètre, cas, critères d'acceptation mesurables, données, environnement à part,
//   qui teste, qui signe, calendrier avec les retests et les tests imposés par un client EDI ; DSI adjoint : une page
//   par projet.
// - Les cas : situation réelle, données, étapes, résultat attendu écrit avant ; cas rares mais coûteux d'abord ; ce
//   qui reste hors projet doit passer comme avant ; données réelles, personnes masquées ; tableau Power BI : un chiffre sûr.
// - Les anomalies : ticket (cas, attendu, obtenu, preuve), gravité fixée par le métier sur des définitions écrites,
//   ordre de correction, fermeture après retest OK, erreur de saisie ≠ anomalie, anomalie ou changement (cp10).
// - La non-régression : lot de cas clés choisi avant, tenu à jour, rejoué après chaque livraison groupée ; piège : couper
//   des cas pour tenir la date (cp18) ; le pilote confirme la recette, il ne la remplace pas.
// - Le PV : ce qu'il engage, ses critères, les réserves (précises, datées, après le gel), qui signe (l'A du RACI),
//   ce qu'il déclenche (solde de la mise en service, cp12), la levée des réserves ; recette tacite : cp14.
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Recette (module cp19) » :
// stratégie écrite au cadrage ; 120 cas préparés en janvier-février par Julie (fournisseurs), Sophie et Marc (clients) ;
// vrais clients, données personnelles masquées (cp01-q27) ; outil de tickets ; gravités bloquante, majeure, mineure ;
// non-régression après chaque correctif ; recette du 16 mars au 30 avril ; PV : 0 bloquante ni majeure, réserves
// mineures datées ; PV fournisseurs signé par la personne désignée par la cheffe comptable en congé (pas Julie), PV
// clients par le responsable ADV, le 30 avril, 2 réserves mineures ; le PV ouvre le solde de la mise en service (cp12).
// Promesses tenues : cp01-q22 (« La recette, c'est le métier qui valide sur ses cas, avec un PV signé » : retenir de la
// section 1) ; cp08 (« La stratégie de recette : module cp19 » : section 2).
// Faits ajoutés (cohérents avec la fiche et les modules publiés, à valider) : stratégie d'une page, validée avec la note
// de cadrage en octobre 2026 ; environnement : une copie de Divalto réservée à la recette, à part de celle de
// l'intégrateur, et l'espace de test de la PA (cp14-q05, cp15-q33) ; livraisons de correctifs le mardi et le jeudi ;
// lot de non-régression de 20 cas clés, choisi en février ; cas F-17 (avoir fournisseur, chiffres de l'exemple) et
// C-42 (avoir AquaBleu en EDI, codes 380 / 381 comme cp03-q15) ; les 2 réserves du PV (un libellé du PDF, un tri
// d'écran, comme cp14-q26) datées au 9 juillet, après le gel et la bascule (cp10 : pendant le gel, seules passent les
// bloquantes et les obligations légales) ; le solde de 3 700 € (fiche, cp12).
// Affirmations juridiques hors fiche (générales, à faire vérifier) : un PV ne promet pas zéro défaut ; un défaut trouvé
// après se corrige selon le contrat (garantie, support : cp14) ; une réserve vague (« sous réserve de bon
// fonctionnement ») ne protège presque rien ; ce qui est vu et pas mis en réserve est en général accepté ; les données personnelles des contacts se masquent dans les données de test
// (cp01-q27, cp24). Fiche : une facture émise est définitive ; facture électronique = B2B en France.
// Frontières : suivre la recette (taux, météo, prévision du PV) = cp08 ; qui signe au RACI = cp09 ; PV, réserves,
// délai de validation et recette tacite au contrat = cp14 ; anomalie ou changement = cp10 ; un bon ticket = cp15 ;
// la qualité qui paie = cp18 ; le temps des utilisateurs clés = cp16 ; la reprise de données (contrôles, validation)
// = cp20 ; les critères de go / no-go = cp21 ; la formation = cp23 ; le RGPD = cp24. Cités en une ligne, pas refaits.
LEARNSQL.cours.cp19 = {
  intro: "Sur ta migration Divalto, qui a dit « ça marche » : l'intégrateur, ou la compta, sur ses vrais cas ? Sur ton projet Snowflake + Power BI, qui a vérifié les chiffres avant le comité ? Ici : la stratégie de recette, les cas, les anomalies, la non-régression, le PV (procès-verbal). Le suivi de la recette : module cp08. Le PV au contrat : cp14.",
  sections: [
    {
      titre: "Les niveaux de test : la recette, c'est le métier",
      exemple: "DEMAT 2027, avant le 16 mars :\n– le consultant teste chaque réglage de son paramétrage (tests unitaires) ;\n– il teste les échanges entre Divalto et la PA, la plateforme agréée (tests d'intégration) ;\n– la PA a testé son connecteur chez d'autres clients.\nDu 16 mars au 30 avril, la recette (tests de validation par le métier) : Julie, Sophie et Marc jouent leurs vrais cas.",
      points: [
        "Les tests du fournisseur vérifient ce qu'il a construit : « ça marche comme je l'ai compris ». La recette vérifie le besoin : « ça marche pour nous ».",
        "L'ISTQB (le référentiel international des testeurs) distingue les tests unitaires, d'intégration, système, puis d'acceptation. La recette, c'est l'acceptation. Les écoles comptent 3 à 5 niveaux (module cp06).",
        "Les tests du fournisseur, parfois appelés « recette usine », passent avant : c'est un critère d'entrée, prouvé par un compte rendu. Sinon, Julie perd ses créneaux sur des erreurs simples.",
        "Qui teste : les utilisateurs clés. Toi, tu organises, tu prépares les données, tu suis. Vérifier la veille que l'environnement marche : oui. Jouer leurs cas à leur place : non.",
        "Piège : la recette faite par l'intégrateur, ou par toi. L'un jugerait son propre travail ; l'autre ne fait pas le métier."
      ],
      retenir: "La recette, c'est le métier qui valide sur ses cas, avec un PV signé."
    },
    {
      titre: "La stratégie de recette : écrite au cadrage",
      exemple: "Octobre 2026, une page, validée avec la note de cadrage :\nPérimètre : factures fournisseurs et clients, 3 sites, flux EDI (échange de données informatisé), avoirs.\nCas : 120, écrits en janvier-février par Julie (fournisseurs), Sophie et Marc (clients).\nCritères d'acceptation : 0 anomalie bloquante, 0 majeure ; les mineures en réserves datées.\nEnvironnement : une copie de Divalto pour la recette, l'espace de test de la PA.\nQui signe : la cheffe comptable (fournisseurs), le responsable ADV, administration des ventes (clients).\nCalendrier : du 16 mars au 30 avril.",
      points: [
        "Elle s'écrit au cadrage, pas en mars. Le temps du métier se réserve tôt (module cp16). Le contrat de la PA reprend ses critères (module cp14).",
        "Un critère d'acceptation dit ce qui doit être vrai pour signer. Mesurable : « 0 bloquante », pas « ça marche bien ». Fixé avant, à froid : personne ne le déplace fin avril. En agile, chaque besoin du backlog porte les siens.",
        "L'environnement : une copie stable, à part de celle où l'intégrateur travaille. Jamais la production : une facture émise est définitive.",
        "Le calendrier prévoit des créneaux pour les cas, et pour les retests. Un client EDI impose ses tests ? Ils y entrent, dates réservées tôt. La marge reste pour les imprévus.",
        "Tu es DSI (directeur des systèmes d'information) adjoint ? Tu demandes cette page à chaque projet, au cadrage. Chaque PV se signe alors sur des critères connus."
      ],
      retenir: "La stratégie fixe d'abord : quoi tester, sur quels critères, avec quelles données, où, qui teste, qui signe, quand."
    },
    {
      titre: "Les cas de test : les vrais cas, écrits avant",
      exemple: "Cas F-17, écrit par Julie en février :\nSituation : un avoir fournisseur, lié à sa facture du mois.\nDonnées : facture de 1 200 € HT, avoir de 150 € HT.\nÉtapes : l'avoir arrive par la PA ; Julie le contrôle dans Divalto.\nRésultat attendu : avoir lié à sa facture, TVA de 30 €, reste à payer 1 260 € TTC.",
      points: [
        "Un cas = une situation réelle, ses données, ses étapes, son résultat attendu. Sans attendu écrit avant, on valide ce que le système fait. Pour un tableau Power BI : un chiffre sûr, comme un mois clos.",
        "Ils viennent du vrai travail : avoirs, rejets EDI, AquaBleu. Un fournisseur étranger hors PA doit passer comme avant. Ce qui change d'un site à l'autre a ses cas. Les rares mais coûteux d'abord.",
        "Le métier les écrit avant, en janvier-février ; tu les relis. Écrits en testant, ils testent ce qui vient, pas ce qui compte.",
        "Le cahier de recette : la liste des cas, avec leurs résultats. Il sert au suivi, à la non-régression, au PV.",
        "Les données : les vrais clients, car le SIREN (le numéro de l'entreprise) achemine la facture. Les contacts (noms, e-mails) sont masqués : rien ne part chez un vrai client (module cp24). La reprise, elle, s'essaie sur les vraies données, protégées (module cp20)."
      ],
      retenir: "Un cas de test : un vrai cas du métier, écrit avant, avec son résultat attendu."
    },
    {
      titre: "Les anomalies : un ticket, une gravité, un retest",
      exemple: "Jeudi 8 avril, Marc ouvre un ticket :\n« Cas C-42, avoir AquaBleu en EDI. Attendu : un message d'avoir (code 381). Obtenu : code 380, celui d'une facture ; AquaBleu le rejette. Reproduit 2 fois, message joint. Gravité : bloquante. »\nLe consultant corrige. La livraison de mardi l'installe dans la copie de recette. Marc rejoue : OK. Ticket fermé.",
      points: [
        "Un ticket par anomalie, dans l'outil de tickets : le cas, l'attendu, l'obtenu, comment reproduire, une preuve (module cp15).",
        "La gravité est définie dans la stratégie. Bloquante : on ne peut plus facturer ou recevoir. Majeure : un contournement existe, mais coûteux. Mineure : une gêne. Le métier la fixe, avec toi, sur ces définitions. Pas celui qui corrige.",
        "On corrige par gravité : bloquantes, majeures, puis mineures. Certains ajoutent une priorité à part, ou une 4e gravité : l'essentiel, c'est une définition écrite avant.",
        "Une anomalie se ferme quand le testeur l'a rejouée OK, dans la copie de recette. « Corrigé chez moi » ne suffit pas. Une erreur de saisie du testeur n'est pas une anomalie.",
        "Non conforme à l'écrit : une anomalie. Un besoin nouveau : une demande de changement (module cp10)."
      ],
      retenir: "Une anomalie : un ticket clair, une gravité fixée par le métier sur des définitions écrites, un retest OK avant de fermer."
    },
    {
      titre: "La non-régression : ce qui marchait marche-t-il encore ?",
      exemple: "Mardi 13 avril, livraison : l'intégrateur corrige la TVA des avoirs clients, un réglage commun.\nMercredi, Julie, Sophie et Marc rejouent le lot de non-régression : 20 cas clés, choisis en février.\nLe cas F-17 échoue : les avoirs fournisseurs ne passent plus. Le correctif a cassé ailleurs. Nouveau ticket, bloquant, lié à la livraison.",
      points: [
        "Un correctif peut casser ailleurs, surtout un réglage commun : TVA, numéros, format. La non-régression vérifie que ce qui marchait marche encore.",
        "Le lot : 15 à 20 cas clés, choisis avant la recette. Un par flux, plus les cas rares et coûteux. Pas les 120, ni rien. Un cas qui a cassé fort y entre.",
        "Les correctifs arrivent par livraisons groupées et annoncées, ici le mardi et le jeudi. Le lot se rejoue après chacune. Rien au fil de l'eau.",
        "Le lot resservira : au pilote, à chaque version de la PA ou de Divalto (module cp15). Le logiciel l'automatise souvent ; un ERP en PME le rejoue souvent à la main.",
        "Piège : couper des cas pour tenir la date. Dans ta tolérance, tu décales la date ; au-delà, le DAF (directeur administratif et financier, ton sponsor) choisit, risque connu (module cp18). Le pilote confirme la recette, il ne la remplace pas."
      ],
      retenir: "Après chaque livraison de correctifs, on rejoue le lot de cas clés : pas tout, jamais rien."
    },
    {
      titre: "Le PV et les réserves",
      exemple: "Vendredi 30 avril : 0 bloquante, 0 majeure.\nPV clients : signé par le responsable ADV. PV fournisseurs : par la personne que la cheffe comptable, en congé, a désignée par écrit. Pas Julie : elle a fait les tests.\n2 réserves mineures : un libellé du PDF, un tri d'écran. Chacune avec son ticket et sa date : le 9 juillet, après le gel et la bascule.\nLe PV ouvre le solde de la mise en service de la PA : 3 700 € (module cp12).",
      points: [
        "Le PV dit : ce livrable, dans cette version, est accepté sur ces cas et ces critères, avec ces réserves. Il ne promet pas zéro défaut : ce qu'aucun cas n'a vu se corrige selon le contrat (module cp14). Ce qui est vu, sans réserve, est en général accepté.",
        "Ses critères sont ceux de la stratégie : une bloquante ou une majeure ouverte, pas de PV. Corrigée mais pas encore retestée : pas encore de PV.",
        "Une réserve vise un défaut mineur précis : son ticket, sa date, qui le reteste. « Sous réserve de bon fonctionnement » ne protège presque rien. Une bloquante ne se met pas en réserve.",
        "Qui signe : l'A du RACI (le tableau des rôles : A = celui qui approuve), le responsable du métier (module cp09). Ni celui qui a testé, ni toi, ni l'intégrateur. Absent ? Il désigne avant, par écrit.",
        "Le PV déclenche le solde de la mise en service, puis le pilote de mai. Les réserves se suivent jusqu'à leur levée écrite, par le métier, après retest et lot. La recette tacite : module cp14."
      ],
      retenir: "Le PV se signe par le métier, sur les critères écrits : zéro bloquante, zéro majeure, des réserves précises et datées."
    }
  ]
};
