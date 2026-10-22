# LearnSQL

Plateforme de QCM pour apprendre SQL, façon MaxiCours.
SQL Server et Snowflake.

## Comment ça marche

1. **Le site** : tu fais les QCM module par module. Après chaque réponse, juste ou fausse, tu as l'explication. À la fin, une note sur 20.
2. **L'export** : le bouton « Exporter » crée un texte avec tes notes et tes erreurs.
3. **Le prof (Claude)** : tu colles l'export dans le chat, à l'écrit ou en vocal. Le prof analyse tes erreurs, t'explique et te pose des questions.

## Ouvrir le site

- En ligne : via GitHub Pages (lien dans la description du dépôt).
- En local : ouvre `index.html` dans ton navigateur. Rien à installer.

Tes notes sont gardées dans le navigateur (localStorage). Change d'ordinateur ? Utilise « Exporter » puis « Restaurer ».

## Avec Claude Code

Ouvre ce dépôt dans Claude Code. Le fichier `CLAUDE.md` donne à Claude son rôle de prof.

| Commande | Rôle |
|---|---|
| `/bilan` + export collé | Analyse tes notes et tes erreurs |
| `/cours jointures` | Cours court et interactif sur un thème |
| `/qcm m06` | Crée les questions d'un module |

## Structure

```
index.html          page unique
css/style.css       mise en forme (police lisible, mode sombre)
js/app.js           logique : quiz, notes, export
data/modules.js     liste des 16 modules
data/mXX-*.js       questions de chaque module
CLAUDE.md           consignes du prof
.claude/commands/   commandes /bilan, /cours, /qcm
```
