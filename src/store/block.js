// @flow
import { initial } from 'lodash';

import get from '../API.config';

export type BlockData = {
  id: string,
  blockNum: number,
  blockId: string,
  prevBlockId: string,
  timestamp: string,
  transactionMerkleRoot: string,
  producerAccountId: string,
  pending: boolean,
  transactions?: any[],
  createdAt: string,
  updatedAt: string | null,
};
export type ListResponse = {
  content: BlockData[],
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number,
  },
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
  id: '',
  blockNum: -1,
  blockId: '',
  prevBlockId: '',
  timestamp: '2018-06-02T10:17:49.000+0000',
  transactionMerkleRoot: '',
  producerAccountId: '',
  pending: false,
  createdAt: '2018-06-02T10:17:49.501+0000',
  updatedAt: '2018-06-02T10:17:50.006+0000',
  links: [],
};
export const defaultState = {
  loading: false,
  list: [],
  data: emptyBlockData,
  pagination: { currentTotal: 0, loadable: false, pageCountToLoad: 10 },
  currentPage: 1,
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
    getFirstBlockIdFromBlockListResponse(data: ListResponse) {
      if (data?.content?.length === 1 && typeof data.content[0].blockNum === 'number') {
        return { blockNum: data.content[0].blockNum, blockId: data.content[0].blockId };
      }
      return null;
    },
    async getBlockData(blockNumOrID: number | string) {
      const {
        store: { dispatch },
      } = await import('./');
      dispatch.info.toggleLoading();
      dispatch.block.toggleLoading();
      dispatch.history.updateURI();

      try {
        let blockNum;
        if (typeof blockNumOrID === 'number') {
          blockNum = blockNumOrID;
        } else if (Number.isFinite(Number(blockNumOrID))) {
          blockNum = Number(blockNumOrID);
        } else {
          const data = await dispatch.search
            .searchKeyWord({ keyWord: blockNumOrID, type: 'block' })
            .then(res => this.getFirstBlockIdFromBlockListResponse(res));
          if (data.blockId === blockNumOrID && typeof data.blockNum === 'number') {
            ({ blockNum } = data);
          }
        }
        if (typeof blockNum !== 'number') {
          throw new Error(`${blockNumOrID} is not a block Number nor a block ID.`);
        }

        const data = await get(`/blocks?block_num=${blockNum}`);

        this.initBlockData(data);
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
          this.setPage(1);
        } else {
          this.setPage(gotoPage);
        }
        dispatch.history.updateURI();

        const { getPageSize } = await import('./utils');
        const pageSize = getPageSize();
        const offset = gotoPage ? block.pagination.currentTotal / (pageSize * block.pagination.pageCountToLoad) : 0;
        const limit = pageSize * block.pagination.pageCountToLoad + 1;

        const data: ListResponse = await get(`/blocks?page=${offset}&size=${limit}`);
        let { content } = data;

        const loadable = content.length === pageSize * block.pagination.pageCountToLoad + 1;

        if (loadable) {
          content = initial(content);
        }
        if (gotoPage) {
          this.appendBlocksList(content);
        } else {
          this.initBlocksList(content);
        }
        this.increaseOffset(content.length, loadable);
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
