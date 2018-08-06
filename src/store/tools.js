// @flow
import React from 'react';
import Eos from 'eosjs';
import { Modal } from 'antd';
import { scatterConfig, scatterEosOptions } from '../API.config';
import { initEosClient } from '../components/Scatter/eosClient';

const testnet = false;

export type Store = {
  scatter?: Object,
  eosClient?: Object,
  eosAccount?: {
    name: string,
    authority: string,
  },
};
const defaultState = {
  scatter: {},
  eosAccount: {
    name: 'Attach an Account',
    authority: ' ',
  },
};
export default (initialState: Object = {}) => ({
  state: { ...defaultState, ...initialState },
  reducers: {
    onScatterLoaded(state: Store, scatter: Object) {
      state.scatter = scatter;
      return state;
    },
    onEosClientLoaded(state: Store, eosClient: Object) {
      state.eosClient = eosClient;
      return state;
    },
    attachedAccount(state: Store, eosAccount: Object) {
      state.eosAccount = eosAccount;
      return state;
    },
    detachedAccount(state: Store) {
      state.eosAccount = defaultState.eosAccount;
      return state;
    },
  },
  effects: {
    getEosClient(_: any, rootState: Store) {
      const {
        tools: { scatter },
      } = rootState;
      const eosClient = scatter.eos(scatterConfig, Eos, scatterEosOptions, testnet ? 'http' : 'https');
      initEosClient(eosClient);
    },
    async getEosAccount(_: any, rootState: Store) {
      const {
        tools: { scatter },
      } = rootState;

      try {
        if (!scatter.getIdentity) {
          throw new Error('浏览器没装 Scatter | No Scatter Found');
        }
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
      } catch (error) {
        if (error.message === '浏览器没装 Scatter | No Scatter Found') {
          Modal.info({
            title: error.message,
            content: (
              <>
                <p>
                  <a href="https://get-scatter.com/" target="_black" rel="noopener noreferrer">
                    安装 Scatter | Install Scatter
                  </a>
                </p>
                <p>
                  <a href="https://www.google.com/chrome/" target="_black" rel="noopener noreferrer">
                    安装 Chrome | Install Chrome
                  </a>
                </p>
              </>
            ),
          });
        } else {
          Modal.error({ title: error.message });
        }
      }
    },
  },
});
