// @flow
import { toPairs, truncate } from 'lodash';
import React, { PureComponent, Fragment } from 'react';
import { Spin, Table, Tabs, Icon } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loadable from 'react-loadable';
import { Helmet } from 'react-helmet';

import { getBreadcrumb } from '../../components/Layout';
import { DetailTabsContainer, Container } from '../../components/Containers';
import { LongListContainer, NoData, Title } from '../../components/Table';
import getListValueRendering from '../../components/getListValueRendering';
import Loading from '../../components/Loading';

const ActionsDashboard = Loadable({
  loader: () => import(/* webpackChunkName: "ActionsDashboard" */ './ActionsDashboard'),
  loading: Loading,
  modules: ['ActionsDashboard'],
});
const ActionsList = Loadable({
  loader: () => import(/* webpackChunkName: "ActionsList" */ './ActionsList'),
  loading: Loading,
  modules: ['ActionsList'],
});

type Props = {
  t: Function,
  match: {
    params: {
      actionID: string,
    },
  },
};

export const ACTIONS_FRAGMENT = gql`
  fragment ACTIONS_FRAGMENT on Action {
    id
    name
    data
    transactionID
    timestamp
    authorization {
      permission
      actor
    }
    handlerAccountName
  }
`;
const GET_ACTION_DETAIL = gql`
  query GET_ACTION_DETAIL($id: String!) {
    action(id: $id) {
      ...ACTIONS_FRAGMENT
    }
  }
  ${ACTIONS_FRAGMENT}
`;
const GET_RELATED_TRANSACTION_ACTIONS = gql`
  query GET_TRANSACTION_DETAIL($id: String!) {
    transaction(id: $id) {
      actions {
        actions {
          ...ACTIONS_FRAGMENT
        }
      }
    }
  }
  ${ACTIONS_FRAGMENT}
`;

class Action extends PureComponent<Props> {
  render() {
    const { t, match } = this.props;
    const { actionID } = match.params;
    return (
      <Fragment>
        {getBreadcrumb('action', t)}
        <Helmet>
          <title>
            EOS {t('Action')} | {t('webSiteTitle')}
          </title>
        </Helmet>
        <Query query={GET_ACTION_DETAIL} variables={{ id: actionID }}>
          {({ loading, error, data }) => {
            if (error)
              return (
                <Container center column>
                  {error.message}
                </Container>
              );
            if (loading)
              return (
                <Container center column>
                  <Spin tip={t('Connecting')} spinning={loading} size="large" />
                </Container>
              );
            const { action } = data;
            if (!action)
              return (
                <Container center column>
                  <NoData>{t('noResult')}</NoData>
                </Container>
              );
            return (
              <DetailTabsContainer column>
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
                      <ActionsDashboard action={action} t={t} />
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
                    <LongListContainer column>
                      <Table
                        size="middle"
                        pagination={false}
                        dataSource={toPairs(action).map(([field, value]) => ({ field, value, key: field }))}
                      >
                        <Table.Column width={100} title={t('field')} dataIndex="field" key="field" render={t} />
                        <Table.Column
                          title={t('value')}
                          dataIndex="value"
                          key="value"
                          render={(value, { field }) => getListValueRendering(field, value, t)}
                        />
                      </Table>
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
                      <code>{JSON.stringify(action, null, '  ')}</code>
                    </pre>
                  </Tabs.TabPane>
                </Tabs>

                {/* 相关消息 */}
                <Query ssr={false} query={GET_RELATED_TRANSACTION_ACTIONS} variables={{ id: action.transactionID }}>
                  {result => {
                    if (result.error)
                      return (
                        <Container column center>
                          <Title>
                            <Link to={`/transaction/${action.transactionID}`}>
                              {truncate(action.transactionID, { length: 15, omission: '...' })}
                            </Link>{' '}
                            {t('ActionsInSameTransaction')}
                          </Title>
                          {result.error.message}
                        </Container>
                      );
                    if (result.loading)
                      return (
                        <Container column alignCenter>
                          <Title>
                            <Link to={`/transaction/${action.transactionID}`}>
                              {truncate(action.transactionID, { length: 15, omission: '...' })}
                            </Link>{' '}
                            {t('ActionsInSameTransaction')}
                          </Title>
                          <Spin tip={t('Connecting')} spinning={result.loading} size="large" />
                        </Container>
                      );
                    if (!result.data.transaction)
                      return (
                        <Container column>
                          <Title>
                            <Link to={`/transaction/${action.transactionID}`}>
                              {truncate(action.transactionID, { length: 15, omission: '...' })}
                            </Link>{' '}
                            {t('ActionsInSameTransaction')}
                          </Title>
                          {t('noResult')}
                        </Container>
                      );
                    const {
                      transaction: {
                        actions: { actions },
                      },
                    } = result.data;
                    return (
                      <Container column>
                        <Title>
                          <Link to={`/transaction/${action.transactionID}`}>
                            {truncate(action.transactionID, { length: 15, omission: '...' })}
                          </Link>{' '}
                          {t('ActionsInSameTransaction')}
                        </Title>
                        <ActionsList actions={actions} t={t} />
                      </Container>
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
}

export default withRouter(translate('action')(Action));
