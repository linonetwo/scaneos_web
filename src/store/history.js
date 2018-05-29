import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

export default (initialState = {}) => ({
  state: {
    navTab: 'home',
    ...initialState,
  },
  reducers: {
    changeNavTab(state, nextNavTab: string) {
      state.navTab = nextNavTab;
      return state;
    },
  },
  effects: {},
});
