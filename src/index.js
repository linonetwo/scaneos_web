/* eslint-env browser */
import React from 'react';
import { hydrate, render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import Loadable from 'react-loadable';

import { store, history } from './store';
import client from './graphql';
import i18n from './i18n';

import AppRoutes from './Routes';

import { unregister } from './registerServiceWorker';

const Application = (
  <ApolloProvider client={client}>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Router history={history}>
          <AppRoutes />
        </Router>
      </Provider>
    </I18nextProvider>
  </ApolloProvider>
);

const root = document.getElementById('root');
if (root.hasChildNodes()) {
  Loadable.preloadReady().then(() => {
    hydrate(Application, root);
  });
} else {
  render(Application, root);
}
unregister();
