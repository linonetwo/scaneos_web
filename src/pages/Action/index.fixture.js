import Component from './';

import { API } from '../../API.config';
import { actionDataByTransactionId } from '../../store/action.data';

export default [
  {
    component: Component,
    name: '消息详情',
    props: {},
    url: `/action/${actionDataByTransactionId.content[0].transactionId}`,
    route: '/action/:transactionId',
    fetch: [
      {
        matcher: () => `${API}/actions?transaction_id=${actionDataByTransactionId.content[0].transactionId}`,
        response: JSON.stringify(actionDataByTransactionId.content),
      },
    ],
    reduxState: {
      action: {},
    },
  },
];
