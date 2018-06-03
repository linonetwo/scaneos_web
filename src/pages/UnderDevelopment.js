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

type Props = {};
type Store = {};
type Dispatch = {};

export default class UnderDevelopment extends Component<Props & Store & Dispatch, *> {
  state = {};
  render() {
    return (
      <Container>
        <Content center>Under Development...</Content>
      </Container>
    );
  }
}
