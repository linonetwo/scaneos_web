// @flow
import { flatten, uniq, take, zip, difference } from 'lodash';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { translate } from 'react-i18next';
import breakpoint from 'styled-components-breakpoint';
import numeral from 'numeral';
import IEcharts from 'react-echarts-v3/src/lite';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/chart/themeRiver';

import { Title, ListContainer } from './styles';

const ChartContainer = styled(ListContainer)`
  height: 350px;
  min-height: 350px;
  margin-top: 30px;
  ${breakpoint('desktop')`
    height: 250px;
    min-height: 250px;
  `};
  .react-echarts {
    a {
      color: white;
      text-decoration: underline;
      text-align: left;
    }
  }
`;

const seriesConfig = {
  type: 'themeRiver',
  accountNumberToShow: 8,
  blackListedAccountNames: [
    'eosio.stake',
    'eosio.msig',
    'eosio.names',
    'eosio.unregd',
    'eosio.ram',
    'eosio.ramfee',
    'eosio.saving',
    'eosio.vpay',
    'eosio.token',
    'eosio.bpay',
  ],
  label: {
    show: false,
  },
  emphasis: {
    itemStyle: {
      shadowBlur: 20,
      shadowColor: 'rgba(0, 0, 0, 0.8)',
    },
    label: {
      show: true,
    },
  },
};

type Props = {
  t: Function,
};
const GET_ACCOUNT_TREND_CHART_HOME_PAGE = gql`
  query GET_ACCOUNT_TREND_CHART_HOME_PAGE {
    accountTrend(range: 5, fields: "eos", sampleRate: 0.1) {
      eosPosition
      eosTopAccounts
      timestamp
    }
  }
`;

class Chart extends Component<Props, { currentAccounts: string[] }> {
  state = {
    currentAccounts: [],
  };

  chartOption = {
    tooltip: {
      trigger: 'axis',
      confine: true,
      enterable: true,
      alwaysShowContent: true,
      formatter: params => {
        const meaningfulEntries = params
          .filter(({ data: [, value] }) => value > 0)
          .sort(({ data: [, value1] }, { data: [, value2] }) => value2 - value1);
        const currentAccounts = meaningfulEntries.map(({ data: [, , accountName] }) => accountName);
        this.setState({ currentAccounts });
        return meaningfulEntries
          .map(
            ({ data: [, value, accountName] }) =>
              `<a href="/account/${accountName}" target="_black" rel="noopener noreferrer">${accountName}</a>: ${numeral(
                value,
              ).format('0,0')}EOS`,
          )
          .join('<br/>');
      },
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: 'rgba(0,0,0,0.2)',
          width: 1,
          type: 'solid',
        },
      },
    },

    singleAxis: {
      top: 50,
      bottom: 50,
      axisTick: {},
      axisLabel: {},
      type: 'time',
      axisPointer: {
        animation: true,
        label: {
          show: true,
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          opacity: 0.2,
        },
      },
    },
  };

  render() {
    const { t } = this.props;
    const title = (
      <Title justifyBetween alignCenter>
        <span>{t('TopAccountsEOSChange')}</span>
      </Title>
    );
    return (
      <Query query={GET_ACCOUNT_TREND_CHART_HOME_PAGE}>
        {({ loading, error, data }) => {
          if (error)
            return (
              <ChartContainer column>
                {title}
                {error.message}
              </ChartContainer>
            );
          if (loading)
            return (
              <ChartContainer column>
                {title}
                <Spin tip={t('Connecting')} spinning={loading} size="large" />
              </ChartContainer>
            );
          const { accountTrend } = data;

          const accountToShow = uniq(
            flatten(
              accountTrend.map(({ eosTopAccounts }) =>
                take(
                  eosTopAccounts.filter(accountName => !seriesConfig.blackListedAccountNames.includes(accountName)),
                  seriesConfig.accountNumberToShow,
                ),
              ),
            ),
          );
          const zippedAccountTrend = flatten(
            accountTrend.map(({ eosPosition, eosTopAccounts, timestamp }, index) => {
              if (index === 0) {
                const accountNotExistInFirstArray = difference(accountToShow, eosTopAccounts);
                return take(
                  zip(Array(eosTopAccounts.length).fill(timestamp), eosPosition, eosTopAccounts).filter(
                    ([, , accountName]) => !seriesConfig.blackListedAccountNames.includes(accountName),
                  ),
                  seriesConfig.accountNumberToShow,
                ).concat(
                  zip(
                    Array(accountNotExistInFirstArray.length).fill(timestamp),
                    Array(accountNotExistInFirstArray.length).fill(0),
                    accountNotExistInFirstArray,
                  ),
                );
              }
              return take(
                zip(Array(eosTopAccounts.length).fill(timestamp), eosPosition, eosTopAccounts).filter(
                  ([, , accountName]) => !seriesConfig.blackListedAccountNames.includes(accountName),
                ),
                seriesConfig.accountNumberToShow,
              );
            }),
          );

          const { currentAccounts } = this.state;
          const legend = {
            data: currentAccounts.length > 0 ? currentAccounts : take(accountToShow, seriesConfig.accountNumberToShow),
          };
          const series = [
            {
              ...seriesConfig,
              data: zippedAccountTrend,
            },
          ];

          return (
            <ChartContainer column>
              {title}
              <IEcharts theme="light" option={{ ...this.chartOption, series, legend }} echarts={echarts} />
            </ChartContainer>
          );
        }}
      </Query>
    );
  }
}

export default translate()(Chart);
