// @flow
import { toPairs } from 'lodash';
import React, { Component, Fragment } from 'react';
import { Spin, Table, Tabs, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';

import { getBreadcrumb } from '../../components/Layout';
import type { AccountData } from '../../store/account';
import { LongListContainer, DetailTabsContainer } from '../../components/Table';
import getListValueRendering from '../../components/getListValueRendering';

type Props = {
  match: {
    params: {
      accountId: string,
    },
  },
  t: Function,
};
type Store = {
  data: AccountData,
  loading: boolean,
};
type Dispatch = {
  getAccountData: (accountName: string) => void,
};

class Account extends Component<Props & Store & Dispatch, *> {
  state = {};
  componentDidMount() {
    const currentAccountName = String(this.props.match.params.accountId);
    this.props.getAccountData(currentAccountName);
  }

  render() {
    return (
      <Fragment>
        {getBreadcrumb('account', this.props.t)}
        <Spin tip="Connecting" spinning={this.props.loading} size="large">
          <DetailTabsContainer>
            <Tabs defaultActiveKey="2">
              <Tabs.TabPane
                tab={
                  <span>
                    <Icon type="solution" />
                    {this.props.t('Activities')}
                  </span>
                }
                key="1"
              >
                Activities
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

const mapState = ({ account: { data }, info: { loading } }): Store => ({ data, loading });
const mapDispatch = ({ account: { getAccountData } }): Dispatch => ({ getAccountData });
export default withRouter(
  translate()(
    connect(
      mapState,
      mapDispatch,
    )(Account),
  ),
);
