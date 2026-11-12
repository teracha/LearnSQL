-- Base d'exemple des cours SQL de LearnSQL (parcours SQL, modules m01 à m16).
-- Un négociant en équipement de piscines, 3 dépôts, ERP Divalto : le même décor que le parcours Chef de projet.
-- Écrit en SQL standard pour pouvoir être chargé dans SQLite (vérification des résultats) :
--   python3 -c "import sqlite3,io; c=sqlite3.connect(':memory:'); c.executescript(io.open('docs/base-exemple.sql',encoding='utf-8').read()); print(c.execute('SELECT nom, ville FROM client ORDER BY nom').fetchall())"
-- Dans les cours : SQL Server écrit dbo.client ; Snowflake écrit VENTES.CLIENT (noms en majuscules).
-- TOP (SQL Server) se vérifie avec LIMIT dans SQLite.

CREATE TABLE client (
  id        INTEGER PRIMARY KEY,
  code      VARCHAR(10)  NOT NULL,
  nom       VARCHAR(60)  NOT NULL,
  ville     VARCHAR(40),            -- NULL possible : fiche incomplète
  pays      CHAR(2)      NOT NULL,
  type      VARCHAR(4)   NOT NULL,  -- 'GD' grande distribution, 'PRO' pisciniste ou collectivité
  siren     CHAR(9)                 -- NULL : fiche sans SIREN (client étranger, ou fiche à nettoyer)
);
INSERT INTO client VALUES (1, 'C001', 'AquaBleu',          'Lyon',        'FR', 'GD',  '512345678');
INSERT INTO client VALUES (2, 'C002', 'Piscines Dumont',   'Grenoble',    'FR', 'PRO', '423456789');
INSERT INTO client VALUES (3, 'C003', 'Bleu Lagon',        'Nice',        'FR', 'PRO', NULL);
INSERT INTO client VALUES (4, 'C004', 'Hydro Sud',         'Montpellier', 'FR', 'PRO', '334567890');
INSERT INTO client VALUES (5, 'C005', 'Pool & Garden',     'Genève',      'CH', 'PRO', NULL);
INSERT INTO client VALUES (6, 'C006', 'Piscines Dumont',   'Lyon',        'FR', 'PRO', '423456789'); -- 2e agence, même société
INSERT INTO client VALUES (7, 'C007', 'Camping Les Flots', NULL,          'FR', 'PRO', '245678901');

CREATE TABLE article (
  id          INTEGER PRIMARY KEY,
  code        VARCHAR(10)   NOT NULL,
  libelle     VARCHAR(60)   NOT NULL,
  famille     VARCHAR(12)   NOT NULL,  -- 'CHIMIE', 'FILTRATION', 'ROBOT', 'ACCESSOIRE'
  prix_tarif  DECIMAL(10,2) NOT NULL,
  stock       INTEGER       NOT NULL   -- stock total des 3 dépôts
);
INSERT INTO article VALUES (1, 'CHL-5',  'Chlore lent 5 kg',        'CHIMIE',     39.90,  120);
INSERT INTO article VALUES (2, 'CHL-25', 'Chlore lent 25 kg',       'CHIMIE',     159.00, 40);
INSERT INTO article VALUES (3, 'PH-5',   'pH moins 5 kg',           'CHIMIE',     24.50,  80);
INSERT INTO article VALUES (4, 'FIL-14', 'Filtre à sable 14 m3/h',  'FILTRATION', 549.00, 12);
INSERT INTO article VALUES (5, 'POMP-1', 'Pompe 1 CV',              'FILTRATION', 389.00, 0);
INSERT INTO article VALUES (6, 'ROB-X',  'Robot électrique X',      'ROBOT',      1290.00, 5);
INSERT INTO article VALUES (7, 'EPU-F',  'Épuisette de fond',       'ACCESSOIRE', 19.90,  200);
INSERT INTO article VALUES (8, 'BACHE8', 'Bâche à bulles 8 x 4 m',  'ACCESSOIRE', 149.00, 15);

