import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import Newtab from './Newtab';

const container =
  window.document.querySelector('#app-container') || window.document.body;
const root = createRoot(container);
root.render(<Newtab />);

if (import.meta.webpackHot) import.meta.webpackHot.accept();
