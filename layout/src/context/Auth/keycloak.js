import Keycloak from 'keycloak-js';

const SSO_URL = 'https://sso-dev.daikinlab.com/auth';
const SSO_REALM = 'daikin';
const SSO_CLIENT = 'rad-test';

const keycloak = new Keycloak({
    url: SSO_URL,
    realm: SSO_REALM,
    clientId: SSO_CLIENT
});

/**
 * Initializes Keycloak. This will prompt you to login.
 *
 */
const init = async () => {
    try {
        const authenticated = await keycloak.init({
            checkLoginIframe: false,
            onLoad: 'login-required',
            pkceMethod: 'S256',
            token: localStorage.getItem('kc_token'),
            refreshToken: localStorage.getItem('kc_refreshToken'),
        });
        if (authenticated) {
            console.info(
                `Authenticated User: ${keycloak.tokenParsed.preferred_username}`
            );

            // save tokens
            localStorage.setItem('kc_token', keycloak.token);
            localStorage.setItem('kc_refreshToken', keycloak.refreshToken);

            // auto-refresh before expiry (runs every 10 seconds)
            setInterval(() => {
                // Try to refresh the token if it's going to expire in the next 60 seconds
                keycloak.updateToken(60).then((refreshed) => {
                    if (refreshed) {
                        // Save the latest tokens to localStorage so they survive page reloads
                        localStorage.setItem('kc_token', keycloak.token);
                        localStorage.setItem('kc_refreshToken', keycloak.refreshToken);
                    }
                    // If `refreshed === false`, it means the token is still valid,
                    // so nothing needs to be updated
                }).catch(() => {
                    // If refreshing fails then force logout (e.g. refresh token expired, user logged out, etc.)
                    console.warn('Failed to refresh token, logging out');
                    logout();
                });
            }, 10000);
        } else {
            console.log('User is not authenticated');
        }
    } catch (error) {
        console.error('Failed to initialize adapter:', error);
    }

    return keycloak;
};

/**
 * Logout user
 */
const logout = (options) => {
    localStorage.removeItem('kc_token');
    localStorage.removeItem('kc_refreshToken');
    keycloak.logout(options);
}

/**
 * Redirects to the Account Console
 */
const accountManagement = () => keycloak.accountManagement();

export { init, logout, accountManagement };
