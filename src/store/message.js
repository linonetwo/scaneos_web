// @flow
import { initial } from 'lodash';
import get from '../API.config';
import type { Pagination } from './block';

type Authorization = {
  permission: string,
  actor: string,
};

type Header = {
  previous?: string | null,
  timestamp?: number | null,
  transactionMroot?: string | null,
  actionMroot?: string | null,
  blockMroot?: string | null,
  producer?: string | null,
  scheduleVersion?: number | null,
  newProducers?: string | null,
};

type Data = {
  header: Header,
};

export type MessageData = {
  id: string,
  actionId: number,
  transactionId: string,
  authorization: Authorization[],
  handlerAccountName: string,
  name: string,
  data: Data,
  createdAt: string,
};
export type ListResponse = {
  content: MessageData[],
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number,
  },
};

export type Store = {
  loading: boolean,
  listByTime: MessageData[],
  listByTransaction: MessageData[],
  pagination: Pagination,
  currentPage: number,
};

export const emptyMessageData = {
  id: '',
  actionId: -1,
  transactionId: '',
  authorization: [{ permission: 'active', actor: '' }],
  handlerAccountName: '',
  name: '',
  data: {
    header: {
      previous: '0000000000000000000000000000000000000000000000000000000000000000',
      timestamp: -1,
      transaction_mroot: '0000000000000000000000000000000000000000000000000000000000000000',
      action_mroot: '0000000000000000000000000000000000000000000000000000000000000000',
      block_mroot: '0000000000000000000000000000000000000000000000000000000000000000',
      producer: '',
      schedule_version: -1,
      new_producers: null,
    },
  },
  createdAt: '2018-06-02T10:17:49.501+0000',
  links: [],
};
export const defaultState = {
  loading: false,
  listByTime: [],
  listByTransaction: [],
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
    initMessagesList(state: Store, listByTime: MessageData[]) {
      state.listByTime = listByTime;
      return state;
    },
    appendMessagesList(state: Store, listByTime: MessageData[]) {
      state.listByTime = [...state.listByTime, ...listByTime];
      return state;
    },
    initMessageData(state: Store, listByTransaction: MessageData[]) {
      state.listByTransaction = listByTransaction;
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
        const listByTransaction: ListResponse = await get(`/actions?transaction_id=${transactionId}`);

        if (listByTransaction.content.length === 0) throw new Error('No data.');
        this.initMessageData(listByTransaction.content);
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

        const data: ListResponse = await get(`/actions?page=${offset}&size=${limit}`);
        let { content } = data;

        const loadable = content.length === pageSize * message.pagination.pageCountToLoad + 1;

        if (loadable) {
          content = initial(content);
        }
        if (gotoPage) {
          this.appendMessagesList(content);
        } else {
          this.initMessagesList(content);
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
        dispatch.message.toggleLoading();
      }
    },
  },
});
