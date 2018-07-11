// @flow
import { truncate, flatten } from 'lodash';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Table, Select, Spin } from 'antd';
import { translate } from 'react-i18next';
import randomColor from 'randomcolor';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import type { ComponentClass } from 'react';

import { formatTimeStamp } from '../../store/utils';
import { Title } from '../../components/Table';
import { getActionListValueRendering } from '../../components/getListValueRendering';
import { ACTIONS_FRAGMENT } from './index';

const ActionName = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color};
  padding: 5px;
`;

type Props = { t: Function, actions: Object[] };

export const renderActionName = (actionName: string, t: Function) => (
  <ActionName
    color={randomColor({
      luminosity: 'dark',
      format: 'rgba',
      alpha: 0.7,
      hue: 'blue',
      seed: actionName,
    })}
  >
    {t(actionName)}
  </ActionName>
);

function ActionsListRaw({ t, actions }: Props) {
  return (
    <Fragment>
      <Table scroll={{ x: 1200 }} size="middle" dataSource={actions} rowKey="id">
        <Table.Column title={t('name')} dataIndex="name" key="name" render={name => renderActionName(name, t)} />
        <Table.Column
          title={t('data')}
          dataIndex="data"
          key="data"
          render={(data, { name }) => getActionListValueRendering(name, data, t)}
        />
        <Table.Column
          title={t('transactionID')}
          dataIndex="transactionID"
          render={transactionID => (
            <Link to={`/transaction/${transactionID}/`}>
              {truncate(transactionID, { length: 10, omission: '...' })}
            </Link>
          )}
        />
        <Table.Column
          title={t('createdAt')}
          dataIndex="createdAt"
          key="createdAt"
          render={timeStamp => formatTimeStamp(timeStamp, t('locale'))}
        />
        <Table.Column
          title={t('authorization')}
          dataIndex="authorization"
          key="authorization"
          render={authorization =>
            flatten(
              authorization.map(({ actor, permission }) => (
                <Link key={actor + permission} to={`/account/${actor}/`}>
                  {actor} ({t('permission')}: {permission}){' '}
                </Link>
              )),
            )
          }
        />
      </Table>
    </Fragment>
  );
}
export const ActionsList = translate('action')(ActionsListRaw);

export const GET_ACCOUNT_ACTIONS = gql`
  query GET_ACCOUNT_ACTIONS($name: String!, $filterBy: JSON) {
    account(name: $name) {
      actions(filterBy: $filterBy, size: 9999) {
        actions {
          ...ACTIONS_FRAGMENT
        }
        pageInfo {
          filterBy
          totalPages
          totalElements
          page
          size
        }
      }
    }
  }
  ${ACTIONS_FRAGMENT}
`;
export function getAccountActionsList(Container: ComponentClass<*>, accountName: string, t: Function) {
  return (
    <Query ssr={false} query={GET_ACCOUNT_ACTIONS} variables={{ name: accountName }}>
      {({ loading, error, data, fetchMore }) => {
        if (error)
          return (
            <Container column center>
              <Title>{t('Actions')}</Title>
              {error.message}
            </Container>
          );
        if (loading)
          return (
            <Container column center>
              <Title>{t('Actions')}</Title>
              <Spin tip={t('Connecting')} spinning={loading} size="large" />
            </Container>
          );
        if (!data.account)
          return (
            <Container column>
              <Title>{t('Actions')}</Title>
              {t('noResult')}
            </Container>
          );
        const {
          account: {
            actions: {
              actions,
              pageInfo: { filterBy },
            },
          },
        } = data;
        return (
          <Container column>
            <Title>{t('Actions')}</Title>
            <Select
              mode="tags"
              tokenSeparators={[',', ' ']}
              defaultValue={filterBy.name}
              style={{ width: '100%' }}
              placeholder={t('action:name')}
              onChange={(actionNameFilter: string[]) =>
                fetchMore({
                  variables: { name: accountName, filterBy: { name: actionNameFilter } },
                  updateQuery: (prev, { fetchMoreResult }) => fetchMoreResult,
                })
              }
            >
              {[
                'transfer',
                'setabi',
                'newaccount',
                'updateauth',
                'buyram',
                'buyrambytes',
                'sellram',
                'delegatebw',
                'undelegatebw',
                'refund',
                'regproducer',
                'bidname',
                'voteproducer',
                'claimrewards',
                'create',
                'issue',
              ].map(actionName => <Select.Option key={actionName}>{t(`action:${actionName}`)}</Select.Option>)}
            </Select>

            <ActionsList actions={actions} />
          </Container>
        );
      }}
    </Query>
  );
}
