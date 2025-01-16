import React from 'react';
import { useUserContext } from './Auth/context';
import { logout } from './Auth/keycloak';

const User = () => {
    const user = useUserContext();

    const logoutButton = () => <button onClick={logout}>Logout</button>;

    return (
        <>
            Hello {user.preferred_username && user.preferred_username}
            {user?.preferred_username && logoutButton()}
        </>
    );
};

export default User;
