# Parcours « Chef de projet SI » : plan validé

Plan issu du challenge de l'expert chef de projet (fond) et du prof (pédagogie), validé par l'élève.
Modules `cp01` à `cp27` (`data/modules.js`), rangés en sous-parcours dans `data/parcours.js`.

## Règles pédagogiques de ce parcours

- **Modules courts** : 4 à 6 sections (7 au maximum), environ 15 minutes de lecture. Une idée par section, 5 points maximum.
- **Ouvrir sur son vécu** : chaque cours commence par une question sur ses projets réels
  (EDI, dématérialisation fiscale, migration Divalto, Snowflake + Power BI).
- **Fil rouge « DEMAT 2027 »** : un négociant en équipement de piscines (multi-sites, 120 salariés, ERP Divalto)
  passe à la facture électronique. Plateforme agréée à choisir, Divalto à connecter, flux EDI de la grande distribution
  à reprendre, comptabilité à former. Acteurs : DAF pressé (sponsor), cheffe comptable inquiète, intégrateur Divalto,
  prestataire de plateforme en retard, commercial qui veut « juste que ça marche ». Un épisode par module.
  Le client AquaBleu (module Divalto dv01) peut apparaître comme client EDI.
- **QCM en mises en situation** (« Que fais-tu ? ») : la bonne réponse n'est pas toujours la plus conciliante ;
  les choix faux sont de vrais travers (faire soi-même, dire oui puis négocier, escalader trop vite).
  Chaque `pourquoi` donne la conséquence du choix.
- **Anti-devinette** : règles détaillées dans `.claude/agents/expert-chef-projet.md` (choix faux des deux côtés,
  aucun signal réservé aux bonnes réponses, aucune règle simple au-dessus de 60 %). Le testeur le vérifie à chaque module.
- **Réserve** : 30 à 50 cas vraiment différents par module, pas 100. Pas de remplissage.
- **Quand les méthodes divergent** (PMBOK, PRINCE2, agile) : la question donne le contexte, l'explication le dit.
- **Réglementaire** (facture électronique, RGPD, NIS2) : vérifier les dates et textes au moment d'écrire.
- **À ajouter plus tard** (proposé par le prof) : fiche réflexe par module (signal → 3 actions → 1 phrase à dire),
  mission terrain (une action dans son vrai travail), auto-évaluation de début et de fin, scénario à embranchements (v2).

## Fiche fil rouge DEMAT 2027 (référence : tout module doit la respecter)

Issue de l'audit de cohérence du 29/10/2026. En cas de doute, c'est cette fiche qui fait foi.

**L'entreprise**
- Négociant en équipement de piscines : 120 salariés, 3 sites (dépôts), ERP Divalto 10.13.
- Compta : 6 personnes (la cheffe comptable, Julie, Sophie et 3 comptables), plus une stagiaire récente.
  En août, 2 personnes sur 6. Exercice civil : clôture annuelle en janvier. Clôture mensuelle en 5 jours ouvrés.
- Clients EDI de la grande distribution, dont AquaBleu : chaîne de magasins de piscine, 20 % du chiffre d'affaires.
- Saison des piscines au printemps : plus de commandes EDI et d'incidents pendant la recette (mars-avril) ; pic des dépôts
  en mai (modules cp02, cp16, cp18).

