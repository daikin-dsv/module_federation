const { expect, test } = require('../../../tests/helper');

test.describe('Layout', () => {
    test('Header is visible', async ({ layoutPage }) => {
        await expect(layoutPage.locator('header')).toBeVisible();
    });
});
