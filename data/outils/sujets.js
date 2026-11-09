// Les sujets de la page « Outils » (#/outils), dans l'ordre d'affichage. Format : docs/outils.md.
// Un sujet : { id, titre, resume, parcours (facultatif), outils ou groupes }.
// - parcours : le sujet n'apparaît qu'aux comptes qui ont ce parcours (accesOK, comme l'onglet Divalto du dico).
// - outils, dans l'ordre : l'id d'une définition (data/outils/<id>.js), ou un lien vers une page du site
//   { titre, resume, lien }.
// - groupes, à la place de outils : des étapes, dans l'ordre, chacune avec ses outils : [{ titre, outils: [...] }].
//   La page les numérote (1. Cadrer, 2. Piloter…). Un outil est rangé une seule fois.
// Ajouter un sujet ou un outil = ajouter des données ici (et le fichier de l'outil dans index.html), pas du code.
LEARNSQL.outilsSujets = [
  {
    id: "sql", titre: "SQL",
    resume: "Trouver une fonction, comprendre une requête.",
    outils: [
      { titre: "Super dico SQL", resume: "Trouver une fonction ou un mot-clé, pour SQL Server, Snowflake et MySQL.", lien: "#/dico" },
      { titre: "Traduire une requête", resume: "Coller une requête et la lire en français, dans l'ordre où SQL la calcule.", lien: "#/traduire" }
    ]
  },
  {
    id: "gestion-projet", titre: "Gestion de projet", parcours: "chef-projet",
    resume: "Des modèles simples à remplir, tirés des cours du parcours Chef de projet SI.",
    groupes: [
      { titre: "Cadrer", outils: ["gp-cadrage", "gp-business-case", "gp-raci"] },
      { titre: "Piloter", outils: ["gp-risques", "gp-rapport", "gp-budget", "gp-compte-rendu"] },
      { titre: "Décider", outils: ["gp-options", "gp-decisions", "gp-changements"] },
      { titre: "Livrer", outils: ["gp-recette", "gp-bascule"] }
    ]
  }
];
