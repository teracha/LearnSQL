// Chef de projet SI — Fiche de cours du module cp27 « Budget SI annuel et direction générale ».
// Fond : pratiques reconnues du contrôle de gestion et de la gestion financière d'une DSI, adaptées au terrain PME / ETI.
// ITIL (gestion financière des services : budget, suivi, refacturation) ; le partage run / build (faire tourner
// l'existant / les projets) ; la démarche FinOps pour le cloud (voir la dépense, couper ce qui tourne pour rien) ; le
// contrôle de gestion (budget annuel préparé à l'automne, base = le réel de l'année en cours et sa prévision, hypothèses
// écrites, suivi mensuel des écarts et de la prévision de fin d'année, révision en cours d'année ; CAPEX / OPEX classés
// par le contrôleur de gestion, selon les règles comptables). Les pratiques divergent : budget reconduit et ajusté ou
// budget base zéro (chaque ligne justifiée) ; révision en juin ou prévision glissante chaque trimestre ; masse salariale
// dans le budget de la DSI ou chez la RH. Le cours garde ce que dit la fiche : un cycle septembre-décembre, le réel comme
// base, une page par nature pour le DG, un suivi mensuel avec le contrôleur de gestion, la révision de juin.
// - Contenu : le run (contrats, licences, abonnements, matériel, télécoms), l'enveloppe des projets, la masse salariale ;
//   préparé par le DSI et son adjoint avec le contrôleur de gestion, présenté au comité de direction en novembre, décidé
//   par le DG en décembre, le DAF consulté ; base = le réel ; chaque chiffre a son hypothèse et sa source (contrat, RH) ;
//   le temps de l'équipe compte en jours (capacité, cp25), jamais une 2e fois en euros.
// - Le run ligne par ligne : quantité × prix × mois de l'année ; l'année pleine d'un projet clos en cours d'année ; le
//   prix suit le contrat ; le ponctuel sort de la base ; le matériel qui vieillit suit un plan ; les coûts cachés
//   (licences inutilisées, abonnement oublié, copie de test allumée, ligne « divers ») ; un propriétaire, une fin, un
//   préavis par ligne ; avant de couper une licence, le manager.
// - L'enveloppe des projets : dépenses externes ; votée en décembre, répartie au classement de janvier (cp25) ; un projet
//   compte les mois où il dépense ; ce qui glisse change d'année ; ce qui se libère, le DG en décide ; un projet sans
//   dépense externe ne fait pas d'économie en euros ; son run entre au budget à sa clôture (cp22).
// - CAPEX / OPEX : le contrôleur de gestion classe ; deux chiffres au DG (charges de l'année, investissement à voter) ;
//   l'argent sort à la date des factures ; on ne range pas une ligne pour qu'elle tienne dans une enveloppe ; le cloud
//   déplace la dépense, on compare sur la durée.
// - Présenter et couper : une page par nature (la loi, l'existant, l'équipe, les projets), en valeur, sans jargon, des
//   chiffres rapprochés avec le contrôleur ; une obligation est vérifiée (NIS2 : cp24) ; pas de rabot ; des options
//   chiffrées (ce qu'on ne fera pas, le risque) ; le DG décide en connaissant le prix, on applique ; pas de marge cachée,
//   un risque nommé a sa ligne visible.
// - Suivre, réviser, renouveler : chaque mois le réel, l'écart et sa cause, la prévision ; un écart de calendrier n'est ni
//   une dérive ni une économie ; dans le total voté, le DSI compense ; au-delà, le DG décide, le DAF consulté ; la révision
//   de juin ligne par ligne ; un échéancier des contrats ; la PA (fin novembre 2029, préavis de 6 mois, choix du DAF avant
//   fin mai 2029) ; l'archivage continue (durée légale).
// Fil rouge : DEMAT 2027 et le cadre « Tu es DSI adjoint » (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi),
// ligne « Budget SI annuel (module cp27) » (cycle, contenu, 10 personnes, CAPEX / OPEX par le contrôleur de gestion, un
// budget annuel ne compte que les mois de son année, suivi mensuel, révision en juin, chaque projet clos ajoute du run),
// lignes « Budget et business case » (abonnement de 850 € par mois de décembre 2026 à novembre 2029 ; archivage, 50 € par
// mois jusqu'en novembre 2029 ; clôture de juillet 2027, mensualités et archivage repris par le run ; hausse possible au
// renouvellement, cp07), « Contrats » (PA : 3 ans, reconduit chaque année, préavis de 6 mois ; le DAF signe),
// « Portefeuille (module cp25) » (comité de janvier 2028 : sécurité, migration, WMS, tableaux Power BI des ventes,
// 256 k€ ; juin 2028 : la migration glisse de 3 mois, le WMS aussi), « La réglementation » (tout passe par une PA ;
// factures gardées la durée légale ; NIS2 : on vérifie), « Les personnages » (le DG arbitre, le DAF consulté, le
// contrôleur de gestion, l'équipe de 8, la RH).
// Faits ajoutés (cohérents avec la fiche et les modules publiés, à valider ; les mêmes en tête de cp27-budget-si.js) :
// budget 2028 de la DSI, décidé par le DG en décembre 2027 : 1 119 k€ = run 200 k€ + enveloppe des projets 256 k€ +
// masse salariale 663 k€ (10 personnes ; 650 k€ en 2027, + 2 %, taux de la RH) ; base : le réel 2027 (run 193,7 k€) ;
// run 2028 : abonnement de la PA 10 200 €, archivage 600 €, le reste 189,2 k€, stable ; + 6,3 k€ = DEMAT en année pleine
// (en 2027, le run n'en a payé que 5 mois : 4 250 € et 250 €) ; enveloppe 2028 : sécurité 20 k€, migration 86 k€, WMS
// 150 k€, tableaux Power BI 0 € ; WMS prévu de juillet à décembre 2028, 25 k€ par mois, décalé en octobre : 75 k€ passent
// en 2029. Exemple de la section 6 : 8 licences de bureautique à 20 € par mois, de personnes parties, fermées fin février
// 2028 : 1 600 € de moins sur l'année.
// Affirmations juridiques ou comptables hors fiche (générales, à faire vérifier) : un contrat à durée déterminée
// s'exécute jusqu'à son terme, sauf ce que le contrat prévoit (Code civil, art. 1212 ; force obligatoire : art. 1103 ; à durée
// indéterminée, on peut y mettre fin avec son préavis : art. 1211) ;
// un investissement (CAPEX) pèse sur plusieurs années, une charge (OPEX) sur l'année, l'argent sort à la date des factures
// (comme cp11). Aucune règle comptable précise d'immobilisation : le contrôleur de gestion tranche. Aucune règle fiscale.
// Frontières : le business case d'UN projet = cp11 ; le budget d'UN projet (engagé, consommé, atterrissage) = cp12 ; les
// coûts du run chiffrés à la clôture = cp22 ; choisir entre les projets = cp25 ; les contrats = cp14 ; les risques = cp07 ;
// la conformité = cp24 ; manager l'équipe = cp26. Cités en une ligne, pas refaits.
LEARNSQL.cours.cp27 = {
  intro: "Ton projet Snowflake + Power BI : une facture de calcul chaque mois. Tes prestataires : des contrats qui se renouvellent. Ta démat fiscale : un coût que la loi impose. Qui les avait prévus au budget de l'année ? Ici : construire le budget annuel de la DSI (direction des systèmes d'information), le défendre devant le DG (directeur général), le suivre. Le budget d'un projet : modules cp11 et cp12.",
  sections: [
    {
      titre: "Ce que contient le budget de la DSI",
      exemple: "Budget 2028 de la DSI, préparé par ton DSI à l'automne 2027, décidé par le DG en décembre :\n– le run (le fonctionnement courant : contrats, licences, abonnements, matériel, télécoms) : 200 k€ ;\n– l'enveloppe des projets : 256 k€ ;\n– la masse salariale : 663 k€, pour 10 personnes.\nTotal : 1 119 k€. La base : le réel de 2027.",
      points: [
        "Le cycle : préparé en septembre-octobre par le DSI et son adjoint, avec le contrôleur de gestion. Présenté au comité de direction en novembre. Décidé par le DG en décembre, le DAF (directeur administratif et financier) consulté.",
        "La base : le réel de l'année en cours, à fin août, plus la prévision jusqu'en décembre. Pas le budget de l'an dernier plus 3 %, ni la somme des demandes.",
        "Chaque chiffre a son hypothèse écrite : une quantité, un prix, une source (le contrat, la RH : les ressources humaines). Sans elle, un chiffre ne se défend pas, et ne se suit pas.",
        "La masse salariale : le DSI, son adjoint et l'équipe de 8. Le taux d'augmentation vient de la RH. Manager l'équipe : module cp26.",
        "Le temps de l'équipe est déjà payé par la masse salariale. Il compte en jours, dans la capacité (module cp25), jamais une 2e fois en euros."
      ],
      retenir: "Le budget de la DSI : le run, l'enveloppe des projets, la masse salariale. Une base réelle, des hypothèses écrites."
    },
    {
      titre: "Le run, ligne par ligne",
      exemple: "L'abonnement de la PA (plateforme agréée) : 850 € par mois, jusqu'en novembre 2029.\nDEMAT, clos en juillet 2027, n'a pesé que 5 mois sur le run de 2027 : 4 250 €, plus 250 € d'archivage.\nEn 2028, 12 mois : 10 200 € et 600 €.\nLe run passe de 193,7 à 200 k€ : + 6,3 k€, DEMAT en année pleine.",
      points: [
        "Une ligne par contrat : quantité × prix × mois. Un budget annuel ne compte que les mois de son année.",
        "Un projet clos en cours d'année pèse quelques mois ; l'année suivante, 12 : c'est « l'année pleine ». Chaque projet clos ajoute du run, chiffré à sa clôture (module cp22).",
        "Le prix suit le contrat : fixe, révisé selon une clause, ou une hausse annoncée, écrite avec sa source. Ce qui ne revient pas sort de la base (une mise en service). Le matériel qui vieillit se remplace selon un plan.",
        "Les coûts cachés : des licences de personnes parties, un abonnement oublié, une copie de test dans le cloud allumée pour rien. Une ligne « divers » les cache.",
        "Chaque ligne a un propriétaire, une fin, un préavis ; une ressource provisoire, sa date d'arrêt. Avant de couper une licence, on demande au manager : peu de connexions ne veut pas dire inutile."
      ],
      retenir: "Le run se construit contrat par contrat, sur les mois de l'année. Chaque projet clos l'augmente ; les coûts cachés se cherchent."
    },
    {
      titre: "L'enveloppe des projets",
      exemple: "Décembre 2027 : le DG vote 256 k€ pour les projets de 2028.\nJanvier 2028 : le comité de direction la répartit, sur le classement (module cp25) :\n– sécurité : 20 k€ ;\n– migration de Divalto : 86 k€ ;\n– WMS (logiciel d'entrepôt) : 150 k€ ;\n– tableaux Power BI des ventes : 0 €, faits en interne.\nJuin 2028 : la migration glisse de 3 mois, le WMS aussi. Une part des dépenses du WMS passe en 2029.",
      points: [
        "L'enveloppe paie les dépenses externes des projets : prestataires, logiciels. Votée en décembre, elle ne se répartit qu'au classement de janvier.",
        "Un projet compte les mois où il dépense. Il glisse ? Sa dépense change d'année, et le budget suivant la reprend.",
        "Ce qui se libère n'est pas au premier qui demande : la révision le montre, le DG décide de son usage.",
        "Un projet sans dépense externe ne coûte rien en euros : le couper libère des jours, pas d'argent, et perd son gain.",
        "Le run qu'un projet laissera (licences, maintenance) s'écrit dans son business case (module cp11). Il entre au budget du run à sa clôture."
      ],
      retenir: "L'enveloppe paie les dépenses externes des projets retenus, mois par mois. Ce qui glisse change d'année ; ce qui se libère, le DG en décide."
    },
    {
      titre: "CAPEX ou OPEX : ce que ça change pour le DG",
      exemple: "Le contrôleur de gestion range chaque ligne du budget 2028.\nRun, masse salariale : surtout des charges de l'année (OPEX, les dépenses de fonctionnement).\nLe matériel acheté, une part de la migration et du WMS : peut-être un investissement (CAPEX), selon les règles comptables. C'est lui qui le dit.\nAu DG, deux chiffres : ce qui pèse sur le résultat de 2028, et l'investissement à voter.",
      points: [
        "Un CAPEX est un bien qui sert plusieurs années : sa charge s'étale sur sa durée d'utilisation. Un OPEX pèse tout entier sur l'année (module cp11).",
        "Pour le DG : l'investissement se vote souvent à part, et il pèsera aussi sur les années suivantes. L'argent, lui, sort à la date des factures.",
        "Le contrôleur de gestion classe ; tu lui donnes chaque coût, sa nature, sa date. On ne range jamais une ligne pour qu'elle tienne dans une enveloppe : si l'enveloppe manque, le DG choisit entre des options.",
        "Le cloud et les abonnements déplacent la dépense : moins d'achats, plus de charges chaque année. Plus cher ? Ça se compare sur la durée."
      ],
      retenir: "Le contrôleur de gestion classe. Le DG voit deux chiffres : les charges de l'année et l'investissement à voter."
    },
    {
      titre: "Présenter au DG, et couper s'il le demande",
      exemple: "Comité de direction de novembre. Une page :\n1. Ce que la loi impose : la PA et l'archivage, 10,8 k€ (+ 6,3 k€ : DEMAT en année pleine).\n2. Faire tourner l'existant : 189,2 k€, stable.\n3. L'équipe : 663 k€ (+ 2 %, taux de la RH).\n4. Les projets : 256 k€, chacun avec son gain ou le risque qu'il évite.\nLe détail ligne par ligne : en annexe.",
      points: [
        "Par nature : la loi, l'existant, l'équipe, les choix. Une obligation se vérifie. NIS2 (la directive européenne sur la cybersécurité) vous concerne-t-elle ? Ce n'est pas vérifié (module cp24) : la sécurité se défend sur le risque qu'elle évite.",
        "En valeur et sans jargon : « faire tourner l'existant », pas « MCO » (maintien en conditions opérationnelles), ni « build » (les projets). Des chiffres rapprochés avant avec le contrôleur de gestion : un seul total.",
        "Le DG demande de couper ? Pas de rabot sur chaque ligne. La loi ne se coupe pas, ni un contrat signé jusqu'à une date (sauf clause de sortie). Des options chiffrées : ce qu'on gagne, ce qu'on ne fera pas, le risque.",
        "Le DG décide en connaissant le prix : c'est écrit, on applique, le sponsor touché est prévenu. On y revient sur un fait nouveau, pas avec plus d'arguments.",
        "Pas de marge cachée (5 % de plus partout, « parce qu'il coupe toujours ») : le DG ne saurait plus ce qu'il vote. Un risque nommé a sa ligne, visible : il la vote ou non."
      ],
      retenir: "Une page par nature, en valeur, des chiffres vérifiés, sans jargon. Pour couper : des options chiffrées ; le DG décide."
    },
    {
      titre: "Suivre, réviser, préparer les renouvellements",
      exemple: "Mars 2028, revue du mois avec le contrôleur de gestion.\nBureautique : 160 € de moins par mois. La cause : 8 licences de personnes parties (20 € par mois chacune), fermées fin février.\nPrévision de fin d'année : 1 600 € de moins (10 mois × 160 €). Une économie, notée. Pas un budget « à dépenser ».",
      points: [
        "Chaque mois, ligne par ligne : le réel, l'écart et sa cause, la prévision de fin d'année. Un écart de calendrier (une facture annuelle en janvier, des postes achetés en octobre) n'est ni une dérive, ni une économie.",
        "Dans le total voté, ton DSI compense entre ses lignes. Le dépasser : le DG décide, le DAF consulté, prévenus tôt, avec la cause et des options.",
        "En juin, la révision : la prévision refaite ligne par ligne, pas le réel de 5 mois × 12/5. Elle ajoute le run des projets livrés, et passe à l'an prochain ce qui glisse.",
        "Un échéancier des contrats (fin, préavis, propriétaire), relu à chaque budget. Le contrat de la PA arrive à échéance fin novembre 2029 : il se reconduit seul, sauf préavis de 6 mois. Le DAF choisit avant fin mai 2029, après le vote du budget.",
        "Le budget 2029 compte donc 11 mois au prix connu, et décembre selon une hypothèse écrite (une hausse est possible : module cp07). Le coût d'un changement va sur une ligne visible. L'archivage continue : les factures se gardent la durée légale."
      ],
      retenir: "Chaque mois : l'écart, sa cause, la prévision. En juin : la révision, ligne par ligne. Chaque contrat : sa fin et son préavis, prévus au budget."
    }
  ]
};
