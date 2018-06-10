// @flow
import { toPairs } from 'lodash';
import React, { Component, Fragment } from 'react';
import { Spin, Table, Tabs, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';

import { getBreadcrumb } from '../../components/Layout';
import type { TransactionData } from '../../store/transaction';
import type { MessageData } from '../../store/message';
import { LongListContainer, DetailTabsContainer, NoData } from '../../components/Table';
import getListValueRendering from '../../components/getListValueRendering';

type Props = {
  match: {
    params: {
      transactionId: string,
    },
  },
  t: Function,
};
type Store = {
  data: TransactionData,
  messages: MessageData[],
  loading: boolean,
};
type Dispatch = {
  getTransactionData: (transactionId: string) => void,
  getMessageData: (transactionId: string) => void,
};

class Transaction extends Component<Props & Store & Dispatch, *> {
  state = {};
  componentDidMount() {
    const currentTransactionId = String(this.props.match.params.transactionId);
    this.props.getTransactionData(currentTransactionId);
    this.props.getMessageData(currentTransactionId);
  }

  render() {
    return (
      <Fragment>
        {getBreadcrumb('transaction', this.props.t)}
        <Spin tip="Connecting" spinning={this.props.loading} size="large">
          <DetailTabsContainer>
            <Tabs defaultActiveKey="2">
              <Tabs.TabPane
                tab={
                  <span>
                    <Icon type="solution" />
                    {this.props.t('Messages')}
                  </span>
                }
                key="1"
              >
                {this.props.messages.length > 0 ? (
                  this.props.messages.map(data => (
                    <LongListContainer column>
                      <Table
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
                  <NoData>No Actions.</NoData>
                )}
              </Tabs.TabPane>

              <Tabs.TabPane
                tab={
                  <span>
                    <Icon type="database" />
                    {this.props.t('Overview')}
                  </span>
                }
                key="2"
              >
                <LongListContainer column>
                  <Table
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
                key="3"
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

const mapState = ({ transaction: { data }, message: { listByTransaction }, info: { loading } }): Store => ({
  data,
  messages: listByTransaction,
  loading,
});
const mapDispatch = ({ transaction: { getTransactionData }, message: { getMessageData } }): Dispatch => ({
  getTransactionData,
  getMessageData,
});
export default withRouter(
  translate()(
    connect(
      mapState,
      mapDispatch,
    )(Transaction),
  ),
);
