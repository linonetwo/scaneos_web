import immerPlugin from '@rematch/immer';
import { init } from '@rematch/core';
import { createBrowserHistory, createMemoryHistory } from 'history';

import searchModel from './search';
import infoModel from './info';
import blockModel from './block';
import transactionModel from './transaction';
import accountModel from './account';
import messageModel from './message';
import aggregationModel from './aggregation';
import historyModel from './history';
import { isServer, getInitialStateFromServer } from './utils';
import priceModel from './price';

const immer = immerPlugin();
const configureStore = (initialState = {}) => {
  const initialStateFromServer = getInitialStateFromServer();

  const {
    searchInitialState,
    infoInitialState,
    blockInitialState,
    historyInitialState,
    url = '/',
    transactionInitialState,
    accountInitialState,
    messageInitialState,
    aggregationInitialState,
    priceInitialState,
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
        transaction: transactionModel(transactionInitialState),
        account: accountModel(accountInitialState),
        message: messageModel(messageInitialState),
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
