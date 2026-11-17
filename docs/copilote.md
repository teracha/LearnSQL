# Copilote

Demandé par l'élève (novembre 2026) : « On va créer un outil appelé Copilote. L'idée, c'est une checklist pour des
tâches. La première, c'est une checklist pour documenter une requête. » Ses précisions : « c'est juste des checklists
prêtes à l'emploi en fonction d'un sujet » ; « c'est vraiment des checklists où je lis et je fais » ; « je viens de faire
une requête : les étapes et les actions » ; « une logique d'action » ; deux niveaux, Rapide et Complet ; « je ne veux pas
que tu repartes de tout ce qui existe : ça sera à ma demande. Donc on a juste un cas à faire. »

## Copilote et Conseils d'architecte
- **Conseils d'architecte** (`#/architecte`) : je réfléchis avant de faire. Des questions, avec le « pourquoi » et le
  bon réflexe.
- **Copilote** (`#/copilote`) : je lis, je fais, je coche. Une ligne = une action, sans explication.
- Deux outils à part. Copilote ne reprend pas les situations d'Architecte : **une fiche s'ajoute seulement à la demande
  de l'élève**, une par une.

## La page
- Un outil de la section Outils (`docs/outils.md`), sujet SQL (`outils-sql`) : id `copilote`, titre « Copilote », lien
  `#/copilote`. Mêmes droits que le dico, les astuces et Architecte : public sans compte ; un compte connecté suit le
  droit outil `copilote` (page Équipe, « Droits des outils »), sinon « Outil réservé ». Un lien vers un autre outil
  (champ `outil` d'une action) suit le droit de cet outil.
- `#/copilote` : « Des checklists prêtes à l'emploi : je lis, je fais, je coche. » La liste des fiches : titre,
  résumé, nombre d'actions de chaque niveau, et combien sont cochées. Pas de recherche tant qu'il y a peu de fiches.
- `#/copilote/<id>` : une fiche.
  1. Le titre et le résumé.
  2. Le choix du niveau : **Rapide** ou **Complet**, avec le nombre d'actions et le texte de `niveaux` (quand le
     choisir). Le choix est gardé dans le navigateur (`learnsql-copilote-niveau`) ; Rapide par défaut.
  3. La checklist, dans l'ordre des étapes : le titre de chaque étape, puis ses actions. Une action = une case à cocher
     et son texte (police code entre accents graves). Rapide montre seulement les actions `rapide: true`, sous le titre
     de leur étape (une étape sans action rapide est cachée). Une action avec `outil` a un lien vers cet outil (s'il
     est permis).
  4. Le compte des cases cochées (« 3 sur 5 »), pour le niveau affiché.
  5. Les boutons « Copier la checklist » (le niveau affiché, `[x]` ou `[ ]`, groupé par étape) et « Tout décocher »
     (avec une confirmation : vide toute la fiche).
- **Les cases cochées** sont celles de l'action, pas du niveau : une action cochée en Rapide l'est aussi en Complet. Elles
  restent dans le navigateur (`learnsql-copilote` : `{ "<fiche>": { "<action>": true } }`), jamais envoyées. Chaque
  lecture et écriture est dans un try/catch : la page marche sans. Une action retirée des données : sa case est oubliée
  sans erreur.
- Lisible à 390 px, sans débordement. Pas d'explication, pas de « pourquoi » : l'élève lit et fait.

## Le fichier
`data/copilote/fiches.js`, chargé dans `index.html` :

```js
LEARNSQL.copilote = (LEARNSQL.copilote || []).concat([
  {
    id: "finir-requete",                 // unique : minuscules, chiffres, tirets
    titre: "Je finis une requête",       // une action, à la 1re personne, 8 mots au plus
    resume: "…",                         // une phrase, 25 mots au plus
    niveaux: { rapide: "…", complet: "…" },   // quand choisir chaque niveau, une phrase chacun
    etapes: [                            // dans l'ordre où on fait les choses
      {
        titre: "Je vérifie qu'elle est juste",   // une action, à la 1re personne, 8 mots au plus
        actions: [
          { id: "lancer", texte: "…", rapide: true },   // id unique dans la fiche ; texte : un verbe d'abord,
                                                        // 25 mots au plus ; rapide : aussi dans le niveau Rapide
          { id: "traduire", texte: "…", outil: "traduire" }   // outil : facultatif, l'id d'un outil de la section Outils
        ]
      }
    ]
  }
]);
```

## Les contrôles et les tests
- `node outils/verifier.js` (section « Copilote ») : le fichier chargé dans `index.html` ; ids uniques ; titre et
  résumé (limites de mots : alerte au-delà) ; `niveaux.rapide` et `niveaux.complet` ; au moins une étape ; chaque étape
  a un titre et au moins une action ; ids des actions uniques dans la fiche ; texte non vide ; `rapide` vaut `true` s'il
  est là ; au moins une action rapide par fiche ; `outil` = un outil qui existe ; un champ inconnu = une alerte. Le lien
  `copilote` du sujet SQL mène à `#/copilote`. La ligne « total » dit combien de fiches et d'actions.
- `outils/tests/copilote.js` (navigateur, dans `lancer.sh`) : la carte sur la page Outils sans compte, la liste, une
  fiche en Rapide puis en Complet (nombres lus dans les données), cocher (gardé après rechargement, partagé entre les
  niveaux), « Tout décocher », « Copier la checklist », le lien vers Traduire, 390 px sans débordement, aucune erreur
  JavaScript. Les droits : `outils/tests/outils.js`.
