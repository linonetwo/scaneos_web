import React, { Component } from 'react';
import { Dropdown, Menu } from 'antd';
import styled from 'styled-components';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { isNot } from 'styled-is';

import scatterLogo from './chart-scatter.png';

const ScatterMenu = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 50px;
  height: 50px;
  border-radius: 4px;
  background-color: #1565c0;
  ${isNot('active')`
    background-image: linear-gradient(#9e9e9e, #9e9e9e);
    background-blend-mode: lighten;
    background-size: cover;
  `} img {
    width: inherit;
    height: inherit;
  }
`;

type Props = {
  t: Function,
};

type Store = {
  tools: ToolsInfo,
};

type Dispatch = {
  onScatterLoaded: Function,
  getEosClient: Function,
  getEosAccount: Function,
};

class ScatterTools extends Component<Props & Store & Dispatch> {
  async componentWillMount() {
    if (window.scatter) {
      this.props.onScatterLoaded(window.scatter);
      window.scatter = null;
      this.props.getEosClient();
    }
    document.addEventListener('scatterLoaded', async () => {
      // console.log('Scatter connected')
      await this.props.onScatterLoaded(window.scatter);
      // Scatter will now be available from the window scope.
      // At this stage the connection to Scatter from the application is
      // already encrypted.

      // It is good practice to take this off the window once you have
      // a reference to it.
      window.scatter = null;
      this.props.getEosClient();
    });
  }

  handleAccountClick = async event => {
    const {
      tools: { scatter },
    } = this.props;
    const { key } = event;
    if (key === '1') {
      this.props.getEosAccount();
    } else if (key === '2') {
      if (scatter.identity) {
        await scatter.forgetIdentity();
      }
    }
  };

  renderMenu = (
    <Menu onClick={this.handleAccountClick}>
      <Menu.Item key="1">Attach Account</Menu.Item>
      <Menu.Item key="2">Sign out</Menu.Item>
    </Menu>
  );

  render() {
    const {
      tools: {
        eosAccount: { authority },
      },
    } = this.props;

    return (
      <Dropdown overlay={this.renderMenu} placement="topRight">
        <ScatterMenu active={authority === 'active'}>
          <img src={scatterLogo} alt="scatter" />
        </ScatterMenu>
      </Dropdown>
    );
  }
}

const mapState = ({ tools: { tools }, info: { loading } }): Store => ({
  tools,
  loading,
});
const mapDispatch = ({ tools: { onScatterLoaded, getEosClient, getEosAccount } }): Dispatch => ({
  onScatterLoaded,
  getEosClient,
  getEosAccount,
});

export default translate('tools')(
  connect(
    mapState,
    mapDispatch,
  )(ScatterTools),
);
