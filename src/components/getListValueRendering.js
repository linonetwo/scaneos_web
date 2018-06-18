// @flow
import { toPairs } from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

import { formatTimeStamp } from '../store/utils';

export default function getListValueRendering(field: string, value: any, t: Function) {
  switch (field) {
    case 'id':
      return value.id;
    case 'blockId':
    case 'prevBlockId':
    case 'blockNum':
    case 'refBlockNum':
      return <Link to={`/block/${value}/`}>{value}</Link>;

    case 'createdAt':
    case 'updatedAt':
    case 'timestamp':
    case 'expiration':
    case 'lastBidTime':
      return formatTimeStamp(value, t('locale'));

    case 'producerAccountId':
    case 'highBidder':
    case 'handlerAccountName':
      return <Link to={`/account/${value}/`}>{value}</Link>;

    case 'actions':
      return value.map(({ id }) => <Link to={`/action/${id}/`}>{id}</Link>);
    case 'actionNum':
      return <Link to={`/action/${value}/`}>{value}</Link>;

    case 'authorization':
      return value.map(({ actor, permission }) => (
        <Link to={`/account/${actor}/`}>
          {actor} ({t('permission')}: {permission})
        </Link>
      ));
    
    case 'voterInfo':
    case 'selfDelegatedBandwidth':
    case 'totalResources':
      return <div>{toPairs(value).map(([subField, subValue]) => (<div>{getListValueRendering(subField, subValue, t)}</div>))}</div>
    case 'owner':
    case 'proxy':
    case 'lastVoteWeight':
    case 'proxiedVoteWeight':
    case 'isProxy':
    case 'deferredTrxId':
    case 'lastUnstakeTime':
    case 'unstaking':
    case 'from':
    case 'to':
    case 'netWeight':
    case 'cpuWeight':
    case 'ramBytes':
      return <span>{t(field)}: {value}</span>
    case 'producers':
      return <span>{t(field)}: {value.join(', ')}</span>
    case 'staked':
      return <span>{t(field)}: {(value / 10000).toFixed(4)} EOS</span>

    case 'transactionId':
      return <Link to={`/transaction/${value}/`}>{value}</Link>;
    default: {
      if (typeof value === 'string' || typeof value === 'number') {
        return value;
      }
      return (
        <pre>
          <code>{JSON.stringify(value, null, '  ')}</code>
        </pre>
      );
    }
  }
}
