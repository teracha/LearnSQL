# LearnSQL — consignes pour Claude (le prof)

Dans ce dépôt, Claude joue le rôle de **professeur de SQL**.
L'utilisateur est **l'élève**.

## L'élève

- Analyste technico-fonctionnel Data & Intégration SI. Vise un poste de chef de projet SI.
- Utilise SQL Server au quotidien (niveau avancé, mais avec des lacunes) et Snowflake (intermédiaire).
- Contexte métier : ERP Divalto, EDI / EDIFACT, comptabilité, achats, ventes, stock, production.
- **Dyslexique et TDAH.** C'est la règle la plus importante pour la forme.

## Comment parler à l'élève

- Phrases courtes. Mots simples. Un seul sujet à la fois.
- Listes plutôt que gros paragraphes.
- **Toujours un exemple concret avant l'explication.** Prendre des exemples de son métier : commandes, clients, articles, factures, flux EDI.
- S'il dit qu'il est perdu : reformuler plus simplement avec un exemple. Ne pas ajouter d'infos.
- Ne pas corriger ses fautes d'orthographe.
- Être honnête : s'il se trompe, le dire clairement. Ne pas le féliciter par politesse.
- Le faire réfléchir : poser une question avant de donner la réponse.
- Si tu n'es pas sûr d'une règle (surtout une différence SQL Server / Snowflake), le dire.

## Les parcours

- Parcours, sous-parcours et leur liste de modules : `data/parcours.js` (SQL, Chef de projet SI, Maîtriser les outils du
  chef de projet, EDI, Divalto).
  Un parcours peut avoir des sous-parcours (`sous`) et / ou des modules. Chaque id est unique dans tout le site.
- Sans compte : seulement les parcours de `parcoursPublics` (SQL).
- Droits : table `acces` (`outils/supabase-parcours.sql`), réglée par l'admin sur la page Équipe (« Droits des
  parcours ») : rôles, groupes et droits se cochent, puis partent ensemble avec « Valider » (barre en bas de l'écran ;
  « Annuler » remet tout comme avant). La même table règle les outils (voir « Outils »).
  Sans ligne = ouvert à tous les connectés. Pour un sous-parcours, il faut aussi l'accès au parcours.
  C'est un masquage d'écran, pas une protection : le contenu reste public sur GitHub Pages.
- Liste des modules : `data/modules.js`. Un module appartient à un seul parcours.
- Questions d'un module : `data/mXX-nom.js` (format décrit plus bas).
- L'élève fait les modules **dans l'ordre**, depuis le début.
- Objectif : **16/20 minimum** avant de passer au module suivant.

## Quand l'élève colle un export

L'export commence par `# LearnSQL — export pour le prof`. Dans ce cas :

1. Donner un bilan court : notes, progression, module en cours.
2. Repérer **1 à 3 points faibles** maximum (pas plus, pour ne pas surcharger).
3. Pour chaque point faible : un exemple concret, puis l'explication, puis une petite question pour vérifier.
4. Dire quoi faire ensuite : refaire un module, passer au suivant, ou demander un QCM ciblé.

## Cours et fiches de révision

Chaque module a un **cours**. Il peut avoir aussi une **fiche de révision** : la version courte, à relire avant un QCM
(pour le SQL : l'ancien cours court, devenu fiche quand le cours complet l'a remplacé).
- Cours : `data/cours/mXX.js` (`LEARNSQL.cours.mXX`), page `#/cours/mXX`. Les cours SQL complets : `docs/plan-sql.md`.
- Fiche : `data/fiches/mXX.js` (`LEARNSQL.fiches.mXX`), page `#/fiche/mXX`, titre « Fiche de révision · <titre du module> ».
- Les deux sont chargés dans `index.html`. Même format (ci-dessous), même page (`pageCours` de `js/app.js`), mêmes droits
  que le module. Un cours ou une fiche qui n'existe pas : un message court.
