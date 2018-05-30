// @flow
import camelize from 'camelize';

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
  transactions: any[],
  createdAt: Timestamp,
};

export type Store = {
  loading: boolean,
  list: BlockData[],
  data: BlockData,
  pagination: { currentTotal: number, loadable: boolean, pageCountToLoad: number },
  currentPage: number,
};

const defaultState = {
  loading: false,
  list: [],
  data: {
    Id: { $id: '' },
    blockNum: 0,
    blockId: '',
    prevBlockId: '',
    timestamp: { sec: 0, usec: 0 },
    transactionMerkleRoot: '',
    producerAccountId: '',
    transactions: [{ $id: '' }],
    createdAt: { sec: 0, usec: 0 },
  },
  pagination: { currentTotal: 0, loadable: false, pageCountToLoad: 10 },
  currentPage: 0,
};
export default (initialState?: Object = {}) => ({
  state: {
    ...defaultState,
    ...initialState,
  },
  reducers: {
    initBlocksList(state: Store, list: BlockData[]) {
      state.list = list;
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
    appendResult(state: Store, list: BlockData[]) {
      state.list = [...state.list, ...list];
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
      dispatch.history.updateURI();

      try {
        const data = await fetch(`http://api.eostracker.io/blocks?block_num=${blockNum}`)
          .then(res => res.json())
          .then(camelize);

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
      }
    },
    async getBlocksList(size: number = 20, gotoPage?: number) {
      const {
        store: { dispatch, block },
      } = await import('./');
      dispatch.info.toggleLoading();

      try {
        const list = await fetch(`http://api.eostracker.io/blocks?size=${size}`)
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

        // let results: BlockData[] = await fetch(`${API}/blocks`, {
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

        this.initBlocksList(list);
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
