// @flow
import React, { Component } from 'react';
import { Spin, Table } from 'antd';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { frontloadConnect } from 'react-frontload';
import { formatTimeStamp } from '../../store/utils';

import type { TokenInfo } from '../../store/token';
import { ProducerListContainer } from '../../components/Table';

type Props = {
  t: Function,
};
type Store = {
  list: TokenInfo[],
  loading: boolean,
};
type Dispatch = {
  getTokens: () => void,
};

class Tokens extends Component<Props & Store, *> {
  state = {};

  render() {
    const { t, loading, list } = this.props;
    return (
      <Spin tip="Connecting" spinning={loading} size="large">
        <ProducerListContainer column>
          <Table
            scroll={{ x: 1000 }}
            size="middle"
            dataSource={list}
            rowKey="id"
            pagination={{
              pageSize: 1024,
            }}
          >
            <Table.Column
              title={t('issuer')}
              dataIndex="issuer"
              key="issuer"
              render={issuer => <Link to={`/account/${issuer}/`}>{issuer}</Link>}
            />
            <Table.Column title={t('maximumSupply')} dataIndex="maximumSupply" key="maximumSupply" />
            <Table.Column
              title={t('createdAt')}
              dataIndex="createdAt"
              key="createdAt"
              render={timeStamp => formatTimeStamp(timeStamp, t('locale'))}
            />
          </Table>
        </ProducerListContainer>
      </Spin>
    );
  }
}

const mapState = ({
  token: { list },
  info: { loading },
}): Store => ({
  list,
  loading,
});
const mapDispatch = ({ token: { getTokens } }): Dispatch => ({
  getTokens,
});
const frontload = async ({ loading, list, getTokens }: Store & Dispatch) => {
  // 如果处于切换路由自动载入数据的逻辑无法覆盖到的地方，比如测试环境，那么自动加载数据
  if (!loading && list.length === 0) {
    return getTokens();
  }
  return Promise.resolve();
};
export default translate('token')(
  connect(
    mapState,
    mapDispatch,
  )(
    frontloadConnect(frontload, {
      onUpdate: false,
    })(Tokens),
  ),
);
