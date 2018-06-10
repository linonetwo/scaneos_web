import Component from './';

import { API } from '../../API.config';
import { defaultState } from '../../store/block';
import { getPageSize } from '../../store/utils';

const getDefaultPageSize = () => getPageSize() * defaultState.pagination.pageCountToLoad + 1;

export default [
  {
    component: Component,
    name: '概览',
    props: {},
    url: '/',
    route: '/',
    fetch: [
      {
        matcher: () => `${API}/stats`,
        response: () =>
          import('../../store/aggregation.data')
            .then(({ statsData1 }) => statsData1)
            .then(res => JSON.stringify(res)),
      },
      {
        matcher: () => `${API}/block?page=0&size=${getDefaultPageSize()}`,
        response: () =>
          import('../../store/block.data')
            .then(({ listData1 }) => listData1)
            .then(res => JSON.stringify(res)),
      },
      {
        matcher: () => `${API}/transactions?page=0&size=${getDefaultPageSize()}`,
        response: () =>
          import('../../store/transaction.data')
            .then(({ listDataByTime }) => listDataByTime)
            .then(res => JSON.stringify(res)),
      },
      {
        matcher: () => `${API}/accounts?page=0&size=${getDefaultPageSize()}`,
        response: () => [],
      },
      {
        matcher: () => `${API}/actions?page=0&size=${getDefaultPageSize()}`,
        response: () => [],
      },
    ],
    reduxState: {
      transaction: {},
    },
  },
];
