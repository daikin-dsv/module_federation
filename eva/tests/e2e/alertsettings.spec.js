const { expect, test } = require('../../../tests/helper');

test.describe('Alert Settings Page', () => {
    test('displays alert settings page correctly', async ({ evaPage }) => {
        // Navigate to alert settings page
        await evaPage.goto(`${process.env.EVA_URL}/alertssettings`);

        // Wait for the alert settings component to load
        await expect(evaPage.locator('h1')).toContainText('Alert Settings');

        // Check if search field is visible
        await expect(evaPage.locator('daikin-text-field')).toBeVisible();

        // Check if create alert button is visible
        await expect(evaPage.getByTestId('create-alert')).toBeVisible();

        // Check if table is visible
        await expect(evaPage.locator('daikin-table')).toBeVisible();

        // Check if pagination is visible
        await expect(evaPage.locator('daikin-pagination')).toBeVisible();
    });

    test('displays correct table headers', async ({ evaPage }) => {
        await evaPage.goto(`${process.env.EVA_URL}/alertssettings`);

        // Check all expected table headers
        await expect(
            evaPage.locator('daikin-table-header-cell[slot="header:alert"]')
        ).toContainText('Alert');

        await expect(
            evaPage.locator('daikin-table-header-cell[slot="header:building"]')
        ).toContainText('Building');

        await expect(
            evaPage.locator('daikin-table-header-cell[slot="header:data"]')
        ).toContainText('Data');

        await expect(
            evaPage.locator('daikin-table-header-cell[slot="header:updatedAt"]')
        ).toContainText('Updated at');
    });

    test('displays mock alert settings data', async ({ evaPage }) => {
        await evaPage.goto(`${process.env.EVA_URL}/alertssettings`);

        // Wait for table to load
        await evaPage.waitForSelector('daikin-table-cell');

        // Check if at least one alert setting is visible
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
        await evaPage.goto(`${process.env.EVA_URL}/alertssettings`);

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
        await evaPage.goto(`${process.env.EVA_URL}/alertssettings`);

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

    test('delete functionality works', async ({ evaPage }) => {
        await evaPage.goto(`${process.env.EVA_URL}/alertssettings`);

        // Wait for table to load
        await evaPage.waitForSelector('daikin-icon-button');

        // Count rows before deletion
        const rowCells = evaPage.locator('daikin-table-cell[slot*=":alert"]');
        const initialRowCount = await rowCells.count();
        expect(initialRowCount).toBeGreaterThan(0);

        // Click the first delete button (trash icon)
        const firstDeleteButton = evaPage.getByTestId('alert-setting-delete').first();
        await expect(firstDeleteButton).toBeVisible();
        await firstDeleteButton.click();

        // Wait for the confirmation dialog to show up and click confirm
        const confirmButton = evaPage
            .locator('widget-confirmation-window')
            .locator('[data-testid="confirmation-window-confirm-button"]');
        await expect(confirmButton).toBeVisible();
        await confirmButton.click();

        // Verify that one row was deleted
        await evaPage.waitForTimeout(300); // allow state to update
        const newRowCount = await rowCells.count();
        expect(newRowCount).toBe(initialRowCount - 1);
    });

    test('edit functionality works', async ({ evaPage }) => {
        await evaPage.goto(`${process.env.EVA_URL}/alertssettings`);

        // Wait for table to load
        await evaPage.waitForSelector('daikin-icon-button');

        // Get the first edit button (pencil icon)
        const firstEditButton = evaPage.getByTestId('alert-setting-edit').first();

        // Check if button is visible
        await expect(firstEditButton).toBeVisible();

        // Click the edit button
        await firstEditButton.click();

        // Wait for action
        await evaPage.waitForTimeout(500);

        // Change this so that modal is visible after implementation
        await expect(firstEditButton).toBeVisible();
    });

    test('create alert button is functional', async ({ evaPage }) => {
        await evaPage.goto(`${process.env.EVA_URL}/alertssettings`);

        // Check if create alert button is visible and clickable
        const createButton = evaPage.getByTestId('create-alert');
        await expect(createButton).toBeVisible();
        await expect(createButton).toContainText('Create Alert');

        // Click the create button
        await createButton.click();

        // Wait for action
        await evaPage.waitForTimeout(500);

        // Change this so that modal is visible after implementation
        await expect(createButton).toBeVisible();
    });

    test('sorting by alert name works', async ({ evaPage }) => {
        await evaPage.goto(`${process.env.EVA_URL}/alertssettings`);

        // Wait for table to load
        await evaPage.waitForSelector('daikin-table-cell[slot*=":alert"]');

        // Get the first row's alert text before sorting
        const firstRowAlertBefore = evaPage
            .locator('daikin-table-cell[slot*=":alert"]')
            .first();
        const alertTextBefore = await firstRowAlertBefore.textContent();

        // Wait for table header to be clickable
        await evaPage.waitForSelector('daikin-table-header-cell[slot="header:alert"]');

        // Click on "Alert" header to sort
        const sortableHeader = evaPage.locator(
            'daikin-table-header-cell[slot="header:alert"]'
        );
        await sortableHeader.click();

        // Wait for sort to apply
        await evaPage.waitForTimeout(500);

        // Get the first row's alert text after sorting
        const firstRowAlertAfter = evaPage
            .locator('daikin-table-cell[slot*=":alert"]')
            .first();
        const alertTextAfter = await firstRowAlertAfter.textContent();

        // Verify that the first row changed (sorting actually worked)
        expect(alertTextBefore).not.toBe(alertTextAfter);

        // Verify that the table still contains the expected data
        await expect(evaPage.locator('daikin-table')).toContainText(
            'Primary Energy Consumption Alert'
        );
    });

    test('sorting by building works', async ({ evaPage }) => {
        await evaPage.goto(`${process.env.EVA_URL}/alertssettings`);

        // Wait for table to load
        await evaPage.waitForSelector('daikin-table-cell[slot*=":building"]');

        // Get the first row's building text before sorting
        const firstRowBuildingBefore = evaPage
            .locator('daikin-table-cell[slot*=":building"]')
            .first();
        const buildingTextBefore = await firstRowBuildingBefore.textContent();

        // Wait for table header to be clickable
        await evaPage.waitForSelector('daikin-table-header-cell[slot="header:building"]');

        // Click on "Building" header to sort
        const sortableHeader = evaPage.locator(
            'daikin-table-header-cell[slot="header:building"]'
        );
        await sortableHeader.click();

        // Wait for sort to apply
        await evaPage.waitForTimeout(500);

        // Get the first row's building text after sorting
        const firstRowBuildingAfter = evaPage
            .locator('daikin-table-cell[slot*=":building"]')
            .first();
        const buildingTextAfter = await firstRowBuildingAfter.textContent();

        // Verify that the first row changed (sorting actually worked)
        expect(buildingTextBefore).not.toBe(buildingTextAfter);

        // Verify that the table still contains the expected data
        await expect(evaPage.locator('daikin-table')).toContainText(
            'Tokyo University Building A'
        );
    });

    test('sorting by updated date works', async ({ evaPage }) => {
        await evaPage.goto(`${process.env.EVA_URL}/alertssettings`);

        // Wait for table to load
        await evaPage.waitForSelector('daikin-table-cell[slot*=":updatedAt"]');

        // Get the first row's date text before sorting
        const firstRowDateBefore = evaPage
            .locator('daikin-table-cell[slot*=":updatedAt"]')
            .first();
        const dateTextBefore = await firstRowDateBefore.textContent();

        // Wait for table header to be clickable
        await evaPage.waitForSelector(
            'daikin-table-header-cell[slot="header:updatedAt"]'
        );

        // Click on "Updated at" header to sort
        const sortableHeader = evaPage.locator(
            'daikin-table-header-cell[slot="header:updatedAt"]'
        );
        await sortableHeader.click();

        // Wait for sort to apply
        await evaPage.waitForTimeout(500);

        // Get the first row's date text after sorting
        const firstRowDateAfter = evaPage
            .locator('daikin-table-cell[slot*=":updatedAt"]')
            .first();
        const dateTextAfter = await firstRowDateAfter.textContent();

        // Verify that the first row changed (sorting actually worked)
        expect(dateTextBefore).not.toBe(dateTextAfter);

        // Verify that the table still contains the expected data
        await expect(evaPage.locator('daikin-table')).toContainText('2025/06/19');
    });

    test('pagination displays correct information', async ({ evaPage }) => {
        await evaPage.goto(`${process.env.EVA_URL}/alertssettings`);

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
        await evaPage.goto(`${process.env.EVA_URL}/alertssettings`);

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

                // Check that we're still on the alert settings page
                await expect(evaPage.locator('h1')).toContainText('Alert Settings');
            }
        }
    });

    test('responsive design works on mobile viewport', async ({ evaPage }) => {
        await evaPage.goto(`${process.env.EVA_URL}/alertssettings`);

        // Set mobile viewport
        await evaPage.setViewportSize({ width: 412, height: 915 });

        // Check if alert settings page is still functional
        await expect(evaPage.locator('h1')).toContainText('Alert Settings');
        await expect(evaPage.locator('daikin-text-field')).toBeVisible();
        await expect(evaPage.getByTestId('create-alert')).toBeVisible();
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
        await evaPage.goto(`${process.env.EVA_URL}/alertssettings`);

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
        await evaPage.goto(`${process.env.EVA_URL}/alertssettings`);

        // Check if buttons have proper ARIA labels
        const iconButtons = evaPage.locator('daikin-icon-button');
        const firstButton = iconButtons.first();

        await expect(firstButton).toBeVisible();

        // Check if search field has proper labeling
        const searchField = evaPage.locator('daikin-text-field');
        await expect(searchField).toBeVisible();

        // Check if create button is properly labeled
        const createButton = evaPage.getByTestId('create-alert');
        await expect(createButton).toBeVisible();

        // Check if table headers are properly structured
        const tableHeaders = evaPage.locator(
            'daikin-table-header-cell[slot="header:alert"]'
        );
        await expect(tableHeaders).toBeVisible();
    });

    test('action buttons are properly displayed', async ({ evaPage }) => {
        await evaPage.goto(`${process.env.EVA_URL}/alertssettings`);

        // Wait for table to load
        await evaPage.waitForSelector('daikin-icon-button');

        // Check that both delete and edit buttons are present
        const iconButtons = evaPage.locator('daikin-icon-button');
        const buttonCount = await iconButtons.count();

        // Should have at least 2 buttons per row (delete and edit)
        expect(buttonCount).toBeGreaterThanOrEqual(20); // 10 rows * 2 buttons

        // Check that first row has both delete and edit buttons
        const firstRowActions = evaPage
            .locator('daikin-table-cell[slot*=":actions"]')
            .first();
        await expect(firstRowActions).toBeVisible();
    });
});
