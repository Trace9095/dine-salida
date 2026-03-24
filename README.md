# DineSalida.com

Discover the best restaurants, breweries, and cafes in Salida, Colorado. Farm-to-table, craft beer, mountain cuisine, and more.

**Live:** [dinesalida.com](https://dinesalida.com) · **Vercel:** `dine-salida`

---

## Stack

- **Framework:** Next.js 16.1.6 App Router (Turbopack)
- **Database:** Neon PostgreSQL + Drizzle ORM
- **Payments:** Stripe ($99/mo minimum listings)
- **Monorepo:** Turborepo (npm workspaces)
- **Deployment:** Vercel (rootDirectory: `apps/web`)

## Quick Start

```bash
npm install
npm run dev:web          # Next.js dev server

# Database
cd apps/web
npx drizzle-kit push     # push schema
npx tsx scripts/seed.ts  # seed data
```

## Structure

```
apps/web/    — Next.js 16 (Vercel root dir)
apps/mobile/ — Expo (scaffold)
packages/shared/ — @dinesalida/shared
```

## CEO Rules

- $99/mo minimum for listings — NO free tier
- No emojis — Lucide icons only
- No Epic AI branding visitor-facing
- Real photos only — no stock photos
- Fritz Restaurant Salida is CLOSED — never list it
- Every business verified real and OPEN before listing
