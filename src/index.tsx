import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './stylesheets/application.scss';

import App from './App';
import { FirebaseProvider } from './context/firebase';

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
  <div id="app">
    <FirebaseProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </FirebaseProvider>
  </div>,
);
