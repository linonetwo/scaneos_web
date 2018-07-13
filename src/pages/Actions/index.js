// @flow
import { flatten, truncate } from 'lodash';
import React, { PureComponent } from 'react';
import { Spin, Table } from 'antd';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet';

import { getPageSize, formatTimeStamp } from '../../store/utils';
import { ListContainer } from '../../components/Containers';
import { ACTIONS_FRAGMENT } from '../Action';
import { renderActionName } from '../Action/ActionsList';

type Props = {
  t: Function,
};
const GET_ACTIONS_LIST = gql`
  query GET_ACTIONS_LIST($page: Int) {
    actions(page: $page, size: ${getPageSize()}) {
      actions {
        ...ACTIONS_FRAGMENT
        id
      }
      pageInfo {
        page
        totalElements
      }
    }
  }
  ${ACTIONS_FRAGMENT}
`;

class Actions extends PureComponent<Props> {
  render() {
    const { t } = this.props;
    return (
      <ListContainer column justifyCenter>
        <Helmet>
          <title>
            EOS {t('Actions')} | {t('webSiteTitle')}
          </title>
        </Helmet>
        <Query query={GET_ACTIONS_LIST} notifyOnNetworkStatusChange>
          {({ loading, error, data, fetchMore }) => {
            if (error) return error.message;
            if (loading) return <Spin tip={t('Connecting')} spinning={loading} size="large" />;
            const {
              actions: {
                actions,
                pageInfo: { page, totalElements },
              },
            } = data;
            return (
              <Table
                scroll={{ x: 1200 }}
                size="middle"
                dataSource={actions}
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
                  dataIndex="name"
                  key="name"
                  render={(name, { id }) => renderActionName(name, id, t)}
                />
                <Table.Column
                  title={t('transactionID')}
                  dataIndex="transactionID"
                  render={transactionID => (
                    <Link to={`/transaction/${transactionID}/`}>
                      {truncate(transactionID, { length: 10, omission: '...' })}
                    </Link>
                  )}
                />
                <Table.Column
                  title={t('createdAt')}
                  dataIndex="createdAt"
                  key="createdAt"
                  render={timeStamp => formatTimeStamp(timeStamp, t('locale'))}
                />
                <Table.Column
                  title={t('authorization')}
                  dataIndex="authorization"
                  key="authorization"
                  render={authorization =>
                    flatten(
                      authorization.map(({ actor, permission }) => (
                        <Link key={actor + permission} to={`/account/${actor}/`}>
                          {actor} ({t('permission')}: {permission}){' '}
                        </Link>
                      )),
                    )
                  }
                />
                <Table.Column
                  title={t('handlerAccountName')}
                  dataIndex="handlerAccountName"
                  key="handlerAccountName"
                  render={handlerAccountName => (
                    <Link to={`/account/${handlerAccountName}/`}>{handlerAccountName}</Link>
                  )}
                />
              </Table>
            );
          }}
        </Query>
      </ListContainer>
    );
  }
}

export default translate('action')(Actions);
