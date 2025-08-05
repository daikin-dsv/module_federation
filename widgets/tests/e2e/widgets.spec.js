const { expect, test } = require('../../../tests/helper');

test.describe('Widgets', () => {
    test('Alarm card is visible', async ({ widgetsPage }) => {
        await expect(widgetsPage.locator('daikin-card').first()).toBeVisible();
        await expect(widgetsPage.locator('daikin-card').first()).toContainText('1');
        await expect(widgetsPage.locator('daikin-card').first()).toContainText('Alarm');
    });

    test('Confirmation window is visible', async ({ widgetsPage }) => {
            await widgetsPage.getByTestId('confirmation-button').click();

            await widgetsPage.getByRole('alertdialog', { name: 'Confirmation window' }).waitFor({ state: 'visible' });
            await expect(widgetsPage.getByTestId('confirmation-window-header')).toContainText('Confirmation Required');
            await expect(widgetsPage.getByTestId('confirmation-window-description')).toContainText('Are you sure you want to proceed?');
            await expect(widgetsPage.getByTestId('confirmation-window-cancel-button')).toContainText('Cancel');
            await expect(widgetsPage.getByTestId('confirmation-window-confirm-button')).toContainText('Confirm');
            await widgetsPage.getByTestId('confirmation-window-cancel-button').click();

            await expect(widgetsPage.getByTestId('confirmation-window')).not.toBeVisible();
        });

    test('Right Panel is visible', async ({ widgetsPage }) => {
        test.step('Open Right Panel with Cumulative Type', async () => {
            await expect(widgetsPage.getByTestId('toggle-right-panel-button-cumulative')).toBeVisible();
            await expect(widgetsPage.getByTestId('right-panel')).not.toBeVisible();
            await widgetsPage.getByTestId('toggle-right-panel-button-cumulative').click();
            await expect(widgetsPage.getByTestId('right-panel')).toBeVisible();
        });
        test.step('Open Right Panel with Instantaneous Type', async () => {
            await expect(widgetsPage.getByTestId('toggle-right-panel-button-instantaneous')).toBeVisible();
            await expect(widgetsPage.getByTestId('right-panel')).not.toBeVisible();
            await widgetsPage.getByTestId('toggle-right-panel-button-instantaneous').click();
            await expect(widgetsPage.getByTestId('right-panel')).toBeVisible();
        });
    });
});
