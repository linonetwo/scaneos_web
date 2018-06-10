// @flow
import { toPairs } from 'lodash';
import React, { Component, Fragment } from 'react';
import { Spin, Table, Tabs, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { translate } from 'react-i18next';

import { getBreadcrumb } from '../../components/Layout';
import { formatTimeStamp } from '../../store/utils';
import type { TransactionData } from '../../store/transaction';
import type { MessageData } from '../../store/message';
import { LongListContainer, DetailTabsContainer } from '../../components/Table';

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

  getValueRendering(field: string, value: any) {
    switch (field) {
      case 'id':
        return value.id;
      case 'messages':
        return value.map(({ id }) => <Link to={`/message/${id}/`}>{id}</Link>);
      case 'createdAt':
      case 'updatedAt':
      case 'expiration':
        return formatTimeStamp(value, this.props.t('locale'));
      case 'name':
        return <Link to={`/transaction/${value}/`}>{value}</Link>;
      case 'transactionId':
        return <Link to={`/transaction/${value}/`}>{value}</Link>;
      case 'blockId':
        return <Link to={`/block/${value}/`}>{value}</Link>;
      case 'refBlockNum':
        return <Link to={`/block/${value}/`}>{value}</Link>;
      default: {
        if (typeof value === 'string' || typeof value === 'number') {
          return value;
        }
        return (
          <pre>
            <code>{JSON.stringify(value, null, '  ')}</code>
          </pre>
        );
      }
    }
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
                {this.props.messages.map(data => (
                  <LongListContainer column>
                    <Table
                      size="middle"
                      pagination={false}
                      dataSource={toPairs(data).map(([field, value]) => ({ field, value, key: field }))}
                    >
                      <Table.Column title={this.props.t('field')} dataIndex="field" key="field" render={this.props.t} />
                      <Table.Column
                        title={this.props.t('value')}
                        dataIndex="value"
                        key="value"
                        render={(value, { field }) => this.getValueRendering(field, value)}
                      />
                    </Table>
                  </LongListContainer>
                ))}
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
                      render={(value, { field }) => this.getValueRendering(field, value)}
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
