import Component from './';

import { API } from '../../API.config';
import { transactionData1 } from '../../store/transaction.data';

export default [
  {
    component: Component,
    name: '交易详情',
    props: {},
    url: `/transaction/${transactionData1.transactionId}`,
    route: '/transaction/:transactionId',
    fetch: [
      {
        matcher: () => `${API}/transactions?transaction_id=${transactionData1.transactionId}`,
        response: JSON.stringify(transactionData1),
      },
    ],
    reduxState: {
      transaction: {},
    },
  },
];
