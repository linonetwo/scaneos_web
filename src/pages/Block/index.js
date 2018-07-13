// @flow
import { toPairs, truncate } from 'lodash';
import React, { PureComponent, Fragment } from 'react';
import { Spin, Table, Tabs, Icon } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet';

import { formatTimeStamp } from '../../store/utils';
import { getBreadcrumb } from '../../components/Layout';
import { DetailTabsContainer, ListContainer } from '../../components/Containers';
import { LongListContainer, NoData, Title } from '../../components/Table';
import getListValueRendering from '../../components/getListValueRendering';
import { TRANSACTIONS_LIST_FRAGMENT } from '../Transactions';

type Props = {
  match: {
    params: {
      blockNumOrID: string,
    },
  },
  t: Function,
};
export const BLOCK_DETAIL_FRAGMENT = gql`
  fragment BLOCK_DETAIL_FRAGMENT on Block {
    blockID
    blockNum
    transactionNum
    producerAccountID
    timestamp
    pending
    transactionMerkleRoot
  }
`;
const GET_BLOCK_DETAIL = gql`
  query GET_BLOCK_DETAIL($blockNumOrID: String!) {
    block(blockNumOrID: $blockNumOrID) {
      ...BLOCK_DETAIL_FRAGMENT
    }
  }
  ${BLOCK_DETAIL_FRAGMENT}
`;
const GET_BLOCK_TRANSACTIONS = gql`
  query GET_BLOCK_TRANSACTIONS($blockNumOrID: String!) {
    block(blockNumOrID: $blockNumOrID) {
      transactions {
        transactions {
          ...TRANSACTIONS_LIST_FRAGMENT
        }
      }
    }
  }
  ${TRANSACTIONS_LIST_FRAGMENT}
`;

class Block extends PureComponent<Props> {
  render() {
    const { t, match } = this.props;
    const { blockNumOrID } = match.params;
    return (
      <Fragment>
        {getBreadcrumb('block', t)}
        <Helmet>
          <title>
            EOS {t('blockInfo')} {blockNumOrID} | {t('webSiteTitle')}
          </title>
        </Helmet>
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
            const { block } = data;
            return (
              <DetailTabsContainer column>
                <Title>{blockNumOrID}</Title>
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
                <Query ssr={false} query={GET_BLOCK_TRANSACTIONS} variables={{ blockNumOrID }}>
                  {result => {
                    if (result.error)
                      return (
                        <DetailTabsContainer column alignCenter>
                          <Title>{t('Transactions')}</Title>
                          {result.error.message}
                        </DetailTabsContainer>
                      );
                    if (result.loading)
                      return (
                        <DetailTabsContainer column alignCenter>
                          <Title>{t('Transactions')}</Title>
                          <Spin tip={t('Connecting')} spinning={result.loading} size="large" />
                        </DetailTabsContainer>
                      );
                    if (!result?.data?.block?.transactions?.transactions)
                      return (
                        <DetailTabsContainer column alignCenter>
                          <Title>{t('Transactions')}</Title>
                          <NoData>{t('noResult')}</NoData>
                        </DetailTabsContainer>
                      );
                    const {
                      block: {
                        transactions: { transactions },
                      },
                    } = result.data;

                    return (
                      <ListContainer column>
                        <Title>{t('Transactions')}</Title>
                        <Table scroll={{ x: 1200 }} size="middle" dataSource={transactions} rowKey="id">
                          <Table.Column
                            title={t('transactionID')}
                            dataIndex="transactionID"
                            key="transactionID"
                            render={transactionID => (
                              <Link to={`/transaction/${transactionID}/`}>
                                {truncate(transactionID, { length: 14, omission: '..' })}
                              </Link>
                            )}
                          />
                          <Table.Column
                            title={t('createdAt')}
                            dataIndex="createdAt"
                            key="createdAt"
                            render={timeStamp => formatTimeStamp(timeStamp, t('locale'))}
                          />
                          <Table.Column title={t('actionNum')} dataIndex="actionNum" key="actionNum" />
                          <Table.Column
                            title={t('blockID')}
                            dataIndex="blockID"
                            key="blockID"
                            render={blockID => (
                              <Link to={`/block/${blockID}/`}>{truncate(blockID, { length: 14, omission: '..' })}</Link>
                            )}
                          />
                        </Table>
                      </ListContainer>
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

export default withRouter(translate(['block', 'transaction'])(Block));
