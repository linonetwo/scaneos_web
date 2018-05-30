// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import is from 'styled-is';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

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
const Logo = styled.h1`
  font-size: 30px;
  color: rgba(68, 63, 84, 0.7);
  margin: 0;
  position: absolute;
  left: 50px;
`;
const DropDownsContainer = styled.nav``;
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
export const blockChainPaths = [
  '/transactions',
  '/pendingTransactions',
  '/internalTransactions',
  '/blocks',
  '/uncles',
  '/accounts',
  '/verifiedContracts',
  '/messages',
  '/charts',
];
export const tokenPaths = ['/tokens', '/tokenTransfers'];
class Header extends Component<Store & Dispatch> {
  blockChainMenu = (
    <Menu>
      <Menu.Item key="0" onClick={() => this.props.changeNavTab('blockChain')}>
        <Link to="/transactions">Transactions</Link>
      </Menu.Item>
      <Menu.Item key="1" onClick={() => this.props.changeNavTab('blockChain')}>
        <Link to="/pendingTransactions">Pending Transactions</Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => this.props.changeNavTab('blockChain')}>
        <Link to="/internalTransactions">Contract Internal Transactions</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={() => this.props.changeNavTab('blockChain')}>
        <Link to="/blocks">Blocks</Link>
      </Menu.Item>
      <Menu.Item key="4" onClick={() => this.props.changeNavTab('blockChain')}>
        <Link to="/uncles">Uncles</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="5" onClick={() => this.props.changeNavTab('blockChain')}>
        <Link to="/accounts">Accounts</Link>
      </Menu.Item>
      <Menu.Item key="6" onClick={() => this.props.changeNavTab('blockChain')}>
        <Link to="/verifiedContracts">Verified Contracts</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="7" onClick={() => this.props.changeNavTab('blockChain')}>
        <Link to="/messages">Messages</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="8" onClick={() => this.props.changeNavTab('blockChain')}>
        <Link to="/charts">Charts</Link>
      </Menu.Item>
    </Menu>
  );
  tokensMenu = (
    <Menu>
      <Menu.Item key="0" onClick={() => this.props.changeNavTab('tokens')}>
        <Link to="/tokens">Tokens</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={() => this.props.changeNavTab('tokens')}>
        <Link to="/tokenTransfers">Token Transfers</Link>
      </Menu.Item>
    </Menu>
  );
  miscMenu = (
    <Menu>
      <Menu.Item key="0" disabled>
        <span>Under development...</span>
      </Menu.Item>
    </Menu>
  );
  render() {
    return (
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
        </Layout.Header>
      </HeaderContainer>
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