**La réglementation (vérifiée en octobre 2026)**
- Réception des factures électroniques : obligatoire pour toutes les entreprises depuis le 1er septembre 2026 (l'entreprise est déjà en retard).
- Émission et e-reporting : obligatoires pour les PME au 1er septembre 2027.
- Tout passe par une plateforme agréée (PA, ex-PDP). Facture électronique = B2B en France.
- Nouvelles mentions obligatoires, dont le SIREN du client : sans lui, la facture ne peut pas être acheminée (rejet).
- RGPD : en cas de doute (copie de données, violation possible), l'avis du DPO, ou du référent RGPD s'il n'y a pas de DPO.
- La DGFiP publie sur impots.gouv.fr la liste officielle des PA immatriculées : on choisit dans cette liste
  (un comparateur privé ne la remplace pas).
- E-reporting = ventes aux particuliers, opérations avec l'étranger (UE et hors UE), données de paiement.
- Une facture émise ne se modifie pas (intégrité dès l'émission) : on la corrige par un avoir ou une facture rectificative.
- Conservation des factures : 6 ans (fiscal), 10 ans (Code de commerce). « Durée légale » suffit dans les questions.
- Des amendes existent (article 1737 du CGI), mais leurs montants ont changé en 2026 : ne pas citer de montant.
- NIS2 (directive européenne de 2022 sur la cybersécurité) : en France, la loi qui la transpose (projet de loi
  « résilience ») n'est pas votée fin octobre 2026 (adoptée au Sénat en mars 2025 ; son examen à l'Assemblée nationale
  a été retiré de l'ordre du jour le 6 octobre 2026, sans nouvelle date). Ne citer ni date d'application, ni délai, ni
  sanction, ni liste d'obligations. Le négociant vend des produits de traitement de l'eau : la directive vise aussi la
  distribution de produits chimiques. Concerné ou pas : on le vérifie (test de l'ANSSI sur MonEspaceNIS2, avis d'un
  juriste), on ne le suppose pas (module cp24). Dans le fil rouge, la vérification lancée fin 2026 est encore en
  cours en 2028 : son résultat dépend de la loi française (cp24-q30, cp25-q11).

**Le projet**
- Périmètre : factures B2B France, clients et fournisseurs, des 3 sites ; connecteur Divalto ↔ PA ; flux EDI des factures
  de la grande distribution ; formation de la compta.
- Hors périmètre : notes de frais, refonte du plan comptable, BL dématérialisés, gestion de stock,
  e-reporting (porté par le DAF, qui l'a confié au contrôleur de gestion).
- Budget au cadrage : 60 à 90 k€.
- Critères de succès : 100 % des factures clients professionnels via la PA au 1er septembre 2027 ; moins de 2 % de rejets
  le 1er mois ; clôture toujours en 5 jours ouvrés.
- Gouvernance : COPIL mensuel avec le DAF ; point projet chaque semaine, avec 15 minutes de revue des risques.
- Connecteur : c'est le connecteur standard de la PA (95 % des factures) ; l'intégrateur l'installe et le paramètre dans Divalto.
  Plan B : le portail web de la PA (dépôt en Factur-X), prévu au contrat.
- Démarche (module cp06) : hybride. Le cœur (flux légaux, connecteur standard de la PA, bascule) est cadré au départ.
  Les écrans et états de suivi Divalto de la compta se construisent par itérations de 2 semaines, dans une enveloppe
  fixée par le DAF : 10 jours d'intégrateur. PO (product owner : celui qui classe le backlog) de cette partie : la cheffe comptable.
  Itérations de février à avril (après la clôture annuelle, avant le pilote). Démarche validée par le DAF en octobre 2026.
  Pendant le congé de la cheffe comptable, Julie la supplée comme PO (désignée par écrit).
- Changements (module cp10) : sur le cœur, une demande qui touche le périmètre, le budget, une date validée ou un contrat
  = demande de changement (écrite, chiffrée, décidée par le DAF ou le COPIL, tracée au registre des changements).
  Dans ta délégation (module cp18), tu décides et tu informes. Dans la partie agile, une idée nouvelle va au backlog :
  la cheffe comptable la classe, dans l'enveloppe ; sortir de l'enveloppe = demande de changement.
  Gel des changements dès le début du pilote (mai) : seules passent les corrections d'anomalies bloquantes et les
  obligations légales. Lever le gel pour autre chose : décision du DAF, en connaissant le risque. Le gel vaut jusqu'à la fin
  de l'hypercare (vendredi 25 juin), partie agile comprise. Pas de budget de changement délégué sur DEMAT : chaque jour d'intégrateur
  en plus = une commande signée par le DAF.
- Contrats (module cp14) : PA = abonnement signé en novembre 2026 par le DAF (connecteur standard au 1er mars,
  pénalités de retard plafonnées et dues sans mise en demeure, SLA, plan B par le portail, réversibilité des données). Intégrateur Divalto = régie :
  bon de commande en jours (taux journalier), signé par le DAF ; des jours en plus = une nouvelle commande, signée avant
  de commencer. Taux journalier de l'intégrateur : environ 750 €. La commande prévoit la documentation
  du paramétrage (un livrable) et un changement de consultant sans surcoût, passation comprise. Toi : les clauses opérationnelles (périmètre, livrables, planning, recette, SLA, réversibilité).
  Les clauses juridiques (responsabilité, droit applicable) : le DAF, avec un avocat si besoin.
  Contrat de la PA (détails, module cp14) : 3 ans, reconduit chaque année, préavis de 6 mois ; mise en service du
  connecteur au forfait, en plus de l'abonnement ; le contrat et ses annexes priment sur les conditions générales de la PA ;
  annexe SLA : disponibilité 99,5 % par mois, mesurée jour et nuit ; support de 8 h à 18 h les jours ouvrés (prise en
  charge en 1 h, portail rétabli en 4 h ; délais comptés aux heures de support, dès le ticket ;
  priorités : 1 = tout est bloqué, 2 = une partie) ; réversibilité : export sous 30 jours, en format standard ; données de paramétrage dues à la PA le 15 janvier 2027.
- Choix de la PA (module cp13) : en octobre 2026, cahier des charges court tiré de la note de cadrage validée ; 3 PA consultées,
  toutes dans la liste officielle ; 2 semaines pour répondre ; grille pondérée fixée avant de lire les offres (connecteur
  Divalto, SLA, réversibilité, prix sur 3 ans, références de clients sous Divalto, solidité) ; démo sur les cas réels de la
  compta ; 2 finalistes présentées au DAF, qui choisit ; contrat signé en novembre 2026. Pas de service achats : le DAF achète.
  Intégrateur Divalto : le partenaire déjà en place, sans mise en concurrence pour DEMAT ; son devis (jours, profils, taux)
  est vérifié avant la commande.
  Détails (cp13) : cahier des charges de 8 pages ; 8 PA de la liste officielle ont un connecteur standard pour Divalto,
  3 consultées ; grille validée par le DAF avant les offres : éliminatoires (liste officielle ; connecteur standard pour
  Divalto ; réception possible dès novembre), puis 100 points (cas en démo 20, connecteur et sécurité 25, prix sur 3 ans 20,
  SLA 15, références sous Divalto 10, réversibilité 5, solidité 5) ; la compta note ses cas (6 cas réels, démos de 2 h),
  la DSI le connecteur et la sécurité, le chef de projet le prix ; 2 finalistes notées 78 et 74 ; négociation : support
  porté de 9 h-17 h à 8 h-18 h (d'où l'annexe SLA), portail du plan B inclus, export sous 30 jours. Lettres des QCM :
  A = la 1re (78), B = l'autre finaliste (74), C = écartée avant la fin ; le choix du DAF peut varier selon la question.
  Archivage : le contrat de novembre 2026 ne couvre pas la durée légale ; une option d'archivage est ajoutée par avenant
  en mars 2027 (cp14-q31, cp16-q39). C'est l'entreprise qui doit garder ses factures la durée légale ; elle choisit où.
- Budget et business case (modules cp11, cp12) : coût total sur 3 ans (TCO, la durée du contrat de la PA) = dépenses
  externes + temps interne (compta, ADV, DSI ; compté en jours dans le business case, pas dans le budget).
  Budget de référence des dépenses externes : 80 k€, validé par le DAF en novembre 2026, après les contrats, dans la
  fourchette du cadrage (60 à 90 k€). Détail : PA = abonnement 850 € par mois (30,6 k€ sur 3 ans) + mise en service au
  forfait 7,4 k€ ; intégrateur = 40 jours à 750 € (30 k€, en régie) ; formation et tests : 4 k€ ; réserve pour risques :
  8 k€ (liée au registre des risques ; chaque dépense passe par une commande ou un avenant signé par le DAF).
  L'abonnement est une charge (OPEX) ; ce qui peut être immobilisé (CAPEX) : le contrôleur de gestion le dit.
  Tolérance : rester sous 90 k€ ; au-delà, le DAF décide, prévenu le jour même (module cp04). « Ne rien faire » n'est pas
  une option (obligation légale) : le business case compare des façons de s'y conformer, et ses gains (fin de la
  ressaisie des factures fournisseurs, moins d'erreurs et de relances ; chiffres : module cp11).
  Chiffres du business case (cp11) : 8 000 factures par mois, dont 2 000 factures fournisseurs (les 400 hors connecteur
  = 5 %) ; ressaisie de 4 minutes par facture, 1 minute de contrôle avec le connecteur : 100 heures gagnées par mois, en
  temps (pas en argent) ; coût horaire chargé d'une comptable : 30 € (210 € la journée de 7 h) ; temps interne du projet :
  environ 100 jours ; option A (portail seul, ressaisie) : environ 45 k€ sur 3 ans ; gain plein quand les fournisseurs PME
  émettent (1er septembre 2027). Sous 90 k€ aussi, chaque dépense en plus reste une commande signée par le DAF.
  Suivi (cp12) : abonnement facturé de décembre 2026 à novembre 2029 (36 mensualités) ; mise en service : 3 700 € à la
  signature, 3 700 € au PV (30 avril, 2 réserves mineures) ; les 40 jours de l'intégrateur comprennent l'enveloppe des
  10 jours des écrans ; changements n° 7 (4 jours, faits en février) et n° 9 (3 jours, faits en mars), acceptés au COPIL
  du 9 février, 5 250 €, référence version 2 : 85 250 € ; jours faits de la commande de base : décembre 3, janvier 2,
  février 8, mars 11, avril 9, mai 4, juin 5 (42 sur 43) ; une facture par mois sur relevé validé. Fin mars : 1 flux EDI
  fini sur 3 prévus, reste à faire 19 jours, atterrissage 43 jours ; le DAF signe le jour même une commande de 3 jours ;
  engagé 81 100 €, consommé 30 350 € (le 1er jalon du forfait compte), facturé 19 850 €, atterrissage 87 500 € (réserve
  restante comprise), écart + 2 250 €. Archivage (avenant de mars) : 50 € par mois d'avril 2027 à novembre 2029, 1 600 €,
  pris sur la réserve (reste 6 400 €) ; intérimaire de la recette refusé en avril ; réserve rendue à la clôture.
  Clôture (juillet 2027) : 28 mensualités restantes (23 800 €) et l'archivage (50 € par mois jusqu'en novembre 2029),
  repris par le budget du run, qui porte aussi le risque
  de hausse de prix au renouvellement de 2029 (module cp07).
- Toi et ton DSI (modules cp02, cp03) : ton temps, environ 70 % sur DEMAT et 30 % sur le run (référent des flux EDI,
  en appui du support N2) et les petites demandes. Point de 30 minutes avec ton DSI chaque lundi : il arbitre tes priorités
  entre run et projet. Il attend : pas de surprise, des décisions préparées, faire faire plutôt que faire.
  Ton temps se compte en demi-journées : 7 sur DEMAT, 3 sur le run, sur 10. Un écart subi d'une semaine : tu le règles dans
  ta liste. Changer le partage (des jours du run pour DEMAT) ou un dépassement qui dure : ton DSI, au point du lundi (le jour
  même si une échéance tombe avant). Un jalon qui sort de la tolérance : le DAF, le jour même. Une heure d'aide d'un collègue
  de la DSI se demande en direct ; des jours de son temps, à ton DSI. Ta fiche du lundi : ce qui avance, ce qui coince, ce
  dont tu as besoin (module cp03). Ton DSI dispose du support N1-N2 et d'un administrateur réseau. Comme référent des flux
  EDI, tu as des droits sur le connecteur en production : tu n'y touches qu'en urgence réelle, ton DSI d'accord, testé,
  tracé, écrit à l'intégrateur.
- Gouvernance (module cp09) : COPIL (comité de pilotage) mensuel, le 2e mardi du mois, 1 h 30 : le DAF (sponsor : il
  préside et décide), toi (tu prépares, animes, écris le compte rendu), ton DSI, la cheffe comptable, le responsable ADV ;
  le contrôleur de gestion, la PA ou l'intégrateur sur invitation. Ordre du jour et rapport envoyés 3 jours ouvrés avant (le jeudi) ; compte
  rendu sous 24 h (décisions, actions, points ouverts) ; registre des décisions tenu par toi. Point projet chaque lundi, 1 h :
  toi, le consultant de l'intégrateur, Julie, Sophie, Marc (avancement, 15 minutes de revue des risques, actions) ; juste
  avant, 30 minutes avec le consultant seul : jours de la régie, reste à faire, blocages (module cp15). Le point projet suit
  et prépare, il ne décide ni du périmètre, ni du budget, ni des dates. Le DAF porte le projet au comité de direction. Comité fournisseur mensuel avec
  la PA (module cp15). RACI (R = réalise, A = approuve, un seul A par livrable, C = consulté, I = informé) : format de
  facture : R toi et l'intégrateur, A le DAF, C la cheffe comptable et le responsable ADV, I ton DSI ; PV de recette
  fournisseurs : R Julie, A la cheffe comptable ; PV de recette clients : R Sophie et Marc, A le responsable ADV ; go / no-go
  de la bascule : R toi (recommandation sur les critères), A le DAF, C la cheffe comptable, le responsable ADV et ton DSI,
  I le DG ; budget et dates validées : A le DAF.
- Reporting (module cp08) : rapport mensuel d'une page, envoyé avec l'ordre du jour du COPIL : météo globale et par axe
  (délai, budget, périmètre, qualité et risques), jalons (prévu, réel, prévision), décisions attendues, les 5 plus gros
  risques (module cp07), la ligne budget (module cp12). Météo : vert = dans les tolérances ; orange = risque de sortir des
  tolérances (cause, impact, plan, parfois une décision à demander) ; rouge = hors tolérance, une décision du sponsor est
  nécessaire. Tolérances : ± 2 semaines par jalon, budget sous 90 k€ (module cp04). Une alerte qui ne peut pas attendre
  le COPIL va au DAF le jour même (module cp07). Règles du modèle de DEMAT : la météo globale = l'axe le plus mauvais
  (ailleurs, le chef de projet juge parfois) ; seuil de l'axe qualité = les critères de succès (moins de 2 % de rejets le
  1er mois) ; rouge = la prévision est hors tolérance, ou le seuil déjà perdu ; orange avec une décision qui n'attend pas :
  le DAF le jour même (cp01-q09). Tableau de bord de l'équipe : 6 lignes (jalons, reste à faire, cas de recette joués et
  OK, anomalies bloquantes, rejets de la PA, atterrissage), chacune avec sa source et son seuil, à jour chaque vendredi ;
  anomalies de recette dans l'outil de tickets. 4 flux EDI (fin mars : 1 fini sur 3 prévus à cette date). Recette :
  120 cas en 6 semaines ; fin de la 3e semaine, 45 joués, PV prévu au 7 mai (orange), revenu au 30 avril. Rapport
  d'avril : délai orange (flux EDI en retard, recette lente) ; décision attendue : un intérimaire, environ 4 000 € (refusé).
