---
sidebar_position: 3
---

# Skills

Skills are reusable packages of domain-specific knowledge that extend an AI coding assistant's capabilities within VS Code. Each skill provides the assistant with context and instructions for a particular tool or technology, enabling it to give more accurate and relevant assistance. Skills can be invoked automatically based on your prompt or explicitly via slash commands.

## Installed Skills

### Databricks

**Source:** [`databricks/databricks-agent-skills`](https://skills.sh/databricks/databricks-agent-skills/databricks)

Provides the AI assistant with up-to-date knowledge of Databricks CLI operations including authentication, profile management, data exploration, and bundle deployment.

#### Prerequisites

- **Databricks CLI:** The skill will guide you through installation if the CLI is missing or outdated.
- **Authenticated profile:** Run `databricks auth profiles` to verify. The skill walks you through setup if needed.

#### Installation

```sh
npx skills add https://github.com/databricks/databricks-agent-skills --skill databricks
```

#### What's Included

| Path                         | Description                                                                      |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `skills/databricks/SKILL.md` | Agent skill with Databricks CLI operations, authentication, and data exploration |

#### How to Use

**Slash command:** Type `/databricks` in the VS Code AI chat to explicitly invoke the skill. This is useful when your prompt might not obviously relate to Databricks.

**Automatic activation:** The skill also loads automatically when the assistant detects a Databricks-related request, so you can simply describe what you need in plain language.

#### Example Prompts

| Prompt                                                              | What Happens                                               |
| ------------------------------------------------------------------- | ---------------------------------------------------------- |
| `/databricks explore the agency table in bedrock_ss_apollo catalog` | Uses AI tools to discover schema, columns, and sample data |
| `How do I list all warehouses in Databricks?`                       | Auto-activates and shows the correct CLI command           |

#### Skill Reference Files

Detailed instructions live in `.agents/skills/databricks/`

---

### Bedrock

**Source:** [`daikin-dsv/rad-platform`](https://github.com/daikin-dsv/rad-platform)

Provides the AI assistant with guidance for writing GraphQL queries and mutations against the Project Bedrock API, including React Query integration, authenticated requests, and schema exploration.

#### Prerequisites

- **`graphql-request`:** Used for the GraphQL client (`gql` tagged templates).
- **`graphql`:** Runtime dependency used with `graphql-request`.
- **`@tanstack/react-query`:** Used for React Query integration.

#### Installation

```sh
npx skills add https://github.com/daikin-dsv/rad-platform --skill bedrock
```

#### What's Included

| Path                        | Description                                                                       |
| --------------------------- | --------------------------------------------------------------------------------- |
| `skills/bedrock/SKILL.md`   | Agent skill with GraphQL client patterns, auth setup, and React Query conventions |
| `ai/bedrock/schema.graphql` | Full Bedrock GraphQL schema (auto-synced daily from `daikin-dsv/microservice`)    |

#### How to Use

**Slash command:** Type `/bedrock` in the VS Code AI chat to explicitly invoke the skill. This is useful when your prompt might not obviously relate to Bedrock.

**Automatic activation:** The skill also loads automatically when the assistant detects a Bedrock-related request, so you can simply describe what you need in plain language.

#### Example Prompts

| Prompt                                                            | What Happens                                                                 |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `/bedrock write a query to fetch all users`                       | Generates a GraphQL query using `graphql-request` with `gql` tagged template |
| `/bedrock create a query for fetching equipment details`          | Scaffolds a query factory with `queryKey` and `queryFn` using React Query    |
| `How do I set up the Bedrock GraphQL client with authentication?` | Auto-activates and shows the client initialization with Bearer token pattern |

#### Skill Reference Files

Detailed instructions live in `.agents/skills/bedrock/`

---

### Daikin Design System

**Source:** <a href="https://github.com/daikin-dsv/rad-platform">`daikin-dsv/rad-platform`</a>

Provides the AI assistant with up-to-date knowledge of the Daikin Design System (DDS) web components and design tokens — component props, events, slots, CSS custom properties, and the full token catalogue with matching Tailwind v4 utility names. The skill is generated from the `@daikin-oss/design-system-web-components` package's Custom Elements Manifest, so its contents should match the latest version of DDS, although published skill content may lag until it has been regenerated upstream.

The same Custom Elements Manifest is also consumed at build time by the [`generate-dds-react-wrappers` script](../../packages/generate-dds-react-wrappers) to produce the app's typed React wrappers.

#### Prerequisites

- **`@daikin-oss/design-system-web-components`:** The skill is generated against this package; its installed version determines what the assistant sees.
- **`@daikin-oss/dds-tokens`:** Source of the design token CSS variables and Tailwind v4 utility names referenced by the skill.
- **`@daikin-oss/tailwind`** _(optional)_: Wires the DDS tokens up as Tailwind v4 utilities. Recommended if you want utility-class access (`bg-dds-color-common-brand-default`, etc.) rather than only `var(--dds-*)` references.

#### Installation

```sh
npx skills add https://github.com/daikin-dsv/rad-platform --skill daikin-design-system
```

#### Upgrading

The skill content is regenerated upstream in `daikin-dsv/rad-platform` whenever the DDS package version is bumped. After upgrading `@daikin-oss/design-system-web-components` in this repo, refresh **both** the React wrappers and the skill so they stay in lockstep:

```sh
npm install @daikin-oss/design-system-web-components@latest @daikin-oss/dds-tokens@latest
npx @daikin-dsv/generate-dds-react-wrappers   # regenerate React wrappers — see the generate-dds-react-wrappers page
npx skills add https://github.com/daikin-dsv/rad-platform --copy    # pull the matching skill content from rad-platform
```

`skills-lock.json` records the upstream source and the DDS package version the skill was generated against. See the [`generate-dds-react-wrappers` script docs](../../packages/generate-dds-react-wrappers) for details on what the codegen produces.

#### What's Included

| Path                                                   | Description                                                                                                                          |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `skills/daikin-design-system/SKILL.md`                 | Skill entry point: how to use DDS React wrappers, event/prop conventions, styling guidance                                           |
| `skills/daikin-design-system/tokens.md`                | Complete design-token catalogue (CSS variable names + Tailwind v4 utility names) for color, spacing, radius, border, and typography  |
| `skills/daikin-design-system/patterns.md`              | Recipes for non-obvious patterns (theming, Light/Dark, common compositions)                                                          |
| `skills/daikin-design-system/components/<tag-name>.md` | One reference page per DDS component (60+) generated from the Custom Elements Manifest — props, events, slots, CSS custom properties |

#### How to Use

**Slash command:** Type `/daikin-design-system` in the AI chat to explicitly invoke the skill. Useful when your prompt doesn't obviously mention DDS but you want the assistant to lean on the component reference (e.g. "build a settings form").

**Automatic activation:** The skill also loads automatically when the assistant detects a DDS-related request — references to `daikin-*` web components, DDS tokens, or wrapper components — so you can simply describe what you need in plain language.

#### Example Prompts

| Prompt                                                                            | What Happens                                                                                           |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `/daikin-design-system build a confirmation dialog with primary + cancel buttons` | Uses the `daikin-modal` and `daikin-button` reference pages to wire props, slots, and events correctly |
| `What CSS variable should I use for a danger button background?`                  | Auto-activates and points to `--dds-color-common-danger-default` (and the matching Tailwind utility)   |
| `How do I theme this app for Dark mode?`                                          | Auto-activates and shows the `daikin/Dark/variables.css` import + scoping pattern from `patterns.md`   |
| `Style this card with DDS spacing and radius tokens`                              | Auto-activates and uses tokens like `--dds-space-400` / `--dds-border-radius-100` from `tokens.md`     |

#### Skill Reference Files

Detailed instructions live in `.agents/skills/daikin-design-system/`. Do **not** edit these files by hand — they are regenerated upstream from the DDS package; fix the generator in `daikin-dsv/rad-platform` instead.
