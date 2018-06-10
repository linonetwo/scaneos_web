// @flow
import React, { Component } from 'react';
import { Spin, Table } from 'antd';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';

import { getPageSize, formatTimeStamp } from '../../store/utils';
import type { AccountData } from '../../store/account';
import type { Pagination } from '../../store/block';
import { ListContainer } from '../../components/Table';

type Props = {
  t: Function,
};
type Store = {
  list: AccountData[],
  pagination: Pagination,
  currentPage: number,
  loading: boolean,
};
type Dispatch = {
  getAccountsList: (gotoPage?: number) => void,
  setPage: (newPage: number) => void,
  updateURI: () => void,
};

class Accounts extends Component<Props & Store & Dispatch, *> {
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
                this.props.getAccountsList(pagination.current);
              }
            }}
          >
            <Table.Column
              width={70}
              title={this.props.t('name')}
              dataIndex="name"
              key="name"
              render={name => <Link to={`/account/${name}/`}>{name}</Link>}
            />
            <Table.Column width={70} title={this.props.t('eosBalance')} dataIndex="eosBalance" key="eosBalance" />
            <Table.Column
              title={this.props.t('createdAt')}
              dataIndex="createdAt"
              key="createdAt"
              render={({ sec }) => formatTimeStamp(sec, this.props.t('locale'))}
            />
            <Table.Column
              title={this.props.t('updatedAt')}
              dataIndex="updatedAt"
              key="updatedAt"
              render={({ sec }) => formatTimeStamp(sec, this.props.t('locale'))}
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
const mapDispatch = ({ account: { getAccountsList, setPage }, history: { updateURI } }): Dispatch => ({
  getAccountsList,
  setPage,
  updateURI,
});
export default translate()(
  connect(
    mapState,
    mapDispatch,
  )(Accounts),
);
