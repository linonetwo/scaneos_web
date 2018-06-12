import React from 'react';
import ReactDOM from 'react-dom';
import { Frontload } from 'react-frontload';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import { store, history } from './store';
import i18n from './i18n';

import App from './App';

import registerServiceWorker from './registerServiceWorker';
import './globalStyle';

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <Router history={history}>
        <Frontload noServerRender>
          <App />
        </Frontload>
      </Router>
    </Provider>
  </I18nextProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
