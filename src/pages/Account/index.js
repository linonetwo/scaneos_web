// @flow
import React, { Fragment } from 'react';
import { Spin, Tabs, Icon } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withRouter, Redirect } from 'react-router-dom';
import { translate } from 'react-i18next';

import { getBreadcrumb } from '../../components/Layout';
import { Container, DetailTabsContainer, ActionsContainer } from '../../components/Containers';
import { LongListContainer } from '../../components/Table';
import { AccountDataOverview, AccountDashboard, ACCOUNT_DASHBOARD_FRAGMENT } from './AccountDashboard';
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
      actions {
        actions {
          ...ACTIONS_FRAGMENT
        }
      }
      producerInfo {
        ...PRODUCER_INFO_FRAGMENT
      }
      permissions {
        ...ACCOUNT_PERMISSION_FRAGMENT
      }
    }
  }
  ${ACCOUNT_DASHBOARD_FRAGMENT}
  ${ACTIONS_FRAGMENT}
  ${PRODUCER_INFO_FRAGMENT}
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
          account: {
            actions: { actions },
            producerInfo,
            ...account
          },
        } = data;
        if (producerInfo) return <Redirect to={`/producer/${accountName}`} />;
        return (
          <Fragment>
            {getBreadcrumb('account', t)}
            <DetailTabsContainer column>
              {getAccountDetails(account, t)}
              <ActionsContainer column>
                <ActionsList actions={actions} />
              </ActionsContainer>
            </DetailTabsContainer>
          </Fragment>
        );
      }}
    </Query>
  );
}

export default withRouter(translate('account')(Account));
