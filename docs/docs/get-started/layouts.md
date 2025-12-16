---
sidebar_position: 3
---

# Layouts

The Layout package contains the shared “chrome” (header, footer, auth, nav) that every application needs. A standalone npm package is in progress; until it’s published, Layout ships as part of this repository and can be referenced as a workspace dependency. The details below describe the API that the package exposes so teams can prepare for the switch.

## Package At A Glance

- Coming soon: `npm install layout` (or the final scoped name) once the package is published. Today, add the Layout workspace as a dependency inside this repo.
- Import the entrypoints once; each import registers its custom elements globally.
- Works in any framework because everything is implemented as standards-based custom elements.

## What's Inside the Layout Package

- Lit-powered components compiled with Rspack.
- Tailwind-aware stylesheet plus Daikin design tokens for consistent typography, color, and spacing.
- Web component registrations so every `daikin-*` primitive is ready to use.
- Keycloak-auth provider and framework-agnostic helpers that broadcast auth changes.
- Playwright smoke tests that cover navigation overflow and user menu journeys.

## Package Install Quick Start

1. **Add the dependency (coming soon).** Publishing to npm (or an internal registry) is underway. Inside this mono-repo you can already depend on the Layout workspace via your package manager’s workspace linking; external consumers will eventually run `npm install layout`.
2. **Register custom elements and shared assets once.** _(These are the planned entrypoints; until the package is published, import directly from the equivalent files in the Layout workspace.)_
    ```ts
    // Registers app-header/footer/nav-menu/user-profile
    import 'layout/auth';
    // Registers daikin-* primitives
    import 'layout/components';
    import 'layout/styles';
    // Tailwind base + Daikin tokens
    import 'layout/webcomponents';

    // Registers auth-provider + exposes helpers
    ```
3. **Render the tags anywhere (React example).**
    ```tsx
    export function Chrome() {
        return (
            <auth-provider>
                <app-header>
                    <user-profile slot=""></user-profile>
                    <a slot="route" href="/home" active>
                        Home
                    </a>
                    <nav-menu slot="route" parentNav="Settings">
                        <a slot="child-nav" href="/alerts">
                            Alerts
                        </a>
                    </nav-menu>
                </app-header>
                <app-footer></app-footer>
            </auth-provider>
        );
    }
    ```

Because the components are Lit-based custom elements, they work in any framework after import; hosts just need to manage routing state (setting/removing `active` attributes) and provide slot content.

## Exported Modules & Custom Elements

| Import specifier               | Custom element    | Summary                                                                                                                                                   |
| ------------------------------ | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `layout/auth`                  | `<auth-provider>` | Initializes Keycloak, keeps an in-memory snapshot, and exports `getCurrentUser`, `isAuthenticated`, `onAuthChange`, `offAuthChange`, `clearAuthSnapshot`. |
| `layout/components/Header.js`  | `<app-header>`    | Responsive top nav with slots for `logo`, `route`, `overflow-route` (managed automatically), and right-aligned actions.                                   |
| `layout/components/NavMenu.js` | `<nav-menu>`      | Dropdown/overflow controller that keeps `parentNav` buttons in sync with active `child-nav` links.                                                        |
| `layout/components/User.js`    | `<user-profile>`  | Avatar button that shows Keycloak identity details, locale-aware language labels, and logout/account management actions.                                  |
| `layout/components/Footer.js`  | `<app-footer>`    | Minimal responsive footer with a copyright slot and a `footer-items` slot for external links.                                                             |

### Component Details

- **`<auth-provider>`** wraps your routing tree, waits for Keycloak to finish, and emits an `auth-changed` event through the shared auth store. Tokens persist to `localStorage` and refresh automatically.
- **`<app-header>`** measures route widths once, caches them, and uses a `ResizeObserver` + `<nav-menu>` to overflow excess links into a “More” dropdown. Hosts own navigation state via the `active` attribute.
- **`<nav-menu>`** listens for slot mutations/resizes and highlights whichever `child-nav` element has `active`. Works both inline and when auto-moved into overflow.
- **`<user-profile>`** reads the shared auth snapshot and exposes optional props:
    - `text` for localization overrides (merges with the package’s default copy).
    - `logoutLink` to redirect instead of calling the provided `logout()` helper.
    - `accountManagementLink` to replace the default Keycloak console URL.
- **`<app-footer>`** derives the current year automatically and exposes a `footer-items` slot for custom links, badges, or legal copy.

## Customization & Theming

- **Text/localization:** Override via attributes/props (e.g., `<app-footer copyright="2025 Daikin Tokyo">`) or pass an object to `<user-profile text={...}>`.
- **Slots:** All navigation links/buttons are provided via slots so hosts can render React components, plain anchors, or other custom elements.
- **Tokens:** Styling leans heavily on Daikin CSS variables (e.g., `--dds-color-common-brand-default`). Override these tokens in your host CSS to tweak colors without forking the components.

## Auth & SSO Notes

- Defaults target the Daikin dev Keycloak realm (`https://sso-dev.daikinlab.com/auth`, realm `daikin`, client `rad-application`). Update the package-level Keycloak config for other environments.
- Tokens live in `localStorage` as `kc_token` / `kc_refreshToken`. The refresh loop runs every 10 seconds and only refreshes when expiry is near.
- `logout(options)` clears tokens and calls the Keycloak logout endpoint; `accountManagement()` opens the account console. Both helpers ship with the package for hosts to call directly when needed.
