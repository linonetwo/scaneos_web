/* eslint-disable react/no-array-index-key, react/destructuring-assignment */
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
import Loadable from 'react-loadable';
import { SearchContainer } from '../Containers';
import translateLogo from './translate.png';

// avoid cycle importing
const SearchBar = Loadable({
  loader: () => import(/* webpackChunkName: "SearchBar" */ '../SearchBar'),
  loading: () => (
    <SearchContainer>
      <Icon type="loading" />
    </SearchContainer>
  ),
  modules: ['SearchBar'],
});

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
    padding: 0 calc((100vw - 1200px) / 2);
    padding-left: calc((100vw - 1200px) / 2 + 130px + 25px);
    width: 100vw;
    background-color: white;
    border-bottom: 1px solid #eeeeee;
    height: inherit;
    display: flex;
    justify-content: flex-start;

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
  right: 10vw;
  ${is('search')`
    right: 25vw;
  `};
`;

const LogoContainer = styled(Flex)`
  position: absolute;
  top: 10px;

  left: 5vw;
  ${breakpoint('desktop')`
    left: calc((100vw - 1200px) / 2);
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
  font-size: 14px;
`;
const UtilityContainer = styled(DropDownsContainer)`
  margin-left: auto;
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

  color: #666;
  &:hover {
    color: #666;
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
  width: 40%;
  padding-left: 10%;
  margin: auto;
  ${is('forceCenter')`
    margin-left: 20%;
  `};
  height: 2px;
  background-color: #3498db;

  margin-top: -2px;

  display: none;
  ${is('visible')`
    display: block;
  `};
`;
const DesktopSearchBarContainer = styled(Flex)`
  display: none;
  ${breakpoint('desktop')`
    display: inline-flex;
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
  z-index: 5;
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
  { route: 'blocks', display: 'Blocks' },
  { route: 'actions', display: 'Actions' },
  {},
  { route: 'tokens', display: 'Tokens' },
  { route: 'dapps', display: 'DApps' },
  {},
  { route: 'charts', display: 'Charts' },
  { route: 'report', display: 'Report' },
];
// single data
export const blockChainDetailPaths: RouteData[] = [
  { route: 'transaction', display: 'Transactions' },
  { route: 'block', display: 'Blocks' },
  { route: 'action', display: 'Actions' },
  { route: 'token', display: 'Tokens' },
  { route: 'dapp', display: 'DApp' },
  { route: 'chart', display: 'Chart' },
];

// list
export const accountPaths: RouteData[] = [
  { route: 'accounts', display: 'Accounts' },
  { route: 'auctions', display: 'Auctions' },
  {},
  { route: 'tools', display: 'Toolkit' },
];
// single data
export const accountDetailPaths: RouteData[] = [
  { route: 'account', display: 'Accounts' },
  { route: 'auction', display: 'Auctions' },
];

class Header extends Component<Props & Store & Dispatch, *> {
  state = {
    sideMenuOpened: false,
    headerAffixed: false,
    inputFocused: false,
  };

