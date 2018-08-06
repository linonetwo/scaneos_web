// @flow
import { size } from 'lodash';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Spin, Icon } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { translate } from 'react-i18next';
import breakpoint from 'styled-components-breakpoint';
import IEcharts from 'react-echarts-v3/src/lite';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/candlestick';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/dataZoom';

import { Title, WideListContainer } from '../../Home/styles';
import getRAMCandleStickOption from '../../../components/ChartsAndVisualization/RamPriceChart/getRAMCandleStickOption';

const RamInfoContainer = styled(WideListContainer)`
  ${breakpoint('desktop')`
    height: 360px;
    min-height: 360px;
  `};
  margin-top: 20px;
  padding: 0;
`;

type Props = {
  t: Function,
};
const GET_RAM_PRICE_CHART = gql`
  query GET_RAM_PRICE_CHART {
    resourcePriceChart(range: "1d") {
      ramKChart(kChartChunkSize: 10) {
        time
        open
        close
        lowest
        highest
      }
    }
    resourcePrice {
      ramPrice
    }
  }
`;
class Chart extends PureComponent<Props> {
  render() {
    const { t } = this.props;
    return (
      <Query query={GET_RAM_PRICE_CHART} pollInterval={5000} notifyOnNetworkStatusChange>
        {({ loading, error, data }) => {
          if (error) return <RamInfoContainer center>{error.message}</RamInfoContainer>;
          if (loading && size(data) === 0)
            return (
              <RamInfoContainer center>
                <Spin tip={t('Connecting')} spinning={loading} size="large" />
              </RamInfoContainer>
            );
          const {
            resourcePriceChart: { ramKChart },
            resourcePrice: { ramPrice },
          } = data;
          return (
            <RamInfoContainer column>
              <Title>
                {`${t('block:ram')}${t('PriceHistory')} `}
                {ramPrice}EOS/KB{' '}
                {loading && (
                  <span>
                    <Spin indicator={<Icon type="loading" style={{ fontSize: 16 }} spin />} />
                    {t('Syncing')}
                  </span>
                )}
              </Title>
              <IEcharts
                style={{ height: '360px' }}
                theme="light"
                option={getRAMCandleStickOption(ramKChart)}
                echarts={echarts}
              />
            </RamInfoContainer>
          );
        }}
      </Query>
    );
  }
}

export default translate(['account', 'block'])(Chart);
