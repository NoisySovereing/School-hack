# App Factory v1

App Factory is a Next.js + TypeScript + Tailwind web app that lets users define an app idea and generate a full project blueprint.

## What it does

- Collects app details from a dashboard form:
  - App name
  - Short app description
  - Stack choice (`Next.js`, `React`, `Node API`)
  - Feature checklist
  - Starter template choice (`SaaS landing page`, `To-do app`, `Simple CRM`)
- Generates and displays:
  - Folder structure
  - `package.json`
  - `README.md`
  - Starter pages/components
  - Setup instructions
- Stores generated outputs in browser `localStorage` as JSON (`app-factory-blueprints` key).

## Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` - start dev server
- `npm run build` - create production build
- `npm run start` - start production server
- `npm run lint` - run Next.js ESLint checks
- `npm run typecheck` - run TypeScript checks

## App flow

1. Go to dashboard (`/`).
2. Fill out app definition form.
3. Click **Generate Blueprint**.
4. View generated output on `/results?id=<generated-id>`.

## Notes

- No database is used in v1.
- Generated blueprints persist in your browser only.
