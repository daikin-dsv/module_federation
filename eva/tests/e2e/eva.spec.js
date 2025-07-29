const { expect, test } = require('../../../tests/helper');

test.describe('Energy Visualization Application (EVA)', () => {
    test('Navigation is visible', async ({ evaPage }) => {
        await expect(evaPage.locator('[active]')).toContainText('Alerts');
        await expect(evaPage.getByTestId('parent-nav-button')).toContainText('Settings');
        await evaPage.getByTestId('parent-nav-button').click();
        await expect(evaPage.locator('nav-menu')).toContainText('Alerts');
    });
});
