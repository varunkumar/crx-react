import React from 'react';
import { render } from 'react-dom';

import './index.css';
import Panel from './Panel';

render(<Panel />, window.document.querySelector('#app-container'));

if (import.meta. webpackHot) import.meta.webpackHot.accept();
