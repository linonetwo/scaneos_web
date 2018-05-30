// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header, { Footer } from '../components/Layout';

const Container = styled(Flex)`
  overflow-x: hidden;
`;
const Content = styled(Flex)`
  margin-top: 50px;
  min-height: calc(100vh - 64px);

  width: 100vw;
`;

type Props = {
  match: {
    params: {
      blockId: string,
    },
  },
};
type Store = {};
type Dispatch = {};

class UnderDevelopment extends Component<Props & Store & Dispatch, *> {
  state = {};
  render() {
    const currentTransactionID = this.props.currentTransactionID || this.props.match.params.transactionId;
    return (
      <Container>
        <Layout>
          <Header />
          <Content center>Under Development...</Content>
          <Footer />
        </Layout>
      </Container>
    );
  }
}

const mapState = ({}): Store => ({});
const mapDispatch = ({}): Dispatch => ({});
export default withRouter(
  connect(
    mapState,
    mapDispatch,
  )(UnderDevelopment),
);
