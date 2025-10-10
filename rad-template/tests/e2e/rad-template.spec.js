import { expect, test } from '../../../tests/helper';

test.describe('RAD Template', () => {
    test('Navigation is visible', async ({ radPage }) => {
        await expect(radPage.locator('[active]')).toContainText('Home');

        const page2Link = radPage.locator('a[href="/page2"]');
        await expect(
            page2Link,
            'Page 2 link should be visible in the navigation'
        ).toBeVisible();

        await page2Link.click();

        await expect(
            radPage,
            'Clicking the Page 2 link should navigate to /page2'
        ).toHaveURL(/\/page2(?:[?#]|$)/);

        await expect(
            radPage.locator('[active]'),
            'Active navigation item should switch to Page 2'
        ).toContainText('Page 2');
    });
});
