import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import Options from './Options';

const container: Element =
  window.document.querySelector('#app-container') || window.document.body;
const root = createRoot(container);
root.render(<Options title={'Settings'} />);

if (import.meta.webpackHot) import.meta.webpackHot.accept();