CREATE TABLE commande (
  id          INTEGER PRIMARY KEY,
  num_cde     VARCHAR(10)   NOT NULL,
  client_id   INTEGER       NOT NULL REFERENCES client(id),
  date_cde    DATE          NOT NULL,
  statut      VARCHAR(10)   NOT NULL,  -- 'LIVREE', 'EN_COURS', 'ANNULEE'
  canal       VARCHAR(4)    NOT NULL,  -- 'EDI', 'WEB', 'TEL'
  montant_ht  DECIMAL(10,2) NOT NULL   -- = somme des lignes
);
INSERT INTO commande VALUES (1, 'CDE-1001', 1, '2026-03-02', 'LIVREE',   'EDI', 4780.00);
INSERT INTO commande VALUES (2, 'CDE-1002', 2, '2026-03-05', 'LIVREE',   'TEL', 1290.00);
INSERT INTO commande VALUES (3, 'CDE-1003', 1, '2026-03-09', 'LIVREE',   'EDI', 2385.00);
INSERT INTO commande VALUES (4, 'CDE-1004', 3, '2026-03-12', 'ANNULEE',  'WEB', 549.00);
INSERT INTO commande VALUES (5, 'CDE-1005', 4, '2026-04-01', 'EN_COURS', 'TEL', 318.00);
INSERT INTO commande VALUES (6, 'CDE-1006', 2, '2026-04-03', 'EN_COURS', 'WEB', 1290.00); -- même montant que CDE-1002 (ex aequo)
INSERT INTO commande VALUES (7, 'CDE-1007', 1, '2026-04-07', 'EN_COURS', 'EDI', 7950.00);
INSERT INTO commande VALUES (8, 'CDE-1008', 6, '2026-04-10', 'LIVREE',   'TEL', 79.80);
-- Les clients 5 (Pool & Garden) et 7 (Camping Les Flots) n'ont aucune commande.

CREATE TABLE ligne_cde (
  id          INTEGER PRIMARY KEY,
  cde_id      INTEGER       NOT NULL REFERENCES commande(id),
  article_id  INTEGER       NOT NULL REFERENCES article(id),
  qte         INTEGER       NOT NULL,
  prix_unit   DECIMAL(10,2) NOT NULL   -- prix négocié, souvent sous le tarif
);
INSERT INTO ligne_cde VALUES (1,  1, 1, 100, 35.90);   -- 3 590,00
INSERT INTO ligne_cde VALUES (2,  1, 2, 10,  119.00);  -- 1 190,00  → CDE-1001 = 4 780,00
INSERT INTO ligne_cde VALUES (3,  2, 6, 1,   1290.00); -- CDE-1002 = 1 290,00
INSERT INTO ligne_cde VALUES (4,  3, 3, 50,  22.50);   -- 1 125,00
INSERT INTO ligne_cde VALUES (5,  3, 8, 10,  126.00);  -- 1 260,00  → CDE-1003 = 2 385,00
INSERT INTO ligne_cde VALUES (6,  4, 4, 1,   549.00);  -- CDE-1004 = 549,00
INSERT INTO ligne_cde VALUES (7,  5, 1, 8,   39.75);   -- CDE-1005 = 318,00
INSERT INTO ligne_cde VALUES (8,  6, 6, 1,   1290.00); -- CDE-1006 = 1 290,00
INSERT INTO ligne_cde VALUES (9,  7, 1, 150, 35.90);   -- 5 385,00
INSERT INTO ligne_cde VALUES (10, 7, 4, 5,   513.00);  -- 2 565,00  → CDE-1007 = 7 950,00
INSERT INTO ligne_cde VALUES (11, 8, 7, 4,   19.95);   -- CDE-1008 = 79,80

CREATE TABLE facture (
  id          INTEGER PRIMARY KEY,
  num_fact    VARCHAR(14)   NOT NULL,
  cde_id      INTEGER       NOT NULL REFERENCES commande(id),
  date_fact   DATE          NOT NULL,
  montant_ht  DECIMAL(10,2) NOT NULL,
  statut      VARCHAR(8)    NOT NULL   -- 'EMISE', 'PAYEE', 'RETARD'
);
INSERT INTO facture VALUES (1, 'FA-2026-0301', 1, '2026-03-03', 4780.00, 'PAYEE');
INSERT INTO facture VALUES (2, 'FA-2026-0302', 2, '2026-03-06', 1290.00, 'PAYEE');
INSERT INTO facture VALUES (3, 'FA-2026-0303', 3, '2026-03-10', 2385.00, 'RETARD');
INSERT INTO facture VALUES (4, 'FA-2026-0401', 8, '2026-04-11', 79.80,   'EMISE');
-- Pas de facture pour la commande annulée (4) ni pour les commandes en cours (5, 6, 7).

