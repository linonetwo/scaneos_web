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
    async searchKeyWord(param: { keyWord: string, type: string }) {
      const { keyWord, type } = param;
      const {
        store: { dispatch },
      } = await import('./');
      dispatch.info.toggleLoading();
      dispatch.message.toggleLoading();
      try {
        if (type === 'account') {
          const data = await get(`/search?type=${type}&name=${keyWord}`);
          return data;
        }
        const data = await get(`/search?type=${type}&id=${keyWord}`);
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
        store: { getState, dispatch },
      } = await import('./');
      const { history } = await import('./history');
      const {
        search: { keyWord },
      } = await getState();

      if (keyWord.length === 64) {
        // 长度为 64 的一般是 blockId
        const data = await this.searchKeyWord({ keyWord, type: 'block' }).then(res =>
          dispatch.block.getFirstBlockIdFromBlockListResponse(res),
        );

        if (data && data.blockId === keyWord && typeof data.blockNum === 'number') {
          dispatch.block.getBlockData(data.blockNum);
          return history.push(`/block/${data.blockNum}`);
        }
      } else {
        // 其他目前默认是账户名
        // const data = await this.searchKeyWord(keyWord, 'account');
        return history.push(`/account/${keyWord}`);
      }
    },
  },
});
