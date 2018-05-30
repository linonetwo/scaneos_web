// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header, { Footer } from '../components/Layout';
import OverviewList from '../components/OverviewList';

const Container = styled.div`
  overflow-x: hidden;
`;
const Content = styled(Flex)`
  margin-top: 50px;

  width: 100vw;
`;

type Props = {};
type Store = {};
type Dispatch = {};

class Home extends Component<Props & Store & Dispatch, *> {
  state = {};
  render() {
    return (
      <Container>
        <Layout>
          <Header />
          <Content center>
            <OverviewList />
          </Content>
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
  )(Home),
);
