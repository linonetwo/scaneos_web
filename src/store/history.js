// @flow
import createHistory from 'history/createBrowserHistory';
import queryString from 'query-string';

import { blockChainPaths, tokenPaths } from '../components/Layout';

export const history = createHistory();

type Store = {
  navTab: string,
};
export default (initialState: Object = {}) => ({
  state: {
    navTab: 'home',
    ...initialState,
  },
  reducers: {
    changeNavTab(state: Store, nextNavTab: string) {
      state.navTab = nextNavTab;
      return state;
    },
    updateURI(state: Store) {
      if (blockChainPaths.includes(window.location.pathname)) {
        state.navTab = 'blockChain';
        return state;
      }
      if (tokenPaths.includes(window.location.pathname)) {
        state.navTab = 'tokens';
        return state;
      }
      state.navTab = window.location.pathname.split('/')[1] || 'home';
    },
  },
  effects: {},
});
