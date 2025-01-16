import React from 'react';

import { init, logout } from './keycloak';

function Auth(props) {
    init();

    const logoutButton = () => <button onClick={logout}>Logout</button>;

    return (
        <>
            {logoutButton()}
            {props.children}
        </>
    );
}

export default Auth;