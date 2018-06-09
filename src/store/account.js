// @flow
import { initial } from 'lodash';
import type { Pagination } from './block';
import get, { postEOS } from '../API.config';

// export type AccountData = {
//   Id: Id,
//   name: string,
//   eosBalance: string,
//   stakedBalance: string,
//   unstakingBalance: string,
//   createdAt: Timestamp,
//   updatedAt: Timestamp,
// };

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
  totalResources: TotalResources | null,
  delegatedBandwidth: DelegatedBandwidth | null,
  voterInfo: VoterInfo | null,
};

export type Store = {
  loading: boolean,
  data: AccountData,
  list: AccountData[],
  pagination: Pagination,
  currentPage: number,
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
const defaultState = {
  loading: false,
  list: [],
  data: emptyAccountData,
  pagination: { currentTotal: 0, loadable: false, pageCountToLoad: 10 },
  currentPage: 1,
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
    initAccountsList(state: Store, list: AccountData[]) {
      state.list = list;
      return state;
    },
    appendAccountsList(state: Store, list: AccountData[]) {
      state.list = [...state.list, ...list];
      return state;
    },
    initAccountData(state: Store, data: AccountData) {
      state.data = data;
      return state;
    },
    setPage(state: Store, newPage: number) {
      state.currentPage = newPage;
      return state;
    },
    clearState(state: Store) {
      state = defaultState;
      return state;
    },
    increaseOffset(state: Store, newOffset: number, loadable: boolean) {
      state.pagination.currentTotal += newOffset;
      state.pagination.loadable = loadable;
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
    async getAccountsList(gotoPage?: number) {
      return;
      const {
        store: { dispatch, getState },
      } = await import('./');
      const { account } = await getState();
      dispatch.account.toggleLoading();
      dispatch.info.toggleLoading();

      try {
        if (!gotoPage) {
          this.clearState();
          this.setPage(1);
        } else {
          this.setPage(gotoPage);
        }
        dispatch.history.updateURI();

        const { getPageSize } = await import('./utils');
        const pageSize = getPageSize();
        const offset = gotoPage ? account.pagination.currentTotal / (pageSize * account.pagination.pageCountToLoad) : 0;
        const limit = pageSize * account.pagination.pageCountToLoad + 1;

        let list: AccountData[] = await get(`/accounts?page=${offset}&size=${limit}`);

        const loadable = list.length === pageSize * account.pagination.pageCountToLoad + 1;

        if (loadable) {
          list = initial(list);
        }
        if (gotoPage) {
          this.appendAccountsList(list);
        } else {
          this.initAccountsList(list);
        }
        this.increaseOffset(list.length, loadable);
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
