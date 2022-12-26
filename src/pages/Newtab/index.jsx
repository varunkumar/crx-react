import React from 'react';
import { render } from 'react-dom';

import './index.css';
import Newtab from './Newtab';

render(<Newtab />, window.document.querySelector('#app-container'));

if (import.meta.webpackHot) import.meta.webpackHot.accept();
