const { expect, test } = require('../../../tests/helper');

test.describe('Header', () => {
    test('Header is visible', async ({ layoutPage }) => {
        await expect(layoutPage.locator('header')).toBeVisible();
    });
});

test.describe('UserProfile', () => {
    test('Displays user Profile and no Settings', async ({ layoutPage }) => {
        await layoutPage.getByTestId('user-profile-button').click();
        await layoutPage.getByTestId('user-profile-main-menu').waitFor({ state: 'visible' });
        await expect(layoutPage.getByTestId('user-profile-signed-in')).toContainText('Signed in as');
        await expect(layoutPage.getByTestId('user-profile-username')).toContainText('qatester');
        await expect(layoutPage.getByTestId('user-profile-item')).toContainText('Profile');
        await layoutPage.getByTestId('user-profile-item').click();

        await layoutPage.getByTestId('user-profile-profile-menu').waitFor({ state: 'visible' });
        await expect(layoutPage.getByTestId('user-profile-name-label')).toContainText('Name');
        await expect(layoutPage.getByTestId('user-profile-name')).toContainText('QA Tester');
        await expect(layoutPage.getByTestId('user-profile-email-label')).toContainText('Email');
        await expect(layoutPage.getByTestId('user-profile-email')).toContainText('qa-team-aaaaiqg5ii62gzx7yh7ruwnsnu@daikinsiliconvalley.slack.com');
        await expect(layoutPage.getByTestId('user-profile-language-label')).toContainText('Language');
        await expect(layoutPage.getByTestId('user-profile-language')).toContainText('English');
        await expect(layoutPage.getByTestId('user-manage-account-button')).toContainText('Manage Account');
        await layoutPage.getByTestId('user-profile-back-button').click();
        await layoutPage.getByTestId('user-profile-main-menu').waitFor({ state: 'visible' });

        await expect(layoutPage.getByTestId('user-settings-item')).not.toBeVisible();
        await expect(layoutPage.getByTestId('user-sign-out-button')).toContainText('Sign out');
    });
});
