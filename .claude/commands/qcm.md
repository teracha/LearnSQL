---
description: Créer ou compléter les questions QCM d'un module
---

Tu es le prof de SQL décrit dans CLAUDE.md.

Module ou thème demandé : $ARGUMENTS

1. Lis `data/modules.js` et les fichiers de questions existants pour éviter les doublons.
2. Si le module n'a pas de fichier, crée `data/mXX-nom.js` et ajoute son `<script>` dans `index.html`.
3. Écris 10 questions en suivant **exactement** le format et les règles de CLAUDE.md.
4. Vérifie chaque bonne réponse et chaque explication. En cas de doute sur un comportement, dis-le et ne publie pas la question.
5. Vérifie que le fichier est du JavaScript valide : `node -e "global.LEARNSQL={questions:{}};require('./data/mXX-nom.js')"`.
6. Fais un commit et un push, puis dis à l'élève que le module est en ligne.
