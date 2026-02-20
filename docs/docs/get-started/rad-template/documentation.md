---
title: Documentation
sidebar_position: 10
---

# Documentation

The RAD Template includes a documentation site powered by [Docusaurus](https://docusaurus.io/), served at the `/docs` route of your application. The template ships with example content that you should replace with documentation specific to your application.

## File Structure

All documentation source files live in the **`docusaurus/`** directory:

```
docusaurus/
├── package.json                 # CJS override for Docusaurus build
├── docusaurus.config.ts         # Main Docusaurus configuration
└── docs/
    ├── index.md                 # Welcome / landing page
    ├── sidebars.ts              # Sidebar navigation structure
    ├── custom.css               # Custom Docusaurus styles
    └── graphql-api.md           # Example API reference doc
```

Each `.md` (or `.mdx`) file in the `docs/` folder becomes a page on the documentation site. The URL is derived from the filename — for example, `docs/graphql-api.md` is served at `/docs/graphql-api`.

## Development Workflow

The Docusaurus dev server runs **separately** from the Next.js app:

```bash
npm run docs:dev
```

This starts a hot-reloading server at [http://localhost:3000](http://localhost:3000) where you can preview documentation changes instantly.

To produce the static build that Next.js serves in production:

```bash
npm run docs:build
```

This outputs the built site to `public/docs/`. The Next.js production build (`npm run build`) runs this automatically as part of the `prebuild` step.

To clear Docusaurus cache and build artifacts:

```bash
npm run docs:clear
```

## Adding a New Page

1. Create a new Markdown file in `docusaurus/docs/`:

    ```md
    ---
    title: My New Page
    sidebar_position: 3
    ---

    # My New Page

    Content goes here.
    ```

2. Add the page to the sidebar in `docusaurus/docs/sidebars.ts`:

    ```ts
    {
      type: 'category',
      label: 'My Section',
      items: ['my-new-page'], // filename without .md
    }
    ```

3. Rebuild or restart the docs dev server to see your changes.

## Frontmatter

Every doc page should include YAML frontmatter at the top:

```yaml
---
title: Page Title # Displayed in the sidebar and browser tab
sidebar_position: 1 # Controls ordering within a sidebar category
---
```

See the [Docusaurus docs frontmatter reference](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter) for all available fields.

## Markdown Features

Docusaurus supports standard Markdown plus several extensions:

### Admonitions

```md
:::note
This is a note.
:::

:::tip
Helpful tip here.
:::

:::warning
Watch out for this.
:::

:::info
Informational callout.
:::
```

### Code Blocks with Syntax Highlighting

Use fenced code blocks with a language identifier:

````md
```typescript
const greeting: string = 'Hello, world!';
console.info(greeting);
```
````

### Tabs

```mdx
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

<Tabs>
    <TabItem value="npm" label="npm">
        npm install
    </TabItem>
    <TabItem value="yarn" label="yarn">
        yarn install
    </TabItem>
</Tabs>
```

## Access Control

The Docusaurus build outputs static HTML/CSS/JS into `public/docs/`. Next.js serves these files at the `/docs` route. Access control is managed by the `PUBLIC_DOCS` environment variable:

| `PUBLIC_DOCS`     | Behavior                                   |
| ----------------- | ------------------------------------------ |
| `false` (default) | Docs require authentication (behind SSO)   |
| `true`            | Docs are publicly accessible without login |

Set this in `.env.local`:

```bash
PUBLIC_DOCS=false
```

Note that when `BYPASS_AUTH=true`, SSO will be turned off regardless of the value of `PUBLIC_DOCS`.

## Configuration Files

| File                              | Purpose                                                                |
| --------------------------------- | ---------------------------------------------------------------------- |
| `docusaurus/docusaurus.config.ts` | Main Docusaurus configuration (site metadata, navbar, footer, presets) |
| `docusaurus/docs/sidebars.ts`     | Sidebar navigation structure                                           |
| `docusaurus/docs/custom.css`      | Custom CSS overrides for the docs theme                                |

## Replacing Template Content

When you're ready to replace the template documentation with your own:

1. Delete or modify the example API reference (`graphql-api.md`)
2. Update `index.md` with your application's overview
3. Update `sidebars.ts` to reflect your new page structure
4. Customize `docusaurus.config.ts` (title, navbar, footer links)
