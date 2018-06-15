// @flow
import { find, size } from 'lodash';
import type { Pagination } from './block';
import get, { postEOS } from '../API.config';

type DelegatedBandwidth = {
  from: string,
  to: string,
  netWeight: string,
  cpuWeight: string,
};
type Keys = {
  key: string,
  weight: number,
};
type NetLimit = {
  used: number,
  available: number,
  max: number,
};
type RequiredAuth = {
  threshold: number,
  keys: Keys[],
  accounts: any[],
  waits: any[],
};
type Permissions = {
  permName: string,
  parent: string,
  requiredAuth: RequiredAuth,
};
type TotalResources = {
  owner: string,
  netWeight: string,
  cpuWeight: string,
  ramBytes: number,
};
type VoterInfo = {
  owner: string,
  proxy: string,
  producers: any[],
  staked: number,
  lastVoteWeight: string,
  proxiedVoteWeight: string,
  isProxy: number,
  deferredTrxId: number,
  lastUnstakeTime: string,
  unstaking: string,
};
export type AccountData = {
  accountName: string,
  privileged: boolean,
  lastCodeUpdate: string,
  created: string,
  ramQuota: number,
  netWeight: number,
  cpuWeight: number,
  netLimit: NetLimit,
  cpuLimit: NetLimit,
  ramUsage: number,
  permissions: Permissions[],
  totalResources?: TotalResources | null,
  delegatedBandwidth?: DelegatedBandwidth | null,
  voterInfo?: VoterInfo | null,
};


export type CreatedAccountData =  {
  id: string,
  handlerAccountName: string,
  name: string,
  createdAt: string,
  data: {
    creator: string,
    name: string,
  }
};
export type ListResponse = {
  content: CreatedAccountData[],
  page: {
    size: number,
    totalElements: number,
    totalElements: number,
    number: number,
  },
};
export type BPAccount = {
  owner: string,
  totalVotes: string,
  producerKey: string,
  isActive: number,
  url: string,
  unpaidBlocks: number,
  lastClaimTime: number | string,
  location: number,
};

export type Store = {
  loading: boolean,
  data: AccountData,
  producerInfo: Object | null,
  producerAccountList: BPAccount[],
  list: CreatedAccountData[],
  pagination: Pagination,
};

export const emptyAccountData = {
  accountName: '',
  privileged: false,
  lastCodeUpdate: '1970-01-01T00:00:00.000',
  created: '2018-06-04T00:40:15.500',
  ramQuota: -1,
  netWeight: -1,
  cpuWeight: -1,
  netLimit: { used: -1, available: -1, max: -1 },
  cpuLimit: { used: -1, available: -1, max: -1 },
  ramUsage: -1,
  permissions: [],
  totalResources: { owner: '', netWeight: '-1 EOS', cpuWeight: '-1 EOS', ramBytes: -1 },
  delegatedBandwidth: {
    from: '',
    to: '',
    netWeight: '-1 EOS',
    cpuWeight: '-1 EOS',
  },
  voterInfo: {
    owner: '',
    proxy: '',
    producers: [],
    staked: -1,
    lastVoteWeight: '0.0',
    proxiedVoteWeight: '0.0',
    isProxy: 0,
    deferredTrxId: 0,
    lastUnstakeTime: '1970-01-01T00:00:00',
    unstaking: '0.0000 EOS',
  },
};
export const defaultState = {
  loading: false,
  list: [],
  data: emptyAccountData,
  producerInfo: null,
  producerAccountList: [],
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
    initAccountsList(state: Store, list: CreatedAccountData[]) {
      state.list = list;
      return state;
    },
    initProducerInfo(state: Store, producerInfo: Object | null) {
      state.producerInfo = producerInfo;
      return state;
    },
    initProducerList(state: Store, producerAccountList: BPAccount[]) {
      state.producerAccountList = producerAccountList;
      return state;
    },
    initAccountData(state: Store, data: AccountData) {
      state.data = data;
      return state;
    },
    setPage(state: Store, payload: { current: number, total: number }) {
      state.pagination = payload;
      return state;
    },
  },
  effects: {
    async getAccountData(accountName: string) {
      const {
        store: { dispatch },
      } = await import('./');
      dispatch.info.toggleLoading();
      dispatch.account.toggleLoading();
      dispatch.history.updateURI();

      try {
        // const data = await get(`/accounts?name=${accountName}`);
        const data = await postEOS('/v1/chain/get_account', { account_name: accountName });

        if (!data) throw new Error('No data.');
        this.initAccountData(data);
        const { default: blockProducersList } = await import('../pages/BlockProducers/blockProducersList');
        const producerInfo = find(blockProducersList, { account: data.accountName });
        if (size(producerInfo) > 0) {
          this.initProducerInfo(producerInfo);
        } else {
          this.initProducerInfo(null);
        }
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
        dispatch.account.toggleLoading();
        dispatch.info.toggleLoading();
      }
    },
    async getBPAccountsList() {
      const {
        store: { dispatch },
      } = await import('./');
      dispatch.account.toggleLoading();
      dispatch.info.toggleLoading();
      try {
        const bpList: {
          rows: BPAccount[],
          more: boolean,
        } = await postEOS('/v1/chain/get_table_rows', {
          json: true,
          code: 'eosio',
          scope: 'eosio',
          table: 'producers',
          limit: 100000,
        });
        this.initProducerList(bpList.rows.sort((a, b) => Number(b.totalVotes) - Number(a.totalVotes)));
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
        dispatch.account.toggleLoading();
      }
    },
    async getAccountsList(gotoPage?: number) {
      const {
        store: { dispatch },
      } = await import('./');
      dispatch.account.toggleLoading();
      dispatch.info.toggleLoading();

      try {
        const dataPage = gotoPage ? gotoPage - 1 : 0;
        const { getPageSize } = await import('./utils');
        const data: ListResponse = await get(`/actions?type=newaccount&page=${dataPage}&size=${getPageSize()}`);
        const {
          content,
          page: { totalElements },
        } = data;
        this.initAccountsList(content);
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
        dispatch.account.toggleLoading();
      }
    },
  },
});
