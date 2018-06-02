import immerPlugin from '@rematch/immer';
import { init } from '@rematch/core';

import searchModel from './search';
import infoModel from './info';
import blockModel from './block';
import transactionModel from './transaction';
import accountModel from './account';
import messageModel from './message';
import aggregationModel from './aggregation';
import historyModel from './history';

const immer = immerPlugin();
const configureStore = ({ search, info, block, history, transaction, account, message, aggregation } = {}) =>
  init({
    models: {
      search: searchModel(search),
      info: infoModel(info),
      block: blockModel(block),
      transaction: transactionModel(transaction),
      account: accountModel(account),
      message: messageModel(message),
      aggregation: aggregationModel(aggregation),
      history: historyModel(history),
    },
    plugins: [immer],
  });

export default configureStore;
export const store = configureStore();
export { history } from './history';
