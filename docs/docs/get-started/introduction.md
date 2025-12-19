---
sidebar_position: 1
---

# Introduction

The Get Started track collects everything you need to ship a cohesive Daikin experience: how to drop Layout and Widget packages into existing apps, how the RAD Template accelerates greenfield builds, and which workflows keep deployments healthy while new content (data fetching, auth, monitoring) lands.

## Choose your path

- **Layer on shared chrome** – Use the Layout package when you need universally-required chrome (auth, header, nav, footer) inside an existing application. Import once, register the custom elements globally, and keep your current framework.
- **Add app-specific UI** – Reach for Widgets when you want reusable alarms, confirmation flows, gauges, tables, or Databricks embeds. They are standalone elements you can sprinkle into any host without adopting the full template.
- **Start fresh** – Use the RAD Template when you are bootstrapping a new full-stack experience. It brings Next.js, design system wiring, auth, testing, CI/CD, and AI-friendly docs so you can ship quickly with consistent patterns.

## Section highlights

- **[Layouts](/get-started/layouts)** – Lit-based `<auth-provider>`, `<app-header>`, `<nav-menu>`, `<user-profile>`, and `<app-footer>` components packaged with Daikin design tokens, Tailwind-aware styles, and Keycloak helpers. Import them directly into any repo to standardize chrome without touching your routing stack.
- **[Widgets](/get-started/widgets)** – Alarm tiles, confirmation modals, energy gauges, Databricks embeds, pagination helpers, right panels, and more. Each custom element is purpose-built UI you can drop into existing dashboards to avoid rebuilding app-specific interactions.
- **[RAD Template](/get-started/rad-template/)** – Next.js App Router starter for new builds. It bundles DDS components via Vite, includes strict TypeScript + Tailwind defaults, ships NextAuth/Keycloak wiring, Playwright + Vitest scripts, Codespaces/Bolt recipes, and AI-friendly briefs (`AGENTS.md`, `CLAUDE.md`).
- **[Testing](/get-started/rad-template/testing)** – Explains when to reach for Playwright (end-to-end smoke) versus Vitest (unit/component) and maps the npm scripts CI relies on.
- **[CI/CD](/get-started/rad-template/cicd)** – Documents the GitHub Actions workflows (`pr-ci.yml`, `e2e.yml`) so you can extend lint/build/test gating or run Playwright sweeps against any URL.
- **[Deployment](/get-started/deployment)** – Netlify-focused instructions covering build commands, env vars, deploy previews, and the in-progress Bedrock cluster deployment target.
- **[Developer sandbox & AI helpers](/get-started/rad-template/sandbox)** (plus [Building with AI](/get-started/rad-template/AI/index.md)) – Guides for spinning up GitHub Codespaces, sharing forwarded ports, and letting Bolt or Codespaces chat agents consume the project briefs safely.
- **[Samples](/samples/AI-Generated%20Apps/energy-management)** – Screenshot-heavy references for layouts, widgets, templates, and AI-generated dashboards (Energy Management, Fault Detection, SOX Audit) that showcase the end-state experiences these packages enable.

## In progress

Dedicated walkthroughs for Data Fetching (Database, Databricks, Dosatsu), User Authentication, and Monitoring & Observability are still being written—expect “Coming soon…” placeholders until those deep dives land. Use this page as your map, and return as new sections fill in.
