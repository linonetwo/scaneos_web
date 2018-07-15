// @flow
import { toUpper } from 'lodash';
import numeral from 'numeral';
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import { Table, Spin } from 'antd';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet';

import { getPageSize } from '../../store/utils';
import { ProducerListContainer } from '../../components/Containers';

type Props = {
  t: Function,
};
const GET_PRODUCER_LIST = gql`
  query GET_PRODUCER_LIST($page: Int, $filterBy: JSON) {
    producers(page: $page, size: ${getPageSize() * 2}, filterBy: $filterBy) {
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
        filterBy
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
      <ProducerListContainer justifyCenter column>
        <Helmet>
          <title>
            EOS {t('BlockProducers')} | {t('webSiteTitle')}
          </title>
        </Helmet>
        <Query query={GET_PRODUCER_LIST} notifyOnNetworkStatusChange>
          {({ loading, error, data, fetchMore }) => {
            if (error) return error.message;
            if (loading) return <Spin tip={t('Connecting')} spinning={loading} size="large" />;
            const {
              producers: {
                producers,
                pageInfo: { page, totalElements, filterBy },
              },
              status: { totalProducerVoteWeight },
            } = data;
            return (
              <Table
                scroll={{ x: 1200 }}
                size="small"
                dataSource={producers}
                pagination={{
                  pageSize: getPageSize() * 2,
                  current: page + 1,
                  total: totalElements,
                }}
                onChange={({ current: nextPageInPagination }, nextFilterBy) =>
                  fetchMore({
                    variables: {
                      page: nextPageInPagination - 1,
                      filterBy: nextFilterBy,
                    },
                    updateQuery: (prev, { fetchMoreResult }) => fetchMoreResult,
                  })
                }
              >
                <Table.Column width={40} title={t('rank')} dataIndex="rank" key="rank" />
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
                  filteredValue={filterBy?.location || []}
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
                />
                <Table.Column title={t('homepage')} dataIndex="homepage" />
              </Table>
            );
          }}
        </Query>
      </ProducerListContainer>
    );
  }
}

export default translate('bp')(BlockProducers);
