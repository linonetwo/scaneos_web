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

const AggregationContainer = styled(Flex)`
  width: 90vw;
  & > a {
    width: calc((90vw - 20px * 2) / 2);
  }
  margin: 24px auto 0;
  padding: 5px 10px;
  ${breakpoint('desktop')`
    width: 1200px;
    & > a {
      width: calc((1200px - 20px * 2) / 6);
    }
    margin: 20px 0 0;
    padding: 10px;
  `};
  padding: 5px 10px;
  background-color: white;
  box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.02);
`;
const AggregationItem = styled(Flex)`
  color: #333;
  opacity: 0.9;
  font-size: 18px;
  letter-spacing: -3px;
  & h4 {
    letter-spacing: 0px;
    color: #333;
    opacity: 0.6;
    font-size: 12px;
    display: inline-flex;
    margin: 5px 0 0;
  }

  width: calc((90vw - 20px * 2) / 2);
  margin: 5px auto;
  ${breakpoint('desktop')`
    width: unset;
    margin: 0;
    font-size: 27px;
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
      maxTransactionCpuUsage
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
class AggregationList extends PureComponent<Props> {
  render() {
    const { t } = this.props;

    return (
      <Query query={GET_AGGREGATION_DATA} pollInterval={3000} notifyOnNetworkStatusChange>
        {({ loading, error, data }) => {
          if (error) return <AggregationContainer center>{error.message}</AggregationContainer>;
          if (loading && size(data) === 0)
            return (
              <AggregationContainer center>
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
              maxTransactionCpuUsage,
            },
            price: { marketCapUsd, priceUsd, percentChange24h },
            resourcePrice: { ramPrice, netPrice, cpuPrice },
          } = data;
          const priceUp = percentChange24h > 0;
          const ramReservedPercent = (totalRamBytesReserved / maxRamSize) * 100;
          return (
            <AggregationContainer wrap="true">
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
                    <small>(KB/Day)</small>
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
              <Link to="/charts/ram/">
                <AggregationItem column center>
                  <h4>{t('maxTransactionCpuUsage')}</h4>
                  {numeral(maxTransactionCpuUsage / 1000).format('(0.00 a)')}s
                </AggregationItem>
              </Link>
            </AggregationContainer>
          );
        }}
      </Query>
    );
  }
}

export default translate()(AggregationList);
