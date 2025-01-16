import { createContext, useContext } from 'react';

export const AuthContext = createContext(null);

export function useUserContext() {
    const user = useContext(AuthContext);

    return user;
};
