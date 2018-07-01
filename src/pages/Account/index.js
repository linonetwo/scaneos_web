// @flow
import { omit } from 'lodash';
import React, { Fragment } from 'react';
import { Spin, Tabs, Icon } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withRouter, Redirect } from 'react-router-dom';
import { translate } from 'react-i18next';

import { getBreadcrumb } from '../../components/Layout';
import { Container, DetailTabsContainer } from '../../components/Layout/Containers';
import { LongListContainer } from '../../components/Table';
import { AccountDataOverview, AccountDashboard, ACCOUNT_DASHBOARD_FRAGMENT } from '../../components/AccountDashboard';
import { PRODUCER_INFO_FRAGMENT } from '../BlockProducer';

type Props = {
  t: Function,
  match: {
    params: {
      accountName: string,
    },
  },
};
const GET_ACCOUNT_DETAIL = gql`
  query GET_ACCOUNT_DETAIL($name: String!) {
    account(name: $name) {
      ...ACCOUNT_DASHBOARD_FRAGMENT
      actions {
        actions {
          name
          data
          transactionID
          createdAt
        }
      }
      producerInfo {
        ...PRODUCER_INFO_FRAGMENT
      }
    }
  }
  ${ACCOUNT_DASHBOARD_FRAGMENT}
  ${PRODUCER_INFO_FRAGMENT}
`;

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
        const { account, actions, producerInfo } = data;
        if (producerInfo) return <Redirect to={`/producer/${accountName}`} />;
        const rawAccountData = omit(account, ['actions', 'producerInfo']);
        return (
          <Fragment>
            {getBreadcrumb('account', t)}
            <DetailTabsContainer>
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
                    <AccountDashboard data={rawAccountData} />
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
                    <AccountDataOverview data={rawAccountData} />
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
                    <code>{JSON.stringify(rawAccountData, null, '  ')}</code>
                  </pre>
                </Tabs.TabPane>
              </Tabs>
            </DetailTabsContainer>
          </Fragment>
        );
      }}
    </Query>
  );
}

export default withRouter(translate('account')(Account));
