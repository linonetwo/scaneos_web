// @flow
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
const GET_ACCOUNT_LIST = gql`
  query GET_ACCOUNT_LIST($page: Int) {
    accounts(page: $page, size: ${getPageSize()}) {
      accounts {
        accountName
        createdAt
      }
      pageInfo {
        page
        totalElements
      }
    }
  }
`;

class Accounts extends PureComponent<Props> {
  render() {
    const { t } = this.props;
    return (
      <Query query={GET_ACCOUNT_LIST} notifyOnNetworkStatusChange>
        {({ loading, error, data, fetchMore }) => {
          if (error) return <ListContainer column>{error.message}</ListContainer>;
          if (loading)
            return (
              <Spin tip={t('Connecting')} spinning={loading} size="large">
                <ListContainer />
              </Spin>
            );
          const {
            accounts: {
              accounts,
              pageInfo: { page, totalElements },
            },
          } = data;
          return (
            <ListContainer column>
              <Table
                scroll={{ x: 500 }}
                size="middle"
                dataSource={accounts}
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
                  title={t('name')}
                  dataIndex="accountName"
                  key="accountName"
                  render={accountName => <Link to={`/account/${accountName}/`}>{accountName}</Link>}
                />
                <Table.Column
                  title={t('createdAt')}
                  dataIndex="createdAt"
                  key="createdAt"
                  render={createdAt => formatTimeStamp(createdAt, t('locale'))}
                />
              </Table>
            </ListContainer>
          );
        }}
      </Query>
    );
  }
}

export default translate('account')(Accounts);
