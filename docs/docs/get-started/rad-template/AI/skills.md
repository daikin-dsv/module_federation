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

| Prompt | What Happens |
| --- | --- |
| `/bedrock write a query to fetch all users` | Generates a GraphQL query using `graphql-request` with `gql` tagged template |
| `/bedrock create a query for fetching equipment details` | Scaffolds a query factory with `queryKey` and `queryFn` using React Query |
| `How do I set up the Bedrock GraphQL client with authentication?` | Auto-activates and shows the client initialization with Bearer token pattern |

#### Skill Reference Files

Detailed instructions live in `.agents/skills/bedrock/`
