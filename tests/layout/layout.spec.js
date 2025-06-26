const { expect, test, logout } = require('../helper');

test.afterAll(async ({ layoutPage }) => {
    await logout(layoutPage);
});

test.describe('Layout', () => {
    test('Header is visible', async ({ layoutPage }) => {
        await expect(layoutPage.getByTestId('header')).toBeVisible();
    });
});
