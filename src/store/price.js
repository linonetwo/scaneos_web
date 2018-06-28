// @flow
import camelize from 'camelize';
import { postEOS } from '../API.config';

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

  resourcePrice: {
    supply: number,
    ramVolumn: number,
    ramMarketcap: number,
    ramPrice: number,
    netPrice: number,
    cpuPrice: number,
  },
  ramPriceChartData: number[][],
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

  resourcePrice: {
    supply: -1,
    ramVolumn: -1,
    ramMarketcap: -1,
    ramPrice: -1,
    netPrice: -1,
    cpuPrice: -1,
  },
  ramPriceChartData: [],
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

    initResourcePrice(
      state: Store,
      [{ supply, ramVolumn, ramMarketcap, ramPrice }, { netPrice, cpuPrice }]: [Object, Object],
    ) {
      state.resourcePrice = {
        supply,
        ramVolumn,
        ramMarketcap,
        ramPrice,
        netPrice,
        cpuPrice,
      };
      return state;
    },
    initRamPriceChartData(state: Store, data: number[][]) {
      state.ramPriceChartData = data;
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

    async getResourcePrice() {
      const resourcePriceData = await Promise.all([
        postEOS('/chain/get_table_rows', {
          json: true,
          code: 'eosio',
          scope: 'eosio',
          table: 'rammarket',
          limit: 1,
        }).then(({ rows: [{ supply, base, quote }] }) => {
          const totalSupply = Number(supply.substr(0, supply.indexOf(' ')));
          const ramVolumn = Number(base.balance.substr(0, base.balance.indexOf(' ')));
          const ramMarketcap = Number(quote.balance.substr(0, quote.balance.indexOf(' ')));
          return {
            supply: totalSupply,
            ramVolumn,
            ramMarketcap,
            ramPrice: (ramMarketcap / ramVolumn) * 1024, // price in kB
          };
        }),
        postEOS('/chain/get_account', { account_name: 'eoshuobipool' }).then(
          ({
            totalResources: { netWeight, cpuWeight },
            netLimit: { max: netMaxLimit },
            cpuLimit: { max: cpuMaxLimit },
          }) => {
            const netStaked = netWeight.replace(' EOS', '');
            const cpuStaked = cpuWeight.replace(' EOS', '');
            const netAvailable = netMaxLimit / 1024; // byte to kB
            const cpuAvailable = cpuMaxLimit / 1000; // microseconds to milliseconds
            return {
              netPrice: netStaked / netAvailable,
              cpuPrice: cpuStaked / cpuAvailable,
            };
          },
        ),
      ]);

      this.initResourcePrice(resourcePriceData);
    },
    async getRamPriceChart() {
      const data = await fetch('https://www.feexplorer.io/json/EOSramPrice.php?start=1529401320000&end=1530159002000')
        .then(res => res.text())
        .then(text => JSON.parse(text.replace('(', '').replace(')', '')));
      this.initRamPriceChartData(data);
    },
  },
});
