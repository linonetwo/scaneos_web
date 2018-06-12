// @flow
import { toPairs } from 'lodash';
import React, { Component, Fragment } from 'react';
import { Spin, Table, Tabs, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import { frontloadConnect } from 'react-frontload';

import { getBreadcrumb } from '../../components/Layout';
import type { AccountData } from '../../store/account';
import { LongListContainer, DetailTabsContainer } from '../../components/Table';
import getListValueRendering from '../../components/getListValueRendering';

type Props = {
  t: Function,
};
type Store = {
  data: AccountData,
  producerInfo: Object | null,
  loading: boolean,
};
type Dispatch = {
  getAccountData: (accountName: string) => void,
};

class Account extends Component<Props & Store, *> {
  state = {};

  render() {
    return (
      <Fragment>
        {getBreadcrumb('account', this.props.t)}
        <Spin tip="Connecting" spinning={this.props.loading} size="large">
          <DetailTabsContainer>
            <Tabs defaultActiveKey="2">
              {this.props.producerInfo && (
                <Tabs.TabPane
                  tab={
                    <span>
                      <Icon type="solution" />
                      {this.props.t('BlockProducer')}
                    </span>
                  }
                  key="1"
                >
                  <LongListContainer column>
                    <Table
                      scroll={{ x: 1000 }}
                      size="middle"
                      pagination={false}
                      dataSource={toPairs(this.props.producerInfo).map(([field, value]) => ({
                        field,
                        value,
                        key: field,
                      }))}
                    >
                      <Table.Column width={200} dataIndex="field" key="field" render={this.props.t} />
                      <Table.Column dataIndex="value" key="value" />
                    </Table>
                  </LongListContainer>
                </Tabs.TabPane>
              )}

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
                    scroll={{ x: 1000 }}
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

const mapState = ({ account: { data, producerInfo }, info: { loading } }): Store => ({ data, producerInfo, loading });
const mapDispatch = ({ account: { getAccountData } }): Dispatch => ({ getAccountData });

type LoaderProps = Dispatch & {
  match: {
    params: {
      accountId: string,
    },
  },
};
const frontload = async (props: LoaderProps) => {
  const currentAccountName = String(props.match.params.accountId);
  return props.getAccountData(currentAccountName);
};

export default withRouter(
  translate()(
    connect(
      mapState,
      mapDispatch,
    )(
      frontloadConnect(frontload, {
        onUpdate: false,
      })(Account),
    ),
  ),
);
