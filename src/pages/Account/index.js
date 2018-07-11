// @flow
import React, { Fragment } from 'react';
import { Spin, Tabs, Icon, Select } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withRouter, Redirect } from 'react-router-dom';
import { translate } from 'react-i18next';

import { getBreadcrumb } from '../../components/Layout';
import { Container, DetailTabsContainer, ActionsContainer } from '../../components/Containers';
import { LongListContainer } from '../../components/Table';
import {
  AccountDataOverview,
  AccountDashboard,
  ACCOUNT_DASHBOARD_FRAGMENT,
  RESOURCE_PRICE_FRAGMENT,
} from './AccountDashboard';
import ActionsList from '../Action/ActionsList';
import { ACTIONS_FRAGMENT } from '../Action';

type Props = {
  t: Function,
  match: {
    params: {
      accountName: string,
    },
  },
};
export const PRODUCER_INFO_FRAGMENT = gql`
  fragment PRODUCER_INFO_FRAGMENT on BPInfo {
    rank
    image
    logo
    totalVotes
    isActive
    unpaidBlocks
    lastClaimTime
    nameZh
    name
    homepage
    contact
    account
    introductionZh
    introduction
    slogan
    sloganZh
    key
    organization
    nodes {
      location {
        name
      }
      isProducer
      p2pEndpoint
      apiEndpoint
      sslEndpoint
    }
    location
    locationZh
    latitude
    longitude
    organizationIntroduction
    organizationIntroductionZh
    coreteam
    others
  }
`;
export const GET_ACCOUNT_DETAIL = gql`
  query GET_ACCOUNT_DETAIL($name: String!) {
    account(name: $name) {
      ...ACCOUNT_DASHBOARD_FRAGMENT
      producerInfo {
        ...PRODUCER_INFO_FRAGMENT
      }
      permissions {
        ...ACCOUNT_PERMISSION_FRAGMENT
      }
    }
    resourcePrice {
      ...RESOURCE_PRICE_FRAGMENT
    }
  }
  ${ACCOUNT_DASHBOARD_FRAGMENT}
  ${PRODUCER_INFO_FRAGMENT}
  ${RESOURCE_PRICE_FRAGMENT}
  fragment ACCOUNT_PERMISSION_FRAGMENT on Permissions {
    permName
    parent
    requiredAuth {
      threshold
      keys {
        key
        weight
      }
      accounts {
        permission {
          actor
          permission
        }
        weight
      }
      waits
    }
  }
`;

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

export function getAccountDetails(accountData: Object, t: Function) {
  return (
    <Tabs defaultActiveKey="dashboard">
      <Tabs.TabPane
        tab={
          <span>
            <Icon type="solution" />
            {t('Dashboard')}
          </span>
        }
        key="dashboard"
      >
        <LongListContainer column>
          <AccountDashboard data={accountData} />
        </LongListContainer>
      </Tabs.TabPane>

      <Tabs.TabPane
        tab={
          <span>
            <Icon type="database" />
            {t('Overview')}
          </span>
        }
        key="overview"
      >
        <LongListContainer>
          <AccountDataOverview data={accountData} />
        </LongListContainer>
      </Tabs.TabPane>

      <Tabs.TabPane
        tab={
          <span>
            <Icon type="file-text" />
            {t('Raw')}
          </span>
        }
        key="raw"
      >
        <pre>
          <code>{JSON.stringify(accountData, null, '  ')}</code>
        </pre>
      </Tabs.TabPane>
    </Tabs>
  );
}

function Account({ t, match }: Props) {
  const { accountName } = match.params;
  return (
    <Fragment>
      {getBreadcrumb('account', t)}
      <Query query={GET_ACCOUNT_DETAIL} variables={{ name: accountName }}>
        {({ loading, error, data }) => {
          if (error) return <Container>{error.message}</Container>;
          if (loading)
            return (
              <Spin tip={t('Connecting')} spinning={loading} size="large">
                <Container />
              </Spin>
            );
          if (!data.account) return <Container>{t('noResult')}</Container>;
          const {
            account: { producerInfo, ...account },
            resourcePrice,
          } = data;
          if (producerInfo) return <Redirect to={`/producer/${accountName}`} />;
          return (
            <DetailTabsContainer column>
              {getAccountDetails({ ...account, ...resourcePrice }, t)}
              <Query ssr={false} query={GET_ACCOUNT_ACTIONS} variables={{ name: accountName }}>
                {({ loading: actionsLoading, error: actionsError, data: actionsData, fetchMore }) => {
                  if (actionsError) return <ActionsContainer center>{actionsError.message}</ActionsContainer>;
                  if (actionsLoading)
                    return (
                      <ActionsContainer center>
                        <Spin tip={t('Connecting')} spinning={actionsLoading} size="large" />
                      </ActionsContainer>
                    );
                  if (!actionsData.account) return <Container>{t('noResult')}</Container>;
                  const {
                    account: {
                      actions: {
                        actions,
                        pageInfo: { filterBy },
                      },
                    },
                  } = actionsData;
                  return (
                    <ActionsContainer column>
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
                        ].map(actionName => (
                          <Select.Option key={actionName}>{t(`action:${actionName}`)}</Select.Option>
                        ))}
                      </Select>
                      <ActionsList actions={actions} />
                    </ActionsContainer>
                  );
                }}
              </Query>
            </DetailTabsContainer>
          );
        }}
      </Query>
    </Fragment>
  );
}

export default withRouter(translate(['account', 'action'])(Account));
