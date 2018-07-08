// @flow
import { truncate } from 'lodash';
import React, { PureComponent } from 'react';
import { Spin, Table } from 'antd';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { getPageSize } from '../../store/utils';
import { ListContainer } from '../../components/Table';

type Props = {
  t: Function,
};
const GET_WIKIS_LIST = gql`
  query GET_WIKIS_LIST($page: Int) {
    wikis(page: $page) {
      wikis {
        field
        title
        titleZh
      }
      pageInfo {
        totalElements
        page
        size
      }
    }
  }
`;

class Wikis extends PureComponent<Props> {
  render() {
    const { t } = this.props;
    return (
      <Query query={GET_WIKIS_LIST} notifyOnNetworkStatusChange>
        {({ loading, error, data, fetchMore }) => {
          if (error) return <ListContainer column>{error.message}</ListContainer>;
          if (loading)
            return (
              <Spin tip={t('Connecting')} spinning={loading} size="large">
                <ListContainer />
              </Spin>
            );
          const {
            wikis: {
              wikis,
              pageInfo: { page, totalElements },
            },
          } = data;
          return (
            <Spin tip="Connecting" spinning={loading} size="large">
              <ListContainer column>
                <Table
                  scroll={{ x: 1000 }}
                  size="middle"
                  dataSource={wikis}
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
                    title={t('field')}
                    dataIndex="field"
                    key="field"
                    render={field => <Link to={`/wiki/${field}/`}>{field}</Link>}
                  />
                  <Table.Column
                    title={t('titleZh')}
                    dataIndex="titleZh"
                    key="titleZh"
                    render={(titleZh, { field }) => <Link to={`/wiki/${field}/`}>{titleZh}</Link>}
                  />
                  <Table.Column
                    title={t('title')}
                    dataIndex="title"
                    key="title"
                    render={(title, { field }) => <Link to={`/wiki/${field}/`}>{title}</Link>}
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

export default translate('wiki')(Wikis);
