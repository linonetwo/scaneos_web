// @flow
import configureStore from './configureStore';
import { followURI } from './history';

const { store, history } = configureStore();
history.listen(async location => {
  await followURI(location);

  const {
    store: { dispatch },
  } = await import('./');
  dispatch.history.updateNavTab();
});
followURI(history.location);

export { store, history };
