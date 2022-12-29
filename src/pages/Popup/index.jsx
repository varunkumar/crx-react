import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import Popup from './Popup';

const container =
  window.document.querySelector('#app-container') || window.document.body;
const root = createRoot(container);
root.render(<Popup />);

if (import.meta.webpackHot) import.meta.webpackHot.accept();
