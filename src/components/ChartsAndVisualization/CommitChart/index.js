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
import { _ } from 'param.macro';

import { Title } from '../../../pages/Home/styles';

const Container = styled(Flex)`
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
      name: 'Commit',
      position: 'left',
      splitLine: {
        show: false,
      },
      min: 'dataMin',
      max: 'dataMax',
      axisLabel: {
        formatter: value => numeral(value).format('0'),
      },
    },
  ],
};

type Props = {
  t: Function,
};
const GET_EOS_PRICE_CHART = gql`
  query GET_COMMIT_LIST {
    commit {
      days
      total
      week
    }
  }
`;

const getMonthDayCount = (date: Date) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const newDate = new Date(year, month + 1, 0);
  return newDate.getDate();
};

const getDateList = (date, length) => {
  let lastDate = new Date(date * 1000);
  const dateList = [];
  dateList.push(lastDate);
  for (let index = 0; index < length; index+=1) {
    const startDay = lastDate.getDate();
    const startMonth = lastDate.getMonth();
    const startYear = lastDate.getFullYear();
    const maxDay = getMonthDayCount(lastDate);
    const currentDay = startDay + 1;
    const currentMonth = startMonth + (currentDay > maxDay? 1: 0);
    const currentYear = startYear + (currentMonth > 12? 1: 0);
    lastDate = new Date(
      currentYear,
      currentMonth > 12
        ? currentMonth % 12
        : currentMonth,
      currentDay > maxDay
        ? currentDay % maxDay
        : currentDay,
      );
    if (lastDate.valueOf() > Date.now()) {
      break;
    }
    dateList.push(lastDate);
  }
  return dateList;
};
function RepoCommits({ t }: Props) {
  return (
    <Query query={GET_EOS_PRICE_CHART} pollInterval={6000} notifyOnNetworkStatusChange>
      {({ loading, error, data }) => {
        if (error)
          return (
            <Container column justifyBetween>
              {error.message}
            </Container>
          );
        if (loading && size(data) === 0)
          return (
            <Container column justifyBetween>
              <Spin tip={t('Connecting')} spinning={loading} size="large" />
            </Container>
          );

        const {
          commit: {
            days,
            week,
            total,
          },
        } = data;
        const series = [
          {
            name: 'Commits',
            data: days,
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
            data: getDateList(week, days.length),
            axisLabel: {
              formatter: format(_, 'MM-DD'),
            },
            axisPointer: {
              label: {
                formatter: format(_.value, 'MM-DD'),
              },
            },
          },
        ];
        if (typeof window === 'undefined') {
          global.window = {};
        }
        return (
          <Container column justifyBetween>
            <Title>
              <span>
                <Icon type="bar-chart" /> {t('CommitHistory')}{' '}
                {loading && (
                  <span>
                    <Spin indicator={<Icon type="loading" style={{ fontSize: 16 }} spin />} />
                    {t('Syncing')}
                  </span>
                )}
              </span>
            </Title>
            <IEcharts option={{ ...chartOption, series, xAxis }} echarts={echarts} />
            <div style={{textAlign: 'center'}}>
            {t('CommitTotal')}
            {total}
            </div>
          </Container>
        );
      }}
    </Query>
  );
}

export default translate()(RepoCommits);
