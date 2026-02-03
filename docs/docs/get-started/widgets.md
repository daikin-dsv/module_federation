---
sidebar_position: 2
---

# Widgets

Our widgets bundle delivers ready-to-use data visualization and interaction components (alarm tiles, confirmation modals, gauges, pagination helpers, and more). A standalone npm package is in progress.

## Package At A Glance

- Coming soon: installable via `npm install widgets` (or its final scoped name). Until the package is published, treat this document as a preview of the API surface.
- Components are Lit-based custom elements that sit on top of DDS web components and DDS tokens.
- Each widget focuses on a narrow task (alerts, telemetry, confirmation flows) so hosts can mix and match without rebuilding UI fundamentals.

## What's Inside

- Storyboard/demo shell that shows how the components work together.
- Tailwind-aware stylesheet plus DDS tokens for color and typography consistency.
- Lit components covering alarms, confirmation flows, energy usage, water/gas cards, IoT toggles, Databricks embeds, and paginated tables.
- Localization defaults for alarms, confirmation windows, lights, right-panel metadata, and pagination.
- [Playwright](https://playwright.dev/) coverage validating alarms, confirmation modals, and right-panel interactions.

## Package Install Quick Start

1. **Add the dependency (coming soon).** Publishing to npm (or your internal registry) is underway. Once available, install it like any other package; until then you can mirror the upcoming API in your apps so the swap is painless.
2. **Import the widgets you need.** Planned entrypoints look like:

    ```ts
    import 'widgets/components/Alarm.js';
    import 'widgets/components/ConfirmationWindow.js';
    import 'widgets/components/DatabricksDashboard.js';
    import 'widgets/components/EnergyGauge.js';
    import 'widgets/components/InfoCard.js';
    import 'widgets/components/Light.js';
    import 'widgets/components/TablePagination.js';
    import 'widgets/styles';

    // ...and any future widgets
    ```

3. **Render them anywhere.**

    ```html
    import { WaterIcon } from 'widgets/components/InfoCard.js';

    export function Dashboard() {
        return (
            <>
                <widget-alarm count="3" color="yellow"></widget-alarm>
                <energy-gauge usage="950" maxUsage="4000" buildingName="HQ West"></energy-gauge>
                <info-card label="Water" value="512 ft³">
                    <span slot="icon" .innerHTML=${WaterIcon}></span>
                </info-card>
                <light-widget label="Lobby Lights"></light-widget>
                <widget-confirmation-window
                    .open=${showModal}
                    danger
                    @confirm=${handleConfirm}
                    @cancel=${handleCancel}
                ></widget-confirmation-window>
                <table-pagination
                    start-index="0"
                    end-index="25"
                    total-items="250"
                    current-page="1"
                    total-pages="10"
                    text-key="alertsText"
                    lang="en"
                    @page-change=${onPageChange}
                ></table-pagination>
            </>
        );
    }
    ```

Because they are custom elements, React/Vue/Angular/vanilla hosts can all use the same tags; you just pass attributes/props and listen for DOM events.

## Available Widgets

| Import specifier                            | Custom element                 | Summary                                                                                   |
| ------------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------- |
| `widgets/components/Alarm.js`               | `<widget-alarm>`               | Circular alert tile showing a severity icon plus a count (supports red/yellow/green).     |
| `widgets/components/ConfirmationWindow.js`  | `<widget-confirmation-window>` | Accessible modal with warning icon, copy overrides, and `confirm`/`cancel` events.        |
| `widgets/components/EnergyGauge.js`         | `<energy-gauge>`               | Semi-circular usage gauge with gradient fill, current kWh, and building label.            |
| `widgets/components/InfoCard.js`            | `<info-card>`                  | Compact icon+label+value card—good for water/gas/occupancy stats (slot for custom icons). |
| `widgets/components/Light.js`               | `<light-widget>`               | Interactive light-tile that toggles between on/off states with an overlay menu.           |
| `widgets/components/DatabricksDashboard.js` | `<databricks-dashboard>`       | Thin iframe wrapper for embedding Databricks dashboards with load/error hooks.            |
| `widgets/components/TablePagination.js`     | `<table-pagination>`           | Results summary + `<daikin-pagination>` wrapper emitting `page-change` events.            |
| `widgets/components/RightPanel.js`          | `<right-panel>`                | Optional contextual side panel rendering key/value metadata inside tabs.                  |

## Component Details

- **`<widget-alarm>`**
    - Props: `count` (default `1`), `color` (`'red' | 'yellow' | 'green'`), `text` (override copy from `alarmText`).
    - Renders a Daikin card with alarm icon + count. Use `text` to localize singular/plural labels.
- **`<widget-confirmation-window>`**
    - Props: `open`, `danger` (switches button color), `text` (override `confirmationWindowText`).
    - Events: `confirm`, `cancel` bubble to the host. Modal sets `modal-role="alertdialog"` for accessibility.
- **`<energy-gauge>`**
    - Props: `usage`, `maxUsage`, `buildingName`.
    - Calculates arc fill percentage and uses Daikin gradients. Ensures values are labeled with start/end ticks.
- **`<info-card>`**
    - Props: `label`, `value`. Slot `icon` for inline SVG or other adornments.
    - Perfect for summary KPIs like water usage, occupancy, or battery state.
- **`<light-widget>`**
    - Props: `label`, `state` (`'on' | 'off'`), `showToggle`, `text` (override on/off labels).
    - Clicking opens an overlay menu letting users switch states; emits no events by default, so wrap the `_setState` call if you need to sync with backends.
- **`<databricks-dashboard>`**
    - Props: `src`, `width`, `height`.
    - Dispatches DOM `load` and `error` events when the iframe state changes, enabling skeletons or retries.
- **`<table-pagination>`**
    - Props: `start-index`, `end-index`, `total-items`, `current-page`, `total-pages`, `lang`, `text-key`, `text` (to override copy entirely).
    - Emits `page-change` with `{ page }` whenever users interact with the pagination control.
- **`<right-panel>`**
    - Props: `open`, `data` (plain object). When `open` is true it renders a tabbed panel that maps object keys to the built-in localization dictionary.
    - Useful for showing metadata like thresholds, aggregates, or min/max spans alongside charts.

## Customization & Localization

- **Text/localization:** Each widget ships with sensible copy defaults. Pass `text` overrides to Alarm, Confirmation Window, Light, and Table Pagination for translation/custom wording.
- **DDS tokens:** Colors and spacing lean on DDS CSS variables (for example, `--dds-color-common-brand-default`). Override tokens in host CSS to re-theme without touching components.
- **Slots:** `<info-card>` exposes an `icon` slot; future widgets follow the same pattern for custom visuals.

## Auth & Integration Notes

- Widgets are presentation-only; they do not couple to Keycloak or Layout auth helpers. Use them inside `<auth-provider>` (from Layout) or any other context.
- For data-driven widgets (gauges, cards, right panel), you control all props. No network requests happen inside the components.
