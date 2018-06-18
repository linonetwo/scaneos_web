import Component from './';

import { API } from '../../API.config';
import { listDataByTime } from '../../store/action.data';
import { defaultState } from '../../store/action';
import { getPageSize } from '../../store/utils';

export default [
  {
    component: Component,
    name: '消息列表',
    props: {},
    url: '/actions/',
    route: '/actions/',
    fetch: [
      {
        matcher: () => `${API}/actions?page=0&size=${getPageSize() * defaultState.pagination.pageCountToLoad + 1}`,
        response: listDataByTime,
      },
    ],
    reduxState: {
      action: {},
    },
  },
];
