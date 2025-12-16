---
sidebar_position: 2
---

# Testing

This guidance applies to the RAD template in this repository. Testing gives us confidence that the template doesn't break while adding new features. RAD recommends and includes two complementary tools:

- **Playwright** for end-to-end (E2E) coverage that mimics how users interact with the federated apps in a browser.
- **Vitest** for fast unit or component-level checks (ideal for utilities, data helpers, and component testing).

Use both where they shine: E2E for “does the production build behave correctly?”, unit tests for “does this function/component handle edge cases?”.

## When to Reach for Each Tool

- **Playwright (E2E)**
    - ✅ Great for verifying multi-service flows, integration points, accessibility, and regressions that only appear once everything is bundled.
    - ⚠️ Slower to run, harder to keep stable—reserve for smoke tests around high-value flows (auth, navigation, cross-app contracts).
- **Vitest (Unit/Component)**
    - ✅ Fast feedback loop, excellent for rendering components with mocked props, exercising utility functions, and enforcing edge cases.
    - ⚠️ Doesn’t catch issues introduced by bundlers, environment config, or remote dependency wiring.

## Playwright: End-to-End Testing

Playwright specs live under `tests/e2e`. They exercise the Next.js app end-to-end: authentication flows, navigation chrome, and the reference dashboard routes.

### Running the Suites

Your project may expose different npm scripts. In the template, we provide:

- **CLI mode (headless):**

    ```bash
    ENV=local npm run test:e2e
    ```

    Runs every Playwright spec defined for the RAD template.

- **UI mode (debugging flaky tests, stepping through flows):**
    ```bash
    ENV=local npm run test:e2e:dev
    ```
    The Playwright UI lets you re-run individual specs, capture traces, and inspect screenshots.

## Vitest: Unit & Component Testing

Tests are colocated where the file/component lives. i.e. `components/__tests__`.

### Running Tests

Use the following scripts from `package.json`:

```bash
npm run test:component           # Vitest run (CI-friendly)
npm run test:component:ui        # Vitest UI watcher
npm run test:component:coverage  # Code coverage calculation
```
