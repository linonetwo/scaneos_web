// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';

import PriceChart from '../../components/PriceChart';
import VotingProgress from '../../components/VotingProgress';
import TransactionList from './TransactionList';
import BlockList from './BlockList';
import AggregationList from './AggregationList';
import BPList from './BPList';
import NameBidingList from './NameAuctionList';

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

export default class Home extends PureComponent<{}> {
  render() {
    return (
      <Container alignCenter justifyBetween wrap="true">
        <AggregationList />
        <VotingProgress />
        <PriceChart />
        <BPList />
        <NameBidingList />
        <BlockList />
        <TransactionList />
      </Container>
    );
  }
}

