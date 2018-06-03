// @flow
import { initial } from 'lodash';
import type { Timestamp, Id, Pagination } from './block';
import get from '../API.config';

export type AccountData = {
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
  data: AccountData,
  list: AccountData[],
  pagination: Pagination,
  currentPage: number,
};

export const emptyAccountData = {
  Id: { $id: '' },
  name: '',
  eosBalance: '',
  stakedBalance: '',
  unstakingBalance: '',
  createdAt: { sec: 0, usec: 0 },
  updatedAt: { sec: 0, usec: 0 },
};
const defaultState = {
  loading: false,
  list: [],
  data: emptyAccountData,
  pagination: { currentTotal: 0, loadable: false, pageCountToLoad: 10 },
  currentPage: 0,
};
export default (initialState?: Object = {}) => ({
  state: {
    ...defaultState,
    ...initialState,
  },
  reducers: {
    toggleLoading(state: Store) {
      state.loading = !state.loading;
      return state;
    },
    initAccountsList(state: Store, list: AccountData[]) {
      state.list = list;
      return state;
    },
    appendAccountsList(state: Store, list: AccountData[]) {
      state.list = [...state.list, ...list];
      return state;
    },
    initAccountData(state: Store, data: AccountData) {
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
    increaseOffset(state: Store, newOffset: number, loadable: boolean) {
      state.pagination.currentTotal += newOffset;
      state.pagination.loadable = loadable;
      return state;
    },
  },
  effects: {
    async getAccountData(accountName: string) {
      const {
        store: { dispatch },
      } = await import('./');
      dispatch.info.toggleLoading();
      dispatch.account.toggleLoading();
      dispatch.history.updateURI();

      try {
        const data = await get(`/accounts?name=${accountName}`);

        this.initAccountData(data[0]);
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
        dispatch.account.toggleLoading();
        dispatch.info.toggleLoading();
      }
    },
    async getAccountsList(gotoPage?: number) {
      const {
        store: { dispatch, getState },
      } = await import('./');
      const { account } = await getState();
      dispatch.account.toggleLoading();
      dispatch.info.toggleLoading();

      try {
        if (!gotoPage) {
          this.clearState();
          this.setPage(0);
        }

        const { getPageSize } = await import('./utils');
        const pageSize = getPageSize();
        const offset = gotoPage ? account.pagination.currentTotal : 0;
        const limit = pageSize * account.pagination.pageCountToLoad + 1;

        let list: AccountData[] = await get(`/accounts?page=${offset}&size=${limit}`);

        const loadable = list.length === pageSize * account.pagination.pageCountToLoad + 1;

        if (loadable) {
          list = initial(list);
        }
        if (gotoPage) {
          this.appendAccountsList(list);
        } else {
          this.initAccountsList(list);
        }
        this.increaseOffset(list.length, loadable);
      } catch (error) {
        console.error(error);
        const errorString = error.toString();
        let notificationString = errorString;
        if (errorString.match(/^SyntaxError: Unexpected token/)) {
          notificationString = 'Connection lost, maybe due to some Network error.';
        } else if (errorString.match(/^TypeError/)) {
          notificationString = 'Failed to fetch list from server.';
        }
        dispatch.info.displayNotification(notificationString);
      } finally {
        dispatch.info.toggleLoading();
        dispatch.account.toggleLoading();
      }
    },
  },
});
