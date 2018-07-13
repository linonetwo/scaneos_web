// @flow
import { truncate } from 'lodash';
import React, { PureComponent } from 'react';
import { Spin, Table } from 'antd';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet';

import { formatTimeStamp, getPageSize } from '../../store/utils';
import { ListContainer } from '../../components/Containers';

type Props = {
  t: Function,
};
export const TRANSACTIONS_LIST_FRAGMENT = gql`
  fragment TRANSACTIONS_LIST_FRAGMENT on Transaction {
    transactionID
    blockID
    actionNum
    status
    expiration
    pending
    createdAt
  }
`;
const GET_TRANSACTIONS_LIST = gql`
  query GET_TRANSACTIONS_LIST($page: Int) {
    transactions(page: $page, size: ${getPageSize()}) {
      transactions {
        ...TRANSACTIONS_LIST_FRAGMENT
      }
      pageInfo {
        page
        totalElements
      }
    }
  }
  ${TRANSACTIONS_LIST_FRAGMENT}
`;

class Transactions extends PureComponent<Props> {
  render() {
    const { t } = this.props;
    return (
      <ListContainer justifyCenter column>
        <Helmet>
          <title>
            EOS {t('Transactions')} | {t('webSiteTitle')}
          </title>
        </Helmet>
        <Query query={GET_TRANSACTIONS_LIST} notifyOnNetworkStatusChange>
          {({ loading, error, data, fetchMore }) => {
            if (error) return error.message;
            if (loading) return <Spin tip={t('Connecting')} spinning={loading} size="large" />;
            const {
              transactions: {
                transactions,
                pageInfo: { page, totalElements },
              },
            } = data;
            return (
              <Table
                scroll={{ x: 1200 }}
                size="middle"
                dataSource={transactions}
                rowKey="id"
                pagination={{
                  pageSize: getPageSize(),
                  current: page + 1,
                  total: totalElements,
                  onChange: nextPageInPagination =>
                    fetchMore({
                      variables: {
                        page: nextPageInPagination - 1,
                      },
                      updateQuery: (prev, { fetchMoreResult }) => fetchMoreResult,
                    }),
                }}
              >
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
            );
          }}
        </Query>
      </ListContainer>
    );
  }
}

export default translate('transaction')(Transactions);
