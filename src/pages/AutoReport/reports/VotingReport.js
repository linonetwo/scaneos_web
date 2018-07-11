// @flow
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
  query GET_VOTING_STATUS {
    status {
      totalProducerVoteWeight
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
    <Query query={GET_VOTING_STATUS}>
      {({ loading, error, data }) => {
        if (error) return <Container>{error.message}</Container>;
        if (loading)
          return (
            <Spin tip={t('Connecting')} spinning={loading} size="large">
              <Container />
            </Spin>
          );
        const { status } = data;

        return (
          <Container column>
            <Title>EOS超级节点竞选报告</Title>
            <Time>{format(Date.now()).split('T')[0]}</Time>
            <Content>{status.totalProducerVoteWeight}</Content>
          </Container>
        );
      }}
    </Query>
  );
}

export default translate()(VoteReport);
