// @flow
import { flatten, truncate } from 'lodash';
import React, { Component } from 'react';
import { Spin, Table } from 'antd';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { frontloadConnect } from 'react-frontload';

import { getPageSize, formatTimeStamp } from '../../store/utils';
import type { MessageData } from '../../store/message';
import type { Pagination } from '../../store/block';
import { ListContainer } from '../../components/Table';

type Props = {
  t: Function,
};
type Store = {
  listByTime: MessageData[],
  pagination: Pagination,
  loading: boolean,
};
type Dispatch = {
  getMessagesList: (gotoPage?: number) => void,
};

class Messages extends Component<Props & Store & Dispatch, *> {
  state = {};

  render() {
    return (
      <Spin tip="Connecting" spinning={this.props.loading} size="large">
        <ListContainer column>
          <Table
            scroll={{ x: 1000 }}
            size="middle"
            dataSource={this.props.listByTime}
            rowKey="id"
            pagination={{
              pageSize: getPageSize(),
              ...this.props.pagination,
            }}
            onChange={pagination => {
              this.props.getMessagesList(pagination.current);
            }}
          >
            <Table.Column
              title={this.props.t('actionId')}
              dataIndex="actionId"
              key="actionId"
              render={(actionId, { transactionId }) => <Link to={`/message/${transactionId}/`}>{actionId}</Link>}
            />
            <Table.Column
              title={this.props.t('transactionId')}
              dataIndex="transactionId"
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
              render={timeStamp => formatTimeStamp(timeStamp, this.props.t('locale'))}
            />
            <Table.Column
              title={this.props.t('authorization')}
              dataIndex="authorization"
              key="authorization"
              render={authorization =>
                flatten(
                  authorization.map(({ actor, permission }) => (
                    <Link to={`/account/${actor}/`}>
                      {actor} ({this.props.t('permission')}: {permission})
                    </Link>
                  )),
                )
              }
            />
            <Table.Column
              title={this.props.t('handlerAccountName')}
              dataIndex="handlerAccountName"
              key="handlerAccountName"
              render={handlerAccountName => <Link to={`/account/${handlerAccountName}/`}>{handlerAccountName}</Link>}
            />
            <Table.Column title={this.props.t('type')} dataIndex="name" key="name" />
          </Table>
        </ListContainer>
      </Spin>
    );
  }
}

const mapState = ({ message: { listByTime, pagination }, info: { loading } }): Store => ({
  listByTime,
  pagination,
  loading,
});
const mapDispatch = ({ message: { getMessagesList } }): Dispatch => ({
  getMessagesList,
});
const frontload = async (props: Store & Dispatch) => {
  // 如果处于切换路由自动载入数据的逻辑无法覆盖到的地方，比如测试环境，那么自动加载数据
  if (!props.loading && props.listByTime.length === 0) {
    return props.getMessagesList();
  }
  return Promise.resolve();
};
export default translate('action')(
  connect(
    mapState,
    mapDispatch,
  )(
    frontloadConnect(frontload, {
      onUpdate: false,
    })(Messages),
  ),
);
