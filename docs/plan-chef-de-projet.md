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

**Le calendrier**
- Octobre 2026 : cadrage.
- Novembre 2026 : PA choisie, contrat signé par le DAF (date du connecteur, pénalités) ; réception activée via le portail de la PA.
- Janvier 2027 : clôture annuelle, compta peu disponible ; préparation des cas de test (janvier-février).
- 1er mars 2027 : livraison du connecteur prévue au contrat. 15 mars : déclencheur du plan B s'il n'est pas livré.
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
