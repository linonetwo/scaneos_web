import immerPlugin from '@rematch/immer';
import { init } from '@rematch/core';

import blockModel from './block';
import historyModel from './history';

const immer = immerPlugin();
const configureStore = ({ block, history } = {}) =>
  init({
    models: {
      block: blockModel(block),
      history: historyModel(history),
    },
    plugins: [immer],
  });

export default configureStore;
export const store = configureStore();
export { history } from './history';
