// @flow
import React, { Component } from 'react';
import { Tabs, Dropdown, Menu } from 'antd';
import { translate } from 'react-i18next';
import { frontloadConnect } from 'react-frontload';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { DetailTabsContainer } from '../../components/Containers';
import CreateAccount from './createAccount';
// import ManageAccount from './manageAccount';
// import ManageVoting from './manageVoting';
// import TransferEOS from './transferEOS';
import BlockProducer from './blockProducer';
import type { ToolsInfo } from '../../store/tools';
import { scatterConfig } from '../../API.config';

import scatterLogo from './chart-scatter.png';

const ScatterMenu = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 50px;
  height: 50px;
  border-radius: 4px;
  background-color: #1565c0;

  img {
    width: inherit;
    height: inherit;
  }
`;
const TabPane = Tabs.TabPane;
type Props = {
  t: Function,
};

type Store = {
  tools: ToolsInfo,
};

type Dispatch = {
  onScatterLoaded: Function,
  getEosClient: Function,
  getEosAccount: Function,
};

class Tools extends Component<Props & Store & Dispatch, *> {
  state = {};

  async componentWillMount() {
    if (window.scatter) {
      this.props.onScatterLoaded(window.scatter);
      window.scatter = null;
      await Promise.all([this.props.getEosClient(), this.props.getEosAccount()]);
    }
    document.addEventListener('scatterLoaded', async () => {
      // console.log('Scatter connected')
      this.props.onScatterLoaded(window.scatter);
      // Scatter will now be available from the window scope.
      // At this stage the connection to Scatter from the application is
      // already encrypted.

      // It is good practice to take this off the window once you have
      // a reference to it.
      window.scatter = null;
      await Promise.all([this.props.getEosClient(), this.props.getEosAccount()]);
    });
  }

  handleAccountClick = async event => {
    const {
      tools: { scatter },
    } = this.props;
    const { key } = event;
    if (key === '1') {
      if (scatter.identity) {
        await scatter.forgetIdentity();
      }
      await scatter.getIdentity({
        accounts: [
          {
            chainId: scatterConfig.chainId,
            blockchain: scatterConfig.blockchain,
          },
        ],
      });
    }
  };

  menu = (
    <Menu onClick={this.handleAccountClick}>
      <Menu.Item key="1">Attach Account</Menu.Item>
      <Menu.Item key="2">Sign out</Menu.Item>
    </Menu>
  );

  render() {
    const {
      t,
      tools: { eosClient, eosAccount },
    } = this.props;
    console.log(this.props.tools);

    return (
      <DetailTabsContainer>
        <Tabs defaultActiveKey="createAccount">
          <TabPane tab={t('createAccount')} key="createAccount">
            <CreateAccount eosClient={eosClient} eosAccount={eosAccount} />
          </TabPane>
          {/* <TabPane tab={t('transferEOS')} key="transferEOS">
            <TransferEOS />
          </TabPane>
          <TabPane tab={t('manageAccount')} key="manageAccount">
            <ManageAccount />
          </TabPane>
          <TabPane tab={t('manageVoting')} key="manageVoting">
            <ManageVoting />
          </TabPane> */}
          <TabPane tab={t('blockProducer')} key="blockProducer">
            <BlockProducer />
          </TabPane>
        </Tabs>
        <Dropdown overlay={this.menu} placement="topRight">
          <ScatterMenu>
            <img src={scatterLogo} alt="scatter" />
          </ScatterMenu>
        </Dropdown>
      </DetailTabsContainer>
    );
  }
}

const mapState = ({ tools: { tools }, info: { loading } }): Store => ({
  tools,
  loading,
});
const mapDispatch = ({ tools: { onScatterLoaded, getEosClient, getEosAccount } }): Dispatch => ({
  onScatterLoaded,
  getEosClient,
  getEosAccount,
});
export default translate('tools')(
  connect(
    mapState,
    mapDispatch,
  )(Tools),
);
