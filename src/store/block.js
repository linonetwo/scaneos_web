// @flow
import camelize from 'camelize';

type Id = {
  $id: string,
};
export type Timestamp = {
  sec: number,
  usec: number,
};

export type BlockData = {
  Id: Id,
  blockNum: number,
  blockId: string,
  prevBlockId: string,
  timestamp: Timestamp,
  transactionMerkleRoot: string,
  producerAccountId: string,
  transactions: any[],
  createdAt: Timestamp,
};

export type Store = {
  loading: boolean,
  data: BlockData[],
};

export default (initialState?: Object = {}) => ({
  state: { loading: false, data: [], ...initialState },
  reducers: {
    loadBlockData(state: Store, data: BlockData[]) {
      state.data = data;
      return state;
    },
  },
  effects: {
    async getBlockData(size: number = 20) {
      const data = await fetch(`http://api.eostracker.io/blocks?size=${size}`)
        .then(res => res.json())
        .then(camelize);

      this.loadBlockData(data);
    },
  },
});
