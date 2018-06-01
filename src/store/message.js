// @flow
import { initial } from 'lodash';
import camelize from 'camelize';
import type { Timestamp, Id, Pagination } from './block';

type Authorization = {
  account: string,
  permission: string,
};
type Accounts = {
  permission: Authorization,
  weight: number,
};
type Keys = {
  key: string,
  weight: number,
};
type Owner = {
  threshold: number,
  keys: Keys[],
  accounts: Accounts[],
};
type Data = {
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
export type MessageData = {
  Id: Id,
  messageId: number,
  transactionId: string,
  authorization: Authorization[],
  handlerAccountName?: string,
  type: string,
  data?: Data,
  createdAt: Timestamp,
};

export type Store = {
  data: MessageData,
  list: MessageData[],
  pagination: Pagination,
  currentPage: number,
};

export const emptyMessageData = {
  Id: { $id: '' },
  messageId: 0,
  transactionId: '',
  authorization: [{ account: '', permission: 'active' }],
  handlerAccountName: 'eos',
  type: '',
  data: {},
  createdAt: { sec: 0, usec: 0 },
};
const defaultState = {
  list: [],
  data: emptyMessageData,
  pagination: { currentTotal: 0, loadable: false, pageCountToLoad: 10 },
  currentPage: 0,
};
export default (initialState?: Object = {}) => ({
  state: {
    ...defaultState,
    ...initialState,
  },
  reducers: {
    initMessagesList(state: Store, list: MessageData[]) {
      state.list = list;
      return state;
    },
    appendMessagesList(state: Store, list: MessageData[]) {
      state.list = [...state.list, ...list];
      return state;
    },
    initMessageData(state: Store, data: MessageData) {
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
    async getMessageData(transactionId: string) {
      const {
        store: { dispatch },
      } = await import('./');
      dispatch.info.toggleLoading();
      dispatch.history.updateURI();

      try {
        const data = await fetch(`http://api.eostracker.io/messages?transaction_id=${transactionId}`)
          .then(res => res.json())
          .then(camelize);

        if (data.length === 0) throw new Error('No data.');
        this.initMessageData(data[0]);
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
    async getMessagesList(gotoPage?: number) {
      const {
        store: { dispatch, getState },
      } = await import('./');
      const { account } = await getState();
      dispatch.info.toggleLoading();

      try {
        if (!gotoPage) {
          this.clearState();
          this.setPage(0);
        }

        const { getPageSize } = await import('./utils');
        const pageSize = getPageSize();
        const offset = gotoPage ? account.pagination.currentTotal : 0;
        const limit = pageSize * account.pagination.pageCountToLoad + 1;

        let list: MessageData[] = await fetch(`http://api.eostracker.io/messages?page=${offset}&size=${limit}`)
          .then(res => res.json())
          .then(camelize);

        const loadable = list.length === pageSize * account.pagination.pageCountToLoad + 1;

        if (loadable) {
          list = initial(list);
        }
        if (gotoPage) {
          this.appendMessagesList(list);
        } else {
          this.initMessagesList(list);
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
