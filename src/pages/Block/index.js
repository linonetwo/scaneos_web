// @flow
import { toPairs } from 'lodash';
import React, { Component, Fragment } from 'react';
import { Spin, Table, Tabs, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import queryString from 'query-string';
import { frontloadConnect } from 'react-frontload';

import { getBreadcrumb } from '../../components/Layout';
import type { BlockData } from '../../store/block';
import { DetailTabsContainer } from '../../components/Containers';
import { LongListContainer, NoData } from '../../components/Table';
import getListValueRendering from '../../components/getListValueRendering';

type Props = {
  location: Object,
  history: Object,
  t: Function,
};
type Store = {
  data: BlockData,
  transactions: TransactionData[],
  blockLoading: boolean,
  transactionLoading: boolean,
};
type Dispatch = {
  getBlockData: (blockNumOrID: number | string) => void,
  getTransactionsListInBlock: (blockID: string) => void,
};

class Block extends Component<Props & Store, *> {
  state = {};

  render() {
    const { tab = 'data' } = queryString.parse(this.props.location.search);
    return (
      <Fragment>
        {getBreadcrumb('block', this.props.t)}
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
              <Spin tip="Connecting" spinning={this.props.blockLoading || this.props.transactionLoading} size="large">
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
                          width={70}
                          dataIndex="field"
                          key="field"
                          render={field => this.props.t(`transaction:${field}`)}
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
              </Spin>
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
              <Spin tip="Connecting" spinning={this.props.blockLoading} size="large">
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
              </Spin>
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
              <Spin tip="Connecting" spinning={this.props.blockLoading} size="large">
                <pre>
                  <code>{JSON.stringify(this.props.data, null, '  ')}</code>
                </pre>
              </Spin>
            </Tabs.TabPane>
          </Tabs>
        </DetailTabsContainer>
      </Fragment>
    );
  }
}

const mapState = ({
  block: { loading: blockLoading, data },
  transaction: { loading: transactionLoading, listByBlock },
}): Store => ({
  data,
  transactions: listByBlock,
  blockLoading,
  transactionLoading,
});
const mapDispatch = ({ block: { getBlockData }, transaction: { getTransactionsListInBlock } }): Dispatch => ({
  getBlockData,
  getTransactionsListInBlock,
});

type LoaderProps = Dispatch & {
  match: {
    params: {
      blockNum: string,
    },
  },
};
const frontload = async (props: LoaderProps) => {
  const currentBlockNumberOrID = props.match.params.blockNum;
  return props.getBlockData(currentBlockNumberOrID);
};

export default withRouter(
  translate(['block', 'transaction'])(
    connect(
      mapState,
      mapDispatch,
    )(
      frontloadConnect(frontload, {
        onUpdate: false,
      })(Block),
    ),
  ),
);
