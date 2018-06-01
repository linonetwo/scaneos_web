// @flow
import React, { Component } from 'react';
import { Spin, Table } from 'antd';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';

import { getPageSize } from '../store/utils';
import type { TransactionData } from '../store/transaction';
import type { Pagination } from '../store/block';
import { ListContainer } from '../components/Table';

type Props = {
  t: Function,
};
type Store = {
  list: TransactionData[],
  pagination: Pagination,
  currentPage: number,
  loading: boolean,
};
type Dispatch = {
  getTransactionsList: (gotoPage?: number) => void,
  setPage: (newPage: number) => void,
};

class Transactions extends Component<Props & Store & Dispatch, *> {
  state = {};
  componentDidMount() {
    this.props.getTransactionsList();
  }
  render() {
    return (
      <Spin tip="Connecting" spinning={this.props.loading} size="large">
        <ListContainer column>
          <Table
            size="middle"
            dataSource={this.props.list}
            pagination={{
              pageSize: getPageSize(),
              total: this.props.pagination.currentTotal + (this.props.pagination.loadable ? 1 : 0),
              current: this.props.currentPage,
            }}
            onChange={pagination => {
              this.props.setPage(pagination.current);
              if (
                pagination.current > Math.ceil(this.props.pagination.currentTotal / getPageSize()) - 4 &&
                this.props.pagination.loadable
              ) {
                this.props.getTransactionsList(pagination.current);
              }
            }}
          >
            <Table.Column
              title={this.props.t('transactionId')}
              dataIndex="transactionId"
              key="transactionId"
              render={transactionId => <Link to={`/transaction/${transactionId}`}>{transactionId}</Link>}
            />
            <Table.Column
              title={this.props.t('createdAt')}
              dataIndex="createdAt"
              key="createdAt"
              render={({ sec }) => sec}
            />
            <Table.Column
              title={this.props.t('blockId')}
              dataIndex="blockId"
              key="blockId"
              render={blockId => <Link to={`/block/${blockId}`}>{blockId}</Link>}
            />
            <Table.Column
              title={this.props.t('messages')}
              dataIndex="messages"
              key="messages"
              render={messages => messages.map(({ $id }) => <Link to={`/message/${$id}`}>{$id}</Link>)}
            />
          </Table>
        </ListContainer>
      </Spin>
    );
  }
}

const mapState = ({ transaction: { list, pagination, currentPage }, info: { loading } }): Store => ({
  list,
  pagination,
  currentPage,
  loading,
});
const mapDispatch = ({ transaction: { getTransactionsList, setPage } }): Dispatch => ({ getTransactionsList, setPage });
export default translate()(
  connect(
    mapState,
    mapDispatch,
  )(Transactions),
);
