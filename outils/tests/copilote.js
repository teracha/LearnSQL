// Copilote (#/copilote, docs/copilote.md), sans compte : la carte sur la page Outils (après les Conseils d'architecte) ;
// la liste (titre, résumé, une ligne par niveau : nombre d'actions et de cases cochées ; pas de recherche) ; une fiche en
// Rapide (le niveau par défaut) puis en Complet : les boutons « Rapide (n) » et « Complet (n) », le texte du niveau, les
// étapes (numérotées ; en Rapide, une étape sans action rapide est cachée) et leurs actions, le code entre accents graves,
// le compte et sa barre ; le niveau gardé (learnsql-copilote-niveau) ; cocher (gardé après rechargement, partagé entre les
// niveaux) ; le lien vers Traduire ; « Copier la checklist » (le presse-papiers, puis ses replis) ; « Tout décocher » (et
// « Annuler » ; toute la fiche, les deux niveaux) ; une action retirée des données, un stockage illisible, un niveau
// inconnu ; un navigateur qui refuse d'enregistrer ; les cibles tactiles ; 390 px sans débordement ; aucune erreur
// JavaScript.
// Les attendus sont lus dans les données (LEARNSQL.copilote) : les fiches viendront une par une, à la demande de l'élève.
// Des fiches d'essai, injectées dans la page, couvrent ce que les vraies n'ont pas forcément : plusieurs fiches, une étape
// sans action rapide, une action sans outil, un outil permis (Mots réservés), un outil interdit sans compte (la Gestion de
// projet), un outil inconnu, une fiche toute rapide. Les droits : outils/tests/outils.js.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(process.env.CHR ? { executablePath: process.env.CHR } : {});
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  let refuser = false;   // true : la prochaine question (confirm) reçoit « Annuler »
  const dialogues = []; p.on('dialog', d => { dialogues.push(d.message()); if (refuser) d.dismiss(); else d.accept(); });
  await p.route('https://kkugxebgeteijhxijohk.supabase.co/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
  // Le presse-papiers simulé : __refus = 0, il marche ; 1, il refuse (repli : execCommand) ; 2, tout refuse.
  await p.addInitScript(() => {
    window.__copie = null; window.__repli = null; window.__refus = 0;
    try {
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
        writeText: t => { if (window.__refus) return Promise.reject(new Error('refusé')); window.__copie = t; return Promise.resolve(); }
      } });
    } catch (e) { /* ignoré */ }
    const exec = document.execCommand.bind(document);
    document.execCommand = (c, ...r) => {
      if (c !== 'copy') return exec(c, ...r);
      if (window.__refus === 2) return false;
      const t = Array.from(document.querySelectorAll('body > textarea')).pop();
      window.__repli = t ? t.value : null;
      return true;
    };
  });
  const U = 'file://' + require('path').join(__dirname, '..', '..', 'index.html');
  const verifier = (ok, m) => { if (!ok) errs.push(m); };
  const attendre = ms => p.waitForTimeout(ms || 120);
  const net = t => String(t || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();   // le texte vu (espaces insécables comprises)
  const brut = t => net(String(t || '').replace(/`/g, ''));                                 // un texte des données, sans accents graves
  const texte = s => p.$eval(s, x => x.textContent).then(net).catch(() => '');
  const aller = async h => { await p.evaluate(x => { location.hash = x; }, h); await attendre(150); };
  const niveau = async n => { await p.click('.cp-niveau[data-niveau="' + n + '"]'); await attendre(100); };
  // Cocher (ou décocher) une action ; si la case ne garde pas son état, c'est une erreur du test, pas un arrêt.
  const cocher = async (id, oui) => {
    try { await p.setChecked('input[data-action="' + id + '"]', oui !== false); } catch (e) { errs.push('cocher ' + id + ' : ' + e.message.split('\n')[0]); }
    await attendre(60);
  };
  const stocke = () => p.evaluate(() => { try { return JSON.parse(localStorage.getItem('learnsql-copilote')); } catch (e) { return 'illisible'; } });
  const niveauStocke = () => p.evaluate(() => localStorage.getItem('learnsql-copilote-niveau'));
  // Ni la page ni un élément ne dépassent à droite.
  const largeur = async ou => {
    const r = await p.evaluate(() => {
      const l = innerWidth, trop = [];
      document.querySelectorAll('body *').forEach(e => {
        const b = e.getBoundingClientRect();
        if (b.width && b.right > l + 1 && getComputedStyle(e).position !== 'absolute') trop.push(e.tagName + '.' + e.className + ' ' + Math.round(b.right));
      });
      return { l: l, sw: document.documentElement.scrollWidth, trop: trop.slice(0, 4) };
    });
    verifier(r.sw <= r.l && !r.trop.length, ou + ' : la page déborde ' + JSON.stringify(r));
  };
  // Les attendus, d'après les données : les étapes d'un niveau (Rapide : les actions « rapide » ; une étape sans action à ce
  // niveau est cachée), le nombre d'actions, les cases cochées (c : { "<action>": true }), le texte de la copie.
  const NOMS = { rapide: 'Rapide', complet: 'Complet' };
  const etapesDe = (f, n) => f.etapes.map(e => ({ titre: e.titre, actions: e.actions.filter(a => n === 'complet' || a.rapide === true) })).filter(e => e.actions.length);
  const actionsDe = (f, n) => [].concat(...etapesDe(f, n).map(e => e.actions));
  const nb = (f, n) => actionsDe(f, n).length;
  const nbCoches = (f, n, c) => actionsDe(f, n).filter(a => c[a.id]).length;
  const coches = (k, total) => k + (k > 1 ? ' cochées' : ' cochée') + ' sur ' + total;
  const pluriel = (k, un, plusieurs) => k + ' ' + (k > 1 ? plusieurs : un);
  const comptesAttendus = (f, c) => ['rapide', 'complet'].map(n => NOMS[n] + ' : ' + pluriel(nb(f, n), 'action', 'actions') + ' · ' +
    pluriel(nbCoches(f, n, c), 'cochée', 'cochées'));
  const copieAttendue = (f, n, c) => {
    const l = [f.titre.replace(/`/g, '') + ' : la checklist (' + NOMS[n] + ')', coches(nbCoches(f, n, c), nb(f, n))];
    etapesDe(f, n).forEach((e, k) => {
      l.push('', (k + 1) + '. ' + e.titre.replace(/`/g, ''));
      e.actions.forEach(a => l.push((c[a.id] ? '[x] ' : '[ ] ') + a.texte.replace(/`/g, '')));
    });
    return l.join('\n');
  };
  // Un bout de code entre accents graves : affiché en police code ; un petit (24 signes au plus) ne se coupe pas à une
  // espace (espaces insécables), un plus long se coupe aux espaces.
  const codesDe = a => (a.texte.match(/`[^`]+`/g) || []).map(x => x.slice(1, -1)).map(x => x.length > 24 ? x : x.replace(/ /g, '\u00a0'));
  // Ce que montre la page d'une fiche.
  const lu = () => p.evaluate(() => {
    const t = x => x ? x.textContent.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim() : '';
    const q = document.getElementById('cp-quand'), c = document.getElementById('cp-copie'), total = document.getElementById('cp-total');
    return {
      fil: Array.from(document.querySelectorAll('#app > p.muted a')).map(a => a.getAttribute('href')),
      h1: t(document.querySelector('h1')), resume: t(document.querySelector('.cp-resume')),
      niveaux: Array.from(document.querySelectorAll('.cp-niveau')).map(x => ({ id: x.getAttribute('data-niveau'), texte: t(x),
        presse: x.getAttribute('aria-pressed'), actif: x.classList.contains('actif') })),
      quand: q.hidden ? null : t(q),
      etapes: Array.from(document.querySelectorAll('#cp-etapes .cp-etape')).map(s => ({
        titre: t(s.querySelector('h2')),
        actions: Array.from(s.querySelectorAll('.cp-action')).map(li => {
          const i = li.querySelector('input[type="checkbox"]'), o = li.querySelector('a.cp-outil');
          return { id: i.getAttribute('data-action'), coche: i.checked, fait: li.classList.contains('cp-fait'), texte: t(li.querySelector('.cp-texte')),
            label: t(i.closest('label')), codes: Array.from(li.querySelectorAll('.cp-texte code')).map(x => x.textContent),
            outil: o ? o.getAttribute('href') : null, outilTexte: t(o) };
        })
      })),
      total: t(total), complet: total.classList.contains('cp-complet'), barre: document.getElementById('cp-barre').style.width,
      msg: t(document.getElementById('cp-msg')), stockage: !document.getElementById('cp-stockage').hidden, copie: c.hidden ? null : c.value
    };
  });

  // 1. La carte sur la page Outils, sans compte, juste après les Conseils d'architecte ; elle mène à la liste
  await p.goto(U + '#/outils'); await attendre(200);
  const carte = await p.$('.o-carte[href="#/copilote"]');
  verifier(carte && /Copilote/.test(await carte.textContent()) && /je lis, je fais, je coche/.test(await carte.textContent()),
    'pas de carte « Copilote » sur la page Outils (sans compte)');
  const ordre = await p.$$eval('#sujet-outils-sql .o-carte', xs => xs.map(x => x.getAttribute('href')));
  verifier(ordre.indexOf('#/copilote') === ordre.indexOf('#/architecte') + 1, 'la carte Copilote n\'est pas après les Conseils d\'architecte : ' + ordre.join(' '));
  await p.click('.o-carte[href="#/copilote"]'); await attendre();
  verifier(await texte('h1') === 'Copilote', 'la carte ne mène pas au Copilote : ' + await texte('h1'));
  verifier(await texte('.cp-intro') === 'Des checklists prêtes à l\'emploi : je lis, je fais, je coche.', 'la phrase de la liste : ' + await texte('.cp-intro'));
  verifier(!(await p.$('#app input')), 'une recherche sur la liste (pas tant qu\'il y a peu de fiches)');
  const D = await p.evaluate(() => JSON.parse(JSON.stringify(LEARNSQL.copilote)));
  const F = D.filter(f => f.id === 'finir-requete')[0] || D[0];
  verifier(F && nb(F, 'rapide') >= 2 && nb(F, 'complet') > nb(F, 'rapide'), 'données : une fiche avec au moins 2 actions rapides et des actions du niveau Complet');
  // Les outils visibles sans compte (ceux des sujets publics) : le lien attendu sous une action qui a « outil ».
  const LIENS = await p.evaluate(() => {
    const m = {};
    LEARNSQL.outilsSujets.filter(s => LEARNSQL.outilsPublics.indexOf(s.id) >= 0).forEach(s =>
      (s.groupes ? s.groupes.reduce((l, g) => l.concat(g.outils), []) : s.outils).forEach(x => {
        if (typeof x === 'string') m[x] = { lien: '#/outils/' + x, titre: (LEARNSQL.outils.filter(o => o.id === x)[0] || {}).titre };
        else m[x.id] = { lien: x.lien, titre: x.titre };
      }));
    return m;
  });
  // La page d'une fiche, comparée aux données, pour le niveau n et les cases c.
  const verifierFiche = async (f, n, c, ou) => {
    const v = await lu(), et = etapesDe(f, n), k = nbCoches(f, n, c), total = nb(f, n);
    verifier(v.h1 === f.titre && v.resume === brut(f.resume) && v.fil.join() === '#/copilote', ou + ' : le titre, le résumé ou le lien vers la liste : ' + v.h1);
    verifier(v.niveaux.map(x => x.texte).join('|') === 'Rapide (' + nb(f, 'rapide') + ')|Complet (' + nb(f, 'complet') + ')', ou + ' : les boutons ' + v.niveaux.map(x => x.texte).join('|'));
    verifier(v.niveaux.every(x => (x.presse === 'true') === (x.id === n) && x.actif === (x.id === n)), ou + ' : le niveau choisi ' + JSON.stringify(v.niveaux));
    verifier(v.quand === brut(f.niveaux[n]), ou + ' : le texte du niveau : ' + v.quand);
    verifier(v.etapes.length === et.length && v.etapes.every((e, i) => e.titre === (i + 1) + '. ' + brut(et[i].titre) && e.actions.length === et[i].actions.length),
      ou + ' : les étapes ' + JSON.stringify(v.etapes.map(e => e.titre + ' (' + e.actions.length + ')')));
    const va = [].concat(...v.etapes.map(e => e.actions)), da = actionsDe(f, n);
    verifier(va.length === da.length && va.every((a, i) => a.id === da[i].id && a.texte === brut(da[i].texte) && a.label === a.texte &&
      a.codes.join('|') === codesDe(da[i]).join('|')), ou + ' : les actions ' + JSON.stringify(va.filter((a, i) => !da[i] || a.texte !== brut(da[i].texte)).slice(0, 1)));
    verifier(va.every(a => a.coche === !!c[a.id] && a.fait === !!c[a.id]), ou + ' : les cases cochées ' + va.filter(a => a.coche).map(a => a.id).join());
    verifier(va.every((a, i) => {
      const o = da[i] && da[i].outil && LIENS[da[i].outil];
      return o ? a.outil === o.lien && a.outilTexte === o.titre + ' ›' : a.outil === null;
    }), ou + ' : les liens vers les outils ' + JSON.stringify(va.filter(a => a.outil).map(a => a.outil + ' ' + a.outilTexte)));
    verifier(v.total === coches(k, total) && v.barre === Math.round(100 * k / total) + '%' && v.complet === (k === total),
      ou + ' : le compte ' + v.total + ' ' + v.barre + (v.complet ? ' (vert)' : ''));
    return v;
  };

  // 2. La liste : une carte par fiche, dans l'ordre des données (titre, résumé, une ligne par niveau)
  const listeVue = () => p.evaluate(() => Array.from(document.querySelectorAll('#app .cp-carte')).map(a => ({ href: a.getAttribute('href'),
    titre: a.querySelector('strong').textContent, resume: (a.querySelector('p:not(.cp-compte)') || {}).textContent || '',
    comptes: Array.from(a.querySelectorAll('.cp-compte')).map(x => x.textContent.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim()),
    verts: Array.from(a.querySelectorAll('.cp-compte')).map(x => x.classList.contains('cp-complet')) })));
  const listeAttendue = (fiches, cases) => fiches.every((f, k) => L[k] && L[k].href === '#/copilote/' + f.id && L[k].titre === f.titre &&
    net(L[k].resume) === brut(f.resume) && L[k].comptes.join('|') === comptesAttendus(f, cases[f.id] || {}).join('|') &&
    L[k].verts.join() === ['rapide', 'complet'].map(n => nbCoches(f, n, cases[f.id] || {}) === nb(f, n)).join());
  let L = await listeVue();
  verifier(L.length === D.length && listeAttendue(D, {}), 'la liste : ' + JSON.stringify(L));
  await largeur('la liste des fiches');

  // 3. La fiche, en Rapide (le niveau par défaut, rien n'est enregistré tant que l'élève ne choisit pas)
  await p.click('#app .cp-carte[href="#/copilote/' + F.id + '"]'); await attendre(150);
  await verifierFiche(F, 'rapide', {}, 'Rapide par défaut');
  verifier(await niveauStocke() === null, 'un niveau est enregistré sans choix de l\'élève');
  verifier(await p.$('#cp-copier') && await p.$('#cp-decocher') && await texte('#cp-copier') === 'Copier la checklist' && await texte('#cp-decocher') === 'Tout décocher',
    'les boutons « Copier la checklist » et « Tout décocher »');
  // L'ordre de la page : le titre, le résumé, les niveaux, la checklist, le compte, les boutons
  verifier(await p.evaluate(() => {
    const ids = ['.cp-resume', '.cp-niveaux', '#cp-quand', '#cp-etapes', '#cp-total', '#cp-copier'].map(s => document.querySelector(s));
    return ids.every((x, i) => !i || (ids[i - 1].compareDocumentPosition(x) & Node.DOCUMENT_POSITION_FOLLOWING));
  }), 'l\'ordre de la page (résumé, niveaux, checklist, compte, boutons)');

  // 4. Cocher 2 actions en Rapide : le compte, la barre, le vert ; gardées dans le navigateur et après rechargement
  const R = actionsDe(F, 'rapide'), C = actionsDe(F, 'complet');
  await cocher(R[0].id); await cocher(R[1].id);
  const deux = { [R[0].id]: true, [R[1].id]: true };
  await verifierFiche(F, 'rapide', deux, 'Rapide, 2 cases');
  verifier(JSON.stringify(await stocke()) === JSON.stringify({ [F.id]: deux }), 'learnsql-copilote : ' + JSON.stringify(await stocke()));
  await largeur('la fiche en Rapide, 2 cases cochées');
  await p.reload(); await attendre(250);
  await verifierFiche(F, 'rapide', deux, 'Rapide, après rechargement');
  // Toute la ligne est cliquable : un clic sur le texte coche, un autre décoche
  await p.click('.cp-action:has(input[data-action="' + R[2].id + '"]) .cp-texte'); await attendre(60);
  verifier(await p.isChecked('input[data-action="' + R[2].id + '"]'), 'un clic sur le texte ne coche pas la case');
  await p.click('.cp-action:has(input[data-action="' + R[2].id + '"]) .cp-texte'); await attendre(60);
  await verifierFiche(F, 'rapide', deux, 'Rapide, un clic de plus sur le texte');

  // 5. Complet : toutes les étapes et toutes les actions ; les 2 cases restent cochées (une case est celle de l'action, pas
  // du niveau) ; le niveau est gardé (learnsql-copilote-niveau), aussi après rechargement
  await niveau('complet');
  await verifierFiche(F, 'complet', deux, 'Complet');
  verifier(await niveauStocke() === 'complet', 'le niveau n\'est pas gardé : ' + await niveauStocke());
  await largeur('la fiche en Complet');
  await p.reload(); await attendre(250);
  await verifierFiche(F, 'complet', deux, 'Complet, après rechargement');
  // Une action du niveau Complet seulement : elle compte en Complet, pas en Rapide, et reste cochée
  const seulComplet = C.filter(a => a.rapide !== true)[0];
  await cocher(seulComplet.id);
  const trois = Object.assign({}, deux, { [seulComplet.id]: true });
  await verifierFiche(F, 'complet', trois, 'Complet, 3 cases');
  await niveau('rapide');
  await verifierFiche(F, 'rapide', trois, 'Rapide, avec une case du niveau Complet');
  verifier(await niveauStocke() === 'rapide' && Object.keys((await stocke() || {})[F.id] || {}).sort().join() === Object.keys(trois).sort().join(),
    'Rapide : la case du niveau Complet est perdue ' + JSON.stringify(await stocke()));
  await niveau('complet');
  await verifierFiche(F, 'complet', trois, 'Complet de nouveau');
  // La liste compte les cases de chaque niveau
  await aller('#/copilote');
  L = await listeVue();
  verifier(listeAttendue(D, { [F.id]: trois }), 'la liste après 3 cases : ' + JSON.stringify(L.map(c => c.comptes)));
  await aller('#/copilote/' + F.id);

  // 6. Le lien vers Traduire (Complet), sous l'action qui a « outil: "traduire" » : il ouvre Traduire ; le retour garde tout
  const AT = C.filter(a => a.outil === 'traduire')[0];
  if (AT) {
    await p.click('.cp-action:has(input[data-action="' + AT.id + '"]) a.cp-outil'); await attendre(150);
    verifier(await texte('h1') === 'Traduire une requête', 'le lien vers Traduire : ' + await texte('h1'));
    await p.evaluate(() => history.back()); await attendre(250);
    await verifierFiche(F, 'complet', trois, 'retour de Traduire');
  } else console.log('(la fiche n\'a pas d\'action vers Traduire : le lien est vérifié sur une fiche d\'essai)');

  // 7. « Copier la checklist » : le niveau affiché, puis les replis (execCommand, puis le texte à copier à la main)
  await niveau('rapide');
  await p.click('#cp-copier'); await attendre(150);
  let copie = await p.evaluate(() => window.__copie);
  verifier(copie === copieAttendue(F, 'rapide', trois), 'la copie (Rapide) :\n' + copie);
  verifier(copie && copie.split('\n')[0] === brut(F.titre) + ' : la checklist (Rapide)' && !/`/.test(copie), 'la 1re ligne de la copie : ' + (copie || '').split('\n')[0]);
  verifier((await lu()).msg === 'Copié : la checklist est prête à coller.', 'message de la copie : ' + (await lu()).msg);
  await niveau('complet');
  verifier((await lu()).msg === '', 'changer de niveau garde le message de la copie');
  await p.click('#cp-copier'); await attendre(150);
  verifier(await p.evaluate(() => window.__copie) === copieAttendue(F, 'complet', trois), 'la copie (Complet) :\n' + await p.evaluate(() => window.__copie));
  await p.evaluate(() => { window.__refus = 1; });
  await p.click('#cp-copier'); await attendre(150);
  verifier(await p.evaluate(() => window.__repli) === copieAttendue(F, 'complet', trois) && (await lu()).msg === 'Copié : la checklist est prête à coller.',
    'copie par le repli (execCommand)');
  await p.evaluate(() => { window.__refus = 2; });
  await p.click('#cp-copier'); await attendre(150);
  let v = await lu();
  verifier(v.msg === 'Copie impossible. Le texte est ci-dessous : copie-le à la main.' && v.copie === copieAttendue(F, 'complet', trois) &&
    await p.evaluate(() => document.activeElement.id === 'cp-copie'), 'copie impossible : le texte à copier à la main ' + v.msg);
  await largeur('copie impossible (le texte affiché)');
  await p.evaluate(() => { window.__refus = 0; });
  await niveau('rapide');
  v = await lu();
  verifier(v.copie === null && v.msg === '', 'changer de niveau garde le texte de l\'ancien niveau à copier');

  // 8. « Tout décocher » : « Annuler » ne change rien ; « OK » vide toute la fiche (même la case du niveau Complet, cachée en
  // Rapide) ; sans case cochée : un message, sans question
  refuser = true; await p.click('#cp-decocher'); await attendre(); refuser = false;
  verifier(dialogues[dialogues.length - 1] === 'Décocher toutes les cases de « ' + F.titre + ' » ?', 'la question de « Tout décocher » : ' + dialogues[dialogues.length - 1]);
  await verifierFiche(F, 'rapide', trois, '« Tout décocher » puis « Annuler »');
  await p.click('#cp-decocher'); await attendre();
  v = await verifierFiche(F, 'rapide', {}, '« Tout décocher »');
  verifier(v.msg === 'C\'est fait : toutes les cases sont décochées.', '« Tout décocher » : ' + v.msg);
  verifier(JSON.stringify(await stocke()) === '{}', 'après « Tout décocher », le stockage : ' + JSON.stringify(await stocke()));
  await niveau('complet');
  await verifierFiche(F, 'complet', {}, 'Complet, après « Tout décocher »');
  const nbDialogues = dialogues.length;
  await p.click('#cp-decocher'); await attendre();
  verifier((await lu()).msg === 'Aucune case n\'est cochée.' && dialogues.length === nbDialogues, '« Tout décocher » sans case cochée');

  // 9. Une action retirée des données : sa case est oubliée, sans erreur ; un stockage illisible et un niveau inconnu : la
  // page marche (Rapide)
  await p.evaluate(([f, id]) => {
    localStorage.setItem('learnsql-copilote', JSON.stringify({ [f]: { [id]: true, 'action-retiree': true }, 'fiche-retiree': { x: true } }));
    localStorage.setItem('learnsql-copilote-niveau', 'n-importe-quoi');
  }, [F.id, R[0].id]);
  await p.reload(); await attendre(250);
  await verifierFiche(F, 'rapide', { [R[0].id]: true }, 'une action retirée, un niveau inconnu');
  await cocher(R[1].id);
  verifier(JSON.stringify(await stocke()) === JSON.stringify({ [F.id]: { [R[0].id]: true, [R[1].id]: true }, 'fiche-retiree': { x: true } }),
    'l\'action retirée n\'est pas oubliée : ' + JSON.stringify(await stocke()));
  await p.evaluate(() => localStorage.setItem('learnsql-copilote', 'pas du JSON'));
  await p.reload(); await attendre(250);
  await verifierFiche(F, 'rapide', {}, 'stockage illisible');
  await cocher(R[0].id);
  verifier(JSON.stringify(await stocke()) === JSON.stringify({ [F.id]: { [R[0].id]: true } }), 'stockage illisible, puis une case : ' + JSON.stringify(await stocke()));
  await p.evaluate(() => { localStorage.removeItem('learnsql-copilote'); localStorage.removeItem('learnsql-copilote-niveau'); });
  await p.reload(); await attendre(250);

  // 10. Des fiches d'essai : plusieurs fiches ; une étape sans action rapide (cachée en Rapide, les étapes renumérotées) ;
  // une action sans outil ; un outil permis (Mots réservés), un outil interdit sans compte (la Gestion de projet), un outil
  // inconnu ; une fiche toute rapide (les deux niveaux ont les mêmes actions)
  const ESSAI = [{
    id: 'essai-etapes', titre: 'Je teste les étapes', resume: 'Une fiche d\'essai avec `du code` dedans.',
    niveaux: { rapide: 'Le niveau rapide d\'essai.', complet: 'Le niveau complet d\'essai : tout.' },
    etapes: [
      { titre: 'Je commence', actions: [
        { id: 'a1', texte: 'Vérifier le nom dans `Mots réservés` d\'abord.', rapide: true, outil: 'mots-reserves' },
        { id: 'a2', texte: 'Une action sans outil, avec un long code : `SELECT COUNT(*) FROM commandes_clients WHERE statut = 2`.' }] },
      { titre: 'Je fais sans rapide', actions: [
        { id: 'b1', texte: 'Une action vers un outil réservé.', outil: 'gp-risques' },
        { id: 'b2', texte: 'Une action vers un outil inconnu.', outil: 'pas-un-outil' }] },
      { titre: 'Je finis', actions: [{ id: 'c1', texte: 'Traduire la requête.', rapide: true, outil: 'traduire' }] }
    ]
  }, {
    id: 'essai-rapide', titre: 'Je fais vite', resume: 'Tout est rapide.',
    niveaux: { rapide: 'Toujours.', complet: 'Aussi.' },
    etapes: [{ titre: 'Je fais tout', actions: [{ id: 'x', texte: 'Faire.', rapide: true }] }]
  }];
  await p.evaluate(l => { l.forEach(f => LEARNSQL.copilote.push(f)); location.hash = '#/copilote'; }, ESSAI);
  await attendre(200);
  const D2 = D.concat(ESSAI), E = ESSAI[0];
  L = await listeVue();
  verifier(L.length === D2.length && listeAttendue(D2, {}), 'la liste avec les fiches d\'essai : ' + JSON.stringify(L.map(c => [c.href, c.comptes])));
  await largeur('la liste avec les fiches d\'essai');
  // Rapide : l'étape sans action rapide est cachée, la suivante devient « 2. » ; les liens permis (Mots réservés, Traduire)
  await aller('#/copilote/essai-etapes');
  v = await verifierFiche(E, 'rapide', {}, 'essai, Rapide');
  verifier(v.etapes.map(e => e.titre).join('|') === '1. Je commence|2. Je finis' && v.total === '0 cochée sur 2', 'essai, Rapide : ' + v.etapes.map(e => e.titre).join('|'));
  verifier(v.etapes.map(e => e.actions.map(a => a.outil).join()).join('|') === '#/mots-reserves|#/traduire' && v.etapes[0].actions[0].outilTexte === 'Mots réservés ›',
    'essai, Rapide : les liens ' + JSON.stringify(v.etapes.map(e => e.actions.map(a => a.outil))));
  verifier(v.etapes[0].actions[0].codes.join() === 'Mots\u00a0réservés', 'essai : le code entre accents graves (police code, sans coupure) : ' + v.etapes[0].actions[0].codes.join());
  // Complet : 3 étapes ; pas de lien sans outil, ni vers un outil interdit (sans compte) ou inconnu
  await niveau('complet');
  v = await verifierFiche(E, 'complet', {}, 'essai, Complet');
  verifier(v.etapes.map(e => e.titre).join('|') === '1. Je commence|2. Je fais sans rapide|3. Je finis' &&
    v.etapes.map(e => e.actions.map(a => a.outil || '-').join()).join('|') === '#/mots-reserves,-|-,-|#/traduire', 'essai, Complet : ' +
    JSON.stringify(v.etapes.map(e => [e.titre, e.actions.map(a => a.outil)])));
  verifier(v.etapes[0].actions[1].codes.join() === 'SELECT COUNT(*) FROM commandes_clients WHERE statut = 2', 'essai : un long code se coupe aux espaces ' +
    v.etapes[0].actions[1].codes.join());
  await largeur('une fiche d\'essai (Complet, un long code)');
  // Les cases de deux fiches ne se mêlent pas ; une case d'une étape cachée en Rapide compte en Complet seulement
  await cocher('a1'); await cocher('b1');
  verifier(JSON.stringify(await stocke()) === JSON.stringify({ 'essai-etapes': { a1: true, b1: true } }), 'essai : le stockage ' + JSON.stringify(await stocke()));
  await verifierFiche(E, 'complet', { a1: true, b1: true }, 'essai, Complet, 2 cases');
  await niveau('rapide');
  await verifierFiche(E, 'rapide', { a1: true, b1: true }, 'essai, Rapide, 2 cases');
  await p.click('#cp-copier'); await attendre(150);
  copie = await p.evaluate(() => window.__copie);
  verifier(copie === copieAttendue(E, 'rapide', { a1: true, b1: true }) && /^2\. Je finis$/m.test(copie) && !/Je fais sans rapide|outil réservé/.test(copie) &&
    /^\[x\] Vérifier le nom dans Mots réservés d'abord\.$/m.test(copie), 'essai, la copie (Rapide) :\n' + copie);
  await largeur('une fiche d\'essai (Rapide)');
  // Les cibles tactiles : les boutons des niveaux, chaque ligne d'action et chaque lien vers un outil font 44 px ou plus
  const h = await p.evaluate(() => ({ niveaux: Array.from(document.querySelectorAll('.cp-niveau')).map(x => x.getBoundingClientRect().height),
    cases: Array.from(document.querySelectorAll('.cp-case')).map(x => x.getBoundingClientRect().height),
    outils: Array.from(document.querySelectorAll('.cp-outil')).map(x => x.getBoundingClientRect().height),
    boite: Array.from(document.querySelectorAll('.cp-case input')).map(x => x.getBoundingClientRect().width) }));
  verifier(h.outils.length === 2 && [].concat(h.niveaux, h.cases, h.outils).every(x => x >= 44) && h.boite.every(x => x >= 24), 'cibles tactiles : ' + JSON.stringify(h));
  // Le lien vers Traduire ouvre Traduire
  await p.click('a.cp-outil[href="#/traduire"]'); await attendre(150);
  verifier(await texte('h1') === 'Traduire une requête', 'essai, le lien vers Traduire : ' + await texte('h1'));
  // Une fiche toute rapide : cochée, son compte passe au vert, dans la fiche et dans la liste (les deux niveaux)
  await aller('#/copilote/essai-rapide');
  await cocher('x');
  await verifierFiche(ESSAI[1], 'rapide', { x: true }, 'essai tout rapide');
  await aller('#/copilote');
  L = await listeVue();
  verifier(listeAttendue(D2, { 'essai-etapes': { a1: true, b1: true }, 'essai-rapide': { x: true } }) &&
    L[D2.length - 1].comptes.join('|') === 'Rapide : 1 action · 1 cochée|Complet : 1 action · 1 cochée' && L[D2.length - 1].verts.join() === 'true,true',
    'la liste, une fiche finie : ' + JSON.stringify(L.map(c => [c.comptes, c.verts])));
  // Une fiche inconnue : retour à la liste
  await aller('#/copilote/inconnue');
  verifier(await p.evaluate(() => location.hash) === '#/copilote' && await texte('h1') === 'Copilote', 'une fiche inconnue ne ramène pas à la liste');

  // 11. Le navigateur refuse d'enregistrer : la page marche ; les cases et le niveau vivent le temps de l'onglet, et c'est dit
  const p2 = await ctx.newPage();
  p2.on('pageerror', e => errs.push('stockage refusé : ' + e.message));
  await p2.route('https://kkugxebgeteijhxijohk.supabase.co/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
  await p2.addInitScript(() => {
    const lire = Storage.prototype.getItem, ecrire = Storage.prototype.setItem, refuse = k => /^learnsql-copilote/.test(k);
    Storage.prototype.getItem = function (k) { if (refuse(k)) throw new Error('refusé'); return lire.call(this, k); };
    Storage.prototype.setItem = function (k, x) { if (refuse(k)) throw new Error('refusé'); return ecrire.call(this, k, x); };
  });
  const total2 = () => p2.textContent('#cp-total').then(net);
  await p2.goto(U + '#/copilote/' + F.id); await p2.waitForTimeout(250);
  verifier(await p2.isHidden('#cp-stockage') && await total2() === coches(0, nb(F, 'rapide')), 'stockage refusé : le message est là avant toute case');
  try { await p2.setChecked('input[data-action="' + R[0].id + '"]', true); } catch (e) { errs.push('stockage refusé, cocher : ' + e.message.split('\n')[0]); }
  await p2.waitForTimeout(80);
  verifier(await p2.isVisible('#cp-stockage') && await total2() === coches(1, nb(F, 'rapide')), 'stockage refusé : ' + await total2());
  await p2.click('.cp-niveau[data-niveau="complet"]'); await p2.waitForTimeout(100);
  verifier(await p2.getAttribute('.cp-niveau[data-niveau="complet"]', 'aria-pressed') === 'true' && await total2() === coches(1, nb(F, 'complet')),
    'stockage refusé : le niveau Complet ' + await total2());
  await p2.evaluate(() => { location.hash = '#/copilote'; }); await p2.waitForTimeout(150);
  verifier(net(await p2.textContent('.cp-carte[href="#/copilote/' + F.id + '"] .cp-compte[data-niveau="complet"]')) === 'Complet : ' + nb(F, 'complet') + ' actions · 1 cochée',
    'stockage refusé : la case est perdue dans l\'onglet');
  await p2.evaluate(h => { location.hash = h; }, '#/copilote/' + F.id); await p2.waitForTimeout(150);
  verifier(await p2.getAttribute('.cp-niveau[data-niveau="complet"]', 'aria-pressed') === 'true' && await total2() === coches(1, nb(F, 'complet')),
    'stockage refusé : le niveau est perdu dans l\'onglet');
  await p2.close();

  console.log('copilote : carte Outils, liste, fiche en Rapide et en Complet (' + nb(F, 'rapide') + ' et ' + nb(F, 'complet') + ' actions), cases partagées, ' +
    'lien vers Traduire, copie, décocher, stockage, fiches d\'essai, cibles tactiles, 390 px');
  console.log('errors', errs); await b.close();
})();
