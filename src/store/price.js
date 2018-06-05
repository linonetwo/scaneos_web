// @flow
import camelize from 'camelize';
import {} from 'lodash';

export type CurrentPriceData = {
  name: string,
  symbol: string,
  rank: number,
  priceUsd: number,
  priceBtc: number,
  '24hVolumeUsd': number,
  marketCapUsd: number,
  availableSupply: number,
  totalSupply: number,
  maxSupply: number,
  percentChange1h: number,
  percentChange24h: number,
  percentChange7d: number,
  lastUpdated: string,
};
export type Store = {
  loading: boolean,
  currentPriceData: CurrentPriceData,
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
    percentChange1h: 0,
    percentChange24h: 0,
    percentChange7d: 0,
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
    initCurrentPriceData(state: Store, data: CurrentPriceData) {
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
        // 放飞等待较久的 Promise
        this.getPriceChartData();
        await this.getCurrentPriceData();
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
        dispatch.price.toggleLoading();
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
