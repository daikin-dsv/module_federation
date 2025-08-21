const { expect, test } = require('../../../tests/helper');

test.describe('alert-form-modal', () => {
    test('should open when open-alert-form-modal-button is clicked', async ({ widgetsPage }) => {
        await expect(widgetsPage.locator('daikin-modal').nth(1)).not.toHaveAttribute('open');
        await widgetsPage
            .getByTestId('open-alert-form-modal-button')
            .click();
        await expect(widgetsPage.locator('daikin-modal').nth(1)).toHaveAttribute('open');
    });

    test('should switch input groups when type changes', async ({ widgetsPage }) => {
        await widgetsPage
            .getByTestId('open-alert-form-modal-button')
            .click();

        await test.step('Default type = cumulative; Verify min field is visible', async () => {
            await expect(widgetsPage.locator('daikin-text-field#min')).toBeVisible();
        });

        await test.step('Switch to instantaneous', async () => {
            await widgetsPage.locator('daikin-radio[value="instantaneous"] input').check();
        });

        await expect(widgetsPage.locator('daikin-text-field#threshold')).toBeVisible();
        await expect(widgetsPage.locator('daikin-text-field#min')).not.toBeVisible();
    });

    test('should emit cancel event', async ({ widgetsPage }) => {
        await widgetsPage
            .getByTestId('open-alert-form-modal-button')
            .click();

        await widgetsPage.evaluate(() => {
            const modal = document.querySelector('alert-form-modal');
            window._cancelPromise = new Promise(resolve => {
                modal.addEventListener('cancel', () => resolve(true), { once: true });
            });
        });

        await widgetsPage.locator('alert-form-modal >> daikin-button:has-text("Cancel")').click();

        const cancelled = await widgetsPage.evaluate(() => window._cancelPromise);
        expect(cancelled).toBe(true);
    });


    test('should emit save event with form data', async ({ widgetsPage }) => {
        const alertData = {
            name: 'Test Alert',
            building: 'Building A',
            data: 'Test Data',
            type: 'cumulative',
            min: '0',
            max: '100',
            span: '60'
        };

        await widgetsPage
            .getByTestId('open-alert-form-modal-button')
            .click();

        await expect(widgetsPage.locator('daikin-button:has-text("Save")')).toHaveAttribute('disabled');


        const nameField = widgetsPage.locator('daikin-text-field#name input');
        await nameField.fill(alertData.name);
        await expect(nameField).toHaveValue(alertData.name);

        const buildingField = widgetsPage.locator('daikin-text-field#building input');
        await buildingField.fill(alertData.building);
        await expect(buildingField).toHaveValue(alertData.building);

        const dataField = widgetsPage.locator('daikin-text-field#data input');
        await dataField.fill(alertData.data);
        await expect(dataField).toHaveValue(alertData.data);

        const minField = widgetsPage.locator('daikin-text-field#min input');
        await minField.fill(alertData.min);
        await expect(minField).toHaveValue(alertData.min);

        const maxField = widgetsPage.locator('daikin-text-field#max input');
        await maxField.fill(alertData.max);
        await expect(maxField).toHaveValue(alertData.max);

        const spanField = widgetsPage.locator('daikin-text-field#span input');
        await spanField.fill(alertData.span);
        await expect(spanField).toHaveValue(alertData.span);

        await widgetsPage.evaluate(() => {
            const modal = document.querySelector('alert-form-modal');

            window._savePromise = new Promise(resolve => {
                modal.addEventListener('save', e => resolve(e.detail), { once: true });
            });
        });

        await expect(widgetsPage.locator('daikin-button:has-text("Save")')).not.toHaveAttribute('disabled');
        await widgetsPage.locator('alert-form-modal >> daikin-button:has-text("Save")').click();

        // Capture event
        const eventDetail = await widgetsPage.evaluate(() => window._savePromise);

        expect(eventDetail.name).toBe(alertData.name);
        expect(eventDetail.building).toBe(alertData.building);
        expect(eventDetail.data).toBe(alertData.data);
        expect(eventDetail.type).toBe(alertData.type);
        expect(eventDetail.min).toBe(alertData.min);
        expect(eventDetail.max).toBe(alertData.max);
        expect(eventDetail.span).toBe(alertData.span);
    });
});
