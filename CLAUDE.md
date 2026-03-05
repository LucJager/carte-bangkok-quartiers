# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commandes

```bash
pnpm dev          # Serveur de développement Vite
pnpm build        # tsc && vite build
pnpm preview      # Preview du build
```

Pas de linter ni de tests configurés.

## Stack

- **Vite 7** + **TypeScript 5.9** (strict mode, ESNext modules)
- **Leaflet 1.9** pour la cartographie interactive
- **Vercel Serverless Function** (`api/feedback.ts`) pour envoyer les feedbacks via Telegram
- **DOM vanilla** — pas de framework (React, Vue, etc.)
- **CSS vanilla** — pas de Tailwind ni preprocesseur
- Déployé sur **Vercel** avec headers de sécurité stricts (CSP, etc.)

## Architecture

```
src/
├── main.ts              # Orchestrateur : init map Leaflet, charge UI + layers
├── types.ts             # Types partagés (District, Poi, TransitLine, etc.)
├── data/                # Données statiques (districts, POIs, transit, rivière)
├── layers/              # Couches Leaflet (districts, transit, river, pois)
│   └── districts.ts     # Polygones + labels, gère states (selected, filtered, multi)
├── ui/                  # Modules UI indépendants
│   ├── panel.ts         # Panneau détail district (stars, budget, pros/cons)
│   ├── controls.ts      # Boutons flottants (layers toggle, compare mode)
│   ├── search.ts        # Fuzzy search districts + geocoding Nominatim
│   ├── compare.ts       # Comparaison jusqu'à 3 districts
│   ├── feedback.ts      # Modal feedback → Vercel Function → Telegram (rate limited)
│   ├── theme.ts         # Toggle dark/light (localStorage)
│   └── category-bar.ts  # Filtres par tags/catégories
├── utils/               # geo (haversine, point-in-polygon), fuzzy match, sanitize XSS
└── styles/              # CSS modulaires (main, map, panel, search, compare, feedback, mobile)
```

## Patterns clés

- **Pas de state global** : chaque module UI gère son propre état, communication via custom events DOM (`theme-change`, etc.)
- **Sécurité XSS** : tout contenu dynamique passe par `escapeHtml()` de `src/utils/sanitize.ts`
- **Variables d'environnement** : `TELEGRAM_BOT_TOKEN` et `TELEGRAM_CHAT_ID` (côté serveur, voir `.env.example`)
- **Base relative** : Vite configuré avec `base: './'` pour compatibilité Vercel
- **Responsive** : breakpoint mobile à 768px dans `src/styles/mobile.css`
- **Langue de l'UI** : français (labels, descriptions, textes)

## Données

Les districts, POIs, stations de transit et coordonnées de la rivière sont en dur dans `src/data/`. Pour ajouter un district, modifier `src/data/districts.ts` (type `District` dans `src/types.ts`).
