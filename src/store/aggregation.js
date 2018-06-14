// @flow
import get, { postEOS } from '../API.config';

export type AggregationData = {
  blockNumber: number,
  transactionNumber: number,
  accountNumber: number,
  actionNumber: number,
};

type AggregationTable = {
  rows: {
    maxBlockNetUsage: number,
    targetBlockNetUsagePct: number,
    maxTransactionNetUsage: number,
    basePerTransactionNetUsage: number,
    netUsageLeeway: number,
    contextFreeDiscountNetUsageNum: number,
    contextFreeDiscountNetUsageDen: number,
    maxBlockCpuUsage: number,
    targetBlockCpuUsagePct: number,
    maxTransactionCpuUsage: number,
    minTransactionCpuUsage: number,
    maxTransactionLifetime: number,
    deferredTrxExpirationWindow: number,
    maxTransactionDelay: number,
    maxInlineActionSize: number,
    maxInlineActionDepth: number,
    maxAuthorityDepth: number,
    maxRamSize: string,
    totalRamBytesReserved: number,
    totalRamStake: number,
    lastProducerScheduleUpdate: string,
    lastPervoteBucketFill: number,
    pervoteBucket: number,
    perblockBucket: number,
    totalUnpaidBlocks: number,
    totalActivatedStake: string,
    threshActivatedStakeTime: number,
    lastProducerScheduleSize: number,
    totalProducerVoteWeight: string,
    lastNameClose: string,
  }[],
  more: boolean,
};

export type Store = {
  loading: boolean,
  data: AggregationData,
  totalActivatedStake: number,
};

export const emptyAggregationData: AggregationData = {
  blockNumber: 0,
  transactionNumber: 0,
  accountNumber: 0,
  actionNumber: 0,
};
const defaultState = {
  loading: false,
  data: emptyAggregationData,
  totalActivatedStake: 0,
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
    initVotingProgress(state: Store, totalActivatedStake: number) {
      state.totalActivatedStake = totalActivatedStake;
      return state;
    },
  },
  effects: {
    async getAggregationData() {
      const {
        store: { dispatch },
      } = await import('./');
      dispatch.info.toggleLoading();
      dispatch.aggregation.toggleLoading();
      dispatch.history.updateURI();

      try {
        const { blockNumber, transactionNumber, accountNumber = 0, actionNumber } = await get('/stats');

        this.initAggregationData({ blockNumber, transactionNumber, accountNumber, actionNumber });
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
    async getVoting() {
      const {
        rows: [{ totalActivatedStake }],
      }: AggregationTable = await postEOS('/v1/chain/get_table_rows', {
        json: true,
        code: 'eosio',
        scope: 'eosio',
        table: 'global',
        limit: 1,
      });
      this.initVotingProgress(Number(totalActivatedStake));
    },
  },
});
