// @flow
import React, { Component } from 'react';
import { Spin, Table } from 'antd';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
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
        createdAt
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
      <Query query={GET_TOKENS_LIST} notifyOnNetworkStatusChange>
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
            tokens: {
              tokens,
              pageInfo: { page, totalElements },
            },
          } = data;
          return (
            <Spin tip="Connecting" spinning={loading} size="large">
              <ProducerListContainer column>
                <Table
                  scroll={{ x: 500 }}
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
                    dataIndex="createdAt"
                    key="createdAt"
                    render={timeStamp => formatTimeStamp(timeStamp, t('locale'))}
                  />
                </Table>
              </ProducerListContainer>
            </Spin>
          );
        }}
      </Query>
    );
  }
}

<<<<<<< HEAD
const mapState = ({ token: { list }, info: { loading } }): Store => ({
  list,
  loading,
});
const mapDispatch = ({ token: { getTokens } }): Dispatch => ({
  getTokens,
});
const frontload = async ({ loading, list, getTokens }: Store & Dispatch) => {
  // 如果处于切换路由自动载入数据的逻辑无法覆盖到的地方，比如测试环境，那么自动加载数据
  if (!loading && list.length === 0) {
    return getTokens();
  }
  return Promise.resolve();
};
export default translate('token')(
  connect(
    mapState,
    mapDispatch,
  )(
    frontloadConnect(frontload, {
      onUpdate: false,
    })(Tokens),
  ),
);
=======
export default translate('token')(Tokens);
>>>>>>> master
