import type { FooterText } from 'layout/components/Footer';
import type { UserText } from 'layout/components/User';

export type AppRoutesText = Record<string, string>;

export type TextBundle = {
    appRoutes: AppRoutesText;
    footer: FooterText;
    user: UserText;
};

export type SupportedLocale = 'en' | 'ja';

export type { UserText };
