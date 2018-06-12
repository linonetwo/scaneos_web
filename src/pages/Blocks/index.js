// @flow
import React, { Component } from 'react';
import { Spin, Table } from 'antd';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { frontloadConnect } from 'react-frontload';

import { getPageSize, formatTimeStamp } from '../../store/utils';
import type { BlockData, Pagination } from '../../store/block';
import { ListContainer } from '../../components/Table';

type Props = {
  t: Function,
};
type Store = {
  list: BlockData[],
  pagination: Pagination,
  loading: boolean,
};
type Dispatch = {
  getBlocksList: (gotoPage?: number) => void,
};

class Blocks extends Component<Props & Store & Dispatch, *> {
  state = {};

  render() {
    return (
      <Spin tip="Connecting" spinning={this.props.loading} size="large">
        <ListContainer column>
          <Table
            scroll={{ x: 1000 }}
            size="middle"
            dataSource={this.props.list}
            rowKey="id"
            pagination={{
              pageSize: getPageSize(),
              ...this.props.pagination,
            }}
            onChange={pagination => {
              this.props.getBlocksList(pagination.current);
            }}
          >
            <Table.Column
              title={this.props.t('blockNum')}
              dataIndex="blockNum"
              key="blockNum"
              render={blockNum => <Link to={`/block/${blockNum}/`}>{blockNum}</Link>}
            />
            <Table.Column
              title={this.props.t('createdAt')}
              dataIndex="createdAt"
              key="createdAt"
              render={timeStamp => formatTimeStamp(timeStamp, this.props.t('locale'))}
            />
            {/* <Table.Column
              title={this.props.t('transactions')}
              dataIndex="transactions"
              key="transactions"
              render={transactions =>
                transactions && transactions.map(({ id }) => <Link to={`/transaction/${id}/`}>{id}</Link>)
              }
            /> */}
            <Table.Column
              title={this.props.t('producerAccountId')}
              dataIndex="producerAccountId"
              key="producerAccountId"
              render={producerAccountId => <Link to={`/account/${producerAccountId}/`}>{producerAccountId}</Link>}
            />
          </Table>
        </ListContainer>
      </Spin>
    );
  }
}

const mapState = ({ block: { list, pagination }, info: { loading } }): Store => ({
  list,
  pagination,
  loading,
});
const mapDispatch = ({ block: { getBlocksList } }): Dispatch => ({
  getBlocksList,
});
const frontload = async (props: Store & Dispatch) => {
  // 如果处于切换路由自动载入数据的逻辑无法覆盖到的地方，比如测试环境，那么自动加载数据
  if (!props.loading && props.list.length === 0) {
    return props.getBlocksList();
  }
  return Promise.resolve();
};

export default translate()(
  connect(
    mapState,
    mapDispatch,
  )(
    frontloadConnect(frontload, {
      onUpdate: false,
    })(Blocks),
  ),
);
