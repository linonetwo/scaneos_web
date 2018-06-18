// @flow
import React, { Component } from 'react';
import { Spin, Table } from 'antd';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { frontloadConnect } from 'react-frontload';

import { getPageSize, formatTimeStamp } from '../../store/utils';
import type { CreatedAccountData } from '../../store/account';
import type { Pagination } from '../../store/block';
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
    return (
      <Spin tip="Connecting" spinning={this.props.loading} size="large">
        <ListContainer column>
          <Table
            scroll={{ x: 500 }}
            size="middle"
            dataSource={this.props.list}
            rowKey="id"
            pagination={{
              pageSize: getPageSize(),
              ...this.props.pagination,
            }}
            onChange={pagination => {
              this.props.getAccountsList(pagination.current);
            }}
          >
            <Table.Column
              title={this.props.t('name')}
              dataIndex="data"
              key="data"
              render={data => <Link to={`/account/${data.name}/`}>{data.name}</Link>}
            />
            <Table.Column
              title={this.props.t('createdAt')}
              dataIndex="createdAt"
              key="createdAt"
              render={createdAt => formatTimeStamp(createdAt, this.props.t('locale'))}
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
const frontload = async (props: Store & Dispatch) => {
  // 如果处于切换路由自动载入数据的逻辑无法覆盖到的地方，比如测试环境，那么自动加载数据
  if (!props.loading && props.list.length === 0) {
    return props.getAccountsList();
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
