import React from 'react';
import { createRoot } from 'react-dom/client';

import Footer from './components/Footer';
import Header from './components/Header';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <>
        <Header />
        <Footer />
    </>
);
