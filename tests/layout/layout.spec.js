const { expect, test } = require('../helper');

test.describe('Layout', () => {
    test('Header is visible', async ({ layoutPage }) => {
        await expect(layoutPage.getByTestId('header')).toBeVisible();
    });
});
