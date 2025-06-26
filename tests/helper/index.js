const { test, expect, chromium, request } = require('@playwright/test');
const { USERS } = require('./constants');
const { LAYOUT_BASE_URL, WIDGETS_BASE_URL, KEYCLOAK_LOGOUT_URL } = process.env;

const loggedInPage = async ({ user, cookies }, url, use) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const requestContext = await request.newContext();
    try {
        // For GraphOS - override client name bucket
        await page.route('**/*', async (route, request) => {
            const originalHeaders = request.headers();

            const modifiedHeaders = { ...originalHeaders };
            modifiedHeaders['apollographql-client-name'] = 'playwright web-app';

            await route.continue({
                headers: modifiedHeaders
            });
        });

        await page.goto(url);
        const response = await requestContext.get(url);
        await expect(async () => {
            expect(
                response.status(),
                `Should return 200 status code instead of ${response.status()} when accessing ${response.url()}`
            ).toEqual(200);
            expect(response.statusText(), `${response.statusText()}`).toEqual('OK');
        }).toPass({
            intervals: [1_000, 5_000, 10_000],
            timeout: 60_000,
            message: 'Should return 200 status code'
        });

        const credentials = await getUserCredentials(user);

        if (credentials === undefined) {
            throw new Error(`Credentials for user ${user} are not defined`);
        }
        const { username, password } = JSON.parse(credentials);
        await expect(async () => {
            await expect(
                page.getByRole('textbox', { name: 'Username or email' }),
                'Username should be visible'
            ).toBeVisible();
            await expect(
                page.getByRole('textbox', { name: 'Password' }),
                'Password should be visible'
            ).toBeVisible();
            await expect(
                page.getByRole('button', { name: 'Sign in' }),
                'Sign in button should bes visible'
            ).toBeVisible();
            await page
                .getByRole('textbox', { name: 'Username or email' })
                .fill(username);
            await page.getByRole('textbox', { name: 'Password' }).fill(password);
            await page.getByRole('button', { name: 'Sign in' }).click();
        }).toPass({
            intervals: [1_000, 5_000, 10_000],
            timeout: 60_000,
            message:
                'Should find the login form elements(Username,password and sign in button)'
        });
        await page.waitForLoadState('domcontentloaded');

        expect(page.url(), 'Should contain layout base URL in page url').toContain(LAYOUT_BASE_URL);

        await use(page);

        if (cookies) {
            await context.clearCookies();
        }
    } catch (error) {
        console.error('An error occurred while logging in:', error);
    }
}

// Extend basic test by providing fixtures and options that can be used in the tests
exports.test = test.extend({
    // Define `user` option with a default value
    user: [USERS.ADMIN.username, { option: true }],
    cookies: [false, { option: true }],
    // Define `layout` fixture
    layoutPage: async ({ user, cookies }, use) => {
        await loggedInPage({ user, cookies }, LAYOUT_BASE_URL, use);
    },
    // Define `widgets` fixture
    widgetsPage: async ({ cookies }, use) => {
        const url = WIDGETS_BASE_URL;

        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        const requestContext = await request.newContext();
        try {
            await page.goto(url);
            const response = await requestContext.get(url);
            await expect(async () => {
                expect(
                    response.status(),
                    `Should return 200 status code instead of ${response.status()} when accessing ${response.url()}`
                ).toEqual(200);
                expect(response.statusText(), `${response.statusText()}`).toEqual('OK');
            }).toPass({
                intervals: [1_000, 5_000, 10_000],
                timeout: 60_000,
                message: 'Should return 200 status code'
            });
            await page.waitForLoadState('domcontentloaded');
            expect(page.url(), 'Should contain widgets base URL in page url').toContain(url);
            await use(page);
            if (cookies) {
                await context.clearCookies();
            }
        } catch (error) {
            console.error('An error occurred', error);
        }
    }
});

/**
 * Logout of the app
 * 
 * @param {Object} page - Page instance fixture
 */
async function logout(page) {
    await page.getByTestId('user-profile-button').click();
    await page.getByTestId('sign-out-button').click();
    await page.waitForURL((url) => url.href.includes(KEYCLOAK_LOGOUT_URL));
    expect(page.url(), 'Should contain keycloak logout URL in page url').toContain(KEYCLOAK_LOGOUT_URL);
}

/**
 * Get User's credentials
 * 
 * @param {string} user - Username
 */
async function getUserCredentials(user) {
    switch (user) {
        case USERS.ADMIN.username:
            return process.env.AUTHINFO;
        default:
            throw `Requested user does not exist: ${user}`;
    }
}

/**
 * Visit URL and waits for page to load
 * 
 * @param {Object} page - Page instance fixture
 * @param {string} url - URL to navigate to
 */
export async function visitAndWaitForBundle(page, url) {
    await page.goto(url);
    // Workaround as auto-waiting is unreliable and last retrieved file is unclear
    await page.waitForTimeout(1000);
}

module.exports = {
    ...exports,
    expect,
    logout
};
