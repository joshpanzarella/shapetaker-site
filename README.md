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
While `npm run dev` is running, saving files in `src/content/blog` regenerates the notes data so the browser preview can refresh.

## VS Code Preview

1. Run the `Shapetaker: dev preview` task, or run `npm run dev` in the integrated terminal.
2. Open the command palette and choose `Simple Browser: Show`.
3. Enter `http://localhost:3000/blog`.
4. Move the browser tab to a side editor group and edit MDX files from `src/content/blog` beside it.

## Content

- Add or edit modules in `src/data/modules.ts`.
- Add or edit field notes in `src/content/blog`.
- The unlisted employer-facing profile page lives at `/profile` and uses `noindex` metadata.
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
