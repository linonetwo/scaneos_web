// @flow
import { toPairs } from 'lodash';
import React, { PureComponent, Fragment } from 'react';
import { Spin, Table, Tabs, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { getBreadcrumb } from '../../components/Layout';
import { DetailTabsContainer } from '../../components/Containers';
import { LongListContainer, NoData, Title } from '../../components/Table';
import getListValueRendering from '../../components/getListValueRendering';
import { ACTIONS_FRAGMENT } from '../Action';
import ActionsList from '../Action/ActionsList';

type Props = {
  t: Function,
  match: {
    params: {
      transactionID: string,
    },
  },
};
export const TRANSACTION_DETAIL_FRAGMENT = gql`
  fragment TRANSACTION_DETAIL_FRAGMENT on Transaction {
    transactionID
    blockID
    status
    expiration
    pending
    createdAt
    sequenceNum
    refBlockNum
    refBlockPrefix
  }
`;
const GET_TRANSACTION_DETAIL = gql`
  query GET_TRANSACTION_DETAIL($id: String!) {
    transaction(id: $id) {
      ...TRANSACTION_DETAIL_FRAGMENT
      actions {
        actions {
          ...ACTIONS_FRAGMENT
        }
      }
    }
  }
  ${TRANSACTION_DETAIL_FRAGMENT}
  ${ACTIONS_FRAGMENT}
`;
class Transaction extends PureComponent<Props, *> {
  render() {
    const { t, match } = this.props;
    const { transactionID } = match.params;
    return (
      <Fragment>
        {getBreadcrumb('transaction', t)}
        <Query query={GET_TRANSACTION_DETAIL} variables={{ id: transactionID }}>
          {({ loading, error, data }) => {
            if (error) return <DetailTabsContainer>{error.message}</DetailTabsContainer>;
            if (loading)
              return (
                <Spin tip={t('Connecting')} spinning={loading} size="large">
                  <DetailTabsContainer />
                </Spin>
              );
            if (!data.transaction) return <NoData>{t('noResult')}</NoData>;
            const {
              transaction: {
                actions: { actions },
                ...transaction
              },
            } = data;
            return (
              <DetailTabsContainer>
                <Tabs defaultActiveKey="overview">
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
                        dataSource={toPairs(transaction).map(([field, value]) => ({ field, value, key: field }))}
                      >
                        <Table.Column title={t('field')} dataIndex="field" key="field" render={t} />
                        <Table.Column
                          title={t('value')}
                          dataIndex="value"
                          key="value"
                          render={(value, { field }) => getListValueRendering(field, value, t)}
                        />
                      </Table>
                      <Title>{t('Actions')}</Title>
                      <ActionsList actions={actions || []} t={t} />
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
                      <code>{JSON.stringify(transaction, null, '  ')}</code>
                    </pre>
                  </Tabs.TabPane>
                </Tabs>
              </DetailTabsContainer>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default withRouter(translate(['transaction', 'action'])(Transaction));
