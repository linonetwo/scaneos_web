// @flow
import { truncate } from 'lodash';
import React, { Component } from 'react';
import { Spin, Table } from 'antd';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { frontloadConnect } from 'react-frontload';

import { getPageSize, formatTimeStamp } from '../../store/utils';
import type { NameBidingData } from '../../store/account';
import type { Pagination } from '../../store/block';
import { ListContainer } from '../../components/Table';

type Props = {
  t: Function,
};
type Store = {
  list: NameBidingData[],
  pagination: Pagination,
  loading: boolean,
};
type Dispatch = {
  getNameBidingList: (gotoPage?: number) => void,
};

class NameBidings extends Component<Props & Store & Dispatch, *> {
  state = {};

  render() {
    const { t, loading, list, pagination } = this.props;
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
            onChange={({ current }) => {
              this.props.getNameBidingList(current);
            }}
          >
            <Table.Column
              title={t('newName')}
              dataIndex="newName"
              key="newName"
              render={newName => (
                <Link to={`/biding/${newName}/`}>{truncate(newName, { length: 14, omission: '..' })}</Link>
              )}
            />
            <Table.Column
              title={t('highBidder')}
              dataIndex="highBidder"
              key="highBidder"
              render={(highBidder, { highBid }) => (
                <Link to={`/account/${highBidder}/`}>
                  {highBidder} {t('offerBid')} {highBid}EOS
                </Link>
              )}
            />
            <Table.Column
              title={t('updatedAt')}
              dataIndex="lastBidTime"
              key="lastBidTime"
              render={lastBidTime => formatTimeStamp(lastBidTime, t('locale'))}
            />
          </Table>
        </ListContainer>
      </Spin>
    );
  }
}

const mapState = ({
  account: { nameBidingList: list, nameBidingListPagination: pagination },
  info: { loading },
}): Store => ({
  list,
  pagination,
  loading,
});
const mapDispatch = ({ account: { getNameBidingList } }): Dispatch => ({
  getNameBidingList,
});
const frontload = async (props: Store & Dispatch) => {
  // 如果处于切换路由自动载入数据的逻辑无法覆盖到的地方，比如测试环境，那么自动加载数据
  if (!props.loading && props.list.length === 0) {
    return props.getNameBidingList();
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
    })(NameBidings),
  ),
);
