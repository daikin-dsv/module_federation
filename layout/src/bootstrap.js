import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router";

import './index.css';

import Footer from './components/Footer';
import Header from './components/Header';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <BrowserRouter>
        <Header />
        <Footer />
    </BrowserRouter>
);
