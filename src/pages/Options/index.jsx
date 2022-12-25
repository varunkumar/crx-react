import React from 'react';
import { render } from 'react-dom';

import './index.css';
import Options from './Options';

render(
  <Options title={'Settings'} />,
  window.document.querySelector('#app-container')
);

if (import.meta. webpackHot) import.meta.webpackHot.accept();
