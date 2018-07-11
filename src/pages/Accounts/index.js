// @flow
import React, { PureComponent } from 'react';
import { Spin, Table } from 'antd';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import prettySize from 'prettysize';

import { getPageSize } from '../../store/utils';
import { ListContainer } from '../../components/Table';

type Props = {
  t: Function,
};
const GET_ACCOUNT_LIST = gql`
  query GET_ACCOUNT_LIST($page: Int, $sortBy: String) {
    accounts(sortBy: $sortBy, page: $page, size: ${getPageSize()}) {
      accounts {
        accountName
        eosBalance
        eosStaked
        ram {
          max
        }
        cpu {
          weight
        }
        net {
          weight
        }
      }
      pageInfo {
        page
        totalElements
        sortBy
      }
    }
  }
`;

class Accounts extends PureComponent<Props> {
  render() {
    const { t } = this.props;
    return (
      <Query query={GET_ACCOUNT_LIST} variables={{ sortBy: 'eos' }} notifyOnNetworkStatusChange>
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
              pageInfo: { page, totalElements, sortBy },
            },
          } = data;
          return (
            <ListContainer column>
              <Table
                scroll={{ x: 1200 }}
                size="middle"
                dataSource={accounts}
                rowKey="id"
                pagination={{
                  pageSize: getPageSize(),
                  current: page + 1,
                  total: totalElements,
                }}
                onChange={({ current: nextPageInPagination }, filter, { columnKey: nextSortBy }) =>
                  fetchMore({
                    variables: {
                      page: nextPageInPagination - 1,
                      sortBy: nextSortBy,
                    },
                    updateQuery: (prev, { fetchMoreResult }) => fetchMoreResult,
                  })
                }
              >
                <Table.Column
                  title={t('name')}
                  dataIndex="accountName"
                  key="accountName"
                  render={accountName => <Link to={`/account/${accountName}/`}>{accountName}</Link>}
                />
                <Table.Column
                  sortOrder={sortBy === 'eos' && 'descend'}
                  sorter
                  title={t('eosBalance')}
                  dataIndex="eosBalance"
                  key="eos"
                  render={eosBalance => `${eosBalance} EOS`}
                />
                <Table.Column
                  sortOrder={sortBy === 'staked' && 'descend'}
                  sorter
                  title={t('eosStaked')}
                  dataIndex="eosStaked"
                  key="staked"
                  render={eosStaked => `${eosStaked} EOS`}
                />
                <Table.Column
                  sortOrder={sortBy === 'ram' && 'descend'}
                  sorter
                  title={t('ramMax')}
                  dataIndex="ram"
                  key="ram"
                  render={({ max }) => prettySize(max, true, true, 3)}
                />
                <Table.Column
                  sortOrder={sortBy === 'net' && 'descend'}
                  sorter
                  title={t('netWeight')}
                  dataIndex="net"
                  key="net"
                  render={({ weight }) => `${weight} EOS`}
                />
                <Table.Column
                  sortOrder={sortBy === 'cpu' && 'descend'}
                  sorter
                  title={t('cpuWeight')}
                  dataIndex="cpu"
                  key="cpu"
                  render={({ weight }) => `${weight} EOS`}
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
