// @flow
import React from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';

import OverviewList from '../../components/OverviewList';

const Container = styled(Flex)`
  min-height: calc(100vh - 64px);
  width: 100%;
  background-color: rgb(250, 250, 250);
`;

export default function Home() {
  return (
    <Container center>
      <OverviewList />
    </Container>
  );
}
