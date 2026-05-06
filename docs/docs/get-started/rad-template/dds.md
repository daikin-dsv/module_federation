---
title: Daikin Design System
sidebar_position: 9
---

# Daikin Design System

This template ships the full Daikin Design System on two layers:

- **Tokens** — every color, spacing, radius, border, and typography value comes from
  [`@daikin-oss/dds-tokens`](https://www.npmjs.com/package/@daikin-oss/dds-tokens) as
  `--dds-*` CSS custom properties (and matching Tailwind v4 utilities).
- **Components** — the DDS component library
  ([`@daikin-oss/design-system-web-components`](https://www.npmjs.com/package/@daikin-oss/design-system-web-components))
  ships as Lit-based custom elements. This template wraps them for React via codegen,
  so you write idiomatic React JSX with typed props, typed events, and typed refs.

You should never write a hex code, and you should never `import` a custom-element
class by hand.

Please refer to the [DDS documentation](https://www.daikindesign.com/) for the full API.

## What's wired up out of the box

**Tokens.** `app/globals.css` imports the token CSS and the Tailwind plugin:

```css
@import url('@daikin-oss/dds-tokens/css/daikin/Light/variables.css');
@import 'tailwindcss';
@plugin '@daikin-oss/tailwind';
```

That single import gives you ~200 `--dds-*` CSS custom properties and the matching
Tailwind v4 utilities globally.

**Components.** `app/webcomponents.ts` re-exports `app/webcomponents.generated.ts`,
which registers every `daikin-*` custom element with the browser at startup. The
registration file and the matching React wrappers
(`app/components/dds-wrappers.generated.tsx`) are produced by
[`generate-dds-react-wrappers`](../packages/generate-dds-react-wrappers)
— they are codegen output, not hand-written. As long as `app/webcomponents.ts` is
imported once at app boot (it already is from `app/layout.tsx`), every wrapper
just works.

## Components

DDS components ship as Lit-based custom elements. Lit is great in vanilla HTML but
awkward in React: React 18 and earlier mis-handle custom events and pass non-string
props as string attributes. To bridge that, this template generates typed React
wrappers from the package's Custom Elements Manifest (via `@lit/react`'s
`createComponent`), so you write idiomatic React and the wrapper handles the Lit
interop for you.

### Importing and using a wrapper

```tsx
'use client';

import { DaikinButton, DaikinModal } from '@/app/components/dds-wrappers';

export function Example() {
    return (
        <>
            <DaikinButton variant="primary" onClick={() => console.info('clicked')}>
                Save
            </DaikinButton>
            <DaikinModal open onBeforeClose={(e) => e.preventDefault()}>
                …
            </DaikinModal>
        </>
    );
}
```

What the wrapper handles for you:

- **Custom events become `onXxx` props.** `daikin-modal`'s `beforeclose` event is
  exposed as `onBeforeClose`, fully typed with the right `CustomEvent` detail.
  No `ref.current.addEventListener` needed.
- **Non-string props pass through correctly.** Booleans, numbers, arrays, and
  objects (e.g. `daikin-table`'s `columns` / `rows`,
  `daikin-combobox`'s `items`) are set as DOM properties, not stringified attributes.
- **Element registration is automatic.** Importing `app/webcomponents.ts` once
  (already done in the root layout) defines every custom element. You don't call
  `customElements.define` yourself.
- **Refs are typed to the underlying element**, e.g.
  `useRef<HTMLDaikinButtonElement>(null)`.

### `'use client'` only

The wrappers depend on `customElements` being registered, which only happens in
the browser. Any file that imports from `@/app/components/dds-wrappers` must live
under a `'use client'` boundary.

### Looking a component up

Read the matching skill page, not the wrapper source:

- `.agents/skills/daikin-design-system/components/<tag>.md` — props, events,
  slots, CSS parts, per-component custom properties, and usage snippets.

### What you should not do

- **Don't hand-write `<daikin-button>` in JSX.** Use the `DaikinButton` wrapper.
  The raw tag works at runtime but loses event typing and prop ergonomics, and
  it bypasses the registration guarantee.
- **Don't import directly from `@daikin-oss/design-system-web-components`** in
  app code. Always go through the generated wrappers.
- **Don't edit the generated files** (`app/components/dds-wrappers.generated.tsx`,
  `app/webcomponents.generated.ts`). Re-run `npm run generate:dds` instead. They
  are also regenerated automatically on `prebuild`.

## Two ways to reference a token

### 1. As a CSS variable

```tsx
<div style={{ backgroundColor: 'var(--dds-color-common-brand-default)' }} />
```

```tsx
<div className="bg-[var(--dds-color-common-brand-default)]" />
```

### 2. As a Tailwind v4 utility

The same token is exposed as a typed Tailwind utility:

```tsx
<div className="bg-dds-color-common-brand-default text-dds-color-common-text-inverse p-dds-space-400 rounded-dds-border-radius-100" />
```

The utility name is always the CSS variable name with the leading `--` dropped,
prefixed by Tailwind's namespace (`bg-*`, `text-*`, `p-*`, `m-*`, `rounded-*`, …).

## Component-specific overrides

Most DDS components expose a few `--dds-*-*` knobs of their own
(e.g. `--dds-button-corner-radius`). These are listed per-component in the skill
at `.agents/skills/daikin-design-system/components/<tag>.md` under
`## CSS custom properties`. For finer-grained styling, components also expose
`::part()` selectors — same file, `## CSS parts` section.

Never reach into a component's shadow DOM directly. Style only via tokens, CSS
parts, and the documented per-component custom properties.

## Upgrading

```bash
npm install @daikin-oss/dds-tokens@latest @daikin-oss/design-system-web-components@latest
npm run generate:dds   # refreshes the React wrappers + element registrations
npm run sync:skills    # refreshes tokens.md inside the skill and the per-component skill pages
```

`generate:dds` re-reads the package's Custom Elements Manifest and rewrites
`app/components/dds-wrappers.generated.tsx` and `app/webcomponents.generated.ts`.

`sync:skills` pulls the latest skill content from `daikin-dsv/rad-platform`,
which updates `tokens.md` from the latest `@daikin-oss/dds-tokens` and component skills from `@daikin-oss/design-system-web-components`. If you
upgrade locally, run `sync:skills` to keep the LLM reference in step.

For more information, please read the [generate-dds-react-wrappers](../packages/generate-dds-react-wrappers) and [skills](../rad-template/AI/skills) docs.
