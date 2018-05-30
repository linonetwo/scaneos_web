// @flow
import { initial } from 'lodash';
import camelize from 'camelize';
import type { Timestamp, Id } from './block';

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
  loading: boolean,
  data: TransactionData[],
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
    initTransactionData(state: Store, data: TransactionData[]) {
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
    appendResult(state: Store, data: TransactionData[]) {
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
    async getTransactionData(size: number = 20, gotoPage?: number) {
      const {
        store: { dispatch, transaction },
      } = await import('./');
      dispatch.info.toggleLoading();

      try {
        const data = await fetch(`http://api.eostracker.io/transactions?size=${size}`)
          .then(res => res.json())
          .then(camelize);

        // if (!gotoPage) {
        //   this.clearState();
        //   this.setPage(0);
        // }

        // const { getPageSize } = await import('./utils');
        // const pageSize = getPageSize();
        // const body = JSON.stringify({
        //   offset: gotoPage ? transaction.pagination.currentTotal : 0,
        //   limit: pageSize * transaction.pagination.pageCountToLoad + 1,
        // });

        // let results: TransactionData[] = await fetch(`${API}/transactions`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body,
        // })
        //   .then(res => res.json())
        //   .then(camelize);

        // const loadable = results.length === pageSize * transaction.pagination.pageCountToLoad + 1;

        // if (loadable) {
        //   results = initial(results);
        // }
        // if (gotoPage) {
        //   dispatch.transaction.appendResult(results);
        //   dispatch.transaction.appendTrees(results);
        //   dispatch.transaction.appendTags(results);
        // } else {
        //   dispatch.transaction.initResult(results);
        //   dispatch.transaction.initTrees(results);
        //   dispatch.transaction.initTags(results);
        // }
        // this.increaseOffset(results.length, loadable);

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
      }
    },
  },
});
