import immerPlugin from '@rematch/immer';
import { init } from '@rematch/core';

import infoModel from './info';
import blockModel from './block';
import transactionModel from './transaction';
import historyModel from './history';

const immer = immerPlugin();
const configureStore = ({ info, block, history, transaction } = {}) =>
  init({
    models: {
      info: infoModel(info),
      block: blockModel(block),
      transaction: transactionModel(transaction),
      history: historyModel(history),
    },
    plugins: [immer],
  });

export default configureStore;
export const store = configureStore();
export { history } from './history';
