---
title: Database
sidebar_position: 6
---

# Database

RAD Template ships with a working Drizzle + Neon PostgreSQL example. Use this guide when you are building on the template and need to provision a local database, verify the sample guestbook integration, or prepare schema changes for deployment.

## Quick Start

```bash
npm run db:setup
npm run dev
```

`npm run db:setup`:

1. Provisions an ephemeral [Neon](https://neon.tech) Postgres database.
2. Writes `DATABASE_URL` and `NEON_CLAIM_URL` to `.env.local`.
3. Applies any pending migrations automatically.

After the dev server starts, open `http://localhost:3006/postgres` to verify the database connection with the sample guestbook page.

> **Note:** The default Neon database expires after **72 hours**. Run `npm run db:claim` if you want to keep it permanently.

## What the Template Includes

| File                      | Purpose                                                                           |
| ------------------------- | --------------------------------------------------------------------------------- |
| `db/schema.ts`            | Drizzle schema definitions. The template currently defines the `guestbook` table. |
| `db/index.ts`             | Shared Drizzle client configured from `DATABASE_URL`.                             |
| `db/migrations/`          | Generated SQL migrations that should be committed with the app.                   |
| `db/seed.ts`              | Optional development seed data.                                                   |
| `app/postgres/page.tsx`   | Example page that reads guestbook entries from the database.                      |
| `app/postgres/actions.ts` | Server actions that insert and delete guestbook rows.                             |

## Local Development Workflow

`npm run db:setup` is safe to run multiple times:

- If `.env.local` already contains a `DATABASE_URL`, the script skips provisioning.
- Use `npm run db:setup -- --force` to replace the current local database.

To keep an ephemeral database beyond the 72-hour window, run:

```bash
npm run db:claim
```

This opens the Neon claim URL in your browser. After claiming, your existing `DATABASE_URL` continues to work.

## Schema Source of Truth

`db/schema.ts` is the only place you should define tables. The template currently ships with:

```ts
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const guestbook = pgTable('guestbook', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    message: text('message').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull()
});
```

Do not hand-write `CREATE TABLE` SQL. Generate migrations from the schema instead.

## Changing the Schema

### Local Prototyping

During early exploration, you can push schema changes directly:

```bash
npm run db:push
```

Use this only for local development. `db:push` updates the database directly and does not create a migration file.

### Committed Changes

Before you commit or open a pull request:

```bash
npm run db:generate
npm run db:migrate
```

Follow this workflow:

1. Edit `db/schema.ts`.
2. Run `npm run db:generate` to create SQL in `db/migrations/`.
3. Run `npm run db:migrate` to apply the new migration locally.
4. Commit `db/schema.ts` and the generated migration files together.

Never edit files in `db/migrations/` by hand.

## Using the Database in the App

Import the shared client from `db/index.ts` and query the tables defined in `db/schema.ts`:

```ts
import { db } from '@/db';
import { guestbook } from '@/db/schema';
import { desc } from 'drizzle-orm';

const entries = await db.select().from(guestbook).orderBy(desc(guestbook.createdAt));

await db.insert(guestbook).values({
    name: 'Alice',
    message: 'Hello from the RAD template!'
});
```

The client uses `@neondatabase/serverless`, so the same setup works across local development and deployed environments.

## Seeding Local Data

Update `db/seed.ts` when you want a predictable local dataset, then run:

```bash
npm run db:seed
```

Keep the seed script idempotent with `.onConflictDoNothing()` or an equivalent guard so it can be run repeatedly without creating duplicate rows.

## Database Commands

| Script                | What it does                                 | When to use it                                               |
| --------------------- | -------------------------------------------- | ------------------------------------------------------------ |
| `npm run db:setup`    | Provision a Neon database and run migrations | Once after cloning, or when re-provisioning a local database |
| `npm run db:generate` | Generate SQL from `db/schema.ts`             | After changing the schema and before committing              |
| `npm run db:push`     | Apply schema changes directly                | Local prototyping only                                       |
| `npm run db:migrate`  | Apply pending migrations                     | After generating a migration and in deployment automation    |
| `npm run db:studio`   | Open Drizzle Studio                          | Local inspection and debugging                               |
| `npm run db:seed`     | Run `db/seed.ts`                             | Populate local development data                              |
| `npm run db:claim`    | Open the Neon claim URL                      | Keep an ephemeral database permanently                       |

## Deployment Expectations for RAD Template Users

You do not need to maintain the shared platform workflows to use the template, but your repository changes still need to follow their expectations:

- Commit generated SQL files from `db/migrations/` whenever `db/schema.ts` changes.
- Do not rely on `db:push` outside local development.
- Expect deployment automation to run `npm run db:migrate`, not to infer schema changes from TypeScript alone.
- If your repository uses a custom database in CI/CD, `CUSTOM_DATABASE_URL` can be provided as a repository secret so automation skips auto-provisioning.

## Environment Variables

| Variable              | Source                                              | Purpose                                    |
| --------------------- | --------------------------------------------------- | ------------------------------------------ |
| `DATABASE_URL`        | Auto-set by `db:setup` locally or injected by CI/CD | Postgres connection string used by Drizzle |
| `NEON_CLAIM_URL`      | Auto-set by `db:setup`                              | URL used by `npm run db:claim`             |
| `CUSTOM_DATABASE_URL` | Optional repository secret                          | Overrides auto-provisioning in CI/CD       |

## Troubleshooting

**`db:setup` fails with a network error**
Check your internet connection. The script calls the Neon API at `https://pg.new/api/v1/database`.

**`db:migrate` says `DATABASE_URL` is undefined**
Make sure `.env.local` exists and contains a valid `DATABASE_URL`. Run `npm run db:setup` if it does not.

**`db:push` or `db:generate` produces no changes**
Your current schema matches the current database state. Update `db/schema.ts` first.

**The `/postgres` page fails after the database expired**
Run `npm run db:setup -- --force` to provision a fresh local database and reapply migrations.
