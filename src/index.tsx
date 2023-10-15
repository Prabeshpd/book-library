import * as React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

import './stylesheets/application.scss';

import App from './App';
import { FirebaseProvider } from './context/firebase';
import { store } from './reducers/store';
import { ToastContainerWrapper } from './ToastContainer';

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <div id="app">
      <ToastContainerWrapper />
      <FirebaseProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </FirebaseProvider>
    </div>
  </Provider>,
);
