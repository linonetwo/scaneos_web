// @flow
import { map } from 'lodash';
import queryString from 'query-string';

import { blockChainPaths, blockChainDetailPaths, ecosystemPaths, ecosystemDetailPaths } from '../components/Layout';

// 不同导航 Tab 的路径名
const blockChainPath = map([...blockChainPaths, ...blockChainDetailPaths], 'route');
const ecosystemPath = map([...ecosystemPaths, ...ecosystemDetailPaths], 'route');

type Store = {
  navTab: string,
};
export default (initialState: Object = {}) => ({
  state: {
    navTab: 'home',
    ...initialState,
  },
  reducers: {
    changeNavTab(state: Store, nextNavTab: string) {
      state.navTab = nextNavTab;
      return state;
    },
  },
  effects: {
    /** set nav tab heightlight */
    async updateNavTab() {
      const { history } = await import('./');
      const mainPath = history.location.pathname.split('/')?.[1];
      if (blockChainPath.includes(mainPath)) {
        this.changeNavTab('blockChain');
      } else if (ecosystemPath.includes(mainPath)) {
        this.changeNavTab('ecosystem');
      } else if (mainPath === 'producer') {
        this.changeNavTab('producers');
      } else {
        this.changeNavTab(mainPath || 'home');
      }
    },
  },
});
