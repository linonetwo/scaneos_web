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
import { LongListContainer, NoData } from '../../components/Table';
import getListValueRendering from '../../components/getListValueRendering';

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
    name
    data
    transactionID
    createdAt
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

class Action extends PureComponent<Props> {
  render() {
    const { t, match } = this.props;
    const { actionID } = match.params;
    return (
      <Fragment>
        {getBreadcrumb('action', t)}
        <Query query={GET_ACTION_DETAIL} variables={{ id: actionID }}>
          {({ loading, error, data }) => {
            if (error) return <DetailTabsContainer>{error.message}</DetailTabsContainer>;
            if (loading)
              return (
                <Spin tip={t('Connecting')} spinning={loading} size="large">
                  <DetailTabsContainer />
                </Spin>
              );
            const { action } = data;
            if (!action) return <NoData>{t('noResult')}</NoData>;
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
                        dataSource={toPairs(action).map(([field, value]) => ({ field, value, key: field }))}
                      >
                        <Table.Column title={t('field')} dataIndex="field" key="field" render={t} />
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
              </DetailTabsContainer>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default withRouter(translate('action')(Action));
