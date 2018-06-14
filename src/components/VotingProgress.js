/* eslint-disable no-control-regex */
// @flow
import React from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';
import { translate } from 'react-i18next';
import { Icon, Tooltip, Progress } from 'antd';

import { Title as ATitle } from '../pages/Home/styles';

const Container = styled(Flex)`
  height: 250px;
  padding: 20px;

  width: 90vw;
  margin: 30px auto 0;
  ${breakpoint('desktop')`
    width: 500px;
    margin: 30px 0 0;
  `};

  background-color: white;

  box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.05);
`;
const Title = styled(ATitle)``;
const Content = styled.div`
  text-align: left;
  padding: 10px;
  ${breakpoint('desktop')`
    padding: 30px;
  `};
  & > div + div {
    margin-top: 5px;
  }
  color: #333;
`;

function VotingProgress(props: { t: Function, totalActivatedStake: number }) {
  const votingPercentage = ((Number(props.totalActivatedStake) * 6.6666) / 10000 / 1000011818) * 100 * 0.15;
  return (
    <Container column alignCenter justifyBetween>
      <Title justifyBetween alignCenter>
        <span>
          <Icon type="check-square-o" /> {props.t('VotingProgress')}
        </span>
      </Title>
      <Content>
        <div>{props.t('EOSVotes')}: {props.totalActivatedStake} EOS ({votingPercentage.toFixed(4)}%)</div>
        <div>{props.t('MinimumVotesRequired')}: 150,000,000.0000 EOS (15.0000%)</div>
        <div>{props.t('TotalEOSSupply')}: 1,000,011,818.7401 EOS (100.0011%)</div>
      </Content>
      <Tooltip title={`${props.t('EOSVotes')}: ${votingPercentage}% ${props.t('MinimumVotesRequired')}: 15%`}>
        <Progress
          format={() => `${votingPercentage.toFixed(2)}%`}
          status="active"
          percent={15}
          successPercent={votingPercentage}
        />
      </Tooltip>
    </Container>
  );
}

export default translate()(VotingProgress);
