---
sidebar_position: 2
---

# Bolt Integration

Prerequisites: Sign up for https://bolt.new and a github account

Go to rad-template's [next14 branch](https://github.com/daikin-dsv/rad-template/tree/next14)

Click on the `use template` button, and initialize with these settings:

<p style={{ textAlign: 'center' }}>
    ![Use Template](/img/rad-template-next-14-use-template.png)
</p>

Note that Bolt currently only supports personal github repos at this time

Go to the repository settings and change the `default branch` to `next14`.
This step is needed because Bolt currently only supports next14.

<p style={{ textAlign: 'center' }}>
    ![Change default branch](/img/rad-template-next-14-change-default-branch.png)
</p>

Go to bolt.new, click on `import from Github`, and from `Your repositories` choose the cloned repo you just made

<p style={{ textAlign: 'center' }}>
    ![Change default branch](/img/rad-template-next-14-bolt-init.png)
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

⚠️ Note: If you refresh the app, you have to rerun npm run build again
