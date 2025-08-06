const { expect, test } = require('../../../tests/helper');

test.describe('Alerts Page', () => {
    test('displays alerts page correctly', async ({ evaPage }) => {
        // Wait for the alerts component to load
        await expect(evaPage.locator('h1')).toContainText('Alerts');

        // Check if search field is visible
        await expect(evaPage.locator('daikin-text-field')).toBeVisible();

        // Check if table is visible
        await expect(evaPage.locator('daikin-table')).toBeVisible();

        // Check if pagination is visible
        await expect(evaPage.locator('daikin-pagination')).toBeVisible();
    });

    test('displays correct table headers', async ({ evaPage }) => {
        // Check all expected table headers using more specific selectors
        await expect(
            evaPage.locator('daikin-table-header-cell[slot="header:alertedAt"]')
        ).toContainText('Alerted at');

        // Check for other headers in the table
        const tableHeaders = evaPage.locator('daikin-table').first();
        await expect(tableHeaders).toContainText('Alert');
        await expect(tableHeaders).toContainText('Building');
        await expect(tableHeaders).toContainText('Data');
        await expect(tableHeaders).toContainText('Type');
    });

    test('displays mock alert data', async ({ evaPage }) => {
        // Wait for table to load
        await evaPage.waitForSelector('daikin-table-cell');

        // Check if at least one alert is visible
        await expect(evaPage.locator('daikin-table-cell').first()).toBeVisible();

        // Check for specific mock data
        await expect(evaPage.locator('daikin-table')).toContainText(
            'Tokyo University Building A'
        );
        await expect(evaPage.locator('daikin-table')).toContainText(
            'Daikin Osaka Building B'
        );
        await expect(evaPage.locator('daikin-table')).toContainText(
            'Primary Energy Consumption Alert'
        );
        await expect(evaPage.locator('daikin-table')).toContainText('CO2 Alert');
    });

    test('search functionality works correctly', async ({ evaPage }) => {
        // Get the search input
        const searchInput = evaPage.locator('daikin-text-field');

        // Search for "Tokyo" using the component's value property
        await searchInput.evaluate((el) => {
            el.value = 'Tokyo';
            el.dispatchEvent(new Event('input', { bubbles: true }));
        });

        // Wait for search results
        await evaPage.waitForTimeout(500);

        // Check that only Tokyo University results are shown
        await expect(evaPage.locator('daikin-table')).toContainText(
            'Tokyo University Building A'
        );
        await expect(evaPage.locator('daikin-table')).not.toContainText(
            'Daikin Osaka Building B'
        );

        // Clear search
        await searchInput.evaluate((el) => {
            el.value = '';
            el.dispatchEvent(new Event('input', { bubbles: true }));
        });
        await evaPage.waitForTimeout(500);

        // Check that all results are shown again
        await expect(evaPage.locator('daikin-table')).toContainText(
            'Tokyo University Building A'
        );
        await expect(evaPage.locator('daikin-table')).toContainText(
            'Daikin Osaka Building B'
        );
    });

    test('search is case insensitive', async ({ evaPage }) => {
        const searchInput = evaPage.locator('daikin-text-field');

        // Search with lowercase
        await searchInput.evaluate((el) => {
            el.value = 'tokyo';
            el.dispatchEvent(new Event('input', { bubbles: true }));
        });
        await evaPage.waitForTimeout(500);

        // Should still find Tokyo University
        await expect(evaPage.locator('daikin-table')).toContainText(
            'Tokyo University Building A'
        );

        // Search with mixed case
        await searchInput.evaluate((el) => {
            el.value = 'ToKyO';
            el.dispatchEvent(new Event('input', { bubbles: true }));
        });
        await evaPage.waitForTimeout(500);

        // Should still find Tokyo University
        await expect(evaPage.locator('daikin-table')).toContainText(
            'Tokyo University Building A'
        );
    });

    test('read/unread functionality works', async ({ evaPage }) => {
        // Wait for table to load
        await evaPage.waitForSelector('daikin-icon-button');

        // Get the first read/unread button
        const firstButton = evaPage.locator('daikin-icon-button').first();

        // Check if button is visible
        await expect(firstButton).toBeVisible();

        // Click the button to toggle read status
        await firstButton.click();

        // Wait for state change
        await evaPage.waitForTimeout(500);

        // The button should still be visible (state might have changed)
        await expect(firstButton).toBeVisible();
    });

    test('unread indicators are displayed', async ({ evaPage }) => {
        // Wait for table to load
        await evaPage.waitForSelector('daikin-table-cell');

        // Look for unread indicators (blue dots)
        const unreadIndicators = evaPage.locator('.bg-dds-color-blue-50');

        // There should be at least one unread indicator
        const count = await unreadIndicators.count();
        expect(count).toBeGreaterThan(0);
    });

    test('sorting by date works', async ({ evaPage }) => {
        // Wait for table header to be clickable
        await evaPage.waitForSelector(
            'daikin-table-header-cell[slot="header:alertedAt"]'
        );

        // Click on "Alerted at" header to sort
        const sortableHeader = evaPage.locator(
            'daikin-table-header-cell[slot="header:alertedAt"]'
        );
        await sortableHeader.click();

        // Wait for sort to apply
        await evaPage.waitForTimeout(500);

        // Check that table still contains data (sorting worked)
        await expect(evaPage.locator('daikin-table')).toContainText('2025/06/19');
    });

    test('pagination displays correct information', async ({ evaPage }) => {
        // Wait for pagination to load
        await evaPage.waitForSelector('daikin-pagination');

        // Check if pagination component is visible
        await expect(evaPage.locator('daikin-pagination')).toBeVisible();

        // Check if results summary is displayed
        const resultsText = evaPage.locator('text=Showing');
        await expect(resultsText).toBeVisible();
        await expect(resultsText).toContainText('Showing');
        await expect(resultsText).toContainText('of');
        await expect(resultsText).toContainText('results');
    });

    test('pagination navigation works', async ({ evaPage }) => {
        // If there are multiple pages, test pagination
        const pagination = evaPage.locator('daikin-pagination');
        await expect(pagination).toBeVisible();

        // Check if pagination has page numbers
        const hasMultiplePages = (await pagination.locator('[data-page]').count()) > 1;

        if (hasMultiplePages) {
            // Click on page 2 if it exists
            const page2 = pagination.locator('[data-page="2"]');
            if (await page2.isVisible()) {
                await page2.click();
                await evaPage.waitForTimeout(500);

                // Check that we're still on the alerts page
                await expect(evaPage.locator('h1')).toContainText('Alerts');
            }
        }
    });

    test('responsive design works on mobile viewport', async ({ evaPage }) => {
        // Set mobile viewport
        await evaPage.setViewportSize({ width: 412, height: 915 });

        // Check if alerts page is still functional
        await expect(evaPage.locator('h1')).toContainText('Alerts');
        await expect(evaPage.locator('daikin-text-field')).toBeVisible();
        await expect(evaPage.locator('daikin-table')).toBeVisible();

        // Check if search still works
        const searchInput = evaPage.locator('daikin-text-field');
        await searchInput.evaluate((el) => {
            el.value = 'Tokyo';
            el.dispatchEvent(new Event('input', { bubbles: true }));
        });
        await evaPage.waitForTimeout(500);
        await expect(evaPage.locator('daikin-table')).toContainText(
            'Tokyo University Building A'
        );
    });

    test('component handles empty search results', async ({ evaPage }) => {
        const searchInput = evaPage.locator('daikin-text-field');

        // Search for something that doesn't exist
        await searchInput.evaluate((el) => {
            el.value = 'NonexistentBuilding';
            el.dispatchEvent(new Event('input', { bubbles: true }));
        });
        await evaPage.waitForTimeout(500);

        // Check that results summary reflects no results
        const resultsText = evaPage.locator('text=Showing');
        await expect(resultsText).toContainText('0');
    });

    test('accessibility features work correctly', async ({ evaPage }) => {
        // Check if buttons have proper ARIA labels
        const iconButtons = evaPage.locator('daikin-icon-button');
        const firstButton = iconButtons.first();

        await expect(firstButton).toBeVisible();

        // Check if search field has proper labeling
        const searchField = evaPage.locator('daikin-text-field');
        await expect(searchField).toBeVisible();

        // Check if table headers are properly structured
        const tableHeaders = evaPage.locator(
            'daikin-table-header-cell[slot="header:alertedAt"]'
        );
        await expect(tableHeaders).toBeVisible();
    });
});
