// @flow
import { notification } from 'antd';

type Store = { loading: boolean };
export default (initialState: Object = {}) => ({
  state: { loading: false, ...initialState },
  reducers: {
    toggleLoading(state: Store) {
      state.loading = !state.loading;
      return state;
    },
  },
  effects: {
    displayNotification(message: string) {
      notification.open({ message });
    },
  },
});
