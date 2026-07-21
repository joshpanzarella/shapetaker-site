# Shapetaker Portfolio

Portfolio, module showcase, and manual site for Shapetaker VCV Rack modules.

## Stack

- Next.js App Router with TypeScript
- React client components for interactive module panels
- Tailwind CSS v4 plus a global design layer
- Next.js production build for Cloudflare/OpenNext deployment
- Module/manual content currently lives in `src/data/modules.ts`

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Updating panel images

When module art changes in the plugin, rebuild the plugin (`make` in
`~/vcv-dev/shapetaker`), then:

```bash
npm run panels -- clairaudient   # update just the module(s) you changed
npm run panels                   # re-render and compare everything
```

The script screenshots every module through VCV Rack (a Rack window opens
briefly), re-encodes to webp, and — only when the art actually changed —
writes a new `panel-vN.webp`, deletes the old file, and rewrites the
`src`/`width`/`height`/`hp` fields in `src/data/modules.ts`. The filename
version bump is intentional: browsers, CDNs, and the Next image optimizer
cache by URL, so reusing a filename would keep showing stale art.

Notes:

- Panels render from the *compiled* plugin — if you didn't rebuild, your
  change won't appear.
- Modules with live screens (scopes, radar, displays) draw fresh content
  every launch, so they may report "changed" even when the art didn't.
  Prefer naming the modules you actually edited.
- New plugin modules print a warning until they're added to `slugMap` in
  `scripts/update-panels.mjs` and given an entry in `modules.ts`.
- Review the `git diff` afterwards and commit the webp + `modules.ts`
  together.

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

Cloudflare should build from `main` with the configured Next/OpenNext deployment. A successful GitHub push only updates production after the Cloudflare deployment for that commit completes.
