---
sidebar_position: 7
---

# Databricks

The project includes a reference integration that connects GraphQL queries to a Databricks SQL Warehouse.

## Configuration

Add the following variables to your `.env.local` file:

```bash
DATABRICKS_WORKSPACE_URL=https://<workspace>.cloud.databricks.com
DATABRICKS_HTTP_PATH=/sql/1.0/warehouses/your-warehouse-id-here
DATABRICKS_ACCESS_TOKEN=your-databricks-access-token-here
```

To find these values:

- **Workspace URL** — The URL you use to access your Databricks workspace (e.g., `https://mycompany.cloud.databricks.com`).
- **HTTP Path** — In the Databricks UI, go to **SQL Warehouses → Select your warehouse → Connection details → HTTP Path**.
- **Access Token** — Generate a personal access token under **Settings → Developer → Access tokens** in your Databricks workspace.

## Architecture

Databricks queries flow through the existing GraphQL API:

```
React Component → GraphQL Client → Apollo Server (/api/graphql) → Databricks SQL Warehouse
```

Key files:

| File                                             | Purpose                                                                              |
| ------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `app/api/graphql/databricks/databricksClient.ts` | Singleton `DBSQLClient` that connects to the warehouse using the env variables above |
| `app/api/graphql/databricks/schema.ts`           | GraphQL type definitions for Databricks queries                                      |
| `app/api/graphql/databricks/resolvers.ts`        | Resolver that executes SQL statements against Databricks and maps results            |
| `app/databricks/graphqlClient.ts`                | Client-side GraphQL query definitions used by React components                       |
| `app/databricks/Databricks.tsx`                  | React component that fetches and displays data in a `DaikinTable`                    |

## Adding a New Databricks Query

1. **Browse your catalog** — Open your Databricks workspace, click **Catalog** in the sidebar, and navigate the hierarchy (Catalog → Schema → Table) to identify the table and columns you need.

2. **Define the GraphQL schema** — Add a new type and query to `app/api/graphql/databricks/schema.ts` (or create a separate schema file and merge it in `app/api/graphql/route.ts`).

3. **Write the resolver** — In `app/api/graphql/databricks/resolvers.ts`, add a resolver that calls `executeQuery()` with your SQL statement. The helper accepts named parameters:

    ```typescript
    const query = `SELECT col1, col2 FROM my_catalog.my_schema.my_table LIMIT :rowsPerPage`;
    const results = await executeQuery(query, { rowsPerPage: 10 });
    ```

4. **Create the client query** — Add a GraphQL query definition in `app/databricks/graphqlClient.ts` and export a function that returns a React Query config object (`queryKey` + `queryFn`).

5. **Build the UI** — Create or extend a component under `app/databricks/` that calls the query with `useQuery()` and renders the results.

## How the Client Works

The Databricks client (`databricksClient.ts`) is a singleton that reuses a single `DBSQLClient` connection. Each query opens a new session, executes the statement, and closes the session. Named parameters are passed via the `namedParameters` option to prevent SQL injection.
