// @flow
import React, { PureComponent } from 'react';
import { Spin, Table } from 'antd';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet';

import { getPageSize } from '../../store/utils';
import { ListContainer } from '../../components/Containers';

type Props = {
  t: Function,
};
const GET_DICTIONARY = gql`
  query GET_DICTIONARY($page: Int) {
    dictionaryEntries(page: $page) {
      dictionaryEntries {
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

class Dictionary extends PureComponent<Props> {
  render() {
    const { t } = this.props;
    return (
      <ListContainer column justifyCenter>
        <Helmet>
          <title>
            EOS {t('Dictionary')} | {t('webSiteTitle')}
          </title>
        </Helmet>
        <Query query={GET_DICTIONARY} notifyOnNetworkStatusChange>
          {({ loading, error, data, fetchMore }) => {
            if (error) return error.message;
            if (loading) return <Spin tip={t('Connecting')} spinning={loading} size="large" />;
            const {
              dictionaryEntries: {
                dictionaryEntries,
                pageInfo: { page, totalElements },
              },
            } = data;
            return (
              <Table
                scroll={{ x: 1200 }}
                size="middle"
                dataSource={dictionaryEntries}
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
                  render={field => <Link to={`/dictionary/${field}/`}>{field}</Link>}
                />
                <Table.Column
                  title={t('titleZh')}
                  dataIndex="titleZh"
                  key="titleZh"
                  render={(titleZh, { field }) => <Link to={`/dictionary/${field}/`}>{titleZh}</Link>}
                />
                <Table.Column
                  title={t('title')}
                  dataIndex="title"
                  key="title"
                  render={(title, { field }) => <Link to={`/dictionary/${field}/`}>{title}</Link>}
                />
              </Table>
            );
          }}
        </Query>
      </ListContainer>
    );
  }
}

export default translate()(Dictionary);
