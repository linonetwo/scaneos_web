// @flow
import React from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { Spin } from 'antd';
import { format } from 'date-fns';
import numeral from 'numeral';
import IEcharts from 'react-echarts-v3/src/lite.js';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/timeline';

const PriceChartContainer = styled(Flex)`
  height: 200px;
  width: 100%;
`;

const chartOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
  },
  legend: {
    data: ['BTCPrice', 'USDPrice'],
    bottom: 10,
    left: 'center',
  },
  yAxis: [
    {
      type: 'value',
      name: 'USD',
      position: 'right',
      splitLine: {
        show: false,
      },
      min: 'dataMin',
      max: 'dataMax',
      axisLabel: {
        formatter: value => numeral(value).format('0.0[0]'),
      },
    },
    {
      type: 'value',
      name: 'BTC',
      position: 'left',
      splitLine: {
        show: false,
      },
      min: 'dataMin',
      max: 'dataMax',
      axisLabel: {
        formatter: value => numeral(value).format('0.000000'),
      },
    },
  ],
};

export default function PriceChart(props: { data: number[][] }) {
  const { data } = props;
  const series = [
    {
      name: 'USD',
      data: data.map(([, usdPrice]) => usdPrice),
      type: 'line',
      smooth: true,
      showSymbol: false,
      hoverAnimation: false,
    },
    {
      name: 'BTC',
      yAxisIndex: 1,
      data: data.map(([btcPrice]) => btcPrice),
      type: 'line',
      smooth: true,
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
      data: data.map(([, , timeStamp]) => timeStamp),
      axisLabel: {
        formatter: value => format(value * 1000, 'MM-DD HH:mm:ss'),
      },
    },
  ];
  return (
    <PriceChartContainer>
      <IEcharts option={{ ...chartOption, series, xAxis }} echarts={echarts} />
    </PriceChartContainer>
  );
}
