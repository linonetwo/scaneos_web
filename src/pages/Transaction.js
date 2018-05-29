// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import {} from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Container = styled(Flex)``;

type Props = {
  match: {
    params: {
      blockId: string,
    },
  },
};
type Store = {};
type Dispatch = {};

class Transaction extends Component<Props & Store & Dispatch, *> {
  state = {};
  render() {
    const currentTransactionID = this.props.currentTransactionID || this.props.match.params.transactionId;
    return (
      <Container column>
        <div />
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
  )(Transaction),
);
