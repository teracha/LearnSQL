// Les sujets de la page « Outils » (#/outils), dans l'ordre d'affichage. Format : docs/outils.md.
// Un sujet : { id, titre, resume, parcours (facultatif), outils }.
// - parcours : le sujet n'apparaît qu'aux comptes qui ont ce parcours (accesOK, comme l'onglet Divalto du dico).
// - outils, dans l'ordre : l'id d'une définition (data/outils/<id>.js), ou un lien vers une page du site
//   { titre, resume, lien }.
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
    outils: ["gp-cadrage", "gp-risques", "gp-raci", "gp-compte-rendu", "gp-rapport", "gp-options", "gp-decisions",
      "gp-changements", "gp-budget", "gp-business-case", "gp-recette", "gp-bascule"]
  }
];
