# Conseils d'architecte

Demandé par l'élève (novembre 2026) : « On a des astuces, mais il nous faudrait des conseils d'architecte. Comment bien
créer une table, comment bien créer une base, les questions à se poser […] Quand je crée une table, quand je crée une
base, quand je mets une valeur, quand j'exécute une commande SQL depuis un fichier […] Tu crées une table : pose-toi
telle question, fais attention à ça […] de l'information claire et précise, donc des questions, des conseils, et pas de
limites en termes de taille. L'important, c'est qu'il y ait toutes les informations nécessaires et toutes les questions
générales que je dois me poser. »

Ses choix : les 4 familles (Concevoir, Écrire et charger, Interroger, Exploiter) ; une **checklist à cocher** ; les
3 moteurs (SQL Server, Snowflake, MySQL), avec le sélecteur du dico.

## La page

- Un outil de la section Outils (`docs/outils.md`), sujet SQL (`outils-sql`) : id `architecte`, titre « Conseils
  d'architecte », lien `#/architecte`. Mêmes droits que le dico et les astuces : public sans compte ; un compte connecté
  suit le droit outil `architecte` (page Équipe, « Droits des outils »), sinon « Outil réservé ». Les liens vers le dico
  suivent le droit du dico, ceux vers un autre outil le droit de cet outil.
- `#/architecte` : une zone de recherche (« Ex. : je crée une table pour les commandes EDI ») et le sélecteur de moteur
  du dico (Tous · SQL Server · Snowflake · MySQL ; le même choix, gardé dans `learnsql-dico-moteur`).
  - **Avec une phrase** : les situations les plus proches, de la meilleure à la moins bonne, comme les astuces.
  - **Sans phrase** : toutes les situations, rangées par famille (ordre ci-dessous) ; pour chacune son titre, son
    résumé, le nombre de questions et combien sont cochées.
- `#/architecte/<id>` : une situation.
  1. Le titre, la famille, le résumé.
  2. **L'exemple d'abord** : le texte, puis le code (celui du moteur choisi quand l'écriture diffère).
  3. **La checklist** : les étapes numérotées, et dans chaque étape ses questions. Chaque question : une case à cocher
     et la question en gras ; dessous, « Pourquoi : », « Le bon réflexe : », les notes des moteurs (« SQL Server : … »)
     et le code s'il y en a. Le nombre de cases cochées, par étape et en tout.
  4. « Les pièges », « En pratique », « Voir aussi » (autres situations, fiches du dico, outils), « Sources ».
  5. Les boutons : « Copier la checklist » (les questions seulement, `[x]` ou `[ ]`, groupées par étape, pour le moteur
     choisi), « Tout décocher », « Nouvelle recherche ».
- **Le moteur choisi** : « Tous » montre toutes les notes de moteur, chacune avec son nom. Un seul moteur : seulement
  sa note ; une question `seulement` pour d'autres moteurs est cachée (et absente de la copie).
- **Les cases cochées** restent dans le navigateur (`learnsql-architecte` : `{ "<situation>": { "<question>": true } }`),
  jamais envoyées. Une question retirée des données : sa case est oubliée sans erreur.
- Lisible à 390 px, sans débordement ; une page longue se lit étape par étape.

### Ce qui est construit (détails d'affichage)

- **La liste** (`#/architecte` sans phrase) : une carte par situation (titre, résumé, « 26 questions · 3 cochées ») ; avec
  plusieurs familles, « Aller à : Concevoir · Écrire et charger · … » en haut. **Les comptes** (liste, étapes, total,
  copie) ne comptent que les questions du moteur choisi.
- **La recherche** : comme les astuces, 8 situations au plus (25 points ou plus), avec leur famille ; sinon « Pas de
  situation sûre pour « … ». Les plus proches : » (3 au plus) ; rien : « Aucune situation ne correspond. Essaie d'autres
  mots, ou regarde toute la liste. » (le bouton vide la recherche). La phrase est gardée le temps de l'onglet (« Nouvelle
  recherche »), jamais enregistrée.
