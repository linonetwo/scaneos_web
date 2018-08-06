// @flow
import React, { Component } from 'react';
import { Spin, Table } from 'antd';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet';

import { getPageSize, formatTimeStamp } from '../../store/utils';

import { ProducerListContainer } from '../../components/Containers';

type Props = {
  t: Function,
};
const GET_TOKENS_LIST = gql`
  query GET_TOKENS_LIST($page: Int) {
    tokens(page: $page, size: ${getPageSize() * 4}) {
      tokens {
        issuer
        maximumSupply
        timestamp
      }
      pageInfo {
        totalPages
        totalElements
        page
        size
      }
    }
  }
`;
class Tokens extends Component<Props> {
  render() {
    const { t } = this.props;
    return (
      <ProducerListContainer justifyCenter column>
        <Helmet>
          <title>
            EOS {t('Tokens')} | {t('webSiteTitle')}
          </title>
        </Helmet>
        <Query query={GET_TOKENS_LIST} notifyOnNetworkStatusChange>
          {({ loading, error, data, fetchMore }) => {
            if (error) return error.message;
            if (loading) return <Spin tip={t('Connecting')} spinning={loading} size="large" />;
            const {
              tokens: {
                tokens,
                pageInfo: { page, totalElements },
              },
            } = data;
            return (
              <Table
                scroll={{ x: 1200 }}
                size="middle"
                dataSource={tokens}
                rowKey="id"
                pagination={{
                  pageSize: getPageSize() * 4,
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
                  title={t('issuer')}
                  dataIndex="issuer"
                  key="issuer"
                  render={issuer => <Link to={`/account/${issuer}/`}>{issuer}</Link>}
                />
                <Table.Column title={t('maximumSupply')} dataIndex="maximumSupply" key="maximumSupply" />
                <Table.Column
                  title={t('createdAt')}
                  dataIndex="timestamp"
                  key="timestamp"
                  render={timeStamp => formatTimeStamp(timeStamp, t('locale'))}
                />
              </Table>
            );
          }}
        </Query>
      </ProducerListContainer>
    );
  }
}

export default translate('token')(Tokens);
