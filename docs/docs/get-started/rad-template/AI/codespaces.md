---
sidebar_position: 1
---

# GitHub Codespaces Integration

## Prerequisites

- A GitHub account with access to Codespaces.
- Access to the [daikin-dsv/rad-template](https://github.com/daikin-dsv/rad-template) repository.
- If you want to use built-in AI chat, a GitHub plan with GitHub Copilot access.

## Setup

1. Open [daikin-dsv/rad-template](https://github.com/daikin-dsv/rad-template).
2. In the top-right corner, click `Use this template` -> `Open in a codespace`.
3. Wait for Codespaces to initialize dependencies.
4. Run:

```bash
# Use Node v24
nvm use 24
# Copy env example to local file
cp .env.example .env.local
# Build web component bundle
npm run build
# Run dev server
npm run dev
```

## Preview App

While the dev server is running, open the `Ports` tab at the bottom to find the forwarded URL:

<p style={{ textAlign: 'center' }}>
    ![UI Preview available in forwarded address](/img/github-codespace-ports.png)
</p>

Changes are reflected automatically in the forwarded address. The idle timeout is short, so expect the environment to stop after inactivity.

## Using AI to Build UI

In the bottom-right of Codespaces, choose the LLM model available to your account (options vary by subscription/plan).

<p style={{ textAlign: 'center' }}>
    ![Use chat to build UI](/img/github-codespace-chat.png)
</p>

Ask the model to build the UI you want. The template provides guidance to AI tools via `AGENTS.md` and `CLAUDE.md`.

⚠️ Note: Some models may rely on specific files. OpenAI, Claude, and Grok have been tested; other models have not.
