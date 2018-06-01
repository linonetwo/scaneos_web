// @flow
import { initial } from 'lodash';
import camelize from 'camelize';
import type { Timestamp, Id, Pagination } from './block';

export type TransactionData = {
  Id: Id,
  transactionId: string,
  sequenceNum: number,
  blockId: string,
  refBlockNum: number,
  refBlockPrefix: string,
  scope: string[],
  readScope: any[],
  expiration: Timestamp,
  signatures: string[],
  messages: Id[],
  createdAt: Timestamp,
};

export type Store = {
  list: TransactionData[],
  pagination: Pagination,
  currentPage: number,
};

export const emptyTransactionData = {
  _id: { $id: '' },
  transaction_id: '',
  sequence_num: 0,
  block_id: '',
  ref_block_num: 0,
  ref_block_prefix: '',
  scope: ['eos'],
  read_scope: [],
  expiration: { sec: 0, usec: 0 },
  signatures: [''],
  messages: [{ $id: '' }],
  createdAt: { sec: 0, usec: 0 },
};
const defaultState = {
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
    async getTransactionData(transactionId: number) {
      const {
        store: { dispatch },
      } = await import('./');
      dispatch.info.toggleLoading();
      dispatch.history.updateURI();

      try {
        const data = await fetch(`http://api.eostracker.io/transactions?transaction_id=${transactionId}`)
          .then(res => res.json())
          .then(camelize);

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
      }
    },
    async getTransactionsList(gotoPage?: number) {
      const {
        store: { dispatch, getState },
      } = await import('./');
      const { transaction } = await getState();
      dispatch.info.toggleLoading();

      try {
        if (!gotoPage) {
          this.clearState();
          this.setPage(0);
        }

        const { getPageSize } = await import('./utils');
        const pageSize = getPageSize();
        const offset = gotoPage ? transaction.pagination.currentTotal : 0;
        const limit = pageSize * transaction.pagination.pageCountToLoad + 1;

        let list: TransactionData[] = await fetch(`http://api.eostracker.io/transactions?page=${offset}&size=${limit}`)
          .then(res => res.json())
          .then(camelize);

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
      }
    },
  },
});
