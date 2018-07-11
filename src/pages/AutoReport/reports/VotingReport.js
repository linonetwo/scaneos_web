// @flow
import { toUpper } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { translate } from 'react-i18next';
import { format } from 'date-fns';
import numeral from 'numeral';

import { Container } from '../../../components/Containers';

const GET_VOTING_STATUS = gql`
  query GET_VOTING_STATUS($filterBy: JSON) {
    status {
      totalProducerVoteWeight
      totalActivatedStake
    }
    producers(page: 0, size: 21, filterBy: $filterBy) {
      producers {
        rank
        name
        account
        totalVotes
        location
        homepage
      }
    }
  }
`;

const Title = styled.h3`
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
`;
const Time = styled.time`
  text-align: center;
  margin-top: 5px;
`;
const Content = styled.article`
  line-height: 2;
  p {
    line-height: 1.5;
  }
  font-size: 14px;
  color: #333;
`;

function VoteReport({ t }: { t: Function }) {
  return (
    <Query query={GET_VOTING_STATUS} variables={{ filterBy: { location: ['China'] } }}>
      {({ loading, error, data }) => {
        if (error) return <Container>{error.message}</Container>;
        if (loading)
          return (
            <Spin tip={t('Connecting')} spinning={loading} size="large">
              <Container />
            </Spin>
          );
        const {
          status: { totalActivatedStake, totalProducerVoteWeight },
          producers: { producers },
        } = data;

        const votingPercentage = ((Number(totalActivatedStake) * 6.6666) / 10000 / 1000011818) * 100 * 0.15;
        const chineseBPList = producers.filter(({ rank }) => rank <= 21);
        return (
          <Container column>
            <Title>EOS超级节点竞选报告</Title>
            <Time>{format(Date.now()).split('T')[0]}</Time>
            <Content>
              <p>
                截至目前，EOS 主网的投票率为 {votingPercentage.toFixed(2)}%，投票量达到了{' '}
                {toUpper(numeral(totalProducerVoteWeight).format('(0,0 a)'))}。
              </p>
              <p>
                中国的{chineseBPList.length}家超级节点分别是：{chineseBPList.map(({ rank, name, totalVotes }) => (
                  <span>
                    第{rank}名的 {name}（投票率{numeral(totalVotes)
                      .divide(totalProducerVoteWeight)
                      .format('0.00%')}）、
                  </span>
                ))}
              </p>
            </Content>
          </Container>
        );
      }}
    </Query>
  );
}

export default translate()(VoteReport);
