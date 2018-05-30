// @flow
import { initial } from 'lodash';
import camelize from 'camelize';

type Store = {
  keyWord: string,
  results: Object[],
  pagination: { currentTotal: number, loadable: boolean, pageCountToLoad: number },
  currentPage: number,
};

const defaultState = {
  keyWord: '',
  results: [],
  pagination: { currentTotal: 0, loadable: false, pageCountToLoad: 10 },
  currentPage: 0,
};
export default (initialState?: Object = {}) => ({
  state: {
    ...defaultState,
    ...initialState,
  },
  reducers: {
    changeKeyWord(state: Store, keyWord: string) {
      state.keyWord = keyWord;
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
    initResult(state: Store, results: SearchResult[]) {
      state.results = results;
      state.pagination = { currentTotal: 0, loadable: false, pageCountToLoad: state.pagination.pageCountToLoad };
      return state;
    },
    appendResult(state: Store, results: SearchResult[]) {
      state.results = [...state.results, ...results];
      return state;
    },
    increaseOffset(state: Store, newOffset: number, loadable: boolean) {
      state.pagination.currentTotal += newOffset;
      state.pagination.loadable = loadable;
      return state;
    },
  },
  effects: {
    async search(gotoPage?: number) {
      const {
        store: { dispatch, filter, search },
      } = await import('./');
      dispatch.info.toggleLoading();
      dispatch.queryString.updateURI();

      if (!gotoPage) {
        this.clearState();
        this.setPage(0);
      }

      const { getPageSize } = await import('./utils');
      const pageSize = getPageSize();
      const body = JSON.stringify({
        keywords: filter.keyWord.split(/\s+/g),

        offset: gotoPage ? search.pagination.currentTotal : 0,
        limit: pageSize * search.pagination.pageCountToLoad + 1,
      });

      try {
        let results: SearchResult[] = await fetch(`${API}/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        })
          .then(res => res.json())
          .then(camelize);

        const loadable = results.length === pageSize * search.pagination.pageCountToLoad + 1;

        if (loadable) {
          results = initial(results);
        }
        if (gotoPage) {
          dispatch.search.appendResult(results);
        } else {
          dispatch.search.initResult(results);
        }
        this.increaseOffset(results.length, loadable);
      } catch (error) {
        console.error(error);
        const errorString = error.toString();
        let notificationString = errorString;
        if (errorString.match(/^SyntaxError: Unexpected token/)) {
          notificationString = '与后端失去有效连接，可能网络不畅，或服务器出现故障（请联系工程师）';
        } else if (errorString.match(/^TypeError/)) {
          notificationString = '网络连接有问题，请求数据失败';
        }
        dispatch.info.displayNotification(notificationString);
      } finally {
        dispatch.info.toggleLoading();
      }
    },
  },
});
