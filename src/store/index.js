import immerPlugin from '@rematch/immer';
import { init } from '@rematch/core';

import blockModel from './block';
import transactionModel from './transaction';
import historyModel from './history';

const immer = immerPlugin();
const configureStore = ({ block, history, transaction } = {}) =>
  init({
    models: {
      block: blockModel(block),
      transaction: transactionModel(transaction),
      history: historyModel(history),
    },
    plugins: [immer],
  });

export default configureStore;
export const store = configureStore();
export { history } from './history';
