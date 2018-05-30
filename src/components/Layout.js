// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import is from 'styled-is';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

const HeaderContainer = styled.div`
  height: 64px;
  .ant-layout-header {
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.05);
  }
`;
const Logo = styled.h1`
  font-size: 30px;
  color: rgba(68, 63, 84, 0.7);
  float: left;
  margin: 0;
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
    text-decoration: underline;
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
class Header extends Component<Store & Dispatch> {
  blockChainMenu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/transaction">Transactions</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/transactionPending">Pending Transactions</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/transactionInternal">Contract Internal Transactions</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <Link to="/block">Blocks</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/uncle">Uncles</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="5">
        <Link to="/account">Accounts</Link>
      </Menu.Item>
      <Menu.Item key="6">
        <Link to="/verifiedContracts">Verified Contracts</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="7">
        <Link to="/chart">Charts</Link>
      </Menu.Item>
    </Menu>
  );
  tokensMenu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/token">Tokens</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <Link to="/tokenTransfer">Token Transfers</Link>
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
