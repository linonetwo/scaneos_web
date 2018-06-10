// @flow
import { toPairs } from 'lodash';
import React, { Component, Fragment } from 'react';
import { Spin, Table, Tabs, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import queryString from 'query-string';

import { getBreadcrumb } from '../../components/Layout';
import type { BlockData } from '../../store/block';
import type { TransactionData } from '../../store/transaction';
import { LongListContainer, DetailTabsContainer, NoData } from '../../components/Table';
import getListValueRendering from '../../components/getListValueRendering';

type Props = {
  match: {
    params: {
      blockNum: string,
    },
  },
  t: Function,
};
type Store = {
  data: BlockData,
  transactions: TransactionData[],
  loading: boolean,
};
type Dispatch = {
  getBlockData: (blockNumOrID: number | string) => void,
  getTransactionsListInBlock: (blockID: string) => void,
};
type State = {
  blockId: string,
};

class Block extends Component<Props & Store & Dispatch, State> {
  state = {
    blockId: '',
  };

  static getDerivedStateFromProps(nextProps: Store) {
    if (nextProps.data.id) {
      return { blockId: nextProps.data.blockId };
    }
    return null;
  }

  async componentDidMount() {
    const currentBlockNumberOrID = this.props.match.params.blockNum;
    await this.props.getBlockData(currentBlockNumberOrID);
    if (this.state.blockId) {
      this.props.getTransactionsListInBlock(this.state.blockId);
    }
  }

  render() {
    const { tab = 'data' } = queryString.parse(this.props.location.search);
    return (
      <Fragment>
        {getBreadcrumb('block', this.props.t)}
        <Spin tip="Connecting" spinning={this.props.loading} size="large">
          <DetailTabsContainer>
            <Tabs
              defaultActiveKey="data"
              activeKey={tab}
              onChange={activeKey => this.props.history.push(`${this.props.location.pathname}?tab=${activeKey}`)}
            >
              <Tabs.TabPane
                tab={
                  <span>
                    <Icon type="sync" />
                    {this.props.t('Transactions')}
                  </span>
                }
                key="transactions"
              >
                {this.props.transactions.length > 0 ? (
                  this.props.transactions.map(data => (
                    <LongListContainer column>
                      <Table
                        scroll={{ x: 800 }}
                        size="middle"
                        pagination={false}
                        dataSource={toPairs(data).map(([field, value]) => ({ field, value, key: field }))}
                      >
                        <Table.Column
                          title={this.props.t('field')}
                          dataIndex="field"
                          key="field"
                          render={this.props.t}
                        />
                        <Table.Column
                          title={this.props.t('value')}
                          dataIndex="value"
                          key="value"
                          render={(value, { field }) => getListValueRendering(field, value, this.props.t)}
                        />
                      </Table>
                    </LongListContainer>
                  ))
                ) : (
                  <NoData>No Transactions.</NoData>
                )}
              </Tabs.TabPane>

              <Tabs.TabPane
                tab={
                  <span>
                    <Icon type="database" />
                    {this.props.t('Overview')}
                  </span>
                }
                key="data"
              >
                <LongListContainer column>
                  <Table
                    scroll={{ x: 800 }}
                    size="middle"
                    pagination={false}
                    dataSource={toPairs(this.props.data).map(([field, value]) => ({ field, value, key: field }))}
                  >
                    <Table.Column title={this.props.t('field')} dataIndex="field" key="field" render={this.props.t} />
                    <Table.Column
                      title={this.props.t('value')}
                      dataIndex="value"
                      key="value"
                      render={(value, { field }) => getListValueRendering(field, value, this.props.t)}
                    />
                  </Table>
                </LongListContainer>
              </Tabs.TabPane>

              <Tabs.TabPane
                tab={
                  <span>
                    <Icon type="file-text" />
                    {this.props.t('Raw')}
                  </span>
                }
                key="raw"
              >
                <pre>
                  <code>{JSON.stringify(this.props.data, null, '  ')}</code>
                </pre>
              </Tabs.TabPane>
            </Tabs>
          </DetailTabsContainer>
        </Spin>
      </Fragment>
    );
  }
}

const mapState = ({ block: { data }, transaction: { listByBlock }, info: { loading } }): Store => ({
  data,
  transactions: listByBlock,
  loading,
});
const mapDispatch = ({ block: { getBlockData }, transaction: { getTransactionsListInBlock } }): Dispatch => ({
  getBlockData,
  getTransactionsListInBlock,
});
export default withRouter(
  translate()(
    connect(
      mapState,
      mapDispatch,
    )(Block),
  ),
);
