// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';

import EOSOverview from './EOSOverview';
import Chart from './Chart';
import Ram from './Ram';
import MemoList from './MemoList';
import BlockList from './BlockList';
import BPList from './BPList';
import NameAuctionList from './NameAuctionList';

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
        <EOSOverview />
        <Chart />
        <Ram />
        <BPList />
        <NameAuctionList />
        <BlockList />
        <MemoList />
      </Container>
    );
  }
}

