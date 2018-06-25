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
    const { t, loading, list, pagination, getBlocksList } = this.props;
    return (
      <Spin tip="Connecting" spinning={loading} size="large">
        <ListContainer column>
          <Table
            scroll={{ x: 1000 }}
            size="middle"
            dataSource={list}
            rowKey="id"
            pagination={{
              pageSize: getPageSize(),
              ...pagination,
            }}
            onChange={page => {
              getBlocksList(page.current);
            }}
          >
            <Table.Column
              title={t('blockNum')}
              dataIndex="blockNum"
              key="blockNum"
              render={blockNum => <Link to={`/block/${blockNum}/`}>{blockNum}</Link>}
            />
            <Table.Column
              title={t('createdAt')}
              dataIndex="createdAt"
              key="createdAt"
              render={timeStamp => formatTimeStamp(timeStamp, t('locale'))}
            />
            {/* <Table.Column
              title={t('transactions')}
              dataIndex="transactions"
              key="transactions"
              render={transactions =>
                transactions && transactions.map(({ id }) => <Link to={`/transaction/${id}/`}>{id}</Link>)
              }
            /> */}
            <Table.Column
              title={t('producerAccountId')}
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
const frontload = async ({ loading, list, getBlocksList }: Store & Dispatch) => {
  // 如果处于切换路由自动载入数据的逻辑无法覆盖到的地方，比如测试环境，那么自动加载数据
  if (!loading && list.length === 0) {
    return getBlocksList();
  }
  return Promise.resolve();
};

export default translate('block')(
  connect(
    mapState,
    mapDispatch,
  )(
    frontloadConnect(frontload, {
      onUpdate: false,
    })(Blocks),
  ),
);
