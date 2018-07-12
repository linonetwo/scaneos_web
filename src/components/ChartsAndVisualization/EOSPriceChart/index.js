// @flow
import { size } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';
import { translate } from 'react-i18next';
import { Icon, Spin } from 'antd';
import { format } from 'date-fns';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import numeral from 'numeral';
import IEcharts from 'react-echarts-v3/src/lite';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/line';
import { it, _ } from 'param.macro';

import { Title } from '../../../pages/Home/styles';

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

  & div:first-child {
    margin-left: 15px;
  }
  & .react-echarts {
    overflow: hidden;
  }
`;

const chartOption = {
  grid: {
    x: 50, // 默认是80px
    y: 40, // 默认是60px
    x2: 20, // 默认80px
    y2: 30, // 默认60px
  },
  color: ['#1aa2db'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
  },
  legend: {
    data: ['USDPrice'],
    bottom: 10,
    left: 'center',
  },
  yAxis: [
    {
      type: 'value',
      name: 'USD',
      position: 'left',
      splitLine: {
        show: false,
      },
      min: 'dataMin',
      max: 'dataMax',
      axisLabel: {
        formatter: value => numeral(value).format('0.0[0]'),
      },
    },
  ],
};

type Props = {
  t: Function,
};
const GET_EOS_PRICE_CHART = gql`
  query GET_EOS_PRICE_CHART {
    priceChart {
      priceUsd {
        time
        value
      }
    }
  }
`;
function EOSPriceChart({ t }: Props) {
  return (
    <Query query={GET_EOS_PRICE_CHART} pollInterval={6000} notifyOnNetworkStatusChange>
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
          priceChart: { priceUsd },
        } = data;
        const series = [
          {
            name: 'USD',
            data: priceUsd.map(it.value),
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
          },
        ];
        const xAxis = [
          {
            type: 'category',
            boundaryGap: false,
            splitLine: {
              show: false,
            },
            data: priceUsd.map(it.time),
            axisLabel: {
              formatter: format(_, 'MM-DD HH:mm:ss'),
            },
            axisPointer: {
              label: {
                formatter: format(_.value, 'MM-DD HH:mm:ss'),
              },
            },
          },
        ];
        if (typeof window === 'undefined') {
          global.window = {};
        }
        return (
          <PriceChartContainer column justifyBetween>
            <Title>
              <span>
                <Icon type="bar-chart" /> {t('PriceHistory')}{' '}
                {loading && (
                  <span>
                    <Spin indicator={<Icon type="loading" style={{ fontSize: 16 }} spin />} />
                    {t('Syncing')}
                  </span>
                )}
              </span>
            </Title>
            <IEcharts option={{ ...chartOption, series, xAxis }} echarts={echarts} />
          </PriceChartContainer>
        );
      }}
    </Query>
  );
}

export default translate()(EOSPriceChart);
