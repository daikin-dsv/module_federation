---
sidebar_position: 3
---

# CI/CD Pipelines

Use these Github workflows to keep RAD Template healthy and prove changes before release. Both pipelines live in `.github/workflows/`.

## Pull Request CI (`pr-ci.yml`)

Runs automatically on every pull request and can be triggered manually (`workflow_dispatch`) or by other workflows (`workflow_call`). It fans out a build matrix so problems surface independently:

- **Build** — Executes `npm run build`, which includes the Vite web component bundle followed by the Next.js build.
- **Component Tests** — Executes `npm run test:component` (Vitest). Keep Vitest green when touching components or shared libraries.
- **Lint** — Executes `npm run lint` with eslint + TypeScript rules.
- **Format Check** — Executes `npx prettier --check .` to enforce the Tailwind-aware Prettier config.

A single failure stops only that matrix entry, so reruns can focus on the failing slice. If you add a new validation script, extend the `matrix.include` list so it participates in PR gating.

## E2E Tests (`e2e.yml`)

This workflow is manually triggered via the **Run workflow** button in GitHub Actions. It accepts two inputs:

- `rad_url` — URL that Playwright should target (defaults to the Netlify preview).
- `bypass_auth` — Whether `BYPASS_AUTH` should be `true` or `false` for the run.

The job:

1. Checks out the repository and installs dependencies via `npm ci`.
2. Installs the Playwright browser stack (`npx playwright install --with-deps`).
3. Runs `npm run test:e2e`, which expects `RAD_URL`, `BYPASS_AUTH`, and `AUTHINFO` (secret) env vars.

Use this workflow for regression sweeps against staging or production builds by overriding `rad_url`. Remember to update the secrets or inputs if the upstream environment changes.
