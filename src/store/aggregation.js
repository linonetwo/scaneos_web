// @flow
import get from '../API.config';

export type AggregationData = {
  blocksNum: number,
  transactionNum: number,
  accountNum: number,
  messageNum: number,
};

export type Store = {
  loading: boolean,
  data: AggregationData,
};

export const emptyAggregationData: AggregationData = {
  blocksNum: 0,
  transactionNum: 0,
  accountNum: 0,
  messageNum: 0,
};
const defaultState = {
  loading: false,
  data: emptyAggregationData,
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
    initAggregationData(state: Store, data: AggregationData) {
      state.data = data;
      return state;
    },
  },
  effects: {
    async getAggregationData() {
      return;
      const {
        store: { dispatch },
      } = await import('./');
      dispatch.info.toggleLoading();
      dispatch.aggregation.toggleLoading();
      dispatch.history.updateURI();

      try {
        const [blocksNum, transactionNum, accountNum, messageNum] = await get('/stats');

        this.initAggregationData({ blocksNum, transactionNum, accountNum, messageNum });
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
        dispatch.aggregation.toggleLoading();
      }
    },
  },
});
