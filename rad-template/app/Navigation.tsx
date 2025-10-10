import type { Session } from 'next-auth';

import NavigationMenu from './NavigationMenu';
import type { UserText } from './locale/types';

type NavigationLink = {
    href: string;
    label: string;
};

type NavigationProps = {
    session: Session;
    links: NavigationLink[];
    userText: UserText;
};

export default function Navigation({ session, links, userText }: NavigationProps) {
    if (!session?.user) {
        return null;
    }

    const { AUTH_URL, AUTH_KEYCLOAK_ID, AUTH_KEYCLOAK_ISSUER } = process.env;
    const userManagementLink =
        AUTH_KEYCLOAK_ISSUER && AUTH_KEYCLOAK_ID && AUTH_URL
            ? `${AUTH_KEYCLOAK_ISSUER}/account?referrer=${AUTH_KEYCLOAK_ID}&referrer_uri=${AUTH_URL}`
            : '';

    return (
        <app-header>
            <NavigationMenu
                user={session.user}
                userManagementLink={userManagementLink}
                links={links}
                userText={userText}
            />
        </app-header>
    );
}
