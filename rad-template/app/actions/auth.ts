'use server';

import { signIn as rawSignIn, signOut as rawSignOut } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const signIn = rawSignIn.bind(null, 'keycloak');

export const signOut = async () => {
    try {
        await rawSignOut();
    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        redirect('/api/auth/signin');
    }
};
