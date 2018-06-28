// @flow
import React from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';
import { translate } from 'react-i18next';
import { Icon, Spin } from 'antd';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import numeral from 'numeral';
import IEcharts from 'react-echarts-v3/src/lite';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/line';

import { Title } from '../../../pages/Home/styles';

const PriceChartContainer = styled(Flex)`
  height: 500px;
  padding: 20px 5px 5px;
  box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.02);

  width: 90vw;
  margin: 24px auto 0;
  ${breakpoint('desktop')`
    width: calc((1200px - 24px) / 2);
    margin: 24px 0 0;
  `};

  background-color: white;

  & div:first-child {
    margin-left: 15px;
  }
  & .react-echarts {
    overflow: hidden;
  }
`;

const AggregationContainer = styled(Flex)`
  width: 100%;
  & .ant-spin-nested-loading {
    width: calc((100% - 20px * 2) / 3);
  }
  background-color: white;
  margin-right: 15px;
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
    data: ['EOSPrice'],
    bottom: 10,
    left: 'center',
  },
  yAxis: [
    {
      type: 'value',
      name: 'EOS',
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
type Store = {
  ramPriceChartData: number[][],
  resourcePrice: Object,
  loading: boolean,
};
type Dispatch = {
  getResourcePrice: () => void,
  getRamPriceChart: () => void,
};
function PriceChart(props: Props & Store) {
  const { loading, resourcePrice, ramPriceChartData, t } = props;
  const series = [
    {
      name: 'EOS',
      data: ramPriceChartData.map(([, EOSPrice]) => EOSPrice),
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
      data: ramPriceChartData.map(([timeStamp]) => timeStamp),
      axisLabel: {
        formatter: value => format(Number(value), 'MM-DD HH:mm:ss'),
      },
      axisPointer: {
        label: {
          formatter: ({ value }) => format(Number(value), 'MM-DD HH:mm:ss'),
        },
      },
    },
  ];
  if (typeof window === 'undefined') {
    global.window = {};
  }
  return (
    <Spin spinning={loading}>
      <PriceChartContainer column justifyBetween>
        <Title>
          <span>
            <Icon type="bar-chart" /> {t('RamPriceHistory')}
          </span>
        </Title>
        <AggregationContainer justifyBetween wrap="true">
          <AggregationItem column center>
            <h4>{t('ramPrice')}</h4>
            {resourcePrice.ramPrice.toFixed(3)} EOS/KB
          </AggregationItem>
          <AggregationItem column center>
            <h4>{t('netPrice')}</h4>
            {resourcePrice.netPrice.toFixed(3)} EOS/KB
          </AggregationItem>
          <AggregationItem column center>
            <h4>{t('cpuPrice')}</h4>
            {resourcePrice.cpuPrice.toFixed(3)} EOS/ms
          </AggregationItem>
        </AggregationContainer>
        <IEcharts option={{ ...chartOption, series, xAxis }} echarts={echarts} />
      </PriceChartContainer>
    </Spin>
  );
}

const mapState = ({ price: { loading, ramPriceChartData, resourcePrice } }): Store => ({
  loading,
  ramPriceChartData,
  resourcePrice,
});
const mapDispatch = ({ price: { getRamPriceChart, getResourcePrice } }): Dispatch => ({
  getRamPriceChart,
  getResourcePrice,
});
const frontload = ({ resourcePrice, getResourcePrice, ramPriceChartData, getRamPriceChart }: Dispatch & Store) =>
  Promise.all([
    resourcePrice.supply === -1 && getResourcePrice(),
    ramPriceChartData.length === 0 && getRamPriceChart(),
  ]);

export default translate()(
  connect(
    mapState,
    mapDispatch,
  )(
    frontloadConnect(frontload, {
      onUpdate: false,
      onMount: true,
    })(PriceChart),
  ),
);
