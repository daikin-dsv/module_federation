---
sidebar_position: 1
---

# Github Codespace Integration

## Setup

Go to [daikin-dsv/rad-template](https://github.com/daikin-dsv/rad-template)

On the top-right hand corner, click on `Use this template` → `Open in a codespace`

Codespaces will initialize the project, automatically installing dependencies.

After that is done, run:

```bash
// Use Node v22
nvm use 22
// copy env example to usable file
cp .env.example .env.local
// build web component bundle
npm run build
// run dev server
npm run dev
```

## Preview App

While running the dev server, you can go to the `Ports` tab on the bottom to view the forwarded address:

<p style={{ textAlign: 'center' }}>
    ![UI Preview available in forwarded address](/img/github-codespace-ports.png)
</p>

You can make any changes, and it will reflect automatically in the forwarded address.
The idle time is very short, so don’t expect it to persist for a long time after being inactive.

## Using AI to Build UI

On the bottom right, you can select the available LLM Model that you have access to. (The options may be limited based on your subscription/plans)

<p style={{ textAlign: 'center' }}>
    ![Use chat to build UI](/img/github-codespace-chat.png)
</p>

Choose any model and ask it to build a UI for you.
The template provides instructions to the LLM via `AGENTS.md` and `CLAUDE.md`.

⚠️ Note: Some models may look for specific files. Models other than OpenAI, Claude, and Grok have not been tested.
