// @flow
import { map } from 'lodash';
import createHistory from 'history/createBrowserHistory';
import queryString from 'query-string';

import { blockChainPaths, blockChainDetailPaths, tokenPaths, tokenDetailPaths, miscPaths } from '../components/Layout';

const blockChainPath = map([...blockChainPaths, ...blockChainDetailPaths], 'route');
const tokenPath = map([...tokenPaths, ...tokenDetailPaths], 'route');
const miscPath = map(miscPaths, 'route');

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
    async updateNavTab() {
      // set nav tab heightlight
      const mainPath = window.location.pathname.split('/')?.[1];
      if (blockChainPath.includes(mainPath)) {
        this.changeNavTab('blockChain');
      } else if (tokenPath.includes(mainPath)) {
        this.changeNavTab('tokens');
      } else if (miscPath.includes(mainPath)) {
        this.changeNavTab('misc');
      } else {
        this.changeNavTab(mainPath || 'home');
      }
    },
    async updateURI(queryOverride?: Object) {
      // set URI query string
      const {
        store: { getState },
      } = await import('./');
      const state = getState();
      if (window.location.pathname === '/blocks/') {
        const query = queryString.stringify({
          ...queryString.parse(window.location.search),
          page: state.block.pagination.current,
        });
        history.push(`/blocks/?${query}`, { isAction: true });
      } else if (window.location.pathname === '/transactions/') {
        const query = queryString.stringify({
          ...queryString.parse(window.location.search),
          page: state.transaction.pagination.current,
        });
        history.push(`/transactions/?${query}`, { isAction: true });
      } else if (window.location.pathname === '/accounts/') {
        const query = queryString.stringify({
          ...queryString.parse(window.location.search),
          page: state.account.pagination.current,
        });
        history.push(`/accounts/?${query}`, { isAction: true });
      } else if (window.location.pathname === '/messages/') {
        const query = queryString.stringify({
          ...queryString.parse(window.location.search),
          page: state.message.pagination.current,
        });
        history.push(`/messages/?${query}`, { isAction: true });
      } else if (window.location.pathname === '/producers/') {
        const query = queryString.stringify({
          ...queryString.parse(window.location.search),
          ...queryOverride,
        });
        history.push(`/producers/?${query}`, { isAction: true });
      }
    },
  },
});

history.location.state = {};
async function followURI(location) {
  const {
    store: { dispatch },
  } = await import('./');
  // 如果不是从 store 发出的 push 导致的路由变动，或者相应的 store 里没有数据
  if (location?.state?.isAction !== true) {
    const { page: pageString } = queryString.parse(location.search);
    // 暂时不让用户通过 querystring 直接跳到很后面，以免加重后端负担，而且业务上一般也没需求
    const page =
      Number.isInteger(Number(pageString)) && Number(pageString) >= 1 && Number(pageString) <= 10
        ? Number(pageString)
        : 1;
    if (location.pathname === '/blocks/') {
      await dispatch.block.getBlocksList(page);
    } else if (location.pathname === '/transactions/') {
      await dispatch.transaction.getTransactionsList(page);
    } else if (location.pathname === '/accounts/') {
      await dispatch.account.getAccountsList(page);
    } else if (location.pathname === '/messages/') {
      await dispatch.message.getMessagesList(page);
    }
  }
}
history.listen(async location => {
  await followURI(location);

  const {
    store: { dispatch },
  } = await import('./');
  dispatch.history.updateNavTab();
});
followURI(history.location);
