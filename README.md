# Le Quotidien Tabletop — Industrie & Jeux

Site éditorial consacré à l'industrie du tabletop avec priorité France et veille mondiale.

## Architecture

- `index.html` : maquette éditoriale et fallback statique.
- `css/main.css` : design responsive.
- `js/main.js` : chargement de l'édition, recherche, navigation et agenda.
- `data/latest.json` : édition active affichée sur le site.
- `data/editions/YYYY-MM-DD.json` : archives quotidiennes.

## Ligne éditoriale

Le site couvre l'industrie, le retail, la distribution, les éditeurs/studios, les JCC/TCG, les jeux de société, l'Organized Play, les wargames, le crowdfunding, l'économie du secteur et les signaux faibles.

Principe : **collecte large, vérification stricte, synthèse sélective, impact France**.

## Publication

Chaque nouvelle édition doit :
1. archiver les données dans `data/editions/YYYY-MM-DD.json` ;
2. remplacer `data/latest.json` ;
3. conserver les URLs de sources vérifiées ;
4. ne jamais inventer date, prix, stock, distributeur ou disponibilité.
