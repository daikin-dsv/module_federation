const { expect, test } = require('../helper');

test.describe('Widgets', () => {
    test('Alarm card is visible', async ({ widgetsPage }) => {
        await expect(widgetsPage.locator('daikin-card').first()).toBeVisible();
        await expect(widgetsPage.locator('daikin-card').first()).toContainText('1');
        await expect(widgetsPage.locator('daikin-card').first()).toContainText('Alarm');
    });
});
