# La section « Outils »

Demandé par l'élève : une section « Outils » dans le menu, rangée par sujet. Aujourd'hui :
- **SQL** : le super dico (`#/dico`, `docs/dico.md`) et Traduire (`#/traduire`, `docs/traducteur.md`) ;
- **Gestion de projet** : des modèles d'outils de chef de projet, simples et réutilisables (registre des risques,
  RACI, compte rendu…), tirés des cours du parcours « Chef de projet SI » (`cp01` à `cp27`).
D'autres sujets viendront (EDI, Divalto…) : ajouter un sujet ou un outil = ajouter des données, pas du code.

## La page et le menu

- Dans le menu, un seul lien « Outils » remplace « Dico » et « Traduire ». Les adresses `#/dico` et `#/traduire`
  ne changent pas.
- `#/outils` : une section par sujet, une carte par outil (nom, à quoi il sert en une phrase, lien). Un sujet peut
  ranger ses outils par étapes (Gestion de projet : 1. Cadrer, 2. Piloter, 3. Décider, 4. Prestataires, 5. Livrer : 22
  outils), dans les données.
- En bas de `#/outils`, quand il y a des documents : « Effacer tous mes documents » (avec confirmation), pour un
  ordinateur partagé.
- `#/outils/<id>` : la page d'un outil ; `#/outils/<id>/<doc>` : un document de cet outil.
- **Droits** : voir « Les droits des outils » plus bas.
- **Cours liés** : la page d'un outil a un lien vers ses cours ; la page d'un cours (`#/cours/cpXX`) affiche en bas
  « Les outils de ce cours », calculé à partir des outils (champ `cours`).

## Les droits des outils (« le droit outil »)

Demandé par l'élève (novembre 2026) : une gestion de droits aussi au niveau des outils.
- **Même règle que les parcours, dans la même table `acces`** (`element`, `groupe_id` ; aucune table en plus).
  L'admin la règle sur la page Équipe, section « Droits des outils », sous « Droits des parcours » : une ligne par
  élément, une case par groupe, « Ouvert à tous » / « Réservé ». On coche, puis « Valider » (barre en bas de l'écran).
- **Les éléments**, dans l'ordre de la grille : `outils` (toute la section), puis chaque sujet (`outils-sql`,
  `gestion-projet`), puis chaque outil du sujet, en retrait (`dico`, `traduire`, `gp-cadrage`…).
- **La règle** : sans ligne = ouvert à tous les connectés ; avec des lignes = réservé à ces groupes ; il faut aussi
  l'accès aux niveaux au-dessus (`outils` → sujet → outil). L'admin voit tout. Sans compte : seulement les sujets de
  `LEARNSQL.outilsPublics` (le sujet SQL), avec tous leurs outils (comme `parcoursPublics`).
