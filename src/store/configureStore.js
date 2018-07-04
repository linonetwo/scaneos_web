import immerPlugin from '@rematch/immer';
import { init } from '@rematch/core';
import { createBrowserHistory, createMemoryHistory } from 'history';

import searchModel from './search';
import infoModel from './info';
import tokenModel from './token';
import aggregationModel from './aggregation';
import historyModel from './history';
import { isServer, getInitialStateFromServer } from './utils';
import priceModel from './price';
import toolsModel from './tools';

const immer = immerPlugin();
const configureStore = (initialState = {}) => {
  const initialStateFromServer = getInitialStateFromServer();

  const {
    search: searchInitialState,
    info: infoInitialState,
    url = '/',
    token: tokenInitialState,
    aggregation: aggregationInitialState,
    history: historyInitialState,
    price: priceInitialState,
  } = { initialState, ...initialStateFromServer };

  const history = isServer
    ? createMemoryHistory({
        initialEntries: [url],
      })
    : createBrowserHistory();
  history.location.state = {};

  return {
    store: init({
      models: {
        search: searchModel(searchInitialState),
        info: infoModel(infoInitialState),
        token: tokenModel(tokenInitialState),
        aggregation: aggregationModel(aggregationInitialState),
        history: historyModel(historyInitialState),
        price: priceModel(priceInitialState),
        tools: toolsModel(),
      },
      plugins: [immer],
    }),
    history,
  };
};

export default configureStore;
