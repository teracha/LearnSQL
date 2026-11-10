// Les sujets de la page « Outils » (#/outils), dans l'ordre d'affichage. Format : docs/outils.md.
// Un sujet : { id, titre, resume, outils ou groupes }.
// - Droits : chaque sujet et chaque outil a un id unique dans tout le site (jamais celui d'un parcours ou d'un module).
//   Il sert aux droits (table « acces », page Équipe, « Droits des outils »), comme les parcours : chaîne « outils »
//   (toute la section) → sujet → outil. Sans compte, on ne voit que les sujets de LEARNSQL.outilsPublics.
// - outils, dans l'ordre : l'id d'une définition (data/outils/<id>.js), ou un lien vers une page du site
//   { id, titre, resume, lien }.
// - groupes, à la place de outils : des étapes, dans l'ordre, chacune avec ses outils : [{ titre, outils: [...] }].
//   La page les numérote (1. Cadrer, 2. Piloter…). Un outil est rangé une seule fois.
// Ajouter un sujet ou un outil = ajouter des données ici (et le fichier de l'outil dans index.html), pas du code.
LEARNSQL.outilsPublics = ["outils-sql"];
LEARNSQL.outilsSujets = [
  {
    id: "outils-sql", titre: "SQL",
    resume: "Trouver une fonction, comprendre une requête.",
    outils: [
      { id: "dico", titre: "Super dico SQL", resume: "Trouver une fonction ou un mot-clé, pour SQL Server, Snowflake et MySQL.", lien: "#/dico" },
      { id: "traduire", titre: "Traduire une requête", resume: "Coller une requête et la lire en français, dans l'ordre où SQL la calcule.", lien: "#/traduire" }
    ]
  },
  {
    id: "gestion-projet", titre: "Gestion de projet",
    resume: "Des modèles simples à remplir, tirés des cours du parcours Chef de projet SI.",
    groupes: [
      { titre: "Cadrer", outils: ["gp-cadrage", "gp-business-case", "gp-raci", "gp-estimation"] },
      { titre: "Piloter", outils: ["gp-risques", "gp-tableau-bord", "gp-rapport", "gp-budget", "gp-compte-rendu", "gp-lundi"] },
      { titre: "Décider", outils: ["gp-options", "gp-decisions", "gp-changements", "gp-moscow"] },
      { titre: "Prestataires", outils: ["gp-choix-prestataire", "gp-contrat", "gp-echeancier"] },
      { titre: "Livrer", outils: ["gp-recette", "gp-reprise", "gp-conduite-changement", "gp-bascule", "gp-bilan"] }
    ]
  }
];
