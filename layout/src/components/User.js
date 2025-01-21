import React from 'react';
import { useUserContext } from '../context/Auth/context';
import { logout } from '../context/Auth/keycloak';

const User = () => {
    const user = useUserContext();

    const logoutButton = () => <button onClick={logout}>Logout</button>;

    return (
        <>
            Hello {user?.preferred_username && user.preferred_username}
            {user?.preferred_username && logoutButton()}
        </>
    );
};

export default User;
