// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Container = styled(Flex)`
  overflow-x: hidden;
`;
const Content = styled(Flex)`
  min-height: calc(100vh - 64px);
  width: 100%;
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
        <Content center>Under Development...</Content>
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
