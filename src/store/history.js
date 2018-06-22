// @flow
import { map, size } from 'lodash';
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
        history.replace(`/blocks/?${query}`, { isFromEffect: true });
      } else if (history.location.pathname === '/transactions/') {
        const query = queryString.stringify({
          ...queryString.parse(history.location.search),
          page: state.transaction.pagination.current,
        });
        history.replace(`/transactions/?${query}`, { isFromEffect: true });
      } else if (history.location.pathname === '/accounts/') {
        const query = queryString.stringify({
          ...queryString.parse(history.location.search),
          page: state.account.pagination.current,
        });
        history.replace(`/accounts/?${query}`, { isFromEffect: true });
      } else if (history.location.pathname === '/actions/') {
        const query = queryString.stringify({
          ...queryString.parse(history.location.search),
          page: state.action.pagination.current,
        });
        history.replace(`/actions/?${query}`, { isFromEffect: true });
      } else if (history.location.pathname === '/producers/') {
        const query = queryString.stringify({
          ...queryString.parse(history.location.search),
          ...queryOverride,
        });
        history.replace(`/producers/?${query}`, { isFromEffect: true });
      }
    },
  },
});

export async function followURI(location: { pathname: string, search?: string, state: any }) {
  const {
    store: { dispatch, getState },
  } = await import('./');
  // 如果不是从 store 发出的 push 导致的路由变动，而是用户刷新浏览器，我们才加载数据
  if (location?.state?.isFromEffect !== true) {
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
      location.pathname === '/actions/' &&
      (state.action.listByTime.length === 0 || state.action.pagination.current + 1 !== page)
    ) {
      return dispatch.action.getActionsList(page);
    }

    if (/\/block\//g.test(location.pathname)) {
      const nextBlockNumOrId = location.pathname
        .split('/block/')
        .pop()
        .replace('/', '');
      if (nextBlockNumOrId !== state.block.data.blockId && Number(nextBlockNumOrId) !== state.block.data.blockNum) {
        return dispatch.block.getBlockData(nextBlockNumOrId);
      }
      return null;
    }
    if (/\/transaction\//g.test(location.pathname)) {
      const nextTransactionId = location.pathname
        .split('/transaction/')
        .pop()
        .replace('/', '');
      if (nextTransactionId !== state.transaction.data.transactionId)
        return dispatch.transaction.getTransactionData(nextTransactionId);
    }
    if (/\/account\//g.test(location.pathname)) {
      return dispatch.account.getAccountData(
        location.pathname
          .split('/account/')
          .pop()
          .replace('/', ''),
      );
    }
    if (/\/producer\//g.test(location.pathname) && !size(state.account.producerInfo) > 0) {
      return dispatch.account.getAccountData(
        location.pathname
          .split('/producer/')
          .pop()
          .replace('/', ''),
      );
    }
    if (/\/action\//g.test(location.pathname)) {
      return dispatch.action.getActionData(
        location.pathname
          .split('/action/')
          .pop()
          .replace('/', ''),
      );
    }
  }
}
