import React from 'react';
import { createRoot } from 'react-dom/client';

import Footer from './components/Footer';
import Header from './components/Header';
import Auth from './components/Auth';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <Auth>
        <Header />
        <Footer />
    </Auth>
);