- **Partout** : `#/outils` (sujets, étapes, cartes : une étape ou un sujet sans outil visible disparaît ; aucun outil
  visible : un message court) ; le lien « Outils » du menu, caché quand le compte ne voit aucun outil (`outils` réservé,
  ou chaque sujet ou outil réservé à d'autres groupes) ; la page d'un outil, son exemple et ses
  documents (message court « Outil réservé ») ; « Les outils de ce cours » ; `#/dico` (fiches comprises) et
  `#/traduire` pour un compte connecté qui n'y a pas droit (même message ; sans compte, ils restent publics). Le lien
  vers Traduire dans le dico, et « Dans le dico » dans Traduire, suivent aussi le droit. L'onglet Divalto du dico
  garde sa règle (parcours Divalto) en plus du droit sur le dico.
- **Ids uniques dans tout le site** : ils vont dans `acces.element`. Un sujet ou un outil n'a jamais l'id d'un
  parcours, d'un sous-parcours ou d'un module (d'où `outils-sql`, pas `sql`, qui est le parcours SQL). Le
  vérificateur le contrôle.
- **La Gestion de projet ne dépend plus du parcours Chef de projet** : seul le droit outil compte. Pour garder la
  même restriction qu'avant, l'élève peut lancer une fois `outils/supabase-outils.sql` (facultatif) : il recopie les
  groupes du parcours `chef-projet` sur l'élément `gestion-projet`. Sans ce script, elle est ouverte à tous les
  connectés.
- C'est un masquage d'écran, comme les parcours : le contenu reste public sur GitHub Pages. Code : `accesOutils`,
  `outilVisible`, `outilOuvert`, `unOutilVisible` (bloc « Outils » de `js/app.js`), sur `droitsCompte`, la règle commune aux parcours.

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
  resume: "Lister les risques du projet, les noter de 1 à 9, et suivre leur action.",   // une phrase
  quand: "Dès le cadrage. Puis chaque semaine, 15 minutes au point projet, sur ce qui bouge.",  // quand s'en servir
  etapes: ["…", "…", "…"],          // « Comment faire » : 3 étapes au plus, mots simples
  cours: ["cp07", "cp08"],          // les modules qui l'enseignent
  type: "tableau",
  ligne: { titre: "Risque" },       // le nom d'une ligne (cartes sur téléphone, alertes)
  colonnes: [
    { id: "risque", titre: "Risque", type: "texte-long", aide: "Cause → risque → conséquence." },
    { id: "proba", titre: "Probabilité", type: "choix", valeurs: [1, 2, 3], libelles: ["Faible", "Moyenne", "Forte"] },
    { id: "impact", titre: "Impact", type: "choix", valeurs: [1, 2, 3], libelles: ["Faible", "Moyen", "Fort"] },
    { id: "note", titre: "Note", type: "calcul", formule: "proba * impact",
      niveaux: [{ max: 2, libelle: "On surveille", couleur: "ok" }, { max: 4, libelle: "Action simple", couleur: "attention" },
                { max: 9, libelle: "Priorité", couleur: "ko" }] },
    { id: "reponse", titre: "Réponse et action", type: "texte-long" },
    { id: "proprietaire", titre: "Propriétaire", type: "texte" },   // « porteur » : réservé à l'escalade (cp07)
    { id: "quand", titre: "Pour quand", type: "date" },
    { id: "statut", titre: "Statut", type: "choix", valeurs: ["Ouvert", "Arrivé", "Fermé"], defaut: "Ouvert" }
  ],
  alertes: [ { si: "statut <> \"Fermé\" et (reponse vide ou quand vide)", message: "Sans action ni date, c'est une liste d'inquiétudes." } ],
  totaux: [ { libelle: "Risques ouverts", calcul: "nombre", si: "statut = \"Ouvert\"" } ],
  exemple: { nom: "DEMAT 2027", date: "2027-02-08", lignes: [ … ] },   // un exemple rempli, tiré du fil rouge
  export: ["excel", "copier", "imprimer"]
}
```
Le format exact est figé plus bas (« Le format figé »). Règles :
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

## Le format figé (développeur, novembre 2026)

Moteur : `js/outils.js` (`LEARNSQL.outilsMoteur`, sans DOM, sans `eval`). Écran : bloc « Outils » de `js/app.js`.
Contrôle : `node outils/verifier.js` (section « Outils »). Tests : `outils/tests/outils-moteur.js` (node) et
`outils/tests/outils.js` (navigateur, dans `lancer.sh`).

### Les fichiers

- `data/outils/sujets.js` : `LEARNSQL.outilsPublics = ["outils-sql"]` (les sujets ouverts sans compte) et
  `LEARNSQL.outilsSujets = [{ id, titre, resume, outils: [...] }]`.
  `outils` : dans l'ordre, l'id d'une définition, ou un lien `{ id, titre, resume, lien: "#/dico" }` (l'id sert aux
  droits ; le dico et Traduire ont les ids `dico` et `traduire`). À la place de
  `outils`, `groupes: [{ titre: "Cadrer", outils: [...] }, …]` : des étapes, dans l'ordre, numérotées sur la page.
  Un outil est rangé une seule fois.
  Plus de champ `parcours` (le vérificateur le refuse) : les droits se règlent sur la page Équipe.
- `data/outils/<id>.js` : **un outil par fichier**, nommé comme son id, chargé dans `index.html` (le vérificateur le
  contrôle). L'outil doit être rangé par son sujet (`sujet` = l'id du sujet, et l'id dans sa liste `outils` ou dans
  un de ses `groupes`).
- Ids : sujet `outils-sql`, outil `gp-risques` (a-z, 0-9, tirets ; uniques dans tout le site, voir « Les droits des
  outils ») ; colonne, rubrique et total `prochaine_revue` (a-z, 0-9, `_`). Mots
  réservés, interdits comme id : `et`, `ou`, `non`, `vide`, `aujourdhui`, `nb` (d'où `lieu` pour une colonne « Où »).

### Les champs communs d'un outil

`id`, `sujet`, `titre`, `resume` (une phrase, 25 mots au plus), `quand`, `etapes` (1 à 3, 25 mots au plus chacune),
`cours` (ids de modules qui ont une fiche de cours ; liste vide permise), `type` (`tableau`, `document`, `matrice`),
`exemple` (obligatoire), `export` (facultatif, parmi `excel`, `copier`, `imprimer` ; par défaut les trois).
Un champ inconnu donne une alerte du vérificateur (une faute de frappe ne passe pas en silence).

### Les colonnes (et les rubriques simples d'un document)

| type | saisie | valeur gardée | dans Excel |
|---|---|---|---|
| `texte` | une ligne | texte (2 000 caractères au plus) | texte |
| `texte-long` | plusieurs lignes | texte (5 000 au plus) | texte, retour à la ligne |
| `nombre` | « 12,5 » ou « 12.5 » | nombre | nombre |
| `date` | le calendrier | `"2027-03-15"` ; affichée 15/03/2027 | date (un nombre de jours) |
| `choix` | une liste | une des `valeurs` (nombres ou textes, pas mélangés) | liste déroulante |
| `calcul` | rien : calculé | — (jamais gardé) | **formule** Excel |

Options : `aide` (l'indication : texte d'attente dans le site, message de saisie dans Excel) ; `defaut` (valeur d'une
ligne neuve, permise ; pas pour un calcul) ; `largeur` (largeur Excel, 1 à 120) ; pour un choix : `libelles` (« 3 ·
Forte ») et `couleurs` (une par valeur : `ok`, `attention`, `ko`, `neutre`, ou `""`) ; pour un calcul : `formule` et
`resultat` ; pour un calcul ou un nombre : `niveaux` ; pour une colonne saisie d'un tableau : `facultatif`.

**Une date calculée** (`resultat: "date"`, novembre 2026) : un calcul dont le résultat est une date, affichée
JJ/MM/AAAA (site, copie, impression) et au format date dans Excel. La formule donne une date : une date plus ou moins
des jours (`limite - 15`), ou `mois(date, n)` (voir « Les expressions »). Ex. l'échéancier des contrats :
`{ id: "date_limite", type: "calcul", formule: "mois(fin, -preavis)", resultat: "date" }` (la fin moins le préavis, en
mois). Pas de niveaux sur une date ; pas de total (somme, moyenne, min, max) sur une colonne date. Le vérificateur
contrôle que la formule donne bien une date, et qu'un calcul qui donne une date le dit.

**Une colonne facultative** (`facultatif: true`, novembre 2026) : une colonne saisie qu'on peut laisser vide sur
toutes les lignes (l'offre C d'une grille de choix, quand il n'y a que 2 offres). Tant qu'elle est vide partout : aucune
alerte « case vide » pour elle ; ses calculs restent vides, et le total d'elle-même ou d'un calcul qui en dépend aussi
(« — », pas 0) ; le reste est inchangé. Dès qu'une de ses cases est remplie, elle compte comme une autre colonne : une
case vide est dite. Dans Excel, la même règle, qui suit la saisie : `ET(E2="" ; NBVAL($E$2:$E$41)>0)` dans le message
des cases vides, `SI(NBVAL($E$2:$E$41)=0 ; "" ; …)` pour ses totaux. Pas de valeur par défaut (vérificateur).

**Niveaux** : `[{ max: 2, libelle: "On surveille", couleur: "ok" }, …]`, bornes croissantes ; le dernier peut être
sans borne (tout le reste). `max: 2` : jusqu'à 2 compris ; `sous: 0` : en dessous de 0, strictement (le reste de
tolérance d'un jalon : `-0,5` est hors tolérance, `0` est dedans ; l'alerte dit la même chose avec `reste < 0`).
Le 1er niveau dont la borne tient s'applique. Toujours un mot (`libelle`) avec sa couleur. Dans Excel : une colonne
« Niveau : … » (formule SI imbriquée) colorée par une mise en forme conditionnelle. Un niveau et une alerte sur le
même sujet suivent **exactement la même condition** : jamais deux messages contraires.

### Les expressions (formules, alertes, conditions des totaux)

- Nombres (`6`, `0.8` : point décimal), textes entre guillemets (`"Ouvert"`), noms de colonnes ou de rubriques.
- Calcul : `+ - * /`, ou `− × ÷` ; parenthèses ; moins devant (`-x`).
- Comparaisons : `= <> < <= > >=`, ou `!= ≠ ≤ ≥`. Logique : `et`, `ou`, `non` (sans majuscules ou en majuscules).
- `x vide`, `x non vide` : seulement après un nom (une liste ou un tableau d'un document : seulement ainsi).
- `aujourdhui` (ou `aujourd'hui`) : la date du jour ; pour un exemple, `exemple.date`.
- `abs(x)` : sans signe (un écart de ± 14 jours) ; `nb("A")` : dans une matrice, les cases de la ligne égales à A.
- `mois(date, n)` : la date décalée de n mois (n négatif : avant), comme MOIS.DECALER (`EDATE`) d'Excel : le même jour,
  ou le dernier jour du mois quand il n'existe pas (31 mars moins 1 mois = 28 ou 29 février ; 30/11/2029 moins 6 mois =
  30/05/2029). n est coupé à l'entier, comme dans Excel. Une case vide (la date ou n) rend le calcul vide ; une date
  hors d'Excel (avant mars 1900, après 9999) aussi. Pas dans le `si` d'un total (Excel refuse `EDATE` sur une plage) :
  passer par une colonne calculée.
