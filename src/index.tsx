import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './stylesheets/application.scss';

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
  <div id="app" className="home-page">
    Welcome to Application
  </div>,
);
