# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Primary Development

```bash
npm run dev          # Start development server at http://localhost:3000
npm run build        # Build for production
npm run deploy       # Build + deploy to Firebase Hosting
npm run start        # Start production server
npm run lint         # Run ESLint
npm run ahem         # Build + deploy to Firebase Hosting if it doesnt work the first time
```

### TypeScript

```bash
npx tsc --noEmit     # Type check without emitting files
npx tsc --watch      # Watch mode type checking
```

## Project Architecture

### Technology Stack

- **Next.js 15.5.2** with App Router (not Pages Router)
- **React 19.1.0** with latest features
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** (new architecture with `@import "tailwindcss"`)
- **Geist fonts** (Sans and Mono) via `next/font/google`

### Key Architectural Decisions

1. **App Router Structure**: Uses the modern `src/app/` directory structure instead of `pages/`
   - `layout.tsx` handles root HTML structure and global providers
   - `page.tsx` files define route components
   - Path alias `@/*` maps to `./src/*`

2. **Tailwind CSS v4 Integration**:
   - Uses the new `@tailwindcss/postcss` plugin architecture
   - Global styles in `src/app/globals.css` with custom CSS properties
   - Inline theme configuration using `@theme inline` directive
   - Dark mode support via `prefers-color-scheme`

3. **Font Strategy**:
   - Geist fonts loaded via `next/font/google` with variable fonts
   - CSS custom properties: `--font-geist-sans` and `--font-geist-mono`
   - Automatic font optimization and loading

4. **ESLint Configuration**:
   - Uses new flat config format (`eslint.config.mjs`)
   - Extends `next/core-web-vitals` and `next/typescript`
   - Properly ignores build artifacts and Next.js internals

### File Structure Patterns

``` txt
src/app/           # App Router pages and layouts
├── layout.tsx     # Root layout with fonts and metadata
├── page.tsx       # Home page component
├── globals.css    # Global styles with Tailwind v4
└── favicon.ico    # Site favicon

public/            # Static assets served from root
├── *.svg          # Icon assets (next, vercel, file, globe, window)
```

## Deployment

```bash
npm run build
firebase deploy --non-interactive
```

Set environment before build for absolute OG URLs:

```bash
export NEXT_PUBLIC_SITE_URL="https://qrcode-d276d.web.app"
```

Key static export notes:

- `next.config.ts` uses `output: 'export'`
- `/test/opengraph-image` declares `export const dynamic = 'force-static'`

### Development Notes

- Development server runs on port 3000 by default
- Hot reloading enabled for all file changes
- TypeScript strict mode enforced with ES2017 target
- Image optimization handled by Next.js `Image` component
- Static assets should be placed in `public/` directory
