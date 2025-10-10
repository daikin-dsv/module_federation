import { Suspense, type ReactNode } from 'react';

import { auth } from '@/lib/auth';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { redirect } from 'next/navigation';

import BreadcrumbNav from './BreadcrumbNav';
import Navigation from './Navigation';
import { DaikinLoadingReact } from './components/dds-wrappers';
import './globals.css';
import { loadTexts } from './locale';
import type { TextBundle } from './locale';
import './webcomponents';

const webComponentsScript = (
    // eslint-disable-next-line @next/next/no-sync-scripts
    <script src="/webcomponents.js"></script>
);

export const metadata: Metadata = {
    title: 'RAD Template',
    description: 'A modern Daikin application build with RAD'
};

export default function RootLayout({
    children
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
            <head>{webComponentsScript}</head>
            <body className="font-daikin-serif antialiased">
                <Suspense
                    fallback={
                        <div className="flex h-screen items-center justify-center">
                            <DaikinLoadingReact />
                        </div>
                    }
                >
                    <AuthenticatedApp>{children}</AuthenticatedApp>
                </Suspense>
            </body>
        </html>
    );
}

async function AuthenticatedApp({
    children
}: Readonly<{
    children: ReactNode;
}>) {
    const session = await auth();

    if (!session) {
        redirect('/api/auth/signin');
    }

    const locale = session.user?.locale;
    const texts = await loadTexts(locale);

    const navigationLinks = getNavigationLinks(texts);
    const breadcrumbConfig = getBreadcrumbConfig(texts);

    return (
        <SessionProvider session={session}>
            <div className="flex h-screen flex-col">
                <Navigation
                    session={session}
                    links={navigationLinks}
                    userText={texts.user}
                />
                <main className="flex flex-grow flex-col overflow-x-scroll p-4">
                    <BreadcrumbNav config={breadcrumbConfig} />
                    {children}
                </main>
                <app-footer copyright={texts.footer.copyright}></app-footer>
            </div>
        </SessionProvider>
    );
}

type NavigationLink = {
    href: string;
    label: string;
};

function getNavigationLinks(texts: TextBundle): NavigationLink[] {
    return [
        { href: '/', label: texts.appRoutes.home },
        { href: '/page2', label: texts.appRoutes.page2 }
    ];
}

type BreadcrumbItem = NavigationLink;

type BreadcrumbConfig = Record<string, BreadcrumbItem[]>;

function getBreadcrumbConfig(texts: TextBundle): BreadcrumbConfig {
    const home: BreadcrumbItem = { href: '/', label: texts.appRoutes.home };
    const page2: BreadcrumbItem = {
        href: '/page2',
        label: texts.appRoutes.page2
    };

    return {
        '/': [home],
        '/page2': [home, page2]
    };
}
