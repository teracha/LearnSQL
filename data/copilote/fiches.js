// Copilote : des checklists prêtes à l'emploi (format : docs/copilote.md). Je lis, je fais, je coche.
// Une fiche s'ajoute seulement à la demande de l'élève.
LEARNSQL.copilote = (LEARNSQL.copilote || []).concat([
  {
    id: "finir-requete",
    titre: "Je finis une requête",
    resume: "Avant de dire « c'est fini », ta requête doit être juste, lisible, retrouvable et transmise.",
    niveaux: {
      rapide: "Une requête faite une fois, pour toi ou pour un collègue.",
      complet: "Une requête qui va servir longtemps ou à d'autres : un rapport Power BI, un export régulier."
    },
    etapes: [
      {
        titre: "Je vérifie qu'elle est juste",
        actions: [
          { id: "lancer", texte: "Lancer la requête sur les vraies données et compter les lignes.", rapide: true },
          { id: "total", texte: "Comparer un total avec la source (Divalto, le rapport existant).", rapide: true },
          { id: "cas-limites", texte: "Tester les cas limites : client sans commande, valeur NULL, période vide." },
          { id: "duree", texte: "Noter la durée et le nombre de lignes." }
        ]
      },
      {
        titre: "Je nettoie le code",
        actions: [
          { id: "essais", texte: "Retirer ce qui servait aux essais (`TOP 100`, lignes en commentaire, `SELECT *`).", rapide: true },
          { id: "forme", texte: "Mettre en forme : une clause par ligne, des alias clairs." },
          { id: "nom", texte: "Lui donner un nom qui dit ce qu'elle fait (`ventes_par_client_mois`)." }
        ]
      },
      {
        titre: "J'écris dans le code",
        actions: [
          { id: "entete", texte: "Ajouter l'en-tête : nom, but, demandeur, auteur, date.", rapide: true },
          { id: "regles", texte: "Commenter chaque règle métier (commandes annulées exclues, montants HT)." },
          { id: "choix", texte: "Commenter les choix pas évidents (pourquoi ce `LEFT JOIN`, pourquoi ce filtre)." }
        ]
      },
      {
        titre: "J'écris la fiche",
        actions: [
          { id: "phrase", texte: "Écrire en une phrase ce qu'elle rend." },
          { id: "grain", texte: "Dire ce que représente une ligne du résultat (« un client par mois »)." },
          { id: "tables", texte: "Lister les tables lues, les filtres et les paramètres (avec leur valeur par défaut)." },
          { id: "traduire", texte: "Coller la requête dans l'outil Traduire et reprendre le pseudo-code.", outil: "traduire" }
        ]
      },
      {
        titre: "Je la range",
        actions: [
          { id: "enregistrer", texte: "Enregistrer le script au bon endroit (Git ou dossier partagé).", rapide: true },
          { id: "ou", texte: "Noter où elle tourne : serveur, base, moteur." },
          { id: "qui", texte: "Noter qui l'utilise : rapport Power BI, export, traitement planifié." },
          { id: "liste", texte: "L'ajouter à la liste des requêtes de l'équipe." }
        ]
      },
      {
        titre: "Je la transmets",
        actions: [
          { id: "relire", texte: "La faire relire par un collègue." },
          { id: "demandeur", texte: "Dire au demandeur où trouver le résultat et comment le lire." },
          { id: "maintien", texte: "Noter qui la maintient." }
        ]
      }
    ]
  }
]);
