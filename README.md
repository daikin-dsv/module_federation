# Module Federation

PoC to demonstrate a MFE architecture for an energy management dashboard

- `layout` exposes common components like `header` and `footer`
- `widgets` exposes customizable application content
- `regional-app-1` is the consumer which imports the above

## Running the Demo

In the root folder, run `npm install` to download all dependencies.
Then run `npm run dev` to build and serve all apps simultaneously.
For the ports each app is running on, refer to `config.js`.
