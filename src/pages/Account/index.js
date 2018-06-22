// @flow
import { toPairs } from 'lodash';
import React, { PureComponent, Fragment } from 'react';
import { Spin, Table, Tabs, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import { frontloadConnect } from 'react-frontload';

import { getBreadcrumb } from '../../components/Layout';
import type { AccountData } from '../../store/account';
import { LongListContainer, DetailTabsContainer } from '../../components/Table';
import AccountDashboard from '../../components/AccountDashboard';

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

class Account extends PureComponent<Props & Store, *> {
  state = {};

  render() {
    const { t, loading, data, producerInfo } = this.props;
    return (
      <Fragment>
        {getBreadcrumb('account', t)}
        <Spin tip="Connecting" spinning={loading} size="large">
          <DetailTabsContainer>
            <Tabs defaultActiveKey="2">
              {producerInfo && (
                <Tabs.TabPane
                  tab={
                    <span>
                      <Icon type="solution" />
                      {t('BlockProducer')}
                    </span>
                  }
                  key="1"
                >
                  <LongListContainer column>
                    <small>{t('bp:bpcontactus')}</small>
                    <Table
                      scroll={{ x: 1000 }}
                      size="middle"
                      pagination={false}
                      dataSource={toPairs(producerInfo).map(([field, value]) => ({
                        field,
                        value,
                        key: field,
                      }))}
                    >
                      <Table.Column
                        width={200}
                        dataIndex="field"
                        key="field"
                        render={str => t(`bp:${str}`)}
                      />
                      <Table.Column dataIndex="value" key="value" />
                    </Table>
                  </LongListContainer>
                </Tabs.TabPane>
              )}

              <Tabs.TabPane
                tab={
                  <span>
                    <Icon type="database" />
                    {t('Overview')}
                  </span>
                }
                key="2"
              >
                <LongListContainer><AccountDashboard data={data} /></LongListContainer>
              </Tabs.TabPane>

              <Tabs.TabPane
                tab={
                  <span>
                    <Icon type="file-text" />
                    {t('Raw')}
                  </span>
                }
                key="3"
              >
                <pre>
                  <code>{JSON.stringify(data, null, '  ')}</code>
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
const frontload = async ({ loading, data, getAccountData, match }: Store & LoaderProps) => {
  if (!loading && !loading && !data.accountName) {
    const currentAccountName = String(match.params.accountId);
    return getAccountData(currentAccountName);
  }
  return Promise.resolve();
};

export default withRouter(
  translate('account')(
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
