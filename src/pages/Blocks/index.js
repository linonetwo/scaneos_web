// @flow
import { truncate } from 'lodash';
import React, { Component } from 'react';
import { Spin, Table } from 'antd';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { getPageSize, formatTimeStamp } from '../../store/utils';
import { ListContainer } from '../../components/Containers';

type Props = {
  t: Function,
};
const GET_BLOCKS_LIST = gql`
  query GET_BLOCKS_LIST($page: Int) {
    blocks(page: $page, size: ${getPageSize()}) {
      blocks {
        blockID
        blockNum
        transactionNum
        producerAccountID
        timestamp
        pending
      }
      pageInfo {
        page
        totalElements
      }
    }
  }
`;

class Blocks extends Component<Props> {
  render() {
    const { t } = this.props;
    return (
      <Query query={GET_BLOCKS_LIST} notifyOnNetworkStatusChange>
        {({ loading, error, data, fetchMore }) => {
          if (error) return <ListContainer column>{error.message}</ListContainer>;
          if (loading)
            return (
              <Spin tip={t('Connecting')} spinning={loading} size="large">
                <ListContainer />
              </Spin>
            );
          const {
            blocks: {
              blocks,
              pageInfo: { page, totalElements },
            },
          } = data;
          return (
            <Spin tip="Connecting" spinning={loading} size="large">
              <ListContainer column>
                <Table
                  scroll={{ x: 1000 }}
                  size="middle"
                  dataSource={blocks}
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
                    title={t('blockNum')}
                    dataIndex="blockNum"
                    key="blockNum"
                    render={blockNum => <Link to={`/block/${blockNum}/`}>{blockNum}</Link>}
                  />
                  <Table.Column
                    title={t('blockID')}
                    dataIndex="blockID"
                    key="blockID"
                    render={blockID => (
                      <Link to={`/transaction/${blockID}/`}>{truncate(blockID, { length: 14, omission: '..' })}</Link>
                    )}
                  />
                  <Table.Column
                    title={t('timestamp')}
                    dataIndex="timestamp"
                    key="timestamp"
                    render={timestamp => formatTimeStamp(timestamp, t('locale'))}
                  />
                  <Table.Column title={t('transactionNum')} dataIndex="transactionNum" key="transactionNum" />
                  <Table.Column
                    title={t('producerAccountID')}
                    dataIndex="producerAccountID"
                    key="producerAccountID"
                    render={producerAccountID => <Link to={`/account/${producerAccountID}/`}>{producerAccountID}</Link>}
                  />
                  <Table.Column
                    title={t('pending')}
                    dataIndex="pending"
                    key="pending"
                    render={value => t(String(value))}
                  />
                </Table>
              </ListContainer>
            </Spin>
          );
        }}
      </Query>
    );
  }
}

export default translate('block')(Blocks);
