# Shapetaker Portfolio

Portfolio, module showcase, and manual site for Shapetaker VCV Rack modules.

## Stack

- Next.js App Router with TypeScript
- React client components for interactive module panels
- Tailwind CSS v4 plus a global design layer
- Static export via `next.config.ts`, which writes deployable files to `out`
- Module/manual content currently lives in `src/data/modules.ts`

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

Local development runs at `http://localhost:3000`.

## Content

- Add or edit modules in `src/data/modules.ts`.
- IBM Plex Sans is loaded with `next/font/google` in `src/app/layout.tsx`.
- Put licensed brand/title webfonts in `public/fonts`, then define `@font-face` rules in `src/app/globals.css`.
- Put audio or video walkthroughs in `public/media`, then connect the paths in each module's `media` field.
- Replace the generated rack-panel styling in `src/components/ModuleExplorer.tsx` once exact module panel artwork is ready.

## Deployment

Run:

```bash
npm run build
```

Upload the generated `out` directory to static hosting for `shapetaker.com`.
