import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import type { UserText } from '../app/locale/types';

type WebComponentElement = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

interface UserProfileAttributes extends HTMLAttributes<HTMLElement> {
    accountManagementLink?: string;
    logoutLink?: string;
    text?: UserText;
}

interface AppFooterAttributes extends HTMLAttributes<HTMLElement> {
    copyright?: string;
}

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'app-footer': DetailedHTMLProps<AppFooterAttributes, HTMLElement>;
            'app-header': WebComponentElement;
            'user-profile': DetailedHTMLProps<UserProfileAttributes, HTMLElement>;
        }
    }
}

export {};
