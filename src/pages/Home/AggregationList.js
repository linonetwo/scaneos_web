// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { Spin } from 'antd';
import is from 'styled-is';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import breakpoint from 'styled-components-breakpoint';
import numeral from 'numeral';
import { frontloadConnect } from 'react-frontload';

import type { AggregationData } from '../../store/aggregation';
import type { CurrentPriceData } from '../../store/price';

const AggregationContainer = styled(Flex)`
  width: 90vw;
  & .ant-spin-nested-loading {
    width: calc((90vw - 20px * 2) / 2);
  }
  margin: 10px auto 0;
  padding: 5px 10px;
  ${breakpoint('desktop')`
    width: 1200px;
    & .ant-spin-nested-loading {
      width: calc((1200px - 20px * 2) / 6);
    }
    margin: 20px 0 0;
    padding: 10px;
  `};
  padding: 5px 10px;
  background-color: white;
  box-shadow: 0px 0px 10px 0 rgba(7, 17, 27, 0.05);
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
  getAggregationData: () => void,
};
type Store = {
  loading: boolean,
  priceLoading: boolean,
  data: AggregationData,
  currentPriceData: CurrentPriceData,
};
type Dispatch = {
  getCurrentPriceData: () => void,
};
class AggregationList extends PureComponent<Props & Store> {
  componentDidMount() {
    this.polling = setInterval(() => {
      this.props.getAggregationData();
    }, 2000);
  }
  componentWillUnmount() {
    this.polling && clearInterval(this.polling);
  }
  polling = null;

  render() {
    const priceUp = this.props.currentPriceData.percentChange24h > 0;
    const { t } = this.props;
    // 初次加载之后，轮询就不要一直转圈了
    const showLoading = this.props.currentPriceData.priceUsd === -1 && this.props.loading;
    return (
      <AggregationContainer wrap="true">
        <Spin spinning={showLoading}>
          <Link to="/blocks/">
            <AggregationItem column center>
              <h4>{t('blocksNum')}</h4>
              {this.props.data.blockNumber}
            </AggregationItem>
          </Link>
        </Spin>
        <Spin spinning={showLoading}>
          <Link to="/transactions/">
            <AggregationItem column center>
              <h4>{t('transactionNum')}</h4>
              {this.props.data.transactionNumber}
            </AggregationItem>
          </Link>
        </Spin>
        <Spin spinning={this.props.priceLoading}>
          <Link to="/price/">
            <AggregationItem column center>
              <h4>
                {t('price')}
                <PriceChangeContainer up={priceUp} center>
                  {priceUp ? '+' : ''}
                  {this.props.currentPriceData.percentChange24h}%
                </PriceChangeContainer>
              </h4>
              {numeral(this.props.currentPriceData.priceUsd)
                .format('($0.00 a)')
                .replace('b', 'B')}
            </AggregationItem>
          </Link>
        </Spin>
        <Spin spinning={this.props.priceLoading}>
          <Link to="/price/">
            <AggregationItem column center>
              <h4>{t('marketCap')}</h4>
              {numeral(this.props.currentPriceData.marketCapUsd)
                .format('($0.00 a)')
                .replace('b', 'B')}
            </AggregationItem>
          </Link>
        </Spin>
        <Spin spinning={showLoading}>
          <Link to="/accounts/">
            <AggregationItem column center>
              <h4>{t('accountNum')}</h4>
              {this.props.data.accountNumber}
            </AggregationItem>
          </Link>
        </Spin>
        <Spin spinning={showLoading}>
          <Link to="/actions/">
            <AggregationItem column center>
              <h4>{t('actionNum')}</h4>
              {this.props.data.actionNumber}
            </AggregationItem>
          </Link>
        </Spin>
      </AggregationContainer>
    );
  }
}

const mapState = ({ aggregation: { loading, data }, price: { loading: priceLoading, currentPriceData } }): Store => ({
  data,
  loading,
  priceLoading,
  currentPriceData,
});
const mapDispatch = ({ aggregation: { getAggregationData }, price: { getCurrentPriceData } }): Dispatch => ({
  getAggregationData,
  getCurrentPriceData,
});

const frontload = (props: Dispatch & Store & Props) =>
  Promise.all([
    props.data.blockNumber || props.getAggregationData(),
    props.currentPriceData.priceUsd === -1 && props.getCurrentPriceData(),
  ]);

export default translate()(
  connect(
    mapState,
    mapDispatch,
  )(
    frontloadConnect(frontload, {
      onUpdate: false,
      onMount: true,
    })(AggregationList),
  ),
);
