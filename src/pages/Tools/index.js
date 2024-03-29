// @flow
import React, { Component } from 'react';
import { Tabs } from 'antd';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { DetailTabsContainer } from '../../components/Containers';
import CreateAccount from './createAccount';
import ManageAccount from './ManageAccount';
import TransferEOS from './transferEOS';
import type { Store as ToolsInfo } from '../../store/tools';
import ScatterBtn from '../../components/Scatter';

const TabsContainer = styled(DetailTabsContainer)`
  flex-direction: column;
`;

type Props = {
  t: Function,
};

type Store = {
  tools: ToolsInfo,
};

class Tools extends Component<Props & Store> {
  render() {
    const {
      t,
      tools: { eosAccount },
    } = this.props;

    return (
      <TabsContainer>
        <ScatterBtn />
        <Tabs defaultActiveKey="manageAccount">
          <Tabs.TabPane tab={t('manageAccount.tab')} key="manageAccount">
            <ManageAccount eosAccount={eosAccount} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('transferEOS.tab')} key="transferEOS">
            <TransferEOS eosAccount={eosAccount} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('createAccount.tab')} key="createAccount">
            <CreateAccount eosAccount={eosAccount} />
          </Tabs.TabPane>
        </Tabs>
      </TabsContainer>
    );
  }
}

const mapState = ({ tools, info: { loading } }): Store => ({
  tools,
  loading,
});
export default translate()(connect(mapState)(Tools));
