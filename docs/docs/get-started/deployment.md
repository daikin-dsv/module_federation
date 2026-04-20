---
sidebar_position: 8
---

# Deployment

[Netlify](https://www.netlify.com/) is the recommended deployment target for apps built with RAD Template. A **Provision Netlify Project** GitHub Actions workflow automates the entire setup. This pipeline creates a Netlify site, links your repository, installs a deploy key to your Github repository, and configures all required environment variables in a single run.

Once provisioned, every push to your default branch triggers a production build.

## What You Get

After the provisioning workflow completes, your repository will have:

- A **Netlify site** linked to your GitHub repository with automatic builds on push.
- All required **environment variables** pre-configured on the Netlify site.
- A **deploy key** installed on your repository for secure Netlify access.

## Prerequisites

Before requesting provisioning, make sure:

- Your repository lives in the `daikin-dsv` GitHub organization.
- Your project can run `npm run build` locally without errors.

## Running the Workflow

This is a **one-time setup workflow** triggered via manual dispatch.

1. Go to the **Actions** tab in the `rad-platform` repository.
2. Select **"Provision Netlify Project"** from the left sidebar.
3. Click **"Run workflow"**.
4. Fill in the inputs and click the green **"Run workflow"** button.

### Workflow Inputs

| Input | Required | Default | Description |
|---|---|---|---|
| `repo_url` | Yes | — | Full GitHub URL of your repository (e.g., `https://github.com/daikin-dsv/my-app`) |
| `site_name` | No | Derived from repo name | Custom Netlify site name. If omitted, the repo name is used (e.g., `my-app`) |
| `env_vars` | No | `{}` | JSON object of environment variable overrides (e.g., `{"BYPASS_AUTH": "true"}`) |

## Default Environment Variables

The workflow automatically configures the following environment variables on your Netlify site:

| Variable | Default Value | Description |
|---|---|---|
| `AUTH_KEYCLOAK_ID` | `rad-test2` | Keycloak client ID |
| `AUTH_KEYCLOAK_ISSUER` | `https://sso.dev.daikinlab.com/realms/daikin` | Keycloak issuer URL |
| `AUTH_TRUST_HOST` | `true` | Trust the host header for auth callbacks |
| `BYPASS_AUTH` | `false` | Skip authentication (useful for testing) |
| `RAD_URL` | _(auto-set to the new site URL)_ | The application's public URL |
| `AUTH_URL` | _(auto-set to the new site URL)_ | The auth callback URL |
| `BEDROCK_API_URL` | `https://apollo.daikinlab.com/api` | Bedrock API endpoint |
| `PUBLIC_DOCS` | `false` | Whether docs are publicly accessible |
| `AUTH_SECRET` | _(from GitHub secret)_ | Authentication signing secret |
| `DATABRICKS_ACCESS_TOKEN` | _(from GitHub secret)_ | Databricks access token |
| `DATABRICKS_HTTP_PATH` | _(from GitHub secret)_ | Databricks SQL warehouse HTTP path |
| `DATABRICKS_WORKSPACE_URL` | _(from GitHub secret)_ | Databricks workspace URL |

Any of these defaults can be overridden by passing a JSON object in the `env_vars` input.

## Customization

### Override environment variables

Pass a JSON object in the `env_vars` input to override any default value or add new variables:

```json
{"BYPASS_AUTH": "true", "CUSTOM_VAR": "value"}
```

### Use a custom site name

By default, the site name is derived from the repository name. To specify a custom name, fill in the `site_name` input when triggering the workflow.
