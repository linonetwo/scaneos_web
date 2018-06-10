// @flow
import { toPairs } from 'lodash';
import React, { Component, Fragment } from 'react';
import { Spin, Table, Tabs, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { translate } from 'react-i18next';

import { getBreadcrumb } from '../../components/Layout';
import { formatTimeStamp } from '../../store/utils';
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
  data: MessageData,
  loading: boolean,
};
type Dispatch = {
  getMessageData: (transactionID: string) => void,
};

class Message extends Component<Props & Store & Dispatch, *> {
  state = {};
  componentDidMount() {
    const currentTransactionID = String(this.props.match.params.transactionId);
    this.props.getMessageData(currentTransactionID);
  }

  getValueRendering(field: string, value: any) {
    switch (field) {
      case 'Id':
        return value.$id;
      case 'createdAt':
        return formatTimeStamp(value, this.props.t('locale'));
      case 'messageNum':
        return <Link to={`/message/${value}/`}>{value}</Link>;
      case 'handlerAccountName':
        return <Link to={`/account/${value}/`}>{value}</Link>;
      case 'transactionId':
        return <Link to={`/transaction/${value}/`}>{value}</Link>;
      case 'authorization':
        return value.map(({ account, permission }) => (
          <Link to={`/account/${account}/`}>
            {account}({this.props.t('permission')}: {permission})
          </Link>
        ));
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
                <LongListContainer column>
                  <Table
                    size="middle"
                    pagination={false}
                    dataSource={toPairs(this.props.data).map(([field, value]) => ({ field, value }))}
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

const mapState = ({ message: { data }, info: { loading } }): Store => ({ data, loading });
const mapDispatch = ({ message: { getMessageData } }): Dispatch => ({ getMessageData });
export default withRouter(
  translate()(
    connect(
      mapState,
      mapDispatch,
    )(Message),
  ),
);
