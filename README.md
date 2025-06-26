# Module Federation

PoC to demonstrate a MFE architecture for an energy management dashboard

- `layout` exposes common components like `header` and `footer`
- `widgets` exposes customizable application content
- `regional-app-1` is the consumer which imports the above

## Running the Demo

In the root folder, run `npm install` to download all dependencies.
Then run `npm run dev` to build and serve all apps simultaneously.
For the ports each app is running on, refer to `config.js`.

## Variables and Secrets

### Variables

#### Variables for each environments

- `AWS_ACCOUNT_ID`: Account ID which is placed ECR repository
- `AWS_REGION`: AWS Region which is placed ECR repository
- `CONTAINER_REPOSITORY_ACCOUNT`: `AWS_ACCOUNT_ID` which is located ECR repository. If cluster and ECR are placed at the same AWS Account, then this can be skipped.
- `CONTAINER_REPOSITORY_REGION`: `AWS_REGION` which is located ECR repository. If cluster and ECR are placed at the same AWS Account, then this can be skipped.

## Running End to End Tests

1. `cd deploy`
1. `npm run generate-test-secrets -- -configName local -playwright -outpath ../module_federation/env/` generate test secrets
1. `cd ../module_federation`
1. `echo "LAYOUT_BASE_URL=http://localhost:3001\nWIDGETS_BASE_URL=http://localhost:3002\nKEYCLOAK_LOGOUT_URL=https://sso-dev.daikinlab.com/auth/realms/daikin/protocol/openid-connect/auth" >> env/local.env` to add add values
1. `ENV=local npm run test` runs tests in CLI
1. `ENV=local npm run test:dev` opens open UI mode
