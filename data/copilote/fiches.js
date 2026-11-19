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
  },
  {
    id: "documenter-vue-snowflake",
    titre: "Je documente une vue Snowflake",
    resume: "Un collègue doit comprendre ta vue sans t'appeler : commentaires dans Snowflake, fiche, table des statuts, code dans Git.",
    exemple: "Dans 6 mois, un collègue voit `statut = 'EXP'` sur le site. Il se demande : « EXP, ça vient de PMI ou de Divalto ? Ça veut dire quoi ? » Ta documentation doit lui répondre sans qu'il t'appelle.",
    niveaux: {
      rapide: "Une vue simple, lue par toi ou par ton équipe.",
      complet: "Une vue lue par d'autres : le site e-commerce, Power BI, une autre équipe."
    },
    etapes: [
      {
        titre: "J'écris les commentaires dans Snowflake",
        actions: [
          {
            id: "commentaire-vue",
            texte: "Écrire le commentaire de la vue (but, responsable) dans le `CREATE OR REPLACE VIEW` : un `COMMENT ON` seul se perd à chaque recréation.",
            rapide: true,
            code: "CREATE OR REPLACE VIEW V_SUIVI_CMD_ECOM (\n  num_cde,\n  statut COMMENT 'Statut du site. Voir la table de correspondance PMI / Divalto.',\n  date_cde\n)\nCOMMENT = 'Suivi des commandes PMI + Divalto pour le site e-commerce. Responsable : équipe Data.'\nAS\nSELECT num_cde, statut_site, date_cde\nFROM …;   -- ta requête : les commandes PMI et Divalto"
          },
          { id: "commentaire-colonnes", texte: "Ajouter un `COMMENT` sur chaque colonne difficile (statut, codes), dans la liste des colonnes de la vue.", rapide: true },
          { id: "verifier-commentaires", texte: "Vérifier les commentaires : `DESCRIBE VIEW` pour les colonnes, `SHOW VIEWS` pour la vue." }
        ]
      },
      {
        titre: "J'écris la fiche de la vue",
        actions: [
          { id: "fiche-but", texte: "Écrire le but : à quoi sert la vue." },
          { id: "fiche-sources", texte: "Lister les sources : les tables PMI et Divalto utilisées." },
          { id: "fiche-regles", texte: "Écrire les règles : les filtres appliqués (ex. : les commandes des 12 derniers mois)." },
          { id: "fiche-cle", texte: "Dire ce qui identifie une ligne : la clé unique." },
          { id: "fiche-frequence", texte: "Noter quand les données sont mises à jour." },
          { id: "fiche-contact", texte: "Noter qui appeler en cas de problème." }
        ]
      },
      {
        titre: "Je remplis la table de correspondance des statuts",
        actions: [
          {
            id: "statuts-table",
            texte: "Remplir une ligne par statut : PMI, Divalto et site (modèle ci-dessous : valeurs à remplacer par les vraies).",
            rapide: true,
            tableau: [
              ["Statut PMI", "Statut Divalto", "Statut site"],
              ["10", "ATT", "En attente"],
              ["50", "PRE", "En préparation"],
              ["90", "EXP", "Expédiée"]
            ]
          },
          { id: "statuts-distinct", texte: "Lister les vrais statuts de chaque source avec `SELECT DISTINCT statut` : aucun ne doit manquer." },
          { id: "statuts-lien", texte: "Dire où trouver cette table : dans la fiche et dans le commentaire de la colonne `statut`." }
        ]
      },
      {
        titre: "Je range le code dans Git",
        actions: [
          { id: "git-fichier", texte: "Enregistrer la vue dans Git : un fichier `.sql` par vue.", rapide: true },
          { id: "git-message", texte: "À chaque modification, écrire un message clair : quoi et pourquoi." }
        ]
      },
      {
        titre: "Je teste ma doc",
        actions: [
          { id: "test-collegue", texte: "Faire lire la fiche à un collègue : trouve-t-il ce que veut dire `EXP` sans t'appeler ?" }
        ]
      }
    ]
  }
]);
