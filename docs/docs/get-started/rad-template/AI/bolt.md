---
sidebar_position: 2
---

# Bolt Integration

## Prerequisites

- A [Bolt](https://bolt.new) account.
- A [GitHub](https://github.com) account.

## Setup

1. Go to the RAD Template [`next14` branch](https://github.com/daikin-dsv/rad-template/tree/next14).
2. Click the `Use template` button and initialize with these settings:

<p style={{ textAlign: 'center' }}>
    ![Use Template](/img/rad-template-next-14-use-template.png)
</p>

3. Bolt currently supports personal GitHub repositories, so create the clone under your personal account.
4. In repository settings, change the `default branch` to `next14`. This step is required because Bolt currently targets `next14`.

<p style={{ textAlign: 'center' }}>
    ![Change default branch](/img/rad-template-next-14-change-default-branch.png)
</p>

5. Go back to [bolt.new](https://bolt.new), click `Import from GitHub`, and select the repository you just created.

<p style={{ textAlign: 'center' }}>
    ![Initialize in Bolt](/img/rad-template-next-14-bolt-init.png)
</p>

Bolt will initialize your app and try to run it.
If you go to the “Code view”, it would look something like this:

`ctrl + c` to exit out.

Then run:

```bash
cp .env.example .env
npm run build
npm run dev
```

⚠️ Note: If you refresh the app, rerun `npm run build`.
