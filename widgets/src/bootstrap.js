import React from 'react';
import { createRoot } from 'react-dom/client';

import Widget1 from './components/Widget1';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<Widget1 />);
