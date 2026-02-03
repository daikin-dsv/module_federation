# Module Federation

PoC to demonstrate a micro-frontend architecture for Daikin energy-management experiences.

- `layout` exposes common components like `header` and `footer`
- `widgets` exposes customizable application content
- `regional-app-1` and `regional-app-2` are host apps that consume shared packages
- `eva` contains another consuming app surface
- `docs` contains the Docusaurus documentation site for onboarding and implementation guidance

## Documentation

For full setup and implementation guidance, start with `docs/docs/get-started/introduction.md`.

- Run the docs site locally: `npm run start --prefix docs`
- Build static docs output: `npm run build --prefix docs`
- GitHub Pages deployment target for docs is `/docs/` (via `npm run deploy-github-pages:docs`)

## Running the Demo

In the root folder, run `npm install` to download all dependencies.
Then run `npm run dev` to build and serve all apps simultaneously.
For the ports each app is running on, refer to `config.js`.

## Variables and Secrets

### Variables

#### Variables for each environment

- `AWS_ACCOUNT_ID`: Account ID that owns the ECR repository.
- `AWS_REGION`: AWS Region that hosts the ECR repository.
- `CONTAINER_REPOSITORY_ACCOUNT`: Account ID for the ECR repository. If the cluster and ECR are in the same account, this can be omitted.
- `CONTAINER_REPOSITORY_REGION`: Region for the ECR repository. If the cluster and ECR are in the same region, this can be omitted.

## Running End to End Tests

1. `cd deploy`
1. `npm run generate-test-secrets -- -configName local -playwright -outpath ../module_federation/env/` to generate test secrets
1. `cd ../module_federation`
1. `echo "LAYOUT_BASE_URL=http://localhost:3001\nWIDGETS_BASE_URL=http://localhost:3002\nREGIONAL_APP_1_BASE_URL=http://localhost:3004\nREGIONAL_APP_2_BASE_URL=http://localhost:3005\nEVA_URL=http://localhost:3006" >> env/local.env` to add local base URLs
1. `ENV=local npm run test` to run tests in CLI
1. `ENV=local npm run test:dev` to open UI mode
