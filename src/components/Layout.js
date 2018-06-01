/* eslint-disable react/no-array-index-key */
// @flow
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import is from 'styled-is';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter, Link } from 'react-router-dom';
import breakpoint from 'styled-components-breakpoint';
import noScroll from 'no-scroll';

import SearchBar from './SearchBar';

const HeaderContainer = styled.div`
  height: 64px;
  .ant-layout-header {
    background-color: white;
    border-bottom: 1px solid #d8d8d8;

    display: flex;
    justify-content: flex-end;
  }
`;
const MobileMenuContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;

  padding: 30px 0;
  background-color: white;

  display: none;
  ${is('opened')`
    display: unset;
  `};
  z-index: 2;
  .ant-menu {
    z-index: 3;
  }
`;
const Fixed = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.1);
  display: none;
  ${is('opened')`
    display: unset;
  `};
`;
const MenuOpenIconContainer = styled(Flex)`
  ${breakpoint('tablet')`
    display: none;
  `};
  position: absolute;
  top: 25px;
  right: 20px;
  ${breakpoint('tablet')`
    right: 50px;
  `};
`;

const LogoContainer = styled(Flex)`
  position: absolute;
  top: 10px;

  left: 20px;
  ${breakpoint('tablet')`
    left: 50px;
  `};
`;
const LogoIcon = styled.img`
  height: 40px;
`;

const DropDownsContainer = styled.nav`
  display: none;
  ${breakpoint('tablet')`
    display: unset;
  `};
`;
const NavDropDowns = styled(Flex)``;
const NavDropDownsButton = styled.a`
  margin-left: 20px;

  color: rgba(68, 63, 84, 0.7);
  &:hover {
    text-decoration: underline;
    color: rgba(68, 63, 84, 0.8);
  }
  ${is('selected')`
    color: rgb(68, 63, 84);
    text-decoration: overline;
    &:hover {
      color: rgb(68, 63, 84);
    }
  `};
`;
const NavDropDownsButtonLink = NavDropDownsButton.extend`
  margin-right: 10px;
`.withComponent(Link);

type Props = {
  t: Function,
};
type Store = {
  navTab: string,
};
type Dispatch = {
  changeNavTab: string => void,
};

type RouteData = {
  route?: string,
  display?: string,
};
// list
export const blockChainPaths: RouteData[] = [
  { route: 'transactions', display: 'Transactions' },
  { route: 'pendingTransactions', display: 'PendingTransactions' },
  { route: 'internalTransactions', display: 'ContractInternalTransactions' },
  {},
  { route: 'blocks', display: 'Blocks' },
  { route: 'uncles', display: 'Uncles' },
  {},
  { route: 'accounts', display: 'Accounts' },
  { route: 'verifiedContracts', display: 'VerifiedContracts' },
  {},
  { route: 'messages', display: 'Messages' },
  { route: 'charts', display: 'Charts' },
];
// single data
export const blockChainDetailPaths: RouteData[] = [
  { route: 'transaction', display: 'Transactions' },
  { route: 'pendingTransaction', display: 'PendingTransactions' },
  { route: 'internalTransaction', display: 'ContractInternalTransactions' },
  { route: 'block', display: 'Blocks' },
  { route: 'uncle', display: 'Uncles' },
  { route: 'account', display: 'Accounts' },
  { route: 'verifiedContract', display: 'VerifiedContracts' },
  { route: 'message', display: 'Messages' },
  { route: 'chart', display: 'Charts' },
];

export const tokenPaths: RouteData[] = [
  { route: 'tokens', display: 'Tokens' },
  {},
  { route: 'tokenTransfers', display: 'TokenTransfers' },
];
export const tokenDetailPaths: RouteData[] = [
  { route: 'token', display: 'Token' },
  { route: 'tokenTransfer', display: 'TokenTransfer' },
];
class Header extends Component<Props & Store & Dispatch, *> {
  state = {
    sideMenuOpened: false,
  };
  toggleSideMenu = () => {
    this.setState({ sideMenuOpened: !this.state.sideMenuOpened });
    noScroll.toggle();
  };

  blockChainMenu = (
    <Menu>
      {blockChainPaths.map(
        ({ route, display }, index) =>
          route && display ? (
            <Menu.Item key={route} onClick={() => this.props.changeNavTab('blockChain')}>
              <Link to={`/${route}`}>{this.props.t(display)}</Link>
            </Menu.Item>
          ) : (
            <Menu.Divider key={index} />
          ),
      )}
    </Menu>
  );
  tokensMenu = (
    <Menu>
      {tokenPaths.map(
        ({ route, display }, index) =>
          route && display ? (
            <Menu.Item key={route} onClick={() => this.props.changeNavTab('tokens')}>
              <Link to={`/${route}`}>{this.props.t(display)}</Link>
            </Menu.Item>
          ) : (
            <Menu.Divider key={index} />
          ),
      )}
    </Menu>
  );
  miscMenu = (
    <Menu>
      <Menu.Item key="0" disabled>
        <span>{this.props.t('underDev')}</span>
      </Menu.Item>
    </Menu>
  );

