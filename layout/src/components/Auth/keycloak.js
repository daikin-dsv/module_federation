import Keycloak from 'keycloak-js';

const SSO_URL = 'https://sso-dev.daikinlab.com/auth';
const SSO_REALM = 'daikin';
const SSO_CLIENT = 'rad-test2';

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
            pkceMethod: 'S256'
        });
        if (authenticated) {
            console.info(`Authenticated User: ${keycloak.tokenParsed.preferred_username}`);
            debugger
        } else {
            console.log('User is not authenticated');
        }
    } catch (error) {
        console.error('Failed to initialize adapter:', error);
    }
};

/**
 * Logout user
 */
const logout = (options) => keycloak.logout(options);

const isAuthenticated = () => {
    keycloak.authenticated
    debugger;
    return keycloak.authenticated
};

export { init, logout, isAuthenticated };
