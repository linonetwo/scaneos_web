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
  },
  effects: {
    async updateURI() {
      // set nav tab heightlight
      const mainPath = window.location.pathname.split('/')?.[1];
      if (blockChainPath.includes(mainPath)) {
        this.changeNavTab('blockChain');
      } else if (tokenPath.includes(mainPath)) {
        this.changeNavTab('tokens');
      } else {
        this.changeNavTab(mainPath || 'home');
      }

      // set URI query string
      const {
        store: { getState },
      } = await import('./');
      const state = getState();
      if (window.location.pathname === '/blocks/') {
        const query = queryString.stringify({
          ...queryString.parse(window.location.search),
          page: state.block.currentPage,
        });
        history.push(`/blocks/?${query}`);
      } else if (window.location.pathname === '/transactions/') {
        const query = queryString.stringify({
          ...queryString.parse(window.location.search),
          page: state.transaction.currentPage,
        });
        history.push(`/transactions/?${query}`);
      } else if (window.location.pathname === '/accounts/') {
        const query = queryString.stringify({
          ...queryString.parse(window.location.search),
          page: state.account.currentPage,
        });
        history.push(`/accounts/?${query}`);
      } else if (window.location.pathname === '/messages/') {
        const query = queryString.stringify({
          ...queryString.parse(window.location.search),
          page: state.message.currentPage,
        });
        history.push(`/messages/?${query}`);
      }
    },
  },
});

history.location.state = {};
async function followURI(location) {
  const {
    store: { dispatch },
  } = await import('./');
  // 如果不是从 store 发出的 push 导致的路由变动
  if (location.state && location.state.isAction !== true) {
    const { page: pageString } = queryString.parse(location.search);
    const page = Number.isInteger(Number(pageString)) && Number(pageString) >= 1 ? Number(pageString) : 1;
    if (location.pathname === '/blocks/') {
      dispatch.block.getBlocksList(page);
    } else if (location.pathname === '/transactions/') {
      dispatch.transaction.getTransactionsList(page);
    } else if (location.pathname === '/accounts/') {
      dispatch.account.getAccountsList(page);
    } else if (location.pathname === '/messages/') {
      dispatch.message.getMessagesList(page);
    }
  }
}
history.listen(location => {
  followURI(location);
});
followURI(history.location);
