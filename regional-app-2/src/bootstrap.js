import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import AppRoutes, { NAVIGATION_CONFIG, FOOTER_CONFIG } from './AppRoutes';
import ErrorBoundary from './ErrorBoundary';
import './index.css';
import './webcomponents';
import { bootstrapText } from './text.json';

const Auth = React.lazy(() => import('Layout/auth'));
const Header = React.lazy(() => import('Layout/header'));
const Footer = React.lazy(() => import('Layout/footer'));

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <Auth>
        <BrowserRouter>
            <ErrorBoundary fallback={<div>{bootstrapText.error}</div>}>
                <div className="flex h-screen flex-col">
                    <Suspense fallback={bootstrapText.loadingHeader}>
                        <Header
                            navigationItems={Object.values(NAVIGATION_CONFIG)}
                            language="ja"
                        />
                    </Suspense>
                    <main className="flex flex-grow flex-col overflow-x-scroll p-4">
                        <AppRoutes />
                    </main>
                    <Suspense fallback={bootstrapText.loadingFooter}>
                        <Footer
                            copyright={bootstrapText.copyright}
                            footerItems={Object.values(FOOTER_CONFIG)}
                        />
                    </Suspense>
                </div>
            </ErrorBoundary>
        </BrowserRouter>
    </Auth>
);
