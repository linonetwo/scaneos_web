// @flow
import { truncate } from 'lodash';
import React, { PureComponent } from 'react';
import { Spin, Table } from 'antd';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { formatTimeStamp, getPageSize } from '../../store/utils';
import { ListContainer } from '../../components/Table';

type Props = {
  t: Function,
};
const GET_TRANSACTIONS_LIST = gql`
  query GET_TRANSACTIONS_LIST($page: Int) {
    transactions(page: $page, size: ${getPageSize()}) {
      transactions {
        transactionID
        blockID
        actionNum
        status
        expiration
        pending
        createdAt
      }
      pageInfo {
        page
        totalElements
      }
    }
  }
`;

class Transactions extends PureComponent<Props> {
  render() {
    const { t } = this.props;
    return (
      <Query query={GET_TRANSACTIONS_LIST} notifyOnNetworkStatusChange>
        {({ loading, error, data, fetchMore }) => {
          if (error) return <ListContainer column>{error.message}</ListContainer>;
          if (loading)
            return (
              <Spin tip={t('Connecting')} spinning={loading} size="large">
                <ListContainer />
              </Spin>
            );
          const {
            transactions: {
              transactions,
              pageInfo: { page, totalElements },
            },
          } = data;
          return (
            <ListContainer column>
              <Table
                scroll={{ x: 1000 }}
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
            </ListContainer>
          );
        }}
      </Query>
    );
  }
}

export default translate('transaction')(Transactions);
