// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from '../components/Layout';

const Container = styled.div``;

type Props = {
  match: {
    params: {
      blockId: string,
    },
  },
};
type Store = {};
type Dispatch = {};

class Home extends Component<Props & Store & Dispatch, *> {
  state = {};
  render() {
    return (
      <Container>
        <Layout>
          <Header />
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
  )(Home),
);
