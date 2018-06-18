// @flow
import { notification } from 'antd';
import i18n from '../i18n';
import { isServer } from './utils';

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
    displayNotification(action: string) {
      if (!isServer) notification.open({ action });
    },
    changeLanguage(newLanguage: string) {
      i18n.changeLanguage(newLanguage);
    },
  },
});
