// Parcours « Maîtriser les outils du chef de projet » — Fiche de cours du module ot03 « Outils pour décider ».
// Une section par outil de l'étape « Décider » (data/outils/sujets.js), dans l'ordre : gp-options, gp-decisions,
// gp-changements, gp-moscow. Pas de nouvelle notion : on apprend à SE SERVIR des outils (quoi faire, comment le faire sur
// le site). Les règles et les mots sont ceux des outils et de leurs cours, mot pour mot : cp03, cp17, cp18 (note de
// décision), cp09 (registre des décisions), cp10 (registre des changements), cp18 (MoSCoW). Boutons et zones de l'écran :
// bloc « Outils » de js/app.js (Nouveau, « + Option », « + Décision », « + Demande », Alertes, Totaux, Copier,
// Télécharger en Excel). Chiffres des exemples : ceux des exemples des outils, recalculés avec le moteur (js/outils.js) :
// changements acceptés 7 jours et 5 250 € au 8 avril 2027 ; MoSCoW 5 jours de « doit » sur 10, 50 %, « Dans le repère ».
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi).
LEARNSQL.cours.ot03 = {
  intro: "Le plus souvent, ce n'est pas toi qui décides : tu prépares la décision, tu la traces, et tu la fais respecter. Ici, tu apprends à te servir des 4 outils de l'étape « Décider » du menu Outils : la note de décision, le registre des décisions, le registre des changements et MoSCoW (le tri en « doit », « devrait », « pourrait », « pas cette fois »). Sur ta démat fiscale à 15 personnes, ou ta migration Divalto, où étaient écrites les décisions, et qui pouvait les retrouver 3 mois après ?",
  sections: [
    {
      titre: "Note de décision : options chiffrées",
      exemple: "Mardi 2 février 2027, projet DEMAT 2027. Le responsable ADV (administration des ventes) veut la référence chantier sur les factures : des litiges chez 3 clients pisciniers.\nC'est la demande n° 7 : 4 jours d'intégrateur, environ 3 000 €, 15 tests à refaire.\nCe n'est pas dans ta délégation : elle touche le budget.\nLe DAF (directeur administratif et financier, ton sponsor) décidera au COPIL (comité de pilotage) du mardi 9. Tu lui prépares une note de décision.",
      regle: "Une note de décision prépare un choix qui n'est pas le tien. Elle donne au décideur tout ce qu'il faut pour trancher vite : la question, sa date limite, les faits, et plusieurs options avec leur prix. « Ne rien changer » est toujours une option, avec son propre coût. Tu recommandes, mais le décideur choisit : la note montre que le choix est réel.",
      points: [
        "À quoi elle sert : préparer une décision qui n'est pas à toi. Les faits, 2 ou 3 options avec leur prix, et ta recommandation. Quand : avant de demander une décision au sponsor, au COPIL, à ton DSI (directeur des systèmes d'information) ou au manager d'un autre service.",
        "Sur le site : `Nouveau`. L'option « A. Ne rien changer » est déjà écrite. Remplis de haut en bas : décision attendue, date limite, qui décide, faits, impact. `+ Option` pour B et C, puis ta recommandation. Plus d'alerte ? `Copier`, et tu colles la note dans ton e-mail.",
        "La règle : la décision attendue et sa date d'abord, puis les faits, l'impact, les options, ta recommandation. Chaque option a son prix : délai, coût, risque. Le décideur choisit.",
        "Le piège : une seule option. L'alerte le dit : « Une seule option : ce n'est pas un choix. » Autre piège : « Ne rien changer » sans prix. Ne rien faire coûte aussi : ici, les litiges continuent.",
        "Le bon réflexe : avant d'écrire, une question. Est-ce dans ma délégation ? Oui : tu décides et tu informes, sans note. Après la décision, remplis « Décision prise » (quoi, par qui, quand), puis le registre des décisions."
      ],
      retenir: "Une note de décision : la question et sa date d'abord, les faits, 2 ou 3 options avec leur prix (dont « ne rien changer »), ta recommandation. Le décideur choisit."
    },
    {
      titre: "Registre des décisions",
      exemple: "Mardi 30 mars 2027, 10 h. Le DAF, au téléphone : « D'accord pour 3 jours d'intégrateur de plus, pour les flux EDI (échange de données informatisé). »\nL'après-midi, il signe la commande des 3 jours.\nLe soir, tu lui écris : « Comme convenu ce matin : 3 jours de plus pour les flux EDI. »\nPuis une ligne au registre : 30/03/2027 · commande de 3 jours · le DAF · Téléphone · + 2 250 € · Écrit (mail).",
      regle: "Le registre des décisions est la mémoire du projet : chaque décision, sa date, qui l'a prise et son impact. Une décision orale s'oublie ou se conteste ; écrite le jour même, elle tient. Le registre évite aussi de rediscuter sans fin : une décision écrite ne se refait pas, sauf fait nouveau. Il complète la note de décision (avant) et le compte rendu (pendant).",
      points: [
        "À quoi il sert : garder une trace de chaque décision. La date, la décision, qui l'a prise, l'impact. Quand : après chaque COPIL, et après chaque décision prise au téléphone, dans un couloir ou par mail.",
        "Sur le site : un registre par projet, avec `Nouveau`. Une ligne par décision, avec `+ Décision`. « Où » : COPIL, séance courte, téléphone, couloir, mail. « Trace écrite » : compte rendu, écrit (mail), ou à faire. Sous le tableau, le total « Trace écrite à faire ».",
        "La règle : une ligne par décision du sponsor, du COPIL ou d'un A du RACI (le tableau des rôles : A = celui qui approuve un livrable), où qu'elle soit prise. Les choix d'équipe restent dans les actions du point projet.",
        "Le piège : la décision orale, jamais écrite. Elle sera contestée. Tant que « Trace écrite » est vide ou « À faire », l'alerte reste : « Fais confirmer cette décision par écrit, le jour même. »",
        "Le bon réflexe : une décision écrite ne se refait pas au COPIL suivant, sauf fait nouveau. Quelqu'un la rediscute ? Tu montres sa ligne. `Télécharger en Excel` garde le registre hors du site."
      ],
      retenir: "Chaque décision, même de couloir : une ligne au registre et un écrit le jour même. Elle ne se refait pas, sauf fait nouveau."
    },
    {
      titre: "Registre des changements",
      exemple: "Jeudi 8 avril 2027. Ton registre des changements compte 5 demandes.\nN° 7 (référence chantier) et n° 9 (code magasin) : acceptées par le DAF au COPIL du 9 février. N° 14 : refusée. N° 15 et n° 16 : « Pas maintenant », chacune avec sa date.\nSous le tableau : « Acceptées : jours » 7, « Acceptées : coût (€) » 5 250, « À décider » 0.",
      regle: "Un projet change toujours ; le danger, c'est qu'il change sans que personne l'ait décidé. Le registre des changements fait passer chaque demande par le même chemin : son impact chiffré, une décision de la bonne personne, puis le travail. Il garde aussi les refus et les reports. Son total des changements acceptés montre la dérive, que chaque petit oui, pris seul, cache.",
      points: [
        "À quoi il sert : suivre chaque demande de changement, son impact, la décision, et le total déjà accepté. Quand : dès qu'une demande touche le périmètre, le budget, une date validée ou un contrat. Le total se montre à chaque COPIL.",
        "Sur le site : `+ Demande`. Le n°, le demandeur, la demande (qui, quoi, pourquoi, pour quand), les jours, le coût, les autres impacts. « Décision » vaut « À décider » au départ ; puis « Acceptée », « Pas maintenant » ou « Refusée », avec qui et quand.",
        "La règle : trie d'abord. Non conforme à l'écrit : une anomalie, pas un changement. Dans ta délégation : tu décides et tu informes. Sinon : la demande au registre, son impact, la note de décision, la décision de la bonne personne, la commande ou l'avenant signé. Seulement après, le travail.",
        "Le piège : la dérive par petits pas. Dix petits oui que personne n'a décidés font une grosse décision. Une demande « À décider » sans chiffre ? L'alerte : « l'impact d'abord, puis la décision ».",
        "Le bon réflexe : le registre garde tout, un refus aussi, dit au demandeur avec sa raison. « Pas maintenant » s'écrit avec une date. Au COPIL : les demandes à décider, et le total accepté. C'est le total qui montre la dérive."
      ],
      retenir: "Le registre garde chaque demande, même refusée, et fait le total de ce qui est accepté : c'est le total qui montre la dérive."
    },
    {
      titre: "MoSCoW : trier les demandes",
      exemple: "Février 2027. L'enveloppe des écrans de la compta : 10 jours d'intégrateur, fixée par le DAF.\nSix demandes, 12 jours en tout : l'état des factures bloquées (2 jours), l'état des rejets (3), les avoirs en attente (3), un tri par site (1), un total des avoirs (1), une alerte par mail (2).\nLa cheffe comptable, PO (product owner : celle qui classe le backlog, la liste des demandes), trie avec toi.\nRésultat : 5 jours de « doit » sur 10, 50 %, « Dans le repère ». L'alerte par mail : « pas cette fois », pour le 1er juillet.",
      regle: "MoSCoW sert à trier quand il y a plus de demandes que de place. Chaque demande reçoit une classe : doit, devrait, pourrait, ou pas cette fois. Les critères s'écrivent avant de comparer, et la loi passe avant tout. Si tout devient « doit », le tri ne protège plus la date : il faut garder de la marge dans les classes du dessous. Un « pas cette fois » n'est pas un refus : il reçoit une date.",
      points: [
        "À quoi il sert : trier des demandes pour une place limitée : une itération, une enveloppe de jours, la bascule (la mise en service). Quand : dès que plusieurs demandes veulent la même place.",
        "Sur le site : écris ce qu'on trie et la place, en jours. Les critères sont déjà écrits : relis-les avant de comparer. `+ Demande` : le demandeur, le pourquoi, l'effort en jours (estimé par celui qui fera le travail), la classe. Sous le tableau : l'effort prévu, la part du « doit » et son niveau.",
        "La règle : la loi d'abord, c'est un filtre, pas un critère qu'on pèse. « Doit » : sans lui, la bascule échoue. « Devrait » : important, contournable. « Pourrait » : confort. « Pas cette fois » : écrit, avec une date.",
        "Le piège : tout mettre en « doit ». Repère de DSDM (une méthode agile) : pas plus d'environ 60 % de l'effort en « doit », compté sur la place. Au-delà, l'outil dit « Au-delà du repère » : rien ne protège la date. Refais le tri : « sans elle, la bascule échoue-t-elle ? »",
        "Le bon réflexe : tu proposes le classement avec les métiers ; dans une partie agile, la PO classe. Le sponsor valide les « doit », et tranche en cas de désaccord. Chaque « pas cette fois » se dit au demandeur, avec sa date."
      ],
      retenir: "MoSCoW : des critères écrits avant, la loi d'abord, au plus environ 60 % de la place en « doit », et chaque « pas cette fois » avec une date."
    }
  ]
};
