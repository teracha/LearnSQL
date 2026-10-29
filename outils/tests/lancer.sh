#!/bin/sh
# Lance tous les tests navigateur (Playwright, Supabase simulé). Usage : sh outils/tests/lancer.sh
# Dans le conteneur cloud : CHR=/opt/pw-browsers/chromium-1194/chrome-linux/chrome sh outils/tests/lancer.sh
cd "$(dirname "$0")" || exit 1
echu=0
for t in qcm compte mdp equipe parcours divalto cours revision; do
  sortie=$(timeout 300 node "$t.js" 2>&1)
  derniere=$(printf '%s\n' "$sortie" | tail -1)
  if [ "$derniere" = "errors []" ]; then echo "OK      $t"; else echo "ÉCHEC   $t"; printf '%s\n' "$sortie" | tail -5; echu=1; fi
done
exit $echu
