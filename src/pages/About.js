// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';

const Container = styled(Flex)`
  overflow-x: hidden;
`;
const Content = styled(Flex)`
  min-height: calc(100vh - 64px);
  width: 100%;
`;


export default class About extends Component<*, *> {
  state = {};
  render() {
    return (
      <Container>
        <Content center>About</Content>
      </Container>
    );
  }
}
