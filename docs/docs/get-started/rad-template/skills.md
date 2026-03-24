---
sidebar_position: 6
---

# Skills

Skills are reusable packages of domain-specific knowledge that extend GitHub Copilot's capabilities within VS Code. Each skill provides Copilot with context and instructions for a particular tool or technology, enabling it to give more accurate and relevant assistance. Skills can be invoked automatically based on your prompt or explicitly via slash commands.

## Installed Skills

### Databricks

**Source:** [`databricks/databricks-agent-skills`](https://skills.sh/databricks/databricks-agent-skills/databricks)

Provides Copilot with up-to-date knowledge of Databricks CLI operations including authentication, profile management, data exploration, and bundle deployment.

#### How to Use

**Slash command:** Type `/databricks` in VS Code Copilot Chat to explicitly invoke the skill. This is useful when your prompt might not obviously relate to Databricks.

**Automatic activation:** The skill also loads automatically when Copilot detects a Databricks-related request, so you can simply describe what you need in plain language.

#### Example Prompts

| Prompt                                                              | What Happens                                               |
| ------------------------------------------------------------------- | ---------------------------------------------------------- |
| `/databricks explore the agency table in bedrock_ss_apollo catalog` | Uses AI tools to discover schema, columns, and sample data |
| `How do I list all warehouses in Databricks?`                       | Auto-activates and shows the correct CLI command           |

#### Prerequisites

- **Databricks CLI:** The skill will guide you through installation if the CLI is missing or outdated.
- **Authenticated profile:** Run `databricks auth profiles` to verify. The skill walks you through setup if needed.

#### Skill Reference Files

Detailed instructions live in `.agents/skills/databricks/`
