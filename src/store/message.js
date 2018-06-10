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
  header?: Header,
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
    totalElements: number,
    number: number,
  },
};

export type Store = {
  loading: boolean,
  listByTime: MessageData[],
  listByTransaction: MessageData[],
  pagination: Pagination,
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
    initMessagesList(state: Store, listByTime: MessageData[]) {
      state.listByTime = listByTime;
      return state;
    },
    initMessageData(state: Store, listByTransaction: MessageData[]) {
      state.listByTransaction = listByTransaction;
      return state;
    },
    setPage(state: Store, payload: { current: number, total: number }) {
      state.pagination = payload;
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
        const listByTransaction: MessageData[] = await get(`/actions?transaction_id=${transactionId}`);

        if (listByTransaction.length === 0) throw new Error('No data.');
        this.initMessageData(listByTransaction);
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
        store: { dispatch },
      } = await import('./');
      dispatch.info.toggleLoading();
      dispatch.message.toggleLoading();

      try {
        const dataPage = gotoPage ? gotoPage - 1 : 0;
        const { getPageSize } = await import('./utils');
        const data: ListResponse = await get(`/actions?page=${dataPage}&size=${getPageSize()}`);
        const {
          content,
          page: { totalElements },
        } = data;
        this.initMessagesList(content);
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
        dispatch.message.toggleLoading();
      }
    },
  },
});
