import React from 'react';
import { render } from 'react-dom';

import './index.css';
import Popup from './Popup';

render(<Popup />, window.document.querySelector('#app-container'));

if (import.meta. webpackHot) import.meta.webpackHot.accept();
