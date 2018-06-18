// @flow
import { map } from 'lodash';
import queryString from 'query-string';

import { blockChainPaths, blockChainDetailPaths, tokenPaths, tokenDetailPaths, miscPaths } from '../components/Layout';

// 不同导航 Tab 的路径名
const blockChainPath = map([...blockChainPaths, ...blockChainDetailPaths], 'route');
const tokenPath = map([...tokenPaths, ...tokenDetailPaths], 'route');
const miscPath = map(miscPaths, 'route');

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
    /** set nav tab heightlight */
    async updateNavTab() {
      const { history } = await import('./');
      const mainPath = history.location.pathname.split('/')?.[1];
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
    /** set URI query string */
    async updateURI(queryOverride?: Object) {
      const {
        store: { getState },
        history,
      } = await import('./');
      const state = getState();
      if (history.location.pathname === '/blocks/') {
        const query = queryString.stringify({
          ...queryString.parse(history.location.search),
          page: state.block.pagination.current,
        });
        history.replace(`/blocks/?${query}`, { isAction: true });
      } else if (history.location.pathname === '/transactions/') {
        const query = queryString.stringify({
          ...queryString.parse(history.location.search),
          page: state.transaction.pagination.current,
        });
        history.replace(`/transactions/?${query}`, { isAction: true });
      } else if (history.location.pathname === '/accounts/') {
        const query = queryString.stringify({
          ...queryString.parse(history.location.search),
          page: state.account.pagination.current,
        });
        history.replace(`/accounts/?${query}`, { isAction: true });
      } else if (history.location.pathname === '/messages/') {
        const query = queryString.stringify({
          ...queryString.parse(history.location.search),
          page: state.message.pagination.current,
        });
        history.replace(`/messages/?${query}`, { isAction: true });
      } else if (history.location.pathname === '/producers/') {
        const query = queryString.stringify({
          ...queryString.parse(history.location.search),
          ...queryOverride,
        });
        history.replace(`/producers/?${query}`, { isAction: true });
      }
    },
  },
});

export async function followURI(location: { pathname: string, search?: string, state: any }) {
  const {
    store: { dispatch, getState },
  } = await import('./');
  // 如果不是从 store 发出的 push 导致的路由变动，而是用户刷新浏览器，我们才加载数据
  if (location?.state?.isAction !== true) {
    const { page: pageString } = queryString.parse(location.search);
    const page = Number.isInteger(Number(pageString)) && Number(pageString) >= 1 ? Number(pageString) : 1;
    const state = await getState();
    // 只有相应的 store 里没有数据，或者是翻页了(应该没有这种情况)，才加载数据
    if (
      location.pathname === '/blocks/' &&
      (state.block.list.length === 0 || state.block.pagination.current + 1 !== page)
    ) {
      return dispatch.block.getBlocksList(page);
    }
    if (
      location.pathname === '/transactions/' &&
      (state.transaction.list.length === 0 || state.transaction.pagination.current + 1 !== page)
    ) {
      return dispatch.transaction.getTransactionsList(page);
    }
    if (
      location.pathname === '/accounts/' &&
      (state.account.list.length === 0 || state.account.pagination.current + 1 !== page)
    ) {
      return dispatch.account.getAccountsList(page);
    }
    if (
      location.pathname === '/messages/' &&
      (state.message.list.length === 0 || state.message.pagination.current + 1 !== page)
    ) {
      return dispatch.message.getMessagesList(page);
    }

    if (/\/block\//g.test(location.pathname)) {
      return dispatch.block.getBlockData(location.pathname.split('/block/').pop().replace('/', ''))
    }
    if (/\/transaction\//g.test(location.pathname)) {
      return dispatch.transaction.getTransactionData(location.pathname.split('/transaction/').pop().replace('/', ''))
    }
    if (/\/account\//g.test(location.pathname)) {
      return dispatch.account.getAccountData(location.pathname.split('/account/').pop().replace('/', ''))
    }
    if (/\/message\//g.test(location.pathname)) {
      return dispatch.message.getMessageData(location.pathname.split('/message/').pop().replace('/', ''))
    }
  }
}
