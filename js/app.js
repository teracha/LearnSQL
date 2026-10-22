(function () {
  "use strict";

  var DATA = window.LEARNSQL;
  var STORE_KEY = "learnsql-v1";
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

  function ecrire(s) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch (e) { /* ignoré */ }
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
      return store.questions[id].dernier === false && questionParId(id);
    });
  }

  function statsModule(store, id) {
    var t = store.tentatives.filter(function (x) { return x.module === id; });
    if (!t.length) return null;
    var meilleure = Math.max.apply(null, t.map(function (x) { return x.note; }));
    return { nb: t.length, meilleure: meilleure, derniere: t[t.length - 1].note };
  }

  // ---------- Pages ----------
  function pageAccueil() {
    var store = lire();
    var html = '<h1>Ton parcours SQL</h1>' +
      '<p class="muted">SQL Server et Snowflake. Fais les modules dans l\'ordre. Refais-les jusqu\'à 16/20.</p>';

    var nbErr = idsEnErreur(store).length;
    if (nbErr) {
      html += '<div class="card"><strong>' + nbErr + ' question(s) à revoir.</strong> ' +
        '<a href="#/erreurs">Refaire mes erreurs</a></div>';
    }

    DATA.modules.forEach(function (m, i) {
      var qs = DATA.questions[m.id];
      var st = statsModule(store, m.id);
      var droite = !qs ? '<div class="note"><small>À venir</small></div>'
        : st ? '<div class="note ' + classeNote(st.meilleure) + '">' + fmtNote(st.meilleure) +
               '<small>meilleure · ' + st.nb + ' essai(s)</small></div>'
        : '<div class="note"><small>' + qs.length + ' questions</small></div>';
      var debut = qs ? '<a class="card module" href="#/quiz/' + m.id + '" style="text-decoration:none;color:inherit">'
                     : '<div class="card module locked">';
      var fin = qs ? '</a>' : '</div>';
      html += debut +
        '<div class="num">' + (i + 1) + '</div>' +
        '<div><h3>' + esc(m.titre) + '</h3><p>' + esc(m.resume) + '</p>' +
        '<div class="tags"><span class="tag">' + esc(m.niveau) + '</span></div></div>' +
        droite + fin;
    });

    html += '<p class="muted">Un module « À venir » ? Demande au prof de le créer : <code>/qcm</code> dans Claude Code.</p>';
    app.innerHTML = html;
  }

  function demarrerQuiz(id) {
    var questions, titre;
    if (id === "erreurs") {
      questions = idsEnErreur(lire()).map(questionParId);
      titre = "Mes erreurs";
    } else {
      var m = module(id);
      questions = DATA.questions[id];
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
        '<p><strong>À retenir :</strong> ' + fmt(q.retenir) + '</p></div>' +
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
        .map(function (r) { return { id: r.id, choisi: r.choisi }; })
    };
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

    if (t.erreurs.length) {
      html += '<h2>Tes erreurs</h2><ul class="recap">';
      t.erreurs.forEach(function (e) {
        var q = questionParId(e.id);
        if (q) html += '<li><strong>' + esc(q.q) + '</strong><br><span class="muted">À retenir : ' + fmt(q.retenir) + '</span></li>';
      });
      html += '</ul>';
    }
    html += '<div class="actions">' +
      '<a class="btn" href="#/quiz/' + esc(t.module) + '">Refaire</a>' +
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
      html += '<div class="card"><span class="tag">' + esc(module(id.slice(0, 3)).titre) + '</span>' +
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
      l.push("- " + fmtDate(t.date) + " · " + t.titre + " · " + fmtNote(t.note) +
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

  // ---------- Routeur ----------
  function route() {
    var h = location.hash.replace(/^#\/?/, "");
    var parts = h.split("/");
    window.scrollTo(0, 0);
    if (parts[0] === "quiz" && parts[1]) demarrerQuiz(parts[1]);
    else if (parts[0] === "resultat") pageResultat();
    else if (parts[0] === "erreurs") pageErreurs();
    else if (parts[0] === "historique") pageHistorique();
    else if (parts[0] === "export") pageExport();
    else pageAccueil();
  }
  window.addEventListener("hashchange", route);
  route();
})();
