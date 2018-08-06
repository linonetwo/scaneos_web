// @flow
import { size } from 'lodash';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Spin, Table, Icon } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import prettySize from 'prettysize';
import breakpoint from 'styled-components-breakpoint';
import Flex from 'styled-flex-component';
import IEcharts from 'react-echarts-v3/src/lite';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/candlestick';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/dataZoom';

import { Title, WideListContainer } from './styles';
import getRAMCandleStickOption from '../../components/ChartsAndVisualization/RamPriceChart/getRAMCandleStickOption';

const RamInfoContainer = styled(WideListContainer)`
  ${breakpoint('desktop')`
    height: 360px;
    min-height: 360px;
  `};
  margin-top: 20px;
  padding: 0;
`;
const PartsLayout = styled(Flex)`
  width: 100%;
  ${breakpoint('mobile', 'tablet')`
    flex-direction: column;
    height: 720px;
    min-height: 720px;
  `};
`;
const PartContainer = styled(Flex)`
  margin: 0px auto;
  width: 90vw;
  ${breakpoint('desktop')`
    width: calc((100% - 24px) / 2);
  `};

  min-height: 360px;
  ${breakpoint('desktop')`
    min-height: calc(360px - 30px);
  `};

  .ant-table-small {
    border: none;
    th {
      border-bottom: none !important;
    }
    td {
      border-bottom: none;
      padding: 6px 8px !important;
    }
    th:first-child {
      padding-left: 23px !important;
    }
    td:first-child {
      padding-left: 30px !important;
    }
  }
`;
const PartTitle = styled(Title)`
  font-size: 16px;
`;
const GotoDetail = styled(Flex)`
  color: #333;
  font-size: 14px;
  ${breakpoint('mobile', 'desktop')`
    margin-bottom: 15px;
  `};
`;

type Props = {
  t: Function,
};
const GET_RAM_PRICE_CHART = gql`
  query GET_RAM_PRICE_CHART {
    resourcePriceChart(range: "1d") {
      ramKChart(kChartChunkSize: 50) {
        time
        open
        close
        lowest
        highest
      }
    }
  }
`;
const GET_RAM_DATA = gql`
  query GET_RAM_DATA {
    accounts(sortBy: "ram", page: 1, size: 8) {
      accounts {
        accountName
        eosBalance
        ram {
          max
        }
      }
    }
  }
`;
class Chart extends PureComponent<Props> {
  render() {
    const { t } = this.props;
    return (
      <RamInfoContainer column alignCenter>
        <PartsLayout>
          <Query query={GET_RAM_PRICE_CHART}>
            {({ loading, error, data }) => {
              if (error) return <PartContainer center>{error.message}</PartContainer>;
              if (loading && size(data) === 0)
                return (
                  <PartContainer center>
                    <Spin tip={t('Connecting')} spinning={loading} size="large" />
                  </PartContainer>
                );
              const {
                resourcePriceChart: { ramKChart },
              } = data;
              return (
                <PartContainer column>
                  <PartTitle>{t('block:ram') + t('PriceHistory')}</PartTitle>
                  <IEcharts style={{ height: '360px' }} theme="light" option={getRAMCandleStickOption(ramKChart)} echarts={echarts} />
                </PartContainer>
              );
            }}
          </Query>

          <Query query={GET_RAM_DATA}>
            {({ loading, error, data }) => {
              if (error) return <PartContainer center>{error.message}</PartContainer>;
              if (loading && size(data) === 0)
                return (
                  <PartContainer center>
                    <Spin tip={t('Connecting')} spinning={loading} size="large" />
                  </PartContainer>
                );
              const {
                accounts: { accounts },
              } = data;
              return (
                <PartContainer column>
                  <PartTitle>{t('block:ram') + t('LeaderBoard')}</PartTitle>
                  <Table
                    bordered={false}
                    scroll={{ x: 550 }}
                    size="small"
                    dataSource={accounts.map((item, index) => ({ rank: index + 1, ...item }))}
                    rowKey="id"
                    pagination={false}
                  >
                    <Table.Column title={t('rank')} dataIndex="rank" key="rank" />
                    <Table.Column
                      title={t('name')}
                      dataIndex="accountName"
                      key="accountName"
                      render={accountName => <Link to={`/account/${accountName}/`}>{accountName}</Link>}
                    />
                    <Table.Column
                      title={t('ramMax')}
                      dataIndex="ram"
                      key="ram"
                      render={({ max }) => prettySize(max, true, true, 3)}
                    />
                    <Table.Column
                      title={t('eosBalance')}
                      dataIndex="eosBalance"
                      key="eos"
                      render={eosBalance => `${eosBalance} EOS`}
                    />
                  </Table>
                </PartContainer>
              );
            }}
          </Query>
        </PartsLayout>
        <Link to="/dapp/ram/">
          <GotoDetail center>
            {t('enterRamTopic')}
            <Icon type="right" />
          </GotoDetail>
        </Link>
      </RamInfoContainer>
    );
  }
}

export default translate(['account', 'block'])(Chart);
