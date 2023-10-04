import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './stylesheets/application.scss';

import App from './App';

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
  <div id="app">
    <App />
  </div>,
);