  mobileMenu = (
    <Menu mode="inline" style={{ width: 256 }}>
      <Menu.Item>
        <NavDropDownsButtonLink
          selected={this.props.navTab === 'home'}
          onClick={() => this.props.changeNavTab('home')}
          to="/"
        >
          {this.props.t('Home')}
        </NavDropDownsButtonLink>
      </Menu.Item>
      <Menu.SubMenu
        title={
          <NavDropDownsButton selected={this.props.navTab === 'blockChain'}>
            {this.props.t('BlockChain')}
          </NavDropDownsButton>
        }
      >
        {blockChainPaths.map(
          ({ route, display }, index) =>
            route && display ? (
              <Menu.Item key={route} onClick={() => this.props.changeNavTab('blockChain')}>
                <Link to={`/${route}`}>{this.props.t(display)}</Link>
              </Menu.Item>
            ) : (
              <Menu.Divider key={index} />
            ),
        )}
      </Menu.SubMenu>
      <Menu.SubMenu
        title={
          <NavDropDownsButton selected={this.props.navTab === 'tokens'}>{this.props.t('Tokens')}</NavDropDownsButton>
        }
      >
        {tokenPaths.map(
          ({ route, display }, index) =>
            route && display ? (
              <Menu.Item key={route} onClick={() => this.props.changeNavTab('tokens')}>
                <Link to={`/${route}`}>{this.props.t(display)}</Link>
              </Menu.Item>
            ) : (
              <Menu.Divider key={index} />
            ),
        )}
      </Menu.SubMenu>
      <Menu.Item>
        <NavDropDownsButtonLink
          selected={this.props.navTab === 'resources'}
          onClick={() => this.props.changeNavTab('resources')}
          to="/resources"
        >
          {this.props.t('Resources')}
        </NavDropDownsButtonLink>
      </Menu.Item>
      <Menu.SubMenu
        title={<NavDropDownsButton selected={this.props.navTab === 'misc'}>{this.props.t('Misc')}</NavDropDownsButton>}
      >
        <Menu.Item key="0" disabled>
          <span>{this.props.t('underDev')}</span>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  render() {
    return (
      <Fragment>
        <Fixed opened={this.state.sideMenuOpened} onClick={this.toggleSideMenu} />
        <MobileMenuContainer opened={this.state.sideMenuOpened}>{this.mobileMenu}</MobileMenuContainer>
        <HeaderContainer>
          <Layout.Header>
            <Link to="/">
              <LogoContainer center>
                <LogoIcon src={this.props.t('logoIcon')} />
              </LogoContainer>
            </Link>

            <SearchBar size="small" />
            <DropDownsContainer>
              <NavDropDowns justifyEnd>
                <NavDropDownsButtonLink
                  selected={this.props.navTab === 'home'}
                  onClick={() => this.props.changeNavTab('home')}
                  to="/"
                >
                  {this.props.t('Home')}
                </NavDropDownsButtonLink>

                <Dropdown overlay={this.blockChainMenu}>
                  <NavDropDownsButton selected={this.props.navTab === 'blockChain'}>
                    {this.props.t('BlockChain')} <Icon type="down" />
                  </NavDropDownsButton>
                </Dropdown>

                <Dropdown overlay={this.tokensMenu}>
                  <NavDropDownsButton selected={this.props.navTab === 'tokens'}>
                    {this.props.t('Tokens')} <Icon type="down" />
                  </NavDropDownsButton>
                </Dropdown>

                <NavDropDownsButtonLink
                  selected={this.props.navTab === 'resources'}
                  onClick={() => this.props.changeNavTab('resources')}
                  to="/resources"
                >
                  {this.props.t('Resources')}
                </NavDropDownsButtonLink>

                <Dropdown overlay={this.miscMenu}>
                  <NavDropDownsButton selected={this.props.navTab === 'misc'}>
                    {this.props.t('Misc')} <Icon type="down" />
                  </NavDropDownsButton>
                </Dropdown>
              </NavDropDowns>
            </DropDownsContainer>
            <MenuOpenIconContainer center>
              <Icon onClick={this.toggleSideMenu} type={this.state.sideMenuOpened ? 'menu-fold' : 'menu-unfold'} />
            </MenuOpenIconContainer>
          </Layout.Header>
        </HeaderContainer>
      </Fragment>
    );
  }
}

const mapState = ({ history: { navTab } }): Store => ({ navTab });
const mapDispatch = ({ history: { changeNavTab } }): Dispatch => ({ changeNavTab });
export default withRouter(
  translate('layout')(
    connect(
      mapState,
      mapDispatch,
    )(Header),
  ),
);

const FooterContainer = styled.div`
  .ant-layout-footer {
    background-color: #443f54;
    color: white;
  }

  margin-top: 50px;
`;
const Introduction = styled(Flex)`
  width: 300px;
`;

export function Footer() {
  return (
    <FooterContainer>
      <Layout.Footer>
        <Introduction>
          Scan EOS is a Block Explorer and Analytics Platform for EOS, an advanced decentralized smart contracts
          platform.
        </Introduction>
      </Layout.Footer>
    </FooterContainer>
  );
}
