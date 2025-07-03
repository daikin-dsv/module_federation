import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import AppRoutes from './AppRoutes';
import ErrorBoundary from './ErrorBoundary';
import ActiveNavLink from './components/ActiveNavLink';
import './index.css';
import { appRoutesText, bootstrapText, footerText, headerText, userText } from './text.json';
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

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const SETTINGS_CONFIG = Object.freeze({
    language: true
});


const languageOptions = [
    { value: 'en', label: userText['en'].english },
    { value: 'ja', label: userText['ja'].japanese }
];

function getNavConfig(lang) {
    return Object.freeze({
        ALERTS: { name: appRoutesText[lang].alerts, path: '/' }
    });
}

let currentLanguage = 'en';

function renderApp(lang) {
    currentLanguage = lang;
    const NAVIGATION_CONFIG = getNavConfig(lang);
    console.log('Rendering app with language:', currentLanguage);

    root.render(
        <AuthProvider>
            <BrowserRouter>
                <ErrorBoundary fallback={<div>{bootstrapText[lang].error}</div>}>
                    <div className="flex h-screen flex-col">
                        <Suspense fallback={headerText[lang].loadingHeader}>
                            <Header>
                                <UserProfile text={userText[lang]} settings={SETTINGS_CONFIG} language={{current: lang, options: languageOptions}} />
                                <ActiveNavLink slot="route" to={NAVIGATION_CONFIG.ALERTS.path}>
                                    {NAVIGATION_CONFIG.ALERTS.name}
                                </ActiveNavLink>
                            </Header>
                        </Suspense>
                        <main className="flex flex-grow flex-col overflow-x-scroll p-4">
                            <AppRoutes text={appRoutesText[lang]} NAVIGATION_CONFIG={NAVIGATION_CONFIG} />
                        </main>
                        <Suspense fallback={footerText[lang].loadingFooter}>
                            <Footer copyright={footerText[lang].copyright} />
                        </Suspense>
                    </div>
                </ErrorBoundary>
            </BrowserRouter>
        </AuthProvider>
    );
}

// Listen for language change events from the user-profile web component
window.addEventListener('user-profile-language-changed', (e) => {
    if (e.detail && e.detail.language) {
        renderApp(e.detail.language);
    }
});

renderApp(currentLanguage);