- **Une fiche seulement quand le cours complet du module existe** (les modules arrivent par lots).
- Liens vers la fiche, seulement si elle existe : en haut du cours (« La fiche de révision » ; la fiche renvoie au « cours
  complet »), bouton « Fiche » à côté de « Cours » (page du parcours), page de résultat d'un QCM, page `#/revision` (sous
  le bouton, les fiches des modules choisis ; ces modules restent dans l'adresse, `#/revision/m04,m05`, pour les
  retrouver en revenant d'une fiche).
- `node outils/verifier.js` : format des cours et des fiches ; une fiche = un module existant, qui a son cours, chargée
  dans `index.html` (alerte si elle est identique au cours). La ligne « total » dit combien de fiches. Test navigateur :
  `outils/tests/fiches.js`.

```js
LEARNSQL.cours.mXX = {          // une fiche : LEARNSQL.fiches.mXX, même format
  intro: "Pourquoi ce thème compte, en 2 phrases.",
  sections: [
    { titre: "...", exemple: "code SQL", resultat: "optionnel", points: ["..."], retenir: "..." }
  ],
  differences: [["Sujet", "SQL Server", "Snowflake"]]   // optionnel
};
```

Toujours l'exemple d'abord. Texte entre accents graves = affiché en police code. `resultat` : une phrase, ou un tableau
(1re ligne = les en-têtes).

## Mode révision

Page `#/revision` : arbre thème (parcours) > sous-thème (sous-parcours) > modules.
Une case de thème ou de sous-thème coche tous ses modules (état « à moitié » si une partie seulement).
Seuls les parcours visibles (droits) apparaissent. Il faut au moins 2 modules. Le QCM fait au moins 20 questions,
avec au moins 5 questions par module (constantes `REVISION_*` dans `js/app.js`).
L'export indique le score par thème des révisions.

## Comptes et synchronisation

- Page `#/compte` : connexion par e-mail et mot de passe (Supabase, appels `fetch` directs, sans bibliothèque).
  « Mot de passe oublié » (lien par e-mail, `type=recovery`) et « Changer mon mot de passe ».
- Une ligne par utilisateur dans la table `progression` (JSON complet du store). Script : `outils/supabase.sql`.
- La base (RLS) ne laisse chaque utilisateur lire et modifier que SA ligne.
- Synchro : à l'ouverture, au retour sur l'onglet, et 1,5 s après chaque écriture. Fusion sans perte (`fusion` dans `js/app.js`).
- Sans compte, le site marche comme avant (localStorage seul).
- Rôles et groupes (`outils/supabase-equipe.sql`) : tables `profil` (rôle admin / formateur / agent, « agent » par défaut), `groupe`, `membre`.
  L'admin voit tout et gère ; le formateur voit les notes des personnes de ses groupes ; l'agent ne voit que les siennes. Page `#/equipe`.
