const { expect, test } = require('../../../tests/helper');

test.describe('NavMenu', () => {
    test('Display parent and child navigation', async ({ layoutPage }) => {
        await expect(layoutPage.getByTestId('parent-nav-button-Settings')).toContainText('Settings');
        await layoutPage.getByTestId('parent-nav-button-Settings').click();

        await layoutPage.locator('daikin-menu').filter({ hasText: 'Settings' }).getByTestId('children-nav-menu').waitFor({ state: 'visible' });
        await expect(layoutPage.getByRole('link', { name: 'Alerts', exact: true })).toBeVisible();
        await expect(layoutPage.getByRole('link', { name: 'Reports', exact: true })).toBeVisible();
        await layoutPage.getByRole('link', { name: 'Alerts', exact: true }).click();

        await layoutPage.waitForLoadState('domcontentloaded');

        await expect(layoutPage.url()).toContain('/alerts');
    });

    test('Responsive design works on mobile viewport', async ({ layoutPage }) => {
        // Set mobile viewport
        await layoutPage.setViewportSize({ width: 412, height: 915 });

        await expect(layoutPage.getByTestId('parent-nav-button-More')).toContainText('More');
        await layoutPage.getByTestId('parent-nav-button-More').click();

        await layoutPage.locator('daikin-menu').filter({ hasText: 'More' }).getByTestId('children-nav-menu').waitFor({ state: 'visible' });
        await expect(layoutPage.getByTestId('parent-nav-button-Settings')).toContainText('Settings');
        await expect(layoutPage.getByRole('link', { name: 'Home', exact: true })).toBeVisible();
        await expect(layoutPage.getByRole('link', { name: 'About', exact: true })).toBeVisible();
        await expect(layoutPage.getByRole('link', { name: 'Contact', exact: true })).toBeVisible();
        await layoutPage.getByTestId('parent-nav-button-Settings').click();

        await layoutPage.locator('daikin-menu').filter({ hasText: 'Settings' }).getByTestId('children-nav-menu').waitFor({ state: 'visible' });
        await expect(layoutPage.getByRole('link', { name: 'Alerts', exact: true })).toBeVisible();
        await expect(layoutPage.getByRole('link', { name: 'Reports', exact: true })).toBeVisible();
        await layoutPage.getByRole('link', { name: 'Alerts', exact: true }).click();

        await layoutPage.waitForLoadState('domcontentloaded');

        await expect(layoutPage.url()).toContain('/alerts');
    });
});