- **La situation**, dans cet ordre : le fil (« Conseils d'architecte › Concevoir »), le titre, la famille, le résumé,
  « Aller à : La checklist · Les pièges · Voir aussi », le sélecteur de moteur, « L'exemple », « La checklist » et ses
  deux boutons, « Les pièges », « En pratique », « Voir aussi », « Les sources », « Nouvelle recherche ».
- **L'exemple** : un moteur seul, son code (`codes.<moteur>`, sinon `code`), sous « Le code · Snowflake » ; « Tous » : le
  code SQL Server, puis les autres écritures **repliées** (« Le code · Snowflake ») ; sans code : le texte seul.
- **La checklist** : une consigne d'une ligne, « 3 cochées sur 26 » et une barre verte, puis une étape = un bloc
  repliable : « 1. Le besoin » et son compte « 2 / 5 » (vert quand l'étape est finie). À la première visite d'une
  situation (dans l'onglet), seule la première étape pas finie est ouverte ; « Ouvrir toutes les étapes » / « Fermer
  toutes les étapes ». Les étapes ouvertes le restent quand on change de moteur (le temps de l'onglet). Une étape sans
  question pour le moteur choisi disparaît, et les étapes affichées sont renumérotées de 1 à n. Une question : une case de
  24 px et la question en gras (toute la ligne est cliquable), puis en retrait « Pourquoi : », « Le bon réflexe : », les
  notes des moteurs affichés (« SQL Server : … », avec un trait à gauche) et le code. Une question `seulement` porte
  l'étiquette « Seulement sur Snowflake ». Une question cochée passe en vert.
- **Les boutons** « Copier la checklist » et « Tout décocher » sont juste sous la checklist (ils agissent sur elle) ;
  « Nouvelle recherche » est en bas de la page.
- **Copier la checklist** : ce texte (les accents graves retirés), pour le moteur choisi :

  ```
  Je crée une table : la checklist (SQL Server)
  3 cochées sur 26

  1. Le besoin
  [x] Que représente UNE ligne de la table ?
  [ ] Cette donnée existe-t-elle déjà ailleurs ?

  2. La clé
  …
  ```

  « Tous » : « (SQL Server, Snowflake et MySQL) », et une question propre à un moteur finit par « (seulement sur
  Snowflake) ». D'abord le presse-papiers, puis le repli (`execCommand`) ; si tout échoue, le texte s'affiche sous les
  boutons, sélectionné, à copier à la main.
- **Tout décocher** : une confirmation (« Décocher toutes les cases de « Je crée une table » ? ») ; toutes les cases de
  la situation, même celles d'une question cachée par le moteur choisi. Sans case cochée : « Aucune case n'est cochée. »
- **Le stockage** : une question retirée des données est oubliée à la prochaine case cochée ; un stockage illisible
  repart de zéro ; si le navigateur refuse d'enregistrer, les cases vivent le temps de l'onglet et la page le dit (« Ce
  navigateur n'enregistre pas tes cases : elles seront perdues en fermant l'onglet. »).
- **Lecture** : une espace insécable avant ? ! : ; » et après « (et dans « 550 000 ») : un signe ne commence jamais une
  ligne.
- **Les liens** : « Voir aussi » montre seulement les situations qui existent, les fiches du dico SQL qui existent (avec
  le droit du dico) et les outils visibles pour le compte (sans compte : ceux des sujets publics).
- Code : bloc « Conseils d'architecte » de `js/app.js` (`pageArchitecte`, `resultatsArchitecte`, `pageSituation`,
  `etapesSituation`, `texteChecklist`, `voirAussiSituation`…), styles `.ar-…` de `css/style.css`.

## Les fichiers

`data/architecte/<famille>.js`, chargés dans `index.html`, un fichier par famille :

```js
LEARNSQL.architecte = (LEARNSQL.architecte || []).concat([
  { ... une situation ... }
]);
```

Les familles, dans l'ordre de la page : Concevoir (`concevoir.js`), Écrire et charger (`ecrire.js`), Interroger
(`interroger.js`), Exploiter (`exploiter.js`). Même liste dans `js/app.js` et `outils/verifier.js`.

## Le format d'une situation

Modèle : `creer-table` dans `data/architecte/concevoir.js`.

```js
{
  id: "creer-table",                 // unique parmi les situations : minuscules, chiffres, tirets
  titre: "Je crée une table",        // la situation, à la 1re personne (« Je … », « J'… », « Ma requête… »), 10 mots au plus
  famille: "Concevoir",              // une des 4 familles
  resume: "…",                       // ce que la checklist couvre, 30 mots au plus
  besoins: ["…", "…"],               // 2 à 4 phrases que l'élève taperait ; la recherche les compare à sa phrase
  essais: ["…", "…"],                // 2 à 4 AUTRES façons de le dire (fautes, sans accent, mots de métier) : pour le test
  exemple: {
    texte: "…",                      // la situation concrète, tirée de son métier (EDI, Divalto, Power BI…)
    code: "…",                       // facultatif : forme SQL Server
    codes: { snowflake: "…", mysql: "…" }   // facultatif : quand l'écriture diffère
  },
  etapes: [                          // 3 à 10 étapes, dans l'ordre où on se pose les questions
    {
      titre: "Le besoin",            // 2 à 5 mots
      questions: [                   // 1 à 10 questions par étape
        {
          id: "grain",               // unique dans la situation (garde la case cochée) : minuscules, chiffres, tirets
          q: "Que représente UNE ligne de la table ?",   // la question à se poser, 20 mots au plus, finit par « ? »
          pourquoi: "…",             // le risque si on l'oublie, concret, 45 mots au plus
          reflexe: "…",              // quoi faire, concrètement, avec un petit exemple si possible, 45 mots au plus
          moteurs: { sqlserver: "…", snowflake: "…", mysql: "…" },   // facultatif : 1 à 3 moteurs, 45 mots au plus chacun
          seulement: ["sqlserver"],  // facultatif : la question ne vaut que pour ces moteurs
          code: "…"                  // facultatif : un petit bout de SQL (8 lignes au plus)
        }
      ]
    }
  ],
  pieges: ["…"],                     // 3 à 10 pièges fréquents, 40 mots au plus chacun
  pratique: "…",                     // facultatif : le conseil du terrain (ERP, EDI, Power BI), 40 mots au plus
  motsCles: ["…"],                   // 6 à 15 mots que l'élève taperait
  voirAussi: ["cle-primaire"],       // des id d'AUTRES situations (qui existent)
  dico: ["create-table"],            // des id de fiches du dico SQL (qui existent)
  outils: ["mots-reserves"],         // facultatif : des id d'outils de la section Outils
  sources: [{ titre: "…", url: "https://…" }]   // 1 à 8 pages officielles lues pour écrire la situation
}
```

Texte entre accents graves = affiché en police code (comme partout sur le site).

## Les règles d'écriture

- **Pour l'élève** (`CLAUDE.md`) : analyste data, SQL Server avancé avec des lacunes, Snowflake intermédiaire, ERP
  Divalto, EDI. Dyslexique et TDAH : phrases courtes, mots simples, une idée par phrase ; chaque mot technique expliqué
  à sa première apparition dans la situation ; le tutoiement ; jamais de référence à son handicap.
- **L'exemple d'abord** : une situation concrète de son métier (commandes, clients, articles, factures, flux EDI,
  Divalto, Power BI), sur les tables de `docs/base-exemple.sql` quand c'est possible.
- **Toutes les questions qu'un architecte se pose**, et seulement elles : pas de limite de nombre (souvent 15 à 35),
  mais pas de remplissage. Une question = une décision ou une vérification réelle. Rangées dans l'ordre où on se les
  pose.
- `pourquoi` : la conséquence concrète d'un oubli (« le même message chargé deux fois donne deux commandes »), pas une
  généralité. `reflexe` : l'action, avec un exemple (« Nomme chaque contrainte : pk_commande_edi »).
- `moteurs` : seulement ce qui change d'un moteur à l'autre. Une question vraie pour les 3 moteurs n'a pas de note.
  Une question qui ne vaut que pour un moteur porte `seulement`.
- **Vérité** : chaque règle propre à un moteur est vérifiée dans sa documentation officielle (Microsoft Learn,
  docs.snowflake.com, dev.mysql.com : MySQL 8.4), avec la version quand elle compte (« depuis SQL Server 2019 »). Une
  règle incertaine dit « à vérifier sur ta version », ou disparaît. Les pages lues vont dans `sources`.
- **Cohérence** : rien ne contredit les cours (`data/cours/`), le dico (`data/dico/`), les astuces, ni les faits déjà
  vérifiés du site.
- Tous les noms de l'exemple suivent les conseils de la situation (minuscules, `_`, pas de mot réservé).

## La recherche

La même que les astuces (`docs/astuces.md`, « La recherche ») : `chercherDico(question, "architecte")` dans le bloc
« Super dico » de `js/app.js`, sur `LEARNSQL.architecte`, avec ses réglages (`DICO_REGLAGES.architecte`) : la phrase
comparée aux `besoins` et au titre, les `motsCles`, les mots du résumé et des questions. Sans IA, dans le navigateur.
La recherche du dico SQL, du dico Divalto et des astuces ne change pas (mêmes résultats, mêmes scores).

Les réglages construits (`DICO_REGLAGES.architecte`, novembre 2026) :
- **ceux des astuces** : la ressemblance avec le plus proche des besoins (le titre compte comme un besoin) donne jusqu'à
  300 points (`besoin`) ; un besoin ou le titre tapé tel quel, aux accents, majuscules et signes près : + 1 000
  (`besoinTel`) ; le même début de mot à partir de 5 lettres (`debut`) ; une situation s'affiche à 25 points ou plus ;
- **les mots-clés** (`motsCles`) comptent comme ceux d'une fiche du dico (un mot-clé rare compte plus) ;
- **comme une définition** (8 points par mot, si le mot n'est pas déjà un mot-clé) : la famille, le résumé et le texte
  des questions (`q` ; pas `pourquoi` ni `reflexe`). La famille entière compte aussi comme une expression ;
- **ses mots vides**, en plus de ceux du dico : bien, bonne, bonnes, besoin, aimer, souhaite, souhaiterais, aimerait,
  voudrait, conseil, conseils, architecte, question, questions, poser, pose, demander, quand, avant (« quelles questions
  me poser avant de créer une table »). Pas « mettre » ni « donner » (vides pour les astuces) : ils comptent ici (« je
  mets à jour », « je donne des droits ») ; ni « bon » (« bon de commande », « bon de livraison »).

Le test `outils/tests/recherche-architecte.js` essaie d'abord ces réglages sur 16 situations d'essai voisines (je crée une
table, une table pour un import, un index, une vue, une base ; j'insère, je mets à jour, je supprime ; j'importe un
fichier, j'exécute un script depuis un fichier…), puis sur les vraies situations.

## Les situations prévues

| Famille | Vague 1 | Vague 2 |
|---|---|---|
| Concevoir | `creer-base`, `creer-schema`, `creer-table` (modèle), `cle-primaire`, `relier-tables`, `choisir-types`, `nommer` | `creer-index`, `creer-vue`, `modifier-table`, `historiser`, `table-import`, `semi-structure` |
| Écrire et charger | `ecrire-valeur`, `inserer`, `mettre-a-jour`, `supprimer`, `script-fichier`, `importer-fichier` | `fusionner`, `transaction`, `charger-snowflake`, `exporter`, `corriger-prod` |
| Interroger | `agreger`, `joindre`, `filtrer`, `dates`, `formater`, `fonction-scalaire` | `fenetre`, `sous-requete`, `doublons`, `trier-paginer`, `comparer-texte` |
| Exploiter | `requete-lente`, `mettre-en-prod`, `droits`, `sauvegarder`, `migrer` | `couts-snowflake`, `donnees-powerbi`, `automatiser`, `documenter`, `donnees-personnelles`, `procedure` |

Titres : Je crée une base de données · Je range les tables dans des schémas · Je crée une table · Je choisis la clé
primaire · Je relie deux tables · Je choisis le type de chaque colonne · Je nomme les tables et les colonnes · Je crée un
index · Je crée une vue · Je modifie une table qui sert déjà · Je garde l'historique des changements · Je crée une table
pour recevoir un import · Je stocke du JSON ou un message brut · J'écris une valeur dans une requête · J'insère des
lignes · Je mets à jour des lignes · Je supprime des lignes · Je fusionne deux tables (MERGE) · J'utilise une transaction
· J'exécute un script SQL depuis un fichier · J'importe un fichier (CSV, Excel, EDI) · Je charge des fichiers dans
Snowflake · J'exporte des données vers un fichier · Je corrige des données en production · Je fais un agrégat · Je joins
des tables · Je filtre des lignes · Je calcule avec des dates · Je formate une valeur pour l'affichage · J'utilise une
fonction sur chaque ligne · J'utilise une fonction de fenêtre · J'écris une sous-requête ou une CTE · Je cherche ou
j'enlève des doublons · Je trie et je garde les N premiers · Je compare ou je cherche du texte · Ma requête est lente ·
Je mets un script en production · Je donne des droits · Je sauvegarde et je restaure · Je migre des données · Je maîtrise
les coûts Snowflake · Je prépare des données pour Power BI · J'automatise un traitement · Je documente une base · Je
protège des données personnelles · J'écris une procédure stockée.

## Les contrôles et les tests

- `node outils/verifier.js` (section « Conseils d'architecte ») : chaque fichier chargé dans `index.html` ; ids uniques ;
  famille connue (et rangée dans son fichier) ; les champs et leurs limites ci-dessus (erreur si un champ obligatoire
  manque ; alerte au-delà d'une limite de mots) ; ids des questions uniques dans la situation ; `moteurs` et `seulement`
  avec des moteurs connus ; chaque `voirAussi`, `dico`, `outils` existe ; `sources` en https ; un champ inconnu = une
  alerte. La ligne « total » dit combien de situations et de questions.
  - Les situations prévues (le tableau plus haut) sont la constante `ARCHITECTE_PREVUES` du vérificateur. Un `voirAussi`
    hors de cette liste : une erreur ; vers une situation prévue, pas encore écrite : ni erreur ni alerte, une ligne
    « info architecte : N lien(s) vers des situations à venir (…) ». Un id de situation hors de la liste : une alerte.
  - `outils` : tout outil de la section Outils (`data/outils/sujets.js` : un lien comme `mots-reserves`, ou une
    définition `gp-…`).
  - En plus (des alertes) : un titre qui ne commence pas par « Je », « J' », « Ma », « Mon » ou « Mes » ; un essai qui
    répète un besoin ; deux situations qui ont le même besoin ou le même titre (tapé tel quel, il donnerait les deux) ;
    `seulement` qui cite les 3 moteurs ; une note de `moteurs` pour un moteur hors de `seulement`. Des erreurs : un
    `exemple.code` ou un `exemple.codes.<moteur>` vide.
  - La ligne « architecte » donne les situations, les questions et le nombre par famille.
- `node outils/tests/recherche-architecte.js` : chaque besoin trouve sa situation au rang 1, chaque essai dans les
  3 premières. Dernière ligne : « N échec(s) sur M ».
- `outils/tests/architecte.js` (navigateur, dans `lancer.sh`) : la carte sur la page Outils sans compte, la liste par
  famille, la recherche, le sélecteur de moteur (notes et questions `seulement`), cocher (gardé après rechargement),
  « Tout décocher », « Copier la checklist », 390 px sans débordement, aucune erreur JavaScript. Les droits :
  `outils/tests/outils.js`. Les attendus sont lus dans les données ; des situations d'essai, injectées dans la page,
  couvrent ce que les vraies n'ont pas encore (une question `seulement`, d'autres familles, un exemple sans code, un lien
  vers une situation à venir, une fiche inconnue, un outil réservé) ; il vérifie aussi l'étape ouverte par défaut, les
  replis de la copie, une question retirée, un stockage illisible et un navigateur qui refuse d'enregistrer.
