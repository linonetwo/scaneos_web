// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';

import PriceChart from './PriceChart';
import Ranking from './Ranking';
import TradingActions from './TradingActions';
import HolderChange from './HolderChange';
import Toolkit from './Toolkit';

const Container = styled(Flex)`
  min-height: calc(100vh - 64px);
  padding-bottom: 50px;
  margin: auto;
  text-align: center;
  width: 90vw;
  ${breakpoint('desktop')`
    width: 1200px;
  `};
`;

export default class Ram extends PureComponent<{}> {
  render() {
    return (
      <Container alignCenter justifyBetween wrap="true">
        <PriceChart />
        <Ranking />
        <TradingActions />
        <HolderChange />
        <Toolkit />
      </Container>
    );
  }
}