  toggleSideMenu = () => {
    this.setState(prevState => ({ sideMenuOpened: !prevState.sideMenuOpened }));
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

  getAccountMenu = () => (
    <Menu>
      {accountPaths.map(
        ({ route, display }, index) =>
          route && display ? (
            <Menu.Item key={route} onClick={() => this.props.changeNavTab('account')}>
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
          <NavDropDownsButton selected={this.props.navTab === 'account'}>{this.props.t('Account')}</NavDropDownsButton>
        }
      >
        {accountPaths.map(
          ({ route, display }, index) =>
            route && display ? (
              <Menu.Item key={route} onClick={() => this.props.changeNavTab('account')}>
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
      <Menu.Item>
        <NavDropDownsButtonLink
          selected={this.props.navTab === 'dictionary'}
          onClick={() => this.props.changeNavTab('dictionary')}
          to="/dictionary"
        >
          {this.props.t('Dictionary')}
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

  getSelectedIndicator = tabName => (
    <NavButtonSelectedIndicator forceCenter={tabName === 'blockChain'} visible={this.props.navTab === tabName} />
  );

  render() {
    const { t, changeNavTab, navTab } = this.props;
    const { sideMenuOpened, headerAffixed, inputFocused } = this.state;
    return (
      <Fragment>
        <HeaderAffix onChange={this.onHeaderChanged}>
          <Fixed opened={sideMenuOpened} onClick={this.toggleSideMenu} />
          <MobileMenuContainer opened={sideMenuOpened}>{this.getMobileMenu()}</MobileMenuContainer>
          <HeaderContainer affixed={inputFocused || headerAffixed}>
            <Layout.Header>
              <Link to="/" onClick={() => changeNavTab('home')}>
                <LogoContainer center>
                  <LogoIcon src={t('logoIcon')} affixed={inputFocused || headerAffixed} />
                </LogoContainer>
              </Link>
              <MenuOpenIconContainer search center>
                <Icon
                  onClick={() => {
                    if (window) {
                      window.scroll({
                        top: 30,
                        behavior: 'smooth',
                      });
                    } else if (document) {
                      document.documentElement.scrollTop = document.body.scrollTop = 30;
                    }
                  }}
                  type="search"
                />
              </MenuOpenIconContainer>
              <MenuOpenIconContainer center>
                <Icon onClick={this.toggleSideMenu} type={sideMenuOpened ? 'menu-fold' : 'menu-unfold'} />
              </MenuOpenIconContainer>

              <DropDownsContainer>
                <NavDropDowns justifyEnd>
                  <Dropdown overlay={this.getBlockChainMenu()}>
                    <NavDropDownsButton selected={navTab === 'blockChain'}>
                      {t('BlockChain')} <Icon type="down" />
                      {this.getSelectedIndicator('blockChain')}
                    </NavDropDownsButton>
                  </Dropdown>
                  <Dropdown overlay={this.getAccountMenu()}>
                    <NavDropDownsButton selected={navTab === 'account'}>
                      {t('Account')} <Icon type="down" />
                      {this.getSelectedIndicator('account')}
                    </NavDropDownsButton>
                  </Dropdown>

                  <NavDropDownsButtonLink
                    selected={navTab === 'producers'}
                    onClick={() => changeNavTab('producers')}
                    to="/producers/"
                  >
                    {t('BlockProducers')}
                    {this.getSelectedIndicator('producers')}
                  </NavDropDownsButtonLink>

                  <NavDropDownsButtonLink
                    selected={navTab === 'dictionary'}
                    onClick={() => changeNavTab('dictionary')}
                    to="/dictionary"
                  >
                    {t('Dictionary')}
                    {this.getSelectedIndicator('dictionary')}
                  </NavDropDownsButtonLink>
                </NavDropDowns>
              </DropDownsContainer>
              <UtilityContainer>
                <DesktopSearchBarContainer>
                  <SearchBar />
                  <Dropdown overlay={this.localeMenu}>
                    <NavDropDownsButton>
                      <img
                        style={{
                          width: '20px',
                          height: '20px',
                          marginRight: '5px',
                        }}
                        alt={t('Locale')}
                        src={translateLogo}
                      />
                      {lang[t('locale')]}
                      <Icon type="down" />
                      {this.getSelectedIndicator('locale')}
                    </NavDropDownsButton>
                  </Dropdown>
                </DesktopSearchBarContainer>
              </UtilityContainer>
            </Layout.Header>
          </HeaderContainer>
          {(inputFocused || headerAffixed) && (
            <MobileSearchBarContainer center affixed={inputFocused || headerAffixed}>
              <SearchBar
                affixed={inputFocused || headerAffixed}
                focusInput={isFocused => this.setState({ inputFocused: isFocused })}
              />
            </MobileSearchBarContainer>
          )}
        </HeaderAffix>
        <HeaderAffixSpace affixed={inputFocused || headerAffixed} />
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
