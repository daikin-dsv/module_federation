const { expect, test } = require('../../../tests/helper');

test.describe('Regional App 2', () => {
    test('Switch card is visible', async ({ regionalApp2Page }) => {
        const index = 2;
        await expect(regionalApp2Page.locator('daikin-card').nth(index)).toBeVisible();
        await expect(regionalApp2Page.locator('daikin-card').nth(index)).toContainText('On');
        await expect(regionalApp2Page.locator('daikin-card').nth(index)).toContainText('知識の森');
    });
});
