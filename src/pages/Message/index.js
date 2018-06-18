// @flow
import { toPairs } from 'lodash';
import React, { Component, Fragment } from 'react';
import { Spin, Table, Tabs, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import { frontloadConnect } from 'react-frontload';

import { getBreadcrumb } from '../../components/Layout';
import type { MessageData } from '../../store/message';
import { LongListContainer, DetailTabsContainer } from '../../components/Table';
import getListValueRendering from '../../components/getListValueRendering';

type Props = {
  t: Function,
};
type Store = {
  listByTransaction: MessageData[],
  loading: boolean,
};
type Dispatch = {
  getMessageData: (transactionID: string) => void,
};

class Message extends Component<Props & Store, *> {
  state = {};

  render() {
    return (
      <Fragment>
        {getBreadcrumb('message', this.props.t)}
        <Spin tip="Connecting" spinning={this.props.loading} size="large">
          <DetailTabsContainer>
            <Tabs defaultActiveKey="2">
              <Tabs.TabPane
                tab={
                  <span>
                    <Icon type="database" />
                    {this.props.t('Overview')}
                  </span>
                }
                key="2"
              >
                {this.props.listByTransaction.map(data => (
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
                        render={(value, { field }) => getListValueRendering(field, value, this.props.t)}
                      />
                    </Table>
                  </LongListContainer>
                ))}
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
                  <code>{JSON.stringify(this.props.listByTransaction, null, '  ')}</code>
                </pre>
              </Tabs.TabPane>
            </Tabs>
          </DetailTabsContainer>
        </Spin>
      </Fragment>
    );
  }
}

const mapState = ({ message: { listByTransaction }, info: { loading } }): Store => ({ listByTransaction, loading });
const mapDispatch = ({ message: { getMessageData } }): Dispatch => ({ getMessageData });

type LoaderProps = Dispatch & {
  match: {
    params: {
      transactionId: string,
    },
  },
};
const frontload = async (props: LoaderProps) => {
  const currentTransactionID = String(props.match.params.transactionId);
  return props.getMessageData(currentTransactionID);
};

export default withRouter(
  translate('action')(
    connect(
      mapState,
      mapDispatch,
    )(
      frontloadConnect(frontload, {
        onUpdate: false,
      })(Message),
    ),
  ),
);
