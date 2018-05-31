/* eslint-disable react/no-array-index-key */
// @flow
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import is from 'styled-is';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import breakpoint from 'styled-components-breakpoint';

import SearchBar from './SearchBar';

const HeaderContainer = styled.div`
  height: 64px;
  .ant-layout-header {
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.05);

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
  height: 100%;
`;

const Logo = styled.h1`
  font-size: 30px;
  color: rgba(68, 63, 84, 0.7);
  margin: 0;
  position: absolute;
  left: 50px;
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
  { route: 'pendingTransactions', display: 'Pending Transactions' },
  { route: 'internalTransactions', display: 'Contract Internal Transactions' },
  {},
  { route: 'blocks', display: 'Blocks' },
  { route: 'uncles', display: 'Uncles' },
  {},
  { route: 'accounts', display: 'Accounts' },
  { route: 'verifiedContracts', display: 'Verified Contracts' },
  {},
  { route: 'messages', display: 'Messages' },
  { route: 'charts', display: 'Charts' },
];
// single data
export const blockChainDetailPaths: RouteData[] = [
  { route: 'transaction', display: 'Transactions' },
  { route: 'pendingTransaction', display: 'Pending Transactions' },
  { route: 'internalTransaction', display: 'Contract Internal Transactions' },
  { route: 'block', display: 'Blocks' },
  { route: 'uncle', display: 'Uncles' },
  { route: 'account', display: 'Accounts' },
  { route: 'verifiedContract', display: 'Verified Contracts' },
  { route: 'message', display: 'Messages' },
  { route: 'chart', display: 'Charts' },
];

export const tokenPaths: RouteData[] = [
  { route: 'tokens', display: 'Transactions' },
  {},
  { route: 'tokenTransfers', display: 'Pending Transactions' },
];
export const tokenDetailPaths: RouteData[] = [
  { route: 'token', display: 'Contract Internal Transactions' },
  { route: 'tokenTransfer', display: 'Blocks' },
];
class Header extends Component<Store & Dispatch, *> {
  state = {
    sideMenuOpened: false,
  };

  blockChainMenu = (
    <Menu>
      {blockChainPaths.map(
        ({ route, display }, index) =>
          route && display ? (
            <Menu.Item key={route} onClick={() => this.props.changeNavTab('blockChain')}>
              <Link to={`/${route}`}>{display}</Link>
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
              <Link to={`/${route}`}>{display}</Link>
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
        <span>Under development...</span>
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
          Home
        </NavDropDownsButtonLink>
      </Menu.Item>
      <Menu.SubMenu
        title={<NavDropDownsButton selected={this.props.navTab === 'blockChain'}>BlockChain</NavDropDownsButton>}
      >
        {blockChainPaths.map(
          ({ route, display }, index) =>
            route && display ? (
              <Menu.Item key={route} onClick={() => this.props.changeNavTab('blockChain')}>
                <Link to={`/${route}`}>{display}</Link>
              </Menu.Item>
            ) : (
              <Menu.Divider key={index} />
            ),
        )}
      </Menu.SubMenu>
      <Menu.SubMenu title={<NavDropDownsButton selected={this.props.navTab === 'tokens'}>Tokens</NavDropDownsButton>}>
        {tokenPaths.map(
          ({ route, display }, index) =>
            route && display ? (
              <Menu.Item key={route} onClick={() => this.props.changeNavTab('tokens')}>
                <Link to={`/${route}`}>{display}</Link>
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
          Resources
        </NavDropDownsButtonLink>
      </Menu.Item>
      <Menu.SubMenu title={<NavDropDownsButton selected={this.props.navTab === 'misc'}>Misc</NavDropDownsButton>}>
        <Menu.Item key="0" disabled>
          <span>Under development...</span>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  render() {
    return (
      <Fragment>
        <Fixed
          opened={this.state.sideMenuOpened}
          onClick={() => this.setState({ sideMenuOpened: !this.state.sideMenuOpened })}
        />
        <MobileMenuContainer opened={this.state.sideMenuOpened}>{this.mobileMenu}</MobileMenuContainer>
        <HeaderContainer>
          <Layout.Header>
            <Logo>Scan EOS</Logo>
            <SearchBar size="small" />
            <DropDownsContainer>
              <NavDropDowns justifyEnd>
                <NavDropDownsButtonLink
                  selected={this.props.navTab === 'home'}
                  onClick={() => this.props.changeNavTab('home')}
                  to="/"
                >
                  Home
                </NavDropDownsButtonLink>

                <Dropdown overlay={this.blockChainMenu}>
                  <NavDropDownsButton selected={this.props.navTab === 'blockChain'}>
                    BlockChain <Icon type="down" />
                  </NavDropDownsButton>
                </Dropdown>

                <Dropdown overlay={this.tokensMenu}>
                  <NavDropDownsButton selected={this.props.navTab === 'tokens'}>
                    Tokens <Icon type="down" />
                  </NavDropDownsButton>
                </Dropdown>

                <NavDropDownsButtonLink
                  selected={this.props.navTab === 'resources'}
                  onClick={() => this.props.changeNavTab('resources')}
                  to="/resources"
                >
                  Resources
                </NavDropDownsButtonLink>

                <Dropdown overlay={this.miscMenu}>
                  <NavDropDownsButton selected={this.props.navTab === 'misc'}>
                    Misc <Icon type="down" />
                  </NavDropDownsButton>
                </Dropdown>
              </NavDropDowns>
            </DropDownsContainer>
            <MenuOpenIconContainer center>
              <Icon
                onClick={() => this.setState({ sideMenuOpened: !this.state.sideMenuOpened })}
                type={this.state.sideMenuOpened ? 'menu-fold' : 'menu-unfold'}
              />
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
  connect(
    mapState,
    mapDispatch,
  )(Header),
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
