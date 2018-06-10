// @flow
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
      return formatTimeStamp(value, t('locale'));

    case 'producerAccountId':
      return <Link to={`/account/${value}/`}>{value}</Link>;

    case 'messages':
      return value.map(({ id }) => <Link to={`/message/${id}/`}>{id}</Link>);
    case 'messageNum':
      return <Link to={`/message/${value}/`}>{value}</Link>;

    case 'authorization':
      return value.map(({ actor, permission }) => (
        <Link to={`/account/${actor}/`}>
          {actor}({t('permission')}: {permission})
        </Link>
      ));
    case 'handlerAccountName':
      return <Link to={`/account/${value}/`}>{value}</Link>;

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
