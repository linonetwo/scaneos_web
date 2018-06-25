// @flow
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
export type ListResponse<T> = {
  content: T[],
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number,
  },
};

export type Pagination = { total: number, current: number };
export type Store = {
  loading: boolean,
  list: BlockData[],
  data: BlockData,
  pagination: Pagination,
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
    initBlocksList(state: Store, list: BlockData[]) {
      state.list = list;
      return state;
    },
    initBlockData(state: Store, data: BlockData) {
      state.data = data;
      return state;
    },
    setPage(state: Store, payload: { current: number, total: number }) {
      state.pagination = payload;
      return state;
    },
  },
  effects: {
    getFirstBlockIdFromBlockListResponse(data: Object) {
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
        dispatch.transaction.getTransactionsListInBlock(data.blockId);
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
        store: { dispatch },
      } = await import('./');
      dispatch.info.toggleLoading();
      dispatch.block.toggleLoading();

      try {
        const dataPage = gotoPage ? gotoPage - 1 : 0;
        const { getPageSize } = await import('./utils');
        const data: ListResponse<BlockData> = await get(`/blocks?page=${dataPage}&size=${getPageSize()}`);
        const {
          content,
          page: { totalElements },
        } = data;
        this.initBlocksList(content);
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
        dispatch.block.toggleLoading();
      }
    },
  },
});
