// @flow
import { initial } from 'lodash';

import get from '../API.config';

export type Id = {
  $id: string,
};
export type Timestamp = {
  sec: number,
  usec: number,
};

export type BlockData = {
  Id: Id,
  blockNum: number,
  blockId: string,
  prevBlockId: string,
  timestamp: Timestamp,
  transactionMerkleRoot: string,
  producerAccountId: string,
  transactions?: any[],
  createdAt: Timestamp,
};

export type Pagination = { currentTotal: number, loadable: boolean, pageCountToLoad: number };
export type Store = {
  loading: boolean,
  list: BlockData[],
  data: BlockData,
  pagination: Pagination,
  currentPage: number,
};

export const emptyBlockData = {
  Id: { $id: '' },
  blockNum: 0,
  blockId: '',
  prevBlockId: '',
  timestamp: { sec: 0, usec: 0 },
  transactionMerkleRoot: '',
  producerAccountId: '',
  transactions: [{ $id: '' }],
  createdAt: { sec: 0, usec: 0 },
};
const defaultState = {
  loading: false,
  list: [],
  data: emptyBlockData,
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
    initBlocksList(state: Store, list: BlockData[]) {
      state.list = list;
      return state;
    },
    appendBlocksList(state: Store, list: BlockData[]) {
      state.list = [...state.list, ...list];
      return state;
    },
    initBlockData(state: Store, data: BlockData) {
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
    async getBlockData(blockNum: number) {
      const {
        store: { dispatch },
      } = await import('./');
      dispatch.info.toggleLoading();
      dispatch.block.toggleLoading();
      dispatch.history.updateURI();

      try {
        const data = await get(`/blocks?block_num=${blockNum}`);

        this.initBlockData(data[0]);
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
        dispatch.block.toggleLoading();
      }
    },
    async getBlocksList(gotoPage?: number) {
      const {
        store: { dispatch, getState },
      } = await import('./');
      const { block } = await getState();
      dispatch.info.toggleLoading();
      dispatch.block.toggleLoading();

      try {
        if (!gotoPage) {
          this.clearState();
          this.setPage(0);
        }

        const { getPageSize } = await import('./utils');
        const pageSize = getPageSize();
        const offset = gotoPage ? block.pagination.currentTotal : 0;
        const limit = pageSize * block.pagination.pageCountToLoad + 1;

        let list: BlockData[] = await get(`/blocks?page=${offset}&size=${limit}`);

        const loadable = list.length === pageSize * block.pagination.pageCountToLoad + 1;

        if (loadable) {
          list = initial(list);
        }
        if (gotoPage) {
          this.appendBlocksList(list);
        } else {
          this.initBlocksList(list);
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
        dispatch.block.toggleLoading();
      }
    },
  },
});
