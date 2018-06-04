// @flow
import { initial } from 'lodash';
import get from '../API.config';
import type { Timestamp, Id, Pagination } from './block';

export type TransactionData = {
  Id: Id,
  transactionId: string,
  sequenceNum: number,
  blockId: string,
  refBlockNum: number,
  refBlockPrefix: string | number,
  scope?: string[],
  readScope?: any[],
  expiration: Timestamp,
  signatures?: string[],
  messages?: Id[],
  createdAt: Timestamp,
};

export type Store = {
  loading: boolean,
  data: TransactionData,
  list: TransactionData[],
  pagination: Pagination,
  currentPage: number,
};

export const emptyTransactionData = {
  Id: { $id: '' },
  transactionId: '',
  sequenceNum: 0,
  blockId: '',
  refBlockNum: 0,
  refBlockPrefix: '',
  scope: ['eos'],
  readScope: [],
  expiration: { sec: 0, usec: 0 },
  signatures: [''],
  messages: [{ $id: '' }],
  createdAt: { sec: 0, usec: 0 },
};
const defaultState = {
  loading: false,
  list: [],
  data: emptyTransactionData,
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
    initTransactionsList(state: Store, list: TransactionData[]) {
      state.list = list;
      return state;
    },
    appendTransactionsList(state: Store, list: TransactionData[]) {
      state.list = [...state.list, ...list];
      return state;
    },
    initTransactionData(state: Store, data: TransactionData) {
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
    async getTransactionData(transactionId: string) {
      const {
        store: { dispatch },
      } = await import('./');
      dispatch.info.toggleLoading();
      dispatch.transaction.toggleLoading();
      dispatch.history.updateURI();

      try {
        const data = await get(`/transactions?transaction_id=${transactionId}`);

        this.initTransactionData(data[0]);
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
        dispatch.transaction.toggleLoading();
      }
    },
    async getTransactionsList(gotoPage?: number) {
      const {
        store: { dispatch, getState },
      } = await import('./');
      const { transaction } = await getState();
      dispatch.info.toggleLoading();
      dispatch.transaction.toggleLoading();

      try {
        if (!gotoPage) {
          this.clearState();
          this.setPage(1);
        } else {
          this.setPage(gotoPage);
        }
        dispatch.history.updateURI();

        const { getPageSize } = await import('./utils');
        const pageSize = getPageSize();
        const offset = gotoPage
          ? transaction.pagination.currentTotal / (pageSize * transaction.pagination.pageCountToLoad)
          : 0;
        const limit = pageSize * transaction.pagination.pageCountToLoad + 1;

        let list: TransactionData[] = await get(`/transactions?page=${offset}&size=${limit}`);

        const loadable = list.length === pageSize * transaction.pagination.pageCountToLoad + 1;

        if (loadable) {
          list = initial(list);
        }
        if (gotoPage) {
          this.appendTransactionsList(list);
        } else {
          this.initTransactionsList(list);
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
        dispatch.transaction.toggleLoading();
      }
    },
  },
});
