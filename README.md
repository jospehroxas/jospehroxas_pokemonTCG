# PokémonTCG Explorer 🎴

A pixel-art themed Pokémon TCG card explorer built with React + Redux Toolkit.

## Features
- 🔍 **Card Search & Filter** — Search by name, type, and rarity using RTK Query
- 🎴 **Pack Opening Simulator** — Pull 10 random cards with animated reveals
- 🗂 **Deck Builder** — Build a 60-card deck with TCG rules enforced (max 4 copies)
- 🎮 **Pixel UI Theme** — Retro pixel aesthetic using the Latias/Latios background

## Setup

### 1. Add the background image
Copy `download.jpg` into the `public/` folder and **rename it to `bg.jpg`**:
```
public/
  └── bg.jpg   ← your Latias/Latios pixel art image
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

## Tech Stack
- **React 18** (functional components)
- **Redux Toolkit** — state management
- **RTK Query** — API calls to [Pokémon TCG API](https://api.pokemontcg.io/v2/cards/)
- **React Router v6** — page routing
- **Vite** — build tool

## Deployment (Vercel)
1. Push to GitHub repo named `pokemonTCG`
2. Import repo on [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — just click Deploy

## Project Structure
```
src/
├── app/
│   └── store.js              # Redux store
├── features/
│   ├── cards/pokemonApi.js   # RTK Query endpoints
│   ├── deck/deckSlice.js     # Deck state (localStorage persisted)
│   └── pack/packSlice.js     # Pack opening state
├── components/
│   ├── Navbar.jsx
│   ├── CardItem.jsx
│   └── DeckPanel.jsx
└── pages/
    ├── SearchPage.jsx
    └── PackPage.jsx
```

## API
Uses the public [Pokémon TCG API](https://pokemontcg.io/) — no API key required for basic usage.
