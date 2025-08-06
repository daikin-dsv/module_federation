import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { init } from '../../layout/src/context/Auth/keycloak';
import AppRoutes from './AppRoutes';
import ErrorBoundary from './ErrorBoundary';
import ActiveNavLink from './components/ActiveNavLink';
import './index.css';
import {
    appRoutesText,
    bootstrapText,
    footerText,
    headerText,
    userText
} from './text.json';
import './webcomponents';

const Header = React.lazy(() =>
    import('Layout/header').then(() => ({
        default: (props) => <app-header {...props}></app-header>
    }))
);
const UserProfile = React.lazy(() =>
    import('Layout/user').then(() => ({
        default: (props) => <user-profile {...props}></user-profile>
    }))
);
const NavMenu = React.lazy(() =>
    import('Layout/navmenu').then(() => ({
        default: (props) => <nav-menu {...props}></nav-menu>
    }))
);
const Footer = React.lazy(() =>
    import('Layout/footer').then(() => ({
        default: (props) => <app-footer {...props}></app-footer>
    }))
);

function getNavConfig(lang) {
    return Object.freeze({
        ALERTS: {
            name: appRoutesText[lang].alerts,
            path: '/',
            breadcrumb: appRoutesText[lang].alerts
        },
        ALERTSSETTINGS: {
            name: appRoutesText[lang].alerts,
            path: '/alertssettings',
            breadcrumb: appRoutesText[lang].alertsSettings
        }
    });
}

function AppContainer({ lang, user }) {
    const NAVIGATION_CONFIG = getNavConfig(lang);

    return (
        <BrowserRouter>
            <ErrorBoundary fallback={<div>{bootstrapText[lang].error}</div>}>
                <div className="flex h-screen flex-col">
                    <Suspense fallback={headerText[lang].loadingHeader}>
                        <Header>
                            <UserProfile text={userText[lang]} user={user} />
                            <ActiveNavLink
                                slot="route"
                                to={NAVIGATION_CONFIG.ALERTS.path}
                            >
                                {NAVIGATION_CONFIG.ALERTS.name}
                            </ActiveNavLink>
                            <NavMenu
                                slot="route"
                                parentNav={appRoutesText[lang].settings}
                            >
                                <ActiveNavLink
                                    slot="child-nav"
                                    to={NAVIGATION_CONFIG.ALERTSSETTINGS.path}
                                >
                                    {NAVIGATION_CONFIG.ALERTSSETTINGS.name}
                                </ActiveNavLink>
                            </NavMenu>
                        </Header>
                    </Suspense>
                    <main className="flex flex-grow flex-col overflow-x-scroll p-4">
                        <AppRoutes
                            text={appRoutesText[lang]}
                            NAVIGATION_CONFIG={NAVIGATION_CONFIG}
                            lang={lang}
                        />
                    </main>
                    <Suspense fallback={footerText[lang].loadingFooter}>
                        <Footer copyright={footerText[lang].copyright} />
                    </Suspense>
                </div>
            </ErrorBoundary>
        </BrowserRouter>
    );
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

(async () => {
    const sso = await init();
    const user = sso.tokenParsed;
    const lang = user && user.locale && appRoutesText[user.locale] ? user.locale : 'en';

    root.render(
        sso.authenticated ? (
            <AppContainer lang={lang} user={user} />
        ) : (
            <div>{bootstrapText[lang].loading}</div>
        )
    );
})();
