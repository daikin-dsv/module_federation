import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppRoutes, { NAVIGATION_CONFIG, FOOTER_CONFIG } from './AppRoutes';
import ErrorBoundary from './ErrorBoundary';
import './index.css';
import './webcomponents';

const Auth = React.lazy(() => import('Layout/auth'));
const Header = React.lazy(() => import('Layout/header'));
const Footer = React.lazy(() => import('Layout/footer'));

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Create a client
const queryClient = new QueryClient();

root.render(
    <Auth>
        <BrowserRouter>
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
                <QueryClientProvider client={queryClient}>
                    <div className="flex h-screen flex-col">
                        <Suspense fallback="Loading Header">
                            <Header navigationItems={Object.values(NAVIGATION_CONFIG)} />
                        </Suspense>
                        <main className="flex flex-grow flex-col overflow-x-scroll p-4">
                            <AppRoutes />
                        </main>
                        <Suspense fallback="Loading Footer">
                            <Footer
                                copyright="2025 Daikin U.S. Corporation"
                                footerItems={Object.values(FOOTER_CONFIG)}
                            />
                        </Suspense>
                    </div>
                </QueryClientProvider>
            </ErrorBoundary>
        </BrowserRouter>
    </Auth>
);
