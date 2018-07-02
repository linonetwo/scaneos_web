// @flow
import get, { postEOS } from '../API.config';

export type AggregationData = {
  blockNumber: number,
  transactionNumber: number,
  accountNumber: number,
  actionNumber: number,
};

export type VoteData = {
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
  totalRamBytesReserved: string,
  totalRamStake: number | string,
  lastProducerScheduleUpdate: string,
  lastPervoteBucketFill: string,
  pervoteBucket: number,
  perblockBucket: number,
  totalUnpaidBlocks: number,
  totalActivatedStake: string,
  threshActivatedStakeTime: string,
  lastProducerScheduleSize: number,
  totalProducerVoteWeight: string,
  lastNameClose: string,
};
type AggregationTable = {
  rows: VoteData[],
  more: boolean,
};

export type Store = {
  loading: boolean,
  data: AggregationData,
  totalActivatedStake: number,
  totalProducerVoteWeight: number,
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
  totalProducerVoteWeight: 0,
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
    initVotingData(state: Store, voteData: VoteData) {
      state.totalActivatedStake = Number(voteData.totalActivatedStake);
      state.totalProducerVoteWeight = Number(voteData.totalProducerVoteWeight);
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

      try {
        const { blockNumber, transactionNumber, accountNumber, actionNumber } = await get('/stats');

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
        rows: [voteData],
      }: AggregationTable = await postEOS('/chain/get_table_rows', {
        json: true,
        code: 'eosio',
        scope: 'eosio',
        table: 'global',
        limit: 1,
      });
      this.initVotingData(voteData);
    },
  },
});
