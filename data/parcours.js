// Les parcours, avec leurs sous-parcours (facultatifs) et leurs modules (ids de data/modules.js).
// Chaque id est unique dans tout le site : il sert aux droits (table « acces » dans Supabase).
// Sans compte, on ne voit que les parcours de LEARNSQL.parcoursPublics.
// Exemple de sous-parcours : { id: "divalto-achats", titre: "Achats", resume: "...", modules: [] }
LEARNSQL.parcoursPublics = ["sql"];
LEARNSQL.parcours = [
  {
    id: "sql", titre: "SQL",
    resume: "SQL Server et Snowflake : de SELECT à l'optimisation.",
    modules: ["m01", "m02", "m03", "m04", "m05", "m06", "m07", "m08",
              "m09", "m10", "m11", "m12", "m13", "m14", "m15", "m16"]
  },
  {
    id: "chef-projet", titre: "Chef de projet SI",
    resume: "Le métier, la méthode et la posture, jusqu'au poste de DSI adjoint. Fil rouge : le projet DEMAT 2027.",
    modules: [],
    sous: [
      { id: "cp-demarrer", titre: "0. Démarrer", resume: "Faire le point, et s'organiser pour tenir la charge.", modules: ["cp01", "cp02"] },
      { id: "cp-cadrer", titre: "A. Cadrer et piloter", resume: "Le socle : cadrer, planifier, piloter et rendre compte.", modules: ["cp03", "cp04", "cp05", "cp06", "cp07", "cp08", "cp09", "cp10"] },
      { id: "cp-argent", titre: "B. Argent et prestataires", resume: "Budget, business case, consultation, contrats et éditeurs.", modules: ["cp11", "cp12", "cp13", "cp14", "cp15"] },
      { id: "cp-posture", titre: "C. Posture et comportement", resume: "Mises en situation : influencer, communiquer, dire non.", modules: ["cp16", "cp17", "cp18"] },
      { id: "cp-livrer", titre: "D. Livrer et passer en run", resume: "Recette, reprise, bascule, exploitation et adoption.", modules: ["cp19", "cp20", "cp21", "cp22", "cp23"] },
      { id: "cp-dsi", titre: "E. Vers DSI adjoint", resume: "Conformité, portefeuille, management et budget SI.", modules: ["cp24", "cp25", "cp26", "cp27"] }
    ]
  },
  { id: "edi", titre: "EDI / EDIFACT", resume: "Messages, flux, partenaires et supervision.", modules: [] },
  {
    id: "divalto", titre: "Divalto", resume: "L'ERP Divalto Infinity 10.13, par domaine.", modules: [],
    sous: [
      { id: "divalto-gc", titre: "Gestion commerciale", resume: "Ventes, achats, stock et logistique.", modules: ["dv01"] }
    ]
  }
];
