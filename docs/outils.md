# La section « Outils »

Demandé par l'élève : une section « Outils » dans le menu, rangée par sujet. Aujourd'hui :
- **SQL** : le super dico (`#/dico`, `docs/dico.md`) et Traduire (`#/traduire`, `docs/traducteur.md`) ;
- **Gestion de projet** : des modèles d'outils de chef de projet, simples et réutilisables (registre des risques,
  RACI, compte rendu…), tirés des cours du parcours « Chef de projet SI » (`cp01` à `cp27`).
D'autres sujets viendront (EDI, Divalto…) : ajouter un sujet ou un outil = ajouter des données, pas du code.

## La page et le menu

- Dans le menu, un seul lien « Outils » remplace « Dico » et « Traduire ». Les adresses `#/dico` et `#/traduire`
  ne changent pas.
- `#/outils` : une section par sujet, une carte par outil (nom, à quoi il sert en une phrase, lien).
- `#/outils/<id>` : la page d'un outil ; `#/outils/<id>/<doc>` : un document de cet outil.
- **Droits** : un sujet peut être lié à un parcours (`parcours: "chef-projet"`). Il n'apparaît alors que si
  `accesOK([parcours])` (comme l'onglet Divalto du dico) ; sinon, ses pages affichent un message court. Le sujet SQL
  est ouvert à tous.
- **Cours liés** : la page d'un outil a un lien vers ses cours ; la page d'un cours (`#/cours/cpXX`) affiche en bas
  « Les outils de ce cours », calculé à partir des outils (champ `cours`).

## Les fichiers

- `data/outils/sujets.js` : les sujets et leurs outils, dans l'ordre d'affichage. Les outils SQL pointent vers les
  pages existantes (`lien: "#/dico"`).
- `data/outils/<sujet>-<outil>.js` (ex. `gp-risques.js`) : la définition d'un outil, dans
  `LEARNSQL.outils = (LEARNSQL.outils || []).concat([ … ]);`.
- Le moteur : un bloc « Outils » dans `js/app.js`, ou `js/outils.js` s'il est gros. Il lit les définitions et
  affiche n'importe quel outil : aucun code propre à un outil.

## La définition d'un outil

Trois types : `tableau` (des lignes et des colonnes : risques, actions, cas de recette…), `document` (des rubriques
à remplir, qui peuvent contenir un tableau : note de cadrage, compte rendu…), `matrice` (des lignes × des colonnes
qu'on ajoute, et une valeur par case : RACI).

```js
{
  id: "gp-risques",
  sujet: "gestion-projet",
  titre: "Registre des risques",
  resume: "Lister les risques du projet, les noter et suivre leurs actions.",   // une phrase
  quand: "Dès le cadrage, puis à chaque point projet : 15 minutes sur ce qui bouge.",  // quand s'en servir
  etapes: ["…", "…", "…"],          // « Comment faire » : 3 étapes au plus, mots simples
  cours: ["cp07"],                  // les modules qui l'enseignent
  type: "tableau",
  colonnes: [
    { id: "risque", titre: "Risque", type: "texte-long", aide: "Cause → risque → conséquence" },
    { id: "proba", titre: "Probabilité", type: "choix", valeurs: [1, 2, 3], libelles: ["Faible", "Moyenne", "Forte"] },
    { id: "impact", titre: "Impact", type: "choix", valeurs: [1, 2, 3], libelles: ["Faible", "Moyen", "Fort"] },
    { id: "note", titre: "Note", type: "calcul", formule: "proba * impact",
      niveaux: [{ max: 2, libelle: "Faible", couleur: "ok" }, { max: 4, libelle: "Moyen", couleur: "attention" },
                { max: 9, libelle: "Fort", couleur: "ko" }] },
    { id: "porteur", titre: "Porteur", type: "texte" },
    { id: "echeance", titre: "Échéance", type: "date" },
    { id: "statut", titre: "Statut", type: "choix", valeurs: ["Ouvert", "Fermé"] }
  ],
  alertes: [ { si: "note >= 6 et action vide", message: "Risque fort sans action." } ],
  totaux: [ … ],                    // facultatif : sommes, nombres, moyennes en bas du tableau
  exemple: { nom: "DEMAT 2027", lignes: [ … ] },   // un exemple rempli, tiré du fil rouge des cours
  export: ["excel", "copier", "imprimer"]
}
```
Le format exact (types de champs, formules, alertes, totaux, matrice) est décrit ici par le développeur quand il le
fige. Règles :
- **Pas d'`eval`, pas de `new Function`** : une formule est lue par un petit lecteur d'expressions (+ − × ÷,
  comparaisons, et / ou, noms de colonnes, nombres, `vide`), qui sert aussi à écrire les formules Excel.
- Les règles d'un outil (échelles, seuils, mots) sont **celles des cours**, mot pour mot. Exemple : le cours cp07
  note un risque de 1 à 9 (probabilité et impact de 1 à 3). Un outil ne contredit jamais un cours.

## Les documents de l'élève

- Un outil peut avoir plusieurs documents (un registre par projet…) : **Nouveau** (vide), **Partir de l'exemple**,
  **Dupliquer**, **Renommer**, **Supprimer** (avec confirmation).
- Ils restent **dans le navigateur** (`localStorage`, clé `learnsql-outils`, lecture et écriture dans un try/catch) :
  rien n'est envoyé sur Internet, rien n'est synchronisé avec le compte. La page le dit en une phrase.
- **Enregistrer dans un fichier** (`.json`) et **Ouvrir un fichier** : pour changer d'ordinateur ou garder une copie.

## Les sorties (« facilement reproductibles »)

- **Excel** (`.xlsx`, un vrai fichier, fait dans le navigateur sans bibliothèque) : les colonnes, les formules
  Excel des colonnes calculées (la note d'un risque reste un calcul dans Excel), l'en-tête en gras, la largeur des
  colonnes. Pour un document : une feuille par tableau, et les rubriques en texte.
- **Copier** : le texte mis en forme (HTML) et le texte simple, à coller dans Word ou un e-mail.
- **Imprimer / PDF** : une mise en page propre du seul document (CSS d'impression).
- Le modèle vide peut aussi se télécharger tel quel en Excel, pour s'en servir au travail sans le site.

## L'écran (élève dyslexique et TDAH)

- En haut : à quoi sert l'outil (une phrase), quand s'en servir, « Comment faire » (3 étapes), et le bouton
  « Voir l'exemple ».
- Un tableau sur téléphone (390 px) : une carte par ligne, sans défilement horizontal ; un tableau classique sur PC.
- Une couleur a toujours son mot (« Fort », pas seulement du rouge). Des boutons larges, peu de mots.
- Les alertes s'affichent sous le tableau, en phrases courtes.
