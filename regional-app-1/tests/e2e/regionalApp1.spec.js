const { expect, test } = require('../../../tests/helper');

test.describe('Regional App 1', () => {
    test('Gauge card is visible', async ({ regionalApp1Page }) => {
        const index = 2;
        await expect(regionalApp1Page.locator('daikin-card').nth(index)).toBeVisible();
        await expect(regionalApp1Page.locator('daikin-card').nth(index)).toContainText('5750.2 kWh');
        await expect(regionalApp1Page.locator('daikin-card').nth(index)).toContainText('Building 1');
    });
});
