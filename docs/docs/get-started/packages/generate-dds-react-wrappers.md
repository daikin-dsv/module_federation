---
sidebar_position: 1
---

# generate-dds-react-wrappers

`generate-dds-react-wrappers` is the codegen script that produces this template's typed React wrappers and custom-element registrations from the [Daikin Design System][dds-pkg] package's Custom Elements Manifest (CEM). It is the bridge between the upstream `@daikin-oss/design-system-web-components` package and the React app — every `daikin-*` component you import as a React component exists because this script wrote it.

It is closely paired with the [Daikin Design System skill](../rad-template/AI/skills#daikin-design-system) — the skill is the LLM-facing reference for the same CEM, while this script is the build-time consumer of it. When you upgrade DDS, you will typically run both: `npm run generate:dds` to refresh the wrappers, and `npm run sync:skills` to refresh the skill.

## Prerequisites

- **Node.js** (matches the repo's `.nvmrc` / `engines` field).
- **`@daikin-oss/design-system-web-components` >= 1.5.0:** the script reads its `custom-elements.json` from `./node_modules/@daikin-oss/design-system-web-components`. Run `npm install` before invoking the script.

### Registry setup

Add a .npmrc file to your project and add the following lines:

```
@daikin-dsv:registry=https://npm.pkg.github.com
```

You also need a classic PAT with **`read:packages`** scope (fine-grained tokens are not supported by GitHub Packages for npm). Add it to your **user-level** `~/.npmrc`:

```
//npm.pkg.github.com/:_authToken=<YOUR_PAT>
@daikin-dsv:registry=https://npm.pkg.github.com
```

See the [GitHub Packages npm registry docs](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry) for full setup instructions.

## Usage

```sh
npx @daikin-dsv/generate-dds-react-wrappers
```

This reads the DDS copy from `node_modules` for reproducibility.

## Flags

| Flag                    | Default                                     | Description                                                                |
| ----------------------- | ------------------------------------------- | -------------------------------------------------------------------------- |
| `--out-react <file>`    | `app/components/dds-wrappers.generated.tsx` | Output file for the React wrappers.                                        |
| `--out-register <file>` | `app/webcomponents.generated.ts`            | Output file for the side-effect imports that register the custom elements. |
| `--help`                | —                                           | Print usage.                                                               |

## Outputs

| Path                                        | Description                                                                                                                                                                                                         |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/components/dds-wrappers.generated.tsx` | Typed React wrappers built with `@lit/react`'s `createComponent`. One named export per DDS element (e.g. `Button`, `Modal`, `Combobox`).                                                                            |
| `app/webcomponents.generated.ts`            | Side-effect imports of every `@daikin-oss/design-system-web-components/components/<name>/index.js`. Imported by `app/webcomponents.ts` at startup to register the custom elements before any React wrapper renders. |

Both generated files start with an auto-generated banner and are written via a `writeIfChanged` helper, so re-running the script when nothing changed is a no-op (no spurious diffs).

> **Do not edit the generated files by hand.** Edit the generator (or wait for the upstream component to change) and re-run `npm run generate:dds`.

## How it fits with the DDS skill

- **`generate-dds-react-wrappers`** (this script) consumes the CEM at _build_ time and writes runtime React code into the app.
- **The [Daikin Design System skill](../rad-template/AI/skills#daikin-design-system)** consumes the CEM at _skill-regeneration_ time (in `daikin-dsv/rad-platform`) and writes per-component reference markdown that the AI assistant reads.

Both should target the same DDS package version. After upgrading `@daikin-oss/design-system-web-components`, run **both** to keep the wrappers and skill content in sync:

```sh
npm install @daikin-oss/design-system-web-components@<new-version>
npm run generate:dds
npm run sync:skills
```

[dds-pkg]: https://www.npmjs.com/package/@daikin-oss/design-system-web-components
