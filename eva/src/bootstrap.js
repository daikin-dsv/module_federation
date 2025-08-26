import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useNavigate } from 'react-router';

import { getCurrentUser, onAuthChange, offAuthChange } from 'Layout/auth';

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

const AuthProvider = React.lazy(() =>
    import('Layout/auth').then(() => ({
        default: (props) => <auth-provider {...props}></auth-provider>
    }))
);

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
            name: appRoutesText[lang].alertsSettings,
            path: '/alertssettings',
            breadcrumb: appRoutesText[lang].alertsSettings
        }
    });
}

// bootstrap.js
function AppWithAuth() {
    const [authReady, setAuthReady] = React.useState(false);

    React.useEffect(() => {
        // If the provider has already initialized, grab the snapshot synchronously
        const initial = getCurrentUser();
        if (initial) {
            setAuthReady(true);
        }

        const onAuthChanged = () => {
            setAuthReady(true);
        };

        onAuthChange(onAuthChanged);
        return () => offAuthChange(onAuthChanged);
    }, []);

    return (
        <AuthProvider>
            {authReady ? (
                <BrowserRouter>
                    <AppContainer />
                </BrowserRouter>
            ) : null}
        </AuthProvider>
    );
}

function AppContainer() {
    const navigate = useNavigate();
    const { locale } = getCurrentUser();
    const NAVIGATION_CONFIG = getNavConfig(locale);

    return (
        <ErrorBoundary fallback={<div>{bootstrapText[locale].error}</div>}>
            <div className="flex h-screen flex-col">
                <Suspense fallback={headerText[locale].loadingHeader}>
                    <Header>
                        <UserProfile text={userText[locale]} />
                        <ActiveNavLink slot="route" to={NAVIGATION_CONFIG.ALERTS.path}>
                            {NAVIGATION_CONFIG.ALERTS.name}
                        </ActiveNavLink>
                        <NavMenu slot="route" parentNav={appRoutesText[locale].settings}>
                            <ActiveNavLink
                                // Need this click handler because the <NavLink>
                                // somehow doesn't work with NavMenu
                                onClick={() => {
                                    navigate('/alertssettings');
                                }}
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
                        text={appRoutesText[locale]}
                        NAVIGATION_CONFIG={NAVIGATION_CONFIG}
                    />
                </main>
                <Suspense fallback={footerText[locale].loadingFooter}>
                    <Footer copyright={footerText[locale].copyright} />
                </Suspense>
            </div>
        </ErrorBoundary>
    );
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<AppWithAuth />);
