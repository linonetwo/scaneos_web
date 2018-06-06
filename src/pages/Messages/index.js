// @flow
import { flatten, truncate } from 'lodash';
import React, { Component } from 'react';
import { Spin, Table } from 'antd';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';

import { getPageSize, formatTimeStamp } from '../../store/utils';
import type { MessageData } from '../../store/message';
import type { Pagination } from '../../store/block';
import { ListContainer } from '../../components/Table';

type Props = {
  t: Function,
};
type Store = {
  list: MessageData[],
  pagination: Pagination,
  currentPage: number,
  loading: boolean,
};
type Dispatch = {
  getMessagesList: (gotoPage?: number) => void,
  setPage: (newPage: number) => void,
  updateURI: () => void,
};

class Messages extends Component<Props & Store & Dispatch, *> {
  state = {};

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
              this.props.updateURI();
              if (
                pagination.current > Math.ceil(this.props.pagination.currentTotal / getPageSize()) - 4 &&
                this.props.pagination.loadable
              ) {
                this.props.getMessagesList(pagination.current);
              }
            }}
          >
            <Table.Column
              title={this.props.t('messageId')}
              dataIndex="messageId"
              key="messageId"
              render={messageId => <Link to={`/transaction/${messageId}/`}>{messageId}</Link>}
            />
            <Table.Column
              title={this.props.t('messages')}
              dataIndex="transactionId"
              key="transactionId"
              render={transactionId => (
                <Link to={`/message/${transactionId}/`}>{truncate(transactionId, { length: 10, omission: '...' })}</Link>
              )}
            />
            <Table.Column
              title={this.props.t('transactionId')}
              dataIndex="transactionId"
              key="transactionId"
              render={transactionId => (
                <Link to={`/transaction/${transactionId}/`}>
                  {truncate(transactionId, { length: 10, omission: '...' })}
                </Link>
              )}
            />
            <Table.Column
              title={this.props.t('createdAt')}
              dataIndex="createdAt"
              key="createdAt"
              render={({ sec }) => formatTimeStamp(sec, this.props.t('locale'))}
            />
            <Table.Column
              title={this.props.t('authorization')}
              dataIndex="authorization"
              key="authorization"
              render={authorization =>
                flatten(authorization.map(({ account }) => <Link to={`/account/${account}/`}>{account}</Link>))
              }
            />
            <Table.Column
              title={this.props.t('handlerAccountName')}
              dataIndex="handlerAccountName"
              key="handlerAccountName"
              render={handlerAccountName => <Link to={`/account/${handlerAccountName}/`}>{handlerAccountName}</Link>}
            />
            <Table.Column title={this.props.t('type')} dataIndex="type" key="type" />
          </Table>
        </ListContainer>
      </Spin>
    );
  }
}

const mapState = ({ message: { list, pagination, currentPage }, info: { loading } }): Store => ({
  list,
  pagination,
  currentPage,
  loading,
});
const mapDispatch = ({ message: { getMessagesList, setPage }, history: { updateURI } }): Dispatch => ({ getMessagesList, setPage, updateURI });
export default translate()(
  connect(
    mapState,
    mapDispatch,
  )(Messages),
);
