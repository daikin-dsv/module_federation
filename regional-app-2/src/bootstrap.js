import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import AppRoutes, { NAVIGATION_CONFIG, FOOTER_CONFIG } from './AppRoutes';
import ErrorBoundary from './ErrorBoundary';
import ActiveNavLink from './components/ActiveNavLink';
import './index.css';
import { bootstrapText, headerText, userText } from './text.json';
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

const Footer = React.lazy(() =>
    import('Layout/footer').then(() => ({
        default: (props) => <app-footer {...props}></app-footer>
    }))
);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <AuthProvider>
        <BrowserRouter basename={process.env.APP_PATH}>
            <ErrorBoundary fallback={<div>{bootstrapText.error}</div>}>
                <div className="flex h-screen flex-col">
                    <Suspense fallback={bootstrapText.loadingHeader}>
                        <Header text={headerText}>
                            <UserProfile text={userText} />
                            <ActiveNavLink slot="route" to={NAVIGATION_CONFIG.HOME.path}>
                                {NAVIGATION_CONFIG.HOME.name}
                            </ActiveNavLink>
                            <ActiveNavLink slot="route" to={NAVIGATION_CONFIG.NAV2.path}>
                                {NAVIGATION_CONFIG.NAV2.name}
                            </ActiveNavLink>
                            <ActiveNavLink slot="route" to={NAVIGATION_CONFIG.NAV3.path}>
                                {NAVIGATION_CONFIG.NAV3.name}
                            </ActiveNavLink>
                        </Header>
                    </Suspense>
                    <main className="flex flex-grow flex-col overflow-x-scroll p-4">
                        <AppRoutes />
                    </main>
                    <Suspense fallback={bootstrapText.loadingFooter}>
                        <Footer copyright={bootstrapText.copyright}>
                            {Object.values(FOOTER_CONFIG).map((item) => (
                                <ActiveNavLink
                                    key={item.path}
                                    slot="footer-items"
                                    className="text-nowrap"
                                    to={item.path}
                                >
                                    {item.name}
                                </ActiveNavLink>
                            ))}
                        </Footer>
                    </Suspense>
                </div>
            </ErrorBoundary>
        </BrowserRouter>
    </AuthProvider>
);
