import Component from './';

import { API } from '../../API.config';
import { listData1 } from '../../store/block.data';
import { defaultState } from '../../store/block';
import { getPageSize } from '../../store/utils';

export default [
  {
    component: Component,
    name: '区块列表',
    props: {},
    url: '/blocks/',
    route: '/blocks/',
    fetch: [
      {
        matcher: () => `${API}/blocks?page=0&size=${getPageSize() * defaultState.pagination.pageCountToLoad + 1}`,
        response: listData1,
      },
    ],
    reduxState: {
      block: {},
    },
  },
];