- Planning (module cp05) : lots : réception par le portail (novembre 2026) ; paramétrage du connecteur (décembre à février,
  données de paramétrage dues le 15 janvier) ; écrans de la compta en itérations (février à avril) ; flux EDI de la grande
  distribution (février à avril) ; recette du 16 mars à fin avril (6 semaines + 1 semaine de marge de recette) ; formation
  et tests (avril à juin) ; pilote sur 1 site en mai ; bascule des 3 sites en juin ; marge légale juillet-août. Chemin
  critique : données de paramétrage (15 janvier) → paramétrage → connecteur livré (1er mars) → recette → PV (30 avril)
  → pilote (mai) → bascule (juin). Contraintes : clôture annuelle en janvier, gel des changements dès le pilote, pas de
  bascule en août. Jalons validés par le DAF ; tolérance de ± 2 semaines. Bascule le lundi 14 juin 2027 : dernier test
  le jeudi 10, go / no-go le vendredi 11 (le COPIL de juin est le mardi 8). Congé de la cheffe comptable : du 12 au
  30 avril 2027 (Julie la supplée).
- Recette (module cp19) : stratégie écrite au cadrage (périmètre, cas, critères d'acceptation, qui teste, qui signe) ;
  120 cas, préparés en janvier-février par Julie (fournisseurs), Sophie et Marc (clients) ; données de test : les vrais
  clients (le SIREN sert à l'acheminement), données personnelles masquées (cp01-q27) ; anomalies dans l'outil de tickets,
  classées bloquante (on ne peut plus facturer ou recevoir), majeure (contournement coûteux), mineure (gêne) ; tests de
  non-régression après chaque correctif ; recette du 16 mars au 30 avril ; PV : 0 anomalie bloquante ni majeure, des
  réserves mineures possibles avec une date de correction ; PV fournisseurs (signé par la personne que la cheffe
  comptable a désignée, pas Julie) et PV clients (responsable ADV) le 30 avril, avec 2 réserves mineures ; le PV ouvre le
  solde de la mise en service de la PA (cp12, cp14). Faits fixés par cp19 : stratégie d'une page, validée avec la note de
  cadrage (octobre 2026) ; environnement : une copie de Divalto réservée à la recette, à part de celle de l'intégrateur,
  reliée à l'espace de test de la PA ; correctifs livrés le mardi et le jeudi ; lot de non-régression de 20 cas clés,
  choisi en février, rejoué après chaque livraison ; les 2 réserves du PV (un libellé du PDF, un tri d'écran) sont
  corrigées par une version du connecteur, livrée et installée par la PA après le gel, comme ses correctifs (cp10-q41 ; aucun jour de l'intégrateur,
  cp12-q32), et datées au 9 juillet. Le gel vaut
  pour ce que le projet installe (connecteur, Divalto) ; une version de la PA commune à tous ses clients ne se gèle pas :
  on la teste avant (cp14-q05, cp15-q33).
- Reprise de données (module cp20) : vers la PA, environ 2 000 fiches clients et 600 fiches fournisseurs (SIREN, adresses
  de facturation et de livraison, catégorie de l'opération, e-mail de contact) ; dans Divalto, les codes TVA. En décembre
  2026, 300 fiches clients sans SIREN : nettoyage à la source, dans Divalto, par l'ADV (clients) et la compta
  (fournisseurs), avec l'utilitaire Divalto de contrôle Siret-Siren (cp15-q29). Propriétaires des données : le responsable
  ADV (clients), la cheffe comptable (fournisseurs). Règles de reprise écrites ; 2 essais à blanc (fin février, mi-mai
  pendant le pilote) ; contrôles : comptages, rapprochements, échantillons, validation par le métier (cp01-q23). Gel des
  tiers (créations et modifications) le vendredi 11 juin à 12 h ; reprise définitive le week-end des 12 et 13 juin :
  samedi, sauvegarde complète de Divalto, codes TVA, tiers vers la PA ; dimanche, contrôles et signatures des deux
  propriétaires, avant la bascule. Faits fixés par cp20 : Divalto a 3 400 fiches clients, environ 2 000 reprises (les
  professionnels en France, actifs depuis 2 ans ou avec un en-cours) ; table des codes TVA (ancien → nouveau), propriétaire
  la cheffe comptable ; AquaBleu : 30 fiches (une par magasin, même SIREN ; le routage Divalto vers la PA est par SIRET) ;
  essai 1 (fin février) : 2 600 fiches, 260 rejets, 18 heures ; essai 2 (week-end des 15 et 16 mai) : 26 rejets expliqués,
  13 heures, validé le dimanche 16 ; le critère de go « reprise validée » se juge sur l'essai 2. Pilote : les tiers du site
  pilote sont chargés dans la PA avant le pilote, avec les règles validées après l'essai 1 ; la reprise de juin charge les
  tiers des 3 sites.
- Bascule (module cp21) : critères de go fixés au COPIL du mardi 11 mai : 0 anomalie bloquante ou majeure ouverte ; PV
  signés ; pilote : moins de 2 % de rejets sur ses 2 dernières semaines ; reprise des tiers validée par le métier ;
  formation faite ; retour arrière testé. Go / no-go le vendredi 11 juin à 14 h (A le DAF, sur ta recommandation ; module
  cp09). Plan de bascule heure par heure, du vendredi 11 au lundi 14 (qui fait quoi, contrôles, contacts). Retour
  arrière : repasser par le portail de la PA (le plan B), décidé au plus tard le lundi 14 à 12 h. Hypercare (support
  renforcé) de 2 semaines, du 14 au 25 juin, point chaque jour à 9 h 30 ; puis passage en run (module cp22). Le gel des
  changements court jusqu'à la fin de l'hypercare, le vendredi 25 juin. Retour arrière testé fin mai (Sophie émet et Julie
  reçoit quelques factures par le portail). Retour arrière décidé par le DAF, sur ta recommandation (absent : la personne
  qu'il a désignée par écrit) ; signal d'alerte : plus de 5 % de rejets le lundi matin (il déclenche l'appel au DAF, pas le
  retour arrière). Messages au DAF et à ton DSI samedi et dimanche à 18 h. Répétition de toute la bascule sur
  l'environnement de test (la reprise des tiers, elle, se répète par ses essais à blanc : module cp20). Lundi 8 h : Marc vérifie les 1res factures EDI d'AquaBleu. Hypercare : point de 20 minutes (toi,
  le consultant, Julie, Sophie, Marc, le N2), 3 lignes au DAF chaque soir ; une majeure : contournement, correction après
  le gel (sauf décision du DAF).
- Passage en run et clôture (module cp22) : fin de l'hypercare le vendredi 25 juin si ses critères de sortie, fixés avant la
  bascule, sont tenus (aucune anomalie bloquante ouverte, rejets sous 2 % sur la semaine, le support formé : le N2 a
  refait seul chaque procédure) ; la prolonger ou la finir plus tôt : le DAF décide, ton DSI consulté. Transfert au support N1-N2 de la
  DSI avec un dossier d'exploitation (flux, contacts de la PA et de l'intégrateur, procédures : rejets, avoirs, panne du
  connecteur, retour au portail ; supervision ; droits ; calendrier des versions), accepté par écrit par le N2 ; le run est
  porté par ton DSI. Clôture au COPIL du mardi 13 juillet 2027 : bilan (date, budget, qualité, adoption), retour
  d'expérience avec l'équipe (le mercredi 30 juin, avant la clôture comptable de juin), bilan des fournisseurs (module cp15), réserve rendue (6 400 €, cp12), mensualités restantes
  et archivage au budget du run ; les 2 réserves du PV corrigées le 9 juillet (cp19). Comité fournisseur avec la PA : tenu par toi
  jusqu'à fin 2027, puis par le support N2 ; ton DSI en reste responsable. L'adoption et les gains se mesurent au 3e mois
  (septembre 2027), par la cheffe comptable (cp11).
- Conduite du changement (module cp23) : populations : la compta (6 personnes et la stagiaire), l'ADV (le responsable,
  Marc et ses collègues), les 3 responsables de site, les commerciaux (ils répondent aux clients), le DAF et la direction ;
  dehors : les clients EDI (par le commercial) et les fournisseurs (par la compta). Utilisateurs clés : Julie
  (fournisseurs), Sophie (clients), Marc (EDI), relais dans leur équipe. Formation : la compta du 3 au 28 mai, sessions
  de 2 h sur les vrais cas, animées par Julie et Sophie avec le consultant ; une 3e session en juin (2 personnes en plus,
  cp12) ; l'ADV : 2 ateliers (le 3e refusé par le DAF, cp17) ; fin mai, 90 % : 9 présences signées sur 10 prévues (5 personnes à former : la cheffe
  comptable, les 3 comptables, la stagiaire ; 2 sessions, « recevoir » et « émettre »). La cheffe comptable
  est inquiète : la charge pendant la clôture, la peur des rejets. Adoption mesurée au 3e mois (septembre 2027) : plus
  aucune facture reçue par la PA ressaisie à la main (cp04). Une facture qu'aucune PA n'envoie se saisit encore, sans
  être un contournement : papier ou PDF d'une PME, pas tenue d'émettre avant le 1er septembre 2027 ; PDF d'un fournisseur
  étranger, hors PA (cp19-q15, cp06-q35). Gain plein quand les fournisseurs PME émettent (1er septembre 2027, cp11).
  Faits fixés par cp23 : pilote dès le lundi 3 mai, ses factures traitées par Julie et Sophie la 1re semaine ; sessions
  hors des jours de clôture ; 3e session de juin (entre le 8 et le 10, après la clôture de mai et avant le go) ;
  commerciaux : une page et 10 minutes début juin ; lettre aux 600 fournisseurs ; juillet 1 200 factures par la PA et
  800 à la main, août 1 300 et 700 ; après l'hypercare, un point toutes les 2 semaines avec les relais, repris par la
  cheffe comptable à la clôture ; nouvelle comptable en novembre 2027, formée par Julie.
- Pilotage des prestataires (module cp15) : point hebdo avec le consultant de l'intégrateur (jours consommés, reste à faire,
  alerte à 80 % de la commande) ; comité fournisseur mensuel avec le chef de projet de la PA (SLA, retards, plan d'actions
  daté), avec son responsable de compte s'il le faut. Écarts au SLA : pénalités sous forme de crédits sur l'abonnement,
  plafonnées ; le DAF décide de les appliquer. Support : N1 et N2 = le support de la DSI ; N3 = la PA ou l'intégrateur,
  par ticket. Divalto : l'éditeur publie les versions ; l'intégrateur est son partenaire et assure le support Divalto ;
  il remonte à Divalto les bugs du standard. Chiffres : commande de l'intégrateur de 40 jours (environ 30 k€) ;
  12 spécifiques Divalto en octobre 2027 (25 plus tard) ; connecteur de la PA : version 2 disponible au printemps 2027,
  version 1 maintenue jusqu'en décembre 2027, passage en version 2 à la mi-novembre ; environ 400 factures par mois
  hors connecteur (5 %), déposées sur le portail par Sophie.
  Après la clôture du projet (juillet 2027), le comité fournisseur mensuel avec la PA continue : le chef de projet le tient
  jusqu'à fin 2027 ; le passage au run (module cp22) dira qui le reprend.
- Conformité (module cp24) : RGPD : l'entreprise est responsable du traitement (représentée par le DG). DPO externe
  (un cabinet), désigné sans obligation : il conseille et contrôle, il ne décide pas. Registre des traitements tenu
  avec lui : chaque service décrit les siens (le traitement « factures » a été mis à jour avec le DPO en novembre 2026,
  à la signature de la PA, nouveau sous-traitant). La PA et l'intégrateur sont sous-traitants (contrat, module cp14).
  Violation de données (fichier perdu ou envoyé au mauvais destinataire, compte piraté) : on la stoppe, on prévient le
  DPO le jour même (par écrit s'il est injoignable ; pendant DEMAT, ton DSI et le DAF aussi) ; notifiée à la CNIL dans
  les meilleurs délais, 72 h au plus tard (week-end compris) après en avoir pris connaissance,
  sauf si elle ne présente pas de risque pour les personnes (décision de la direction, sur l'avis du DPO, qui fait la
  déclaration) ; toute violation, même non notifiée, est notée au registre interne ; les personnes sont prévenues si
  le risque est élevé. Droit à l'effacement : il ne vaut pas pour ce qu'une loi oblige à garder (factures : durée
  légale). Sécurité : droits d'accès à Divalto et à la PA revus chaque année par chaque manager, sur la liste fournie
  par la DSI ; comptes des prestataires fermés à la clôture (cp22) ; charte informatique : aucune donnée de
  l'entreprise dans un outil en ligne non validé par la DSI.
  Faits fixés par cp24 : la direction décide de notifier (le DG représente l'entreprise) ; le registre interne des
  violations est tenu avec le DPO ; une demande d'une personne (accès, effacement) est traitée par le service qui tient
  ses données (l'ADV pour les clients, la compta pour les fournisseurs), avec l'aide du DPO, réponse sous un mois ;
  chaque consultant a un accès à son nom, ouvert par ticket ; le compte d'un prestataire se ferme à son départ ; un
  droit donné pour la recette se retire après, sur décision du manager ; l'avenant d'archivage de mars 2027 met à jour
  la ligne « factures » du registre (durée, lieu, accès) ; DSI adjoint, 2028 : plan classé par le risque (comptes à
  privilèges fin février, revue des accès fin mars, NIS2 vérifiée avant tout budget).
- Portefeuille (module cp25) : toute demande à la DSI arrive sur une fiche d'une page (besoin, sponsor, valeur,
  obligation, urgence, charge estimée). Moins de 5 jours : petite demande, classée chaque lundi par le DSI (par toi,
  DSI adjoint). 5 jours et plus : un projet, classé une fois par trimestre au comité de direction : le DSI propose un
  seul classement, sur des critères écrits et connus d'avance (obligation légale vérifiée, valeur, risque de ne pas
  faire, coût, capacité de la DSI et des métiers) ; le DG arbitre. Capacité : environ 60 % du temps de l'équipe va au
  run, le reste aux projets. Un projet reporté ou arrêté se dit à son sponsor, avec la raison. Toi, chef de projet :
  tu ne choisis pas entre les projets ; tu donnes les faits (charge, dates, conflits de ressources) à ton DSI, qui
  arbitre ou fait arbitrer (cp05, cp22). Demandes pour 2028 : migration de Divalto vers sa prochaine version majeure
  (environ 100 jours d'intégrateur, 75 k€, hors adaptation des spécifiques, cp11), WMS (logiciel d'entrepôt) des
  3 dépôts (sponsor : le directeur logistique), CRM (gestion des clients) et prise de commande des commerciaux
  (sponsor : le directeur commercial), portail fournisseurs (sponsor : le DAF), tableaux Power BI des ventes, sécurité
  (double authentification, sauvegardes), refonte de l'intranet. Une demande de quelques heures, dans un créneau run, se fait sans fiche (cp02-q08). Faits fixés par cp25 : capacité
  de la DSI en 2028 : 8 personnes × environ 200 jours = 1 600 jours ; run environ 60 % = 960 ; projets 640. Demandes
  2028 (jours de la DSI ; dépenses externes ; gain ; sponsor) : sécurité 60 j, 20 k€, un risque évité, le DSI ;
  migration de Divalto 200 j (en plus des 100 jours d'intégrateur), 75 k€ hors spécifiques, environ 86 k€ avec eux
  (cp11-q14), gain direct faible, le DAF ; WMS 300 j, 150 k€, 100 k€ par an, après la migration, le directeur
  logistique ; tableaux Power BI des ventes (un 2e lot, après le projet Snowflake + Power BI) 40 j, 0 € externe (faits
  en interne), 15 k€ par an, le directeur commercial ; CRM 100 j, 40 k€, gain non chiffré, le directeur commercial ;
  prise de commande 80 j, 60 k€ (cp06-q29), 40 k€ par an, après le CRM, le directeur commercial ; portail fournisseurs
  60 j, 30 k€ (besoin encore flou, cp06-q30), 10 k€ par an, « obligatoire » annoncé mais faux (tout passe par la PA),
  le DAF ; intranet 50 j, 15 k€, gain faible, le DG. Total 890 jours pour 640 ; 390 k€ (401 k€ avec les spécifiques).
  Critères validés par le DG, envoyés aux directeurs en décembre 2027. Comité de janvier 2028 : retenus la sécurité,
  la migration, le WMS, les tableaux Power BI des ventes (600 jours, 245 k€, environ 256 k€ avec les spécifiques) ;
  pas maintenant, revus en avril : CRM, prise de commande, portail, intranet. Calendrier : migration de janvier à juin
  2028 ; WMS : consultation des éditeurs dès janvier, mise en place après la migration, hors saison. Juin 2028 : la
  migration glisse de 3 mois, le WMS aussi. Février 2029 : le portail, retenu plus tard, est arrêté (25 k€ dépensés,
  35 k€ encore nécessaires, le double du devis ; 3 fournisseurs sur 600 intéressés). Mars 2029 : WMS à 210 k€ au lieu
  de 150, 20 k€ pour le finir, gain maintenu. Les tableaux Power BI des ventes et l'intranet, déjà demandés pendant
  DEMAT (cp01-q28), avaient attendu.
- Manager l'équipe (module cp26) : rituels : réunion d'équipe le lundi à 9 h (30 minutes : priorités, blocages,
  entraide) ; un point individuel de 30 minutes toutes les 2 semaines avec chacun ; entretiens annuels en janvier
  (bilan, objectifs de l'année, besoins de formation ; critères connus d'avance). L'entretien annuel d'évaluation est
  une règle de l'entreprise, pas de la loi. La loi impose l'entretien de parcours professionnel (loi du 24 octobre 2025,
  vérifié le 1er novembre 2026 ; avant, « entretien professionnel » tous les 2 ans) : la 1re année après l'embauche,
  puis tous les 4 ans, avec un état des lieux récapitulatif tous les 8 ans ; il porte sur le parcours, les compétences
  et la formation, pas sur l'évaluation du travail ; un document écrit, copie remise au salarié. Ne citer ni sanction,
  ni montant. En cas de doute sur une règle du travail : la RH. Les consultants des prestataires ne se managent pas
  comme des salariés (cp15).
  Faits fixés par cp26 : nomination annoncée par le DSI le vendredi 26 novembre 2027 (DSI adjoint au 1er décembre ;
  l'équipe l'apprend le lundi 29) ; ta 1re semaine, 30 minutes avec chacun des 8 ; 1re réunion d'équipe le lundi 6
  décembre 2027 ; Théo (N2) tient le comité fournisseur avec la PA dès janvier 2028 (ton DSI en reste responsable) ;
  Léa pilote les tableaux Power BI des ventes en 2028, avec Lucas, puis le CRM quand il est retenu (cp23-q42) ; Karim,
  à plein temps sur la migration pilotée par Nicolas, décide des mises à jour de Divalto, avec un plan de tests ;
  depuis ta nomination, Hugo suit seul les flux de la grande distribution (le référent EDI de cp03-q39) ; novembre
  2028 : depuis la migration (en service fin septembre, cp27), le run prend 80 % du temps de l'équipe ; Hugo quitte
  l'entreprise fin avril 2029 (annonce en février), Théo reprend son savoir en binôme ; sa remplaçante, analyste EDI,
  arrive le mercredi 2 mai 2029. En plus des rituels, les questions du jour se regroupent : un point court le matin,
  une porte ouverte à heure fixe (cp02-q41). Loi : article L6315-1, dans la rédaction de la loi du 24 octobre 2025
  (complétée par la loi du 30 décembre 2025 pour le congé de naissance) ; un accord collectif peut fixer un rythme
  plus court, jamais plus de 4 ans. Une performance insuffisante n'est pas en soi une faute : ne pas parler de
  sanction ; la suite, la RH la conseille.
- Budget SI annuel (module cp27) : le budget de l'année N se prépare en septembre-octobre N-1 (le DSI et toi, DSI
  adjoint, avec le contrôleur de gestion), se présente au comité de direction en novembre, et le DG le décide en
  décembre (le DAF consulté). Exception, le budget 2028 : préparé à l'automne 2027 par ton DSI (toi, chef de projet
  DEMAT, tu lui donnes le run de DEMAT) ; DSI adjoint dès décembre 2027, tu le défends devant le DG avant sa décision,
  puis tu le suis. Il comprend le run (contrats, licences, abonnements, matériel, télécoms), les projets (une
  enveloppe votée en décembre, répartie au comité de portefeuille de janvier, cp25) et la masse salariale de la DSI
  (10 personnes : le DSI, toi et l'équipe de 8 ; suivie avec la RH, qui donne le taux d'augmentation). CAPEX ou OPEX :
  le contrôleur de gestion le dit. Un budget annuel ne compte que les mois de son année (cp22-q17). Suivi mensuel avec
  le contrôleur de gestion (le réel, l'écart et sa cause, la prévision) : dans le total voté, le DSI compense entre
  ses lignes ; au-delà, le DG décide, le DAF consulté ; ce qui se libère dans l'enveloppe, le DG en décide. Révision
  en juin, ligne par ligne. Chaque projet clos ajoute du run, chiffré à la clôture (cp22). Un échéancier des contrats
  (fin, préavis, propriétaire), relu à chaque budget.
  Faits fixés par cp27 : budget 2028 = 1 119 k€ (run 200 k€ + enveloppe 256 k€ + masse salariale 663 k€ : 650 k€ en
  2027, + 2 %). Base : le réel de 2027 (run 193,7 k€). Run 2028 : abonnement de la PA 10 200 €, archivage 600 €, le
  reste 189,2 k€, stable ; + 6,3 k€ = DEMAT en année pleine (le run de 2027 n'en a payé que 5 mois : 4 250 € et 250
  €). Enveloppe 2028 : sécurité 20 k€, migration 86 k€ (spécifiques compris), WMS 150 k€, tableaux Power BI des ventes
  0 €. Page du DG : la loi (PA et archivage, 10,8 k€), l'existant (189,2 k€), l'équipe (663 k€), les projets (256 k€).
  Juin 2028 : la migration sera en service fin septembre ; le WMS (prévu de juillet à décembre, 25 k€ par mois)
  commence en octobre : 75 k€ en 2028, 75 k€ au budget 2029. Le projet sécurité, clos fin mai 2028, laisse au run 400
  € par mois (2 800 € en 2028, 4 800 € en 2029). Budget 2029 (septembre-octobre 2028, le DSI et toi) : la PA, 11 mois
  au prix du contrat (9 350 €), puis décembre selon une hypothèse écrite (le contrat arrive à échéance fin novembre
  2029 et se reconduit, sauf préavis de 6 mois : le DAF choisit avant fin mai 2029) ; le coût d'un changement de PA
  (environ 15 000 €, cp13-q43) sur une ligne visible ; l'archivage, 550 €, puis décembre à prévoir.

**Le calendrier**
- Octobre 2026 : cadrage.
- Novembre 2026 : PA choisie, contrat signé par le DAF (date du connecteur, pénalités) ; réception activée via le portail de la PA.
- Janvier 2027 : clôture annuelle, compta peu disponible ; préparation des cas de test (janvier-février).
- 1er mars 2027 : livraison du connecteur prévue au contrat. 15 mars : déclencheur du plan B s'il n'est pas livré.
  Le plan B part seul quand son déclencheur est atteint : personne ne le « tranche ». Le 15 mars n'est pas une date du contrat.
- Du 16 mars à fin avril : recette (6 semaines + 1 semaine de marge de recette). Mai : pilote sur 1 site.
- Juin 2027 : bascule de tous les sites (jamais en août ; report à mi-juillet possible sur décision du DAF).
- Juillet-août : marge légale. 1er septembre 2027 : émission et e-reporting obligatoires.

**Les personnages (rôles fixes)**
- **Toi** : chef de projet SI, rattaché au DSI. Tu n'es le manager de personne (sauf questions qui commencent par « Tu es DSI adjoint »).
- **« Tu es DSI adjoint »** (cadre des questions qui commencent ainsi, dans tous les modules ; surtout bloc E, cp24 à cp27) : même entreprise,
  plus tard (2028 et après, sauf date donnée ; tu l'es dès décembre 2027, pour préparer le classement de 2028,
  cp25-q17, q18, et défendre le budget 2028 devant le DG, cp27). Exception : cp01-q28 et cp02-q42 te placent, par hypothèse, DSI adjoint pendant DEMAT, piloté par un autre chef de projet : des exercices de posture, hors du calendrier. Tu es l'adjoint du DSI et tu le remplaces en son absence. Tu manages
  l'équipe de la DSI, 8 personnes : 2 chefs de projet (dont une junior), un analyste Divalto, un développeur Power BI et
  SQL, un analyste EDI, 2 techniciens du support N1-N2, un administrateur réseau. Le comité de direction (mensuel) :
  le DG (il arbitre), le DAF, le directeur commercial, le directeur logistique, le DSI.
  Prénoms de l'équipe (cp26, cp27) : Nicolas, chef de projet senior, ancien développeur (la migration de Divalto, puis
  le WMS), candidat au poste de DSI adjoint que tu as obtenu ; Léa, cheffe de projet junior ; Karim, analyste Divalto ;
  Lucas, développeur Power BI et SQL ; Hugo, analyste EDI (jusqu'à fin avril 2029 ; sa remplaçante arrive le 2 mai 2029) ; Samia (N1) et Théo (N2), au support ; Yann, administrateur
  réseau. La responsable RH (ressources humaines) conseille les managers.
- **DAF (directeur administratif et financier)** : sponsor, manager de la cheffe comptable, signe les contrats, pressé.
- **DG (directeur général)** : au-dessus du DAF ; niveau 4 de l'échelle d'escalade. **DSI** : ton responsable.
- **Cheffe comptable** : inquiète ; manager de Julie et Sophie ; seule à savoir traiter les avoirs fournisseurs ;
  signe la recette des factures fournisseurs ; en congé 3 semaines pendant la recette ; avant son congé, elle désigne par
  écrit qui signe le PV du 30 avril (pas Julie, R des tests) ; le DAF est informé.
- **Julie** : comptable fournisseurs depuis 8 ans ; utilisatrice clé de la réception ; formée comme suppléante sur les avoirs fournisseurs.
- **Sophie** : comptable clients ; utilisatrice clé des factures émises et des avoirs clients.
- **Responsable ADV (administration des ventes)** : manager de Marc ; signe la recette des factures clients.
- **Marc** : assistant ADV, utilisateur clé ; seul à savoir reprendre les flux EDI rejetés.
- **Contrôleur de gestion** : porte le e-reporting (délégation du DAF) ; avis CAPEX / OPEX.
- **Le commercial** : veut « juste que ça marche » ; aucune autorité sur l'ADV ni la compta.
- **Responsable de site** : dirige un des 3 dépôts.
- **Intégrateur Divalto** : en régie ; installe et paramètre le connecteur ; un seul consultant connaît le paramétrage.
- **La PA** : en retard ; on parle à son chef de projet, puis à son responsable de compte.

**Vocabulaire unique**
- « plateforme agréée (PA) », puis « la PA ». Jamais « API ». Sponsor = le DAF. « COPIL (comité de pilotage) ».
- Bascule = mise en service. Recette = tests de validation par le métier.
- « Le jour même » pour l'urgence dans les cours (les QCM peuvent varier les mots).
- « Marge de recette » (dans le planning) ≠ « marge légale » (juillet-août).
- Escalader = monter d'un niveau (cp16). « Escalader » au sens PMBOK (cp07) = remettre un risque à son porteur.
- Monter d'un niveau (échelle de cp16 : la personne → son manager → le sponsor → le DG) : quand le niveau actuel refuse
  ta 2e proposition chiffrée, recommence après que tu lui en as parlé, ou ne répond pas malgré une demande claire et une
  date limite. L'enjeu fort (date légale) n'est exigé que pour le niveau 4 (DG). Toujours prévenir le niveau qu'on dépasse.
  Exception : le sponsor qui dit non en connaissant le coût a décidé. C'est une décision, on applique (pas de DG).
- Décision par défaut : seulement pour un détail de ton projet (ex. le modèle de PV). Jamais pour le périmètre, le budget,
  un contrat ou le temps d'un autre service.

## Le plan (27 modules)

| Sous-parcours | Modules |
|---|---|
| 0. Démarrer | cp01 Bilan de départ · cp02 S'organiser et tenir sous pression |
| A. Cadrer et piloter | cp03 Le rôle attendu par un DSI · cp04 Cadrer un projet · cp05 Planifier · cp06 Choisir sa démarche · cp07 Gérer les risques · cp08 Piloter et reporter · cp09 Gouvernance et RACI · cp10 Les demandes de changement |
| B. Argent et prestataires | cp11 Budget et business case · cp12 Suivre le budget · cp13 Consulter et choisir un prestataire · cp14 Contracter · cp15 Piloter prestataires et éditeurs |
| C. Posture et comportement | cp16 Diriger sans autorité · cp17 Communiquer : le bon message, les mots justes · cp18 Dire non, arbitrer, gérer un conflit |
| D. Livrer et passer en run | cp19 La recette · cp20 La reprise de données · cp21 Bascule et go / no-go · cp22 Passage en run et clôture · cp23 Conduite du changement |
| E. Vers DSI adjoint | cp24 Conformité dans un projet SI · cp25 Portefeuille et priorisation · cp26 Manager une équipe · cp27 Budget SI annuel et direction générale |

**Priorités (expert)** : cp04 Cadrer, cp08 Piloter et reporter, cp11 Business case. cp01 en échauffement.

## Les outils de gestion de projet

La section Outils du site (`#/outils`, `docs/outils.md`) propose des modèles d'outils tirés de ce parcours, avec un
exemple DEMAT 2027. Leurs règles (échelles, seuils, rubriques, mots) sont celles des cours, mot pour mot : un cours qui
change une règle doit faire vérifier ses outils (`data/outils/gp-*.js`).

| Outil | Type | Cours |
|---|---|---|
| Note de cadrage (`gp-cadrage`) | document | cp04, cp06 |
| Registre des risques (`gp-risques`) | tableau | cp07, cp08 |
| Matrice RACI (`gp-raci`) | matrice | cp09 |
| Compte rendu de réunion (`gp-compte-rendu`) | document | cp09, cp17, cp15 |
| Rapport du COPIL et météo (`gp-rapport`) | document | cp08, cp09, cp05 |
| Note de décision : options chiffrées (`gp-options`) | document | cp03, cp17, cp18, cp16, cp10 |
| Registre des décisions (`gp-decisions`) | tableau | cp09 |
| Registre des changements (`gp-changements`) | tableau | cp10 |
| Suivi du budget (`gp-budget`) | document | cp12, cp15 |
| Business case : le coût sur 3 ans (`gp-business-case`) | document | cp11 |
| Cahier de recette (`gp-recette`) | document | cp19, cp08 |
| Go / no-go et plan de bascule (`gp-bascule`) | document | cp21, cp20 |
