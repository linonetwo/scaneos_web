// @flow
import configureStore from './configureStore';

const { store, history } = configureStore();
history.listen(async location => {
  const {
    store: { dispatch },
  } = await import('./');
  dispatch.history.updateNavTab();
});

export { store, history };
