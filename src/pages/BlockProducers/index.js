// @flow
import { toUpper } from 'lodash';
import numeral from 'numeral';
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import { Table, Spin } from 'antd';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { getPageSize, locationBelongsToArea } from '../../store/utils';
import { ProducerListContainer } from '../../components/Containers';

type Props = {
  t: Function,
};
const GET_PRODUCER_LIST = gql`
  query GET_PRODUCER_LIST($page: Int) {
    producers(page: $page, size: ${getPageSize() * 2}) {
      producers {
        rank
        name
        account
        totalVotes
        location
        homepage
      }
      pageInfo {
        page
        totalElements
      }
    }
    status {
      totalProducerVoteWeight
    }
  }
`;

class BlockProducers extends PureComponent<Props> {
  render() {
    const { t } = this.props;
    return (
      <Query query={GET_PRODUCER_LIST} notifyOnNetworkStatusChange>
        {({ loading, error, data, fetchMore }) => {
          if (error)
            return (
              <ProducerListContainer center column>
                {error.message}
              </ProducerListContainer>
            );
          if (loading)
            return (
              <ProducerListContainer center>
                <Spin tip={t('Connecting')} spinning={loading} size="large" />
              </ProducerListContainer>
            );
          const {
            producers: {
              producers,
              pageInfo: { page, totalElements },
            },
            status: { totalProducerVoteWeight },
          } = data;
          return (
            <ProducerListContainer>
              <Table
                scroll={{ x: 1000 }}
                size="small"
                dataSource={producers}
                pagination={{
                  pageSize: getPageSize() * 2,
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
                <Table.Column width={15} title={t('rank')} dataIndex="rank" key="rank" />
                <Table.Column
                  title={t('name')}
                  dataIndex="name"
                  key="name"
                  render={(name, { account }) =>
                    name ? (
                      <Link to={`/producer/${account}`}>{name}</Link>
                    ) : (
                      <Link to={`/producer/${account}`}>{toUpper(account)}</Link>
                    )
                  }
                />
                <Table.Column
                  title={t('EOSVotes')}
                  dataIndex="totalVotes"
                  key="totalVotes"
                  render={totalVotes => (
                    <span>
                      {toUpper(numeral(totalVotes).format('(0,0a)'))}
                      <strong>
                        {totalProducerVoteWeight > 0
                          ? ` (${
                              totalVotes / totalProducerVoteWeight > 0.001
                                ? numeral(totalVotes)
                                    .divide(totalProducerVoteWeight)
                                    .format('0.00%')
                                : '0%'
                            })`
                          : ''}
                      </strong>
                    </span>
                  )}
                />
                <Table.Column
                  title={t('account')}
                  dataIndex="account"
                  key="account"
                  render={account => <Link to={`/producer/${account}`}>{account}</Link>}
                />
                <Table.Column
                  title={t('country')}
                  dataIndex="location"
                  filters={[
                    {
                      text: t('China'),
                      value: 'China',
                    },
                    {
                      text: t('Asia'),
                      value: 'Asia',
                    },
                    {
                      text: t('America'),
                      value: 'America',
                    },
                    {
                      text: t('Europe'),
                      value: 'Europe',
                    },
                    {
                      text: t('Oceania'),
                      value: 'Oceania',
                    },
                    {
                      text: t('Africa'),
                      value: 'Africa',
                    },
                  ]}
                  onFilter={(area, record) =>
                    (record.location && String(record.location).indexOf(area) !== -1) ||
                    locationBelongsToArea(String(record.location), area)
                  }
                />
                <Table.Column title={t('homepage')} dataIndex="homepage" />
              </Table>
            </ProducerListContainer>
          );
        }}
      </Query>
    );
  }
}

export default translate('bp')(BlockProducers);
