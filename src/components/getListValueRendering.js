// @flow
import { toPairs } from 'lodash';
import React from 'react';
import Flex from 'styled-flex-component';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import prettySize from 'prettysize';

import { formatTimeStamp } from '../store/utils';
import AuthTable from '../pages/Account/AuthTable';

export default function getListValueRendering(field: string, value: any, t: Function) {
  switch (field) {
    case 'id':
      return value.id;
    case 'blockID':
    case 'prevBlockID':
    case 'blockNum':
    case 'refBlockNum':
      return <Link to={`/block/${value}/`}>{value}</Link>;

    case 'createdAt':
    case 'updatedAt':
    case 'timestamp':
    case 'expiration':
    case 'lastBidTime':
      return formatTimeStamp(value, t('locale'));

    case 'producerAccountID':
    case 'highBidder':
    case 'handlerAccountName':
      return <Link to={`/account/${value}/`}>{value}</Link>;

    case 'actions':
      return value.map(({ id }) => <Link to={`/action/${id}/`}>{id}</Link>);
    case 'actionNum':
      return <Link to={`/action/${value}/`}>{value}</Link>;

    case 'authorization':
      return value.map(({ actor, permission }) => (
        <Link key={actor + permission} to={`/account/${actor}/`}>
          {actor} ({t('permission')}: {permission})
        </Link>
      ));

    case 'voterInfo':
    case 'selfDelegatedBandwidth':
    case 'totalResources':
      return (
        <div>
          {toPairs(value).map(([subField, subValue]) => (
            <div key={subField}>{getListValueRendering(subField, subValue, t)}</div>
          ))}
        </div>
      );
    case 'owner':
    case 'proxy':
    case 'lastVoteWeight':
    case 'proxiedVoteWeight':
    case 'isProxy':
    case 'deferredTrxID':
    case 'lastUnstakeTime':
    case 'unstaking':
    case 'from':
    case 'to':
    case 'netWeight':
    case 'cpuWeight':
    case 'ramBytes':
      return (
        <span>
          {t(field)}: {value}
        </span>
      );
    case 'producers':
      return (
        <span>
          {t(field)}: {value.join(', ')}
        </span>
      );
    case 'staked':
      return (
        <span>
          {t(field)}: {(value / 10000).toFixed(4)} EOS
        </span>
      );

    case 'transactionID':
      return <Link to={`/transaction/${value}/`}>{value}</Link>;
    default: {
      if (typeof value === 'string' || typeof value === 'number') {
        return value;
      }
      return (
        <pre style={{ 'white-space': 'pre-wrap' }}>
          <code>{JSON.stringify(value, null, '  ')}</code>
        </pre>
      );
    }
  }
}

