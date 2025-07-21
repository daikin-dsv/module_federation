const { expect, test } = require('../../../tests/helper');

test.describe('NavMenu', () => {
    test('Display parent and child navigation', async ({ layoutPage }) => {
        await expect(layoutPage.getByTestId('parent-nav-button')).toContainText('Settings');
        await layoutPage.getByTestId('parent-nav-button').click();

        await layoutPage.getByTestId('children-nav-menu').waitFor({ state: 'visible' });
        await expect(layoutPage.getByRole('link', { name: 'Alerts' })).toBeVisible();
        await expect(layoutPage.getByRole('link', { name: 'Reports' })).toBeVisible();
        await layoutPage.getByRole('link', { name: 'Alerts' }).click();

        await layoutPage.waitForLoadState('domcontentloaded');

        //TODO: Fix issue BDRK-124 and enable this test
        // await expect(layoutPage).toHaveURL('/alertssettings');
    });
});
