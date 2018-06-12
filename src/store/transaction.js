// @flow
import get from '../API.config';
import type { Pagination } from './block';

export type TransactionData = {
  id: string,
  transactionId: string,
  sequenceNum: number,
  blockId: string,
  refBlockNum: number,
  refBlockPrefix: number,
  status: string,
  expiration: string,
  pending: boolean,
  createdAt: string,
  type?: string | null,
  updatedAt?: string | null,
};
export type ListResponse = {
  content: TransactionData[],
  page: {
    size: number,
    totalElements: number,
    totalElements: number,
    number: number,
  },
};

export type Store = {
  loading: boolean,
  data: TransactionData,
  list: TransactionData[],
  listByBlock: TransactionData[],
  pagination: Pagination,
};

export const emptyTransactionData = {
  id: '',
  transactionId: '',
  sequenceNum: -1,
  blockId: '',
  refBlockNum: -1,
  refBlockPrefix: -1,
  status: 'executed',
  expiration: '2018-03-01T12:00:01.000+0000',
  pending: false,
  createdAt: '2018-06-02T10:17:49.501+0000',
  type: 'implicit',
  updatedAt: '2018-06-02T10:17:50.006+0000',
  links: [],
};
export const defaultState = {
  loading: false,
  list: [],
  listByBlock: [],
  data: emptyTransactionData,
  pagination: { current: 0, total: 1 },
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
    initTransactionsListByBlock(state: Store, listByBlock: TransactionData[]) {
      state.listByBlock = listByBlock;
      return state;
    },
    initTransactionData(state: Store, data: TransactionData) {
      state.data = data;
      return state;
    },
    setPage(state: Store, payload: { current: number, total: number }) {
      state.pagination = payload;
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

        this.initTransactionData(data);
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
        store: { dispatch },
      } = await import('./');
      dispatch.info.toggleLoading();
      dispatch.transaction.toggleLoading();

      try {
        const dataPage = gotoPage ? gotoPage - 1 : 0;
        const { getPageSize } = await import('./utils');
        const data: ListResponse = await get(`/transactions?page=${dataPage}&size=${getPageSize()}`);
        const {
          content,
          page: { totalElements },
        } = data;
        this.initTransactionsList(content);
        this.setPage({ current: gotoPage || 0, total: totalElements });
        dispatch.history.updateURI();
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
    async getTransactionsListInBlock(blockId: string) {
      const {
        store: { dispatch },
      } = await import('./');
      dispatch.info.toggleLoading();
      dispatch.transaction.toggleLoading();

      try {
        const data: TransactionData[] = await get(`/transactions?block_id=${blockId}`);
        this.initTransactionsListByBlock(data);
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