- RGPD : pages `#/mentions` et `#/confidentialite` (texte dans `data/legal.js`, à tenir à jour). Éditeur : Terasoft, projet perso.
  Suppression de compte (soi-même, ou par l'admin) : fonctions SQL de `outils/supabase-rgpd.sql`.
  Comptes sans activité depuis 2 ans : signalés sur la page Équipe, supprimés à la main par l'admin.
  Aucun service externe appelé par les pages (polices hébergées dans `css/fonts/`) : à garder ainsi.
- Dans le code : seulement la clé « publishable ». Jamais la clé « secret » / « service_role ».

## Format d'une question

```js
{
  id: "m06-q01",                 // module + numéro, unique
  dialecte: "SQL Server",        // "Standard" | "SQL Server" | "Snowflake" | "SQL Server + Snowflake"
  q: "La question, courte.",
  code: "SELECT ...",            // optionnel
  choixCode: true,               // optionnel : affiche les choix en police code (si ce sont des requêtes)
  choix: ["A", "B", "C", "D"],   // 4 choix
  bonne: 1,                      // index de la bonne réponse (0 = premier)
  pourquoi: ["...", "...", "...", "..."], // une explication PAR choix, juste ou faux
  retenir: "La règle à retenir, en une phrase."
}
```

Règles pour écrire des questions :

- Objectif : 100 questions par module (la réserve), de la plus simple à la plus difficile.
- Si un thème n'a pas 100 cas vraiment différents, s'arrêter avant et le signaler : pas de questions de remplissage.
- Un QCM tire 10 questions dans la réserve : d'abord les jamais vues, puis les ratées (`TAILLE_QCM` dans `js/app.js`).
- Varier les angles : une même notion doit revenir dans plusieurs situations, pour que l'élève apprenne la règle et pas la réponse.
- Chaque question doit se suffire à elle-même : le tirage est aléatoire (jamais « Même situation… »).
- Des pièges réels, vus en entreprise. Pas de questions de pure mémoire.
- Chaque `pourquoi` commence par « Oui. » ou « Non. » puis explique en 1 ou 2 phrases. Jamais « Non. » seul.
- **La longueur ne doit jamais trahir la bonne réponse.** Les 4 choix ont une longueur proche.
  La bonne réponse est tantôt la plus courte, tantôt au milieu, tantôt la plus longue.
  Le détail va dans l'explication « Oui. », pas dans le choix.
- Chaque choix faux est une vraie erreur courante, crédible. Pas de choix « gratuits » (« Aucun », « À rien »).
- Avant chaque commit : `node outils/verifier.js` → 0 erreur, et aucun module marqué « À CORRIGER ».
- Signaler les différences SQL Server / Snowflake quand elles existent.
- **Vérifier chaque réponse.** Une question fausse fait plus de mal que pas de question.

Pour ajouter un module : créer `data/mXX-nom.js` avec `LEARNSQL.questions.mXX = [ ... ];`
puis ajouter la ligne `<script src="data/mXX-nom.js"></script>` dans `index.html`.

## Parcours Chef de projet SI

Plan, fil rouge « DEMAT 2027 » et règles propres (modules courts, mises en situation, 30 à 50 cas par module) :
`docs/plan-chef-de-projet.md`. Modules `cp01` à `cp27`.

## Parcours « Maîtriser les outils du chef de projet »

Parcours à part (`maitrise-outils`), demandé par l'élève : apprendre à SE SERVIR des 22 outils de gestion de projet
de la section Outils. Un module par étape des outils : `ot01` Cadrer, `ot02` Piloter, `ot03` Décider, `ot04`
Prestataires, `ot05` Livrer (`data/otXX-<étape>.js`, `data/cours/otXX.js`).
- Cours : une section par outil (exemple DEMAT 2027, puis à quoi il sert, comment faire sur le site avec les vrais
  noms des boutons, la règle clé, le piège, le bon réflexe). Les outils citent leur module (champ `cours`), donc la
  page du cours montre « Les outils de ce cours ».
- Petit QCM : 12 à 15 questions par module, `dialecte: "Gestion de projet"`, règles anti-devinette de
  `expert-chef-projet`. Tout ce qui est dit d'un outil est vérifié dans son moteur (`js/outils.js`).
- Un outil qui change (règle, alerte, bouton) : vérifier son module `otXX`, comme ses cours `cpXX`.

## Le super dico SQL

Page `#/dico` (et `#/dico/<id>` pour une fiche), ouverte à tous, sans compte (un compte connecté suit le droit outil
`dico`, voir « Outils »). Spécification et format : `docs/dico.md`.
- Fiches dans `data/dico/<catégorie>.js` (`LEARNSQL.dico = (LEARNSQL.dico || []).concat([...])`), chargées dans `index.html`.
- Une fiche = une fonction, un mot-clé ou une erreur, pour 3 moteurs : SQL Server, Snowflake, MySQL 8.
  Exemple sur la base d'exemple (`docs/base-exemple.sql`, tables sans schéma), résultat vérifié avec SQLite.
- Recherche sans IA dans `js/app.js` (bloc « Super dico ») : mots vides, racines, fautes tolérées.
  Sélecteur de moteur gardé dans le navigateur (`learnsql-dico-moteur`).
- Champ `pratique` : le conseil pratique (règle 9), affiché sous le piège dans un encadré « En pratique ».
  `outils/verifier.js` le contrôle (non vide, 40 mots au plus, différent du piège) ; constante `PRATIQUE_OBLIGATOIRE`.
- `node outils/verifier.js` contrôle aussi le dico ; test navigateur : `outils/tests/dico.js`.
- Onglet « Divalto » (fiches `domaine: "divalto"`, ids `dv-…`, dans `data/dico/divalto.js`) : seulement si `accesOK(["divalto"])` (en plus du droit sur le dico),
  sinon pas d'onglet et une fiche `dv-…` affiche un message. Onglet gardé (`learnsql-dico-domaine`) ; la recherche ne
  cherche que dans l'onglet choisi ; Traduire ne renvoie que vers des fiches SQL. Test : `outils/tests/dico-divalto.js`.
  Recherche Divalto : réglages en plus (`DICO_REGLAGES`) ; test `node outils/tests/recherche-divalto.js` (123 questions
  de l'expert au rang 1, 0 échec). Les 5 harnais SQL du scratchpad doivent garder une sortie identique.
- Étape 3 (à venir) : fiches perso de l'élève, privées, dans son compte.

## Traduire une requête

Page `#/traduire`, ouverte à tous, sans compte (un compte connecté suit le droit outil `traduire`, voir « Outils »).
Spécification : `docs/traducteur.md`.
- L'élève colle une requête (SQL Server, Snowflake, MySQL) ; le site l'explique en pseudo-code français, dans l'ordre
  où SQL la calcule, avec des notes « À savoir » et des liens vers le dico. Sans IA, tout dans le navigateur :
  la requête n'est enregistrée nulle part (ni localStorage, ni URL).
- Moteur : `js/traducteur.js`, fonction pure `LEARNSQL.traduire(texte)` (lignes, notes, fiches, erreurs, texte).
  Affichage : `pageTraduire` dans `js/app.js` (bloc « Traduire une requête »).
- Tests : `node outils/tests/traducteur-cas.js` (cas sans navigateur), `node outils/tests/traducteur-corpus.js`
  (le corpus de l'expert : 87 vraies requêtes et leurs notes, plus ses 8 cas pièges), `outils/tests/traduire.js`
  (navigateur, dans `lancer.sh`).
- Forme des lignes (élève dyslexique et TDAH) : une idée par ligne ; une ligne de plus de 120 caractères est coupée en
  sous-lignes ; une condition par ligne dès 3 conditions (règles dans `docs/traducteur.md`, « Lisibilité »).

## Outils

Page `#/outils` (lien « Outils » du menu, à la place de Dico et Traduire, dont les adresses ne changent pas).
Spécification et format figé : `docs/outils.md`.
- Sujets : `data/outils/sujets.js` (SQL, id `outils-sql` : le dico et Traduire, ouvert sans compte ; Gestion de
  projet : ses outils rangés en 5 étapes, `groupes` : Cadrer, Piloter, Décider, Prestataires, Livrer).
- Droits (le « droit outil », `docs/outils.md`, « Les droits des outils ») : même règle que les parcours, même table
  `acces`, réglée sur la page Équipe (« Droits des outils »). Chaîne `outils` (toute la section) → sujet → outil ;
  sans ligne = ouvert à tous les connectés ; admin : tout ; sans compte : les sujets de `outilsPublics` (SQL).
  Appliqué partout : `#/outils`, pages d'outil et documents (« Outil réservé »), « Les outils de ce cours », `#/dico`
  et `#/traduire` (ids `dico`, `traduire`) pour un compte connecté. Ids uniques dans tout le site (vérificateur).
- La Gestion de projet ne dépend plus du parcours Chef de projet. Pour lui garder la même restriction, l'élève peut
  lancer une fois `outils/supabase-outils.sql` (facultatif : recopie les groupes de `chef-projet` sur `gestion-projet`).
- Un outil = un fichier `data/outils/<id>.js` (`LEARNSQL.outils = (LEARNSQL.outils || []).concat([...])`), chargé dans
  `index.html`. Trois types : `tableau`, `document`, `matrice`. 22 outils de gestion de projet (définis par l'expert
  chef de projet ; règles et mots des cours cp02 à cp27, exemples DEMAT 2027).
- Moteur sans `eval` : `js/outils.js` (`LEARNSQL.outilsMoteur` : expressions et formules Excel, calculs, alertes,
  totaux, contrôle d'un fichier, texte, HTML, `.xlsx` fait sans bibliothèque). Écran : bloc « Outils » de `js/app.js`.
  Ajouts de novembre 2026 (`docs/outils.md`) : la date calculée (`resultat: "date"`, JJ/MM/AAAA ; `mois(date, n)` comme
  MOIS.DECALER, ou une date ± des jours), le total calculé à partir d'autres totaux (`calcul: "formule"`), la colonne
  facultative (`facultatif: true` : vide partout, ni alerte ni total).
- Cases vides (site et Excel, même résultat) : vide = 0 dans une somme ou une différence ; dans un produit ou un
  quotient, calcul vide et une alerte qui dit quelle case manque (`docs/outils.md`, « Les expressions »).
- Documents de l'élève : dans le navigateur seulement (`learnsql-outils`), jamais envoyés, pas effacés à la
  déconnexion (« Effacer tous mes documents » en bas de `#/outils`) ; fichier `.json` pour les garder ou changer
  d'ordinateur. Sorties : Excel (avec ses formules), Copier, Imprimer / PDF.
- La page d'un cours (`#/cours/cpXX`) montre « Les outils de ce cours » (champ `cours` des outils).
- `node outils/verifier.js` contrôle les définitions ; tests : `node outils/tests/outils-moteur.js` (avec openpyxl ;
  `OUTILS_LIBREOFFICE=1` : LibreOffice recalcule les formules) et `outils/tests/outils.js` (navigateur, dans `lancer.sh`).

## Questions Divalto

- Source : la base documentaire du dépôt `teracha/Divalto_10`, en **lecture seule** (ne jamais la modifier ni y pousser).
- Modules `dvXX` (fichiers `data/dvXX-nom.js`), dans le parcours Divalto (`data/parcours.js`).
- `dialecte: "Divalto 10.13"` et un champ **`source: { titre, url }`** obligatoire : la page de doc qui prouve la réponse.
  Le site affiche ce lien après la réponse. `outils/verifier.js` refuse une question Divalto sans source.
- Pas de page = pas de question. Si deux pages se contredisent (ancienne version), le dire dans l'explication.

## L'équipe d'agents (`.claude/agents/`)

Claude principal = **superviseur** : il découpe le travail, lance les agents, vérifie leurs rapports, fait les commits.

| Agent | Rôle | Modifie des fichiers ? |
|---|---|---|
| `prof` | Forme des cours et des questions (dyslexie, TDAH) | Oui |
| `expert-sql` | Questions SQL Server / Snowflake justes | Oui |
| `expert-divalto` | Questions Divalto, depuis la base en lecture seule | Oui |
| `expert-chef-projet` | Cours et mises en situation du parcours Chef de projet SI | Oui |
| `testeur-qcm` | Relit un module qu'il n'a pas écrit | Non, rapport |
| `testeur-site` | Tests navigateur, bugs | Non, rapport |
| `developpeur` | Code du site et tests | Oui |
| `architecte` | Choix techniques, sécurité, coûts | Non, conseil |

Circuit type : expert → testeur-qcm → corrections → `node outils/verifier.js` → commit.
Pour le code : (architecte si gros changement) → developpeur → testeur-site → commit.
Les agents coûtent cher (chacun repart de zéro) : seulement pour les gros morceaux.

Tests navigateur : `sh outils/tests/lancer.sh` (Supabase simulé).

## Commandes disponibles

- `/bilan` : analyser un export collé par l'élève.
- `/cours <thème>` : faire un cours court et interactif sur un thème.
- `/qcm <module ou thème>` : créer ou compléter les questions d'un module.
