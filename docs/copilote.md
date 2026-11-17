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

### Ce qui est construit (détails d'affichage, novembre 2026)

- **La liste** (`#/copilote`) : la phrase, puis une carte par fiche, dans l'ordre des données : le titre, le résumé et
  une ligne par niveau, « Rapide : 5 actions · 2 cochées », « Complet : 21 actions · 2 cochées » (en vert quand tout le
  niveau est coché). Sans fiche : « Pas encore de fiche. »
- **La fiche**, dans cet ordre : le lien « Copilote » (retour à la liste), le titre, le résumé, les deux boutons de même
  largeur « Rapide (5) » et « Complet (21) » (`aria-pressed`), la phrase de `niveaux` du niveau choisi, la checklist, le
  compte et sa barre verte, puis « Copier la checklist » et « Tout décocher ». Une fiche inconnue ramène à la liste.
- **La checklist** : une étape = un bloc, son titre numéroté (« 1. Je vérifie qu'elle est juste ») ; les étapes affichées
  sont numérotées de 1 à n (en Rapide, une étape sans action rapide disparaît et les suivantes sont renumérotées, aussi
  dans la copie). Puis une ligne par action : une case de 24 px et le texte, toute la ligne cliquable (44 px au moins) ;
  une action cochée passe en vert. Un petit bout de code entre accents graves (24 signes au plus) ne se coupe pas à une
  espace (« `TOP 100` » reste sur une ligne) ; un plus long se coupe aux espaces. Une action avec `outil` : dessous, un
  lien au titre de l'outil, « Traduire une requête › » (comme les cartes de la page Outils), seulement si le compte voit
  cet outil (sans compte : ceux des sujets publics) ; un outil réservé ou inconnu : pas de lien, l'action reste.
- **Le compte** : « 2 cochées sur 5 », pour le niveau affiché, vert quand tout est coché.
- **Copier la checklist** : ce texte (les accents graves retirés), pour le niveau affiché :

  ```
  Je finis une requête : la checklist (Rapide)
  2 cochées sur 5

  1. Je vérifie qu'elle est juste
  [x] Lancer la requête sur les vraies données et compter les lignes.
  [x] Comparer un total avec la source (Divalto, le rapport existant).

  2. Je nettoie le code
  [ ] Retirer ce qui servait aux essais (TOP 100, lignes en commentaire, SELECT *).
  …
  ```

  D'abord le presse-papiers, puis le repli (`execCommand`) ; si tout échoue, le texte s'affiche sous les boutons,
  sélectionné, à copier à la main. Changer de niveau efface le message et ce texte.
- **Tout décocher** : une confirmation (« Décocher toutes les cases de « Je finis une requête » ? »), puis toutes les
  cases de la fiche, les deux niveaux. Sans case cochée : « Aucune case n'est cochée. »
- **Le stockage** : `learnsql-copilote-niveau` vaut `rapide` ou `complet` (une autre valeur : Rapide ; rien n'est
  enregistré tant que l'élève ne choisit pas). Une action retirée des données est oubliée à la prochaine case cochée ; un
  stockage illisible repart de zéro ; si le navigateur refuse d'enregistrer, les cases et le niveau vivent le temps de
  l'onglet, et la page le dit (« Ce navigateur n'enregistre pas tes cases : elles seront perdues en fermant l'onglet. »).
- **Lecture** : une espace insécable avant ? ! : ; » et après « (comme les Conseils d'architecte).
- Code : bloc « Copilote » de `js/app.js` (`pageCopilote`, `carteCopilote`, `pageFicheCopilote`, `checklistCopilote`,
  `etapesCopilote`, `texteCopilote`, `fmtCp`…), avec les fonctions partagées avec les Conseils d'architecte (`stockageCases`,
  `idsCases`, `copierChecklist`, `decocherTout`, `texteCoches`, `texteBrut`, `fmtAr`, `outilLie`) ; styles `.cp-…` de
  `css/style.css`.

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
  - Construit : les limites de mots du format (titre de la fiche et d'une étape : 8 ; résumé et texte d'une action : 25 ;
    chaque phrase de `niveaux` : 25 aussi) donnent une alerte au-delà ; un titre (fiche ou étape) qui ne commence pas par
    « Je » ou « J' » : une alerte ; les ids des actions : minuscules, chiffres, tirets (erreur) ; `outil` : tout outil de
    la section Outils (`data/outils/sujets.js` : un lien comme `traduire`, ou une définition `gp-…`). La ligne
    « copilote » donne les fiches, les actions et les actions rapides.
- `outils/tests/copilote.js` (navigateur, dans `lancer.sh`) : la carte sur la page Outils sans compte, la liste, une
  fiche en Rapide puis en Complet (nombres lus dans les données), cocher (gardé après rechargement, partagé entre les
  niveaux), « Tout décocher », « Copier la checklist », le lien vers Traduire, 390 px sans débordement, aucune erreur
  JavaScript. Les droits : `outils/tests/outils.js`.
