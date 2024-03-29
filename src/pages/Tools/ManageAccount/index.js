// @flow
import React, { Component } from 'react';
import { Form, Menu } from 'antd';
import { translate } from 'react-i18next';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import DelegateAccount from './components/DelegateAccount';
import UndelegateAccount from './components/UndelegateAccount';
import BuyRam from './components/BuyRam';
import SellRam from './components/SellRam';
import Refund from './components/Refund';
import Permissions from './components/Permissions';

type Props = {
  t: Function,
  eosAccount: Object,
};

const BlockPage = styled(Flex)`
  min-height: calc(70vh - 64px);
  background-color: #fff;
  margin-top: -16px;
`;

const BlockMenu = styled(Menu)`
  width: 256px;
`;

const BlockLayout = styled.div`
  padding: 10px;
`;

const Components = [DelegateAccount, UndelegateAccount, BuyRam, SellRam, Refund, Permissions];

class ManageAccount extends Component<Props, *> {
  state = {
    componentsIndex: 0,
  };

  handleClick = event => {
    const { key } = event;
    this.setState({
      componentsIndex: key,
    });
  };

  render() {
    const { eosAccount, t } = this.props;
    const { componentsIndex } = this.state;
    const BlockComponent = Form.create()(Components[componentsIndex - 1] || Components[0]);
    return (
      <BlockPage>
        <BlockMenu defaultSelectedKeys={['1']} mode="inline" onClick={this.handleClick}>
          <Menu.Item key="1">
            <span>{t('manageAccount.DelegateAccount')}</span>
          </Menu.Item>
          <Menu.Item key="2">
            <span>{t('manageAccount.UndelegateAccount')}</span>
          </Menu.Item>
          <Menu.Item key="3">
            <span>{t('manageAccount.BuyRam')}</span>
          </Menu.Item>
          <Menu.Item key="4">
            <span>{t('manageAccount.SellRam')}</span>
          </Menu.Item>
          <Menu.Item key="5">
            <span>{t('manageAccount.Refund')}</span>
          </Menu.Item>
          <Menu.Item key="6">
            <span>{t('manageAccount.Permissions')}</span>
          </Menu.Item>
        </BlockMenu>
        <BlockLayout>
          <BlockComponent eosAccount={eosAccount} t={t} />
        </BlockLayout>
      </BlockPage>
    );
  }
}

export default translate()(ManageAccount);
