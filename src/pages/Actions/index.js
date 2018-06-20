// @flow
import { flatten, truncate } from 'lodash';
import React, { Component } from 'react';
import { Spin, Table } from 'antd';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { frontloadConnect } from 'react-frontload';

import { getPageSize, formatTimeStamp } from '../../store/utils';
import type { ActionData } from '../../store/action';
import type { Pagination } from '../../store/block';
import { ListContainer } from '../../components/Table';

type Props = {
  t: Function,
};
type Store = {
  listByTime: ActionData[],
  pagination: Pagination,
  loading: boolean,
};
type Dispatch = {
  getActionsList: (gotoPage?: number) => void,
};

class Actions extends Component<Props & Store & Dispatch, *> {
  state = {};

  render() {
    const { loading, listByTime, t } = this.props;
    return (
      <Spin tip="Connecting" spinning={loading} size="large">
        <ListContainer column>
          <Table
            scroll={{ x: 1000 }}
            size="middle"
            dataSource={listByTime}
            rowKey="id"
            pagination={{
              pageSize: getPageSize(),
              ...this.props.pagination,
            }}
            onChange={pagination => {
              this.props.getActionsList(pagination.current);
            }}
          >
            <Table.Column
              dataIndex="id"
              key="id"
              render={id => <Link to={`/action/${id}/`}>{t('ViewIt')}</Link>}
            />
            <Table.Column
              title={t('transactionId')}
              dataIndex="transactionId"
              render={transactionId => (
                <Link to={`/transaction/${transactionId}/`}>
                  {truncate(transactionId, { length: 10, omission: '...' })}
                </Link>
              )}
            />
            <Table.Column
              title={t('createdAt')}
              dataIndex="createdAt"
              key="createdAt"
              render={timeStamp => formatTimeStamp(timeStamp, t('locale'))}
            />
            <Table.Column
              title={t('authorization')}
              dataIndex="authorization"
              key="authorization"
              render={authorization =>
                flatten(
                  authorization.map(({ actor, permission }) => (
                    <Link to={`/account/${actor}/`}>
                      {actor} ({t('permission')}: {permission})
                    </Link>
                  )),
                )
              }
            />
            <Table.Column
              title={t('handlerAccountName')}
              dataIndex="handlerAccountName"
              key="handlerAccountName"
              render={handlerAccountName => <Link to={`/account/${handlerAccountName}/`}>{handlerAccountName}</Link>}
            />
            <Table.Column title={t('type')} dataIndex="name" key="name" />
          </Table>
        </ListContainer>
      </Spin>
    );
  }
}

const mapState = ({ action: { listByTime, pagination }, info: { loading } }): Store => ({
  listByTime,
  pagination,
  loading,
});
const mapDispatch = ({ action: { getActionsList } }): Dispatch => ({
  getActionsList,
});
const frontload = async (props: Store & Dispatch) => {
  // 如果处于切换路由自动载入数据的逻辑无法覆盖到的地方，比如测试环境，那么自动加载数据
  if (!props.loading && props.listByTime.length === 0) {
    return props.getActionsList();
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
    })(Actions),
  ),
);
