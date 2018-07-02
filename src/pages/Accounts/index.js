// @flow
import React, { Component } from 'react';
import { Spin, Table } from 'antd';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { frontloadConnect } from 'react-frontload';

import { getPageSize, formatTimeStamp } from '../../store/utils';
import { ListContainer } from '../../components/Table';

type Props = {
  t: Function,
};
type Store = {
  list: CreatedAccountData[],
  pagination: Pagination,
  loading: boolean,
};
type Dispatch = {
  getAccountsList: (gotoPage?: number) => void,
};

class Accounts extends Component<Props & Store & Dispatch, *> {
  state = {};

  render() {
    const { t, loading, list, pagination, getAccountsList } = this.props;
    return (
      <Spin tip="Connecting" spinning={loading} size="large">
        <ListContainer column>
          <Table
            scroll={{ x: 500 }}
            size="middle"
            dataSource={list}
            rowKey="id"
            pagination={{
              pageSize: getPageSize(),
              ...pagination,
            }}
            onChange={page => {
              getAccountsList(page.current);
            }}
          >
            <Table.Column
              title={t('name')}
              dataIndex="data"
              key="data"
              render={data => <Link to={`/account/${data.name}/`}>{data.name}</Link>}
            />
            <Table.Column
              title={t('createdAt')}
              dataIndex="createdAt"
              key="createdAt"
              render={createdAt => formatTimeStamp(createdAt, t('locale'))}
            />
          </Table>
        </ListContainer>
      </Spin>
    );
  }
}

const mapState = ({ account: { list, pagination, currentPage }, info: { loading } }): Store => ({
  list,
  pagination,
  currentPage,
  loading,
});
const mapDispatch = ({ account: { getAccountsList } }): Dispatch => ({
  getAccountsList,
});
const frontload = async ({ loading, list, getAccountsList }: Store & Dispatch) => {
  // 如果处于切换路由自动载入数据的逻辑无法覆盖到的地方，比如测试环境，那么自动加载数据
  if (!loading && list.length === 0) {
    return getAccountsList();
  }
  return Promise.resolve();
};

export default translate('account')(
  connect(
    mapState,
    mapDispatch,
  )(
    frontloadConnect(frontload, {
      onUpdate: false,
    })(Accounts),
  ),
);
