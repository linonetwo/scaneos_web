import createFetchProxy from 'react-cosmos-fetch-proxy';
import createReduxProxy from 'react-cosmos-redux-proxy';
import createRouterProxy from 'react-cosmos-router-proxy';

import './src/GlobalStyles';
import configureStore from './src/store/configureStore';

const ReduxProxy = createReduxProxy({
  createStore: initialState => configureStore(initialState).store,
});

export default [ReduxProxy, createRouterProxy(), createFetchProxy()];
