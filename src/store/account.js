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
  tokenBalance?: string,
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

export type CreatedAccountData = {
  id: string,
  handlerAccountName: string,
  name: string,
  createdAt: string,
  data: {
    creator: string,
    name: string,
  },
};
export type ListResponse<T> = {
  content: T[],
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

export type NameBidingData = {
  newName: string,
  highBidder: string,
  highBid: number,
  lastBidTime: string | number,
};

export type Store = {
  loading: boolean,
  data: AccountData,
  bidingData: NameBidingData,
  producerInfo: Object | null,
  producerAccountList: BPAccount[],
  list: CreatedAccountData[],
  nameBidingList: NameBidingData[],
  nameBidingListPagination: Pagination,
  pagination: Pagination,
};

export const emptyAccountData = {
  accountName: '',
  tokenBalance: undefined,
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
  nameBidingList: [],
  nameBidingListPagination: { current: 0, total: 1 },
  data: emptyAccountData,
  bidingData: {
    newName: '',
    highBidder: '',
    highBid: -1,
    lastBidTime: '',
  },
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
    initNameBidingList(state: Store, nameBidingList: NameBidingData[]) {
      state.nameBidingList = nameBidingList;
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
    initNameBidingData(state: Store, data: NameBidingData) {
      state.bidingData = data;
      return state;
    },
    setPage(state: Store, payload: { current: number, total: number, listName?: string }) {
      if (payload.listName === 'nameBidingList') {
        state.nameBidingListPagination = payload;
        return state;
      }
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
        const [data, balanceData] = await Promise.all([
          postEOS('/chain/get_account', { account_name: accountName }),
          postEOS('/chain/get_currency_balance', { account: accountName, code: 'eosio.token' }),
        ]);

        if (!data) throw new Error('No data.');
        this.initAccountData({ ...data, tokenBalance: balanceData.join(', ') });
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
        } = await postEOS('/chain/get_table_rows', {
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
        const data: ListResponse<CreatedAccountData> = await get(
          `/actions?type=newaccount&page=${dataPage}&size=${getPageSize()}`,
        );
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
    async getNameBidingList(gotoPage?: number) {
      const {
        store: { dispatch },
      } = await import('./');
      dispatch.account.toggleLoading();
      dispatch.info.toggleLoading();
      dispatch.history.updateURI();

      try {
        const dataPage = gotoPage ? gotoPage - 1 : 0;
        const { getPageSize } = await import('./utils');
        const data: ListResponse<NameBidingData> = await get(
          `/accounts/biddingaccounts?page=${dataPage}&size=${getPageSize()}`,
        );
        const {
          content,
          page: { totalElements },
        } = data;
        this.initNameBidingList(
          content.map(({ lastBidTime, ...rest }) => ({ lastBidTime: Number(lastBidTime) / 1000 / 1000, ...rest, id: undefined })),
        );
        this.setPage({ listName: 'nameBidingList', current: gotoPage || 0, total: totalElements });
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
    async getNameBidingData(accountName: string) {
      const {
        store: { dispatch },
      } = await import('./');
      dispatch.account.toggleLoading();
      dispatch.info.toggleLoading();
      dispatch.history.updateURI();

      try {
        const { lastBidTime, ...rest } = await get(`/accounts/biddingaccount?name=${accountName}`);
        this.initNameBidingData({ lastBidTime: Number(lastBidTime) / 1000 / 1000, ...rest, id: undefined });
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
