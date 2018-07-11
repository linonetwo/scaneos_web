// @flow
import { truncate } from 'lodash';
import React, { PureComponent } from 'react';
import { Spin, Table } from 'antd';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { getPageSize, formatTimeStamp } from '../../store/utils';
import { ListContainer } from '../../components/Table';

type Props = {
  t: Function,
};
const GET_NAME_AUCTION_LIST = gql`
  query GET_NAME_AUCTION_LIST($page: Int) {
    nameAuctions(page: $page, size: ${getPageSize()}) {
      nameAuctions {
        highBidder
        highBid
        lastBidTime
        newName
      }
      pageInfo {
        page
        totalElements
      }
    }
  }
`;

class NameAuctions extends PureComponent<Props> {
  render() {
    const { t } = this.props;
    return (
      <Query query={GET_NAME_AUCTION_LIST} notifyOnNetworkStatusChange>
        {({ loading, error, data, fetchMore }) => {
          if (error) return <ListContainer column>{error.message}</ListContainer>;
          if (loading)
            return (
              <Spin tip={t('Connecting')} spinning={loading} size="large">
                <ListContainer />
              </Spin>
            );
          const {
            nameAuctions: {
              nameAuctions,
              pageInfo: { page, totalElements },
            },
          } = data;
          return (
            <ListContainer column>
              <Table
                scroll={{ x: 1200 }}
                size="middle"
                dataSource={nameAuctions}
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
                  title={t('newName')}
                  dataIndex="newName"
                  key="newName"
                  render={newName => (
                    <Link to={`/auction/${newName}/`}>{truncate(newName, { length: 14, omission: '..' })}</Link>
                  )}
                />
                <Table.Column
                  title={t('highBidder')}
                  dataIndex="highBidder"
                  key="highBidder"
                  render={(highBidder, { highBid }) => (
                    <Link to={`/account/${highBidder}/`}>
                      {highBidder} {t('offerBid')} {highBid}EOS
                    </Link>
                  )}
                />
                <Table.Column
                  title={t('updatedAt')}
                  dataIndex="lastBidTime"
                  key="lastBidTime"
                  render={lastBidTime => formatTimeStamp(lastBidTime, t('locale'))}
                />
              </Table>
            </ListContainer>
          );
        }}
      </Query>
    );
  }
}

export default translate('account')(NameAuctions);
