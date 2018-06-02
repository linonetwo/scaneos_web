// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import OverviewList from '../components/OverviewList';

const Container = styled(Flex)`
  min-height: calc(100vh - 64px);
  width: 100%;
  background-color: rgb(250, 250, 250);
`;

type Props = {};
type Store = {};
type Dispatch = {};

class Home extends Component<Props & Store & Dispatch, *> {
  state = {};
  render() {
    return (
      <Container center>
        <OverviewList />
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
  )(Home),
);
