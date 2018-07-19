let EosClient;
export const initEosClient = eosClient => {
  EosClient = eosClient;
};

const getEosClient = () => EosClient;

export default getEosClient;
