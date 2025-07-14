import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import AppRoutes, { NAVIGATION_CONFIG } from './AppRoutes';
import ErrorBoundary from './ErrorBoundary';
import ActiveNavLink from './components/ActiveNavLink';
import './index.css';
import { bootstrapText, appRoutesText } from './text.json';
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
const MoreNav = React.lazy(() =>
    import('Layout/morenav').then(() => ({
        default: (props) => <more-nav {...props}></more-nav>
    }))
);
const Footer = React.lazy(() =>
    import('Layout/footer').then(() => ({
        default: (props) => <app-footer {...props}></app-footer>
    }))
);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <AuthProvider>
        <BrowserRouter>
            <ErrorBoundary fallback={<div>{bootstrapText.error}</div>}>
                <div className="flex h-screen flex-col">
                    <Suspense fallback={bootstrapText.loadingHeader}>
                        <Header>
                            <UserProfile />
                            <ActiveNavLink slot="route" to={NAVIGATION_CONFIG.ALERTS.path}>
                                {NAVIGATION_CONFIG.ALERTS.name}
                            </ActiveNavLink>
                            <MoreNav slot="route" parentNav={appRoutesText.settings}>
                                <ActiveNavLink slot="child-nav" to={NAVIGATION_CONFIG.ALERTSSETTINGS.path}>
                                    {NAVIGATION_CONFIG.ALERTSSETTINGS.name}
                                </ActiveNavLink>
                            </MoreNav>
                        </Header>
                    </Suspense>
                    <main className="flex flex-grow flex-col overflow-x-scroll p-4">
                        <AppRoutes />
                    </main>
                    <Suspense fallback={bootstrapText.loadingFooter}>
                        <Footer copyright={bootstrapText.copyright} />
                    </Suspense>
                </div>
            </ErrorBoundary>
        </BrowserRouter>
    </AuthProvider>
);
