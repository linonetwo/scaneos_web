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
      // set nav tab heightlight
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

      // set URI query string
    },
  },
  effects: {},
});

history.location.state = {};
async function followURI(location) {
  const { store: { dispatch } } = await import('./');
  // 如果不是从 store 发出的 push 导致的路由变动
  if (location.state && location.state.isAction !== true) {
    const { page } = queryString.parse(location.search);
    console.log(location, page);
    if (location.pathname === "/blocks/") {
      dispatch.block.getBlocksList(page);
    } else if (location.pathname === "/transactions/") {
      dispatch.transaction.getTransactionsList(page);
    } else if (location.pathname === "/accounts/") {
      dispatch.account.getAccountsList(page);
    } else if (location.pathname === "/messages/") {
      dispatch.message.getMessagesList(page);
    }
  }
}
history.listen(location => {
  followURI(location);
});
followURI(history.location);
