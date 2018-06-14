/* eslint-disable react/no-array-index-key */
// @flow
import { capitalize } from 'lodash';
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import is from 'styled-is';
import { Layout, Menu, Dropdown, Icon, Breadcrumb, Modal } from 'antd';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter, Link } from 'react-router-dom';
import breakpoint from 'styled-components-breakpoint';
import noScroll from 'no-scroll';

import SearchBar from '../SearchBar';
import 微信公众号 from './微信公众号.jpg';
import 运营个人微信号 from './运营个人微信号.jpg';
import 知识星球 from './知识星球.png';

const HeaderContainer = styled.div`
  height: 64px;
  z-index: 10;
  .ant-layout-header {
    width: 100vw;
    background-color: white;
    border-bottom: 1px solid #d8d8d8;

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
export const miscPaths: RouteData[] = [{ route: 'about', display: 'About' }];
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
              <Link to={`/${route}/`}>{this.props.t(display)}</Link>
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
              <Link to={`/${route}/`}>{this.props.t(display)}</Link>
            </Menu.Item>
          ) : (
            <Menu.Divider key={index} />
          ),
      )}
    </Menu>
  );
  miscMenu = (
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
                  to="/resources/"
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
                  to="/producers/"
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
    background-color: #333;
    color: white;
    ${breakpoint('desktop')`
      display: flex;
    `};
  }
`;
const FooterItem = styled(Flex)`
  margin-bottom: 20px;
  ${breakpoint('desktop')`
  width: 300px;
  margin-right: 20px;
`};
`;
const Introduction = styled(Flex)``;
const ContactLinks = styled(Flex)`
  & div {
    margin-top: 15px;
    margin-bottom: 5px;
    & span {
      color: #3498db;
    }
  }
`;
const ContactImage = styled.img`
  width: 100%;
  object-fit: contain;
  object-position: center;
  font-family: 'object-fit: contain; object-position: center;';
`;

const FooterTitle = styled.h3`
  color: white;
  border-bottom: 1px dotted white;
`;
const TitleDecorator = styled(Flex)`
  width: 100%;
  border-bottom: 1px solid #3498db;
  margin-bottom: -1px;
  width: fit-content;
`;
const FriendLinks = styled(Flex)`
  height: unset;
  ${breakpoint('desktop')`
    height: 130px;
    width: 300px;
  `};
`;
const FriendLink = styled.a`
  color: white;
  margin: 5px 0;
`;
const friendLinks = [
  { name: 'EOSStore', homepage: 'http://www.eos.store/' },
  { name: 'EOS Asia', homepage: 'https://www.eosasia.one/' },
  { name: 'Huobi Pool', homepage: 'http://www.eoshuobipool.com/' },
  { name: 'EOS CANNON', homepage: 'https://eoscannon.io' },
  { name: 'EOS Gravity', homepage: 'http://eosfans.one/' },
  {
    name: 'EOS Argentina ',
    homepage: 'https://www.eosargentina.io/',
  },
  { name: 'eosONO', homepage: 'https://www.ono.chat/eos/' },
  { name: 'EOS Canada', homepage: 'https://www.eoscanada.com/' },
  { name: 'EOSBeijing', homepage: 'http://www.eosbeijing.one/' },
  { name: 'EOS UK', homepage: 'https://eosuk.io/' },
  { name: 'EOSeoul', homepage: 'http://eoseoul.io/' },
  { name: 'EOS TEA', homepage: 'https://node.eosfans.io/' },
];
@translate()
export class Footer extends Component<{ t: Function }, *> {
  state = {
    knowledgePlanetModelOpen: false,
    weixinModelOpen: false,
  };
  render() {
    return (
      <FooterContainer>
        <Modal
          title="知识星球"
          visible={this.state.knowledgePlanetModelOpen}
          onOk={() => this.setState({ knowledgePlanetModelOpen: false })}
          onCancel={() => this.setState({ knowledgePlanetModelOpen: false })}
        >
          <ContactImage src={知识星球} alt="scanEOS社区的知识星球" />
        </Modal>
        <Modal
          title="微信"
          visible={this.state.weixinModelOpen}
          onOk={() => this.setState({ weixinModelOpen: false })}
          onCancel={() => this.setState({ weixinModelOpen: false })}
        >
          <h4>微信公众号</h4>
          <ContactImage src={微信公众号} alt="scaneos社区的微信公众号" />
          <h4>运营个人微信号</h4>
          <ContactImage src={运营个人微信号} alt="scaneos社区的运营个人微信号" />
        </Modal>
        <Layout.Footer>
          <FooterItem column>
            <FooterTitle>
              <TitleDecorator>{this.props.t('introduction')}</TitleDecorator>
            </FooterTitle>
            <Introduction>{this.props.t('webSiteIntroduction')}</Introduction>
            <Link to="/about/">{this.props.t('moreAboutScanEOS')}</Link>
          </FooterItem>
          <FooterItem column>
            <FooterTitle>
              <TitleDecorator>{this.props.t('contact')}</TitleDecorator>
            </FooterTitle>
            {this.props.t('locale') === 'zh' ? (
              <ContactLinks column>
                <div>
                  知识星球:{' '}
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={() => this.setState({ knowledgePlanetModelOpen: true })}
                    onKeyDown={() => this.setState({ knowledgePlanetModelOpen: true })}
                  >
                    scanEOS社区
                  </span>
                </div>
                <div>
                  微信公众号:{' '}
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={() => this.setState({ weixinModelOpen: true })}
                    onKeyDown={() => this.setState({ weixinModelOpen: true })}
                  >
                    scaneos社区
                  </span>
                </div>
                <div>
                  知乎:{' '}
                  <a href="https://www.zhihu.com/people/scaneos/activities" target="_black" rel="noopener noreferrer">
                    scanEOS
                  </a>
                </div>
                <div>百家号: scanEOS社区</div>
              </ContactLinks>
            ) : (
              <ContactLinks column>
                <div>
                  Telegram:{' '}
                  <a href="https://t.me/scaneos" target="_black" rel="noopener noreferrer">
                    scanEOS
                  </a>
                </div>
                <div>
                  Twitter:{' '}
                  <a href="https://twitter.com/scan_eos" target="_black" rel="noopener noreferrer">
                    scanEOS
                  </a>
                </div>
                <div>
                  Facebook:{' '}
                  <a href="https://www.facebook.com/eos.scan.397" target="_black" rel="noopener noreferrer">
                    ScanEos
                  </a>
                </div>
                <div>Steemit: scanEOS</div>
              </ContactLinks>
            )}
          </FooterItem>
          <FooterItem column>
            <FooterTitle>
              <TitleDecorator>{this.props.t('FriendLinks')}</TitleDecorator>
            </FooterTitle>
            <FriendLinks column wrap="true">
              {friendLinks.map(({ name, homepage }) => (
                <FriendLink key={name} href={homepage} target="_black" rel="noopener noreferrer">
                  {name}
                </FriendLink>
              ))}
            </FriendLinks>
          </FooterItem>
        </Layout.Footer>
      </FooterContainer>
    );
  }
}

const BreadCrumbContainer = styled.nav`
  height: 48px;
  width: 100%;
  background-color: white;

  padding: 0 20px;
  ${breakpoint('desktop')`
    padding: 0 40px;
  `};
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
          <Link to={`/${route}s/`}>{t(capitalize(`${route}s`))}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t(capitalize(route))}</Breadcrumb.Item>
      </Breadcrumb>
    </BreadCrumbContainer>
  );
}
