const { test, expect } = require('@playwright/test');
const { USERS } = require('./constants');
const { LAYOUT_BASE_URL, WIDGETS_BASE_URL } = process.env;

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

const loggedInPage = async ({ page, user, cookies }, url, use) => {
    try {
        await page.goto(url);

        const credentials = await getUserCredentials(user);

        if (credentials === undefined) {
            throw new Error(`Credentials for user ${user} are not defined`);
        }
        const { username, password } = JSON.parse(credentials);
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
        await page.waitForLoadState('domcontentloaded');

        expect(page.url(), 'Should contain layout base URL in page url').toContain(LAYOUT_BASE_URL);

        await use(page);

        if (cookies) {
            await context.clearCookies();
        }
    } catch (error) {
        console.error('An error occurred while logging in:', error);
        throw error;
    }
}

// Extend basic test by providing fixtures and options that can be used in the tests
exports.test = test.extend({
    // Define `user` option with a default value
    user: [USERS.ADMIN.username, { option: true }],
    cookies: [false, { option: true }],
    // Define `layout` fixture
    layoutPage: async ({ page, user, cookies }, use) => {
        await loggedInPage({ page, user, cookies }, LAYOUT_BASE_URL, use);
    },
    // Define `widgets` fixture
    widgetsPage: async ({ page, cookies }, use) => {
        const url = WIDGETS_BASE_URL;
        await page.goto(url);
        await use(page);
        if (cookies) {
            await context.clearCookies();
        }
    }
});

module.exports = {
    ...exports,
    expect
};
