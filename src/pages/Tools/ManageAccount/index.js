// @flow
import React, { Component } from 'react';
import { Form, Menu } from 'antd';
import { translate } from 'react-i18next';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import DelegateAccount from './comps/DelegateAccount';
import UndelegateAccount from './comps/UndelegateAccount';
import BuyRam from './comps/BuyRam';

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

const Components = [DelegateAccount, UndelegateAccount, BuyRam];

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
        </BlockMenu>
        <BlockLayout>
          <BlockComponent eosAccount={eosAccount} t={t} />
        </BlockLayout>
      </BlockPage>
    );
  }
}

export default translate()(ManageAccount);
