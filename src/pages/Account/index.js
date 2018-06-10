// @flow
import { toPairs } from 'lodash';
import React, { Component, Fragment } from 'react';
import { Spin, Table, Tabs, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { translate } from 'react-i18next';

import { getBreadcrumb } from '../../components/Layout';
import { formatTimeStamp } from '../../store/utils';
import type { AccountData } from '../../store/account';
import { LongListContainer, DetailTabsContainer } from '../../components/Table';

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

  getValueRendering(field: string, value: any) {
    switch (field) {
      case 'id':
        return value.id;
      case 'createdAt':
      case 'updatedAt':
        return formatTimeStamp(value, this.props.t('locale'));
      case 'name':
        return <Link to={`/account/${value}/`}>{value}</Link>;
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
