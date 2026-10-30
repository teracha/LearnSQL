// Chef de projet SI — Questions du module cp08 « Piloter et reporter ».
// Fond (PMBOK : suivre le travail réel contre la référence, prévision ; PRINCE2 : tolérances, rapport au sponsor quand
// une tolérance est menacée ; pratiques de PMO en PME / ETI : météo par axe, rapport d'une page, la « pastèque » ;
// agile : enveloppe fixe, prévision sur le contenu) : l'avancement réel (livrable fini = testé et accepté, 0 ou 1 ; reste
// à faire en jours, tâche par tâche, réestimé chaque semaine par celui qui fait ; jalon tenu = livrable complet et
// accepté ; prévu, réel, prévision ; la tendance) ; peu d'indicateurs (résultat et pas activité ; définition écrite
// unique, source, seuil fixé à l'avance ; la date des données ; vérifier avant de publier) ; le tableau de bord de
// l'équipe chaque semaine contre le rapport du DAF chaque mois ; la météo (vert dans les tolérances, orange = risque d'en
// sortir, rouge = hors tolérance ou seuil déjà perdu et décision du sponsor nécessaire, rouge jusqu'à sa décision, puis
// mesure contre la nouvelle date validée ; globale = l'axe le plus mauvais ; pas de pente douce ; ni maquiller, ni
// dramatiser) ; le rapport mensuel (décisions en tête, 5 plus gros risques, ligne budget, 3 jours ouvrés avant, chiffres datés,
// « aucune décision attendue », le rapport est le tien) ; l'alerte (le jour même, même si le rapport part bientôt ; pas
// dans la tolérance ; puis un plan d'actions daté, suivi chaque lundi) ; le suivi de la recette (cas joués et OK,
// bloquantes, prévision au rythme réel, date du PV avec sa condition, un pourcentage cache les bloquantes). Les
// pratiques divergent sur la météo globale (ici, règle du projet : l'axe le plus mauvais ; q18).
// Fil rouge DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Reporting (module cp08) » :
// rapport d'une page avec l'ordre du jour du COPIL, météo globale et par axe, jalons (prévu, réel, prévision), décisions
// attendues, 5 plus gros risques (cp07), ligne budget (cp12) ; vert / orange / rouge ; tolérances ± 2 semaines par jalon
// et budget sous 90 k€ ; alerte au DAF le jour même. Lignes « Gouvernance (cp09) » (COPIL le 2e mardi, rapport 3 jours
// avant, point projet chaque lundi), « Budget (cp12) » (fin mars : reste à faire 19 jours, atterrissage 43, commande de
// 3 jours signée le jour même ; référence 85,25 k€, atterrissage 87,5 k€, écart + 2,25 k€ : q24, q34), « Planning
// (cp05) » (recette du 16 mars à fin avril, PV le 30 avril, pilote en mai, bascule en juin ; report à mi-juillet =
// décision du DAF : q17, q26, q33), critères de succès (moins de 2 % de rejets le 1er mois : q23, q27).
// Faits ajoutés (cohérents avec la fiche et les modules publiés, à valider) : tableau de bord de 6 lignes, chacune avec
// sa source et son seuil, à jour chaque vendredi ; la globale = l'axe le plus mauvais (règle du modèle de rapport) ;
// 4 flux EDI (comme cp12-q20) ; outil de tickets = source des anomalies de recette (comme cp18-q18 : q09). Variantes
// propres à une question : connecteur livré le 1er mars sans les avoirs fournisseurs, correctif le 10 (q02) ; prévision du
// PV qui recule de 3 jours par semaine (q04) ; 6 écrans sur 9 de la partie agile (q05) ; 18 jours de l'intégrateur faits
// à la mi-mars (q06) ; 3,5 % de rejets au pilote, 40 fiches clients incomplètes (q23) ; PV prévu au 21 mai, 5 jours à
// commander (q25) ; contrôle fiscal de 4 semaines (q26) ; 4 % de rejets après la bascule (q27, à 0 % ensuite : 2,8 % sur
// le 1er mois, du 14 juin au 13 juillet) ; correctif des avoirs clients en juillet (q33) ; recette de 100 cas (q37) ; 3 bloquantes, PV le vendredi
// 30 avril (q38) ; factures EDI d'AquaBleu rejetées (q39). Autres projets : Snowflake + Power BI (q11, q12), WMS (q40).
// q15 et q40 à q42 : « Tu es DSI adjoint ».
// Affirmations juridiques hors fiche : aucune (pas de PV avec une anomalie bloquante : cp14 ; les pénalités, le DAF
// décide de les appliquer : cp12-q17).
// Déjà publiées ailleurs, pas reprises ici : cp01-q09 (orange quand la recette risque 3 semaines), cp01-q14 et cp12-q20
// (consommé contre travail fait), cp15-q08 (« encore 5 jours » : q01 porte sur la mesure du tableau de bord, pas sur ce
// qu'on demande au consultant), cp06-q17 (« fini » en agile : q02 porte sur un jalon du contrat), cp04-q42 et cp18-q36
// (glissement dans la tolérance : q22 porte sur la ligne du jalon), cp07-q07 (5 risques au COPIL : q30 porte sur
// lesquels), cp17-q05 (rapport trop long), cp17-q12, cp17-q15 et cp12-q25 (alerte avant le COPIL : q33 porte sur le rapport qui
// part dans 2 jours), cp17-q16 (rejets au pilote : q23 porte sur la couleur), cp09-q26 (3 jours ouvrés avant : q29 porte
// sur les chiffres datés et la version unique), cp12-q10 et q26 (la ligne budget : q24 porte sur la couleur), cp18-q18 (Excel ou tickets).
// Frontières : planifier = cp05 ; animer le COPIL, compte rendu, registre des décisions = cp09 ; la ligne budget = cp12 ;
// le registre des risques = cp07 ; les mots = cp17 ; l'escalade = cp16 ; ta délégation = cp18 ; la régie au point hebdo
// et le comité fournisseur = cp15 ; la stratégie de recette = cp19 ; le PV au contrat = cp14 ; la démarche = cp06.
// Anti-devinette : la bonne météo est verte dans q05, q16, q17, q22, q24 ; orange dans q04, q18, q20, q21, q23 ; rouge
// dans q25, q26, q27 ; pas de changement de couleur, mais une action, dans q16, q21, q22, q24. Alerter le DAF n'est juste
// que dans q26 et q33 (faux dans q10, q13, q14, q16, q20, q22, q23, q34, q35). La bonne réponse est un extrême dans
// 11 questions sur 42 : la plus douce (q22), la plus forte ou la plus complète quand elle se justifie (q01, q06, q08, q09,
// q12, q25, q26, q27, q30, q38). « Tout », « rien », « seul », « aucun », « jamais », « Oui », « D'accord »,
// « aujourd'hui », « dès », « le jour même », « tout de suite » sont aussi dans des bonnes réponses.
LEARNSQL.questions.cp08 = [
  {
    id: "cp08-q01",
    dialecte: "Gestion de projet",
    q: "Ton tableau de bord a une colonne « % d'avancement », remplie par chacun. Le flux EDI d'AquaBleu y est à 90 % depuis 3 semaines. Que changes-tu ?",
    choix: [
      "Fini ou pas, pour chaque livrable, et le reste à faire en jours",
      "Rien : chacun connaît son travail, et 90 %, c'est presque fini",
      "Le % des jours consommés, plus fiable que le % déclaré",
      "Tu gardes les %, mais datés ; on verra ce qui stagne"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un livrable compte 0 ou 1 : fini (testé et accepté) ou pas. Le reste à faire, en jours, tâche par tâche, dit ce qui manque vraiment.",
      "Non. Un « 90 % » qui dure 3 semaines ne dit rien : le dernier 10 % est souvent le plus long. Un pourcentage déclaré ne se vérifie pas.",
      "Non. Les jours consommés disent ce qui est dépensé, pas ce qui est fait. On peut consommer 60 % des jours pour 30 % du travail (module cp12).",
      "Non. Presque : la date montre que le chiffre stagne. Mais il reste déclaré : tu ne sais toujours ni ce qui est fini, ni ce qui reste."
    ],
    retenir: "L'avancement se mesure en livrables finis (0 ou 1) et en reste à faire en jours, pas en pourcentages déclarés."
  },
  {
    id: "cp08-q02",
    dialecte: "Gestion de projet",
    q: "1er mars, date du contrat : la PA livre le connecteur, mais les avoirs fournisseurs ne passent pas. Correctif promis le 10. Au rapport du COPIL du 9 mars, que dit ce jalon ?",
    choix: [
      "« Tenu : livré le 1er mars, correctif le 10 »",
      "« Raté : rouge, et pénalités de retard à appliquer »",
      "« Tenu à 90 % : jalon presque atteint, sauf les avoirs »",
      "« Pas tenu : prévision 10 mars, dans la tolérance »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Livré incomplet n'est pas livré : sans les avoirs, la recette ne peut pas tout tester. « Tenu » cache un retard.",
      "Non. 9 jours de retard restent dans la tolérance de ± 2 semaines : pas de rouge. Et les pénalités, c'est le DAF qui décide de les appliquer, contrat en main.",
      "Non. Presque : il manque peu. Mais un jalon n'a pas de pourcentage : tenu ou pas. Et les avoirs sont dans ce que le contrat prévoit.",
      "Oui. Un jalon est tenu quand son livrable est complet et accepté. Prévu : 1er mars ; réel : pas encore ; prévision : 10 mars. 9 jours, dans la tolérance."
    ],
    retenir: "Un jalon est tenu quand son livrable est complet et accepté, pas quand quelque chose est livré."
  },
  {
    id: "cp08-q03",
    dialecte: "Gestion de projet",
    q: "Ton DSI : « Pourquoi redemander le reste à faire chaque lundi ? Prends le plan, moins les jours passés : c'est plus simple. » Que lui réponds-tu ?",
    choix: [
      "« D'accord, et je le referai si le consultant signale un souci »",
      "« Non : chaque lundi, celui qui fait réestime, tâche par tâche »",
      "« D'accord : le plan est validé, c'est lui qui fait foi »",
      "« Non : je le refais moi-même chaque lundi, tâche par tâche »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le refaire, oui, mais pas seulement sur signal : un « presque fini » ne s'annonce pas. Chaque lundi, tu le redemandes.",
      "Oui. Le reste à faire, c'est le travail qui reste, réestimé chaque semaine par celui qui le fait. Toi, tu vérifies ce qui est vraiment fini.",
      "Non. Le plan dit ce qu'on pensait au départ. Le plan moins les jours passés, c'est ce qui reste du plan, pas ce qu'il faut pour finir.",
      "Non. Presque : chaque lundi, tâche par tâche, c'est juste. Mais tu n'estimes pas à sa place : c'est celui qui fait qui sait ce qui reste."
    ],
    retenir: "Le reste à faire se réestime chaque semaine, par celui qui fait : ce n'est pas le plan moins les jours passés."
  },
  {
    id: "cp08-q04",
    dialecte: "Gestion de projet",
    q: "Depuis 4 semaines, la prévision du PV de recette recule de 3 jours par semaine. Elle est à + 12 jours ; la tolérance est de ± 2 semaines. Quelle météo pour le délai ?",
    choix: [
      "Vert : + 12 jours, on reste dans la tolérance",
      "Rouge : la prévision recule depuis un mois",
      "Orange : + 15 jours lundi, à ce rythme",
      "Vert ; tu le diras au COPIL, si la tolérance est dépassée"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : aujourd'hui, c'est dans la tolérance. Mais à ce rythme, la prévision en sort lundi : c'est un risque, donc orange.",
      "Non. Rouge = déjà hors tolérance, avec une décision du sponsor à prendre. + 12 jours, c'est encore dedans.",
      "Oui. Orange = risque de sortir des tolérances. + 3 jours par semaine : + 15 jours lundi. Tu donnes la cause, l'impact sur le pilote, et ton plan.",
      "Non. Attendre le dépassement, c'est le subir. L'orange sert à agir avant, quand il reste des options."
    ],
    retenir: "Une prévision qui glisse chaque semaine vers la limite est un risque : orange, avant le dépassement."
  },
  {
    id: "cp08-q05",
    dialecte: "Gestion de projet",
    q: "Partie agile : l'enveloppe de 10 jours finit fin avril. Au rythme des démos, 6 écrans sur 9 seront acceptés ; les 3 derniers du backlog attendront. Que dit ton rapport ?",
    choix: [
      "Vert : 6 écrans sur 9 prévus fin avril, 3 en attente",
      "Orange ; 3 jours de plus d'ici fin avril, pour les 9 écrans",
      "Vert ; le contenu, c'est l'affaire de la compta",
      "Rouge : 6 écrans sur 9 ; 3 ne seront pas livrés"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Date et enveloppe tenues : vert. La prévision porte sur le contenu : 6 écrans, et les 3 du bas attendent, comme la cheffe comptable les a classés. Le COPIL le sait.",
      "Non. 3 jours de plus sortent de l'enveloppe : c'est une demande de changement, que le DAF décide. Ici, rien n'est en risque.",
      "Non. Presque : vert, c'est juste. Mais le COPIL doit savoir ce qui sera livré fin avril : sinon, il le découvre au pilote.",
      "Non. Dans la partie agile, la date et l'enveloppe sont fixes, le contenu varie. Les 3 du bas attendent : c'est la règle de la démarche, pas un retard (module cp06)."
    ],
    retenir: "Partie agile : date et enveloppe fixes. La prévision porte sur le contenu livré, et le rapport le dit."
  },
  {
    id: "cp08-q06",
    dialecte: "Gestion de projet",
    q: "Mi-mars. Le DAF, en couloir : « DEMAT, on en est à combien de pour cent ? » Que lui réponds-tu ?",
    choix: [
      "« 45 % : 18 jours de l'intégrateur faits sur 40 »",
      "« Je te réponds au COPIL : tout sera dans le rapport »",
      "« Environ 75 % : la moyenne de ce que chacun annonce »",
      "« Tous les jalons tenus ; prochain : la recette, le 16 mars »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Des jours consommés disent ce qui est dépensé, pas ce qui est fait. 45 % des jours peuvent cacher 30 % du travail.",
      "Non. Il pose une question simple, et tu as la réponse. Le faire attendre 4 semaines, c'est cacher un fait que tu connais.",
      "Non. Une moyenne de « presque fini » reste déclarative : elle ne dit ni ce qui est accepté, ni quand ce sera fini.",
      "Oui. L'avancement se dit en jalons et en livrables acceptés : prévu, réel, prévision. Le DAF sait où on en est, et ce qui vient."
    ],
    retenir: "Au sponsor, l'avancement se dit en jalons tenus et en prochain jalon, pas en pourcentage."
  },
  {
    id: "cp08-q07",
    dialecte: "Gestion de projet",
    q: "Tu bâtis le tableau de bord de DEMAT. La cheffe comptable propose 25 indicateurs : « Comme ça, on voit tout. » Que fais-tu ?",
    choix: [
      "Tu prends les 25 : plus on mesure, mieux on pilote",
      "Un seul : le pourcentage d'avancement, facile à lire",
      "Tu en gardes 6, chacun avec sa source et son seuil",
      "Tu en gardes 6 : ceux dont la source est simple"
    ],
    bonne: 2,
    pourquoi: [
      "Non. 25 chiffres, personne ne les lit, et le signal utile s'y perd. Chaque indicateur coûte aussi du temps à produire.",
      "Non. Un seul pourcentage cache la date, le budget et la qualité. Et il est souvent déclaratif.",
      "Oui. Peu d'indicateurs, chacun pour une décision : la date, le budget, la qualité. Chacun a sa source et son seuil, fixés à l'avance.",
      "Non. Presque : 6, c'est un bon nombre. Mais une source simple ne fait pas un indicateur utile : chacun doit servir une décision."
    ],
    retenir: "Peu d'indicateurs, choisis pour décider, chacun avec une source et un seuil."
  },
  {
    id: "cp08-q08",
    dialecte: "Gestion de projet",
    q: "Ton tableau de bord a une ligne « Adhésion de la compta : bonne ». C'est ton impression, après le dernier atelier. Que fais-tu de cette ligne ?",
    choix: [
      "Tu la gardes : l'adhésion compte autant que les chiffres",
      "Tu la remplaces par un fait : créneaux de recette tenus",
      "Tu la gardes, avec une note sur 10 de la cheffe comptable",
      "Tu la supprimes : l'adhésion des gens ne se mesure pas"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans source ni seuil, cette ligne dit ton humeur. Le jour où elle passe à « moyenne », personne ne saura pourquoi, ni quoi faire.",
      "Oui. Un fait, avec sa source (le planning de recette) et un seuil : par exemple, sous 9 créneaux sur 10 tenus, on agit. Il dit la même chose, sans débat.",
      "Non. Presque : une note a une source. Mais sans définition ni seuil, 6 sur 10 ne dit ni bien, ni mal, et dépend de l'humeur du jour.",
      "Non. Le sujet compte : sans la compta, pas de recette. Il se mesure, mais par un fait plutôt qu'une impression."
    ],
    retenir: "Une impression n'est pas un indicateur : un fait mesuré, avec une source et un seuil."
  },
  {
    id: "cp08-q09",
    dialecte: "Gestion de projet",
    q: "Vendredi. L'outil de tickets, ta source pour la recette : 7 anomalies bloquantes ouvertes. Le fichier Excel de Julie : 4. Le point projet est lundi. Que fais-tu ?",
    choix: [
      "Tu vois l'écart avec Julie, puis un seul chiffre",
      "Tu publies 4 : c'est Julie qui teste les factures fournisseurs",
      "Tu retires la ligne cette semaine, le temps de comprendre",
      "Tu publies les deux chiffres, et chacun se fera son avis"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un écart se comprend avant de publier : 3 tickets absents de son fichier, ou 3 corrigés pas encore fermés ? Lundi, un seul chiffre, celui de la source, expliqué.",
      "Non. Ta source, c'est l'outil de tickets. Et sans chercher l'écart, tu publies peut-être 3 bloquantes de moins qu'en vrai.",
      "Non. Les bloquantes sont l'indicateur clé de la recette : les cacher une semaine, c'est piloter à l'aveugle quand ça compte.",
      "Non. Deux chiffres sans explication : le point projet passera l'heure à débattre du bon, au lieu d'agir."
    ],
    retenir: "Deux sources ne disent pas pareil : tu cherches pourquoi avant de publier, puis un seul chiffre, celui de la source."
  },
  {
    id: "cp08-q10",
    dialecte: "Gestion de projet",
    q: "Le chef de projet de la PA t'écrit chaque semaine : « 120 heures passées sur votre connecteur. » Il veut ce chiffre dans ton rapport du COPIL, « comme preuve ». Que réponds-tu ?",
    choix: [
      "« D'accord : 120 heures, c'est la preuve qu'elle avance »",
      "« Non, et je demande au DAF des pénalités dès ce mois-ci »",
      "« D'accord, au COPIL, à côté des jalons, pour être complet »",
      "« Non : au COPIL, ce qui est livré, accepté, et quand »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Des heures disent l'effort, pas le résultat. On peut passer 120 heures sans rien livrer.",
      "Non. Il propose un mauvais indicateur : ce n'est pas une faute. Les pénalités se décident sur un retard au contrat, par le DAF.",
      "Non. Presque : les jalons y sont. Mais les heures donnent au COPIL un chiffre qui rassure sans rien prouver, et qui noie le reste.",
      "Oui. Le COPIL suit le résultat : le connecteur livré, testé, accepté, et sa date. Ses heures sont son affaire : le contrat achète un résultat."
    ],
    retenir: "On rapporte le résultat (livré, accepté, à quelle date), pas l'activité (heures, réunions)."
  },
  {
    id: "cp08-q11",
    dialecte: "Gestion de projet",
    q: "Ton projet Snowflake + Power BI. Lundi 9 h, le tableau des ventes affiche 0 € pour vendredi. La direction le lit à 10 h. Que fais-tu ?",
    choix: [
      "Rien : un chiffre de Snowflake ne se trompe jamais",
      "Tu coupes le tableau ; tu fais décaler la réunion",
      "Le chargement vérifié ; avant 10 h : « données à jeudi »",
      "Tu saisis le vrai montant à la main avant 10 h"
    ],
    bonne: 2,
    pourquoi: [
      "Non. 0 € un vendredi, c'est presque sûr un chargement raté. Un chiffre surprenant se vérifie avant d'être lu, même s'il vient de la source.",
      "Non. Le reste du tableau est juste. Une ligne d'avertissement suffit ; faire décaler la direction pour un chargement, c'est trop.",
      "Oui. D'abord la fraîcheur : le chargement de la nuit a-t-il marché ? Puis tu préviens avant 10 h : les données s'arrêtent à jeudi. Un tableau affiche toujours la date de ses données.",
      "Non. Un chiffre tapé à la main n'a plus de source : la prochaine fois, personne ne saura lequel croire."
    ],
    retenir: "Un tableau affiche la date de ses données ; un chiffre surprenant se vérifie à la source avant d'être lu."
  },
  {
    id: "cp08-q12",
    dialecte: "Gestion de projet",
    q: "Ton projet Power BI. Ton tableau : délai moyen de paiement des clients, 52 jours. Le contrôleur de gestion, dans son fichier : 47. Le DAF demande lequel est juste. Que fais-tu ?",
    choix: [
      "Tu donnes 47, et tu cales ton tableau sur son chiffre",
      "Tu vois l'écart avec lui, puis une définition écrite",
      "Tu retires l'indicateur du tableau, pour éviter le débat",
      "Tu donnes 52 : ton tableau lit Divalto directement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Presque : le contrôleur de gestion est le bon interlocuteur. Mais caler ton tableau sans comprendre l'écart ne règle rien : vous avez sûrement deux définitions (date de facture ou d'échéance ? avoirs comptés ?).",
      "Oui. Deux chiffres, c'est souvent deux définitions. Vous trouvez la différence, puis une définition écrite (calcul, source), validée par le DAF, la même partout.",
      "Non. Retirer l'indicateur évite le débat, pas le problème : le DAF en a besoin, et le contrôleur garde le sien.",
      "Non. Lire Divalto ne dit pas que le calcul est le bon. Sans définition commune, le débat reviendra chaque mois."
    ],
    retenir: "Un indicateur a une seule définition écrite, la même partout ; sinon, deux chiffres et un débat chaque mois."
  },
  {
    id: "cp08-q13",
    dialecte: "Gestion de projet",
    q: "Ton DSI : « Envoie au DAF, chaque lundi, le tableau de bord de l'équipe et ses 60 actions : 3 pages. Il verra tout. » Que proposes-tu ?",
    choix: [
      "« Le tableau reste à l'équipe ; au DAF, le rapport et les alertes »",
      "« D'accord : chaque lundi, le tableau de l'équipe, au DAF »",
      "« Non : le DAF n'a rien à voir avant le COPIL du mois »",
      "« D'accord, mais un lundi sur deux, pour ne pas l'encombrer »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Deux publics : le tableau, chaque semaine, pour que l'équipe agisse ; le rapport d'une page, chaque mois, pour que le DAF décide. Entre deux, ce qui ne peut pas attendre va au DAF le jour même.",
      "Non. 60 actions chaque semaine : le DAF ne les lira pas, et une vraie alerte s'y noiera.",
      "Non. Le détail, il n'en a pas besoin, c'est vrai. Mais ce qui ne peut pas attendre le COPIL part le jour même : une alerte, pas un tableau.",
      "Non. Presque : moins souvent, c'est moins de bruit. Mais 60 actions restent le détail de l'équipe : le DAF décide sur le rapport du mois, ou le jour même sur alerte."
    ],
    retenir: "Le tableau de bord, chaque semaine, pour l'équipe ; le rapport, chaque mois, pour le DAF ; l'alerte, le jour même."
  },
  {
    id: "cp08-q14",
    dialecte: "Gestion de projet",
    q: "Chaque dimanche soir, tu mets à jour seul le tableau de bord de l'équipe : 2 heures. Au point projet du lundi, personne ne l'a ouvert. Que changes-tu ?",
    choix: [
      "Tu continues seul, et tu le lis à voix haute chaque lundi",
      "Tu le tiens à jour, et tu l'envoies aussi au DAF",
      "Plus de tableau : personne ne le lit, 2 heures de gagnées",
      "Chacun met à jour ses lignes ; la réunion part du tableau"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu fais seul ce que chacun sait mieux : son reste à faire, ses anomalies. Le lire à voix haute ne le rend pas à eux : ils l'écoutent, sans le tenir.",
      "Non. Le DAF n'est pas le bon public : le détail de la semaine sert à l'équipe. Lui reçoit le rapport mensuel, et les alertes.",
      "Non. Sans tableau, le point projet repart des souvenirs de chacun. Le problème n'est pas le tableau : c'est qu'il n'est pas à eux.",
      "Oui. Celui qui fait met à jour ses lignes : reste à faire, anomalies, actions. Le point projet du lundi part du tableau : c'est l'outil de l'équipe, pour agir."
    ],
    retenir: "Le tableau de bord est l'outil de l'équipe : chacun met à jour ses lignes, et le point projet part de lui."
  },
  {
    id: "cp08-q15",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. 5 projets. Pour l'un, vert veut dire « on avance » ; pour un autre, « dans le budget » ; un 3e n'a pas de couleur. Que fais-tu ?",
    choix: [
      "Rien : chaque chef de projet connaît mieux son projet",
      "Tu demandes au DG un outil de reporting unique, pour tous",
      "Les mêmes définitions pour tous, contre les tolérances de chacun",
      "Tu refais toi-même les 5 rapports, avec tes définitions, chaque mois"
    ],
    bonne: 2,
    pourquoi: [
      "Non. La direction compare des couleurs qui ne veulent pas dire la même chose. Un vert « on avance » peut cacher un budget dépassé.",
      "Non. Le problème, ce sont les définitions, pas l'outil. Un outil commun, avec des définitions différentes, donne les mêmes couleurs trompeuses.",
      "Oui. Vert, orange, rouge veulent dire la même chose partout, contre les tolérances de chaque projet. Avec le même modèle d'une page, un vert se lit pareil d'un projet à l'autre.",
      "Non. Tu fais leur travail chaque mois, et ils n'apprennent rien. Une règle commune suffit : ils l'appliquent."
    ],
    retenir: "Plusieurs projets : les mêmes définitions des couleurs pour tous, contre les tolérances de chacun."
  },
  {
    id: "cp08-q16",
    dialecte: "Gestion de projet",
    q: "Tous les indicateurs de DEMAT sont dans leurs seuils. La cheffe comptable, inquiète : « Mets orange, par prudence. » Elle ne cite aucun fait. Quelle météo donnes-tu ?",
    choix: [
      "Orange par prudence, avec un plan : mieux vaut trop tôt",
      "Vert, et tu lui demandes ce qu'elle voit, pour le registre",
      "Rouge : que le DAF s'occupe enfin de la compta",
      "Vert, sans plus ; une inquiétude n'est pas un fait"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Orange = un risque de sortir des tolérances. Sans fait, c'est une humeur. Un orange de précaution use le mot : le jour où il sera vrai, il fera moins peur.",
      "Oui. Vert : aucun seuil n'est franchi. Mais son inquiétude cache peut-être un vrai risque : tu lui demandes ce qu'elle voit. Un fait ? Il va au registre (module cp07).",
      "Non. Rouge = hors tolérance, avec une décision du sponsor à prendre. Rien de tel ici : ce serait dramatiser.",
      "Non. Presque : vert, c'est juste. Mais elle connaît la compta mieux que toi : ne pas lui demander ce qui l'inquiète, c'est peut-être rater un risque."
    ],
    retenir: "Les seuils font la couleur, pas l'humeur. Une inquiétude se creuse : si c'est un fait, il va au registre."
  },
  {
    id: "cp08-q17",
    dialecte: "Gestion de projet",
    q: "Le mois dernier, le délai était rouge. Depuis, le DAF a choisi de reporter la bascule à mi-juillet, en connaissant le risque. Cette date tient. Quelle météo pour le délai ?",
    choix: [
      "Vert, contre la nouvelle date ; le rapport dit pourquoi",
      "Rouge jusqu'à la fin, et la date d'origine en référence",
      "Vert, sans en parler : le report est une affaire réglée",
      "Orange : après un rouge, prudence jusqu'à la nouvelle date"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Après la décision du sponsor, la date validée change : la couleur se mesure contre elle. Le rapport garde la trace : date d'origine, décision, nouvelle date.",
      "Non. Rouge = une décision est nécessaire. Elle est prise : rester rouge, c'est crier au loup. La date d'origine reste écrite dans la ligne du jalon, mais la référence, c'est la date décidée.",
      "Non. Presque : vert, oui. Mais sans le dire, le COPIL peut croire que juin tient. Le rapport écrit : bascule à mi-juillet, décidée par le DAF, et quand.",
      "Non. Les couleurs suivent les faits, pas une pente douce. Sans risque nouveau, orange serait une couleur de précaution."
    ],
    retenir: "Après la décision du sponsor, la couleur se mesure contre la nouvelle date validée, et le rapport dit pourquoi."
  },
  {
    id: "cp08-q18",
    dialecte: "Gestion de projet",
    q: "Rapport du mois. Délai : vert. Budget : orange, l'atterrissage approche les 90 k€. Périmètre : vert. Qualité et risques : vert. Quelle météo globale ?",
    choix: [
      "Vert : la plupart des axes sont verts",
      "Rouge : un axe en risque, c'est tout le projet",
      "Vert ; le budget orange, noté en bas de page",
      "Orange : jamais plus verte que le pire axe"
    ],
    bonne: 3,
    pourquoi: [
      "Non. La globale n'est pas un vote : un seul axe en risque, et c'est le projet qui est en risque.",
      "Non. Presque : un axe en risque met bien le projet en risque. Mais en risque, c'est orange ; rouge, c'est déjà hors tolérance.",
      "Non. Une globale verte avec un axe orange, c'est une pastèque : le DAF lit la 1re couleur, pas la note du bas.",
      "Oui. Règle du modèle de DEMAT (ailleurs, le chef de projet juge parfois) : la globale reprend l'axe le plus mauvais. Le budget risque de sortir de la tolérance, donc le projet aussi."
    ],
    retenir: "La météo globale reprend l'axe le plus mauvais : jamais plus verte que lui."
  },
  {
    id: "cp08-q19",
    dialecte: "Gestion de projet",
    q: "Ton rapport est vert partout. Au point projet, Marc et le consultant lâchent : « Les flux EDI ne seront jamais prêts pour le pilote. » Ton tableau de bord n'en montre rien. Que fais-tu ?",
    choix: [
      "Tu notes le reste à faire des flux, et on en reparle le mois prochain",
      "Tu vérifies avec eux, flux par flux ; la couleur suivra",
      "Tu gardes le vert : ton tableau de bord ne montre rien",
      "Tu passes tout en rouge tout de suite, avant d'en savoir plus"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un mois de plus, et le pilote approche sans plan. Un signal de l'équipe se vérifie tout de suite.",
      "Oui. Ce qui est vraiment fini, et le reste à faire, flux par flux : la couleur suit ces faits. Puis tu cherches pourquoi ton tableau de bord ne l'a pas vu.",
      "Non. C'est la pastèque : vert dehors, rouge dedans. Ceux qui font le travail savent souvent avant le tableau de bord.",
      "Non. Tu passes de l'aveuglement à la panique. Une phrase en réunion n'est pas encore un fait : tu vérifies d'abord, aujourd'hui."
    ],
    retenir: "Un signal de l'équipe se vérifie tout de suite, sur les faits : la couleur les suit. Ni pastèque, ni panique."
  },
  {
    id: "cp08-q20",
    dialecte: "Gestion de projet",
    q: "Fin mars. Recette : depuis 2 semaines, Julie manque 1 créneau sur 2. La marge couvre encore, mais à ce rythme, elle sera mangée. Le responsable ADV : « Mets tout en rouge, le DAF réagira. » Quelle météo pour le délai ?",
    choix: [
      "Orange, et tu demandes au DAF de libérer Julie aujourd'hui",
      "Vert : la marge de recette couvre encore le retard",
      "Orange : la cause, la marge qui fond, ta demande à sa cheffe",
      "Rouge : c'est le moyen le plus sûr d'avoir l'aide du DAF"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : orange, c'est juste. Mais le temps de Julie, c'est sa cheffe qui en décide : elle n'a pas encore eu ta proposition chiffrée (module cp16).",
      "Non. Aujourd'hui, la marge couvre. Mais 1 créneau sur 2, ça continue : la marge fond, puis la tolérance. C'est un risque : orange.",
      "Oui. Orange : risque de sortir des tolérances. La cause (les créneaux de Julie), l'impact (la marge mangée), ton plan : une proposition chiffrée à sa cheffe (module cp16).",
      "Non. Rouge = hors tolérance. S'en servir pour faire réagir, c'est dramatiser : le DAF ne croira plus tes couleurs."
    ],
    retenir: "La couleur ne sert pas à faire réagir : rouge seulement hors tolérance. Avant, orange, avec la cause et ton plan."
  },
  {
    id: "cp08-q21",
    dialecte: "Gestion de projet",
    q: "Le mois dernier : délai orange, plan de 3 actions datées. Ce mois-ci, 2 sont faites, la 3e a glissé d'une semaine. La prévision du PV reste à + 8 jours. Que dit le rapport ?",
    choix: [
      "Orange : 2 actions faites, la 3e à sa nouvelle date",
      "Vert : 2 actions sur 3 faites, la 3e suivra",
      "Rouge : une action du plan a raté sa date",
      "Orange ; le même texte et le même plan que le mois dernier"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Même couleur, car le risque reste. Mais le plan avance : 2 actions faites, la 3e avec sa nouvelle date et son responsable. Le COPIL voit que tu pilotes.",
      "Non. Les actions faites ne sont pas le résultat : la prévision du PV est toujours à + 8 jours. Le risque reste.",
      "Non. Une action qui glisse d'une semaine, avec une prévision stable dans la tolérance : le projet ne sort pas. Rouge serait dramatiser.",
      "Non. Presque : orange, c'est juste. Mais le COPIL doit voir où en est le plan : ce qui est fait, ce qui glisse, et pourquoi."
    ],
    retenir: "Même risque, même couleur ; mais le rapport montre où en est le plan d'actions."
  },
  {
    id: "cp08-q22",
    dialecte: "Gestion de projet",
    q: "La 1re session de formation de la compta glisse de 5 jours : la salle n'est pas libre. Elle ne retarde rien d'autre. Que dit la ligne de ce jalon ?",
    choix: [
      "Orange : un jalon a glissé, même un peu",
      "Vert, et la nouvelle date validée par le DAF",
      "Vert ; la date prévue remplacée par la nouvelle",
      "Vert : prévu inchangé, prévision à la nouvelle date"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Orange = un risque de sortir des tolérances. 5 jours, sans effet sur la suite : ni la tolérance, ni la bascule ne sont menacées.",
      "Non. Dans la tolérance, c'est ta délégation (module cp18) : le DAF n'a rien à valider. Il verra la nouvelle prévision dans le rapport.",
      "Non. Presque : vert, oui. Mais réécrire la date prévue efface l'écart : la référence ne change que par une décision du DAF. Tu changes la prévision.",
      "Oui. Dans la tolérance : vert. La ligne garde la date prévue (la référence) et montre la nouvelle prévision. Le COPIL voit l'écart, sans rien avoir à décider."
    ],
    retenir: "Un jalon garde sa date prévue ; c'est la prévision qui bouge. La référence ne change que par une décision du sponsor."
  },
  {
    id: "cp08-q23",
    dialecte: "Gestion de projet",
    q: "Pilote, 1re semaine : 3,5 % de rejets à la PA. Cause : 40 fiches clients incomplètes, que l'ADV complète d'ici le 21 mai. Critère : moins de 2 % après la bascule. Météo de la qualité ?",
    choix: [
      "Rouge, et le DAF le jour même : critère raté",
      "Vert : la cause est connue, et le critère compte en juin",
      "Orange : critère en risque ; rien à décider, plan daté",
      "Rouge : 3,5 %, presque deux fois le seuil"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Rien n'est raté, et rien n'est à décider : la cause est connue, le plan daté. Une alerte le jour même serait de trop.",
      "Non. Le pilote sert justement à prévoir. À 3,5 %, le critère est en risque : le cacher jusqu'en juin, c'est le découvrir trop tard.",
      "Oui. Orange : risque de rater le critère. Cause connue, plan daté (40 fiches d'ici le 21), rien à décider : le DAF l'apprend de toi en quelques lignes, sans urgence (module cp17).",
      "Non. Rouge = hors tolérance, avec une décision du sponsor à prendre. Le critère se mesure après la bascule, et un plan daté corrige la cause."
    ],
    retenir: "Au pilote, un critère en risque, cause connue et plan daté : orange. Pas d'alerte le jour même sans décision à prendre."
  },
  {
    id: "cp08-q24",
    dialecte: "Gestion de projet",
    q: "Ligne budget d'avril : référence 85,25 k€, atterrissage 87,5 k€ réserve comprise, écart + 2,25 k€ (flux EDI), commande signée par le DAF. La réserve couvre les risques ouverts. Météo du budget ?",
    choix: [
      "Rouge : l'atterrissage dépasse la référence de 2,25 k€",
      "Vert : sous 90 k€, l'écart et sa cause restent écrits",
      "Orange : l'atterrissage a monté de 2,25 k€ ce mois-ci",
      "Vert, sans l'écart : il est décidé, c'est réglé"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Rouge = hors tolérance. La tolérance, c'est 90 k€, pas la référence ; et cet écart, le DAF l'a déjà décidé.",
      "Oui. Sous 90 k€, et la réserve couvre les risques : vert. La ligne budget garde l'écart, sa cause et la décision prise. La couleur et les chiffres disent la même chose.",
      "Non. Presque : une hausse se surveille. Mais celle-ci est décidée, payée par une commande, et la réserve couvre les risques : rien ne menace les 90 k€.",
      "Non. Vert, oui, mais l'écart se montre chaque mois, avec sa cause (module cp12). Sinon, le projet paraît tenu à 85,25 k€."
    ],
    retenir: "La couleur du budget se lit contre la tolérance (90 k€) ; l'écart à la référence se montre quand même, avec sa cause."
  },
  {
    id: "cp08-q25",
    dialecte: "Gestion de projet",
    q: "Prévision du PV : 21 mai, 3 semaines après la date validée. Pour revenir au 7 mai : 5 jours d'intégrateur, à commander. Le DAF le sait depuis hier, sans avoir signé. Météo du délai ?",
    choix: [
      "Rouge : hors tolérance ; la commande à signer en tête",
      "Orange : un plan existe pour revenir dans la tolérance",
      "Vert : le DAF le sait, la décision est entre ses mains",
      "Rouge, et tu demandes au DG de signer à sa place"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. + 3 semaines : hors tolérance, et ton plan attend une décision du sponsor : c'est le rouge. La 1re ligne du rapport : la commande de 5 jours à signer, son prix, sa date limite.",
      "Non. Presque : le plan est bon. Mais il attend une décision du DAF : tant qu'il n'a pas signé, la prévision reste à + 3 semaines, hors tolérance.",
      "Non. Qu'il le sache ne change pas les faits : + 3 semaines. Vert, ce serait dire au COPIL que tout tient, alors qu'il doit décider.",
      "Non. Le DAF n'a pas refusé : il n'a pas encore signé, depuis hier. Le DG n'a rien à faire ici."
    ],
    retenir: "Hors tolérance, c'est rouge tant que le sponsor n'a pas décidé, même avec un bon plan."
  },
  {
    id: "cp08-q26",
    dialecte: "Gestion de projet",
    q: "Le mois dernier, tout était vert. Lundi, la cheffe comptable t'apprend un contrôle fiscal : toute la compta est prise 4 semaines, dès demain. La recette s'arrête. Que fais-tu ?",
    choix: [
      "Orange d'abord, pour ne pas affoler ; rouge le mois prochain",
      "Vert : la cause, un contrôle fiscal, est hors du projet",
      "Rouge tout de suite, et le DAF le jour même, options en main",
      "Orange, le temps de savoir combien durera le contrôle"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Les couleurs suivent les faits, pas une pente douce. 4 semaines d'arrêt : le PV sort de la tolérance dès aujourd'hui.",
      "Non. La cause est hors du projet, l'impact est dedans : la recette s'arrête, et le PV recule d'au moins 3 semaines.",
      "Oui. 4 semaines de recette perdues : hors tolérance, et une décision du DAF est nécessaire (un renfort, ou la bascule à mi-juillet). Il connaît le contrôle, pas son effet sur DEMAT : le jour même, les faits, l'impact, les options.",
      "Non. Presque : la durée compte. Mais 4 semaines annoncées suffisent : c'est hors tolérance. Tu le dis au DAF aujourd'hui, et tu affineras."
    ],
    retenir: "La couleur suit les faits, pas une progression : hors tolérance d'un coup, c'est rouge tout de suite, et le DAF le jour même."
  },
  {
    id: "cp08-q27",
    dialecte: "Gestion de projet",
    q: "Bascule le lundi 14 juin. Critère : moins de 2 % de rejets le 1er mois. Après 3 semaines, à volumes égaux chaque semaine : 4 % de rejets. Météo de la qualité ?",
    choix: [
      "Orange, et tu feras le calcul exact à la fin du 1er mois",
      "Vert : les factures rejetées finissent par passer",
      "Orange : le mois n'est pas fini, on peut repasser sous 2 %",
      "Rouge : même à 0 % jusqu'au 13 juillet, on dépasse 2 %"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Attendre la fin du mois pour un résultat déjà certain, c'est perdre plus d'une semaine pour agir.",
      "Non. Le critère compte les rejets, pas ce qui passe ensuite : chaque rejet, c'est du travail en plus pour Sophie et Marc, et un client qui attend.",
      "Non. Presque : le mois n'est pas fini. Mais le calcul est déjà fait : même à 0 % jusqu'au 13 juillet, la moyenne reste près de 3 %. Le critère est raté, quoi qu'il arrive.",
      "Oui. 3 semaines à 4 %, puis 0 % jusqu'au 13 juillet : la moyenne du mois fait encore 2,8 %. Le critère est raté. Rouge : le DAF le sait le jour même, et décide de la suite."
    ],
    retenir: "Quand le calcul dit que le seuil est déjà perdu, c'est rouge tout de suite : on n'attend pas la fin de la période."
  },
  {
    id: "cp08-q28",
    dialecte: "Gestion de projet",
    q: "Ton projet de rapport mensuel : météo par axe, jalons (prévu, réel, prévision), les 5 plus gros risques, la ligne budget. Que manque-t-il ?",
    choix: [
      "Le détail des tâches de la semaine, personne par personne",
      "Les décisions attendues, en tête, avec leur date",
      "Rien : avec ces 4 blocs, le COPIL a tout",
      "Le compte rendu du dernier point projet, daté"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le détail des tâches sert à l'équipe, dans le tableau de bord. Au COPIL, il noie l'essentiel.",
      "Oui. Le COPIL est là pour décider : les décisions attendues vont en 1re ligne, avec leur date. Rien à décider ? Tu l'écris.",
      "Non. Sans les décisions attendues, le COPIL regarde des couleurs, et repart sans avoir décidé.",
      "Non. Le point projet suit et prépare : son compte rendu reste à l'équipe. Le COPIL reçoit ce qu'il doit décider."
    ],
    retenir: "Le rapport mensuel commence par les décisions attendues, avec leur date."
  },
  {
    id: "cp08-q29",
    dialecte: "Gestion de projet",
    q: "COPIL mardi. Tu voudrais envoyer ton rapport le matin même, pour avoir les chiffres les plus frais. Que fais-tu ?",
    choix: [
      "3 jours ouvrés avant, avec l'ordre du jour, chiffres datés",
      "Tu ne l'envoies pas : tu le présentes à l'écran, en séance",
      "3 jours ouvrés avant, puis une 2e version le matin, si un chiffre bouge",
      "Le matin même, pour des chiffres plus frais"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Envoyé avec l'ordre du jour, 3 jours ouvrés avant : chacun lit et prépare sa décision. La date d'arrêt des chiffres est écrite dessus.",
      "Non. Découvrir en séance, c'est décider à chaud, ou ne pas décider.",
      "Non. Presque : envoyé à temps. Mais deux versions, ce sont deux vérités. Un fait nouveau se dit en ouverture, en une phrase ; s'il ne pouvait pas attendre, le DAF l'a déjà su.",
      "Non. Personne ne l'aura lu : la séance servira à découvrir, pas à décider."
    ],
    retenir: "Le rapport part avec l'ordre du jour, 3 jours ouvrés avant le COPIL, chiffres arrêtés à une date écrite."
  },
  {
    id: "cp08-q30",
    dialecte: "Gestion de projet",
    q: "Ton registre compte 18 risques actifs. Le rapport du COPIL en montre 5. Lesquels choisis-tu ?",
    choix: [
      "Les 5 nouveaux du mois, pour montrer ce qui bouge",
      "Les 5 dont le DAF est propriétaire : il est là pour eux",
      "Les 5 de plus forte note, avec action et propriétaire",
      "Les 5 que tu sais déjà traiter, pour rassurer le COPIL"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : ce qui bouge intéresse le COPIL. Mais un risque nouveau n'est pas forcément gros : tu montres ceux qui pèsent le plus, et tu signales ceux qui montent.",
      "Non. Le propriétaire ne dit pas le poids du risque. Un gros risque porté par Julie compte autant.",
      "Oui. Les 5 plus gros, par leur note (probabilité × impact, module cp07), chacun avec son action et son propriétaire. Le registre complet reste disponible.",
      "Non. Choisir pour rassurer, c'est maquiller : le COPIL doit voir les risques qui comptent, pas ceux qui sont faciles."
    ],
    retenir: "Au rapport, les 5 plus gros risques, par leur note, chacun avec son action et son propriétaire."
  },
  {
    id: "cp08-q31",
    dialecte: "Gestion de projet",
    q: "Ce mois-ci, tout est vert, et rien n'est à décider. Ton DSI : « Pas la peine d'envoyer le rapport. » Que fais-tu ?",
    choix: [
      "« D'accord : pas de rapport ce mois-ci, rien à décider »",
      "Tu l'envoies, avec une décision à demander, pour justifier le COPIL",
      "Ce mois, une ligne : « Tous les seuils sont tenus »",
      "Tu l'envoies, comme chaque mois : « Aucune décision attendue »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le rapport ne sert pas qu'à décider : il montre la tendance, mois après mois. Sans lui, le mois suivant ne se compare plus.",
      "Non. Inventer une décision fait perdre du temps au DAF, et lui apprend à se méfier de tes demandes.",
      "Non. Presque : court, c'est bien. Mais sans les jalons, les risques et le budget, le COPIL ne voit pas ce qui vient.",
      "Oui. Même modèle, même rythme. La 1re ligne le dit : « Aucune décision attendue. » Le COPIL lit en 2 minutes, et sait que tout tient."
    ],
    retenir: "Rien à décider ? Le rapport part quand même, le même, avec en 1re ligne : « Aucune décision attendue. »"
  },
  {
    id: "cp08-q32",
    dialecte: "Gestion de projet",
    q: "Le chef de projet de la PA veut relire ton rapport avant le COPIL : « Pour corriger la ligne du connecteur, qui est orange. » Que fais-tu ?",
    choix: [
      "Oui, et tu prends toutes ses corrections telles quelles",
      "Oui pour les faits et les dates ; la couleur reste la tienne",
      "Tu passes la ligne en vert, pour garder une bonne relation avec lui",
      "Tu refuses tout échange : ton rapport est interne"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le rapport est le tien, pour le DAF : le fournisseur ne note pas son propre travail. Avec ses corrections telles quelles, la ligne deviendrait verte à chaque relecture.",
      "Oui. Une date fausse se corrige : tu vérifies les faits avec lui. La couleur suit les seuils, et c'est toi qui l'écris. Son désaccord, il le dit au comité fournisseur (module cp15).",
      "Non. C'est maquiller : la relation ne se paie pas avec une fausse couleur. Le DAF déciderait sur une information fausse.",
      "Non. Presque : le rapport ne se négocie pas. Mais vérifier les faits avec lui t'évite une erreur de date."
    ],
    retenir: "Les faits se vérifient avec le fournisseur ; la couleur et le rapport restent les tiens."
  },
  {
    id: "cp08-q33",
    dialecte: "Gestion de projet",
    q: "La PA t'écrit : son correctif des avoirs clients n'arrivera pas avant juillet. Sans lui, la bascule de juin ne tient pas. Ton rapport du COPIL part dans 2 jours. Que fais-tu ?",
    choix: [
      "Le DAF dès aujourd'hui, au téléphone : faits, impact, options",
      "Tu attends que la PA propose une solution, pour arriver avec",
      "Tu demandes au DG une réunion de crise dès demain",
      "En tête du rapport, avec les options : le DAF le lira dans 2 jours"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. La bascule sort de la tolérance : une décision du DAF est nécessaire. Aujourd'hui : les faits, l'impact, les options (juin, avec les avoirs clients par le portail, ou mi-juillet), ta recommandation. Puis 5 lignes écrites.",
      "Non. Tu peux presser la PA, mais pas en gardant l'info : le DAF doit le savoir aujourd'hui, même sans solution. « Je te dis demain ce que propose la PA. »",
      "Non. Le DAF est ton sponsor : c'est lui qui décide. Aller au DG sans lui, c'est passer au-dessus de lui.",
      "Non. Presque : en tête du rapport, c'est la bonne place. Mais hors tolérance, 2 jours d'attente, ce n'est pas le jour même : le DAF l'apprend de toi, aujourd'hui."
    ],
    retenir: "Hors tolérance, le DAF le sait le jour même, même si le rapport part dans 2 jours."
  },
  {
    id: "cp08-q34",
    dialecte: "Gestion de projet",
    q: "Fin mars, tu as alerté le DAF le jour même : les flux EDI dérivent. Il a signé une commande de 3 jours. Que fais-tu ensuite ?",
    choix: [
      "Un point quotidien avec le DAF, jusqu'à la fin des flux EDI",
      "Rien de plus : le DAF a signé, le sujet est clos",
      "Un plan d'actions, que tu montreras au COPIL d'avril",
      "Un plan, chaque action datée, vu chaque lundi"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le DAF a décidé : il n'a pas à suivre les flux chaque jour. Il le saura au COPIL, ou le jour même s'il faut de nouveau décider.",
      "Non. La commande paie les jours ; elle ne garantit pas que les flux finiront. Sans plan suivi, la même dérive revient.",
      "Non. Presque : un plan, oui. Mais vu une fois par mois, une action qui glisse se voit 4 semaines trop tard.",
      "Oui. Après une alerte, un plan d'actions daté : qui fait quoi, pour quand. Suivi chaque lundi au point projet ; le COPIL voit ce qui est fait, et ce qui glisse."
    ],
    retenir: "Après une alerte, un plan d'actions daté, suivi chaque lundi au point projet."
  },
  {
    id: "cp08-q35",
    dialecte: "Gestion de projet",
    q: "Ce mois-ci, tu as appelé le DAF 4 fois pour des glissements de 2 ou 3 jours, dans la tolérance. Il te dit : « Arrête de m'appeler pour ça. » Que fais-tu ?",
    choix: [
      "Tu continues, même dans la tolérance : mieux vaut trop que pas assez",
      "« D'accord : désormais, tout attendra le COPIL du mois »",
      "« D'accord : le jour même, seulement le hors tolérance et l'urgent »",
      "Tu demandes à ton DSI de lui rappeler la tolérance"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Trop d'alertes usent l'alerte : le jour où ce sera grave, il décrochera moins vite.",
      "Non. Presque : moins d'appels, oui. Mais pas tout : ce qui sort des tolérances, ou un risque légal, part toujours le jour même.",
      "Oui. Il a raison : dans la tolérance, c'est ta délégation (module cp18). Tu ajustes, et le rapport le dit. Le jour même : hors tolérance, risque légal, ou décision qui ne peut pas attendre.",
      "Non. Il n'y a rien à rappeler : il te donne une règle juste. Tu l'appliques."
    ],
    retenir: "Dans la tolérance, tu ajustes et le rapport le dit ; le jour même, seulement le hors tolérance, le légal ou l'urgent."
  },
  {
    id: "cp08-q36",
    dialecte: "Gestion de projet",
    q: "2e semaine de recette. Le consultant : « Comptons comme passé tout cas joué, même en anomalie. On affichera 95 %. » Que réponds-tu ?",
    choix: [
      "« D'accord, si le rapport donne la définition de « passé » »",
      "« Non : un cas en anomalie n'est pas passé, la règle reste »",
      "« D'accord : un cas joué, même en anomalie, c'est du travail »",
      "« Non, et j'en parle à ton responsable aujourd'hui »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Presque : changer une définition se dit, toujours. Mais ce changement n'a qu'un but : faire plus joli. Tu gardes la définition.",
      "Oui. Joué n'est pas passé : un cas passe quand il est OK, après retest s'il le faut. La définition ne change pas en cours de route pour faire plus joli.",
      "Non. Un cas en anomalie reste à corriger, puis à retester. Le compter comme passé gonfle le chiffre, et le PV paraît plus proche qu'il n'est.",
      "Non. Il propose, maladroitement : ce n'est pas une faute. Un « non » clair, avec sa raison, suffit."
    ],
    retenir: "Un cas en anomalie n'est pas passé ; une définition ne change pas pour faire plus joli."
  },
  {
    id: "cp08-q37",
    dialecte: "Gestion de projet",
    q: "Recette : 100 cas en 5 semaines, 20 par semaine, puis 1 semaine de marge. Fin de la 2e semaine : 30 cas joués. Au rythme réel, quand finit-elle ?",
    choix: [
      "En 7e semaine : 1 semaine après la marge",
      "En 5e semaine : on rattrapera le retard",
      "En 9e semaine : 100 cas à 15 par semaine",
      "En 6e semaine : la marge absorbe le retard"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. 30 cas en 2 semaines : 15 par semaine. Il en reste 70 : un peu moins de 5 semaines. Fin en 7e semaine, une semaine après la marge : la prévision du PV recule d'autant.",
      "Non. Rien ne dit que le rythme doublera : la prévision part du rythme réel, pas de l'espoir.",
      "Non. Tu recomptes les 30 cas déjà joués : il en reste 70, pas 100. 70 ÷ 15, c'est moins de 5 semaines.",
      "Non. Presque : la marge sert à ça. Mais il reste 70 cas : à 15 par semaine, presque 5 semaines. 2 + 5 = 7 : la marge ne suffit pas."
    ],
    retenir: "La fin de recette se prévoit au rythme réel : cas restants ÷ cas joués par semaine."
  },
  {
    id: "cp08-q38",
    dialecte: "Gestion de projet",
    q: "Recette des factures clients. Vendredi 23 avril : tous les cas sont joués ; 3 anomalies bloquantes restent ouvertes. Corrections mardi 27 au soir ; retest : 2 jours. Quelle prévision de PV ?",
    choix: [
      "Mardi 27 avril : le jour des corrections",
      "Aucune date : tu attends le retest des 3",
      "Vendredi 23 avril : tous les cas sont joués",
      "Le 30 avril, si le retest des 3 est OK"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Presque : la correction compte. Mais une correction se reteste avant le PV : 2 jours de plus.",
      "Non. Le COPIL a besoin d'une prévision, avec sa condition. « Aucune date », c'est lui cacher ce que tu sais déjà.",
      "Non. Pas de PV avec une anomalie bloquante ouverte (module cp14) : les 3 doivent être corrigées, puis retestées.",
      "Oui. Corrections mardi soir, retest mercredi et jeudi : PV le vendredi 30, s'il ne reste aucune bloquante. Une date, avec sa condition."
    ],
    retenir: "La date du PV se prévoit, corrections et retest des bloquantes compris : une date, avec sa condition."
  },
  {
    id: "cp08-q39",
    dialecte: "Gestion de projet",
    q: "Fin avril. Recette : 95 % des cas OK. Les 5 % restants : toutes les factures EDI d'AquaBleu, rejetées. Le responsable ADV : « 95 %, on est bons ! » Que dit ton rapport ?",
    choix: [
      "« 95 % OK : vert ; AquaBleu en détail, page 2 »",
      "« 1 bloquante, AquaBleu : le PV après sa correction »",
      "« Recette ratée : rouge, et pilote annulé »",
      "« 95 % OK ; PV signé, avec une réserve pour AquaBleu »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un pourcentage cache ce qui bloque. Le COPIL lirait « 95 %, vert », et découvrirait AquaBleu au pilote.",
      "Oui. Les bloquantes se montrent à part, avec ce qu'elles changent : pas de PV avant la correction d'AquaBleu. Puis la prévision du PV, avec sa date.",
      "Non. Une anomalie bloquante n'annule pas le pilote : elle décale le PV. La couleur dépend de la nouvelle prévision, contre la tolérance.",
      "Non. Presque : une réserve sert aux défauts mineurs. Une anomalie bloquante, c'est pas de PV (module cp14). Et AquaBleu, c'est 20 % du chiffre d'affaires."
    ],
    retenir: "Un pourcentage de cas OK cache les bloquantes : elles se montrent à part, avec leur effet sur le PV."
  },
  {
    id: "cp08-q40",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Le projet WMS (logiciel d'entrepôt) est vert depuis 5 mois. Dans son rapport, la colonne « réel » des jalons est vide depuis 3 mois. Que fais-tu ?",
    choix: [
      "Tu le signales au DG ; il cache peut-être un retard",
      "Rien : vert depuis 5 mois, le projet tient la route",
      "Tu lui demandes ses livrables et ses dates réelles",
      "Tu le passes toi-même en rouge, faute de dates réelles"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Rien n'est prouvé : tu vérifies d'abord. Et monter sans lui en parler casse la confiance qui fait venir les mauvaises nouvelles.",
      "Non. Un vert sans dates réelles, c'est peut-être une pastèque : rien ne prouve que les jalons sont tenus.",
      "Oui. Tu vérifies les faits avec lui : livrables acceptés, dates réelles, reste à faire. Puis la couleur suit. Sans accuser : il a peut-être juste mal rempli.",
      "Non. Tu n'as pas les faits, et ce n'est pas ton rapport : il le refait lui-même, sur les faits."
    ],
    retenir: "Un vert sans dates réelles se vérifie sur les faits, avec le chef de projet, sans accuser."
  },
  {
    id: "cp08-q41",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Une cheffe de projet de ton équipe : « Si je passe orange, le DG va me tomber dessus. Je reste vert jusqu'au bout. » Que fais-tu ?",
    choix: [
      "Un orange tôt est attendu : tu le lui dis, et tu le défends au comité",
      "Tu la recadres, et tu le notes pour son entretien annuel",
      "Elle décide : c'est elle qui connaît son projet, pas toi",
      "Tu passes son projet en orange toi-même, pour la couvrir"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un orange tôt, avec la cause et un plan, c'est du pilotage, pas un échec. Tu le lui dis, et tu le prouves au comité : tu la soutiens quand elle l'annonce.",
      "Non. La menace renforce la peur qui fait cacher. Les mauvaises nouvelles arrivent tôt quand on ne punit pas ceux qui les apportent.",
      "Non. Elle annonce qu'elle cachera un risque : c'est la pastèque. Le jour où le rouge sortira, il n'y aura plus d'options.",
      "Non. Ce n'est pas ta couleur à mettre : sans ses faits, tu ne sais pas. Et elle n'apprend pas à le dire."
    ],
    retenir: "Un orange tôt se remercie : sinon, les chefs de projet cachent, et le rouge arrive sans options."
  },
  {
    id: "cp08-q42",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Le DG veut suivre les 6 projets de la DSI en 10 minutes par mois. Que lui donnes-tu ?",
    choix: [
      "Les 6 rapports d'une page, décisions comprises ; 6 pages",
      "Le tableau de bord de chaque équipe, pour qu'il voie tout",
      "Un seul chiffre : le pourcentage moyen d'avancement des 6",
      "Une ligne par projet : couleur, jalon, décision"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Presque : chaque page est bonne. Mais 6 pages en 10 minutes, il lira la 1re. Les rapports restent là, s'il veut creuser.",
      "Non. Le détail sert aux équipes, pour agir. Le DG ne décide pas tâche par tâche.",
      "Non. Une moyenne cache le projet en retard derrière ceux qui avancent. Et un pourcentage d'avancement est souvent déclaratif.",
      "Oui. Une ligne par projet, avec les mêmes définitions : la couleur, le prochain jalon et sa prévision, la décision attendue. En 10 minutes, il voit où agir."
    ],
    retenir: "Pour la direction, une ligne par projet : la couleur, le prochain jalon, la décision attendue."
  }
];
