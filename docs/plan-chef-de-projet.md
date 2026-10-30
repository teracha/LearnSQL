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

**La réglementation (vérifiée en octobre 2026)**
- Réception des factures électroniques : obligatoire pour toutes les entreprises depuis le 1er septembre 2026 (l'entreprise est déjà en retard).
- Émission et e-reporting : obligatoires pour les PME au 1er septembre 2027.
- Tout passe par une plateforme agréée (PA, ex-PDP). Facture électronique = B2B en France.
- Nouvelles mentions obligatoires, dont le SIREN du client : sans lui, la facture ne peut pas être acheminée (rejet).
- La DGFiP publie sur impots.gouv.fr la liste officielle des PA immatriculées : on choisit dans cette liste
  (un comparateur privé ne la remplace pas).
- E-reporting = ventes aux particuliers, opérations avec l'étranger (UE et hors UE), données de paiement.
- Une facture émise ne se modifie pas (intégrité dès l'émission) : on la corrige par un avoir ou une facture rectificative.
- Conservation des factures : 6 ans (fiscal), 10 ans (Code de commerce). « Durée légale » suffit dans les questions.
- Des amendes existent (article 1737 du CGI), mais leurs montants ont changé en 2026 : ne pas citer de montant.

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
  de la bascule (juin), partie agile comprise. Pas de budget de changement délégué sur DEMAT : chaque jour d'intégrateur
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
  Clôture (juillet 2027) : 28 mensualités restantes (23 800 €), reprises par le budget du run, qui porte aussi le risque
  de hausse de prix au renouvellement de 2029 (module cp07).
- Toi et ton DSI (modules cp02, cp03) : ton temps, environ 70 % sur DEMAT et 30 % sur le run (référent des flux EDI,
  en appui du support N2) et les petites demandes. Point de 30 minutes avec ton DSI chaque lundi : il arbitre tes priorités
  entre run et projet. Il attend : pas de surprise, des décisions préparées, faire faire plutôt que faire.
- Gouvernance (module cp09) : COPIL (comité de pilotage) mensuel, le 2e mardi du mois, 1 h 30 : le DAF (sponsor : il
  préside et décide), toi (tu prépares, animes, écris le compte rendu), ton DSI, la cheffe comptable, le responsable ADV ;
  le contrôleur de gestion, la PA ou l'intégrateur sur invitation. Ordre du jour et rapport envoyés 3 jours avant ; compte
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
  le COPIL va au DAF le jour même (module cp07).
- Planning (module cp05) : lots : réception par le portail (novembre 2026) ; paramétrage du connecteur (décembre à février,
  données de paramétrage dues le 15 janvier) ; écrans de la compta en itérations (février à avril) ; flux EDI de la grande
  distribution (février à avril) ; recette du 16 mars à fin avril (6 semaines + 1 semaine de marge de recette) ; formation
  et tests (avril à juin) ; pilote sur 1 site en mai ; bascule des 3 sites en juin ; marge légale juillet-août. Chemin
  critique : données de paramétrage (15 janvier) → paramétrage → connecteur livré (1er mars) → recette → PV (30 avril)
  → pilote (mai) → bascule (juin). Contraintes : clôture annuelle en janvier, gel des changements dès le pilote, pas de
  bascule en août. Jalons validés par le DAF ; tolérance de ± 2 semaines. Bascule le lundi 14 juin 2027 : dernier test
  le jeudi 10, go / no-go le vendredi 11 (le COPIL de juin est le mardi 8). Congé de la cheffe comptable : du 12 au
  30 avril 2027 (Julie la supplée).
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
- **DAF (directeur administratif et financier)** : sponsor, manager de la cheffe comptable, signe les contrats, pressé.
- **DG (directeur général)** : au-dessus du DAF ; niveau 4 de l'échelle d'escalade. **DSI** : ton responsable.
- **Cheffe comptable** : inquiète ; manager de Julie et Sophie ; seule à savoir traiter les avoirs fournisseurs ;
  signe la recette des factures fournisseurs ; en congé 3 semaines pendant la recette.
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
| A. Cadrer et piloter | cp03 Le rôle attendu par un DSI · cp04 Cadrer · cp05 Planifier · cp06 Choisir sa démarche · cp07 Gérer les risques · cp08 Piloter et reporter · cp09 Gouvernance et RACI · cp10 Demandes de changement |
| B. Argent et prestataires | cp11 Budget et business case · cp12 Suivre le budget · cp13 Choisir un prestataire · cp14 Contracter · cp15 Piloter prestataires et éditeurs |
| C. Posture et comportement | cp16 Diriger sans autorité · cp17 Communiquer : le bon message, les mots justes · cp18 Dire non, arbitrer, gérer un conflit |
| D. Livrer et passer en run | cp19 La recette · cp20 La reprise de données · cp21 Bascule et go / no-go · cp22 Passage en run et clôture · cp23 Conduite du changement |
| E. Vers DSI adjoint | cp24 Conformité · cp25 Portefeuille et priorisation · cp26 Manager une équipe · cp27 Budget SI annuel et direction générale |

**Priorités (expert)** : cp04 Cadrer, cp08 Piloter et reporter, cp11 Business case. cp01 en échauffement.
