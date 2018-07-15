// @flow
import { truncate } from 'lodash';
import React, { Component } from 'react';
import { Spin, Table } from 'antd';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet';

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
      <ListContainer column justifyCenter>
        <Helmet>
          <title>
            EOS {t('Blocks')} | {t('webSiteTitle')}
          </title>
        </Helmet>
        <Query query={GET_BLOCKS_LIST} notifyOnNetworkStatusChange>
          {({ loading, error, data, fetchMore }) => {
            if (error) return error.message;
            if (loading) return <Spin tip={t('Connecting')} spinning={loading} size="large" />;
            const {
              blocks: {
                blocks,
                pageInfo: { page, totalElements },
              },
            } = data;
            return (
              <Table
                scroll={{ x: 1200 }}
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
                    <Link to={`/block/${blockID}/`}>{truncate(blockID, { length: 14, omission: '..' })}</Link>
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
                  render={producerAccountID => <Link to={`/producer/${producerAccountID}/`}>{producerAccountID}</Link>}
                />
                <Table.Column
                  title={t('pending')}
                  dataIndex="pending"
                  key="pending"
                  render={value => t(String(value))}
                />
              </Table>
            );
          }}
        </Query>
      </ListContainer>
    );
  }
}

export default translate('block')(Blocks);
