// @flow
import get from '../API.config';

export type TokenInfo = {
  issuer: string,
  maximumSupply: string,
  createdAt: string,
};

type Store = { loading: boolean, list: TokenInfo[] };
const defaultState = {
  loading: false,
  list: [],
};
export default (initialState: Object = {}) => ({
  state: { ...defaultState, ...initialState },
  reducers: {
    toggleLoading(state: Store) {
      state.loading = !state.loading;
      return state;
    },
    initTokensList(state: Store, list: TokenInfo[]) {
      state.list = list;
      return state;
    },
  },
  effects: {
    async getTokens() {
      const {
        store: { dispatch },
      } = await import('./');
      dispatch.info.toggleLoading();
      dispatch.action.toggleLoading();

      try {
        const listResponse = await get('/actions?requiredata=true&type=create');

        this.initTokensList(listResponse.content.map(({ createdAt, data }) => ({ createdAt, ...data })));
      } catch (error) {
        console.error(error);
        const errorString = error.toString();
        let notificationString = errorString;
        if (errorString.match(/^SyntaxError: Unexpected token/)) {
          notificationString = 'Connection lost, maybe due to some Network error.';
        } else if (errorString.match(/^TypeError/)) {
          notificationString = 'Failed to fetch list from server.';
        }
        dispatch.info.displayNotification(notificationString);
      } finally {
        dispatch.info.toggleLoading();
        dispatch.action.toggleLoading();
      }
    },
  },
});