- Une date est un nombre de jours : `prevision - prevu` donne des jours ; une date plus ou moins des jours donne une
  date (`fin - 30`). Contrôlé par le vérificateur : on n'additionne pas deux dates, on ne multiplie ni ne divise une
  date, un nombre moins une date est refusé, une date se compare à une date (pas à un nombre de jours).
- **Les cases vides** (même règle sur le site et dans Excel, rien ne disparaît sans message) :
  - dans une **somme ou une différence**, un nombre saisi vide (nombre, ou choix de nombres) **compte pour 0** :
    `consomme + reste`, consommé vide → le reste ; `atterrissage - reference`, référence vide → l'atterrissage ;
  - dans un **produit ou un quotient** (et `abs`, `mois`), une case vide donne un **calcul vide** ; de même une date vide, un
    autre calcul vide, ou un total vide. La ligne a alors une alerte qui dit quelle case manque :
    « Poste 2 (« Mise en service ») : « Quantité » est vide, donc pas de « Total (€) » sur cette ligne, ni dans les
    totaux. » (un seul message par ligne pour toutes ses cases vides ; pas de message quand une alerte du tableau
    teste déjà cette case avec `vide` et s'affiche) ;
  - une **division par zéro** est vide, sans alerte (le délai de retour d'une option sans gain) ;
  - une **comparaison avec une case vide est fausse** (sauf le terme vide d'une somme, qui vaut 0) ;
  - une **ligne vide** (rien de saisi, ou seulement les valeurs par défaut) n'a ni calcul, ni alerte, ni total ;
  - une **colonne facultative** vide sur toutes les lignes n'a pas de message (voir « Les colonnes »).
- Les textes se comparent sans tenir compte des majuscules (comme Excel).
- Types contrôlés : un calcul donne un nombre (ou une date, avec `resultat: "date"`) ; une alerte ou un `si` donne une
  condition ; pas de calcul sur un texte ; pas de comparaison nombre / texte ; `statut = "Ouvrt"` est refusé (pas une
  valeur de `statut`).
- Ce qu'une expression peut lire : les colonnes de sa ligne ; dans un tableau d'un document, aussi les rubriques
  simples du document (texte, nombre, date, choix ; un même nom est refusé) ; dans une alerte du document, les
  rubriques et les totaux qui ont un `id` ; dans un total calculé, les totaux placés avant lui et les rubriques simples.
- Excel : le lecteur écrit la même formule, en anglais avec des virgules (Excel en français l'affiche en français).
  Une comparaison devient `SI(case vide ; FAUX ; comparaison)`, un calcul `SI(case vide ; "" ; calcul)` (seulement
  les cases qui rendent le calcul vide ; un terme d'une somme vide vaut 0 dans Excel aussi), et `SI(ligne vide ; "" ;
  …)` quand une somme n'a que des termes saisis. Le message des cases vides : `CHOISIR(1 + (B2="")*1 + (C2="")*2 ; …)`.
  Au plus 5 cases qui peuvent manquer par tableau (vérificateur).

### Le type `tableau` (et la rubrique `tableau` d'un document)

`colonnes` (au moins une), `ligne: { titre, pluriel? }`, `alertes`, `totaux`, `aideTotaux` (un texte sous les totaux),
`modele` (des lignes déjà écrites dans un document neuf et dans le modèle vide d'Excel, ex. les 4 axes de la météo).
- **Une ligne compte** (calculs, alertes, totaux) si une case est remplie autrement que par sa valeur par défaut.
- **Limites** : 300 lignes par tableau, 40 colonnes d'une matrice, 100 lignes d'une liste. Au-delà, rien n'est ajouté
  et un message le dit sous le bouton (« Limite atteinte : 300 risques au plus. »).
- **Alertes** : `{ si, message }`, par ligne ; elles s'affichent sous le document : « Risque 3 (« Le début du texte… ») :
  message », et la ligne porte la marque « Alerte ». Message de 30 mots au plus.
- **Totaux** : `{ libelle, calcul, colonne?, si?, id?, niveaux?, formule? }`. `calcul` : `nombre` (les lignes qui
  comptent, sans colonne), `somme`, `moyenne`, `min`, `max` (avec une colonne de nombres, pas une date). `si` : seulement
  les lignes où la condition est vraie. `id` : le total se lit dans les alertes du document. `niveaux` : un mot et une
  couleur (la météo globale : « 2 · Orange »).
- **Un total calculé à partir d'autres totaux** (`calcul: "formule"`, novembre 2026) : `formule` lit les totaux du
  même tableau qui ont un `id` et sont placés **avant** lui (jamais de boucle), et les rubriques simples du document ;
  ni `colonne` ni `si`. Ex. MoSCoW : `{ id: "part_doit", libelle: "Part du « doit » (%)", calcul: "formule",
  formule: "effort_doit / effort_prevu * 100", niveaux: [{ max: 60, … }, { … }] }`, et l'alerte du document
  `part_doit > 60` (la même condition que le niveau). Un total vide rend le calcul vide (« — ») ; une division par zéro
  aussi, sans alerte. Dans Excel : une formule qui renvoie aux cellules des totaux (`SI(OU(B35="" ; B34="") ; "" ;
  SIERREUR(B35/B34*100 ; ""))`) et de la rubrique sur la 1re feuille.
- Écran : un tableau sur PC ; une carte par ligne quand la place manque (téléphone, 390 px), sans défilement de côté.

### Le type `document`

`rubriques: [...]`, `alertes` (du document). Une rubrique : `{ id, titre, type, aide? }`, type parmi les colonnes
saisies (`texte`, `texte-long`, `nombre`, `date`, `choix`), `liste` (des lignes de texte ; `ligne: { titre }`) ou
`tableau` (voir plus haut). Exemple : `exemple: { nom, date?, rubriques: { id: valeur } }` ; une liste vaut
`["…", "…"]`, un tableau `[{ colonne: valeur }]`.

### Le type `matrice`

`ligne: { titre, pluriel?, aide? }` (ex. Livrable), `colonne: { titre, pluriel?, aide? }` (ex. Personne : l'élève
ajoute, renomme, supprime les colonnes), `valeurs` (une par case, ou vide), `libelles`, `aides` (une par valeur, sous
la matrice), `alertes` par ligne avec `nb("A")`. Exemple : `{ nom, colonnes: ["DAF", …], lignes: [{ nom, cases: ["A", "", …] }] }`.

### L'exemple

Obligatoire, rempli, conforme (valeurs permises, colonnes connues : le vérificateur le contrôle). `date` facultative :
l'exemple se lit à cette date (« situation au 08/02/2027 ») ; ses alertes « date passée » ne changent pas avec le
temps. Les exemples sont tirés de DEMAT 2027 (`docs/plan-chef-de-projet.md`).

### Les documents de l'élève et les fichiers

- `localStorage`, clé `learnsql-outils` : `{ version: 1, docs: [{ id, outil, nom, cree, maj, contenu }] }`.
  `contenu` : `{ lignes }` (tableau), `{ rubriques }` (document), `{ colonnes, lignes }` (matrice). Enregistré à chaque
  saisie ; navigateur qui refuse : les documents vivent le temps de l'onglet, et la page le dit **dès son ouverture**,
  en un seul message (un essai d'écriture).
- Un nom fait seulement d'espaces devient « Sans nom ».
- Jamais envoyés, jamais synchronisés, pas effacés à la déconnexion (page Confidentialité). Pour les effacer :
  « Supprimer » dans un document, « Effacer tous mes documents » en bas de `#/outils`, ou « Supprimer mon compte »
  en répondant oui à « Effacer aussi tes notes et tes documents des outils de CET appareil ? ».
- Fichier (« Enregistrer dans un fichier ») : `{ format: "learnsql-outil", version: 1, outil, titre, nom, enregistre,
  contenu }`. « Ouvrir un fichier » contrôle tout : un fichier faux donne un message ; une autre version que 1 est
  refusée (« version inconnue ») ; un fichier d'un autre outil est refusé (avec son nom). Ouvert, le document dit en
  haut de sa page ce qui a été corrigé ou coupé (5 points au plus : « Plus de 300 lignes, la fin est coupée (5 en
  trop). », « Ligne 2, Probabilité : « 5 » n'est pas une valeur permise (1, 2, 3). »). Les messages des boutons
  s'affichent sous ces boutons, sur téléphone aussi.

### Les sorties

- **Excel** (`.xlsx` fait dans le navigateur : le XML minimal d'un classeur dans un zip « stocké » avec CRC32).
  Tableau : une feuille, l'en-tête en gras et figé, les largeurs, une ligne par ligne du document puis 10 lignes vides
  avec leurs formules (le modèle vide : 30 lignes), les colonnes calculées en formules, « Niveau : … » et « Alertes »
  en formules, les listes déroulantes et les messages d'aide, les couleurs, les totaux en dessous (formules
  matricielles pour les `si`). Document : une feuille pour les rubriques (en texte), puis une feuille par tableau ; une
  formule qui lit une rubrique pointe sur sa cellule ; sous les rubriques, les **alertes du document** en texte, avec
  la date de l'export (et la date de la situation pour un exemple) : elles ne se recalculent pas dans Excel. Matrice :
  une feuille, les alertes par ligne (NB.SI), la légende.
  Les valeurs calculées sont écrites aussi (lisibles sans recalcul) ; Excel recalcule à l'ouverture.
- **Copier** : le HTML mis en forme (styles dans les balises, pour Word et les messageries) et le texte simple ; repli
  par l'événement « copy », puis le texte seul.
- **Imprimer / PDF** : le même HTML ; le CSS d'impression n'imprime que lui (tableau et matrice en paysage). Un titre
  ne reste pas seul en bas de page ; l'en-tête d'un tableau se répète sur chaque page.

### Contrôles et tests

- `node outils/verifier.js` : ids et fichiers (un id de sujet ou d'outil n'est pas celui d'un parcours, d'un
  sous-parcours ou d'un module), sujets publics, types, colonnes, choix, niveaux, valeurs par défaut, lignes du
  modèle, formules lues et typées (colonnes existantes, pas de boucle ; les dates : `natureDate`), dates calculées,
  colonnes facultatives, alertes, totaux (dont les totaux calculés), cours qui existent, exemple conforme, sorties
  faites sans erreur.
- `node outils/tests/outils-moteur.js` : le lecteur (calculs, erreurs, types, dates, formules Excel), les valeurs
  (`mois()` et la fin de mois), les calculs des exemples de chaque outil (totaux et alertes attendus), les dates
  calculées, les totaux calculés, les colonnes facultatives (un document de test sans rubrique texte, et les cas de
  l'échéancier, de MoSCoW et de la grille de choix), le contrôle des fichiers (400 fichiers au hasard), le zip et les
  classeurs ; avec python3 et openpyxl, chaque cellule de chaque classeur est relue ; avec `OUTILS_LIBREOFFICE=1`,
  LibreOffice recalcule toutes les formules et doit trouver les mêmes résultats que le site.
- `outils/tests/outils.js` (navigateur) : menu, droits, étapes, les 3 types, documents, fichiers, Excel de chaque outil,
  copie, impression, cours, téléphone et PC, cases vides, limites, 320 px sans débordement, cibles tactiles de 44 px,
  stockage refusé, « Effacer tous mes documents », la date calculée, le total calculé et la colonne facultative (23 bis),
  les droits des outils (sans compte, compte non limité, hors du groupe, dans le groupe, le dico réservé, `outils`
  réservé, admin). Les étapes, les outils et le nombre de cartes attendus sont lus dans les données
  (`data/outils/sujets.js` et les définitions), pas écrits dans le test. La page Équipe (cocher puis valider, grille
  des droits des outils, 390 px) : `outils/tests/equipe.js`.
