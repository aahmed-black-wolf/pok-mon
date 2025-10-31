# Pokémon List Application

A modern, animated Pokémon list application built with Next.js, React, and TypeScript. This application fetches Pokémon data from the PokeAPI and displays it in multiple viewing modes with smooth animations and intuitive navigation.

## Features

- **Dual View Modes**

  - **List Mode**: Paginated list view with customizable page size
  - **Infinite Scroll Mode**: Continuous loading with intersection observer for seamless browsing

- **Interactive Navigation**

  - Animated scroll-to-top button (bottom-left corner)
  - Animated scroll-to-bottom button (top-right corner)
  - Smooth scrolling with intelligent load prevention
  - Smart button visibility based on scroll position

- **Beautiful UI/UX**

  - Responsive grid layout (2 columns mobile, 3 tablet, 4 desktop)
  - Smooth entry animations for Pokémon cards
  - Staggered card animations for visual appeal
  - Custom Pokédex-themed color scheme
  - Loading states and skeleton screens

- **Performance Optimizations**
  - Server-side data fetching for initial load
  - Client-side caching with React Query
  - Optimized API requests with debouncing
  - Programmatic scroll detection to prevent unnecessary loads

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Data Fetching**: TanStack React Query
- **HTTP Client**: Ky
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- Bun >= 1.1.0

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   bun install
   ```

3. Set up environment variables:
   Create a `.env.local` file with:

   ```
   NEXT_PUBLIC_API_URL=https://pokeapi.co/api/v2/
   ```

4. Run the development server:

   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
pok-mon/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page with Pokemon list
│   ├── pokmon/[id]/       # Individual Pokemon detail pages
│   └── layout.tsx         # Root layout
├── src/
│   ├── api/               # API layer
│   │   ├── pok-mon/       # Pokemon-specific API hooks
│   │   │   ├── client/    # Client-side hooks
│   │   │   └── server/    # Server-side functions
│   │   └── @types/        # TypeScript type definitions
│   ├── components/        # React components
│   │   ├── pok-mon/       # Pokemon-specific components
│   │   │   ├── page-infinite-list/  # Infinite scroll view
│   │   │   ├── page-list/           # Paginated list view
│   │   │   └── page-details/        # Detail view
│   │   ├── common/        # Reusable UI components
│   │   │   ├── ui/        # Basic UI components (Button, Card, Pagination)
│   │   │   └── layout/    # Layout components
│   │   └── providers/     # Context providers
│   └── utils/             # Utility functions
│       ├── config/        # Configuration files
│       ├── fetch/         # Fetch utilities
│       └── cn/            # Class name utilities
└── public/                # Static assets
```

## Usage

### View Modes

- **List Mode** (default): Visit `/?mode=list` or just `/`

  - Navigate through pages using pagination controls
  - Customize items per page with `?limit=20`

- **Infinite Scroll Mode**: Visit `/?mode=infinite`
  - Scroll down to automatically load more Pokémon
  - Use corner navigation buttons for quick scrolling

### URL Parameters

- `mode`: `list` or `infinite` (default: `list`)
- `offset`: Page offset for list mode (default: `0`)
- `limit`: Items per page (default: `20`)

### Navigation Buttons

- **Top-Right Button**: Scrolls to the bottom of the list (in infinite mode)
- **Bottom-Left Button**: Scrolls to the top of the page

Both buttons:

- Appear/disappear based on scroll position
- Include smooth fade animations
- Prevent triggering additional API loads during programmatic scrolling

## Development

### Build

```bash
bun build
```

### Start Production Server

```bash
bun start
```

### Linting

```bash
bun lint
```
