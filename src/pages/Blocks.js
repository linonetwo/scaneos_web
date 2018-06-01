// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { Spin, Table } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';

import { getPageSize, getTableHeight, titleHeight } from '../store/utils';
import type { BlockData, Pagination } from '../store/block';

const Container = styled(Flex)`
  .ant-spin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .ant-table {
    width: 100%;
    height: ${getTableHeight()}px;
    padding: 0 40px;
  }
  .ant-table-pagination.ant-pagination {
    float: unset;
  }

  li.ant-pagination-jump-next + li.ant-pagination-item {
    display: none;
  }
`;

type Props = {
  t: Function,
};
type Store = {
  list: BlockData[],
  pagination: Pagination,
  currentPage: number,
  loading: boolean,
};
type Dispatch = {
  getBlocksList: (gotoPage?: number) => void,
  setPage: (newPage: number) => void,
};

class Blocks extends Component<Props & Store & Dispatch, *> {
  state = {};
  componentDidMount() {
    this.props.getBlocksList();
  }
  render() {
    return (
      <Spin tip="Connecting" spinning={this.props.loading} size="large">
        <Container column>
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
                this.props.getBlocksList(pagination.current);
              }
            }}
          >
            <Table.Column
              title={this.props.t('blockNum')}
              dataIndex="blockNum"
              key="blockNum"
              render={blockNum => <Link to={`/block/${blockNum}`}>{blockNum}</Link>}
            />
            <Table.Column
              title={this.props.t('createdAt')}
              dataIndex="createdAt"
              key="createdAt"
              render={({ sec }) => sec}
            />
            <Table.Column
              title={this.props.t('transactions')}
              dataIndex="transactions"
              key="transactions"
              render={JSON.stringify(transactions =>
                transactions.map(({ $id }) => <Link to={`/transaction/${$id}`}>{$id}</Link>),
              )}
            />
            <Table.Column
              title={this.props.t('producerAccountId')}
              dataIndex="producerAccountId"
              key="producerAccountId"
              render={producerAccountId => <Link to={`/account/${producerAccountId}`}>{producerAccountId}</Link>}
            />
          </Table>
        </Container>
      </Spin>
    );
  }
}

const mapState = ({ block: { list, pagination, currentPage }, info: { loading } }): Store => ({
  list,
  pagination,
  currentPage,
  loading,
});
const mapDispatch = ({ block: { getBlocksList, setPage } }): Dispatch => ({ getBlocksList, setPage });
export default withRouter(
  translate()(
    connect(
      mapState,
      mapDispatch,
    )(Blocks),
  ),
);
