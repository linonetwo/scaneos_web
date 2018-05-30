// @flow
import camelize from 'camelize';
import type { Timestamp, Id } from './block';

type Authorization =  {
  account: string,
  permission: string,
};
type Accounts =  {
  permission: Authorization,
  weight: number,
};
type Keys =  {
  key: string,
  weight: number,
};
type Owner =  {
  threshold: number,
  keys: Keys[],
  accounts: Accounts[],
};
type Data =  {
  creator?: string,
  name?: string,
  owner?: Owner,
  active?: Owner,
  recovery?: Owner,
  deposit?: string,
  from?: string,
  to?: string,
  amount?: number,
  memo?: string,
};
export type MessageData =  {
  Id: Id,
  messageId: number,
  transactionId: string,
  authorization: Authorization[],
  handlerAccountName: string,
  type: string,
  data: Data,
  createdAt: Timestamp,
};

export type Store = {
  loading: boolean,
  data: MessageData[],
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
    initMessageData(state: Store, data: MessageData[]) {
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
    appendResult(state: Store, data: MessageData[]) {
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
    async getMessageData(page: number = 0, gotoPage?: number) {
      const {
        store: { dispatch, message },
      } = await import('./');
      dispatch.info.toggleLoading();

      try {
        const data = await fetch(`http://api.eostracker.io/messages?page=${page}`)
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

        // let results: MessageData[] = await fetch(`${API}/blocks`, {
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

        this.initMessageData(data);
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
