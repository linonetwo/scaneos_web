import immerPlugin from '@rematch/immer';
import { init } from '@rematch/core';
import { createBrowserHistory, createMemoryHistory } from 'history';

import searchModel from './search';
import infoModel from './info';
import blockModel from './block';
import accountModel from './account';
import actionModel from './action';
import tokenModel from './token';
import aggregationModel from './aggregation';
import historyModel from './history';
import { isServer, getInitialStateFromServer } from './utils';
import priceModel from './price';

const immer = immerPlugin();
const configureStore = (initialState = {}) => {
  const initialStateFromServer = getInitialStateFromServer();

  const {
    search: searchInitialState,
    info: infoInitialState,
    block: blockInitialState,
    account: accountInitialState,
    url = '/',
    action: actionInitialState,
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
        block: blockModel(blockInitialState),
        account: accountModel(accountInitialState),
        action: actionModel(actionInitialState),
        token: tokenModel(tokenInitialState),
        aggregation: aggregationModel(aggregationInitialState),
        history: historyModel(historyInitialState),
        price: priceModel(priceInitialState),
      },
      plugins: [immer],
    }),
    history,
  };
};

export default configureStore;
