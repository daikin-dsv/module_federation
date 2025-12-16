---
sidebar_position: 8
---

# Deployment

## Netlify

Netlify is the recommended deployment target for PoCs using RAD Template because it pairs cleanly with GitHub:

- **Tight GitHub integration** — connect the repository once and let Netlify manage build hooks for `main`, release branches, or ad-hoc refs.
- **Deploy Previews** — every pull request receives an isolated preview URL so reviewers and QA can validate UI, localization, and authentication changes without running the project locally.
- **Branch auto-deploy** — select a branch (e.g., `main` or `release/*`) that should continuously ship to the production site, while other branches can map to staging/sandbox sites.
- **Next.js support** — Netlify’s Next.js adapter handles Edge/SSR functions automatically and respects `npm run build`.

### Basic Netlify setup

1. **Connect repository**: In Netlify, choose _Import from Git_ → GitHub → select `your-rad-template-clone`.
2. **Build command**: `npm run build`. (This runs the Vite build first, then the Next.js build.)
3. **Publish directory**: `.next`.
4. **Environment variables**: configure the same values found in `.env.local`, such as `RAD_URL`, `AUTH_SECRET`, `AUTH_KEYCLOAK_*`, and `BYPASS_AUTH` for preview environments. Netlify supports per-environment overrides so you can keep production secrets separate from previews.
5. **Deploy contexts**: enable Deploy Previews for pull requests and branch deploys for long-lived environments (e.g., map `develop` to a QA site).

After Netlify finishes a deploy, it posts status checks back to GitHub. Combine those with the GitHub Actions workflows in `.github/workflows/` for full CI/CD coverage (lint/tests via Actions, hosting via Netlify).

### Operational tips

- Use the Netlify CLI (`netlify link` + `netlify deploy`) when you need to generate an on-demand preview that is not tied to a PR.
- Keep Playwright E2E runs pointed at the Netlify preview URL by overriding the `rad_url` input in the `E2E Tests` workflow.
- When adding new environment variables, update Netlify’s Env UI and document the change in `.env.example` so the settings stay in sync.

## In-progress target: Bedrock cluster

The team is also investing in a Bedrock cluster deployment path for Shared Service development. This is still **under active development**.

Updates on the Bedrock work will be published here as it becomes available.
