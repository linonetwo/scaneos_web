// @flow
import camelize from 'camelize';
import type { Timestamp } from './block';

type Id = {
  $id: string,
};

export type TransactionData = {
  Id: Id,
  transactionId: string,
  sequenceNum: number,
  blockId: string,
  refBlockNum: number,
  refBlockPrefix: string,
  scope: string[],
  readScope: any[],
  expiration: Timestamp,
  signatures: string[],
  messages: Id[],
  createdAt: Timestamp,
};

export type Store = {
  loading: boolean,
  data: TransactionData[],
};

export default (initialState?: Object = {}) => ({
  state: { loading: false, data: [], ...initialState },
  reducers: {
    loadTransactionData(state: Store, data: TransactionData[]) {
      state.data = data;
      return state;
    },
  },
  effects: {
    async getTransactionData(size: number = 20) {
      const data = await fetch(`http://api.eostracker.io/transactions?size=${size}`)
        .then(res => res.json())
        .then(camelize);

      console.log(data);

      this.loadTransactionData(data);
    },
  },
});
