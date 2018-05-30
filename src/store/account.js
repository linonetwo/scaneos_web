// @flow
import camelize from 'camelize';
import type { Timestamp, Id } from './block';

export type AccountData =  {
  Id: Id,
  name: string,
  eosBalance: string,
  stakedBalance: string,
  unstakingBalance: string,
  createdAt: Timestamp,
  updatedAt: Timestamp,
};

export type Store = {
  loading: boolean,
  data: AccountData[],
  pagination: { currentTotal: number, loadable: boolean, pageCountToLoad: number },
  currentPage: number,
};

const defaultState = {
  loading: false,
  data: [],
  pagination: { currentTotal: 0, loadable: false, pageCountToLoad: 10 },
  currentPage: 0,
};
export default (initialState?: Object = {}) => ({
  state: {
    ...defaultState,
    ...initialState,
  },
  reducers: {
    initAccountData(state: Store, data: AccountData[]) {
      state.data = data;
      return state;
    },
    setPage(state: Store, newPage: number) {
      state.currentPage = newPage;
      return state;
    },
    clearState(state: Store) {
      state = defaultState;
      return state;
    },
    appendResult(state: Store, data: AccountData[]) {
      state.data = [...state.data, ...data];
      return state;
    },
    increaseOffset(state: Store, newOffset: number, loadable: boolean) {
      state.pagination.currentTotal += newOffset;
      state.pagination.loadable = loadable;
      return state;
    },
  },
  effects: {
    async getAccountData(page: number = 0, gotoPage?: number) {
      const {
        store: { dispatch, account },
      } = await import('./');
      dispatch.info.toggleLoading();

      try {
        const data = await fetch(`http://api.eostracker.io/accounts?page=${page}`)
          .then(res => res.json())
          .then(camelize);

        // if (!gotoPage) {
        //   this.clearState();
        //   this.setPage(0);
        // }

        // const { getPageSize } = await import('./utils');
        // const pageSize = getPageSize();
        // const body = JSON.stringify({
        //   offset: gotoPage ? block.pagination.currentTotal : 0,
        //   limit: pageSize * block.pagination.pageCountToLoad + 1,
        // });

        // let results: AccountData[] = await fetch(`${API}/blocks`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body,
        // })
        //   .then(res => res.json())
        //   .then(camelize);

        // const loadable = results.length === pageSize * block.pagination.pageCountToLoad + 1;

        // if (loadable) {
        //   results = initial(results);
        // }
        // if (gotoPage) {
        //   dispatch.block.appendResult(results);
        //   dispatch.block.appendTrees(results);
        //   dispatch.block.appendTags(results);
        // } else {
        //   dispatch.block.initResult(results);
        //   dispatch.block.initTrees(results);
        //   dispatch.block.initTags(results);
        // }
        // this.increaseOffset(results.length, loadable);

        this.initAccountData(data);
      } catch (error) {
        console.error(error);
        const errorString = error.toString();
        let notificationString = errorString;
        if (errorString.match(/^SyntaxError: Unexpected token/)) {
          notificationString = 'Connection lost, maybe due to some Network error.';
        } else if (errorString.match(/^TypeError/)) {
          notificationString = 'Failed to fetch data from server.';
        }
        dispatch.info.displayNotification(notificationString);
      } finally {
        dispatch.info.toggleLoading();
      }
    },
  },
});
