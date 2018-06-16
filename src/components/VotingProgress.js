/* eslint-disable no-control-regex */
// @flow
import React from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';
import { translate } from 'react-i18next';
import { Icon, Tooltip, Progress } from 'antd';
import { Link } from 'react-router-dom';

import { Title as ATitle } from '../pages/Home/styles';

const Container = styled(Flex)`
  height: 300px;
  padding: 20px;

  width: 90vw;
  margin: 20px auto 0;
  ${breakpoint('desktop')`
    width: 500px;
    margin: 30px 0 0;
  `};

  background-color: white;

  box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.05);

  .ant-progress-success-bg {
    background-color: #1aa2db;
  }
  .ant-progress-bg {
    background-color: #b4cfdb;
  }

  text-align: center;
  h3 {
    margin-top: 25px;
    font-size: 14px;
  }
`;
const Title = styled(ATitle)``;
const Content = styled.div`
  text-align: center;
  padding-top: 10px;
  ${breakpoint('desktop')`
    padding-top: 20px;
  `};
  & > div + div {
    margin-top: 5px;
  }
  color: #333;
`;

function VotingProgress(props: { t: Function, totalActivatedStake: number }) {
  const votingPercentage = ((Number(props.totalActivatedStake) * 6.6666) / 10000 / 1000011818) * 100 * 0.15;
  return (
    <Container column justifyBetween>
      <Link to="/producers/">
        <Title center>
          <span>
            <Icon type="check-square-o" /> {props.t('VotingProgress')}
          </span>
        </Title>
      </Link>
      <h3>{votingPercentage.toFixed(2)}%</h3>
      <Tooltip title={`${props.t('EOSVotes')}: ${votingPercentage}%`}>
        <Progress showInfo={false} status="active" percent={votingPercentage} strokeWidth={20} successPercent={15} />
      </Tooltip>
      <Content>
        <div>
          <div>
            {props.t('EOSVotesIntroduction')}
          </div>
        </div>
        <div>
          <div>{props.t('EOSVotes')}:</div>
          <div>
            <strong>{props.totalActivatedStake}</strong> ({votingPercentage.toFixed(4)}%)
          </div>
        </div>
      </Content>
    </Container>
  );
}

export default translate()(VotingProgress);
