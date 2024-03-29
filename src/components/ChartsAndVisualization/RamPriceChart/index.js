// @flow
import { size } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';
import { translate } from 'react-i18next';
import { Icon, Spin, Progress } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import prettySize from 'prettysize';
import IEcharts from 'react-echarts-v3/src/lite';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/candlestick';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/dataZoom';

import { Title } from '../../../pages/Home/styles';
import getRAMCandleStickOption from './getRAMCandleStickOption';

const PriceChartContainer = styled(Flex)`
  height: 500px;
  padding: 20px 5px 5px;
  box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.02);

  width: 90vw;
  margin: 24px auto 0;
  ${breakpoint('desktop')`
    width: 1200px;
  `};

  background-color: white;

  & > div:first-child {
    margin-left: 15px;
  }
  & .react-echarts {
    overflow: hidden;
  }
`;

const AggregationContainer = styled(Flex)`
  width: 100%;
  background-color: white;
  margin-right: 15px;
`;
const AggregationItem = styled(Flex)`
  color: #333;
  opacity: 0.9;
  font-size: 18px;
  letter-spacing: -3px;
  width: calc((100% - 20px * 2) / 3);
  & h4 {
    letter-spacing: 0px;
    color: #333;
    opacity: 0.6;
    font-size: 12px;
    display: inline-flex;
    margin: 5px 0 0;
  }

  margin: 5px auto;
  ${breakpoint('desktop')`
    margin: 0;
    font-size: 27px;
  `};

  white-space: nowrap;

  font-family: Courier;
  &:hover {
    opacity: 0.5;
  }
`;

type Props = {
  t: Function,
};
const GET_RAM_PRICE_CHART = gql`
  query GET_RAM_PRICE_CHART {
    resourcePriceChart(range: "5d") {
      ramKChart(kChartChunkSize: 20) {
        time
        open
        close
        lowest
        highest
      }
    }
    resourcePrice {
      ramPrice
      netPrice
      cpuPrice
    }
    status {
      maxRamSize
      totalRamBytesReserved
    }
  }
`;

const ChartContainer = styled.div`
  height: 300px;
`;
const ProgressContainer = styled.div`
  width: 100%;

  .ant-progress-bg {
    background-color: #1aa2db;
  }

  h4 {
    text-align: center;
  }
`;

function RamPriceChart({ t }: Props) {
  return (
    <Query query={GET_RAM_PRICE_CHART} pollInterval={6000} notifyOnNetworkStatusChange>
      {({ loading, error, data }) => {
        if (error)
          return (
            <PriceChartContainer column justifyBetween>
              {error.message}
            </PriceChartContainer>
          );
        if (loading && size(data) === 0)
          return (
            <PriceChartContainer column justifyBetween>
              <Spin tip={t('Connecting')} spinning={loading} size="large" />
            </PriceChartContainer>
          );

        const {
          resourcePriceChart: { ramKChart },
          resourcePrice,
          status: { maxRamSize, totalRamBytesReserved },
        } = data;

        const ramReservedPercent = (totalRamBytesReserved / maxRamSize) * 100;

        if (typeof window === 'undefined') {
          global.window = {};
        }
        return (
          <PriceChartContainer column justifyBetween>
            <Title>
              <span>
                <Icon type="bar-chart" /> {t('RamPriceChart')}{' '}
                {loading && (
                  <span>
                    <Spin indicator={<Icon type="loading" style={{ fontSize: 16 }} spin />} />
                    {t('Syncing')}
                  </span>
                )}
              </span>
            </Title>
            <AggregationContainer justifyBetween wrap="true">
              <AggregationItem column center>
                <h4>
                  {t('ramPrice')}
                  <small>(EOS/KB)</small>
                </h4>
                {resourcePrice.ramPrice.toFixed(3)}
              </AggregationItem>
              <AggregationItem column center>
                <h4>
                  {t('netPrice')}
                  <small>(EOS/KB/Day)</small>
                </h4>
                {resourcePrice.netPrice.toFixed(3)}
              </AggregationItem>
              <AggregationItem column center>
                <h4>
                  {t('cpuPrice')}
                  <small>(EOS/s/Day)</small>
                </h4>
                {resourcePrice.cpuPrice.toFixed(3)}
              </AggregationItem>
            </AggregationContainer>

            <ProgressContainer>
              <h4>
                {t('maxRamSize')} <mark>{prettySize(maxRamSize)}</mark> {t('totalRamBytesReserved')}{' '}
                <mark>{prettySize(totalRamBytesReserved)}</mark>
              </h4>
              <h4>
                {t('ramReservedPercent')} {ramReservedPercent.toFixed(4)}%
              </h4>
              <Progress showInfo={false} status="active" percent={ramReservedPercent} strokeWidth={20} />
            </ProgressContainer>

            <ChartContainer>
              <IEcharts theme="light" option={getRAMCandleStickOption(ramKChart)} echarts={echarts} />
            </ChartContainer>
          </PriceChartContainer>
        );
      }}
    </Query>
  );
}

export default translate()(RamPriceChart);
