// @flow
import React, { Component } from 'react';
import { Spin, Table } from 'antd';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';

import { getPageSize, formatTimeStamp } from '../../store/utils';
import type { BlockData, Pagination } from '../../store/block';
import { ListContainer } from '../../components/Table';

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
  updateURI: () => void,
};

class Blocks extends Component<Props & Store & Dispatch, *> {
  state = {};

  componentDidMount() {
    // 如果处于切换路由自动载入数据的逻辑无法覆盖到的地方，比如测试环境，那么自动加载数据
    if (!this.props.loading && this.props.list.length === 0) {
      this.props.getBlocksList();
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
              this.props.setPage(pagination.current);
              this.props.updateURI();
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

const mapState = ({ block: { list, pagination, currentPage }, info: { loading } }): Store => ({
  list,
  pagination,
  currentPage,
  loading,
});
const mapDispatch = ({ block: { getBlocksList, setPage }, history: { updateURI } }): Dispatch => ({
  getBlocksList,
  setPage,
  updateURI,
});
export default translate()(
  connect(
    mapState,
    mapDispatch,
  )(Blocks),
);
