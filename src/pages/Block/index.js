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
  match: {
    params: {
      blockNumOrID: string,
    },
  },
  t: Function,
};
const GET_BLOCK_DETAIL = gql`
  query GET_BLOCK_DETAIL($blockNumOrID: String!) {
    block(blockNumOrID: $blockNumOrID) {
      blockID
      blockNum
      transactionNum
      producerAccountID
      timestamp
      pending
      transactionMerkleRoot
      transactions {
        transactions {
          transactionID
          actionNum
          status
          expiration
          pending
          createdAt
        }
      }
    }
  }
`;

class Block extends PureComponent<Props> {
  render() {
    const { t, match } = this.props;
    const { blockNumOrID } = match.params;
    return (
      <Query query={GET_BLOCK_DETAIL} variables={{ blockNumOrID }}>
        {({ loading, error, data }) => {
          if (error) return <DetailTabsContainer>{error.message}</DetailTabsContainer>;
          if (loading)
            return (
              <Spin tip={t('Connecting')} spinning={loading} size="large">
                <DetailTabsContainer />
              </Spin>
            );
          if (!data.block) return <NoData>{t('noResult')}</NoData>;
          const {
            block: {
              transactions: { transactions },
              ...block
            },
          } = data;
          return (
            <Fragment>
              {getBreadcrumb('block', t)}
              <DetailTabsContainer>
                <Tabs defaultActiveKey="data">
                  <Tabs.TabPane
                    tab={
                      <span>
                        <Icon type="database" />
                        {t('Overview')}
                      </span>
                    }
                    key="data"
                  >
                    <LongListContainer column>
                      <Table
                        scroll={{ x: 800 }}
                        size="middle"
                        pagination={false}
                        dataSource={toPairs(block).map(([field, value]) => ({ field, value, key: field }))}
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
                      <code>{JSON.stringify(block, null, '  ')}</code>
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
}

export default withRouter(translate(['block', 'transaction'])(Block));
