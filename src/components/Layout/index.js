/* eslint-disable react/no-array-index-key */
// @flow
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import is from 'styled-is';
import { Layout, Menu, Dropdown, Icon, Affix } from 'antd';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter, Link } from 'react-router-dom';
import breakpoint from 'styled-components-breakpoint';
import noScroll from 'no-scroll';

import SearchBar from '../SearchBar';
import translateLogo from './translate.png';

const lang = {
  zh: '中文',
  en: 'English',
};

const HeaderContainer = styled.div`
  transition: all 300ms;
  height: ${props => (props.affixed ? 48 : 64)}px;
  ${breakpoint('desktop')`
    height: 64px;
  `};
  z-index: 10;
  .ant-layout-header {
    width: 100vw;
    background-color: white;
    border-bottom: 1px solid #d8d8d8;
    height: inherit;
    display: flex;
    justify-content: flex-end;

    position: fixed;
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
  ${breakpoint('desktop')`
    display: none;
  `};
  position: absolute;
  height: inherit;
  right: 20px;
  ${breakpoint('desktop')`
    right: 50px;
  `};
`;

const LogoContainer = styled(Flex)`
  position: absolute;
  top: 10px;

  left: 20px;
  ${breakpoint('desktop')`
    left: 50px;
  `};
`;
const LogoIcon = styled.img`
  ${is('affixed')`
    display: none;
  `} ${breakpoint('desktop')`
    display: unset;
  `};
  height: 40px;
`;

const DropDownsContainer = styled.nav`
  display: none;
  ${breakpoint('desktop')`
    display: unset;
  `};
`;
const NavDropDowns = styled(Flex)``;
const NavDropDownsButton = styled.a`
  margin-left: 20px;
  text-decoration: none;
  &:focus {
    text-decoration: none;
  }
  &:hover > div {
    display: block;
  }

  color: #333;
  opacity: 0.7;
  &:hover {
    color: #333;
    opacity: 0.8;
  }
  ${is('selected')`
    color: #1aa2db;
    &:hover {
      color: #1aa2db;
    }
  `};
`;
const NavDropDownsButtonLink = NavDropDownsButton.extend`
  margin-right: 10px;
`.withComponent(Link);

const NavButtonSelectedIndicator = styled.div`
  width: 160%;
  height: 2px;
  background-color: #3498db;

  margin-top: -2px;
  margin-left: -30%;

  display: none;
  ${is('visible')`
    display: block;
  `};
`;
const DesktopSearchBarContainer = styled(Flex)`
  display: none;
  ${breakpoint('desktop')`
    display: unset;
  `};
`;
const MobileSearchBarContainer = styled(Flex)`
  ${breakpoint('desktop')`
    display: none;
  `};
  height: 70px;
  position: static;
  ${is('affixed')`
    position: fixed;
    top: 0;
    left: 5vw;
    height: 48px;
  `};
`;

const HeaderAffixSpace = styled.div`
  width: 100vw;
  height: 64px;
`;

const HeaderAffix = styled(Affix)`
  position: absolute;
  transition: all 300ms;
  z-index: 1;
`;

