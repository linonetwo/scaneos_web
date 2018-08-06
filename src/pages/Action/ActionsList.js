/* eslint-disable react/require-default-props */
// @flow
import { truncate, flatten, size } from 'lodash';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Table, Select, Spin, Icon } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import type { ComponentType } from 'react';

import { formatTimeStamp } from '../../store/utils';
import { Title } from '../../components/Table';
import { getActionListValueRendering } from '../../components/getListValueRendering';
import { ACTIONS_FRAGMENT } from './index';
import Tooltip from '../../components/Tooltip';
import renderActionName from './renderActionName';

/** 针对一些个例，调整 action 的类型名等参数，创造出子类型等 */
function formatActionList(actions: Object[], accountName?: string): Object[] {
  return actions.map(action => {
    if (action.name === 'transfer') {
      if (action.data.from === accountName) {
        return { ...action, name: 'transferOut' };
      }
      if (action.data.to === accountName) {
        return { ...action, name: 'transferIn' };
      }
    }
    return action;
  });
}
type Props = { t: Function, actions: Object[], accountName?: string };
export default function ActionsList({ t, actions, accountName }: Props) {
  return (
    <Fragment>
      <Table scroll={{ x: 1200 }} size="middle" dataSource={formatActionList(actions, accountName)} rowKey="id">
        <Table.Column
          title={`${t('name')}  (${t('clickOpenDetail')})`}
          dataIndex="name"
          key="name"
          render={(name, { id }) => renderActionName(name, id, t)}
        />
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
          title={t('timestamp')}
          dataIndex="timestamp"
          key="timestamp"
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

export const GET_ACCOUNT_ACTIONS = gql`
  query GET_ACCOUNT_MESSAGES($name: String!, $filterBy: JSON) {
    account(name: $name) {
      actions(filterBy: $filterBy, size: 9999) {
        actions {
          ...ACTIONS_FRAGMENT
        }
        pageInfo {
          filterBy
          filters
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
export function getAccountActionsList(Container: ComponentType<*>, accountName: string, t: Function) {
  return (
    <Query ssr={false} query={GET_ACCOUNT_ACTIONS} variables={{ name: accountName }} notifyOnNetworkStatusChange>
      {({ loading, error, data, fetchMore }) => {
        if (error)
          return (
            <Container column center>
              <Title>
                <Tooltip t={t} field="Actions" />
              </Title>
              {error.message}
            </Container>
          );
        if (loading && size(data) === 0)
          return (
            <Container column center>
              <Title>
                <Tooltip t={t} field="Actions" />
              </Title>
              <Spin tip={t('Connecting')} spinning={loading} size="large" />
            </Container>
          );
        if (!data?.account?.actions?.actions)
          return (
            <Container column>
              <Title>
                <Tooltip t={t} field="Actions" />
              </Title>
              {t('noResult')}
            </Container>
          );
        const {
          account: {
            actions: {
              actions,
              pageInfo: { filterBy, filters },
            },
          },
        } = data;
        return (
          <Container column>
            <Title>
              <Tooltip t={t} field="Actions" />
              {loading && (
                <span>
                  <Spin indicator={<Icon type="loading" style={{ fontSize: 16 }} spin />} />
                  {t('Syncing')}
                </span>
              )}
            </Title>
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
              {filters.name.map(actionName => (
                <Select.Option key={actionName}>{t(`action:${actionName}`)}</Select.Option>
              ))}
            </Select>

            <ActionsList actions={actions} accountName={accountName} t={t} />
          </Container>
        );
      }}
    </Query>
  );
}
