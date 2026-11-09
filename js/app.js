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
          return change || droits() !== avant;
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
    var equipe = document.getElementById("lien-equipe");
    if (equipe) equipe.hidden = !(s && (s.role === "admin" || s.role === "formateur"));
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

  // Règle : sans compte, seulement les parcours publics. Admin : tout.
  // Sinon, chaque niveau de la chaîne doit être ouvert à tous, ou à un de mes groupes.
  function accesOK(chaine) {
    var s = lireSession();
    if (!s) return (DATA.parcoursPublics || []).indexOf(chaine[0]) >= 0;
    if (s.role === "admin") return true;
    var regles = s.acces || [], mes = s.groupeIds || [];
    return chaine.every(function (el) {
      var r = regles.filter(function (x) { return x.element === el; });
      return !r.length || r.some(function (x) { return mes.indexOf(x.groupe_id) >= 0; });
    });
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
    var droite = !qs ? '<div class="note"><small>À venir</small></div>'
      : st ? '<div class="note ' + classeNote(st.meilleure) + '">' + fmtNote(st.meilleure) +
             '<small>meilleure · ' + st.nb + ' essai(s)</small></div>'
      : '<div class="note"><small>' + Math.min(TAILLE_QCM, qs.length) + ' questions</small></div>';
    var boutons = (DATA.cours[m.id] ? '<a class="btn small ghost" href="#/cours/' + m.id + '">Cours</a>' : '') +
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
    var detail = !prets.length && !nbSous ? 'À venir'
      : (nbSous ? nbSous + ' sous-parcours · ' : '') + ids.length + ' modules';
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

  function pageCours(id) {
    var m = module(id);
    var c = DATA.cours[id];
    if (!m || !c || !moduleVisible(id)) { location.hash = "#/"; return; }
    var html = '<p class="muted">Cours · Module ' + numeroModule(id) + '</p>' +
      '<h1>' + esc(m.titre) + '</h1>' +
      '<p>' + fmt(c.intro) + '</p>';
    // Hors SQL, l'exemple est une situation en texte : police normale, retour à la ligne.
    var sql = chaineModule(id)[0] === "sql";
    var balise = sql ? '<pre class="code">' : '<pre class="code texte">';
    c.sections.forEach(function (sec, i) {
      html += '<h2>' + (i + 1) + '. ' + esc(sec.titre) + '</h2><div class="card">' +
        (sec.exemple ? '<p class="label">Exemple</p>' + balise + (sql ? esc(sec.exemple) : fmt(sec.exemple)) + '</pre>' : '') +
        (sec.resultat ? resultatCours(sec.resultat) : '') +
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
    html += '<div class="actions">' +
      (DATA.questions[id] ? '<a class="btn" href="#/quiz/' + id + '">Faire le QCM</a>' : '') +
      '<a class="btn ghost" href="#/p/' + chaineModule(id).join('/') + '">Retour au parcours</a></div>';
    app.innerHTML = html;
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
      '<div class="actions"><button type="button" class="btn" id="lancer">Lancer la révision</button></div>';
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
    html += '<div class="actions">' +
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
          document.getElementById("form-mdp").reset();
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
        sessionValide().then(function (sv) {
          return appelSupa("/rest/v1/rpc/supprimer_mon_compte", { methode: "POST", corps: {} }, sv.access_token);
        }).then(function () {
          ecrireSession(null);
          etatSync = "";
          if (confirm("Compte supprimé. Effacer aussi tes notes de CET appareil ?")) {
            try { localStorage.removeItem(STORE_KEY); } catch (e) { /* ignoré */ }
          }
          messageCompte = "Ton compte a été supprimé.";
          majNav();
          pageCompte();
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
      majNav();
      messageCompte = "Connecté. Ta progression de cet appareil est ajoutée à ton compte.";
      synchroniser().then(pageCompte);
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

  function tableauPersonnes(liste, eq) {
    if (!liste.length) return '<p class="muted">Personne dans ce groupe.</p>';
    var html = '<div class="card"><table><thead><tr><th>Personne</th><th>QCM</th><th>Moyenne</th><th>Dernier QCM</th></tr></thead><tbody>';
    liste.forEach(function (p) {
      var r = resumePersonne(eq.prog[p.user_id] || videStore());
      html += '<tr><td><a href="#/equipe/' + esc(p.user_id) + '">' + esc(p.email) + '</a>' +
        (p.role !== "agent" ? ' <span class="tag">' + esc(p.role) + '</span>' : '') +
        (estInactif(p) ? ' <span class="tag inactif">Inactif depuis plus de 2 ans</span>' : '') + '</td>' +
        '<td>' + r.nb + '</td>' +
        '<td>' + (r.nb ? '<strong class="' + classeNote(r.moy) + '">' + fmtNote(r.moy) + '</strong>' : '—') + '</td>' +
        '<td>' + (r.nb ? esc(r.der.titre) + ' · <span class="' + classeNote(r.der.note) + '">' + fmtNote(r.der.note) + '</span><br><small class="muted">' + fmtDate(r.der.date) + '</small>' : '—') + '</td></tr>';
    });
    return html + '</tbody></table></div>';
  }

  function pageEquipe(cible) {
    var s = lireSession();
    if (!s || (s.role !== "admin" && s.role !== "formateur")) { location.hash = "#/compte"; return; }
    app.innerHTML = '<h1>Équipe</h1><p class="muted">Chargement…</p>';
    chargerEquipe(s).then(function (eq) {
      if (cible) afficherPersonne(eq, cible);
      else afficherEquipe(eq, s);
    }, function (e) {
      app.innerHTML = '<h1>Équipe</h1><p>Chargement impossible : ' + esc(e.message) + '</p>';
    });
  }

  function afficherEquipe(eq, s) {
    var admin = s.role === "admin";
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
      html += gestionAdmin(eq, s);
    }
    app.innerHTML = html;
    if (admin) brancherGestion(s);
  }

  function gestionAdmin(eq, s) {
    var html = '<h2>Gérer</h2>' +
      '<form id="form-groupe" class="card form"><label for="nom-groupe">Nouveau groupe</label>' +
      '<input id="nom-groupe" required maxlength="60" placeholder="Ex. : Compta">' +
      '<div class="actions"><button type="submit" class="btn">Créer le groupe</button></div></form>' +
      '<div class="card"><table><thead><tr><th>Personne</th><th>Rôle</th><th>Groupes</th><th>Dernière activité</th></tr></thead><tbody>';
    eq.profils.forEach(function (p) {
      html += '<tr><td>' + esc(p.email) + '</td><td><select data-role="' + esc(p.user_id) + '">' +
        ["agent", "formateur", "admin"].map(function (r) {
          return '<option' + (r === p.role ? ' selected' : '') + '>' + r + '</option>';
        }).join('') + '</select></td><td>';
      eq.groupes.forEach(function (g) {
        var dedans = eq.membres.some(function (m) { return m.groupe_id === g.id && m.user_id === p.user_id; });
        html += '<label class="case"><input type="checkbox" data-membre="' + esc(p.user_id) + '" value="' + g.id + '"' +
          (dedans ? ' checked' : '') + '> ' + esc(g.nom) + '</label>';
      });
      html += (eq.groupes.length ? '' : '<small class="muted">Crée d\'abord un groupe.</small>') + '</td>' +
        '<td>' + (p.activite ? fmtDate(p.activite) : '—') +
        (estInactif(p) ? '<br><span class="tag inactif">Inactif + 2 ans</span>' : '') +
        (p.user_id !== s.id ? '<br><button type="button" class="lien danger" data-suppr-compte="' + esc(p.user_id) +
          '" data-email="' + esc(p.email) + '">Supprimer le compte</button>' : '') + '</td></tr>';
    });
    html += '</tbody></table></div><p id="msg-equipe" class="muted"></p>';
    html += '<h2>Droits des parcours</h2><p class="muted">Aucune case cochée = ouvert à tous les connectés. ' +
      'Pour un sous-parcours, il faut aussi avoir accès au parcours au-dessus.</p><div class="card"><table><tbody>';
    noeuds().forEach(function (x) {
      var regles = eq.acces.filter(function (a) { return a.element === x.n.id; });
      html += '<tr><td>' + (x.chaine.length > 1 ? '<span class="muted">↳ </span>' : '<strong>') + esc(x.n.titre) +
        (x.chaine.length > 1 ? '' : '</strong>') + '<br><small class="muted">' +
        (regles.length ? 'Réservé' : 'Ouvert à tous') + '</small></td><td>';
      eq.groupes.forEach(function (g) {
        var coche = regles.some(function (a) { return a.groupe_id === g.id; });
        html += '<label class="case"><input type="checkbox" data-acces="' + esc(x.n.id) + '" value="' + g.id + '"' +
          (coche ? ' checked' : '') + '> ' + esc(g.nom) + '</label>';
      });
      html += '</td></tr>';
    });
    html += '</tbody></table></div>';
    if (eq.groupes.length) {
      html += '<p class="muted">Supprimer un groupe (les personnes restent, seul le groupe disparaît) :</p><div class="actions">' +
        eq.groupes.map(function (g) {
          return '<button type="button" class="btn small ghost" data-suppr="' + g.id + '">' + esc(g.nom) + ' ✕</button>';
        }).join('') + '</div>';
    }
    return html;
  }

  function brancherGestion(s) {
    var msg = document.getElementById("msg-equipe");
    function ecrireBase(chemin, methode, corps) {
      msg.textContent = "Enregistrement…";
      return appelSupa("/rest/v1/" + chemin, {
        methode: methode, corps: corps, entetes: { Prefer: "return=minimal" }
      }, s.access_token).then(function () { pageEquipe(); }, function (e) {
        msg.textContent = "Impossible : " + e.message;
      });
    }
    document.getElementById("form-groupe").addEventListener("submit", function (e) {
      e.preventDefault();
      var nom = document.getElementById("nom-groupe").value.trim();
      if (nom) ecrireBase("groupe", "POST", { nom: nom });
    });
    app.querySelectorAll("[data-role]").forEach(function (sel) {
      sel.addEventListener("change", function () {
        var id = sel.getAttribute("data-role");
        if (id === s.id && sel.value !== "admin" &&
            !confirm("Tu vas perdre tes droits d'admin. Continuer ?")) { sel.value = "admin"; return; }
        ecrireBase("profil?user_id=eq." + id, "PATCH", { role: sel.value });
      });
    });
    app.querySelectorAll("[data-membre]").forEach(function (c) {
      c.addEventListener("change", function () {
        var u = c.getAttribute("data-membre");
        if (c.checked) ecrireBase("membre", "POST", { groupe_id: Number(c.value), user_id: u });
        else ecrireBase("membre?groupe_id=eq." + c.value + "&user_id=eq." + u, "DELETE");
      });
    });
    app.querySelectorAll("[data-acces]").forEach(function (c) {
      c.addEventListener("change", function () {
        var el = c.getAttribute("data-acces");
        if (c.checked) ecrireBase("acces", "POST", { element: el, groupe_id: Number(c.value) });
        else ecrireBase("acces?element=eq." + encodeURIComponent(el) + "&groupe_id=eq." + c.value, "DELETE");
      });
    });
    app.querySelectorAll("[data-suppr-compte]").forEach(function (b) {
      b.addEventListener("click", function () {
        var email = b.getAttribute("data-email");
        if (prompt("Supprimer définitivement le compte " + email + " ?\nTape son adresse e-mail pour confirmer.") !== email) return;
        msg.textContent = "Suppression…";
        appelSupa("/rest/v1/rpc/supprimer_compte", { methode: "POST", corps: { cible: b.getAttribute("data-suppr-compte") } }, s.access_token)
          .then(function () { pageEquipe(); }, function (e) { msg.textContent = "Impossible : " + e.message; });
      });
    });
    app.querySelectorAll("[data-suppr]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (confirm("Supprimer ce groupe ?")) ecrireBase("groupe?id=eq." + b.getAttribute("data-suppr"), "DELETE");
      });
    });
  }

  function afficherPersonne(eq, id) {
    var p = eq.profils.filter(function (x) { return x.user_id === id; })[0];
    if (!p) { app.innerHTML = '<h1>Équipe</h1><p>Personne introuvable.</p><a class="btn ghost" href="#/equipe">Retour</a>'; return; }
    var store = eq.prog[id] || videStore();
    var html = '<h1>' + esc(p.email) + '</h1>';
    var r = resumePersonne(store);
    if (!r.nb) {
      app.innerHTML = html + '<p>Pas encore de QCM.</p><a class="btn ghost" href="#/equipe">Retour</a>';
      return;
    }
    html += '<p>Moyenne : <strong class="' + classeNote(r.moy) + '">' + fmtNote(r.moy) + '</strong> sur ' + r.nb +
      ' QCM · ' + idsEnErreur(store).length + ' question(s) à revoir.</p>' +
      '<h2>Par module</h2><div class="card"><table><thead><tr><th>Module</th><th>Essais</th><th>Meilleure</th><th>Dernière</th></tr></thead><tbody>';
    DATA.modules.forEach(function (m, i) {
      var st = statsModule(store, m.id);
      if (st) html += '<tr><td>' + (i + 1) + '. ' + esc(m.titre) + '</td><td>' + st.nb + '</td>' +
        '<td class="' + classeNote(st.meilleure) + '"><strong>' + fmtNote(st.meilleure) + '</strong></td>' +
        '<td class="' + classeNote(st.derniere) + '">' + fmtNote(st.derniere) + '</td></tr>';
    });
    html += '</tbody></table></div><h2>Tous les QCM</h2><div class="card"><table><thead><tr><th>Date</th><th>QCM</th><th>Note</th></tr></thead><tbody>';
    store.tentatives.slice().reverse().forEach(function (t) {
      html += '<tr><td>' + fmtDate(t.date) + '</td><td>' + esc(t.titre) + '</td>' +
        '<td class="' + classeNote(t.note) + '"><strong>' + fmtNote(t.note) + '</strong></td></tr>';
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
  var DICO_MOTS_VIDES = {};
  ("je j tu il elle on nous vous veux voudrais voudrai aimerais aimerai faire fait faut peux peut dois doit comment " +
   "quel quelle quels quelles est c ce cet cette ces que qu qui quoi un une des du de d la le les l au aux a et ou " +
   "sur dans pour par avec sans mon ma mes ton ta tes son sa ses en y ne pas sql requete requetes fonction fonctions " +
   "comme moi me te se ca cela ceci svp stp").split(" ").forEach(function (m) { DICO_MOTS_VIDES[m] = true; });
  var DICO_SUFFIXES = ["ement", "ation", "able", "euse", "eur", "ent", "ez", "er", "ir", "e"];
  var DICO_POIDS_CHAMP = 60;   // dico Divalto : un champ de la fiche (« PINO » → les tables qui l'ont), moins fort que son nom
  var dicoIndex = {};       // un index par domaine (« sql », « divalto ») : les deux dicos ne se mêlent pas
  var dicoMotsConnus = {};  // par domaine, les racines de tous les mots-clés : un mot connu (« valeurs ») n'est pas un nom mal tapé (« values »)
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
  function squelette(m) { return m.replace(/[aeiouy]/g, "").replace(/(.)\1+/g, "$1"); }
  // Distance d'édition (Levenshtein), arrêtée dès qu'elle dépasse max.
  function distance(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    var prec = [], cour, i, j;
    for (j = 0; j <= b.length; j++) prec[j] = j;
    for (i = 1; i <= a.length; i++) {
      cour = [i];
      var mini = i;
      for (j = 1; j <= b.length; j++) {
        cour[j] = Math.min(prec[j] + 1, cour[j - 1] + 1, prec[j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1));
        if (cour[j] < mini) mini = cour[j];
      }
      if (mini > max) return max + 1;
      prec = cour;
    }
    return prec[b.length];
  }

  // Le domaine d'une fiche : « divalto », ou « sql » (pas de domaine).
  function domaineFiche(f) { return f.domaine === "divalto" ? "divalto" : "sql"; }
  // Le nom d'un champ, pour la recherche (« ART.REF » → « art ref ») ; vide s'il n'a que des mots vides.
  function cleChamp(nom) {
    var mots = motsDe(nom || "");
    return mots.some(function (m) { return !DICO_MOTS_VIDES[m]; }) ? mots.join(" ") : "";
  }
  function nomsChamps(f) {
    var vus = {};
    (f.champs || []).forEach(function (c) { var k = Array.isArray(c) ? cleChamp(c[0]) : ""; if (k) vus[k] = true; });
    return Object.keys(vus);
  }

  // L'index d'un domaine (« sql » par défaut) : seulement ses fiches. Refait quand des fiches sont ajoutées.
  function indexDico(domaine) {
    domaine = domaine || "sql";
    var toutes = DATA.dico || [];
    if (dicoIndex[domaine] && dicoIndex[domaine].taille === toutes.length) return dicoIndex[domaine].liste;
    var liste = toutes.filter(function (f) { return domaineFiche(f) === domaine; }).map(function (f) {
      var noms = [f.nom].concat(f.noms || []);
      var cles = {}, def = {}, motsNoms = {};
      var expressions = [], phrasesCles = [];
      (f.motsCles || []).forEach(function (k) {
        var tous = motsDe(k);
        if (tous.length >= 2) phrasesCles.push(" " + tous.join(" ") + " ");
        var r = motsDe(k).filter(function (m) { return !DICO_MOTS_VIDES[m]; }).map(racine);
        r.forEach(function (m) { cles[m] = true; });
        if (r.length >= 2) expressions.push(r);
      });
      motsDe((f.definition || "") + " " + (f.categorie || "")).forEach(function (m) {
        if (m.length > 3 && !DICO_MOTS_VIDES[m]) def[racine(m)] = true;
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
        champs: domaine === "divalto" ? nomsChamps(f) : []
      };
    });
    // Un mot-clé rare (« aujourd ») compte plus qu'un mot-clé que beaucoup de fiches partagent (« date »).
    var freq = {}, connus = {};
    liste.forEach(function (x) { x.cles.forEach(function (k) { freq[k] = (freq[k] || 0) + 1; connus[k] = true; }); });
    liste.forEach(function (x) {
      x.poids = x.cles.map(function (k) { var n = freq[k]; return n <= 2 ? 45 : n <= 5 ? 40 : n <= 10 ? 32 : 25; });
    });
    dicoIndex[domaine] = { taille: toutes.length, liste: liste };
    dicoMotsConnus[domaine] = connus;
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

  // Note chaque fiche du domaine (« sql » par défaut) pour la question ; renvoie [{ fiche, score }], du plus proche
  // au moins proche.
  function chercherDico(question, domaine) {
    domaine = domaine || "sql";
    var brut = sansAccents(question).replace(/\s+/g, " ").trim();
    if (!brut) return [];
    var mots = motsDe(brut);
    var phrase = " " + mots.join(" ") + " ";
    var utiles = mots.filter(function (m) { return !DICO_MOTS_VIDES[m]; });
    if (!utiles.length) utiles = mots;
    var racines = {};
    utiles.forEach(function (m) { racines[racine(m)] = true; });
    var index = indexDico(domaine), connus = dicoMotsConnus[domaine];
    // Un mot qui touche le nom de beaucoup de fiches (« date ») ne départage rien : petit bonus.
    var combien = {};
    var seul = utiles.length === 1;   // un seul mot : « coa » peut être le début d'un nom
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
      // Dico Divalto : un champ de la fiche (« PINO » → les tables qui ont ce champ), moins fort que son nom.
      var nbChamps = x.champs.filter(function (c) { return phrase.indexOf(" " + c + " ") >= 0; }).length;
      score += Math.min(nbChamps, 2) * DICO_POIDS_CHAMP;
      utiles.forEach(function (m) {
        var b = bonusNom(m, x, seul, connus);
        // Fort si le mot désigne peu de fiches et n'est pas un mot courant noyé dans une phrase (« case vide »).
        if (b) score += combien[m] <= 2 && (seul || !connus[racine(m)]) ? b : 15;
        var r = racine(m), meilleur = 0;
        var tol = r.length >= 7 ? 2 : (r.length >= 4 ? 1 : 0), sq = squelette(r);
        for (var i = 0; i < x.cles.length; i++) {
          var k = x.cles[i];
          if (k === r) meilleur = Math.max(meilleur, x.poids[i] + (i === 0 ? 3 : i <= 2 ? 2 : i <= 5 ? 1 : 0)); // exact (les premiers mots-clés d'une fiche comptent un peu plus)
          else if (tol && distance(r, k, tol) <= tol) meilleur = Math.max(meilleur, 25);    // une faute ou deux
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
      return { fiche: x.fiche, score: score + expr };
    }).filter(function (r) { return r.score > 0; })
      .sort(function (a, b) {
        return b.score - a.score || rangModule(a.fiche) - rangModule(b.fiche) || a.fiche.nom.localeCompare(b.fiche.nom);
      });
  }
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
  function carteFiche(f, moteur, q) {
    var dv = domaineFiche(f) === "divalto";
    return '<a class="card fiche-res" href="#/dico/' + encodeURIComponent(f.id) + '"><div class="fiche-tete"><strong' +
      (dv && classeTitre(f) ? ' class="titre"' : '') + '>' +
      esc(f.nom) + '</strong><span class="tag">' + esc(f.type) + '</span><span class="tag">' + esc(f.categorie) +
      '</span></div><p>' + fmt(f.definition) + '</p>' + (dv ? champsCites(f, q) : syntaxeFiche(f, moteur)) + '</a>';
  }
  // Fiche Divalto trouvée par un de ses champs : la carte montre ce champ (« PINO : le numéro de la pièce »).
  function champsCites(f, q) {
    var phrase = " " + motsDe(q || "").join(" ") + " ";
    return (f.champs || []).filter(function (c) {
      var k = Array.isArray(c) ? cleChamp(c[0]) : "";
      return k && phrase.indexOf(" " + k + " ") >= 0;
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
          return '<h2>' + esc(c) + '</h2><div class="puces">' + cats[c].sort(parNom).map(function (f) {
            return '<a class="puce' + (dv ? classeTitre(f) : '') + '" href="#/dico/' + encodeURIComponent(f.id) + '">' + esc(f.nom) + '</a>';
          }).join('') + '</div>';
        }).join('');
    }
    var r = chercherDico(q, dv ? "divalto" : "sql");
    var bons = r.filter(function (x) { return x.score >= 25; }).slice(0, 8);
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

  function pageDico(id) {
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
      'Les fautes de frappe sont tolérées. Une requête entière à comprendre ? <a href="#/traduire">Traduire une requête</a>.</p>') +
      '<div class="dico-recherche"><input type="search" id="dico-q" autocomplete="off" spellcheck="false" ' +
      (dv ? 'placeholder="Ex. : lignes de commande, MOUV, PINO…" aria-label="Rechercher dans le dico Divalto">' :
      'placeholder="Ex. : chercher un caractère, COALESCE…" aria-label="Rechercher dans le dico">') + '</div>' +
      (dv ? '' : selecteurMoteurs(dicoMoteur())) + '<div id="dico-res"></div>';
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
      '<div class="tags"><span class="tag">' + esc(f.type) + '</span><span class="tag">' + esc(f.categorie) + '</span></div>' +
      '<p class="definition">' + fmt(f.definition) + '</p>' +
      selecteurMoteurs(dicoMoteur()) + '<div class="card" id="fiche-corps"></div>' +
      (voir.length ? '<h2>Voir aussi</h2><div class="puces">' + voir.map(function (v) {
        return '<a class="puce" href="#/dico/' + encodeURIComponent(v) + '">' + esc(parId[v].nom) + '</a>';
      }).join('') + '</div>' : '') +
      (mod && DATA.cours[f.module] ? '<p>Dans le cours : <a href="#/cours/' + esc(f.module) + '">' + esc(mod.titre) + '</a></p>' : '') +
      '<div class="actions"><a class="btn ghost" href="#/dico">Nouvelle recherche</a></div>';
    var rendre = function () {
      var m = dicoMoteur(), ex = f.exemples || {}, html = '<p class="label">Syntaxe</p>' + syntaxeFiche(f, m);
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
      document.getElementById("fiche-corps").innerHTML = html;
    };
    brancherMoteurs(rendre);
    rendre();
    retourOnglet("sql");
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
  // Le tableau « Les champs » (champ | sens) ; un champ qui a sa propre fiche Divalto devient un lien vers elle.
  function tableChamps(f) {
    var fiches = {};
    (DATA.dico || []).forEach(function (x) {
      if (x !== f && domaineFiche(x) === "divalto" && x.type === "champ") fiches[sansAccents(x.nom)] = x.id;
    });
    return '<p class="label">Les champs</p><table class="champs"><thead><tr><th>Champ</th><th>Sens</th></tr></thead><tbody>' +
      f.champs.map(function (c) {
        c = Array.isArray(c) ? c : [String(c), ""];
        var nom = '<code>' + esc(c[0]) + '</code>', id = fiches[sansAccents(c[0])];
        return '<tr><td>' + (id ? '<a href="#/dico/' + encodeURIComponent(id) + '">' + nom + '</a>' : nom) + '</td><td>' +
          fmt(c[1] || "") + '</td></tr>';
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
    if (r.fiches.length) html += '<h2>Dans le dico</h2><div class="puces">' + r.fiches.map(function (f) {
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
  function pageTraduire() {
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

  // ---------- Routeur ----------
  function route() {
    var h = location.hash.replace(/^#\/?/, "");
    var parts = h.split("/");
    window.scrollTo(0, 0);
    if (parts[0] !== "compte") messageCompte = "";
    if (parts[0] === "quiz" && parts[1]) demarrerQuiz(parts[1], parts[2], parts[3]);
    else if (parts[0] === "cours" && parts[1]) pageCours(parts[1]);
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
    else if (parts[0] === "traduire") pageTraduire();
    else pageAccueil();
  }
  window.addEventListener("hashchange", route);
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
