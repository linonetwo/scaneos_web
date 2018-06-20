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
  used: number,
  available: string,
  max: string,
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
  netWeight: string,
  cpuWeight: string,
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
  staked: string,
  lastVoteWeight: string,
  proxiedVoteWeight: string,
  isProxy: number,
  deferredTrxId: number,
  lastUnstakeTime: string,
  unstaking: string,
};
export type AccountData = {
  accountName: string,
  headBlockNum: number,
  headBlockTime: string,
  privileged: boolean,
  lastCodeUpdate: string,
  created: string,
  coreLiquidBalance: string,
  ramQuota: number,
  netWeight: string,
  cpuWeight: string,
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
  accountName: 'bitfinexcw11',
  headBlockNum: 1673357,
  headBlockTime: '2018-06-20T08:34:51.500',
  privileged: false,
  lastCodeUpdate: '1970-01-01T00:00:00.000',
  created: '2018-06-18T16:10:31.500',
  coreLiquidBalance: '189.8000 EOS',
  ramQuota: 18043,
  netWeight: '90000004000',
  cpuWeight: '90000004000',
  netLimit: { used: 442, available: '4039412089546', max: '4039412089988' },
  cpuLimit: { used: 10334, available: '773413270165', max: '773413280499' },
  ramUsage: 3666,
  permissions: [
    {
      permName: 'active',
      parent: 'owner',
      requiredAuth: {
        threshold: 2,
        keys: [],
        accounts: [
          { permission: { actor: 'bitfinexsig1', permission: 'active' }, weight: 1 },
          { permission: { actor: 'bitfinexsig2', permission: 'active' }, weight: 1 },
          { permission: { actor: 'bitfinexsig5', permission: 'active' }, weight: 1 },
        ],
        waits: [],
      },
    },
    {
      permName: 'owner',
      parent: '',
      requiredAuth: {
        threshold: 2,
        keys: [],
        accounts: [
          { permission: { actor: 'bitfinexsig1', permission: 'owner' }, weight: 1 },
          { permission: { actor: 'bitfinexsig2', permission: 'owner' }, weight: 1 },
          { permission: { actor: 'bitfinexsig5', permission: 'owner' }, weight: 1 },
        ],
        waits: [],
      },
    },
  ],
  totalResources: {
    owner: 'bitfinexcw11',
    netWeight: '9000000.4000 EOS',
    cpuWeight: '9000000.4000 EOS',
    ramBytes: 18043,
  },
  selfDelegatedBandwidth: {
    from: 'bitfinexcw11',
    to: 'bitfinexcw11',
    netWeight: '9000000.1000 EOS',
    cpuWeight: '9000000.1000 EOS',
  },
  refundRequest: null,
  voterInfo: {
    owner: 'bitfinexcw11',
    proxy: 'bitfinexvp11',
    producers: [],
    staked: '180000002000',
    lastVoteWeight: '67626431007592776.00000000000000000',
    proxiedVoteWeight: '0.00000000000000000',
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
