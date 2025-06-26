const {
    expect,
    test
} = require('../helper');

test.describe('Widgets', () => {
    test('Alarm card is visible', async ({ widgetsPage }) => {
        await expect(widgetsPage.getByTestId('alarm-card')).toBeVisible();
    });
});
