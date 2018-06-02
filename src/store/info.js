// @flow
import { notification } from 'antd';
import i18n from '../i18n';

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
    changeLanguage(newLanguage: string) {
      i18n.changeLanguage(newLanguage);
    },
  },
});
