import immerPlugin from '@rematch/immer';
import { init } from '@rematch/core';

import blockModel from './block';

const immer = immerPlugin();
const configureStore = ({ block } = {}) =>
  init({
    models: {
      block: blockModel(block),
    },
    plugins: [immer],
  });

export default configureStore;
export const store = configureStore();
export { history } from './history';
