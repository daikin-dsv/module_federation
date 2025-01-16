import React, { useState, useEffect } from 'react';

import { AuthContext } from './context';
import { init } from './keycloak';

function Auth(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function initialize() {
            // if (process.env.NODE_ENV !== 'development') {
            const sso = await init();
            setIsAuthenticated(sso.authenticated);
            setUser(sso.tokenParsed);
            // } else {
            //     setIsAuthenticated(true);
            //     setUser({});
            // }
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