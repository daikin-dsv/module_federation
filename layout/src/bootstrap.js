import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import Footer from './components/Footer';
import Header from './components/Header';
import User from './components/User';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <BrowserRouter>
        <Header>
            <User />
        </Header>
        <Footer />
    </BrowserRouter>
);
