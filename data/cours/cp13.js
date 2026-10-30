// Chef de projet SI — Fiche de cours du module cp13 « Consulter et choisir un prestataire ».
// Fond : pratiques reconnues des achats informatiques en PME / ETI, et PMBOK (gestion des approvisionnements :
// « conduire les approvisionnements » ; critères de sélection fixés avant les offres ; mêmes réponses pour tous les
// candidats ; estimation indépendante pour vérifier un devis ; négociation avant la signature).
// Les pratiques divergent sur la négociation (avec les 2 finalistes en parallèle, ou avec le 1er, le 2e en réserve) :
// le cours garde ce qui est commun (une solution de rechange, gardée jusqu'à la signature).
// - Consulter ou pas : enjeu, montant, durée, plusieurs prestataires → consulter ; petit montant ou partenaire en place
//   sur l'ERP → un devis vérifié (jours par tâche, profil, taux, inclus, comparés à un projet passé) ; partenaire qui a
//   déçu, sur un gros projet → consulter, lui compris ; l'urgence raccourcit la consultation, sans la supprimer.
// - Le cahier des charges : tiré de la note de cadrage (cp04) ; le besoin et les contraintes, pas la solution ; la forme
//   des réponses (un même tableau de prix) ; les dates, tirées du planning ; court. Liste longue → liste courte (2 ou 3) ;
//   une PA dans la liste officielle ; RFI avant RFP quand le marché est mal connu.
// - Les mêmes règles pour tous : mêmes informations (questions et réponses à tous, sans dire qui a demandé), même délai,
//   offres confidentielles ; éthique (invitations refusées pendant la consultation, lien déclaré, intégrateur partenaire
//   d'une PA : lien écrit, même grille).
// - La grille : critères et poids avant les offres, validés par le DAF ; éliminatoires à part (la loi est un filtre :
//   cp18) ; chacun note son domaine ; prix sur 3 ans, tout compris (TCO, sans refaire le business case : cp11).
// - Vérifier : démo sur tes cas, références comparables, solidité, promesse notée comme une promesse, POC si doute fort.
// - Négocier, décider, répondre : solution de rechange (MESORE, cp18) jusqu'à la signature ; pas que le prix ; jamais
//   l'obligation légale ; une page de recommandation ; le DAF choisit et signe ; une réponse écrite aux non-retenus.
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Choix de la PA
// (module cp13) » : octobre 2026, cahier des charges court tiré de la note validée, 3 PA de la liste officielle,
// 2 semaines pour répondre, grille fixée avant les offres, démo sur les cas réels de la compta, 2 finalistes, le DAF
// choisit, contrat signé en novembre 2026 ; intégrateur en place sans mise en concurrence, devis vérifié (40 jours,
// environ 750 € le jour). Réception obligatoire depuis septembre 2026 : l'entreprise est en retard. Aucun montant d'amende.
// Page Divalto utilisée (base documentaire Divalto 10.13, lecture seule) : « Gérer son WMS 10.13 » (le module WMS est
// intégré à Divalto Commerce & logistique, sans interface).
// Faits ajoutés (exemples, cohérents avec la fiche, à valider) : cahier des charges de 8 pages ; grille d'exemple validée
// par le DAF avant les offres (éliminatoires : liste officielle, connecteur standard pour Divalto, réception possible dès
// novembre ; pondérés : tes cas en démo 20, connecteur Divalto et sécurité 25, prix sur 3 ans 20, SLA 15, références
// sous Divalto 10, réversibilité 5, solidité 5) ; le critère « tes cas en démo » complète la liste de la fiche ;
// 6 cas réels en démo ; finalistes notés 78 et 74 sur 100.
// Affirmations juridiques hors fiche (générales, à faire vérifier) : une entreprise privée n'a pas les règles de la
// commande publique (elle consulte selon ses propres règles) ; la loi impose de garder les factures la durée légale,
// et laisse choisir où (la PA ou un autre service) (un autre service d'archivage peut le faire).
// Frontières :
// - cp04 = cadrer AVANT de consulter (note de cadrage ≠ cahier des charges) ; cp13 = consulter et choisir ;
//   cp14 = contracter après le choix (clauses, avenant, pénalités) ; cp15 = piloter, et le bilan fournisseur qui
//   nourrit le prochain choix ; cp11 = le business case (ici, seulement le coût de chaque offre sur 3 ans).
// - cp18 = critères écrits avant de comparer, MESORE (cités, pas refaits) ; cp06 = démarche et type de contrat.
LEARNSQL.cours.cp13 = {
  intro: "Sur ta démat fiscale ou ton projet Snowflake + Power BI, comment le prestataire avait-il été choisi : sur une grille, ou parce qu'il était déjà là ? Ici : consulter, comparer, faire choisir. Le contrat vient après : module cp14.",
  sections: [
    {
      titre: "Consulter, ou un devis vérifié ?",
      exemple: "DEMAT 2027, octobre 2026. Deux achats.\nLa PA (plateforme agréée) : un service obligatoire, 3 ans de contrat, beaucoup d'offres. Tu consultes 3 PA.\nL'intégrateur Divalto : le partenaire déjà en place, qui connaît votre paramétrage. Pas de mise en concurrence : tu vérifies son devis (40 jours, environ 750 € le jour).",
      points: [
        "Consulter : demander une offre à plusieurs prestataires, sur le même besoin, puis comparer. Le PMBOK (le guide américain) parle de « conduire les approvisionnements ».",
        "Tu consultes quand l'enjeu est fort, le montant élevé, le contrat long, et que plusieurs prestataires savent faire.",
        "Un devis vérifié suffit pour un petit montant, ou pour le partenaire en place sur ton ERP. Vérifier : les jours tâche par tâche, le profil, le taux, ce qui est inclus, comparés à un projet passé.",
        "Le partenaire en place a déçu (son bilan écrit, module cp15), et le projet est gros ? Tu consultes, lui compris.",
        "Urgence : on consulte plus court, pas moins bien. Ton entreprise, privée, n'a pas les règles de la commande publique (les achats de l'État et des collectivités) : elle suit les siennes. Ici, le DAF (directeur administratif et financier, ton sponsor) achète."
      ],
      retenir: "Gros enjeu, plusieurs prestataires : tu consultes. Petit montant ou partenaire en place : un devis vérifié. L'urgence raccourcit la consultation, sans la supprimer."
    },
    {
      titre: "Le cahier des charges, et à qui l'envoyer",
      exemple: "Ta note de cadrage est validée. Tu en tires un cahier des charges de 8 pages.\nLe besoin : factures entre entreprises (B2B), clients et fournisseurs, 3 sites ; les volumes ; Divalto 10.13 ; les flux EDI (échange de données informatisé) de la grande distribution ; la sécurité.\nLes dates : réception dès novembre, connecteur au 1er mars 2027.\nLa réponse attendue : un même tableau de prix, le planning, le SLA (le niveau de service promis), des références.\nRéponses sous 2 semaines, puis les démos.",
      points: [
        "Il détaille la note de cadrage (module cp04), pour consulter. Il dit le besoin et les contraintes, pas la solution : écris « le logiciel X », et tu ne compares plus rien.",
        "Il fixe la forme des réponses. Sans un même tableau de prix, les offres ne se comparent pas.",
        "Court : 5 à 10 pages. Le détail, écran par écran, viendra dans les spécifications.",
        "Liste longue, puis liste courte : 2 ou 3 offres sérieuses valent mieux que 8 survolées. Une PA se choisit dans la liste officielle de la DGFiP (l'administration fiscale), sur impots.gouv.fr. Un comparateur privé ne la remplace pas.",
        "Marché mal connu (un WMS : un logiciel de gestion d'entrepôt) ? D'abord une RFI (demande d'information : qui fait quoi, à quel prix environ). Puis la RFP (demande de proposition : l'appel d'offres), à la liste courte."
      ],
      retenir: "Le cahier des charges dit le besoin, les contraintes, la forme des réponses et les dates. Il part à 2 ou 3 prestataires sérieux."
    },
    {
      titre: "Les mêmes règles pour tous",
      exemple: "Lundi, la PA C t'appelle : « Combien de fournisseurs vous envoient déjà des factures électroniques ? » Le cahier des charges ne le dit pas.\nLe jour même, la question et ta réponse partent aux 3 PA, par écrit, sans dire qui a demandé.\nMercredi, la PA B t'invite à un match, en loge. Tu déclines, et le DAF le sait.",
      points: [
        "Mêmes informations, même délai pour tous. Un délai ne s'allonge que pour tous, et pour une raison qui vient de la consultation (un oubli du cahier des charges).",
        "Une offre est confidentielle : jamais le prix ni le contenu d'un concurrent, même pour faire baisser un prix.",
        "« 15 % de remise si vous signez avant vendredi » ? La remise va dans son offre, jugée avec les autres, à la date prévue.",
        "Cadeaux et invitations d'un candidat : refusés pendant la consultation. Ils faussent ton jugement, ou le font croire.",
        "Un lien avec un candidat (un ancien collègue, une commission) se déclare au DAF, et ce candidat est noté à plusieurs. L'intégrateur partenaire d'une PA garde un avis technique utile : son lien est écrit, et cette PA passe la même grille."
      ],
      retenir: "Mêmes informations, même délai, offres confidentielles. Un lien se déclare ; une invitation se refuse pendant la consultation."
    },
    {
      titre: "La grille pondérée, écrite avant d'ouvrir les offres",
      exemple: "Grille DEMAT, validée par le DAF avant les offres.\nÉliminatoires : dans la liste officielle ; un connecteur standard pour Divalto ; réception possible dès novembre.\nPondérés, sur 100 : tes cas en démo 20, connecteur Divalto et sécurité 25, prix sur 3 ans 20, SLA 15, références sous Divalto 10, réversibilité (reprendre ses données en fin de contrat) 5, solidité 5.\nLa compta note ses cas ; la DSI (direction des systèmes d'information), le connecteur et la sécurité ; toi, le prix.",
      points: [
        "Critères et poids s'écrivent AVANT d'ouvrir les offres. Les changer après, c'est choisir le gagnant d'abord.",
        "Un critère éliminatoire ne se compense pas : raté, l'offre sort, même bien notée ailleurs. La loi est un filtre, pas un poids (module cp18).",
        "Chacun note son domaine, puis une séance commune règle les gros écarts. Une seule personne qui note tout se trompe plus, et seule.",
        "Le prix est un critère, pas le seul. Il se compare sur 3 ans, tout compris : abonnement, mise en service, jours d'intégrateur, bascule. C'est l'idée du TCO (le coût total de possession ; le business case : module cp11).",
        "Il manque un chiffre dans une offre ? Tu demandes le même aux 3, par écrit."
      ],
      retenir: "Critères et poids avant les offres, éliminatoires à part. Chacun note son domaine. Le prix se compare sur 3 ans, tout compris."
    },
    {
      titre: "Vérifier : tes cas, des références, la solidité",
      exemple: "Démos de 2 heures, une par PA, devant la cheffe comptable, Julie et Sophie.\nPas le spectacle du vendeur : tes 6 cas réels, envoyés avant, les mêmes pour les 3. Un avoir fournisseur, une facture sans SIREN (le numéro de l'entreprise), une facture EDI d'AquaBleu…\nPuis, pour chaque finaliste, tu appelles 2 clients sous Divalto.",
      points: [
        "La démo du vendeur montre ce qui marche chez lui. La tienne joue tes cas, notés par ceux qui s'en serviront.",
        "Références : des clients comparables (sous Divalto, ta taille), appelés par toi, avec tes questions : délais, support, rejets. Une liste de logos ne prouve rien.",
        "Solidité : âge, nombre de clients, comptes. Une PA qui disparaît, c'est une bascule forcée.",
        "Une promesse (« les avoirs, en mars ») se note comme une promesse, pas comme un acquis. Elle s'écrit dans l'offre, puis au contrat (module cp14).",
        "Doute fort sur un point critique (volumes, performance, un flux) ? Un test, ou un POC (preuve de concept : un essai court, sur tes données). Doute levé par la démo et les références : pas de POC."
      ],
      retenir: "Tes cas en démo, des clients comparables au téléphone, la solidité sur des faits. Un test seulement si un doute fort reste."
    },
    {
      titre: "Négocier, décider, répondre",
      exemple: "Deux finalistes : A (78 sur 100) et B (74).\nTu négocies avec A, B en réserve : support de 8 h à 18 h, portail du plan B inclus, export des données sous 30 jours.\nPuis une page au DAF : les 2 finalistes, leurs notes, le coût sur 3 ans, les risques, ta recommandation.\nIl choisit, et il signe en novembre.",
      points: [
        "On négocie après la liste courte, avec une solution de rechange : l'autre finaliste (ta MESORE, meilleure solution de rechange : module cp18). Avec les 2 en même temps, ou le 1er seul : les pratiques varient. Tu gardes l'autre jusqu'à la signature.",
        "Pas que le prix : le SLA, la réversibilité, le planning. Jamais l'obligation légale : la réception, déjà obligatoire, ne s'échange pas contre une remise. La façon de la tenir se compare : tu dois garder tes factures la durée légale, chez la PA ou ailleurs. À quel prix ?",
        "Tu recommandes ; le DAF choisit et signe. Il prend la 2e en connaissant l'écart ? C'est décidé : tu appliques, et tu écris le risque.",
        "Les non-retenus : une réponse écrite et polie, sur les points faibles de LEUR offre, rien sur les autres. L'autre finaliste : une date de réponse, puis l'annonce dès la signature.",
        "Ton bilan du fournisseur (module cp15) nourrit le prochain choix. En 2029, la PA en place répondra aussi, sur la même grille."
      ],
      retenir: "Négocier avec une solution de rechange, jamais sur la loi. Tu recommandes, le DAF choisit. Chaque candidat reçoit une réponse."
    }
  ]
};
