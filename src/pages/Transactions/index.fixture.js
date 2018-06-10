import Component from './';

import { API } from '../../API.config';
import { listData1 } from '../../store/transaction.data';
import { defaultState } from '../../store/transaction';
import { getPageSize } from '../../store/utils';

export default [
  {
    component: Component,
    name: '交易列表',
    props: {},
    url: '/transactions/',
    route: '/transactions/',
    fetch: [
      {
        matcher: () => `${API}/transactions?page=0&size=${getPageSize() * defaultState.pagination.pageCountToLoad + 1}`,
        response: listData1,
      },
    ],
    reduxState: {
      transaction: {},
    },
  },
];
