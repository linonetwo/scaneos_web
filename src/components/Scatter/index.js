// @flow
import React, { Component } from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import is from 'styled-is';

const ScatterMenu = styled.div`
  z-index: 1;
  background: #974df3;
  width: 100%;
  border-bottom: 1px solid #eeeeee;
  padding: 10px;
  box-sizing: border-box;
  color: #ffffff;
  text-align: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1) inset, 0px -2px 4px rgba(0, 0, 0, 0.1) inset;

  ${is('active')`
    display: none;
  `};
`;

const BannerButton = styled.button`
  display: inline-block;
  background: #ffffff;
  height: 32px;
  line-height: 32px;
  border: 0;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  color: #974df3;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  margin: 8px;
  cursor: pointer;
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
  async componentDidMount() {
    if (window && window.scatter) {
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

  handleAccountClick = () => {
    this.props.getEosAccount();
  };

  render() {
    const {
      t,
      tools: {
        eosAccount: { authority },
      },
    } = this.props;

    return (
      <ScatterMenu active={authority === 'active'}>
        {t('scatter.loginPrompt')}
        <BannerButton onClick={this.handleAccountClick}>{t('scatter.login')}</BannerButton>
      </ScatterMenu>
    );
  }
}

const mapState = ({ tools, info: { loading } }): Store => ({
  tools,
  loading,
});
const mapDispatch = ({ tools: { onScatterLoaded, getEosClient, getEosAccount } }): Dispatch => ({
  onScatterLoaded,
  getEosClient,
  getEosAccount,
});

export default translate()(
  connect(
    mapState,
    mapDispatch,
  )(ScatterTools),
);
