// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';

import RamPriceChart from '../components/ChartsAndVisualization/RamPriceChart'

const Container = styled(Flex)`
  overflow-x: hidden;
`;
const Content = styled(Flex)`
  min-height: calc(100vh - 64px);
  width: 100%;

  margin-bottom: 30px;
`;

type Props = {};
type Store = {};
type Dispatch = {};

export default class UnderDevelopment extends Component<Props & Store & Dispatch, *> {
  state = {};
  render() {
    return (
      <Container>
        <Content center><RamPriceChart /></Content>
      </Container>
    );
  }
}
