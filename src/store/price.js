// @flow
import camelize from 'camelize';
import {} from 'lodash';

export type Store = {
  loading: boolean,
  currentPriceData: Object,
  priceChartData: number[][],
};

const defaultState = {
  loading: false,
  currentPriceData: {
    name: 'EOS',
    symbol: 'EOS',
    rank: -1,
    priceUsd: -1,
    priceBtc: -1,
    '24hVolumeUsd': -1,
    marketCapUsd: -1,
    availableSupply: -1,
    totalSupply: -1,
    maxSupply: -1,
    percentChange1h: -1,
    percentChange24h: -1,
    percentChange7d: -1,
    lastUpdated: '',
  },
  priceChartData: [],
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
    initCurrentPriceData(state: Store, data: Object) {
      state.currentPriceData = data;
      return state;
    },
    initPriceChartData(state: Store, data: number[][]) {
      state.priceChartData = data;
      return state;
    },
  },
  effects: {
    async getPriceData() {
      const {
        store: { dispatch },
      } = await import('./');
      dispatch.info.toggleLoading();
      dispatch.price.toggleLoading();

      try {
        // 放飞两个 Promise
        this.getCurrentPriceData();
        this.getPriceChartData();
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
    async getCurrentPriceData() {
      const { data: currentPriceData } = await fetch('https://api.tiy.io/price-query/v1/query?coin=eos')
        .then(res => res.json())
        .then(camelize);
      this.initCurrentPriceData(currentPriceData);
    },
    async getPriceChartData() {
      const {
        data: [{ data: priceChartData }],
      } = await fetch('https://api.tiy.io/price-query/v1/analytics?coin=eos').then(res => res.json());
      this.initPriceChartData(priceChartData);
    },
  },
});
