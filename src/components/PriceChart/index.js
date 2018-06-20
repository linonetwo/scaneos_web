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

import { Title } from '../../pages/Home/styles';

const PriceChartContainer = styled(Flex)`
  height: 300px;
  padding: 20px;

  width: 90vw;
  margin: 20px auto 0;
  ${breakpoint('desktop')`
    width: calc((1200px - 20px) / 2);
    margin: 30px 0 0;
  `};

  background-color: white;

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
type Store = {
  priceChartData: number[][],
  loading: boolean,
};
type Dispatch = {
  getPriceChartData: () => void,
};
function PriceChart(props: Props & Store) {
  const { priceChartData } = props;
  const series = [
    {
      name: 'USD',
      data: priceChartData.map(([, usdPrice]) => usdPrice),
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
      data: priceChartData.map(([, , timeStamp]) => timeStamp),
      axisLabel: {
        formatter: value => format(value * 1000, 'MM-DD HH:mm:ss'),
      },
      axisPointer: {
        label: {
          formatter: ({ value }) => format(value * 1000, 'MM-DD HH:mm:ss'),
        },
      },
    },
  ];
  if (typeof window === 'undefined') {
    global.window = {};
  }
  return (
    <Spin spinning={props.loading}>
      <PriceChartContainer column justifyBetween>
        <Title center>
          <span>
            <Icon type="bar-chart" /> {props.t('PriceHistory')}
          </span>
        </Title>
        <IEcharts option={{ ...chartOption, series, xAxis }} echarts={echarts} />
      </PriceChartContainer>
    </Spin>
  );
}

const mapState = ({ price: { loading, priceChartData } }): Store => ({
  loading,
  priceChartData,
});
const mapDispatch = ({ price: { getPriceChartData } }): Dispatch => ({
  getPriceChartData,
});
const frontload = (props: Dispatch & Store) => props.priceChartData.length === 0 && props.getPriceChartData();

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
