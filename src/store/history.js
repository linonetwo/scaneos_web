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
      const mainPath = window.location.pathname.split('/')?.[1]
      console.log(mainPath)
      if (blockChainPaths.includes(mainPath)) {
        state.navTab = 'blockChain';
        return state;
      }
      if (tokenPaths.includes(mainPath)) {
        state.navTab = 'tokens';
        return state;
      }
      state.navTab = mainPath || 'home';
    },
  },
  effects: {},
});
