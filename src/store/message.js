// @flow
import { initial } from 'lodash';
import get from '../API.config';
import type { Pagination } from './block';

type Authorization = {
  account?: string,
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
  id: string,
  actionId: number,
  transactionId: string,
  authorization: Authorization[],
  handlerAccountName?: string,
  type?: string,
  data?: Data,
  createdAt: string,
};

export type Store = {
  loading: boolean,
  data: MessageData,
  list: MessageData[],
  pagination: Pagination,
  currentPage: number,
};

export const emptyMessageData = {
  id: '',
  actionId: 0,
  transactionId: '',
  authorization: [{ account: '', permission: 'active' }],
  handlerAccountName: 'eos',
  type: '',
  data: {},
  createdAt: '',
};
const defaultState = {
  loading: false,
  list: [],
  data: emptyMessageData,
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
      dispatch.message.toggleLoading();
      dispatch.history.updateURI();

      try {
        const data = await get(`/actions?transaction_id=${transactionId}`);

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
        dispatch.message.toggleLoading();
      }
    },
    async getMessagesList(gotoPage?: number) {
      const {
        store: { dispatch, getState },
      } = await import('./');
      const { message } = await getState();
      dispatch.info.toggleLoading();
      dispatch.message.toggleLoading();

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
        const offset = gotoPage ? message.pagination.currentTotal / (pageSize * message.pagination.pageCountToLoad) : 0;
        const limit = pageSize * message.pagination.pageCountToLoad + 1;

        let list: MessageData[] = await get(`/actions?page=${offset}&size=${limit}`);

        const loadable = list.length === pageSize * message.pagination.pageCountToLoad + 1;

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
        dispatch.message.toggleLoading();
      }
    },
  },
});
