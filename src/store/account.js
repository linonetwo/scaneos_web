// @flow
import { find, size } from 'lodash';
import type { Pagination } from './block';
import get, { postEOS } from '../API.config';

type Permission = {
  actor: string,
  permission: string,
};
type Accounts = {
  permission: Permission,
  weight: number,
};
type NetLimit = {
  used: string | number,
  available: string | number,
  max: string | number,
};
type RequiredAuth = {
  threshold: number,
  keys: any[],
  accounts: Accounts[],
  waits: any[],
};
type Permissions = {
  permName: string,
  parent: string,
  requiredAuth: RequiredAuth,
};
type SelfDelegatedBandwidth = {
  from: string,
  to: string,
  netWeight: string | number,
  cpuWeight: string | number,
};
type TotalResources = {
  owner: string,
  netWeight: string | number,
  cpuWeight: string | number,
  ramBytes: number | number,
};
type VoterInfo = {
  owner: string,
  proxy: string,
  producers: any[],
  staked: string | number,
  lastVoteWeight: string,
  proxiedVoteWeight: string,
  isProxy: number,
  unstaking?: string | number,
};
export type AccountData = {
  tokenBalance?: string,
  accountName: string,
  headBlockNum: number,
  headBlockTime: string,
  privileged: boolean,
  lastCodeUpdate: string,
  created: string,
  coreLiquidBalance: string | number,
  ramQuota: number,
  netWeight: string | number,
  cpuWeight: string | number,
  netLimit: NetLimit,
  cpuLimit: NetLimit,
  ramUsage: number,
  permissions: Permissions[],
  totalResources: TotalResources,
  selfDelegatedBandwidth: SelfDelegatedBandwidth,
  refundRequest: string | null,
  voterInfo: VoterInfo,
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
  nameBidingSearchResult: NameBidingData[],
  nameBidingListPagination: Pagination,
  pagination: Pagination,
};

export const emptyAccountData = {
  accountName: '',
  headBlockNum: -1,
  headBlockTime: '2018-06-20T08:34:51.500',
  privileged: false,
  lastCodeUpdate: '1970-01-01T00:00:00.000',
  created: '2018-06-18T16:10:31.500',
  coreLiquidBalance: '-1 EOS',
  ramQuota: -1,
  netWeight: '1',
  cpuWeight: '1',
  netLimit: { used: -1, available: '1', max: '1' },
  cpuLimit: { used: -1, available: '1', max: '1' },
  ramUsage: -1,
  permissions: [
    {
      permName: 'active',
      parent: 'owner',
      requiredAuth: {
        threshold: 2,
        keys: [],
        accounts: [{ permission: { actor: '', permission: 'active' }, weight: 1 }],
        waits: [],
      },
    },
    {
      permName: 'owner',
      parent: '',
      requiredAuth: {
        threshold: 2,
        keys: [],
        accounts: [{ permission: { actor: '', permission: 'owner' }, weight: 1 }],
        waits: [],
      },
    },
  ],
  totalResources: {
    owner: '',
    netWeight: '-1 EOS',
    cpuWeight: '-1 EOS',
    ramBytes: -1,
  },
  selfDelegatedBandwidth: {
    from: '',
    to: '',
    netWeight: '-1 EOS',
    cpuWeight: '-1 EOS',
  },
  refundRequest: null,
  voterInfo: {
    owner: '',
    proxy: '',
    producers: [],
    staked: '-1',
    lastVoteWeight: '-1',
    proxiedVoteWeight: '-1',
    isProxy: 0,
    deferredTrxId: 0,
    lastUnstakeTime: '1970-01-01T00:00:00',
    unstaking: '-1 EOS',
  },
};
export const defaultState = {
  loading: false,
  list: [],
  nameBidingList: [],
  nameBidingSearchResult: [],
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
    initNameBidingSearchResult(state: Store, nameBidingSearchResult: NameBidingData[]) {
      state.nameBidingSearchResult = nameBidingSearchResult;
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
        console.log(data);
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
          content.map(({ lastBidTime, highBid, ...rest }) => ({
            lastBidTime: Number(lastBidTime) / 1000 / 1000,
            highBid: highBid / 10000,
            ...rest,
            id: undefined,
          })),
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
        const { lastBidTime, highBid, ...rest } = await get(`/accounts/biddingaccount?name=${accountName}`);
        this.initNameBidingData({
          lastBidTime: Number(lastBidTime) / 1000 / 1000,
          highBid: highBid / 10000,
          ...rest,
          id: undefined,
        });
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
    async searchIfNameIsInBiding(accountName: string) {
      const {
        store: { dispatch },
      } = await import('./');
      dispatch.account.toggleLoading();
      dispatch.info.toggleLoading();

      try {
        const { rows: result } = await postEOS('/chain/get_table_rows', {
          json: true,
          scope: 'eosio',
          code: 'eosio',
          table: 'namebids',
          lower_bound: accountName,
          limit: 1,
        });
        this.initNameBidingSearchResult(
          result.map(data => ({
            ...data,
            newName: data.newname,
            lastBidTime: Number(data.lastBidTime) / 1000 / 1000,
            highBid: data.highBid / 10000,
          })),
        );
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