type Props = {
  t: Function,
};
type Store = {
  navTab: string,
};
type Dispatch = {
  changeNavTab: string => void,
  changeLanguage: (newLanguage: string) => void,
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
  { route: 'bidings', display: 'Bidings' },
  { route: 'verifiedContracts', display: 'VerifiedContracts' },
  {},
  { route: 'actions', display: 'Actions' },
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
  { route: 'action', display: 'Actions' },
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
export const miscPaths: RouteData[] = [{ route: 'about', display: 'About' }];
class Header extends Component<Props & Store & Dispatch, *> {
  state = {
    sideMenuOpened: false,
    headerAffixed: false,
  };
  toggleSideMenu = () => {
    this.setState({ sideMenuOpened: !this.state.sideMenuOpened });
    noScroll.toggle();
  };

  onHeaderChanged = affixed => {
    this.setState({
      headerAffixed: affixed,
    });
  };

  getBlockChainMenu = () => (
    <Menu>
      {blockChainPaths.map(
        ({ route, display }, index) =>
          route && display ? (
            <Menu.Item key={route} onClick={() => this.props.changeNavTab('blockChain')}>
              <Link to={`/${route}/`}>{this.props.t(display)}</Link>
            </Menu.Item>
          ) : (
            <Menu.Divider key={index} />
          ),
      )}
    </Menu>
  );
  tokensMenu = () => (
    <Menu>
      {tokenPaths.map(
        ({ route, display }, index) =>
          route && display ? (
            <Menu.Item key={route} onClick={() => this.props.changeNavTab('tokens')}>
              <Link to={`/${route}/`}>{this.props.t(display)}</Link>
            </Menu.Item>
          ) : (
            <Menu.Divider key={index} />
          ),
      )}
    </Menu>
  );
  miscMenu = () => (
    <Menu>
      {miscPaths.map(
        ({ route, display }, index) =>
          route && display ? (
            <Menu.Item key={route} onClick={() => this.props.changeNavTab('misc')}>
              <Link to={`/${route}/`}>{this.props.t(display)}</Link>
            </Menu.Item>
          ) : (
            <Menu.Divider key={index} />
          ),
      )}
    </Menu>
  );
  localeMenu = (
    <Menu>
      <Menu.Item key="0" onClick={() => this.props.changeLanguage('zh-CN')}>
        <span>{lang.zh}</span>
      </Menu.Item>
      <Menu.Item key="1" onClick={() => this.props.changeLanguage('en')}>
        <span>{lang.en}</span>
      </Menu.Item>
    </Menu>
  );

  getMobileMenu = () => (
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
                <Link to={`/${route}/`}>{this.props.t(display)}</Link>
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
                <Link to={`/${route}/`}>{this.props.t(display)}</Link>
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
          to="/resources/"
        >
          {this.props.t('Resources')}
        </NavDropDownsButtonLink>
      </Menu.Item>
      <Menu.SubMenu
        title={<NavDropDownsButton selected={this.props.navTab === 'misc'}>{this.props.t('Misc')}</NavDropDownsButton>}
      >
        {miscPaths.map(
          ({ route, display }, index) =>
            route && display ? (
              <Menu.Item key={route} onClick={() => this.props.changeNavTab('misc')}>
                <Link to={`/${route}/`}>{this.props.t(display)}</Link>
              </Menu.Item>
            ) : (
              <Menu.Divider key={index} />
            ),
        )}
      </Menu.SubMenu>
      <Menu.Item>
        <NavDropDownsButtonLink
          selected={this.props.navTab === 'producers'}
          onClick={() => this.props.changeNavTab('producers')}
          to="/producers/"
        >
          {this.props.t('BlockProducers')}
        </NavDropDownsButtonLink>
      </Menu.Item>
      <Menu.SubMenu
        title={
          <NavDropDownsButton>
            <img
              style={{ width: '20px', height: '20px', marginRight: '5px' }}
              alt={this.props.t('Locale')}
              src={translateLogo}
            />
            {lang[this.props.t('locale')]}
          </NavDropDownsButton>
        }
      >
        <Menu.Item key="0" onClick={() => this.props.changeLanguage('zh-CN')}>
          <span>{lang.zh}</span>
        </Menu.Item>
        <Menu.Item key="1" onClick={() => this.props.changeLanguage('en')}>
          <span>{lang.en}</span>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  getSelectedIndicator = tabName => <NavButtonSelectedIndicator visible={this.props.navTab === tabName} />;

  render() {
    return (
      <Fragment>
        <HeaderAffix onChange={this.onHeaderChanged}>
          <Fixed opened={this.state.sideMenuOpened} onClick={this.toggleSideMenu} />
          <MobileMenuContainer opened={this.state.sideMenuOpened}>{this.getMobileMenu()}</MobileMenuContainer>
          <HeaderContainer affixed={this.state.headerAffixed}>
            <Layout.Header>
              <Link to="/" onClick={() => this.props.changeNavTab('home')}>
                <LogoContainer center>
                  <LogoIcon src={this.props.t('logoIcon')} affixed={this.state.headerAffixed} />
                </LogoContainer>
              </Link>
              <MenuOpenIconContainer center>
                <Icon onClick={this.toggleSideMenu} type={this.state.sideMenuOpened ? 'menu-fold' : 'menu-unfold'} />
              </MenuOpenIconContainer>

              <DesktopSearchBarContainer>
                <SearchBar />
              </DesktopSearchBarContainer>
              <DropDownsContainer>
                <NavDropDowns justifyEnd>
                  <NavDropDownsButtonLink
                    selected={this.props.navTab === 'home'}
                    onClick={() => this.props.changeNavTab('home')}
                    to="/"
                  >
                    {this.props.t('Home')}
                    {this.getSelectedIndicator('home')}
                  </NavDropDownsButtonLink>

                  <Dropdown overlay={this.getBlockChainMenu()}>
                    <NavDropDownsButton selected={this.props.navTab === 'blockChain'}>
                      {this.props.t('BlockChain')} <Icon type="down" />
                      {this.getSelectedIndicator('blockChain')}
                    </NavDropDownsButton>
                  </Dropdown>

                  <Dropdown overlay={this.tokensMenu()}>
                    <NavDropDownsButton selected={this.props.navTab === 'tokens'}>
                      {this.props.t('Tokens')} <Icon type="down" />
                      {this.getSelectedIndicator('tokens')}
                    </NavDropDownsButton>
                  </Dropdown>

                  <NavDropDownsButtonLink
                    selected={this.props.navTab === 'resources'}
                    onClick={() => this.props.changeNavTab('resources')}
                    to="/resources/"
                  >
                    {this.props.t('Resources')}
                    {this.getSelectedIndicator('resources')}
                  </NavDropDownsButtonLink>

                  <Dropdown overlay={this.miscMenu()}>
                    <NavDropDownsButton selected={this.props.navTab === 'misc'}>
                      {this.props.t('Misc')} <Icon type="down" />
                      {this.getSelectedIndicator('misc')}
                    </NavDropDownsButton>
                  </Dropdown>

                  <NavDropDownsButtonLink
                    selected={this.props.navTab === 'producers'}
                    onClick={() => this.props.changeNavTab('producers')}
                    to="/producers/"
                  >
                    {this.props.t('BlockProducers')}
                    {this.getSelectedIndicator('producers')}
                  </NavDropDownsButtonLink>

                  <Dropdown overlay={this.localeMenu}>
                    <NavDropDownsButton>
                      <img
                        style={{
                          width: '20px',
                          height: '20px',
                          marginRight: '5px',
                        }}
                        alt={this.props.t('Locale')}
                        src={translateLogo}
                      />
                      {lang[this.props.t('locale')]}
                      <Icon type="down" />
                      {this.getSelectedIndicator('locale')}
                    </NavDropDownsButton>
                  </Dropdown>
                </NavDropDowns>
              </DropDownsContainer>
            </Layout.Header>
          </HeaderContainer>
          {this.state.headerAffixed && (
            <MobileSearchBarContainer center affixed={this.state.headerAffixed}>
              <SearchBar affixed={this.state.headerAffixed} />
            </MobileSearchBarContainer>
          )}
        </HeaderAffix>
        <HeaderAffixSpace affixed={this.state.headerAffixed} />
        <MobileSearchBarContainer center>
          <SearchBar />
        </MobileSearchBarContainer>
      </Fragment>
    );
  }
}

const mapState = ({ history: { navTab } }): Store => ({ navTab });
const mapDispatch = ({ history: { changeNavTab }, info: { changeLanguage } }): Dispatch => ({
  changeNavTab,
  changeLanguage,
});
export default withRouter(
  translate()(
    connect(
      mapState,
      mapDispatch,
    )(Header),
  ),
);


export { default as Footer } from './Footer';
export { default as getBreadcrumb } from './getBreadcrumb';