CREATE TABLE flux_edi (
  id          INTEGER PRIMARY KEY,
  type        VARCHAR(6)  NOT NULL,   -- 'ORDERS' (commande), 'DESADV' (avis d'expédition), 'INVOIC' (facture)
  partenaire  VARCHAR(40) NOT NULL,
  date_recu   TIMESTAMP   NOT NULL,
  statut      VARCHAR(5)  NOT NULL,   -- 'OK', 'REJET'
  motif       VARCHAR(60),            -- NULL si OK
  cde_id      INTEGER REFERENCES commande(id)
);
INSERT INTO flux_edi VALUES (1, 'ORDERS', 'AquaBleu', '2026-03-02 06:10:00', 'OK',    NULL,                   1);
INSERT INTO flux_edi VALUES (2, 'ORDERS', 'AquaBleu', '2026-03-09 06:12:00', 'OK',    NULL,                   3);
INSERT INTO flux_edi VALUES (3, 'ORDERS', 'AquaBleu', '2026-03-16 06:05:00', 'REJET', 'EAN inconnu',          NULL);
INSERT INTO flux_edi VALUES (4, 'INVOIC', 'AquaBleu', '2026-03-03 18:00:00', 'OK',    NULL,                   1);
INSERT INTO flux_edi VALUES (5, 'ORDERS', 'AquaBleu', '2026-04-07 06:08:00', 'OK',    NULL,                   7);
INSERT INTO flux_edi VALUES (6, 'DESADV', 'AquaBleu', '2026-04-08 17:30:00', 'REJET', 'Quantité ≠ commande',  7);

-- Pour les modules suivants (agrégats, jointures) : les 3 dépôts et leur stock.
CREATE TABLE depot (
  id    INTEGER PRIMARY KEY,
  nom   VARCHAR(20) NOT NULL
);
INSERT INTO depot VALUES (1, 'Lyon');
INSERT INTO depot VALUES (2, 'Toulouse');
INSERT INTO depot VALUES (3, 'Nantes');

CREATE TABLE stock_depot (
  article_id  INTEGER NOT NULL REFERENCES article(id),
  depot_id    INTEGER NOT NULL REFERENCES depot(id),
  qte         INTEGER NOT NULL,
  PRIMARY KEY (article_id, depot_id)
);
-- La somme par article = article.stock.
INSERT INTO stock_depot VALUES (1, 1, 60);  INSERT INTO stock_depot VALUES (1, 2, 40);  INSERT INTO stock_depot VALUES (1, 3, 20);
INSERT INTO stock_depot VALUES (2, 1, 25);  INSERT INTO stock_depot VALUES (2, 2, 15);
INSERT INTO stock_depot VALUES (3, 1, 50);  INSERT INTO stock_depot VALUES (3, 3, 30);
INSERT INTO stock_depot VALUES (4, 1, 8);   INSERT INTO stock_depot VALUES (4, 2, 4);
INSERT INTO stock_depot VALUES (6, 1, 5);
INSERT INTO stock_depot VALUES (7, 1, 100); INSERT INTO stock_depot VALUES (7, 2, 60);  INSERT INTO stock_depot VALUES (7, 3, 40);
INSERT INTO stock_depot VALUES (8, 1, 10);  INSERT INTO stock_depot VALUES (8, 3, 5);
-- L'article 5 (Pompe 1 CV) n'a aucune ligne de stock : rupture dans les 3 dépôts.

-- Pour le module m06 (CTE récursive) : la nomenclature, ce qui compose un kit (3 niveaux).
-- FIL-14 et POMP-1 sont des codes du catalogue `article` ; les autres sont hors catalogue (kits sur devis, pièces).
CREATE TABLE nomenclature (
  compose    VARCHAR(10) NOT NULL,   -- le produit composé (le parent)
  composant  VARCHAR(10) NOT NULL,   -- ce qu'il contient (l'enfant)
  qte        INTEGER     NOT NULL,   -- quantité pour 1 composé
  PRIMARY KEY (compose, composant)
);
-- Kit filtration collectivité : 2 filtres à sable et 1 pompe. 1 filtre = 4 sacs de sable de 25 kg et 1 vanne 6 voies ;
-- 1 vanne = 2 joints. Pour 1 kit : 2 filtres, 1 pompe, 8 sacs, 2 vannes, 4 joints.
INSERT INTO nomenclature VALUES ('KIT-COLL', 'FIL-14',   2);
INSERT INTO nomenclature VALUES ('KIT-COLL', 'POMP-1',   1);
INSERT INTO nomenclature VALUES ('FIL-14',   'SABLE-25', 4);
INSERT INTO nomenclature VALUES ('FIL-14',   'VANNE-6V', 1);
INSERT INTO nomenclature VALUES ('VANNE-6V', 'JOINT-V',  2);
-- Kit hivernage, avec une erreur de saisie : la 2e ligne est à l'envers et crée une boucle (KIT-HIV ↔ BACHE8).
-- Une CTE récursive qui part de KIT-HIV sans garde-fou ne s'arrête pas (SQL Server : erreur 530 à 100 niveaux).
INSERT INTO nomenclature VALUES ('KIT-HIV',  'BACHE8',   1);
INSERT INTO nomenclature VALUES ('BACHE8',   'KIT-HIV',  1);
