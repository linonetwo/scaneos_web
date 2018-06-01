// @flow
import { map } from 'lodash';
import createHistory from 'history/createBrowserHistory';
import queryString from 'query-string';

import { blockChainPaths, blockChainDetailPaths, tokenPaths, tokenDetailPaths } from '../components/Layout';

const blockChainPath = map([...blockChainPaths, ...blockChainDetailPaths], 'route');
const tokenPath = map([...tokenPaths, ...tokenDetailPaths], 'route');

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
      const mainPath = window.location.pathname.split('/')?.[1];
      if (blockChainPath.includes(mainPath)) {
        state.navTab = 'blockChain';
        return state;
      }
      if (tokenPath.includes(mainPath)) {
        state.navTab = 'tokens';
        return state;
      }
      state.navTab = mainPath || 'home';
    },
  },
  effects: {},
});
