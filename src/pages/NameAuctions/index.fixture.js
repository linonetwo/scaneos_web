import Component from './';

import { API } from '../../API.config';
import { listDataByTime } from '../../store/transaction.data';
import { defaultState } from '../../store/transaction';
import { getPageSize } from '../../store/utils';

export default [
  {
    component: Component,
    name: '名字PY交易',
    props: {},
    url: '/transactions/',
    route: '/transactions/',
    fetch: [
      {
        matcher: () => `${API}/transactions?page=0&size=${getPageSize() * defaultState.pagination.pageCountToLoad + 1}`,
        response: JSON.stringify(listDataByTime),
      },
    ],
    reduxState: {
      transaction: {},
    },
  },
];
