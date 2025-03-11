import React, { useState, useEffect } from 'react';

import { AuthContext, useUserContext } from './context';
import { init } from './keycloak';

function Auth(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function initialize() {
            const sso = await init();
            setIsAuthenticated(sso.authenticated);
            setUser({ ...sso.tokenParsed, token: sso.token });
        }

        initialize();
    }, []);

    return (
        <AuthContext.Provider value={user}>
            {isAuthenticated && props.children}
            {!isAuthenticated && 'Loading...'}
        </AuthContext.Provider>
    );
}

export default Auth;
export { useUserContext };
