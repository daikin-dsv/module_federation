'use client';

import { useEffect, useRef } from 'react';

import type { Session } from 'next-auth';

import ActiveLink from './components/ActiveLink';
import type { UserText } from './locale/types';

type SessionUser = NonNullable<Session['user']>;

type NavigationLink = {
    href: string;
    label: string;
};

type NavigationMenuProps = {
    user: SessionUser;
    userManagementLink: string;
    links: NavigationLink[];
    userText: UserText;
};

interface UserProfileElement extends HTMLElement {
    user?: SessionUser;
}

export default function NavigationMenu({
    user,
    userManagementLink,
    links,
    userText
}: NavigationMenuProps) {
    const userProfileRef = useRef<UserProfileElement | null>(null);

    useEffect(() => {
        if (userProfileRef.current && user) {
            userProfileRef.current.user = user;
        }
    }, [user]);

    return (
        <>
            <user-profile
                ref={userProfileRef}
                logoutLink="/api/auth/signout"
                accountManagementLink={userManagementLink}
                text={userText}
            ></user-profile>
            {links.map(({ href, label }) => (
                <ActiveLink key={href} slot="route" href={href}>
                    {label}
                </ActiveLink>
            ))}
        </>
    );
}
