import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import Panel from './Panel';

const container =
  window.document.querySelector('#app-container') || window.document.body;
const root = createRoot(container);
root.render(<Panel />);

if (import.meta.webpackHot) import.meta.webpackHot.accept();
