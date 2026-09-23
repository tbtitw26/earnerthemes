# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Next.js dev server (Turbopack) on http://localhost:3000.
- `npm run build` — production build (Turbopack).
- `npm start` — serve the built app.
- `npm run lint` — ESLint (`next/core-web-vitals` + `next/typescript`). No autofix script wired up; pass `--fix` manually.
- `npm run import:themeforest` — runs `scripts/import-themeforest.mjs` with `.env` auto-loaded; reads `src/data/themeforest-sources.json` and writes the catalog to `src/data/themeforest-templates.json` (consumed at build time via `src/data/themeforestTemplates.ts`). Re-run whenever sources change.
- No test runner is configured.

`next.config.ts` sets `eslint.ignoreDuringBuilds: true` and `typescript.ignoreBuildErrors: true` — `npm run build` will not catch lint or type errors. Run `npm run lint` and `tsc --noEmit` explicitly before shipping.

## Architecture

Next.js 15 App Router (React 19) monolith that serves both the storefront and its API/auth/DB layer from one process. Path alias: `@/*` → `src/*`.

### Two stacks share one repo
- **Frontend** lives in `src/app/**` (pages), `src/components/**`, `src/context/**`, `src/pageSchemas/**`. Client code uses Zustand (`src/utils/store.ts`), MUI/Joy + Emotion, SCSS modules, Framer Motion, Swiper.
- **Backend** lives in `src/backend/**` and is consumed only by route handlers under `src/app/api/**`. The convention is `route.ts → controller → service → mongoose model`. Do not import from `src/backend` in client components — the imports pull in Mongoose/Node-only modules.

### Auth flow (important)
- JWT pair: short-lived access token + opaque refresh, both stored as HTTP-only cookies (names from `ENV.ACCESS_COOKIE_NAME` / `ENV.REFRESH_COOKIE_NAME`, defaults `access_token` / `refresh_token`). Refresh sessions are persisted as hashed tokens in the `RefreshSession` Mongoose model and rotated on every refresh.
- `src/utils/authWrapper.tsx` wraps the **root layout** (`src/app/layout.tsx`). On every server render it calls `/api/auth/me`, falls back to `/api/auth/refresh` if the access token is missing/expired, and injects the resolved user into `UserProvider`. Anything reading `useUser()` depends on this wrapper running.
- Client-side route guarding is in `src/components/utils/protected-route/ProtectedRoute.tsx` driven by `authRoutes` (require login) and `disallowedRoutes` (redirect away when logged in). Update those lists when adding gated pages — middleware does **not** enforce auth.
- API route handlers protect themselves by calling `requireAuth(req)` from `src/backend/middlewares/auth.middleware.ts`.

### Schema-driven page renderer
A custom CMS-like renderer lets pages be defined declaratively:

- `src/pageSchemas/<page>/<page>.<lang>.ts` exports a `PageSchema` per locale (`en`, `sv`).
- `src/components/utils/page-creator/PageCreator.tsx` is a client component that picks the schema for the active language (`pickSchemaByLang`, fallback `sv`) and hands it to `PageRenderer` (`src/components/constructor/page-render/PageRender.tsx`).
- `PageRender` switches on `block.type` (`text`, `media`, `section`, `grid`, `slider`, `faq`, `card`, `pricing`, `custom`) and on `block.component` for `custom` blocks (e.g. `HeroSection`, `ContactForm`, `Marquee`, `Timeline`). Adding a new block kind requires updating both `types.ts` and the `RenderCustom`/main switch in `PageRender.tsx`.
- `src/resources/media.ts` holds a string-keyed registry; schemas reference assets by key (`image: "image1"`) and `resolveMedia()` looks them up.

Some pages (e.g. `src/app/page.tsx`) bypass the schema system and compose constructor components directly — both styles coexist.

### i18n
Locale state is client-only via `src/context/i18nContext.tsx` (`"en" | "sv"`, persisted in `localStorage`, default `sv`). There is no Next.js i18n routing — the same URL renders different copy depending on the stored language. Server-rendered metadata is single-language.

### Theme/template catalog
`src/data/themeforest-templates.json` is the source of truth at runtime. It is **generated** by `npm run import:themeforest` from `themeforest-sources.json` via `scripts/themeforest/*.mjs` (Envato API + HTML fallback). Treat the JSON as build artifact: edit sources or the importer, not the JSON. The catalog is consumed by `src/backend/services/templateCatalog.service.ts` (lookup by id/slug for purchases) and by frontend showcase components.

`src/data/themeforestTemplates.ts` resolves each imported record before the UI sees it (`src/data/templateContent.ts`): descriptions fall back **curated override → cleaned imported copy → generated factual copy**, and an inferred page builder is dropped unless the template's own title or description names it. Hand-maintained sources (edit these, not the generated JSON):
- `src/data/template-descriptions.json` — per-id product descriptions, used where the import produced empty or scraper-polluted copy.
- `src/data/template-licences.json` — per-id licence overrides and Product-Specific Terms.

### Pre-purchase licence disclosure
`src/resources/licence.ts` holds the licence wording shown before payment and **must stay in sync with section 5 of `src/pageSchemas/licence-agreement/licenceAgreement.en.ts`**. It is rendered by `TemplateLicenceSummary` (product page buy card + "Licence & usage" panel), on the cart summary, and inside `TemplatePurchaseConfirmDialog`, where the customer must tick both the licence acknowledgement and the withdrawal waiver before a purchase can be confirmed.

### Cart & checkout
Two cart concepts coexist in `src/utils/store.ts`:
- `useCheckoutStore` — single-plan checkout (pricing tier), in-memory.
- `useTemplateCartStore` — multi-template cart, persisted to `localStorage` under `template-cart`.

Purchases go through `/api/template-purchases/*` and persist to `templatePurchase.model`.

### Misc backend integrations
- **Email**: nodemailer SMTP **and** Resend are both wired (`ENV.SMTP_*` and `ENV.RESEND_API`); `email.service.ts` decides which to use.
- **OpenAI**: optional, gated by `ENV.OPENAI_API_KEY` (defaults to `"none"`).
- **PDF generation**: `@react-pdf/renderer` for client-downloadable PDFs in `src/pdf-creator/**` (currently `training-plan` and `culinary-course`); `downloadUniversalPDF` switches by `order.fields.domain` / `order.category`.
- **DB**: `connectDB()` in `src/backend/config/db.ts` memoizes the Mongoose connection — call it at the top of every API route that touches Mongo.

### Required env vars
`src/backend/config/env.ts` throws at import time if anything without a default is missing. Required: `MONGODB_URI`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`. Optional but commonly used: SMTP_*, `RESEND_API`, `OPENAI_API_KEY`, `APP_URL`, `NEXT_PUBLIC_FRONTEND_URL` (used by `baseURL` in `src/resources/content.ts` for server-side fetches), `NEXT_PUBLIC_COMPANY_*` (branding strings consumed across the UI).

### Styling
Global CSS variables (`--primary-color`, `--text-primary`, etc.) are defined in `src/app/globals.css` and referenced from `src/resources/styles-config.ts` (button colors, card/header/footer config, hover effects). Component styles use SCSS modules colocated next to the component.
