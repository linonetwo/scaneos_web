/* eslint-disable react/no-array-index-key */
// @flow
import { capitalize } from 'lodash';
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import is from 'styled-is';
import { Layout, Menu, Dropdown, Icon, Breadcrumb } from 'antd';
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
  ${breakpoint('desktop')`
    display: none;
  `};
  position: absolute;
  top: 25px;
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

  color: rgba(68, 63, 84, 0.7);
  &:hover {
    color: rgba(68, 63, 84, 0.8);
  }
  ${is('selected')`
    color: rgb(68, 63, 84);
    &:hover {
      color: rgb(68, 63, 84);
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
  height: 50px;
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
  localeMenu = (
    <Menu>
      <Menu.Item key="0" onClick={() => this.props.changeLanguage('zh-CN')}>
        <span>中文</span>
      </Menu.Item>
      <Menu.Item key="1" onClick={() => this.props.changeLanguage('en')}>
        <span>English</span>
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
      <Menu.Item>
        <NavDropDownsButtonLink
          selected={this.props.navTab === 'producers'}
          onClick={() => this.props.changeNavTab('producers')}
          to="/producers"
        >
          {this.props.t('BlockProducers')}
        </NavDropDownsButtonLink>
      </Menu.Item>
      <Menu.SubMenu title={<NavDropDownsButton>{this.props.t('Locale')}</NavDropDownsButton>}>
        <Menu.Item key="0" onClick={() => this.props.changeLanguage('zh-CN')}>
          <span>中文</span>
        </Menu.Item>
        <Menu.Item key="1" onClick={() => this.props.changeLanguage('en')}>
          <span>English</span>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  getSelectedIndicator = tabName => <NavButtonSelectedIndicator visible={this.props.navTab === tabName} />;

  render() {
    return (
      <Fragment>
        <Fixed opened={this.state.sideMenuOpened} onClick={this.toggleSideMenu} />
        <MobileMenuContainer opened={this.state.sideMenuOpened}>{this.mobileMenu}</MobileMenuContainer>
        <HeaderContainer>
          <Layout.Header>
            <Link to="/" onClick={() => this.props.changeNavTab('home')}>
              <LogoContainer center>
                <LogoIcon src={this.props.t('logoIcon')} />
              </LogoContainer>
            </Link>

            <DesktopSearchBarContainer>
              <SearchBar size="small" />
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

                <Dropdown overlay={this.blockChainMenu}>
                  <NavDropDownsButton selected={this.props.navTab === 'blockChain'}>
                    {this.props.t('BlockChain')} <Icon type="down" />
                    {this.getSelectedIndicator('blockChain')}
                  </NavDropDownsButton>
                </Dropdown>

                <Dropdown overlay={this.tokensMenu}>
                  <NavDropDownsButton selected={this.props.navTab === 'tokens'}>
                    {this.props.t('Tokens')} <Icon type="down" />
                    {this.getSelectedIndicator('tokens')}
                  </NavDropDownsButton>
                </Dropdown>

                <NavDropDownsButtonLink
                  selected={this.props.navTab === 'resources'}
                  onClick={() => this.props.changeNavTab('resources')}
                  to="/resources"
                >
                  {this.props.t('Resources')}
                  {this.getSelectedIndicator('resources')}
                </NavDropDownsButtonLink>

                <Dropdown overlay={this.miscMenu}>
                  <NavDropDownsButton selected={this.props.navTab === 'misc'}>
                    {this.props.t('Misc')} <Icon type="down" />
                    {this.getSelectedIndicator('misc')}
                  </NavDropDownsButton>
                </Dropdown>

                <NavDropDownsButtonLink
                  selected={this.props.navTab === 'producers'}
                  onClick={() => this.props.changeNavTab('producers')}
                  to="/producers"
                >
                  {this.props.t('BlockProducers')}
                  {this.getSelectedIndicator('producers')}
                </NavDropDownsButtonLink>

                <Dropdown overlay={this.localeMenu}>
                  <NavDropDownsButton>
                    {this.props.t('Locale')} <Icon type="down" />
                    {this.getSelectedIndicator('locale')}
                  </NavDropDownsButton>
                </Dropdown>
              </NavDropDowns>
            </DropDownsContainer>
            <MenuOpenIconContainer center>
              <Icon onClick={this.toggleSideMenu} type={this.state.sideMenuOpened ? 'menu-fold' : 'menu-unfold'} />
            </MenuOpenIconContainer>
          </Layout.Header>
        </HeaderContainer>
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

const FooterContainer = styled.div`
  .ant-layout-footer {
    background-color: #443f54;
    color: white;
    ${breakpoint('desktop')`
      display: flex;
    `};
  }
`;
const Introduction = styled(Flex)`
  width: 300px;
  margin-bottom: 20px;
  ${breakpoint('desktop')`
    margin-right: 20px;
  `};
`;

const FriendLinks = styled(Flex)`
  height: unset;
  ${breakpoint('desktop')`
    height: 130px;
    width: 300px;
  `};
`;
const FriendLink = styled(Flex)`
  & a {
    margin: 0 10px;
  }
`;
const friendLinks = [
  { name: 'Huobi Pool', homepage: 'http://www.eoshuobipool.com/' },
  { name: 'EOS CANNON', homepage: 'https://eoscannon.io' },
  { name: 'EOS Asia', homepage: 'https://www.eosasia.one/' },
  { name: 'EOS Gravity', homepage: 'http://eosfans.one/' },
  {
    name: 'EOS Argentina ',
    homepage: 'https://www.eosargentina.io/',
  },
  { name: 'EOSStore', homepage: 'http://www.eos.store/' },
  { name: 'eosONO', homepage: 'https://www.ono.chat/eos/' },
  { name: 'EOS Canada', homepage: 'https://www.eoscanada.com/' },
  { name: 'EOSBeijing', homepage: 'http://www.eosbeijing.one/' },
  { name: 'EOS UK', homepage: 'https://eosuk.io/' },
  { name: 'EOSeoul', homepage: 'http://eoseoul.io/' },
  { name: 'EOS TEA', homepage: 'https://node.eosfans.io/' },
];
export const Footer = translate()((props: { t: Function }) => (
  <FooterContainer>
    <Layout.Footer>
      <Introduction>{props.t('webSiteIntroduction')}</Introduction>
      <FriendLinks column wrap>
        {friendLinks.map(({ name, homepage }) => (
          <FriendLink>
            {name}
            <a href={homepage}>{homepage}</a>
          </FriendLink>
        ))}
      </FriendLinks>
    </Layout.Footer>
  </FooterContainer>
));

const BreadCrumbContainer = styled.nav`
  height: 48px;
  width: 100%;
  background-color: white;

  padding: 0 40px;
  display: flex;
  align-items: center;
`;
export function getBreadcrumb(route: string, t: Function) {
  return (
    <BreadCrumbContainer>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">{t('Home')}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/${route}s`}>{t(capitalize(`${route}s`))}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t(capitalize(route))}</Breadcrumb.Item>
      </Breadcrumb>
    </BreadCrumbContainer>
  );
}
