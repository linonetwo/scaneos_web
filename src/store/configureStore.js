import immerPlugin from '@rematch/immer';
import { init } from '@rematch/core';
import { createBrowserHistory, createMemoryHistory } from 'history';

import infoModel from './info';
import historyModel from './history';
import { isServer, getInitialStateFromServer } from './utils';

const immer = immerPlugin();
const configureStore = (initialState = {}) => {
  const initialStateFromServer = getInitialStateFromServer();

  const {
    info: infoInitialState,
    url = '/',
    history: historyInitialState,
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
        info: infoModel(infoInitialState),
        history: historyModel(historyInitialState),
      },
      plugins: [immer],
    }),
    history,
  };
};

export default configureStore;
