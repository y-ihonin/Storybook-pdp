# Pokédex

A Pokédex app built with **React 19 + Vite + TypeScript**, **Tailwind v4 + shadcn/ui**,
and the free [PokeAPI](https://pokeapi.co/).

Presentational components take props only; **containers** own data fetching.

## Scripts

```bash
npm install          # install dependencies
npm run dev          # run the app (Vite)
npm run build        # typecheck + build the app
npm run preview      # preview the production build
npm run lint         # run eslint
```

## Project structure

```
src/
├─ components/ui/        shadcn primitives (Button, Card, Badge, Tabs, …)
├─ components/pokemon/   shared presentational components (TypeBadge, PokemonCard, …)
├─ components/layout/    app shell (SiteHeader)
├─ containers/           connected components (PokedexContainer, PokemonDetailContainer)
├─ pages/                full-page composition (PokedexPage, PokemonDetailPage)
├─ hooks/                usePokedex, usePokemon
└─ lib/                  PokeAPI client + formatting helpers
```
