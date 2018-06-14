/* eslint-env browser */
import React from 'react';
import { hydrate, render } from 'react-dom';
import { Frontload } from 'react-frontload';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import Loadable from 'react-loadable';

import { store, history } from './store';
import i18n from './i18n';

import AppRoutes from './App';

// import registerServiceWorker from './registerServiceWorker';

const Application = (
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <Router history={history}>
        <Frontload noServerRender>
          <AppRoutes />
        </Frontload>
      </Router>
    </Provider>
  </I18nextProvider>
);

const root = document.getElementById('root');
if (root.hasChildNodes()) {
  Loadable.preloadReady().then(() => {
    hydrate(Application, root);
  });
} else {
  render(Application, root);
}
// registerServiceWorker();
