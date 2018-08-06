// @flow
import { truncate } from 'lodash';
import React from 'react';
import { Spin } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';

import { formatTimeStamp } from '../../store/utils';

import { Title, ListContainer, More } from './styles';

const BlockListContainer = styled(ListContainer)`
  margin-top: 20px;
  ${breakpoint('desktop')`
    max-height: 480px;
    min-height: 480px;
    height: 480px;
  `};
`;
const BlockContainer = styled(Flex)`
  width: 100%;
  padding: 0 20px;
`;
const BlockItem = styled.div`
  width: 100%;
  height: 190px;
  padding: 0 20px;
  ${breakpoint('desktop')`
    width: 265px;
  `};

  &:not(:first-child) {
    margin-top: 20px;
  }
  ${breakpoint('desktop')`
    &:nth-child(2) {
      margin-top: 0px;
    }
  `};
  ${breakpoint('mobile', 'desktop')`
    &:nth-child(4) {
      margin-bottom: 20px;
    }
  `};

  background-color: #fafafa;

  color: #333;
  a {
    color: #333;
  }
`;
const ItemTitle = styled(Flex)`
  margin-top: 30px;
  h4 {
    font-size: 13px;
  }
  span {
    color: #666;
  }
`;
const ItemContent = styled(Flex)`
  margin-top: 30px;
  text-align: center;
  ${breakpoint('desktop')`
    text-align: start;
  `};
  a:not(:first-child) {
    margin-top: 10px;
  }
`;

type Props = {
  t: Function,
};
const GET_BLOCKS_HOME_PAGE = gql`
  query GET_BLOCKS_HOME_PAGE {
    blocks(size: 4) {
      blocks {
        blockNum
        timestamp
        producerAccountID
        transactionNum
        blockID
      }
    }
  }
`;
function BlockList({ t }: Props) {
  return (
    <Query query={GET_BLOCKS_HOME_PAGE}>
      {({ loading, error, data }) => {
        if (error) return <BlockListContainer center>{error.message}</BlockListContainer>;
        if (loading)
          return (
            <BlockListContainer center>
              <Spin tip={t('Connecting')} spinning={loading} size="large" />
            </BlockListContainer>
          );
        const {
          blocks: { blocks },
        } = data;
        return (
          <BlockListContainer column>
            <Title justifyBetween alignCenter>
              <span>{t('Blocks')}</span>
              <Link to="/blocks/">
                <More>{t('More')}</More>
              </Link>
            </Title>
            <BlockContainer wrap="true" justifyBetween>
              {blocks.map(({ blockNum, timestamp, producerAccountID, transactionNum, blockID }) => (
                <BlockItem>
                  <ItemTitle column center>
                    <Link to={`/block/${blockNum}/`}>
                      <h4>
                        {t('blockNum')}: {blockNum}
                      </h4>
                    </Link>
                    <span>{formatTimeStamp(timestamp, t('locale'))}</span>
                  </ItemTitle>
                  <ItemContent column>
                    <Link to={`/block/${blockNum}/`}>
                      <span>
                        {t('transactionNum')}: {transactionNum}
                      </span>
                    </Link>
                    <Link to={`/block/${blockNum}/`}>
                      <span>
                        {t('blockID')}: {truncate(blockID, { length: 15, omission: '...' })}
                      </span>
                    </Link>
                    <Link to={`/producer/${producerAccountID}/`}>
                      <span>
                        {t('producerAccountID')}: {producerAccountID}
                      </span>
                    </Link>
                  </ItemContent>
                </BlockItem>
              ))}
            </BlockContainer>
          </BlockListContainer>
        );
      }}
    </Query>
  );
}

export default translate('block')(BlockList);
