---
sidebar_position: 4
---

# Template

## Why Use This Template?

- Ship a full-stack app quickly with Next.js App Router, TypeScript, and React 19.
- Built-in Daikin design system web components via `public/webcomponents.js`, with React wrappers for seamless usage.
- Opinionated auth with NextAuth + Keycloak; local bypass available for rapid development.
- Strong defaults: strict TypeScript, Tailwind utilities, and ready-to-run E2E + component tests.
- Repository: https://github.com/daikin-dsv/rad-template/
- Live deployment: https://rad-template.netlify.app/

## What’s Inside

- **Next.js (App Router):** Routes, layouts, and server actions under `app/`.
- **Design System:** Custom elements bundled via Vite; React wrappers in `app/components/dds-wrappers.tsx`; registration in `app/webcomponents.ts`.
- **Auth:** NextAuth wired for Keycloak; helpers live in `lib/auth/`.
- **Styling:** Global styles in `app/globals.css`; design tokens documented in `CSS_VARIABLES.md`; Tailwind utilities available.
- **Tests:** Playwright E2E in `tests/`; Vitest component tests via `npm run test:component`.
- **Types:** Shared declarations in `types/`.

## Quick Start

1. Install dependencies:
    ```bash
    npm install
    ```
2. Configure environment:
    ```bash
    cp .env.example .env.local
    npx auth secret   # generates AUTH_SECRET
    ```
    Set required variables:
    ```
    RAD_URL=
    AUTH_SECRET=
    AUTH_KEYCLOAK_ID=
    AUTH_KEYCLOAK_SECRET=
    AUTH_KEYCLOAK_ISSUER=
    BYPASS_AUTH=true   # for local dev to skip Keycloak
    ```
3. Run the app:
    ```bash
    npm run dev    # http://localhost:3006
    ```
4. Develop the design system bundle when touching web components:
    ```bash
    npm run dev:webcomponents
    ```

## Common Scripts

- `npm run dev` — Start Next.js dev server.
- `npm run dev:webcomponents` — Watch/rebuild design system bundle.
- `npm run build` — Production build (runs Vite bundle then Next.js build).
- `npm run lint` — ESLint + Prettier (Tailwind plugin).
- `npm run format` — Prettier format.
- `npm run test:component` — Vitest component tests.
- `ENV="local" npm run test:e2e` — Playwright E2E (requires dev server).

## Working With the Design System

- Use React wrappers in `app/components/dds-wrappers.tsx`.
- Register new custom elements in `app/webcomponents.ts`.
- Update `CSS_VARIABLES.md` when adding or renaming design tokens.

## Localization

- Locale bundles live in `app/locale/`; extend `SupportedLocale` in `app/locale/types.ts` when adding languages.

## Auth Notes

- Default auth uses NextAuth with Keycloak.
- For local iteration, set `BYPASS_AUTH=true` in `.env.local` to skip the Keycloak flow.

## Conventions & Expectations

- Favor small, focused changes.
- Keep to existing file structure and naming.
- Use type-safe patterns; avoid suppressing TypeScript errors.
- Before PRs, run relevant `npm run test:*` and `npm run lint`.

## Troubleshooting

- Env changes require restarting the dev server.
- If custom elements aren’t rendering, verify `public/webcomponents.js` is built/imported and that new elements are registered.
- E2E tests need the dev server running at `http://localhost:3006`.

## Useful Paths

- App routes and components: `app/`
- React design system wrappers: `app/components/dds-wrappers.tsx`
- Web component registration: `app/webcomponents.ts`
- Auth helpers: `lib/auth/`
- Global styles: `app/globals.css`
- Tokens reference: `CSS_VARIABLES.md`
- E2E tests: `tests/`
- Shared types: `types/`
