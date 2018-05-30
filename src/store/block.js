// @flow
import camelize from 'camelize';

type Id = {
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
  data: BlockData[],
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
    initBlockData(state: Store, data: BlockData[]) {
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
    appendResult(state: Store, data: BlockData[]) {
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
    async getBlockData(size: number = 20, gotoPage?: number) {
      const {
        store: { dispatch, block },
      } = await import('./');
      dispatch.info.toggleLoading();

      try {
        const data = await fetch(`http://api.eostracker.io/blocks?size=${size}`)
          .then(res => res.json())
          .then(camelize);
        console.log(data)

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
      }
    },
  },
});
