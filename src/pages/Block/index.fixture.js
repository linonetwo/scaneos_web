import Component from './';

import { API } from '../../API.config';
import { blockData1 } from '../../store/block.data';

export default [
  {
    component: Component,
    name: '区块详情',
    props: {},
    url: `/block/${blockData1.blockNum}`,
    route: '/block/:blockNum',
    fetch: [
      {
        matcher: () => `${API}/blocks?block_id=${blockData1.blockId}`,
        response: JSON.stringify(blockData1),
      },
    ],
    reduxState: {
      block: {},
    },
  },
];
