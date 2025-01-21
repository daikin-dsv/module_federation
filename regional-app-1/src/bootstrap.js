import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';

const Auth = React.lazy(() => import('Layout/auth'));
const Header = React.lazy(() => import('Layout/header'));
const Footer = React.lazy(() => import('Layout/footer'));
const Widget1 = React.lazy(() => import('Widget/widget1'));

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <Auth>
        <Suspense fallback="Loading Header">
            <Header />
        </Suspense>
        <div>Regional App Contents</div>
        <Suspense fallback={<div>Loading Widget 1</div>}>
            <Widget1 />
        </Suspense>
        <Suspense fallback="Loading Footer">
            <Footer />
        </Suspense>
    </Auth>
);
