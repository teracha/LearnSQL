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
  { id: "chef-projet", titre: "Chef de projet SI", resume: "Cadrer, planifier et piloter un projet SI.", modules: [] },
  { id: "edi", titre: "EDI / EDIFACT", resume: "Messages, flux, partenaires et supervision.", modules: [] },
  { id: "divalto", titre: "Divalto", resume: "L'ERP Divalto Infinity, par domaine.", modules: [] }
];
