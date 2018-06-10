import Component from './';

import { API } from '../../API.config';
import { listDataByTime } from '../../store/message.data';
import { defaultState } from '../../store/message';
import { getPageSize } from '../../store/utils';

export default [
  {
    component: Component,
    name: '消息列表',
    props: {},
    url: '/messages/',
    route: '/messages/',
    fetch: [
      {
        matcher: () => `${API}/messages?page=0&size=${getPageSize() * defaultState.pagination.pageCountToLoad + 1}`,
        response: listDataByTime,
      },
    ],
    reduxState: {
      message: {},
    },
  },
];
