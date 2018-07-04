// @flow
import Eos from 'eosjs';
import get, { scatterConfig, scatterEosOptions } from '../API.config';

const testnet = false;
export type ToolsInfo = {
  scatter: Object,
  eosAccount: {
    name: string,
    authority: string,
  },
};

type Store = { loading: boolean, tools: ToolsInfo };
const defaultState = {
  loading: false,
  tools: {
    scatter: {},
    eosAccount: {
      name: 'Attach an Account',
      authority: ' ',
    },
  },
};
export default (initialState: Object = {}) => ({
  state: { ...defaultState, ...initialState },
  reducers: {
    toggleLoading(state: Store) {
      state.loading = !state.loading;
      return state;
    },
    onScatterLoaded(state: Store, scatter: Object) {
      state.tools.scatter = scatter;
      return state;
    },
    onEosClientLoaded(state: Store, eosClient) {
      console.log(eosClient);
      state.tools.eosClient = eosClient;
      return state;
    },
    attachedAccount(state: Store, eosAccount: Object) {
      state.tools.eosAccount = eosAccount;
      console.log(eosAccount);
      return state;
    },
    detachedAccount(state: Store) {
      state.tools.eosAccount = defaultState.tools.eosAccount;
      return state;
    },
  },
  effects: {
    getEosClient(payload, rootState) {
      const {
        tools: {
          tools: { scatter },
        },
      } = rootState;
      const eosClient = scatter.eos(scatterConfig, Eos, scatterEosOptions, testnet ? 'http' : 'https');
      window.eosClient = eosClient;
    },
    async getEosAccount(payload, rootState) {
      const {
        tools: {
          tools: { scatter },
        },
      } = rootState;
      console.log(rootState);

      try {
        if (scatter.identity) {
          await scatter.forgetIdentity();
        }
        const id = await scatter.getIdentity({
          accounts: [
            {
              chainId: scatterConfig.chainId,
              blockchain: scatterConfig.blockchain,
            },
          ],
        });
        const eosAccount =
          id && id.accounts.find(x => x.blockchain === 'eos')
            ? id.accounts.find(x => x.blockchain === 'eos').name
            : 'Attach an Account';
        const accountAuth =
          id && id.accounts.find(x => x.blockchain === 'eos')
            ? id.accounts.find(x => x.blockchain === 'eos').authority
            : '';
        this.attachedAccount({
          name: eosAccount,
          authority: accountAuth,
        });
      } catch (err) {
        // console.log(err);
      }
    },
  },
});
