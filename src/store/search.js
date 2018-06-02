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
    async searchKeyWord(keyWord: string) {
      const {
        store: { dispatch },
      } = await import('./');
      dispatch.info.toggleLoading();
      dispatch.message.toggleLoading();
      try {
        const data = await get(`/search?query=${keyWord}`);
        return data;
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
    async search() {
      const {
        store: { getState },
      } = await import('./');
      const {
        search: { keyWord },
      } = await getState();

      const data = await this.searchKeyWord(keyWord);
      const { history } = await import('./history');

      if (data.blockId === keyWord && typeof data.blockNum === 'number') {
        return history.push(`/block/${data.blockNum}`);
      }
      return history.push(`/account/${keyWord}`);
    },
  },
});
