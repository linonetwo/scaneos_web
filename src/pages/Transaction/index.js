// @flow
import { toPairs } from 'lodash';
import React, { Component, Fragment } from 'react';
import { Spin, Table, Tabs, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import { frontloadConnect } from 'react-frontload';

import { getBreadcrumb } from '../../components/Layout';
import type { TransactionData } from '../../store/transaction';
import { DetailTabsContainer } from '../../components/Layout/Containers';
import { LongListContainer, NoData } from '../../components/Table';
import getListValueRendering from '../../components/getListValueRendering';

type Props = {
  t: Function,
};
type Store = {
  data: TransactionData,
  transactionLoading: boolean,
};
type Dispatch = {
  getTransactionData: (transactionId: string) => void,
};

class Transaction extends Component<Props & Store, *> {
  state = {};

  render() {
    return (
      <Fragment>
        {getBreadcrumb('transaction', this.props.t)}

        <DetailTabsContainer>
          <Tabs defaultActiveKey="2">
            <Tabs.TabPane
              tab={
                <span>
                  <Icon type="solution" />
                  {this.props.t('Actions')}
                </span>
              }
              key="1"
            >
              <Spin tip="Connecting" spinning={this.props.transactionLoading} size="large">
                <LongListContainer column>
                  {this.props.data.actions.length > 0 ? (
                    this.props.data.actions.map(actionId => (
                      <div>
                        <Link to={`/action/${actionId}`}>{actionId}</Link>
                      </div>
                    ))
                  ) : (
                    <NoData>No Actions.</NoData>
                  )}
                </LongListContainer>
              </Spin>
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
              <Spin tip="Connecting" spinning={this.props.transactionLoading} size="large">
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
              </Spin>
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
              <Spin tip="Connecting" spinning={this.props.transactionLoading} size="large">
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

const mapState = ({ transaction: { loading: transactionLoading, data } }): Store => ({
  data,
  transactionLoading,
});
const mapDispatch = ({ transaction: { getTransactionData } }): Dispatch => ({
  getTransactionData,
});

type LoaderProps = Dispatch & {
  match: {
    params: {
      transactionId: string,
    },
  },
};
const frontload = async (props: LoaderProps) => {
  const currentTransactionId = String(props.match.params.transactionId);
  return props.getTransactionData(currentTransactionId);
};

export default withRouter(
  translate(['transaction', 'action'])(
    connect(
      mapState,
      mapDispatch,
    )(
      frontloadConnect(frontload, {
        onUpdate: false,
      })(Transaction),
    ),
  ),
);
