// @flow
import { size } from 'lodash';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { Spin } from 'antd';
import is from 'styled-is';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import breakpoint from 'styled-components-breakpoint';
import numeral from 'numeral';
import prettySize from 'prettysize';

import { Title, ListContainer } from './styles';

const AggregationContainer = styled(ListContainer)`
  ${breakpoint('mobile', 'desktop')`
    padding-bottom: 10px;
  `};
  ${breakpoint('desktop')`
    height: 250px;
    min-height: 250px;
  `};
  margin-top: 30px;
`;
const ItemsContainer = styled(Flex)`
  & > a {
    width: calc((100% - 20px * 1) / 2);
    ${breakpoint('tablet')`
      width: calc((100% - 20px * 2) / 3);
    `};
    ${breakpoint('desktop')`
      width: calc((100% - 20px * 3) / 4);
    `};
  }
  height: 100%;
`;
const AggregationItem = styled(Flex)`
  color: #333;
  opacity: 0.9;
  font-size: 18px;
  letter-spacing: -1px;
  & h4 {
    letter-spacing: 0px;
    color: #666;
    opacity: 0.6;
    font-size: 13px;
    display: inline-flex;
    margin: 5px 0 0;
  }

  width: 100%;
  margin: 5px auto;
  ${breakpoint('desktop')`
    margin: 0;
    font-size: 14px;
    color: #222;
  `};

  white-space: nowrap;

  font-family: Courier;
  &:hover {
    opacity: 0.5;
  }
`;
const PriceChangeContainer = styled(Flex)`
  font-size: 12px;
  color: #ff6347;
  ${is('up')`
    color: #658f10;
  `};
  margin-left: 5px;
`;

type Props = {
  t: Function,
};
const GET_AGGREGATION_DATA = gql`
  query GET_AGGREGATION_DATA {
    status {
      blockNumber
      transactionNumber
      accountNumber
      actionNumber
      maxRamSize
      totalRamBytesReserved
      maxTransactionNetUsage
      totalActivatedStake
    }
    price {
      marketCapUsd
      priceUsd
      percentChange24h
    }
    resourcePrice {
      ramPrice
      netPrice
      cpuPrice
    }
  }
`;
class EOSOverview extends PureComponent<Props> {
  render() {
    const { t } = this.props;
    const title = (
      <Title justifyBetween alignCenter>
        <span>{t('EOSOverview')}</span>
      </Title>
    );
    return (
      <Query query={GET_AGGREGATION_DATA} pollInterval={3000} notifyOnNetworkStatusChange>
        {({ loading, error, data }) => {
          if (error)
            return (
              <AggregationContainer column>
                {title}
                {error.message}
              </AggregationContainer>
            );
          if (loading && size(data) === 0)
            return (
              <AggregationContainer column>
                {title}
                <Spin tip={t('Connecting')} spinning={loading} size="large" />
              </AggregationContainer>
            );
          const {
            status: {
              blockNumber,
              transactionNumber,
              accountNumber,
              actionNumber,
              totalRamBytesReserved,
              maxRamSize,
              maxTransactionNetUsage,
              totalActivatedStake,
            },
            price: { marketCapUsd, priceUsd, percentChange24h },
            resourcePrice: { ramPrice, netPrice, cpuPrice },
          } = data;
          const priceUp = percentChange24h > 0;
          const ramReservedPercent = (totalRamBytesReserved / maxRamSize) * 100;
          const votingPercentage = ((Number(totalActivatedStake) * 6.6666) / 10000 / 1000011818) * 100 * 0.15;
          return (
            <AggregationContainer column>
              {title}
              <ItemsContainer wrap="true" justifyBetween>
                <Link to="/blocks/">
                  <AggregationItem column center>
                    <h4>{t('blocksNum')}</h4>
                    {blockNumber}
                  </AggregationItem>
                </Link>
                <Link to="/transactions/">
                  <AggregationItem column center>
                    <h4>{t('transactionNum')}</h4>
                    {transactionNumber}
                  </AggregationItem>
                </Link>
                <Link to="/charts/eos/">
                  <AggregationItem column center>
                    <h4>
                      {t('price')}
                      <PriceChangeContainer up={priceUp} center>
                        {priceUp ? '+' : ''}
                        {percentChange24h}%
                      </PriceChangeContainer>
                    </h4>
                    {numeral(priceUsd)
                      .format('($0.00 a)')
                      .replace('b', 'B')}
                  </AggregationItem>
                </Link>
                <Link to="/charts/eos/">
                  <AggregationItem column center>
                    <h4>{t('marketCap')}</h4>
                    {numeral(marketCapUsd)
                      .format('($0.00 a)')
                      .replace('b', 'B')}
                  </AggregationItem>
                </Link>
                <Link to="/accounts/">
                  <AggregationItem column center>
                    <h4>{t('accountNum')}</h4>
                    {accountNumber}
                  </AggregationItem>
                </Link>
                <Link to="/actions/">
                  <AggregationItem column center>
                    <h4>{t('actionNum')}</h4>
                    {actionNumber}
                  </AggregationItem>
                </Link>
                <Link to="/charts/ram/">
                  <AggregationItem column center>
                    <h4>
                      {t('ramPrice')}
                      <small>(KB)</small>
                    </h4>
                    {numeral(ramPrice).format('(0.000000 a)')} EOS
                  </AggregationItem>
                </Link>
                <Link to="/charts/ram/">
                  <AggregationItem column center>
                    <h4>{t('ramReservedPercent')}</h4>
                    {ramReservedPercent.toFixed(4)}%
                  </AggregationItem>
                </Link>
                <Link to="/charts/ram/">
                  <AggregationItem column center>
                    <h4>
                      {t('netPrice')}
                      <small>(KB/Day)</small>
                    </h4>
                    {numeral(netPrice).format('(0.000000 a)')} EOS
                  </AggregationItem>
                </Link>
                <Link to="/charts/ram/">
                  <AggregationItem column center>
                    <h4>
                      {t('cpuPrice')}
                      <small>(s/Day)</small>
                    </h4>
                    {numeral(cpuPrice).format('(0.0000 a)')} EOS
                  </AggregationItem>
                </Link>
                <Link to="/charts/ram/">
                  <AggregationItem column center>
                    <h4>{t('maxTransactionNetUsage')}</h4>
                    {prettySize(maxTransactionNetUsage)}
                  </AggregationItem>
                </Link>
                <Link to="/charts/voting/">
                  <AggregationItem column center>
                    <h4>{t('bp:VotingProgress')}</h4>
                    {votingPercentage.toFixed(2)}%
                  </AggregationItem>
                </Link>
              </ItemsContainer>
            </AggregationContainer>
          );
        }}
      </Query>
    );
  }
}

export default translate(['bp'])(EOSOverview);
