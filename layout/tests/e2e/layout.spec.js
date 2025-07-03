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
        await expect(layoutPage.getByTestId('user-manage-account-button')).toContainText('Manage Account');
        await layoutPage.getByTestId('user-profile-back-button').click();
        await layoutPage.getByTestId('user-profile-main-menu').waitFor({ state: 'visible' });

        await expect(layoutPage.getByTestId('user-settings-item')).not.toBeVisible();
        await expect(layoutPage.getByTestId('user-sign-out-button')).toContainText('Sign out');
    });

    test('Display Settings with Language option', async ({ layoutPage }) => {
        const userProfile = layoutPage.locator('user-profile');
        await userProfile.evaluate((el) => {
            el.text = {
                signedIn: 'Signed in as',
                profile: 'Profile',
                name: 'Name',
                email: 'Email',
                manageAccount: 'Manage Account',
                signOut: 'Sign out',
                settings: 'Settings',
                language: 'Language',
            };
            el.settings = { language: true };
            el.language = {
                current: 'en',
                options: [
                    { value: 'en', label: 'English' },
                    { value: 'ja', label: '日本語' }
                ]
            };
        });
        await layoutPage.getByTestId('user-profile-button').click();

        await layoutPage.getByTestId('user-profile-main-menu').waitFor({ state: 'visible' });
        await expect(layoutPage.getByTestId('user-settings-item')).toContainText('Settings');
        await layoutPage.getByTestId('user-settings-item').click();

        await layoutPage.getByTestId('user-profile-settings-menu').waitFor({ state: 'visible' });
        await expect(layoutPage.getByTestId('user-profile-settings-language-label')).toContainText('Language');
        await layoutPage.getByTestId('user-language-select').click();
        await expect(layoutPage.getByTestId('user-language-option-selected-en')).toContainText('English');
        await expect(layoutPage.getByTestId('user-language-option-ja')).toContainText('日本語');
    });
});
