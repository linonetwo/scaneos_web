// @flow
import { toUpper } from 'lodash';
import numeral from 'numeral';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';
import { translate } from 'react-i18next';
import { Table, Spin } from 'antd';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { getPageSize, locationBelongsToArea } from '../../store/utils';
import { ProducerListContainer } from '../../components/Table';

const Container = styled(Flex)`
  min-height: calc(100vh - 64px);
  width: 100%;
  background-color: rgb(250, 250, 250);

  .ant-table-thead > tr > th {
    line-height: 0.5;
    padding: 4px !important;
    ${breakpoint('desktop')`
      line-height: 1.5;
      padding: 8px !important;
    `};
  }
  .ant-table-row {
    line-height: 1;
    ${breakpoint('desktop')`
      line-height: 1.5;
    `};
    background-color: white;
  }
  .ant-table-row td,
  .ant-table-row td span {
    padding: 4px !important;

    white-space: nowrap;

    ${breakpoint('desktop')`
      padding: 8px !important;
    `};
  }
`;

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
          if (error) return <Container column>{error.message}</Container>;
          if (loading)
            return (
              <Spin tip={t('Connecting')} spinning={loading} size="large">
                <Container />
              </Spin>
            );
          const {
            producers: {
              producers,
              pageInfo: { page, totalElements },
            },
            status: { totalProducerVoteWeight },
          } = data;
          return (
            <Container column>
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
                  <Table.Column width={35} dataIndex="key" key="key" />
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
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default translate('bp')(BlockProducers);
