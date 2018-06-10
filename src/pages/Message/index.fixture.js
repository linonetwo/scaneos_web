import Component from './';

import { API } from '../../API.config';
import { messageDataByTransactionId } from '../../store/message.data';

export default [
  {
    component: Component,
    name: '消息详情',
    props: {},
    url: `/message/${messageDataByTransactionId.content[0].transactionId}`,
    route: '/message/:transactionId',
    fetch: [
      {
        matcher: () => `${API}/messages?transaction_id=${messageDataByTransactionId.content[0].transactionId}`,
        response: JSON.stringify([messageDataByTransactionId]),
      },
    ],
    reduxState: {
      message: {},
    },
  },
];
