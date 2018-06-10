// @flow
import { truncate } from 'lodash';
import React, { Component } from 'react';
import { Spin, Table } from 'antd';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';

import { getPageSize, formatTimeStamp } from '../../store/utils';
import type { TransactionData } from '../../store/transaction';
import type { Pagination } from '../../store/block';
import { ListContainer } from '../../components/Table';

type Props = {
  t: Function,
};
type Store = {
  list: TransactionData[],
  pagination: Pagination,
  loading: boolean,
};
type Dispatch = {
  getTransactionsList: (gotoPage?: number) => void,
};

class Transactions extends Component<Props & Store & Dispatch, *> {
  state = {};

  componentDidMount() {
    // 如果处于切换路由自动载入数据的逻辑无法覆盖到的地方，比如测试环境，那么自动加载数据
    if (!this.props.loading && this.props.list.length === 0) {
      this.props.getTransactionsList();
    }
  }

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
              total: this.props.pagination.currentTotal + (this.props.pagination.loadable ? 1 : 0),
              current: this.props.currentPage,
            }}
            onChange={pagination => {
              this.props.getTransactionsList(pagination.current);
            }}
          >
            <Table.Column
              title={this.props.t('transactionId')}
              dataIndex="transactionId"
              key="transactionId"
              render={transactionId => (
                <Link to={`/transaction/${transactionId}/`}>
                  {truncate(transactionId, { length: 14, omission: '..' })}
                </Link>
              )}
            />
            <Table.Column
              title={this.props.t('createdAt')}
              dataIndex="createdAt"
              key="createdAt"
              render={timeStamp => formatTimeStamp(timeStamp, this.props.t('locale'))}
            />
            <Table.Column
              title={this.props.t('blockId')}
              dataIndex="blockId"
              key="blockId"
              render={blockId => (
                <Link to={`/block/${blockId}/`}>{truncate(blockId, { length: 14, omission: '..' })}</Link>
              )}
            />
            {/* <Table.Column
              title={this.props.t('messages')}
              dataIndex="messages"
              key="messages"
              render={messages => messages.map(({ id }) => <Link to={`/message/${id}/`}>{id}</Link>)}
            /> */}
          </Table>
        </ListContainer>
      </Spin>
    );
  }
}

const mapState = ({ transaction: { list, pagination }, info: { loading } }): Store => ({
  list,
  pagination,
  loading,
});
const mapDispatch = ({ transaction: { getTransactionsList } }): Dispatch => ({
  getTransactionsList,
});
export default translate()(
  connect(
    mapState,
    mapDispatch,
  )(Transactions),
);
