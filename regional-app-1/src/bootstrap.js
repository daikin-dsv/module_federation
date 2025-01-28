import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import AppRoutes, { NAVIGATION_CONFIG } from './AppRoutes';
import ErrorBoundary from './ErrorBoundary';
import './index.css';
import './webcomponents';

const Auth = React.lazy(() => import('Layout/auth'));
const Header = React.lazy(() => import('Layout/header'));
const Footer = React.lazy(() => import('Layout/footer'));

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <Auth>
        <BrowserRouter>
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
                <div className="flex flex-col h-screen">
                    <Suspense fallback="Loading Header">
                        <Header navigationItems={Object.values(NAVIGATION_CONFIG)} />
                    </Suspense>
                    <main className="p-4 flex-grow">
                        <div>
                            <AppRoutes />
                        </div>
                    </main>
                    <Suspense fallback="Loading Footer">
                        <Footer />
                    </Suspense>
                </div>
            </ErrorBoundary>
        </BrowserRouter>
    </Auth>
);
