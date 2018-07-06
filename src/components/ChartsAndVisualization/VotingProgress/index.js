/* eslint-disable no-control-regex */
// @flow
import React from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';
import { translate } from 'react-i18next';
import { Icon, Tooltip, Progress, Spin } from 'antd';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Title as ATitle } from '../../../pages/Home/styles';

const Container = styled(Flex)`
  height: 500px;
  padding: 20px;
  box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.02);

  width: 90vw;
  margin: 24px auto 0;
  ${breakpoint('desktop')`
    width: 1200px;
  `};

  background-color: white;

  box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.02);

  .ant-progress-success-bg {
    background-color: #1aa2db;
  }
  .ant-progress-bg {
    background-color: #b4cfdb;
  }

  text-align: center;
  font-size: 16px;
  h3 {
    margin-top: 25px;
    font-size: 18px;
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

type Props = {
  t: Function,
};

function VotingProgress({ t }: Props) {
  return (
    <Query
      query={gql`
        query {
          status {
            totalActivatedStake
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (error) return <Container>{error.message}</Container>;
        if (loading)
          return (
            <Container>
              <Spin tip={t('Connecting')} spinning={loading} size="large" />
            </Container>
          );
        const {
          status: { totalActivatedStake },
        } = data;
        const votingPercentage = ((Number(totalActivatedStake) * 6.6666) / 10000 / 1000011818) * 100 * 0.15;
        return (
          <Container column justifyBetween>
            <Link to="/producers/">
              <Title>
                <span>
                  <Icon type="check-square-o" /> {t('VotingProgress')}
                </span>
              </Title>
            </Link>
            <h3>{votingPercentage.toFixed(2)}%</h3>
            <Tooltip title={`${t('EOSVotes')}: ${votingPercentage}%`}>
              <Progress
                showInfo={false}
                status="active"
                percent={votingPercentage}
                strokeWidth={40}
                successPercent={15}
              />
            </Tooltip>
            <Content>
              <div>
                <div>{t('EOSVotesIntroduction')}</div>
              </div>
              <div>
                <div>
                  {t('EOSVotes')}: <strong>{totalActivatedStake}</strong> ({votingPercentage.toFixed(4)}%)
                </div>
              </div>
            </Content>
          </Container>
        );
      }}
    </Query>
  );
}

export default translate('bp')(VotingProgress);
