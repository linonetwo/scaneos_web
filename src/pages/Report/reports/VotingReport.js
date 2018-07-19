// @flow
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { translate } from 'react-i18next';
import { format } from 'date-fns';
import numeral from 'numeral';
import { Helmet } from 'react-helmet';

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
  margin: 5px 0 15px;
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
    <Container column alignCenter>
      <Helmet>
        <title>
          EOS {t('bp:VotingProgress')} {t('Report')} | {t('webSiteTitle')}
        </title>
      </Helmet>
      <Query query={GET_VOTING_STATUS} variables={{ filterBy: { location: ['China'] } }}>
        {({ loading, error, data }) => {
          if (error) return error.message;
          if (loading) return <Spin tip={t('Connecting')} spinning={loading} size="large" />;
          const {
            status: { totalActivatedStake, totalProducerVoteWeight },
            producers: { producers },
          } = data;

          const votingPercentage = ((Number(totalActivatedStake) * 6.6666) / 10000 / 1000011818) * 100 * 0.15;
          const chineseBPList = producers.filter(({ rank }) => rank <= 21);
          return (
            <Fragment>
              <Title>EOS超级节点竞选报告</Title>
              <Time>{format(Date.now()).split('T')[0]}</Time>
              <Content>
                <p>
                  截至目前，EOS 主网的投票率为 {votingPercentage.toFixed(2)}%，已经有{' '}
                  {numeral(totalActivatedStake)
                    .divide(10000 * 10000 * 10000)
                    .format('0.0000')}亿个 EOS 经过抵押投入投票当中。
                </p>
                <p>
                  参与投票并进入前 21 名的中国超级节点共有{chineseBPList.length}家，分别是：{chineseBPList.map(
                    ({ rank, name, totalVotes }, index) => (
                      <span>
                        第{rank}名的 {name}（投票率{numeral(totalVotes)
                          .divide(totalProducerVoteWeight)
                          .format('0.00%')}）{index !== chineseBPList.length - 1 ? '、' : '。'}
                      </span>
                    ),
                  )}
                </p>
              </Content>
            </Fragment>
          );
        }}
      </Query>
    </Container>
  );
}

export default translate()(VoteReport);
