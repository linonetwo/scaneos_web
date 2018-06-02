// @flow
import get from '../API.config';

type Store = {
  loading: boolean,
  keyWord: string,
};

const defaultState = {
  loading: false,
  keyWord: '',
};
export default (initialState?: Object = {}) => ({
  state: {
    ...defaultState,
    ...initialState,
  },
  reducers: {
    toggleLoading(state: Store) {
      state.loading = !state.loading;
      return state;
    },
    changeKeyWord(state: Store, keyWord: string) {
      state.keyWord = keyWord;
      return state;
    },
  },
  effects: {
    async search() {
      const {
        store: { dispatch, getState },
      } = await import('./');
      dispatch.info.toggleLoading();
      dispatch.message.toggleLoading();
      const {
        search: { keyWord },
      } = await getState();

      try {
        const data = await get(`/search?query=${keyWord}`);
        const { history } = await import('./history');

        if (data.blockId === keyWord && typeof data.blockNum === 'number') {
          history.push(`/block/${data.blockNum}`);
        }
      } catch (error) {
        console.error(error);
        const errorString = error.toString();
        let notificationString = errorString;
        if (errorString.match(/^SyntaxError: Unexpected token/)) {
          notificationString = 'Connection lost, maybe due to some Network error.';
        } else if (errorString.match(/^TypeError/)) {
          notificationString = 'Failed to fetch data from server.';
        }
        dispatch.info.displayNotification(notificationString);
      } finally {
        dispatch.info.toggleLoading();
        dispatch.message.toggleLoading();
      }
    },
  },
});
