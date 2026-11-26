(function () {
  "use strict";

  var DATA = window.LEARNSQL;
  var STORE_KEY = "learnsql-v1";
  var TAILLE_QCM = 10;     // questions tirées par QCM dans la réserve du module
  var REVISION_MIN_THEMES = 2;
  var REVISION_MIN_QUESTIONS = 20;
  var REVISION_MIN_PAR_THEME = 5;
  var app = document.getElementById("app");
  var quiz = null;        // quiz en cours
  var dernierResultat = null;
  var numeroPage = 0;     // augmente à chaque changement de page (route)

  // Une page qui charge depuis Supabase ne s'affiche que si l'élève est resté sur cette page : une réponse lente ne
  // remplace jamais la page suivante. Usage : var encore = pageActuelle(); … .then(function () { if (encore()) … }).
  function pageActuelle() {
    var n = numeroPage;
    return function () { return n === numeroPage; };
  }

  // ---------- Sauvegarde locale ----------
  function videStore() { return { version: 1, tentatives: [], questions: {} }; }

  function lire() {
    try {
      var s = JSON.parse(localStorage.getItem(STORE_KEY));
      if (s && s.version === 1) return s;
    } catch (e) { /* stockage indisponible : on repart de zéro */ }
    return videStore();
  }

  function ecrireLocal(s) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch (e) { /* ignoré */ }
  }

  function ecrire(s) {
    ecrireLocal(s);
    planifierSync();
  }

  // ---------- Compte et synchronisation (Supabase) ----------
  // La clé « publishable » est faite pour être visible dans le site :
  // la base ne laisse chaque utilisateur lire que SA ligne (voir outils/supabase.sql).
  var SUPA_URL = "https://kkugxebgeteijhxijohk.supabase.co";
  var SUPA_KEY = "sb_publishable_CUaxASwOUJ1c7UWEDDvlSQ__RE0DHTA";
  var SESSION_KEY = "learnsql-session";
  var etatSync = "";      // texte affiché sur la page Compte
  var minuterieSync = null;

  function lireSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch (e) { return null; }
  }

  function ecrireSession(s) {
    try {
      if (s) localStorage.setItem(SESSION_KEY, JSON.stringify(s));
      else localStorage.removeItem(SESSION_KEY);
    } catch (e) { /* ignoré */ }
  }

  function appelSupa(chemin, options, jeton) {
    options = options || {};
    var entetes = { apikey: SUPA_KEY, "Content-Type": "application/json" };
    if (jeton) entetes.Authorization = "Bearer " + jeton;
    Object.keys(options.entetes || {}).forEach(function (k) { entetes[k] = options.entetes[k]; });
    return fetch(SUPA_URL + chemin, {
      method: options.methode || "GET",
      headers: entetes,
      body: options.corps ? JSON.stringify(options.corps) : undefined
    }).then(function (r) {
      return r.text().then(function (t) {
        var d = null;
        try { d = t ? JSON.parse(t) : null; } catch (e) { d = t; }
        if (!r.ok) {
          var err = new Error((d && (d.msg || d.error_description || d.message || d.error)) || ("Erreur " + r.status));
          err.status = r.status;
          err.code = d && typeof d === "object" ? d.code : undefined;   // ex. « 23505 » : la ligne existe déjà
          throw err;
        }
        return d;
      });
    });
  }

  // Jetons reçus (connexion ou lien de l'e-mail) → session complète avec l'utilisateur.
  function ouvrirSession(jetons) {
    return appelSupa("/auth/v1/user", {}, jetons.access_token).then(function (u) {
      var s = {
        access_token: jetons.access_token,
        refresh_token: jetons.refresh_token,
        expire: Date.now() + (Number(jetons.expires_in) || 3600) * 1000,
        id: u.id,
        email: u.email,
        role: (lireSession() || {}).id === u.id ? lireSession().role : "agent"
      };
      ecrireSession(s);
      return s;
    });
  }

  // Renvoie une session valide (rafraîchie si besoin), ou null.
  function sessionValide() {
    var s = lireSession();
    if (!s) return Promise.resolve(null);
    if (s.expire - 60000 > Date.now()) return Promise.resolve(s);
    return appelSupa("/auth/v1/token?grant_type=refresh_token", {
      methode: "POST", corps: { refresh_token: s.refresh_token }
    }).then(ouvrirSession, function (e) {
      if (e.status === 400 || e.status === 401) ecrireSession(null);   // session révoquée
      throw e;
    });
  }

  // Fusionne deux progressions : on ne perd jamais un essai.
  function fusion(a, b) {
    var s = videStore(), vus = {};
    a.tentatives.concat(b.tentatives).forEach(function (t) {
      var k = t.date + "|" + t.module;
      if (!vus[k]) { vus[k] = true; s.tentatives.push(t); }
    });
    s.tentatives.sort(function (x, y) { return x.date < y.date ? -1 : x.date > y.date ? 1 : 0; });
    Object.keys(a.questions).concat(Object.keys(b.questions)).forEach(function (id) {
      var qa = a.questions[id], qb = b.questions[id];
      s.questions[id] = !qb || (qa && qa.vues >= qb.vues) ? qa : qb;
    });
    return s;
  }

  // Lit la progression en ligne, la fusionne avec celle de l'appareil, renvoie le tout.
  function droits() {
    var s = lireSession() || {};
    return JSON.stringify([s.role, s.groupeIds, s.acces]);
  }

  function synchroniser() {
    var avant = droits();
    return sessionValide().then(function (s) {
      if (!s) return false;
      return appelSupa("/rest/v1/progression?select=data", {}, s.access_token).then(function (lignes) {
        var local = lire();
        var distant = lignes && lignes[0] && lignes[0].data;
        var tout = distant && distant.version === 1 ? fusion(local, distant) : local;
        var change = JSON.stringify(tout) !== JSON.stringify(local);
        ecrireLocal(tout);
        return appelSupa("/rest/v1/progression", {
          methode: "POST",
          entetes: { Prefer: "resolution=merge-duplicates,return=minimal" },
          corps: { user_id: s.id, data: tout, maj: new Date().toISOString() }
        }, s.access_token).then(function () {
          return appelSupa("/rest/v1/profil?select=role&user_id=eq." + s.id, {}, s.access_token).then(function (p) {
            var role = p && p[0] ? p[0].role : "agent";
            var cur = lireSession();
            if (cur && cur.role !== role) { cur.role = role; ecrireSession(cur); majNav(); }
            return appelSupa("/rest/v1/membre?select=groupe_id,groupe(nom)&user_id=eq." + s.id, {}, s.access_token);
          }).then(function (m) {
            var cur = lireSession();
            if (cur && m) {
              cur.groupes = m.map(function (x) { return x.groupe && x.groupe.nom; }).filter(Boolean).sort();
              cur.groupeIds = m.map(function (x) { return x.groupe_id; });
              ecrireSession(cur);
            }
          }, function () { /* tables d'équipe absentes : rôle agent, sans groupe */ }).then(function () {
            return appelSupa("/rest/v1/acces?select=element,groupe_id", {}, s.access_token).then(function (a) {
              var cur = lireSession();
              if (cur) { cur.acces = a || []; ecrireSession(cur); }
            }, function () { /* table acces absente : tout est ouvert */ });
          });
        }).then(function () {
          etatSync = "Synchronisé à " + new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) + ".";
          var nouveauxDroits = droits() !== avant;
          if (nouveauxDroits) majNav();   // le lien « Outils » suit les droits
          return change || nouveauxDroits;
        });
      });
    }).catch(function (e) {
      etatSync = "Synchronisation impossible : " + e.message;
      return false;
    });
  }

  function planifierSync() {
    if (!lireSession()) return;
    clearTimeout(minuterieSync);
    minuterieSync = setTimeout(synchroniser, 1500);
  }

  // Après une synchro, on réaffiche la page, sauf en plein QCM.
  function synchroniserPuisAfficher() {
    synchroniser().then(function (change) {
      if (change && !quiz) route();
      else if (location.hash.indexOf("#/compte") === 0) pageCompte();
    });
  }

  // Retour du lien de l'e-mail : Supabase met les jetons ou l'erreur dans le #.
  var messageCompte = "";
  var nouveauMdp = false;   // vrai après un lien « mot de passe oublié »
  function retourSite() { return encodeURIComponent(location.origin + location.pathname); }

  function lireRetourEmail() {
    var h = location.hash.replace(/^#/, "");
    if (h.indexOf("access_token=") < 0 && h.indexOf("error=") < 0) return Promise.resolve();
    var p = {};
    h.split("&").forEach(function (kv) {
      var i = kv.indexOf("=");
      if (i > 0) p[kv.slice(0, i)] = decodeURIComponent(kv.slice(i + 1).replace(/\+/g, " "));
    });
    history.replaceState(null, "", location.pathname + location.search + "#/compte");
    if (p.error) {
      messageCompte = "Le lien n'a pas marché : " + (p.error_description || p.error) + ". Connecte-toi ci-dessous.";
      return Promise.resolve();
    }
    return ouvrirSession(p).then(function () {
      if (p.type === "recovery") {
        nouveauMdp = true;
        messageCompte = "Choisis ton nouveau mot de passe ci-dessous.";
      } else messageCompte = "Adresse confirmée. Tu es connecté.";
    }, function (e) {
      messageCompte = "Connexion impossible : " + e.message;
    });
  }

  function majNav() {
    var lien = document.getElementById("lien-compte");
    var s = lireSession();
    if (lien) lien.textContent = s ? "Compte ✓" : "Connexion";
    var lienEquipe = document.getElementById("lien-equipe");
    if (lienEquipe) lienEquipe.hidden = !(s && (s.role === "admin" || s.role === "formateur"));
    // Aucun outil visible pour ce compte (droits des outils, page Équipe) : pas de lien « Outils ».
    var lienOutils = document.getElementById("lien-outils");
    if (lienOutils) lienOutils.hidden = !unOutilVisible();
    var pied = document.getElementById("pied-compte");
    if (pied) pied.innerHTML = s ? "Tes notes sont enregistrées dans ton compte." :
      'Sans compte, tes notes restent dans ce navigateur. <a href="#/compte">Se connecter</a> pour les retrouver partout.';
  }

  // ---------- Outils ----------
  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Texte avec `code` entre accents graves → balise <code>
  function fmt(t) { return esc(t).replace(/`([^`]+)`/g, "<code>$1</code>"); }

  function melange(tab) {
    var a = tab.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function note20(bonnes, total) { return total ? Math.round((bonnes / total) * 200) / 10 : 0; }
  function classeNote(n) { return n >= 14 ? "good" : n < 10 ? "bad" : ""; }
  function fmtNote(n) { return String(n).replace(".", ",") + "/20"; }
  function fmtDate(iso) {
    var d = new Date(iso);
    return d.toLocaleDateString("fr-FR") + " " + d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  }

  function module(id) {
    for (var i = 0; i < DATA.modules.length; i++) if (DATA.modules[i].id === id) return DATA.modules[i];
    return null;
  }

  // ---------- Parcours et droits ----------
  // Liste à plat : chaque parcours ou sous-parcours avec sa chaîne d'ids (parcours, puis sous-parcours).
  function noeuds() {
    var liste = [];
    (DATA.parcours || []).forEach(function (p) {
      liste.push({ n: p, chaine: [p.id] });
      (p.sous || []).forEach(function (s) { liste.push({ n: s, chaine: [p.id, s.id] }); });
    });
    return liste;
  }

  function noeud(id) {
    return noeuds().filter(function (x) { return x.n.id === id; })[0] || null;
  }

  function chaineModule(mid) {
    var trouve = noeuds().filter(function (x) { return (x.n.modules || []).indexOf(mid) >= 0; })[0];
    return trouve ? trouve.chaine : null;
  }

  function numeroModule(mid) {
    var x = noeud(chaineModule(mid).slice(-1)[0]);
    return x.n.modules.indexOf(mid) + 1;
  }

  // Règle d'un compte (parcours et outils, même table « acces ») : admin, tout. Sinon, chaque niveau de la chaîne
  // doit être ouvert à tous (aucune ligne), ou à un de mes groupes.
  function droitsCompte(s, chaine) {
    if (s.role === "admin") return true;
    var regles = s.acces || [], mes = s.groupeIds || [];
    return chaine.every(function (el) {
      var r = regles.filter(function (x) { return x.element === el; });
      return !r.length || r.some(function (x) { return mes.indexOf(x.groupe_id) >= 0; });
    });
  }

  // Parcours : sans compte, seulement les parcours publics ; avec un compte, la règle ci-dessus.
  function accesOK(chaine) {
    var s = lireSession();
    if (!s) return (DATA.parcoursPublics || []).indexOf(chaine[0]) >= 0;
    return droitsCompte(s, chaine);
  }

  function moduleVisible(mid) {
    var c = chaineModule(mid);
    return !!c && accesOK(c);
  }

  // "m05-q12" → "m05" ; marche aussi pour des ids plus longs ("edi-m01-q03").
  function moduleDe(qid) { return qid.slice(0, qid.lastIndexOf("-q")); }

  function toutesQuestions() {
    var liste = [];
    Object.keys(DATA.questions).forEach(function (m) { liste = liste.concat(DATA.questions[m]); });
    return liste;
  }

  function questionParId(id) {
    var toutes = toutesQuestions();
    for (var i = 0; i < toutes.length; i++) if (toutes[i].id === id) return toutes[i];
    return null;
  }

  function idsEnErreur(store) {
    return Object.keys(store.questions).filter(function (id) {
      return store.questions[id].dernier === false && questionParId(id) && moduleVisible(moduleDe(id));
    });
  }

  function vuesModule(store, qs) {
    return qs.filter(function (q) { return store.questions[q.id]; }).length;
  }

  // Tire n questions : d'abord les jamais vues, puis les ratées, puis les réussies.
  function tirage(qs, store, n) {
    function priorite(q) {
      var st = store.questions[q.id];
      return !st ? 0 : st.dernier === false ? 1 : 2;
    }
    return melange(qs)
      .sort(function (a, b) { return priorite(a) - priorite(b); })
      .slice(0, n || TAILLE_QCM);
  }

  // Révision : répartit total questions entre les thèmes, au moins REVISION_MIN_PAR_THEME chacun.
  function tirageRevision(ids, total, store) {
    var quotas = {};
    var base = Math.floor(total / ids.length);
    ids.forEach(function (id) { quotas[id] = base; });
    melange(ids).slice(0, total - base * ids.length).forEach(function (id) { quotas[id]++; });
    // Un thème trop petit donne son surplus aux autres
    var manque = 0;
    ids.forEach(function (id) {
      var dispo = DATA.questions[id].length;
      if (quotas[id] > dispo) { manque += quotas[id] - dispo; quotas[id] = dispo; }
    });
    melange(ids).forEach(function (id) {
      var place = DATA.questions[id].length - quotas[id];
      var ajout = Math.min(place, manque);
      quotas[id] += ajout; manque -= ajout;
    });
    var liste = [];
    ids.forEach(function (id) { liste = liste.concat(tirage(DATA.questions[id], store, quotas[id])); });
    return liste;
  }

  function themesRevisables() {
    return DATA.modules.filter(function (m) {
      return DATA.questions[m.id] && DATA.questions[m.id].length >= REVISION_MIN_PAR_THEME && moduleVisible(m.id);
    });
  }

  function minRevision(nbThemes) {
    return Math.max(REVISION_MIN_QUESTIONS, REVISION_MIN_PAR_THEME * nbThemes);
  }

  function statsModule(store, id) {
    var t = store.tentatives.filter(function (x) { return x.module === id; });
    if (!t.length) return null;
    var meilleure = Math.max.apply(null, t.map(function (x) { return x.note; }));
    return { nb: t.length, meilleure: meilleure, derniere: t[t.length - 1].note };
  }

  // ---------- Pages ----------
  function carteModule(store, m, num) {
    var qs = DATA.questions[m.id];
    var st = statsModule(store, m.id);
    var droite = !qs ? '<div class="note"><small>' + (DATA.cours[m.id] ? 'Cours seul' : 'À venir') + '</small></div>'
      : st ? '<div class="note ' + classeNote(st.meilleure) + '">' + fmtNote(st.meilleure) +
             '<small>meilleure · ' + st.nb + ' essai(s)</small></div>'
      : '<div class="note"><small>' + Math.min(TAILLE_QCM, qs.length) + ' questions</small></div>';
    var boutons = (DATA.cours[m.id] ? '<a class="btn small ghost" href="#/cours/' + m.id + '">Cours</a>' : '') +
      (DATA.fiches[m.id] ? '<a class="btn small ghost" href="#/fiche/' + m.id + '">Fiche</a>' : '') +
      (qs ? '<a class="btn small" href="#/quiz/' + m.id + '">QCM</a>' : '');
    return '<div class="card module' + (qs || DATA.cours[m.id] ? '' : ' locked') + '">' +
      '<div class="num">' + num + '</div>' +
      '<div><h3>' + esc(m.titre) + '</h3><p>' + esc(m.resume) + '</p>' +
      '<div class="tags"><span class="tag">' + esc(m.niveau) + '</span>' +
      (qs ? '<span class="tag">' + vuesModule(store, qs) + '/' + qs.length + ' vues</span>' : '') + '</div>' +
      (boutons ? '<div class="mini-actions">' + boutons + '</div>' : '') + '</div>' +
      droite + '</div>';
  }

  // Tous les modules d'un parcours, sous-parcours compris.
  function modulesDe(n) {
    var ids = (n.modules || []).slice();
    (n.sous || []).forEach(function (s) { ids = ids.concat(s.modules || []); });
    return ids;
  }

  function carteParcours(store, n, lien) {
    // Un module « sansNote » (ex. le bilan de départ) ne compte pas dans l'objectif de 16/20.
    var ids = modulesDe(n), prets = ids.filter(function (id) {
      var m = module(id);
      return DATA.questions[id] && !(m && m.sansNote);
    });
    var reussis = prets.filter(function (id) { var st = statsModule(store, id); return st && st.meilleure >= 16; });
    var nbSous = (n.sous || []).length;
    var avecCours = ids.filter(function (id) { return DATA.cours[id]; }).length;
    var detail = !prets.length && !nbSous && !avecCours ? 'À venir'
      : (nbSous ? nbSous + ' sous-parcours · ' : '') + ids.length + (ids.length > 1 ? ' modules' : ' module');
    return '<a class="card parcours" href="' + lien + '"><div><h3>' + esc(n.titre) + '</h3>' +
      '<p>' + esc(n.resume) + '</p><div class="tags"><span class="tag">' + detail + '</span>' +
      (prets.length ? '<span class="tag">' + reussis.length + '/' + prets.length + ' à 16/20</span>' : '') +
      '</div></div><span class="fleche" aria-hidden="true">›</span></a>';
  }

  function pageAccueil() {
    var store = lire();
    var html = '<h1>Tes parcours</h1>' +
      '<p class="muted">Choisis un parcours. Fais les modules dans l\'ordre. Refais-les jusqu\'à 16/20.</p>';
    var nbErr = idsEnErreur(store).length;
    if (nbErr) {
      html += '<div class="card"><strong>' + nbErr + ' question(s) à revoir.</strong> ' +
        '<a href="#/erreurs">Refaire mes erreurs</a></div>';
    }
    var visibles = (DATA.parcours || []).filter(function (p) { return accesOK([p.id]); });
    visibles.forEach(function (p) { html += carteParcours(store, p, '#/p/' + p.id); });
    if (!lireSession()) {
      html += '<p class="muted"><a href="#/compte">Connecte-toi</a> pour voir les autres parcours.</p>';
    }
    app.innerHTML = html;
  }

  function pageParcours(pid, sid) {
    var p = noeud(pid), s = sid ? noeud(sid) : null;
    if (!p || p.chaine.length !== 1 || (sid && (!s || s.chaine[0] !== pid)) || !accesOK(s ? s.chaine : p.chaine)) {
      location.hash = "#/"; return;
    }
    var store = lire(), n = s ? s.n : p.n;
    var html = '<p class="muted"><a href="#/">Parcours</a>' +
      (s ? ' › <a href="#/p/' + pid + '">' + esc(p.n.titre) + '</a>' : '') + '</p>' +
      '<h1>' + esc(n.titre) + '</h1><p class="muted">' + esc(n.resume) + '</p>';
    (n.sous || []).filter(function (x) { return accesOK([pid, x.id]); }).forEach(function (x) {
      html += carteParcours(store, x, '#/p/' + pid + '/' + x.id);
    });
    (n.modules || []).forEach(function (id, i) {
      var m = module(id);
      if (m) html += carteModule(store, m, i + 1);
    });
    if (!(n.modules || []).length && !(n.sous || []).length) {
      html += '<div class="card"><p>Ce parcours arrive bientôt.</p></div>';
    }
    app.innerHTML = html;
  }

  // Résultat d'un exemple de cours : une phrase, ou un petit tableau (1re ligne = en-têtes).
  function resultatCours(r) {
    if (!Array.isArray(r)) return '<p class="muted">→ ' + fmt(r) + '</p>';
    var cell = function (v) { return v === null ? '<em class="muted">NULL</em>' : esc(String(v)); };
    return '<p class="label">Résultat</p><div class="table-wrap resultat"><table><thead><tr>' +
      r[0].map(function (h) { return '<th>' + esc(String(h)) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      r.slice(1).map(function (row) { return '<tr>' + row.map(function (v) { return '<td>' + cell(v) + '</td>'; }).join('') + '</tr>'; }).join('') +
      '</tbody></table></div>';
  }

  // Page d'un cours (#/cours/mXX) ou de sa fiche de révision (#/fiche/mXX, fiche = true) : même format, même rendu,
  // mêmes droits que le module. En haut, le lien vers l'autre (s'il existe). Un cours ou une fiche absent : un message.
  function pageCours(id, fiche) {
    var m = module(id);
    if (!m || !moduleVisible(id)) { location.hash = "#/"; return; }
    var c = (fiche ? DATA.fiches : DATA.cours)[id];
    var autre = fiche ? (DATA.cours[id] ? '<a href="#/cours/' + id + '">Le cours complet</a>' : '')
      : (DATA.fiches[id] ? '<a href="#/fiche/' + id + '">La fiche de révision</a>' : '');
    var html = '<p class="muted">' + (fiche ? '' : 'Cours · ') + 'Module ' + numeroModule(id) + (autre ? ' · ' + autre : '') + '</p>' +
      '<h1>' + (fiche ? 'Fiche de révision · ' : '') + esc(m.titre) + '</h1>';
    if (c) html += contenuCours(id, c);
    else html += '<p>' + (fiche ? 'Pas encore de fiche de révision' : 'Pas encore de cours') + ' pour ce module.</p>';
    html += '<div class="actions">' +
      (DATA.questions[id] ? '<a class="btn" href="#/quiz/' + id + '">Faire le QCM</a>' : '') +
      '<a class="btn ghost" href="#/p/' + chaineModule(id).join('/') + '">Retour au parcours</a></div>';
    app.innerHTML = html;
  }

  // Le contenu d'un cours ou d'une fiche : intro, sections, écarts SQL Server / Snowflake, outils du cours.
  function contenuCours(id, c) {
    var html = '<p>' + fmt(c.intro) + '</p>';
    // Hors SQL, l'exemple est une situation en texte : police normale, retour à la ligne.
    var sql = chaineModule(id)[0] === "sql";
    var balise = sql ? '<pre class="code">' : '<pre class="code texte">';
    c.sections.forEach(function (sec, i) {
      html += '<h2>' + (i + 1) + '. ' + esc(sec.titre) + '</h2><div class="card">' +
        (sec.exemple ? '<p class="label">Exemple</p>' + balise + (sql ? esc(sec.exemple) : fmt(sec.exemple)) + '</pre>' : '') +
        (sec.resultat ? resultatCours(sec.resultat) : '') +
        // La règle générale (champ facultatif « regle ») : le sens de la notion, en phrases simples, après l'exemple.
        (sec.regle ? '<div class="feedback pratique regle"><p class="label">La règle générale</p><p>' + fmt(sec.regle) + '</p></div>' : '') +
        '<ul class="points">' + sec.points.map(function (p) { return '<li>' + fmt(p) + '</li>'; }).join('') + '</ul>' +
        (sec.retenir ? '<div class="feedback ok"><p><strong>À retenir :</strong> ' + fmt(sec.retenir) + '</p></div>' : '') +
        (sec.source ? '<p class="muted">Source : <a href="' + esc(sec.source.url) + '" target="_blank" rel="noopener">' +
          esc(sec.source.titre) + '</a></p>' : '') +
        '</div>';
    });
    if (c.differences && c.differences.length) {
      html += '<h2>SQL Server ou Snowflake ?</h2><div class="card table-wrap"><table><thead><tr>' +
        '<th>Sujet</th><th>SQL Server</th><th>Snowflake</th></tr></thead><tbody>' +
        c.differences.map(function (d) {
          return '<tr><td>' + fmt(d[0]) + '</td><td>' + fmt(d[1]) + '</td><td>' + fmt(d[2]) + '</td></tr>';
        }).join('') + '</tbody></table></div>';
    }
    // Les outils qui mettent ce cours en pratique (champ « cours » des outils, docs/outils.md).
    var outils = outilsDuCours(id);
    if (outils.length) html += '<h2>Les outils de ce cours</h2>' + outils.map(function (o) { return carteOutil(o); }).join('');
    return html;
  }

  // Les fiches de révision de ces modules (seulement celles qui existent, modules visibles), dans l'ordre des modules :
  // un titre et des liens, ou rien.
  function liensFiches(ids) {
    var l = DATA.modules.filter(function (m) { return ids.indexOf(m.id) >= 0 && DATA.fiches[m.id] && moduleVisible(m.id); });
    if (!l.length) return '';
    return '<h2>' + (l.length > 1 ? 'Fiches de révision' : 'Fiche de révision') + '</h2><ul class="recap">' +
      l.map(function (m) { return '<li><a href="#/fiche/' + m.id + '">' + esc(m.titre) + '</a></li>'; }).join('') + '</ul>';
  }

  // Arbre de révision : thème (parcours) > sous-thème (sous-parcours) > modules.
  // Une case de thème ou de sous-thème coche tous ses modules d'un coup.
  function arbreRevision(store, choisis) {
    var revisables = {};
    themesRevisables().forEach(function (m) { revisables[m.id] = m; });

    function caseModule(id, groupes) {
      var m = revisables[id], st = statsModule(store, id);
      return '<label class="theme"><input type="checkbox" value="' + id + '" data-groupes="' + groupes.join(' ') + '"' +
        (choisis.indexOf(id) >= 0 ? ' checked' : '') + '> <span>' + esc(m.titre) +
        (st ? ' <small class="' + classeNote(st.meilleure) + '">' + fmtNote(st.meilleure) + '</small>' : '') +
        '</span></label>';
    }
    function noeudHtml(n, chaine, niveau) {
      var direct = (n.modules || []).filter(function (id) { return revisables[id]; });
      var sous = (n.sous || []).filter(function (s) { return accesOK(chaine.concat(s.id)); })
        .map(function (s) { return noeudHtml(s, chaine.concat(s.id), niveau + 1); })
        .filter(Boolean);
      var tous = modulesDe(n).filter(function (id) { return revisables[id] && accesOK(chaine); });
      if (!direct.length && !sous.length) return '';
      var ouvert = tous.some(function (id) { return choisis.indexOf(id) >= 0; });
      return '<div class="noeud niv' + niveau + '"><label class="tete"><input type="checkbox" data-groupe="' + n.id + '"> ' +
        '<strong>' + esc(n.titre) + '</strong> <small class="muted">· ' + tous.length + ' module(s)</small></label>' +
        '<details' + (ouvert ? ' open' : '') + '><summary>Choisir les modules</summary><div class="enfants">' +
        direct.map(function (id) { return caseModule(id, chaine); }).join('') + sous.join('') +
        '</div></details></div>';
    }
    return (DATA.parcours || []).filter(function (p) { return accesOK([p.id]); })
      .map(function (p) { return noeudHtml(p, [p.id], 1); }).join('');
  }

  function pageRevision(preselection) {
    var store = lire();
    var choisis = (preselection || "").split(",").filter(Boolean);
    var themes = themesRevisables();
    var html = '<h1>Révision</h1>' +
      '<p>Coche un thème entier, un sous-thème, ou des modules un par un. Il faut au moins ' + REVISION_MIN_THEMES +
      ' modules. Le QCM mélange les questions : ' + REVISION_MIN_QUESTIONS + ' minimum, et au moins ' +
      REVISION_MIN_PAR_THEME + ' par module.</p>';
    if (themes.length < REVISION_MIN_THEMES) {
      app.innerHTML = html + '<p>Il faut au moins ' + REVISION_MIN_THEMES + ' modules avec des questions.</p>';
      return;
    }
    html += '<div class="card arbre">' + arbreRevision(store, choisis) + '</div>' +
      '<p><label>Nombre de questions : <select id="nb"></select></label></p>' +
      '<p id="info" class="muted"></p>' +
      '<div class="actions"><button type="button" class="btn" id="lancer">Lancer la révision</button></div>' +
      '<div id="fiches-choisies"></div>';   // (sous le bouton : il ne bouge pas quand on coche)
    app.innerHTML = html;

    var nb = document.getElementById("nb");
    var cases = Array.prototype.slice.call(app.querySelectorAll(".theme input"));
    function casesDu(groupe) {
      return cases.filter(function (c) { return c.getAttribute("data-groupes").split(" ").indexOf(groupe) >= 0; });
    }
    // Une case de groupe : cochée si tous ses modules le sont, à moitié (tiret) si certains seulement.
    function majGroupes() {
      app.querySelectorAll("[data-groupe]").forEach(function (g) {
        var liste = casesDu(g.getAttribute("data-groupe"));
        var n = liste.filter(function (c) { return c.checked; }).length;
        g.checked = n > 0 && n === liste.length;
        g.indeterminate = n > 0 && n < liste.length;
      });
    }
    function maj() {
      majGroupes();
      var ids = selection();
      var dispo = ids.reduce(function (t, id) { return t + DATA.questions[id].length; }, 0);
      var min = minRevision(Math.max(ids.length, REVISION_MIN_THEMES));
      var garde = Number(nb.value) || min;
      nb.innerHTML = "";
      for (var n = min; n <= min + 30 && (n <= dispo || n === min); n += 10) {
        nb.innerHTML += '<option value="' + n + '"' + (n === garde ? ' selected' : '') + '>' + n + '</option>';
      }
      var ok = ids.length >= REVISION_MIN_THEMES;
      document.getElementById("lancer").disabled = !ok;
      document.getElementById("info").textContent = ok
        ? ids.length + " modules choisis."
        : "Choisis encore " + (REVISION_MIN_THEMES - ids.length) + " module(s).";
      document.getElementById("fiches-choisies").innerHTML = liensFiches(ids);
      // Les modules choisis restent dans l'adresse : en revenant d'une fiche (ou du QCM), ils sont encore cochés.
      try { history.replaceState(history.state, "", "#/revision" + (ids.length ? "/" + ids.join(",") : "")); } catch (e) { /* ignoré */ }
    }
    function selection() {
      return cases.filter(function (c) { return c.checked; }).map(function (c) { return c.value; });
    }
    cases.forEach(function (c) { c.addEventListener("change", maj); });
    app.querySelectorAll("[data-groupe]").forEach(function (g) {
      g.addEventListener("change", function () {
        casesDu(g.getAttribute("data-groupe")).forEach(function (c) { c.checked = g.checked; });
        maj();
      });
    });
    document.getElementById("lancer").addEventListener("click", function () {
      location.hash = "#/quiz/revision/" + selection().join(",") + "/" + nb.value;
    });
    maj();
  }

  function demarrerQuiz(id, themes, nb) {
    var questions, titre;
    if (id === "revision") {
      var ids = (themes || "").split(",").filter(function (t) {
        return themesRevisables().some(function (m) { return m.id === t; });
      });
      if (ids.length < REVISION_MIN_THEMES) { location.hash = "#/revision"; return; }
      var total = Math.max(minRevision(ids.length), Number(nb) || 0);
      questions = tirageRevision(ids, total, lire());
      titre = "Révision · " + ids.length + " modules";
    } else if (id === "erreurs") {
      questions = idsEnErreur(lire()).map(questionParId);
      titre = "Mes erreurs";
    } else {
      var m = module(id);
      questions = DATA.questions[id] && moduleVisible(id) ? tirage(DATA.questions[id], lire()) : null;
      titre = m ? m.titre : id;
    }
    if (!questions || !questions.length) {
      app.innerHTML = '<h1>' + esc(titre || "Quiz") + '</h1><p>Aucune question ici pour l\'instant.</p>' +
        '<div class="actions"><a class="btn" href="#/">Retour au parcours</a></div>';
      return;
    }
    quiz = {
      module: id,
      titre: titre,
      lien: location.hash,
      items: melange(questions).map(function (q) {
        // On mélange les réponses en gardant l'index d'origine
        return { q: q, ordre: melange(q.choix.map(function (_, i) { return i; })) };
      }),
      idx: 0,
      choisi: null,
      valide: false,
      reponses: []
    };
    afficherQuestion();
  }

  function afficherQuestion() {
    var it = quiz.items[quiz.idx];
    var q = it.q;
    var total = quiz.items.length;
    var lettres = "ABCDEF";

    var html = '<p class="muted">' + esc(quiz.titre) + ' · Question ' + (quiz.idx + 1) + ' sur ' + total +
      ' · <span class="tag">' + esc(q.dialecte) + '</span></p>' +
      '<div class="progress"><div style="width:' + (quiz.idx / total * 100) + '%"></div></div>' +
      '<div class="question">' + esc(q.q) + '</div>' +
      (q.code ? '<pre class="code">' + esc(q.code) + '</pre>' : '') +
      '<div class="choices">';

    it.ordre.forEach(function (orig, pos) {
      var cls = "choice";
      var why = "";
      if (quiz.valide) {
        if (orig === q.bonne) cls += " right";
        else if (orig === quiz.choisi) cls += " wrong";
        if (orig === q.bonne || orig === quiz.choisi) why = '<span class="why">' + fmt(q.pourquoi[orig]) + '</span>';
      } else if (orig === quiz.choisi) {
        cls += " selected";
      }
      html += '<button type="button" class="' + cls + '" data-orig="' + orig + '"' + (quiz.valide ? " disabled" : "") + '>' +
        '<span class="letter">' + lettres[pos] + '.</span>' +
        (q.choixCode ? '<code>' + esc(q.choix[orig]) + '</code>' : esc(q.choix[orig])) + why + '</button>';
    });
    html += '</div>';

    if (quiz.valide) {
      var juste = quiz.choisi === q.bonne;
      html += '<div class="feedback ' + (juste ? "ok" : "ko") + '">' +
        '<h3>' + (juste ? "Bonne réponse !" : "Pas tout à fait.") + '</h3>' +
        '<p><strong>À retenir :</strong> ' + fmt(q.retenir) + '</p>' +
        (q.source ? '<p class="muted">Source : <a href="' + esc(q.source.url) + '" target="_blank" rel="noopener">' +
          esc(q.source.titre) + '</a></p>' : '') + '</div>' +
        '<div class="actions"><button type="button" class="btn" id="suivant">' +
        (quiz.idx + 1 < total ? "Question suivante" : "Voir ma note") + '</button></div>';
    } else {
      html += '<div class="actions"><button type="button" class="btn" id="valider"' +
        (quiz.choisi === null ? " disabled" : "") + '>Valider</button>' +
        '<a class="btn ghost" href="#/">Abandonner</a></div>';
    }
    app.innerHTML = html;

    app.querySelectorAll(".choice").forEach(function (b) {
      b.addEventListener("click", function () {
        quiz.choisi = Number(b.getAttribute("data-orig"));
        afficherQuestion();
      });
    });
    var v = document.getElementById("valider");
    if (v) v.addEventListener("click", valider);
    var s = document.getElementById("suivant");
    if (s) { s.addEventListener("click", suivant); s.focus(); }
  }

  function valider() {
    var q = quiz.items[quiz.idx].q;
    quiz.valide = true;
    quiz.reponses.push({ id: q.id, choisi: quiz.choisi, juste: quiz.choisi === q.bonne });

    var store = lire();
    var st = store.questions[q.id] || { vues: 0, justes: 0 };
    st.vues++;
    if (quiz.choisi === q.bonne) st.justes++;
    st.dernier = quiz.choisi === q.bonne;
    store.questions[q.id] = st;
    ecrire(store);

    afficherQuestion();
  }

  function suivant() {
    if (quiz.idx + 1 < quiz.items.length) {
      quiz.idx++;
      quiz.choisi = null;
      quiz.valide = false;
      afficherQuestion();
      window.scrollTo(0, 0);
      return;
    }
    terminer();
  }

  function terminer() {
    var bonnes = quiz.reponses.filter(function (r) { return r.juste; }).length;
    var total = quiz.reponses.length;
    var t = {
      module: quiz.module,
      titre: quiz.titre,
      date: new Date().toISOString(),
      note: note20(bonnes, total),
      bonnes: bonnes,
      total: total,
      erreurs: quiz.reponses.filter(function (r) { return !r.juste; })
        .map(function (r) { return { id: r.id, choisi: r.choisi }; }),
      lien: quiz.lien,
      parTheme: {}
    };
    quiz.reponses.forEach(function (r) {
      var m = moduleDe(r.id);
      var pt = t.parTheme[m] || (t.parTheme[m] = { bonnes: 0, total: 0 });
      pt.total++;
      if (r.juste) pt.bonnes++;
    });
    var store = lire();
    store.tentatives.push(t);
    ecrire(store);
    dernierResultat = t;
    quiz = null;
    location.hash = "#/resultat";
  }

  function pageResultat() {
    var t = dernierResultat;
    if (!t) { location.hash = "#/"; return; }
    var appreciation = t.note >= 18 ? "Excellent. Tu maîtrises ce thème."
      : t.note >= 14 ? "Bien. Revois les erreurs et vise 18."
      : t.note >= 10 ? "Moyen. Relis les explications et refais le QCM."
      : "À retravailler. Parles-en au prof avant de refaire le QCM.";

    var html = '<h1>' + esc(t.titre) + '</h1>' +
      '<div class="big-note ' + classeNote(t.note) + '">' + fmtNote(t.note) + '</div>' +
      '<p>' + t.bonnes + ' bonne(s) réponse(s) sur ' + t.total + '. ' + appreciation + '</p>';

    var themes = Object.keys(t.parTheme || {});
    if (themes.length > 1) {
      html += '<h2>Par thème</h2><div class="card"><table><tbody>';
      themes.forEach(function (id) {
        var pt = t.parTheme[id];
        var n = note20(pt.bonnes, pt.total);
        html += '<tr><td>' + esc(module(id).titre) + '</td><td>' + pt.bonnes + '/' + pt.total + '</td>' +
          '<td class="' + classeNote(n) + '"><strong>' + fmtNote(n) + '</strong></td></tr>';
      });
      html += '</tbody></table></div>';
    }

    if (t.erreurs.length) {
      html += '<h2>Tes erreurs</h2><ul class="recap">';
      t.erreurs.forEach(function (e) {
        var q = questionParId(e.id);
        if (q) html += '<li><strong>' + esc(q.q) + '</strong><br><span class="muted">À retenir : ' + fmt(q.retenir) + '</span></li>';
      });
      html += '</ul>';
    }
    // Les fiches de révision des modules de ce QCM (un module, ou plusieurs pour une révision ou « Mes erreurs »).
    html += liensFiches(themes) +
      '<div class="actions">' +
      '<a class="btn" href="' + esc(t.lien || "#/quiz/" + t.module) + '">Refaire</a>' +
      '<a class="btn ghost" href="#/">Parcours</a>' +
      '<a class="btn ghost" href="#/export">Exporter pour le prof</a></div>';
    app.innerHTML = html;
  }

  function pageErreurs() {
    var store = lire();
    var ids = idsEnErreur(store);
    var html = '<h1>Mes erreurs</h1>';
    if (!ids.length) {
      html += '<p>Aucune question à revoir. Bravo !</p><div class="actions"><a class="btn" href="#/">Parcours</a></div>';
      app.innerHTML = html;
      return;
    }
    html += '<p>' + ids.length + ' question(s) ratée(s) la dernière fois. Une question réussie sort de la liste.</p>' +
      '<div class="actions"><a class="btn" href="#/quiz/erreurs">Refaire ces questions</a></div><h2>Liste</h2>';
    ids.forEach(function (id) {
      var q = questionParId(id);
      html += '<div class="card"><span class="tag">' + esc(module(moduleDe(id)).titre) + '</span>' +
        '<p style="margin:6px 0 0">' + esc(q.q) + '</p></div>';
    });
    app.innerHTML = html;
  }

  function pageHistorique() {
    var store = lire();
    var html = '<h1>Mes notes</h1>';
    if (!store.tentatives.length) {
      app.innerHTML = html + '<p>Pas encore de note. Commence le module 1 !</p>';
      return;
    }
    var toutes = store.tentatives.map(function (t) { return t.note; });
    var moy = Math.round(toutes.reduce(function (a, b) { return a + b; }, 0) / toutes.length * 10) / 10;
    html += '<p>Moyenne générale : <strong class="' + classeNote(moy) + '">' + fmtNote(moy) + '</strong> sur ' +
      toutes.length + ' QCM.</p><div class="card"><table><thead><tr><th>Date</th><th>Module</th><th>Note</th></tr></thead><tbody>';
    store.tentatives.slice().reverse().forEach(function (t) {
      html += '<tr><td>' + fmtDate(t.date) + '</td><td>' + esc(t.titre) + '</td>' +
        '<td class="' + classeNote(t.note) + '"><strong>' + fmtNote(t.note) + '</strong></td></tr>';
    });
    app.innerHTML = html + '</tbody></table></div>';
  }

  // ---------- Export pour le prof ----------
  function texteExport() {
    var store = lire();
    var l = [];
    l.push("# LearnSQL — export pour le prof");
    l.push("Date : " + fmtDate(new Date().toISOString()));
    l.push("");
    l.push("## Notes par module");
    DATA.modules.forEach(function (m) {
      var st = statsModule(store, m.id);
      if (st) l.push("- " + m.id + " " + m.titre + " : dernière " + fmtNote(st.derniere) +
        ", meilleure " + fmtNote(st.meilleure) + ", " + st.nb + " essai(s)");
    });
    l.push("");
    l.push("## Questions ratées la dernière fois");
    var ids = idsEnErreur(store);
    if (!ids.length) l.push("Aucune.");
    ids.forEach(function (id) {
      var q = questionParId(id);
      var s = store.questions[id];
      l.push("- [" + id + "] " + q.q + " (réussie " + s.justes + "/" + s.vues + ")");
    });
    l.push("");
    l.push("## 10 derniers QCM");
    store.tentatives.slice(-10).forEach(function (t) {
      var det = t.erreurs.map(function (e) {
        var q = questionParId(e.id);
        return e.id + " → répondu « " + (q ? q.choix[e.choisi] : e.choisi) + " »";
      });
      var pt = Object.keys(t.parTheme || {});
      l.push("- " + fmtDate(t.date) + " · " + t.titre + " · " + fmtNote(t.note) +
        (pt.length > 1 ? "\n    par thème : " + pt.map(function (id) {
          return id + " " + t.parTheme[id].bonnes + "/" + t.parTheme[id].total;
        }).join(", ") : "") +
        (det.length ? "\n    erreurs : " + det.join(" | ") : ""));
    });
    l.push("");
    l.push("<!-- SAUVEGARDE (ne pas modifier)");
    l.push(JSON.stringify(store));
    l.push("-->");
    return l.join("\n");
  }

  function pageExport() {
    app.innerHTML = '<h1>Exporter pour le prof</h1>' +
      '<p>Copie ce texte et colle-le dans ton chat avec Claude. Le prof verra tes notes et tes erreurs.</p>' +
      '<textarea id="export" readonly>' + esc(texteExport()) + '</textarea>' +
      '<div class="actions"><button type="button" class="btn" id="copier">Copier</button></div>' +
      '<h2>Restaurer une sauvegarde</h2>' +
      '<p class="muted">Autre ordinateur ? Colle ici un ancien export complet, puis clique sur Restaurer.</p>' +
      '<textarea id="import" style="min-height:120px"></textarea>' +
      '<div class="actions"><button type="button" class="btn ghost" id="restaurer">Restaurer</button></div>' +
      '<p id="msg" class="muted"></p>';

    document.getElementById("copier").addEventListener("click", function () {
      var ta = document.getElementById("export");
      var fini = function () { document.getElementById("msg").textContent = "Copié ! Colle-le dans le chat."; };
      if (navigator.clipboard) navigator.clipboard.writeText(ta.value).then(fini, function () { ta.select(); document.execCommand("copy"); fini(); });
      else { ta.select(); document.execCommand("copy"); fini(); }
    });
    document.getElementById("restaurer").addEventListener("click", function () {
      var txt = document.getElementById("import").value;
      var m = txt.match(/SAUVEGARDE[^\n]*\n([\s\S]*?)\n-->/);
      var msg = document.getElementById("msg");
      try {
        var s = JSON.parse(m ? m[1] : txt);
        if (!s || s.version !== 1) throw new Error("format");
        if (!confirm("Remplacer tes notes actuelles par cette sauvegarde ?")) return;
        ecrire(s);
        msg.textContent = "Sauvegarde restaurée.";
        document.getElementById("export").value = texteExport();
      } catch (e) {
        msg.textContent = "Texte non reconnu. Colle l'export complet.";
      }
    });
  }

  function pageCompte() {
    var s = lireSession();
    var html = '<h1>Mon compte</h1>';
    if (messageCompte) html += '<div class="card"><strong>' + esc(messageCompte) + '</strong></div>';

    if (s) {
      var gr = s.groupes || [];
      html += '<p>Connecté avec <strong>' + esc(s.email) + '</strong>.</p>' +
        '<div class="card"><p class="label">Rôle</p><p>' + esc(s.role || "agent") + '</p>' +
        '<p class="label">' + (gr.length > 1 ? 'Mes groupes' : 'Mon groupe') + '</p><p>' +
        (gr.length ? gr.map(esc).join(', ') : 'Pas encore de groupe. L\'admin va te ranger dans le bon.') + '</p></div>' +
        '<p class="muted">Ta progression est enregistrée en ligne. Connecte-toi avec la même adresse ' +
        'sur un autre appareil : tu la retrouves.</p>' +
        '<p class="muted" id="etat-sync">' + esc(etatSync) + '</p>' +
        '<div class="actions"><button type="button" class="btn" id="sync">Synchroniser maintenant</button>' +
        '<button type="button" class="btn ghost" id="deconnexion">Se déconnecter</button></div>' +
        '<details class="card"><summary><strong>Supprimer mon compte</strong></summary>' +
        '<p>Tout est effacé du serveur : ton e-mail, ta progression, tes groupes. C\'est définitif.</p>' +
        '<p class="muted">Avant, tu peux garder une copie de tes notes avec <a href="#/export">Exporter</a>.</p>' +
        '<div class="actions"><button type="button" class="btn danger" id="supprimer-compte">Supprimer définitivement</button></div>' +
        '<p id="msg-suppr" class="muted"></p></details>' +
        '<details class="card"' + (nouveauMdp ? ' open' : '') + '><summary><strong>Changer mon mot de passe</strong></summary>' +
        '<form id="form-mdp" class="form"><label for="mdp-neuf">Nouveau mot de passe (8 caractères minimum)</label>' +
        '<input id="mdp-neuf" type="password" autocomplete="new-password" minlength="8" required>' +
        '<label for="mdp-neuf2">Le même, une 2e fois</label>' +
        '<input id="mdp-neuf2" type="password" autocomplete="new-password" minlength="8" required>' +
        '<div class="actions"><button type="submit" class="btn">Enregistrer</button></div>' +
        '<p id="msg-mdp" class="muted"></p></form></details>';
      app.innerHTML = html;
      document.getElementById("form-mdp").addEventListener("submit", function (e) {
        e.preventDefault();
        var m1 = document.getElementById("mdp-neuf").value, m2 = document.getElementById("mdp-neuf2").value;
        var msgMdp = document.getElementById("msg-mdp");
        if (m1.length < 8) { msgMdp.textContent = "8 caractères minimum."; return; }
        if (m1 !== m2) { msgMdp.textContent = "Les deux mots de passe sont différents."; return; }
        msgMdp.textContent = "Enregistrement…";
        sessionValide().then(function (sv) {
          return appelSupa("/auth/v1/user", { methode: "PUT", corps: { password: m1 } }, sv.access_token);
        }).then(function () {
          nouveauMdp = false;
          messageCompte = "";
          msgMdp.textContent = "Mot de passe changé.";
          var f = document.getElementById("form-mdp");
          if (f) f.reset();   // (l'élève a pu changer de page entre-temps)
        }, function (err) {
          msgMdp.textContent = /different|same/i.test(err.message)
            ? "Choisis un mot de passe différent de l'ancien."
            : "Impossible : " + err.message;
        });
      });
      document.getElementById("sync").addEventListener("click", function () {
        document.getElementById("etat-sync").textContent = "Synchronisation…";
        synchroniserPuisAfficher();
      });
      document.getElementById("supprimer-compte").addEventListener("click", function () {
        var msgS = document.getElementById("msg-suppr");
        if (prompt("Pour confirmer, tape SUPPRIMER") !== "SUPPRIMER") { msgS.textContent = "Rien n'a été supprimé."; return; }
        msgS.textContent = "Suppression…";
        var encore = pageActuelle();
        sessionValide().then(function (sv) {
          return appelSupa("/rest/v1/rpc/supprimer_mon_compte", { methode: "POST", corps: {} }, sv.access_token);
        }).then(function () {
          ecrireSession(null);
          etatSync = "";
          if (confirm("Compte supprimé. Effacer aussi tes notes et tes documents des outils de CET appareil ?")) {
            try { localStorage.removeItem(STORE_KEY); } catch (e) { /* ignoré */ }
            effacerDocsOutils();
          }
          messageCompte = "Ton compte a été supprimé.";
          majNav();
          if (encore()) pageCompte();
        }, function (err) {
          msgS.textContent = "Suppression impossible : " + err.message;
        });
      });
      document.getElementById("deconnexion").addEventListener("click", function () {
        appelSupa("/auth/v1/logout", { methode: "POST" }, s.access_token).catch(function () { /* déjà expirée */ });
        ecrireSession(null);
        etatSync = "";
        majNav();
        pageCompte();
      });
      return;
    }

    html += '<p class="muted">Sans compte, tes notes restent sur cet appareil. ' +
      'Avec un compte, tu les retrouves sur ton mobile, ton PC, ton Mac…</p>' +
      '<form id="form-compte" class="card form">' +
      '<label for="email">Adresse e-mail</label>' +
      '<input id="email" type="email" autocomplete="email" required>' +
      '<label for="mdp">Mot de passe (8 caractères minimum)</label>' +
      '<input id="mdp" type="password" autocomplete="current-password" minlength="8" required>' +
      '<div class="actions"><button type="submit" class="btn">Se connecter</button>' +
      '<button type="button" class="btn ghost" id="inscription">Créer un compte</button></div>' +
      '<p><button type="button" class="lien" id="oubli">Mot de passe oublié ?</button></p>' +
      '<p class="muted">En créant un compte, ton e-mail et ta progression sont stockés pour te les rendre sur tous tes appareils. ' +
      'Détails et droits : <a href="#/confidentialite">Confidentialité</a>.</p>' +
      '<p id="msg" class="muted"></p></form>';
    app.innerHTML = html;

    var msg = document.getElementById("msg");
    function champs() {
      var email = document.getElementById("email").value.trim();
      var mdp = document.getElementById("mdp").value;
      if (!email || mdp.length < 8) { msg.textContent = "Il faut une adresse e-mail et 8 caractères minimum."; return null; }
      return { email: email, password: mdp };
    }
    function connecte() {
      var encore = pageActuelle();
      majNav();
      messageCompte = "Connecté. Ta progression de cet appareil est ajoutée à ton compte.";
      synchroniser().then(function () { if (encore()) pageCompte(); });
    }

    document.getElementById("form-compte").addEventListener("submit", function (e) {
      e.preventDefault();
      var c = champs();
      if (!c) return;
      msg.textContent = "Connexion…";
      appelSupa("/auth/v1/token?grant_type=password", { methode: "POST", corps: c })
        .then(ouvrirSession)
        .then(connecte, function (err) {
          msg.textContent = /confirm/i.test(err.message)
            ? "Adresse pas encore confirmée : clique d'abord sur le lien reçu par e-mail."
            : "Connexion impossible : adresse ou mot de passe faux.";
        });
    });

    document.getElementById("oubli").addEventListener("click", function () {
      var email = document.getElementById("email").value.trim();
      if (!email) { msg.textContent = "Tape d'abord ton adresse e-mail, puis reclique ici."; return; }
      msg.textContent = "Envoi…";
      appelSupa("/auth/v1/recover?redirect_to=" + retourSite(), { methode: "POST", corps: { email: email } }).then(function () {
        msg.textContent = "Si un compte existe avec cette adresse, un e-mail est parti. Clique sur le lien qu'il contient.";
      }, function (err) {
        msg.textContent = /rate|limit|seconds/i.test(err.message)
          ? "Trop de demandes. Attends quelques minutes, puis réessaie."
          : "Envoi impossible : " + err.message;
      });
    });

    document.getElementById("inscription").addEventListener("click", function () {
      var c = champs();
      if (!c) return;
      msg.textContent = "Création du compte…";
      appelSupa("/auth/v1/signup?redirect_to=" + retourSite(), { methode: "POST", corps: c }).then(function (d) {
        if (d && d.access_token) return ouvrirSession(d).then(connecte);
        msg.textContent = "Compte créé. Ouvre l'e-mail reçu et clique sur le lien pour le confirmer.";
      }, function (err) {
        msg.textContent = "Création impossible : " + err.message;
      });
    });
  }

  // ---------- Équipe (admin et formateurs) ----------
  // La base ne renvoie que ce que le rôle a le droit de voir : l'admin tout, le formateur ses groupes.
  function chargerEquipe(s) {
    function get(chemin) { return appelSupa("/rest/v1/" + chemin, {}, s.access_token); }
    return Promise.all([
      get("profil?select=user_id,email,role,cree&order=email"),
      get("groupe?select=id,nom&order=nom"),
      get("membre?select=groupe_id,user_id"),
      get("progression?select=user_id,data,maj"),
      get("acces?select=element,groupe_id").catch(function () { return []; })
    ]).then(function (r) {
      var prog = {}, actif = {};
      r[3].forEach(function (l) {
        prog[l.user_id] = l.data && l.data.version === 1 ? l.data : videStore();
        actif[l.user_id] = l.maj;
      });
      // Dernière activité = dernière synchro de la progression, sinon la création du compte.
      r[0].forEach(function (p) { p.activite = actif[p.user_id] || p.cree; });
      return { profils: r[0], groupes: r[1], membres: r[2], prog: prog, acces: r[4] };
    });
  }

  var INACTIF_JOURS = 730;   // 2 ans : au-delà, le compte est signalé à l'admin (suppression à la main)
  function estInactif(p) {
    return !!p.activite && Date.now() - new Date(p.activite).getTime() > INACTIF_JOURS * 86400000;
  }

  function resumePersonne(store) {
    var t = store.tentatives;
    if (!t.length) return { nb: 0 };
    var moy = Math.round(t.reduce(function (a, x) { return a + x.note; }, 0) / t.length * 10) / 10;
    return { nb: t.length, moy: moy, der: t[t.length - 1] };
  }

  // Les tableaux de la page Équipe ont la classe « empile » : sur téléphone, une ligne devient un bloc et chaque case
  // dit ce qu'elle contient (data-titre), sans défilement de côté.
  function tableauPersonnes(liste, eq) {
    if (!liste.length) return '<p class="muted">Personne dans ce groupe.</p>';
    var html = '<div class="card"><table class="empile"><thead><tr><th>Personne</th><th>QCM</th><th>Moyenne</th><th>Dernier QCM</th></tr></thead><tbody>';
    liste.forEach(function (p) {
      var r = resumePersonne(eq.prog[p.user_id] || videStore());
      html += '<tr><td><a href="#/equipe/' + esc(p.user_id) + '">' + esc(p.email) + '</a>' +
        (p.role !== "agent" ? ' <span class="tag">' + esc(p.role) + '</span>' : '') +
        (estInactif(p) ? ' <span class="tag inactif">Inactif depuis plus de 2 ans</span>' : '') + '</td>' +
        '<td data-titre="QCM">' + r.nb + '</td>' +
        '<td data-titre="Moyenne">' + (r.nb ? '<strong class="' + classeNote(r.moy) + '">' + fmtNote(r.moy) + '</strong>' : '—') + '</td>' +
        '<td data-titre="Dernier QCM">' + (r.nb ? esc(r.der.titre) + ' · <span class="' + classeNote(r.der.note) + '">' + fmtNote(r.der.note) + '</span><br><small class="muted">' + fmtDate(r.der.date) + '</small>' : '—') + '</td></tr>';
    });
    return html + '</tbody></table></div>';
  }

  function pageEquipe(cible) {
    var s = lireSession(), encore = pageActuelle();
    if (!s || (s.role !== "admin" && s.role !== "formateur")) { location.hash = "#/compte"; return; }
    app.innerHTML = '<h1>Équipe</h1><p class="muted">Chargement…</p>';
    chargerEquipe(s).then(function (eq) {
      if (!encore()) return;   // l'élève est déjà sur une autre page
      if (cible) { afficherPersonne(eq, cible); return; }
      // Des changements ratés pendant que l'élève était parti (« Valider », puis une autre page) : ils reviennent.
      var r = equipeReprise;
      equipeReprise = null;
      afficherEquipe(eq, s, r && r.attente);
      if (r && equipe) { equipe.message = r.message; majAttente(); }
    }, function (e) {
      if (encore()) app.innerHTML = '<h1>Équipe</h1><p>Chargement impossible : ' + esc(raisonErreur(e)) + '.</p>';
    });
  }

  // ---------- Équipe : cocher, puis valider (admin) ----------
  // Les changements de l'admin (rôle, groupes, droits des parcours et des outils) restent en attente sur la page. Une
  // barre fixe en bas de l'écran les compte : « Valider » envoie tout (puis la page se recharge une fois), « Annuler »
  // remet tout comme avant, sans requête. Un changement : { type: "role", user_id, valeur } (le rôle choisi),
  // { type: "membre", groupe_id, user_id, valeur } ou { type: "acces", element, groupe_id, valeur } (vrai : case cochée).
  var equipe = null;   // la page Équipe de l'admin : { eq, s, attente: { clé: changement }, message, envoi }
  // L'élève a quitté la page pendant l'envoi et des changements ont raté : { attente, message }, repris à son retour.
  var equipeReprise = null;

  function nbAttente() { return equipe ? Object.keys(equipe.attente).length : 0; }
  function pluriel(n, un, plusieurs) { return n + " " + (n > 1 ? plusieurs : un); }
  function cleChangement(c) {
    return c.type === "role" ? "role|" + c.user_id : c.type === "membre" ? "membre|" + c.groupe_id + "|" + c.user_id :
      "acces|" + c.element + "|" + c.groupe_id;
  }
  // Ce que dit la base : un rôle, ou vrai / faux (dans le groupe, case de droit cochée).
  function valeurBase(eq, c) {
    if (c.type === "role") {
      var p = eq.profils.filter(function (x) { return x.user_id === c.user_id; })[0];
      return p ? p.role : "agent";
    }
    if (c.type === "membre") return eq.membres.some(function (m) { return m.groupe_id === c.groupe_id && m.user_id === c.user_id; });
    return eq.acces.some(function (a) { return a.element === c.element && a.groupe_id === c.groupe_id; });
  }
  // Ce que la page affiche : le changement en attente, sinon la base.
  function valeurVoulue(eq, c) {
    var a = equipe && equipe.attente[cleChangement(c)];
    return a ? a.valeur : valeurBase(eq, c);
  }
  // Le changement que porte une case (ou une liste de rôles), avec ce qu'elle montre.
  function changementDe(el) {
    var u = el.getAttribute("data-role");
    if (u !== null) return { type: "role", user_id: u, valeur: el.value };
    u = el.getAttribute("data-membre");
    if (u !== null) return { type: "membre", groupe_id: Number(el.value), user_id: u, valeur: el.checked };
    return { type: "acces", element: el.getAttribute("data-acces"), groupe_id: Number(el.value), valeur: el.checked };
  }
  function controlesEquipe() { return Array.prototype.slice.call(app.querySelectorAll("[data-role], [data-membre], [data-acces]")); }
  // Pour les messages : « julie@x.fr : groupe « Invité » ajouté », « Droit « SQL » : groupe « Invité » retiré ».
  function guillemets(t) { return "«\u00a0" + t + "\u00a0»"; }   // (espaces insécables : « et » restent collés au mot)
  function libelleChangement(eq, c) {
    var p = eq.profils.filter(function (x) { return x.user_id === c.user_id; })[0];
    if (c.type === "role") return (p ? p.email : c.user_id) + " : rôle " + guillemets(c.valeur);
    var g = eq.groupes.filter(function (x) { return x.id === c.groupe_id; })[0];
    var groupe = "groupe " + guillemets(g ? g.nom : c.groupe_id) + " " + (c.valeur ? "ajouté" : "retiré");
    if (c.type === "membre") return (p ? p.email : c.user_id) + " : " + groupe;
    var l = lignesParcours().concat(lignesOutils()).filter(function (x) { return x.id === c.element; })[0];
    return "Droit " + guillemets(l ? l.titre : c.element) + " : " + groupe;
  }
  // Rechargement impossible après « Valider » : on applique à la main ce qui est passé.
  function appliquerChangement(eq, c) {
    if (c.type === "role") { eq.profils.forEach(function (p) { if (p.user_id === c.user_id) p.role = c.valeur; }); return; }
    var k = c.type === "membre" ? "membres" : "acces";
    eq[k] = eq[k].filter(function (x) {
      return x.groupe_id !== c.groupe_id || (c.type === "membre" ? x.user_id !== c.user_id : x.element !== c.element);
    });
    if (c.valeur) eq[k].push(c.type === "membre" ? { groupe_id: c.groupe_id, user_id: c.user_id } : { element: c.element, groupe_id: c.groupe_id });
  }
  function texteQuitter() {
    var n = nbAttente();
    if (equipe && equipe.envoi) return "L'enregistrement n'est pas fini. Quitter la page quand même ?";
    return n > 1 ? n + " changements ne sont pas enregistrés. Quitter la page sans les enregistrer ?" :
      "1 changement n'est pas enregistré. Quitter la page sans l'enregistrer ?";
  }
  // Une erreur du serveur, en mots simples : jamais le message technique (en anglais), qui va dans la console.
  function raisonErreur(err) {
    try { console.warn("LearnSQL, erreur du serveur :", err && err.status, err && err.code, err && err.message); } catch (e) { /* ignoré */ }
    if (!err || !err.status) return "pas de connexion au serveur";
    if (err.status === 401 || err.status === 403) return "ta session a expiré, reconnecte-toi";
    if (err.code === "23503") return "le groupe ou le compte n'existe plus";
    return "le serveur a refusé";
  }
  // Un changement a sa case sur la page : son groupe, son compte et sa ligne de droits existent encore.
  function aSaCase(eq, c) {
    if (c.type !== "role" && !eq.groupes.some(function (g) { return g.id === c.groupe_id; })) return false;
    if (c.type !== "acces" && !eq.profils.some(function (p) { return p.user_id === c.user_id; })) return false;
    return c.type !== "acces" || lignesParcours().concat(lignesOutils()).some(function (l) { return l.id === c.element; });
  }
  // Le groupe ou le compte d'un changement a été supprimé ailleurs : la phrase, avec son nom (pris avant le rechargement).
  function disparu(eq, avant, c) {
    var x;
    if (c.type !== "role" && !eq.groupes.some(function (g) { return g.id === c.groupe_id; })) {
      x = avant.groupes.filter(function (g) { return g.id === c.groupe_id; })[0];
      return x ? "Le groupe " + guillemets(x.nom) + " n'existe plus" : "Un groupe n'existe plus";
    }
    if (c.type !== "acces" && !eq.profils.some(function (p) { return p.user_id === c.user_id; })) {
      x = avant.profils.filter(function (p) { return p.user_id === c.user_id; })[0];
      return x ? "Le compte " + x.email + " n'existe plus" : "Un compte n'existe plus";
    }
    return "";
  }
  // Le message après « Valider » (élève dyslexique) : une seule phrase en tête, puis la liste de ce qui a raté ; les
  // autres phrases (groupe disparu, rechargement) à part, après la liste.
  function messageValidation(total, rates, disparus, recharge) {
    var retires = 0, notes = Object.keys(disparus).map(function (k) {
      retires += disparus[k];
      return k + " : " + pluriel(disparus[k], "changement retiré.", "changements retirés.");
    });
    if (!recharge) notes.push("La page n'a pas pu se recharger : recharge-la plus tard.");
    if (rates.length) {
      return { genre: "ko", details: rates, notes: notes, texte: rates.length === total ?
        (total > 1 ? "Les " + total + " changements n'ont pas pu être enregistrés :" : "Le changement n'a pas pu être enregistré :") :
        rates.length + (rates.length > 1 ? " changements sur " + total + " n'ont pas pu être enregistrés :" : " changement sur " + total + " n'a pas pu être enregistré :") };
    }
    var faits = total - retires;
    return { genre: faits ? "ok" : "info", notes: notes,
      texte: faits ? pluriel(faits, "changement enregistré.", "changements enregistrés.") : "Rien n'a été enregistré." };
  }

  // Les lignes des grilles de droits : { id, titre, sous } (sous : en retrait, sous la ligne du dessus).
  function lignesParcours() {
    return noeuds().map(function (x) { return { id: x.n.id, titre: x.n.titre, sous: x.chaine.length > 1 }; });
  }
  // Droits des outils : la ligne « Outils » (toute la section), puis chaque sujet, puis ses outils.
  function lignesOutils() {
    var l = [{ id: "outils", titre: "Outils (toute la section)" }];
    (DATA.outilsSujets || []).forEach(function (s) {
      l.push({ id: s.id, titre: s.titre });
      outilsDuSujet(s).forEach(function (o) { if (o.id) l.push({ id: o.id, titre: o.titre, sous: true }); });
    });
    return l;
  }
  // Une grille de droits : une ligne par élément, une case par groupe (table « acces »).
  function grilleDroits(id, titre, aide, lignes, eq) {
    var html = '<h2>' + titre + '</h2><p class="muted">' + aide + '</p><div class="card" id="' + id + '"><table class="empile droits"><tbody>';
    lignes.forEach(function (x) {
      var reserve = false, cases = eq.groupes.map(function (g) {
        var coche = valeurVoulue(eq, { type: "acces", element: x.id, groupe_id: g.id });
        if (coche) reserve = true;
        return '<label class="case"><input type="checkbox" data-acces="' + esc(x.id) + '" value="' + g.id + '"' +
          (coche ? ' checked' : '') + '> ' + esc(g.nom) + '</label>';
      }).join('');
      html += '<tr><td>' + (x.sous ? '<span class="muted">↳ </span>' + esc(x.titre) : '<strong>' + esc(x.titre) + '</strong>') +
        '<br><small class="muted" data-etat="' + esc(x.id) + '">' + (reserve ? 'Réservé' : 'Ouvert à tous') + '</small></td>' +
        '<td>' + cases + '</td></tr>';
    });
    return html + '</tbody></table></div>';
  }
  // La barre des changements en attente : fixe en bas de l'écran, dès le 1er changement (ou pour un message).
  // En haut, le message (sa liste défile si elle est longue) ; en bas, le compte et les boutons, toujours visibles.
  function barreEquipe() {
    return '<div class="barre-attente" id="eq-barre" hidden><div class="barre-corps">' +
      '<div class="barre-msg" id="eq-msg" role="status"></div>' +
      '<div class="barre-ligne"><p class="barre-texte" id="eq-compte"></p>' +
      '<div class="barre-boutons" id="eq-boutons"><button type="button" class="btn" id="eq-valider">Valider</button>' +
      '<button type="button" class="btn ghost" id="eq-annuler">Annuler</button></div></div></div></div>';
  }
  // La barre ne cache jamais le bas de la page, ni la case qui a le focus (Tab) : la marge du bas et le
  // scroll-padding suivent sa hauteur, aussi quand la fenêtre change de taille ou tourne.
  function margeBarre() {
    var barre = document.getElementById("eq-barre"), h = equipe && barre && !barre.hidden ? barre.offsetHeight + 16 : 0;
    document.body.style.paddingBottom = h ? h + "px" : "";
    document.documentElement.style.scrollPaddingBottom = h ? h + "px" : "";
  }
  window.addEventListener("resize", margeBarre);

  // La page de l'admin : attente = les changements encore à valider (après un échec), sinon rien. Seuls restent ceux qui
  // ont leur case sur la page et changent encore quelque chose : le compteur de la barre = les cases marquées.
  function afficherEquipe(eq, s, attente) {
    var admin = s.role === "admin", garde = {};
    Object.keys(attente || {}).forEach(function (k) {
      var c = attente[k];
      if (aSaCase(eq, c) && valeurBase(eq, c) !== c.valeur) garde[k] = c;
    });
    equipe = admin ? { eq: eq, s: s, attente: garde, message: null, envoi: false } : null;
    var parId = {};
    eq.profils.forEach(function (p) { parId[p.user_id] = p; });
    var html = '<h1>Équipe</h1><p class="muted">' + (admin
      ? "Tu es admin : tu vois tout le monde et tu ranges les personnes dans les groupes."
      : "Tu es formateur : tu vois les personnes de tes groupes.") + '</p>';

    eq.groupes.forEach(function (g) {
      var liste = eq.membres.filter(function (m) { return m.groupe_id === g.id && parId[m.user_id]; })
        .map(function (m) { return parId[m.user_id]; });
      html += '<h2>' + esc(g.nom) + '</h2>' + tableauPersonnes(liste, eq);
    });
    if (!eq.groupes.length) html += '<p>Aucun groupe pour l\'instant.</p>';

    if (admin) {
      var rangees = {};
      eq.membres.forEach(function (m) { rangees[m.user_id] = true; });
      var seuls = eq.profils.filter(function (p) { return !rangees[p.user_id]; });
      if (seuls.length) html += '<h2>Sans groupe</h2>' + tableauPersonnes(seuls, eq);
      html += gestionAdmin(eq, s) + barreEquipe();
    }
    app.innerHTML = html;
    if (admin) {
      brancherGestion(s);
      majAttente();
    }
  }

  function gestionAdmin(eq, s) {
    var html = '<h2>Gérer</h2>' +
      '<form id="form-groupe" class="card form"><label for="nom-groupe">Nouveau groupe</label>' +
      '<input id="nom-groupe" required maxlength="60" placeholder="Ex. : Compta">' +
      '<div class="actions"><button type="submit" class="btn">Créer le groupe</button></div></form>' +
      '<p class="muted">Rôles, groupes et droits : coche, puis «&nbsp;Valider&nbsp;» en bas de l\'écran.</p>' +
      '<div class="card"><table class="empile"><thead><tr><th>Personne</th><th>Rôle</th><th>Groupes</th><th>Dernière activité</th></tr></thead><tbody>';
    eq.profils.forEach(function (p) {
      var role = valeurVoulue(eq, { type: "role", user_id: p.user_id });
      html += '<tr><td>' + esc(p.email) + '</td><td data-titre="Rôle"><select data-role="' + esc(p.user_id) + '" aria-label="Rôle de ' +
        esc(p.email) + '">' + ["agent", "formateur", "admin"].map(function (r) {
          return '<option' + (r === role ? ' selected' : '') + '>' + r + '</option>';
        }).join('') + '</select></td><td data-titre="Groupes">';
      eq.groupes.forEach(function (g) {
        var dedans = valeurVoulue(eq, { type: "membre", groupe_id: g.id, user_id: p.user_id });
        html += '<label class="case"><input type="checkbox" data-membre="' + esc(p.user_id) + '" value="' + g.id + '"' +
          (dedans ? ' checked' : '') + '> ' + esc(g.nom) + '</label>';
      });
      html += (eq.groupes.length ? '' : '<small class="muted">Crée d\'abord un groupe.</small>') + '</td>' +
        '<td data-titre="Dernière activité">' + (p.activite ? fmtDate(p.activite) : '—') +
        (estInactif(p) ? '<br><span class="tag inactif">Inactif + 2 ans</span>' : '') +
        (p.user_id !== s.id ? '<br><button type="button" class="lien danger" data-suppr-compte="' + esc(p.user_id) +
          '" data-email="' + esc(p.email) + '">Supprimer le compte</button>' : '') + '</td></tr>';
    });
    html += '</tbody></table></div><p id="msg-equipe" class="muted"></p>';
    html += grilleDroits("droits-parcours", "Droits des parcours", "Aucune case cochée = ouvert à tous les connectés. " +
      "Pour un sous-parcours, il faut aussi avoir accès au parcours au-dessus.", lignesParcours(), eq);
    // Sans compte : les sujets publics (outilsPublics), en entier.
    var publics = (DATA.outilsSujets || []).filter(function (x) { return (DATA.outilsPublics || []).indexOf(x.id) >= 0; })
      .map(function (x) { return "«&nbsp;" + esc(x.titre) + "&nbsp;»"; });
    html += grilleDroits("droits-outils", "Droits des outils", "Aucune case cochée = ouvert à tous les connectés. " +
      "Pour un outil, il faut aussi avoir accès à son sujet et à la ligne «&nbsp;Outils&nbsp;». " + (publics.length ?
        "Sans compte : seulement " + (publics.length > 1 ? "les sujets " : "le sujet ") + publics.join(", ") + ", en entier." :
        "Sans compte : aucun outil."), lignesOutils(), eq);
    if (eq.groupes.length) {
      html += '<p class="muted">Supprimer un groupe (les personnes restent, seul le groupe disparaît) :</p><div class="actions">' +
        eq.groupes.map(function (g) {
          return '<button type="button" class="btn small ghost" data-suppr="' + g.id + '">' + esc(g.nom) + ' ✕</button>';
        }).join('') + '</div>';
    }
    return html;
  }

  // Les marques des cases changées, « Réservé » / « Ouvert à tous » de chaque ligne de droits, et la barre.
  function majAttente() {
    var e = equipe;
    if (!e) return;
    var n = nbAttente(), reserve = {};
    controlesEquipe().forEach(function (el) {
      var c = changementDe(el);
      (el.type === "checkbox" ? el.parentNode : el).classList.toggle("change", !!e.attente[cleChangement(c)]);
      el.disabled = e.envoi;
      if (c.type === "acces") reserve[c.element] = reserve[c.element] || c.valeur;
    });
    Array.prototype.forEach.call(app.querySelectorAll("[data-etat]"), function (t) {
      t.textContent = reserve[t.getAttribute("data-etat")] ? "Réservé" : "Ouvert à tous";
    });
    var barre = document.getElementById("eq-barre"), m = e.message, zone = document.getElementById("eq-msg");
    if (!barre) return;
    barre.hidden = !n && !m;
    document.getElementById("eq-compte").textContent = e.envoi ? "Enregistrement…" :
      n ? pluriel(n, "changement", "changements") + " à enregistrer" : "";
    document.getElementById("eq-boutons").hidden = !n;
    document.getElementById("eq-valider").disabled = e.envoi;
    document.getElementById("eq-annuler").disabled = e.envoi;
    zone.className = "barre-msg" + (m ? " " + m.genre : "");
    zone.innerHTML = m ? '<p class="barre-tete">' + esc(m.texte) + '</p>' +
      (m.details && m.details.length ? '<ul>' + m.details.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>' : '') +
      (m.notes || []).map(function (t) { return '<p class="barre-note">' + esc(t) + '</p>'; }).join('') : '';
    margeBarre();
  }

  // Une case cochée ou décochée, un rôle choisi : en attente, rien n'est envoyé.
  function surChangement(el) {
    var e = equipe, c = changementDe(el), cle = cleChangement(c), base = valeurBase(e.eq, c);
    // Mon propre rôle : la question reste au moment du choix.
    if (c.type === "role" && c.user_id === e.s.id) {
      var avant = e.attente[cle] ? e.attente[cle].valeur : base;
      if (avant === "admin" && c.valeur !== "admin" && !confirm("Tu vas perdre tes droits d'admin. Continuer ?")) { el.value = avant; return; }
    }
    if (c.valeur === base) delete e.attente[cle];
    else e.attente[cle] = c;
    e.message = null;
    majAttente();
  }

  // « Annuler » : tout redevient comme dans la base, sans requête.
  function annulerEquipe() {
    var e = equipe;
    if (!e || e.envoi) return;
    e.attente = {};
    e.message = null;
    controlesEquipe().forEach(function (el) {
      var b = valeurBase(e.eq, changementDe(el));
      if (el.type === "checkbox") el.checked = b;
      else el.value = b;
    });
    majAttente();
  }

  // « Valider » : tout part ensemble (les ajouts en un seul envoi par table, avec un tableau), puis la page se
  // recharge UNE fois. Un lot d'ajouts refusé en entier (une ligne déjà là, un groupe supprimé ailleurs…) repart ligne
  // par ligne, pour que les bonnes passent ; une ligne déjà dans la base compte comme enregistrée. Ce qui a raté reste
  // en attente. Mon propre rôle part en dernier, et seulement si tout le reste est passé : sans les droits d'admin, la
  // base refuserait les autres envois.
  function validerEquipe() {
    var e = equipe;
    if (!e || e.envoi || !nbAttente()) return;
    var envois = [], ajouts = { membre: [], acces: [] }, moi = null, sv = null, encore = pageActuelle();
    function envoiRole(c) {
      return { changements: [c], methode: "PATCH", chemin: "profil?user_id=eq." + encodeURIComponent(c.user_id), corps: { role: c.valeur } };
    }
    function envoiAjouts(type, liste) {
      return { changements: liste, methode: "POST", chemin: type, corps: liste.map(function (c) {
        return type === "membre" ? { groupe_id: c.groupe_id, user_id: c.user_id } : { element: c.element, groupe_id: c.groupe_id };
      }) };
    }
    function envoyer(x) {
      return appelSupa("/rest/v1/" + x.chemin, { methode: x.methode, corps: x.corps, entetes: { Prefer: "return=minimal" } }, sv.access_token)
        .then(function () { x.ok = true; }, function (err) {
          if (err.code === "23505" && x.changements.length === 1) x.ok = true;   // la ligne est déjà dans la base : c'est fait
          else x.erreur = err;
        });
    }
    // Un lot refusé en entier : ses lignes repartent une par une.
    function envoyerLot(x) {
      return envoyer(x).then(function () {
        if (x.ok || x.methode !== "POST" || x.changements.length < 2) return;
        x.lignes = x.changements.map(function (c) { return envoiAjouts(x.chemin, [c]); });
        return Promise.all(x.lignes.map(envoyer));
      });
    }
    Object.keys(e.attente).forEach(function (k) {
      var c = e.attente[k];
      if (c.type === "role") { if (c.user_id === e.s.id) moi = c; else envois.push(envoiRole(c)); }
      else if (c.valeur) ajouts[c.type].push(c);
      else envois.push({ changements: [c], methode: "DELETE", chemin: c.type === "membre" ?
        "membre?groupe_id=eq." + c.groupe_id + "&user_id=eq." + encodeURIComponent(c.user_id) :
        "acces?element=eq." + encodeURIComponent(c.element) + "&groupe_id=eq." + c.groupe_id });
    });
    if (ajouts.membre.length) envois.push(envoiAjouts("membre", ajouts.membre));
    if (ajouts.acces.length) envois.push(envoiAjouts("acces", ajouts.acces));
    e.envoi = true;
    e.message = null;
    majAttente();
    sessionValide().then(function (s) {
      if (!s) { var x = new Error("pas de session"); x.status = 401; throw x; }
      sv = s;
    }).then(function () {
      return Promise.all(envois.map(envoyerLot)).then(function () {
        envois = [].concat.apply([], envois.map(function (x) { return x.lignes || [x]; }));
        if (!moi) return;
        var x = envoiRole(moi);
        envois.push(x);
        if (envois.some(function (y) { return y !== x && !y.ok; })) { x.raison = "pas encore envoyé : il part après les autres"; return; }
        return envoyer(x).then(function () {
          var cur = lireSession();   // le menu et la page le savent tout de suite (le reste des droits suit, par la synchro)
          if (x.ok && cur) { cur.role = moi.valeur; ecrireSession(cur); majNav(); }
        });
      }).then(function () {
        return chargerEquipe(sv).then(null, function (err) { raisonErreur(err); return null; });
      }).then(function (eq) { finirValidation(e, envois, eq, encore); });
    }, function (err) {
      // Pas de session valide : rien n'est parti.
      e.envoi = false;
      e.message = { genre: "ko", texte: "Rien n'a été envoyé : " + (err.status === 400 || err.status === 401 ?
        "ta session a expiré, reconnecte-toi." : raisonErreur(err) + ".") };
      majNav();
      if (equipe === e) majAttente();
    });
  }

  // Après « Valider » : chaque changement est fait, raté (il reste à valider) ou retiré (son groupe ou son compte n'existe
  // plus). La page est refaite au même endroit, avec le message. Si l'élève est parti pendant l'envoi, ce qui a raté
  // n'est pas perdu : un message le dit, et la page Équipe le reprend à son retour.
  function finirValidation(e, envois, eq, encore) {
    var total = 0, rates = [], disparus = {}, reste = {}, recharge = !!eq, avant = e.eq;
    if (!eq) {   // rechargement impossible : on applique à la main ce qui est passé
      eq = avant;
      envois.forEach(function (x) { if (x.ok) x.changements.forEach(function (c) { appliquerChangement(eq, c); }); });
    }
    envois.forEach(function (x) {
      x.changements.forEach(function (c) {
        total++;
        if (x.ok) return;
        var parti = recharge ? disparu(eq, avant, c) : "";
        if (parti) { disparus[parti] = (disparus[parti] || 0) + 1; return; }
        if (valeurBase(eq, c) === c.valeur) return;   // la base a déjà cette valeur (faite ailleurs) : c'est fait
        rates.push(libelleChangement(eq, c) + " (" + (x.raison || raisonErreur(x.erreur)) + ")");
        reste[cleChangement(c)] = c;
      });
    });
    var message = messageValidation(total, rates, disparus, recharge);
    if (equipe !== e) {   // l'élève a quitté la page pendant l'envoi
      if (!rates.length && !Object.keys(disparus).length) return;
      if (rates.length) equipeReprise = { attente: reste, message: message };
      if (location.hash === "#/equipe" && equipe && !nbAttente() && !equipe.envoi) { pageEquipe(); return; }   // déjà revenu
      var dits = [message.texte.replace(/ :$/, ".")].concat(message.notes.slice(0, Object.keys(disparus).length));
      alert("Page Équipe : " + dits.join(" ") + (rates.length ? " Ouvre la page Équipe pour les revoir." : ""));
      return;
    }
    var s = lireSession();
    if (!s || s.role !== "admin") {   // je ne suis plus admin : la session recharge mes droits (groupes, acces), puis la page
      equipe = null;
      margeBarre();
      synchroniser().then(function () { majNav(); if (encore()) pageEquipe(); });
      return;
    }
    var y = window.pageYOffset;
    afficherEquipe(eq, s, reste);
    equipe.message = message;
    majAttente();
    window.scrollTo(0, y);
  }

  // Créer ou supprimer un groupe, supprimer un compte : tout de suite (avec confirmation), mais pas avec des
  // changements en attente : d'abord « Valider » ou « Annuler ».
  function attenteBloque() {
    if (!nbAttente()) return false;
    equipe.message = { genre: "info", texte: equipe.envoi ? "Attends la fin de l'enregistrement." : "D'abord, valide ou annule tes changements." };
    majAttente();
    return true;
  }

  function brancherGestion(s) {
    var msg = document.getElementById("msg-equipe");
    // Une action immédiate, puis la page se recharge, si l'élève est encore dessus. Une erreur : en mots simples.
    function ecrireBase(chemin, methode, corps) {
      var encore = pageActuelle();
      msg.textContent = "Enregistrement…";
      return appelSupa("/rest/v1/" + chemin, {
        methode: methode, corps: corps, entetes: { Prefer: "return=minimal" }
      }, s.access_token).then(function () { if (encore()) pageEquipe(); }, function (e) {
        msg.textContent = e.code === "23505" && chemin === "groupe" ? "Ce groupe existe déjà." : "Impossible : " + raisonErreur(e) + ".";
      });
    }
    document.getElementById("form-groupe").addEventListener("submit", function (e) {
      e.preventDefault();
      if (attenteBloque()) return;
      var nom = document.getElementById("nom-groupe").value.trim();
      if (nom) ecrireBase("groupe", "POST", { nom: nom });
    });
    controlesEquipe().forEach(function (el) {
      el.addEventListener("change", function () { surChangement(el); });
    });
    app.querySelectorAll("[data-suppr-compte]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (attenteBloque()) return;
        var email = b.getAttribute("data-email");
        if (prompt("Supprimer définitivement le compte " + email + " ?\nTape son adresse e-mail pour confirmer.") !== email) return;
        msg.textContent = "Suppression…";
        var encore = pageActuelle();
        appelSupa("/rest/v1/rpc/supprimer_compte", { methode: "POST", corps: { cible: b.getAttribute("data-suppr-compte") } }, s.access_token)
          .then(function () { if (encore()) pageEquipe(); }, function (e) { msg.textContent = "Impossible : " + raisonErreur(e) + "."; });
      });
    });
    app.querySelectorAll("[data-suppr]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (attenteBloque()) return;
        if (confirm("Supprimer ce groupe ?")) ecrireBase("groupe?id=eq." + b.getAttribute("data-suppr"), "DELETE");
      });
    });
    surClic("eq-valider", validerEquipe);
    surClic("eq-annuler", annulerEquipe);
  }

  function afficherPersonne(eq, id) {
    var p = eq.profils.filter(function (x) { return x.user_id === id; })[0];
    if (!p) { app.innerHTML = '<h1>Équipe</h1><p>Personne introuvable.</p><a class="btn ghost" href="#/equipe">Retour</a>'; return; }
    var store = eq.prog[id] || videStore();
    var html = '<h1 class="personne-titre">' + esc(p.email) + '</h1>';
    var r = resumePersonne(store);
    if (!r.nb) {
      app.innerHTML = html + '<p>Pas encore de QCM.</p><a class="btn ghost" href="#/equipe">Retour</a>';
      return;
    }
    html += '<p>Moyenne : <strong class="' + classeNote(r.moy) + '">' + fmtNote(r.moy) + '</strong> sur ' + r.nb +
      ' QCM · ' + idsEnErreur(store).length + ' question(s) à revoir.</p>' +
      '<h2>Par module</h2><div class="card"><table class="empile"><thead><tr><th>Module</th><th>Essais</th><th>Meilleure</th><th>Dernière</th></tr></thead><tbody>';
    DATA.modules.forEach(function (m, i) {
      var st = statsModule(store, m.id);
      if (st) html += '<tr><td>' + (i + 1) + '. ' + esc(m.titre) + '</td><td data-titre="Essais">' + st.nb + '</td>' +
        '<td data-titre="Meilleure" class="' + classeNote(st.meilleure) + '"><strong>' + fmtNote(st.meilleure) + '</strong></td>' +
        '<td data-titre="Dernière" class="' + classeNote(st.derniere) + '">' + fmtNote(st.derniere) + '</td></tr>';
    });
    html += '</tbody></table></div><h2>Tous les QCM</h2><div class="card"><table class="empile"><thead><tr><th>Date</th><th>QCM</th><th>Note</th></tr></thead><tbody>';
    store.tentatives.slice().reverse().forEach(function (t) {
      html += '<tr><td>' + fmtDate(t.date) + '</td><td data-titre="QCM">' + esc(t.titre) + '</td>' +
        '<td data-titre="Note" class="' + classeNote(t.note) + '"><strong>' + fmtNote(t.note) + '</strong></td></tr>';
    });
    app.innerHTML = html + '</tbody></table></div><div class="actions"><a class="btn ghost" href="#/equipe">Retour à l\'équipe</a></div>';
  }

  // ---------- Mentions légales et confidentialité (texte dans data/legal.js) ----------
  function pageLegale(titre, contenu) {
    var L = DATA.legal || {};
    app.innerHTML = '<h1>' + titre + '</h1>' + (L[contenu] || '<p>Page indisponible.</p>') +
      '<p class="muted">Mise à jour : ' + esc(L.maj || '') + '.</p>' +
      '<div class="actions"><a class="btn ghost" href="#/">Retour</a></div>';
  }

  // ---------- Thème ----------
  function appliquerTheme(t) {
    if (t) document.documentElement.setAttribute("data-theme", t);
    else document.documentElement.removeAttribute("data-theme");
  }
  try { appliquerTheme(localStorage.getItem("learnsql-theme")); } catch (e) { /* ignoré */ }
  document.getElementById("btn-theme").addEventListener("click", function () {
    var sombre = document.documentElement.getAttribute("data-theme") === "dark" ||
      (!document.documentElement.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
    var t = sombre ? "light" : "dark";
    appliquerTheme(t);
    try { localStorage.setItem("learnsql-theme", t); } catch (e) { /* ignoré */ }
  });

  // ---------- Super dico SQL (docs/dico.md) ----------
  // Recherche sans IA, dans le navigateur : mots vides retirés, racines, fautes tolérées (distance d'édition,
  // squelette de consonnes). Ouvert à tous, sans compte.
  // Deux onglets : « SQL » (fiches sans domaine) et « Divalto » (domaine: "divalto"), ce dernier seulement pour les
  // comptes qui ont le parcours Divalto (masquage d'écran). La recherche ne cherche que dans l'onglet choisi.
  var DICO_MOTEUR_KEY = "learnsql-dico-moteur";
  var DICO_DOMAINE_KEY = "learnsql-dico-domaine";
  var DICO_MOTEURS = [
    { id: "tous", nom: "Tous" },
    { id: "sqlserver", nom: "SQL Server" },
    { id: "snowflake", nom: "Snowflake" },
    { id: "mysql", nom: "MySQL" }
  ];
  var DICO_DOMAINES = [{ id: "sql", nom: "SQL" }, { id: "divalto", nom: "Divalto" }];
  // Les thèmes du dico Divalto, dans cet ordre (le dico SQL range les siens par ordre alphabétique).
  var DICO_CATEGORIES_DIVALTO = ["Tables Divalto", "Champs Divalto", "Vues Divalto", "Requêtes Dataviz"];
  // La catégorie « Types de données » et les familles de la page « Tous les types de données » (#/types), dans l'ordre
  // d'affichage (docs/dico.md). Une fiche SQL qui a une famille est une ligne du tableau de sa famille (cellules : apercu).
  // Même liste dans outils/verifier.js.
  var DICO_CATEGORIE_TYPES = "Types de données";
  var DICO_FAMILLES = ["Entiers", "Décimaux exacts", "Nombres approchés", "Booléens", "Textes", "Binaires",
    "Listes de valeurs", "Dates et heures", "Semi-structurés", "Autres types", "Modifier un type", "Convertir un type"];
  var DICO_MOTS_VIDES = {};
  ("je j tu il elle on nous vous veux voudrais voudrai aimerais aimerai faire fait faut peux peut dois doit comment " +
   "quel quelle quels quelles est c ce cet cette ces que qu qui quoi un une des du de d la le les l au aux a et ou " +
   "sur dans pour par avec sans mon ma mes ton ta tes son sa ses en y ne pas sql requete requetes fonction fonctions " +
   "comme moi me te se ca cela ceci svp stp").split(" ").forEach(function (m) { DICO_MOTS_VIDES[m] = true; });
  var DICO_SUFFIXES = ["ement", "ation", "able", "euse", "eur", "ent", "ez", "er", "ir", "e"];
  var DICO_SEUIL = 25;      // une fiche sous ce score ne s'affiche que si aucune ne l'atteint
  // Réglages de la recherche, par onglet. Le dico SQL garde la recherche d'origine : aucun réglage. Le dico Divalto :
  // - champ : un champ de la fiche (« PINO » → les tables qui l'ont), moins fort que le nom de la fiche. Seulement un
  //   code : pas un mot courant (« référence »), sauf le nom d'une table ou d'un champ tapé seul (« SENS ») ;
  // - motCourant : un mot est courant s'il est le mot-clé d'au moins 3 fiches (dico SQL : d'une seule) ;
  // - nomCourant : un mot courant présent dans le nom de plus de 2 fiches (« commande ») ; dico SQL : 15 ;
  // - motCleEntier, typeSeul : un mot tapé seul donne d'abord la fiche dont c'est un mot-clé entier (« commande » pour
  //   ENT), et la table avant le champ, avant les vues et les requêtes Dataviz ;
  // - nomProche, cleProche : toute la question est un nom (« fiche fourniseur ») ou un mot-clé de plusieurs mots
  //   (« lignes de comande ») de la fiche, à une faute près (deux lettres inversées comptent pour une) ;
  // - ordreTypes : à score égal, la table, puis le champ, la vue, la requête.
  // Les Astuces SQL (« astuces », docs/astuces.md) passent par la même recherche, sur DATA.astuces (textesRecherche) : une
  // astuce n'a pas de nom ; ses mots-clés sont les siens et les fonctions de ses solutions (`LPAD`, `RIGHT`…) ; le texte
  // de ses solutions et sa famille comptent comme une définition. En plus :
  // - besoin : la phrase de l'élève comparée à chaque besoin de l'astuce (et à son titre) ; le plus proche donne jusqu'à
  //   ces points (tous les mots en commun : tous les points, voir ressemblance) ;
  // - besoinTel : un besoin (ou le titre) tapé tel quel, aux accents, majuscules et signes près (comme un nom du dico) ;
  // - motsVides : des mots en plus, vides dans une phrase de besoin (« j'aimerais bien sortir un numéro client ») ;
  // - debut : un mot dont la racine commence par celle d'un mot-clé ou d'un besoin (ou l'inverse), à partir de ces
  //   lettres, est proche (« meilleures » → meilleur, « meilleurs » → meill : les racines du féminin en -eure).
  // Les Conseils d'architecte (« architecte », docs/architecte.md) : la même recherche que les astuces, sur
  // DATA.architecte. Une situation n'a pas de nom ; ses mots-clés sont les siens ; sa famille, son résumé et ses questions
  // (q) comptent comme une définition. Mêmes réglages que les astuces, avec ses propres mots vides : ceux d'une phrase de
  // situation (« quelles questions me poser », « les bonnes pratiques ») ; pas « mettre » ni « donner », qui comptent ici
  // (« je mets à jour », « je donne des droits »), ni « bon » (« bon de commande »).
  var DICO_REGLAGES = {
    sql: {},
    divalto: {
      champ: 60, motCourant: 3, nomCourant: 0, motCleEntier: 30, typeSeul: { table: 15, champ: 5 },
      nomProche: 300, cleProche: 60, ordreTypes: ["table", "champ", "vue", "requête"]
    },
    astuces: {
      besoin: 300, besoinTel: 1000, debut: 5,
      motsVides: ensembleMots("bien besoin aimer souhaite souhaiterais souhaiterait aimerait voudrait astuce astuces truc " +
        "trucs facon maniere moyen avoir obtenir sortir afficher donner mettre")
    },
    architecte: {
      besoin: 300, besoinTel: 1000, debut: 5,
      motsVides: ensembleMots("bien bonne bonnes besoin aimer souhaite souhaiterais aimerait voudrait conseil conseils " +
        "architecte question questions poser pose demander quand avant")
    }
  };
  function ensembleMots(t) { var e = {}; t.split(" ").forEach(function (m) { e[m] = true; }); return e; }
  // La racine a commence-t-elle par la racine b, ou l'inverse, la plus courte ayant au moins n lettres (n : 0 = jamais) ?
  function debutCommun(a, b, n) {
    if (!(n > 0)) return false;
    var court = a.length <= b.length ? a : b, long = court === a ? b : a;
    return court.length >= n && long.indexOf(court) === 0;
  }
  // Un index par domaine (« sql », « divalto », « astuces », « architecte ») : ils ne se mêlent pas. Chacun : { taille,
  // liste, connus, freq, codes } ; connus = les racines de tous ses mots-clés (un mot connu, « valeurs », n'est pas un nom
  // mal tapé, « values ») ; freq = combien de fiches ont chaque racine ; codes = les mots des noms de ses tables et champs
  // (« pino »).
  var dicoIndex = {};
  var dicoQuestion = "";   // la dernière recherche, gardée quand on ouvre une fiche (et quand on change d'onglet)

  function sansAccents(t) {
    t = String(t).toLowerCase().replace(/œ/g, "oe").replace(/æ/g, "ae");
    return t.normalize ? t.normalize("NFD").replace(/[̀-ͯ]/g, "") : t;
  }
  function motsDe(t) { return sansAccents(t).split(/[^a-z0-9]+/).filter(Boolean); }
  function racine(m) {
    if (m.length <= 4) return m;
    if (/[sx]$/.test(m)) m = m.slice(0, -1);                  // le pluriel d'abord : doublons → doublon
    for (var i = 0; i < DICO_SUFFIXES.length; i++) {
      var x = DICO_SUFFIXES[i];
      if (m.length - x.length >= 4 && m.slice(-x.length) === x) return m.slice(0, -x.length);
    }
    return m;
  }
  // Le mot au singulier, sans couper plus loin (« commandes » → « commande », mais « facturation » reste lui-même).
  function singulier(t) { var m = motsDe(t).join(" "); return m.length > 3 ? m.replace(/[sx]$/, "") : m; }
  function squelette(m) { return m.replace(/[aeiouy]/g, "").replace(/(.)\1+/g, "$1"); }
  // Distance d'édition (Levenshtein), arrêtée dès qu'elle dépasse max. echange : deux lettres voisines inversées
  // (« clinet ») ne comptent que pour une faute.
  function distance(a, b, max, echange) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    var avant = null, prec = [], cour, i, j;
    for (j = 0; j <= b.length; j++) prec[j] = j;
    for (i = 1; i <= a.length; i++) {
      cour = [i];
      var mini = i;
      for (j = 1; j <= b.length; j++) {
        cour[j] = Math.min(prec[j] + 1, cour[j - 1] + 1, prec[j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1));
        if (echange && i > 1 && j > 1 && a.charAt(i - 1) === b.charAt(j - 2) && a.charAt(i - 2) === b.charAt(j - 1)) {
          cour[j] = Math.min(cour[j], avant[j - 2] + 1);
        }
        if (cour[j] < mini) mini = cour[j];
      }
      if (mini > max) return max + 1;
      avant = prec;
      prec = cour;
    }
    return prec[b.length];
  }

  // Le domaine d'une fiche : « divalto », ou « sql » (pas de domaine).
  function domaineFiche(f) { return f.domaine === "divalto" ? "divalto" : "sql"; }
  // Le nom d'un champ, pour la recherche (« ART.REF » → « art ref ») ; vide s'il n'a que des mots vides ou des nombres.
  function cleChamp(nom) {
    var mots = motsDe(nom || "");
    return mots.some(function (m) { return !DICO_MOTS_VIDES[m] && !/^\d+$/.test(m); }) ? mots.join(" ") : "";
  }
  // Une case « Champ » peut en grouper plusieurs : « REF / SREF1 / SREF2 », « CE7 à CEA », « AXE (1 à 4) ».
  function codesCase(nom) {
    return String(nom || "").replace(/\([^)]*\)/g, " ").split(/\/|\s+à\s+/).map(cleChamp).filter(Boolean);
  }
  function nomsChamps(f) {
    var vus = {};
    (f.champs || []).forEach(function (c) { if (Array.isArray(c)) codesCase(c[0]).forEach(function (k) { vus[k] = true; }); });
    return Object.keys(vus);
  }

  // Ce que la recherche lit d'une fiche du dico, d'une astuce (domaine « astuces ») ou d'une situation (« architecte ») :
  // ses noms, ses mots-clés, le texte de sa définition (des mots à 8 points), sa famille (un type de donnée, une astuce,
  // une situation : ses mots comptent comme ceux de la définition, et la famille entière comme une expression) et ses
  // besoins (les astuces et les situations seulement ; le titre compte comme un besoin).
  function textesRecherche(f, domaine) {
    if (domaine === "architecte") {
      var qs = [];
      (f.etapes || []).forEach(function (e) {
        ((e && e.questions) || []).forEach(function (x) { if (x && x.q) qs.push(x.q); });
      });
      return { noms: [], motsCles: f.motsCles || [], famille: f.famille || "", besoins: [f.titre || ""].concat(f.besoins || []),
        def: (f.famille || "") + " " + (f.resume || "") + " " + qs.join(" ") };
    }
    if (domaine !== "astuces") {
      return { noms: [f.nom].concat(f.noms || []), motsCles: f.motsCles || [], famille: f.famille || "", besoins: [],
        def: (f.definition || "") + " " + (f.categorie || "") + " " + (f.famille || "") };
    }
    var m = f.moteurs || {}, solutions = [m.sqlserver, m.snowflake, m.mysql].join(" ");
    return { noms: [], motsCles: (f.motsCles || []).concat(fonctionsCode(solutions)), famille: f.famille || "",
      besoins: [f.titre || ""].concat(f.besoins || []), def: (f.famille || "") + " " + solutions };
  }
  // Les fonctions et mots du code d'une solution (entre accents graves, hors des 'textes') : `LPAD(id, 6, '0')` → LPAD.
  // Seulement les mots en majuscules, sauf ceux de la grammaire d'une requête (AS, AND, NULL, SELECT…).
  var CODE_GRAMMAIRE = ensembleMots("AS AND OR NOT IS NULL IN ON BY THEN WHEN ELSE END SELECT FROM WHERE");
  function fonctionsCode(t) {
    var vus = {};
    (String(t || "").match(/`[^`]*`/g) || []).forEach(function (code) {
      (code.replace(/'[^']*'/g, " ").match(/\b[A-Z][A-Z0-9_]+\b/g) || []).forEach(function (w) {
        if (!CODE_GRAMMAIRE[w]) vus[w] = true;
      });
    });
    return Object.keys(vus);
  }
  // Les racines d'une phrase de besoin (ou de la question), sans les mots vides, chacune une fois, et leurs squelettes.
  function racinesPhrase(t, vides) {
    var vues = {};
    motsDe(t).forEach(function (m) { if (!DICO_MOTS_VIDES[m] && !vides[m]) vues[racine(m)] = true; });
    var r = Object.keys(vues);
    return { r: r, sq: r.map(squelette) };
  }

  // L'index d'un domaine (« sql » par défaut, « divalto », « astuces » ou « architecte ») : seulement ses fiches (ou les
  // astuces, ou les situations). Refait quand des fiches sont ajoutées.
  function indexDico(domaine) {
    domaine = domaine || "sql";
    var vides = (DICO_REGLAGES[domaine] || DICO_REGLAGES.sql).motsVides || {};
    var utile = function (m) { return !DICO_MOTS_VIDES[m] && !vides[m]; };
    var aPart = domaine === "astuces" || domaine === "architecte";   // une liste à part, pas des fiches du dico
    var toutes = (aPart ? DATA[domaine] : DATA.dico) || [];
    if (dicoIndex[domaine] && dicoIndex[domaine].taille === toutes.length) return dicoIndex[domaine].liste;
    var liste = toutes.filter(function (f) { return aPart ? !!f : domaineFiche(f) === domaine; }).map(function (f) {
      var t = textesRecherche(f, domaine), noms = t.noms;
      var cles = {}, def = {}, motsNoms = {}, entiers = {};
      var expressions = [], phrasesCles = [], clesLongues = [];
      t.motsCles.forEach(function (k) {
        var tous = motsDe(k);
        if (tous.length >= 2) { phrasesCles.push(" " + tous.join(" ") + " "); clesLongues.push(tous.join(" ")); }
        var r = motsDe(k).filter(utile).map(racine);
        r.forEach(function (m) { cles[m] = true; });
        if (r.length >= 2) expressions.push(r);
        if (r.length === 1) entiers[singulier(k)] = true;   // un mot-clé d'un seul mot (« commandes » → « commande »)
      });
      // La famille entière (« Dates et heures ») : une expression, sans devenir un mot-clé (les poids des autres fiches
      // ne changent pas).
      var famille = motsDe(t.famille), rf = famille.filter(utile).map(racine);
      if (famille.length >= 2) phrasesCles.push(" " + famille.join(" ") + " ");
      if (rf.length >= 2) expressions.push(rf);
      motsDe(t.def).forEach(function (m) {
        if (m.length > 3 && utile(m)) def[racine(m)] = true;
      });
      noms.forEach(function (n, i) {
        if (i === 0 || n === n.toUpperCase()) motsDe(n).forEach(function (m) { motsNoms[m] = true; });
      });
      var listeCles = Object.keys(cles);
      return {
        fiche: f,
        brut: noms.map(function (n) { return sansAccents(n).replace(/\s+/g, " ").trim(); }),
        phrases: noms.map(function (n) { return motsDe(n).join(" "); }).filter(Boolean),
        motsNoms: Object.keys(motsNoms),
        cles: listeCles,
        squelettes: listeCles.map(squelette),
        expressions: expressions,
        phrasesCles: phrasesCles,
        def: def,
        entiers: entiers,
        clesLongues: clesLongues,
        champs: domaine === "divalto" ? nomsChamps(f) : [],
        besoins: t.besoins.map(function (b) { return racinesPhrase(b, vides); }).filter(function (b) { return b.r.length; }),
        tels: t.besoins.map(function (b) { return motsDe(b).join(" "); })   // chaque besoin tel quel (« numero client … »)
      };
    });
    // Un mot-clé rare (« aujourd ») compte plus qu'un mot-clé que beaucoup de fiches partagent (« date »).
    var freq = {}, connus = {}, codes = {};
    liste.forEach(function (x) { x.cles.forEach(function (k) { freq[k] = (freq[k] || 0) + 1; connus[k] = true; }); });
    liste.forEach(function (x) {
      x.poids = x.cles.map(function (k) { var n = freq[k]; return n <= 2 ? 45 : n <= 5 ? 40 : n <= 10 ? 32 : 25; });
      if (x.fiche.type === "table" || x.fiche.type === "champ") x.motsNoms.forEach(function (m) { codes[m] = true; });
    });
    dicoIndex[domaine] = { taille: toutes.length, liste: liste, connus: connus, freq: freq, codes: codes };
    return liste;
  }

  // Le mot m désigne-t-il le nom de la fiche ? Le nom exact, son début (« coal »), ou une faute (« coalese »).
  function bonusNom(m, x, seul, connus) {
    var b = 0;
    x.motsNoms.forEach(function (n) {
      if (n === m || ((m.length >= 4 || (seul && m.length === 3)) && n.indexOf(m) === 0)) b = Math.max(b, 120);
      else if (m.length >= 5 && !connus[racine(m)] && distance(m, n, 2) <= (m.length >= 7 ? 2 : 1)) b = Math.max(b, 100);
    });
    return b;
  }

  // La ressemblance de la question q avec le plus proche des besoins (racinesPhrase), de 0 à 1 : la part des mots en
  // commun, 2 × communs / (mots de la question + mots du besoin) (coefficient de Dice : 1 = les mêmes mots), au carré :
  // un seul mot en commun compte peu (les mots-clés s'en chargent), une phrase presque pareille compte beaucoup. Un mot
  // est en commun s'il est le même, à une faute près (deux à partir de 7 lettres ; aucune sous 5 : « fois » n'est pas
  // « mois »), s'il a le même début (debut lettres au moins, voir DICO_REGLAGES.astuces), ou le même squelette de consonnes
  // avec à peu près la même longueur (« carreceete » est « caractère », « dédoublonner » n'est pas « booléen »).
  function ressemblance(q, besoins, debut) {
    var mieux = 0;
    if (!q.r.length) return 0;
    besoins.forEach(function (b) {
      var communs = q.r.filter(function (r, j) {
        var tol = r.length >= 7 ? 2 : (r.length >= 5 ? 1 : 0);
        return b.r.some(function (k, i) {
          return k === r || (tol > 0 && distance(r, k, tol) <= tol) || debutCommun(r, k, debut) ||
            (q.sq[j].length >= 4 && Math.abs(r.length - k.length) <= 2 && distance(q.sq[j], b.sq[i], 1) <= 1);
        });
      }).length;
      var dice = Math.min(1, 2 * communs / (q.r.length + b.r.length));   // (au plus 1 : « zeros zeors » vise un seul mot)
      mieux = Math.max(mieux, dice * dice);
    });
    return mieux;
  }

  // Note chaque fiche du domaine (« sql » par défaut ; « astuces » : chaque astuce ; « architecte » : chaque situation)
  // pour la question ; renvoie [{ fiche, score }] (fiche : la fiche, l'astuce ou la situation), du plus proche au moins proche.
  function chercherDico(question, domaine) {
    domaine = domaine || "sql";
    var reg = DICO_REGLAGES[domaine] || DICO_REGLAGES.sql, vides = reg.motsVides || {};
    var brut = sansAccents(question).replace(/\s+/g, " ").trim();
    if (!brut) return [];
    var mots = motsDe(brut);
    var phrase = " " + mots.join(" ") + " ";
    var utiles = mots.filter(function (m) { return !DICO_MOTS_VIDES[m] && !vides[m]; });
    if (!utiles.length) utiles = mots;
    var demande = reg.besoin ? racinesPhrase(brut, vides) : null;   // astuces : la question, à comparer aux besoins
    var racines = {};
    utiles.forEach(function (m) { racines[racine(m)] = true; });
    var index = indexDico(domaine), info = dicoIndex[domaine], connus = info.connus;
    // Un mot qui touche le nom de beaucoup de fiches (« date ») ne départage rien : petit bonus.
    var combien = {};
    var seul = utiles.length === 1;   // un seul mot : « coa » peut être le début d'un nom
    // Un mot courant : un mot-clé (dico SQL), ou le mot-clé d'au moins reg.motCourant fiches (dico Divalto).
    var courant = function (m) {
      var k = racine(m);
      return reg.motCourant ? (info.freq[k] || 0) >= reg.motCourant : !!connus[k];
    };
    // Divalto : un mot inconnu fait penser à une faute ; la question entière est-elle alors proche du texte p ?
    var texte = mots.join(" "), faute = utiles.some(function (m) { return !connus[racine(m)]; });
    var proche = function (p) {
      var tol = p.length >= 7 ? 2 : 1;
      return p.length >= 5 && p !== texte && distance(texte, p, tol, true) <= tol;
    };
    utiles.forEach(function (m) { combien[m] = index.filter(function (x) { return bonusNom(m, x, seul, connus) > 0; }).length; });
    return index.map(function (x) {
      var score = 0;
      if (x.brut.indexOf(brut) >= 0) score += 1000;                       // le nom tapé tel quel (%, ||, ::…)
      x.phrases.forEach(function (p) {                                     // un nom présent dans la question
        if (phrase.indexOf(" " + p + " ") < 0) return;
        // Un nom d'un seul mot qui est aussi un mot courant (« date », « case ») ne compte fort que tapé seul.
        if (p.indexOf(" ") < 0 && utiles.length > 1 && connus[racine(p)]) score += 40;
        else score += 400 + p.length;
      });
      // Divalto : toute la question est un nom de la fiche (« fiche fourniseur »), ou un de ses mots-clés de plusieurs
      // mots (« lignes de comande »), à une faute près.
      if (reg.nomProche && faute) {
        if (x.phrases.some(proche)) score += reg.nomProche;
        else if (x.clesLongues.some(proche)) score += reg.cleProche;
      }
      // Divalto : un champ de la fiche (« PINO » → les tables qui ont ce champ), s'il est un code : un nom de plusieurs
      // mots, un mot absent des mots-clés, ou le nom d'une table ou d'un champ tapé seul. Deux champs au plus.
      if (reg.champ && x.champs.length) {
        var nbChamps = x.champs.filter(function (c) {
          return phrase.indexOf(" " + c + " ") >= 0 && (c.indexOf(" ") >= 0 || !connus[racine(c)] || (seul && info.codes[c]));
        }).length;
        score += Math.min(nbChamps, 2) * reg.champ;
      }
      utiles.forEach(function (m) {
        var b = bonusNom(m, x, seul, connus);
        // Fort si le mot désigne peu de fiches et n'est pas un mot courant noyé dans une phrase (« case vide »).
        if (b) score += combien[m] <= 2 && (seul || !courant(m)) ? b :
          combien[m] > 2 && reg.nomCourant !== undefined ? reg.nomCourant : 15;
        var r = racine(m), meilleur = 0;
        var tol = r.length >= 7 ? 2 : (r.length >= 4 ? 1 : 0), sq = squelette(r);
        for (var i = 0; i < x.cles.length; i++) {
          var k = x.cles[i];
          if (k === r) meilleur = Math.max(meilleur, x.poids[i] + (i === 0 ? 3 : i <= 2 ? 2 : i <= 5 ? 1 : 0)); // exact (les premiers mots-clés d'une fiche comptent un peu plus)
          else if (tol && distance(r, k, tol) <= tol) meilleur = Math.max(meilleur, 25);    // une faute ou deux
          else if (debutCommun(r, k, reg.debut)) meilleur = Math.max(meilleur, 25);        // astuces : même début
          else if (sq.length >= 4 && distance(sq, x.squelettes[i], 1) <= 1) meilleur = Math.max(meilleur, 15);
        }
        if (!meilleur && x.def[r]) meilleur = 8;                                            // mot de la définition
        score += meilleur;
      });
      var expr = 0;                                                        // une expression entière (« date du jour »)
      x.expressions.forEach(function (e) {
        if (e.every(function (m) { return racines[m]; })) expr = Math.min(70, expr + 35);
      });
      x.phrasesCles.forEach(function (k) {                                 // … mot pour mot (« ligne par ligne »)
        if (phrase.indexOf(k) >= 0) expr = Math.min(130, expr + 60);
      });
      score += expr;
      // Astuces et situations : la phrase de l'élève comparée au plus proche des besoins (ou au titre) ; un besoin tapé tel quel.
      if (demande && x.besoins.length) score += Math.round(reg.besoin * ressemblance(demande, x.besoins, reg.debut));
      if (reg.besoinTel && x.tels.indexOf(texte) >= 0) score += reg.besoinTel;
      // Divalto, un mot tapé seul : un mot-clé entier de la fiche (« commande » pour ENT) ; puis la table avant le champ.
      if (seul && reg.motCleEntier && x.entiers[singulier(utiles[0])]) score += reg.motCleEntier;
      if (seul && reg.typeSeul && score >= DICO_SEUIL) score += reg.typeSeul[x.fiche.type] || 0;
      return { fiche: x.fiche, score: score };
    }).filter(function (r) { return r.score > 0; })
      .sort(function (a, b) {
        return b.score - a.score || rangType(a.fiche, reg) - rangType(b.fiche, reg) ||
          rangModule(a.fiche) - rangModule(b.fiche) || nomTri(a.fiche).localeCompare(nomTri(b.fiche));
      });
  }
  function nomTri(f) { return String(f.nom || f.titre || ""); }   // (une astuce n'a pas de nom : son titre)
  function rangType(f, reg) { var i = (reg.ordreTypes || []).indexOf(f.type); return i < 0 ? 0 : i; }
  function rangModule(f) {
    var n = f.module && /^m(\d\d)$/.exec(f.module);
    return n ? parseInt(n[1], 10) : 99;
  }

  function dicoMoteur() {
    try {
      var m = localStorage.getItem(DICO_MOTEUR_KEY);
      if (m && DICO_MOTEURS.some(function (x) { return x.id === m; })) return m;
    } catch (e) { /* stockage indisponible */ }
    return "tous";
  }
  function nomMoteur(id) {
    for (var i = 0; i < DICO_MOTEURS.length; i++) if (DICO_MOTEURS[i].id === id) return DICO_MOTEURS[i].nom;
    return id;
  }
  function selecteurMoteurs(actif) {
    return '<div class="moteurs" role="radiogroup" aria-label="Moteur">' + DICO_MOTEURS.map(function (m) {
      return '<button type="button" class="moteur' + (m.id === actif ? ' actif' : '') + '" data-moteur="' + m.id +
        '" role="radio" aria-checked="' + (m.id === actif ? 'true' : 'false') + '">' + esc(m.nom) + '</button>';
    }).join('') + '</div>';
  }
  function brancherMoteurs(apres) {
    Array.prototype.forEach.call(document.querySelectorAll(".moteur"), function (b) {
      b.addEventListener("click", function () {
        try { localStorage.setItem(DICO_MOTEUR_KEY, b.getAttribute("data-moteur")); } catch (e) { /* ignoré */ }
        Array.prototype.forEach.call(document.querySelectorAll(".moteur"), function (x) {
          var oui = x === b;
          x.classList.toggle("actif", oui);
          x.setAttribute("aria-checked", oui ? "true" : "false");
        });
        apres();
      });
    });
  }
  function syntaxeFiche(f, moteur) {
    var liste = moteur === "tous" ? ["sqlserver", "snowflake", "mysql"] : [moteur];
    return '<dl class="syntaxe">' + liste.map(function (m) {
      return '<dt>' + esc(nomMoteur(m)) + '</dt><dd>' + fmt((f.moteurs || {})[m] || "—") + '</dd>';
    }).join('') + '</dl>';
  }
  // Une requête Dataviz a un titre, pas un nom de code : police normale.
  function classeTitre(f) { return f.type === "requête" ? " titre" : ""; }
  // Le type affiché d'une fiche : « type de donnée » pour type: "type" (catégorie « Types de données »).
  function nomType(f) { return f.type === "type" ? "type de donnée" : f.type; }
  // Une famille de types (« Dates et heures ») → « dates-et-heures » : #/types/dates-et-heures, l'id de son titre.
  function idFamille(nom) { return sansAccents(nom).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }
  function carteFiche(f, moteur, q) {
    var dv = domaineFiche(f) === "divalto";
    return '<a class="card fiche-res" href="#/dico/' + encodeURIComponent(f.id) + '"><div class="fiche-tete"><strong' +
      (dv && classeTitre(f) ? ' class="titre"' : '') + '>' +
      esc(f.nom) + '</strong><span class="tag">' + esc(nomType(f)) + '</span><span class="tag">' + esc(f.categorie) +
      '</span></div><p>' + fmt(f.definition) + '</p>' + (dv ? champsCites(f, q) : syntaxeFiche(f, moteur)) + '</a>';
  }
  // Fiche Divalto trouvée par un de ses champs : la carte montre ce champ (« PINO : le numéro de la pièce »).
  function champsCites(f, q) {
    var phrase = " " + motsDe(q || "").join(" ") + " ";
    return (f.champs || []).filter(function (c) {
      return Array.isArray(c) && codesCase(c[0]).some(function (k) { return phrase.indexOf(" " + k + " ") >= 0; });
    }).slice(0, 3).map(function (c) {
      return '<p class="muted">Champ <code>' + esc(c[0]) + '</code> : ' + fmt(c[1] || "") + '</p>';
    }).join('');
  }
  function parNom(a, b) { return a.nom.localeCompare(b.nom); }
  // Les thèmes à parcourir : SQL par ordre alphabétique, Divalto dans l'ordre de DICO_CATEGORIES_DIVALTO.
  function ordreCategories(cats, dv) {
    if (!dv) return cats.sort();
    var rang = function (c) { var i = DICO_CATEGORIES_DIVALTO.indexOf(c); return i < 0 ? 99 : i; };
    return cats.sort(function (a, b) { return rang(a) - rang(b) || a.localeCompare(b); });
  }

  function resultatsDico(q, moteur, domaine) {
    var dv = domaine === "divalto";
    var fiches = (DATA.dico || []).filter(function (f) { return domaineFiche(f) === (dv ? "divalto" : "sql"); });
    q = String(q).trim();
    if (dv && !fiches.length) return '<p class="muted">Le dico Divalto n\'a pas encore de fiche.</p>';
    if (!q) {
      var cats = {};
      fiches.forEach(function (f) { (cats[f.categorie] = cats[f.categorie] || []).push(f); });
      return '<p class="muted">' + fiches.length + (fiches.length > 1 ? ' fiches' : ' fiche') +
        '. Tape une question ou un nom, ou parcours par thème :</p>' +
        ordreCategories(Object.keys(cats), dv).map(function (c) {
          return '<h2>' + esc(c) + '</h2>' + (!dv && c === DICO_CATEGORIE_TYPES ?
            '<p class="fiche-famille"><a href="#/types">Voir le tableau de tous les types</a></p>' : '') +
            '<div class="puces">' + cats[c].sort(parNom).map(function (f) {
            return '<a class="puce' + (dv ? classeTitre(f) : '') + '" href="#/dico/' + encodeURIComponent(f.id) + '">' + esc(f.nom) + '</a>';
          }).join('') + '</div>';
        }).join('');
    }
    var r = chercherDico(q, dv ? "divalto" : "sql");
    var bons = r.filter(function (x) { return x.score >= DICO_SEUIL; }).slice(0, 8);
    if (bons.length) return bons.map(function (x) { return carteFiche(x.fiche, moteur, q); }).join('');
    if (r.length) return '<p>Pas de fiche sûre pour « ' + esc(q) + ' ». Les plus proches :</p>' +
      r.slice(0, 5).map(function (x) { return carteFiche(x.fiche, moteur, q); }).join('');
    return '<p>Aucune fiche ne correspond à « ' + esc(q) + ' ». Essaie un autre mot : ' + (dv ?
      'un nom de table ou de champ (MOUV, PINO…), ou ce que tu cherches (lignes de commande…).' :
      'un verbe (chercher, enlever, arrondir…) ou un nom de fonction.') + '</p>';
  }

  // L'onglet Divalto et les fiches Divalto suivent la règle du parcours Divalto (masquage d'écran, comme les parcours).
  function accesDivalto() { return accesOK(["divalto"]); }
  // L'onglet choisi, gardé dans le navigateur : « divalto » seulement si le compte a le parcours, sinon « sql ».
  function dicoDomaine() {
    var d = "sql";
    try { d = localStorage.getItem(DICO_DOMAINE_KEY) || "sql"; } catch (e) { /* stockage indisponible */ }
    return d === "divalto" && accesDivalto() ? "divalto" : "sql";
  }
  function ecrireDomaine(d) {
    try { localStorage.setItem(DICO_DOMAINE_KEY, d); } catch (e) { /* ignoré */ }
  }
  function ongletsDico(actif) {
    return '<div class="onglets" role="tablist" aria-label="Domaine du dico">' + DICO_DOMAINES.map(function (d) {
      var oui = d.id === actif;
      return '<button type="button" role="tab" class="onglet' + (oui ? ' actif' : '') + '" id="onglet-' + d.id +
        '" data-domaine="' + d.id + '" aria-selected="' + oui + '" aria-controls="dico-panneau" tabindex="' + (oui ? '0' : '-1') +
        '">' + esc(d.nom) + '</button>';
    }).join('') + '</div>';
  }
  // Clic, ou flèches gauche / droite, Début, Fin (comme des onglets) : la page est refaite sur l'autre onglet.
  function brancherOnglets() {
    var boutons = Array.prototype.slice.call(app.querySelectorAll(".onglet"));
    boutons.forEach(function (b, i) {
      b.addEventListener("click", function () { choisirDomaine(b.getAttribute("data-domaine")); });
      b.addEventListener("keydown", function (e) {
        var n = boutons.length, j = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i + n - 1) % n :
          e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
        if (j < 0) return;
        e.preventDefault();
        choisirDomaine(boutons[j].getAttribute("data-domaine"));
      });
    });
  }
  function choisirDomaine(d) {
    ecrireDomaine(d);
    afficherDico(true);
  }
  // Sur une fiche, « Super dico » et « Nouvelle recherche » ramènent à l'onglet de la fiche.
  function retourOnglet(domaine) {
    if (!accesDivalto()) return;
    Array.prototype.forEach.call(app.querySelectorAll('a[href="#/dico"]'), function (a) {
      a.addEventListener("click", function () { ecrireDomaine(domaine); });
    });
  }

  // Le dico (et ses fiches) : public sans compte ; un compte connecté suit le droit de l'outil « dico » (section Outils).
  function pageDico(id) {
    if (!outilOuvert("dico")) { pageOutilReserve(); return; }
    if (id) { pageFiche(decodeURIComponent(id)); return; }
    afficherDico(false);
  }
  // Sans le parcours Divalto, la page n'a pas d'onglets : le dico SQL seul.
  function afficherDico(focusOnglet) {
    var onglets = accesDivalto(), domaine = dicoDomaine(), dv = domaine === "divalto";
    var contenu = (dv ? '<h1>Super dico Divalto</h1>' +
      '<p class="muted">Tables, champs, vues SQL et requêtes Dataviz de Divalto 10.13. Pose ta question en mots simples ' +
      '(« lignes de commande »), ou tape un nom (« MOUV », « PINO »). Les fautes de frappe sont tolérées.</p>' :
      '<h1>Super dico SQL</h1>' +
      '<p class="muted">Pose ta question en mots simples (« enlever les espaces »), ou tape un nom (« COALESCE »). ' +
      'Les fautes de frappe sont tolérées.' + (outilOuvert("traduire") ? ' Une requête entière à comprendre ? <a href="#/traduire">Traduire une requête</a>.' : '') + '</p>') +
      '<div class="dico-recherche"><input type="search" id="dico-q" autocomplete="off" spellcheck="false" ' +
      (dv ? 'placeholder="Ex. : lignes de commande, MOUV, PINO…" aria-label="Rechercher dans le dico Divalto">' :
      'placeholder="Ex. : chercher un caractère, COALESCE…" aria-label="Rechercher dans le dico">') + '</div>' +
      (dv ? '' : selecteurMoteurs(dicoMoteur()) +
        '<p class="dico-types"><a class="btn ghost small" href="#/types">Tous les types de données</a></p>') +
      '<div id="dico-res"></div>';
    app.innerHTML = onglets ? ongletsDico(domaine) + '<div id="dico-panneau" role="tabpanel" aria-labelledby="onglet-' +
      domaine + '">' + contenu + '</div>' : contenu;
    var champ = document.getElementById("dico-q"), zone = document.getElementById("dico-res");
    champ.value = dicoQuestion;
    var maj = function () { dicoQuestion = champ.value; zone.innerHTML = resultatsDico(champ.value, dicoMoteur(), domaine); };
    champ.addEventListener("input", maj);
    brancherMoteurs(maj);
    brancherOnglets();
    maj();
    if (focusOnglet) document.getElementById("onglet-" + domaine).focus();
    else champ.focus();
  }

  // « Voir aussi » : les fiches qui existent, sans les fiches Divalto pour qui n'a pas le parcours.
  function voirAussi(f, parId) {
    var dv = accesDivalto();
    return (f.voirAussi || []).filter(function (v) { return parId[v] && (dv || domaineFiche(parId[v]) !== "divalto"); });
  }

  function pageFiche(id) {
    var f = (DATA.dico || []).filter(function (x) { return x.id === id; })[0];
    if (!f) { location.hash = "#/dico"; return; }
    if (domaineFiche(f) === "divalto") { pageFicheDivalto(f); return; }
    var parId = {};
    (DATA.dico || []).forEach(function (x) { parId[x.id] = x; });
    var voir = voirAussi(f, parId);
    var mod = f.module && module(f.module) && moduleVisible(f.module) ? module(f.module) : null;
    app.innerHTML = '<p class="muted"><a href="#/dico">Super dico</a> › ' + esc(f.categorie) + '</p>' +
      '<h1 class="fiche-nom">' + esc(f.nom) + '</h1>' +
      '<div class="tags"><span class="tag">' + esc(nomType(f)) + '</span><span class="tag">' + esc(f.categorie) + '</span></div>' +
      '<p class="definition">' + fmt(f.definition) + '</p>' +
      // Une fiche qui a une famille (un type, UNSIGNED, CAST…) est une ligne du tableau de tous les types.
      (f.famille ? '<p class="fiche-famille">Famille : <strong>' + esc(f.famille) + '</strong> · <a href="#/types/' +
        idFamille(f.famille) + '">Voir le tableau de tous les types</a></p>' : '') +
      selecteurMoteurs(dicoMoteur()) + '<div class="card" id="fiche-corps"></div>' +
      (voir.length ? '<h2>Voir aussi</h2><div class="puces">' + voir.map(function (v) {
        return '<a class="puce" href="#/dico/' + encodeURIComponent(v) + '">' + esc(parId[v].nom) + '</a>';
      }).join('') + '</div>' : '') +
      (mod && DATA.cours[f.module] ? '<p>Dans le cours : <a href="#/cours/' + esc(f.module) + '">' + esc(mod.titre) + '</a></p>' : '') +
      '<div class="actions"><a class="btn ghost" href="#/dico">Nouvelle recherche</a></div>';
    var rendre = function () { document.getElementById("fiche-corps").innerHTML = corpsFiche(f, dicoMoteur()); };
    brancherMoteurs(rendre);
    rendre();
    retourOnglet("sql");
  }
  // Le corps d'une fiche du dico, ou d'une astuce (titre : « La solution »), pour le moteur m : la syntaxe, l'exemple du
  // moteur choisi (« Tous » : celui de SQL Server, puis ses variantes), le résultat, le piège, la correction, le conseil.
  function corpsFiche(f, m, titre) {
    var ex = f.exemples || {}, html = '<p class="label">' + esc(titre || "Syntaxe") + '</p>' + syntaxeFiche(f, m);
    if (m === "snowflake" || m === "mysql") {
      html += '<p class="label">Exemple · ' + esc(nomMoteur(m)) + '</p><pre class="code">' + esc(ex[m] || f.exemple || "") + '</pre>';
    } else if (f.exemple) {
      var variantes = ["snowflake", "mysql"].filter(function (x) { return ex[x]; });
      html += '<p class="label">Exemple' + (variantes.length ? ' · SQL Server' : '') + '</p><pre class="code">' + esc(f.exemple) + '</pre>';
      if (m === "tous") variantes.forEach(function (x) {
        html += '<p class="label">Exemple · ' + esc(nomMoteur(x)) + '</p><pre class="code">' + esc(ex[x]) + '</pre>';
      });
    }
    if (f.resultat) html += resultatCours(f.resultat);
    if (f.piege) html += '<div class="feedback ko"><p><strong>Le piège :</strong> ' + fmt(f.piege) + '</p></div>';
    if (f.correction) html += '<div class="feedback ok"><p><strong>La correction :</strong> ' + fmt(f.correction) + '</p></div>';
    if (f.pratique) html += '<div class="feedback pratique"><p><strong>En pratique :</strong> ' + fmt(f.pratique) + '</p></div>';
    return html;
  }

  // La page « Tous les types de données » (#/types, ou #/types/<famille> : la page s'ouvre sur cette famille). Pour chaque
  // famille de DICO_FAMILLES qui a des fiches : un titre et un tableau Type | SQL Server | Snowflake | MySQL (les cellules
  // `apercu` ; le sélecteur de moteur ne garde que la colonne choisie). Le nom d'un type ouvre sa fiche. Mêmes droits que
  // le dico. Sur téléphone, le tableau défile dans son cadre, la page ne déborde pas.
  function pageTypes(cible) {
    if (!outilOuvert("dico")) { pageOutilReserve(); return; }
    var fiches = (DATA.dico || []).filter(function (f) { return domaineFiche(f) === "sql" && f.famille; });
    var familles = DICO_FAMILLES.map(function (nom) {
      return { nom: nom, id: idFamille(nom), fiches: fiches.filter(function (f) { return f.famille === nom; }) };
    }).filter(function (g) { return g.fiches.length; });
    app.innerHTML = '<p class="muted"><a href="#/dico">Super dico</a> › ' + esc(DICO_CATEGORIE_TYPES) + '</p>' +
      '<h1>Tous les types de données</h1>' +
      '<p class="muted">Les types de SQL Server, Snowflake et MySQL, rangés par famille, côte à côte. Clique sur un type ' +
      'pour ouvrir sa fiche.</p>' +
      (familles.length ? '<div class="puces types-familles">' + familles.map(function (g) {
        return '<a class="puce titre" href="#/types/' + g.id + '">' + esc(g.nom) + '</a>';
      }).join('') + '</div>' + selecteurMoteurs(dicoMoteur()) + '<div id="types-tableaux"></div>' :
        '<p>Le dico n\'a pas encore de type de donnée.</p>') +
      '<div class="actions"><a class="btn ghost" href="#/dico">Retour au dico</a></div>';
    retourOnglet("sql");
    if (!familles.length) return;
    var rendre = function () { document.getElementById("types-tableaux").innerHTML = tableauxTypes(familles, dicoMoteur()); };
    brancherMoteurs(rendre);
    rendre();
    var titre = cible ? document.getElementById("famille-" + cible) : null;
    if (titre) titre.scrollIntoView();
  }
  function tableauxTypes(familles, moteur) {
    var cols = moteur === "tous" ? ["sqlserver", "snowflake", "mysql"] : [moteur];
    // Sur un petit écran seulement (CSS) : les 3 moteurs ne tiennent pas en largeur.
    var glisser = moteur === "tous" ? '<p class="muted types-glisser">Fais glisser un tableau pour voir les 3 moteurs, ou choisis un moteur.</p>' : '';
    return glisser + familles.map(function (g) {
      return '<h2 id="famille-' + g.id + '">' + esc(g.nom) + '</h2><div class="table-wrap types-cadre"><table class="types-table">' +
        '<thead><tr><th scope="col">Type</th>' + cols.map(function (m) { return '<th scope="col">' + esc(nomMoteur(m)) + '</th>'; }).join('') +
        '</tr></thead><tbody>' + g.fiches.map(function (f) {
          return '<tr><th scope="row"><a href="#/dico/' + encodeURIComponent(f.id) + '">' + esc(f.nom) + '</a></th>' +
            cols.map(function (m) { return '<td>' + fmt((f.apercu || {})[m] || "—") + '</td>'; }).join('') + '</tr>';
        }).join('') + '</tbody></table></div>';
    }).join('');
  }

  // Une fiche du dico Divalto (docs/dico.md) : chaque bloc seulement si la fiche a le champ ; pas de moteurs.
  // Sans le parcours Divalto : un message court, pas le contenu.
  function pageFicheDivalto(f) {
    if (!accesDivalto()) {
      app.innerHTML = '<p class="muted"><a href="#/dico">Super dico</a></p><h1>Fiche réservée</h1>' +
        '<p>Cette fiche fait partie du dico Divalto, réservé aux comptes qui ont le parcours Divalto.</p>' +
        '<div class="actions">' + (lireSession() ? '' : '<a class="btn" href="#/compte">Se connecter</a>') +
        '<a class="btn ghost" href="#/dico">Retour au dico</a></div>';
      return;
    }
    var parId = {};
    (DATA.dico || []).forEach(function (x) { parId[x.id] = x; });
    var voir = voirAussi(f, parId);
    var corps = (f.champs && f.champs.length ? tableChamps(f) : '') +
      listeFiche("Les liens", f.liens) + listeFiche("Indicateurs", f.indicateurs) + listeFiche("Règles de gestion", f.regles) +
      (f.exemple ? '<p class="label">Exemple</p><pre class="code">' + esc(f.exemple) + '</pre>' : '') +
      (f.piege ? '<div class="feedback ko"><p><strong>Le piège :</strong> ' + fmt(f.piege) + '</p></div>' : '') +
      (f.pratique ? '<div class="feedback pratique"><p><strong>En pratique :</strong> ' + fmt(f.pratique) + '</p></div>' : '');
    app.innerHTML = '<p class="muted"><a href="#/dico">Super dico</a> › ' + esc(f.categorie) + '</p>' +
      '<h1 class="fiche-nom' + classeTitre(f) + '">' + esc(f.nom) + '</h1>' +
      '<div class="tags"><span class="tag">' + esc(f.type) + '</span><span class="tag">' + esc(f.categorie) + '</span></div>' +
      '<p class="definition">' + fmt(f.definition) + '</p>' +
      (corps ? '<div class="card fiche-dv" id="fiche-corps">' + corps + '</div>' : '') +
      (voir.length ? '<h2>Voir aussi</h2><div class="puces">' + voir.map(function (v) {
        return '<a class="puce' + (domaineFiche(parId[v]) === "divalto" ? classeTitre(parId[v]) : '') + '" href="#/dico/' +
          encodeURIComponent(v) + '">' + esc(parId[v].nom) + '</a>';
      }).join('') + '</div>' : '') +
      (f.version ? '<p class="muted"><strong>Version :</strong> ' + fmt(f.version) + '</p>' : '') +
      sourcesFiche(f) +
      '<div class="actions"><a class="btn ghost" href="#/dico">Nouvelle recherche</a></div>';
    retourOnglet("divalto");
  }
  // Le tableau « Les champs » (champ | sens). Un champ qui a sa propre fiche Divalto devient un lien vers elle, même
  // dans une case qui en groupe plusieurs (« DOS / TICOD / PICOD / PINO » : TICOD, PICOD et PINO ont leur fiche).
  function tableChamps(f) {
    var fiches = {};   // le code d'un champ (« pino ») → la fiche de ce champ ; ses noms en majuscules comptent aussi
    (DATA.dico || []).forEach(function (x) {
      if (x === f || domaineFiche(x) !== "divalto" || x.type !== "champ") return;
      [x.nom].concat((x.noms || []).filter(function (n) { return /^[A-Z0-9_]+$/.test(n); })).forEach(function (n) {
        codesCase(n).forEach(function (k) { if (!fiches[k]) fiches[k] = x.id; });
      });
    });
    return '<p class="label">Les champs</p><table class="champs"><thead><tr><th>Champ</th><th>Sens</th></tr></thead><tbody>' +
      f.champs.map(function (c) {
        c = Array.isArray(c) ? c : [String(c), ""];
        var cellule = String(c[0]).split(/\s*\/\s*/).map(function (morceau) {
          var id = fiches[codesCase(morceau)[0]], code = '<code>' + esc(morceau) + '</code>';
          return id ? '<a href="#/dico/' + encodeURIComponent(id) + '">' + code + '</a>' : code;
        }).join(' / ');
        return '<tr><td>' + cellule + '</td><td>' + fmt(c[1] || "") + '</td></tr>';
      }).join('') + '</tbody></table>';
  }
  function listeFiche(titre, l) {
    if (!l || !l.length) return '';
    return '<p class="label">' + esc(titre) + '</p><ul class="points">' + l.map(function (x) { return '<li>' + fmt(x) + '</li>'; }).join('') + '</ul>';
  }
  // La source (comme les questions Divalto) : `source`, ou `sources` (1 à 3 pages). Un lien seulement en https.
  function sourcesFiche(f) {
    var l = (Array.isArray(f.sources) && f.sources.length ? f.sources : f.source ? [f.source] : []).filter(function (s) { return s && s.titre; });
    var lien = function (s) {
      return /^https:\/\//.test(s.url || "") ? '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.titre) + '</a>' : esc(s.titre);
    };
    if (!l.length) return '';
    if (l.length === 1) return '<p class="muted">Source : ' + lien(l[0]) + '</p>';
    return '<p class="muted">Sources :</p><ul class="points">' + l.map(function (s) { return '<li>' + lien(s) + '</li>'; }).join('') + '</ul>';
  }

  // ---------- Astuces SQL (docs/astuces.md) ----------
  // #/astuces : l'élève écrit son besoin en une phrase (« sortir un numéro client avec des zéros devant ») ; les astuces
  // les plus proches viennent de la recherche du dico (chercherDico(q, "astuces")). Sans phrase : toutes les astuces, par
  // famille. #/astuces/<id> : une astuce. Le sélecteur de moteur est celui du dico (même choix gardé). Public sans compte ;
  // un compte connecté suit le droit de l'outil « astuces » (section Outils), comme le dico. Les liens vers le dico
  // suivent le droit du dico.
  var ASTUCES_FAMILLES = ["Compléter", "Formater", "Nettoyer du texte", "Manipuler", "Dates utiles", "Contrôler les données"];
  var astucesQuestion = "";   // la dernière recherche, gardée quand on ouvre une astuce

  function pageAstuces(id) {
    if (!outilOuvert("astuces")) { pageOutilReserve(); return; }
    if (id) { pageAstuce(id); return; }
    app.innerHTML = '<h1>Astuces SQL</h1>' +
      '<p class="muted">Écris ton besoin en une phrase : le site te donne l\'astuce, pour SQL Server, Snowflake et MySQL. ' +
      'Les fautes de frappe sont tolérées.</p>' +
      '<div class="dico-recherche"><input type="search" id="astuces-q" autocomplete="off" spellcheck="false" ' +
      'placeholder="Ex. : sortir un numéro client avec des zéros devant" aria-label="Écris ton besoin"></div>' +
      selecteurMoteurs(dicoMoteur()) + '<div id="astuces-res"></div>';
    var champ = document.getElementById("astuces-q"), zone = document.getElementById("astuces-res");
    champ.value = astucesQuestion;
    var maj = function () {
      astucesQuestion = champ.value;
      zone.innerHTML = resultatsAstuces(champ.value, dicoMoteur());
      // « Cherche dans le dico » : le dico s'ouvre avec la même phrase, dans l'onglet SQL.
      Array.prototype.forEach.call(zone.querySelectorAll("a.vers-dico"), function (a) {
        a.addEventListener("click", function () { dicoQuestion = champ.value; if (accesDivalto()) ecrireDomaine("sql"); });
      });
    };
    champ.addEventListener("input", maj);
    brancherMoteurs(maj);
    maj();
    champ.focus();
  }
  // Les astuces par famille, dans l'ordre d'ASTUCES_FAMILLES (une famille inconnue : à la fin).
  function famillesAstuces(astuces) {
    var noms = ASTUCES_FAMILLES.slice();
    astuces.forEach(function (a) { if (noms.indexOf(a.famille) < 0) noms.push(a.famille); });
    return noms.map(function (nom) {
      return { nom: nom, astuces: astuces.filter(function (a) { return a.famille === nom; }) };
    }).filter(function (g) { return g.astuces.length; });
  }
  function carteAstuce(a, moteur) {
    return '<a class="card fiche-res" href="#/astuces/' + encodeURIComponent(a.id) + '"><div class="fiche-tete"><strong class="titre">' +
      esc(a.titre) + '</strong><span class="tag">' + esc(a.famille) + '</span></div>' + syntaxeFiche(a, moteur) + '</a>';
  }
  function resultatsAstuces(q, moteur) {
    var astuces = DATA.astuces || [];
    q = String(q).trim();
    if (!astuces.length) return '<p class="muted">Pas encore d\'astuce.</p>';
    if (!q) {
      return '<p class="muted">' + pluriel(astuces.length, "astuce", "astuces") + '. Écris ton besoin, ou choisis par famille :</p>' +
        famillesAstuces(astuces).map(function (g) {
          return '<h2>' + esc(g.nom) + '</h2><ul class="astuces-liste">' + g.astuces.map(function (a) {
            return '<li><a href="#/astuces/' + encodeURIComponent(a.id) + '">' + esc(a.titre) + '</a></li>';
          }).join('') + '</ul>';
        }).join('');
    }
    var r = chercherDico(q, "astuces");
    var bons = r.filter(function (x) { return x.score >= DICO_SEUIL; }).slice(0, 8);
    if (bons.length) return bons.map(function (x) { return carteAstuce(x.fiche, moteur); }).join('');
    var dico = outilOuvert("dico") ? ', ou <a href="#/dico" class="vers-dico">cherche dans le dico</a>' : '';
    if (r.length) return '<p>Pas d\'astuce sûre pour « ' + esc(q) + ' ». Les plus proches :</p>' +
      r.slice(0, 3).map(function (x) { return carteAstuce(x.fiche, moteur); }).join('') +
      '<p>Ce n\'est pas ça ? Essaie d\'autres mots' + dico + '.</p>';
    return '<p id="astuces-aucune">Aucune astuce ne correspond. Essaie d\'autres mots' + dico + '.</p>';
  }
  // Une astuce : titre, famille, la solution du moteur choisi (ou des 3), l'exemple, le résultat, le piège, « En
  // pratique », et « Voir aussi » : des fiches du dico SQL.
  function pageAstuce(id) {
    var a = (DATA.astuces || []).filter(function (x) { return x.id === id; })[0];
    if (!a) { location.hash = "#/astuces"; return; }
    var parId = {};
    (DATA.dico || []).forEach(function (x) { parId[x.id] = x; });
    var voir = outilOuvert("dico") ? (a.voirAussi || []).filter(function (v) { return parId[v] && domaineFiche(parId[v]) === "sql"; }) : [];
    app.innerHTML = '<p class="muted"><a href="#/astuces">Astuces SQL</a> › ' + esc(a.famille) + '</p>' +
      '<h1>' + esc(a.titre) + '</h1>' +
      '<div class="tags"><span class="tag">' + esc(a.famille) + '</span></div>' +
      selecteurMoteurs(dicoMoteur()) + '<div class="card" id="astuce-corps"></div>' +
      (voir.length ? '<h2>Voir aussi dans le dico</h2><div class="puces">' + voir.map(function (v) {
        return '<a class="puce" href="#/dico/' + encodeURIComponent(v) + '">' + esc(parId[v].nom) + '</a>';
      }).join('') + '</div>' : '') +
      '<div class="actions"><a class="btn ghost" href="#/astuces">Nouvelle recherche</a></div>';
    var rendre = function () { document.getElementById("astuce-corps").innerHTML = corpsFiche(a, dicoMoteur(), "La solution"); };
    brancherMoteurs(rendre);
    rendre();
  }

  // ---------- Conseils d'architecte (docs/architecte.md) ----------
  // #/architecte : l'élève écrit sa situation en une phrase (« je crée une table pour les commandes EDI ») ; les situations
  // les plus proches viennent de la recherche du dico (chercherDico(q, "architecte")). Sans phrase : toutes les situations,
  // par famille, avec leur nombre de questions et de cases cochées. #/architecte/<id> : une situation : l'exemple d'abord,
  // puis la checklist (des étapes repliables, une case par question), les pièges, « En pratique », « Voir aussi », les
  // sources. Le sélecteur de moteur est celui du dico (même choix gardé) : un moteur seul ne montre que sa note et cache les
  // questions « seulement » des autres moteurs ; « Tous » montre tout, avec le nom du moteur. Les cases cochées restent dans
  // ce navigateur (localStorage, clé learnsql-architecte), jamais envoyées. Public sans compte ; un compte connecté suit le
  // droit de l'outil « architecte » (section Outils). Les liens vers le dico suivent le droit du dico, ceux vers un autre
  // outil le droit de cet outil.
  var ARCHITECTE_FAMILLES = ["Concevoir", "Écrire et charger", "Interroger", "Exploiter"];   // même liste dans outils/verifier.js
  var ARCHITECTE_KEY = "learnsql-architecte";
  var architecteQuestion = "";   // la dernière recherche, gardée quand on ouvre une situation
  var architecteOuvertes = {};   // les étapes ouvertes, le temps de l'onglet : { "<situation>": { "<n° de l'étape>": true } }
  var casesArchitecte = stockageCases(ARCHITECTE_KEY);   // { "<situation>": { "<question>": true } }

  function situationsArchitecte() { return (DATA.architecte || []).filter(function (s) { return s && s.id; }); }
  // Des cases cochées gardées dans ce navigateur (Conseils d'architecte, Copilote) : { "<page>": { "<case>": true } }.
  // Chaque lecture et écriture dans un try/catch : si le navigateur refuse (navigation privée, stockage plein), les cases
  // vivent le temps de l'onglet (une copie en mémoire) et la page marche quand même.
  function stockageCases(cle) {
    var secours = null;   // le navigateur refuse d'enregistrer : la copie en mémoire
    function tout() {
      var s = null;
      if (secours) return secours;
      try { s = JSON.parse(localStorage.getItem(cle) || "null"); } catch (e) { s = null; }
      return s && typeof s === "object" && !Array.isArray(s) ? s : {};
    }
    return {
      // Les cases cochées d'une page : seulement celles de ses ids (une case retirée des données est oubliée, sans erreur,
      // à la prochaine case cochée).
      lire: function (id, ids) {
        var c = tout()[id], r = {};
        if (c && typeof c === "object") ids.forEach(function (k) { if (c[k] === true) r[k] = true; });
        return r;
      },
      // Les cases d'une page remplacent les anciennes (aucune : la page quitte le stockage). Faux : le navigateur refuse.
      ecrire: function (id, cases) {
        var t = tout(), copie = {};
        Object.keys(t).forEach(function (k) { copie[k] = t[k]; });
        if (Object.keys(cases).length) copie[id] = cases; else delete copie[id];
        try { localStorage.setItem(cle, JSON.stringify(copie)); secours = null; return true; }
        catch (e) { secours = copie; return false; }
      }
    };
  }
  // Les ids des cases d'une page : ceux des questions (une situation) ou des actions (une fiche du Copilote) de ses étapes.
  function idsCases(etapes, champ) {
    var ids = [];
    (etapes || []).forEach(function (e) { ((e && e[champ]) || []).forEach(function (x) { if (x && x.id) ids.push(x.id); }); });
    return ids;
  }
  function casesSituation(s) { return casesArchitecte.lire(s.id, idsCases(s.etapes, "questions")); }
  function ecrireCasesSituation(s, cases) { return casesArchitecte.ecrire(s.id, cases); }
  // Une question « seulement » pour d'autres moteurs est cachée quand un seul moteur est choisi (« Tous » : tout).
  function questionVisible(q, moteur) {
    return moteur === "tous" || !Array.isArray(q.seulement) || !q.seulement.length || q.seulement.indexOf(moteur) >= 0;
  }
  // Les étapes qui ont une question visible pour ce moteur, numérotées de 1 à n : { e, i (son rang dans les données), n,
  // questions }.
  function etapesVisibles(s, moteur) {
    var l = [];
    (s.etapes || []).forEach(function (e, i) {
      var qs = ((e && e.questions) || []).filter(function (q) { return q && q.id && questionVisible(q, moteur); });
      if (qs.length) l.push({ e: e, i: i, n: l.length + 1, questions: qs });
    });
    return l;
  }
  // Les questions visibles pour ce moteur, et combien sont cochées.
  function compteSituation(s, moteur, cases) {
    var c = { total: 0, cochees: 0 };
    cases = cases || casesSituation(s);
    etapesVisibles(s, moteur).forEach(function (et) {
      et.questions.forEach(function (q) { c.total++; if (cases[q.id]) c.cochees++; });
    });
    return c;
  }
  function texteCoches(c) { return c.cochees + (c.cochees > 1 ? " cochées" : " cochée") + " sur " + c.total; }
  // Le texte d'une situation (fmt : le code entre accents graves), sans signe seul en début de ligne : une espace
  // insécable avant ? ! : ; » et après «, et dans un nombre (« 550 000 »).
  function fmtAr(t) {
    return fmt(String(t || "").replace(/ ([?!:;»])/g, "\u00a0$1").replace(/« /g, "«\u00a0").replace(/(\d) (?=\d{3}(\D|$))/g, "$1\u00a0"));
  }
  // « Aller à » : la page défile jusqu'au titre (l'adresse ne change pas : elle sert au routeur), qui prend le focus.
  function allerA(cible) {
    if (!cible) return;
    window.scrollTo(0, cible.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop) - 8);
    try { cible.focus({ preventScroll: true }); } catch (e) { cible.focus(); }
  }

  function pageArchitecte(id) {
    if (!outilOuvert("architecte")) { pageOutilReserve(); return; }
    if (id) { pageSituation(id); return; }
    app.innerHTML = '<h1>Conseils d\'architecte</h1>' +
      '<p class="muted">Tu crées une table ? Tu charges un fichier ? Tu lances un script ? Voici les questions à te poser, ' +
      'en checklist à cocher. Pour SQL Server, Snowflake et MySQL.</p>' +
      '<div class="dico-recherche"><input type="search" id="ar-q" autocomplete="off" spellcheck="false" ' +
      'placeholder="Ex. : je crée une table pour les commandes EDI" aria-label="Écris ta situation"></div>' +
      selecteurMoteurs(dicoMoteur()) + '<div id="ar-res"></div>';
    var champ = document.getElementById("ar-q"), zone = document.getElementById("ar-res");
    champ.value = architecteQuestion;
    var maj = function () {
      architecteQuestion = champ.value;
      zone.innerHTML = resultatsArchitecte(champ.value, dicoMoteur());
    };
    // « Regarde toute la liste » (aucune réponse sûre) : la recherche est vidée. « Aller à » une famille.
    zone.addEventListener("click", function (e) {
      var t = e.target, cible = t && t.getAttribute ? t.getAttribute("data-aller") : null;
      if (t && t.classList && t.classList.contains("ar-tout")) { champ.value = ""; maj(); champ.focus(); }
      else if (cible) allerA(document.getElementById(cible));
    });
    champ.addEventListener("input", maj);
    brancherMoteurs(maj);
    maj();
    champ.focus();
  }
  // Les situations par famille, dans l'ordre d'ARCHITECTE_FAMILLES (une famille inconnue : à la fin).
  function famillesArchitecte(situations) {
    var noms = ARCHITECTE_FAMILLES.slice();
    situations.forEach(function (s) { if (noms.indexOf(s.famille) < 0) noms.push(s.famille); });
    return noms.map(function (nom) {
      return { nom: nom, situations: situations.filter(function (s) { return s.famille === nom; }) };
    }).filter(function (g) { return g.situations.length; });
  }
  // Une situation dans une liste : son titre, sa famille (après une recherche), son résumé, ses questions (celles du
  // moteur choisi) et combien sont cochées.
  function carteSituation(s, moteur, avecFamille) {
    var c = compteSituation(s, moteur);
    return '<a class="card fiche-res ar-carte" href="#/architecte/' + encodeURIComponent(s.id) + '"><div class="fiche-tete">' +
      '<strong class="titre">' + esc(s.titre || "") + '</strong>' + (avecFamille ? '<span class="tag">' + esc(s.famille || "") + '</span>' : '') +
      '</div>' + (s.resume ? '<p>' + fmtAr(s.resume) + '</p>' : '') + '<p class="ar-compte' + (c.total && c.cochees === c.total ? ' ar-complet' : '') +
      '">' + pluriel(c.total, "question", "questions") + ' · ' + pluriel(c.cochees, "cochée", "cochées") + '</p></a>';
  }
  function resultatsArchitecte(q, moteur) {
    var toutes = situationsArchitecte();
    var tout = ', ou <button type="button" class="lien ar-tout">regarde toute la liste</button>.';
    q = String(q).trim();
    if (!toutes.length) return '<p class="muted">Pas encore de situation.</p>';
    if (!q) {
      var groupes = famillesArchitecte(toutes);
      return '<p class="muted">' + pluriel(toutes.length, "situation", "situations") + '. Écris ta situation, ou choisis dans la liste.</p>' +
        (groupes.length > 1 ? '<p class="ar-familles">Aller à&nbsp;: ' + groupes.map(function (g, k) {
          return '<button type="button" class="lien" data-aller="ar-f-' + k + '">' + esc(g.nom) + '</button>';
        }).join(' · ') + '</p>' : '') +
        groupes.map(function (g, k) {
          return '<h2 id="ar-f-' + k + '" class="ar-cible" tabindex="-1">' + esc(g.nom) + '</h2>' +
            g.situations.map(function (s) { return carteSituation(s, moteur, false); }).join('');
        }).join('');
    }
    var r = chercherDico(q, "architecte").filter(function (x) { return x.fiche.id; });
    var bons = r.filter(function (x) { return x.score >= DICO_SEUIL; }).slice(0, 8);
    if (bons.length) return bons.map(function (x) { return carteSituation(x.fiche, moteur, true); }).join('');
    if (r.length) return '<p>Pas de situation sûre pour « ' + esc(q) + ' ». Les plus proches :</p>' +
      r.slice(0, 3).map(function (x) { return carteSituation(x.fiche, moteur, true); }).join('') +
      '<p>Ce n\'est pas ça ? Essaie d\'autres mots' + tout + '</p>';
    return '<p id="ar-aucune">Aucune situation ne correspond. Essaie d\'autres mots' + tout + '</p>';
  }

  // Une situation : le titre, la famille, le résumé, « Aller à » ; l'exemple ; la checklist et ses boutons ; les pièges,
  // « En pratique », « Voir aussi », les sources ; « Nouvelle recherche ». Le moteur choisi refait l'exemple et la checklist.
  // Une étape se replie ; à la 1re visite (dans l'onglet), seule la première étape pas finie est ouverte.
  function pageSituation(id) {
    var s = situationsArchitecte().filter(function (x) { return x.id === id; })[0];
    if (!s) { location.hash = "#/architecte"; return; }
    var voir = voirAussiSituation(s), pieges = piegesSituation(s);
    var aller = [["ar-checklist", "La checklist"]].concat(pieges ? [["ar-pieges", "Les pièges"]] : [], voir ? [["ar-voir", "Voir aussi"]] : []);
    app.innerHTML = '<p class="muted"><a href="#/architecte">Conseils d\'architecte</a> › ' + esc(s.famille || "") + '</p>' +
      '<h1>' + esc(s.titre || "") + '</h1>' +
      '<div class="tags"><span class="tag">' + esc(s.famille || "") + '</span></div>' +
      (s.resume ? '<p class="ar-resume">' + fmtAr(s.resume) + '</p>' : '') +
      '<p class="ar-aller">Aller à&nbsp;: ' + aller.map(function (a) {
        return '<button type="button" class="lien" data-aller="' + a[0] + '">' + a[1] + '</button>';
      }).join(' · ') + '</p>' +
      selecteurMoteurs(dicoMoteur()) +
      '<h2>L\'exemple</h2><div class="card ar-exemple" id="ar-exemple"></div>' +
      '<h2 id="ar-checklist" class="ar-cible" tabindex="-1">La checklist</h2>' +
      '<p class="muted ar-consigne">Ouvre une étape. Coche une question quand tu as ta réponse. Tes cases restent dans ce ' +
      'navigateur.</p>' +
      '<p class="o-avertir" id="ar-stockage" hidden>Ce navigateur n\'enregistre pas tes cases : elles seront perdues en ' +
      'fermant l\'onglet.</p>' +
      '<p class="ar-total" id="ar-total" role="status"></p><div class="progress ar-barre" aria-hidden="true"><div id="ar-barre"></div></div>' +
      '<p class="ar-replier"><button type="button" class="lien" id="ar-ouvrir"></button></p>' +
      '<div id="ar-etapes"></div>' +
      '<div class="actions"><button type="button" class="btn" id="ar-copier">Copier la checklist</button>' +
      '<button type="button" class="btn ghost" id="ar-decocher">Tout décocher</button></div>' +
      '<p id="ar-msg" class="muted o-msg" role="status"></p>' +
      '<textarea id="ar-copie" class="ar-copie" readonly hidden aria-label="La checklist, à copier à la main"></textarea>' +
      pieges +
      (s.pratique ? '<div class="feedback pratique"><p><strong>En pratique&nbsp;:</strong> ' + fmtAr(s.pratique) + '</p></div>' : '') +
      voir + sourcesSituation(s) +
      '<div class="actions"><a class="btn ghost" href="#/architecte">Nouvelle recherche</a></div>';
    var zone = document.getElementById("ar-etapes"), msg = document.getElementById("ar-msg");
    var copie = document.getElementById("ar-copie"), ouvrir = document.getElementById("ar-ouvrir");
    if (!architecteOuvertes[s.id]) architecteOuvertes[s.id] = ouvertesParDefaut(s, dicoMoteur());
    var ouvertes = architecteOuvertes[s.id];
    // Le bouton dit ce qu'il fera : tout ouvrir, ou tout fermer (quand tout est ouvert).
    var majOuvrir = function () {
      var ds = zone.querySelectorAll("details.ar-etape");
      var toutes = ds.length > 0 && Array.prototype.every.call(ds, function (d) { return d.open; });
      ouvrir.textContent = toutes ? "Fermer toutes les étapes" : "Ouvrir toutes les étapes";
      ouvrir.hidden = !ds.length;
    };
    // Les comptes : en tout (et la barre), par étape (« 2 / 5 », vert quand l'étape est finie), et chaque question cochée.
    var majComptes = function () {
      var m = dicoMoteur(), cases = casesSituation(s), c = compteSituation(s, m, cases);
      document.getElementById("ar-total").innerHTML = '<strong>' + c.cochees + '</strong>' + texteCoches(c).slice(String(c.cochees).length);
      document.getElementById("ar-barre").style.width = (c.total ? Math.round(100 * c.cochees / c.total) : 0) + "%";
      etapesVisibles(s, m).forEach(function (et) {
        var d = zone.querySelector('details[data-etape="' + et.i + '"]'), n = 0;
        if (!d) return;
        et.questions.forEach(function (q) { if (cases[q.id]) n++; });
        d.querySelector(".ar-etape-compte").innerHTML = n + ' / ' + et.questions.length + '<span class="ar-cache"> cochées</span>';
        d.classList.toggle("ar-complete", n === et.questions.length);
      });
      Array.prototype.forEach.call(zone.querySelectorAll("input[data-q]"), function (b) {
        b.checked = !!cases[b.getAttribute("data-q")];
        var li = b.parentNode && b.parentNode.parentNode;
        if (li) li.classList.toggle("ar-fait", b.checked);
      });
      majOuvrir();
    };
    var rendre = function () {
      var m = dicoMoteur();
      document.getElementById("ar-exemple").innerHTML = exempleSituation(s, m);
      zone.innerHTML = etapesSituation(s, m, ouvertes);
      majComptes();
    };
    var stockage = function (ok) { document.getElementById("ar-stockage").hidden = ok; };
    // Une case cochée ou décochée : enregistrée tout de suite, les comptes suivent (la page n'est pas refaite).
    zone.addEventListener("change", function (e) {
      var b = e.target, q = b && b.getAttribute ? b.getAttribute("data-q") : null, cases;
      if (!q) return;
      cases = casesSituation(s);
      if (b.checked) cases[q] = true; else delete cases[q];
      stockage(ecrireCasesSituation(s, cases));
      majComptes();
    });
    // Une étape ouverte ou fermée : gardée le temps de l'onglet (« toggle » ne remonte pas : on l'écoute à la descente).
    zone.addEventListener("toggle", function (e) {
      var d = e.target, i = d && d.getAttribute ? d.getAttribute("data-etape") : null;
      if (i === null) return;
      if (d.open) ouvertes[i] = true; else delete ouvertes[i];
      majOuvrir();
    }, true);
    ouvrir.addEventListener("click", function () {
      var oui = ouvrir.textContent.indexOf("Ouvrir") === 0;
      Array.prototype.forEach.call(zone.querySelectorAll("details.ar-etape"), function (d) {
        d.open = oui;
        if (oui) ouvertes[d.getAttribute("data-etape")] = true; else delete ouvertes[d.getAttribute("data-etape")];
      });
      majOuvrir();
    });
    surClic("ar-copier", function () { copierChecklist(texteChecklist(s, dicoMoteur(), casesSituation(s)), msg, copie); });
    surClic("ar-decocher", function () {
      decocherTout(s.titre, casesSituation(s), msg, copie, function () { stockage(ecrireCasesSituation(s, {})); majComptes(); });
    });
    Array.prototype.forEach.call(app.querySelectorAll(".ar-aller [data-aller]"), function (b) {
      b.addEventListener("click", function () { allerA(document.getElementById(b.getAttribute("data-aller"))); });
    });
    brancherMoteurs(rendre);
    rendre();
  }
  // « Copier la checklist » (Conseils d'architecte, Copilote).
  function copierChecklist(t, msg, copie) { copierAvecRepli(t, msg, copie, "Copié : la checklist est prête à coller."); }
  // Copier un texte (la checklist, le code d'une action du Copilote) : le presse-papiers (et son repli, copierTexte) ; si
  // tout échoue, le texte s'affiche dans la zone « copie », sélectionné, pour le copier à la main. fait : le message du succès.
  function copierAvecRepli(t, msg, copie, fait) {
    copie.hidden = true;
    copierTexte(t, function (ok) {
      msg.textContent = ok ? fait : "Copie impossible. Le texte est ci-dessous : copie-le à la main.";
      if (ok) return;
      copie.value = t;
      copie.hidden = false;
      copie.focus();
      copie.select();
    });
  }
  // « Tout décocher » (Conseils d'architecte, Copilote) : sans case cochée, un message ; sinon une confirmation, puis vider()
  // (toutes les cases de la page, même celles qu'on ne voit pas).
  function decocherTout(titre, cases, msg, copie, vider) {
    copie.hidden = true;
    if (!Object.keys(cases).length) { msg.textContent = "Aucune case n'est cochée."; return; }
    if (!confirm("Décocher toutes les cases de « " + (titre || "") + " » ?")) return;
    vider();
    msg.textContent = "C'est fait : toutes les cases sont décochées.";
  }
  // À la 1re visite d'une situation (dans l'onglet) : la première étape qui a une case vide est ouverte.
  function ouvertesParDefaut(s, moteur) {
    var cases = casesSituation(s), o = {};
    var et = etapesVisibles(s, moteur).filter(function (x) { return x.questions.some(function (q) { return !cases[q.id]; }); })[0];
    if (et) o[et.i] = true;
    return o;
  }
  // L'exemple : le texte, puis le code du moteur choisi (codes.<moteur> quand l'écriture diffère, sinon code). « Tous » :
  // le code SQL Server, puis les autres écritures, repliées (« Le code · Snowflake »).
  function exempleSituation(s, moteur) {
    var ex = s.exemple || {}, codes = ex.codes || {}, html = ex.texte ? '<p>' + fmtAr(ex.texte) + '</p>' : '';
    var bloc = function (titre, code) { return '<p class="label">' + esc(titre) + '</p><pre class="code">' + esc(code) + '</pre>'; };
    if (moteur === "snowflake" || moteur === "mysql") return html + (codes[moteur] || ex.code ? bloc("Le code · " + nomMoteur(moteur), codes[moteur] || ex.code) : '');
    var variantes = ["snowflake", "mysql"].filter(function (m) { return codes[m]; });
    if (ex.code) html += bloc(variantes.length ? "Le code · SQL Server" : "Le code", ex.code);
    if (moteur === "tous") variantes.forEach(function (m) {
      html += ex.code ? '<details class="ar-variante"><summary>Le code · ' + esc(nomMoteur(m)) + '</summary><pre class="code">' +
        esc(codes[m]) + '</pre></details>' : bloc("Le code · " + nomMoteur(m), codes[m]);
    });
    return html;
  }
  // La checklist : une étape = un bloc repliable (<details>), son numéro, son titre et son compte ; dedans, une case par
  // question : la question en gras, puis « Pourquoi : », « Le bon réflexe : », les notes des moteurs affichés et le code.
  function etapesSituation(s, moteur, ouvertes) {
    var l = etapesVisibles(s, moteur);
    if (!l.length) return '<p class="muted">Pas de question pour ce moteur.</p>';
    return l.map(function (et) {
      return '<details class="ar-etape" data-etape="' + et.i + '"' + (ouvertes[et.i] ? ' open' : '') + '><summary>' +
        '<span class="ar-etape-titre"><span class="ar-etape-n">' + et.n + '.</span> ' + esc(et.e.titre || "") + '</span>' +
        '<span class="ar-etape-compte"></span></summary><ul class="ar-questions">' +
        et.questions.map(function (q) { return questionSituation(q, moteur); }).join('') + '</ul></details>';
    }).join('');
  }
  function questionSituation(q, moteur) {
    var seul = Array.isArray(q.seulement) && q.seulement.length ? q.seulement : null;
    var notes = moteursMR(moteur).filter(function (m) { return q.moteurs && typeof q.moteurs[m] === "string" && q.moteurs[m].trim(); });
    return '<li class="ar-q"><label class="ar-case"><input type="checkbox" data-q="' + esc(q.id) + '"><span class="ar-texte">' +
      fmtAr(q.q || "") + '</span></label><div class="ar-detail">' +
      (seul ? '<p class="ar-seul"><span class="tag">Seulement sur ' + esc(listeEt(seul.map(nomMoteur))) + '</span></p>' : '') +
      (q.pourquoi ? '<p><strong>Pourquoi&nbsp;:</strong> ' + fmtAr(q.pourquoi) + '</p>' : '') +
      (q.reflexe ? '<p><strong>Le bon réflexe&nbsp;:</strong> ' + fmtAr(q.reflexe) + '</p>' : '') +
      notes.map(function (m) { return '<p class="ar-note"><strong>' + esc(nomMoteur(m)) + '&nbsp;:</strong> ' + fmtAr(q.moteurs[m]) + '</p>'; }).join('') +
      (q.code ? '<pre class="code">' + esc(q.code) + '</pre>' : '') + '</div></li>';
  }
  // « Copier la checklist » : les questions seulement, groupées par étape, pour le moteur choisi ([x] cochée, [ ] non ;
  // « Tous » : une question propre à un moteur le dit). Le code entre accents graves perd ses accents graves.
  function texteChecklist(s, moteur, cases) {
    var l = [texteBrut(s.titre) + " : la checklist (" + (moteur === "tous" ? listeEt(MR_MOTEURS.map(nomMoteur)) : nomMoteur(moteur)) + ")",
      texteCoches(compteSituation(s, moteur, cases))];
    etapesVisibles(s, moteur).forEach(function (et) {
      l.push("", et.n + ". " + texteBrut(et.e.titre));
      et.questions.forEach(function (q) {
        var seul = moteur === "tous" && Array.isArray(q.seulement) && q.seulement.length ?
          " (seulement sur " + listeEt(q.seulement.map(nomMoteur)) + ")" : "";
        l.push((cases[q.id] ? "[x] " : "[ ] ") + texteBrut(q.q) + seul);
      });
    });
    return l.join("\n");
  }
  // Un texte des données pour une copie en texte simple (Conseils d'architecte, Copilote) : sans les accents graves du code.
  function texteBrut(t) { return String(t || "").replace(/`/g, ""); }
  function piegesSituation(s) {
    var l = (s.pieges || []).filter(function (p) { return typeof p === "string" && p.trim(); });
    return l.length ? '<h2 id="ar-pieges" class="ar-cible" tabindex="-1">Les pièges</h2><div class="feedback ko ar-pieges"><ul>' +
      l.map(function (p) { return '<li>' + fmtAr(p) + '</li>'; }).join('') + '</ul></div>' : '';
  }
  // « Voir aussi » : les autres situations qui existent (une situation prévue, pas encore écrite, n'a pas de lien), les
  // fiches du dico SQL (seulement avec le droit du dico), les outils de la section Outils (chacun selon son droit).
  function voirAussiSituation(s) {
    var parId = {}, dico = {};
    situationsArchitecte().forEach(function (x) { parId[x.id] = x; });
    (DATA.dico || []).forEach(function (x) { if (x && x.id) dico[x.id] = x; });
    var sits = (s.voirAussi || []).filter(function (v) { return v !== s.id && parId[v]; });
    var fiches = outilOuvert("dico") ? (s.dico || []).filter(function (v) { return dico[v] && domaineFiche(dico[v]) === "sql"; }) : [];
    var outils = (s.outils || []).map(outilLie).filter(Boolean);
    if (!sits.length && !fiches.length && !outils.length) return '';
    return '<h2 id="ar-voir" class="ar-cible" tabindex="-1">Voir aussi</h2>' +
      (sits.length ? '<p class="label ar-sous">Les situations</p><ul class="astuces-liste ar-voir-situations">' + sits.map(function (v) {
        return '<li><a href="#/architecte/' + encodeURIComponent(v) + '">' + esc(parId[v].titre || v) + '</a></li>';
      }).join('') + '</ul>' : '') +
      (fiches.length ? '<p class="label ar-sous">Dans le dico</p><div class="puces ar-voir-dico">' + fiches.map(function (v) {
        return '<a class="puce" href="#/dico/' + encodeURIComponent(v) + '">' + esc(dico[v].nom) + '</a>';
      }).join('') + '</div>' : '') +
      (outils.length ? '<p class="label ar-sous">Les outils</p><div class="puces ar-voir-outils">' + outils.map(function (o) {
        return '<a class="puce titre" href="' + esc(o.lien) + '">' + esc(o.titre) + '</a>';
      }).join('') + '</div>' : '');
  }
  // Un outil de la section Outils (un lien comme « Mots réservés », ou une définition), s'il est visible pour ce compte
  // (même règle que la page Outils : sans compte, les sujets publics).
  function outilLie(id) {
    var sujet = sujetDe(id), o = null;
    if (!sujet) return null;
    entreesSujet(sujet).forEach(function (x) {
      if (typeof x === "string" ? x === id : x && x.id === id) o = typeof x === "string" ? definitionOutil(x) : x;
    });
    return o && o.titre && outilVisible(sujet, o) ? { titre: o.titre, lien: o.lien || "#/outils/" + o.id } : null;
  }
  // Les sources : les pages officielles lues pour écrire la situation (un lien seulement en https).
  function sourcesSituation(s) {
    var l = (Array.isArray(s.sources) ? s.sources : []).filter(function (x) { return x && x.titre; });
    return l.length ? '<h2>Les sources</h2><ul class="points ar-sources">' + l.map(function (x) {
      return '<li>' + (/^https:\/\//.test(x.url || "") ? '<a href="' + esc(x.url) + '" target="_blank" rel="noopener">' + esc(x.titre) + '</a>' :
        esc(x.titre)) + '</li>';
    }).join('') + '</ul>' : '';
  }

  // ---------- Copilote (docs/copilote.md) ----------
  // Des checklists prêtes à l'emploi : je lis, je fais, je coche. Une fiche (data/copilote/fiches.js) : des étapes, et dans
  // chacune des actions, sans explication. #/copilote : une carte par fiche (titre, résumé, et pour chaque niveau son
  // nombre d'actions et combien sont cochées ; pas de recherche tant qu'il y a peu de fiches). #/copilote/<id> : une fiche :
  // le choix du niveau (Rapide : les actions « rapide » ; Complet : toutes ; gardé dans learnsql-copilote-niveau, Rapide
  // par défaut), la checklist (les étapes qui ont une action à ce niveau, numérotées ; une case par action ; le lien vers
  // l'outil d'une action s'il est permis), le compte (« 2 cochées sur 5 »), « Copier la checklist », « Tout décocher ».
  // Une case est celle de l'action, pas du niveau : cochée en Rapide, elle l'est aussi en Complet. Les cases restent dans ce
  // navigateur (learnsql-copilote : { "<fiche>": { "<action>": true } }), jamais envoyées. Public sans compte ; un compte
  // connecté suit le droit de l'outil « copilote » (section Outils), un lien vers un autre outil le droit de cet outil.
  // Champs facultatifs (novembre 2026) : l'exemple de la fiche (un encadré avant les niveaux : l'exemple concret d'abord),
  // le code d'une action (un bloc SQL et « Copier le code ») et son tableau modèle (1re ligne = les en-têtes). Le code et le
  // tableau suivent leur action (cachée en Rapide : cachés aussi) ; « Copier la checklist » ne copie que les actions.
  // Partagé avec les Conseils d'architecte : stockageCases, idsCases, copierChecklist, copierAvecRepli, decocherTout,
  // texteCoches, texteBrut, fmtAr, outilLie.
  var COPILOTE_NIVEAUX = [{ id: "rapide", nom: "Rapide" }, { id: "complet", nom: "Complet" }];
  var COPILOTE_NIVEAU_KEY = "learnsql-copilote-niveau";
  var casesCopilote = stockageCases("learnsql-copilote");
  var copiloteNiveau = "";   // le niveau choisi dans cet onglet (gardé même si le navigateur refuse de l'enregistrer)

  function fichesCopilote() { return (DATA.copilote || []).filter(function (f) { return f && f.id; }); }
  // Le niveau : celui choisi dans l'onglet, sinon celui gardé dans le navigateur, sinon Rapide.
  function niveauCopilote() {
    var n = copiloteNiveau;
    if (!n) { try { n = localStorage.getItem(COPILOTE_NIVEAU_KEY); } catch (e) { n = ""; } }
    return n === "complet" ? "complet" : "rapide";
  }
  function choisirNiveauCopilote(n) {
    copiloteNiveau = n === "complet" ? "complet" : "rapide";
    try { localStorage.setItem(COPILOTE_NIVEAU_KEY, copiloteNiveau); } catch (e) { /* gardé le temps de l'onglet */ }
  }
  function nomNiveau(n) { return n === "complet" ? "Complet" : "Rapide"; }
  // Le texte d'une fiche à l'écran : fmtAr, et un petit bout de code entre accents graves (24 signes au plus) ne se coupe
  // pas à une espace : « TOP 100 » reste sur une ligne. Un plus long se coupe aux espaces, comme le texte.
  function fmtCp(t) {
    return fmtAr(String(t || "").replace(/`([^`]+)`/g, function (c, code) { return code.length > 24 ? c : c.replace(/ /g, "\u00a0"); }));
  }
  // Les étapes qui ont une action à ce niveau, numérotées de 1 à n (en Rapide, une étape sans action rapide est cachée) :
  // { e, n, actions }.
  function etapesCopilote(f, niveau) {
    var l = [];
    (f.etapes || []).forEach(function (e) {
      var as = ((e && e.actions) || []).filter(function (a) { return a && a.id && (niveau !== "rapide" || a.rapide === true); });
      if (as.length) l.push({ e: e, n: l.length + 1, actions: as });
    });
    return l;
  }
  function casesFiche(f) { return casesCopilote.lire(f.id, idsCases(f.etapes, "actions")); }
  // Les actions d'un niveau, et combien sont cochées.
  function compteCopilote(f, niveau, cases) {
    var c = { total: 0, cochees: 0 };
    etapesCopilote(f, niveau).forEach(function (et) {
      et.actions.forEach(function (a) { c.total++; if (cases[a.id]) c.cochees++; });
    });
    return c;
  }

  function pageCopilote(id) {
    if (!outilOuvert("copilote")) { pageOutilReserve(); return; }
    if (id) { pageFicheCopilote(id); return; }
    var fiches = fichesCopilote();
    app.innerHTML = '<h1>Copilote</h1><p class="cp-intro">Des checklists prêtes à l\'emploi&nbsp;: je lis, je fais, je coche.</p>' +
      (fiches.length ? fiches.map(carteCopilote).join('') : '<p class="muted">Pas encore de fiche.</p>');
  }
  // Une fiche dans la liste : son titre, son résumé, puis une ligne par niveau (« Rapide : 5 actions · 2 cochées », en vert
  // quand tout le niveau est coché).
  function carteCopilote(f) {
    var cases = casesFiche(f);
    return '<a class="card fiche-res cp-carte" href="#/copilote/' + encodeURIComponent(f.id) + '"><div class="fiche-tete">' +
      '<strong class="titre">' + esc(f.titre || "") + '</strong></div>' + (f.resume ? '<p>' + fmtCp(f.resume) + '</p>' : '') +
      COPILOTE_NIVEAUX.map(function (n) {
        var c = compteCopilote(f, n.id, cases);
        return '<p class="cp-compte' + (c.total && c.cochees === c.total ? ' cp-complet' : '') + '" data-niveau="' + n.id + '">' + n.nom +
          '&nbsp;: ' + pluriel(c.total, "action", "actions") + ' · ' + pluriel(c.cochees, "cochée", "cochées") + '</p>';
      }).join('') + '</a>';
  }

  // Une fiche : le titre, le résumé, l'exemple ; les deux niveaux et quand choisir celui qui est affiché ; la checklist ; le
  // compte et sa barre ; « Copier la checklist », « Tout décocher ». Changer de niveau refait la checklist ; une case cochée
  // ou décochée est enregistrée tout de suite, et seuls les comptes suivent.
  function pageFicheCopilote(id) {
    var f = fichesCopilote().filter(function (x) { return x.id === id; })[0];
    if (!f) { location.hash = "#/copilote"; return; }
    app.innerHTML = '<p class="muted"><a href="#/copilote">Copilote</a></p>' +
      '<h1>' + esc(f.titre || "") + '</h1>' + (f.resume ? '<p class="cp-resume">' + fmtCp(f.resume) + '</p>' : '') +
      (texteOK(f.exemple) ? '<div class="feedback pratique cp-exemple"><p class="label">L\'exemple</p><p class="cp-exemple-texte">' +
        fmtCp(f.exemple) + '</p></div>' : '') +
      '<div class="cp-niveaux" role="group" aria-label="Niveau">' + COPILOTE_NIVEAUX.map(function (n) {
        return '<button type="button" class="cp-niveau" data-niveau="' + n.id + '" aria-pressed="false">' + n.nom +
          ' (' + compteCopilote(f, n.id, {}).total + ')</button>';
      }).join('') + '</div>' +
      '<p class="cp-quand" id="cp-quand"></p>' +
      '<p class="o-avertir" id="cp-stockage" hidden>Ce navigateur n\'enregistre pas tes cases : elles seront perdues en ' +
      'fermant l\'onglet.</p>' +
      '<div id="cp-etapes"></div>' +
      '<p class="cp-total" id="cp-total" role="status"></p><div class="progress cp-barre" aria-hidden="true"><div id="cp-barre"></div></div>' +
      '<div class="actions"><button type="button" class="btn" id="cp-copier">Copier la checklist</button>' +
      '<button type="button" class="btn ghost" id="cp-decocher">Tout décocher</button></div>' +
      '<p id="cp-msg" class="muted o-msg" role="status"></p>' +
      '<textarea id="cp-copie" class="cp-copie" readonly hidden aria-label="La checklist, à copier à la main"></textarea>';
    var zone = document.getElementById("cp-etapes"), msg = document.getElementById("cp-msg"), copie = document.getElementById("cp-copie");
    var stockage = function (ok) { document.getElementById("cp-stockage").hidden = ok; };
    // Le compte du niveau affiché (et la barre), et chaque action cochée (en vert).
    var majComptes = function () {
      var cases = casesFiche(f), c = compteCopilote(f, niveauCopilote(), cases), total = document.getElementById("cp-total");
      total.innerHTML = '<strong>' + c.cochees + '</strong>' + texteCoches(c).slice(String(c.cochees).length);
      total.classList.toggle("cp-complet", c.total > 0 && c.cochees === c.total);
      document.getElementById("cp-barre").style.width = (c.total ? Math.round(100 * c.cochees / c.total) : 0) + "%";
      Array.prototype.forEach.call(zone.querySelectorAll("input[data-action]"), function (b) {
        b.checked = !!cases[b.getAttribute("data-action")];
        var li = b.parentNode && b.parentNode.parentNode;
        if (li) li.classList.toggle("cp-fait", b.checked);
      });
    };
    var rendre = function () {
      var n = niveauCopilote(), quand = document.getElementById("cp-quand"), t = f.niveaux && f.niveaux[n];
      Array.prototype.forEach.call(app.querySelectorAll(".cp-niveau"), function (b) {
        var oui = b.getAttribute("data-niveau") === n;
        b.classList.toggle("actif", oui);
        b.setAttribute("aria-pressed", oui ? "true" : "false");
      });
      quand.innerHTML = typeof t === "string" ? fmtCp(t) : "";
      quand.hidden = !quand.innerHTML;
      zone.innerHTML = checklistCopilote(f, n);
      majComptes();
    };
    Array.prototype.forEach.call(app.querySelectorAll(".cp-niveau"), function (b) {
      b.addEventListener("click", function () {
        choisirNiveauCopilote(b.getAttribute("data-niveau"));
        copie.hidden = true;
        msg.textContent = "";
        rendre();
      });
    });
    zone.addEventListener("change", function (e) {
      var b = e.target, a = b && b.getAttribute ? b.getAttribute("data-action") : null, cases;
      if (!a) return;
      cases = casesFiche(f);
      if (b.checked) cases[a] = true; else delete cases[a];
      stockage(casesCopilote.ecrire(f.id, cases));
      majComptes();
    });
    // « Copier le code » d'une action : comme « Copier la checklist » (le presse-papiers, son repli, puis le code à copier à
    // la main, sous le bouton). Le texte copié est celui des données, tel quel.
    zone.addEventListener("click", function (e) {
      var b = e.target, a = b && b.getAttribute && b.getAttribute("data-code") ? actionCopilote(f, b.getAttribute("data-code")) : null;
      var d = b && b.parentNode && b.parentNode.parentNode;   // le bloc .cp-detail de l'action
      if (!a || !texteOK(a.code) || !d) return;
      copierAvecRepli(a.code, d.querySelector(".cp-code-msg"), d.querySelector(".cp-copie"), "Copié : le code est prêt à coller.");
    });
    surClic("cp-copier", function () { copierChecklist(texteCopilote(f, niveauCopilote(), casesFiche(f)), msg, copie); });
    surClic("cp-decocher", function () {
      decocherTout(f.titre, casesFiche(f), msg, copie, function () { stockage(casesCopilote.ecrire(f.id, {})); majComptes(); });
    });
    rendre();
  }
  // Une action d'une fiche, par son id.
  function actionCopilote(f, id) {
    var r = null;
    (f.etapes || []).forEach(function (e) { ((e && e.actions) || []).forEach(function (a) { if (a && a.id === id) r = a; }); });
    return r;
  }
  function texteOK(t) { return typeof t === "string" && t.trim() !== ""; }
  // La checklist d'un niveau : chaque étape (son numéro et son titre), puis ses actions : une case et le texte (toute la
  // ligne est cliquable) ; dessous, hors de la case (sélectionner ou copier ne coche rien), le code de l'action et son
  // tableau modèle, puis le lien vers son outil, s'il est permis (outilLie : même règle que la page Outils ; sans compte,
  // les sujets publics).
  function checklistCopilote(f, niveau) {
    var l = etapesCopilote(f, niveau);
    if (!l.length) return '<p class="muted">Pas d\'action à ce niveau.</p>';
    return l.map(function (et) {
      return '<section class="cp-etape"><h2><span class="cp-etape-n">' + et.n + '.</span> ' + fmtCp(et.e.titre || "") + '</h2>' +
        '<ul class="cp-actions">' + et.actions.map(function (a) {
          var o = a.outil ? outilLie(a.outil) : null, detail = codeCopilote(a) + tableauCopilote(a.tableau);
          return '<li class="cp-action"><label class="cp-case"><input type="checkbox" data-action="' + esc(a.id) + '">' +
            '<span class="cp-texte">' + fmtCp(a.texte || "") + '</span></label>' +
            (detail ? '<div class="cp-detail">' + detail + '</div>' : '') +
            (o ? '<a class="cp-outil" href="' + esc(o.lien) + '">' + esc(o.titre) + '<span aria-hidden="true">&nbsp;›</span></a>' : '') + '</li>';
        }).join('') + '</ul></section>';
    }).join('');
  }
  // Le code d'une action : un bloc SQL tel quel (retours à la ligne gardés ; trop large, il défile dans son cadre), puis
  // « Copier le code », son message, et la zone du code à copier à la main (cachée).
  function codeCopilote(a) {
    if (!texteOK(a.code)) return '';
    return '<pre class="code cp-code">' + esc(a.code) + '</pre><div class="cp-code-actions"><button type="button" ' +
      'class="btn small ghost cp-copier-code" data-code="' + esc(a.id) + '">Copier le code</button>' +
      '<span class="muted cp-code-msg" role="status"></span></div>' +
      '<textarea class="cp-copie" readonly hidden aria-label="Le code, à copier à la main"></textarea>';
  }
  // Un tableau modèle (même format que le résultat d'un cours : 1re ligne = les en-têtes, puis les lignes) : compact ;
  // trop large, il défile dans son cadre. Un tableau mal formé (le vérificateur le refuse) n'est pas affiché.
  function tableauCopilote(t) {
    if (!Array.isArray(t) || t.length < 2 || !t.every(function (r) { return Array.isArray(r) && r.length && r.length === t[0].length; })) return '';
    var cellule = function (v) { return fmtCp(v === null || v === undefined ? "" : String(v)); };
    return '<div class="cp-tableau"><table><thead><tr>' + t[0].map(function (h) { return '<th scope="col">' + cellule(h) + '</th>'; }).join('') +
      '</tr></thead><tbody>' + t.slice(1).map(function (r) {
        return '<tr>' + r.map(function (v) { return '<td>' + cellule(v) + '</td>'; }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
  }
  // « Copier la checklist » : le niveau affiché ; le titre et le niveau, « 2 cochées sur 5 », puis les étapes numérotées et
  // leurs actions ([x] cochée, [ ] non). Le code entre accents graves perd ses accents graves.
  function texteCopilote(f, niveau, cases) {
    var l = [texteBrut(f.titre) + " : la checklist (" + nomNiveau(niveau) + ")", texteCoches(compteCopilote(f, niveau, cases))];
    etapesCopilote(f, niveau).forEach(function (et) {
      l.push("", et.n + ". " + texteBrut(et.e.titre));
      et.actions.forEach(function (a) { l.push((cases[a.id] ? "[x] " : "[ ] ") + texteBrut(a.texte)); });
    });
    return l.join("\n");
  }

  // ---------- Mots réservés (docs/mots-reserves.md) ----------
  // #/mots-reserves, en 3 parties, sous le sélecteur de moteur du dico (même choix gardé) :
  // 1. Vérifier un nom : l'élève tape un nom ([order], "order" ou `order` : les signes autour sont retirés). Le résultat
  //    suit la frappe : un verdict en tête, puis, pour chaque moteur affiché, le statut du mot (data/reserves/liste.js),
  //    les règles d'un nom (regles.js : motif, longueurMax) et l'écriture exacte (echapper) ; pour un piège (pieges.js),
  //    quoi écrire à la place. Un nom vide n'affiche rien.
  // 2. Les pièges fréquents (pieges.js) : une carte chacun ; leurs statuts viennent de liste.js.
  // 3. La liste complète, de A à Z : Mot | un moteur par colonne affichée, les lettres pour sauter, les sources.
  // Public sans compte ; un compte connecté suit le droit de l'outil « mots-reserves » (section Outils), comme le dico.
  var MR_MOTEURS = ["sqlserver", "snowflake", "mysql"];
  // Les statuts de liste.js : leur couleur (toujours avec le mot), leur sens (vérifier un nom) et la légende du tableau.
  var MR_STATUTS = {
    "réservé": { couleur: "ko", sens: "Refusé tel quel comme nom.", court: "refusé tel quel" },
    "futur": { couleur: "attention", sens: "Permis aujourd'hui, mais il peut devenir réservé dans une prochaine version.",
      court: "peut le devenir (SQL Server)" },
    "limité": { couleur: "attention", sens: "Interdit dans certains emplois.", court: "interdit dans certains emplois (Snowflake)" },
    "mot-clé": { couleur: "neutre", sens: "Un mot-clé, mais permis comme nom, sans guillemets.", court: "permis comme nom (MySQL)" }
  };
  var mrNom = "", mrMotsCles = false;   // le nom tapé et la case « mots-clés permis » : gardés le temps de l'onglet

  function moteursMR(moteur) { return moteur === "tous" ? MR_MOTEURS : [moteur]; }
  // « SQL Server, Snowflake et MySQL »
  function listeEt(l) { return l.length > 1 ? l.slice(0, -1).join(", ") + " et " + l[l.length - 1] : (l[0] || ""); }
  // Le nom tapé, sans espaces autour ni les signes qui l'entourent : [order], "order", `order` → order. Le signe fermant
  // peut manquer (la page suit la frappe : « [ord »).
  function nomMR(t) {
    var n = String(t || "").trim(), fermant = { "[": "]", '"': '"', "`": "`" }[n.charAt(0)];
    if (fermant) {
      n = n.slice(1);
      if (n.charAt(n.length - 1) === fermant) n = n.slice(0, -1);
    }
    return n.trim();
  }
  // Le mot dans liste.js (ses statuts par moteur), ou {} : libre partout.
  function entreeMR(nom) {
    var mots = (DATA.motsReserves && DATA.motsReserves.mots) || {}, k = String(nom).toUpperCase();
    return Object.prototype.hasOwnProperty.call(mots, k) ? mots[k] : {};
  }
  // Le statut d'un mot sur un moteur, s'il est connu (MR_STATUTS) ; "" : libre.
  function statutMR(e, moteur) { return Object.prototype.hasOwnProperty.call(MR_STATUTS, e[moteur]) ? e[moteur] : ""; }
  function pastilleMR(statut) {
    return statut ? '<span class="o-niveau o-' + MR_STATUTS[statut].couleur + '">' + esc(statut) + '</span>' : '<span class="o-niveau o-ok">libre</span>';
  }
  // Pourquoi un nom ne s'écrit pas tel quel sur un moteur (r : ses règles, regles.js) : trop long, puis ce que le motif
  // refuse. Pour le dire en mots simples, quel que soit le motif : chaque signe est essayé seul au milieu d'un nom permis
  // (« a-a »), puis le premier en tête (« 1a ») ; refusé sans raison trouvée : « que des chiffres », « ressemble à un
  // nombre » (MySQL : 1e3, 0x41 ; permis avec une lettre devant), ou « hors de la règle ».
  function raisonsMR(nom, r) {
    var l = [], re = null, motif = [];
    if (typeof r.longueurMax === "number" && nom.length > r.longueurMax) l.push("trop long, " + nom.length + " caractères (" + r.longueurMax + " au plus)");
    try { re = new RegExp(r.motif); } catch (e) { re = null; }
    if (!re || re.test(nom)) return l;
    var base = ["a", "A", "x", "_"].filter(function (b) { return re.test(b + b + b); })[0];
    if (base) {
      var vus = {}, espace = false, accents = [], signes = [], c0 = nom.charAt(0);
      (nom.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\s\S]/g) || []).forEach(function (c) {
        if (vus[c]) return;
        vus[c] = true;
        if (re.test(base + c + base)) return;
        if (/\s/.test(c)) espace = true;
        else if (/[a-z]/.test(sansAccents(c)) && sansAccents(c) !== c.toLowerCase()) accents.push("« " + c + " »");
        else signes.push("« " + c + " »");
      });
      if (espace) motif.push("un espace");
      if (accents.length) motif.push((accents.length > 1 ? "des lettres accentuées " : "une lettre accentuée ") + accents.join(" "));
      if (signes.length) motif.push((signes.length > 1 ? "des signes interdits " : "un signe interdit ") + signes.join(" "));
      if (re.test(base + c0 + base) && !re.test(c0 + base + base)) motif.push(/[0-9]/.test(c0) ? "il commence par un chiffre" : "il commence par « " + c0 + " »");
    }
    if (!motif.length) motif.push(/^[0-9]+$/.test(nom) ? "il n'a que des chiffres" :
      /^[0-9]/.test(nom) && base && re.test(base + nom) ? "il ressemble à un nombre" : "il est hors de la règle");
    return l.concat(motif);
  }
  // L'écriture entourée (echapper : « [{nom}] », « "{NOM}" »… ; {nom} : le nom tapé, {NOM} : en majuscules). Le signe
  // fermant, s'il est dans le nom, est doublé (« a]b » → [a]]b]), comme sur les 3 moteurs. (Remplacer par une fonction :
  // un « $& » du nom reste tel quel.)
  function ecritureMR(nom, r) {
    var modele = String(r.echapper), f = /\}([^{}])$/.exec(modele), n = f ? nom.split(f[1]).join(f[1] + f[1]) : nom;
    return modele.replace(/\{nom\}/g, function () { return n; }).replace(/\{NOM\}/g, function () { return n.toUpperCase(); });
  }
  // Un nom sur un moteur : son statut (liste.js), ses raisons (regles.js), s'il faut l'entourer et comment l'écrire.
  // Réservé, limité ou hors des règles : à entourer ; trop long : refusé même entouré ; futur ou mot-clé : tel quel.
  function analyseMR(nom, moteur) {
    var e = entreeMR(nom), r = (DATA.motsRegles || {})[moteur] || null, statut = statutMR(e, moteur);
    var raisons = r ? raisonsMR(nom, r) : [];
    var tropLong = !!r && typeof r.longueurMax === "number" && nom.length > r.longueurMax;
    var entourer = !tropLong && (statut === "réservé" || statut === "limité" || raisons.length > 0);
    return { moteur: moteur, statut: statut, note: statut && moteur === "snowflake" ? e.noteSnowflake || "" : "", raisons: raisons,
      tropLong: tropLong, entourer: entourer, r: r || {},
      ecrit: tropLong ? "" : !entourer ? nom : r && r.echapper ? ecritureMR(nom, r) : "" };
  }
  // Le verdict, sur les moteurs affichés : « À éviter » (refusé tel quel sur un moteur : réservé, limité, un nom à
  // entourer ou trop long), « Possible, mais à éviter » (permis aujourd'hui partout, mais futur sur SQL Server ou
  // mot-clé de MySQL), « Libre ». Dans « À éviter », la phrase cite aussi les moteurs où le mot est futur.
  function verdictMR(analyses) {
    var noms = function (f) { return listeEt(analyses.filter(f).map(function (a) { return nomMoteur(a.moteur); })); };
    var phrases = [], n;
    [["réservé", "Réservé sur "], ["limité", "Limité sur "], ["futur", "Peut devenir réservé sur "]].forEach(function (s) {
      n = noms(function (a) { return a.statut === s[0]; });
      if (n) phrases.push(s[1] + n + ".");
    });
    var hors = analyses.filter(function (a) { return !a.tropLong && a.raisons.length; });
    if (hors.length) {
      var memes = hors.every(function (a) { return a.raisons.join() === hors[0].raisons.join(); });
      phrases.push("À entourer partout sur " + noms(function (a) { return hors.indexOf(a) >= 0; }) + (memes ? " : " + hors[0].raisons.join(", ") : "") + ".");
    }
    n = noms(function (a) { return a.tropLong; });
    if (n) phrases.push("Trop long sur " + n + ".");
    if (analyses.some(function (a) { return a.entourer || a.tropLong; })) return { niveau: "ko", titre: "À éviter", texte: phrases.join(" ") };
    var futur = noms(function (a) { return a.statut === "futur"; }), cle = noms(function (a) { return a.statut === "mot-clé"; });
    if (futur || cle) return { niveau: "attention", titre: "Possible, mais à éviter", texte: (futur ? "Peut devenir réservé sur " + futur +
      (cle ? ", et c'est un mot-clé de " + cle : "") + " : permis aujourd'hui" : "Un mot-clé de " + cle + " : permis comme nom") +
      ", mais un autre nom est plus sûr." };
    return { niveau: "ok", titre: "Libre", texte: "Ni réservé, ni à entourer sur " + noms(function () { return true; }) + "." };
  }
  // Le piège de ce nom (pieges.js), ou null. Son « pourquoi » dit pourquoi on CHOISIT ce nom (« la date d'une
  // commande ») : affiché « On le choisit pour : ».
  function piegeMR(nom) {
    var k = String(nom).toUpperCase();
    return (DATA.motsPieges || []).filter(function (p) { return p && String(p.mot).toUpperCase() === k; })[0] || null;
  }
  function aLaPlaceMR(p) { return (p.aLaPlace || []).map(function (n) { return '<code>' + esc(n) + '</code>'; }).join(' · '); }
  // Un nom hors des règles (espace, accent, signe) : le même en minuscules, sans accents, des _ entre les mots
  // (« Nom client » → nom_client), s'il est libre et suit les règles sur les moteurs affichés.
  function propositionMR(nom, moteurs) {
    var p = sansAccents(nom).replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
    if (!p || p === nom) return "";
    return moteurs.every(function (m) { var a = analyseMR(p, m); return !a.statut && !a.raisons.length; }) ? p : "";
  }
  // Un moteur : Statut, Règle, Écris-le.
  function blocMR(a) {
    var r = a.r, st = MR_STATUTS[a.statut];
    var statut = pastilleMR(a.statut) + ' ' + (st ? esc(st.sens) : 'Pas un mot réservé.') + (a.note ? ' <span class="muted">' + esc(a.note) + '</span>' : '');
    var regle = a.raisons.length ? '<span class="o-niveau o-ko">non</span> Il ne suit pas la règle : ' + esc(a.raisons.join(", ")) + '.' +
      (r.regle ? '<span class="mr-note">La règle : ' + fmt(r.regle) + '</span>' : '') : '<span class="o-niveau o-ok">oui</span> Il suit la règle des noms.';
    var ecrire = a.tropLong ? 'Impossible, même entouré : raccourcis-le.' : !a.ecrit ? 'Entouré (modèle manquant).' :
      '<code class="mr-ecrit">' + esc(a.ecrit) + '</code> ' + (a.entourer ? (r.echapperTexte ? '<span class="mr-note">' + fmt(r.echapperTexte) + '</span>' : '') :
        '<span class="muted">tel quel</span>');
    return '<div class="card mr-moteur" data-moteur="' + a.moteur + '"><h3>' + esc(nomMoteur(a.moteur)) + '</h3><dl class="mr-details">' +
      '<dt>Statut</dt><dd class="mr-statut">' + statut + '</dd><dt>Règle</dt><dd class="mr-regle">' + regle + '</dd>' +
      '<dt>Écris-le</dt><dd class="mr-ecrire">' + ecrire + '</dd></dl></div>';
  }
  // « Vérifier un nom » : le verdict, quoi écrire à la place, un bloc par moteur affiché ; les autres moteurs en une ligne.
  function resultatMR(nom, moteur) {
    if (!DATA.motsReserves) return '<p>La liste des mots réservés n\'est pas chargée : recharge la page.</p>';
    var moteurs = moteursMR(moteur), analyses = moteurs.map(function (m) { return analyseMR(nom, m); });
    var v = verdictMR(analyses), p = piegeMR(nom), html = '<div class="mr-verdict mr-' + v.niveau + '" id="mr-verdict"><p class="mr-titre">' +
      esc(v.titre) + '</p><p>' + esc(v.texte) + '</p></div>';
    var proposition = v.niveau === "ko" && !p ? propositionMR(nom, moteurs) : "";
    if (p) {
      html += '<div class="feedback ok mr-place" id="mr-place"><p><strong>À la place :</strong> ' + aLaPlaceMR(p) + '</p>' +
        (p.pourquoi ? '<p><strong>On le choisit pour :</strong> ' + fmt(p.pourquoi) + '</p>' : '') +
        (p.conseil ? '<p><strong>Conseil :</strong> ' + fmt(p.conseil) + '</p>' : '') + '</div>';
    } else if (proposition) {
      html += '<div class="feedback ok mr-place" id="mr-place"><p><strong>Plutôt :</strong> <code>' + esc(proposition) + '</code> ' +
        '<span class="muted">(en minuscules, sans accent, des _ entre les mots)</span></p></div>';
    } else if (analyses.some(function (a) { return a.statut && a.statut !== "mot-clé"; })) {
      html += '<p class="mr-conseil" id="mr-conseil">Choisis un autre nom : ajoute un mot qui précise, en minuscules avec _ ' +
        '(<code>date_commande</code> plutôt que <code>date</code>).</p>';
    }
    html += analyses.map(blocMR).join('');
    var e = entreeMR(nom), autres = MR_MOTEURS.filter(function (m) { return moteurs.indexOf(m) < 0 && statutMR(e, m); });
    if (autres.length) html += '<p class="muted" id="mr-autres">Sur les autres moteurs : ' + autres.map(function (m) {
      return esc(statutMR(e, m)) + ' sur ' + esc(nomMoteur(m));
    }).join(', ') + '.</p>';
    return html;
  }
  // Les règles d'un nom, moteur par moteur (regles.js), repliées sous la vérification.
  function reglesMR(moteur, ouvert) {
    var R = DATA.motsRegles || {}, l = moteursMR(moteur).filter(function (m) { return R[m]; });
    if (!l.length) return '';
    return '<details class="card mr-regles" id="mr-regles"' + (ouvert ? ' open' : '') + '><summary>Les règles d\'un nom, moteur par moteur</summary>' +
      l.map(function (m) {
        var r = R[m];
        return '<h3>' + esc(nomMoteur(m)) + '</h3><ul class="points">' + (r.regle ? '<li>' + fmt(r.regle) + '</li>' : '') +
          (typeof r.longueurMax === "number" ? '<li>' + r.longueurMax + ' caractères au plus.</li>' : '') +
          (r.casse ? '<li>' + fmt(r.casse) + '</li>' : '') +
          (r.echapperTexte ? '<li>Pour l\'écrire quand même : ' + fmt(r.echapperTexte) + '</li>' : '') + '</ul>' +
          (/^https:\/\//.test(r.source || "") ? '<p class="muted">Source : <a href="' + esc(r.source) + '" target="_blank" rel="noopener">' +
            'la page officielle de ' + esc(nomMoteur(m)) + '</a></p>' : '');
      }).join('') + '</details>';
  }
  // Les pièges fréquents : une carte par piège, dans l'ordre de pieges.js, avec ses statuts sur les moteurs affichés.
  function piegesMR(moteur) {
    var l = (DATA.motsPieges || []).filter(function (p) { return p && p.mot; });
    if (!l.length) return '<p class="muted" id="mr-pieges-vide">Pas encore de piège.</p>';
    return l.map(function (p) {
      var e = entreeMR(p.mot);
      return '<div class="card mr-piege" data-mot="' + esc(p.mot) + '"><p class="mr-piege-mot"><code>' + esc(p.mot) + '</code></p>' +
        '<p class="mr-statuts">' + moteursMR(moteur).map(function (m) {
          return '<span class="mr-st" data-moteur="' + m + '">' + esc(nomMoteur(m)) + ' ' + pastilleMR(statutMR(e, m)) + '</span>';
        }).join('') + '</p>' + (p.pourquoi ? '<p><strong>On le choisit pour :</strong> ' + fmt(p.pourquoi) + '</p>' : '') +
        '<p class="mr-a-la-place"><strong>À la place :</strong> ' + aLaPlaceMR(p) + '</p>' +
        (p.conseil ? '<p class="muted"><strong>Conseil :</strong> ' + fmt(p.conseil) + '</p>' : '') + '</div>';
    }).join('');
  }
  // La liste complète : les mots réservés, futurs ou limités sur un des moteurs affichés (avec la case : aussi les
  // mots-clés de MySQL), de A à Z, une colonne par moteur affiché ; une ligne par lettre, où sautent les boutons A, B, C…
  // Un mot « limité » sur Snowflake a sa note sur une ligne en dessous, de toute la largeur (lisible sur téléphone).
  function listeMR(moteur, motsCles) {
    var cols = moteursMR(moteur), mots = (DATA.motsReserves && DATA.motsReserves.mots) || {}, lettres = [], parLettre = {}, presents = {}, n = 0;
    Object.keys(mots).sort().forEach(function (k) {
      var garde = false;
      cols.forEach(function (m) {
        var s = statutMR(mots[k], m);
        if (s && (s !== "mot-clé" || motsCles)) garde = true;
      });
      if (!garde) return;
      cols.forEach(function (m) { presents[statutMR(mots[k], m)] = true; });
      var l = /^[A-Z]/.test(k) ? k.charAt(0) : "#";
      if (!parLettre[l]) { parLettre[l] = []; lettres.push(l); }
      parLettre[l].push(k);
      n++;
    });
    if (!n) return '<p class="muted">Aucun mot.</p>';
    return '<p class="muted" id="mr-compte">' + pluriel(n, "mot", "mots") + (cols.length > 1 ? "" : " sur " + esc(nomMoteur(cols[0]))) + '.</p>' +
      '<ul class="mr-legende">' + ["réservé", "futur", "limité", "mot-clé"].filter(function (s) { return presents[s]; }).map(function (s) {
        return '<li>' + pastilleMR(s) + ' ' + esc(MR_STATUTS[s].court) + '</li>';
      }).join('') + '<li><strong aria-hidden="true">—</strong> libre</li></ul>' +
      '<div class="mr-lettres" id="mr-lettres" role="group" aria-label="Aller à la lettre">' + lettres.map(function (l) {
        return '<button type="button" class="mr-lettre" data-lettre="' + l + '">' + l + '</button>';
      }).join('') + '</div>' +
      '<p class="muted mr-glisser" id="mr-glisser" hidden>Fais glisser le tableau pour voir les 3 moteurs, ou choisis un moteur.</p>' +
      '<div class="mr-cadre" id="mr-cadre"><table class="mr-table" id="mr-table"><thead><tr><th scope="col">Mot</th>' +
      cols.map(function (m) { return '<th scope="col">' + esc(nomMoteur(m)) + '</th>'; }).join('') + '</tr></thead>' +
      lettres.map(function (l) {
        return '<tbody id="mr-l-' + l + '"><tr class="mr-sep"><th colspan="' + (cols.length + 1) + '" scope="rowgroup" tabindex="-1"><span>' +
          l + '</span></th></tr>' + parLettre[l].map(function (k) {
          var e = mots[k], note = cols.indexOf("snowflake") >= 0 && statutMR(e, "snowflake") === "limité" && e.noteSnowflake;
          // Un mot long se coupe d'abord après un _ (MASTER_SSL_<wbr>VERIFY…).
          return '<tr' + (note ? ' class="mr-avec-note"' : '') + '><th scope="row"><code>' + esc(k).replace(/_/g, "_<wbr>") + '</code></th>' +
            cols.map(function (m) {
              var s = statutMR(e, m);
              return '<td>' + (s ? pastilleMR(s) : '<span class="muted" aria-hidden="true">—</span><span class="mr-cache">libre</span>') + '</td>';
            }).join('') + '</tr>' + (note ? '<tr class="mr-sous"><td colspan="' + (cols.length + 1) + '"><span class="mr-note">Snowflake, ' +
            esc(k) + ' limité : ' + esc(note) + '</span></td></tr>' : '');
        }).join('') + '</tbody>';
      }).join('') + '</table></div>';
  }
  // Les sources de liste.js : les 3 pages officielles et leur date (AAAA-MM-JJ → JJ/MM/AAAA).
  function sourcesMR() {
    var s = (DATA.motsReserves && DATA.motsReserves.sources) || {}, d = /^(\d{4})-(\d\d)-(\d\d)$/.exec(s.date || "");
    var liens = MR_MOTEURS.filter(function (m) { return /^https:\/\//.test(s[m] || ""); }).map(function (m) {
      return '<a href="' + esc(s[m]) + '" target="_blank" rel="noopener">' + esc(nomMoteur(m)) + '</a>';
    });
    return liens.length ? '<p class="muted mr-sources" id="mr-sources">Sources : les listes officielles des mots réservés (' + liens.join(' · ') + ')' +
      (d ? ', lues le ' + d[3] + '/' + d[2] + '/' + d[1] : '') + '.</p>' : '';
  }

  function pageMotsReserves() {
    if (!outilOuvert("mots-reserves")) { pageOutilReserve(); return; }
    app.innerHTML = '<h1>Mots réservés</h1>' +
      '<p class="muted">Un nom de table ou de colonne réservé (ORDER, USER…) fait planter la requête, ou oblige à l\'entourer ' +
      'partout : <code>[ORDER]</code>. Vérifie ton nom avant de créer la table.</p>' +
      '<p class="mr-sommaire">Aller à : <button type="button" class="lien" data-aller="mr-pieges">Les pièges fréquents</button> · ' +
      '<button type="button" class="lien" data-aller="mr-liste">La liste complète</button></p>' +
      selecteurMoteurs(dicoMoteur()) +
      '<h2 id="mr-verifier">1. Vérifier un nom</h2>' +
      '<div class="dico-recherche"><input type="text" id="mr-nom" autocomplete="off" autocapitalize="off" spellcheck="false" ' +
      'placeholder="Ex. : statut, order, nom client" aria-label="Le nom à vérifier"></div>' +
      '<p class="mr-cache" id="mr-annonce" role="status"></p><div id="mr-res"></div><div id="mr-regles-zone"></div>' +
      '<h2 id="mr-pieges" class="mr-cible" tabindex="-1">2. Les pièges fréquents</h2>' +
      '<p class="muted">Des noms qu\'on choisit souvent sans y penser, et quoi écrire à la place.</p><div id="mr-pieges-zone"></div>' +
      '<h2 id="mr-liste" class="mr-cible" tabindex="-1">3. La liste complète</h2>' +
      '<p class="muted">Les mots réservés, futurs ou limités, de A à Z. Clique sur une lettre pour y aller.</p>' +
      '<label class="mr-case" id="mr-case"><input type="checkbox" id="mr-cle"> Afficher aussi les mots-clés permis (MySQL)</label>' +
      '<div id="mr-liste-zone"></div>' + sourcesMR();
    var champ = document.getElementById("mr-nom"), cle = document.getElementById("mr-cle");
    var verifier = function () {
      var nom = nomMR(champ.value), zone = document.getElementById("mr-res");
      mrNom = champ.value;
      zone.innerHTML = nom ? resultatMR(nom, dicoMoteur()) : "";
      // Pour un lecteur d'écran : le verdict seul (« À éviter : Réservé sur … »), pas tout le détail.
      var v = document.getElementById("mr-verdict");
      document.getElementById("mr-annonce").textContent = v ? Array.prototype.map.call(v.querySelectorAll("p"), function (x) {
        return x.textContent;
      }).join(" : ") : "";
    };
    var rendreListe = function () {
      var m = dicoMoteur(), cadre;
      document.getElementById("mr-case").hidden = m !== "tous" && m !== "mysql";
      document.getElementById("mr-liste-zone").innerHTML = listeMR(m, mrMotsCles);
      cadre = document.getElementById("mr-cadre");
      // « Fais glisser » seulement quand le tableau ne tient pas dans la largeur (téléphone, les 3 moteurs).
      if (cadre) document.getElementById("mr-glisser").hidden = cadre.scrollWidth <= cadre.clientWidth + 1;
    };
    var rendre = function () {
      var d = document.getElementById("mr-regles");
      verifier();
      document.getElementById("mr-regles-zone").innerHTML = reglesMR(dicoMoteur(), d && d.open);
      document.getElementById("mr-pieges-zone").innerHTML = piegesMR(dicoMoteur());
      rendreListe();
    };
    champ.value = mrNom;
    cle.checked = mrMotsCles;
    champ.addEventListener("input", verifier);
    cle.addEventListener("change", function () { mrMotsCles = cle.checked; rendreListe(); });
    brancherMoteurs(rendre);
    // « Aller à » une partie, ou à une lettre de la liste : la page défile jusqu'au titre (sans changer l'adresse,
    // qui sert au routeur), et le titre prend le focus.
    var aller = function (cible) {
      if (!cible) return;
      window.scrollTo(0, cible.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop) - 8);
      try { cible.focus({ preventScroll: true }); } catch (e) { cible.focus(); }
    };
    Array.prototype.forEach.call(app.querySelectorAll("[data-aller]"), function (b) {
      b.addEventListener("click", function () { aller(document.getElementById(b.getAttribute("data-aller"))); });
    });
    document.getElementById("mr-liste-zone").addEventListener("click", function (e) {
      var l = e.target && e.target.getAttribute ? e.target.getAttribute("data-lettre") : null, tb = l ? document.getElementById("mr-l-" + l) : null;
      if (tb) aller(tb.querySelector("th"));
    });
    rendre();
    champ.focus();
  }

  // ---------- Traduire une requête (docs/traducteur.md) ----------
  // Le moteur est dans js/traducteur.js (LEARNSQL.traduire), sans IA. La requête reste dans une variable le temps
  // de l'onglet (pour la retrouver après un clic vers le dico) : jamais dans localStorage ni dans l'URL.
  var TRADUIRE_EXEMPLES = [
    { nom: "Regroupement (GROUP BY)", sql: "SELECT c.nom, SUM(co.montant_ht) AS total\nFROM commande co\nJOIN client c ON c.id = co.client_id\n" +
      "WHERE co.statut <> 'ANNULEE'\nGROUP BY c.nom\nHAVING SUM(co.montant_ht) > 5000\nORDER BY total DESC;" },
    { nom: "Clients sans commande (LEFT JOIN)", sql: "SELECT c.code, c.nom\nFROM client c\nLEFT JOIN commande co ON co.client_id = c.id\n" +
      "WHERE co.id IS NULL;" },
    { nom: "Dernière commande par client (CTE et ROW_NUMBER)", sql: "WITH derniere AS (\n  SELECT co.*,\n" +
      "         ROW_NUMBER() OVER (PARTITION BY co.client_id ORDER BY co.date_cde DESC) AS rn\n  FROM commande co\n)\n" +
      "SELECT client_id, num_cde, date_cde, montant_ht\nFROM derniere\nWHERE rn = 1;" }
  ];
  var traduireSql = "", traduireFait = false, traduireCopie = "", traduireMienne = "";

  // Tout texte venu de la requête passe par esc : aucune balise de l'utilisateur n'arrive dans la page.
  // Une sous-étape (niveau 1 et plus) porte une barre à gauche ; la suite d'une ligne trop longue a un retrait suspendu.
  function htmlTraduction(r) {
    var html = '<h2 id="tr-titre" tabindex="-1">La traduction</h2>';
    html += r.lignes.length ? '<div class="card tr-code">' + r.lignes.map(function (l) {
      var n = Math.min(Number(l.niveau) || 0, 12);
      return '<div class="tr-l' + (n ? ' tr-sous' : '') + (l.genre ? ' tr-' + l.genre : '') + '" style="--n:' + n + '">' +
        (l.verbe ? '<strong class="tr-verbe">' + esc(l.verbe) + '</strong> ' : '') + esc(l.texte) + '</div>';
    }).join('') + '</div>' : '<p class="tr-vide">' + esc(r.erreurs[0] || "Rien à traduire.") + '</p>';
    if (r.notes.length) html += '<h2>À savoir</h2><ul class="tr-notes">' + r.notes.map(function (n) {
      return '<li>' + n.morceaux.map(function (m) { return m.code ? '<code>' + esc(m.t) + '</code>' : esc(m.t); }).join('') + '</li>';
    }).join('') + '</ul>';
    if (r.fiches.length && outilOuvert("dico")) html += '<h2>Dans le dico</h2><div class="puces">' + r.fiches.map(function (f) {
      return '<a class="puce" href="#/dico/' + encodeURIComponent(f.id) + '">' + esc(f.nom) + '</a>';
    }).join('') + '</div>';
    return html;
  }
  // Copie dans le presse-papiers ; repli (textarea + execCommand) si l'API manque ou refuse.
  function copierTexte(t, fini) {
    function repli() {
      var ta = document.createElement("textarea"), ok = false;
      ta.value = t; ta.setAttribute("readonly", "");
      ta.style.position = "fixed"; ta.style.top = "-1000px"; ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      fini(ok);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(function () { fini(true); }, repli);
    else repli();
  }
  // Public sans compte ; un compte connecté suit le droit de l'outil « traduire » (section Outils).
  function pageTraduire() {
    if (!outilOuvert("traduire")) { pageOutilReserve(); return; }
    app.innerHTML = '<h1>Traduire une requête</h1>' +
      '<p class="muted">Colle une requête SQL. Le site l\'explique en pseudo-code, dans l\'ordre où SQL la calcule. ' +
      'Rien n\'est envoyé : tout reste dans ton navigateur.</p>' +
      '<textarea id="tr-sql" class="tr-sql" spellcheck="false" autocomplete="off" autocapitalize="off" ' +
      'aria-label="Requête SQL" placeholder="SELECT … FROM …"></textarea>' +
      '<div class="actions"><button type="button" class="btn" id="tr-go">Traduire</button>' +
      '<button type="button" class="btn ghost" id="tr-copier" disabled>Copier</button></div>' +
      '<p class="label tr-titre-ex">Exemples</p><div class="tr-exemples">' + TRADUIRE_EXEMPLES.map(function (x, k) {
        return '<button type="button" class="tr-ex" data-ex="' + k + '">' + esc(x.nom) + '</button>';
      }).join('') + '</div>' +
      '<p class="tr-retour" id="tr-retour" hidden><button type="button" class="lien" id="tr-mienne">Revenir à ma requête</button></p>' +
      '<p id="tr-msg" class="muted" role="status"></p><div id="tr-res"></div>';
    var champ = document.getElementById("tr-sql"), zone = document.getElementById("tr-res");
    var msg = document.getElementById("tr-msg"), copier = document.getElementById("tr-copier"), retour = document.getElementById("tr-retour");
    champ.value = traduireSql;
    function estExemple(t) { return TRADUIRE_EXEMPLES.some(function (x) { return x.sql === t; }); }
    function majRetour() { retour.hidden = !traduireMienne || champ.value === traduireMienne; }
    // montrer : après un clic, aller jusqu'au résultat (sur téléphone il est sous l'écran) et mettre le focus sur son titre.
    function traduire(montrer) {
      traduireSql = champ.value; traduireFait = true;
      var r = null;
      try { r = DATA.traduire ? DATA.traduire(champ.value) : null; } catch (e) { r = null; }
      msg.textContent = "";
      if (!r) { zone.innerHTML = '<p class="tr-vide">Le traducteur n\'est pas chargé : recharge la page.</p>'; copier.disabled = true; return; }
      zone.innerHTML = htmlTraduction(r);
      traduireCopie = r.texte;
      // Rien à copier si le résultat n'est qu'une erreur (ou un message).
      copier.disabled = !r.lignes.some(function (l) { return !l.genre && !/^(INSTRUCTION|LOT) /.test(l.verbe); });
      majRetour();
      if (montrer !== true) return;
      var titre = document.getElementById("tr-titre"), b = titre.getBoundingClientRect();
      try { titre.focus({ preventScroll: true }); } catch (e) { titre.focus(); }
      if (b.top < 0 || b.top > (window.innerHeight || document.documentElement.clientHeight) - 80) titre.scrollIntoView(true);
    }
    // Traduire sa propre requête : il n'y a plus de requête à retrouver.
    function traduireLaMienne() { if (!estExemple(champ.value)) traduireMienne = ""; traduire(true); }
    document.getElementById("tr-go").addEventListener("click", traduireLaMienne);
    champ.addEventListener("input", function () { traduireSql = champ.value; });
    champ.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); traduireLaMienne(); }
    });
    // Un exemple remplace le texte : celui de l'élève est gardé (en mémoire seulement), avec un lien pour y revenir.
    Array.prototype.forEach.call(app.querySelectorAll(".tr-ex"), function (b) {
      b.addEventListener("click", function () {
        if (/\S/.test(champ.value) && !estExemple(champ.value)) traduireMienne = champ.value;
        champ.value = TRADUIRE_EXEMPLES[Number(b.getAttribute("data-ex"))].sql;
        traduire(true);
      });
    });
    document.getElementById("tr-mienne").addEventListener("click", function () {
      champ.value = traduireMienne;
      traduireMienne = "";
      traduire(true);
    });
    copier.addEventListener("click", function () {
      copierTexte(traduireCopie, function (ok) {
        msg.textContent = ok ? "Copié : le pseudo-code est prêt à coller." : "Copie impossible : sélectionne le texte et copie-le à la main.";
      });
    });
    if (traduireFait && traduireSql) traduire();
  }

  // ---------- Outils (docs/outils.md) ----------
  // #/outils : une section par sujet (data/outils/sujets.js), une carte par outil. Droits (page Équipe, « Droits des
  // outils ») : même règle que les parcours, sur la chaîne « outils » (toute la section) → sujet → outil ; sans compte,
  // les sujets publics (outilsPublics). Sans le droit : pas de carte, et la page de l'outil donne un message court (le dico
  // et Traduire aussi, pour un compte connecté). #/outils/<id> : l'outil et les documents de l'élève ; #/outils/<id>/<doc> : un document ;
  // #/outils/<id>/exemple : l'exemple, en lecture. Le moteur (calculs, alertes, contrôle d'un fichier, Excel, copie) est
  // dans js/outils.js (LEARNSQL.outilsMoteur) : ici, seulement l'écran, sans code propre à un outil.
  // Les documents restent dans ce navigateur (localStorage, clé learnsql-outils) : jamais envoyés, jamais synchronisés.
  var OUTILS_KEY = "learnsql-outils";
  var OM = DATA.outilsMoteur;
  var TYPE_XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  var outilsSecours = null, outilsStockageKO = false;   // localStorage refusé : les documents vivent le temps de l'onglet
  var outilCourant = null;   // le document ouvert : { def, doc, lecture }
  // Un message pour la page suivante (« Fichier ouvert », « Document supprimé »…) : un texte, ou { texte, details }.
  var outilsMessage = "";
  var STOCKAGE_KO = "Attention : ce navigateur n'enregistre pas tes documents. Ils seront perdus en fermant l'onglet : " +
    "utilise « Enregistrer dans un fichier » avant de partir.";

  function definitionOutil(id) {
    return (DATA.outils || []).filter(function (d) { return d.id === id; })[0] || null;
  }
  // Les outils d'un sujet, dans l'ordre : sa liste, ou celles de ses groupes (étapes).
  function entreesSujet(s) {
    return s.groupes ? s.groupes.reduce(function (l, g) { return l.concat(g.outils || []); }, []) : (s.outils || []);
  }
  // Le sujet qui range cet outil (data/outils/sujets.js).
  function sujetOutil(def) {
    return (DATA.outilsSujets || []).filter(function (s) { return s.id === def.sujet && entreesSujet(s).indexOf(def.id) >= 0; })[0] || null;
  }
  // Le sujet qui range cet id d'outil (une définition, ou un lien comme le dico).
  function sujetDe(id) {
    return (DATA.outilsSujets || []).filter(function (s) {
      return entreesSujet(s).some(function (o) { return (typeof o === "string" ? o : o && o.id) === id; });
    })[0] || null;
  }
  // Droits des outils (table « acces », comme les parcours ; masquage d'écran) : la chaîne « outils » → sujet → outil.
  // Sans compte : les sujets publics (outilsPublics), en entier. Avec un compte : droitsCompte (admin : tout).
  function accesOutils(chaine) {
    var s = lireSession();
    if (!s) return chaine.length < 2 || (DATA.outilsPublics || []).indexOf(chaine[1]) >= 0;
    return droitsCompte(s, chaine);
  }
  function sujetVisible(s) { return accesOutils(["outils", s.id]); }
  function outilVisible(s, o) { return accesOutils(["outils", s.id, o.id]); }
  // Au moins un outil visible pour ce compte (sinon, pas de lien « Outils » dans le menu).
  function unOutilVisible() {
    return (DATA.outilsSujets || []).some(function (s) {
      return outilsDuSujet(s).some(function (o) { return outilVisible(s, o); });
    });
  }
  // Le dico et Traduire : publics sans compte ; pour un compte, le droit de leur outil (« dico », « traduire »).
  function outilOuvert(id) {
    var s = sujetDe(id);
    return !lireSession() || accesOutils(s ? ["outils", s.id, id] : ["outils", id]);
  }
  // Des outils, dans l'ordre : une définition, ou un lien vers une page du site ({ id, titre, resume, lien }).
  function outilsDe(liste) {
    return (liste || []).map(function (o) { return typeof o === "string" ? definitionOutil(o) : o; }).filter(Boolean);
  }
  function outilsDuSujet(s) { return outilsDe(entreesSujet(s)); }
  // h : le niveau du titre de la carte (h4 sous une étape, sinon h3).
  function carteOutil(o, h) {
    h = h === "h4" ? "h4" : "h3";
    return '<a class="card parcours o-carte" href="' + esc(o.lien || "#/outils/" + o.id) + '"><div><' + h + '>' + esc(o.titre) + '</' + h + '>' +
      '<p>' + fmt(o.resume) + '</p></div><span class="fleche" aria-hidden="true">›</span></a>';
  }
  // « Les outils de ce cours » : les outils visibles (droits) dont le champ cours contient ce module, dans l'ordre des sujets.
  function outilsDuCours(mid) {
    var l = [];
    (DATA.outilsSujets || []).forEach(function (s) {
      outilsDuSujet(s).forEach(function (o) { if (!o.lien && (o.cours || []).indexOf(mid) >= 0 && outilVisible(s, o)) l.push(o); });
    });
    return l;
  }
  function coursOutil(def) {
    return (def.cours || []).filter(function (m) { return module(m) && DATA.cours[m] && moduleVisible(m); });
  }
  function exporte(def, x) { return !def.export || def.export.indexOf(x) >= 0; }
  function surClic(id, f) { var b = document.getElementById(id); if (b) b.addEventListener("click", f); }
  function prendreMessage() { var m = outilsMessage; outilsMessage = ""; return m; }
  // Un message : un texte, ou { texte, details: [...] } (ce qui a été corrigé ou coupé à l'ouverture d'un fichier).
  function htmlMessage(m) {
    if (!m) return "";
    if (typeof m === "string") return esc(m);
    return '<span>' + esc(m.texte) + '</span>' + (m.details && m.details.length ?
      '<ul>' + m.details.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>' : '');
  }
  function montrer(el, m) { if (el) el.innerHTML = htmlMessage(m); }
  // Le nom d'un document : « Sans nom » s'il n'a que des espaces.
  function nomDoc(d) { return String((d && d.nom) || "").replace(/\s+/g, " ").trim() || "Sans nom"; }
  function decoder(t) { try { return decodeURIComponent(t); } catch (e) { return ""; } }

  // Les documents de l'élève : { version: 1, docs: [{ id, outil, nom, cree, maj, contenu }] }.
  function lireOutils() {
    var brut = null, s = null;
    if (outilsStockageKO) return outilsSecours || { version: 1, docs: [] };
    try { brut = localStorage.getItem(OUTILS_KEY); } catch (e) { outilsStockageKO = true; return outilsSecours || { version: 1, docs: [] }; }
    try { s = JSON.parse(brut); } catch (e) { s = null; }
    return s && s.version === 1 && Array.isArray(s.docs) ? s : { version: 1, docs: [] };
  }
  function ecrireOutils(s) {
    outilsSecours = s;
    try { localStorage.setItem(OUTILS_KEY, JSON.stringify(s)); outilsStockageKO = false; return true; }
    catch (e) { outilsStockageKO = true; return false; }
  }
  // Le navigateur garde-t-il les documents ? Un essai d'écriture (la même valeur), dès l'ouverture d'une page d'outil :
  // le message juste, tout de suite, et un seul.
  function stockageOutilsOK() {
    try {
      var v = localStorage.getItem(OUTILS_KEY);
      localStorage.setItem(OUTILS_KEY, v === null ? '{"version":1,"docs":[]}' : v);
      if (v === null) localStorage.removeItem(OUTILS_KEY);
    } catch (e) { outilsStockageKO = true; }
    return !outilsStockageKO;
  }
  // « Effacer tous mes documents » (page Outils) et « Supprimer mon compte » : plus rien des outils dans ce navigateur.
  function effacerDocsOutils() {
    outilsSecours = null;
    try { localStorage.removeItem(OUTILS_KEY); } catch (e) { /* ignoré */ }
  }
  function docsOutil(id) {
    return lireOutils().docs.filter(function (d) { return d && d.outil === id && typeof d.id === "string"; });
  }
  function docOutil(id, docId) { return docsOutil(id).filter(function (d) { return d.id === docId; })[0] || null; }
  function enregistrerDoc(doc) {
    var s = lireOutils(), trouve = false;
    doc.maj = new Date().toISOString();
    s.docs = s.docs.map(function (d) { if (d && d.id === doc.id) { trouve = true; return doc; } return d; });
    if (!trouve) s.docs.push(doc);
    return ecrireOutils(s);
  }
  function supprimerDoc(docId) {
    var s = lireOutils();
    s.docs = s.docs.filter(function (d) { return d && d.id !== docId; });
    return ecrireOutils(s);
  }
  // Si le navigateur n'enregistre pas, la page du document le dit (#o-etat) : pas de second message.
  function creerDoc(def, nom, contenu) {
    var doc = { id: "d" + Date.now().toString(36) + Math.floor(Math.random() * 1679616).toString(36), outil: def.id,
      nom: nomDoc({ nom: String(nom || "").slice(0, OM.MAX.nom) }), cree: new Date().toISOString(), contenu: contenu };
    enregistrerDoc(doc);
    return doc;
  }
  function depuisExemple(def) {
    var d = creerDoc(def, def.exemple.nom, OM.contenuExemple(def));
    location.hash = "#/outils/" + def.id + "/" + d.id;
  }

  // Les fichiers : « registre-des-risques-demat-2027.xlsx », téléchargés sans rien envoyer (Blob dans le navigateur).
  function nomFichier(def, doc, ext) {
    var t = sansAccents(def.titre + " " + (doc ? nomDoc(doc) : "modele vide")).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70);
    return (t || "document") + "." + ext;
  }
  function telecharger(nom, donnees, type) {
    var url = URL.createObjectURL(new Blob([donnees], { type: type })), a = document.createElement("a");
    a.href = url; a.download = nom; a.hidden = true;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 30000);
  }
  function telechargerExcel(def, doc, msg) {
    try {
      telecharger(nomFichier(def, doc, "xlsx"), OM.xlsx(OM.classeur(def, doc)), TYPE_XLSX);
      msg.textContent = doc ? "Fichier Excel téléchargé." : "Modèle Excel téléchargé.";
    } catch (e) { msg.textContent = "Le fichier Excel n'a pas pu être fait."; }
  }
  // Copier : le HTML mis en forme (pour Word, un e-mail) et le texte simple. Replis : l'événement « copy », puis le
  // texte seul (copierTexte).
  function copierRiche(html, texte, fini) {
    function parEvenement() {
      var ok = false, surCopie = function (e) {
        if (!e.clipboardData) return;
        e.clipboardData.setData("text/html", html);
        e.clipboardData.setData("text/plain", texte);
        e.preventDefault();
        ok = true;
      };
      document.addEventListener("copy", surCopie);
      try { document.execCommand("copy"); } catch (e) { ok = false; }
      document.removeEventListener("copy", surCopie);
      if (ok) fini(true); else copierTexte(texte, fini);
    }
    var item = null;
    if (window.ClipboardItem && navigator.clipboard && navigator.clipboard.write) {
      try {
        item = new window.ClipboardItem({ "text/html": new Blob([html], { type: "text/html" }), "text/plain": new Blob([texte], { type: "text/plain" }) });
      } catch (e) { item = null; }
    }
    if (item) navigator.clipboard.write([item]).then(function () { fini(true); }, parEvenement);
    else parEvenement();
  }

  // Un sujet : ses outils ; ou ses étapes (groupes), numérotées, chacune avec ses outils. Seulement ce que les droits
  // laissent voir (une étape ou un sujet sans outil visible disparaît) ; « outils » réservé : aucun sujet.
  function pageOutils() {
    var sujets = DATA.outilsSujets || [], nbDocs = lireOutils().docs.length;
    var visibles = accesOutils(["outils"]) ? sujets.filter(sujetVisible) : [], sections = '';
    visibles.forEach(function (s) {
      var garder = function (o) { return outilVisible(s, o); };
      var corps = s.groupes ? s.groupes.map(function (g, k) {
        var l = outilsDe(g.outils).filter(garder);
        return l.length ? '<div class="o-groupe"><h3 class="o-etape"><span class="o-etape-n">' + (k + 1) + '.</span> ' + esc(g.titre) + '</h3>' +
          l.map(function (o) { return carteOutil(o, "h4"); }).join('') + '</div>' : '';
      }).join('') : outilsDuSujet(s).filter(garder).map(function (o) { return carteOutil(o); }).join('');
      if (corps) sections += '<section class="o-sujet" id="sujet-' + esc(s.id) + '"><h2>' + esc(s.titre) + '</h2>' +
        (s.resume ? '<p class="muted">' + fmt(s.resume) + '</p>' : '') + corps + '</section>';
    });
    var html = '<h1>Outils</h1>' + (sections ? '<p class="muted">Des outils pour ton travail, rangés par sujet.</p>' + sections :
      '<p id="o-aucun">Aucun outil n\'est ouvert à ton compte pour l\'instant.</p>');
    if (visibles.length < sujets.length && !lireSession()) {
      html += '<p class="muted"><a href="#/compte">Connecte-toi</a> pour voir les autres outils.</p>';
    }
    // Ordinateur partagé : les documents restent dans ce navigateur, même après la déconnexion. On peut tout effacer.
    if (nbDocs) html += '<section class="o-effacer" id="o-effacer"><h2>Tes documents</h2><p>' +
      (nbDocs > 1 ? 'Tu as ' + nbDocs + ' documents' : 'Tu as 1 document') + ' dans ce navigateur. ' +
      'Ils y restent, même après la déconnexion. Sur un ordinateur partagé, efface-les avant de partir.</p>' +
      '<div class="actions"><button type="button" class="btn ghost o-danger" id="o-effacer-tout">Effacer tous mes documents</button></div>' +
      '<div id="o-msg" class="muted o-msg" role="status"></div></section>';
    app.innerHTML = html;
    surClic("o-effacer-tout", function () {
      var n = lireOutils().docs.length, msg = document.getElementById("o-msg");
      if (!confirm("Effacer " + (n > 1 ? "tes " + n + " documents" : "ton document") + " des outils, dans ce navigateur ? C'est définitif.")) return;
      effacerDocsOutils();
      var b = document.getElementById("o-effacer-tout");
      if (b) b.parentNode.removeChild(b);   // (hidden ne suffit pas : .btn s'affiche en inline-block)
      msg.textContent = "C'est fait : tes documents des outils sont effacés de ce navigateur.";
    });
  }

  function pageOutil(id, docId) {
    var def = OM ? definitionOutil(id) : null, s = def ? sujetOutil(def) : null;
    if (!def || !s) { location.hash = "#/outils"; return; }
    if (!outilVisible(s, def)) { pageOutilReserve(); return; }
    if (docId) pageOutilDoc(def, docId);
    else pageOutilAccueil(def, s);
  }
  // Sans le droit : un message court, pas le contenu (même règle que les fiches Divalto du dico). Aussi pour le dico
  // et Traduire (compte connecté sans le droit).
  function pageOutilReserve() {
    var compte = !!lireSession(), section = accesOutils(["outils"]);
    app.innerHTML = (section ? '<p class="muted"><a href="#/outils">Outils</a></p>' : '') + '<h1>Outil réservé</h1>' +
      '<p>' + (compte ? 'Ton compte n\'a pas accès à cet outil.' : 'Cet outil est réservé à certains comptes.') + '</p>' +
      '<div class="actions">' + (compte ? '' : '<a class="btn" href="#/compte">Se connecter</a>') +
      (section ? '<a class="btn ghost" href="#/outils">Retour aux outils</a>' : '<a class="btn ghost" href="#/">Retour aux parcours</a>') + '</div>';
  }

  function pageOutilAccueil(def, s) {
    var docs = docsOutil(def.id).sort(function (a, b) { return String(b.maj || "").localeCompare(String(a.maj || "")); });
    var cours = coursOutil(def), ex = !!def.exemple;
    app.innerHTML = '<p class="muted"><a href="#/outils">Outils</a> › ' + esc(s.titre) + '</p>' +
      '<h1>' + esc(def.titre) + '</h1><p class="o-resume">' + fmt(def.resume) + '</p>' +
      '<div class="card o-guide"><p class="label">Quand s\'en servir</p><p>' + fmt(def.quand) + '</p>' +
      '<p class="label">Comment faire</p><ol class="o-etapes">' + (def.etapes || []).map(function (e) { return '<li>' + fmt(e) + '</li>'; }).join('') + '</ol>' +
      (ex ? '<div class="actions"><a class="btn ghost" id="o-voir-exemple" href="#/outils/' + esc(def.id) + '/exemple">Voir l\'exemple</a></div>' : '') +
      '</div>' +
      '<h2>Tes documents</h2>' + (stockageOutilsOK() ? '<p class="muted">Tes documents restent dans ce navigateur : rien n\'est envoyé sur Internet.</p>' :
        '<p class="o-avertir" id="o-stockage">' + esc(STOCKAGE_KO) + '</p>') +
      (docs.length ? '<div class="o-docs">' + docs.map(function (d) { return carteDoc(def, d); }).join('') + '</div>' : '<p>Pas encore de document.</p>') +
      '<div class="actions"><button type="button" class="btn" id="o-nouveau">Nouveau</button>' +
      (ex ? '<button type="button" class="btn ghost" id="o-depuis-exemple">Partir de l\'exemple</button>' : '') +
      '<button type="button" class="btn ghost" id="o-ouvrir">Ouvrir un fichier</button></div>' +
      '<input type="file" id="o-fichier" accept=".json,application/json" hidden>' +
      '<div id="o-msg" class="muted o-msg" role="status">' + htmlMessage(prendreMessage()) + '</div>' +
      (exporte(def, "excel") ? '<h2>Le modèle vide</h2><p class="muted">Pour t\'en servir au travail, sans le site.</p>' +
        '<div class="actions"><button type="button" class="btn ghost" id="o-modele">Télécharger le modèle vide (Excel)</button></div>' : '') +
      (cours.length ? '<h2>Dans les cours</h2><ul class="points">' + cours.map(function (m) {
        return '<li><a href="#/cours/' + esc(m) + '">' + esc(module(m).titre) + '</a></li>';
      }).join('') + '</ul>' : '');
    var msg = document.getElementById("o-msg");
    surClic("o-nouveau", function () {
      var d = creerDoc(def, "Nouveau document", OM.contenuVide(def));
      location.hash = "#/outils/" + def.id + "/" + d.id;
    });
    surClic("o-depuis-exemple", function () { depuisExemple(def); });
    surClic("o-modele", function () { telechargerExcel(def, null, msg); });
    brancherOuvrir(def, msg);
  }
  function carteDoc(def, d) {
    var c = OM.examiner(def, d.contenu).contenu;
    return '<a class="card parcours o-doc" href="#/outils/' + esc(def.id) + '/' + esc(encodeURIComponent(d.id)) + '"><div>' +
      '<h3>' + esc(nomDoc(d)) + '</h3><p>' + esc(c ? OM.resumeDocument(def, c) : "Document abîmé") +
      (d.maj ? ' · modifié le ' + esc(fmtDate(d.maj)) : '') + '</p></div><span class="fleche" aria-hidden="true">›</span></a>';
  }
  // « Ouvrir un fichier » : le fichier est contrôlé par le moteur ; un fichier faux donne un message, jamais une erreur.
  function brancherOuvrir(def, msg) {
    var entree = document.getElementById("o-fichier");
    surClic("o-ouvrir", function () { entree.click(); });
    entree.addEventListener("change", function () {
      var f = entree.files && entree.files[0];
      if (!f) return;
      if (f.size > 2000000) { msg.textContent = "Ce fichier est trop gros pour un document d'outil."; entree.value = ""; return; }
      var lecteur = new FileReader();
      lecteur.onload = function () {
        var r = OM.lireFichier(String(lecteur.result || ""), def, DATA.outils || []);
        if (!r.ok) { msg.textContent = r.message; return; }
        var d = creerDoc(def, r.doc.nom, r.doc.contenu);
        outilsMessage = r.annonce;   // en haut du document : ce qui a été corrigé ou coupé
        location.hash = "#/outils/" + def.id + "/" + d.id;
      };
      lecteur.onerror = function () { msg.textContent = "Ce fichier n'a pas pu être lu."; };
      lecteur.readAsText(f);
      entree.value = "";
    });
  }

  // Un document (ou l'exemple, en lecture) : l'éditeur, les totaux, les alertes, les sorties.
  function pageOutilDoc(def, docId) {
    var lecture = docId === "exemple", doc = null;
    // L'exemple se lit à sa date (exemple.date) : ses alertes « date passée » ne changent pas avec le temps.
    if (lecture) doc = def.exemple ? { id: "exemple", nom: def.exemple.nom, contenu: OM.contenuExemple(def),
      aujourdhui: def.exemple.date ? OM.jour(def.exemple.date) : undefined } : null;
    else {
      doc = docOutil(def.id, docId);
      if (doc) {
        // Un document gardé est contrôlé comme un fichier ouvert ; ce qui est corrigé est dit en haut de la page.
        var ex = OM.examiner(def, doc.contenu);
        if (!ex.contenu) outilsMessage = outilsMessage || "Ce document était abîmé : il repart vide. Le fichier enregistré, s'il existe, est intact.";
        else if (ex.problemes.length) outilsMessage = outilsMessage || OM.annonceOuverture("Ce document a été corrigé à l'ouverture.", ex.problemes);
        doc.contenu = ex.contenu || OM.contenuVide(def);
      }
    }
    var fil = '<p class="muted"><a href="#/outils">Outils</a> › <a href="#/outils/' + esc(def.id) + '">' + esc(def.titre) + '</a></p>';
    if (!doc) {
      app.innerHTML = fil + '<h1>Document introuvable</h1><p>Ce document n\'est pas dans ce navigateur. Il a peut-être été ' +
        'supprimé, ou fait sur un autre appareil.</p><div class="actions"><a class="btn" href="#/outils/' + esc(def.id) + '">Retour à l\'outil</a></div>';
      return;
    }
    outilCourant = { def: def, doc: doc, lecture: lecture, auj: doc.aujourdhui };
    app.classList.add("large");
    document.body.classList.add("o-imprimable");
    var annonce = htmlMessage(prendreMessage()), stocke = lecture || stockageOutilsOK();
    app.innerHTML = '<div class="o-ecran">' + fil + '<h1>' + esc(def.titre) + '</h1>' +
      (annonce ? '<div id="o-annonce" class="o-annonce" role="status">' + annonce + '</div>' : '') +
      (lecture ? '<p class="o-exemple"><span class="tag">Exemple</span> <strong>' + esc(doc.nom) + '</strong>' +
        (def.exemple.date ? ' <span class="muted">· situation au ' + esc(OM.dateFr(def.exemple.date)) + '</span>' : '') + '</p>' :
        '<div class="o-nom"><label for="o-nom">Nom du document</label><input type="text" id="o-nom" maxlength="' + OM.MAX.nom +
        '" value="' + esc(doc.nom) + '"></div>' + (stocke ? '<p class="muted o-local" id="o-etat">Enregistré dans ce navigateur à chaque saisie. Rien n\'est envoyé.</p>' :
          '<p class="o-avertir o-local" id="o-etat">' + esc(STOCKAGE_KO) + '</p>')) +
      '<div id="o-editeur" class="o-editeur">' + htmlEditeur(def, doc.contenu, lecture, doc.aujourdhui) + '</div>' +
      '<div id="o-alertes" aria-live="polite"></div>' +
      '<div class="actions o-sorties">' +
      (exporte(def, "excel") ? '<button type="button" class="btn" id="o-excel">Télécharger en Excel</button>' : '') +
      (exporte(def, "copier") ? '<button type="button" class="btn ghost" id="o-copier">Copier</button>' : '') +
      (exporte(def, "imprimer") ? '<button type="button" class="btn ghost" id="o-imprimer">Imprimer / PDF</button>' : '') + '</div>' +
      (lecture ? '<div class="actions"><button type="button" class="btn" id="o-depuis-exemple">Partir de cet exemple</button>' +
        '<a class="btn ghost" href="#/outils/' + esc(def.id) + '">Retour à l\'outil</a></div>' :
        '<div class="actions"><button type="button" class="btn ghost" id="o-enregistrer">Enregistrer dans un fichier</button>' +
        '<button type="button" class="btn ghost" id="o-dupliquer">Dupliquer</button>' +
        '<button type="button" class="btn danger" id="o-supprimer">Supprimer</button></div>') +
      '<div id="o-msg" class="muted o-msg" role="status"></div></div>' +
      '<div class="o-impression" id="o-impression"></div>';
    modeZones();
    majSuivi();
    brancherEditeur();
    brancherDocument(def, doc, lecture);
  }
  function brancherDocument(def, doc, lecture) {
    var msg = document.getElementById("o-msg");
    surClic("o-excel", function () { telechargerExcel(def, doc, msg); });
    surClic("o-copier", function () {
      copierRiche(OM.htmlDocument(def, doc), OM.texteDocument(def, doc), function (ok) {
        msg.textContent = ok ? "Copié : colle-le dans Word ou dans un e-mail." : "Copie impossible : utilise Imprimer / PDF.";
      });
    });
    surClic("o-imprimer", function () { remplirImpression(); window.print(); });
    if (lecture) { surClic("o-depuis-exemple", function () { depuisExemple(def); }); return; }
    var nom = document.getElementById("o-nom");
    nom.addEventListener("input", function () { doc.nom = nom.value.slice(0, OM.MAX.nom); sauverOutil(); });
    // En quittant le champ : un nom fait seulement d'espaces devient « Sans nom ».
    nom.addEventListener("change", function () { doc.nom = nomDoc({ nom: nom.value.slice(0, OM.MAX.nom) }); nom.value = doc.nom; sauverOutil(); });
    surClic("o-enregistrer", function () {
      telecharger(nomFichier(def, doc, "json"), OM.fichier(def, doc), "application/json");
      msg.textContent = "Fichier enregistré. Pour le rouvrir : « Ouvrir un fichier », sur la page de l'outil.";
    });
    surClic("o-dupliquer", function () {
      var d = creerDoc(def, "Copie de " + nomDoc(doc), JSON.parse(JSON.stringify(doc.contenu)));
      outilsMessage = outilsMessage || "Copie faite : tu travailles maintenant sur la copie.";
      location.hash = "#/outils/" + def.id + "/" + d.id;
    });
    surClic("o-supprimer", function () {
      if (!confirm("Supprimer « " + nomDoc(doc) + " » ? C'est définitif.")) return;
      supprimerDoc(doc.id);
      outilsMessage = "Document supprimé.";
      location.hash = "#/outils/" + def.id;
    });
  }

  // L'éditeur, selon le type de l'outil (tableau, matrice, document). lecture : l'exemple, sans champs.
  function htmlEditeur(def, c, lecture, auj) {
    var parent = OM.parentDe(def, c, auj);
    if (def.type === "tableau") return htmlZone(def, "", c.lignes, lecture, parent);
    if (def.type === "matrice") return htmlMatrice(def, c, lecture);
    return def.rubriques.map(function (r) { return htmlRubrique(r, c.rubriques[r.id], lecture, parent); }).join('');
  }
  // Un tableau (l'outil, ou une rubrique « tableau » d'un document) : un tableau sur PC ; une carte par ligne quand la
  // place manque, sur téléphone (modeZones). Chaque champ a son étiquette, visible sur les cartes.
  function htmlZone(t, r, lignes, lecture, parent) {
    var nomL = OM.ligneDef(t).titre, aides = t.colonnes.filter(function (c) { return c.aide; });
    // Les aides des colonnes, une seule fois au-dessus du tableau (une liste ou une date n'a pas de texte d'attente).
    var html = (lecture || !aides.length ? '' : '<details class="o-aides"><summary>Comment remplir les colonnes</summary><ul>' +
      aides.map(function (c) { return '<li><strong>' + esc(c.titre) + ' :</strong> ' + fmt(c.aide) + '</li>'; }).join('') + '</ul></details>') +
      '<div class="o-zone" data-min="' + largeurMin(t.colonnes) + '"><table class="o-table"><thead><tr><th class="o-n">N°</th>' +
      t.colonnes.map(function (c) { return '<th>' + esc(c.titre) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      lignes.map(function (l, i) { return htmlLigneZone(t, r, l, i, lecture, parent); }).join('') + '</tbody></table></div>';
    if (!lignes.length) html += '<p class="muted">Aucune ligne.</p>';
    if (!lecture) html += '<div class="actions o-ajout"><button type="button" class="btn ghost small" data-action="ajouter-ligne" data-r="' +
      esc(r) + '">+ ' + esc(nomL) + '</button></div>';
    if ((t.totaux || []).length) html += '<div class="o-totaux" data-totaux="' + esc(r) + '"></div>' +
      (t.aideTotaux ? '<p class="muted o-aide-totaux">' + fmt(t.aideTotaux) + '</p>' : '');
    return html;
  }
  function teteLigne(nomL, i, r, lecture) {
    return '<td class="o-n o-plein"><span class="o-num"><span class="o-cartes-seul">' + esc(nomL) + ' </span>' + (i + 1) + '</span>' +
      ' <span class="o-marque" hidden>Alerte</span>' + (lecture ? '' : ' <button type="button" class="lien danger o-suppr" ' +
      'data-action="suppr-ligne" data-r="' + esc(r) + '" data-l="' + i + '" aria-label="Supprimer : ' + esc(nomL) + ' ' + (i + 1) + '">Supprimer</button>') + '</td>';
  }
  function htmlLigneZone(t, r, l, i, lecture, parent) {
    var calc = OM.calculerLigne(t.colonnes, l, parent);
    return '<tr data-r="' + esc(r) + '" data-l="' + i + '">' + teteLigne(OM.ligneDef(t).titre, i, r, lecture) + t.colonnes.map(function (c) {
      var id = "o-" + (r ? r + "-" : "") + i + "-" + c.id, large = c.type === "texte" || c.type === "texte-long";
      var td = '<td class="o-t-' + c.type + (large ? ' o-plein' : '') + '">';
      if (c.type === "calcul") return td + '<span class="o-lib">' + esc(c.titre) + '</span><span class="o-calc" data-c="' + esc(c.id) + '">' +
        htmlCalcul(c, calc) + '</span></td>';
      if (lecture) return td + '<span class="o-lib">' + esc(c.titre) + '</span><span class="o-val">' + valeurLue(c, l[c.id], calc.couleurs[c.id]) +
        badge(calc.niveaux[c.id]) + '</span></td>';
      return td + '<label class="o-lib" for="' + id + '">' + esc(c.titre) + '</label>' +
        champHtml(c, l[c.id], id, 'data-champ="cellule" data-r="' + esc(r) + '" data-l="' + i + '" data-c="' + esc(c.id) + '"', calc.couleurs[c.id]) +
        (c.niveaux ? '<span class="o-calc" data-c="' + esc(c.id) + '">' + badge(calc.niveaux[c.id]) + '</span>' : '') + '</td>';
    }).join('') + '</tr>';
  }
  // Une valeur calculée : un nombre (2,5), ou une date (15/03/2027) pour un calcul qui donne une date ; vide : « — ».
  function htmlCalcul(c, calc) {
    var v = calc.valeurs[c.id];
    return v === null || v === undefined ? '<span class="muted">—</span>' : esc(OM.texteResultat(c, v)) + badge(calc.niveaux[c.id]);
  }
  // Un niveau : toujours un mot, avec sa couleur.
  function badge(nv) {
    return nv ? ' <span class="o-niveau o-' + esc(nv.couleur || "neutre") + '">' + esc(nv.libelle) + '</span>' : '';
  }
  // Une valeur en lecture (l'exemple) ; un choix qui a une couleur s'écrit sur sa couleur.
  function valeurLue(c, v, couleur) {
    var t = OM.texteValeur(c, v);
    return couleur ? '<span class="o-niveau o-' + esc(couleur) + '">' + esc(t) + '</span>' : esc(t);
  }
  // couleur : celle du choix (couleurs: [...]) ; la liste se colore, le mot reste écrit dedans.
  // La hauteur d'une zone de texte : tout son contenu visible (environ 40 caractères par ligne), de 2 à 8 lignes.
  function lignesTexte(v) {
    var n = String(v || "").split("\n").reduce(function (t, l) { return t + Math.max(1, Math.ceil(l.length / 40)); }, 0);
    return Math.min(8, Math.max(2, n));
  }
  // sansAttente : l'aide est déjà écrite sous l'étiquette (rubrique d'un document), pas en texte d'attente.
  function champHtml(c, v, id, attrs, couleur, sansAttente) {
    var base = ' id="' + id + '" ' + attrs, aide = c.aide && !sansAttente ? ' placeholder="' + esc(c.aide) + '"' : '';
    v = v === undefined || v === null ? "" : v;
    if (c.type === "texte-long") return '<textarea' + base + aide + ' rows="' + lignesTexte(v) + '" maxlength="' + OM.MAX.texteLong + '">' + esc(v) + '</textarea>';
    if (c.type === "date") return '<input type="date"' + base + ' value="' + esc(v) + '">';
    if (c.type === "nombre") return '<input type="text" inputmode="decimal"' + base + aide + ' value="' + esc(String(v).replace(".", ",")) + '">';
    if (c.type === "choix") {
      var k = OM.indexValeur(c.valeurs, v);
      return '<select' + base + (couleur ? ' class="o-c-' + esc(couleur) + '"' : '') + '><option value="">—</option>' + c.valeurs.map(function (x, j) {
        return '<option value="' + esc(String(x)) + '"' + (j === k ? ' selected' : '') + '>' + esc(OM.texteChoix(c, j)) + '</option>';
      }).join('') + '</select>';
    }
    return '<input type="text"' + base + aide + ' maxlength="' + OM.MAX.texte + '" value="' + esc(v) + '">';
  }
  // La matrice : les colonnes que l'élève ajoute (personnes…), puis une ligne par livrable, une valeur par case.
  function htmlMatrice(def, c, lecture) {
    var nomC = def.colonne.titre, html = '';
    if (!lecture) html = '<section class="o-rubrique"><h2 class="o-h2">' + esc(def.colonne.pluriel || nomC + "s") + '</h2>' +
      (def.colonne.aide ? '<p class="muted">' + fmt(def.colonne.aide) + '</p>' : '') + '<ul class="o-items">' + c.colonnes.map(function (n, k) {
        return '<li><label class="o-lib" for="o-col-' + k + '">' + esc(nomC) + ' ' + (k + 1) + '</label><input type="text" id="o-col-' + k +
          '" data-champ="colonne" data-k="' + k + '" maxlength="' + OM.MAX.nom + '" value="' + esc(n) + '" placeholder="' + esc(nomC) + ' ' + (k + 1) + '">' +
          '<button type="button" class="lien danger" data-action="suppr-colonne" data-k="' + k + '" aria-label="Supprimer : ' + esc(nomC) + ' ' +
          (k + 1) + '">Supprimer</button></li>';
      }).join('') + '</ul><div class="actions o-ajout"><button type="button" class="btn ghost small" data-action="ajouter-colonne">+ ' +
      esc(nomC) + '</button></div></section>';
    return html + '<section class="o-rubrique"><h2 class="o-h2">' + esc(def.ligne.pluriel || def.ligne.titre + "s") + '</h2>' +
      (def.aides ? '<ul class="o-legende">' + def.valeurs.map(function (v, k) {
        return '<li><strong>' + esc(v) + '</strong> = ' + esc(def.libelles ? def.libelles[k] : v) + ' : ' + fmt(def.aides[k]) + '</li>';
      }).join('') + '</ul>' : '<p class="o-legende">' + def.valeurs.map(function (v, k) {
        return '<strong>' + esc(v) + '</strong> = ' + esc(def.libelles ? def.libelles[k] : v);
      }).join(' · ') + '</p>') + '<div id="o-matrice">' + htmlMatriceTable(def, c, lecture) + '</div>' +
      (lecture ? '' : '<div class="actions o-ajout"><button type="button" class="btn ghost small" data-action="ajouter-ligne" data-r="">+ ' +
        esc(def.ligne.titre) + '</button></div>') + '</section>';
  }
  function htmlMatriceTable(def, c, lecture) {
    var nomL = def.ligne.titre, choix = { type: "choix", valeurs: def.valeurs };
    var noms = c.colonnes.map(function (n, k) { return n || def.colonne.titre + " " + (k + 1); });
    return '<div class="o-zone o-matrice" data-min="' + (270 + 64 * noms.length) + '"><table class="o-table"><thead><tr><th class="o-n">N°</th>' +
      '<th>' + esc(nomL) + '</th>' + noms.map(function (n) { return '<th class="o-case">' + esc(n) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      c.lignes.map(function (l, i) {
        return '<tr data-r="" data-l="' + i + '">' + teteLigne(nomL, i, "", lecture) + '<td class="o-plein">' +
          (lecture ? '<span class="o-lib">' + esc(nomL) + '</span><span class="o-val">' + esc(l.nom) + '</span>' :
            '<label class="o-lib" for="o-m-' + i + '">' + esc(nomL) + '</label><input type="text" id="o-m-' + i + '" data-champ="nom-ligne" data-l="' + i +
            '" maxlength="' + OM.MAX.nom + '" value="' + esc(l.nom) + '"' + (def.ligne.aide ? ' placeholder="' + esc(def.ligne.aide) + '"' : '') + '>') + '</td>' +
          noms.map(function (n, k) {
            var id = "o-m-" + i + "-" + k;
            return '<td class="o-case' + (lecture && OM.estVide(l.cases[k]) ? ' o-vide' : '') + '">' + (lecture ?
              '<span class="o-lib">' + esc(n) + '</span><span class="o-val">' + esc(l.cases[k] || "") + '</span>' :
              '<label class="o-lib" for="' + id + '">' + esc(n) + '</label>' + champHtml(choix, l.cases[k], id, 'data-champ="case" data-l="' + i + '" data-k="' + k + '"')) + '</td>';
          }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>' + (c.lignes.length ? '' : '<p class="muted">Aucune ligne.</p>');
  }
  // Une rubrique d'un document : un champ, une liste (une ligne par élément) ou un tableau.
  function htmlRubrique(r, v, lecture, parent) {
    var id = "o-r-" + r.id, titre = '<h2 class="o-h2">' + esc(r.titre) + '</h2>';
    if (r.type === "tableau") return '<section class="o-rubrique">' + titre + (r.aide && !lecture ? '<p class="muted">' + fmt(r.aide) + '</p>' : '') +
      htmlZone(r, r.id, v, lecture, parent) + '</section>';
    if (r.type === "liste") {
      var nomL = OM.ligneDef(r).titre, items = v.filter(function (x) { return !OM.estVide(x); });
      if (lecture) return '<section class="o-rubrique">' + titre + (items.length ? '<ul class="points o-val">' + items.map(function (x) {
        return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '<p class="muted">—</p>') + '</section>';
      return '<section class="o-rubrique">' + titre + (r.aide ? '<p class="muted">' + fmt(r.aide) + '</p>' : '') + '<ul class="o-items">' +
        v.map(function (x, k) {
          return '<li><label class="o-lib" for="' + id + '-' + k + '">' + esc(nomL) + ' ' + (k + 1) + '</label><textarea id="' + id + '-' + k +
            '" data-champ="item" data-r="' + esc(r.id) + '" data-i="' + k + '" rows="2" maxlength="' + OM.MAX.texte + '">' + esc(x) + '</textarea>' +
            '<button type="button" class="lien danger" data-action="suppr-item" data-r="' + esc(r.id) + '" data-i="' + k + '" aria-label="Supprimer : ' +
            esc(nomL) + ' ' + (k + 1) + '">Supprimer</button></li>';
        }).join('') + '</ul><div class="actions o-ajout"><button type="button" class="btn ghost small" data-action="ajouter-item" data-r="' +
        esc(r.id) + '">+ ' + esc(nomL) + '</button></div></section>';
    }
    if (lecture) return '<div class="o-rubrique o-champ"><p class="label">' + esc(r.titre) + '</p><p class="o-val">' +
      (OM.estVide(v) ? '—' : valeurLue(r, v, OM.couleurChoix(r, v))) + '</p></div>';
    return '<div class="o-rubrique o-champ"><label for="' + id + '">' + esc(r.titre) + '</label>' +
      (r.aide ? '<p class="muted o-aide" id="' + id + '-aide">' + fmt(r.aide) + '</p>' : '') +
      champHtml(r, v, id, 'data-champ="rubrique" data-r="' + esc(r.id) + '"' + (r.aide ? ' aria-describedby="' + id + '-aide"' : ''),
        OM.couleurChoix(r, v), true) + '</div>';
  }
  // La largeur (px) sous laquelle un tableau passe en cartes : la somme des largeurs utiles de ses colonnes
  // (une liste de choix : la largeur de son plus long choix).
  function largeurMin(cols) {
    return cols.reduce(function (t, c) {
      if (c.type === "choix") return t + 34 + 8.5 * Math.max.apply(null, c.valeurs.map(function (v, k) { return OM.texteChoix(c, k).length; }));
      return t + ({ "texte-long": 150, texte: 110, date: 140, nombre: 80, calcul: c.niveaux ? 120 : OM.estDateCalculee(c) ? 90 : 70 }[c.type] || 110);
    }, 70);
  }
  function modeZones() {
    Array.prototype.forEach.call(app.querySelectorAll(".o-zone[data-min]"), function (z) {
      var cartes = z.clientWidth < Number(z.getAttribute("data-min"));
      if (z.classList.contains("o-cartes") !== cartes) z.classList.toggle("o-cartes", cartes);
    });
  }

  // La saisie : le document est mis à jour, les calculs et les alertes aussi, et tout est enregistré tout de suite.
  function brancherEditeur() {
    var ed = document.getElementById("o-editeur");
    if (!ed || !outilCourant || outilCourant.lecture) return;
    ed.addEventListener("input", function (e) { surSaisie(e.target); });
    ed.addEventListener("change", function (e) { surSaisie(e.target); });
    ed.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("[data-action]") : null;
      if (b && ed.contains(b)) surAction(b);
    });
  }
  function rubriqueDe(def, r) { return (def.rubriques || []).filter(function (x) { return x.id === r; })[0] || null; }
  function tableauDe(def, r) { return r ? rubriqueDe(def, r) : def; }
  function lignesDe(def, c, r) { return r ? c.rubriques[r] : c.lignes; }
  function colonneDe(t, id) { return t ? t.colonnes.filter(function (x) { return x.id === id; })[0] || null : null; }
  function valeurChamp(c, el) {
    var v = el.value;
    if (c.type === "choix") { var k = OM.indexValeur(c.valeurs, v); return k < 0 ? "" : c.valeurs[k]; }
    if (c.type === "date") return OM.jour(v) === null ? "" : v;
    if (c.type === "nombre") {
      var n = OM.lireNombre(v), faux = v.trim() !== "" && n === null;
      el.classList.toggle("o-invalide", faux);
      if (faux) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
      return n === null ? "" : n;
    }
    return v.slice(0, c.type === "texte-long" ? OM.MAX.texteLong : OM.MAX.texte);
  }
  function surSaisie(el) {
    var oc = outilCourant, champ = el.getAttribute ? el.getAttribute("data-champ") : null;
    if (!oc || oc.lecture || !champ) return;
    var def = oc.def, c = oc.doc.contenu, r = el.getAttribute("data-r") || "";
    var l = Number(el.getAttribute("data-l")), k = Number(el.getAttribute("data-k")), i = Number(el.getAttribute("data-i"));
    if (champ === "cellule") {
      var t = tableauDe(def, r), col = colonneDe(t, el.getAttribute("data-c")), ligne = (lignesDe(def, c, r) || [])[l];
      if (!col || !ligne) return;
      ligne[col.id] = valeurChamp(col, el);
      colorer(el, col, ligne[col.id]);
      majCalculs(t, r, l, ligne);
    } else if (champ === "rubrique") {
      var rub = rubriqueDe(def, r);
      if (rub) { c.rubriques[r] = valeurChamp(rub, el); colorer(el, rub, c.rubriques[r]); majTousCalculs(); }
    } else if (champ === "item") {
      if (c.rubriques[r]) c.rubriques[r][i] = el.value.slice(0, OM.MAX.texte);
    } else if (champ === "nom-ligne") {
      if (c.lignes[l]) c.lignes[l].nom = el.value.slice(0, OM.MAX.nom);
    } else if (champ === "case") {
      if (c.lignes[l]) c.lignes[l].cases[k] = valeurChamp({ type: "choix", valeurs: def.valeurs }, el);
    } else if (champ === "colonne") {
      c.colonnes[k] = el.value.slice(0, OM.MAX.nom);
      nommerColonne(def, k, c.colonnes[k]);
    }
    majSuivi();
    sauverOutil();
  }
  // Renommer une colonne de la matrice : l'en-tête et les étiquettes changent sur place (refaire le tableau ferait perdre
  // la case que l'élève vient de cliquer).
  function nommerColonne(def, k, nom) {
    var t = nom || def.colonne.titre + " " + (k + 1), th = app.querySelectorAll("#o-matrice th.o-case")[k];
    if (th) th.textContent = t;
    Array.prototype.forEach.call(app.querySelectorAll("#o-matrice tbody tr"), function (tr) {
      var td = tr.querySelectorAll("td.o-case")[k], lib = td ? td.querySelector(".o-lib") : null;
      if (lib) lib.textContent = t;
    });
  }
  // Un choix qui a des couleurs : la liste prend la couleur de la valeur choisie.
  function colorer(el, c, v) {
    if (!c.couleurs || el.tagName !== "SELECT") return;
    el.className = el.className.replace(/\bo-c-\S+/g, "").trim();
    var couleur = OM.couleurChoix(c, v);
    if (couleur) el.classList.add("o-c-" + couleur);
  }
  function majCalculs(t, r, l, ligne) {
    var tr = app.querySelector('#o-editeur tr[data-r="' + r + '"][data-l="' + l + '"]'), oc = outilCourant;
    if (!tr || !oc) return;
    var calc = OM.calculerLigne(t.colonnes, ligne, OM.parentDe(oc.def, oc.doc.contenu, oc.auj));
    Array.prototype.forEach.call(tr.querySelectorAll(".o-calc"), function (s) {
      var col = colonneDe(t, s.getAttribute("data-c"));
      if (col) s.innerHTML = col.type === "calcul" ? htmlCalcul(col, calc) : badge(calc.niveaux[col.id]);
    });
  }
  // Une rubrique a changé (une tolérance, un plafond…) : les calculs des tableaux qui la lisent sont refaits.
  function majTousCalculs() {
    var oc = outilCourant;
    if (!oc || oc.def.type !== "document") return;
    Array.prototype.forEach.call(app.querySelectorAll("#o-editeur tr[data-r]"), function (tr) {
      var r = tr.getAttribute("data-r"), l = Number(tr.getAttribute("data-l")), t = tableauDe(oc.def, r), ligne = (lignesDe(oc.def, oc.doc.contenu, r) || [])[l];
      if (t && ligne) majCalculs(t, r, l, ligne);
    });
  }
  // Les totaux sous chaque tableau (un total peut avoir un niveau : mot et couleur), la marque « Alerte » des lignes,
  // et les alertes en phrases sous le document.
  function majSuivi() {
    var oc = outilCourant;
    if (!oc) return;
    var s = OM.suivi(oc.def, oc.doc.contenu, oc.auj);
    Array.prototype.forEach.call(app.querySelectorAll("[data-totaux]"), function (z) {
      var r = z.getAttribute("data-totaux"), t = s.totaux.filter(function (x) { return x.rubrique === r; });
      z.innerHTML = t.length ? '<p class="label">Totaux</p><ul class="o-liste">' + t.map(function (x) {
        return '<li>' + esc(x.libelle) + ' : <strong>' + esc(x.texte) + '</strong>' + badge(x.niveau) + '</li>';
      }).join('') + '</ul>' : '';
    });
    Array.prototype.forEach.call(app.querySelectorAll("#o-editeur tr[data-l]"), function (tr) {
      var r = tr.getAttribute("data-r") || "", l = Number(tr.getAttribute("data-l")), m = tr.querySelector(".o-marque");
      if (m) m.hidden = !s.alertes.some(function (a) { return a.rubrique === r && a.ligne === l; });
    });
    var boite = document.getElementById("o-alertes");
    if (boite) boite.innerHTML = !OM.aDesAlertes(oc.def) ? '' : s.alertes.length ?
      '<div class="o-alertes"><p class="label">Alertes</p><ul>' + s.alertes.map(function (a) { return '<li>' + esc(a.texte) + '</li>'; }).join('') + '</ul></div>' :
      '<p class="o-sans-alerte">Aucune alerte.</p>';
  }
  function sauverOutil() {
    var oc = outilCourant;
    if (!oc || oc.lecture) return;
    var ok = enregistrerDoc(oc.doc), etat = document.getElementById("o-etat");
    if (etat) {
      etat.textContent = ok ? "Enregistré dans ce navigateur à chaque saisie. Rien n'est envoyé." : STOCKAGE_KO;
      etat.className = ok ? "muted o-local" : "o-avertir o-local";
    }
  }
  // Ajouter ou supprimer une ligne, une colonne (matrice), un élément de liste : l'éditeur est refait.
  function surAction(b) {
    var oc = outilCourant;
    if (!oc || oc.lecture) return;
    var def = oc.def, c = oc.doc.contenu, a = b.getAttribute("data-action"), r = b.getAttribute("data-r") || "", focus = "";
    var l = Number(b.getAttribute("data-l")), k = Number(b.getAttribute("data-k")), i = Number(b.getAttribute("data-i"));
    if (a === "ajouter-ligne") {
      var max = (def.type === "matrice" ? c.lignes : lignesDe(def, c, r)).length >= OM.MAX.lignes;
      if (max) { limite(b, "Limite atteinte : " + OM.pluriel(OM.ligneDef(def.type === "matrice" ? def : tableauDe(def, r)), OM.MAX.lignes) + " au plus."); return; }
      if (def.type === "matrice") {
        c.lignes.push({ nom: "", cases: c.colonnes.map(function () { return ""; }) });
        focus = "#o-m-" + (c.lignes.length - 1);
      } else {
        var ls = lignesDe(def, c, r);
        ls.push(OM.ligneVide(tableauDe(def, r).colonnes));
        focus = '#o-editeur tr[data-r="' + r + '"][data-l="' + (ls.length - 1) + '"] [data-champ]';
      }
    } else if (a === "suppr-ligne") {
      var liste = def.type === "matrice" ? c.lignes : lignesDe(def, c, r);
      var remplie = def.type === "matrice" ? !OM.estVide(liste[l]) : OM.ligneRemplie(tableauDe(def, r).colonnes, liste[l]);
      if (remplie && !confirm("Supprimer la ligne " + (l + 1) + " ? Ce qu'elle contient sera perdu.")) return;
      liste.splice(l, 1);
      focus = '#o-editeur [data-action="ajouter-ligne"][data-r="' + r + '"]';
    } else if (a === "ajouter-colonne") {
      if (c.colonnes.length >= OM.MAX.colonnes) { limite(b, "Limite atteinte : " + OM.pluriel(def.colonne, OM.MAX.colonnes) + " au plus."); return; }
      c.colonnes.push("");
      c.lignes.forEach(function (x) { x.cases.push(""); });
      focus = "#o-col-" + (c.colonnes.length - 1);
    } else if (a === "suppr-colonne") {
      var pleine = !OM.estVide(c.colonnes[k]) || c.lignes.some(function (x) { return !OM.estVide(x.cases[k]); });
      if (pleine && !confirm("Supprimer la colonne « " + (c.colonnes[k] || k + 1) + " » et ses cases ?")) return;
      c.colonnes.splice(k, 1);
      c.lignes.forEach(function (x) { x.cases.splice(k, 1); });
      focus = '#o-editeur [data-action="ajouter-colonne"]';
    } else if (a === "ajouter-item") {
      if (c.rubriques[r].length >= OM.MAX.items) { limite(b, "Limite atteinte : " + OM.pluriel(OM.ligneDef(rubriqueDe(def, r)), OM.MAX.items) + " au plus."); return; }
      c.rubriques[r].push("");
      focus = "#o-r-" + r + "-" + (c.rubriques[r].length - 1);
    } else if (a === "suppr-item") {
      if (!OM.estVide(c.rubriques[r][i]) && !confirm("Supprimer cette ligne ? Ce qu'elle contient sera perdu.")) return;
      c.rubriques[r].splice(i, 1);
      focus = '#o-editeur [data-action="ajouter-item"][data-r="' + r + '"]';
    } else return;
    document.getElementById("o-editeur").innerHTML = htmlEditeur(def, c, false, oc.auj);
    modeZones();
    majSuivi();
    sauverOutil();
    var cible = focus ? app.querySelector(focus) : null;
    if (cible) cible.focus();
  }
  // Une limite atteinte (300 lignes, 40 colonnes, 100 éléments) : rien n'est ajouté, un message le dit sous le bouton.
  function limite(b, texte) {
    var zone = b.parentNode, m = zone.nextElementSibling;
    if (!m || !m.classList.contains("o-limite")) {
      m = document.createElement("p");
      m.className = "o-limite o-avertir";
      m.setAttribute("role", "status");
      zone.parentNode.insertBefore(m, zone.nextSibling);
    }
    m.textContent = texte;
  }
  // Imprimer / PDF : le document mis en forme (le même HTML que Copier) ; le CSS d'impression n'imprime que lui.
  function remplirImpression() {
    var z = document.getElementById("o-impression"), oc = outilCourant;
    if (!z || !oc) return;
    z.className = "o-impression" + (oc.def.type === "document" ? "" : " o-paysage");
    z.innerHTML = OM.htmlDocument(oc.def, oc.doc);
  }
  window.addEventListener("beforeprint", remplirImpression);
  window.addEventListener("resize", modeZones);

  // ---------- Routeur ----------
  // Chaque entrée de l'historique garde sa place (history.state.place) : on sait si l'élève recule, avance, ou ouvre une
  // nouvelle page. Page Équipe avec des changements pas encore validés (ou en cours d'envoi) : une question avant de
  // partir ; « Annuler » ramène sur l'entrée de la page Équipe, sans étape en plus ni en moins dans l'historique.
  var placeHisto = 0;
  function route() {
    var h = location.hash.replace(/^#\/?/, ""), st = history.state;
    var place = st && typeof st.place === "number" ? st.place : null, nouvelle = place === null;
    if (nouvelle) place = placeHisto + 1;
    if (equipe && (nbAttente() || equipe.envoi)) {
      if (h === "equipe") return;   // toujours la page Équipe (retour après « Annuler », synchro) : on garde tout
      if (!confirm(texteQuitter())) {
        try { history.go(nouvelle ? -1 : placeHisto - place); } catch (e) { /* ignoré */ }
        return;
      }
    }
    if (nouvelle) { try { history.replaceState({ place: place }, ""); } catch (e) { /* ignoré */ } }
    placeHisto = place;
    numeroPage++;
    equipe = null;
    document.body.style.paddingBottom = "";   // (la barre de la page Équipe)
    document.documentElement.style.scrollPaddingBottom = "";
    var parts = h.split("/");
    window.scrollTo(0, 0);
    outilCourant = null;
    app.classList.remove("large");
    document.body.classList.remove("o-imprimable");
    if (parts[0] !== "compte") messageCompte = "";
    if (parts[0] === "quiz" && parts[1]) demarrerQuiz(parts[1], parts[2], parts[3]);
    else if (parts[0] === "cours" && parts[1]) pageCours(parts[1]);
    else if (parts[0] === "fiche" && parts[1]) pageCours(parts[1], true);
    else if (parts[0] === "revision") pageRevision(parts[1]);
    else if (parts[0] === "resultat") pageResultat();
    else if (parts[0] === "erreurs") pageErreurs();
    else if (parts[0] === "historique") pageHistorique();
    else if (parts[0] === "export") pageExport();
    else if (parts[0] === "p" && parts[1]) pageParcours(parts[1], parts[2]);
    else if (parts[0] === "compte") pageCompte();
    else if (parts[0] === "mentions") pageLegale("Mentions légales", "mentions");
    else if (parts[0] === "confidentialite") pageLegale("Confidentialité", "confidentialite");
    else if (parts[0] === "equipe") pageEquipe(parts[1]);
    else if (parts[0] === "dico") pageDico(parts[1]);
    else if (parts[0] === "types") pageTypes(parts[1] ? decoder(parts[1]) : "");
    else if (parts[0] === "astuces") pageAstuces(parts[1] ? decoder(parts[1]) : "");
    else if (parts[0] === "architecte") pageArchitecte(parts[1] ? decoder(parts[1]) : "");
    else if (parts[0] === "copilote") pageCopilote(parts[1] ? decoder(parts[1]) : "");
    else if (parts[0] === "traduire") pageTraduire();
    else if (parts[0] === "mots-reserves") pageMotsReserves();
    else if (parts[0] === "outils") {
      if (parts[1]) pageOutil(decoder(parts[1]), parts[2] ? decoder(parts[2]) : "");
      else pageOutils();
    }
    else pageAccueil();
  }
  window.addEventListener("hashchange", route);
  // Recharger ou fermer la page avec des changements de la page Équipe pas encore validés (ou en cours d'envoi) : le
  // navigateur demande.
  window.addEventListener("beforeunload", function (e) {
    if (!nbAttente() && !(equipe && equipe.envoi)) return;
    var t = texteQuitter();
    e.preventDefault();
    e.returnValue = t;
    return t;
  });
  // Revenir sur l'onglet = récupérer ce qui a été fait sur un autre appareil.
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && lireSession()) synchroniserPuisAfficher();
  });
  lireRetourEmail().then(function () {
    majNav();
    route();
    if (lireSession()) synchroniserPuisAfficher();
  });
})();