const ActionDataContainer = styled(Flex)`
  mark {
    font-size: 16px;
    font-family: Consolas, Monaco, monospace;
  }
`;
export function getActionListValueRendering(actionName: string, value: any, t: Function) {
  switch (actionName) {
    case 'transferIn': {
      const { from, to, memo, quantity } = value;
      return (
        <ActionDataContainer column>
          <div>
            <Link to={`/account/${to}/`}>
              <mark>{to}</mark>
            </Link>{' '}
            ⬅️{' '}
            <Link to={`/account/${from}/`}>
              <mark>{from}</mark>
            </Link>{' '}
            <mark>{quantity}</mark>
          </div>
          <pre style={{ 'white-space': 'pre-wrap' }}>
            <em>{memo}</em>
          </pre>
        </ActionDataContainer>
      );
    }
    case 'transferOut': {
      const { from, to, memo, quantity } = value;
      return (
        <ActionDataContainer column>
          <div>
            <Link to={`/account/${from}/`}>
              <mark>{from}</mark>
            </Link>{' '}
            ➡️{' '}
            <Link to={`/account/${to}/`}>
              <mark>{to}</mark>
            </Link>{' '}
            <mark>{quantity}</mark>
          </div>
          <pre style={{ 'white-space': 'pre-wrap' }}>
            <em>{memo}</em>
          </pre>
        </ActionDataContainer>
      );
    }
    case 'transfer': {
      const { from, to, memo, quantity } = value;
      return (
        <ActionDataContainer column>
          <div>
            <Link to={`/account/${from}/`}>
              <mark>{from}</mark>
            </Link>{' '}
            {t('transferTo')}{' '}
            <Link to={`/account/${to}/`}>
              <mark>{to}</mark>
            </Link>{' '}
            <mark>{quantity}</mark>
          </div>
          <pre style={{ 'white-space': 'pre-wrap' }}>
            <em>{memo}</em>
          </pre>
        </ActionDataContainer>
      );
    }
    case 'delegatebw': {
      const { from, receiver, stakeCpuQuantity, stakeNetQuantity, transfer } = value;
      return (
        <ActionDataContainer column>
          <div>
            <Link to={`/account/${from}/`}>
              <mark>{from}</mark>
            </Link>{' '}
            {t('delegate')}{' '}
            {stakeCpuQuantity !== '0.0000 EOS' && (
              <span>
                <mark>
                  {t('cpu')} {stakeCpuQuantity}
                </mark>{' '}
              </span>
            )}
            {stakeNetQuantity !== '0.0000 EOS' && (
              <span>
                <mark>
                  {t('net')} {stakeNetQuantity}
                </mark>{' '}
              </span>
            )}
            {t('to')}
            <Link to={`/account/${receiver}/`}>
              <mark>{receiver}</mark>
            </Link>
          </div>
          {transfer ? t('transferOn') : t('transferOff')}
        </ActionDataContainer>
      );
    }
    case 'undelegatebw': {
      const { from, receiver, unstakeCpuQuantity, unstakeNetQuantity } = value;
      return (
        <ActionDataContainer column>
          <div>
            <Link to={`/account/${from}/`}>
              <mark>{from}</mark>
            </Link>{' '}
            {t('undelegate')}{' '}
            {unstakeCpuQuantity !== '0.0000 EOS' && (
              <span>
                <mark>
                  {t('cpu')} {unstakeCpuQuantity}
                </mark>{' '}
              </span>
            )}
            {unstakeNetQuantity !== '0.0000 EOS' && (
              <span>
                <mark>
                  {t('net')} {unstakeNetQuantity}
                </mark>{' '}
              </span>
            )}
            {t('to')}
            <Link to={`/account/${receiver}/`}>
              <mark>{receiver}</mark>
            </Link>
          </div>
        </ActionDataContainer>
      );
    }
    case 'buyram': {
      const { payer, receiver, quant } = value;
      return (
        <ActionDataContainer column>
          <div>
            <Link to={`/account/${payer}/`}>
              <mark>{payer}</mark>
            </Link>{' '}
            {t('buy')}{' '}
            <span>
              <mark>
                {t('ram')} {quant}
              </mark>{' '}
            </span>
            {t('to')}
            <Link to={`/account/${receiver}/`}>
              <mark>{receiver}</mark>
            </Link>
          </div>
        </ActionDataContainer>
      );
    }
    case 'buyrambytes': {
      const { payer, receiver, bytes } = value;
      return (
        <ActionDataContainer column>
          <div>
            <Link to={`/account/${payer}/`}>
              <mark>{payer}</mark>
            </Link>{' '}
            {t('buy')}{' '}
            <span>
              <mark>
                {t('ram')} {prettySize(bytes)}
              </mark>{' '}
            </span>
            {t('to')}
            <Link to={`/account/${receiver}/`}>
              <mark>{receiver}</mark>
            </Link>
          </div>
        </ActionDataContainer>
      );
    }
    case 'sellram': {
      const { account, bytes } = value;
      return (
        <ActionDataContainer column>
          <div>
            <Link to={`/account/${account}/`}>
              <mark>{account}</mark>
            </Link>{' '}
            {t('sell')}{' '}
            <span>
              <mark>
                {t('ram')} {prettySize(bytes)}
              </mark>{' '}
            </span>
          </div>
        </ActionDataContainer>
      );
    }
    case 'newaccount': {
      const { creator, name, ...permissions } = value;
      return (
        <ActionDataContainer column>
          <div>
            <Link to={`/account/${creator}/`}>
              <mark>{creator}</mark>
            </Link>{' '}
            {t('createAccount')}{' '}
            <Link to={`/account/${name}/`}>
              <mark>{name}</mark>
            </Link>
          </div>
          <AuthTable
            t={t}
            permissions={Object.keys(permissions).map(permName => ({ permName, ...permissions[permName] }))}
            width={400}
          />
        </ActionDataContainer>
      );
    }
    case 'updateauth': {
      const { account, permission, parent, auth } = value;
      return (
        <ActionDataContainer column>
          <div>
            <Link to={`/account/${account}/`}>
              <mark>{account}</mark>
            </Link>{' '}
            {t('updateauth')} <mark>{permission}</mark>
          </div>
          <AuthTable t={t} permissions={[{ permName: permission, parent, ...auth }]} width={400} />
        </ActionDataContainer>
      );
    }
    default: {
      if (typeof value === 'string' || typeof value === 'number') {
        return value;
      }
      return (
        <pre style={{ 'white-space': 'pre-wrap' }}>
          <code>{JSON.stringify(value, null, '  ')}</code>
        </pre>
      );
    }
  }
}
