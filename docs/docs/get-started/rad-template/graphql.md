---
sidebar_position: 4
---

# GraphQL APIs

This guide demonstrates how to implement and consume GraphQL APIs in the RAD Template. The examples use temperature conversion queries (`toFahrenheit` and `toCelsius`) as a reference implementation that you can use as a template for your own APIs.

## Table of Contents

- [Local Development Setup](#local-development-setup)
- [GraphQL Playground](#graphql-playground)
- [Making API Requests](#making-api-requests)
    - [Plain HTTP Requests](#plain-http-requests)
    - [Using the GraphQL Client](#using-the-graphql-client)
    - [Testing with Playwright](#testing-with-playwright)
- [Error Handling](#error-handling)
- [Code Examples](#code-examples)

## Local Development Setup

1. **Start the development server:**

    ```bash
    npm run dev
    ```

    The server runs on `http://localhost:3006` by default.

2. **GraphQL endpoint:**

    - Development: `http://localhost:3006/api/graphql`
    - Production: `<your-domain>/api/graphql`

3. **Environment variables:**
   Ensure your `.env.local` includes:
    ```bash
    RAD_URL=http://localhost:3006
    ```

## GraphQL Playground

Apollo Server provides an interactive GraphQL Playground for exploring and testing queries.

**Access the Playground:**

- Navigate to `http://localhost:3006/api/graphql` in your browser
- The embedded Apollo Studio sandbox opens automatically

**Using the Playground:**

1. Write your query in the left panel
2. Add variables in the Variables section (bottom left)
3. Click the "Run" button to execute
4. View results in the right panel
5. Explore the schema using the "Documentation" tab

**Example Query in Playground:**

```graphql
query ToFahrenheit($celsius: Float!) {
    toFahrenheit(input: { celsius: $celsius }) {
        celsius
        fahrenheit
    }
}
```

**Variables:**

```json
{
    "celsius": 0
}
```

## Making API Requests

### Plain HTTP Requests

For plain HTTP requests without a GraphQL client, send a JSON object with a `query` key containing the stringified GraphQL query.

<table>
    <th nowrap>Method</th>
    <th nowrap>Header</th>
    <th></th>
    <th nowrap>Body</th>
    <tr>
        <td nowrap><code>POST</code></td>
        <td nowrap>Content-Type</td>
        <td nowrap><code>application/json</code><br/></td>
        <td><em>Please refer to Sample Input below</em></td>
    </tr>
</table>

**Sample Input:**

```json
{
    "query": "{ toCelsius( input: { fahrenheit: 32 } ) { celsius fahrenheit } }"
}
```

**With Variables:**

```json
{
    "query": "query ToCelsius($fahrenheit: Float!) { toCelsius(input: { fahrenheit: $fahrenheit }) { celsius fahrenheit } }",
    "variables": {
        "fahrenheit": 32
    }
}
```

**Sample Response:**

```json
{
    "data": {
        "toCelsius": {
            "celsius": 0,
            "fahrenheit": 32
        }
    }
}
```

### Using the GraphQL Client

The template includes a pre-configured GraphQL client using `graphql-request` that integrates seamlessly with React Query.

**Implementation:** See `app/graphql/graphqlClient.ts`

**Usage in React Components:**

```typescript
import { useQuery } from '@tanstack/react-query';
import { toFahrenheit, toCelsius } from './graphqlClient';

// Convert Celsius to Fahrenheit
const { data, isLoading, error } = useQuery(
  toFahrenheit({ celsius: 0 })
);

// Convert Fahrenheit to Celsius
const { data, isLoading, error } = useQuery(
  toCelsius({ fahrenheit: 32 })
);
```

**Example Component:** See `app/graphql/TemperatureConverter.tsx`

### Testing with Playwright

The template includes Playwright tests demonstrating GraphQL API testing patterns.

**Test Implementation:** See `tests/graphql/graphql.spec.js`

**Running Tests:**

```bash
ENV="local" npm run test:e2e
```

**Test Helper:** See `tests/graphql/helper/index.js` for reusable GraphQL request utilities.

## Error Handling

GraphQL returns a `200 OK` status even when there are errors. Errors are included in the response body under the `errors` array.

### Common Error Patterns

**1. Validation Errors (Invalid Input)**

```json
{
    "errors": [
        {
            "message": "Variable \"$celsius\" of required type \"Float!\" was not provided.",
            "extensions": {
                "code": "BAD_USER_INPUT"
            }
        }
    ]
}
```

**2. Query Syntax Errors**

```json
{
    "errors": [
        {
            "message": "Syntax Error: Expected Name, found \"}\".",
            "extensions": {
                "code": "GRAPHQL_PARSE_FAILED"
            }
        }
    ]
}
```

**3. Field Errors**

```json
{
    "errors": [
        {
            "message": "Cannot query field \"invalid\" on type \"Temperature\".",
            "extensions": {
                "code": "GRAPHQL_VALIDATION_FAILED"
            }
        }
    ]
}
```

### Handling Errors in Code

**With graphql-request:**

```typescript
try {
    const data = await client.request(query, variables);
    // Handle success
} catch (error) {
    if (error.response?.errors) {
        // GraphQL errors
        console.error('GraphQL errors:', error.response.errors);
    } else {
        // Network or other errors
        console.error('Request failed:', error);
    }
}
```

**With React Query:**

```typescript
const { data, error } = useQuery(toFahrenheit({ celsius: 0 }));

if (error) {
    // error.response.errors contains GraphQL errors
    console.error('Query failed:', error);
}
```

**In Playwright Tests:**

```javascript
const data = await response.json();

// Check for errors
expect(data.errors).toBeUndefined();

// Or explicitly test error cases
expect(data.errors).toBeDefined();
expect(data.errors[0].extensions.code).toBe('BAD_USER_INPUT');
```

## Code Examples

### Server-Side Implementation

1. **Schema Definition:** `app/api/graphql/schema.ts`

    - Define your GraphQL types, queries, and mutations
    - Use GraphQL SDL (Schema Definition Language)

2. **Resolvers:** `app/api/graphql/resolvers.ts`

    - Implement the business logic for each query/mutation
    - Handle input validation and data transformation

3. **Route Handler:** `app/api/graphql/route.ts`
    - Apollo Server configuration
    - Next.js API route integration

### Client-Side Implementation

1. **GraphQL Client Setup:** `app/graphql/graphqlClient.ts`

    - Configure `graphql-request` client
    - Create reusable query functions with React Query integration

2. **React Component:** `app/graphql/TemperatureConverter.tsx`

    - Example of using queries in a React component
    - Demonstrates loading states and error handling

3. **GraphQL Page:** `app/graphql/page.tsx`
    - Server component with QueryClientProvider setup

### Testing Examples

1. **Playwright E2E Tests:** `tests/graphql/graphql.spec.js`

    - End-to-end GraphQL query testing
    - Response validation

2. **Test Helpers:** `tests/graphql/helper/index.js`
    - Reusable utilities for GraphQL testing
    - Request formatting and error handling

---

**Note:** Use these examples as templates when implementing your own GraphQL APIs. The patterns demonstrated here (schema definition, resolvers, client setup, and testing) apply to any GraphQL query or mutation you create.
