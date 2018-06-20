// @flow
import get from '../API.config';
import type { Pagination } from './block';

type Authorization = {
  permission: string,
  actor: string,
};
export type ActionData = {
  id: string,
  actionId: number,
  transactionId: string,
  authorization: Authorization[],
  handlerAccountName: string,
  name: string,
  data: Object,
  createdAt: string,
};

export type ListResponse = {
  content: ActionData[],
  page: {
    size: number,
    totalElements: number,
    totalElements: number,
    number: number,
  },
};

export type Store = {
  loading: boolean,
  listByTime: ActionData[],
  data: ActionData,
  pagination: Pagination,
};

export const emptyActionData = {
  id: '',
  actionId: 0,
  transactionId: '',
  authorization: [{ permission: 'active', actor: '' }],
  handlerAccountName: '',
  name: '',
  data: {},
  createdAt: '2018-06-20T08:55:33.499+0000',
};
export const defaultState = {
  loading: false,
  listByTime: [],
  data: emptyActionData,
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
    initActionsList(state: Store, listByTime: ActionData[]) {
      state.listByTime = listByTime;
      return state;
    },
    initActionData(state: Store, data: ActionData) {
      state.data = data;
      return state;
    },
    setPage(state: Store, payload: { current: number, total: number }) {
      state.pagination = payload;
      return state;
    },
  },
  effects: {
    async getActionData(transactionId: string) {
      const {
        store: { dispatch },
      } = await import('./');
      dispatch.info.toggleLoading();
      dispatch.action.toggleLoading();
      dispatch.history.updateURI();

      try {
        const data = await get(`/actions?id=${transactionId}`);
        this.initActionData(data);
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
        dispatch.action.toggleLoading();
      }
    },
    async getActionsList(gotoPage?: number) {
      const {
        store: { dispatch },
      } = await import('./');
      dispatch.info.toggleLoading();
      dispatch.action.toggleLoading();

      try {
        const dataPage = gotoPage ? gotoPage - 1 : 0;
        const { getPageSize } = await import('./utils');
        const data: ListResponse = await get(`/actions?page=${dataPage}&size=${getPageSize()}`);
        const {
          content,
          page: { totalElements },
        } = data;
        this.initActionsList(content);
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
        dispatch.action.toggleLoading();
      }
    },
  },
});
